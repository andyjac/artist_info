var express = require('express');
var request = require('request');
var _ = require('lodash');
var bodyParser = require('body-parser');

// import my lastfm API Key
var LASTFM_CREDS = require('./lastfm_credentials');

// instantiate the express app
var app = express();

app.set('views', './views');
app.set('view engine', 'jade');
// set app to use bodyParser to parse a url encoded body response from a request
app.use(bodyParser.urlencoded({extended: false}));

// POST artist search input
app.post('/search', function(req, res) {
  var artist = formatArtistInput(req, artist);
  var queryURL = buildTopAlbumsQueryURL(artist);
  requestLastfmTopAlbums(queryURL, _.partial(renderResults, res));
});

// GET the home page
app.get('/', function(req, res) {
  res.render('index');
});

// format artist input and replace ' ' with '+'
function formatArtistInput(req, artist) {
  return req.body.artist.replace(/\s+/g, '+');
}

// API url which will return the top albums of a given artist
function buildTopAlbumsQueryURL(artist) {
  return 'http://ws.audioscrobbler.com/2.0/?' +
    'method=artist.gettopalbums&' +
    'artist=' + artist + '&' +
    'limit=10&' +
    'api_key=' + LASTFM_CREDS + '&' +
    'format=json';
}

// ensure OK response
function responseOK(error, response) {
  return !error && response.statusCode === 200;
}

// get the albums names out of the album objects
function extractAlbumNames(body) {
  return _.map(body.topalbums.album, 'name').join(', ');
}

function extractTopAlbumInfo(body) {
  if (body.message) { return {message: body.message}; }
  return {
    artist: body.topalbums.album[0].artist.name,
    albums: extractAlbumNames(body)
  };
}

// request the top 10 albums of an artist on the lastfm API
function requestLastfmTopAlbums(urlToSearch, callBack) {
  var parsedResponse
    , topAlbumInfo;

  request(urlToSearch, function(error, response, body) {
    parsedResponse = JSON.parse(body);
    if(responseOK(error, response)) {
      topAlbumInfo = extractTopAlbumInfo(parsedResponse);
    }
    else {
      topAlbumInfo = {errorCode: response.statusCode};
    }
    callBack(topAlbumInfo);
  });
}

// if there is an error render the error page
// if no error render top albums in the results page
function renderResults(res, topAlbumInfo) {
  if(topAlbumInfo.errorCode) {
    res.render('error', topAlbumInfo);
  }
  else {
    res.render('results', topAlbumInfo);
  }
}

app.listen(3000);

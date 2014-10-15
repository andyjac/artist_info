var express = require('express');
var request = require('request');
var _ = require('lodash');
var bodyParser = require('body-parser');
var LASTFM_CREDS = require('./lastfm_credentials');

var app = express();

app.set('views', './views');
app.set('view engine', 'jade');
// set app to use bodyParser to parse a url encoded body response from a request
app.use(bodyParser.urlencoded({extended: false}));

app.post('/search', function(req, res) {
  var artist = formatArtistInput(req, artist);
  var queryURL = buildTopAlbumsQueryURL(artist);
  requestLastfmTopAlbums(queryURL, _.partial(renderResults, res));
});

app.get('/', function(req, res) {
  res.render('index');
});

function formatArtistInput(req, artist) {
  return req.body.artist.replace(/\s+/g, '+');
}

function buildTopAlbumsQueryURL(artist) {
  return 'http://ws.audioscrobbler.com/2.0/?' +
    'method=artist.gettopalbums&' +
    'artist=' + artist + '&' +
    'limit=10&' +
    'api_key=' + LASTFM_CREDS + '&' +
    'format=json';
}

function responseOK(error, response) {
  return !error && response.statusCode === 200;
}

// get the albums names out of the album objects
function extractAlbumNames(body) {
  return _.map(body.topalbums.album, 'name');
}

function extractTopAlbumInfo(body) {
  if (body.message) { return {message: body.message}; }
  return {
    artist: body.topalbums.album[0].artist.name,
    albums: extractAlbumNames(body)
  };
}

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

function renderResults(res, topAlbumInfo) {
  if(topAlbumInfo.errorCode) {
    res.render('error', topAlbumInfo);
  }
  else {
    res.render('results', topAlbumInfo);
  }
}

app.listen(3000);

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
app.use(bodyParser.urlencoded({extended: false}));

// POST user artist search
app.post('/search', function(req, res) {
  var artist = req.body.artist.split(' ').join('+');
  var queryURL = buildTopAlbumsQueryURL(artist);
  makeRequest(queryURL, _.partial(renderResults, res));
});

// GET the home page
app.get('/', function(req, res) {
  res.render('index');
});

// API url which will return the top albums of a given artist
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

function extractTopAlbumInfo(body) {
  if (body.message) { return {message: body.message}; }
  var results = {};
  results.artist = body.topalbums.album[0].artist.name;
  results.albums = _.map(body.topalbums.album, 'name').join(', ');
  return results;
}

// request the API
function makeRequest(urlToSearch, callBack) {
  var parsedResponse
    , topAlbumInfo = [];

  request(urlToSearch, function(error, response, body) {
    parsedResponse = JSON.parse(body);
    if(responseOK(error, response)) {
      topAlbumInfo = extractTopAlbumInfo(parsedResponse);
    }
    callBack(topAlbumInfo);
  });
}

// render the retrieved info from the API in the browser
function renderResults(res, topAlbumInfo) {
  res.render('results', { title: 'Top Albums', artist : 'Top albums for ' + topAlbumInfo.artist + ':', albums : topAlbumInfo.albums, topAlbumInfo: topAlbumInfo});
}

app.listen(3000);

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
  var queryURL = buildTopAlbumsQueryURL('flying+lotus');
  makeRequest(queryURL, _.partial(renderResults, res));
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

// request the API
function makeRequest(urlToSearch, callBack) {
  var parsedResponse
    , artist
    , albums
    , topAlbums;

  request(urlToSearch, function(error, response, body) {
    if(!error && response.statusCode === 200) {
      parsedResponse = JSON.parse(body);
      artist = parsedResponse.topalbums.album[0].artist.name;
      albums = parsedResponse.topalbums.album;
      topAlbums = _.map(albums, 'name').join(', ');
    }
    callBack(artist, topAlbums);
  });
}

// render the retrieved info from the API in the browser
function renderResults(res, artist, topAlbums) {
  res.render('index', { title: 'Top Albums', artist : 'Top albums for ' + artist + ':', albums : topAlbums});
}

app.listen(3000);

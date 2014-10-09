var express = require('express');
var request = require('request');

// For importing my lastfm API Key
var lastfmCreds = require('./lastfm_credentials');

// Instantiate the express app
var app = express();

app.set('views', './views');
app.set('view engine', 'jade');

// GET the home page
app.get('/', function (req, res) {
  makeRequest(searchOnLastfm);
  res.render('index', { title: 'Top Albums', artist : 'Top albums for ' + artist + ':', albums : topAlbums});
});

// QUERY is hard-coded for the time being. Eventually will be retrieved from user input
var QUERY = 'flying+lotus';

// URL of the lastfm API which will return the top albums of a given artist
var searchOnLastfm = 'http://ws.audioscrobbler.com/2.0/?' +
    'method=artist.gettopalbums&' +
    'artist=' + QUERY + '&' +
    'limit=5&' +
    'api_key=' + lastfmCreds + '&' +
    'format=json';

var parsedResponse
    , artist
    , albums
    , topAlbums = '';

// Request to the API
function makeRequest(searchOnLastfm) {
  request(searchOnLastfm, function(error, response, body) {
    if(!error && response.statusCode === 200) {
      parsedResponse = JSON.parse(body);
      artist = parsedResponse.topalbums.album[0].artist.name;
      albums = parsedResponse.topalbums.album;
      for (var p in albums) {
        topAlbums += albums[p].name + ', ';
      }
    }
  });
}

app.listen(3000);

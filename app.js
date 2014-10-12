var express = require('express');
var request = require('request');

// import my lastfm API Key
var lastfmCreds = require('./lastfm_credentials');

// instantiate the express app
var app = express();

app.set('views', './views');
app.set('view engine', 'jade');

// GET the home page
app.get('/', function(req, res) {
  makeRequest(searchOnLastfm, renderResults, res);
});

// QUERY is hard-coded for the time being. Eventually will be retrieved from user input
var QUERY = 'flying+lotus';

// API url which will return the top albums of a given artist
var searchOnLastfm = 'http://ws.audioscrobbler.com/2.0/?' +
    'method=artist.gettopalbums&' +
    'artist=' + QUERY + '&' +
    'limit=10&' +
    'api_key=' + lastfmCreds + '&' +
    'format=json';

// request the API
function makeRequest(urlToSearch, callBack, res) {
  var parsedResponse
    , artist
    , albums
    , album
    , topAlbums = [];

  request(urlToSearch, function(error, response, body) {
    if(!error && response.statusCode === 200) {
      parsedResponse = JSON.parse(body);
      artist = parsedResponse.topalbums.album[0].artist.name;
      albums = parsedResponse.topalbums.album;
      for (var p in albums) {
        album = albums[p].name;
        topAlbums.push(album);

      }
      topAlbums = topAlbums.join(', ');
    }
    callBack(artist, topAlbums, res);
  });
}

// render the retrieved info from the API in the browser
function renderResults(artist, topAlbums, res) {
  res.render('index', { title: 'Top Albums', artist : 'Top albums for ' + artist + ':', albums : topAlbums});
}

app.listen(3000);

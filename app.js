var express = require('express');
var request = require('request');

// For importing my lastfm API Key
var lastfmCreds = require('./lastfm_credentials');

// Instantiate the express app
var app = express();

app.set('views', './');
app.set('view engine', 'jade');

// QUERY is hard-coded for the time being. Eventually will be retrieved from user input
var QUERY = 'flying+lotus';

// URL of the lastfm API which will return the top albums of a given artist
var searchOnLastfm = 'http://ws.audioscrobbler.com/2.0/?' +
    'method=artist.gettopalbums&' +
    'artist=' + QUERY + '&' +
    'limit=5&' +
    'api_key=' + lastfmCreds + '&' +
    'format=json';

// Request to the API
request(searchOnLastfm, function(error, response, body) {
  if(!error && response.statusCode === 200) {
    var parsedResponse = JSON.parse(body)
        , artist = parsedResponse['topalbums']['album'][0]['artist']['name']
        , album = parsedResponse['topalbums']['album']
        , topAlbums = album[0]['name'] + ', ' +
            album[1]['name'] + ', ' +
            album[2]['name'] + ', ' +
            album[3]['name'] + ', ' +
            album[4]['name'];

    app.get('/', function (req, res) {
      res.render('index', { title: 'Top Albums', artist : 'Top albums for ' + artist + ':', albums : topAlbums});
    });
  }
});

app.listen(3000);

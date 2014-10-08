var express = require('express');
var request = require('request');

var app = express();

app.set('views', './');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render('index', { title: 'lastFMTopAlbums'});
});

// QUERY is hard-coded for the time being. Eventually will be retrieved from user input
var QUERY = 'flying+lotus'
    , apiKey;
    , topAlbums;

var searchOnLastfm = 'http://ws.audioscrobbler.com/2.0/?' +
    'method=artist.gettopalbums&' +
    'artist=' + QUERY + '&' +
    'limit=5&' +
    'api_key=' + apiKey + '&' +
    'format=json';

request(searchOnLastfm, function(error, response, body) {
  if(!error && response.statusCode === 200) {
    var parsedResponse = JSON.parse(body);
    console.log(body);
  }
});

app.listen(3000);

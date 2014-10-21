var express = require('express');
var request = require('request');
var _ = require('lodash');
var bodyParser = require('body-parser');
var buildTopAlbumsQueryUrl = require('./build_url');
var requestLastfmTopAlbums = require('./make_request');

var app = express();

app.set('views', './views');
app.set('view engine', 'jade');
// set app to use the bodyParser module to parse a url encoded body response from a request
app.use(bodyParser.urlencoded({extended: false}));

app.post('/search', function(req, res) {
  var artist = formatArtistInput(req, artist);
  var queryUrl = buildTopAlbumsQueryUrl(artist);
  requestLastfmTopAlbums(queryUrl, _.partial(renderResults, res));
});

app.get('/', function(req, res) {
  res.render('index');
});

function formatArtistInput(req) {
  return encodeURIComponent(req.body.artist).replace(/\s+/g, '+');
}

function renderResults(res, topAlbumInfo, errorResponse) {
  if(errorResponse) {
    res.render('error', errorResponse);
  }
  else {
    res.render('results', topAlbumInfo);
  }
}

app.listen(3000);

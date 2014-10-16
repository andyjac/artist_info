var express = require('express');
var request = require('request');
var _ = require('lodash');
var bodyParser = require('body-parser');
var LASTFM_CREDS = require('./lastfm_credentials');

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

function buildTopAlbumsQueryUrl(artist) {
  var queryParams = {
    method: 'artist.gettopalbums',
    artist: artist,
    limit: '10',
    autocorrect: '1',
    format: 'json',
    api_key: LASTFM_CREDS
  };

  function addParam(accumulator, value, key) {
    return [accumulator, '&', key, '=', value].join('');
  }

  var baseUrl = 'http://ws.audioscrobbler.com/2.0/?';

  return _.reduce(queryParams, addParam, baseUrl);
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

function requestLastfmTopAlbums(UrlToSearch, callBack) {
  var parsedResponse
    , topAlbumInfo
    , errorResponse;

  request(UrlToSearch, function(error, response, body) {
    parsedResponse = JSON.parse(body);
    if(responseOK(error, response)) {
      topAlbumInfo = extractTopAlbumInfo(parsedResponse);
      callBack(topAlbumInfo);
    }
    else {
      errorResponse = {code: response.statusCode};
      callBack(errorResponse);
    }
  });
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

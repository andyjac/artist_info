var request = require('request');
var _ = require('lodash');

module.exports = function requestLastfmTopAlbums(UrlToSearch, callBack) {
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
};

function responseOK(error, response) {
  return !error && response.statusCode === 200;
}

function extractTopAlbumInfo(body) {
  if (body.message) { return {message: body.message}; }
  return {
    artist: body.topalbums.album[0].artist.name,
    albums: extractAlbumNames(body)
  };
}

// get the albums names out of the album objects
function extractAlbumNames(body) {
  return _.map(body.topalbums.album, 'name');
}

var request = require('request');
var _ = require('lodash');

module.exports = function requestLastfmTopAlbums(urlToSearch, callBack) {
  var parsedResponse
    , topAlbumInfo
    , errorResponse;

  request(urlToSearch, function(error, response, body) {
    try {
      parsedResponse = JSON.parse(body);
    }
    catch (e) {
      console.error(e);
      return;
    }

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
  if (body.message) {
    return {message: body.message};
  }
  else if (!body.topalbums.album) {
    return {message: 'The artist you supplied could not be found'};
  }
  else if (!(Array.isArray(body.topalbums.album))) {
    return {
      artist: body.topalbums.album.artist.name,
      album: body.topalbums.album.name
    };
  }
  else {
    return {
      artist: body.topalbums.album[0].artist.name,
      albums: extractAlbumNames(body)
    };
  }
}

// get the albums names out of the album objects
function extractAlbumNames(body) {
  return _.map(body.topalbums.album, 'name');
}

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
      console.error(['Date[', Date.now(), '] Error[JSON.parse(body):', e, ']'].join(''));
      errorResponse = {
        message: 'Oops! Looks like something went wrong!'
      };
      callBack(errorResponse);
      return;
    }

    if (responseOK(error, response)) {
      console.log(['Date[', Date.now(), '] Success[Good Request]'].join(''));
      topAlbumInfo = extractTopAlbumInfo(parsedResponse);
      callBack(topAlbumInfo);
    }
    else {
      console.error(['Date[', Date.now(), '] Error[Bad Request: ', response.statusCode, ']'].join(''));
      errorResponse = {
        message: [response.statusCode, ' Oops! Looks like something went wrong!'].join('')
      };
      callBack(null, errorResponse);
    }
  });
};

function responseOK(error, response) {
  return !error && response.statusCode === 200;
}

function extractTopAlbumInfo(body) {
  if (body.message || !body.topalbums.album) {
    console.error(['Date[', Date.now(), '] Error[Artist Not Found]'].join(''));
    return {message: 'The artist you supplied could not be found'};
  }
  if (!_.isArray(body.topalbums.album)) {
    // console.log(body);
    // console.log(body.topalbums);
    console.info(['Date[', Date.now(), '] Alert[Not Array]'].join(''));
    console.info('==> topalbums Object Before Array Wrap:');
    console.info(body.topalbums);

    body.topalbums.album = [].concat(body.topalbums.album);

    console.info('==> topalbums Object After Array Wrap:');
    console.info(body.topalbums);
  }
  return {
    artist: body.topalbums.album[0].artist.name,
    albums: extractAlbumNames(body)
  };
}

// get album names out of the album objects
function extractAlbumNames(body) {
  return _.map(body.topalbums.album, 'name');
}

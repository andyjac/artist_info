var LASTFM_CREDS = require('./lastfm_credentials');
var _ = require('lodash');

module.exports = function buildTopAlbumsQueryUrl(artist) {
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
};

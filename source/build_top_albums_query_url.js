var LASTFM_CREDS = require('../lastfm_credentials');
var BASE_URL = 'http://ws.audioscrobbler.com/2.0/?';
var _ = require('lodash');

function queryParams(artist) {
  console.log(['Date [', Date.now(), '] Alert[Artist Searched: ', artist, ']'].join(''));
  return {
    method: 'artist.gettopalbums',
    artist: artist,
    limit: '10',
    autocorrect: '1',
    format: 'json',
    api_key: LASTFM_CREDS
  };
}

function addParam(accumulator, value, key) {
  return [accumulator, '&', key, '=', value].join('');
}

module.exports = function buildTopAlbumsQueryUrl(artist) {
  return _.reduce(queryParams(artist), addParam, BASE_URL);
};

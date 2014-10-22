var _ = require('lodash');
var formatArtistInput = require('./format_artist_input');
var buildTopAlbumsQueryUrl = require('./build_url');
var requestLastfmTopAlbums = require('./make_request');
var renderResults = require('./render_results');

module.exports = function postSearchHandler(req, res) {
  var artist = formatArtistInput(req);
  var queryUrl = buildTopAlbumsQueryUrl(artist);
  requestLastfmTopAlbums(queryUrl, _.partial(renderResults, res));
};

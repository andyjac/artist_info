module.exports = function formatArtistInput(req) {
  return encodeURIComponent(req.param('artist')).replace(/\s+/g, '+');
};

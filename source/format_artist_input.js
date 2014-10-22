module.exports = function formatArtistInput(req) {
  return encodeURIComponent(req.body.artist).replace(/\s+/g, '+');
};

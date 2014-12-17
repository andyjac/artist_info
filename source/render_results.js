module.exports = function renderResults(res, topAlbumInfo, errorResponse) {
  res.set({
    'Content-type': 'application/json',
    'Charset': 'utf8'
  });
  if (errorResponse) res.json(errorResponse);
  else res.json(topAlbumInfo);
};

module.exports = function renderResults(res, topAlbumInfo, errorResponse) {
  if(errorResponse) {
    res.json(errorResponse);
  }
  else {
    res.json(topAlbumInfo);
  }
};

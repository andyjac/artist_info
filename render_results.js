module.exports = function renderResults(res, topAlbumInfo, errorResponse) {
  if(errorResponse) {
    res.render('error', errorResponse);
  }
  else {
    res.render('results', topAlbumInfo);
  }
};

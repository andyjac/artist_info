module.exports = function postSearchHandler(res, topAlbumInfo, errorResponse) {
  if(errorResponse) {
    res.render('error', errorResponse);
  }
  else {
    res.render('results', topAlbumInfo);
  }
};

module.exports = function renderResults(res, topAlbumInfo, errorResponse) {
  if(errorResponse) {
    res.header('Content-type', 'application/json');
    res.header('Charset', 'utf8');
    res.json(errorResponse);
  }
  else {
    res.header('Content-type', 'application/json');
    res.header('Charset', 'utf8');
    res.json(topAlbumInfo);
  }
};

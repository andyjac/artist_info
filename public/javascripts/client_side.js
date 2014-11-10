$(document).ready(function() {
  $('html').mouseup(getHighlightedText);
});
var topAlbumsHTML;

function getHighlightedText() {
  var artist = window.getSelection().toString();

  if (topAlbumsHTML != null) {
    topAlbumsHTML.remove();
    delete topAlbumsHTML;
  }
  if (artist === '') return;
  getTopAlbums(artist);
}

function getTopAlbums(artist) {
  $.ajax({
    url: '/search',
    type: 'GET',
    data: {artist: artist},
    dataType: 'json',
    success: handleTopAlbums,
    error: function(xhr, status, errorThrown) {
      console.log('there was a problem!');
      console.log('status: ' + status);
      console.log('error thrown: ' + errorThrown);
    }
  });
}

function handleTopAlbums(json) {
  topAlbumsHTML = $(template(json));
  topAlbumsHTML.css('display', 'none');
  $(topAlbumsHTML).appendTo('html').fadeIn(100);
}

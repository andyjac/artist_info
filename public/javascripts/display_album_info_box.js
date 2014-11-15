$(document).ready(function() {
  $('html').mouseup(getHighlightedText);
});
var topAlbumsHTML
    , loadingSpinnerHTML = '<div class="RDD9A2B8-731C-4B04-AE9C-E17BBFCE794A"></div'
    , loadingSpinnerClassSelector = '.RDD9A2B8-731C-4B04-AE9C-E17BBFCE794A';

function getHighlightedText() {
  var artist = window.getSelection().toString();

  if (topAlbumsHTML != null) {
    topAlbumsHTML.remove();
    delete topAlbumsHTML;
  }
  if (artist === '') return;
  $('html').append(loadingSpinnerHTML);
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
  topAlbumsHTML = $(albumBoxTemplate(json));
  $(loadingSpinnerClassSelector).remove();
  delete loadingSpinnerHTML;
  topAlbumsHTML.appendTo('html').fadeIn(200);
}

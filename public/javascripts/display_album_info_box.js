$(document).ready(function() {
  $('html').mouseup(getHighlightedText);
});
var topAlbumsHTML
    , uuid = 'E8D9D785-6A04-49B5-9B3C-978BEAC8C2CC'
    , loadingSpinnerHTML = ['<div class="', uuid, ' preloader"/>'].join('')
    , loadingSpinnerClassSelector = ['.', uuid, '.preloader'].join('');

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
  topAlbumsHTML.appendTo('html').fadeIn(200);
}

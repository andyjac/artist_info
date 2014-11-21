$(document).ready(function() {
  $('html').mouseup(getHighlightedText);
});
var topAlbumsHTML
    , uuid = 'E8D9D785-6A04-49B5-9B3C-978BEAC8C2CC'
    , loadingSpinnerHTML = ['<div class="', uuid, ' preloader"/>'].join('')
    , loadingSpinnerClassSelector = ['.', uuid, '.preloader'].join('')
    , makingRequest;

function getHighlightedText() {
  var artist = window.getSelection().toString();
  console.info(['Date[', Date.now(), '] Alert[Highlighted Selection: ', artist, ']'].join(''));

  if (topAlbumsHTML != null) {
    topAlbumsHTML.remove();
    delete topAlbumsHTML;
  }
  if (artist === '') return;
  $('html').append(loadingSpinnerHTML);
  if (!makingRequest) getTopAlbums(artist);
}

function getTopAlbums(artist) {
  makingRequest = true;
  console.info(['Date[', Date.now(), '] Alert[Ajax Request Sent]'].join(''));
  $.ajax({
    url: '/search',
    type: 'GET',
    data: {artist: artist},
    dataType: 'json',
    success: handleTopAlbums,
    error: function(xhr, status, errorThrown) {
      console.error(['Date', Date.now(), '] Error[Bad Request]'].join(''));
      console.error(['Status: ', status].join(''));
      console.error(['Error Thrown: ', errorThrown].join(''));
    }
  });
}

function handleTopAlbums(json) {
  makingRequest = false;
  console.log(['Date[', Date.now(), '] Success[Good Request]'].join(''));
  topAlbumsHTML = $(albumBoxTemplate(json));
  $(loadingSpinnerClassSelector).remove();
  topAlbumsHTML.appendTo('html').fadeIn(200);
}

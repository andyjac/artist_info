$(document).ready(function() {
  makeAjaxRequest();
});
var topAlbumsHTML;
function makeAjaxRequest() {
  $('body').mouseup(function() {
    var artist = window.getSelection().toString();
    if (topAlbumsHTML != null) {
      topAlbumsHTML.remove();
      delete topAlbumsHTML;
    }
    if (artist === '') return;
    $.ajax({
      url: '/search',
      type: 'GET',
      data: {artist: artist},
      dataType: 'json',
      success: function(json) {
        topAlbumsHTML = $(compiledJade(json));
        $('div.results').append(topAlbumsHTML);
      },
      error: function(xhr, status, errorThrown) {
        console.log('there was a problem!');
        console.log('status: ' + status);
        console.log('error thrown: ' + errorThrown);
      }
    });
  });
}

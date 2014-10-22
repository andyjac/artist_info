$(document).ready(function() {
  $('.albums').hide();
  $('.artist').hover(function() {
    $('.albums').slideToggle('slow');
  });
});

$(document).ready(function() {
  $('*').mouseup(function() {
    var text = window.getSelection().toString();
    console.log(text);
  });
});
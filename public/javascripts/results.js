function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (message, album, artist, albums) {
buf.push("<div class=\"E8D9D785-6A04-49B5-9B3C-978BEAC8C2CC\">");
if ( message)
{
buf.push("<h3 class=\"error\">" + (jade.escape(null == (jade_interp = message) ? "" : jade_interp)) + "</h3>");
}
else if ( album)
{
buf.push("<p class=\"artist\">" + (jade.escape(null == (jade_interp = 'Top album for ' + artist + ':') ? "" : jade_interp)) + "</p><ol class=\"albumList\"><li>" + (jade.escape(null == (jade_interp = album) ? "" : jade_interp)) + "</li></ol>");
}
else
{
buf.push("<p class=\"artist\">" + (jade.escape(null == (jade_interp = 'Top albums for ' + artist + ':') ? "" : jade_interp)) + "</p><ol class=\"albumList\">");
// iterate albums
;(function(){
  var $$obj = albums;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var album = $$obj[$index];

buf.push("<li>" + (jade.escape(null == (jade_interp = album) ? "" : jade_interp)) + "</li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var album = $$obj[$index];

buf.push("<li>" + (jade.escape(null == (jade_interp = album) ? "" : jade_interp)) + "</li>");
    }

  }
}).call(this);

buf.push("</ol>");
}
buf.push("</div>");}.call(this,"message" in locals_for_with?locals_for_with.message:typeof message!=="undefined"?message:undefined,"album" in locals_for_with?locals_for_with.album:typeof album!=="undefined"?album:undefined,"artist" in locals_for_with?locals_for_with.artist:typeof artist!=="undefined"?artist:undefined,"albums" in locals_for_with?locals_for_with.albums:typeof albums!=="undefined"?albums:undefined));;return buf.join("");
}

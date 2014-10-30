function compiledJade(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (artist, albums) {
buf.push("<h2 class=\"artist\">" + (jade.escape(null == (jade_interp = 'Top albums for ' + artist + ':') ? "" : jade_interp)) + "</h2><h2 class=\"albums\"><ol class=\"albumList\">");
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

buf.push("</ol></h2>");}.call(this,"artist" in locals_for_with?locals_for_with.artist:typeof artist!=="undefined"?artist:undefined,"albums" in locals_for_with?locals_for_with.albums:typeof albums!=="undefined"?albums:undefined));;return buf.join("");
}

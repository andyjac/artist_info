var pageMod = require('sdk/page-mod');
var data = require('sdk/self').data;

pageMod.PageMod({
  include: '*',
  contentStyleFile: data.url('style.css'),
  contentScriptFile: [data.url('jquery-1.11.1.js'),
                      data.url('./runtime.js'),
                      data.url('./album_box_template.js'),
                      data.url('./display_album_info_box.js')]
});

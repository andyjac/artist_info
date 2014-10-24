var express = require('express');
var bodyParser = require('body-parser');
var postSearchHandler = require('./post_search_handler');
var getRootHandler = require('./get_root_handler');

var app = express();

app.set('views', './views');
app.set('view engine', 'jade');
// set app to use the bodyParser module to parse a url encoded body response from a request
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.get('/search', postSearchHandler);
app.get('/', getRootHandler);

app.listen(3000);

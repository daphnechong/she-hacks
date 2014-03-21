var express = require('express')
var app = express();

app.set('port', '3000');
app.use(express.logger("dev"));
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
app.use(app.router);
app.use(express.static(__dirname + '/public'));
app.use(express.errorHandler());

app.get('/', function(req, res) {
  res.render('home');
});

app.get('/admin', function(req, res) {
  res.render('admin');
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
var express = require('express');
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(3000);
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

io.sockets.on('connection', function(socket) {
	socket.on('update', function (data) {
	    io.sockets.emit('update', data);
	});
});



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
	    socket.broadcast.emit('update', data);
	});

	socket.on('addPoint', function(data) {
		socket.broadcast.emit('addPoint', data)
	})

	socket.on('drawPolygon', function(data) {
		socket.broadcast.emit('drawPolygon', data)
	})

	socket.on('registerVolunteer', function(data) {
// potentially add the socket to a channel, and/or keep track of the id so you can PM the volunteer

// http://stackoverflow.com/questions/6563885/socket-io-how-do-i-get-a-list-of-connected-sockets-clients
// 		io.sockets.on('connection',function(socket){ 
//     io.sockets.sockets['nickname'] = socket.id;
//     client.on("chat", function(data) {      
//         var sock_id = io.sockets.sockets['nickname']
//         io.sockets.sockets[sock_id].emit("private", "message");
//     });    
// });

		io.sockets.emit('registerVolunteer', data)
	})
});



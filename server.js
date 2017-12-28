var express = require('express');
var http = require('http')
var app = express();
var server = http.createServer(app);
var morgan = require('morgan');
var io = require('socket.io').listen(server);
var path = require('path');


app.use(morgan('combined'));

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, '/public/html/index.html'));
});

//www.example.com/public/?filePath=js/jquery.js
app.get('/public', function(req, res){
	res.sendFile(path.join(__dirname, '/public/', req.query.filePath));
});

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(){
	  console.log('user disconnected');
	});
	socket.on('drawing', function(coordinates){
		//console.log('coordinates:'+coordinates);
		io.emit('drawing', coordinates);
	});
});
  

var port = 8001;
server.listen(port, function(){
  console.log('PAPYRUS up and running on 8001!');
});
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var app = express();

app.use(morgan('combined'));

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, '/public/html/index.html'));
});

//www.example.com/public/?filePath=js/jquery.js
app.get('/public', function(req, res){
	res.sendFile(path.join(__dirname, '/public/', req.query.filePath));
});


var port = 8001;
app.listen(port, function(){
  console.log('PAPYRUS up and running on 8001!');
});
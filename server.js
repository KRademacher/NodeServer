var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var routes_v1 = require('./api/routes_v1');

var app = express();

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(logger('dev'));

app.use('*', function(req, res, next){
	res.contentType('application/json');
	console.log('Added content type');
	next();
});

app.use('/api*', function(req, res, next){
	console.log('Called /api');
	next();
});

app.use('/api/v1', routes_v1);

app.use('*', function(req, res, next){
	res.status(200);
	res.json({Error: 'No matching endpoint'});
	res.end();
});

app.use('*', function(err, req, res, next){
	console.log('Error: ' + err);
	res.status(404).json({error: err}).end();
});

app.listen(process.env.PORT || 3000, function(){
  console.log('Server listens on port 3000');
});

module.exports = app;
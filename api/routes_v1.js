var express = require('express');
var routes = express.Router();

var myObject = {
 mytext: 'Hello world!'
};

routes.get('/hello', function(req, res){
 res.contentType('application/json');
 res.status(200);
 res.json(myObject);
});

routes.post('/hello', function(req, res){
	var body = req.body;
	console.dir(body);
 res.contentType('application/json');
 res.status(200);
 res.json(myObject);
});

routes.get('/goodbye', function(req, res){
 res.contentType('application/json');
 res.status(200);
 res.json({ 'tekst': 'Goodbye!'});
});

module.exports = routes;
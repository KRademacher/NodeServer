function removeFromArray(array, element) {
	return array.filter(e => e !== element);
}

var express = require('express');
var routes = express.Router();

var names = ["Jan", "Kees", "Piet"];
var myObject = {
 myText: 'Hello world!'
};

routes.get('/hello', function(req, res){
 res.contentType('application/json');
 res.status(200);
 res.json(myObject);
});

routes.post('/hello', function(req, res){
	console.dir(req.body);
 res.contentType('application/json');
 res.status(200);
 res.json(myObject);
});

routes.get('/goodbye', function(req, res){
 res.contentType('application/json');
 res.status(200);
 res.json({ 'tekst': 'Goodbye!'});
});

routes.post('/post', function(req, res) {
	console.log(req.body);
	var name = req.body.name;
	names.push(name);
	res.contentType('application/json');
	res.status(200);
	res.json({'names': names});
});

routes.delete('/delete', function(req, res) {
	console.log(req.body);
	var name = req.body.name;
	removeFromArray(names, name);
	res.contentType('application/json');
	res.status(200);
	res.json({'names': names});
});

module.exports = routes;

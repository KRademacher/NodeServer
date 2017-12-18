function removeFromArray(array, element) {
	return array.filter(e => e !== element);
}

var express = require('express');
var routes = express.Router();

var names = ["Jan", "Kees", "Piet"];
var jsonObject = {
	Hello: 'world!'
};

routes.get('/hello', function(req, res){
	res.status(200);
	res.json(jsonObject);
});

routes.post('/hello', function(req, res){
	console.dir(req.body);
	res.status(200);
	res.json(jsonObject);
});

routes.get('/goodbye', function(req, res){
	res.status(200);
	res.json({ 'tekst': 'Goodbye!'});
});

routes.get('/get', function(req, res){
	res.status(200);
	res.json({names: names});
});

routes.post('/post', function(req, res) {
	console.log(req.body);
	var name = req.body.name;
	names.push(name);
	res.status(200);
	res.json({names: names});
});

routes.delete('/delete', function(req, res) {
	console.log(req.body);
	var name = req.body.name;
	removeFromArray(names, name);
	res.status(200);
	res.json({names: names});
});

routes.get('/error', function(reg, res, next) {
	res.status(404);
	next('An error has occured.');
});

routes.get('*', function(reg, res, next) {
	res.status(404);
	res.json({Error: 'Endpoint nonexistent'}).end();
});

module.exports = routes;

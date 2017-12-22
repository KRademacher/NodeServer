var express = require('express');
var routes = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
	host : 'localhost',
	user : 'todolist_user',
	password : 'secret',
	database : 'todolist'
});

var names = ["Jan", "Kees", "Piet"];
var jsonObject = {
	Hello: 'world!'
};

function removeFromArray(array, element) {
	return array.filter(e => e !== element);
}

connection.connect();

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

routes.get('/db', function(req, res) {
	
	connection.query('SELECT * FROM todos', function(error, results, field) {
		if(error) {
			next(error);
		} else {
			res.status(200);
			res.json(results);
			res.end();
		}
	});
});

routes.get('/db/:id', function(req, res) {
	const id = req.params.id;
	console.log(req.body);
	
	connection.query('SELECT * FROM todos WHERE ID = ' + id, function(error, result, field) {
		if(error) {
			next(error);
		} else {
			res.status(200);
			res.json(result);
			res.end();
		}
	});
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
// NODE JS WEB server - EXPRESS
var express = require('express');
// PARSER TO PARSE REQUEST BODY
var  parser  = require('body-parser');

// Mongoose
var mongoose  = require('mongoose');
var dbSchema  = require('./mongooseSchemas');

let server = express();
server.set('port',8081);

// Configuration to make use of Parser JSON Functionality
server.use(parser.json());

let dbHost = 'mongodb://localhost:27017';
mongoose.connect(dbHost);

//Connect
mongoose.connection;


server.listen(server.get('port'), function(){
	console.log('Server running: localhost:'+server.get('port'));
});

// USER
/*
* POST: create new user
* */
server.post("/user", function(req,res){
	var user = new dbSchema.User({
		username: req.body.username,
		password: req.body.password
	});
	
	user.save(function(err,result){
		if(err) res.status(500).send({ error: 'post new user filed!' });
		res.json({
			user:result
		});
	});
});

/*
* GET: get all users
* */
server.get('/user',function(req,res){
	dbSchema.User.find({}, function(err, result){
		if(err) res.status(500).send({ error: 'get user list filed!' });
		res.json(result);
	});
});

/*
* GET: get one user by _id
* */
server.get('/user/:_id',function(req,res){
	dbSchema.User.findById(req.params._id, function(err, result){
		if(err) res.status(500).send({ error: 'get user with id: '+ req.params._id+' filed!' });
		res.json(result);
	});
});

/*
* GET: get one user by name
* */
server.get('/user/:name',function(req,res){
	dbSchema.User.findOne(req.params.name, function(err, result){
		if(err) res.status(500).send({ error: 'get user with name: '+req.params.name +'filed!' });
		res.json(result);
	});
});

/*
* PUT: update user
* */
server.put('/user/:_id', function (req,res) {
	dbSchema.User.findByIdAndUpdate(req.params._id, function (err,result) {
		if ( err ) res.status(500).send({ error: 'put user with id: '+req.params._id +'filed!' });
		res.json({
			message:"Successfully updated the user",
			user : result
		});
	});
});

/*
* DELETE: delete user
* */

server.delete('/user/:_id', function (req, res) {
	dbSchema.User.findByIdAndRemove({_id: req.params._id}, function (err, result) {
		if ( err ) res.status(500).send({ error: 'delete user with id: '+req.params._id +'filed!' });
		res.json({
			message: "Successfully deleted the user",
			user: result
		});
	});
});



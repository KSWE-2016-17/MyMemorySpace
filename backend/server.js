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
	dbSchema.User.findById(req.params._id, function(err, result){
		if(err) res.status(500).send({ error: 'get user with id: '+req.params._id +'filed!' });
		if(!result){
			res.json({
				message:"User with id: " + req.params._id+" not found."
			});
		}
		result.username = req.body.username;
		result.password = req.body.password;
		
		result.save(function (err, result) {
			if(err) result.status(500).send({ error: 'save user with id: '+req.params._id +'filed!' });
			res.json({
				message:"Successfully updated the user",
				user: result
			});
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

//ROOM
/*
 * POST: create new room
 * */
server.post("/room", function(req,res){
	var room = new dbSchema.Room({
		user_id: req.body.user_id,
		roomname: req.body.roomname,
		walls: req.body.walls,
		sky: req.body.sky,
		light: req.body.light,
		mediaobject: req.body.mediaobject
	});

	room.save(function(err,result){
		if(err) res.status(500).send({ error: 'post new room filed!' });
		res.json({
			room:result
		});
	});
});

/*
 * GET: get all rooms
 * */
server.get('/room',function(req,res){
	dbSchema.Room.find({}, function(err, result){
		if(err) res.status(500).send({ error: 'get room list filed!' });
		res.json(result);
	});
});

/*
 * GET: get one room by _id
 * */
server.get('/room/:_id',function(req,res){
	dbSchema.Room.findById(req.params._id, function(err, result){
		if(err) res.status(500).send({ error: 'get room with id: '+ req.params._id+' filed!' });
		res.json(result);
	});
});

/*
 * GET: get one room by user_id
 * */
server.get('/room/:user_id',function(req,res){
	dbSchema.Room.find({"user_id": req.params.user_id}, function(err, result){
		if(err) res.status(500).send({ error: 'get rooms with user id: '+req.params.user_id +'filed!' });
		res.json(result);
	});
});

/*
 * PUT: update room
 * */
server.put('/room/:_id', function (req,res) {
	dbSchema.Room.findById(req.params._id, function(err, result){
		if(err) res.status(500).send({ error: 'get room with id: '+req.params._id +'filed!' });
		if(!result){
			res.json({
				message:"Room with id: " + req.params._id+" not found."
			});
		}
		result.user_id=req.body.user_id;
		result.roomname=req.body.roomname;
		result.walls=req.body.walls;
		result.sky=req.body.sky;
		result.light=req.body.light;
		result.mediaobject=req.body.mediaobject;
	

		result.save(function (err, result) {
		if(err) result.status(500).send({ error: 'save room with id: '+req.params._id +'filed!' });
		res.json({
			message:"Successfully updated the room",
			room: result
			});
		});
	});
});

/*
 * DELETE: delete room
 * */

server.delete('/room/:_id', function (req, res) {
	dbSchema.Room.findByIdAndRemove({_id: req.params._id}, function (err, result) {
		if ( err ) res.status(500).send({ error: 'delete room with id: '+req.params._id +'filed!' });
		res.json({
			message: "Successfully deleted the room",
			room: result
		});
	});
});



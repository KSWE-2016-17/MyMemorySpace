// NODE JS WEB server - EXPRESS
import express from 'express';
// PARSER TO PARSE REQUEST BODY
import parser from 'body-parser';

// Mongoose
import mongoose from 'mongoose';
import dbShema from './mongooseSchemas';

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
	var user = new dbShema.User({
		username: req.body.username,
		password: req.body.password
	});
	
	user.save(function(err,result){
		if(err) throw err;
		res.json({
			user:result
		});
	});
});

/*
* GET: get all users
* */
server.get('/userlist',function(req,res){
	dbShema.User.find({}, function(err,result){
		if(err) throw err;
		res.json(result);
	});
});

/*
* GET: get one user by _id
* */
server.get('/user/:_id',function(req,res){
	dbShema.User.findById(req.params._id, function(err,result){
		if(err) throw err;
		res.json(result);
	});
});

/*
* GET: get one user by name
* */
server.get('/user/:name',function(req,res){
	dbShema.User.findOne(req.params.name, function(err,result){
		if(err) throw err;
		res.json(result);
	});
});

/*
* PUT: update user
* */
server.put('/user/:_id', function (req,res) {
	User.
	dbShema.User.findByIdAndUpdate(req.params._id, function (err,result) {
		if ( err ) throw err;
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
	dbShema.User.findByIdAndRemove({_id: req.params._id}, function (err, result) {
		res.json({
			message: "Successfully deleted the user",
			user: result
		});
	});
});



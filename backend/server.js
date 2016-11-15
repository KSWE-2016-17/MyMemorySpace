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

// ADD NEW USER
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

// GET
server.get('/user',function(req,res){
	dbShema.User.find({}, function(err,result){
		if(err) throw err;
		res.json(result);
	});
});





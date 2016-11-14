// NODE JS WEB server - EXPRESS
var express = require('express');
// PARSER TO PARSE REQUEST BODY
var parser = require('body-parser');

// Mongoose
var mongoose = require('mongoose');

var server = express();
server.set('port',8081);

// Configuration to make use of Parser JSON Functionality
server.use(parser.json());

var dbHost = 'mongodb://localhost:27017';
mongoose.connect(dbHost);

var userSchema = new mongoose.Schema({
    username: {type: String, trim: true},
    password: {type: String, trim: true}
});

var User = mongoose.model('User',userSchema);

//Connect
mongoose.connection;


server.listen(server.get('port'), function(){
	console.log('Server running: localhost:'+server.get('port'));
});

// ADD NEW USER
server.post("/user", function(req,res){
	var user = new User({
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
	User.find({}, function(err,result){
		if(err) throw err;
		res.json(result);
	});
});





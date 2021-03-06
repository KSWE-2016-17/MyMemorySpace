// NODE JS WEB server - EXPRESS
var express = require('express');
// PARSER TO PARSE REQUEST BODY
var  parser  = require('body-parser');

require('cors');
// Mongoose
var mongoose  = require('mongoose');
var dbSchema  = require('./mongooseSchemas');

let server = express();
server.set('port',8081);

// Configuration to make use of Parser JSON Functionality
server.use(parser.text());

// Multer
var multer = require('multer');
//var tempStorage = multer.memoryStorage();
//var upload = multer({storage: tempStorage});
var tempDest = './tempData/';
var tempFilename = 'tempFilename';
var upload = multer({dest: tempDest});

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let dbHost = 'mongodb://localhost:27017';
mongoose.connect(dbHost);

//Connect
var dbConnection =  mongoose.connection;

//GridFS
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var gfs = Grid(dbConnection.db);
var fs = require('fs');	

server.listen(server.get('port'), function(){
	console.log('Server running: localhost:'+server.get('port'));
});

// USER
/*
* POST: create new user
* */
server.post("/user", function(req,res){
	let reqbody = JSON.parse(req.body);
	var user = new dbSchema.User({
		username: reqbody.username,
		password: reqbody.password
	});
	
	user.save(function(err,result){
		if(err) res.status(500).send(JSON.stringify({ error: 'post new user filed!' }));
		res.send(JSON.stringify({
			user:result
		}));
	});
});

/*
* GET: get all users
* */
server.get('/user',function(req,res){
	dbSchema.User.find({}, function(err, result){
		if(err) res.status(500).send(JSON.stringify({ error: 'get user list filed!' }));
		res.send(JSON.stringify(result));
	});
});

/*
* GET: get one user by _id
* */
server.get('/user/:_id',function(req,res){
	dbSchema.User.findById(req.params._id, function(err, result){
		if(err) res.status(500).send(JSON.stringify({ error: 'get user with id: '+ req.params._id+' filed!' }));
		res.send(JSON.stringify(result));
	});
});

/*
* GET: get one user by name
* */
server.get('/user/name/:name',function(req,res){
	dbSchema.User.findOne({username: req.params.name}, function(err, result){
		if(err) res.status(500).send(JSON.stringify({ error: 'get user with name: '+req.params.name +'filed!' }));
		res.send(JSON.stringify(result));
	});
});

/*
* PUT: update user
* */
server.put('/user/:_id', function (req,res) {
	dbSchema.User.findById(req.params._id, function(err, result){
		if(err) res.status(500).send(JSON.stringify({ error: 'get user with id: '+req.params._id +'filed!' }));
		if(!result){
			res.send(JSON.stringify({
				message:"User with id: " + req.params._id+" not found."
			}));
		}
		let reqbody = JSON.parse(req.body);
		result.username = reqbody.username;
		result.password = reqbody.password;
		
		result.save(function (err, result) {
			if(err) result.status(500).send(JSON.stringify({ error: 'save user with id: '+req.params._id +'filed!' }));
			res.send(JSON.stringify({
				message:"Successfully updated the user",
				user: result
			}));
		});
	});
});

/*
* DELETE: delete user
* */

server.delete('/user/:_id', function (req, res) {
	dbSchema.User.findByIdAndRemove({_id: req.params._id}, function (err, result) {
		if ( err ) res.status(500).send(JSON.stringify({ error: 'delete user with id: '+req.params._id +'filed!' }));
		res.send(JSON.stringify({
			message: "Successfully deleted the user",
			user: result
		}));
	});
});

//ROOM
/*
 * POST: create new room
 * */
server.post("/room", function(req,res){
	let reqbody = JSON.parse(req.body);
	var room = new dbSchema.Room({
		user_id: reqbody.user_id,
		roomname: reqbody.roomname,
		walls: reqbody.walls,
		sky: reqbody.sky,
		light: reqbody.light,
		mediaobjects: reqbody.mediaobjects
	});

	room.save(function(err,result){
		if(err) res.status(500).send(JSON.stringify({ error: 'post new room filed!' }));
		res.send(JSON.stringify({
			room:result
		}));
	});
});

/*
 * GET: get all rooms
 * */
server.get('/room',function(req,res){
	dbSchema.Room.find({}, function(err, result){
		if(err) res.status(500).send(JSON.stringify({ error: 'get room list filed!' }));
		res.send(JSON.stringify(result));
	});
});

/*
 * GET: get one room by _id
 * */
server.get('/room/:_id',function(req,res){
	dbSchema.Room.findById({_id: req.params._id}, function(err, result){
		if(err) res.status(500).send(JSON.stringify({ error: 'get room with id: '+ req.params._id+' filed!' }));
		res.send(JSON.stringify(result));
	});
});

/*
 * GET: get one room by user_id
 * */
server.get('/room/by_user/:user_id',function(req,res){
	dbSchema.Room.find({"user_id": req.params.user_id}, function(err, result){
		if(err) res.status(500).send(JSON.stringify({ error: 'get rooms with user id: '+req.params.user_id +'filed!' }));
		res.send(JSON.stringify(result));
	});
});

/*
 * PUT: update room
 * */
server.put('/room/:_id', function (req,res) {
	dbSchema.Room.findById(req.params._id, function(err, result){
		if(err) res.status(500).send(JSON.stringify({ error: 'get room with id: '+req.params._id +'filed!' }));
		if(!result){
			res.send(JSON.stringify({
				message:"Room with id: " + req.params._id+" not found."
			}));
		}
		let reqbody = JSON.parse(req.body);
		result.user_id=reqbody.user_id;
		result.roomname=reqbody.roomname;
		result.walls=reqbody.walls;
		result.sky=reqbody.sky;
		result.light=reqbody.light;
		result.mediaobjects=reqbody.mediaobjects;
	


		result.save(function (err, result) {
		if(err) result.status(500).send(JSON.stringify({ error: 'save room with id: '+req.params._id +'filed!' }));
		res.send(JSON.stringify({
			message:"Successfully updated the room",
			room: result
			}));
		});
	});
});

/*
 * DELETE: delete room
 * */

server.delete('/room/:_id', function (req, res) {
	dbSchema.Room.findByIdAndRemove({_id: req.params._id}, function (err, result) {
		if ( err ) res.status(500).send(JSON.stringify({ error: 'delete room with id: '+req.params._id +'filed!' }));
		res.send(JSON.stringify({
			message: "Successfully deleted the room",
			room: result
		}));
	});
});

//MEDIAFILE
/*
 * POST: create new mediafile
 * */
server.post("/mediafile/:user_id",upload.single(tempFilename) ,function(req,res){
	console.log(req.params.user_id);
	try{
		var userid = mongoose.Types.ObjectId(req.params.user_id);
	} catch(err) {
		console.log(err);
	}
	var newfie_id;
	var newfilename = req.params.user_id.concat("/").concat(req.file.originalname);
	var writeStream = gfs.createWriteStream({
		filename: newfilename
	})
	fs.createReadStream(req.file.path).pipe(writeStream);
	writeStream.on('close', function (file) {
        console.log(file._id + ' Written To DB');
		try{
			newfie_id= new mongoose.Types.ObjectId(file._id);
		} catch(err) {
			console.log(err);
		}
		var mediafile = new dbSchema.Mediafile({
			user_id: userid,
			src: newfie_id,
			mimetype: req.file.mimetype
		});
		console.log(mediafile);
		/**/mediafile.save(function(err,result){
			if(err) {

				res.status(500).send(JSON.stringify({ error: 'post new mediafile filed!' }));
				console.log(err);
			}
			res.send(JSON.stringify({
				mediafile:result
			}));
			console.log(file._id + ' Written To DB');
		});
	});

});

/*
 * GET: get all mediafiles in db
 * */

server.get('/mediafile',function(req,res){
	dbSchema.Mediafile.find({}, function(err, result){
		if(err) res.status(500).send(JSON.stringify({ error: 'get mediafile list filed!' }));
		res.send(JSON.stringify(result));
	});
});

/*
 * GET: get all mediafiles by user_id
 * */
server.get('/mediafile/by_user/:user_id',function(req,res){
	dbSchema.Mediafile.find({user_id : req.params.user_id}, function(err, result){
		if(err) res.status(500).send(JSON.stringify({ error: 'get mediafile list filed!' }));
		res.send(JSON.stringify(result));
	});
});

/*
 * GET: get all mediafiles by _id
 * */
server.get('/mediafile/:_id',function(req,res){
	dbSchema.Mediafile.findById(req.params._id, function(err, result){
		if(err) res.status(500).send(JSON.stringify({ error: 'get mediafile with id: ' + req.params._id +'filed!' }));
		res.send(JSON.stringify(result));
	});
});

/*
 * GET: get file by _id
 * */
server.get('/mediafile/file/:_id',function(req,res){
	var id = req.params._id;
	gfs.findOne({_id: req.params._id}, function (err, file) {
		if (err) {return res.status(500).send(err);}

		if (!file) {return res.status(404).send('file not found'); console.log("file not found")}
		console.log(file.contentType);
		res.set('Content-Type', file.contentType);
		res.set('Content-Disposition', 'attachment; filename=' + file.filename + '' );
		var readstream = gfs.createReadStream({
			_id: file._id
		});
		readstream.on("error", function (err) {
			console.log("Got error while processing stream " + err.message);
			res.end();
		});
		readstream.pipe(res);
	});

});

/*
 * DELETE: delete mediafile
 * */

server.delete('/mediafile/:_id', function (req, res) {
	var src = {"_id":""};
	dbSchema.Mediafile.findById({_id: req.params._id}, function (err, result) {
		if ( err ) res.status(500).send(JSON.stringify({ error: 'delete mediafile with id: '+req.params._id +'filed!' }));
		console.log("DELETING");
		console.log(result.src);
		src._id = result.src;

		console.log(src);
		gfs.remove(src, function (err, result) {
			if ( err ) res.status(500).send(JSON.stringify({ error: 'delete file with id: '+ result.src +'filed!' }));
			dbSchema.Mediafile.findByIdAndRemove(req.params._id, function (err) {
				if ( err ) res.status(500).send(JSON.stringify({ error: 'delete mediafile with id: '+ req.params._id +'filed!' }));
			});
		});
		res.json({
			message: "Successfully deleted the mediafile",
			mediafile: result
		});
	});



});




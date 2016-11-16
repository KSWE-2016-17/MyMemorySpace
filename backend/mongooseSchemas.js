
var mongoose = require( 'mongoose');

var userSchema = new mongoose.Schema({
    username: {type: String, trim: true},
    password: {type: String, trim: true}
});

var positionSchema=new mongoose.Schema({
    x: Number,
    y: Number,
    z: Number
});
var lightSchema=new mongoose.Schema({
    position: positionSchema,
    angle: Number,
    color: String,
    intensity: Number,
    type: String
});
var mediafileSchema=new mongoose.Schema({
    src: String,
    type: String,
});

var mediaobjectSchema = new mongoose.Schema({
	position: positionSchema,
	width: Number,
    height: Number,
    depth: Number,
	rotation: positionSchema,
    scale: positionSchema,
	color: String,
    visible: Boolean,
	mediafile: mediafileSchema
	
});

var wallSchema=new mongoose.Schema({
    position: positionSchema,
    width: Number,
    height: Number,
    depth: Number,
    rotation: positionSchema,
    color: String,
    textur: mediafileSchema,
    visible: Boolean

});
var roomSchema=new mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    roomname: String,
    walls: [wallSchema],
    sky: mediafileSchema,
    light: lightSchema,
    mediaobjects: [mediaobjectSchema]
});

var User = mongoose.model('User', userSchema);
var Room = mongoose.model('Room', roomSchema);
var Mediafile = mongoose.model('Mediafile', mediafileSchema);

module.exports = {
    User: User,
    Room: Room,
    Mediafile: Mediafile
}
/**
 * Created by xenia on 10.11.16.
 */
import mongoose from 'mongoose';

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


});
var wallSchema=new mongoose.Schema({

});
var roomSchema=new mongoose.Schema({

});
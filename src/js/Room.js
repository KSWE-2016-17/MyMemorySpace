var Room = function(room_obj){
    this.id=room_obj.id;
    this.user_id=room_obj.user_id;
    this.roomname=room_obj.roomname;
    this.walls=room_obj.walls;
    this.sky=room_obj.sky;
    this.light=room_obj.light;
    this.mediafile=room_obj.mediaobjects;
};

exports.default =Room;
module.exports = exports.default;
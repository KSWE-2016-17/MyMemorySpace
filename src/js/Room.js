var Room = function(id, user_id, roomname, walls, sky, light, mediaobjects){
    this.id=id;
    this.user_id=user_id;
    this.roomname=roomname;
    this.walls=walls;
    this.sky=sky;
    this.light=light;
    this.mediafile=mediaobjects;
};

exports.default =Room;
module.exports = exports.default;
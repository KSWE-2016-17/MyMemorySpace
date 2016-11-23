var Mediafile = function(id, user_id, src, mimetype){
    this.id=id;
    this.user_id=user_id;
    this.src = src;
    this.mimetype=mimetype;
};

exports.default =Mediafile;
module.exports = exports.default;
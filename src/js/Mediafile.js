var Mediafile = function(mediafile_obj){
    this.id=mediafile_obj.id;
    this.user_id=mediafile_obj.user_id;
    this.src = mediafile_obj.src;
    this.mimetype=mediafile_obj.mimetype;
};

exports.default =Mediafile;
module.exports = exports.default;
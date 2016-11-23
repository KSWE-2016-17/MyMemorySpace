var Wall= function(wall_obj){
    this.id=wall_obj.id;
    this.position==wall_obj.position;
    this.width==wall_obj.width;
    this.height==wall_obj.height;
    this.depth==wall_obj.depth;
    this.rotation==wall_obj.rotation;
    this.color==wall_obj.color;
    this.textur==wall_obj.textur;
    this.visible=wall_obj.visible;
};

exports.default =Wall;
module.exports = exports.default;

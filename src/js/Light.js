var Light= function(light_obj){
    this.id=light_obj.id;
    this.position==light_obj.position;
    this.angle==light_obj.angle;
    this.color==light_obj.color;
    this.intensity==light_obj.intensity;
    this.type=light_obj.type;
};

exports.default =Light;
module.exports = exports.default;

export default class Light{
    constructor(light_obj){
        this._id=light_obj._id;
        this.position==light_obj.position;
        this.angle==light_obj.angle;
        this.color==light_obj.color;
        this.intensity==light_obj.intensity;
        this.type=light_obj.type;
    }
}
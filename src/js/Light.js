import Position from "./Position";
export default class Light{
    constructor(light_obj){
        if(light_obj){
            this._id=light_obj._id;
            this.position=light_obj.position;
            this.angle=light_obj.angle;
            this.color=light_obj.color;
            this.intensity=light_obj.intensity;
            this.type=light_obj.type;
        } else {
            this.setDefaults();
        }

    }
    setDefaults(){
        this._id = null;
        this.position = new Position({x:0,y:0,z:0});
        this.angle =0;
        this.color = '#fff';
        this.intensity = 1.0;
        this.type = 'ambient';
    }
}
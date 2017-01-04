import Position from "./Position";
import q from "q"
export default class Wall {
    constructor(wall_obj, direction){
        if(wall_obj){
            this._id=wall_obj._id;
            this.position=wall_obj.position;
            this.width=wall_obj.width;
            this.height=wall_obj.height;
            this.depth=wall_obj.depth;
            this.rotation=wall_obj.rotation;
            this.color=wall_obj.color;
            this.textur=wall_obj.textur;
            this.visible=wall_obj.visible;
        } else {
            getDefaults(direction);
        }

    }
    setDefaults(direction){
        this._id=null;
        this.width=2;
        this.height=40;
        this.depth=40;
        this.color='#fff';
        this.textur=null;
        this.visible=true;

        switch (direction){
            case 'right':
                this.position=new Position({x:20, y:0, z:0});
                this.rotation=new Position({x:0, y:0, z:0});
                break;
            case 'left':
                this.position=new Position({x:-20, y:0, z:0});
                this.rotation=new Position({x:0, y:0, z:0});
                break;
            case 'back':
                this.position=new Position({x:0, y:0, z:-20});
                this.rotation=new Position({x:0,y: 90, z:0});
                break;
            case 'front':
                this.position=new Position({x:0, y:0, z:20});
                this.rotation=new Position({x:0, y:90, z:0});
                break;
            case 'up':
                this.position=new Position({x:0,y: 40, z:0});
                this.rotation=new Position({x:90,y: 0,z: 0});
                break;
            case 'down':
                this.position=new Position({x:0, y:-10, z:0});
                this.rotation=new Position({x:90, y:0,z: 0});
                break;
            default:
                this.position=new Position({x:0, y:0, z:0});
                this.rotation=new Position({x:0, y:0,z: 0});
                break;
        }

    }
}
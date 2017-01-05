import Position from "./Position";
import q from "q"
export default class Wall {
    constructor(wall_obj, direction){
        if(wall_obj){
            this.setId(wall_obj._id);
            if(wall_obj.direction){
                direction = wall_obj.direction;
            }
            this.setDefaultPosition(direction);
            this.setDefaultWidth();
            this.setDefaultHeight();
            this.setDefaultDepth();
            this.setDefaultRotation(direction);
            this.setColor(wall_obj.color);
            this.setTextur(wall_obj.textur);
            this.setVisible(wall_obj.visible);
            this.setDirection(direction);
        } else {
            this.setDefaults(direction);
        }

    }
    getDefaultPosition(direction){
        let position;
        switch (direction){
            case 'right':
                position=new Position({x:20, y:0, z:0});
                break;
            case 'left':
                position=new Position({x:-20, y:0, z:0});
                break;
            case 'back':
                position = this.position=new Position({x:0, y:0, z:-20});
                break;
            case 'front':
                position = this.position=new Position({x:0, y:0, z:20});
                break;
            case 'up':
                position=new Position({x:0,y: 40, z:0});
                break;
            case 'down':
                position=new Position({x:0, y:-10, z:0});
                break;
            default:
                position=new Position({x:0, y:0, z:0});
                break;
        }
        return position;
    }
    getDefaultRotation(direction){
        let rotation;
        switch (direction){
            case 'right':
                rotation=new Position({x:0, y:0, z:0});
                break;
            case 'left':
                rotation=new Position({x:0, y:0, z:0});
                break;
            case 'back':
                rotation=new Position({x:0,y: 90, z:0});
                break;
            case 'front':
                rotation=new Position({x:0, y:90, z:0});
                break;
            case 'up':
                rotation=new Position({x:90,y: 0,z: 0});
                break;
            case 'down':
                rotation=new Position({x:90, y:0,z: 0});
                break;
            default:
                rotation=new Position({x:0, y:0,z: 0});
                break;
        }
        return rotation;
    }
    setDefaultPosition(direction){
        this.position = this.getDefaultPosition(direction);
    }
    setDefaultRotation(direction){
        this.rotation = this.getDefaultRotation(direction);
    }
    getDefaultWidth(){
        return 2;
    }
    getDefaultHeight(){
        return 40;
    }
    getDefaultDepth(){
        return 40;
    }
    getDefaultColor(){
        return '#fff';
    }
    setDefaultWidth(){
        this.width= 2;
    }
    setDefaultHeight(){
        this.height =40;
    }
    setDefaultDepth(){
        this.depth =  40;
    }
    setDefaultColor(){
        this.color= '#fff';
    }

    setDefaults(direction){
        this._id=null;
        this.width=this.getDefaultWidth();
        this.height=this.getDefaultHeight();
        this.depth=this.getDefaultDepth();
        this.color=this.getDefaultColor();
        this.textur=null;
        this.visible=true;
        this.position = this.getDefaultPosition(direction);
        this.rotation = this.getDefaultRotation(direction);
    }
    setColor(color){
        if(color){
            this.color = color;
        } else {
            this.color = '#fff';
        }
    }

    getColor(){
        return this.color;
    }

    setVisible(visibility){
        if(visibility){
            this.visible = visibility;
        } else {
            this.visible = true;
        }

    }

    getVisible(){
        return this.visible;
    }

    setTextur(texture){
        if(texture){
            this.textur = texture;
        } else {
            this.textur = null;
        }

    }

    getTextur(){
        return this.textur;
    }

    setDirection(direction){
        if(direction){
            this.direction = direction;
        } else {
            this.direction = 'right';
        }
    }
    getDirection(){
        return this.direction;
    }
    setId(id){
        if(id){
            this._id = id;
        } else {
            this._id = null;
        }
    }
}
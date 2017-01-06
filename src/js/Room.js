import RoomService from "./services/RoomService";
import Wall from "./Wall";

import q from "q";

export default class Room {
    constructor(room_obj, user_id){
        if(room_obj){
            this.setId(room_obj._id);
            this.setUserId(room_obj.user_id);
            this.setRoomName(room_obj.roomname);
            this.setWalls(room_obj.walls);
            this.setSky(room_obj.sky);
            this.setLight(room_obj.light);
            this.setMediaobjects(room_obj.mediaobjects);
        } else {
            this.setDefaults(user_id);
        }
    }

    setId(id){
        if(id){
            this._id= id;
        } else {
            this._id=null;
        }
    }
    setUserId(userid){
        if(userid){
            this.user_id=userid;
        } else {
            this.user_id = null;
        }
    }
    setRoomName(name){
        if(name){
            this.roomname = name;
        } else {
            console.log("Room set default name");
            this.roomname = "New Room";
            console.log("room name: ", this.roomname);
        }
    }
    setWalls(walls){
        if(walls){
            walls.forEach((wall)=>{
                console.log("Room setWalls wall.direction", wall.getDirection());
                let newWall = this.getDefaultWall(wall.getDirection());
                newWall.setColor(wall.color);
                newWall.setTextur(wall.textur);
                newWall.setVisible(wall.visible);
            });

        } else{
           this.walls = [
               this.getDefaultWall("right"),
               this.getDefaultWall("left"),
               this.getDefaultWall("back"),
               this.getDefaultWall("front"),
               this.getDefaultWall("up"),
               this.getDefaultWall("down")
           ];
        }
    }
    setSky(sky){
        if(sky){
            this.sky = sky;
        } else {
            this.sky = null;
        }
    }
    setLight(light){
        if(light){
            this.light = light;
        } else {
            this.light = null;
        }
    }
    setMediaobjects(mediaobjects){
        if(mediaobjects){
            this.mediaobjects = mediaobjects;
        } else {
            this.mediaobjectsm = null;
        }
    }

    setDefaults(user_id){
        console.log("Room set Defaults");
        this.setId(user_id);
        this.setUserId(user_id);
        this.setRoomName();
        this.setWalls();
        this.setSky();
        this.setLight();
        this.setMediaobjects();
    }
    getDefaultWall(direction){
        return new Wall(null,direction);
    }
    loadFromDB(){

    }

}
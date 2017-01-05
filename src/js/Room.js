import RoomService from "./services/RoomService";
import Wall from "./Wall";

import q from "q";

export default class Room {
    constructor(room_obj, user_id){
        if(room_obj){
            this._id=room_obj._id;
            this.user_id=room_obj.user_id;
            this.roomname=room_obj.roomname;
            this.walls=room_obj.walls;
            this.sky=room_obj.sky;
            this.light=room_obj.light;
            this.mediaobjects=room_obj.mediaobjects;
        } else {
            this.setDefaults(user_id);
        }
    }

    setId(id){this._id= id;}
    setUserId(userid){this.user_id=userid;}

    setDefaults(){
        this._id=null;
        this.user_id=null;
        this.roomname="New Room";
        this.walls=[
            new Wall('right'), new Wall('left'), new Wall('back'), new Wall('front'), new Wall('up'), new Wall('down')
        ];
        this.sky=null;
        this.light=null
        this.mediaobjects=[];
    }

}
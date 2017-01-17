import RoomService from "./services/RoomService";
import Wall from "./Wall";

import q from "q";

export default class Room {
    constructor(room_obj, user_id){
        this.service = new RoomService();
        if(room_obj){
            this.setupRoom(room_obj);
        } else {
            this.setDefaults(user_id);
        }

    }
    setupRoom(room_obj){
        if(room_obj){
            this.setId(room_obj._id);
            this.setUserId(room_obj.user_id);
            this.setRoomName(room_obj.roomname);
            this.setWalls(room_obj.walls);
            console.log("Room ctor walls: ", this.walls);

            this.setSky(room_obj.sky);
            this.setLight(room_obj.light);
            this.setMediaobjects(room_obj.mediaobjects);
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
        console.log("Room setWalls walls: ", walls);
        this.walls = [];
        if(walls){
            walls.forEach((wall)=>{
                console.log("Room setWalls walls wall: ", wall);
                let newWall = this.getDefaultWall(wall.direction);
                newWall.setColor(wall.color);
                newWall.setTextur(wall.textur);
                newWall.setVisible(wall.visible);
                this.walls.push(newWall);
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
        this.setId();
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
        let defer = q.defer();
        if(!this._id){
            this.findRoomListByUser(this.user_id).then((data) =>{
                console.log("loadFromDB room list data: ", data[0]._id);
                if(data && data.length > 0){
                    //this._id = data[0]._id;
                    this.setupRoom(data[0]);
                    defer.resolve(this);
                }
            }).catch( (err) => {
                defer.resolve(null);
                console.log("loadFromDB findRoomListByUser error");
            });
        } else {
            console.log("2 loadFromDB room this._id: ", this._id);
            return this.findById();
        }
    }
    findById(){
        console.log('--------Room.findById: ', this._id);
        let defer = q.defer();
        if(!this._id){
             defer.resolve(null);
            return defer.promise;
        }
        this.service.findById(this._id).then((data) =>{
            if(data) {
                this.setupRoom(data);

            } else {
                defer.resolve(null);
            }
            console.log('findById() res this:', this);
            defer.resolve(this);
        }).catch((err) => {
            console.log('Room findById fehler: ' + err.toString());
            defer.reject(err);
        });
        return defer.promise;
    }
    findAllByUserId(user_id){
        console.log('--------Room.findAllByUserId: ');
        let rooms = [];
        let defer = q.defer();
        if(!user_id){
             defer.resolve(null);
            return defer.promise;
        }
        this.service.findByUser(user_id).then((data) =>{
            if(data) {
                data.forEach((room) => {
                    rooms.push(new Room(room, user_id));
                });
            }
            defer.resolve(rooms);
        }).catch((err) => {
            console.log('Room findAllByUserId fehler: ' + err.toString());
            defer.reject(err);
        });
        return defer.promise;
    }
    findRoomListByUser(user_id){
        console.log('--------Room.findRoomsListByUserId: ');
        let defer = q.defer();
        if(!user_id){
             defer.resolve(null);
            return defer.promise;
        }
        this.service.findByUser(user_id).then((data) =>{
            defer.resolve(data);
        }).catch((err) => {
            console.log('Room findRoomsListByUser fehler: ' + err.toString());
            defer.reject(err);
        });
        return defer.promise;
    }

    getId(){return this._id;}
    getUserId(){return this.user_id;}
    getRoomName(){return this.roomname;}
    getWalls(){return this.walls;}
    getSky(){return this.sky;}
    getLight(){return this.light;}
    getMediaobjects(){return this.mediaobjects;}

}
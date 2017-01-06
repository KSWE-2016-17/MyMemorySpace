import UserService from "./services/UserService";
import q from "q";

export default class User {
    constructor(user_obj){
        console.log("user ctor");
        console.log("data: ");
        console.log(user_obj);
        this.service=new UserService();
        if(user_obj){
            this._id=user_obj._id;
            this.username=user_obj.username;
            this.password = user_obj.password;
        } else {
            this.username='';
            this.password = '';
            this.password = null;
        }
    }
    setUsername(name){this.username = name;}
    setPassword(pw){this.password=pw;}
    setId(id){ this._id=id;}

    getUsername(){return this.username;}
    getPassword(){return this.password;}
    getId(){return this._id;}

    loadFromDB(){
        if(!this._id && this.username){
            return this.findByName();
        } else if (this._id){
            return this.findById();
        } else {
            return null;
        }
    }

    findByName(){
        console.log('--------User.findByName: ');
        let user = this;
        let defer = q.defer();
        this.service.findByName(this.username).then((data) =>{
            if(data) {
                if(data.password === user.password){
                    user._id=data._id;
                }
            } else {
                defer.resolve(null);
            }

            defer.resolve(user);
        }).catch((err) => {
            console.log('User findBaNam fehler: ' + err.toString());
            defer.reject(err);
        });
        return defer.promise;
    }
    findById(){
        console.log('--------User.findById: ');
        let user = this;
        let defer = q.defer();
        if(!this._id){
             defer.resolve(null);
            return defer.promise;
        }
        this.service.findById(this._id).then((data) =>{
            if(data) {
                user.username=data.username;
                user.password = data.password;
            } else {
                defer.resolve(null);
            }

            defer.resolve(user);
        }).catch((err) => {
            console.log('User findById fehler: ' + err.toString());
            defer.reject(err);
        });
        return defer.promise;
    }

}

import UserService from "./services/UserService";

export default class User {
    constructor(user_obj){
        console.log("user ctor");
        console.log("data: ");
        console.log(user_obj);
        if(user_obj){
            this._id=user_obj._id;
            this.username=user_obj.username;
            this.password = user_obj.password;
        } else {
            this.username='';
            this.password = '';
        }
    }
    setUsername(name){this.username = name;}
    setPassword(pw){this.password=pw;}
    setId(id){ this._id=id;}

    getUsername(){return this.username;}
    getPassword(){return this.password;}
    getId(){return this._id;}

}

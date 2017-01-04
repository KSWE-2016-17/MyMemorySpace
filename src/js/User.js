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
        console.log('--------User.loadFromDB: ');
        let user = this;
        let defer = q.defer();
        this.service.findByName(this.username).then((data) =>{
            console.log('User findByName: ');
            if(data) {
                if(data.password === user.password){
                    user._id=data._id;
                }
            } else {
                defer.resolve(null);
            }

            defer.resolve(user);
        }).catch((err) => {
            console.log('User LoadFromDB fehler: ' + err.toString());
            defer.reject(err);
        });
        return defer.promise;
    }

}

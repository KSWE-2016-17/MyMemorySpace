export default class User {
    constructor(user_obj){
        this.id=user_obj.id;
        this.username=user_obj.username;
        this.password = user_obj.password;
    }
}

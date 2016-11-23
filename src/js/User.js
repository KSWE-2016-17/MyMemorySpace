var User = function(user_obj){
    this.id=user_obj.id;
    this.username=user_obj.username;
    this.password = user_obj.password;
    this.token=user_obj.token;
};

exports.default =User;
module.exports = exports.default;

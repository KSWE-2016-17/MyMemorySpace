var User = function(id, username, password, token){
    this.id=id;
    this.username=username;
    this.password = password;
    this.token=token;
};

exports.default =User;
module.exports = exports.default;

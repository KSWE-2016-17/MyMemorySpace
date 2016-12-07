var DaoHelper = require("./DaoHelper")

var RoomDAO = function(connection){
    this.connection = connection;
    this.daoHelper = new DaoHelper();
};
RoomDAO.prototype.findAll= function(callbacks){
    return this.daoHelper.find(this.connection.getFullUrl() + "/room", callbacks);
};

RoomDAO.prototype.findByUser = function(user_id, callbacks){
    return this.daoHelper.find(this.connection.getFullUrl() + "/room/by_user/:"+ user_id, callbacks);
};

RoomDAO.prototype.findById = function(_id, callbacks){
    return this.daoHelper.find(this.connection.getFullUrl() + "/room/:"+ _id, callbacks);
};
RoomDAO.prototype.create = function(obj, callbacks) {
    return this.daoHelper.create(obj, this.connection.getFullUrl() + "/room", callbacks);
};
RoomDAO.prototype.update = function(obj, callbacks) {
    return this.daoHelper.update(obj, this.connection.getFullUrl() + "/room/:" + obj._id, callbacks);
};

FriendDAO.prototype.createOrUpdate = function(obj, callbacks) {
    if (obj._id) {
        return this.update(obj, this.connection.getFullUrl() + "/room/:" +  obj._id, callbacks);
    } else {
        return this.create(obj, this.connection.getFullUrl() + "/room", callbacks);
    }
};
FriendDAO.prototype.delete = function(obj, callbacks) {
    return this.daoHelper.delete(obj, this.connection.getFullUrl() + "/room/:" +  obj._id , callbacks);
};
exports.default = FriendDAO;
module.exports = exports.default;


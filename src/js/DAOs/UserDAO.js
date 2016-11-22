var DaoHelper = require ("./DaoHelper");

var UserDAO = function(connection){
	this.connection = connection;
	this.daoHelper = new DaoHelper();
};

// FIND - GET
UserDAO.prototype.findAll = function(callbacks){
	return this.daoHelper.find(this.connection.getFullUrl() + "/user", callbacks);
};

UserDAO.prototype.findByID = function(id,callbacks){
	return this.daoHelper.find(this.connection.getFullUrl() + "/user/"+id, callbacks);
};

UserDAO.prototype.findByName = function(name,callbacks){
	return this.daoHelper.find(this.connection.getFullUrl() + "/user/name/"+name, callbacks);
};

// CREATE - POST
UserDAO.prototype.create = function(obj,callbacks){
	return this.daoHelper.create(obj,this.connection.getFullUrl()+"/user", callbacks);
};

// UPDATE - PUT
UserDAO.prototype.update = function(obj,callbacks){
	return this.daoHelper.update(obj,this.connection.getFullUrl()+"/user/"+obj._id, callbacks);
};

// DELETE - DELETE 
UserDAO.prototype.delete = function(obj,callbacks){
	return this.daoHelper.delete(obj,this.connection.getFullUrl()+"/user/"+obj._id, callbacks);
};

exports.default = UserDAO;
module.exports = exports.default;

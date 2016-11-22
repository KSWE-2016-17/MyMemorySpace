// schalten und walten 
// \..../ \..../
//  \../   \../
//   \/     \/


var DaoHelper = require ("./DaoHelper");

var MediafileDAO = function(connection){
	this.connection = connection;
	this.daoHelper = new DaoHelper();
};

// FIND - GET
MediafileDAO.prototype.findAll = function(callbacks){
	return this.daoHelper.find(this.connection.getFullUrl()+"/mediafile", callbacks);
};

MediafileDAO.prototype.findByID = function(id,callbacks){
	return this.daoHelper.find(this.connection.getFullUrl()+"/mediafile/"+id, callbacks);
};

MediafileDAO.prototype.findByUserID = function(id,callbacks){
	return this.daoHelper.find(this.connection.getFullUrl()+"/mediafile/by_user/"+id, callbacks);
};

MediafileDAO.prototype.findFileByID = function(id,callbacks){
	return this.daoHelper.find(this.connection.getFullUrl()+"/mediafile/file/"+id, callbacks);
};
// CREATE - POST
MediafileDAO.prototype.create = function(obj,callbacks){
	return this.daoHelper.create(obj,this.connection.getFullUrl()+"/mediafile/"+obj._id, callbacks);
};
// UPDATE - PUT
//--
// DELETE - DELETE 
MediafileDAO.prototype.delete = function(obj,callbacks){
	return this.daoHelper.delete(obj,this.connection.getFullUrl()+"/mediafile/"+obj._id, callbacks);
};

exports.default = MediafileDAO;
module.exports = exports.default;

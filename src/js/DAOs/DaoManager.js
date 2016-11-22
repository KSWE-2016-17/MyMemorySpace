var DaoManager = function(){
    this.daos = {};
    this.connection = {
        protocol: "https",
        url: "localhost",
        port: "8081"
    };
    this.connection.getFullUrl = function() {
        var result = "";

        result += this.protocol + '//' + this.url + ':' + this.port;
        console.log("full url to server: " + result);
        return result;
    };
};

DaoManager.prototype.getDao = function(dao) {
    if (!this.daos[dao]) {
        this.daos[dao] = this.createDao(dao);
    }

    return this.daos[dao];
};

DaoManager.prototype.createDao = function(dao) {
    return new dao(this.connection);
};
exports.default = DaoManager;
module.exports = exports.default;

var q = require("q");

var DaoHelper = function() {};

DaoHelper.prototype.find = function(dest, callbacks) {
    var defer = q.defer();
    console.log("dao helper:" + dest);
    if (typeof $ === "function" && typeof $.ajax === "function") {
        $.ajax({
            url: dest,
            type: "GET",
            contentType: "text/plain"
        }).success(function(data, textStatus, jqXHR) {
            console.log("res data: "+ data);
            var jsonResponse = JSON.parse(data);
             console.log("jsonResponse: ");
            console.log(jsonResponse);

            if (callbacks && typeof callbacks.success === "function") {
                callbacks.success(jsonResponse);
            }
            defer.resolve(jsonResponse);
        }).error(function(jqXHR, textStatus, errorThrown) {
            if (callbacks && typeof callbacks.error === "function") {
                callbacks.error(errorThrown);
            }
            defer.reject(errorThrown);
        });
    } else {
        fetch(dest, {
            method: "GET",
            mode: "cors",
            headers: new Headers({
                "Content-Type": "text/plain"
            })
        }).then(function(response) {
            return response.json();
        }).then(function(jsonResponse) {

            if (callbacks && typeof callbacks.success === "function") {
                callbacks.success(jsonResponse);
            }
            defer.resolve(jsonResponse);
        }).catch(function(err) {
            if (callbacks && typeof callbacks.error === "function") {
                callbacks.error(err);
            }
            defer.reject(err);
        });
    }

    return defer.promise;
};

DaoHelper.prototype.create = function(obj, dest, callbacks) {
    var defer = q.defer();

    if (typeof $ === "function" && typeof $.ajax === "function") {
        $.ajax({
            url: dest,
            /*
             * If POST method doesn't work properly, try PUT method instead as
             * stated here: https://wiki.apache.org/couchdb/HTTP_Document_API#POST
             */
            type: "POST",
            contentType: "text/plain",
            data: JSON.stringify(obj)
        }).success(function(data, textStatus, jqXHR) {
            if (callbacks && typeof callbacks.success === "function") {
                callbacks.success(JSON.parse(data));
            }
            defer.resolve(JSON.parse(data));
        }).error(function(jqXHR, textStatus, errorThrown) {
            if (callbacks && typeof callbacks.error === "function") {
                callbacks.error(errorThrown);
            }
            defer.reject(errorThrown);
        });
    } else {
        fetch(dest, {
            /*
             * If POST method doesn't work properly, try PUT method instead as
             * stated here: https://wiki.apache.org/couchdb/HTTP_Document_API#POST
             */
            method: "POST",
            mode: "cors",
            headers: new Headers({
                "Content-Type": "text/plain"
            }),
            body: JSON.stringify(obj)
        }).then(function(response) {
            return response.json();
        }).then(function(jsonResponse) {
            if (callbacks && typeof callbacks.success === "function") {
                callbacks.success(jsonResponse);
            }
            defer.resolve(jsonResponse)
        }).catch(function(err) {
            if (callbacks && typeof callbacks.error === "function") {
                callbacks.error(err);
            }
            defer.reject(err);
        });
    }

    return defer.promise;
};

DaoHelper.prototype.update = function(obj, dest, callbacks) {
    var defer = q.defer();

    if (typeof $ === "function" && typeof $.ajax === "function") {
        $.ajax({
            url: dest,
            type: "PUT",
            contentType: "text/plain",
            data: JSON.stringify(obj)
        }).success(function(data, textStatus, jqXHR) {
            if (callbacks && typeof callbacks.success === "function") {
                callbacks.success(JSON.parse(data));
            }
            defer.resolve(JSON.parse(data));
        }).error(function(jqXHR, textStatus, errorThrown) {
            if (callbacks && typeof callbacks.error === "function") {
                callbacks.error(errorThrown);
            }
            defer.reject(errorThrown);
        });
    } else {
        fetch(dest, {
            method: "PUT",
            mode: "cors",
            headers: new Headers({
                "Content-Type": "text/plain"
            }),
            body: JSON.stringify(obj)
        }).then(function(response) {
            return response.json();
        }).then(function(jsonResponse) {
            if (callbacks && typeof callbacks.success === "function") {
                callbacks.success(jsonResponse);
            }
            defer.resolve(jsonResponse);
        }).catch(function(err) {
            if (callbacks && typeof callbacks.error === "function") {
                callbacks.error(err);
            }
            defer.reject(err);
        });
    }

    return defer.promise;
};

DaoHelper.prototype.delete = function(obj, dest, callbacks) {
    var defer = q.defer();

    if (typeof $ === "function" && typeof $.ajax === "function") {
        $.ajax({
            url: dest,
            type: "DELETE",
            contentType: "text/plain"
        }).success(function(data, textStatus, jqXHR) {
            if (callbacks && typeof callbacks.success === "function") {
                callbacks.success(JSON.parse(data));
            }
            defer.resolve(JSON.parse(data));
        }).error(function(jqXHR, textStatus, errorThrown) {
            if (callbacks && typeof callbacks.error === "function") {
                callbacks.error(errorThrown);
            }
            defer.reject(errorThrown);
        });
    } else {
        fetch(dest, {
            method: "DELETE",
            mode: "cors",
            headers: new Headers({
                "Content-Type": "text/plain"
            })
        }).then(function(response) {
            return response.json();
        }).then(function(jsonResponse) {
            if (callbacks && typeof callbacks.success === "function") {
                callbacks.success(jsonResponse);
            }
            defer.resolve(jsonResponse);
        }).catch(function(err) {
            if (callbacks && typeof callbacks.error === "function") {
                callbacks.error(err);
            }
            defer.reject(err);
        });
    }

    return defer.promise;
};

exports.default = DaoHelper;
module.exports = exports.default;
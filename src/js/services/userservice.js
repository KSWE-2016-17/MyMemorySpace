import q from "q";

export default class userservice {
    findByName(name){
		let defer = q.defer();

        let dm = new DaoManager(connSettings);
        let usrDao = dm.getDao(UserDAO);

        usrDao.findByName(name)
            .then(defer.resolve)
            .catch(defer.reject);

        return defer.promise;
	}
	
	findAll(){
		let dm = new DaoManager(connSettings);
        let usrDao = dm.getDao(UserDAO);

        usrDao.findAll()
            .then(defer.resolve)
            .catch(defer.reject);

        return defer.promise;
	}
	
}
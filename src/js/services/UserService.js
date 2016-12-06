import q from "q";
import UserDAO from "../DAOs/UserDAO";
import DaoManager from "../DAOs/DaoManager"

export default class UserService {
    constructor(){
        this.dm =  new DaoManager();
        this.userDao = this.dm.getDao(UserDAO);
    }
    findByName(name){
		let defer = q.defer();
        console.log('UserService: findByName function');
        this.userDao.findByName(name)
            .then(defer.resolve)
            .catch(defer.reject);
        console.log('UserService: findByName function : return promise: '+defer.promise);
        return defer.promise;
	}
	findAll(){
        let defer = q.defer();

         this.userDao.findAll()
            .then(defer.resolve)
            .catch(defer.reject);
        return defer.promise;
	}
	findById(id){
        let defer = q.defer();
        this.userDao.findById(id)
            .then(defer.resolve)
            .catch(defer.reject);
        return defer.promise;
	}
	create(obj){
        let defer = q.defer();
        this.userDao.create(obj)
            .then(defer.resolve)
            .catch(defer.reject);
        return defer.promise;
    }
    delete(obj){
       let defer = q.defer();
        this.userDao.delete(obj)
            .then(defer.resolve)
            .catch(defer.reject);
        return defer.promise;
    }
}
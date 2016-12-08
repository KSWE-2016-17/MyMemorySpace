import q from "q";
import RoomDAO from "../DAOs/RoomDAO";
import DaoManager from "../DAOs/DaoManager";

export default class RoomService {
    constructor(){
        this.dm =  new DaoManager();
        this.roomDao = this.dm.getDao(RoomDAO);
    }
    findAll(){
        let defer = q.defer();

        this.roomDao.findAll()
            .then(defer.resolve)
            .catch(defer.reject);
        return defer.promise;
    }
    findById(id){
        let defer = q.defer();
        this.roomDao.findById(id)
            .then(defer.resolve)
            .catch(defer.reject);
        return defer.promise;
    }
    findByUser(id){
        let defer = q.defer();
        this.roomDao.findByUser(id)
            .then(defer.resolve)
            .catch(defer.reject);
        return defer.promise;
    }
    create(obj){
        let defer = q.defer();
        this.roomDao.create(obj)
            .then(defer.resolve)
            .catch(defer.reject);
        return defer.promise;
    }
    update(obj){
        let defer = q.defer();
        this.roomDao.update(obj)
            .then(defer.resolve)
            .catch(defer.reject);
        return defer.promise;
    }
    createOrUpdate(obj){
        let defer = q.defer();
        this.roomDao.createOrUpdate(obj)
            .then(defer.resolve)
            .catch(defer.reject);
        return defer.promise;
    }
    delete(obj){
        let defer = q.defer();
        this.roomDao.delete(obj)
            .then(defer.resolve)
            .catch(defer.reject);
        return defer.promise;
    }
}
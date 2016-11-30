import q from "q";
import MediafileDAO from "../DAOs/MediafileDAO";

export default class RoomService {
    constructor(){
        this.dm =  new DaoManager();
        this.mediaDao = this.dm.getDao(MediafileDAO);
    }
    findAll(){
        let defer = q.defer();

        this.mediaDao.findAll()
            .then(defer.resolve)
            .catch(defer.reject);
        return defer.promise;
    }
    findById(id){
        let defer = q.defer();
        this.mediaDao.findById(id)
            .then(defer.resolve)
            .catch(defer.reject);
        return defer.promise;
    }
    findByUser(id){
        let defer = q.defer();
        this.mediaDao.findByUserID(id)
            .then(defer.resolve)
            .catch(defer.reject);
        return defer.promise;
    }
    findFileByID(id){
        let defer = q.defer();
        this.mediaDao.findFileByID(id)
            .then(defer.resolve)
            .catch(defer.reject);
        return defer.promise;
    }
    create(obj){
        let defer = q.defer();
        this.mediaDao.create(obj)
            .then(defer.resolve)
            .catch(defer.reject);
        return defer.promise;
    }
    delete(obj){
        let defer = q.defer();
        this.mediaDao.delete(obj)
            .then(defer.resolve)
            .catch(defer.reject);
        return defer.promise;
    }
}

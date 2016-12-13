export default class Mediafile {
    constructor(mediafile_obj) {
        this._id = mediafile_obj._id;
        this.user_id = mediafile_obj.user_id;
        this.src = mediafile_obj.src;
        this.mimetype = mediafile_obj.mimetype;
    }
}
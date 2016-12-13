export default class Mediaobject {
    constructor(media_obj){
        this._id=media_obj._id;
        this.position=media_obj.position;
        this.width=media_obj.width;
        this.height=media_obj.height;
        this.depth=media_obj.depth;
        this.rotation=media_obj.rotation;
        this.scale=media_obj.scale;
        this.color=media_obj.color;
        this.visible=media_obj.visible;
        this.mediafile=media_obj.mediafile;
    }
}
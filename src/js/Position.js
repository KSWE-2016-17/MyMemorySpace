export default class Position {
    constructor(position){
        this.x=(position.x? position.x: 0);
        this.y = (position.y? position.y: 0);
        this.z = (position.z? position.z: 0);
    }
}

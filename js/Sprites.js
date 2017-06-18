/**
 * Created by komar on 6/17/2017.
 */

class Sprite{
    constructor(src,x,y,width,height){
        this.canvas = $('canvas')[0];
        this.ctx = this.canvas.getContext("2d");
        this.image = new Image();
        this.image.src = src;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
class Tower extends Sprite{
    constructor(src,x,y, width,height){
        super(src,x,y,width,height);
        this.mount = new Image();
        this.mount.src ="img/PNG/Default size/towerDefense_tile181.png";
        this.attack = {
            src: "",
            atk: 10
        };
    }
    draw(){
        this.ctx.drawImage(this.mount, this.x, this.y+10, this.width, this.height);
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
class Wall extends Sprite{
    constructor(src,x,y,width,height){
        super(src,x,y,width,height);
    }
    draw(){
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
class Path extends Sprite{
    constructor(src,x,y,width,height){
        super(src,x,y,width,height);
    }
}
/**
 * Created by komar on 6/17/2017.
 */

class Sprite{
    constructor(x,y,width,height,sx,sy,swidth,sheight){
        this.image = new Image();
        this.image.src = "img/Tilesheet/towerDefense_tilesheet.png";
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sx =sx;
        this.sy = sy;
        this.swidth = swidth;
        this.sheight = sheight;
    }
}
class Tower extends Sprite{
    constructor(type,x,y){
        super(x,y,64,64,type.x*64,type.y*64,64,64);
        this.mx = type.mx*64;
        this.my = type.my*64;
    }
    draw(ctx){
        ctx.drawImage(this.image, this.mx,this.my,this.swidth,this.sheight, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.sx,this.sy,this.swidth,this.sheight, this.x, this.y-10, this.width, this.height);
    }
}
class Wall extends Sprite{
    constructor(type,x,y){
        super(x,y,64,64,type.x*64,type.y*64,64,64);
    }
    draw(ctx){
        ctx.drawImage(this.image, this.sx,this.sy,this.swidth,this.sheight, this.x, this.y, this.width, this.height);
    }
}
class Path extends Sprite{
    constructor(type,x,y){
        super(x,y,64,64,type.x*64,type.y*64,64,64);
    }
    draw(ctx){
        ctx.drawImage(this.image, this.sx,this.sy,this.swidth,this.sheight, this.x, this.y, this.width, this.height);
    }
}
class Mob extends Sprite{

}
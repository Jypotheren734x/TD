/**
 * Created by komar on 6/17/2017.
 */

class Sprite {
    constructor(x, y, width, height, sx, sy, swidth, sheight) {
        this.image = new Image();
        this.image.src = "img/Tilesheet/towerDefense_tilesheet.png";
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sx = sx;
        this.sy = sy;
        this.swidth = swidth;
        this.sheight = sheight;
    }
    clicked(){
        return ((mouse.x > this.x) && (mouse.x < (this.x + this.width))) && ((mouse.y > this.y) && (mouse.y < (this.y + this.height)));
    }
    rotate(angle) {
        ctx.save();
        ctx.translate(this.x + this.swidth / 2, this.y + this.sheight / 2);
        ctx.rotate(angle * TO_RADIANS);
        ctx.drawImage(this.image, this.sx, this.sy, this.swidth, this.sheight, -this.swidth / 2, -this.sheight / 2, this.swidth, this.sheight);
        ctx.restore();
    }
}
class Tower extends Sprite {
    constructor(type, x, y) {
        super(x * 64, y * 64, 64, 64, type.x * 64, type.y * 64, 64, 64);
        this.type = type.type;
        this.level = type.level;
        this.attack = this.level * 10;
        this.mx = type.mx * 64;
        this.my = type.my * 64;
    }

    target(target) {
        let center=[this.x + this.swidth / 2, this.y + this.sheight / 2];
        let offsetY = target.x - center[0];
        let offsetX = target.y - center[1];
        let degrees = Math.atan2(offsetY,-offsetX) * (180/Math.PI);
        ctx.drawImage(this.image, this.mx, this.my, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
        this.rotate(degrees);
        if(target.health > 0) {
            target.health-=this.attack;
        }
    }
    draw() {
        ctx.drawImage(this.image, this.mx, this.my, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
    }
}
class Wall extends Sprite {
    constructor(type, x, y) {
        super(x * 64, y * 64, 64, 64, type.x * 64, type.y * 64, 64, 64);
    }

    draw() {
        ctx.drawImage(this.image, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
    }
}
class Path extends Sprite {
    constructor(type, x, y) {
        super(x * 64, y * 64, 64, 64, type.x * 64, type.y * 64, 64, 64);
    }

    draw() {
        ctx.drawImage(this.image, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
    }
}
class Mob extends Sprite {
    constructor(type, x, y, path) {
        super(x * 32, y * 32, 64, 64, type.x * 64, type.y * 64, 64, 64);
        this.health = type.level * 50000;
        this.isDead = false;
        this.speed = type.speed;
        this.current_node = path[0];
        this.targetX = this.current_node.x * 32;
        this.targetY = this.current_node.y * 32;
        this.atEnd = false;
    }

    up() {
        if(this.y-this.speed > this.targetY) {
            this.y -= this.speed;
        }else{
            this.y = this.targetY;
        }
        this.rotate(270)
    }

    down() {

        if(this.y+this.speed < this.targetY) {
            this.y += this.speed;
        }else{
            this.y = this.targetY;
        }
        this.rotate(90);
    }

    left() {

        if(this.x-this.speed > this.targetX) {
            this.x -= this.speed;
        }else{
            this.x = this.targetX;
        }
        this.rotate(180);
    }

    right() {

        if(this.x+this.speed < this.targetX) {
            this.x += this.speed;
        }else{
            this.x = this.targetX;
        }
        this.rotate(0);
    }

    move() {
        if (this.current_node.parent !== null) {
            if (this.x === this.targetX && this.y === this.targetY) {
                this.current_node = this.current_node.parent;
                this.targetX = this.current_node.x * 32;
                this.targetY = this.current_node.y * 32;
            } else {
                if (this.x < this.targetX) {
                    this.right();
                } else if (this.x > this.targetX) {
                    this.left();
                } else if (this.y < this.targetY) {
                    this.down();
                } else if (this.y > this.targetY) {
                    this.up();
                }
            }
        }else{
            this.atEnd = true;
        }
    }

    draw() {
        if(!this.atEnd) {
            this.move();
            // ctx.fillText("Health: " + this.health, this.x, this.y + 20);
        }
        // ctx.fillText("X: "+this.x + " Y: " +this.y ,this.x, this.y);
        // ctx.fillText("CX: " + this.targetX + " CY: "+ this.targetY ,this.x, this.y + 10);
        // ctx.fillText("RCX: " + this.current_node.x + " RCY: "+ this.current_node.y ,this.x, this.y + 20);
    }

}
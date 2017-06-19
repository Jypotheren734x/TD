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
        this.cost = type.cost;
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

class Tower_Slot extends Sprite {
    constructor(type, x, y) {
        super(x * 64, y * 64, 64, 64, type.x * 64, type.y * 64, 64, 64);
        this.rx = x;
        this.ry = y;
        this.width = 64;
        this.height = 64;
        this.towers = [
            new Tower(types.towers.cannon.level_1, this.rx + 1, this.ry),
            new Tower(types.towers.missile.level_1, this.rx + 1, this.ry + 1),
        ];
    }

    drawTowers() {
        ctx.rect(this.towers[0].x + 64, this.towers[0], this.towers[0].width, this.towers[0].height + this.towers[1].height);
        this.towers[0].draw();
        ctx.fillText(this.towers[0].type, this.towers[0].x + 64, this.towers[0].y + 20);
        ctx.fillText("Level: " + this.towers[0].level, this.towers[0].x + 64, this.towers[0].y + 30);
        ctx.fillText("Atk: " + this.towers[0].attack, this.towers[0].x + 64, this.towers[0].y + 40);
        ctx.fillText("Cost: " + this.towers[0].cost, this.towers[0].x + 64, this.towers[0].y + 50);
        this.towers[1].draw();
        ctx.fillText(this.towers[1].type, this.towers[1].x + 64, this.towers[1].y + 20);
        ctx.fillText("Level: " + this.towers[1].level, this.towers[1].x + 64, this.towers[1].y + 30);
        ctx.fillText("Atk: " + this.towers[1].attack, this.towers[1].x + 64, this.towers[1].y + 40);
        ctx.fillText("Cost: " + this.towers[1].cost, this.towers[1].x + 64, this.towers[1].y + 50);
    }

    draw() {
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
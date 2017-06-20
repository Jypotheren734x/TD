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

    clicked() {
        return ((mouse.x > this.x) && (mouse.x < (this.x + this.width))) && ((mouse.y > this.y) && (mouse.y < (this.y + this.height)));
    }

    rotate(angle) {
        ctx.save();
        ctx.translate(this.x + this.swidth / 2, this.y + this.sheight / 2);
        ctx.rotate(angle * TO_RADIANS);
        ctx.drawImage(this.image, this.sx, this.sy, this.swidth, this.sheight, -this.swidth / 2, -this.sheight / 2, this.swidth, this.sheight);
        ctx.restore();
    }

    draw() {
        ctx.drawImage(this.image, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
    }
}
class Button{
    constructor(src, x, y, width, height) {
        this.image = new Image();
        this.image.src = src;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    clicked() {
        return ((mouse.x > this.x) && (mouse.x < (this.x + this.width))) && ((mouse.y > this.y) && (mouse.y < (this.y + this.height)));
    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

}
class Tower extends Sprite {
    constructor(type, x, y) {
        super(x * 64, y * 64, 64, 64, type.x * 64, type.y * 64, 64, 64);
        this.type = type.type;
        this.level = type.level;
        this.attack = type.attack;
        this.attack_speed = type.attack_speed;
        this.current = 0;
        this.cost = type.cost;
        this.upgrade_cost = type.upgrade_cost;
        if (this.level + 1 < 3 && this.type === 'cannon') {
            this.next = new Tower(types["towers"][type.type]["level_" + (this.level + 1)], x, y);
        } else if (this.level + 1 < 5 && this.type === 'missile') {
            this.next = new Tower(types["towers"][type.type]["level_" + (this.level + 1)], x, y);
            this.next.y -= 64;
        } else {
            this.next = null;
        }
        this.cancel = new Button("img/gameicons-expansion/Game icons (base)/PNG/Black/2x/cross.png", this.x, this.y + 64, 25, 25);
        this.done = new Button("img/gameicons-expansion/Game icons (base)/PNG/Black/2x/checkmark.png", this.x + 25, this.y + 64, 25, 25);
        this.mx = type.mx * 64;
        this.my = type.my * 64;
        this.ax = type.ax * 64;
        this.ay = type.ay * 64;
        this.range = type.range * 64;
    }
    inRange(target){
        let dx = target.x - this.x;
        let dy = target.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        return distance < this.range;
    }
    target(target) {
        for(let i = 0; i<target.length; i++){
            let center = [this.x + this.swidth / 2, this.y + this.sheight / 2];
            let offsetY = target[i].x - center[0];
            let offsetX = target[i].y - center[1];
            let degrees = Math.atan2(offsetY, -offsetX) * (180 / Math.PI);
            ctx.drawImage(this.image, this.mx, this.my, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
            if(!target[i].isDead) {
                if (this.inRange(target[i])) {
                    this.rotate(degrees);
                    if (target[i].health > 0) {
                        this.current++;
                        if (this.current % this.attack_speed === 0) {
                            target[i].health -= this.attack;
                        }
                    }
                    return true;
                }
            }
        }
        this.draw();
    }

    drawInfo() {
        ctx.fillText(this.type, this.x + 64, this.y + 10);
        ctx.fillText("Level: " + this.level, this.x + 64, this.y + 20);
        ctx.fillText("Atk: " + this.attack, this.x + 64, this.y + 30);
        ctx.fillText("Atk Spd: " + this.attack_speed, this.x + 64, this.y + 40);
        ctx.fillText("Cost: " + this.cost, this.x + 64, this.y + 50);
        ctx.fillText("Range: " + this.range/64, this.x + 64, this.y + 60);
    }

    upgrade() {
        this.background = new Image();
        this.background.src = 'img/uipack_fixed/PNG/yellow_panel.png';
        ctx.drawImage(this.background, this.next.x, this.next.y, 120, 64);
        this.next.draw();
        this.next.drawInfo();
    }

    sell() {
        this.cancel.draw();
        this.done.draw();
    }
    draw() {
        ctx.drawImage(this.image, this.mx, this.my, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
    }
    idleDraw(){
        this.draw();
        ctx.beginPath();
        ctx.arc(this.x + this.swidth / 2, this.y + this.sheight / 2,this.range,0,2*Math.PI);
        ctx.stroke();
    }
}
class Digit extends Sprite{
    constructor(type, x, y) {
        super(x * 64, y * 64, 64, 64, type.x * 64, type.y * 64, 64, 64);
    }
}
class Symbol extends Sprite{
    constructor(type, x, y) {
        super(x * 64, y * 64, 64, 64, type.x * 64, type.y * 64, 64, 64);
    }
}
class Number{
    constructor(x,y,digits){
        this.x = x;
        this.y = y;
        this.digits = [];
        for(let i = 0, cx = this.x; i<digits.length; i++, cx+=.5){
            this.digits.push(new Digit(types.numbers[digits[i]],cx,this.y));
        }
        this.width = digits.length * 64;
        this.height = 64;
    }
    update(digits){
        this.width = 300;
        this.height = 64;
        this.digits = [];
        for(let i = 0, cx = this.x; i<digits.length; i++, cx+=.5){
            this.digits.push(new Digit(types.numbers[digits[i]],cx,this.y));
        }
        this.draw();
    }
    draw(){
        for(let i = 0; i<this.digits.length; i++){
            this.digits[i].draw();
        }
    }
}
class Money extends Number{
    constructor(x,y,digits){
        super(x,y,digits);
    }
    update(digits){
        this.width = 300;
        this.height = 64;
        this.digits = [];
        this.digits.push(new Symbol(types.symbols.$, this.x,this.y));
        for(let i = 0, cx = this.x+.5; i<digits.length; i++, cx+=.5){
            this.digits.push(new Digit(types.numbers[digits[i]],cx,this.y));
        }
        this.draw();
    }
    draw(){
        for(let i = 0; i<this.digits.length; i++){
            this.digits[i].draw();
        }
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
        this.background = new Image();
        this.background.src = 'img/uipack_fixed/PNG/yellow_panel.png';
        ctx.drawImage(this.background, this.towers[0].x, this.towers[0].y, 120, 64);
        ctx.drawImage(this.background, this.towers[1].x, this.towers[1].y, 120, 64);
        this.towers[0].draw();
        this.towers[0].drawInfo();
        this.towers[1].draw();
        this.towers[1].drawInfo();
    }
}
class Wall extends Sprite {
    constructor(type, x, y) {
        super(x * 64, y * 64, 64, 64, type.x * 64, type.y * 64, 64, 64);
    }
}
class Path extends Sprite {
    constructor(type, x, y) {
        super(x * 64, y * 64, 64, 64, type.x * 64, type.y * 64, 64, 64);
    }
}
class Mob extends Sprite {
    constructor(type, x, y, path) {
        super(x * 32, y * 32, 64, 64, type.x * 64, type.y * 64, 64, 64);
        this.health = type.level * 1200;
        this.isDead = false;
        this.speed = type.speed;
        this.current_node = path[0];
        this.targetX = this.current_node.x * 32;
        this.targetY = this.current_node.y * 32;
        this.atEnd = false;
    }

    up() {
        if (this.y - this.speed > this.targetY) {
            this.y -= this.speed;
        } else {
            this.y = this.targetY;
        }
        this.rotate(270)
    }

    down() {

        if (this.y + this.speed < this.targetY) {
            this.y += this.speed;
        } else {
            this.y = this.targetY;
        }
        this.rotate(90);
    }

    left() {

        if (this.x - this.speed > this.targetX) {
            this.x -= this.speed;
        } else {
            this.x = this.targetX;
        }
        this.rotate(180);
    }

    right() {

        if (this.x + this.speed < this.targetX) {
            this.x += this.speed;
        } else {
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
        } else {
            this.atEnd = true;
        }
    }

    draw() {
        if (!this.atEnd && !this.isDead) {
            this.move();
            // ctx.fillText("Health: " + this.health, this.x, this.y + 20);
        }
        // ctx.fillText("X: "+this.x + " Y: " +this.y ,this.x, this.y);
        // ctx.fillText("CX: " + this.targetX + " CY: "+ this.targetY ,this.x, this.y + 10);
        // ctx.fillText("RCX: " + this.current_node.x + " RCY: "+ this.current_node.y ,this.x, this.y + 20);
    }

}
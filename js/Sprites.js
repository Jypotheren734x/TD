/**
 * Created by komar on 6/17/2017.
 */

class Sprite {
    constructor(x, y, width, height, sx, sy, swidth, sheight) {
        this.image = new Image();
        this.image.src = tilesheet;
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
        return (mousePressed && (mouse.x > this.x) && (mouse.x < (this.x + this.width))) && ((mouse.y > this.y) && (mouse.y < (this.y + this.height)));
    }

    hover() {
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
class Decoration extends Sprite{
    constructor(type,x,y){
        super(x * scale, y * scale, scale, scale, type.x * scale, type.y * scale, scale, scale);
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
        return (mousePressed && (mouse.x > this.x) && (mouse.x < (this.x + this.width))) && ((mouse.y > this.y) && (mouse.y < (this.y + this.height)));
    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

}
class Tower extends Sprite {
    constructor(type, x, y) {
        super(x * scale, y * scale, scale, scale, type.x * scale, type.y * scale, scale, scale);
        this.type = type.type;
        this.level = type.level;
        this.attack = type.attack;
        this.attack_speed = type.attack_speed;
        this.current = 0;
        this.cost = type.cost;
        this.upgrade_cost = type.upgrade_cost;
        if (this.level + 1 < 3 && this.type === 'cannon') {
            this.next = new Tower(types["towers"][type.type]["level_" + (this.level + 1)], x, y);
            this.next.x += scale;
        } else if (this.level + 1 < 5 && this.type === 'missile') {
            this.next = new Tower(types["towers"][type.type]["level_" + (this.level + 1)], x, y);
            this.next.x += scale;
        } else {
            this.next = null;
        }
        this.cancel = new Button("img/gameicons-expansion/Game icons (base)/PNG/Black/2x/cross.png", this.x, this.y + scale, 25, 25);
        this.done = new Button("img/gameicons-expansion/Game icons (base)/PNG/Black/2x/checkmark.png", this.x + 25, this.y + scale, 25, 25);
        this.mx = type.mx * scale;
        this.my = type.my * scale;
        this.ax = type.ax * scale;
        this.ay = type.ay * scale;
        this.range = type.range * scale;
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
        ctx.font = '12px serif';
        ctx.fillText(this.type, this.x + scale, this.y + 10);
        ctx.fillText("Level: " + this.level, this.x + scale, this.y + 20);
        ctx.fillText("Atk: " + this.attack, this.x + scale, this.y + 30);
        ctx.fillText("Atk Spd: " + this.attack_speed, this.x + scale, this.y + 40);
        ctx.fillText("Cost: $" + this.cost, this.x + scale, this.y + 50);
        ctx.fillText("Range: " + this.range / scale, this.x + scale, this.y + 60);
    }

    upgrade() {
        this.background = new Image();
        this.background.src = 'img/uipack_fixed/PNG/yellow_panel.png';
        ctx.drawImage(this.background, this.next.x, this.next.y, 120, scale);
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
        ctx.beginPath();
        ctx.arc(this.x + this.swidth / 2, this.y + this.sheight / 2,this.range,0,2*Math.PI);
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.fill();
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        this.draw();
    }
}
class Tower_Place extends Tower {
    constructor(type, x, y) {
        super(type, x, y);
        this.ox = x * scale;
        this.oy = y * scale;
        this.startX = 0;
        this.startY = 0;
        this.drag = false;
        this.tower = undefined;
    }

    reset() {
        this.x = this.ox;
        this.y = this.oy;
    }

    placeTower(slot) {
        this.tower = new Tower(types.towers[this.type]["level_" + this.level], slot.x / scale, slot.y / scale);
    }

    at_slot(slot) {
        if (!this.drag) {
            let dx = slot.x - this.x;
            let dy = slot.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            return distance < scale;
        }
    }

    update() {
        if (this.clicked()) {
            if (!this.drag) {
                this.startX = mouse.x - this.x;
                this.startY = mouse.y - this.y;
                this.reset();
            }
            this.drag = true;
        } else {
            if (!dragging) {
                this.drag = false;
            }
        }
        if (this.drag) {
            this.x = mouse.x - this.startX;
            this.y = mouse.y - this.startY;
            this.idleDraw();
        } else {
            this.draw();
        }
    }
}
class UI {
    constructor() {
        this.paused = true;
        this.startbtn = new Button("img/gameicons-expansion/Game icons (base)/PNG/Black/2x/buttonStart.png", canvas.width - 100, canvas.height - 100, 100, 100);
        this.life_count = new Number(24, 0, digits([0]));
        this.wave_count = new Number(24, 1, digits([0]));
        this.kill_count = new Number(24, 2, digits([0]));
        this.money_count = new Money(24, 3, digits([0]));
        this.cl1 = new Tower_Place(types.towers.cannon.level_1, 24, 4);
        this.ml1 = new Tower_Place(types.towers.missile.level_1, 24, 5);
        this.cli_holder = new Tower(types.towers.cannon.level_1, 24, 4);
        this.mli_holder = new Tower(types.towers.missile.level_1, 24, 5);
    }

    update(lives, wave, kills, money) {
        if (lives > 0) {
            this.life_count.update(digits(lives));
        } else {
            this.life_count.update([0]);
        }
        if ((wave + 1) > 0) {
            this.wave_count.update(digits(wave + 1));
        } else {
            this.wave_count.update([0]);
        }
        if (kills > 0) {
            this.kill_count.update(digits(kills));
        } else {
            this.kill_count.update([0]);
        }
        if (money > 0) {
            this.money_count.update(digits(money));
        } else {
            this.money_count.update([0]);
        }
    }

    draw() {
        this.cli_holder.draw();
        this.mli_holder.draw();
        this.cli_holder.drawInfo();
        this.mli_holder.drawInfo();
        this.startbtn.draw();
        if (!this.ml1.drag) {
            this.cl1.update();
        }
        if (!this.cl1.drag) {
            this.ml1.update();
        }
    }
}
class Digit extends Sprite{
    constructor(type, x, y) {
        super(x * scale, y * scale, scale, scale, type.x * scale, type.y * scale, scale, scale);
    }
}
class Symbol extends Sprite{
    constructor(type, x, y) {
        super(x * scale, y * scale, scale, scale, type.x * scale, type.y * scale, scale, scale);
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
        this.width = digits.length * scale;
        this.height = scale;
    }
    update(digits){
        this.width = 300;
        this.height = scale;
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
        this.height = scale;
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
        super(x * scale, y * scale, scale, scale, type.x * scale, type.y * scale, scale, scale);
        this.width = scale;
        this.height = scale;
    }
}
class Wall extends Sprite {
    constructor(type, x, y) {
        super(x * scale, y * scale, scale, scale, type.x * scale, type.y * scale, scale, scale);
    }
}
class Path extends Sprite {
    constructor(type, x, y) {
        super(x * scale, y * scale, scale, scale, type.x * scale, type.y * scale, scale, scale);
    }
}
class Mob extends Sprite {
    constructor(type, x, y, path) {
        super(x * mob_scale, y * mob_scale, scale, scale, type.x * scale, type.y * scale, scale, scale);
        this.type = type.type;
        this.health = type.level * 1200;
        this.level = type.level;
        this.isDead = false;
        this.speed = type.speed;
        this.current_node = path[0];
        this.targetX = this.current_node.x * mob_scale;
        this.targetY = this.current_node.y * mob_scale;
        this.atEnd = false;
        this.health_bar = new Image();
        this.health_bar.src = "img/uipack_fixed/PNG/green_button00.png";
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
                this.targetX = this.current_node.x * mob_scale;
                this.targetY = this.current_node.y * mob_scale;
            } else {
                if (this.x < this.targetX) {
                    this.right();
                    ctx.drawImage(this.health_bar, this.x + (this.level), this.y + 20, (this.health / 1200) * 10, 5);
                } else if (this.x > this.targetX) {
                    this.left();
                    ctx.drawImage(this.health_bar, this.x + (this.level), this.y + 20, (this.health / 1200) * 10, 5);
                } else if (this.y < this.targetY) {
                    this.down();
                    ctx.drawImage(this.health_bar, this.x + (this.level), this.y + 20, (this.health / 1200) * 10, 5);
                } else if (this.y > this.targetY) {
                    this.up();
                    ctx.drawImage(this.health_bar, this.x - (this.level), this.y + 20, (this.health / 1200) * 10, 5);
                }
            }
        } else {
            this.atEnd = true;
        }
    }

    draw() {
        if (!this.atEnd && !this.isDead) {
            this.move();
        }
        // ctx.fillText("X: "+this.x + " Y: " +this.y ,this.x, this.y);
        // ctx.fillText("CX: " + this.targetX + " CY: "+ this.targetY ,this.x, this.y + 10);
        // ctx.fillText("RCX: " + this.current_node.x + " RCY: "+ this.current_node.y ,this.x, this.y + 20);
    }

    drawIdle() {
        if (this.x < this.targetX) {
            this.rotate(0);
            ctx.drawImage(this.health_bar, this.x + (this.level), this.y + 20, (this.health / 1200) * 10, 5);
        } else if (this.x > this.targetX) {
            this.rotate(180);
            ctx.drawImage(this.health_bar, this.x + (this.level), this.y + 20, (this.health / 1200) * 10, 5);
        } else if (this.y < this.targetY) {
            this.rotate(90);
            ctx.drawImage(this.health_bar, this.x + (this.level), this.y + 20, (this.health / 1200) * 10, 5);
        } else if (this.y > this.targetY) {
            this.rotate(270);
            ctx.drawImage(this.health_bar, this.x - (this.level), this.y + 20, (this.health / 1200) * 10, 5);
        }
    }

}
class Air_Mob extends Mob {
    constructor(type, x, y) {
        super(type, x, y, [new Node('', 15 * scale, 24 * scale, false)]);
        this.wx = type.wx * scale;
        this.wy = type.wy * scale;
        this.weapon = new Sprite(this.x - 10, this.y + 10, scale, scale, this.wx, this.wy, scale, scale);
    }

    move() {
        this.x += this.speed;
        this.weapon.x += this.speed;
        this.weapon.draw();
        ctx.drawImage(this.image, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.health_bar, this.x + (this.level), this.y + 20, (this.health / 1200) * 10, 5);
    }

    draw() {
        if (this.x < scale * 23 && !this.isDead) {
            this.move();
        } else {
            this.atEnd = true;
        }
    }
}
class Boss extends Mob {
    constructor(type, x, y, path) {
        super(type, x, y, path);
        this.wx = type.wx * scale;
        this.wy = type.wy * scale;
        this.weapon = new Sprite(this.x, this.y, scale, scale, this.wx, this.wy, scale, scale);
    }

    up() {
        if (this.y - this.speed > this.targetY) {
            this.y -= this.speed;
            this.weapon.y -= this.speed;
        } else {
            this.y = this.targetY;
            this.weapon.y = this.targetY;
        }
        this.rotate(270);
        this.weapon.rotate(270);
    }

    down() {

        if (this.y + this.speed < this.targetY) {
            this.y += this.speed;
            this.weapon.y += this.speed;
        } else {
            this.y = this.targetY;
            this.weapon.y = this.targetY;
        }
        this.rotate(90);
        this.weapon.rotate(90);
    }

    left() {

        if (this.x - this.speed > this.targetX) {
            this.x -= this.speed;
            this.weapon.x -= this.speed;
        } else {
            this.x = this.targetX;
            this.weapon.x = this.targetX;
        }
        this.rotate(180);
        this.weapon.rotate(180);
    }

    right() {

        if (this.x + this.speed < this.targetX) {
            this.x += this.speed;
            this.weapon.x += this.speed;
        } else {
            this.x = this.targetX;
            this.weapon.x = this.targetX;
        }
        this.rotate(0);
        this.weapon.rotate(0);
    }

    move() {
        if (this.current_node.parent !== null) {
            if (this.x === this.targetX && this.y === this.targetY) {
                this.current_node = this.current_node.parent;
                this.targetX = this.current_node.x * mob_scale;
                this.targetY = this.current_node.y * mob_scale;
            } else {
                if (this.x < this.targetX) {
                    this.right();
                    ctx.drawImage(this.health_bar, this.x + (this.level), this.y + 20, (this.health / 1200) * 10, 5);
                } else if (this.x > this.targetX) {
                    this.left();
                    ctx.drawImage(this.health_bar, this.x + (this.level), this.y + 20, (this.health / 1200) * 10, 5);
                } else if (this.y < this.targetY) {
                    this.down();
                    ctx.drawImage(this.health_bar, this.x + (this.level), this.y + 20, (this.health / 1200) * 10, 5);
                } else if (this.y > this.targetY) {
                    this.up();
                    ctx.drawImage(this.health_bar, this.x - (this.level), this.y + 20, (this.health / 1200) * 10, 5);
                }
            }
        } else {
            this.atEnd = true;
        }
    }
    draw() {
        if (!this.atEnd && !this.isDead) {
            this.move();
        }
        // ctx.fillText("X: "+this.x + " Y: " +this.y ,this.x, this.y);
        // ctx.fillText("CX: " + this.targetX + " CY: "+ this.targetY ,this.x, this.y + 10);
        // ctx.fillText("RCX: " + this.current_node.x + " RCY: "+ this.current_node.y ,this.x, this.y + 20);
    }
}
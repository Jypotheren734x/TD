/**
 * Created by komar on 6/17/2017.
 */
var images = 0;
var images_loaded = 0;
function loaded() {
    return images_loaded === images;
}
class Sprite{
    constructor(type,x,y){
        let self = this;
        this.x = x;
        this.y = y;
        this.image = undefined;
        this.src = new Image();
        images++;
        this.src.onload = function() {
            self.image = new Konva.Image({
                x: x*64,
                y: y*64,
                image: self.src,
                width: 64,
                height: 64,
                crop: {
                    x: type.x*64,
                    y: type.y*64,
                    width: 64,
                    height: 64
                },
                draggable: false
            });
            images_loaded++;
            self.image.crop();
            layer_1.add(self.image);
            stage.add(layer_1);
        };
        this.src.src = "img/Tilesheet/towerDefense_tilesheet.png";
    }
}
class Draggable_Sprite{
    constructor(type,x,y){
        let self = this;
        this.x = x;
        this.y = y;
        this.image = undefined;
        this.src = new Image();
        images++;
        this.src.onload = function() {
            self.image = new Konva.Image({
                x: x*64,
                y: y*64,
                image: self.src,
                width: 64,
                height: 64,
                crop: {
                    x: type.x*64,
                    y: type.y*64,
                    width: 64,
                    height: 64
                },
                draggable: true
            });
            images_loaded++;
            self.image.crop();
            layer_1.add(self.image);
            stage.add(layer_1);
        };
        this.src.src = "img/Tilesheet/towerDefense_tilesheet.png";
    }
}
class Wall extends Sprite{
    constructor(type,x,y){
        super(type,x,y);
    }
}
class Tower{
    constructor(type,x,y){
        this.type = type.type;
        this.level = type.level;
        this.attack = type.attack;
        this.attack_speed = type.attack_speed;
        this.cost = type.cost;
        this.upgrade_cost = type.upgrade_cost;
        this.mx = type.mx;
        this.my = type.my;
        this.ax = type.ax * 64;
        this.ay = type.ay * 64;
        this.range = type.range * 64;
        this.tower = new Sprite(type,x,y);
        this.mount = new Sprite({x:this.mx,y:this.my},x,y);
    }
}
class Tower_Slot extends Sprite{
    constructor(x, y) {
        super(types.ux.empty,x,y);
    }
    update(){
    }
}
class Placement_Tower{
    constructor(type,x,y){
        this.group = new Konva.Group({
            x:x,
            y:y,
            draggable: true
        });
        this.tower = new Sprite(type,x,y);
        this.mount = new Sprite({x:type.mx,y:type.my},x,y);
    }
    update(){
        if(loaded()) {
            this.group.add(this.mount.image);
            this.group.add(this.tower.image);
            layer_1.add(this.group);
        }
    }
}
class Mob extends Sprite{
    constructor(type,x, y, path) {
        super(type,x,y);
        this.health = type.level * 1200;
        this.level = type.level;
        this.isDead = false;
        this.speed = type.speed;
        this.current_node = path[0];
        this.targetX = this.current_node.x * 32;
        this.targetY = this.current_node.y * 32;
        this.atEnd = false;
        this.health_bar = new Image();
        this.health_bar.src = "img/uipack_fixed/PNG/green_button00.png";
    }
}
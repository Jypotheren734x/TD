/**
 * Created by komar on 6/18/2017.
 */
class Game {
    constructor() {
        let self = this;
        this.map = new Map();
        this.towers = [];
        this.waves = [];
        this.tower_slots = [];
        this.tower_selectors = [];
        this.current_wave = -1;
        this.idle = true;
        this.lives = 100;
        this.kills = 0;
        for (let i = 0, y = 0; i < this.map.maze.tower_locations.length; i++, y++) {
            for (let j = 0, x = 0; j < this.map.maze.tower_locations[i].length; j++, x++) {
                switch (this.map.maze.tower_locations[i][j]) {
                    case 'T':
                        this.tower_slots.push(new Tower_Slot(types.ux.empty, x, y));
                        this.tower_selectors.push(new Tower_Selector(x, y));
                        break;
                }
            }
        }
        this.waves.push(new Wave(15,types.mobs.super_soldier,this.map.maze.path));
        this.waves.push(new Wave(15,types.mobs.cyborg,this.map.maze.path));
        this.waves.push(new Wave(15,types.mobs.robot,this.map.maze.path));
        this.waves.push(new Wave(15,types.mobs.robot,this.map.maze.path));
        console.log(this.waves);
        $('#start').click(function () {
             self.idle = false;
             if(self.current_wave +1 < self.waves.length) {
                 self.current_wave++;
             }else{
                 alert("YOU WIN!");
             }
        });
    }
    update(){
        let self = this;
        canvas.width = canvas.width;
        this.map.build();
        ctx.fillText("TOWERS Lives: " + this.lives, 0, 10);
        ctx.fillText("Wave: " + (this.current_wave + 1) + " Kills: " + this.kills, 0, 20);
    }
    run() {
        let self = this;
        if (!this.idle) {
            if (this.waves[this.current_wave].complete) {
                this.idle = true;
                this.lives -= this.waves[this.current_wave].lives_lost;
                this.kills += this.waves[this.current_wave].mobs_dead;
            }else {
                self.waves[self.current_wave].attack(self.ctx);
                this.towers.forEach(function (tower) {
                    tower.target(self.waves[self.current_wave].getLeadMob());
                });
            }
        } else {
            this.towers.forEach(function (tower) {
                tower.draw();
            });
            for(let i = 0; i<this.tower_slots.length; i++){
                this.tower_slots[i].draw();
                if(this.tower_slots[i].clicked()) {
                    if(this.tower_selectors.selected === undefined) {
                        this.tower_selectors[i].draw();
                    }
                }
            }
        }
    }
}
class Tower_Slot extends Sprite{
    constructor(type, x, y) {
        super(x * 64, y * 64, 64, 64, type.x * 64, type.y * 64, 64, 64);
    }
    draw() {
        ctx.drawImage(this.image, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
    }
}
class Tower_Selector{
    constructor(x,y){
        this.rx = x;
        this.ry = y;
        this.width = 64;
        this.height = 64;
        this.towers = [
            new Tower(types.towers.cannon.level_1, this.rx+1, this.ry),
            new Tower(types.towers.missile.level_1, this.rx+1,this.ry+1),
        ];
    }
    draw(){
        this.towers[0].draw();
        ctx.fillText(this.towers[0].type, this.towers[0].x + 64, this.towers[0].y + 20);
        ctx.fillText("Level: " + this.towers[0].level, this.towers[0].x + 64, this.towers[0].y + 30);
        ctx.fillText("Atk: " + this.towers[0].attack, this.towers[0].x + 64, this.towers[0].y + 40);
        this.towers[1].draw();
        ctx.fillText(this.towers[1].type, this.towers[1].x + 64, this.towers[1].y + 20);
        ctx.fillText("Level: " + this.towers[1].level, this.towers[1].x + 64, this.towers[1].y + 30);
        ctx.fillText("Atk: " + this.towers[1].attack, this.towers[1].x + 64, this.towers[1].y + 40);
        if(this.towers[0].clicked()){
            this.selected = this.towers[0];
        }
        if(this.towers[1].clicked()){
            this.selected = this.towers[1];
        }
    }
}
class Wave{
    constructor(size, type, path){
        this.mobs = [];
        this.mobs_dead = 0;
        this.lead_mob = 0;
        this.lives_lost = 0;
        this.complete = false;
        for (let i = 0; i < size; i++) {
            if(i%3 === 0){
                this.mobs.push(new Mob(type, 3, 15 + i, path));
            }else{
                this.mobs.push(new Mob(type, 3, 15 + i, path));
            }
        }
    }
    getLeadMob(){
        return this.mobs[this.lead_mob];
    }
    attack(){
        let self = this;
        if(this.mobs_dead+this.lives_lost === this.mobs.length){
            this.complete = true;
            console.log("Wave Cleared");
        }
        this.lead_mob = 0;
        this.lives_lost = 0;
        this.mobs.forEach(function (mob) {
                if (mob.health > 0) {
                    mob.draw();
                    if (mob.atEnd) {
                        self.lives_lost++;
                    }
                }else{
                    if(!mob.isDead) {
                        mob.isDead = true;
                        self.mobs_dead++;
                    }
                    if(self.lead_mob+1 < self.mobs.length) {
                        self.lead_mob++;
                    }
                }
        });
    }
}
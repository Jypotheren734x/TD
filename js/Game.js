/**
 * Created by komar on 6/18/2017.
 */
class Game {
    constructor() {
        let self = this;
        this.map = new Map();
        this.towers = [];
        this.waves = [];
        this.tower_slots = {
            slots: [],
            active_slot: null
        };
        this.current_wave = -1;
        this.money = 200;
        this.idle = true;
        this.lives = 100;
        this.kills = 0;
        for (let i = 0, y = 0; i < this.map.maze.tower_locations.length; i++, y++) {
            for (let j = 0, x = 0; j < this.map.maze.tower_locations[i].length; j++, x++) {
                switch (this.map.maze.tower_locations[i][j]) {
                    case 'T':
                        this.tower_slots.slots.push(new Tower_Slot(types.ux.empty, x, y));
                        break;
                }
            }
        }
        this.waves.push(new Wave(5, types.mobs.soldier, this.map.maze.path));
        this.waves.push(new Wave(10, types.mobs.soldier, this.map.maze.path));
        this.waves.push(new Wave(15, types.mobs.soldier, this.map.maze.path));
        this.waves.push(new Wave(5, types.mobs.robot, this.map.maze.path));
        this.waves.push(new Wave(10, types.mobs.robot, this.map.maze.path));
        this.waves.push(new Wave(10, types.mobs.super_soldier, this.map.maze.path));
        this.waves.push(new Wave(5, types.mobs.cyborg, this.map.maze.path));
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
        ctx.fillText("Money: " + this.money, 0, 30);
    }
    run() {
        let self = this;
        if (!this.idle) {
            if (this.waves[this.current_wave].complete) {
                this.idle = true;
                this.lives -= this.waves[this.current_wave].lives_lost;
                this.kills += this.waves[this.current_wave].mobs_dead;
                this.money = this.kills * 100;
            }else {
                self.waves[self.current_wave].attack(self.ctx);
                this.towers.forEach(function (tower) {
                    tower.target(self.waves[self.current_wave].getLeadMob());
                });
            }
        } else {
            for (let i = 0; i < this.tower_slots.slots.length; i++) {
                this.tower_slots.slots[i].draw();
            }
            this.towers.forEach(function (tower) {
                tower.draw();
            });
            if (this.tower_slots.active_slot !== null) {
                if (this.tower_slots.active_slot.towers[0].clicked()) {
                    let t = this.tower_slots.active_slot.towers[0];
                    if (this.money - t.cost >= 0) {
                        t.x -= 64;
                        this.money -= t.cost;
                        this.towers.push(t);
                        this.tower_slots.slots.splice(this.tower_slots.slots.indexOf(this.tower_slots.active_slot), 1);
                        this.tower_slots.active_slot = null;
                    }
                } else if (this.tower_slots.active_slot.towers[1].clicked()) {
                    let t = this.tower_slots.active_slot.towers[1];
                    if (this.money - t.cost >= 0) {
                        t.x -= 64;
                        t.y -= 64;
                        this.money -= t.cost;
                        this.towers.push(t);
                        this.tower_slots.slots.splice(this.tower_slots.slots.indexOf(this.tower_slots.active_slot), 1);
                        this.tower_slots.active_slot = null;
                    }
                } else {
                    this.tower_slots.active_slot.drawTowers();
                }
            }
            for (let i = 0; i < this.tower_slots.slots.length; i++) {
                if (this.tower_slots.slots[i].clicked()) {
                    this.tower_slots.active_slot = this.tower_slots.slots[i];
                }
            }
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
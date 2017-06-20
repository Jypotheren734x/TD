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
        this.money = 300;
        this.idle = true;
        this.lives = 150;
        this.kills = 0;
        this.startbtn = new Button("img/gameicons-expansion/Game icons (base)/PNG/Black/2x/buttonStart.png", canvas.width - 100, canvas.height - 100, 100, 100);
        this.life_count = new Number(this.map.maze.background[0].length, 0, digits(this.lives));
        this.wave_count = new Number(this.map.maze.background[0].length, 1, digits(0));
        this.kill_count = new Number(this.map.maze.background[0].length, 2, digits(this.kills));
        this.money_count = new Money(this.map.maze.background[0].length, 3, digits(this.money));
        ctx.font = "15px kenpixel";
        canvas.onclick = function (e) {
            mouse = mousePosition(e);
        };
        for (let i = 0, y = 0; i < this.map.maze.background.length; i++, y++) {
            for (let j = 0, x = 0; j < this.map.maze.background[i].length; j++, x++) {
                switch (this.map.maze.background[i][j]) {
                    case 'S':
                        this.tower_slots.slots.push(new Tower_Slot(types.ux.empty, x, y));
                        break;
                }
            }
        }
        this.waves.push(new Wave(15, types.mobs.soldier, this.map.maze.path));
        this.waves.push(new Wave(25, types.mobs.soldier, this.map.maze.path));
        this.waves.push(new Wave(30, types.mobs.soldier, this.map.maze.path));
        this.waves.push(new Wave(20, types.mobs.robot, this.map.maze.path));
        this.waves.push(new Wave(30, types.mobs.robot, this.map.maze.path));
        this.waves.push(new Wave(30, types.mobs.super_soldier, this.map.maze.path));
        this.waves.push(new Wave(25, types.mobs.cyborg, this.map.maze.path));
    }

    update() {
        let self = this;
        canvas.width = canvas.width;
        this.map.build();
        if(this.startbtn.clicked()){
            this.idle = false;
            if (this.current_wave + 1 < this.waves.length) {
                this.current_wave++;
            }
            mouse = {};
        }
        if(this.lives > 0) {
            this.life_count.update(digits(this.lives));
        }else{
            this.life_count.update([0]);
        }
        if((this.current_wave+1) > 0) {
            this.wave_count.update(digits(this.current_wave+1));
        }else{
            this.wave_count.update([0]);
        }
        if(this.kills > 0) {
            this.kill_count.update(digits(this.kills));
        }else{
            this.kill_count.update([0]);
        }
        if(this.money > 0) {
            this.money_count.update(digits(this.money));
        }else{
            this.money_count.update([0]);
        }
        ctx.fillText("Lives: ", this.map.maze.background[0].length*64, 10);
        ctx.fillText("Wave: " , this.map.maze.background[0].length*64, 74);
        ctx.fillText("Kills: " , this.map.maze.background[0].length*64, 138);
        ctx.fillText("Money: ", this.map.maze.background[0].length*64, 202);
        this.startbtn.draw();
    }
    run() {
        let self = this;
        if (!this.idle) {
            if (this.waves[this.current_wave].complete) {
                this.idle = true;
                this.lives -= this.waves[this.current_wave].lives_lost;
                this.kills += this.waves[this.current_wave].mobs_dead;
                this.money = this.kills * 10;
                this.tower_slots.active_slot = null;
            } else {
                self.waves[self.current_wave].attack();
                this.towers.forEach(function (tower) {
                    tower.target(self.waves[self.current_wave].mobs);
                });
            }
        } else {
            for (let i = 0; i < this.tower_slots.slots.length; i++) {
                this.tower_slots.slots[i].draw();
            }
            this.towers.forEach(function (tower) {
                tower.idleDraw();
            });
            if (this.tower_slots.active_slot !== null) {
                if (this.tower_slots.active_slot instanceof Tower_Slot) {
                    if(!this.tower_slots.active_slot.clicked() && !this.tower_slots.active_slot.towers[0].clicked() && !this.tower_slots.active_slot.towers[1].clicked()){
                        this.tower_slots.active_slot = null;
                    }else {
                        if (this.tower_slots.active_slot.towers[0].clicked()) {
                            let t = this.tower_slots.active_slot.towers[0];
                            if (this.money - t.cost >= 0) {
                                t.x = this.tower_slots.active_slot.x;
                                t.y = this.tower_slots.active_slot.y;
                                this.money -= t.cost;
                                this.towers.push(t);
                                this.tower_slots.slots.splice(this.tower_slots.slots.indexOf(this.tower_slots.active_slot), 1);
                                this.tower_slots.active_slot = null;
                            }
                        } else if (this.tower_slots.active_slot.towers[1].clicked()) {
                            let t = this.tower_slots.active_slot.towers[1];
                            if (this.money - t.cost >= 0) {
                                t.x = this.tower_slots.active_slot.x;
                                t.y = this.tower_slots.active_slot.y;
                                this.money -= t.cost;
                                this.towers.push(t);
                                this.tower_slots.slots.splice(this.tower_slots.slots.indexOf(this.tower_slots.active_slot), 1);
                                this.tower_slots.active_slot = null;
                            }
                        } else {
                            this.tower_slots.active_slot.drawTowers();
                        }
                    }
                }
                if (this.tower_slots.active_slot instanceof Tower) {
                    if(!this.tower_slots.active_slot.clicked() && !this.tower_slots.active_slot.next.clicked()){
                        this.tower_slots.active_slot = null;
                    }else {
                        if (this.tower_slots.active_slot.next.clicked()) {
                            let t = this.tower_slots.active_slot.next;
                            if (this.money - this.tower_slots.active_slot.upgrade_cost >= 0) {
                                t.x -= 64;
                                this.money -= this.tower_slots.active_slot.upgrade_cost;
                                this.towers.splice(this.towers.indexOf(this.tower_slots.active_slot), 1);
                                this.towers.push(t);
                                this.tower_slots.active_slot = null;
                            }
                        } else if (this.tower_slots.active_slot.cancel.clicked()) {
                            console.log('Sold');
                            this.money += this.tower_slots.active_slot.cost;
                            this.tower_slots.slots.push(new Tower_Slot(types.ux.empty, this.tower_slots.active_slot.x, this.tower_slots.active_slot.y));
                            this.towers.splice(this.towers.indexOf(this.tower_slots.active_slot), 1);
                            this.tower_slots.active_slot = null;
                        } else {
                            this.tower_slots.active_slot.upgrade();
                            this.tower_slots.active_slot.sell();
                        }
                    }
                }
            }else {
                for (let i = 0; i < this.tower_slots.slots.length; i++) {
                    if (this.tower_slots.slots[i].clicked()) {
                        this.tower_slots.active_slot = this.tower_slots.slots[i];
                    }
                }
                for (let i = 0; i < this.towers.length; i++) {
                    if (this.towers[i].clicked() && this.towers[i].type === 'cannon' && this.towers[i].level === 1) {
                        this.tower_slots.active_slot = this.towers[i];
                    }
                    if (this.towers[i].clicked() && this.towers[i].type === 'missile' && this.towers[i].level < 4) {
                        this.tower_slots.active_slot = this.towers[i];
                    }
                }
            }
        }
    }
}
class Wave {
    constructor(size, type, path) {
        this.mobs = [];
        this.mobs_dead = 0;
        this.lead_mob = 0;
        this.lives_lost = 0;
        this.complete = false;
        for (let i = 0; i < size; i++) {
            if (i % 3 === 0) {
                this.mobs.push(new Mob(type, 3, 29 + i, path));
            } else {
                this.mobs.push(new Mob(type, 3, 29 + i, path));
            }
        }
    }

    getLeadMob() {
        return this.mobs[this.lead_mob];
    }

    attack() {
        let self = this;
        if (this.mobs_dead + this.lives_lost === this.mobs.length) {
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
            } else {
                if (!mob.isDead) {
                    mob.isDead = true;
                    self.mobs_dead++;
                }
                if (self.lead_mob + 1 < self.mobs.length) {
                    self.lead_mob++;
                }
            }
        });
    }
}
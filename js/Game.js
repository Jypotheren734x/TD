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
        this.money = 330;
        this.idle = true;
        this.lives = 200;
        this.kills = 0;
        this.ui = new UI();
        this.ui.startbtn.click(function () {
            self.idle = false;
            self.ui.paused = !self.ui.paused;
        });
        ctx.font = "15px kenpixel";
        canvas.onmousemove = function (e){
            mouse = mousePosition(e);
        };
        canvas.onmousedown = function (e) {
            mousePressed = true;
        };
        canvas.onmouseup = function (e) {
            mousePressed = false;
            dragging = false;
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
        this.waves.push(new Wave(7, types.mobs.plane_1, this.map.maze.path));
        this.waves.push(new Wave(25, types.mobs.soldier, this.map.maze.path));
        this.waves.push(new Wave(30, types.mobs.soldier, this.map.maze.path));
        this.waves.push(new Wave(1, types.mobs.tank_1, this.map.maze.path));
        this.waves.push(new Wave(7, types.mobs.plane_2, this.map.maze.path));
        this.waves.push(new Wave(20, types.mobs.robot, this.map.maze.path));
        this.waves.push(new Wave(30, types.mobs.robot, this.map.maze.path));
        this.waves.push(new Wave(20, types.mobs.super_soldier, this.map.maze.path));
        this.waves.push(new Wave(30, types.mobs.super_soldier, this.map.maze.path));
        this.waves.push(new Wave(20, types.mobs.cyborg, this.map.maze.path));
        this.waves.push(new Wave(30, types.mobs.cyborg, this.map.maze.path));
        this.waves.push(new Wave(1, types.mobs.tank_2, this.map.maze.path));
    }

    update() {
        let self = this;
        canvas.width = canvas.width;
        this.map.build();
        if (this.ui.paused) {
            if (this.waves[this.current_wave] !== undefined || this.current_wave === -1) {
                if (this.current_wave === -1) {
                    this.ui.paused = false;
                    this.current_wave++;
                    mouse = {};
                } else {
                    if (this.waves[this.current_wave].complete) {
                        this.ui.paused = false;
                        if (this.current_wave + 1 < this.waves.length) {
                            this.current_wave++;
                        }
                        mouse = {};
                    }
                }
            }
        }
        this.ui.update(this.lives, this.current_wave, this.kills, this.money);
        this.ui.draw();
        ctx.font = '18px serif';
        ctx.fillText("Lives: ", this.map.maze.background[0].length * scale, 15);
        ctx.fillText("Wave: ", this.map.maze.background[0].length * scale, 74);
        ctx.fillText("Kills: ", this.map.maze.background[0].length * scale, 138);
        ctx.fillText("Money: ", this.map.maze.background[0].length * scale, 202);
        ctx.fillText("Instructions:", this.map.maze.background[0].length * scale, 396);
        ctx.fillText("Slowly drag and drop attack towers", this.map.maze.background[0].length * scale, 420);
        ctx.fillText("Hit the play button", this.map.maze.background[0].length * scale, 440);
    }
    run() {
        let self = this;
        if (!this.idle) {
            if (this.waves[this.current_wave].complete) {
                this.idle = true;
                this.ui.paused = true;
                this.lives -= this.waves[this.current_wave].lives_lost;
                this.kills += this.waves[this.current_wave].mobs_dead;
                this.money += this.waves[this.current_wave].mobs_dead * 10;
                this.tower_slots.active_slot = null;
                this.ui.cl1.reset();
                this.ui.ml1.reset();
                if (this.lives <= 0) {
                    alert("You Loose");
                }
            } else {
                if (this.ui.paused === false) {
                    this.waves[this.current_wave].attack(1);
                    this.towers.forEach(function (tower) {
                        tower.target(self.waves[self.current_wave].mobs);
                    });
                } else {
                    this.waves[this.current_wave].mobs.forEach(function (mob) {
                        mob.drawIdle();
                    });
                    this.towers.forEach(function (tower) {
                        tower.draw();
                    });
                }
                this.ui.update(this.lives, this.current_wave, this.kills, this.money);
                this.ui.draw();
            }
        } else {
            for (let i = 0; i < this.tower_slots.slots.length; i++) {
                this.tower_slots.slots[i].draw();
            }
            this.towers.forEach(function (tower) {
                tower.idleDraw();
            });
            for (let i = 0; i < this.tower_slots.slots.length; i++) {
                if (this.ui.cl1.at_slot(this.tower_slots.slots[i])) {
                    this.ui.cl1.placeTower(this.tower_slots.slots[i]);
                    if (this.money - this.ui.cl1.tower.cost >= 0) {
                        this.tower_slots.slots.splice(i, 1);
                        this.towers.push(this.ui.cl1.tower);
                        this.money -= this.ui.cl1.tower.cost;
                    }
                    this.ui.cl1.reset();
                }
                if (this.ui.ml1.at_slot(this.tower_slots.slots[i])) {
                    this.ui.ml1.placeTower(this.tower_slots.slots[i]);
                    if (this.money - this.ui.ml1.tower.cost >= 0) {
                        this.tower_slots.slots.splice(i, 1);
                        this.towers.push(this.ui.ml1.tower);
                        this.money -= this.ui.ml1.tower.cost;
                    }
                    this.ui.ml1.reset();
                }
            }
            if (this.tower_slots.active_slot !== null) {
                if (this.tower_slots.active_slot instanceof Tower) {
                    if(!this.tower_slots.active_slot.clicked() && !this.tower_slots.active_slot.next.clicked()){
                        this.tower_slots.active_slot = null;
                    }else {
                        if (this.tower_slots.active_slot.next.clicked()) {
                            let t = this.tower_slots.active_slot.next;
                            if (this.money - this.tower_slots.active_slot.upgrade_cost >= 0) {
                                this.money -= this.tower_slots.active_slot.upgrade_cost;
                                t.x -= scale;
                                this.towers.splice(this.towers.indexOf(this.tower_slots.active_slot), 1);
                                this.towers.push(t);
                                this.tower_slots.active_slot = null;
                            }
                        } else if (this.tower_slots.active_slot.next.cancel.clicked()) {
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
        if (type.type === 'Boss') {
            this.mobs.push(new Boss(type, 3, 29, path));
        } else if (type.type === 'Air') {
            for (let i = 0; i < size * 5; i += 5) {
                this.mobs.push(new Air_Mob(type, 0 - i, 15));
            }
        } else {
            for (let i = 0; i < size; i++) {
                this.mobs.push(new Mob(type, 3, 29 + i, path));
            }
        }
    }

    getLeadMob() {
        return this.mobs[this.lead_mob];
    }

    attack(speed_multiplier) {
        let self = this;
        if (this.mobs_dead + this.lives_lost === this.mobs.length) {
            this.complete = true;
            console.log("Wave Cleared: Lives lost(" + self.lives_lost + ") Mobs Killed: (" + self.mobs_dead + ")");
        }
        this.lead_mob = 0;
        this.lives_lost = 0;
        this.mobs.forEach(function (mob) {
            mob.speed *= speed_multiplier;
            if (mob.health > 0) {
                mob.draw();
                if (mob.atEnd) {
                    console.log(self.lives_lost, self.mobs_dead);
                    if (mob.type === 'Boss') {
                        self.lives_lost += 10;
                    } else if (mob.type === 'Air') {
                        self.lives_lost += 5;
                    } else {
                        self.lives_lost++;
                    }
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
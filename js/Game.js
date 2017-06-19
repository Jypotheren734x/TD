/**
 * Created by komar on 6/18/2017.
 */
class Game {
    constructor() {
        let self = this;
        this.canvas = $('canvas')[0];
        this.ctx = this.canvas.getContext("2d");
        this.map = new Map();
        this.towers = [];
        this.waves = [];
        this.current_wave = -1;
        this.idle = true;
        this.lives = 100;
        this.tower_list = [
            new Tower(types.towers.cannon.level_1, 12, 0.5),
            new Tower(types.towers.missile.level_1, 12, 1.5),
        ];
        for (let i = 0, y = 0; i < this.map.maze.tower_locations.length; i++, y++) {
            for (let j = 0, x = 0; j < this.map.maze.tower_locations[i].length; j++, x++) {
                switch (this.map.maze.tower_locations[i][j]) {
                    case 'T':
                        this.towers.push(new Tower(types.towers.cannon.level_2, x, y));
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
        })
    }
    update(){
        let self = this;
        this.canvas.width = this.canvas.width;
        this.map.build(this.ctx);
        if(this.current_wave >= 0) {
            this.ctx.fillText("TOWERS Lives: " + this.lives, this.tower_list[0].x, 10);
            this.ctx.fillText("Wave: " + (this.current_wave + 1) + " Kills: " + this.waves[this.current_wave].mobs_dead, this.tower_list[0].x, 20);
        }
        this.tower_list.forEach(function (tower) {
            tower.draw(self.ctx);
            self.ctx.fillText(tower.type, tower.x + 64, tower.y);
            self.ctx.fillText("Level: " + tower.level, tower.x + 64, tower.y + 10);
        });
    }
    run() {
        let self = this;
        if (!this.idle) {
            if (this.waves[this.current_wave].complete) {
                this.idle = true;
                this.lives -= this.waves[this.current_wave].lives_lost;
            }else {
                self.waves[self.current_wave].attack(self.ctx);
                this.towers.forEach(function (tower) {
                    tower.target(self.ctx, self.waves[self.current_wave].getLeadMob());
                });
            }
        } else {
            this.towers.forEach(function (tower) {
                tower.draw(self.ctx);
            });
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
    attack(ctx){
        let self = this;
        if(this.mobs_dead === this.mobs.length){
            this.complete = true;
            console.log("Wave Cleared");
        }
        this.lead_mob = 0;
        this.lives_lost = 0;
        this.mobs.forEach(function (mob) {
                if (mob.health > 0) {
                    mob.draw(ctx);
                    if (mob.atEnd) {
                        self.lives_lost++;
                        if (!mob.isDead) {
                            mob.isDead = true;
                            self.mobs_dead++;
                        }
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
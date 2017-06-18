/**
 * Created by komar on 6/18/2017.
 */
class Game{
    constructor(){
        this.canvas = $('canvas')[0];
        this.ctx = this.canvas.getContext("2d");
        this.map = new Map();
        this.towers = [];
        this.mobs = [];
        this.types = {
            towers: {
                cannon: {
                    level_1: {type:"Cannon",level:1,x: 19, y: 10, mx: 19, my: 7},
                    level_2: {type:"Cannon",level:2,x: 20, y: 10, mx: 19, my: 7}
                },
                missile_1: {type:"Missile-1",level:1,x: 19, y: 9, mx: 19, my: 7},
                missile_2: {type:"Missile-2",level:1,x: 19, y: 8, mx: 19, my: 7}
            },
            mobs: {
                soldier: {type:"Soldier",level:1,x: 15, y: 10},
                robot: {type:"Robot",level:1,x: 16, y: 10},
                super_soldier: {type:"Super-Soldier",level:1,x: 17, y: 10},
                cyborg: {type:"Cyborg",level:1,x: 18, y: 10}
            }
        };
        this.tower_list = [
            new Tower(this.types.towers.cannon.level_1,12,0.5),
            new Tower(this.types.towers.missile_1,12,1.5),
            new Tower(this.types.towers.missile_2,12,2.5),
        ];
        for(let i = 0; i<5; i++){
            this.mobs.push(new Mob(this.types.mobs.soldier, 1, 7))
        }
    }
    run(){
        this.canvas.width = this.canvas.width;
        this.map.build(this.ctx);
        this.ctx.fillText("TOWERS", this.tower_list[0].x,10);
        for(let i = 0; i<this.towers.length; i++){
            this.towers[i].draw(this.ctx);
        }
        for(let i = 0; i<this.mobs.length; i++){
            this.mobs[i].draw(this.ctx);
        }
        for(let i = 0; i<this.tower_list.length; i++){
            this.tower_list[i].draw(this.ctx);
            this.ctx.fillText(this.tower_list[i].type, this.tower_list[i].x + 64,this.tower_list[i].y);
            this.ctx.fillText("Level: "+this.tower_list[i].level, this.tower_list[i].x + 64,this.tower_list[i].y+10);
        }
    }
}
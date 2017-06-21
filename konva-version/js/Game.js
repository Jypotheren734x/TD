/**
 * Created by komar on 6/18/2017.
 */
class Game{
    constructor(){
        let self = this;
        this.towers = [];
        this.waves = [];
        this.initialized = false;
        this.tower_slots = {
            slots: [],
            active_slot: null
        };
        this.current_wave = -1;
        this.money = 300;
        this.lives = 150;
        this.kills = 0;
        this.map = new Map();
        for (let i = 0, y = 0; i < this.map.maze.background.length; i++, y++) {
            for (let j = 0, x = 0; j < this.map.maze.background[i].length; j++, x++) {
                switch (this.map.maze.background[i][j]) {
                    case 'S':
                        this.tower_slots.slots.push(new Tower_Slot(x, y));
                        break;
                }
            }
        }
        this.cl1 = new Placement_Tower(types.towers.cannon.level_1, 24, 4);
        this.ml1 = new Placement_Tower(types.towers.missile.level_1, 24, 5);
    }
    init(){
        this.cl1.update();
        this.ml1.update();
        this.initialized = true;
    }
    update() {
        if(!this.initialized){
            this.init();
        }
        this.tower_slots.slots.forEach(function (slot) {
            slot.update();
        });
        layer_1.draw();
    }
}
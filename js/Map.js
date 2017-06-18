/**
 * Created by komar on 6/17/2017.
 */
class Map {
    constructor() {
        this.canvas = $('canvas')[0];
        this.ctx = this.canvas.getContext("2d");
        this.towers = [];
        this.walls = [];
        this.path = [];
        this.maze = [
            ['S', 'S',   'S','S',  'cru','t',  't','t','t',  'clu','S','S'],
            ['S', 'S',   'S','S',  'l',  'ctl','b','b','ctr','r','S','S'],
            ['S', 'S',   'S','S',  'l',  'r',  'S','S','l',  'r','S','S'],
            ['S', 'S',   'S','S',  'l',  'r',  'S','S','l',  'r','S','S'],
            ['S', 'cru', 't','t', 'cbr','r',  'S','S','l',  'r','S','S'],
            ['S', 'l',  'ctl','b','b',  'cld','S','S','l',  'cbl','t','t'],
            ['S', 'l',  'r',  'S','S',  'S',  'S','S','crd','b','b','b'],
            ['S', 'l',  'r',  'S','S',  'S',  'S','S','S','S','S','S']
        ];
        this.types = {
            walls: {
                green: {
                    solid: {x: 1, y: 1},
                    right: {x: 0, y: 1},
                    top: {x: 1, y: 2},
                    bottom: {x: 1, y: 0},
                    left: {x: 2, y: 1},
                    corner_top_left: {x: 0, y: 0},
                    corner_top_right: {x: 2, y: 0},
                    corner_bottom_left: {x: 0, y: 2},
                    corner_bottom_right: {x: 2, y: 2},
                    curve_right_up: {x: 3, y: 0},
                    curve_left_up: {x: 4, y: 0},
                    curve_right_down: {x: 3, y: 1},
                    curve_left_down: {x: 4, y: 1},
                }
            },
            path: {
                green: {x: 4, y: 5},
                brown: {x: 4, y: 2},
                tan: {x: 4, y: 8},
                silver: {x: 4, y: 11}
            },
            towers: {
                cannon: {
                    level_1: {x: 20, y: 11, mx: 20, my: 8},
                    level_2: {x: 21, y: 11, mx: 20, my: 8}
                },
                missile_1: {x: 20, y: 10, mx: 21, my: 8},
                missile_2: {x: 20, y: 9, mx: 21, my: 8}
            },
            mobs: {
                type1: {},
                type2: {},
                type3: {},
                type4: {},
                tank1: {},
                tank2: {}
            }
        };
        for (let i = 0, y = 0; i < this.maze.length; i++, y += 64) {
            for (let j = 0, x = 0; j < this.maze[i].length; j++, x += 64) {
                switch (this.maze[i][j]) {
                    case 'C':
                        this.towers.push(new Tower(this.types.towers.cannon.level_1, x, y));
                        this.walls.push(new Wall(this.types.walls.green.solid, x, y));
                        break;
                    case 'm':
                        this.towers.push(new Tower(this.types.towers.missile_1, x, y));
                        this.walls.push(new Wall(this.types.walls.green.solid, x, y));
                        break;
                    case'M':
                        this.towers.push(new Tower(this.types.towers.missile_2, x, y));
                        this.walls.push(new Wall(this.types.walls.green.solid, x, y));
                        break;
                    case 'S':
                        this.walls.push(new Wall(this.types.walls.green.solid, x, y));
                        break;
                    case ' ':
                    case 's':
                    case 'g':
                        this.path.push(new Path(this.types.path.brown, x, y));
                        break;
                    case'b':
                        this.walls.push(new Wall(this.types.walls.green.bottom, x, y));
                        break;
                    case 'l':
                        this.walls.push(new Wall(this.types.walls.green.left, x, y));
                        break;
                    case 'r':
                        this.walls.push(new Wall(this.types.walls.green.right, x, y));
                        break;
                    case 't':
                        this.walls.push(new Wall(this.types.walls.green.top, x, y));
                        break;
                    case 'cru':
                        this.walls.push(new Wall(this.types.walls.green.curve_right_up, x, y));
                        break;
                    case 'clu':
                        this.walls.push(new Wall(this.types.walls.green.curve_left_up, x, y));
                        break;
                    case 'crd':
                        this.walls.push(new Wall(this.types.walls.green.curve_right_down, x, y));
                        break;
                    case 'cld':
                        this.walls.push(new Wall(this.types.walls.green.curve_left_down, x, y));
                        break;
                    case 'ctl':
                        this.walls.push(new Wall(this.types.walls.green.corner_top_left, x, y));
                        break;

                    case 'ctr':
                        this.walls.push(new Wall(this.types.walls.green.corner_top_right, x, y));
                        break;

                    case 'cbl':
                        this.walls.push(new Wall(this.types.walls.green.corner_bottom_left, x, y));
                        break;

                    case 'cbr':
                        this.walls.push(new Wall(this.types.walls.green.corner_bottom_right, x, y));
                        break;
                }
            }
        }
    }

    build() {
        for (let i = 0; i < this.walls.length; i++) {
            this.walls[i].draw(this.ctx);
        }
        for (let i = 0; i < this.path.length; i++) {
            this.path[i].draw(this.ctx);
        }
        for (let i = 0; i < this.towers.length; i++) {
            this.towers[i].draw(this.ctx);
        }
    }
}
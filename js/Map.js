/**
 * Created by komar on 6/17/2017.
 */
class Map {
    constructor() {
        this.walls = [];
        this.path = [];
        this.maze = {
            background: [
                ['S', 'S', 'S', 'S', 'cru', 't', 't', 't', 't', 'clu', 'S', 'S'],
                ['S', 'S', 'S', 'S', 'l', 'ctl', 'b', 'b', 'ctr', 'r', 'S', 'S'],
                ['S', 'S', 'S', 'S', 'l', 'r', 'S', 'S', 'l', 'r', 'S', 'S'],
                ['S', 'S', 'S', 'S', 'l', 'r', 'S', 'S', 'l', 'r', 'S', 'S'],
                ['S', 'cru', 't', 't', 'cbr', 'r', 'S', 'S', 'l', 'r', 'S', 'S'],
                ['S', 'l', 'ctl', 'b', 'b', 'cld', 'S', 'S', 'l', 'cbl', 't', 't'],
                ['S', 'l', 'r', 'S', 'S', 'S', 'S', 'S', 'crd', 'b', 'b', 'b'],
                ['S', 'l', 'r', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S']],
            tower_locations: [
                ['T', 'T', 'T', 'T', 'X', 'X', 'X', 'X', 'X', 'X', 'T', 'T'],
                ['T', 'T', 'T', 'T', 'X', 'X', 'X', 'X', 'X', 'X', 'T', 'T'],
                ['T', 'T', 'T', 'T', 'X', 'X', 'T', 'T', 'X', 'X', 'T', 'T'],
                ['T', 'T', 'T', 'T', 'X', 'X', 'T', 'T', 'X', 'X', 'T', 'T'],
                ['T', 'X', 'X', 'X', 'X', 'X', 'T', 'T', 'X', 'X', 'T', 'T'],
                ['T', 'X', 'X', 'X', 'X', 'X', 'T', 'T', 'X', 'X', 'X', 'X'],
                ['T', 'X', 'X', 'T', 'T', 'T', 'T', 'T', 'X', 'X', 'X', 'X'],
                ['T', 'X', 'X', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T']],
            path: findPath([
                ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
                ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'x', 'x', 'x', 'x', 'x', 'x'],
                ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', ' ', 'x', 'x', 'x', 'x', 'x', 'x', 'x', ' ', 'x', 'x', 'x', 'x', 'x', 'x'],
                ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', ' ', 'x', 'x', 'x', 'x', 'x', 'x', 'x', ' ', 'x', 'x', 'x', 'x', 'x', 'x'],
                ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', ' ', 'x', 'x', 'x', 'x', 'x', 'x', 'x', ' ', 'x', 'x', 'x', 'x', 'x', 'x'],
                ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', ' ', 'x', 'x', 'x', 'x', 'x', 'x', 'x', ' ', 'x', 'x', 'x', 'x', 'x', 'x'],
                ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', ' ', 'x', 'x', 'x', 'x', 'x', 'x', 'x', ' ', 'x', 'x', 'x', 'x', 'x', 'x'],
                ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', ' ', 'x', 'x', 'x', 'x', 'x', 'x', 'x', ' ', 'x', 'x', 'x', 'x', 'x', 'x'],
                ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', ' ', 'x', 'x', 'x', 'x', 'x', 'x', 'x', ' ', 'x', 'x', 'x', 'x', 'x', 'x'],
                ['x', 'x', 'x', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'x', 'x', 'x', 'x', 'x', 'x', 'x', ' ', 'x', 'x', 'x', 'x', 'x', 'x'],
                ['x', 'x', 'x', ' ', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', ' ', 'x', 'x', 'x', 'x', 'x', 'x'],
                ['x', 'x', 'x', ' ', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', ' ', ' ', ' ', ' ', ' ', ' ', 'g'],
                ['x', 'x', 'x', ' ', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
                ['x', 'x', 'x', ' ', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
                ['x', 'x', 'x', ' ', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
                ['x', 'x', 'x', 's', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x']
            ])
        };
        for (let i = 0, y = 0; i < this.maze.background.length; i++, y++) {
            for (let j = 0, x = 0; j < this.maze.background[i].length; j++, x++) {
                switch (this.maze.background[i][j]) {
                    case 'S':
                        this.walls.push(new Wall(types.walls.green.solid, x, y));
                        break;
                    case ' ':
                        this.path.push(new Path(types.path.brown, x, y));
                        break;
                    case'b':
                        this.walls.push(new Wall(types.walls.green.bottom, x, y));
                        break;
                    case 'l':
                        this.walls.push(new Wall(types.walls.green.left, x, y));
                        break;
                    case 'r':
                        this.walls.push(new Wall(types.walls.green.right, x, y));
                        break;
                    case 't':
                        this.walls.push(new Wall(types.walls.green.top, x, y));
                        break;
                    case 'cru':
                        this.walls.push(new Wall(types.walls.green.curve_right_up, x, y));
                        break;
                    case 'clu':
                        this.walls.push(new Wall(types.walls.green.curve_left_up, x, y));
                        break;
                    case 'crd':
                        this.walls.push(new Wall(types.walls.green.curve_right_down, x, y));
                        break;
                    case 'cld':
                        this.walls.push(new Wall(types.walls.green.curve_left_down, x, y));
                        break;
                    case 'ctl':
                        this.walls.push(new Wall(types.walls.green.corner_top_left, x, y));
                        break;

                    case 'ctr':
                        this.walls.push(new Wall(types.walls.green.corner_top_right, x, y));
                        break;

                    case 'cbl':
                        this.walls.push(new Wall(types.walls.green.corner_bottom_left, x, y));
                        break;

                    case 'cbr':
                        this.walls.push(new Wall(types.walls.green.corner_bottom_right, x, y));
                        break;
                }
            }
        }
    }

    build(ctx) {
        this.walls.forEach(function (wall) {
            wall.draw(ctx);
        });
        this.path.forEach(function (path) {
            path.draw(ctx);
        });
    }
}
/**
 * Created by komar on 6/17/2017.
 */
class Map{
    constructor(){
        this.towers = [];
        this.walls = [];
        this.path = [];
        this.maze = [
            ['w','s','w','w','T','w','w','e','w'],
            ['w',' ','w',' ',' ',' ','T',' ','w'],
            ['T',' ','w',' ','T',' ','w',' ','T'],
            ['w',' ','T',' ','w',' ','w',' ','w'],
            ['w',' ','w',' ','T',' ','T',' ','w'],
            ['w',' ',' ',' ','w',' ',' ',' ','T'],
            ['w','w','w','T','w','w','w','w','w']
        ];
        for(let i = 0, y=0; i<this.maze.length; i++, y+=64){
            for(let j = 0, x=0; j<this.maze[i].length; j++, x+=64){
                if(this.maze[i][j] === 'T') {
                    this.towers.push(new Tower("img/PNG/Default size/towerDefense_tile249.png", x, y-10, 64,64));
                    this.walls.push(new Wall("img/PNG/Default size/towerDefense_tile129.png", x, y, 64,64));
                }else if(this.maze[i][j] === 'w'){
                    this.walls.push(new Wall("img/PNG/Default size/towerDefense_tile129.png", x, y, 64,64));
                }
            }
        }
    }
    build(){
        for(let i = 0; i<this.walls.length; i++){
            this.walls[i].draw();
        }
        for(let i = 0; i<this.towers.length; i++){
            this.towers[i].draw();
        }
    }
}
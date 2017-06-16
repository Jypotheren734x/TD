/**
 * Created by nick on 6/16/17.
 */
class Game{
    constructor(){
        this.canvas = $('canvas')[0];
        this.ctx = this.canvas.getContext("2d");
        this.towers = [];
        this.walls = [];
        this.mobs = [];
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
        for(let i = 0, y=0; i<this.maze.length; i++, y+=120){
            for(let j = 0, x=0; j<this.maze[0].length; j++, x+=120){
                if(this.maze[i][j] === 'T') {
                    this.towers.push(new Tower("img/Tower.png", x, y, 118, 118, 40));
                    this.walls.push(new Wall("img/wall.jpg", x, y, 118, 118, 40));
                }else if(this.maze[i][j] === 'w'){
                    this.walls.push(new Wall("img/wall.jpg", x, y, 118, 118, 40));
                }
            }
        }
        for(let j = 0; j<this.maze[0].length; j++){
            for(let i = 0; i<this.maze.length; i++){
                if(this.maze[i][j] === 's' || this.maze[i][j] === ' ' || this.maze[i][j] === 'e'){
                    this.path.push([i,j]);
                }
            }
        }
        for(let i = 0; i<120; i+=120){
            let mob = new Mob("img/mob_sprites.png", 120,i, 80,56,18, [
                [25,30],
                [0,5],
                [13,17],
                [36, 40]
            ],this.path);
            this.mobs.push(mob);
        }
    }
    animate(){
        this.canvas.width = this.canvas.width;
        for(let i = 0; i<this.walls.length; i++) {
            this.walls[i].animate(this.ctx);
        }
        for(let i = 0; i<this.towers.length; i++) {
            this.towers[i].animate(this.ctx);
        }
        for(let i = 0; i<this.mobs.length; i++) {
            this.mobs[i].animate(this.ctx);
        }
    }
}
class SpriteSheet{
    constructor(src, x,y, frameWidth, frameHeight, frameSpeed, scenes){
        this.image = new Image();
        this.x = x;
        this.y = y;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.frameSpeed = frameSpeed;
        this.scenes = scenes;
        this.current_scene = 0;
        let self = this;
        this.image.onload = function() {
            self.frames = Math.floor(self.image.width / self.frameWidth);
        };
        this.image.src = src;
        this.sequence = [];
        this.current = 0;
        this.counter = 0;
    }
    update(){
        this.sequence = [];
        for(let f = this.scenes[this.current_scene][0]; f<=this.scenes[this.current_scene][1]; f++){
            this.sequence.push(f);
        }
        if(this.counter == (this.frameSpeed - 1)){
            this.current = (this.current + 1) % this.sequence.length;
        }
        this.counter = (this.counter + 1) % this.frameSpeed;

    }
    animate(ctx){
        let row = Math.floor(this.sequence[this.current] / this.frames);
        let col = Math.floor(this.sequence[this.current] % this.frames);
        ctx.drawImage(
            this.image,
            col * this.frameWidth, row * this.frameHeight,
            this.frameWidth, this.frameHeight,
            this.x, this.y,
            this.frameWidth, this.frameHeight);
    }
}
class Sprite{
    constructor(src, x,y, frameWidth,frameHeight, frameSpeed, scenes){
        this.spritesheet = new SpriteSheet(src,x,y, frameWidth,frameHeight, frameSpeed, scenes);
    }
    animate(ctx){
        this.spritesheet.update();
        this.spritesheet.animate(ctx);
    }
}
class Tower extends Sprite{
    constructor(src, x,y, frameWidth,frameHeight, frameSpeed){
        super(src,x,y, frameWidth,frameHeight, frameSpeed, [[0,7]]);
    }
    attack(){

    }
}
class Wall extends Sprite{
    constructor(src, x,y, frameWidth,frameHeight, frameSpeed){
        super(src,x,y, frameWidth,frameHeight, frameSpeed, [[0,0]]);
    }
}
class Mob extends Sprite{
    constructor(src, x,y, frameWidth,frameHeight, frameSpeed, scenes, path){
        super(src,x,y, frameWidth,frameHeight, frameSpeed, scenes);
        this.path = path;
        this.current = 0;
    }
    down(){
        this.spritesheet.current_scene = 0;
        if(this.spritesheet.y + 1 < 650) {
            this.spritesheet.y++;
        }
    }
    left(){
        this.spritesheet.current_scene = 2;
        if(this.spritesheet.x - 1 > 0) {
            this.spritesheet.x--;
        }
    }
    right(){
        this.spritesheet.current_scene = 1;
        if(this.spritesheet.x + 1 <1800) {
            this.spritesheet.x++;
        }
    }
    up(){
        this.spritesheet.current_scene = 3;
        if(this.spritesheet.y - 1 > 0) {
            this.spritesheet.y--;
        }
    }
    move(){
    }
    animate(ctx){
        this.move();
        this.spritesheet.update();
        this.spritesheet.animate(ctx);
    }
}
var Key_Codes = {
    32: 'space',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    87: 'w',
    65: 'a',
    83: 's',
    68: 'd'
};
var Key_Status = [];
document.onkeydown = function (e) {
    if(Key_Codes[e.keyCode]){
        e.preventDefault();
        Key_Status[Key_Codes[e.keyCode]] = true
    }
};
document.onkeyup = function (e) {
    if(Key_Codes[e.keyCode]){
        e.preventDefault();
        Key_Status[Key_Codes[e.keyCode]] = false;
    }
};

/**
 * Created by nick on 6/16/17.
 */
$(document).ready(function () {
    let game = new Game();
    let fps = 60;
    function loop(){
        if (loaded()) {
            game.update();
        }
    }
    setInterval(loop, 1000 / fps);
});
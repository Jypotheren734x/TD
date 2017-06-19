/**
 * Created by nick on 6/16/17.
 */
$(document).ready(function () {
    let game = new Game();
    function mainLoop() {
        game.update();
        game.run();
        requestAnimationFrame(mainLoop);
    }
    requestAnimationFrame(mainLoop);
});
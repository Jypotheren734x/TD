/**
 * Created by nick on 6/16/17.
 */
$(document).ready(function () {
    let game = new Game();

    function mainLoop() {
        window.requestAnimationFrame(mainLoop);
        game.update();
        game.run();
    }

    mainLoop();
});
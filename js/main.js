/**
 * Created by nick on 6/16/17.
 */
require('helpers');
require('Pathing');
require('Map');
require('Sprites');
require('Game');
$(document).ready(function () {
    let game = new Game();

    function mainLoop() {
        game.update();
        game.run();
        requestAnimationFrame(mainLoop);
    }

    requestAnimationFrame(mainLoop);
});
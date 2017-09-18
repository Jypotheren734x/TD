/**
 * Created by nick on 6/16/17.
 */
$(document).ready(function () {
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    let game = new Game();
    var lastTime = (new Date()).getTime(),
        currentTime = 0,
        delta = 0;
    (function gameLoop() {
        currentTime = (new Date()).getTime();
        delta = (currentTime - lastTime) / 1000;
        game.update();
        game.run();
        window.requestAnimationFrame(gameLoop);
        lastTime = currentTime;
    })();
});
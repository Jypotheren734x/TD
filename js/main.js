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

    function loop() {
        game.update();
        game.run();
        requestAnimationFrame(loop);
    }

    loop();
});
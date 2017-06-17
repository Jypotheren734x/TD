/**
 * Created by nick on 6/16/17.
 */
$(document).ready(function () {
    let game = new Game();
    function animate() {
        game.animate();
    }
    setInterval(animate, 100);
});
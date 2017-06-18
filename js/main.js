/**
 * Created by nick on 6/16/17.
 */
$(document).ready(function () {
    let game = new Game();
    function run() {
        game.run();
    }
    setInterval(run, 10);
});
/**
 * Created by nick on 6/16/17.
 */
$(document).ready(function () {
    let map = new Map();
    function draw() {
        map.build();
    }
    setInterval(draw,10);
});
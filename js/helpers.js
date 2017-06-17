/**
 * Created by komar on 6/16/2017.
 */
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
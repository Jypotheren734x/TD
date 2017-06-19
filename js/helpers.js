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
    if (Key_Codes[e.keyCode]) {
        e.preventDefault();
        Key_Status[Key_Codes[e.keyCode]] = true
    }
};
document.onkeyup = function (e) {
    if (Key_Codes[e.keyCode]) {
        e.preventDefault();
        Key_Status[Key_Codes[e.keyCode]] = false;
    }
};
var canvas = $('canvas')[0];
var ctx = canvas.getContext("2d");
var mouse = {x:1920,y:1080};
var bounds = canvas.getBoundingClientRect();
function mousePosition (e) {
   return {
       x: e.clientX - bounds.left,
       y: e.clientY - bounds.top
    }
}
canvas.onclick = function (e) {
    mouse = mousePosition(e);
};
ctx.fillStyle = "#fff";

var TO_RADIANS = Math.PI / 180;
var types = {
    walls: {
        green: {
            solid: {x: 1, y: 1},
            right: {x: 0, y: 1},
            top: {x: 1, y: 2},
            bottom: {x: 1, y: 0},
            left: {x: 2, y: 1},
            corner_top_left: {x: 0, y: 0},
            corner_top_right: {x: 2, y: 0},
            corner_bottom_left: {x: 0, y: 2},
            corner_bottom_right: {x: 2, y: 2},
            curve_right_up: {x: 3, y: 0},
            curve_left_up: {x: 4, y: 0},
            curve_right_down: {x: 3, y: 1},
            curve_left_down: {x: 4, y: 1},
        }
    },
    ux:{
      empty:{x:18,y:0}
    },
    path: {
        green: {x: 4, y: 5},
        brown: {x: 4, y: 2},
        tan: {x: 4, y: 8},
        silver: {x: 4, y: 11}
    },
    towers: {
        cannon: {
            level_1: {type: "Cannon", level: 1, cost: 100, x: 19, y: 10, mx: 19, my: 7},
            level_2: {type: "Cannon", level: 2, cost: 200, x: 20, y: 10, mx: 19, my: 7}
        },
        missile: {
            level_1: {type: "Missile", level: 1, cost: 100, x: 19, y: 9, mx: 19, my: 7},
            level_2: {type: "Missile", level: 2, cost: 200, x: 20, y: 9, mx: 19, my: 7},
            level_3: {type: "Missile", level: 3, cost: 300, x: 21, y: 9, mx: 19, my: 7},
            level_4: {type: "Missile", level: 4, cost: 400, x: 22, y: 9, mx: 19, my: 7}
        }
    },
    mobs: {
        soldier: {type: "Soldier", level: 1, speed:1, x: 15, y: 10},
        robot: {type: "Robot", level: 2, speed:1, x: 16, y: 10},
        super_soldier: {type: "Super-Soldier", speed:1, level: 3, x: 17, y: 10},
        cyborg: {type: "Cyborg", level: 4, speed:1, x: 18, y: 10}
    }
};
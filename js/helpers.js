/**
 * Created by komar on 6/16/2017.
 */

var vendors = ['webkit', 'moz'];
for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
}
var Key_Codes = {
    32: 'space',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    87: 'w',
    65: 'a',
    83: 's',
    68: 'd',
    27: 'esc'
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
canvas.width = window.innerWidth - 40;
canvas.height = window.innerHeight - 50;
var mousePressed = false;
var dragging = false;
var mouse = {x: 1920, y: 1080};
var bounds = canvas.getBoundingClientRect();
function mousePosition(e) {
    return {
        x: e.clientX - bounds.left,
        y: e.clientY - bounds.top
    }
}
ctx.fillStyle = "#fff";
function digits(n){
    let array = [];
    while(n >= 1){
        let num = Math.floor(n % 10);
        array.push(num);
        n /= 10;
    }
    array.reverse();
    return array;
}
var TO_RADIANS = Math.PI / 180;
var scale = 64;
var mob_scale = 32;
var tilesheet = "img/Tilesheet/towerDefense_tilesheet.png";
if (canvas.width > 3000 && canvas.height > 2000) {
    scale = 128;
    mob_scale = 64;
    tilesheet = 'img/Tilesheet/towerDefense_tilesheet@2.png';
}
var types = {
    decorations:{
        big_bush:{x:15,y:5},
        medium_bush:{x:16,y:5},
        small_bush:{x:17,y:5},
        round_bush:{x:18,y:5},
        star_bush:{x:19,y:5},
        big_rock:{x:21,y:5},
        medium_rock:{x:22,y:5},
        small_rock:{x:20,y:5},
    },
    numbers:{
        0:{x:0,y:12},
        1:{x:1,y:12},
        2:{x:2,y:12},
        3:{x:3,y:12},
        4:{x:4,y:12},
        5:{x:5,y:12},
        6:{x:6,y:12},
        7:{x:7,y:12},
        8:{x:8,y:12},
        9:{x:9,y:12}
    },
    symbols:{
        percent:{x:10,y:12},
        $:{x:11,y:12},
        colon:{x:12,y:12},
        plus:{x:13,y:12},
        period:{x:14,y:12},
    },
    walls: {
        green: {
            solid: {value: 'S', x: 1, y: 1},
            right: {value: 'r', x: 0, y: 1},
            top: {value: 't', x: 1, y: 2},
            bottom: {value: 'b', x: 1, y: 0},
            left: {value: 'l', x: 2, y: 1},
            corner_top_left: {value: 'ctl', x: 0, y: 0},
            corner_top_right: {value: 'ctr', x: 2, y: 0},
            corner_bottom_left: {value: 'cbl', x: 0, y: 2},
            corner_bottom_right: {value: 'cbr', x: 2, y: 2},
            curve_right_up: {value: 'cru', x: 3, y: 0},
            curve_left_up: {value: 'clu', x: 4, y: 0},
            curve_right_down: {value: 'crd', x: 3, y: 1},
            curve_left_down: {value: 'cld', x: 4, y: 1},
        }
    },
    ux: {
        empty: {x: 18, y: 0}
    },
    path: {
        green: {x: 4, y: 5},
        brown: {x: 4, y: 2},
        tan: {x: 4, y: 8},
        silver: {x: 4, y: 11}
    },
    towers: {
        cannon: {
            level_1: {
                type: "cannon",
                level: 1,
                cost: 110,
                attack: 10,
                attack_speed: 1,
                range: 2,
                upgrade_cost: 120,
                x: 19,
                y: 10,
                mx: 19,
                my: 7,
                ax: 21,
                ay: 12
            },
            level_2: {
                type: "cannon",
                level: 2,
                cost: 220,
                attack: 20,
                range: 2,
                attack_speed: 1,
                upgrade_cost: 0,
                x: 20,
                y: 10,
                mx: 19,
                my: 7
            }
        },
        missile: {
            level_1: {
                type: "missile",
                level: 1,
                cost: 210,
                attack: 25,
                range: 5,
                attack_speed: 7,
                upgrade_cost: 310,
                x: 19,
                y: 9,
                mx: 19,
                my: 7
            },
            level_2: {
                type: "missile",
                level: 2,
                cost: 310,
                attack: 35,
                range: 5,
                attack_speed: 7,
                upgrade_cost: 410,
                x: 20,
                y: 9,
                mx: 19,
                my: 7
            },
            level_3: {
                type: "missile",
                level: 3,
                cost: 410,
                attack: 45,
                range: 5,
                attack_speed: 7,
                upgrade_cost: 510,
                x: 21,
                y: 9,
                mx: 19,
                my: 7
            },
            level_4: {
                type: "missile",
                level: 4,
                cost: 510,
                attack: 55,
                range: 5,
                attack_speed: 7,
                upgrade_cost: 0,
                x: 22,
                y: 9,
                mx: 19,
                my: 7
            }
        }
    },
    mobs: {
        soldier: {type: "Soldier", level: 1, speed: 1, x: 15, y: 10},
        robot: {type: "Robot", level: 2, speed: 1, x: 16, y: 10},
        super_soldier: {type: "Super-Soldier", level: 3, speed: 1, x: 17, y: 10},
        cyborg: {type: "Cyborg", level: 4, speed: 1, x: 18, y: 10},
        tank_1: {type: "Boss", level: 20, speed: 1, x: 15, y: 11, wx: 15, wy: 12},
        tank_2: {type: "Boss", level: 30, speed: 1, x: 16, y: 11, wx: 16, wy: 12},
        plane_1: {type: "Air", level: 2, speed: 1, x: 17, y: 11, wx: 17, wy: 12},
        plane_2: {type: "Air", level: 3, speed: 1, x: 18, y: 11, wx: 17, wy: 12},
    }
};
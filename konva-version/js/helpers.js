/**
 * Created by komar on 6/16/2017.
 */
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
var stage = new Konva.Stage({
    container: 'game',
    width: window.innerWidth,
    height: window.innerHeight
});
var layer_1 = new Konva.Layer();
var TO_RADIANS = Math.PI / 180;
var types = {
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
                cost: 100,
                attack: 10,
                attack_speed: 1,
                range: 2,
                upgrade_cost: 200,
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
                cost: 200,
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
                cost: 100,
                attack: 15,
                range: 5,
                attack_speed: 5,
                upgrade_cost: 200,
                x: 19,
                y: 9,
                mx: 19,
                my: 7
            },
            level_2: {
                type: "missile",
                level: 2,
                cost: 200,
                attack: 25,
                range: 5,
                attack_speed: 5,
                upgrade_cost: 300,
                x: 20,
                y: 9,
                mx: 19,
                my: 7
            },
            level_3: {
                type: "missile",
                level: 3,
                cost: 300,
                attack: 35,
                range: 5,
                attack_speed: 5,
                upgrade_cost: 400,
                x: 21,
                y: 9,
                mx: 19,
                my: 7
            },
            level_4: {
                type: "missile",
                level: 4,
                cost: 400,
                attack: 45,
                range: 5,
                attack_speed: 5,
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
        super_soldier: {type: "Super-Soldier", speed: 1, level: 3, x: 17, y: 10},
        cyborg: {type: "Cyborg", level: 4, speed: 1, x: 18, y: 10}
    }
};
const fs = require('fs');
const util = require('./util.js');

const NO_OF_ROWS = 1000;
let hvMap = new Array(NO_OF_ROWS * NO_OF_ROWS);
hvMap.fill(0);

let considerDiagonalLines = false;

function GetPointIndex(x, y) {
    return x * NO_OF_ROWS + y;
}

function markLineInMap(x1, y1, x2, y2) {
    if (x1 == x2) {
        let startY = Math.min(y1, y2);
        let endY = Math.max(y1, y2);

        for (let y = startY; y <= endY; y++) {
            point = GetPointIndex(x1, y);
            hvMap[point]++;
        }
    }
    else if (y1 == y2) {
        let startX = Math.min(x1, x2);
        let endX = Math.max(x1, x2);

        for (let x = startX; x <= endX; x++) {
            point = GetPointIndex(x, y1);
            hvMap[point]++;
        }
    } else if (considerDiagonalLines && (Math.abs(x1 - x2) == Math.abs(y1 - y2))) {

        let stepX = (x1 >= x2) ? -1 : +1;
        let stepY = (y1 >= y2) ? -1 : +1;

        let x = x1;
        let y = y1;
        let count = Math.abs(x1 - x2) + 1;

        for (let i = 0; i<  count; i++) {

            point = GetPointIndex(x, y);
            hvMap[point]++;
            x += stepX;
            y += stepY;
        }        
    }
}

function readInput(considerDiagonal) {

    considerDiagonalLines = considerDiagonal;

    hvMap.fill(0);// in the begining any point is crossed by no line

    let lines = util.MapInput('./Input5.txt', (aElem) => {

        if (!aElem || (aElem == ''))
            return;

        let pair = aElem.split(' -> ');

        let startCoord = pair[0].split(',');
        let endCoord = pair[1].split(',');

        let x1 = parseInt(startCoord[0]);
        let y1 = parseInt(startCoord[1]);

        let x2 = parseInt(endCoord[0]);
        let y2 = parseInt(endCoord[1]);

        markLineInMap(x1, y1, x2, y2);
    },
        '\r\n');
}

function CountIntersectionPoints() {
    let result = 0;
    for (let i = 0; i < hvMap.length; i++) {
        if (hvMap[i] >= 2)
            result++;
    }
    return result;
}

function displayMap() {
    for (let i = 0; i < NO_OF_ROWS; i++) {
        let line = hvMap.slice(NO_OF_ROWS * i, NO_OF_ROWS);
        let strLine = line.toString();

        console.log(strLine);
    }
}

part1();

//displayMap();

part2();

function part1() {

    readInput(false);

    let result = CountIntersectionPoints();

    console.log("1: Number of points with 2 or more intersection IS: " + result);
}

function part2() {

    readInput(true);

    let result = CountIntersectionPoints();

    console.log("2: Number of points with 2 or more intersection IS: " + result);
}

const fs = require('fs');
const util = require('./util.js');
const DorelUtil = require('./DorelUtil.js');


let inputLines = fs.readFileSync('input11.txt', 'utf8').split(/\r?\n/);

let inputLevels = inputLines.map(function (a) {
    let chars = a.split('');
    return chars.map(function (b) { return parseInt(b) })
});

const NO_OF_ROWS = inputLines.length;
const NO_OF_COLUMNS = inputLevels[0].length;

part1();

part2();

function part1() {

    let totalFlashes = 0;

    for (let step = 1; step <= 100; step++) {

        let newState = IncreaseEnergy(inputLevels);
        printState(newState, "After Energy increase for step:" + step);

        let crtFlashes = 0;
        do {
            crtFlashes = Flash(newState);
            //printState(newState, "After FLASH");
            totalFlashes += crtFlashes;
        }
        while (crtFlashes > 0)

        ResetFlashes(newState);
        inputLevels = newState;
    }

    console.log("1: Total number of flashes after 100 steps: " + totalFlashes);
}

function part2() {

    console.log("2: Total size of 3 largest basins is: " + "??");
}

function IncreaseEnergy(inputLevels) {
    let newState = new Array(inputLevels.length);
    for (let i = 0; i < NO_OF_ROWS; i++) {
        newState[i] = new Array(inputLevels[i].length);
        for (let j = 0; j < NO_OF_COLUMNS; j++) {
            let newEnergyLevel = inputLevels[i][j] + 1;
            newState[i][j] = newEnergyLevel;
        }
    }
    return newState;
}

function GetAdjacents(i, j) {
    let adj = new Array();

    //UP
    if (i > 0)
    {
        if (j > 0)
          adj.push({ x: i - 1, y: j - 1 });//NV

        adj.push(  { x: i - 1, y: j     }); //N

        if (j < NO_OF_COLUMNS -1 )
          adj.push({ x: i - 1, y: j + 1 }); //NE
    }

    //DOWN
    if (i < NO_OF_ROWS - 1)
    {
        if ( j > 0)
           adj.push({ x: i + 1, y: j - 1 }); // SV

        adj.push(   { x: i + 1, y: j     }); // S

        if ( j < NO_OF_COLUMNS - 1)
           adj.push({ x: i + 1, y: j + 1 });  // SE
    }

    //LEFT
    if (j > 0)
        adj.push({ x: i, y: j - 1 });

    //RIGHT
    if (j < NO_OF_COLUMNS - 1)
        adj.push({ x: i, y: j + 1 });

    return adj;
}

function Flash(aState) {
    let newFlashesCount = 0;

    for (let i = 0; i < NO_OF_ROWS; i++) {
        for (let j = 0; j < NO_OF_COLUMNS; j++)
        {
            let energyLevel = aState[i][j];
            if (energyLevel > 9)
            {
                aState[i][j] = -1;
                newFlashesCount++;

                let adjacents = GetAdjacents(i, j);
                for (let ai = 0; ai < adjacents.length; ai++)
                 {
                    let pair = adjacents[ai];
                    let adjLevel = aState[pair.x][pair.y];

                    if (adjLevel > 0)
                      aState[pair.x][pair.y]++;
                };
            }
        }
    }
    return newFlashesCount;
}

function ResetFlashes(aState) {
    for (let i = 0; i < NO_OF_ROWS; i++) {
        for (let j = 0; j < NO_OF_COLUMNS; j++) {
            if (aState[i][j] < 0)
                aState[i][j] = 0;
        }
    }
}

function printState(aState, aMsg) {
    console.log("------START  " + aMsg);

    for (let i = 0; i < aState.length; i++) 
    {
        let clone   = aState[i].map( (a) => ((a < 0)  || (a> 9)) ? 0: a );
        let crtLIne = clone.join('');
        console.log(crtLIne);
    }
    console.log("------END");
}
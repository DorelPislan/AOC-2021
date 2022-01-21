const fs = require('fs');
const util = require('./util.js');
const DorelUtil = require('./DorelUtil.js');


var NO_OF_COLS = 0;
var NO_OF_ROWS = 0;

let inputDots = fs.readFileSync('input13Sample.txt', 'utf8').split(/\r?\n/).map( function(line) {
    if (line.length < 12 )
    {
      let pair = line.split(',');
      let x = parseInt(pair[0]);
      let y = parseInt(pair[1]);

      return { x, y};
    }
    else
    {
        let pair= line.split('=');    
        let d = pair[0].charAt(pair[0].length - 1 );
        let v = parseInt(pair[1]);

        return { d, v };
    }
  } );

//const NO_OF_ROWS = 20;//1400;//893
//const NO_OF_COLS = 20;//1400;//1310

let gDotsMap  = new Array(NO_OF_ROWS);
let gFoldings = new Array();

function ReadInput() {
    
  let sepIndex = -1;
  for ( let i = 0; i < inputDots.length; i++ )
  {
    let crt = inputDots[i];
    NO_OF_ROWS =  Math.max(NO_OF_ROWS, crt.x);
    NO_OF_COLS =  Math.max(NO_OF_COLS, crt.y);
  }


    for (let i = 0; i < gDotsMap.length; i++) {
        gDotsMap[i] = new Array(NO_OF_COLS);
        gDotsMap[i].fill(' ');
    }

    let sepEncountered = false;

    for (let i = 0; i < inputLines.length; i++) {         

        let crtLine = inputLines[i];
        if(crtLine =="")
        {
            sepEncountered = true;
            continue;
        }
        if(sepEncountered )
        {
            let pair= crtLine.split('=');
    
            let d = pair[0].charAt(pair[0].length - 1 );
            let v = parseInt(pair[1]);
    
            gFoldings.push( {dir: d, val:v });
        }
        else
        {
        let coord = crtLine.split(',');
        let y = parseInt(coord[0]);
        let x = parseInt(coord[1]);

        gDotsMap[x][y] = '#';
        }
    }
}

//ReadInput();

part1();

//part2();

function part1() {

    printMatrix();
    const FOLDINGS_COUNT  = 1; //gFoldings[i].length
    for (let i = 0; i < FOLDINGS_COUNT; i++)
    {        
        if (gFoldings[i].dir == "x")
        { 
            FoldHorizontally();
        }
        else
        {
            FoldVertically();
        }
    }

    console.log("1: Total number of flashes after 100 steps: " + "???");
}

function part2() {


    console.log("2: Step at which al octopuses flashsimulataneously is: " + "simStep");
}

function FoldHorizontally()
{}

function FoldVertically()
{}

function printMatrix()
{
    gDotsMap.forEach( function(line)
    { 
       console.log(line.join('') );
    });
}

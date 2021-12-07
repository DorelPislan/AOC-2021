const fs = require('fs');
const util = require('./util.js');

let counters = util.MapInput('./Input6.txt', aElem => parseInt(aElem), ',');

//part1();

part2();

function part1() {

    for (let iterations = 0; iterations < 80; iterations++) {
        let crtLength = counters.length;
        for (let i = 0; i < crtLength; i++) {
            if (counters[i] == 0) {
                counters[i] = 6;
                counters.push(8);
            }
            else
                counters[i]--;
        }
    }
    let result = counters.length;
    console.log("1: Number of lanternfish afrer 80 days  IS: " + result);
}

function part2() {

    let crtState = new Array(9);
    crtState.fill(0);
    
    //count each type of fish
    for(let  i = 0; i < counters.length; i++)
      crtState[counters[i]]++;

    const NO_OF_ITERS = 256;
    for (let iter = 0; iter < NO_OF_ITERS; iter++)
    {
       let newState = new Array(9);
       newState.fill(0);

       for (let i = 0; i < 9; i++)
       {
            if (i == 0) {
              newState[6] += crtState[i];
              newState[8] += crtState[i];
            }
            else
               newState[i-1] += crtState[i];
        }
        crtState = newState;
      }

      let totalCount = 0;
      for(let i = 0; i < crtState.length; i++)
        totalCount += crtState[i];
   
    console.log("2: Number of lanternfish after " + NO_OF_ITERS + " days  IS: " + totalCount);    
}

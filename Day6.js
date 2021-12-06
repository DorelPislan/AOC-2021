const fs = require('fs');
const util = require('./util.js');

let counters = util.MapInput('./Input6.txt', aElem=> parseInt(aElem),',');

part1();

//part2();

function part1() {

    for (let iterations = 0; iterations < 80; iterations++)
    {
        let crtLength = counters.length;
        for(let i = 0 ; i < crtLength; i++)
        {
            let newVal = counters[i];
            if (counters[i] == 0)
            {
                counters[i] = 6;
                counters.push(8);
            }
            else
              counters[i] --;
        }
        
    }
    let result = counters.length;
    console.log("1: Number of lanternfish afrer 80 days  IS: " + result);
}

function part2() {

    
    for (let iterations = 0; iterations < 256; iterations++)
    {
        let crtLength = counters.length;
        for(let i = 0 ; i < crtLength; i++)
        {
            let newVal = counters[i];
            if (newVal == 0)
            {
                newVal = 6;
                counters.push(8);
            }
            else
             newVal --;

            counters[i] = newVal;
        }
        
    }
    let result = counters.length;
    console.log("2: Number of lanternfish afrer 256 days  IS: " + result);
}

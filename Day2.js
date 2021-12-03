const fs = require('fs');
const util = require('../util.js');

let indications = util.MapInput('./Input2.txt', (aElem) => {
    let pair = aElem.split(' ');
    
    return { dir: pair[0], val: parseInt(pair[1], 10)};
},
    '\n');

console.log(indications);
let horPos = 0;
let depth = 0;
let aim = 0;

    //part1();
    part2();

function part1() {
    
    for (let i = 0; i < indications.length; i++)
    {
        if (indications[i].dir == "forward")
          horPos += indications[i].val;
        else if (indications[i].dir == "down")
          depth += indications[i].val;
        else if (indications[i].dir == "up")
          depth -= indications[i].val;
    }
    let res = horPos * depth;
    console.log("1: HorPos = " + horPos + " Depth = " + depth + " Result IS:" + res);
}

function part2() {

    for (let i = 0; i < indications.length; i++)
    {
        if (indications[i].dir == "forward")
        {
          horPos += indications[i].val;
          if (aim != 0)
            depth += aim * indications[i].val;
        }
        else if (indications[i].dir == "down")
        {
          aim += indications[i].val;
        }
        else if (indications[i].dir == "up")
        {
          aim -= indications[i].val;
        }
    }
    let res = horPos * depth;
    console.log("2: HorPos = " + horPos + " Depth = " + depth + " Result IS:" + res);

}

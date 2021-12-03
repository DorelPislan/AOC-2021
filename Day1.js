const fs = require('fs');
const util = require('./util.js');

let depths = util.MapInput('./Input1.txt', (aElem) => { return parseInt(aElem, 10); }, '\r\n');

part1();
part2();

function part1()
{
  let pluses = 0;
  for (let i = 1; i < depths.length; i++ )
  {
    if (depths[i] > depths[i-1] )
      pluses++;
  }
  console.log("Number of increases IS:" + pluses);
}

function part2()
{   
    let pluses = 0;
    for (let i = 0; i < depths.length - 2; i++ )
    {
        let sum1 = depths[i] + depths[i+1] + depths[i+2];
        let sum2 = depths[i+1] + depths[i+2] + depths[i+3];
        if (sum2 > sum1)
          pluses++;
    }    
    console.log("Number of increases of groups of 3 IS:" + pluses);

}

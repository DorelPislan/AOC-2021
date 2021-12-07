const fs = require('fs');
const util = require('./util.js');

let crabsPos = util.MapInput('./Input7.txt', aElem => parseInt(aElem), ',');

function MaxElem(aArray)
{
   let max = 0;
   aArray.forEach( e => max = Math.max(e, max) ) ;
   return max;
}

let MaxCoord = MaxElem(crabsPos);
let costs = new Array(MaxCoord);

part1();

part2();

function part1() {
    
    let minCost = Number.MAX_SAFE_INTEGER;
    let minCostCoord = 0;

    for (let horPos = 0; horPos < MaxCoord; horPos++)
    {
      let crtCost = 0;
      for (let i = 0 ; i < crabsPos.length; i++)
      {        
        crtCost += Math.abs(crabsPos[i] - horPos);
      }

      if(crtCost < minCost)
      {
          minCost = crtCost;
          minCostCoord = horPos;
      }
    }
    console.log("1: Minimum cost for aligning crabs is " + minCost + " and laignemnt is on position " + minCostCoord);
}

function part2() {

    let minCost = Number.MAX_SAFE_INTEGER;
    let minCostCoord = 0;

    for (let horPos = 0; horPos < MaxCoord; horPos++)
    {
      let crtCost = 0;
      for (let i = 0 ; i < crabsPos.length; i++)
      {
          let diff = Math.abs(crabsPos[i] - horPos)
          let cost = (diff * (diff + 1))/2
          crtCost += cost;
      }

      if(crtCost < minCost)
      {
          minCost = crtCost;
          minCostCoord = horPos;
      }
    }
    console.log("2: Minimum cost for aligning crabs is " + minCost + " and laignemnt is on position " + minCostCoord);
}

const fs = require('fs');
const util = require('./util.js');
const DorelUtil = require('./DorelUtil.js');


let inputs = util.MapInput('./Input8Sample.txt', (aElem) => {

    let pair = aElem.split(' | ');
  
    let wires = pair[0].split(' ');
    let outputs = pair[1].split(' ');

    return { wires: wires, outs: outputs };
  },
    '\r\n');

//                         0       1       2        3        4        5       6         7       8          9
const kDigsSegs     = [ 'abcefg', 'cf', 'acdeg', 'acdfg', 'bcdf', 'abdfg', 'abdefg', 'acf', 'abcdefg', 'abcdfg' ];
const kDigsSegsCount= [    6,      2,      5,       5,       4,       5,      6 ,       3,      7,         6    ];

let SegCountToDigit = new Map();
SegCountToDigit.set(2, [1] );
SegCountToDigit.set(3, [7] ); 
SegCountToDigit.set(4, [4] ),
SegCountToDigit.set(5, [2, 3, 5] );
SegCountToDigit.set(6, [0, 6, 9] );
SegCountToDigit.set(7, [8] );
 

//part1();

part2();

function part1() {
    
   let count1478 = 0;
   for(let i = 0; i < inputs.length; i++)
   {
       let crtInput = inputs[i];
       for(let oi = 0; oi < crtInput.outs.length; oi++ )
       {
           let crtOut = crtInput.outs[oi];
           let crtOutLength = crtOut.length;
           if  ( (crtOutLength == 2) || 
                 (crtOutLength == 4) ||
                 (crtOutLength == 3) || 
                 (crtOutLength == 7) )
            {
                count1478++;
            }
       }
   }
   console.log("1: Count of 1,4,7 and 8 in my output is : " + count1478);
}

function part2() {
    let sum = 0;
    for(let i = 0; i < inputs.length; i++)
    {
        let crtInputWires = inputs[i].wires;
        let mapForInput = DetectMapForInput(crtInputWires);

        let crtInputOuts = inputs[i].outs;
        //let decodedDigits = DecodeDigits(mapForInput, inputs[i].outputs);

        // sum += OutsNumber(decodedDigits);
    }
    console.log("2: Sum of all output numbers is: " + sum);
}

function DetectMapForInput(aWiresArray )
{
    let map  = new Map([
        ['a', 'd'], 
        ['b', 'e'],
        ['c', 'a'],
        ['d', 'f'],
        ['e', 'g'],
        ['f', 'b'],
        ['g', 'c']
    ]);

    let inputFor1 = GetElemByLength(aWiresArray, kDigsSegsCount[1] );
    let realSegsFor1 = kDigsSegs[1];

    let inputFor7 = GetElemByLength(aWiresArray, kDigsSegsCount[7] );
    let realSegsFor7 = kDigsSegs[7];

    let inputFor4 = GetElemByLength(aWiresArray, kDigsSegsCount[4] );
    let realSegsFor4 = kDigsSegs[4];

    let inputFor8 = GetElemByLength(aWiresArray, kDigsSegsCount[8] );
    let realSegsFor8 = kDigsSegs[8];

    let decoded1 = DecodeDigit(inputFor1, map);
    let decoded4 = DecodeDigit(inputFor4, map);
    let decoded7 = DecodeDigit(inputFor4, map);
    let decoded8 = DecodeDigit(inputFor8, map);
      
   return map;
}

function GetElemByLength(aArray, aReqLength)
{
    for(let i = 0; i < aArray.length; i++)
    {
        if(aArray[i].length == aReqLength)
          return aArray[i];

    }
    return null;
}

function MapIsValid(aMap, aWiresArray)
{
    for(let wi = 0 ; wi < aWiresArray.length; wi++)
    {        
        let decodedInput = DecodeDigit(aWiresArray[wi], aMap);
    }
}

function DecodeDigit(aInputDigit, aMap)
{
   let decodedChars = new Array(9);

   let inputChars = aInputDigit.split('');

   for(let ici = 0; ici < inputChars.length; ici++ )        
   {
       let outChar = aMap[ inputChars[ici] ];

       if (outChar == null)
         outChar = 'X';

       decodedChars[ici] = outChar;         
   }
   return inputChars

}
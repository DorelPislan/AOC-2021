const fs = require('fs');
const util = require('./util.js');
const DorelUtil = require('./DorelUtil.js');


let inputs = util.MapInput('./Input8.txt', (aElem) => {

    let pair = aElem.split(' | ');
  
    let wires = pair[0].split(' ');
    let outputs = pair[1].split(' ');

    return { wires: wires, outs: outputs };
  },
    '\r\n');

//                  0       1       2        3        4        5       6         7       8          9
const digits = [ 'abcefg', 'cf', 'acdeg', 'acdfg', 'bcdf', 'abdfg', 'abdefg', 'acf', 'abcdefg', 'abcdfg' ];
const segCount=[    6,      2,      5,       5,       4,       5,      6 ,       3,      7,         6     ];

let SegCountToDigit = new Map();
SegCountToDigit.set(2, [1] );
SegCountToDigit.set(2, [1] ),
SegCountToDigit.set(3, [7] ); 
SegCountToDigit.set(4, [4] ),
SegCountToDigit.set(5, [2, 3, 5] );
SegCountToDigit.set(6, [6] );
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
    let map  = new Map();

    for (let wi = 0; aWiresArray.length; wi++)
    {
        let crtStr = aWiresArray[wi];
        let crtStrLength = crtStr.length;

        if  ( (crtStrLength == 2) || 
              (crtStrLength == 4) ||
              (crtStrLength == 3) || 
              (crtStrLength == 7) )
        {

          //let goodDigitIndex = (crtStrLength == 2) ? ;
          for (let ci = 0; ci < crtStrLength; ci ++ )
          {
            let ch = crtStr.charAt(ci);
            let possib = map[ci];

            if (map[ch] == null)
              map[ch] = new Array();

            map[ch].push(ch);
          }
        }
    }
    
   return map;
}
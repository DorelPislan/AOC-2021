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

        let decodedDigits = DecodeDigits(mapForInput, inputs[i].outs);

        let number = ArrayOfDigitsToDecimal(decodedDigits);

        sum += number;
    }
    console.log("2: Sum of all output numbers is: " + sum);
}

function DetectMapForInput(aWiresArray )
{
    let map2  = new Map();

    let mapKeys  = 'deafgbc';
    let decoding = 'abcdefg';

    const kLetters = 'abcdefg';
    
    for(let i = 0; i < 7; i++)
      map2[ mapKeys.charAt(i) ] = decoding.charAt( i );

    let map  = new Map([
        [ 'd'.charAt(0), 'b'.charAt(0)], 
        [ 'e'.charAt(0), 'a'.charAt(0)],
        [ 'a'.charAt(0), 'c'.charAt(0)],
        [ 'f'.charAt(0), 'd'.charAt(0)],
        [ 'g'.charAt(0), 'e'.charAt(0)],
        [ 'b'.charAt(0), 'f'.charAt(0)],
        [ 'c'.charAt(0), 'g'.charAt(0)]
    ]);
    let map3 = new Array(8);
    for(let i = 0 ; i < 7; i++ )
    {
        let possib = kLetters.slice(0, i) + kLetters.slice(i+ 1, kLetters.length);
        map3[ kLetters[i]] = kLetters.substr(0);
    }  
/**/
    let inputFor1 = GetElemByLength(aWiresArray, kDigsSegsCount[1] );
    let realSegsFor1 = kDigsSegs[1];

    map3[ inputFor1[0] ] = 'cf';
    map3[ inputFor1[1] ] = 'cf';

    let inputFor7 = GetElemByLength(aWiresArray, kDigsSegsCount[7] );
    let realSegsFor7 = kDigsSegs[7];

    let dif71 = GetDifference(inputFor7, inputFor1);
    map3[ dif71[0] ] = 'a';

    let inputFor4 = GetElemByLength(aWiresArray, kDigsSegsCount[4] );
    let realSegsFor4 = kDigsSegs[4];

    let dif41 = GetDifference(inputFor4, inputFor1);
    map3[ dif41[0] ] = 'bd';
    map3[ dif41[1] ] = 'bd';

    let inputFor8 = GetElemByLength(aWiresArray, kDigsSegsCount[8] );
    let realSegsFor8 = kDigsSegs[8];

    let dif84 = GetDifference(inputFor8, inputFor4); 

    let v = MapIsValid(map2, aWiresArray);
    let decoded1 = DecodeDigit(inputFor1, map);    
    let decoded7 = DecodeDigit(inputFor7, map);
    let decoded4 = DecodeDigit(inputFor4, map);
    let decoded8 = DecodeDigit(inputFor8, map);

  /* */ 
   return map2;
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
        let segs = GetDigitOfSegments(decodedInput);
        if (segs < 0)
          return false;
    }
    return true;
}

function DecodeDigit(aInputDigit, aMap)
{
   let decodedChars = new Array(aInputDigit.length);

   let inputChars = aInputDigit.split('');

   for(let ici = 0; ici < inputChars.length; ici++ )        
   {
       let inChar = inputChars[ici];
       let outChar = aMap[ inChar ];

       if (outChar == null)
         outChar = 'X';

       decodedChars[ici] = outChar;         
   }
   decodedChars.sort();
   return decodedChars
}

function DecodeDigits(aMap , aOutputDigits)
{
    let outDigits = new Array();

    for(let i = 0; i < aOutputDigits.length; i++)
    {
        let dec = DecodeDigit(aOutputDigits[i], aMap);
        let decDigit = GetDigitsFromSegments(dec);
        outDigits.push(decDigit);
    }

    return outDigits;
}

function GetDigitOfSegments(aSegments)
{
    if ( Array.isArray(aSegments))
      aSegments = aSegments.join('');

    for (let i = 0; i < kDigsSegs.length; i++)
    {
        if (kDigsSegs[i] == aSegments)
          return i;
    }
    return -1;
}

function ArrayOfDigitsToDecimal( aArray )
{
    let dec = 0;
    for (let i = 0; i < aArray.length;i++)
    {
       dec = dec * 10 +  aArray[i];
    }
    return dec;
}

function GetDifference(aStr1, aStr2)
{
    if (aStr1.Length > aStr2.length)
    {
      let interm = aStr1;
      aStr1 = aStr2;
      aStr2 = interm;
    }
    let diff = "";
    for (let i = 0; i < aStr1.length; i++)
    {
        let crtChar = aStr1[i];
        if( aStr2.indexOf(crtChar) == -1)
          diff+= crtChar;
    }
    return diff;
}
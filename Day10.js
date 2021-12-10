const fs = require('fs');
const util = require('./util.js');
const DorelUtil = require('./DorelUtil.js');


let inputLines = fs.readFileSync('input10.txt','utf8').split(/\r?\n/);

const kStartChars = "([{<";
const kEndChars   = ")]}>";
const kScores     = [3, 57, 1197, 25137];

const kInvalidChar = 'X';

part1();

part2();

function part1() {
   let totalScore = 0;
   for (let i = 0; i < inputLines.length; i++)
   {
       let ilegalChar = GetIlegalChar(inputLines[i]);
       if (ilegalChar != kInvalidChar)
       {
           let scoreIndex = kEndChars.indexOf(ilegalChar);
           totalScore += kScores[scoreIndex];
       }
   }
   
   console.log("1: Total sintax score is: " + totalScore );
}

function part2() {
    
}


function GetIlegalChar( aString )
{
    let opens = new Array();

    for (let i = 0; i < aString.length; i++)
    {
        let crtChr = aString.charAt(i);
        let crtCharStartIndex = kStartChars.indexOf(crtChr);
        let crtCharEndIndex   = kEndChars.indexOf(crtChr);

        if (crtCharStartIndex >= 0) //Starting char
        {
           opens.push(crtChr);
        }
        else if(crtCharEndIndex >=0 ) //Ending char
        {
           let lastOpenedChar = opens[opens.length - 1];
           let matchingStartChar = kStartChars[crtCharEndIndex] ;
           if (lastOpenedChar != matchingStartChar)  
           {
               return crtChr;
           }
           opens.pop();
        }
    }
   return kInvalidChar;
}
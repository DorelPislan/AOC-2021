const fs = require('fs');
const util = require('./util.js');
const DorelUtil = require('./DorelUtil.js');


let inputLines = fs.readFileSync('input9.txt','utf8').split(/\r?\n/);
const NO_OF_ROWS = inputLines.length;
const NO_OF_COLUMNS = inputLines[0].length;

/*
function StringToArray(crtVal, index, arr)
{
    let arr = crtVal.split();
    return arr;
}

//let input2 = inputLines.map( StringToArray );
*/
part1();

part2();

function part1() {

   let totalRisk  = 0;
  
   for (let i = 0; i < NO_OF_ROWS; i++)
   {
       for (let j = 0; j < NO_OF_COLUMNS; j++)
       {
           let up    = GetCell(inputLines, i - 1, j);
           let down  = GetCell(inputLines, i + 1, j);
           let left  = GetCell(inputLines, i,     j - 1);
           let right = GetCell(inputLines, i,     j + 1);

           let cell = GetCell(inputLines, i, j);
           if ( (cell < up) && 
                (cell < down) && 
                (cell < left) && 
                (cell < right) )
           {
               //this cell is a low point
               totalRisk += cell + 1;
           }
       }       
   }
  
   
   console.log("1: Total Risk level is: " + totalRisk );
}

function part2() {
    
   
    console.log("2: Score from Middle is: "  );
}

function GetCell(aInputLInes, i, j)
{
    if ( (i >= 0)  && 
         (i < NO_OF_ROWS) && 
         (j >= 0) && 
         (j < NO_OF_COLUMNS) )
    {
        let index = aInputLInes[i][j];
        return parseInt(aInputLInes[i][j]);
    }
    return 10;
}
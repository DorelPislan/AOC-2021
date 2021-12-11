const fs = require('fs');
const util = require('./util.js');
const DorelUtil = require('./DorelUtil.js');


let inputLines = fs.readFileSync('input9.txt','utf8').split(/\r?\n/);

const NO_OF_ROWS    = inputLines.length;
const NO_OF_COLUMNS = inputLines[0].length;

class Basin {
    constructor(i, j) {
        this.x = i;
        this.y = j;

        this.points = new Array();
        this.points.push( GetCellIndex(i, j))
    }

    GetSize()
    {
        return this.points.length;
    };

    
    AnalyzePoint(i, j, cell, dirStr, x, y)
    {
        let pointVal   = GetCell(inputLines, i, j, -1);

        //console.log('Analyzing ' + dirStr + '=(' + i + ',' + j + ')=' + pointVal + ' of point (' + x + ',' + y + ') Val= ' +  GetCell(inputLines, x, y, -1) );
        
        if ( (pointVal >= 0) &&  (pointVal != 9) && (pointVal >= cell))
        { 
            let pointIndex = GetCellIndex(i, j);
            if (this.points.indexOf(pointIndex) == -1 )
            {
              this.points.push( pointIndex );
              //console.log("Added point " + i + "," + j + " Val=" + pointVal + " FlatIndex=" + pointIndex);
              this.ExpandFromPoint(i, j);
            }
        }
    };

    ExpandFromPoint( i, j )
    {
        let cell  = GetCell(inputLines, i, j, -1);

        this.AnalyzePoint(i - 1 , j,     cell, '   UP', i, j); //UP        
        this.AnalyzePoint(i     , j + 1, cell, 'RIGHT', i, j); //RIGHT    
        this.AnalyzePoint(i + 1 , j,     cell, ' DOWN', i, j); //DOWN        
        this.AnalyzePoint(i     , j - 1, cell, ' LEFT', i, j); //LEFT        
    }

    Expand()
    {
        this.ExpandFromPoint(this.x, this.y);
    };
}

let part1Basins = new Array();
let part2Basins = new Array();

part1();

part2();

function part1() {

   let totalRisk  = 0;
  
   for (let i = 0; i < NO_OF_ROWS; i++)
   {
       for (let j = 0; j < NO_OF_COLUMNS; j++)
       {
           let up    = GetCell(inputLines, i - 1, j,     10);
           let down  = GetCell(inputLines, i + 1, j,     10);
           let left  = GetCell(inputLines, i,     j - 1, 10);
           let right = GetCell(inputLines, i,     j + 1, 10);

           let cell = GetCell(inputLines, i, j, 10);
           if ( (cell < up) && 
                (cell < down) && 
                (cell < left) && 
                (cell < right) )
           {
               //this cell is a low point
               totalRisk += cell + 1;

               part1Basins.push( new Basin(i, j));
           }
       }       
   }
  
   
   console.log("1: Total Risk level is: " + totalRisk );
}

function part2() {
   
    for (let i = 0; i < NO_OF_ROWS; i++)
    {
        for (let j = 0; j < NO_OF_COLUMNS; j++)
        {
            let up    = GetCell(inputLines, i - 1, j,     10);
            let down  = GetCell(inputLines, i + 1, j,     10);
            let left  = GetCell(inputLines, i,     j - 1, 10);
            let right = GetCell(inputLines, i,     j + 1, 10);
 
            let cell  = GetCell(inputLines, i, j, 10);

            if ( (cell < up) && 
                 (cell < down) && 
                 (cell < left) && 
                 (cell < right) )
            {
                //this cell is a low point
                let basin = new Basin(i, j);
                basin.Expand();
                part2Basins.push(basin);
            }
        }       
    }
    part2Basins.sort( function(a, b) {
        return b.GetSize() - a.GetSize();
      } );

    let totalSize  = part2Basins[0].GetSize() * part2Basins[1].GetSize() *  part2Basins[2].GetSize() ;
    console.log("2: Total size of 3 largest basins is: " + totalSize);
}

function GetCell(aInputLInes, i, j, aInvalidValue)
{
    if ( (i >= 0)  && 
         (i < NO_OF_ROWS) && 
         (j >= 0) && 
         (j < NO_OF_COLUMNS) )
    {
        let index = aInputLInes[i][j];
        return parseInt(aInputLInes[i][j]);
    }
    return aInvalidValue;
}

function GetCellIndex(i, j)
{
    return i * NO_OF_COLUMNS + j;
}

function ArrayToString(arr) {
    let str = "";
    for (let i = 0; i < arr.length; i++)
        str = str + arr[i];

    return str;
}

function MaxElem(aArray)
{
   let max = 0;
   aArray.forEach( e => max = Math.max(e, max) ) ;
   return max;
}


module.exports = {
    ArrayToString,
    MaxElem
  }
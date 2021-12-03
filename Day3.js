const fs = require('fs');
const util = require('../util.js');

let inputStrings = util.SplitInput('./Input3.txt', '\n');
inputStrings.pop();//lastString is empty and we do not need it

let bitsCount = inputStrings[0].length;

let gammaRate = new Array(bitsCount)
let epsilonRate = new Array(bitsCount);

console.log(inputStrings);

part1();
part2();

function part1() {
    
    let halfInputSize = inputStrings.length / 2;

    for (let bitIndex = 0; bitIndex < bitsCount; bitIndex++) {

        let onesCount = ComputeOnesCount(inputStrings, bitIndex);
        gammaRate[bitIndex] = onesCount > halfInputSize ? 1 : 0;
        epsilonRate[bitIndex] = 1 - gammaRate[bitIndex];
    }
    let gammaRateDecimal = BinaryToDecimal(gammaRate);
    let epsilonRateDecimal = BinaryToDecimal(epsilonRate);

    let result = gammaRateDecimal * epsilonRateDecimal;
    console.log("1: Gamma rate = " + gammaRateDecimal + " Epsilon rate = " + epsilonRateDecimal + " Result IS:" + result);
}

function part2() {
    let oxygenRatingDecimal = BinaryToDecimal(ComputeRating(inputStrings, 1));
    let co2RatingDecimal = BinaryToDecimal(ComputeRating(inputStrings, 0));

    let result = oxygenRatingDecimal * co2RatingDecimal;

    console.log("2: Oxygen rating  = " + oxygenRatingDecimal + " Co2 rating = " + co2RatingDecimal + " Result IS:" + result);
}
//-------------------------------

function ComputeOnesCount(inputStrings, bitIndex) {
    let bitsCount = inputStrings[0].length;

    let onesCount = 0;

    for (let inputIndex = 0; inputIndex < inputStrings.length; inputIndex++) {
        if (inputStrings[inputIndex][bitIndex] == '1')
            onesCount++;
    }
    return onesCount;
}

function ComputeRating(inputStrings, valForMostCommon) {

    let bitsCount = inputStrings[0].length;

    for (let bitIndex = 0; bitIndex < bitsCount; bitIndex++) {

        let onesCount = ComputeOnesCount(inputStrings, bitIndex);
        let halfInputSize = inputStrings.length / 2;

        let refBit = (onesCount >= halfInputSize) ? valForMostCommon : 1 - valForMostCommon;
        let newInput = FindEntriesThatMatchBit(inputStrings, bitIndex, refBit);

        inputStrings = newInput;

        if (inputStrings.length <= 1)
            break;
    }
    return inputStrings[0];
}

function FindEntriesThatMatchBit(inputStrings, bitIndex, refBit) {
    let newInput = [];
    let refBitChar = (refBit == 0) ? + '0' : '1';

    for (let i = 0; i < inputStrings.length; i++) {
        let crtBit = inputStrings[i][bitIndex];
        if (crtBit == refBitChar)
            newInput.push(inputStrings[i]);
    }
    return newInput;
}

///////////////////////////////////////////////////////////
function BinaryToDecimal(inputBits) {
    let result = 0;
    let factor = 1;
    for (let bitIndex = inputBits.length - 1; bitIndex >= 0; bitIndex--) {
        result += factor * inputBits[bitIndex];
        factor *= 2;
    }
    return result;
}
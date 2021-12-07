const fs = require('fs');
const util = require('./util.js');

let counters = util.MapInput('./Input6.txt', aElem => parseInt(aElem), ',');

//part1();

part2();

function part1() {

    for (let iterations = 0; iterations < 80; iterations++) {
        let crtLength = counters.length;
        for (let i = 0; i < crtLength; i++) {
            if (counters[i] == 0) {
                counters[i] = 6;
                counters.push(8);
            }
            else
                counters[i]--;
        }
    }
    let result = counters.length;
    console.log("1: Number of lanternfish afrer 80 days  IS: " + result);
}

function ArrayToString(arr) {
    let str = "";
    for (let i = 0; i < arr.length; i++)
        str = str + arr[i];

    return str;
}

function GenerateNew(crt, newBornes) {
    for (let i = 0; i < crt.length; i++) {

        if (crt[i] == 0) {
            crt[i] = 6;
            newBornes.push(8);
        }
        else
            crt[i]--;
    }
}

function GetFishCount(aFishCountByDay) {
    let totalCount = 0;
    for (let i = 0; i < 256; i++) {
        if (aFishCountByDay[i])
            totalCount += aFishCountByDay[i].length;
    }
    return totalCount;
}

function GenerateFishForSlice(InitialFishState, IterationsNumber) {
    let buckets = new Array(IterationsNumber);

    buckets[0] = InitialFishState;
    let lastBucketIndex = 0;

    for (let i = 1; i < buckets.length; i++)
       buckets[i] = new Array();

    let crtState = InitialFishState;
    for (let iter = 0; iter < IterationsNumber; iter++) {

        console.log("Starting iteration: " + iter + " for " + GetFishCount(buckets) + " elements in input: " + ArrayToString(buckets[lastBucketIndex]) );

        let newBornes = new Array();
        for (let bi = 0; bi <= lastBucketIndex; bi++)
        {
          GenerateNew(buckets[bi], newBornes);
        }
        console.log("Current iteration produced " + newBornes.length + " new bornes");

        let newSize = buckets[lastBucketIndex].length + newBornes.length;
        if(newSize < 70000000 )  
        {
            if(newBornes.length > 0)
               buckets[lastBucketIndex]  = buckets[lastBucketIndex].concat( newBornes);
        }
        else
        {
            lastBucketIndex++;
            buckets[lastBucketIndex] = newBornes;
            console.log("Creating bucket no " + lastBucketIndex);
        }
    }
    let total = GetFishCount(buckets);
    lfByDay = null;
    return total;  
}

function part2() {

    const SLICE_COUNT = 300;//10;
    const SLICE_LENGTH = counters.length / SLICE_COUNT;

    let totalCount = 0;
    for (let sliceIndex = 0; sliceIndex < SLICE_COUNT; sliceIndex++) {
        let sliceStart = sliceIndex * SLICE_LENGTH;
        let crtSlice = counters.slice(sliceStart, sliceStart + SLICE_LENGTH);
        totalCount += GenerateFishForSlice(crtSlice, 256);
    }
    /*
    let lfByDay = new Array(257);
    lfByDay[0] = counters;
    let crtLength = 1;

    for (let iter = 0; iter < 256; iter++) {

        lfByDay[iter + 1] = new Array();
        let newBornes = lfByDay[iter + 1];

        for (let bucket = 0; bucket < crtLength; bucket++) {
          GenerateNew(lfByDay[bucket], newBornes);
        }
        crtLength++;

        console.log(" Iteration {" + (iter) + "} produced " + newBornes.length + " new bornes. Total fish count = " + GetFishCount(lfByDay));
    }    
    let totalCount = GetFishCount(lfByDay);
    */

    console.log("2: Number of lanternfish after 256 days  IS: " + totalCount);
    //console.log(" Iteration {" + iter + "} produced " + newBornes.length + " new bornes");
}

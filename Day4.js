const fs = require('fs');
const util = require('./util.js');

let inputStrings = util.SplitInput('./Input4.txt', '\r\n');
inputStrings.pop();//lastString is empty and we do not need it

let drawnNumbers = null;
let allCards = new Array();

class Card {
    constructor(aNumbers) {
        this.mNumbers = aNumbers;

        this.mIsDrawn = new Array(25);
        this.mIsDrawn.fill(false);

        this.mWinningNumber = NaN;
    };

    MarkDrawnNumber(aNumber) {
        for (let i = 0; i < 25; i++) {
            if (this.mNumbers[i] == aNumber)
                this.mIsDrawn[i] = true;
        }
    }

    IsWinner() {
        for (let lineIndex = 0; lineIndex < 5; lineIndex++) {

            let lineFull = true;
            let colFull = true;

            for (let colIndex = 0; colIndex < 5; colIndex++) {

                let indexBySameLine = lineIndex * 5 + colIndex;
                if (!this.mIsDrawn[indexBySameLine]) {
                    lineFull = false;
                }

                let indexBySameCol = colIndex * 5 + lineIndex;
                if (!this.mIsDrawn[indexBySameCol]) {
                    colFull = false;
                }
            }
            if (lineFull || colFull)
                return true;
        }
        return false;
    }

    SetWinningNumber(aNumber) {
        this.mWinningNumber = aNumber;
    }

    HasWinningNumber() {
        return !isNaN(this.mWinningNumber);
    }

    GetScore() {
        return this.SumOfUnmarkedNumbers() * this.mWinningNumber;
    }

    SumOfUnmarkedNumbers() {
        let sum = 0;
        for (let i = 0; i < this.mNumbers.length; i++) {
            if (!this.mIsDrawn[i])
                sum += this.mNumbers[i];
        }
        return sum;
    }
};

function ReadInput() {

    drawnNumbers = inputStrings.shift().split(',').map(aElem => util.ParseInt(aElem));
    for (let i = 1; i < inputStrings.length - 4; i += 6) {

        let cardNumbers = new Array();

        for (let cardLineIndex = 0; cardLineIndex < 5; cardLineIndex++) {

            let crtLine = inputStrings[i + cardLineIndex];
            let numbersInLine = crtLine.split(' ').map(aElem => util.ParseInt(aElem));
            cardNumbers = cardNumbers.concat(numbersInLine.filter(aElem => !isNaN(aElem)));
        }

        let newCard = new Card(cardNumbers);
        allCards.push(newCard);
    }
}

ReadInput();

//part1();
part2();

function part1() {

    for (let i = 0; i < drawnNumbers.length; i++) {

        let crtNumber = drawnNumbers[i];

        for (let cardIndex = 0; cardIndex < allCards.length; cardIndex++) {

            let crtCard = allCards[cardIndex];

            crtCard.MarkDrawnNumber(crtNumber);

            if (crtCard.IsWinner()) {

                crtCard.SetWinningNumber(crtNumber);

                let winningScore = crtCard.GetScore();
                console.log("1: Winning card has score " + winningScore + "  for drawn number=" + crtNumber);
                return;
            }
        }
    }
}

function part2() {

    let lastCard = null;

    for (let i = 0; i < drawnNumbers.length; i++) {

        let crtNumber = drawnNumbers[i];

        for (let cardIndex = 0; cardIndex < allCards.length; cardIndex++) {

            let crtCard = allCards[cardIndex];

            if (crtCard.HasWinningNumber())
                continue;

            crtCard.MarkDrawnNumber(crtNumber);

            if (crtCard.IsWinner()) {

                crtCard.SetWinningNumber(crtNumber);

                lastCard = crtCard;
            }
        }
    }
    let winningScore = lastCard.GetScore();
    console.log("2: LAST Winning card has score " + winningScore + "  for drawn number=" + lastCard.mWinningNumber);
}

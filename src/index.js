module.exports = function solveSudoku(matrix) {
  // your solution

  const maxNumberOfTurn = 9;
  const startTurnNumber = 1;
  this.possibleMovesNumbers = [
    ...Array(maxNumberOfTurn + startTurnNumber).keys(),
  ].slice(startTurnNumber);
  this.valueTurnMatrix = [];
  this.matrix = matrix;
  let isGoodTurnDetect = true;
  let numberOfAttempt = 0;
  const limitNumberOfAttempt = 5;

  while (isGoodTurnDetect) {
    isGoodTurnDetect = getGoodTurn(this.matrix);

    if (!isGoodTurnDetect) {
      createValueTurnMatrix(this.matrixPossibleMoves);
      isGoodTurnDetect = getGoodTurn2(this.valueTurnMatrix);
    }

    if (!isGoodTurnDetect) {
      isGoodTurnDetect = checkSquareGoodTurn(this.valueTurnMatrix);
    }

    if (!isGoodTurnDetect) {
      isGoodTurnDetect = getGoodTurn3(this.matrixPossibleMoves);
    }

    if (!isGoodTurnDetect && numberOfAttempt < limitNumberOfAttempt) {
      isGoodTurnDetect = guessValue(this.matrixPossibleMoves);
      numberOfAttempt++;
    }
  }

  return this.matrix;
};

function createValueTurnMatrix(matrixPossibleMoves) {
  let tempArr = [];
  for (
    let moveNumber = 1;
    moveNumber <= this.possibleMovesNumbers.length;
    moveNumber++
  ) {
    for (let i = 0; i < matrixPossibleMoves.length; i++) {
      tempArr[i] = [];
      for (let j = 0; j < matrixPossibleMoves.length; j++) {
        if (matrixPossibleMoves[i][j]) {
          if (matrixPossibleMoves[i][j].includes(moveNumber))
            tempArr[i][j] = moveNumber;
          else tempArr[i][j] = 0;
        } else tempArr[i][j] = 0;
      }
    }
    this.valueTurnMatrix[moveNumber] = tempArr.slice();
  }
}

function getGoodTurn(matrix) {
  let tempArr = [];
  let isGoodTurnDetect = false;
  let matrixPossibleMovesArr = [];

  for (let i = 0; i < matrix.length; i++) {
    matrixPossibleMovesArr[i] = [];
    for (let j = 0; j < matrix.length; j++) {
      if (!matrix[i][j]) {
        tempArr = checkPossibleMoves(i, j, matrix);
        matrixPossibleMovesArr[i][j] = tempArr;
      } else matrixPossibleMovesArr[i][j] = 0;

      if (tempArr.length == 1) {
        this.matrix[i][j] = tempArr[0];
        isGoodTurnDetect = true;
        return isGoodTurnDetect;
      }
      tempArr = [];
    }
  }

  this.matrixPossibleMoves = matrixPossibleMovesArr;
  return isGoodTurnDetect;
}

function checkPossibleMoves(row, column, matrix) {
  let rowNumbers = getRowNumbers(row, matrix);
  let columnNumbers = getColumnNumbers(column, matrix);
  let squareNumbers = getSquareNumbers(row, column, matrix);
  let usedNumbers = rowNumbers.concat(columnNumbers).concat(squareNumbers);

  let usedNumbersUniq = usedNumbers.filter(function (item, pos) {
    return usedNumbers.indexOf(item) === pos;
  });

  let freeNumbers = this.possibleMovesNumbers.filter(
    (number) => !usedNumbersUniq.includes(number)
  );

  return freeNumbers;
}

function getGoodTurn2(valueTurnMatrix) {
  let isGoodTurnDetect = false;
  let matrixArr = [];

  for (
    let number = 1;
    number < this.possibleMovesNumbers.length + 1;
    number++
  ) {
    matrixArr = valueTurnMatrix[number].slice();
    for (let i = 0; i < matrixArr.length; i++) {
      for (let j = 0; j < matrixArr.length; j++) {
        if (matrixArr[i][j]) {
          let rowNumbers = getRowNumbers(i, matrixArr);
          let columnNumbers = getColumnNumbers(j, matrixArr);

          if (rowNumbers.length == 1 && columnNumbers.length == 1) {
            this.matrix[i][j] = matrixArr[i][j];
            isGoodTurnDetect = true;
          }
        }
      }
    }
  }
  return isGoodTurnDetect;
}

function getGoodTurn3(matrixPossibleMoves) {
  let isGoodTurnDetect = false;
  let matrixArr = [];
  let checkListArr = [];
  let goodValueArr = [];
  let isRevers = false;
  let i2, j2, counter;

  matrixArr = matrixPossibleMoves.slice();
  for (let i = 0; i < matrixArr.length; i++) {
    for (let j = 0; j < matrixArr.length; j++) {
      if (isRevers) {
        i2 = j;
        j2 = i;
        counter = i2;
      } else {
        i2 = i;
        j2 = j;
        counter = j2;
      }

      if (matrixArr[i2][j2]) {
        if (
          goodValueArr.length &&
          matrixArr[i2][j2].indexOf(goodValueArr[0]) > -1
        ) {
          this.matrix[i2][j2] = goodValueArr[0];
          isGoodTurnDetect = true;
          return isGoodTurnDetect;
        }
        checkListArr = checkListArr.concat(matrixArr[i2][j2]);
      }

      // magic number
      if (counter === matrixArr.length - 1 && goodValueArr.length < 1) {
        goodValueArr = findDuplicatesValue(checkListArr);
        if (goodValueArr.length) {
          j = -1;
        }
      }
    }
    checkListArr = [];
    goodValueArr = [];

    if (i === matrixArr.length - 1 && !isRevers) {
      i = -1;
      j = -1;
      isRevers = true;
    }
  }
  return isGoodTurnDetect;
}

function guessValue(matrixPossibleMoves) {
  let isGoodTurnDetect = false;
  let numberOptions = 2;
  let isUp;
  let matrixArr;

  matrixArr = matrixPossibleMoves.slice();
  for (let i = 0; i < matrixArr.length; i++) {
    for (let j = 0; j < matrixArr.length; j++) {
      if (matrixArr[i][j]) {
        this.matrix[i][j] = matrixArr[i][j][0];
        isGoodTurnDetect = true;
        return isGoodTurnDetect;
      }
      if (matrixArr[i][j].length > numberOptions) isUp = true;
    }
    if (i == matrixArr.length - 1 && isUp) {
      numberOptions++;
      i = -1;
      j = -1;
      isUp = false;
    }
  }

  return isGoodTurnDetect;
}

function findDuplicatesValue(arr) {
  var sortedArr = arr.slice().sort();
  var resultsArr = [];
  var duplicatesArr = [];
  for (var i = 0; i < sortedArr.length - 1; i++) {
    if (sortedArr[i + 1] == sortedArr[i]) {
      duplicatesArr.push(sortedArr[i]);
    }
  }

  resultsArr = arr.filter(function (el) {
    return duplicatesArr.indexOf(el) < 0;
  });

  return resultsArr;
}

function checkSquareGoodTurn(matrix) {
  let isGoodTurnDetect = false;
  let arr = [];

  let countElementRowSquare = 3;
  let iKey, jKey;

  for (let n = 1; n < this.possibleMovesNumbers.length + 1; n++) {
    matrix = this.valueTurnMatrix[n];
    for (let k = 0; k < countElementRowSquare; k++) {
      for (let m = 0; m < countElementRowSquare; m++) {
        for (
          let i = k * countElementRowSquare;
          i < (k + 1) * countElementRowSquare;
          i++
        ) {
          for (
            let j = m * countElementRowSquare;
            j < (m + 1) * countElementRowSquare;
            j++
          ) {
            if (matrix[i][j]) {
              arr.push(matrix[i][j]);
              iKey = i;
              jKey = j;
            }
          }
        }

        if (arr.length == 1) {
          this.matrix[iKey][jKey] = matrix[iKey][jKey];
          isGoodTurnDetect = true;
          return isGoodTurnDetect;
        }
        arr = [];
      }
    }
  }

  return isGoodTurnDetect;
}

function getRowNumbers(row, matrix) {
  var arr = [];
  arr = matrix[row].slice();
  arr = removeElementByValue(0, arr);

  return arr;
}

function getColumnNumbers(column, matrix) {
  var arr = [];
  matrix.forEach(function (entry) {
    arr.push(entry[column]);
  });
  arr = removeElementByValue(0, arr);

  return arr;
}

function getSquareNumbers(row, column, matrix) {
  var arr = [];

  let countElementRowSquare = 3;
  let rowSquare = Math.floor(row / countElementRowSquare);
  let columnSquare = Math.floor(column / countElementRowSquare);
  let startRowElement = rowSquare * countElementRowSquare;
  let startColumnElement = columnSquare * countElementRowSquare;

  for (
    let i = startRowElement;
    i < startRowElement + countElementRowSquare;
    i++
  ) {
    for (
      let j = startColumnElement;
      j < startColumnElement + countElementRowSquare;
      j++
    ) {
      arr.push(matrix[i][j]);
    }
  }

  arr = removeElementByValue(0, arr);

  return arr;
}

function removeElementByValue(value, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      arr.splice(i, 1);
      i--;
    }
  }

  return arr;
}

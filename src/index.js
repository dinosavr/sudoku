module.exports = function solveSudoku(matrix) {
  // your solution



  let possibleMovesNumbers = [...Array(10).keys()];
  possibleMovesNumbers.shift();
  this.possibleMovesNumbers = possibleMovesNumbers;
  this.valueTurnMatrix = [];
  this.matrix = matrix;

  let goodTurnDetect = true;
  let i = 0;

  while (goodTurnDetect) {     
    goodTurnDetect = getGoodTurn(this.matrix);

    if (!goodTurnDetect) {
      createValueTurnMatrix(this.matrixPossibleMoves);
      goodTurnDetect = getGoodTurn2(this.valueTurnMatrix);
      // console.log("GT2: " + goodTurnDetect);
    }

    if (!goodTurnDetect) {
      goodTurnDetect = checkSquareGoodTurn(this.valueTurnMatrix);;
      // console.log("GT2: " + goodTurnDetect);
    }

    if (!goodTurnDetect) {
       goodTurnDetect = getGoodTurn3(this.matrixPossibleMoves);
      // console.log("GT2: " + goodTurnDetect);
    }

    if (!goodTurnDetect && i<5) {
      goodTurnDetect = guessValue(this.matrixPossibleMoves);
      i++;
      // console.log("GT2: " + goodTurnDetect);
    }
    //console.log("Matrix after ", i);
    // console.log(this.matrix);
  }

  // console.log(this.matrix);

  // console.log();
  //console.log(this.valueTurnMatrix[9]);
  //console.log();
  // getGoodTurn2(this.valueTurnMatrix);

  // console.log();
  //console.log(this.matrixPossibleMoves);

  return this.matrix;
}

function createValueTurnMatrix(matrixPossibleMoves) {

  let temp = [];
  // console.log(this.possibleMovesNumbers.length);
  for (let n = 1; n < this.possibleMovesNumbers.length + 1; n++) {
    for (let i = 0; i < matrixPossibleMoves.length; i++) {
      temp[i] = [];
      for (let j = 0; j < matrixPossibleMoves.length; j++) {
        if (matrixPossibleMoves[i][j]) {

          // let numberValueTurn = 6;
          if (matrixPossibleMoves[i][j].includes(n)) temp[i][j] = n;
          else temp[i][j] = 0;
        }
        else temp[i][j] = 0;
      }
    }
    this.valueTurnMatrix[n] = temp.slice();
    // console.log(this.valueTurnMatrix[n]);
  }

}

function getGoodTurn(matrix) {

  let temp = [];
  let goodTurnDetect = false;
  let matrixPossibleMoves = [];

  for (let i = 0; i < matrix.length; i++) {
    matrixPossibleMoves[i] = [];
    for (let j = 0; j < matrix.length; j++) {
      if (!matrix[i][j]) {
        temp = checkPossibleMoves(i, j, matrix);

        /*         let numberValueTurn = 6;
                if (temp.includes(numberValueTurn)) matrixPossibleMoves[i][j] = numberValueTurn;
                else matrixPossibleMoves[i][j] = 0; */

        matrixPossibleMoves[i][j] = temp;
      }
      else matrixPossibleMoves[i][j] = 0;

      if (temp.length == 1) {
        console.log("GT1: Good turn detected", i, j, temp);
        this.matrix[i][j] = temp[0];
        goodTurnDetect = true;
        // console.log("GT1: " + goodTurnDetect);
        return goodTurnDetect;
      }
      temp = [];
    }
  }

  this.matrixPossibleMoves = matrixPossibleMoves;
  // console.log("GT1: " + goodTurnDetect);
  return goodTurnDetect;

}

function checkPossibleMoves(row, column, matrix) {

  let rowNumbers = getRowNumbers(row, matrix);
  let columnNumbers = getColumnNumbers(column, matrix);
  let squareNumbers = getSquareNumbers(row, column, matrix);
  let usedNumbers = rowNumbers.concat(columnNumbers).concat(squareNumbers);

  // console.log(usedNumbers);  
  let usedNumbersUniq = usedNumbers.filter(function (item, pos) {
    return usedNumbers.indexOf(item) == pos;
  })
  /* console.log("checkPossibleMoves");
  console.log(row, column, rowNumbers);
  console.log(row, column, columnNumbers);
  console.log(row, column, squareNumbers);
  console.log(row, column, usedNumbersUniq);
  console.log(); */

  let freeNumbers = this.possibleMovesNumbers.filter(x => !usedNumbersUniq.includes(x));
  // if (row < 3 && column < 3) console.log(row, column, freeNumbers);

  return freeNumbers;

}

function getGoodTurn2(valueTurnMatrix) {
  let goodTurnDetect = false;
  let matrix;

  // console.log(valueTurnMatrix[1]);

  for (let n = 1; n < this.possibleMovesNumbers.length + 1; n++) {
    matrix = valueTurnMatrix[n].slice();
    // console.log("Neo tuk tuk");
    // console.log(matrix);
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {

        if (matrix[i][j]) {
          let rowNumbers = getRowNumbers(i, matrix);
          let columnNumbers = getColumnNumbers(j, matrix);

          if (rowNumbers.length == 1 && columnNumbers.length == 1) {
            console.log("Good turn 2 !!!");
            console.log(i, j, matrix[i][j]);
            this.matrix[i][j] = matrix[i][j];
            goodTurnDetect = true
          }
        }

      }
    }
  }
  return goodTurnDetect;

}

function getGoodTurn3(matrixPossibleMoves) {
  let goodTurnDetect = false;
  let matrix;
  let checkList = [];
  let goodValue = [];
  let revers = false;
  let i2, j2, counter; 


  // console.log(valueTurnMatrix[1]);

  // for (let n = 1; n < this.possibleMovesNumbers.length + 1; n++) {
  matrix = matrixPossibleMoves.slice();
  console.log("Neo tuk tuk");
  // console.log(matrix);
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {

      if(revers) {i2 = j; j2 = i; counter = i2}
      else {i2 = i; j2 = j; counter = j2}
     // if (goodValue.length > 0) console.log("****** Loop works ******", i, j, goodValue[0]);

      if (matrix[i2][j2]) {               
        // console.log(goodValue[0], matrix[i][j] , matrix[i][j].indexOf(goodValue[0]) ,(matrix[i][j].indexOf(goodValue[0]) > -1)); 
        if (goodValue.length > 0 && (matrix[i2][j2].indexOf(goodValue[0]) > -1)) {
          console.log("************** GoodValue detected2", i2, j2, goodValue, "Revers ", revers);
          this.matrix[i2][j2] = goodValue[0];
          goodTurnDetect = true;
          return goodTurnDetect;
        }
        checkList = checkList.concat(matrix[i2][j2]);
      }

      if (counter === matrix.length - 1 && goodValue.length < 1) {
        // console.log("Checklist: ", revers, i2, j2, checkList);
        goodValue = findDuplicatesValue(checkList);
        if (goodValue.length > 0) {
          // console.log("GoodValue detected 1", goodValue);
          j = -1;
        }
      }
    }
    checkList = [];
    goodValue = [];
    //checkList = checkList.concat(matrix[i][j]);                      

    if (i === matrix.length - 1 && !revers) {i = -1; j = -1; revers = true;}
  }
  // }
  return goodTurnDetect;

}

function guessValue(matrixPossibleMoves){
  let goodTurnDetect = false;
  let numberOptions = 2;
  let up;
  let matrix;

  matrix = matrixPossibleMoves.slice();
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (matrix[i][j]) {               
        if(matrix[i][j].length === numberOptions) {
        console.log("guessValue", i, j, matrix[i][j][0]);
        }
          this.matrix[i][j] = matrix[i][j][0];
          goodTurnDetect = true;
          return goodTurnDetect;          
    }        
        if(matrix[i][j].length > numberOptions) up = true;                  
  }
  if(i == matrix.length - 1 && up)  {numberOptions++; i=-1; j=-1; up = false;}
}

  return goodTurnDetect;
}

function findDuplicatesValue(arr) {
  var sorted_arr = arr.slice().sort();
  var results = [];
  var duplicates = [];
  for (var i = 0; i < sorted_arr.length - 1; i++) {
    if (sorted_arr[i + 1] == sorted_arr[i]) {
      duplicates.push(sorted_arr[i]);
    }
  }
  //console.log("Start value: ", arr);
  //console.log("Duplicates value: ", duplicates);

  results = arr.filter(function (el) {
    return duplicates.indexOf(el) < 0;
  });

  // console.log("Uniq value: ", results);

  return results;
}

function checkSquareGoodTurn(matrix) {

  let goodTurnDetect = false;
  let arr = [];

  let countElementRowSquare = 3;
  let iKey, jKey;

  for (let n = 1; n < this.possibleMovesNumbers.length + 1; n++) {
    matrix = this.valueTurnMatrix[n];
    for (let k = 0; k < countElementRowSquare; k++) {
      for (let m = 0; m < countElementRowSquare; m++) {
        for (let i = k * countElementRowSquare; i < (k + 1) * countElementRowSquare; i++) {
          for (let j = m * countElementRowSquare; j < (m + 1) * countElementRowSquare; j++) {
            if (matrix[i][j]) { arr.push(matrix[i][j]); iKey = i; jKey = j; }
          }
        }
        // console.log(iKey, jKey, arr);
        if (arr.length == 1) {
          this.matrix[iKey][jKey] = matrix[iKey][jKey];
          goodTurnDetect = true;
          console.log("Get Good turn from square", iKey, jKey, matrix[iKey][jKey]);
          return goodTurnDetect;
        }
        arr = [];

      }
    }
  }


  return goodTurnDetect;
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

  for (let i = startRowElement; i < startRowElement + countElementRowSquare; i++) {
    for (let j = startColumnElement; j < startColumnElement + countElementRowSquare; j++) {
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
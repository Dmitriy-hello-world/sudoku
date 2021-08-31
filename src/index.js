module.exports = function solveSudoku(matrix) {
  const matrixSize = 9,
        areaSize = 3;

  let board = matrix;

  function findEmpty(matrix) {
    for(let r = 0; r < matrixSize; r++) {
      for(let c = 0; c < matrixSize; c++) {
        if (matrix[r][c] === 0) {
          return [r,c];
        }
      }
    }
    return null;
  }
  function validate(number , position , matrix) {
    let [r,c] = position;

    for(let i = 0; i < matrixSize; i++) {
      if (matrix[i][c] == number && i !== r) {
        return false;
      }
    }
    for(let i = 0; i < matrixSize; i++) {
      if (matrix[r][i] == number && i !== c) {
        return false;
      }
    }

    const boxRow = Math.floor( r / areaSize) * areaSize,
          boxCol = Math.floor( c / areaSize) * areaSize;
    
    for (let i = boxRow; i < boxRow + areaSize; i++) {
      for (let j = boxCol; j < boxCol + areaSize; j++) {
        if (matrix[i][j] === number && i !== r && j !== c) {
          return false;
        }
      }
    }

    return true;
  }
  function solution() {
    let position = findEmpty(board);

    if (position === null) {
      return true;
    }

    for (let i = 1; i <= matrixSize; i++) {
      let isValid = validate(i , position , board);

      if (isValid) {
        const [x,y] = position;
        board[x][y] = i;

        if (solution()) {
          return true;
        }
  
        board[x][y] = 0;
      }
    }
  }
  solution();
  return board;
};
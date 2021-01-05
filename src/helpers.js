/* eslint-disable no-plusplus */
// const BLUE = 'O';
// const RED = 'X';

// Return a vector (rows) of vectors (columns) initialized with nulls
export const createBoard = cols => {
  const rows = Math.floor(cols * 0.86);
  const rowCells = Array(cols).fill(null);
  return new Array(rows).fill(rowCells);
};

const isCellEmpty = cell => cell === null;

// Predicate function, true if the board is full, false if it is not
export const isBoardFull = cells => !cells.some(row => row.some(isCellEmpty));

export const isBoardColumnFull = (cells, colIdx) => cells.map(row => row[colIdx]).some(isCellEmpty);

// Returns a function that given an index will tell you if you should check it
const shouldCheckHorizontally = (cells, colIdx) => colIdx <= cells[0].length - 4;

const shouldCheckVertically = (cells, rowIdx, invertedDirection = false) =>
  invertedDirection ? rowIdx >= 3 : rowIdx <= cells.length - 4;

const indexes = [1, 2, 3];

const hasFourHorizontal = (cells, cellValue, rowIdx, colIdx) =>
  indexes.every(i => cellValue === cells[rowIdx][colIdx + i]);

const hasFourVertical = (cells, cellValue, rowIdx, colIdx) =>
  indexes.every(i => cellValue === cells[rowIdx + i][colIdx]);

const hasFourDiagonalDown = (cells, cellValue, rowIdx, colIdx) =>
  indexes.every(i => cellValue === cells[rowIdx + i][colIdx + i]);

const hasFourInDiagonalUp = (cells, cellValue, rowIdx, colIdx) =>
  indexes.every(i => cellValue === cells[rowIdx - i][colIdx + i]);

// Detects 4 in line in a board
export const hasFourInline = cells =>
  cells.some((row, rowIdx) =>
    row.some((cell, colIdx) => {
      if (cell === null) return false;

      const canBeHorizontal = shouldCheckHorizontally(cells, colIdx);
      const canBeVertical = shouldCheckVertically(cells, rowIdx);
      const canBeDownDiagDown = canBeVertical && canBeHorizontal;
      const canBeDiagUp = canBeHorizontal && shouldCheckVertically(cells, rowIdx, true);

      return (
        (canBeHorizontal && hasFourHorizontal(cells, cell, rowIdx, colIdx)) ||
        (canBeVertical && hasFourVertical(cells, cell, rowIdx, colIdx)) ||
        (canBeDownDiagDown && hasFourDiagonalDown(cells, cell, rowIdx, colIdx)) ||
        (canBeDiagUp && hasFourInDiagonalUp(cells, cell, rowIdx, colIdx))
      );
    })
  );

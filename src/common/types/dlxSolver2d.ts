import { SimpleConstraint, Row, Result } from 'dancing-links';
import * as dlx from 'dancing-links';
export type MultiConstraint<T> = SimpleConstraint<T> & Row<T>;

export interface SudokuInput {
  number: number;
  rowIndex: number;
  colIndex: number;
}

function times<T>(n: number, fn: () => T): T[] {
  const returnValue: T[] = [];

  for (let i = 0; i < n; i++) {
    returnValue.push(fn());
  }

  return returnValue;
}

export function generateConstraints(size = 9, inputs: SudokuInput[] = []): MultiConstraint<SudokuInput>[] {
  const blockSize = Math.sqrt(size);
  // each of the numbers can be in any x|y just once
  const numRowColConstraints = size * size;
  // each of the numbers can be in any row just once
  const numRowConstraints = size * size;
  // each of the numbers can be in any col just once
  const numColConstraints = size * size;
  // each of the numbers can be in any block just once
  const numBlockConstraints = size * size;

  const constraints: MultiConstraint<SudokuInput>[] = [];

  for (let currentRow = 0; currentRow < size; currentRow++) {
    for (let currentCol = 0; currentCol < size; currentCol++) {
      const matchingInput = inputs.find((i) => i.colIndex === currentCol && i.rowIndex === currentRow);

      for (let currentNumber = 0; currentNumber < size; currentNumber++) {
        if (matchingInput) {
          // Internally we index with zero, but numbers start at 1
          if (matchingInput.number !== currentNumber + 1) {
            // If we have an input for this row/col we need to skip all other options
            continue;
          }
        }
        // The matrix rows go in the order
        // [...rowColConstraints, ...rowConstraints, ...colConstraints, ...blockConstraints]
        const numberOffset = currentNumber;
        const rowColNumber = size * currentRow + currentCol;

        const rowColIndex = rowColNumber;

        const rowIndex = numRowColConstraints + numColConstraints + numberOffset + currentRow * size;
        const colIndex = numRowColConstraints + numberOffset + currentCol * size;

        const blockRow = Math.floor(currentRow / blockSize);
        const blockCol = Math.floor(currentCol / blockSize);
        const blockNumber = (blockSize * blockRow + blockCol) * size;

        const blockIndex = numRowColConstraints + numRowConstraints + numColConstraints + (numberOffset + blockNumber);

        const row = times(numRowColConstraints + numRowConstraints + numColConstraints + numBlockConstraints, () => 0) as (1 | 0)[];

        row[rowColIndex] = 1;
        row[rowIndex] = 1;
        row[colIndex] = 1;
        row[blockIndex] = 1;
        constraints.push({
          row,
          coveredColumns: [rowColIndex, rowIndex, colIndex, blockIndex],
          data: {
            number: currentNumber + 1,
            rowIndex: currentRow,
            colIndex: currentCol,
          },
        });
      }
    }
  }

  return constraints;
}

export function solvedConstraintToBoard(constraint: Result<SudokuInput>[]): number[][] {
  const board = times(9, () => times(9, () => 0));
  constraint.forEach((c) => {
    const { number, rowIndex, colIndex } = c.data;
    board[rowIndex][colIndex] = number;
  });
  return board;
}
export function boardToSudoku(cube: number[][]): SudokuInput[] {
  return cube.reduce((accy, y, yIndex) => {
    const col = y.reduce((accz, z, zIndex) => {
      if (z !== 0) {
        accz.push({
          rowIndex: yIndex,
          colIndex: zIndex,
          number: z,
        });
      }
      return accz;
    }, [] as SudokuInput[]);
    return accy.concat(col);
  }, [] as SudokuInput[]);
}
export function solveSudoku(data: number[][], size: number): number[][] | undefined {
  const board = boardToSudoku(data);
  const constraints = generateConstraints(size, board);
  try {
    const results = dlx.findOne(constraints);
    return solvedConstraintToBoard(results[0]);
  } catch (e) {
    return undefined;
  }
}

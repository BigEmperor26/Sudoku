import { Sudoku3D } from './sudoku3d';

export class Solver {
  sudoku: Sudoku3D;

  constructor(sudoku: Sudoku3D) {
    this.sudoku = sudoku;
  }

  public findEmptyCell(): number[] | null {
    // find the first empty cell
    for (let i = 0; i < this.sudoku.size; i++) {
      for (let j = 0; j < this.sudoku.size; j++) {
        for (let k = 0; k < this.sudoku.size; k++) {
          if (this.sudoku.data[i][j][k] === 0) {
            return [i, j, k];
          }
        }
      }
    }
    return null;
  }

  // async
  public async solve() {
    // check if the sudoku is solved
    // const isSolved = this.sudoku.isFull();
    // if (isSolved) {
    //   return true;
    // }
    // find the first empty cell
    const emptyCell = this.findEmptyCell();
    if (emptyCell === null) {
      // checkl if the sudoku is solved
      return true;
      // if (this.sudoku.verifySolved()) {
      //   return true;
      // } else {
      //   return false;
      // }
    }
    const [x, y, z] = emptyCell;
    // try to fill the empty cell with a value
    for (let value = 1; value <= this.sudoku.size; value++) {
      // check if the value is valid for this line
      const isLineValid = !this.sudoku.checkLines(x, y, z, value);
      // if line is valid also check plates
      const isPlateValid = isLineValid && !this.sudoku.checkPlates(x, y, z, value);
      if (isPlateValid) {
        this.sudoku.data[x][y][z] = value;
        if (await this.solve()) {
          return true;
        }
        this.sudoku.data[x][y][z] = 0;
      }
    }
  }
}

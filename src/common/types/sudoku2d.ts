import { solveSudoku } from "./dlxSolver2d";

export class Sudoku2D {
  data: number[][];

  possible: number[][][];

  size = 9;

  plateSize = 3;

  constructor() {
    // init the 3D sudoku with undefined values
    this.data = Array.from({ length: this.size }, () =>
      Array.from({ length: this.size }, () => 0)
    );
    this.possible = Array.from({ length: this.size }, () =>
      Array.from({ length: this.size }, () =>
        Array.from({ length: this.size }, () => 0)
      )
    );
  }

  public fillSudoku(data: number[][]) {
    this.data = data.map((row) => row.map((cell) => cell));
  }

  public initRandomSeed() {
    // init the sudoku with 3 random values in the diagonal
    for (let i = 0; i < Math.sqrt(this.size); i++) {
      // chose a random position inside the subcell
      const x = Math.floor(Math.random() * Math.sqrt(this.size));
      const xIndex = i * Math.sqrt(this.size) + x;
      const y = Math.floor(Math.random() * Math.sqrt(this.size));
      const yIndex = i * Math.sqrt(this.size) + y;
      this.data[xIndex][yIndex] = Math.floor(Math.random() * this.size) + 1;
    }
  }

  public countNumbers() {
    // count the number of each number in the sudoku
    const count = Array.from({ length: this.size + 1 }, () => 0);
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        count[this.data[i][j]] += 1;
      }
    }
    return count.slice(1);
  }

  // remove hits if a new value is added
  public removePossible(value: number, row: number, col: number) {
    // remove possible from the row with same value
    for (let i = 0; i < this.size; i++) {
      this.possible[row][i] = this.possible[row][i].filter((v) => v !== value);
    }
    // remove possible from the column with same value
    for (let i = 0; i < this.size; i++) {
      this.possible[i][col] = this.possible[i][col].filter((v) => v !== value);
    }
    // remove possible from the plate
    const xGrid = Math.floor(row / this.plateSize);
    const yGrid = Math.floor(col / this.plateSize);
    const startX = xGrid * this.plateSize;
    const startY = yGrid * this.plateSize;
    for (let i = startX; i < startX + this.plateSize; i++) {
      for (let j = startY; j < startY + this.plateSize; j++) {
        this.possible[i][j] = this.possible[i][j].filter((v) => v !== value);
      }
    }
  }

  public clearPercentage(percentage: number) {
    // clear a percentage of the sudoku
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (Math.random() < percentage) {
          this.data[i][j] = 0;
        }
      }
    }
  }

  public clearPercentageHard(percentage: number) {
    let previousCount = solveSudoku(this.data, 9)?.length ?? 0;
    // clear a percentage of the sudoku
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (Math.random() < percentage) {
          const previousValue = this.data[i][j];
          this.data[i][j] = 0;
          // try to count the number of possible solutions of this sudoku, keep it to 1 if possible
          const count = solveSudoku(this.data, 9)?.length ?? 0;
          if (count > previousCount) {
            this.data[i][j] = previousValue;
          }
        }
      }
    }
  }
  public isFull() {
    // Check if the 3D sudoku is full
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.data[i][j] === 0) {
          return false;
        }
      }
    }
    return true;
  }

  public checkX(y: number, value: number) {
    // Check if the value is in the row
    for (let i = 0; i < this.size; i++) {
      if (this.data[i][y] === value) {
        return true;
      }
    }
    return false;
  }

  public checkY(x: number, value: number) {
    // Check if the value is in the column
    for (let i = 0; i < this.size; i++) {
      if (this.data[x][i] === value) {
        return true;
      }
    }
    return false;
  }

  public checkPlate(yGrid: number, zGrid: number, value: number) {
    const startY = yGrid * this.plateSize;
    const startZ = zGrid * this.plateSize;
    for (let i = startY; i < startY + this.plateSize; i++) {
      for (let j = startZ; j < startZ + this.plateSize; j++) {
        if (this.data[i][j] === value) {
          return true;
        }
      }
    }
    return false;
  }

  public checkLines = (x: number, y: number, value: number) => {
    return this.checkX(y, value) || this.checkY(x, value);
  };

  public checkPlates = (x: number, y: number, value: number) => {
    const xGrid = Math.floor(x / this.plateSize);
    const yGrid = Math.floor(y / this.plateSize);
    return this.checkPlate(xGrid, yGrid, value);
  };
}

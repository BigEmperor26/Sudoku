export class Sudoku3D {
  data: number[][][];

  possible: number[][][][];

  size = 9;

  plateSize = 3;

  // constructor(data: number[][][]) {
  //   this.data = data;
  // }
  constructor() {
    // init the 3D sudoku with undefined values
    this.data = Array.from({ length: this.size }, () => Array.from({ length: this.size }, () => Array.from({ length: this.size }, () => 0)));
    this.possible = Array.from({ length: this.size }, () =>
      Array.from({ length: this.size }, () => Array.from({ length: this.size }, () => Array.from({ length: this.size }, () => 0))),
    );
  }

  public isFull() {
    // Check if the 3D sudoku is full
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        for (let k = 0; k < this.size; k++) {
          if (this.data[i][j][k] === 0) {
            return false;
          }
        }
      }
    }
    return true;
  }

  public verifySolved() {
    // Check if the 3D sudoku is solved
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        for (let k = 0; k < this.size; k++) {
          if (this.checkLines(i, j, k, this.data[i][j][k])) {
            return false;
          }
          if (this.checkPlates(i, j, k, this.data[i][j][k])) {
            return false;
          }
        }
      }
    }
    return true;
  }

  public checkX(y: number, z: number, value: number) {
    // Check if the value is in the row
    for (let i = 0; i < this.size; i++) {
      if (this.data[i][y][z] === value) {
        return true;
      }
    }
    return false;
  }

  public checkY(x: number, z: number, value: number) {
    // Check if the value is in the column
    for (let i = 0; i < this.size; i++) {
      if (this.data[x][i][z] === value) {
        return true;
      }
    }
    return false;
  }

  public checkZ(x: number, y: number, value: number) {
    // Check if the value is in the column
    for (let i = 0; i < this.size; i++) {
      if (this.data[x][y][i] === value) {
        return true;
      }
    }
    return false;
  }

  public checkPlateX(x: number, yGrid: number, zGrid: number, value: number) {
    const startY = yGrid * this.plateSize;
    const startZ = zGrid * this.plateSize;
    for (let i = startY; i < startY + this.plateSize; i++) {
      for (let j = startZ; j < startZ + this.plateSize; j++) {
        if (this.data[x][i][j] === value) {
          return true;
        }
      }
    }
    return false;
  }

  public checkPlateY(xGrid: number, y: number, zGrid: number, value: number) {
    const startX = xGrid * this.plateSize;
    const startZ = zGrid * this.plateSize;
    for (let i = startX; i < startX + this.plateSize; i++) {
      for (let j = startZ; j < startZ + this.plateSize; j++) {
        if (this.data[i][y][j] === value) {
          return true;
        }
      }
    }
    return false;
  }

  public checkPlateZ(xGrid: number, yGrid: number, z: number, value: number) {
    const startX = xGrid * this.plateSize;
    const startY = yGrid * this.plateSize;
    for (let i = startX; i < startX + this.plateSize; i++) {
      for (let j = startY; j < startY + this.plateSize; j++) {
        if (this.data[i][j][z] === value) {
          return true;
        }
      }
    }
    return false;
  }

  public checkLines = (x: number, y: number, z: number, value: number) => {
    return this.checkX(y, z, value) || this.checkY(x, z, value) || this.checkZ(x, y, value);
  };

  public checkPlates = (x: number, y: number, z: number, value: number) => {
    const xGrid = Math.floor(x / this.plateSize);
    const yGrid = Math.floor(y / this.plateSize);
    const zGrid = Math.floor(z / this.plateSize);
    return this.checkPlateX(x, yGrid, zGrid, value) || this.checkPlateY(xGrid, y, zGrid, value) || this.checkPlateZ(xGrid, yGrid, z, value);
  };
}

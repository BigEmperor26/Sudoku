// import { SimpleConstraint, Row, Result } from 'dancing-links';
// import * as dlx from 'dancing-links';
// export type MultiConstraint<T> = SimpleConstraint<T> & Row<T>;

// export interface SudokuInput {
//   number: number;
//   xIndex: number;
//   yIndex: number;
//   zIndex: number;
// }

// function times<T>(n: number, fn: () => T): T[] {
//   const returnValue: T[] = [];

//   for (let i = 0; i < n; i++) {
//     returnValue.push(fn());
//   }

//   return returnValue;
// }

// export function generateConstraints(size: number, inputs: SudokuInput[]): MultiConstraint<SudokuInput>[] {
//   const blockSize = Math.sqrt(size);
//   // each of the numbers can be in any x|y|z just once
//   const numConstraints = size * size * size;
//   // each of the numbers can be in any row just once
//   const numXConstraints = size * size * size;
//   // each of the numbers can be in any col just once
//   const numYConstraints = size * size * size;
//   // each of the numbers can be in any col just once
//   const numZConstraints = size * size * size;
//   // each of the numbers can be in any block just once
//   const numBlockXConstraints = size * size * size;
//   // each of the numbers can be in any block just once
//   const numBlockYConstraints = size * size * size;
//   // each of the numbers can be in any block just once
//   const numBlockZConstraints = size * size * size;

//   const constraints: MultiConstraint<SudokuInput>[] = [];

//   for (let x = 0; x < size; x++) {
//     for (let y = 0; y < size; y++) {
//       for (let z = 0; z < size; z++) {
//         const matchingInput = inputs.find((i) => i.yIndex === y && i.xIndex === x && i.zIndex === z);

//         for (let currentNumber = 0; currentNumber < size; currentNumber++) {
//           if (matchingInput) {
//             // Internally we index with zero, but numbers start at 1
//             if (matchingInput.number !== currentNumber + 1) {
//               // If we have an input for this row/col we need to skip all other options
//               continue;
//             }
//           }
//           // The matrix rows go in the order
//           // [ numConstraints, numXConstraints, numYConstraints, numZConstraints, numBlockXConstraints, numBlockYConstraints, numBlockZConstraints]
//           const numIndex = size * size * x + size * y + z;
//           const xIndex = numConstraints + currentNumber + y * size * size + z * size;
//           const yIndex = numConstraints + numXConstraints + currentNumber + z * size * size + x * size;
//           const zIndex = numConstraints + numXConstraints + numYConstraints + currentNumber + x * size * size + y * size;

//           // block index in two dimensions is divider by blockSize, third dimension is the same
//           const blockX = Math.floor(x / blockSize);
//           const blockY = Math.floor(y / blockSize);
//           const blockZ = Math.floor(z / blockSize);
//           const blockXNumber = (size * blockSize * blockY + size * blockZ + x) * size;
//           const blockYNumber = (size * blockSize * blockZ + size * blockX + y) * size;
//           const blockZNumber = (size * blockSize * blockX + size * blockY + z) * size;

//           const blockXIndex = numConstraints + numXConstraints + numYConstraints + numZConstraints + (currentNumber + blockXNumber);

//           const blockYIndex =
//             numConstraints + numXConstraints + numYConstraints + numZConstraints + numBlockXConstraints + (currentNumber + blockYNumber);
//           const blockZIndex =
//             numConstraints +
//             numXConstraints +
//             numYConstraints +
//             numZConstraints +
//             numBlockXConstraints +
//             numBlockYConstraints +
//             (currentNumber + blockZNumber);

//           const row = times(
//             numConstraints + numXConstraints + numYConstraints + numZConstraints + numBlockXConstraints + numBlockYConstraints + numBlockZConstraints,
//             () => 0,
//           ) as (1 | 0)[];

//           row[numIndex] = 1;
//           row[xIndex] = 1;
//           row[yIndex] = 1;
//           row[zIndex] = 1;
//           row[blockXIndex] = 1;
//           row[blockYIndex] = 1;
//           row[blockZIndex] = 1;

//           constraints.push({
//             row,
//             coveredColumns: [numIndex, xIndex, yIndex, zIndex, blockXIndex, blockYIndex, blockZIndex],
//             data: {
//               number: currentNumber + 1,
//               zIndex: x,
//               yIndex: y,
//               xIndex: z,
//             },
//           });
//         }
//       }
//     }
//   }

//   return constraints;
// }

// export function cubeToSudoku(cube: number[][][]): SudokuInput[] {
//   return cube.reduce((accx, x, xIndex) => {
//     const row = x.reduce((accy, y, yIndex) => {
//       const col = y.reduce((accz, z, zIndex) => {
//         if (z !== 0) {
//           accz.push({
//             xIndex,
//             yIndex,
//             zIndex,
//             number: z,
//           });
//         }
//         return accz;
//       }, [] as SudokuInput[]);
//       return accy.concat(col);
//     }, [] as SudokuInput[]);
//     return accx.concat(row);
//   }, [] as SudokuInput[]);
// }
// export function solver(cube: number[][][], size: number) {
//   const inputs = cubeToSudoku(cube);
//   const constraints = generateConstraints(size, inputs);
//   console.log('constraints', constraints, inputs);
//   // const oneSolution = dlx.find(constraints, 1);
//   console.log('oneSolution', oneSolution);
//   // return oneSolution;
// }

// import { currentPossibleExtractorWrapper, getRotation, getSlicePositions, getSlices } from 'common/utils/utils';
// import MiniCell3D from './MiniCell3D';
// interface CubeProps {
//   xAxis: number;
//   yAxis: number;
//   zAxis: number;
//   maxAxis: number;
//   currentAxis: string;
//   data: number[][][];
//   possible: number[][][][];
//   currentHover: number[][] | null;
//   onPlateDoubleClick: (plateIndex: number) => void;
// }

// export default function Cube({ xAxis, yAxis, zAxis, maxAxis, currentAxis, data, possible, onPlateDoubleClick }: Readonly<CubeProps>) {
//   // Subscribe this component to the render-loop, rotate the mesh every frame
//   // useFrame((state, delta) => (ref.current.rotation.x += delta));
//   // Return the view, these are regular Threejs elements expressed in JSX
//   return (
//     <group>
//       {/* Cube with colored faces */}

//       {/* Add numbers to each face */}
//       {getSlices(currentAxis, data).map((face, faceIndex) => {
//         const hints = currentPossibleExtractorWrapper(currentAxis, faceIndex, possible);
//         return (
//           <group
//             key={faceIndex}
//             position={getSlicePositions(currentAxis, maxAxis, faceIndex)}
//             rotation={getRotation(currentAxis)}
//             onDoubleClick={() => {
//               onPlateDoubleClick(faceIndex);
//             }}
//           >
//             {face.map((row, rowIndex) =>
//               row.map((num, colIndex) => (
//                 <MiniCell3D
//                   key={`${rowIndex}-${colIndex}=cube`}
//                   value={num}
//                   possible={hints[rowIndex][colIndex]}
//                   rowIndex={rowIndex}
//                   colIndex={colIndex}
//                   currentAxis={currentAxis}
//                   xAxis={xAxis}
//                   yAxis={yAxis}
//                   zAxis={zAxis}
//                   faceIndex={faceIndex}
//                 />
//               )),
//             )}
//           </group>
//         );
//       })}
//     </group>
//   );
// }

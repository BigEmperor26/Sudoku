// import { Text } from '@react-three/drei';
// import { currentPossibleExtractorWrapper, getRotation, getSlicePositions, getSlices, isCurrentFacce } from 'common/utils/utils';
// interface MiniCell3DProps {
//   value: number;
//   possible: number[];
//   colIndex: number;
//   rowIndex: number;
//   currentAxis: string;
//   xAxis: number;
//   yAxis: number;
//   zAxis: number;
//   faceIndex: number;
// }

// export default function MiniCell3D({ value, possible, rowIndex, colIndex, currentAxis, xAxis, yAxis, zAxis, faceIndex }: Readonly<MiniCell3DProps>) {
//   // Subscribe this component to the render-loop, rotate the mesh every frame
//   // useFrame((state, delta) => (ref.current.rotation.x += delta));
//   // Return the view, these are regular Threejs elements expressed in JSX
//   return (
//     <>
//       <Text
//         key={`${rowIndex}-${colIndex}`}
//         visible={value !== 0}
//         position={[
//           (colIndex - 4) * 0.1, // X offset for 9x9 grid
//           (4 - rowIndex) * 0.1, // Y offset for 9x9 grid
//           0.01, // Slight offset to avoid z-fighting
//         ]}
//         fontSize={0.05}
//         color={isCurrentFacce(currentAxis, xAxis, yAxis, zAxis, faceIndex) ? '#0097a7' : '#B2EBF2'}
//         fillOpacity={isCurrentFacce(currentAxis, xAxis, yAxis, zAxis, faceIndex) ? 1 : 0.75}
//         anchorX="center"
//         anchorY="middle"
//       >
//         {value}
//       </Text>

//       <Text
//         visible={possible.includes(1)}
//         key={`${rowIndex}-${colIndex}-1`}
//         position={[
//           (colIndex - 4) * 0.1 - 0.025, // X offset for 9x9 grid
//           (4 - rowIndex) * 0.1 + 0.025, // Y offset for 9x9 grid
//           0.01, // Slight offset to avoid z-fighting
//         ]}
//         fontSize={0.01}
//         color={isCurrentFacce(currentAxis, xAxis, yAxis, zAxis, faceIndex) ? '#f57c00' : '#$ff9800'}
//         fillOpacity={isCurrentFacce(currentAxis, xAxis, yAxis, zAxis, faceIndex) ? 1 : 0.5}
//         anchorX="center"
//         anchorY="middle"
//       >
//         {'1'}
//       </Text>

//       <Text
//         key={`${rowIndex}-${colIndex}-2`}
//         visible={possible.includes(2)}
//         position={[
//           (colIndex - 4) * 0.1, // X offset for 9x9 grid
//           (4 - rowIndex) * 0.1 + 0.025, // Y offset for 9x9 grid
//           0.01, // Slight offset to avoid z-fighting
//         ]}
//         fontSize={0.01}
//         color={isCurrentFacce(currentAxis, xAxis, yAxis, zAxis, faceIndex) ? '#f57c00' : '#$ff9800'}
//         fillOpacity={isCurrentFacce(currentAxis, xAxis, yAxis, zAxis, faceIndex) ? 1 : 0.5}
//         anchorX="center"
//         anchorY="middle"
//       >
//         {'2'}
//       </Text>

//       <Text
//         key={`${rowIndex}-${colIndex}-3`}
//         position={[
//           (colIndex - 4) * 0.1 + 0.025, // X offset for 9x9 grid
//           (4 - rowIndex) * 0.1 + 0.025, // Y offset for 9x9 grid
//           0.01, // Slight offset to avoid z-fighting
//         ]}
//         visible={possible.includes(3)}
//         fontSize={0.01}
//         color={isCurrentFacce(currentAxis, xAxis, yAxis, zAxis, faceIndex) ? '#f57c00' : '#$ff9800'}
//         fillOpacity={isCurrentFacce(currentAxis, xAxis, yAxis, zAxis, faceIndex) ? 1 : 0.5}
//         anchorX="center"
//         anchorY="middle"
//       >
//         {'3'}
//       </Text>

//       <Text
//         key={`${rowIndex}-${colIndex}-4`}
//         position={[
//           (colIndex - 4) * 0.1 - 0.025, // X offset for 9x9 grid
//           (4 - rowIndex) * 0.1, // Y offset for 9x9 grid
//           0.01, // Slight offset to avoid z-fighting
//         ]}
//         visible={possible.includes(4)}
//         fontSize={0.01}
//         color={isCurrentFacce(currentAxis, xAxis, yAxis, zAxis, faceIndex) ? '#f57c00' : '#$ff9800'}
//         fillOpacity={isCurrentFacce(currentAxis, xAxis, yAxis, zAxis, faceIndex) ? 1 : 0.5}
//         anchorX="center"
//         anchorY="middle"
//       >
//         {'4'}
//       </Text>

//       <Text
//         key={`${rowIndex}-${colIndex}-5`}
//         position={[
//           (colIndex - 4) * 0.1, // X offset for 9x9 grid
//           (4 - rowIndex) * 0.1, // Y offset for 9x9 grid
//           0.01, // Slight offset to avoid z-fighting
//         ]}
//         visible={possible.includes(5)}
//         fontSize={0.01}
//         color={isCurrentFacce(currentAxis, xAxis, yAxis, zAxis, faceIndex) ? '#f57c00' : '#$ff9800'}
//         fillOpacity={isCurrentFacce(currentAxis, xAxis, yAxis, zAxis, faceIndex) ? 1 : 0.5}
//         anchorX="center"
//         anchorY="middle"
//       >
//         {'5'}
//       </Text>

//       <Text
//         key={`${rowIndex}-${colIndex}-6`}
//         position={[
//           (colIndex - 4) * 0.1 + 0.025, // X offset for 9x9 grid
//           (4 - rowIndex) * 0.1, // Y offset for 9x9 grid
//           0.01, // Slight offset to avoid z-fighting
//         ]}
//         visible={possible.includes(6)}
//         fontSize={0.01}
//         color={isCurrentFacce(currentAxis, xAxis, yAxis, zAxis, faceIndex) ? '#f57c00' : '#$ff9800'}
//         fillOpacity={isCurrentFacce(currentAxis, xAxis, yAxis, zAxis, faceIndex) ? 1 : 0.5}
//         anchorX="center"
//         anchorY="middle"
//       >
//         {'6'}
//       </Text>

//       <Text
//         key={`${rowIndex}-${colIndex}-7`}
//         position={[
//           (colIndex - 4) * 0.1 - 0.025, // X offset for 9x9 grid
//           (4 - rowIndex) * 0.1 - 0.025, // Y offset for 9x9 grid
//           0.01, // Slight offset to avoid z-fighting
//         ]}
//         visible={possible.includes(7)}
//         fontSize={0.01}
//         color={isCurrentFacce(currentAxis, xAxis, yAxis, zAxis, faceIndex) ? '#f57c00' : '#$ff9800'}
//         fillOpacity={isCurrentFacce(currentAxis, xAxis, yAxis, zAxis, faceIndex) ? 1 : 0.5}
//         anchorX="center"
//         anchorY="middle"
//       >
//         {'7'}
//       </Text>

//       <Text
//         key={`${rowIndex}-${colIndex}-8`}
//         position={[
//           (colIndex - 4) * 0.1, // X offset for 9x9 grid
//           (4 - rowIndex) * 0.1 - 0.025, // Y offset for 9x9 grid
//           0.01, // Slight offset to avoid z-fighting
//         ]}
//         visible={possible.includes(8)}
//         fontSize={0.01}
//         color={isCurrentFacce(currentAxis, xAxis, yAxis, zAxis, faceIndex) ? '#f57c00' : '#$ff9800'}
//         fillOpacity={isCurrentFacce(currentAxis, xAxis, yAxis, zAxis, faceIndex) ? 1 : 0.5}
//         anchorX="center"
//         anchorY="middle"
//       >
//         {'8'}
//       </Text>

//       <Text
//         key={`${rowIndex}-${colIndex}-9`}
//         position={[
//           (colIndex - 4) * 0.1 + 0.025, // X offset for 9x9 grid
//           (4 - rowIndex) * 0.1 - 0.025, // Y offset for 9x9 grid
//           0.01, // Slight offset to avoid z-fighting
//         ]}
//         visible={possible.includes(9)}
//         fontSize={0.01}
//         color={isCurrentFacce(currentAxis, xAxis, yAxis, zAxis, faceIndex) ? '#f57c00' : '#$ff9800'}
//         fillOpacity={isCurrentFacce(currentAxis, xAxis, yAxis, zAxis, faceIndex) ? 1 : 0.5}
//         anchorX="center"
//         anchorY="middle"
//       >
//         {'9'}
//       </Text>
//     </>
//   );
// }

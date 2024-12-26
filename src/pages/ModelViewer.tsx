// import { Canvas } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import Cube from './Cube';

// interface ModelViewerProps {
//   data: number[][][];
//   possible: number[][][][];
//   xIndex: number;
//   yIndex: number;
//   zIndex: number;
//   currentAxis: 'x' | 'y' | 'z';
//   onPlateDoubleClick: (plateIndex: number) => void;
// }
// export default function ModelViewer({ data, possible, xIndex, yIndex, zIndex, currentAxis, onPlateDoubleClick }: Readonly<ModelViewerProps>) {
//   return (
//     <Canvas camera={{ position: [1, 1, 1] }}>
//       {/* <CameraUpdater position={cameraPosition} /> */}
//       <ambientLight intensity={Math.PI / 2} />
//       <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
//       <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
//       <Cube
//         xAxis={xIndex}
//         yAxis={yIndex}
//         zAxis={zIndex}
//         maxAxis={9}
//         currentAxis={currentAxis}
//         data={data}
//         possible={possible}
//         onPlateDoubleClick={onPlateDoubleClick}
//       />

//       <OrbitControls />
//     </Canvas>
//   );
// }

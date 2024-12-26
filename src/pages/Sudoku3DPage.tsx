// import { useState } from "react";
// import { Sudoku3D } from "common/types/sudoku3d";
// import BackspaceIcon from "@mui/icons-material/Backspace";
// import {
//   Box,
//   Button,
//   CircularProgress,
//   Slider,
//   Stack,
//   SvgIcon,
//   Tab,
//   Tabs,
//   Theme,
//   Typography,
//   useMediaQuery,
// } from "@mui/material";
// import DrawIcon from "@mui/icons-material/Draw";
// import {
//   currentFaceExtractor,
//   currentPossibleExtractor,
//   highlightHover,
//   map2Dto3D,
// } from "common/utils/utils";
// import MiniCell from "./MiniCell";
// import { solveSudoku } from "common/types/dlxSolver2d";

// const Sudoku3DPage = () => {
//   const sm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
//   const [sudoku, setSudoku] = useState<Sudoku3D>(new Sudoku3D());

//   const [isSolving, setIsSolving] = useState(false);
//   const [xIndex, setXIndex] = useState(0);
//   const [yIndex, setYIndex] = useState(0);
//   const [zIndex, setZIndex] = useState(0);
//   const [currentAxis, setCurrentAxis] = useState<"x" | "y" | "z">("x");

//   const currentFace = currentFaceExtractor(
//     currentAxis,
//     xIndex,
//     yIndex,
//     zIndex,
//     sudoku.data
//   );
//   const currentHints = currentPossibleExtractor(
//     currentAxis,
//     xIndex,
//     yIndex,
//     zIndex,
//     sudoku.possible
//   );
//   const [isNote, setIsNote] = useState(false);

//   const [currentSelected, setCurrentSelected] = useState<
//     [number, number] | null
//   >(null);
//   return (
//     <Stack
//       spacing={2}
//       sx={{
//         paddingY: {
//           xs: "1rem",
//           sm: "2rem",
//           md: "3rem",
//           lg: "4rem",
//           xl: "5rem",
//         },
//         paddingX: {
//           xs: "1rem",
//           sm: "4rem",
//           md: "6rem",
//           lg: "8rem",
//           xl: "10rem",
//         },
//         justifyContent: "flex-start",
//         alignItems: "center",
//         height: "95vh",
//         bgcolor: "#B2EBF2",
//         overflowY: "auto",
//         overflowX: "hidden",
//       }}
//     >
//       <Typography variant={sm ? "h4" : "h2"}>Sudoku 3D</Typography>
//       <Stack direction="row" spacing={2}>
//         <Button
//           onClick={() => {
//             const newSudoku = new Sudoku3D();
//             setSudoku(newSudoku);
//             // setSolver(new Solver(newSudoku));
//           }}
//         >
//           Reset
//         </Button>

//         <Button
//           variant="contained"
//           onClick={() => {
//             setIsSolving(true);
//             // const solver = new Solver(sudoku);

//             // solver.solve().then((val: boolean) => {
//             //   console.log(val, solver.sudoku.data);
//             //   // create json blob and download
//             //   const json = JSON.stringify(solver.sudoku.data);
//             //   const blob = new Blob([json], { type: 'application/json' });
//             //   const url = URL.createObjectURL(blob);
//             //   const a = document.createElement('a');
//             //   // download the file
//             //   a.href = url;
//             //   a.download = 'sudoku.json';
//             //   a.click();
//             //   setIsSolving(false);
//             // });
//             const solution = solveSudoku(sudoku.data[0], 9);
//             setIsSolving(false);
//             setSudoku((prev) => {
//               const newSudoku = new Sudoku3D();
//               newSudoku.data[0] = solution;
//               return newSudoku;
//             });
//             // init sudoku to
//             // const sudo: number[][] = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0));
//             // const d = dataToString(sudo, 9);
//             // const s = parseStringFormat(9, d);
//             // const solution = solveSudoku(s);
//             // // const cube = solver(sudoku.data, 9);
//             // const cube = dlxSolver(sudoku.data, 9);
//             // // const test = dlxSolver2D(9);
//           }}
//         >
//           {isSolving && <CircularProgress />} Solve
//         </Button>
//       </Stack>
//       {/* <Box sx={{ flexGrow: 1, width: '100%' }}>
//         <ModelViewer
//           data={sudoku.data}
//           xIndex={xIndex}
//           yIndex={yIndex}
//           zIndex={zIndex}
//           currentAxis={currentAxis}
//           possible={sudoku.possible}
//           onPlateDoubleClick={(index) => {
//             if (currentAxis === 'x') {
//               setXIndex(index);
//             } else if (currentAxis === 'y') {
//               setYIndex(index);
//             } else {
//               setZIndex(index);
//             }
//           }}
//         />
//       </Box> */}
//       <Tabs
//         value={currentAxis}
//         onChange={(_, value) => {
//           setCurrentAxis(value);
//         }}
//         aria-label="basic tabs example"
//       >
//         <Tab label="Axis X" value={"x"} />
//         <Tab label="Axis Y" value={"y"} />
//         <Tab label="Axis Z" value={"z"} />
//       </Tabs>
//       {currentAxis === "x" && (
//         <Slider
//           aria-label="Slicer"
//           valueLabelDisplay="auto"
//           value={xIndex + 1}
//           onChange={(_, value) => setXIndex((value as number) - 1)}
//           step={1}
//           marks
//           track={false}
//           min={1}
//           max={9}
//           sx={{
//             width: {
//               xs: "90%",
//               sm: "85%",
//               md: "80%",
//               lg: "60%",
//               xl: "50%",
//             },
//           }}
//         />
//       )}
//       {currentAxis === "y" && (
//         <Slider
//           aria-label="Slicer"
//           valueLabelDisplay="auto"
//           value={yIndex + 1}
//           onChange={(_, value) => setYIndex((value as number) - 1)}
//           step={1}
//           marks
//           track={false}
//           min={1}
//           max={9}
//           sx={{
//             width: {
//               xs: "100%",
//               sm: "90%",
//               md: "80%",
//               lg: "60%",
//               xl: "50%",
//             },
//           }}
//         />
//       )}
//       {currentAxis === "z" && (
//         <Slider
//           aria-label="Slicer"
//           valueLabelDisplay="auto"
//           value={zIndex + 1}
//           onChange={(_, value) => setZIndex((value as number) - 1)}
//           step={1}
//           marks
//           track={false}
//           min={1}
//           max={9}
//           sx={{
//             width: {
//               xs: "100%",
//               sm: "90%",
//               md: "80%",
//               lg: "60%",
//               xl: "50%",
//             },
//           }}
//         />
//       )}
//       <Box
//         sx={{
//           borderRadius: "0.5rem",
//           backgroundColor: "white",
//           borderWidth: "0.2rem",
//           borderStyle: "solid",
//           // width: 'fit-content',

//           // center the box
//           marginX: "auto",
//           padding: "0rem",
//           borderColor: "#0097a7",
//           aspectRatio: "1",
//           width: {
//             xs: "95%",
//             sm: "90%",
//             md: "80%",
//             lg: "60%",
//             xl: "50%",
//           },
//           maxWidth: "45rem",
//           maxHeight: "45rem",
//         }}
//       >
//         <Stack
//           direction="column"
//           sx={{
//             height: "100%",
//             width: "100%",
//             aspectRatio: "1",
//           }}
//         >
//           {currentFace.map((y, idy) => (
//             <>
//               {idy !== 0 && idy % 3 === 0 && (
//                 <Box
//                   sx={{ width: "100%", height: "0.2rem", bgcolor: "#0097a7" }}
//                 />
//               )}
//               {idy !== 0 && idy % 3 !== 0 && (
//                 <Box
//                   sx={{ width: "100%", height: "0.15rem", bgcolor: "#B2EBF2" }}
//                 />
//               )}
//               <Stack
//                 direction="row"
//                 key={`${idy}-stack`}
//                 sx={{ width: "100%", height: "calc(100% / 9)" }}
//               >
//                 {y.map((z, idz) => {
//                   let bgColor = highlightHover([idy, idz], currentSelected)
//                     ? "#B2EBF280"
//                     : "white";

//                   // if current selected is the same as the current cell, set the color to blue
//                   bgColor =
//                     currentSelected &&
//                     currentSelected[0] === idy &&
//                     currentSelected[1] === idz
//                       ? "#0097a7"
//                       : bgColor;

//                   return (
//                     <>
//                       {idz !== 0 && idz % 3 === 0 && (
//                         <Box sx={{ width: "0.2rem", bgcolor: "#0097a7" }} />
//                       )}
//                       {idz !== 0 && idz % 3 !== 0 && (
//                         <Box sx={{ width: "0.15rem", bgcolor: "#B2EBF2" }} />
//                       )}
//                       <Box
//                         key={`${idz}-box`}
//                         sx={{
//                           // change color of hover row or column is the same
//                           backgroundColor: bgColor,
//                           // backgroundColor: 'white',
//                           padding: "0.25rem",
//                           // borderRadius: '0.5rem',
//                           borderWidth: "0rem",
//                           borderStyle: "solid",
//                           // width: 'calc(100% / 9)',
//                           // height: 'calc(100% / 9)',
//                           // aspect ratio 1:1
//                           aspectRatio: "1",
//                           // center child
//                           alignItems: "center",
//                           justifyContent: "center",
//                           display: "flex",
//                         }}
//                         onClick={() => {
//                           setCurrentSelected((prev) => {
//                             if (prev && prev[0] === idy && prev[1] === idz) {
//                               return null;
//                             }
//                             return [idy, idz];
//                           });
//                         }}
//                       >
//                         <MiniCell value={z} possible={currentHints[idy][idz]} />
//                         {/* <Typography variant="body1" gutterBottom>
//                           {z === 0 ? '' : z}
//                         </Typography> */}
//                       </Box>
//                     </>
//                   );
//                 })}
//               </Stack>
//             </>
//           ))}
//         </Stack>
//       </Box>

//       {
//         // buttons for input from 1 to 9
//       }
//       {currentSelected && (
//         <Stack direction="row" spacing={2}>
//           <Button
//             variant="text"
//             onClick={() => {
//               setSudoku((prev) => {
//                 const newInputSudoku = new Sudoku3D();
//                 newInputSudoku.data = prev.data.map((x) =>
//                   x.map((y) => y.map((z) => z))
//                 );
//                 newInputSudoku.possible = prev.possible.map((x) =>
//                   x.map((y) => y.map((z) => z.map((w) => w)))
//                 );
//                 const [x, y, z] = map2Dto3D(
//                   currentSelected[0],
//                   currentSelected[1],
//                   currentAxis,
//                   xIndex,
//                   yIndex,
//                   zIndex
//                 );
//                 newInputSudoku.data[x][y][z] = 0;
//                 newInputSudoku.possible[x][y][z] = [];
//                 return newInputSudoku;
//               });
//             }}
//           >
//             Clear
//             <SvgIcon component={BackspaceIcon} />
//           </Button>
//           <Button
//             variant={isNote ? "contained" : "text"}
//             color="secondary"
//             onClick={() => {
//               setIsNote((prev) => !prev);
//             }}
//           >
//             Note
//             <SvgIcon component={DrawIcon} />
//           </Button>
//         </Stack>
//       )}
//       {currentSelected && (
//         <Stack
//           direction="row"
//           useFlexGap
//           sx={{
//             width: "100%",
//             flexWrap: "wrap",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           {Array.from({ length: 9 }, (_, i) => i + 1).map((value) => (
//             <Button
//               key={value}
//               variant="contained"
//               color={isNote ? "secondary" : "primary"}
//               sx={{
//                 width: "calc( (100% - 2rem) / 9)",
//                 // height: 'calc(100% / 3)',
//                 marginX: "0.1rem",
//                 marginY: "0.1rem",
//                 maxWidth: "6rem",
//               }}
//               onClick={() => {
//                 if (isNote) {
//                   setSudoku((prev) => {
//                     const newInputSudoku = new Sudoku3D();
//                     newInputSudoku.possible = prev.possible.map((x) =>
//                       x.map((y) => y.map((z) => z.map((w) => w)))
//                     );
//                     newInputSudoku.data = prev.data.map((x) =>
//                       x.map((y) => y.map((z) => z))
//                     );
//                     const [x, y, z] = map2Dto3D(
//                       currentSelected[0],
//                       currentSelected[1],
//                       currentAxis,
//                       xIndex,
//                       yIndex,
//                       zIndex
//                     );
//                     // if value is already in the possible array, remove it
//                     if (prev.possible[x][y][z].includes(value)) {
//                       newInputSudoku.possible[x][y][z] = prev.possible[x][y][
//                         z
//                       ].filter((val) => val !== value);
//                     } else {
//                       newInputSudoku.possible[x][y][z] = [
//                         ...prev.possible[x][y][z],
//                         value,
//                       ];
//                     }
//                     return newInputSudoku;
//                   });
//                 } else {
//                   setSudoku((prev) => {
//                     const newInputSudoku = new Sudoku3D();
//                     newInputSudoku.data = prev.data.map((x) =>
//                       x.map((y) => y.map((z) => z))
//                     );
//                     newInputSudoku.possible = prev.possible.map((x) =>
//                       x.map((y) => y.map((z) => z.map((w) => w)))
//                     );
//                     const [x, y, z] = map2Dto3D(
//                       currentSelected[0],
//                       currentSelected[1],
//                       currentAxis,
//                       xIndex,
//                       yIndex,
//                       zIndex
//                     );
//                     newInputSudoku.data[x][y][z] = value;
//                     return newInputSudoku;
//                   });
//                 }
//               }}
//             >
//               {value}
//             </Button>
//           ))}
//         </Stack>
//       )}
//     </Stack>
//   );
// };
// export default Sudoku3DPage;

import { useState } from "react";
import { Sudoku2D } from "common/types/sudoku2d";
import BackspaceIcon from "@mui/icons-material/Backspace";
import {
  Badge,
  Box,
  Button,
  Grow,
  Stack,
  SvgIcon,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import DrawIcon from "@mui/icons-material/Draw";
import { highlightHover, rgbaToString, stringToRGB } from "common/utils/utils";
import MiniCell from "./MiniCell";
import { useTheme } from "@mui/material/styles";
import ButtonsStack from "./ButtonsStack";
import FinishedStack from "./FinishedStack";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import ReplayIcon from "@mui/icons-material/Replay";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SudokuRestart from "./Sudoku2DRestart";
const difficultyMap: Record<string, string> = {
  easy: "🐣 Easy",
  medium: "🐱 Medium",
  hard: "🐘 Hard",
  impossible: "👽 Impossible",
};
interface Sudoku2DPageProps {
  difficulty: string;
  lives: number;
  maxLifes: number;
  initialSudoku: Sudoku2D;
  sudoku: Sudoku2D;
  solvedSudoku: Sudoku2D;
  missingNumbersCounts: number[];
  hints: number;
  onReset: (diff: string) => void;
  onInputChange: (
    value: number,
    curr: [number, number] | null,
    isCurrentNote: boolean
  ) => void;
  onClearInput: (curr: [number, number] | null) => void;
  onSHowHint: (curr: [number, number] | null) => void;
  onQuit: () => void;
}
export default function Sudoku2DPage({
  difficulty,
  lives,
  maxLifes,
  initialSudoku,
  solvedSudoku,
  missingNumbersCounts,
  hints,
  sudoku,
  onInputChange,
  onClearInput,
  onSHowHint,
  onQuit,
}: Readonly<Sudoku2DPageProps>) {
  const theme = useTheme();
  // color for the hover effect
  const highLightColor = rgbaToString([
    ...stringToRGB(theme.palette.primary.light),
    0.5,
  ]);
  // color for the same cells values
  const sameColor = rgbaToString([
    ...stringToRGB(theme.palette.primary.main),
    0.5,
  ]);
  // color the current selected cell
  const selectedColor = rgbaToString([
    ...stringToRGB(theme.palette.primary.main),
    0.95,
  ]);

  const sm = useMediaQuery((th: Theme) => th.breakpoints.down("sm"));

  const [isNote, setIsNote] = useState(false);

  const [currentSelected, setCurrentSelected] = useState<
    [number, number] | null
  >(null);
  const [restartModal, setRestartModal] = useState(false);

  return (
    <Stack
      spacing={2}
      sx={{
        paddingY: {
          xs: "1rem",
          sm: "2rem",
          md: "3rem",
          lg: "4rem",
          xl: "5rem",
        },
        paddingX: {
          xs: "1rem",
          sm: "4rem",
          md: "6rem",
          lg: "8rem",
          xl: "10rem",
        },
        justifyContent: "flex-start",
        alignItems: "center",
        // height: "90vh",

        width: {
          xs: "calc(100% - 2rem)",
          sm: "calc(100% - 8rem)",
          md: "calc(100% - 12rem)",
          lg: "calc(100% - 16rem)",
          xl: "calc(100% - 20rem)",
        },
        // bgcolor: 'primary.light',
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <Grow in={true}>
        <Stack
          direction="column"
          spacing={2}
          sx={{ width: "100%", alignItems: "center" }}
        >
          <Typography variant={sm ? "h4" : "h2"}>Sudoku</Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="subtitle1"
              fontSize={"1.5rem"}
              sx={{ color: "text.secondary" }}
            >
              {difficultyMap[difficulty]}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {Array.from({ length: maxLifes }, (_, i) => (
              <SvgIcon
                key={i}
                component={FavoriteIcon}
                fontSize="medium"
                sx={{
                  color: i < lives ? "error.main" : "action.disabled",
                  // animation: 'pulse 1s infinite',
                  // animate when color changes to grow the heart and grow it back
                  transition: "color 0.5s ease-in-out",
                }}
              />
            ))}

            <Box sx={{ flexGrow: 1 }} />

            <Button
              variant="text"
              onClick={() => {
                setRestartModal(true);
              }}
              sx={{
                // padding: '0.25rem',
                height: "fit-content",
              }}
            >
              <SvgIcon component={ReplayIcon} />
            </Button>
          </Stack>
        </Stack>
      </Grow>

      <FinishedStack missingNumbersCounts={missingNumbersCounts} />

      <Grow in={true}>
        <Box
          sx={{
            borderRadius: "0.5rem",
            backgroundColor: "white",
            borderWidth: "0.2rem",
            borderStyle: "solid",
            // width: 'fit-content',

            // center the box
            marginX: "auto",
            padding: "0rem",
            borderColor: "#0097a7",
            // important for aspect ratio

            aspectRatio: "!1",
            // webkit aspect ratio

            width: {
              xs: "95%",
              sm: "90%",
              md: "80%",
              lg: "60%",
              xl: "50%",
            },
            maxWidth: "45rem",
            maxHeight: "45rem",
          }}
        >
          <Stack
            direction="column"
            sx={{
              height: "100%",
              width: "100%",
              aspectRatio: "1",
            }}
          >
            {sudoku.data.map((y, idy) => (
              <>
                {idy !== 0 && idy % 3 === 0 && (
                  <Box
                    sx={{
                      width: "100%",
                      height: "0.2rem",
                      bgcolor: "primary.dark",
                    }}
                  />
                )}
                {idy !== 0 && idy % 3 !== 0 && (
                  <Box
                    sx={{
                      width: "100%",
                      height: "0.15rem",
                      bgcolor: "primary.light",
                    }}
                  />
                )}
                <Stack
                  direction="row"
                  key={`${idy}-stack`}
                  sx={{ width: "100%", height: "calc(100% / 9)" }}
                >
                  {y.map((z, idz) => {
                    let bgColor = highlightHover([idy, idz], currentSelected)
                      ? highLightColor
                      : "white";

                    // hightligh if the value of the cell is the same as in the current selected cell
                    bgColor =
                      currentSelected &&
                      sudoku.data[idy][idz] ===
                        sudoku.data[currentSelected[0]][currentSelected[1]] &&
                      sudoku.data[idy][idz] !== 0
                        ? sameColor
                        : bgColor;

                    // if current selected is the same as the current cell, set the color to blue
                    bgColor =
                      currentSelected &&
                      currentSelected[0] === idy &&
                      currentSelected[1] === idz
                        ? selectedColor
                        : bgColor;
                    return (
                      <>
                        {idz !== 0 && idz % 3 === 0 && (
                          <Box sx={{ width: "0.2rem", bgcolor: "#0097a7" }} />
                        )}
                        {idz !== 0 && idz % 3 !== 0 && (
                          <Box sx={{ width: "0.15rem", bgcolor: "#B2EBF2" }} />
                        )}
                        <Box
                          key={`${idz}-box`}
                          sx={{
                            // change color of hover row or column is the same
                            // backgroundColor: 'white',
                            padding: "0.25rem",
                            // borderRadius: '0.5rem',
                            borderWidth: "0rem",
                            borderStyle: "solid",
                            // width: 'calc(100% / 9)',
                            // height: 'calc(100% / 9)',
                            // aspect ratio 1:1
                            aspectRatio: "1",
                            // center child
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                            // change color with transition
                            transition: "background-color 0.2s",
                            backgroundColor: bgColor,
                          }}
                          onClick={() => {
                            setCurrentSelected((prev) => {
                              if (prev && prev[0] === idy && prev[1] === idz) {
                                return null;
                              }

                              return [idy, idz];
                            });
                          }}
                        >
                          <MiniCell
                            value={z}
                            possible={sudoku.possible[idy][idz]}
                            solution={solvedSudoku.data[idy][idz]}
                            isCurrent={
                              currentSelected &&
                              currentSelected[0] === idy &&
                              currentSelected[1] === idz
                            }
                          />
                          {/* <Typography variant="body1" gutterBottom>
                          {z === 0 ? '' : z}
                        </Typography> */}
                        </Box>
                      </>
                    );
                  })}
                </Stack>
              </>
            ))}
          </Stack>
        </Box>
      </Grow>
      {
        // buttons for input from 1 to 9
      }
      <Grow in={true}>
        <Stack direction="row" spacing={2}>
          <Button
            variant="text"
            disabled={
              !currentSelected ||
              initialSudoku.data[currentSelected[0]][currentSelected[1]] !== 0
            }
            onClick={() => {
              onClearInput(currentSelected);
            }}
          >
            Clear
            <SvgIcon component={BackspaceIcon} />
          </Button>
          <Button
            variant={isNote ? "contained" : "text"}
            color="secondary"
            onClick={() => {
              setIsNote((prev) => {
                return !prev;
              });
            }}
          >
            Note
            <SvgIcon component={DrawIcon} />
          </Button>
          <Button
            variant="text"
            disabled={
              !currentSelected ||
              initialSudoku.data[currentSelected[0]][currentSelected[1]] !==
                0 ||
              hints === 0
            }
            onClick={() => {
              onSHowHint(currentSelected);
            }}
            sx={
              {
                // padding: '1.5rem',
              }
            }
          >
            Hint
            <Badge
              badgeContent={hints}
              color="secondary"
              sx={{
                // padding: '0.25rem',
                margin: "0.5rem",
                "& .MuiBadge-badge": {
                  right: "-0.65rem",
                  top: "0.25rem",
                  // color to disabled if no hints are available
                  ...((!currentSelected ||
                    initialSudoku.data[currentSelected[0]][
                      currentSelected[1]
                    ] !== 0 ||
                    hints === 0) && {
                    color: "action.disabled",
                  }),
                  ...((!currentSelected ||
                    initialSudoku.data[currentSelected[0]][
                      currentSelected[1]
                    ] !== 0 ||
                    hints === 0) && {
                    bgcolor: "action.disabledBackground",
                  }),
                },
              }}
            >
              <SvgIcon component={TipsAndUpdatesIcon} />
            </Badge>
          </Button>
        </Stack>
      </Grow>
      <ButtonsStack
        missingNumbersCounts={missingNumbersCounts}
        isNote={isNote}
        disabled={
          currentSelected &&
          initialSudoku.data[currentSelected[0]][currentSelected[1]] !== 0
        }
        handleInput={(value) => {
          onInputChange(value, currentSelected, isNote);
        }}
        // buttonsRefs={buttonRefs}
      />

      <Box>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          by Michele Yin
        </Typography>
      </Box>
      <Box sx={{ padding: "1rem" }}></Box>
      <SudokuRestart
        state={restartModal}
        onStateChange={() => {
          setRestartModal(false);
        }}
        onNewGame={() => {
          onQuit();
        }}
      />
    </Stack>
  );
}

import {
  Box,
  Button,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import DialogWrapper from "./DialogWrapper";
import { useEffect, useState } from "react";

interface Sudoku2DWinProps {
  win: boolean;

  onNewGame: () => void;
  onContinue: () => void;
}
export default function SudokuWin({
  win,
  onContinue,
  onNewGame,
}: Readonly<Sudoku2DWinProps>) {
  const [initialDialogState, setInitialDialogState] = useState(win);
  useEffect(() => {
    setInitialDialogState(win);
  }, [win]);
  const sm = useMediaQuery((th: Theme) => th.breakpoints.down("sm"));

  return (
    <DialogWrapper
      title="You Won! 👑"
      state={initialDialogState}
      onOpenClose={(state) => {
        setInitialDialogState(state);
        onContinue();
      }}
      backdrop={
        <Box
          sx={{
            position: "fixed",

            backdropFilter: "blur(10px)",
            bgcolor: "rgba(0, 0, 0, 0.5)",
            width: "100%",
            height: "100%",
            filter: "blur(5px)",
            transform: "scale(1.1)",
            top: 0,
            left: 0,
            // backgroundImage: `/assets/confetti.gif`,
            backgroundImage: `url(/assets/confetti.gif)`,
            // blur the image
            // filter: "blur(5px)",
            // remove the edge of the image
            backgroundClip: "border-box",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></Box>
      }
    >
      <Stack
        direction={sm ? "column" : "row"}
        spacing={2}
        sx={{ color: "text.secondary", width: "100%", paddingY: "1rem" }}
      >
        <Button
          variant="contained"
          sx={{ width: "100%" }}
          onClick={() => {
            setInitialDialogState(false);
            onNewGame();
          }}
        >
          <Typography>New Game</Typography>
        </Button>
      </Stack>
    </DialogWrapper>
  );
}

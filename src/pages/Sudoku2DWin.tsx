import { Button, Stack, Theme, Typography, useMediaQuery } from "@mui/material";
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
    >
      <Stack
        direction={sm ? "column" : "row"}
        spacing={2}
        sx={{ color: "text.secondary", width: "100%", paddingY: "1rem" }}
      >
        <Button
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

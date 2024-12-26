import { Button, Stack, Theme, Typography, useMediaQuery } from "@mui/material";
import DialogWrapper from "./DialogWrapper";

interface Sudoku2DRestartProps {
  state: boolean;
  onStateChange: (state: boolean) => void;
  onNewGame: () => void;
}
export default function SudokuRestart({
  state,
  onNewGame,
  onStateChange,
}: Readonly<Sudoku2DRestartProps>) {
  const sm = useMediaQuery((th: Theme) => th.breakpoints.down("sm"));

  return (
    <DialogWrapper
      title="Do you want to start a new game?"
      state={state}
      onOpenClose={(state) => {
        onStateChange(state);
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
            onStateChange(false);
          }}
        >
          <Typography>Cancel</Typography>
        </Button>
        <Button
          variant="contained"
          sx={{ width: "100%" }}
          onClick={() => {
            onStateChange(false);
            onNewGame();
          }}
        >
          <Typography>New game</Typography>
        </Button>
      </Stack>
    </DialogWrapper>
  );
}

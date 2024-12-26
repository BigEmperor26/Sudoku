import {
  Button,
  Grow,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import DialogWrapper from "./DialogWrapper";
import { useState } from "react";

interface Sudoku2DHomeProps {
  onChange: (dif: string) => void;
}
export default function Sudoku2DHome({
  onChange,
}: Readonly<Sudoku2DHomeProps>) {
  const sm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const [initialDialogState, setInitialDialogState] = useState(false);

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
        justifyContent: "space-around",
        alignItems: "center",
        height: "95vh",
        // bgcolor: 'primary.light',
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <Grow in={true}>
        <Typography variant={sm ? "h3" : "h1"}>Sudoku</Typography>
      </Grow>

      <Grow in={true}>
        <Button
          variant="contained"
          onClick={() => {
            setInitialDialogState(true);
          }}
          size="large"
          sx={{
            padding: "1rem 2rem",
            fontSize: "1.5rem",
          }}
        >
          Play
        </Button>
      </Grow>
      <DialogWrapper
        title="Choose your difficulty"
        state={initialDialogState}
        onOpenClose={(state) => {
          setInitialDialogState(state);
        }}
      >
        <Stack
          direction="column"
          spacing={2}
          sx={{
            color: "text.secondary",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => {
              onChange("easy");
              setInitialDialogState(false);
            }}
            sx={{ width: "100%" }}
          >
            <Typography>🐣 Easy</Typography>
          </Button>
          <Button
            onClick={() => {
              onChange("medium");
              setInitialDialogState(false);
            }}
            sx={{ width: "100%" }}
          >
            <Typography>🐱 Medium</Typography>
          </Button>
          <Button
            onClick={() => {
              onChange("hard");
              setInitialDialogState(false);
            }}
            sx={{ width: "100%" }}
          >
            <Typography>🐘 Hard</Typography>
          </Button>
          <Button
            onClick={() => {
              onChange("impossible");
              setInitialDialogState(false);
            }}
            sx={{ width: "100%" }}
          >
            <Typography>👽 Impossible</Typography>
          </Button>
        </Stack>
      </DialogWrapper>
    </Stack>
  );
}

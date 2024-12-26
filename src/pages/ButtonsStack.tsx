import { Button, Grow, Stack } from "@mui/material";
interface ButtonsStackProps {
  missingNumbersCounts: number[];
  isNote: boolean;
  handleInput: (value: number) => void;
  disabled?: boolean | null;
}

export default function ButtonsStack({
  missingNumbersCounts,
  isNote,
  handleInput,
  disabled,
}: Readonly<ButtonsStackProps>) {
  return (
    <Grow in={true}>
      <Stack
        direction="row"
        useFlexGap
        sx={{
          width: "100%",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {missingNumbersCounts.map((value, idx) => {
          return (
            <>
              {value < 9 && (
                <Grow in={true} key={`${idx}-grow`}>
                  <Button
                    disabled={disabled || false}
                    key={`${idx}-button`}
                    variant="contained"
                    color={isNote ? "secondary" : "primary"}
                    sx={{
                      width: "calc( (100% - 2rem) / 9)",
                      // height: 'calc(100% / 3)',
                      marginX: "0.1rem",
                      marginY: "0.1rem",
                      maxWidth: "6rem",
                      // on color change, change the color of the button with animation

                      // color: isNote ? "white" : "black",
                      // backgroundColor: isNote ? "#f50057" : "#3f51b5",
                      // transition: "background-color 6.5s ease-in-out",
                      // webkitTransition: "background-color 6.5s ease-in-out",
                    }}
                    onClick={() => {
                      handleInput(idx + 1);
                    }}
                  >
                    {idx + 1}
                  </Button>
                </Grow>
              )}
            </>
          );
        })}
      </Stack>
    </Grow>
  );
}

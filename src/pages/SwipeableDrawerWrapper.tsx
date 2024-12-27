import { Box, Stack, SwipeableDrawer } from "@mui/material";
interface SwipeableDrawerWrapperProps {
  state: boolean;
  onOpenClose?: (state: boolean) => void;
  children: React.ReactNode;
  backdrop?: React.ReactNode;
}

export default function SwipeableDrawerWrapper({
  state,
  onOpenClose,
  children,
  backdrop,
}: Readonly<SwipeableDrawerWrapperProps>) {
  return (
    <SwipeableDrawer
      open={state}
      anchor="bottom"
      onClose={() => onOpenClose?.(false)}
      onOpen={() => onOpenClose?.(true)}
      disableSwipeToOpen={true}
      sx={{
        // height of the content
        "& .MuiDrawer-paper": {
          borderRadius: "3rem 3rem 0 0",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          bgcolor: "background.default",
        },
      }}
      slots={{
        ...(backdrop && {
          backdrop: () => {
            // return <div />;
            return backdrop;
          },
        }),
      }}
    >
      <Stack
        sx={{ width: "calc(100% - 2rem)", height: "100%", padding: "1rem" }}
        direction="column"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box
          sx={{
            width: "10rem",
            height: "2rem",
            borderRadius: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // hover effect
            "&:hover": {
              // change the mouse
              cursor: "pointer",
            },
          }}
          onClick={() => onOpenClose?.(false)}
        >
          <Box
            sx={{
              bgcolor: "primary.dark",
              width: "5rem",
              height: "0.5rem",
              borderRadius: "2rem",
            }}
          />
        </Box>
        <Box
          sx={{
            maxHeight: "65vh",
            overflowY: "auto",
            overflowX: "hidden",
            width: "100%",
          }}
        >
          {children}
        </Box>
      </Stack>
    </SwipeableDrawer>
  );
}

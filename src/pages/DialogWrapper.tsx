import {
  DialogContent,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  useMediaQuery,
  Theme,
  Button,
  SvgIcon,
  Box,
} from "@mui/material";
import SwipeableDrawerWrapper from "./SwipeableDrawerWrapper";
import CloseIcon from "@mui/icons-material/Close";
interface DialogWrapperProps {
  title?: string;
  subtitle?: string;
  state: boolean;
  children?: React.ReactNode;
  onOpenClose?: (state: boolean) => void;
}
export default function DialogWrapper({
  title,
  subtitle,
  state,
  children,

  onOpenClose,
}: Readonly<DialogWrapperProps>) {
  const sm = useMediaQuery((th: Theme) => th.breakpoints.down("sm"));

  const content = (
    <Stack
      direction="column"
      sx={{
        paddingBottom: "1rem",
        width: sm ? "calc(100%)" : "calc(100% - 2rem)",
        height: "100%",
        justifyContent: "center",
      }}
    >
      0
      <Stack
        direction="row"
        sx={{
          // move the close button to the right
          // transform: "translateX(1rem) translateY(-1rem)",
          // width: "100%",
          width: "calc(100% - 2rem)",
        }}
      >
        <DialogTitle
          sx={{
            color: "text.secondary",
            // wrap the text
            whiteSpace: "normal",
            wordWrap: "break-word",
            width: "calc(100% - 3rem)",
          }}
        >
          {title}
        </DialogTitle>
        <Box sx={{ flexGrow: 1 }} />
        {!sm && (
          <Button onClick={() => onOpenClose?.(false)} disableElevation>
            <SvgIcon component={CloseIcon} />
          </Button>
        )}
      </Stack>
      <DialogContent
        sx={{
          paddingY: "0",
          paddingX: "1.5rem",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
          }}
        >
          {subtitle}
        </Typography>
      </DialogContent>
      <DialogContent
        sx={{
          paddingY: "0",
          paddingX: "1rem",
        }}
      >
        {children}
      </DialogContent>
    </Stack>
  );
  return (
    <>
      {sm && (
        <SwipeableDrawerWrapper state={state} onOpenClose={onOpenClose}>
          {content}
        </SwipeableDrawerWrapper>
      )}
      {!sm && (
        <Dialog
          onClick={(eve) => {
            // stop propagation because it will click under the modal
            eve.stopPropagation();
          }}
          onClose={() => {
            onOpenClose?.(false);
          }}
          open={state}
          sx={{
            // remove shadow
            "& .MuiPaper-root": {
              bosmhadow: "none",
              minWidth: "30rem",
              // maxWidth: "30rem",
            },
          }}
        >
          {content}
        </Dialog>
      )}
    </>
  );
}

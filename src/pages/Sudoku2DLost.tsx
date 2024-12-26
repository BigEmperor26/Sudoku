import { Button, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
import DialogWrapper from './DialogWrapper';
import { useEffect, useState } from 'react';

interface Sudoku2DLostProps {
  lost: boolean;

  onNewGame: () => void;
  onContinue: () => void;
}
export default function SudokuLost({ lost, onContinue, onNewGame }: Readonly<Sudoku2DLostProps>) {
  const [initialDialogState, setInitialDialogState] = useState(lost);
  useEffect(() => {
    setInitialDialogState(lost);
  }, [lost]);
  const sm = useMediaQuery((th: Theme) => th.breakpoints.down('sm'));

  return (
    <DialogWrapper
      title="You Lost!"
      state={initialDialogState}
      onOpenClose={(state) => {
        setInitialDialogState(state);
        onContinue();
      }}
    >
      <Stack direction={sm ? 'column' : 'row'} spacing={2} sx={{ color: 'text.secondary', width: '100%', paddingY: '1rem' }}>
        <Button
          sx={{ width: '100%' }}
          onClick={() => {
            setInitialDialogState(false);
            onNewGame();
          }}
        >
          <Typography>New Game</Typography>
        </Button>
        <Button
          variant="contained"
          sx={{ width: '100%' }}
          onClick={() => {
            setInitialDialogState(false);
            onContinue();
          }}
        >
          <Typography>Continue</Typography>
        </Button>
      </Stack>
    </DialogWrapper>
  );
}

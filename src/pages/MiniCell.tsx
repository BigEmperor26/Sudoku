import { Box, Fade, Grow, Stack, Typography } from '@mui/material';

interface MiniCellProps {
  value: number;
  possible: number[];
  solution: number;
  isCurrent: boolean | null;
}

export default function MiniCell({ value, possible, solution, isCurrent }: Readonly<MiniCellProps>) {
  let textColor = isCurrent ? 'white' : 'primary.main';

  textColor = value !== solution ? 'error.light' : textColor;

  const noteColor = isCurrent ? 'secondary.light' : 'secondary.main';
  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {
        // if value is not 0, display the value
        value !== 0 ? (
          <Fade in={true}>
            <Typography
              variant="h5"
              sx={{
                // reduce interline spacing
                lineHeight: '0.0',
                // redcuce font size
                fontSize: {
                  xs: '1.5rem',
                  sm: '1.6rem',
                  md: '1.7rem',
                  lg: '1.8rem',
                  xl: '1.9rem',
                },
                color: textColor,
                transition: 'color 0.2s',
              }}
            >
              {value}
            </Typography>
          </Fade>
        ) : (
          // else display the possible values
          <Grow in={true}>
            <Stack direction={'column'} sx={{ width: '100%', height: '100%', justifyContent: 'space-around', alignItems: 'center' }}>
              <Stack
                direction={'row'}
                sx={{
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    // reduce interline spacing
                    lineHeight: '0.0',
                    // redcuce font size
                    fontSize: {
                      xs: '0.5rem',
                      sm: '0.6rem',
                      md: '0.7rem',
                      lg: '0.8rem',
                      xl: '0.9rem',
                    },
                    color: noteColor,
                  }}
                >
                  {possible.includes(1) ? 1 : '⠀'}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    // reduce interline spacing
                    lineHeight: '0.0',
                    // redcuce font size
                    fontSize: {
                      xs: '0.5rem',
                      sm: '0.6rem',
                      md: '0.7rem',
                      lg: '0.8rem',
                      xl: '0.9rem',
                    },
                    color: noteColor,
                  }}
                >
                  {possible.includes(2) ? 2 : '⠀'}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    // reduce interline spacing
                    lineHeight: '0.0',
                    // redcuce font size
                    fontSize: {
                      xs: '0.5rem',
                      sm: '0.6rem',
                      md: '0.7rem',
                      lg: '0.8rem',
                      xl: '0.9rem',
                    },
                    color: noteColor,
                  }}
                >
                  {possible.includes(3) ? 3 : '⠀'}
                </Typography>
              </Stack>
              <Stack
                direction={'row'}
                sx={{
                  justifyContent: 'space-around',
                  alignItems: 'center',

                  width: '100%',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    // reduce interline spacing
                    lineHeight: '0.0',
                    // redcuce font size
                    fontSize: {
                      xs: '0.5rem',
                      sm: '0.6rem',
                      md: '0.7rem',
                      lg: '0.8rem',
                      xl: '0.9rem',
                    },
                    color: noteColor,
                  }}
                >
                  {possible.includes(4) ? 4 : '⠀'}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    // reduce interline spacing
                    lineHeight: '0.0',
                    // redcuce font size
                    fontSize: {
                      xs: '0.5rem',
                      sm: '0.6rem',
                      md: '0.7rem',
                      lg: '0.8rem',
                      xl: '0.9rem',
                    },
                    color: noteColor,
                  }}
                >
                  {possible.includes(5) ? 5 : '⠀'}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    // reduce interline spacing
                    lineHeight: '0.0',
                    // redcuce font size
                    fontSize: {
                      xs: '0.5rem',
                      sm: '0.6rem',
                      md: '0.7rem',
                      lg: '0.8rem',
                      xl: '0.9rem',
                    },
                    color: noteColor,
                  }}
                >
                  {possible.includes(6) ? 6 : '⠀'}
                </Typography>
              </Stack>
              <Stack
                direction={'row'}
                sx={{
                  justifyContent: 'space-around',
                  alignItems: 'center',

                  width: '100%',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    // reduce interline spacing
                    lineHeight: '0.0',
                    // redcuce font size
                    fontSize: {
                      xs: '0.5rem',
                      sm: '0.6rem',
                      md: '0.7rem',
                      lg: '0.8rem',
                      xl: '0.9rem',
                    },
                    color: noteColor,
                  }}
                >
                  {possible.includes(7) ? 7 : '⠀'}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    // reduce interline spacing
                    lineHeight: '0.0',
                    // redcuce font size
                    fontSize: {
                      xs: '0.5rem',
                      sm: '0.6rem',
                      md: '0.7rem',
                      lg: '0.8rem',
                      xl: '0.9rem',
                    },
                    color: noteColor,
                  }}
                >
                  {possible.includes(8) ? 8 : '⠀'}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    // reduce interline spacing
                    lineHeight: '0.0',
                    // redcuce font size
                    fontSize: {
                      xs: '0.5rem',
                      sm: '0.6rem',
                      md: '0.7rem',
                      lg: '0.8rem',
                      xl: '0.9rem',
                    },
                    color: noteColor,
                  }}
                >
                  {possible.includes(9) ? 9 : '⠀'}
                </Typography>
              </Stack>
            </Stack>
          </Grow>
        )
      }
    </Box>
  );
}

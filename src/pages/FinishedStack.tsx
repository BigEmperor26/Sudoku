import { Box, Grow, Stack, Typography } from '@mui/material';
interface FinishedStackProps {
  missingNumbersCounts: number[];
}

export default function FinishedStack({ missingNumbersCounts }: Readonly<FinishedStackProps>) {
  return (
    <Grow in={true}>
      <Stack direction="row" useFlexGap sx={{ width: '100%', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        {missingNumbersCounts.map((value, idx) => {
          return (
            <Box
              // eslint-disable-next-line react/no-array-index-key
              key={`${idx}-box`}
              sx={{
                width: 'calc( (100% - 2rem) / 9)',
                // height: 'calc(100% / 3)',
                marginX: '0.1rem',
                marginY: '0.1rem',
                maxWidth: '6rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // background: 'linear-gradient(45deg, transparent 50%, #989898 49%, #989898 51%, transparent 50%)',
                // backgroundSize: '50% 50%',
                // backgroundRepeat: 'no-repeat',
              }}
            >
              {value === 9 && (
                <Grow in={true}>
                  <Typography
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${idx}-typography`}
                    variant="button"
                    sx={{
                      // width: '100%',
                      // height: 'calc(100% / 3)',
                      marginX: '0.1rem',
                      marginY: '0.1rem',
                      maxWidth: '6rem',
                      color: 'text.disabled',
                      alignContent: 'center',
                      justifyContent: 'center',
                      padding: '0.25rem',
                      // textDecoration: 'line-through',

                      background: 'linear-gradient(45deg, transparent 50%, #98989880 45%, #98989880 55%, transparent 50%)',
                      backgroundSize: '100% 100%',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    {idx + 1}
                  </Typography>
                </Grow>
              )}
            </Box>
          );
        })}
      </Stack>
    </Grow>
  );
}

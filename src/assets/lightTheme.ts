import { createTheme, ThemeOptions } from '@mui/material/styles';

export const lightThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: 'Alaska, Roboto, sans-serif',
  },
  palette: {
    mode: 'light',
    primary: {
      main: 'rgb(0,188,212)',
      light: 'rgb(178,235,242)',

      dark: 'rgb(0,151,167)',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FF9800',
      light: '#ffe0b2',
      dark: '#f57c00',
    },
    text: {
      primary: '#FFFFFF',
    },
    action: {
      // disabled: '#E7E7E7',
      // disabledBackground: '#838383',
      // selected: '#F8F8F8',
    },
    success: {
      main: '#05D34A',
    },
    background: {
      default: '#f8f8f8',
      paper: '#ffffff',
    },
    // add paper color
  },
  breakpoints: {
    values: {
      xs: 0, // phone
      sm: 600, // tablets
      md: 900, // small laptop
      lg: 1200, // desktop
      xl: 1536, // large screens
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#28333E',
          fontWeight: 300,
          fontSize: '12px',
          padding: '0.5rem',
          color: 'white',
          '& .MuiTooltip-arrow': {
            color: '#28333E',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 75,
          padding: '0.625rem 1.125rem',
          gap: '0.5rem',
        },
      },
      variants: [
        {
          props: { variant: 'outlined', color: 'primary' },
          style: {
            backgroundColor: 'rgba(0,0,0, 0.0)',
            color: 'primary',
            outline: '0.06rem solid',
            outlineColor: 'primary',
            '&.Mui-disabled': {
              background: '#e1e1e1',
              disabledBackground: '#e1e1e1',
              color: '#838383',
              outlineColor: '#e1e1e1',
            },
          },
        },
      ],
    },
    // MuiCssBaseline: {
    //   ,
    // },
    // change style of snackbars
    MuiSnackbar: {
      styleOverrides: {
        root: {
          '& .MuiSnackbarContent-root': {
            borderRadius: 4,
            backgroundColor: 'primary.main',
            color: 'white',
          },
        },
      },
    },
    // change style of modal
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          backgroundColor: '#f8f8f8',
          color: 'primary.main',
        },
        // backdrop blur
        root: {
          backdropFilter: 'blur(4px)',
        },
      },
    },
    // change style of Popover
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: 8,
          backgroundColor: 'primary.contrastText',
          color: 'primary.main',
        },
      },
    },
  },

  shape: {
    borderRadius: 4,
  },
  spacing: 8,
};
const lightTheme = createTheme(lightThemeOptions);
export default lightTheme;

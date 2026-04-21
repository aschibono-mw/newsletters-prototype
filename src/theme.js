/**
 * Simplified Design System Theme
 * Based on design-system-viewer theme tokens
 */

import { createTheme } from '@mui/material/styles';

// Brand Colors
const brand = {
  primary: '#00827F',        // Teal (Custom)
  primaryLight: '#22D3EE',   // Aqua 300
  primaryDark: '#155E75',    // Aqua 900
  secondary: '#B627A1',      // Purple (Custom)
  secondaryLight: '#E879F9', // Purple 300
  secondaryDark: '#86198F',  // Purple 900
};

// Status Colors
const status = {
  success: '#22C55E',        // Green 500
  successLight: '#86EFAC',   // Green 300
  successDark: '#16A34A',    // Green 700
  warning: '#F59E0B',        // Orange 500
  warningLight: '#FBBF24',   // Orange 300
  warningDark: '#D97706',    // Orange 700
  error: '#EF4444',          // Red 500
  errorLight: '#FCA5A5',     // Red 300
  errorDark: '#DC2626',      // Red 700
  info: '#3B82F6',           // Blue 500
  infoLight: '#93C5FD',      // Blue 300
  infoDark: '#2563EB',       // Blue 700
};

// Grey scale
const grey = {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#eeeeee',
  300: '#e0e0e0',
  400: '#bdbdbd',
  500: '#9e9e9e',
  600: '#757575',
  700: '#616161',
  800: '#424242',
  900: '#212121',
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: brand.primary,
      light: brand.primaryLight,
      dark: brand.primaryDark,
      contrastText: '#ffffff',
    },
    secondary: {
      main: brand.secondary,
      light: brand.secondaryLight,
      dark: brand.secondaryDark,
      contrastText: '#ffffff',
    },
    success: {
      main: status.success,
      light: status.successLight,
      dark: status.successDark,
      contrastText: '#ffffff',
    },
    warning: {
      main: status.warning,
      light: status.warningLight,
      dark: status.warningDark,
      contrastText: '#000000',
    },
    error: {
      main: status.error,
      light: status.errorLight,
      dark: status.errorDark,
      contrastText: '#ffffff',
    },
    info: {
      main: status.info,
      light: status.infoLight,
      dark: status.infoDark,
      contrastText: '#ffffff',
    },
    grey: grey,
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.60)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
  },
  typography: {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, Inter, "Segoe UI", sans-serif',
    h4: {
      fontSize: '32px',
      lineHeight: '40px',
      fontWeight: 700,
    },
    h5: {
      fontSize: '24px',
      lineHeight: '32px',
      fontWeight: 400,
    },
    h6: {
      fontSize: '20px',
      lineHeight: '26px',
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: '16px',
      lineHeight: '22px',
      fontWeight: 400,
    },
    body1: {
      fontSize: '14px',
      lineHeight: '18px',
      fontWeight: 400,
    },
    body2: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 400,
    },
    caption: {
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 4,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '4px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
          '&:active': {
            boxShadow: 'none',
          },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiSelect: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
        },
        rounded: {
          borderRadius: '4px',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '4px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: 'rgba(0, 0, 0, 0.87)',
          borderRadius: 0,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: grey[100],
            '&:hover': {
              backgroundColor: grey[200],
            },
          },
        },
      },
    },
  },
});

export default theme;

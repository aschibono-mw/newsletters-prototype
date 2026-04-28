import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import App from './App.jsx'

const theme = createTheme({
  spacing: 8,
  palette: {
    mode: 'light',
    primary: {
      main: '#00827F',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#B627A1',
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      defaultProps: { variant: 'contained' },
      styleOverrides: {
        root: { textTransform: 'none', borderRadius: 4 },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined' },
    },
    MuiSelect: {
      defaultProps: { variant: 'outlined' },
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)

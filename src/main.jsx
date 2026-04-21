import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline, GlobalStyles } from '@mui/material'
import App from './App.jsx'
import { createDynamicTheme } from './createDynamicTheme.js'

// eslint-disable-next-line react-refresh/only-export-components
function ThemedApp() {
  // Load initial colorblind type from localStorage
  const [colorblindType, setColorblindType] = useState(() => {
    return localStorage.getItem('colorblindType') || 'none'
  })

  // Listen for palette changes from App component
  useEffect(() => {
    const handlePaletteChange = (event) => {
      setColorblindType(event.detail.colorblindType)
    }

    window.addEventListener('paletteChange', handlePaletteChange)
    return () => window.removeEventListener('paletteChange', handlePaletteChange)
  }, [])

  // Create theme dynamically based on colorblind preference
  const theme = createDynamicTheme(colorblindType)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          '.themed-showcase': {
            display: 'block',
          },
          '.variant-section': {
            marginBottom: '32px', // Matches MUI mb: 4
          },
          '.variant-section h4': {
            marginTop: 0,
            marginBottom: '16px', // Matches MUI mb: 2
            fontSize: '1.25rem', // Matches MUI Typography variant="h6"
            fontWeight: 600,
            lineHeight: 1.6,
          },
          '.variant-section > p': {
            marginTop: 0,
            marginBottom: '16px',
            fontSize: '0.875rem',
            lineHeight: 1.6,
          },
          '.variant-section .MuiStack-root': {
            gap: '16px',
          },
        }}
      />
      <App />
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemedApp />
  </React.StrictMode>,
)

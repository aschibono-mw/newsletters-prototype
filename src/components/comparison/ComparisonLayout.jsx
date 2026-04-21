import { Box, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { createDynamicTheme } from '../../createDynamicTheme'
import { useMemo } from 'react'

export default function ComparisonLayout({
  componentName,
  muiBaseline,
  themed,
  mode = 'light',
  colorblindType = 'none'
}) {
  // Dynamic theme for Themed column (with colorblind support)
  const themedTheme = useMemo(
    () => createDynamicTheme(mode, colorblindType),
    [mode, colorblindType]
  )

  // Simple baseline theme (vanilla MUI)
  const baselineTheme = useMemo(
    () => createDynamicTheme('light', 'none'),
    []
  )

  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        p: 3,
        mb: 4,
        backgroundColor: 'background.paper',
      }}
    >
      {/* Component Title */}
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          pb: 1.5,
          borderBottom: '1px solid',
          borderColor: 'divider',
          fontWeight: 500,
        }}
      >
        {componentName}
      </Typography>

      {/* 2-Column Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 3,
        }}
      >
        {/* MUI Baseline Column */}
        <ThemeProvider theme={baselineTheme}>
          <Box
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              backgroundColor: '#ffffff',
              minHeight: 200,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                px: 2,
                py: 1.5,
                borderBottom: '1px solid',
                borderColor: 'divider',
                fontWeight: 600,
                color: 'text.secondary',
                backgroundColor: 'grey.50',
              }}
            >
              MUI Baseline
            </Typography>
            <Box sx={{ p: 3 }}>
              {muiBaseline}
            </Box>
          </Box>
        </ThemeProvider>

        {/* Themed Column */}
        <ThemeProvider theme={themedTheme}>
          <Box
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              backgroundColor: themedTheme.palette.mode === 'dark' ? '#252525' : '#ffffff',
              minHeight: 200,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                px: 2,
                py: 1.5,
                borderBottom: '1px solid',
                borderColor: 'divider',
                fontWeight: 600,
                color: 'text.secondary',
                backgroundColor: themedTheme.palette.mode === 'dark' ? '#1a1a1a' : 'grey.50',
              }}
            >
              Themed
            </Typography>
            <Box sx={{ p: 3 }}>
              {themed}
            </Box>
          </Box>
        </ThemeProvider>
      </Box>
    </Box>
  )
}

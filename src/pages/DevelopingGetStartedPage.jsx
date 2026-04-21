import { Box, Container, Typography, Divider, Link, Paper } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

function DevelopingGetStartedPage() {
  return (
    <Container maxWidth={false} sx={{ maxWidth: 800, mx: 'auto', px: 3, pt: 6, pb: 8 }}>
      {/* Breadcrumb */}
      <Box sx={{ mb: 4 }}>
        <Link
          component={RouterLink}
          to="/developing"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            color: 'text.secondary',
            textDecoration: 'none',
            fontSize: '0.875rem',
            '&:hover': { color: 'primary.main' },
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 16 }} />
          Developing
        </Link>
      </Box>

      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: 600, mb: 2 }}>
          Get Started
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, lineHeight: 1.6 }}>
          Set up your development environment and start building with the design system.
        </Typography>
      </Box>

      {/* Requirements */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Requirements
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
          <Typography component="li" variant="body1" sx={{ mb: 1, color: 'text.secondary' }}>
            Node.js 18+
          </Typography>
          <Typography component="li" variant="body1" sx={{ mb: 1, color: 'text.secondary' }}>
            React 18+ or 19
          </Typography>
          <Typography component="li" variant="body1" sx={{ color: 'text.secondary' }}>
            npm, yarn, or pnpm
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* Installation */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Installation
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
          Install Material UI and its peer dependencies:
        </Typography>

        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, mb: 3 }}>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
            npm install @mui/material @emotion/react @emotion/styled
          </Typography>
        </Paper>

        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
          Install icons (optional but recommended):
        </Typography>

        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
            npm install @mui/icons-material
          </Typography>
        </Paper>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* Basic setup */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Basic Setup
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
          Wrap your application with ThemeProvider and CssBaseline:
        </Typography>

        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.875rem', whiteSpace: 'pre-wrap' }}>
{`import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const theme = createTheme({
  // your theme customizations
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <YourApp />
    </ThemeProvider>
  )
}`}
          </Typography>
        </Paper>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* First component */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Your First Component
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
          Import and use components from @mui/material:
        </Typography>

        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.875rem', whiteSpace: 'pre-wrap' }}>
{`import Button from '@mui/material/Button'

function MyButton() {
  return (
    <Button variant="contained">
      Hello World
    </Button>
  )
}`}
          </Typography>
        </Paper>
      </Box>

      {/* Page navigation */}
      <Box
        sx={{
          mt: 8,
          pt: 4,
          borderTop: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Link
          component={RouterLink}
          to="/developing/react"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            color: 'primary.main',
            textDecoration: 'none',
            fontWeight: 500,
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          React Guide
          <ArrowForwardIcon sx={{ fontSize: 16 }} />
        </Link>
      </Box>
    </Container>
  )
}

export default DevelopingGetStartedPage

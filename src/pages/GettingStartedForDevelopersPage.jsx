import { Box, Container, Typography, Divider, Link, Paper } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

function GettingStartedForDevelopersPage() {
  return (
    <Container maxWidth={false} sx={{ maxWidth: 800, mx: 'auto', px: 3, pt: 6, pb: 8 }}>
      {/* Breadcrumb */}
      <Box sx={{ mb: 4 }}>
        <Link
          component={RouterLink}
          to="/getting-started"
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
          Getting Started
        </Link>
      </Box>

      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: 600, mb: 2 }}>
          For Developers
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, lineHeight: 1.6 }}>
          Install the component library and start building with production-ready React components.
        </Typography>
      </Box>

      {/* Installation */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Installation
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
          The design system is built on Material UI v7. Install the core packages to get started.
        </Typography>

        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, mb: 3 }}>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
            npm install @mui/material @emotion/react @emotion/styled
          </Typography>
        </Paper>

        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
          For icons, install the icons package:
        </Typography>

        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
            npm install @mui/icons-material
          </Typography>
        </Paper>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* Theme setup */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Theme Setup
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
          Wrap your app with the ThemeProvider to apply the design system tokens globally.
        </Typography>

        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.875rem', whiteSpace: 'pre-wrap' }}>
{`import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { theme } from './theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Your app */}
    </ThemeProvider>
  )
}`}
          </Typography>
        </Paper>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* Using components */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Using Components
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
          Import components from @mui/material and use them in your JSX. All components support the design system tokens automatically.
        </Typography>

        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, mb: 3 }}>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.875rem', whiteSpace: 'pre-wrap' }}>
{`import { Button, TextField, Stack } from '@mui/material'

function MyForm() {
  return (
    <Stack spacing={2}>
      <TextField label="Email" />
      <Button variant="contained">
        Submit
      </Button>
    </Stack>
  )
}`}
          </Typography>
        </Paper>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Customizing with sx
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
            Use the <code>sx</code> prop for one-off styling. It has access to theme values like spacing, colors, and breakpoints.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Extending with styled()
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
            For reusable styled components, use Emotion's <code>styled()</code> API. It integrates with the theme automatically.
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* Best practices */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Best Practices
        </Typography>

        <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
          <Typography component="li" variant="body1" sx={{ mb: 1.5, color: 'text.secondary' }}>
            <strong>Use theme values:</strong> Access colors via <code>theme.palette</code>, spacing via <code>theme.spacing()</code>
          </Typography>
          <Typography component="li" variant="body1" sx={{ mb: 1.5, color: 'text.secondary' }}>
            <strong>Prefer composition:</strong> Combine simple components rather than building monolithic ones
          </Typography>
          <Typography component="li" variant="body1" sx={{ mb: 1.5, color: 'text.secondary' }}>
            <strong>Keep accessibility:</strong> Don't override ARIA attributes unless you know what you're doing
          </Typography>
          <Typography component="li" variant="body1" sx={{ color: 'text.secondary' }}>
            <strong>Test with keyboard:</strong> Ensure all interactions work without a mouse
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* Related resources */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Related Resources
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Link
            component={RouterLink}
            to="/developing"
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
            Developing Hub
            <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Link>
          <Link
            component={RouterLink}
            to="/ds-collection"
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
            Component Library
            <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Link>
        </Box>
      </Box>

      {/* Page navigation */}
      <Box
        sx={{
          mt: 8,
          pt: 4,
          borderTop: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <Link
          component={RouterLink}
          to="/getting-started/for-designers"
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
          <ArrowBackIcon sx={{ fontSize: 16 }} />
          For Designers
        </Link>
      </Box>
    </Container>
  )
}

export default GettingStartedForDevelopersPage

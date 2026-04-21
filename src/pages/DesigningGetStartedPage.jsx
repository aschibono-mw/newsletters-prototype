import { Box, Container, Typography, Divider, Link, Paper } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

function DesigningGetStartedPage() {
  return (
    <Container maxWidth={false} sx={{ maxWidth: 800, mx: 'auto', px: 3, pt: 6, pb: 8 }}>
      {/* Breadcrumb */}
      <Box sx={{ mb: 4 }}>
        <Link
          component={RouterLink}
          to="/designing"
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
          Designing
        </Link>
      </Box>

      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: 600, mb: 2 }}>
          Get Started
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, lineHeight: 1.6 }}>
          Set up your design environment and learn the fundamentals of working with our design system.
        </Typography>
      </Box>

      {/* Prerequisites */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Prerequisites
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
          Before you begin, make sure you have access to the following:
        </Typography>

        <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
          <Typography component="li" variant="body1" sx={{ mb: 1, color: 'text.secondary' }}>
            Figma account with team access
          </Typography>
          <Typography component="li" variant="body1" sx={{ mb: 1, color: 'text.secondary' }}>
            Permission to enable shared libraries
          </Typography>
          <Typography component="li" variant="body1" sx={{ color: 'text.secondary' }}>
            Familiarity with Figma's component and variant system
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* Enable the library */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Enable the Library
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
          The design system is distributed as a Figma library. Once enabled, all components and styles become available in your files.
        </Typography>

        <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, backgroundColor: 'grey.50', mb: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
            Steps to enable
          </Typography>
          <Box component="ol" sx={{ m: 0, pl: 2.5 }}>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              Open the Assets panel in Figma (Option + 2)
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              Click the book icon to open Libraries
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              Find "Design System" in the list
            </Typography>
            <Typography component="li" variant="body2">
              Toggle it on to enable
            </Typography>
          </Box>
        </Paper>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* Explore components */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Explore Components
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
          Once the library is enabled, browse available components in the Assets panel. Components are organized by category: Inputs, Feedback, Navigation, and more.
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
          Each component has variants for different states and configurations. Use the right sidebar to switch between them.
        </Typography>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* Next steps */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Next Steps
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Link
            component={RouterLink}
            to="/designing/design-kits"
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
            Explore Design Kits
            <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Link>
          <Link
            component={RouterLink}
            to="/designing/principles"
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
            Learn Design Principles
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
          justifyContent: 'flex-end',
        }}
      >
        <Link
          component={RouterLink}
          to="/designing/design-kits"
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
          Design Kits
          <ArrowForwardIcon sx={{ fontSize: 16 }} />
        </Link>
      </Box>
    </Container>
  )
}

export default DesigningGetStartedPage

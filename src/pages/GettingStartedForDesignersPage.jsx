import { Box, Container, Typography, Divider, Link, Paper } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

function GettingStartedForDesignersPage() {
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
          For Designers
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, lineHeight: 1.6 }}>
          Get set up with the design resources you need to create consistent, on-brand experiences.
        </Typography>
      </Box>

      {/* Figma setup */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Setting Up Figma
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
          The design system lives in Figma as a shared library. Once enabled, you'll have access to all components, styles, and tokens.
        </Typography>

        <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, backgroundColor: 'grey.50' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
            Quick setup steps
          </Typography>
          <Box component="ol" sx={{ m: 0, pl: 2.5 }}>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              Open any Figma file in your team workspace
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              Click the <strong>Assets</strong> panel (or press Option+2)
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              Click the book icon to open <strong>Libraries</strong>
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              Enable the <strong>Design System</strong> library
            </Typography>
            <Typography component="li" variant="body2">
              Components are now available in your Assets panel
            </Typography>
          </Box>
        </Paper>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* Using components */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Using Components
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
          Components in the library are built with variants and properties. This means you can customize them without detaching from the source.
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Instance Swapping
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
            Drag a component from the Assets panel, then use the right sidebar to change variants (size, state, type). Don't detach—swap instead.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Overriding Content
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
            Text, icons, and nested components can be overridden. Click into the component and edit directly. Your changes won't break the link to the library.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            When to Detach
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
            Almost never. If you find yourself needing to detach frequently, that's a signal the library may need a new variant. Talk to the design system team.
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* Tokens */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Design Tokens
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
          Tokens are the building blocks of the visual language—colors, typography, spacing, and more. Use them instead of raw values.
        </Typography>

        <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
          <Typography component="li" variant="body1" sx={{ mb: 1, color: 'text.secondary' }}>
            <strong>Colors:</strong> Use semantic tokens (primary, success, error) not hex values
          </Typography>
          <Typography component="li" variant="body1" sx={{ mb: 1, color: 'text.secondary' }}>
            <strong>Typography:</strong> Apply text styles, don't manually set font properties
          </Typography>
          <Typography component="li" variant="body1" sx={{ mb: 1, color: 'text.secondary' }}>
            <strong>Spacing:</strong> Use 8px grid increments (8, 16, 24, 32...)
          </Typography>
          <Typography component="li" variant="body1" sx={{ color: 'text.secondary' }}>
            <strong>Elevation:</strong> Apply effect styles for consistent shadows
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
            to="/designing"
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
            Designing Hub
            <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Link>
          <Link
            component={RouterLink}
            to="/guidelines/accessibility"
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
            Accessibility Guidelines
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
          justifyContent: 'space-between',
        }}
      >
        <Link
          component={RouterLink}
          to="/getting-started/overview"
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
          Overview
        </Link>
        <Link
          component={RouterLink}
          to="/getting-started/for-developers"
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
          For Developers
          <ArrowForwardIcon sx={{ fontSize: 16 }} />
        </Link>
      </Box>
    </Container>
  )
}

export default GettingStartedForDesignersPage

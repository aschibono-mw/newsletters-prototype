import { Box, Container, Typography, Divider, Link, Paper } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

function GettingStartedOverviewPage() {
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
          Overview
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, lineHeight: 1.6 }}>
          The design system is a collection of reusable components, guidelines, and tools that help teams build consistent, accessible, and high-quality user experiences.
        </Typography>
      </Box>

      {/* What is a design system */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          What is a Design System?
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
          A design system is more than a component library. It's the single source of truth for how we build products—combining design tokens, UI components, patterns, and documentation into a unified toolkit.
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
          It bridges the gap between design and development, ensuring that what designers create in Figma matches what developers build in code.
        </Typography>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* Core principles */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Core Principles
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8 }}>
          These principles guide every decision we make in the design system.
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Consistency
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
            Every component behaves predictably across the product. Users learn patterns once and apply them everywhere.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Accessibility
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
            We design for everyone. Components meet WCAG 2.1 AA standards by default, supporting keyboard navigation, screen readers, and various color vision types.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Efficiency
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
            Teams move faster when they don't reinvent the wheel. The system provides tested, production-ready building blocks.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Flexibility
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
            Components are composable and customizable. The system adapts to different contexts without breaking conventions.
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* What's included */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          What's Included
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
              Design Tokens
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Colors, typography, spacing, elevation, and motion values that ensure visual consistency.
            </Typography>
          </Paper>

          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
              Components
            </Typography>
            <Typography variant="body2" color="text.secondary">
              70+ production-ready React components with built-in accessibility and theming support.
            </Typography>
          </Paper>

          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
              Guidelines
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Best practices for accessibility, content, motion, and AI interactions.
            </Typography>
          </Paper>

          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
              Figma Libraries
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Design assets that stay in sync with the code, enabling seamless design-to-dev handoff.
            </Typography>
          </Paper>
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
          For Designers
          <ArrowForwardIcon sx={{ fontSize: 16 }} />
        </Link>
      </Box>
    </Container>
  )
}

export default GettingStartedOverviewPage

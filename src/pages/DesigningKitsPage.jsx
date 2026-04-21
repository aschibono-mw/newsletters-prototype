import { Box, Container, Typography, Divider, Link, Paper } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Link as RouterLink } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import LinkOffIcon from '@mui/icons-material/LinkOff'

// Indicator component for semantic labels (per DS guidelines - use Indicator instead of colored Chips)
const Indicator = styled(Box)(({ theme, color = 'default' }) => {
  const colorMap = {
    primary: {
      border: theme.palette.primary.main,
      background: theme.palette.primary.light + '20',
      text: theme.palette.primary.main,
    },
    secondary: {
      border: theme.palette.grey[400],
      background: theme.palette.grey[100],
      text: theme.palette.text.secondary,
    },
    default: {
      border: theme.palette.grey[400],
      background: theme.palette.grey[100],
      text: theme.palette.text.primary,
    },
  }
  const colors = colorMap[color] || colorMap.default
  return {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '2px 8px',
    borderRadius: '4px',
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.background,
    color: colors.text,
    fontWeight: 600,
    fontSize: '11px',
    lineHeight: '16px',
  }
})

// Placeholder URLs - replace with actual Figma links when available
const FIGMA_LINKS = {
  coreComponents: null, // TODO: Add Figma link
  icons: null, // TODO: Add Figma link
  patterns: null, // TODO: Add Figma link
}

// Reusable link component that handles placeholders gracefully
const FigmaLink = ({ url, label = 'Open in Figma' }) => {
  const isPlaceholder = !url || url === '#'

  if (isPlaceholder) {
    return (
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.5,
          color: 'text.disabled',
          fontSize: '0.875rem',
          fontStyle: 'italic',
        }}
      >
        <LinkOffIcon sx={{ fontSize: 14 }} />
        {label}
        <Typography variant="caption" sx={{ ml: 0.5 }}>
          (link pending)
        </Typography>
      </Box>
    )
  }

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        color: 'primary.main',
        textDecoration: 'none',
        fontSize: '0.875rem',
        '&:hover': { textDecoration: 'underline' },
      }}
    >
      {label}
      <OpenInNewIcon sx={{ fontSize: 14 }} />
    </Link>
  )
}

function DesigningKitsPage() {
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
          Design Kits
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, lineHeight: 1.6 }}>
          Access Figma libraries, UI kits, and other resources to accelerate your design work.
        </Typography>
      </Box>

      {/* Figma Libraries */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Figma Libraries
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
          Our primary design resources live in Figma as shared libraries. Enable them to access all components and styles.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Core Components
              </Typography>
              <Indicator color="primary">Primary</Indicator>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              All production components: buttons, inputs, navigation, feedback, and more.
            </Typography>
            <FigmaLink url={FIGMA_LINKS.coreComponents} />
          </Paper>

          <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Icons
              </Typography>
              <Indicator color="primary">Primary</Indicator>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Material icons library with consistent styling and sizing.
            </Typography>
            <FigmaLink url={FIGMA_LINKS.icons} />
          </Paper>

          <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Patterns & Templates
              </Typography>
              <Indicator color="secondary">Secondary</Indicator>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Common UI patterns, page layouts, and starter templates.
            </Typography>
            <FigmaLink url={FIGMA_LINKS.patterns} />
          </Paper>
        </Box>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* Color palettes */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Color Resources
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
          Color palettes and accessibility-tested combinations.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Semantic Colors
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Primary, secondary, success, warning, error, and info palettes with light/dark variants.
            </Typography>
            <Link
              component={RouterLink}
              to="/ds-collection/palette"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                color: 'primary.main',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              View Palette
              <ArrowForwardIcon sx={{ fontSize: 14 }} />
            </Link>
          </Paper>

          <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Accessible Palettes
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Color combinations tested for protanopia, deuteranopia, and tritanopia.
            </Typography>
            <Link
              component={RouterLink}
              to="/guidelines/accessibility"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                color: 'primary.main',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              View Guidelines
              <ArrowForwardIcon sx={{ fontSize: 14 }} />
            </Link>
          </Paper>
        </Box>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* Typography */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Typography
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
          Font files and type scale references.
        </Typography>

        <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            Type Scale
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Complete typography scale with heading, body, and caption styles.
          </Typography>
          <Link
            component={RouterLink}
            to="/ds-collection/typography"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              color: 'primary.main',
              textDecoration: 'none',
              fontSize: '0.875rem',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            View Typography
            <ArrowForwardIcon sx={{ fontSize: 14 }} />
          </Link>
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
          justifyContent: 'space-between',
        }}
      >
        <Link
          component={RouterLink}
          to="/designing/get-started"
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
          Get Started
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
          Principles
          <ArrowForwardIcon sx={{ fontSize: 16 }} />
        </Link>
      </Box>
    </Container>
  )
}

export default DesigningKitsPage

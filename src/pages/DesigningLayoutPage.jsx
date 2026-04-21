import { Box, Container, Typography, Divider, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

/**
 * Layout Foundations Page
 *
 * Inspired by Primer's layout documentation:
 * - Viewport ranges (narrow, regular, wide)
 * - Breakpoints table
 * - Page type examples
 * - Spacing and padding framework
 * - Accessibility considerations (min dimensions)
 */

// Viewport ranges - high-level abstraction for responsive design
const viewportRanges = [
  {
    name: 'narrow',
    width: '<768px',
    columns: '1',
    description: 'Mobile-first single column layout. Stack all content vertically.',
    useCase: 'Phones, small tablets in portrait',
  },
  {
    name: 'regular',
    width: '768px – 1399px',
    columns: '1–2',
    description: 'Desktop starting point. Side-by-side layouts become viable.',
    useCase: 'Tablets, laptops, smaller monitors',
  },
  {
    name: 'wide',
    width: '≥1400px',
    columns: '1–3',
    description: 'Optional third column for dense interfaces. Use sparingly.',
    useCase: 'Large monitors, data-heavy dashboards',
  },
]

// Breakpoints - fine-tuning values
const breakpoints = [
  { name: 'xs', value: '0px', description: 'Extra small devices (portrait phones)' },
  { name: 'sm', value: '600px', description: 'Small devices (landscape phones, small tablets)' },
  { name: 'md', value: '900px', description: 'Medium devices (tablets)' },
  { name: 'lg', value: '1200px', description: 'Large devices (laptops, desktops)' },
  { name: 'xl', value: '1536px', description: 'Extra large devices (large desktops)' },
]

// Page types
const pageTypes = [
  {
    name: 'Full Page',
    maxWidth: '1280px (xl)',
    description: 'Centered content with generous margins. Most common layout.',
    use: 'Landing pages, dashboards, list views',
  },
  {
    name: 'Split Page',
    maxWidth: 'None',
    description: 'Two-column layout with independent scrolling regions.',
    use: 'Detail views, master-detail patterns, chat interfaces',
  },
  {
    name: 'Narrow/Focus',
    maxWidth: '600px (sm)',
    description: 'Centered, constrained width for focused tasks.',
    use: 'Forms, wizards, onboarding flows, error pages',
  },
]

function DesigningLayoutPage() {
  return (
    <Container maxWidth={false} sx={{ maxWidth: 900, mx: 'auto', px: 3, pt: 6, pb: 8 }}>
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
          Layout
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, lineHeight: 1.6 }}>
          Guidelines for creating consistent, accessible, and responsive layouts. These principles ensure users can focus on content without visual clutter.
        </Typography>
      </Box>

      {/* Core Principles */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Core Principles
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
              Visual Processing
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              Humans process visual information by breaking down shapes and colors into patterns. Good layouts guide the eye through deliberate organizational structure, using whitespace and hierarchy to direct attention.
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
              User-Centered Focus
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              Pages should enable people to focus on content, not fight the interface. Reduce cognitive load through clean, uncluttered designs that respect attention spans and minimize distractions.
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
              Mental Model Alignment
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              Leverage familiar patterns. Users bring expectations from other applications. Designs should be rationally understood through consistency within and outside our product ecosystem.
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* Viewport Ranges */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Viewport Ranges
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
          High-level abstractions for responsive design. Use these ranges to think about layout strategy rather than specific pixel values.
        </Typography>

        <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableCell sx={{ fontWeight: 600 }}>Range</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Width</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Columns</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {viewportRanges.map((range) => (
                <TableRow key={range.name}>
                  <TableCell>
                    <Chip
                      label={range.name}
                      size="small"
                      sx={{
                        fontFamily: 'monospace',
                        backgroundColor: range.name === 'regular' ? 'primary.50' : 'grey.100',
                        color: range.name === 'regular' ? 'primary.main' : 'text.primary',
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>{range.width}</TableCell>
                  <TableCell>{range.columns}</TableCell>
                  <TableCell>
                    <Typography variant="body2">{range.description}</Typography>
                    <Typography variant="caption" color="text.disabled">{range.useCase}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* Breakpoints */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Breakpoints
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
          Fine-tuning values for specific responsive adjustments. Think of these as ruler units for precise control, not opinionated layout decisions.
        </Typography>

        <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Value</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Usage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {breakpoints.map((bp) => (
                <TableRow key={bp.name}>
                  <TableCell>
                    <Typography sx={{ fontFamily: 'monospace', fontWeight: 500 }}>{bp.name}</Typography>
                  </TableCell>
                  <TableCell sx={{ fontFamily: 'monospace' }}>{bp.value}</TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">{bp.description}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
          These align with MUI's default breakpoints. Use <code>theme.breakpoints.up('md')</code> in styled components.
        </Typography>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* Page Types */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Page Types
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
          Common layout patterns for different content types. Choose based on the user's task and information density.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {pageTypes.map((type) => (
            <Paper key={type.name} variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {type.name}
                </Typography>
                <Chip
                  label={`max-width: ${type.maxWidth}`}
                  size="small"
                  variant="outlined"
                  sx={{ fontFamily: 'monospace', fontSize: '0.7rem' }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {type.description}
              </Typography>
              <Typography variant="caption" color="text.disabled">
                Best for: {type.use}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* Accessibility Requirements */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Accessibility Requirements
        </Typography>

        <Paper
          sx={{
            p: 3,
            backgroundColor: 'warning.50',
            border: '1px solid',
            borderColor: 'warning.200',
            borderRadius: 2,
            mb: 3,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Minimum Viewport Support
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
            <strong>Width:</strong> 320px minimum<br />
            <strong>Height:</strong> 256px minimum<br /><br />
            These minimums support users who zoom up to 400% on 1280px screens (WCAG 1.4.10). Content should remain functional without horizontal scrolling at 320px width.
          </Typography>
        </Paper>

        <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Touch Target Sizing
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            <strong>AA Standard (minimum):</strong> 24×24px<br />
            <strong>AAA Standard (recommended):</strong> 44×44px<br /><br />
            Interactive elements should meet at least AA requirements. For mobile-heavy interfaces, aim for AAA.
          </Typography>
        </Paper>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* Spacing Framework */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Spacing Framework
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
          Content padding adjusts based on viewport size to maintain comfortable reading and touch targets.
        </Typography>

        <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableCell sx={{ fontWeight: 600 }}>Viewport</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Page Padding</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Section Gap</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>narrow (&lt;768px)</TableCell>
                <TableCell sx={{ fontFamily: 'monospace' }}>16px</TableCell>
                <TableCell sx={{ fontFamily: 'monospace' }}>24px</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>regular (768px–1399px)</TableCell>
                <TableCell sx={{ fontFamily: 'monospace' }}>24px</TableCell>
                <TableCell sx={{ fontFamily: 'monospace' }}>32px</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>wide (≥1400px)</TableCell>
                <TableCell sx={{ fontFamily: 'monospace' }}>32px</TableCell>
                <TableCell sx={{ fontFamily: 'monospace' }}>40px</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Related Resources */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Related Resources
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Link
            component={RouterLink}
            to="/ds-collection/spacing"
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
            Spacing Tokens
            <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Link>
          <Link
            component={RouterLink}
            to="/ds-collection/breakpoints"
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
            Breakpoints Reference
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
          justifyContent: 'flex-start',
        }}
      >
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
          <ArrowBackIcon sx={{ fontSize: 16 }} />
          Principles
        </Link>
      </Box>
    </Container>
  )
}

export default DesigningLayoutPage

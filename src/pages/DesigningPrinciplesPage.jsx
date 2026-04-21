import { Box, Container, Typography, Divider, Link, Paper } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

function DesigningPrinciplesPage() {
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
          Design Principles
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, lineHeight: 1.6 }}>
          The foundational beliefs that guide how we approach design decisions.
        </Typography>
      </Box>

      {/* Principle 1 */}
      <Box sx={{ mb: 6 }}>
        <Paper variant="outlined" sx={{ p: 4, borderRadius: 2, borderLeft: '4px solid', borderLeftColor: 'primary.main' }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Clarity Over Cleverness
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
            The best interfaces are invisible. Users shouldn't have to think about how to use them—the path forward should be obvious. Choose clear labels over clever ones. Show, don't tell. Remove friction wherever possible.
          </Typography>
        </Paper>
      </Box>

      {/* Principle 2 */}
      <Box sx={{ mb: 6 }}>
        <Paper variant="outlined" sx={{ p: 4, borderRadius: 2, borderLeft: '4px solid', borderLeftColor: 'primary.main' }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Consistency Builds Trust
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
            When interfaces behave predictably, users feel confident. Similar actions should look similar. Patterns learned in one place should apply everywhere. Consistency reduces cognitive load and builds muscle memory.
          </Typography>
        </Paper>
      </Box>

      {/* Principle 3 */}
      <Box sx={{ mb: 6 }}>
        <Paper variant="outlined" sx={{ p: 4, borderRadius: 2, borderLeft: '4px solid', borderLeftColor: 'primary.main' }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Accessible by Default
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
            Accessibility isn't an afterthought—it's a baseline. Every design should work for everyone, regardless of ability. This means proper contrast ratios, keyboard navigation, screen reader support, and motion sensitivity considerations.
          </Typography>
        </Paper>
      </Box>

      {/* Principle 4 */}
      <Box sx={{ mb: 6 }}>
        <Paper variant="outlined" sx={{ p: 4, borderRadius: 2, borderLeft: '4px solid', borderLeftColor: 'primary.main' }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Content First
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
            Design serves content, not the other way around. Start with real content, not lorem ipsum. Understand what users need to see and do, then design the container. Decoration should never compete with information.
          </Typography>
        </Paper>
      </Box>

      {/* Principle 5 */}
      <Box sx={{ mb: 6 }}>
        <Paper variant="outlined" sx={{ p: 4, borderRadius: 2, borderLeft: '4px solid', borderLeftColor: 'primary.main' }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Progressive Disclosure
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
            Show what's needed, when it's needed. Don't overwhelm users with every option upfront. Start simple, reveal complexity progressively. Advanced features should be available but not intrusive.
          </Typography>
        </Paper>
      </Box>

      {/* Principle 6 */}
      <Box sx={{ mb: 6 }}>
        <Paper variant="outlined" sx={{ p: 4, borderRadius: 2, borderLeft: '4px solid', borderLeftColor: 'primary.main' }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Feedback Everywhere
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
            Users should always know what's happening. Every action needs feedback—whether it's a button state change, a loading indicator, or a success message. Silence creates uncertainty.
          </Typography>
        </Paper>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* Applying principles */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Applying These Principles
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
          Principles are guides, not rules. When making design decisions, use them to evaluate tradeoffs:
        </Typography>

        <Box component="ul" sx={{ m: 0, pl: 2.5, color: 'text.secondary' }}>
          <Typography component="li" variant="body1" sx={{ mb: 1.5 }}>
            Does this design make the user's task clearer or more confusing?
          </Typography>
          <Typography component="li" variant="body1" sx={{ mb: 1.5 }}>
            Is this pattern consistent with how we've solved similar problems?
          </Typography>
          <Typography component="li" variant="body1" sx={{ mb: 1.5 }}>
            Can someone with a disability use this effectively?
          </Typography>
          <Typography component="li" variant="body1" sx={{ mb: 1.5 }}>
            Does the design support the content or compete with it?
          </Typography>
          <Typography component="li" variant="body1">
            Will users get feedback that their action was successful?
          </Typography>
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
          <ArrowBackIcon sx={{ fontSize: 16 }} />
          Design Kits
        </Link>
      </Box>
    </Container>
  )
}

export default DesigningPrinciplesPage

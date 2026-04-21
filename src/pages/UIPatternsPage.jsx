import { Box, Container, Typography, Card, CardActionArea, Chip } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import DataUsageIcon from '@mui/icons-material/DataUsage'
import InboxIcon from '@mui/icons-material/Inbox'
import EditNoteIcon from '@mui/icons-material/EditNote'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import NavigationIcon from '@mui/icons-material/Navigation'
import NotificationsIcon from '@mui/icons-material/Notifications'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'
import SaveIcon from '@mui/icons-material/Save'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import ViewDayIcon from '@mui/icons-material/ViewDay'

/**
 * UI Patterns Page - Workflow-level guidance distinct from components
 *
 * Inspired by Primer's UI Patterns section:
 * - Patterns address workflow-level problems
 * - Components are the building blocks used to implement patterns
 * - Patterns describe HOW to solve problems; components provide WHAT to use
 */

const patterns = [
  {
    title: 'Data Visualization',
    description: 'Conveying complex data in an engaging, understandable way through charts, graphs, and visual indicators.',
    icon: DataUsageIcon,
    path: '/patterns/data-visualization',
    status: 'planned',
    components: ['Chart', 'Progress', 'Indicator'],
  },
  {
    title: 'Empty States',
    description: 'Filling spaces when content is unavailable, guiding users on next steps.',
    icon: InboxIcon,
    path: '/patterns/empty-state',
    status: 'live',
    components: ['Typography', 'Button', 'Skeleton', 'Paper'],
  },
  {
    title: 'Form Layout',
    description: 'Organizing form fields, labels, and actions for optimal usability and accessibility.',
    icon: EditNoteIcon,
    path: '/patterns/form-layout',
    status: 'live',
    components: ['TextField', 'Select', 'Grid', 'Stack', 'Button'],
  },
  {
    title: 'Page Header',
    description: 'Consistent page headers combining title, breadcrumbs, actions, and tabs.',
    icon: ViewDayIcon,
    path: '/patterns/page-header',
    status: 'live',
    components: ['Breadcrumbs', 'Typography', 'Button', 'Tabs', 'Chip'],
  },
  {
    title: 'Loading',
    description: 'Keeping users informed during waits with appropriate feedback for different durations.',
    icon: HourglassEmptyIcon,
    path: '/patterns/loading',
    status: 'planned',
    components: ['Progress', 'Skeleton', 'Spinner'],
  },
  {
    title: 'Navigation',
    description: 'Helping users understand their location and find their way through the product.',
    icon: NavigationIcon,
    path: '/patterns/navigation',
    status: 'planned',
    components: ['Tabs', 'Breadcrumbs', 'Sidebar', 'Link'],
  },
  {
    title: 'Notifications',
    description: 'Delivering important information at the right time without overwhelming users.',
    icon: NotificationsIcon,
    path: '/patterns/notifications',
    status: 'planned',
    components: ['Alert', 'Snackbar', 'Badge', 'Dialog'],
  },
  {
    title: 'Progressive Disclosure',
    description: 'Strategically revealing information to reduce cognitive load and guide focus.',
    icon: UnfoldMoreIcon,
    path: '/patterns/progressive-disclosure',
    status: 'planned',
    components: ['Accordion', 'Stepper', 'Tooltip', 'Drawer'],
  },
  {
    title: 'Saving',
    description: 'Accurately representing content updates with feedback on save states and conflicts.',
    icon: SaveIcon,
    path: '/patterns/saving',
    status: 'planned',
    components: ['Button', 'Snackbar', 'Dialog'],
  },
  {
    title: 'Feature Onboarding',
    description: 'Introducing new features with contextual guidance that doesn\'t interrupt workflow.',
    icon: TipsAndUpdatesIcon,
    path: '/patterns/onboarding',
    status: 'planned',
    components: ['Tooltip', 'Dialog', 'Stepper'],
  },
  {
    title: 'Error Handling',
    description: 'Gracefully handling errors with clear messaging and recovery paths.',
    icon: ErrorOutlineIcon,
    path: '/patterns/error-handling',
    status: 'planned',
    components: ['Alert', 'Dialog', 'TextField'],
  },
]

function UIPatternsPage() {
  return (
    <Container maxWidth={false} sx={{ maxWidth: 1200, mx: 'auto', px: 3, pt: 8, pb: 4 }}>
      {/* Hero */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: 600, mb: 2 }}>
          UI Patterns
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, maxWidth: 720, lineHeight: 1.6 }}>
          Workflow-level guidance for solving common user problems. Patterns describe <em>how</em> to approach a problem; components provide the building blocks to implement the solution.
        </Typography>
      </Box>

      {/* Patterns vs Components explanation */}
      <Box
        sx={{
          mb: 6,
          p: 3,
          backgroundColor: 'primary.50',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'primary.100',
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          Patterns vs. Components
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
          <strong>Components</strong> are reusable, interactive building blocks (Button, TextField, Dialog).
          <br />
          <strong>Patterns</strong> are recipes that combine components to solve specific user problems (Forms, Loading, Error Handling).
          <br /><br />
          For example, the <em>Forms</em> pattern uses Button, TextField, Select, and FormControl components to create accessible, user-friendly data input experiences.
        </Typography>
      </Box>

      {/* Pattern Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
        {patterns.map((pattern) => {
          const IconComponent = pattern.icon
          const isPlanned = pattern.status === 'planned'

          return (
            <Card
              key={pattern.path}
              variant="outlined"
              sx={{
                borderRadius: 2,
                opacity: isPlanned ? 0.7 : 1,
                transition: 'all 0.2s',
                '&:hover': isPlanned
                  ? {}
                  : {
                      borderColor: 'primary.main',
                      boxShadow: 1,
                    },
              }}
            >
              <CardActionArea
                component={isPlanned ? 'div' : RouterLink}
                to={isPlanned ? undefined : pattern.path}
                disabled={isPlanned}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  p: 3,
                  height: '100%',
                  cursor: isPlanned ? 'default' : 'pointer',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5, width: '100%' }}>
                  <IconComponent sx={{ color: isPlanned ? 'text.disabled' : 'primary.main', fontSize: 24 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                    {pattern.title}
                  </Typography>
                  {isPlanned ? (
                    <Chip label="Planned" size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />
                  ) : (
                    <ArrowForwardIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                  )}
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {pattern.description}
                </Typography>

                {/* Related Components */}
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 'auto' }}>
                  <Typography variant="caption" color="text.disabled" sx={{ mr: 0.5 }}>
                    Uses:
                  </Typography>
                  {pattern.components.map((comp) => (
                    <Chip
                      key={comp}
                      label={comp}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: '0.65rem',
                        backgroundColor: 'grey.100',
                        color: 'text.secondary',
                      }}
                    />
                  ))}
                </Box>
              </CardActionArea>
            </Card>
          )
        })}
      </Box>

      {/* Footer guidance */}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Contributing New Patterns
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 720 }}>
          Patterns emerge from real product needs. If you've solved a problem that others might face, consider documenting it as a pattern. Good patterns are:
        </Typography>

        <Box sx={{ pl: 3 }}>
          <Typography variant="body1" component="ul" sx={{ lineHeight: 2, color: 'text.secondary' }}>
            <li><strong>Reusable</strong> — Solves a problem that appears across multiple contexts</li>
            <li><strong>Composable</strong> — Built from existing components, not custom one-offs</li>
            <li><strong>Accessible</strong> — Meets WCAG 2.1 AA standards by default</li>
            <li><strong>Documented</strong> — Includes do/don't examples and edge cases</li>
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default UIPatternsPage

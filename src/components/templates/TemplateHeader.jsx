/**
 * TemplateHeader
 *
 * Consistent header pattern for template pages with back navigation,
 * title, optional subtitle, and action buttons.
 *
 * Uses existing DS primitives: Box, Container, Typography, Button, Divider
 */

import { Box, Container, Typography, Button, Divider } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded'

/**
 * @param {string} title - Page title
 * @param {string} [subtitle] - Optional subtitle/description
 * @param {string} [backTo="/templates"] - Back link destination
 * @param {string} [backLabel="Back to Templates"] - Back button label
 * @param {React.ReactNode} [actions] - Action buttons to render on the right
 * @param {boolean} [contained=true] - Wrap content in Container maxWidth="xl"
 */
export default function TemplateHeader({
  title,
  subtitle,
  backTo = '/templates',
  backLabel = 'Back to Templates',
  actions,
  contained = true,
}) {
  const content = (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          component={RouterLink}
          to={backTo}
          startIcon={<ArrowBackIcon />}
          sx={{ textTransform: 'none' }}
        >
          {backLabel}
        </Button>
        <Divider orientation="vertical" flexItem />
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
      {actions && (
        <Box sx={{ display: 'flex', gap: 1 }}>
          {actions}
        </Box>
      )}
    </Box>
  )

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        py: 2,
      }}
    >
      {contained ? (
        <Container maxWidth="xl">{content}</Container>
      ) : (
        <Box sx={{ px: 3 }}>{content}</Box>
      )}
    </Box>
  )
}

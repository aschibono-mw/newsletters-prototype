import { Box, Typography, Chip } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ScienceIcon from '@mui/icons-material/Science'

/**
 * RelatedComponentsSection - Shows links to related components
 *
 * Supports registry format (from getRelatedComponents) with optional status indicator.
 *
 * @param {Object} props
 * @param {string} props.title - Section title (default: "Related Components")
 * @param {Array} props.components - Array of component objects
 * @param {string} props.components[].name - Component display name
 * @param {string} props.components[].path - Route path to component page
 * @param {string} props.components[].status - Optional status ("beta", "stable", "deprecated")
 * @param {string} props.components[].reason - Optional reason for relation
 */
function RelatedComponentsSection({ title = 'Related Components', components = [] }) {
  if (components.length === 0) return null

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        {title}
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {components.map((component, index) => (
          <Chip
            key={index}
            icon={component.status === 'beta' ? <ScienceIcon sx={{ fontSize: 14 }} /> : undefined}
            label={component.name}
            component={RouterLink}
            to={component.path}
            clickable
            variant="outlined"
            color={component.status === 'beta' ? 'warning' : 'default'}
            sx={{
              borderRadius: 1,
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'primary.50',
              },
            }}
          />
        ))}
      </Box>

      {/* Optional: Show with reasons */}
      {components.some((c) => c.reason) && (
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
          {components
            .filter((c) => c.reason)
            .map((component, index) => (
              <Typography key={index} variant="caption" color="text.secondary">
                <strong>{component.name}:</strong> {component.reason}
              </Typography>
            ))}
        </Box>
      )}
    </Box>
  )
}

export default RelatedComponentsSection

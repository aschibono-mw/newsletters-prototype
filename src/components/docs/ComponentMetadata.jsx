import { Box, Typography, Chip, Tooltip } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ScienceIcon from '@mui/icons-material/Science'
import ArchiveIcon from '@mui/icons-material/Archive'
import UpdateIcon from '@mui/icons-material/Update'

/**
 * ComponentMetadata - Displays status, last updated, and implementation availability
 *
 * Inspired by Primer's component documentation pattern with status lifecycle
 * and implementation indicators (React, Figma, Storybook).
 *
 * Status Lifecycle:
 * - Beta: New component, API may change, gathering feedback
 * - Stable: Production-ready, API is stable
 * - Deprecated: Being phased out, use alternative
 *
 * @param {Object} props
 * @param {string} props.status - "beta" | "stable" | "deprecated"
 * @param {string} props.lastUpdated - Date string (e.g., "Jan 2025")
 * @param {Object} props.availability - { react: bool, figma: bool|string, storybook: bool|string }
 * @param {string} props.version - Optional version number
 */

const STATUS_CONFIG = {
  beta: {
    label: 'Beta',
    color: 'warning',
    icon: ScienceIcon,
    tooltip: 'New component — API may change based on feedback',
  },
  stable: {
    label: 'Stable',
    color: 'success',
    icon: CheckCircleIcon,
    tooltip: 'Production-ready — API is stable',
  },
  deprecated: {
    label: 'Deprecated',
    color: 'default',
    icon: ArchiveIcon,
    tooltip: 'Being phased out — see documentation for alternatives',
  },
}

const AVAILABILITY_CONFIG = {
  react: { label: 'React', color: 'info' },
  figma: { label: 'Figma', color: 'secondary' },
  storybook: { label: 'Storybook', color: 'warning' },
}

function ComponentMetadata({
  status = 'stable',
  lastUpdated,
  availability = { react: true, figma: false, storybook: false },
  version,
}) {
  const statusConfig = STATUS_CONFIG[status] || STATUS_CONFIG.stable
  const StatusIcon = statusConfig.icon

  // Determine which implementations are available
  const availableItems = Object.entries(availability)
    .filter(([, value]) => value)
    .map(([key, value]) => ({
      ...AVAILABILITY_CONFIG[key],
      url: typeof value === 'string' ? value : null,
    }))

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 1.5,
        mb: 3,
        pb: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      {/* Status Badge */}
      <Tooltip title={statusConfig.tooltip} arrow>
        <Chip
          icon={<StatusIcon sx={{ fontSize: 16 }} />}
          label={statusConfig.label}
          color={statusConfig.color}
          size="small"
          sx={{ fontWeight: 500 }}
        />
      </Tooltip>

      {/* Version */}
      {version && (
        <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
          v{version}
        </Typography>
      )}

      {/* Divider */}
      {(lastUpdated || availableItems.length > 0) && (
        <Box sx={{ width: '1px', height: 16, backgroundColor: 'divider' }} />
      )}

      {/* Last Updated */}
      {lastUpdated && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <UpdateIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
          <Typography variant="caption" color="text.secondary">
            Updated {lastUpdated}
          </Typography>
        </Box>
      )}

      {/* Implementation Availability */}
      {availableItems.length > 0 && (
        <>
          <Box sx={{ width: '1px', height: 16, backgroundColor: 'divider' }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="caption" color="text.secondary" sx={{ mr: 0.5 }}>
              Available in:
            </Typography>
            {availableItems.map((item, index) => (
              item.url ? (
                <Chip
                  key={index}
                  label={item.label}
                  size="small"
                  color={item.color}
                  variant="outlined"
                  component="a"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  clickable
                  sx={{ height: 22, fontSize: '0.7rem' }}
                />
              ) : (
                <Chip
                  key={index}
                  label={item.label}
                  size="small"
                  color={item.color}
                  variant="outlined"
                  sx={{ height: 22, fontSize: '0.7rem' }}
                />
              )
            ))}
          </Box>
        </>
      )}
    </Box>
  )
}

export default ComponentMetadata

import { Box, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

/**
 * MiraActivityLogToggle - "View activity (N)" toggle bar
 *
 * @param {boolean} [expanded=false] - Whether activity log is expanded
 * @param {number} [count=0] - Number of activity messages
 * @param {function} onToggle - Toggle handler
 * @param {object} [sx] - Additional MUI sx styles
 */
function MiraActivityLogToggle({ expanded = false, count = 0, onToggle, sx }) {
  return (
    <Box
      onClick={onToggle}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.5,
        py: 0.75,
        borderTop: '1px solid',
        borderColor: 'divider',
        cursor: 'pointer',
        backgroundColor: expanded ? 'grey.100' : 'transparent',
        '&:hover': { backgroundColor: 'grey.100' },
        ...sx,
      }}
    >
      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
        {expanded ? 'Hide activity' : `View activity (${count})`}
      </Typography>
      {expanded ? (
        <ExpandLessIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
      ) : (
        <ExpandMoreIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
      )}
    </Box>
  )
}

export default MiraActivityLogToggle

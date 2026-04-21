import { Box, Typography } from '@mui/material'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import MiraThinkingState from '../MiraThinkingState'

/**
 * MiraProgressHeader - Icon + status label + thinking dots
 *
 * @param {boolean} [isComplete=false] - Whether processing is complete
 * @param {boolean} [isProcessing=false] - Whether actively processing (shows thinking dots)
 * @param {string} [statusLabel="Processing..."] - Current status label
 * @param {string} [currentActivity] - Current activity description shown below status
 * @param {object} [sx] - Additional MUI sx styles
 */
function MiraProgressHeader({
  isComplete = false,
  isProcessing = false,
  statusLabel = 'Processing...',
  currentActivity,
  sx,
}) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1, ...sx }}>
      {!isComplete ? (
        <MenuBookOutlinedIcon sx={{ fontSize: 20, color: 'primary.main' }} />
      ) : (
        <CheckCircleOutlineIcon sx={{ fontSize: 20, color: 'success.main' }} />
      )}
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
          {isComplete ? 'Analysis complete' : statusLabel}
          {isProcessing && <MiraThinkingState sx={{ ml: 1 }} />}
        </Typography>
        {currentActivity && !isComplete && (
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.25 }}>
            {currentActivity}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default MiraProgressHeader

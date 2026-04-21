import { LinearProgress } from '@mui/material'

/**
 * MiraProgressBar - Styled LinearProgress with Mira colors
 *
 * @param {number} [progress=0] - Progress percentage (0-100)
 * @param {boolean} [isComplete=false] - Whether processing is complete (uses success color)
 * @param {object} [sx] - Additional MUI sx styles
 */
function MiraProgressBar({ progress = 0, isComplete = false, sx }) {
  return (
    <LinearProgress
      variant="determinate"
      value={isComplete ? 100 : progress}
      sx={{
        height: 6,
        borderRadius: 3,
        backgroundColor: 'grey.200',
        '& .MuiLinearProgress-bar': {
          borderRadius: 3,
          backgroundColor: isComplete ? 'success.main' : 'primary.main',
        },
        ...sx,
      }}
    />
  )
}

export default MiraProgressBar

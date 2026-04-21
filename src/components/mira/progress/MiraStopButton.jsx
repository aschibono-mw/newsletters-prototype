import { IconButton } from '@mui/material'
import StopIcon from '@mui/icons-material/Stop'

/**
 * MiraStopButton - Circular stop button
 *
 * @param {function} onClick - Click handler
 * @param {boolean} [disabled=false] - Whether button is disabled
 * @param {object} [sx] - Additional MUI sx styles
 */
function MiraStopButton({ onClick, disabled = false, sx }) {
  return (
    <IconButton
      size="small"
      onClick={onClick}
      disabled={disabled}
      sx={{
        width: 28,
        height: 28,
        backgroundColor: 'grey.200',
        '&:hover': { backgroundColor: 'grey.300' },
        '&.Mui-disabled': {
          backgroundColor: 'grey.100',
        },
        ...sx,
      }}
    >
      <StopIcon sx={{ fontSize: 16 }} />
    </IconButton>
  )
}

export default MiraStopButton

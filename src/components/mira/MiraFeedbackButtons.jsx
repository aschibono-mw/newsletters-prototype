import { forwardRef } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'

/**
 * MiraFeedbackButtons - Thumbs up/down buttons for rating AI responses
 *
 * Simple gray icon buttons for AI message quality rating.
 * Returns two adjacent IconButtons (no wrapper).
 *
 * @param {object} props
 * @param {'up' | 'down' | null} props.value - Current selection (null = none)
 * @param {function} props.onChange - Callback with new value
 * @param {'small' | 'medium'} props.size - Button size (default: 'small')
 * @param {boolean} props.disabled - Disabled state
 */
const MiraFeedbackButtons = forwardRef(function MiraFeedbackButtons(
  { value = null, onChange, size = 'small', disabled = false },
  ref
) {
  const handleClick = (newValue) => {
    if (disabled) return
    onChange?.(value === newValue ? null : newValue)
  }

  const iconSize = size === 'small' ? 16 : 20

  const buttonSx = {
    color: 'text.secondary',
    opacity: disabled ? 0.5 : 1,
    '&:hover': {
      backgroundColor: 'grey.100',
    },
  }

  return (
    <>
      <Tooltip title={value === 'up' ? 'Remove feedback' : 'Good response'} arrow>
        <IconButton
          ref={ref}
          onClick={() => handleClick('up')}
          disabled={disabled}
          size="small"
          sx={buttonSx}
        >
          {value === 'up' ? (
            <ThumbUpIcon sx={{ fontSize: iconSize }} />
          ) : (
            <ThumbUpOutlinedIcon sx={{ fontSize: iconSize }} />
          )}
        </IconButton>
      </Tooltip>
      <Tooltip title={value === 'down' ? 'Remove feedback' : 'Poor response'} arrow>
        <IconButton
          onClick={() => handleClick('down')}
          disabled={disabled}
          size="small"
          sx={buttonSx}
        >
          {value === 'down' ? (
            <ThumbDownIcon sx={{ fontSize: iconSize }} />
          ) : (
            <ThumbDownOutlinedIcon sx={{ fontSize: iconSize }} />
          )}
        </IconButton>
      </Tooltip>
    </>
  )
})

export default MiraFeedbackButtons

import { forwardRef } from 'react'
import { Box, Typography, ButtonBase } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { getMiraGradientBorderSx } from '../../constants/miraStyles'

/**
 * MiraSuggestionChip - Clickable suggestion pills for prompts
 *
 * Pill-shaped chip for "Try asking..." suggestions in chat interfaces.
 * Light background with subtle gradient border on hover.
 *
 * @param {object} props
 * @param {string} props.label - Suggestion text (required)
 * @param {function} props.onClick - Click handler (required)
 * @param {React.ReactNode} props.icon - Optional leading icon
 * @param {boolean} props.disabled - Disabled state
 * @param {object} props.sx - Additional MUI sx styles
 */
const MiraSuggestionChip = forwardRef(function MiraSuggestionChip(
  { label, onClick, icon, disabled = false, sx = {}, ...rest },
  ref
) {
  return (
    <ButtonBase
      ref={ref}
      onClick={onClick}
      disabled={disabled}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        px: 2,
        py: 1,
        borderRadius: 50,
        backgroundColor: 'grey.50',
        border: '1px solid',
        borderColor: 'grey.300',
        fontFamily: 'inherit',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.15s ease',
        '&:hover:not(:disabled)': {
          backgroundColor: 'rgba(182, 39, 161, 0.04)',
          borderColor: 'transparent',
          ...getMiraGradientBorderSx(1),
        },
        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: 'primary.main',
          outlineOffset: 2,
        },
        ...sx,
      }}
      {...rest}
    >
      {icon && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'text.secondary',
            '& > svg': {
              fontSize: 16,
            },
          }}
        >
          {icon}
        </Box>
      )}
      <Typography
        component="span"
        sx={{
          fontSize: '0.875rem',
          fontWeight: 500,
          color: 'text.primary',
          lineHeight: 1.4,
        }}
      >
        {label}
      </Typography>
      <ArrowForwardIcon
        sx={{
          fontSize: 14,
          color: 'text.secondary',
          ml: 0.5,
        }}
      />
    </ButtonBase>
  )
})

export default MiraSuggestionChip

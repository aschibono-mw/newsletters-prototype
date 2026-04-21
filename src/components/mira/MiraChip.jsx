import { forwardRef } from 'react'
import { Box, Typography } from '@mui/material'
import { MIRA_GRADIENT_TEXT_SX, getMiraGradientBorderSx } from '../../constants/miraStyles'

/**
 * MiraChip - Chip component with gradient border and gradient text
 *
 * Text-only chip for Mira AI branding. No icons - use MiraButton for icon+text combinations.
 *
 * @param {object} props
 * @param {string} props.label - Chip text (required)
 * @param {'small' | 'medium'} props.size - Chip size (default: 'medium')
 * @param {function} props.onClick - Click handler (optional)
 * @param {object} props.sx - Additional MUI sx styles
 */
const MiraChip = forwardRef(function MiraChip(
  { label, size = 'medium', onClick, sx = {}, ...rest },
  ref
) {
  // Size configurations
  const sizeStyles = {
    small: {
      px: 1.5,
      py: 0.5,
      fontSize: '0.75rem',
    },
    medium: {
      px: 2,
      py: 0.75,
      fontSize: '0.8125rem',
    },
  }

  const config = sizeStyles[size]

  return (
    <Box
      ref={ref}
      component={onClick ? 'button' : 'span'}
      onClick={onClick}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        px: config.px,
        py: config.py,
        borderRadius: 50,
        backgroundColor: 'white',
        border: 'none',
        cursor: onClick ? 'pointer' : 'default',
        fontFamily: 'inherit',
        ...getMiraGradientBorderSx(1),
        ...(onClick && {
          transition: 'background-color 0.15s ease',
          '&:hover': {
            backgroundColor: 'rgba(182, 39, 161, 0.04)',
          },
        }),
        ...sx,
      }}
      {...rest}
    >
      <Typography
        component="span"
        sx={{
          fontSize: config.fontSize,
          fontWeight: 600,
          lineHeight: 1.4,
          ...MIRA_GRADIENT_TEXT_SX,
        }}
      >
        {label}
      </Typography>
    </Box>
  )
})

export default MiraChip

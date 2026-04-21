import { forwardRef } from 'react'
import { Box, Avatar } from '@mui/material'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import { MIRA_GRADIENTS } from '../../constants/miraStyles'

/**
 * MiraAvatar - AI assistant avatar with gradient ring/border accent
 *
 * Circular avatar with subtle 1px pink-to-cyan gradient border for Mira AI branding.
 * Shows Mira sparkle icon as default, or custom image when src is provided.
 *
 * @param {object} props
 * @param {'small' | 'medium' | 'large'} props.size - Avatar size (default: 'medium')
 * @param {'gradient' | 'solid'} props.variant - Border style (default: 'gradient')
 * @param {string} props.src - Image source (optional, shows Mira icon if not provided)
 * @param {string} props.alt - Alt text for image
 * @param {object} props.sx - Additional MUI sx styles
 */
const MiraAvatar = forwardRef(function MiraAvatar(
  { size = 'medium', variant = 'gradient', src, alt = 'Mira AI', sx = {}, ...rest },
  ref
) {
  // Size configurations - 1px border for all sizes
  const sizeStyles = {
    small: {
      container: 32,
      avatar: 30,
      iconSize: 14,
    },
    medium: {
      container: 40,
      avatar: 38,
      iconSize: 18,
    },
    large: {
      container: 56,
      avatar: 54,
      iconSize: 24,
    },
  }

  const config = sizeStyles[size]

  // Border style based on variant
  const borderStyle = variant === 'gradient'
    ? { background: MIRA_GRADIENTS.primary }
    : { backgroundColor: 'primary.main' }

  return (
    <Box
      ref={ref}
      sx={{
        width: config.container,
        height: config.container,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        ...borderStyle,
        ...sx,
      }}
      {...rest}
    >
      <Avatar
        src={src}
        alt={alt}
        sx={{
          width: config.avatar,
          height: config.avatar,
          bgcolor: 'white',
          color: 'text.secondary',
        }}
      >
        {!src && (
          <AutoAwesomeOutlinedIcon
            sx={{
              fontSize: config.iconSize,
              color: 'text.secondary',
            }}
          />
        )}
      </Avatar>
    </Box>
  )
})

export default MiraAvatar

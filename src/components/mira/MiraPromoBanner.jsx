import { Box, Paper, Typography } from '@mui/material'
import { MIRA_BUTTON_GRADIENT } from '../../constants/miraStyles'
import MiraButton from './MiraButton'

/**
 * MiraPromoBanner - Feature announcement banner with subtle gradient
 *
 * @param {object} props
 * @param {React.ReactNode} props.icon - Icon element to display
 * @param {string} props.title - Banner title
 * @param {string} props.description - Banner description
 * @param {string} props.actionLabel - Action button label
 * @param {function} props.onAction - Action button click handler
 * @param {function} props.onDismiss - Optional dismiss handler (shows close button if provided)
 * @param {boolean} props.gradientBorder - Show pink-teal gradient border around banner
 * @param {object} props.sx - Additional MUI sx styles
 */
function MiraPromoBanner({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  onDismiss,
  gradientBorder = false,
  sx = {},
}) {
  const gradientBorderStyles = gradientBorder
    ? {
        position: 'relative',
        border: 'none',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          padding: '1px',
          borderRadius: 'inherit',
          background: MIRA_BUTTON_GRADIENT,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          pointerEvents: 'none',
        },
      }
    : {}

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: 2.5,
        position: 'relative',
        ...gradientBorderStyles,
        ...sx,
      }}
    >
      {/* Icon Box */}
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #F5E8F3 0%, #E8F3F5 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          '& .MuiSvgIcon-root': {
            color: 'secondary.main',
            fontSize: 24,
          },
        }}
      >
        {icon}
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>

      {/* Action Button */}
      {actionLabel && onAction && (
        <MiraButton variant="gradient" onClick={onAction} sx={{ flexShrink: 0 }}>
          {actionLabel}
        </MiraButton>
      )}

      {/* Dismiss Button */}
      {onDismiss && (
        <Typography
          variant="body2"
          onClick={onDismiss}
          sx={{
            color: 'text.secondary',
            cursor: 'pointer',
            flexShrink: 0,
            '&:hover': {
              color: 'text.primary',
            },
          }}
        >
          Dismiss
        </Typography>
      )}
    </Paper>
  )
}

export default MiraPromoBanner

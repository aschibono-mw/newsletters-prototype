import { Box, Paper, Typography } from '@mui/material'
import { MIRA_ICON_BOX, MIRA_GRADIENTS } from '../../constants/miraStyles'

/**
 * MiraPromptCard - Clickable card with icon, title, and description
 *
 * @param {object} props
 * @param {React.ReactNode} props.icon - Icon element to display
 * @param {string} props.title - Card title
 * @param {string} props.description - Card description (2 lines max)
 * @param {function} props.onClick - Click handler
 * @param {object} props.sx - Additional MUI sx styles
 */
function MiraPromptCard({ icon, title, description, onClick, sx = {} }) {
  return (
    <Paper
      elevation={0}
      onClick={onClick}
      sx={{
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2,
        position: 'relative',
        backgroundColor: 'grey.50',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          padding: '1px',
          borderRadius: 'inherit',
          background: MIRA_GRADIENTS.primary,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          pointerEvents: 'none',
          opacity: 0,
        },
        '&:hover': {
          backgroundColor: 'grey.100',
          '&::before': {
            opacity: 1,
          },
        },
        ...sx,
      }}
    >
      <Box sx={MIRA_ICON_BOX}>{icon}</Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {description}
        </Typography>
      </Box>
    </Paper>
  )
}

export default MiraPromptCard

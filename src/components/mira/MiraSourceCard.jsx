import { Box, Paper, Typography, Chip, Link } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { MIRA_ICON_BOX } from '../../constants/miraStyles'

/**
 * MiraSourceCard - AI citation/source display card
 *
 * @param {object} props
 * @param {string} props.title - Source title
 * @param {React.ElementType} props.icon - Icon component to display
 * @param {string} props.snippet - Source text snippet (2 lines max)
 * @param {'high' | 'medium' | 'low'} props.relevance - Relevance level
 * @param {string} props.url - Source URL
 * @param {function} props.onClick - Optional click handler
 * @param {object} props.sx - Additional MUI sx styles
 */
function MiraSourceCard({
  title,
  icon: IconComponent,
  snippet,
  relevance = 'medium',
  url,
  onClick,
  sx = {},
}) {
  const getRelevanceStyles = () => {
    switch (relevance) {
      case 'high':
        return {
          backgroundColor: 'success.lighter',
          color: 'success.dark',
        }
      case 'low':
        return {
          backgroundColor: 'grey.100',
          color: 'text.disabled',
        }
      case 'medium':
      default:
        return {
          backgroundColor: 'grey.100',
          color: 'text.secondary',
        }
    }
  }

  return (
    <Paper
      elevation={0}
      onClick={onClick}
      sx={{
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': {
          borderColor: 'primary.main',
          backgroundColor: 'action.hover',
        },
        ...sx,
      }}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        {/* Icon Box */}
        <Box sx={MIRA_ICON_BOX}>
          {IconComponent && <IconComponent sx={{ fontSize: 20, color: 'text.secondary' }} />}
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {/* Header with title and relevance */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: 1,
              mb: 0.5,
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
            <Chip
              label={relevance}
              size="small"
              sx={{
                height: 20,
                fontSize: '0.65rem',
                textTransform: 'capitalize',
                ...getRelevanceStyles(),
              }}
            />
          </Box>

          {/* Snippet */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {snippet}
          </Typography>

          {/* URL Link */}
          {url && (
            <Link
              href={url}
              underline="hover"
              onClick={(e) => e.stopPropagation()}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                fontSize: '0.75rem',
                color: 'primary.main',
              }}
            >
              {url}
              <OpenInNewIcon sx={{ fontSize: 12 }} />
            </Link>
          )}
        </Box>
      </Box>
    </Paper>
  )
}

export default MiraSourceCard

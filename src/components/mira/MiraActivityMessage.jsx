import { Box, Typography, Chip } from '@mui/material'
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import SearchIcon from '@mui/icons-material/Search'
import BuildIcon from '@mui/icons-material/Build'
import CodeIcon from '@mui/icons-material/Code'
import DescriptionIcon from '@mui/icons-material/Description'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'

const ACTIVITY_TYPE_CONFIG = {
  thinking: { Icon: PsychologyOutlinedIcon, color: 'text.secondary' },
  reading: { Icon: MenuBookOutlinedIcon, color: 'primary.main' },
  searching: { Icon: SearchIcon, color: 'info.main' },
  analyzing: { Icon: BuildIcon, color: 'warning.main' },
  generating: { Icon: CodeIcon, color: 'secondary.main' },
  canvas: { Icon: DescriptionIcon, color: 'primary.main' },
  insight: { Icon: CheckCircleOutlineIcon, color: 'success.main' },
  complete: { Icon: CheckCircleOutlineIcon, color: 'success.main' },
}

/**
 * MiraActivityMessage - Individual activity step with icon, text, and optional source badge
 *
 * @param {string} type - Activity type: thinking | reading | searching | analyzing | generating | canvas | insight | complete
 * @param {string} text - Activity description text
 * @param {string} [source] - Optional source identifier (shows as chip)
 * @param {boolean} [isLatest=false] - Whether this is the most recent activity (highlighted)
 * @param {object} [sx] - Additional MUI sx styles
 */
function MiraActivityMessage({ type = 'thinking', text, source, isLatest = false, sx }) {
  const config = ACTIVITY_TYPE_CONFIG[type] || { Icon: AutoAwesomeOutlinedIcon, color: 'text.secondary' }
  const { Icon, color } = config

  const isHighlightedType = type === 'reading' || type === 'canvas' || type === 'searching'

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        py: 0.5,
        px: 1,
        borderRadius: 1,
        backgroundColor: isLatest ? 'rgba(8, 145, 178, 0.04)' : 'transparent',
        opacity: isLatest ? 1 : 0.6,
        fontSize: '0.8rem',
        ...sx,
      }}
    >
      <Icon sx={{ fontSize: 14, color }} />
      <Typography
        variant="caption"
        sx={{ color: isHighlightedType ? 'primary.main' : 'text.secondary' }}
      >
        {text}
      </Typography>
      {source && (
        <Chip
          label={source}
          size="small"
          sx={{
            height: 18,
            fontSize: '0.65rem',
            backgroundColor: 'grey.100',
            '& .MuiChip-label': { px: 1 },
          }}
        />
      )}
    </Box>
  )
}

export default MiraActivityMessage

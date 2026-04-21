import { useState, useRef, useEffect } from 'react'
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@mui/material'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { colors as tokenColors } from '../../theme-tokens'

// Insight type labels
const INSIGHT_TYPES = {
  summary: { label: 'Summary' },
  alert: { label: 'Alert' },
  trend: { label: 'Trend' },
}

// Gradient colors from design tokens
const GRADIENT_COLORS = {
  start: tokenColors.product.pink.light,
  end: tokenColors.product.cyan.light,
}

// Fixed height for collapsed state - approximately 3 lines of body2 text + header
// body2 line-height is 20px, 3 lines = 60px + header (~24px) + padding
const COLLAPSED_HEIGHT = 88

/**
 * AI Insight box with gradient background
 * @param {'summary'|'alert'|'trend'} type - Insight type label
 * @param {string} description - Insight text
 * @param {array} actions - [{ label, icon, onClick }] custom actions
 */
function AiInsightBox({
  type = 'summary',
  description,
  actions = [],
  onFeedback,
  onRefresh,
  onCopy,
}) {
  const [menuAnchor, setMenuAnchor] = useState(null)
  const [expanded, setExpanded] = useState(false)
  const [needsExpansion, setNeedsExpansion] = useState(false)
  const textRef = useRef(null)
  const menuOpen = Boolean(menuAnchor)

  useEffect(() => {
    if (textRef.current) {
      // Check if text is actually truncated (scrollHeight > clientHeight)
      const isOverflowing = textRef.current.scrollHeight > textRef.current.clientHeight
      setNeedsExpansion(isOverflowing)
    }
  }, [description])

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget)
  }

  const handleMenuClose = () => {
    setMenuAnchor(null)
  }

  const handleAction = (action) => {
    handleMenuClose()
    action?.onClick?.()
  }

  const typeConfig = INSIGHT_TYPES[type] || INSIGHT_TYPES.summary

  const defaultActions = [
    {
      label: 'Helpful',
      icon: <ThumbUpOutlinedIcon fontSize="small" />,
      onClick: () => onFeedback?.('helpful'),
    },
    {
      label: 'Not helpful',
      icon: <ThumbDownOutlinedIcon fontSize="small" />,
      onClick: () => onFeedback?.('not_helpful'),
    },
    {
      label: 'Copy',
      icon: <ContentCopyOutlinedIcon fontSize="small" />,
      onClick: () => {
        if (onCopy) {
          onCopy()
        } else {
          navigator.clipboard.writeText(description)
        }
      },
    },
    {
      label: 'Regenerate',
      icon: <RefreshOutlinedIcon fontSize="small" />,
      onClick: onRefresh,
    },
  ]

  const menuItems = actions.length > 0 ? actions : defaultActions

  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: 1,
        background: `linear-gradient(135deg, ${GRADIENT_COLORS.start} 0%, ${GRADIENT_COLORS.end} 100%)`,
        overflow: 'hidden',
      }}
    >
      {/* Content wrapper */}
      <Box
        sx={{
          p: 2,
          pb: needsExpansion && !expanded ? 1 : 2,
        }}
      >
        {/* Header row */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            mb: 0.5,
          }}
        >
          {/* Icon and type label */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AutoAwesomeOutlinedIcon
              sx={{
                fontSize: 18,
                color: 'secondary.main',
              }}
            />
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}
            >
              AI {typeConfig.label}
            </Typography>
          </Box>

          {/* Menu button */}
          <IconButton
            size="small"
            onClick={handleMenuOpen}
            sx={{
              mt: -0.5,
              mr: -0.5,
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Description */}
        <Typography
          ref={textRef}
          variant="body2"
          sx={{
            color: 'text.primary',
            lineHeight: 1.5,
            ...(!expanded && {
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }),
          }}
        >
          {description}
        </Typography>
      </Box>

      {/* Show More/Less button */}
      {needsExpansion && (
        <Box sx={{ px: 2, pb: 1.5, pt: 0.5 }}>
          <Button
            fullWidth
            size="small"
            variant="outlined"
            onClick={() => setExpanded(!expanded)}
            endIcon={
              <ExpandMoreIcon
                sx={{
                  transform: expanded ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s ease',
                  fontSize: 18,
                }}
              />
            }
            sx={{
              color: 'text.primary',
              fontWeight: 700,
              fontSize: '0.875rem',
              textTransform: 'none',
              py: 0.75,
              borderColor: 'rgba(0, 0, 0, 0.12)',
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                borderColor: 'rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            {expanded ? 'Show Less' : 'Show More'}
          </Button>
        </Box>
      )}

      {/* Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={menuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => handleAction(item)}
            sx={{ minWidth: 160 }}
          >
            {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
            <ListItemText>{item.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default AiInsightBox

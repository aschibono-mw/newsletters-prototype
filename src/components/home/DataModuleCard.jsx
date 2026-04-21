import { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import AiInsightBox from './AiInsightBox'

/**
 * Wrapper component for data visualization modules
 * @param {string} title - Module title
 * @param {string} subtitle - Optional subtitle
 * @param {ReactNode} children - Chart content
 * @param {object} aiInsight - { type, description, actions[] }
 * @param {array} menuActions - Header menu items [{ label, icon, onClick, divider }]
 */
function DataModuleCard({
  title,
  subtitle,
  children,
  aiInsight,
  menuActions = [],
  onExpand,
  onDownload,
  onShare,
  onSettings,
}) {
  const [menuAnchor, setMenuAnchor] = useState(null)
  const menuOpen = Boolean(menuAnchor)

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

  // Default menu actions
  const defaultMenuActions = [
    {
      label: 'Expand',
      icon: <FullscreenOutlinedIcon fontSize="small" />,
      onClick: onExpand,
    },
    {
      label: 'Download',
      icon: <DownloadOutlinedIcon fontSize="small" />,
      onClick: onDownload,
    },
    {
      label: 'Share',
      icon: <ShareOutlinedIcon fontSize="small" />,
      onClick: onShare,
    },
    { divider: true },
    {
      label: 'Settings',
      icon: <SettingsOutlinedIcon fontSize="small" />,
      onClick: onSettings,
    },
  ]

  const actions = menuActions.length > 0 ? menuActions : defaultMenuActions

  return (
    <Paper
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          p: 2,
          pb: 1,
        }}
      >
        <Box>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              lineHeight: 1.3,
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                display: 'block',
                mt: 0.25,
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        <IconButton
          size="small"
          onClick={handleMenuOpen}
          sx={{
            mt: -0.5,
            mr: -0.5,
            color: 'text.secondary',
          }}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>

        <Menu
          anchorEl={menuAnchor}
          open={menuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          {actions.map((action, index) =>
            action.divider ? (
              <Divider key={index} />
            ) : (
              <MenuItem
                key={index}
                onClick={() => handleAction(action)}
                disabled={!action.onClick}
                sx={{ minWidth: 160 }}
              >
                {action.icon && <ListItemIcon>{action.icon}</ListItemIcon>}
                <ListItemText>{action.label}</ListItemText>
              </MenuItem>
            )
          )}
        </Menu>
      </Box>

      {/* AI Insight - at top */}
      {aiInsight && (
        <Box sx={{ px: 2, pb: 1.5 }}>
          <AiInsightBox
            type={aiInsight.type}
            description={aiInsight.description}
            actions={aiInsight.actions}
          />
        </Box>
      )}

      {/* Chart content */}
      <Box sx={{ px: 2, pb: 2 }}>{children}</Box>
    </Paper>
  )
}

export default DataModuleCard

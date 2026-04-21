import { Box, Paper, Typography, IconButton, Tooltip } from '@mui/material'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

/**
 * Alerts card component for homepage
 * @param {array} alerts - [{ id, time, text, type }]
 * @param {number} unreadCount - Number of unread alerts
 * @param {function} onCreateAlert - Handler for create alert action
 * @param {function} onSettings - Handler for settings action
 * @param {function} onAlertClick - Handler for clicking an alert
 */
function AlertsCard({
  alerts = [],
  unreadCount = 0,
  onCreateAlert,
  onSettings,
  onAlertClick,
}) {
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
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Alerts
          </Typography>
          {unreadCount > 0 && (
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              (Unread - {unreadCount})
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Tooltip title="Create Alert">
            <IconButton size="small" onClick={onCreateAlert}>
              <NotificationsOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Go To Settings">
            <IconButton size="small" onClick={onSettings}>
              <SettingsOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Alert items */}
      <Box>
        {alerts.map((alert, index) => (
          <Box
            key={alert.id || index}
            onClick={() => onAlertClick?.(alert)}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1.5,
              p: 2,
              borderBottom: index < alerts.length - 1 ? '1px solid' : 'none',
              borderColor: 'divider',
              borderLeft: '4px solid',
              borderLeftColor: 'success.main',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            {/* Icon */}
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: 'success.light',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <TrendingUpIcon
                sx={{ fontSize: 16, color: 'success.dark' }}
              />
            </Box>

            {/* Content */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: 1,
                  mb: 0.5,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 600, color: 'text.primary' }}
                >
                  {alert.type || 'Spike Detection'}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}
                >
                  {alert.time}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {alert.text}
              </Typography>
            </Box>
          </Box>
        ))}

        {alerts.length === 0 && (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              No alerts to display
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  )
}

export default AlertsCard

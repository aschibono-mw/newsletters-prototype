import { Box, Typography, Paper, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import SearchIcon from '@mui/icons-material/Search'

const ITEMS = [
  {
    icon: <TrendingUpIcon fontSize="small" sx={{ color: '#E65100' }} />,
    primary: 'Spike: Brand mentions in Finance (+43%)',
    secondary: 'Detected 2 hours ago across 14 outlets',
  },
  {
    icon: <SearchIcon fontSize="small" sx={{ color: '#1565C0' }} />,
    primary: 'Saved search: "Enterprise AI" — 48 new results',
    secondary: 'Last updated: today at 9:14 AM',
  },
  {
    icon: <NotificationsNoneIcon fontSize="small" sx={{ color: 'secondary.main' }} />,
    primary: 'Alert: Share of voice dropped below 20%',
    secondary: 'Threshold set by you on Feb 12',
  },
]

export default function NewMwMonitorPage() {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100%' }}>
      <Box sx={{ maxWidth: 1100, mx: 'auto', px: 6, py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Monitor
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Track brand mentions, keyword alerts, and media spikes in real time — coming soon.
        </Typography>

        <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden', maxWidth: 600 }}>
          <Box sx={{ px: 2.5, py: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              Recent activity
            </Typography>
          </Box>
          <Divider />
          <List disablePadding>
            {ITEMS.map((item, i) => (
              <ListItem
                key={i}
                divider={i < ITEMS.length - 1}
                sx={{ px: 2.5, py: 1.5 }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.primary}
                  secondary={item.secondary}
                  primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                  secondaryTypographyProps={{ variant: 'caption' }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  )
}

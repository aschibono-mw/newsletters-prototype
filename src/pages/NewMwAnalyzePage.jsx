import { Box, Typography, Paper, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material'
import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined'
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'

const ITEMS = [
  {
    icon: <AutoGraphOutlinedIcon fontSize="small" sx={{ color: 'primary.main' }} />,
    primary: 'Share of Voice — Q1 2026',
    secondary: 'Your brand holds 28% SoV, up 4 pts from last quarter',
  },
  {
    icon: <InsightsOutlinedIcon fontSize="small" sx={{ color: '#1565C0' }} />,
    primary: 'Sentiment trend report',
    secondary: 'Positive sentiment increased 8% in European markets',
  },
  {
    icon: <DashboardOutlinedIcon fontSize="small" sx={{ color: '#558B2F' }} />,
    primary: 'Top outlets by reach',
    secondary: 'Bloomberg, Reuters, TechCrunch led coverage this month',
  },
]

export default function NewMwAnalyzePage() {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100%' }}>
      <Box sx={{ maxWidth: 1100, mx: 'auto', px: 6, py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Analyze
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Measure share of voice, sentiment trends, and campaign performance — coming soon.
        </Typography>

        <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden', maxWidth: 600 }}>
          <Box sx={{ px: 2.5, py: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              Latest insights
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

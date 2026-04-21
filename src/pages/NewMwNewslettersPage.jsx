import { Box, Typography, Paper, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material'
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined'
import ScheduleIcon from '@mui/icons-material/Schedule'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

const ITEMS = [
  {
    icon: <NewspaperOutlinedIcon fontSize="small" sx={{ color: 'primary.main' }} />,
    primary: 'Weekly Digest',
    secondary: 'Sent every Monday · 1,240 subscribers',
  },
  {
    icon: <ScheduleIcon fontSize="small" sx={{ color: '#1565C0' }} />,
    primary: 'Executive Briefing',
    secondary: 'Sent every Friday · Next send: Mar 7',
  },
  {
    icon: <EditOutlinedIcon fontSize="small" sx={{ color: 'secondary.main' }} />,
    primary: 'Market Pulse',
    secondary: 'Draft · Pending review by editor',
  },
]

export default function NewMwNewslettersPage() {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100%' }}>
      <Box sx={{ maxWidth: 1100, mx: 'auto', px: 6, py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Newsletters
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Build and send curated newsletters to your audience — coming soon.
        </Typography>

        <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden', maxWidth: 600 }}>
          <Box sx={{ px: 2.5, py: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              Your newsletters
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

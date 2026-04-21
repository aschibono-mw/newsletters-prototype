import { Box, Typography, Paper, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined'

const ITEMS = [
  {
    icon: <RocketLaunchOutlinedIcon fontSize="small" sx={{ color: '#E65100' }} />,
    primary: 'Campaign: Spring Launch 2026',
    secondary: '3 pitches sent · 1 reply received',
  },
  {
    icon: <PeopleOutlinedIcon fontSize="small" sx={{ color: '#1565C0' }} />,
    primary: 'Contact list updated',
    secondary: '12 journalists added from Finance & Tech beats',
  },
  {
    icon: <EmailOutlinedIcon fontSize="small" sx={{ color: 'primary.main' }} />,
    primary: 'Draft: Q1 Product Announcement',
    secondary: 'Ready to send · 8 contacts selected',
  },
]

export default function NewMwOutreachPage() {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100%' }}>
      <Box sx={{ maxWidth: 1100, mx: 'auto', px: 6, py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Outreach
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Manage journalist contacts, pitch campaigns, and track responses — coming soon.
        </Typography>

        <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden', maxWidth: 600 }}>
          <Box sx={{ px: 2.5, py: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              Active campaigns
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

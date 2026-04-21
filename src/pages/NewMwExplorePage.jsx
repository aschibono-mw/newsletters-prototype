import { Box, Typography, Paper, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'

const ITEMS = [
  {
    icon: <TrendingUpIcon fontSize="small" sx={{ color: '#E65100' }} />,
    primary: 'Trending: AI & Automation',
    secondary: '1,240 articles in the last 24 hours across 80 outlets',
  },
  {
    icon: <ExploreOutlinedIcon fontSize="small" sx={{ color: '#1565C0' }} />,
    primary: "Editor's Pick: Brand Monitoring Guide",
    secondary: 'A curated walkthrough of best practices for media tracking',
  },
  {
    icon: <BookmarkBorderIcon fontSize="small" sx={{ color: 'primary.main' }} />,
    primary: 'Popular: Competitor Landscape Q2',
    secondary: 'Benchmarks and share-of-voice trends for your industry',
  },
]

export default function NewMwExplorePage() {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100%' }}>
      <Box sx={{ maxWidth: 1100, mx: 'auto', px: 6, py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Explore
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Discover trending topics, curated content, and industry insights — coming soon.
        </Typography>

        <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden', maxWidth: 600 }}>
          <Box sx={{ px: 2.5, py: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              Featured this week
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

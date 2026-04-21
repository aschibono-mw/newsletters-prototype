import { useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  Stack,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Tabs,
  Tab,
  Link,
} from '@mui/material'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import SearchIcon from '@mui/icons-material/Search'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import HistoryIcon from '@mui/icons-material/History'
import StarBorderIcon from '@mui/icons-material/StarBorder'

// ─── Mock data ────────────────────────────────────────────────────────────────

const TABS = [
  'All', 'Mine', 'My team', 'Searches', 'Dashboards',
  'Mentions', 'GenAI', 'Alerts', 'Publishing', 'Outreach',
]

const ICON_MAP = {
  spike:      TrendingUpIcon,
  search:     SearchIcon,
  mention:    AlternateEmailIcon,
  alert:      NotificationsNoneIcon,
  dashboard:  DashboardOutlinedIcon,
  publishing: ArticleOutlinedIcon,
  outreach:   PeopleOutlinedIcon,
}

const COLOR_MAP = {
  spike:      '#E65100',
  search:     '#1565C0',
  mention:    'primary.main',
  alert:      'secondary.main',
  dashboard:  '#558B2F',
  publishing: '#7B1FA2',
  outreach:   '#0070BB',
}

const FEED_ITEMS = [
  {
    id: 1,
    type: 'spike',
    text: 'Spike detected: Brand mentions in Finance (+43%)',
    sub: '2 min ago · Earn Media',
  },
  {
    id: 2,
    type: 'search',
    text: 'David Kim created a search "Competitor Pricing Q2"',
    sub: '14 min ago · My team',
  },
  {
    id: 3,
    type: 'mention',
    text: 'New mention: "Meltwater named Leader in G2 Summer Report"',
    sub: '1 hr ago · Mentions',
  },
  {
    id: 4,
    type: 'alert',
    text: 'Alert triggered: Share of voice dropped below 20%',
    sub: '2 hr ago · Alerts',
  },
  {
    id: 5,
    type: 'dashboard',
    text: 'Weekly Media Digest dashboard was shared with you',
    sub: '3 hr ago · Dashboards',
  },
  {
    id: 6,
    type: 'spike',
    text: 'Trending topic: "AI Regulation" spiked 120% in Tech',
    sub: '4 hr ago · Earn Media',
  },
  {
    id: 7,
    type: 'mention',
    text: 'Executive mention: CEO quoted in Bloomberg article',
    sub: 'Yesterday · Mentions',
  },
  {
    id: 8,
    type: 'search',
    text: 'Saved search "Brand Health Monitor" has 48 new results',
    sub: 'Yesterday · Searches',
  },
  {
    id: 9,
    type: 'publishing',
    text: 'Blog post "Q1 Market Overview" is scheduled for 9:00 AM',
    sub: 'Yesterday · Publishing',
  },
  {
    id: 10,
    type: 'alert',
    text: 'Sentiment alert: Negative coverage spike in APAC region',
    sub: '2 days ago · Alerts',
  },
]

const RECENTS = [
  { id: 'r1', label: 'Brand Monitoring — EMEA' },
  { id: 'r2', label: 'Executive Mentions Dashboard' },
  { id: 'r3', label: 'Competitor Pricing Q2' },
  { id: 'r4', label: 'Q1 Campaign Performance' },
]

const FAVORITES = [
  { id: 'f1', label: 'Share of Voice Report' },
  { id: 'f2', label: 'Weekly Digest' },
  { id: 'f3', label: 'Social Listening: Brand' },
]

// ─── Rail card (Recents / Favorites) ─────────────────────────────────────────

function RailCard({ icon, title, items }) {
  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Box
        sx={{
          px: 2,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {icon}
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
        </Box>
        <Link
          component="button"
          variant="caption"
          underline="hover"
          sx={{ color: 'primary.main', fontWeight: 600 }}
        >
          See all
        </Link>
      </Box>
      <Divider />
      <List dense disablePadding>
        {items.map((item) => (
          <ListItemButton
            key={item.id}
            sx={{
              px: 2,
              py: 1,
              '&:not(:last-child)': { borderBottom: '1px solid', borderColor: 'divider' },
            }}
          >
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{ variant: 'body2', noWrap: true }}
            />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NewMwPage() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100%' }}>
      <Box sx={{ maxWidth: 1100, mx: 'auto', px: 6, py: 4 }}>

        {/* ── Page header ──────────────────────────────────────────────── */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Good morning, John
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <AutoAwesomeIcon sx={{ fontSize: 16, color: 'secondary.main' }} />
            <Typography variant="body2" color="text.secondary">
              Sentiment improved by 8% in European markets
            </Typography>
            <Link
              component="button"
              variant="body2"
              underline="hover"
              sx={{ fontWeight: 600, color: 'primary.main' }}
            >
              Analyze &gt;&gt;
            </Link>
          </Box>
        </Box>

        {/* ── Two-column layout ─────────────────────────────────────────── */}
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>

          {/* Left card */}
          <Paper variant="outlined" sx={{ flex: 1, borderRadius: 2, overflow: 'hidden' }}>
            <Box sx={{ px: 3, pt: 2.5, pb: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                What's happening now
              </Typography>
            </Box>

            <Tabs
              value={activeTab}
              onChange={(_, v) => setActiveTab(v)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                minHeight: 40,
                px: 1,
                '& .MuiTab-root': {
                  minHeight: 40,
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  py: 0,
                  px: 1.5,
                },
              }}
            >
              {TABS.map((tab, i) => (
                <Tab key={tab} label={tab} value={i} />
              ))}
            </Tabs>

            <Divider />

            <List disablePadding>
              {FEED_ITEMS.map((item) => {
                const IconComp = ICON_MAP[item.type]
                return (
                  <ListItemButton
                    key={item.id}
                    sx={{
                      px: 3,
                      py: 1.5,
                      '&:not(:last-child)': { borderBottom: '1px solid', borderColor: 'divider' },
                    }}
                  >
                    <IconComp
                      fontSize="small"
                      sx={{ color: COLOR_MAP[item.type], mr: 2, mt: 0.25, flexShrink: 0 }}
                    />
                    <ListItemText
                      primary={item.text}
                      secondary={item.sub}
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                  </ListItemButton>
                )
              })}
            </List>
          </Paper>

          {/* Right rail — sticky */}
          <Box sx={{ width: 260, flexShrink: 0, position: 'sticky', top: 16 }}>
            <Stack spacing={2}>
              <RailCard
                icon={<HistoryIcon fontSize="small" sx={{ color: 'text.secondary' }} />}
                title="Recents"
                items={RECENTS}
              />
              <RailCard
                icon={<StarBorderIcon fontSize="small" sx={{ color: 'text.secondary' }} />}
                title="Favorites"
                items={FAVORITES}
              />
            </Stack>
          </Box>

        </Box>
      </Box>
    </Box>
  )
}

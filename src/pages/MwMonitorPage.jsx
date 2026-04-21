import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Typography, Button, TextField, InputAdornment,
  ToggleButtonGroup, ToggleButton, Paper,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import BarChartIcon from '@mui/icons-material/BarChart'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const VIEWS = [
  { id: 'alinas-view', label: "Alina's view", time: '23h ago' },
  { id: 'michelles',   label: "Michelle's",   time: 'Yesterday' },
  { id: 'diablo',      label: 'Diablo',        time: 'Yesterday' },
]

const FEATURE_CARDS = [
  {
    label: 'Views',
    desc: 'View, Organize, and Share Relevant Coverage',
    icon: <BarChartIcon sx={{ fontSize: 22, color: '#4F6AF5' }} />,
    iconBg: 'rgba(79,106,245,0.10)',
    path: '/mw-monitor/views/alinas-view',
  },
  {
    label: 'Trends Center',
    desc: 'Understand Whats Trending Across Social and Editorial Media',
    icon: <TrendingUpIcon sx={{ fontSize: 22, color: '#e86c5a' }} />,
    iconBg: 'rgba(232,108,90,0.10)',
    path: '/mw-monitor/trends',
  },
  {
    label: 'GenAI Lens',
    desc: "Transparency Into Your Brand's AI Presence",
    icon: <AutoAwesomeIcon sx={{ fontSize: 22, color: '#9B59B6' }} />,
    iconBg: 'rgba(155,89,182,0.10)',
    path: '/genai-lens',
  },
]

const GUIDE_CARDS_DATA = [
  {
    title: 'Get started with Monitor',
    desc: 'Monitor allows you to track and analyze 15 social media channels, TV & radio, 270,000 global news sources, print media, and over 20,000 podcasts.',
    isBook: true,
  },
  {
    title: 'Get started with Trends Center',
    desc: 'Learn how to track trending topics, hashtags, and emerging conversations in Monitor. This step-by-step guide shows you how to spot opportunities and ad fast.',
    isBook: false,
  },
  {
    title: 'GenAI Lens Overview',
    desc: 'See how your brand, product, or competitors are discussed across leading large language models (LLMs).',
    isBook: false,
  },
]


export default function MwMonitorPage() {
  const navigate = useNavigate()
  const [viewTab, setViewTab] = useState('recent')
  const [viewSearch, setViewSearch] = useState('')

  const filteredViews = VIEWS.filter(v =>
    v.label.toLowerCase().includes(viewSearch.toLowerCase())
  )

  return (
    <Box sx={{ height: '100%', overflow: 'auto', bgcolor: 'background.default' }}>
      {/* Hero section */}
      <Box
        sx={{
          position: 'relative',
          bgcolor: 'background.paper',
          px: 4,
          pt: 4,
          pb: 3,
          overflow: 'hidden',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        {/* Decorative blobs */}
        <Box sx={{ position: 'absolute', top: -40, left: -20, width: 200, height: 200, borderRadius: '50%', bgcolor: 'rgba(0,130,127,0.06)', pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', bottom: -60, left: 100, width: 160, height: 160, borderRadius: '50%', bgcolor: 'rgba(232,108,90,0.06)', pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', top: -30, right: 60, width: 220, height: 220, borderRadius: '50%', bgcolor: 'rgba(155,89,182,0.06)', pointerEvents: 'none' }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, position: 'relative' }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, fontSize: '24px', mb: 0.5 }}>
              Monitor Conversations in Real Time
            </Typography>
            <Typography sx={{ fontSize: '14px', color: 'text.secondary' }}>
              Track global media in real time across news, social, broadcast, and podcasts.
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/mw-monitor/views/alinas-view')}
            sx={{
              bgcolor: '#B627A1', color: '#fff', textTransform: 'none',
              fontWeight: 500, '&:hover': { bgcolor: '#9a2088' },
              borderRadius: '6px', px: 2.5, flexShrink: 0,
            }}
          >
            Create View
          </Button>
        </Box>

        {/* Feature cards */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          {FEATURE_CARDS.map(card => (
            <Paper
              key={card.label}
              onClick={() => navigate(card.path)}
              elevation={0}
              sx={{
                flex: 1, display: 'flex', alignItems: 'flex-start', gap: 2,
                p: 2.5, border: '1px solid', borderColor: 'divider',
                borderRadius: 1, cursor: 'pointer',
                '&:hover': { bgcolor: 'action.hover', borderColor: 'rgba(0,0,0,0.15)' },
                transition: 'border-color 0.15s',
              }}
            >
              <Box
                sx={{
                  width: 40, height: 40, borderRadius: '8px',
                  bgcolor: card.iconBg, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}
              >
                {card.icon}
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 600, fontSize: '15px', mb: 0.5 }}>{card.label}</Typography>
                <Typography sx={{ fontSize: '13px', color: 'text.secondary', lineHeight: 1.4 }}>{card.desc}</Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>

      {/* Your Views section */}
      <Box sx={{ px: 4, py: 3, bgcolor: 'background.paper', mt: 1.5, mx: 0, borderTop: '1px solid', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography sx={{ fontWeight: 600, fontSize: '16px' }}>Your Views</Typography>
            <ToggleButtonGroup
              value={viewTab}
              exclusive
              onChange={(_, v) => v && setViewTab(v)}
              size="small"
              sx={{
                '& .MuiToggleButton-root': {
                  px: 1.5, py: 0.4, textTransform: 'none', fontSize: '13px',
                  border: '1px solid', borderColor: 'divider',
                  '&.Mui-selected': { bgcolor: 'transparent', fontWeight: 600, color: 'text.primary' },
                },
              }}
            >
              <ToggleButton value="recent">Recent</ToggleButton>
              <ToggleButton value="all">All</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <TextField
            size="small"
            placeholder="Find View"
            value={viewSearch}
            onChange={e => setViewSearch(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 16, color: 'text.disabled' }} /></InputAdornment>,
              endAdornment: <InputAdornment position="end"><KeyboardArrowDownIcon sx={{ fontSize: 16, color: 'text.disabled' }} /></InputAdornment>,
            }}
            sx={{ width: 220, '& .MuiInputBase-root': { fontSize: '13px' } }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {filteredViews.map(view => (
            <Paper
              key={view.id}
              onClick={() => navigate(`/mw-monitor/views/${view.id}`)}
              elevation={0}
              sx={{
                flex: 1, display: 'flex', alignItems: 'center', gap: 2,
                p: 2, border: '1px solid', borderColor: 'divider',
                borderRadius: 1, cursor: 'pointer',
                '&:hover': { bgcolor: 'action.hover', borderColor: 'rgba(0,0,0,0.15)' },
              }}
            >
              <Box
                sx={{
                  width: 36, height: 36, borderRadius: '6px',
                  bgcolor: 'rgba(79,106,245,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}
              >
                <BarChartIcon sx={{ fontSize: 18, color: '#4F6AF5' }} />
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>{view.label}</Typography>
                <Typography sx={{ fontSize: '12px', color: 'text.disabled' }}>{view.time}</Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>

      {/* Guides and Resources */}
      <Box sx={{ px: 4, py: 3 }}>
        <Typography sx={{ fontWeight: 600, fontSize: '16px', mb: 2 }}>Guides and Resources</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {GUIDE_CARDS_DATA.map(card => (
            <Paper
              key={card.title}
              elevation={0}
              sx={{
                flex: 1, p: 2.5, border: '1px solid', borderColor: 'divider',
                borderRadius: 1, display: 'flex', flexDirection: 'column',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                <Typography sx={{ fontWeight: 600, fontSize: '14px', lineHeight: 1.3, pr: 2 }}>{card.title}</Typography>
                <Box
                  sx={{
                    width: 56, height: 56, borderRadius: '50%', flexShrink: 0,
                    bgcolor: 'rgba(155,89,182,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  {card.isBook
                    ? <MenuBookIcon sx={{ fontSize: 28, color: '#9B59B6' }} />
                    : <PlayCircleOutlineIcon sx={{ fontSize: 28, color: '#9B59B6' }} />
                  }
                </Box>
              </Box>
              <Typography sx={{ fontSize: '13px', color: 'text.secondary', lineHeight: 1.5, flex: 1, mb: 2 }}>
                {card.desc}
              </Typography>
              <Box
                sx={{
                  display: 'flex', alignItems: 'center', gap: 0.5,
                  cursor: 'pointer', '&:hover': { textDecoration: 'underline' },
                  width: 'fit-content',
                }}
              >
                <Typography sx={{ fontSize: '13px', fontWeight: 500, color: '#00827F' }}>
                  Visit mCommunity
                </Typography>
                <OpenInNewIcon sx={{ fontSize: 13, color: '#00827F' }} />
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Typography, Button, IconButton, TextField, InputAdornment,
  LinearProgress,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import TagIcon from '@mui/icons-material/Tag'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

// ── Data ──────────────────────────────────────────────────────────────────────

const PLATFORMS = [
  { key: 'tiktok',    label: 'TikTok',    logo: '🎵', comingSoon: false },
  { key: 'x',         label: 'X',         logo: '✕',  comingSoon: false },
  { key: 'instagram', label: 'Instagram', logo: '📷', comingSoon: false },
  { key: 'news',      label: 'News',      logo: '📰', comingSoon: true  },
]

const HASHTAGS_DATA = [
  { rank: 1,  change: 'new',  name: 'coachella',      views: '3.83B',  posts: '255.38k', audience: 78, countries: 'US, GB, PH, MX, ID' },
  { rank: 2,  change: -1,     name: 'usa',             views: '2.42B',  posts: '592.89k', audience: 62, countries: 'US, PK, MX, ID, PH' },
  { rank: 3,  change: 0,      name: 'movie',           views: '1.85B',  posts: '304.81k', audience: 55, countries: 'US, PH, MX, ID, MM' },
  { rank: 4,  change: +2,     name: 'viral',           views: '1.62B',  posts: '841.22k', audience: 71, countries: 'US, GB, IN, BR, MX' },
  { rank: 5,  change: -1,     name: 'fyp',             views: '1.41B',  posts: '2.1M',    audience: 88, countries: 'US, GB, AU, CA, DE' },
  { rank: 6,  change: 0,      name: 'foryou',          views: '1.28B',  posts: '1.87M',   audience: 85, countries: 'US, GB, AU, CA, PH' },
  { rank: 7,  change: 'new',  name: 'music',           views: '1.12B',  posts: '634.5k',  audience: 67, countries: 'US, IN, BR, MX, ID' },
  { rank: 8,  change: -3,     name: 'trending',        views: '987.3M', posts: '1.23M',   audience: 74, countries: 'US, GB, IN, CA, AU' },
  { rank: 9,  change: +1,     name: 'dance',           views: '932.1M', posts: '289.4k',  audience: 61, countries: 'US, PH, BR, MX, TH' },
  { rank: 10, change: -2,     name: 'funny',           views: '876.5M', posts: '748.9k',  audience: 58, countries: 'US, GB, IN, AU, CA' },
]

const TRACKS_DATA = [
  { rank: 1,  change: 'new', name: 'Espresso - Sabrina Carpenter',         views: '890M',  posts: '124.5k', audience: 81, countries: 'US, GB, AU, CA, DE' },
  { rank: 2,  change: -1,    name: "Luther - Kendrick Lamar, SZA",          views: '720M',  posts: '98.3k',  audience: 76, countries: 'US, GB, CA, AU, NG' },
  { rank: 3,  change: 0,     name: 'APT. - ROSE, Bruno Mars',               views: '654M',  posts: '87.1k',  audience: 69, countries: 'KR, US, PH, TH, JP' },
]

// ── Components ────────────────────────────────────────────────────────────────

function RankChangeBadge({ change }) {
  if (change === 'new') {
    return (
      <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, px: 1, py: 0.25, borderRadius: '4px', bgcolor: 'rgba(245,180,0,0.15)', border: '1px solid rgba(245,180,0,0.4)' }}>
        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#f5b400' }} />
        <Typography sx={{ fontSize: '11px', fontWeight: 600, color: '#b08000' }}>New</Typography>
      </Box>
    )
  }
  if (change > 0) {
    return (
      <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.25, px: 1, py: 0.25, borderRadius: '4px', bgcolor: 'rgba(0,180,80,0.1)', border: '1px solid rgba(0,180,80,0.3)' }}>
        <KeyboardArrowUpIcon sx={{ fontSize: 13, color: '#1a7a45' }} />
        <Typography sx={{ fontSize: '11px', fontWeight: 600, color: '#1a7a45' }}>{change}</Typography>
      </Box>
    )
  }
  if (change < 0) {
    return (
      <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.25, px: 1, py: 0.25, borderRadius: '4px', bgcolor: 'rgba(220,50,50,0.08)', border: '1px solid rgba(220,50,50,0.25)' }}>
        <TrendingDownIcon sx={{ fontSize: 13, color: '#c0392b' }} />
        <Typography sx={{ fontSize: '11px', fontWeight: 600, color: '#c0392b' }}>{Math.abs(change)}</Typography>
      </Box>
    )
  }
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.25, px: 1, py: 0.25, borderRadius: '4px', bgcolor: 'rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.12)' }}>
      <TrendingFlatIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
      <Typography sx={{ fontSize: '11px', fontWeight: 600, color: 'text.secondary' }}>0</Typography>
    </Box>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function MwTrendsCenterPage() {
  const navigate = useNavigate()
  const [platform, setPlatform] = useState('tiktok')
  const [contentTab, setContentTab] = useState('hashtags')
  const [dateRange, setDateRange] = useState('Last 7 Days')
  const [category, setCategory] = useState('All')
  const [location, setLocation] = useState('United States')
  const [topicSearch, setTopicSearch] = useState('')

  const data = contentTab === 'hashtags' ? HASHTAGS_DATA : TRACKS_DATA
  const tableTitle = contentTab === 'hashtags'
    ? `Top ${data.length * 20} Hashtags`
    : `Top ${data.length * 5} Tracks`

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'background.default', overflow: 'hidden' }}>
      {/* Sub-header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2, py: 1.25, bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', flexShrink: 0 }}>
        <IconButton size="small" onClick={() => navigate('/mw-monitor')}>
          <ArrowBackIcon sx={{ fontSize: 18 }} />
        </IconButton>
        <Typography sx={{ fontWeight: 600, fontSize: '15px' }}>Trends Center</Typography>
      </Box>

      {/* Platform tabs */}
      <Box sx={{ display: 'flex', bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', flexShrink: 0 }}>
        {PLATFORMS.map(p => {
          const isActive = platform === p.key
          return (
            <Box
              key={p.key}
              onClick={() => !p.comingSoon && setPlatform(p.key)}
              sx={{
                display: 'flex', alignItems: 'center', gap: 1.25,
                px: 3, py: 1.5,
                cursor: p.comingSoon ? 'default' : 'pointer',
                borderBottom: isActive ? '2px solid #00827F' : '2px solid transparent',
                bgcolor: isActive ? 'rgba(0,130,127,0.04)' : 'transparent',
                opacity: p.comingSoon ? 0.45 : 1,
                '&:hover': { bgcolor: isActive || p.comingSoon ? undefined : 'action.hover' },
                transition: 'background 0.15s',
              }}
            >
              <Typography sx={{ fontSize: '16px' }}>{p.logo}</Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: isActive ? 600 : 400, color: isActive ? '#00827F' : 'text.primary' }}>
                {p.label}
              </Typography>
              {p.comingSoon && (
                <Typography sx={{ fontSize: '11px', color: 'text.disabled', ml: 0.5 }}>
                  (Coming soon)
                </Typography>
              )}
            </Box>
          )
        })}
      </Box>

      {/* Content sub-tabs + filters */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 3, py: 1.25, bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', flexShrink: 0, flexWrap: 'wrap' }}>
        {/* Hashtags / Tracks tabs */}
        <Box sx={{ display: 'flex', border: '1px solid', borderColor: 'divider', borderRadius: '6px', overflow: 'hidden' }}>
          {[
            { key: 'hashtags', label: 'Hashtags', icon: <TagIcon sx={{ fontSize: 15 }} /> },
            { key: 'tracks',   label: 'Tracks',   icon: <MusicNoteIcon sx={{ fontSize: 15 }} /> },
          ].map(tab => (
            <Box
              key={tab.key}
              onClick={() => setContentTab(tab.key)}
              sx={{
                display: 'flex', alignItems: 'center', gap: 0.75,
                px: 1.75, py: 0.65, cursor: 'pointer',
                bgcolor: contentTab === tab.key ? '#00827F' : 'transparent',
                color: contentTab === tab.key ? '#fff' : 'text.secondary',
                borderRight: tab.key === 'hashtags' ? '1px solid' : 'none',
                borderColor: 'divider',
                '&:hover': { bgcolor: contentTab === tab.key ? '#00827F' : 'action.hover' },
                transition: 'background 0.15s',
              }}
            >
              {tab.icon}
              <Typography sx={{ fontSize: '13px', fontWeight: 500, color: 'inherit' }}>{tab.label}</Typography>
            </Box>
          ))}
        </Box>

        {/* Filter pills */}
        {[
          { label: `Date range: ${dateRange}` },
          { label: `Category: ${category}` },
          { label: `Location: ${location}` },
        ].map(f => (
          <Box
            key={f.label}
            sx={{
              display: 'flex', alignItems: 'center', gap: 0.5,
              px: 1.5, py: 0.65, border: '1px solid', borderColor: 'divider',
              borderRadius: '6px', cursor: 'pointer', fontSize: '13px',
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <Typography sx={{ fontSize: '13px', color: 'text.primary' }}>{f.label}</Typography>
            <KeyboardArrowDownIcon sx={{ fontSize: 15, color: 'text.secondary' }} />
          </Box>
        ))}
      </Box>

      {/* Main content */}
      <Box sx={{ flex: 1, overflow: 'auto', px: 3, py: 2.5 }}>
        <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, bgcolor: 'background.paper', overflow: 'hidden' }}>
          {/* Table header */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Typography sx={{ fontSize: '15px', fontWeight: 600 }}>{tableTitle}</Typography>
              <InfoOutlinedIcon sx={{ fontSize: 15, color: 'text.disabled' }} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  display: 'flex', alignItems: 'center', gap: 0.75,
                  px: 1.5, py: 0.6, border: '1px solid', borderColor: 'divider',
                  borderRadius: '6px', bgcolor: 'background.default', width: 220,
                }}
              >
                <SearchIcon sx={{ fontSize: 15, color: 'text.disabled' }} />
                <input
                  placeholder="Enter or describe topic..."
                  value={topicSearch}
                  onChange={e => setTopicSearch(e.target.value)}
                  style={{
                    border: 'none', outline: 'none', background: 'transparent',
                    fontSize: '13px', flex: 1, color: 'inherit', fontFamily: 'inherit',
                  }}
                />
                {topicSearch && (
                  <ClearIcon
                    sx={{ fontSize: 14, color: 'text.disabled', cursor: 'pointer' }}
                    onClick={() => setTopicSearch('')}
                  />
                )}
              </Box>
              <IconButton size="small">
                <FileDownloadOutlinedIcon sx={{ fontSize: 17 }} />
              </IconButton>
            </Box>
          </Box>

          {/* Table */}
          <Box>
            {/* Column headers */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '80px 100px 1fr 120px 120px 160px 180px',
                px: 3, py: 1.25,
                bgcolor: 'background.default',
                borderBottom: '1px solid', borderColor: 'divider',
              }}
            >
              {['Rank', 'Rank Change', 'Name', 'Views', 'Posts', 'Primary Audience', 'Top Countries'].map((col, i) => (
                <Typography key={col} sx={{ fontSize: '12px', fontWeight: 600, color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.25 }}>
                  {col}
                  {i === 5 && <InfoOutlinedIcon sx={{ fontSize: 12, color: 'text.disabled' }} />}
                </Typography>
              ))}
            </Box>

            {/* Rows */}
            {data.map(row => (
              <Box
                key={row.rank}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '80px 100px 1fr 120px 120px 160px 180px',
                  px: 3, py: 1.75,
                  borderBottom: '1px solid', borderColor: 'divider',
                  alignItems: 'center',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.015)' },
                  '&:last-child': { borderBottom: 'none' },
                }}
              >
                {/* Rank */}
                <Box sx={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>{row.rank}</Typography>
                </Box>

                {/* Rank Change */}
                <RankChangeBadge change={row.change} />

                {/* Name */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {contentTab === 'hashtags' && <TagIcon sx={{ fontSize: 15, color: 'text.disabled' }} />}
                  {contentTab === 'tracks' && <MusicNoteIcon sx={{ fontSize: 15, color: 'text.disabled' }} />}
                  <Typography sx={{ fontSize: '14px', fontWeight: 500, cursor: 'pointer', '&:hover': { color: '#00827F' } }}>
                    {row.name}
                  </Typography>
                </Box>

                {/* Views */}
                <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>{row.views}</Typography>

                {/* Posts */}
                <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>{row.posts}</Typography>

                {/* Primary Audience */}
                <Box sx={{ width: 120 }}>
                  <LinearProgress
                    variant="determinate"
                    value={row.audience}
                    sx={{
                      height: 6, borderRadius: 3,
                      bgcolor: 'rgba(0,0,0,0.07)',
                      '& .MuiLinearProgress-bar': { bgcolor: '#00827F', borderRadius: 3 },
                    }}
                  />
                </Box>

                {/* Top Countries */}
                <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>{row.countries}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

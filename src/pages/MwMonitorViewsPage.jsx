import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Box, Typography, Button, IconButton, Chip, Tooltip, Menu, MenuItem,
  Divider, LinearProgress,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import RefreshIcon from '@mui/icons-material/Refresh'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import TuneIcon from '@mui/icons-material/Tune'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import TagIcon from '@mui/icons-material/Tag'
import XIcon from '@mui/icons-material/X'
import RedditIcon from '@mui/icons-material/Reddit'
import TvIcon from '@mui/icons-material/Tv'
import RadioIcon from '@mui/icons-material/Radio'
import NewspaperIcon from '@mui/icons-material/Newspaper'

// ── Data ──────────────────────────────────────────────────────────────────────

const VIEW_NAMES = {
  'alinas-view': "Alina's view",
  'michelles':   "Michelle's",
  'diablo':      'Diablo',
}

const AB_ARTICLES = [
  {
    id: 1,
    type: 'x',
    author: 'Hidabed',
    handle: '@hidabed2010',
    source: 'X',
    country: null,
    date: 'Today',
    time: '1:00 PM',
    body: '@20th_Centurygal Alter Bridge',
    tag: 'Alter Bridge',
    sentiment: 'Neutral',
    reach: '168 Reach',
    extra: '2 Views',
    duplicates: 1,
  },
  {
    id: 2,
    type: 'reddit',
    author: 'reddit.com/r/Concerts',
    handle: '666-Trooper-666',
    source: 'Reddit',
    country: null,
    date: 'Today',
    time: '12:54 PM',
    headline: 'What have you guys got upcoming?',
    body: 'Alter Bridge on May 1st George Thorogood and Marshall Tucker Band on May 16th Rush on June 30th Iron Maiden with Anthrax and Megadeth on',
    tag: 'Alter Bridge',
    sentiment: 'Neutral',
    reach: '67.82k Reach',
  },
  {
    id: 3,
    type: 'tv',
    author: 'KOZL (Independent)',
    source: 'TV',
    country: 'US',
    date: 'Today',
    time: '12:10 PM',
    headline: 'Ozarks First Midday News - Fri, 17 Apr 2026 11:10:00 -0500',
    body: 'you have to repay a buyback and laundry bags is just one of alter bridge only holding up premium forum on lawn fertilizer for just seventeen',
    tag: 'alter bridge',
    sentiment: 'Neutral',
    reach: '3.32k Reach',
    ave: '32.07k AVE',
  },
  {
    id: 4,
    type: 'radio',
    author: 'KEZO-FM',
    source: 'Radio',
    country: 'US',
    date: 'Today',
    time: '11:40 AM',
    headline: 'Morning Rock Block - KEZO-FM Omaha',
    body: 'Alter Bridge was featured in the morning rock block segment discussing their upcoming tour dates and new album release.',
    tag: 'Alter Bridge',
    sentiment: 'Neutral',
    reach: '18.5k Reach',
  },
]

const AUS_OPEN_ARTICLES = [
  {
    id: 1,
    type: 'news',
    author: 'Sky Video',
    wire: null,
    source: 'News',
    country: 'IT',
    date: 'Today',
    time: '1:01 PM',
    headline: 'Verso Madrid: senza Alcaraz e Djokovic. Sinner...',
    body: 'in cui il 24 campione Slam ha giocato soltanto due tornei: gli Australian Open, con la finale persa contro Alcaraz, e il Masters 1000 di',
    tag: 'Australian Open',
    sentiment: 'Neutral',
    ave: '$6.9k AVE',
    reach: '745.63k Reach',
    hasImage: true,
  },
  {
    id: 2,
    type: 'news',
    author: 'Hampshire Chronicle',
    wire: 'PA News Agency',
    source: 'News',
    country: 'GB',
    date: 'Today',
    time: '1:00 PM',
    headline: 'Ex-Wimbledon champion Vondrousova says mental stress led to doping incident',
    body: 'tournament since the Adelaide International in January and withdrew from the Australian Open citing a shoulder injury. In December, she had',
    tag: 'Australian Open',
    sentiment: 'Negative',
    ave: '$1.92k AVE',
    reach: '207.8k Reach',
    topReach: '39.02M',
    syndicatedCount: 140,
    hasImage: true,
  },
  {
    id: 3,
    type: 'x',
    author: 'Dorothea Original',
    handle: '@dorothe99794349',
    source: 'X',
    country: 'US',
    date: 'Today',
    time: '1:00 PM',
    body: 'visit, Harry was the keynote speaker at InterEdge Summit at CENTREPIECE in Melbourne Park, where he spoke about grief and loss. He shared',
    tag: 'Australian Open',
    sentiment: 'Neutral',
    reach: '2.1k Reach',
  },
  {
    id: 4,
    type: 'news',
    author: 'The Guardian',
    wire: null,
    source: 'News',
    country: 'GB',
    date: 'Today',
    time: '11:30 AM',
    headline: 'Australian Open prize money reaches record $100 million for 2027 tournament',
    body: 'Tennis Australia has announced a record prize pool for the upcoming Australian Open, with total prize money exceeding $100 million for the first time.',
    tag: 'Australian Open',
    sentiment: 'Neutral',
    ave: '$12.4k AVE',
    reach: '1.23M Reach',
    hasImage: true,
  },
]

// ── Helper components ─────────────────────────────────────────────────────────

function SourceIcon({ type }) {
  const props = { sx: { fontSize: 11 } }
  const map = {
    x:      { icon: <XIcon {...props} />,        bg: '#000',     color: '#fff' },
    reddit: { icon: <RedditIcon {...props} />,   bg: '#FF4500',  color: '#fff' },
    tv:     { icon: <TvIcon {...props} />,        bg: '#2196F3',  color: '#fff' },
    radio:  { icon: <RadioIcon {...props} />,     bg: '#9C27B0',  color: '#fff' },
    news:   { icon: <NewspaperIcon {...props} />, bg: '#607D8B',  color: '#fff' },
  }
  const cfg = map[type] || map.news
  return (
    <Box sx={{ width: 16, height: 16, borderRadius: '3px', bgcolor: cfg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      {cfg.icon}
    </Box>
  )
}

function SentimentChip({ value }) {
  const colors = {
    'Neutral':  { bg: 'rgba(0,0,0,0.06)',  color: 'text.secondary' },
    'Positive': { bg: 'rgba(0,180,80,0.1)', color: '#1a7a45' },
    'Negative': { bg: 'rgba(220,50,50,0.1)', color: '#c0392b' },
  }
  const c = colors[value] || colors['Neutral']
  return (
    <Box
      sx={{
        display: 'inline-flex', alignItems: 'center', gap: 0.5,
        px: 1, py: 0.25, borderRadius: '4px', bgcolor: c.bg,
        fontSize: '11px', color: c.color, cursor: 'pointer',
      }}
    >
      {value}
      <KeyboardArrowDownIcon sx={{ fontSize: 12 }} />
    </Box>
  )
}

function AvatarBox({ letter, bg }) {
  return (
    <Box sx={{ width: 34, height: 34, borderRadius: '50%', bgcolor: bg || '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, color: '#fff', flexShrink: 0 }}>
      {letter}
    </Box>
  )
}

function ArticleCard({ article }) {
  const avatarColors = { x: '#111', reddit: '#FF4500', tv: '#2196F3', radio: '#9C27B0', news: '#607D8B' }
  const letter = article.author.charAt(0).toUpperCase()

  return (
    <Box sx={{ px: 2, py: 2, borderBottom: '1px solid', borderColor: 'divider', '&:hover': { bgcolor: 'rgba(0,0,0,0.015)' }, cursor: 'pointer' }}>
      {/* Header row */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25, mb: 1 }}>
        <CheckBoxOutlineBlankIcon sx={{ fontSize: 16, color: 'text.disabled', mt: 0.15, flexShrink: 0 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1, flexWrap: 'wrap' }}>
          <AvatarBox letter={letter} bg={avatarColors[article.type]} />
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Typography sx={{ fontSize: '13px', fontWeight: 600, color: 'text.primary' }}>{article.author}</Typography>
              {article.handle && (
                <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>• {article.handle}</Typography>
              )}
              {article.wire && (
                <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>• {article.wire}</Typography>
              )}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.15 }}>
              <SourceIcon type={article.type} />
              <Typography sx={{ fontSize: '11px', color: 'text.disabled' }}>
                {article.source}
                {article.country && ` | ${article.country}`}
                {` | ${article.date} • ${article.time}`}
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* Action icons - hidden until hover */}
        <Box sx={{ display: 'flex', gap: 0.25, flexShrink: 0 }}>
          <IconButton size="small" sx={{ p: 0.5 }}><BookmarkBorderIcon sx={{ fontSize: 15 }} /></IconButton>
          <IconButton size="small" sx={{ p: 0.5 }}><ContentCopyOutlinedIcon sx={{ fontSize: 15 }} /></IconButton>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ pl: '42px' }}>
        {/* Image row for news */}
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Box sx={{ flex: 1 }}>
            {article.headline && (
              <Typography sx={{ fontSize: '14px', fontWeight: 600, mb: 0.5, lineHeight: 1.4, color: '#00827F' }}>
                {article.headline}
              </Typography>
            )}
            <Typography sx={{ fontSize: '13px', color: 'text.secondary', lineHeight: 1.5, mb: 1 }}>
              {article.body}
            </Typography>
            {article.topReach && (
              <Typography sx={{ fontSize: '11px', color: 'text.secondary', mb: 0.5 }}>
                Top Reach: {article.topReach} | {article.source} | {article.country} | {article.date} • {article.time}
              </Typography>
            )}
          </Box>
          {article.hasImage && (
            <Box
              sx={{
                width: 72, height: 52, borderRadius: '4px', flexShrink: 0,
                bgcolor: 'rgba(0,0,0,0.08)',
                background: 'linear-gradient(135deg, rgba(0,130,127,0.15) 0%, rgba(155,89,182,0.15) 100%)',
              }}
            />
          )}
        </Box>

        {/* Tag */}
        {article.tag && (
          <Chip
            icon={<TagIcon sx={{ fontSize: '11px !important' }} />}
            label={article.tag}
            size="small"
            sx={{ height: 20, fontSize: '11px', mb: 1, '& .MuiChip-label': { px: 0.75 }, bgcolor: 'rgba(0,0,0,0.05)' }}
          />
        )}

        {/* Metrics row */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          {article.sentiment && <SentimentChip value={article.sentiment} />}
          {article.ave && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25, fontSize: '12px', color: 'text.secondary' }}>
              <AttachMoneyIcon sx={{ fontSize: 13 }} />
              <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>{article.ave}</Typography>
            </Box>
          )}
          {article.reach && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
              <SignalCellularAltIcon sx={{ fontSize: 13, color: 'text.disabled' }} />
              <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>{article.reach}</Typography>
            </Box>
          )}
          {article.extra && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
              <VisibilityOutlinedIcon sx={{ fontSize: 13, color: 'text.disabled' }} />
              <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>{article.extra}</Typography>
            </Box>
          )}
        </Box>

        {/* Syndicated articles */}
        {article.syndicatedCount && (
          <Box
            sx={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              mt: 1, pt: 1, borderTop: '1px solid', borderColor: 'divider',
              cursor: 'pointer',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <ContentCopyOutlinedIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
              <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>
                {article.syndicatedCount} Syndicated Articles
              </Typography>
            </Box>
            <KeyboardArrowDownIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
          </Box>
        )}

        {/* Duplicates */}
        {article.duplicates && (
          <Box
            sx={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              mt: 1, pt: 1, borderTop: '1px solid', borderColor: 'divider',
              cursor: 'pointer',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <ContentCopyOutlinedIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
              <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>
                {article.duplicates} Duplicate Article{article.duplicates > 1 ? 's' : ''}
              </Typography>
            </Box>
            <KeyboardArrowDownIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

function Stream({ title, resultCount, articles }) {
  return (
    <Box sx={{ width: 560, flexShrink: 0, display: 'flex', flexDirection: 'column', borderRight: '1px solid', borderColor: 'divider', height: '100%', overflow: 'hidden' }}>
      {/* Stream header */}
      <Box sx={{ px: 2, py: 1.25, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.75 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <DragIndicatorIcon sx={{ fontSize: 16, color: 'text.disabled', cursor: 'grab' }} />
            <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>{title}</Typography>
            <InfoOutlinedIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Button size="small" variant="outlined" sx={{ fontSize: '12px', py: 0.4, px: 1, minWidth: 0, textTransform: 'none', borderColor: 'divider', color: 'text.primary' }}>Edit</Button>
            <IconButton size="small"><RefreshIcon sx={{ fontSize: 15 }} /></IconButton>
          </Box>
        </Box>

        {/* Results row */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckBoxOutlineBlankIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
            <Typography sx={{ fontSize: '13px', fontWeight: 500 }}>{resultCount} results</Typography>
            <Box sx={{ display: 'flex', gap: 0.25 }}>
              <IconButton size="small" sx={{ p: 0.4 }}><EditOutlinedIcon sx={{ fontSize: 14 }} /></IconButton>
              <IconButton size="small" sx={{ p: 0.4 }}><FileDownloadOutlinedIcon sx={{ fontSize: 14 }} /></IconButton>
              <IconButton size="small" sx={{ p: 0.4 }}><TuneIcon sx={{ fontSize: 14 }} /></IconButton>
              <IconButton size="small" sx={{ p: 0.4 }}><MoreVertIcon sx={{ fontSize: 14 }} /></IconButton>
            </Box>
          </Box>
          <IconButton size="small" sx={{ p: 0.4 }}><SearchIcon sx={{ fontSize: 15 }} /></IconButton>
        </Box>

        {/* Sort row */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.75 }}>
          <FilterListIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
          <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>Sort by:</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25, cursor: 'pointer' }}>
            <Typography sx={{ fontSize: '12px', fontWeight: 500 }}>Date</Typography>
            <KeyboardArrowDownIcon sx={{ fontSize: 14 }} />
          </Box>
          <ArrowUpwardIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
          <KeyboardArrowDownIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
        </Box>
      </Box>

      {/* Articles */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {articles.map(a => <ArticleCard key={a.id} article={a} />)}
      </Box>
    </Box>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function MwMonitorViewsPage() {
  const navigate = useNavigate()
  const { viewId } = useParams()
  const viewName = VIEW_NAMES[viewId] || "Alina's view"
  const [saveAnchor, setSaveAnchor] = useState(null)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'background.default', overflow: 'hidden' }}>
      {/* Top toolbar */}
      <Box
        sx={{
          display: 'flex', alignItems: 'center', gap: 1.5,
          px: 2, py: 1,
          bgcolor: 'background.paper',
          borderBottom: '1px solid', borderColor: 'divider',
          flexShrink: 0,
        }}
      >
        <IconButton size="small" onClick={() => navigate('/mw-monitor')}>
          <ArrowBackIcon sx={{ fontSize: 18 }} />
        </IconButton>

        {/* View name */}
        <Box
          sx={{
            display: 'flex', alignItems: 'center', gap: 0.5,
            px: 1.5, py: 0.6, border: '1px solid', borderColor: 'divider',
            borderRadius: '6px', cursor: 'pointer',
            '&:hover': { bgcolor: 'action.hover' },
          }}
        >
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }}>{viewName}</Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
        </Box>

        {/* Date range */}
        <Box
          sx={{
            display: 'flex', alignItems: 'center', gap: 0.75,
            px: 1.5, py: 0.6, border: '1px solid', borderColor: 'divider',
            borderRadius: '6px', cursor: 'pointer',
            '&:hover': { bgcolor: 'action.hover' },
          }}
        >
          <CalendarTodayOutlinedIcon sx={{ fontSize: 15, color: 'text.secondary' }} />
          <Typography sx={{ fontSize: '13px' }}>Last 7 days</Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
        </Box>

        {/* Refresh interval */}
        <Box
          sx={{
            display: 'flex', alignItems: 'center', gap: 0.75,
            px: 1.5, py: 0.6, border: '1px solid', borderColor: 'divider',
            borderRadius: '6px', cursor: 'pointer',
            '&:hover': { bgcolor: 'action.hover' },
          }}
        >
          <RefreshIcon sx={{ fontSize: 15, color: 'text.secondary' }} />
          <Typography sx={{ fontSize: '13px' }}>Every 10 min</Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
        </Box>

        <Box sx={{ flex: 1 }} />

        {/* Icon actions */}
        <IconButton size="small" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '6px', p: 0.75 }}>
          <BookmarkBorderIcon sx={{ fontSize: 17 }} />
        </IconButton>
        <IconButton size="small" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '6px', p: 0.75 }}>
          <ShareOutlinedIcon sx={{ fontSize: 17 }} />
        </IconButton>

        {/* Add stream */}
        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineIcon sx={{ fontSize: 16 }} />}
          sx={{
            textTransform: 'none', fontSize: '13px', py: 0.6,
            borderColor: 'divider', color: 'text.primary',
            '&:hover': { borderColor: 'rgba(0,0,0,0.3)' },
          }}
        >
          Add stream (2/5)
        </Button>

        {/* Save button */}
        <Box sx={{ display: 'flex' }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#B627A1', color: '#fff', textTransform: 'none',
              fontWeight: 500, '&:hover': { bgcolor: '#9a2088' },
              borderRadius: '6px 0 0 6px', px: 2,
            }}
          >
            Save
          </Button>
          <Button
            onClick={e => setSaveAnchor(e.currentTarget)}
            variant="contained"
            sx={{
              bgcolor: '#B627A1', color: '#fff',
              '&:hover': { bgcolor: '#9a2088' },
              borderRadius: '0 6px 6px 0',
              borderLeft: '1px solid rgba(255,255,255,0.3)',
              minWidth: 32, px: 0.5,
            }}
          >
            <KeyboardArrowDownIcon sx={{ fontSize: 18 }} />
          </Button>
        </Box>
        <Menu anchorEl={saveAnchor} open={Boolean(saveAnchor)} onClose={() => setSaveAnchor(null)}>
          <MenuItem sx={{ fontSize: '14px' }} onClick={() => setSaveAnchor(null)}>Save as new view</MenuItem>
          <MenuItem sx={{ fontSize: '14px' }} onClick={() => setSaveAnchor(null)}>Save and share</MenuItem>
        </Menu>
      </Box>

      {/* Streams area */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <Stream title="AB" resultCount="466" articles={AB_ARTICLES} />
        <Stream title="Australian Open Tennis, AB" resultCount="14.56k" articles={AUS_OPEN_ARTICLES} />

        {/* Empty add-stream column */}
        <Box
          sx={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderLeft: '2px dashed', borderColor: 'divider',
            color: 'text.disabled', cursor: 'pointer', flexDirection: 'column', gap: 1,
            '&:hover': { bgcolor: 'rgba(0,0,0,0.015)', borderColor: 'rgba(0,0,0,0.2)' },
          }}
        >
          <AddCircleOutlineIcon sx={{ fontSize: 28, color: 'text.disabled' }} />
          <Typography sx={{ fontSize: '13px', color: 'text.disabled' }}>Add stream</Typography>
        </Box>
      </Box>
    </Box>
  )
}

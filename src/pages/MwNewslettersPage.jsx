import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Typography, Button, TextField, InputAdornment, Divider,
  IconButton, Tooltip, Menu, MenuItem, LinearProgress, Chip,
  Dialog, DialogContent, ToggleButton, ToggleButtonGroup,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ScheduleIcon from '@mui/icons-material/Schedule'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined'
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'
import ViewStreamOutlinedIcon from '@mui/icons-material/ViewStreamOutlined'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import AllInboxOutlinedIcon from '@mui/icons-material/AllInboxOutlined'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined'

import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined'
import GraphicEqOutlinedIcon from '@mui/icons-material/GraphicEqOutlined'

// ── Constants ─────────────────────────────────────────────────────────────────
const ALL_VIEW_ID = '__all__'
const TEAL        = '#00827F'
const TEAL_LIGHT  = 'rgba(0,130,127,0.08)'
const AMBER       = '#b45309'
const AMBER_LIGHT = 'rgba(245,158,11,0.10)'
const PURPLE      = '#B627A1'

// ── Per-series thumbnail accent colors ────────────────────────────────────────
const SERIES_COLORS = {
  'daily-brief':       '#00827F',  // teal
  'monthly-roundup':   '#B627A1',  // purple
  'media-coverage':    '#e86c5a',  // coral
  'competitor-digest': '#4F6AF5',  // blue
}

// ── Search type config ─────────────────────────────────────────────────────────
const SEARCH_TYPE_CFG = {
  explore: { Icon: SearchIcon,            color: '#4F6AF5', bg: 'rgba(79,106,245,0.10)' },
  rss:     { Icon: DynamicFeedOutlinedIcon, color: '#e86c5a', bg: 'rgba(232,108,90,0.10)' },
  tag:     { label: '#', color: '#7c3aed', bg: 'rgba(124,58,237,0.09)' },
}

// Kept for compatibility — maps old keys to new search type icon style
const SOURCE_CFG = {
  Explore: { Icon: SearchIcon,              color: '#4F6AF5', bg: 'rgba(79,106,245,0.10)' },
  Analyze: { Icon: BarChartOutlinedIcon,    color: '#e86c5a', bg: 'rgba(232,108,90,0.10)' },
  Monitor: { Icon: ViewStreamOutlinedIcon,  color: TEAL,      bg: TEAL_LIGHT },
}

// ── Data ──────────────────────────────────────────────────────────────────────
const SERIES = [
  {
    id: 'daily-brief',
    name: 'The Daily Brief',
    cadence: 'Daily',
    status: 'curating',
    articlesCount: 23,
    progress: 35,
    sources: ['Explore', 'Monitor'],
    searches: [
      { name: 'Brand Monitoring', type: 'explore' },
      { name: 'Meltwater Leadership', type: 'explore' },
      { name: 'TechCrunch', type: 'rss' },
    ],
    recipients: 8,
    nextSend: 'Tomorrow',
    latestLabel: 'April 20, 2026',
    estReady: null,
    description: 'Daily snapshot of brand mentions and industry news from saved searches.',
  },
  {
    id: 'monthly-roundup',
    name: 'Monthly Round Up',
    cadence: 'Monthly',
    status: 'curating',
    articlesCount: 47,
    progress: 68,
    sources: ['Explore', 'Analyze', 'Monitor'],
    searches: [
      { name: 'Meltwater', type: 'explore' },
      { name: 'Google Alerts', type: 'explore' },
      { name: 'SocialReach', type: 'tag' },
      { name: 'TechCrunch', type: 'rss' },
    ],
    recipients: 24,
    nextSend: 'May 1, 2026',
    latestLabel: 'April 2026',
    estReady: 'April 28, 2026',
    description: 'Monthly digest pulling top stories across brand, industry, and social searches.',
  },
  {
    id: 'media-coverage',
    name: 'Media Coverage Monthly',
    cadence: 'Monthly',
    status: 'ready',
    articlesCount: 12,
    progress: 100,
    sources: ['Explore', 'Monitor'],
    searches: [
      { name: 'Meltwater Leadership', type: 'explore' },
      { name: 'Cision', type: 'explore' },
      { name: 'Burrelles', type: 'explore' },
    ],
    recipients: 16,
    nextSend: 'April 22, 2026',
    latestLabel: 'April 2026',
    deadline: 'April 22, 2026',
    daysUntil: 2,
    description: 'Monthly overview of earned media coverage from top monitoring searches.',
  },
  {
    id: 'competitor-digest',
    name: 'Competitor Digest',
    cadence: 'Weekly',
    status: 'curating',
    articlesCount: 12,
    progress: 20,
    sources: ['Explore', 'Analyze'],
    searches: [
      { name: 'Meltwater', type: 'explore' },
      { name: 'LexisNexis Newsdesk', type: 'explore' },
      { name: 'TVEyes', type: 'explore' },
    ],
    recipients: 12,
    nextSend: 'April 25, 2026',
    latestLabel: 'Week of Apr 14',
    estReady: 'April 23, 2026',
    description: 'Weekly competitive intelligence digest from saved competitor searches.',
  },
]

const EDITION_HISTORY = {
  'daily-brief': [
    { label: 'April 19, 2026', sent: 'Apr 19', articles: 6, open: '51%', clicks: '12%' },
    { label: 'April 18, 2026', sent: 'Apr 18', articles: 8, open: '47%', clicks: '9%'  },
    { label: 'April 17, 2026', sent: 'Apr 17', articles: 5, open: '44%', clicks: '11%' },
    { label: 'April 16, 2026', sent: 'Apr 16', articles: 7, open: '39%', clicks: '8%'  },
  ],
  'monthly-roundup': [
    { label: 'March 2026',    sent: 'Mar 1', articles: 8,  open: '42%', clicks: '14%' },
    { label: 'February 2026', sent: 'Feb 1', articles: 12, open: '38%', clicks: '11%' },
    { label: 'January 2026',  sent: 'Jan 1', articles: 10, open: '29%', clicks: '9%'  },
    { label: 'December 2025', sent: 'Dec 2', articles: 14, open: '35%', clicks: '12%' },
  ],
  'media-coverage': [
    { label: 'March 2026',    sent: 'Mar 3', articles: 9,  open: '44%', clicks: '16%' },
    { label: 'February 2026', sent: 'Feb 3', articles: 7,  open: '36%', clicks: '13%' },
    { label: 'January 2026',  sent: 'Jan 2', articles: 11, open: '41%', clicks: '15%' },
  ],
  'competitor-digest': [
    { label: 'Week of Apr 7',  sent: 'Apr 7',  articles: 9,  open: '48%', clicks: '17%' },
    { label: 'Week of Mar 31', sent: 'Mar 31', articles: 11, open: '52%', clicks: '19%' },
    { label: 'Week of Mar 24', sent: 'Mar 24', articles: 8,  open: '44%', clicks: '15%' },
  ],
}

// ── Newsletter icons ──────────────────────────────────────────────────────────
// Single newsletter icon: document outline + solid header band + 3 text lines
function NlIcon({ size = 20, color, sx = {} }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 20 20"
      sx={{ width: size, height: size, flexShrink: 0, display: 'block', color, ...sx }}
    >
      {/* Document outline */}
      <rect x="2.5" y="1.5" width="15" height="17" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* Solid header band */}
      <rect x="2.5" y="1.5" width="15" height="5" rx="1.5" fill="currentColor" />
      {/* Square off the bottom corners of the header band */}
      <rect x="2.5" y="4.5" width="15" height="2" fill="currentColor" />
      {/* Text lines */}
      <rect x="5" y="10" width="10" height="1.5" rx="0.75" fill="currentColor" />
      <rect x="5" y="13" width="7.5" height="1.5" rx="0.75" fill="currentColor" />
      <rect x="5" y="16" width="5" height="1.5" rx="0.75" fill="currentColor" />
    </Box>
  )
}

// Stacked series icon: 3 offset NlIcons with white fills to give paper-stack depth
function NlStackIcon({ size = 18, color }) {
  return (
    <Box sx={{ position: 'relative', width: size + 6, height: size + 6, flexShrink: 0 }}>
      {/* Back icon */}
      <Box sx={{ position: 'absolute', top: 4, left: 4 }}>
        <NlIcon size={size} color={color} />
      </Box>
      {/* White occluder + mid icon */}
      <Box sx={{ position: 'absolute', top: 2, left: 2, width: size, height: size, bgcolor: '#fff', borderRadius: '1px' }} />
      <Box sx={{ position: 'absolute', top: 2, left: 2 }}>
        <NlIcon size={size} color={color} />
      </Box>
      {/* White occluder + front icon */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, width: size, height: size, bgcolor: '#fff', borderRadius: '1px' }} />
      <Box sx={{ position: 'absolute', top: 0, left: 0 }}>
        <NlIcon size={size} color={color} />
      </Box>
    </Box>
  )
}

// ── Atoms ─────────────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  if (status === 'curating') return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.6, bgcolor: TEAL_LIGHT, borderRadius: '4px', px: 0.9, py: 0.3 }}>
      <AutoAwesomeIcon sx={{
        fontSize: 11, color: TEAL, flexShrink: 0,
        '@keyframes ai-pulse': {
          '0%':   { opacity: 1,   transform: 'scale(1)' },
          '50%':  { opacity: 0.5, transform: 'scale(0.85)' },
          '100%': { opacity: 1,   transform: 'scale(1)' },
        },
        animation: 'ai-pulse 1.8s ease-in-out infinite',
      }} />
      <Typography sx={{ fontSize: '11px', color: TEAL, fontWeight: 600, lineHeight: 1 }}>Auto-curating</Typography>
    </Box>
  )
  if (status === 'ready') return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.6, bgcolor: AMBER_LIGHT, borderRadius: '4px', px: 0.9, py: 0.3 }}>
      <CheckCircleOutlineIcon sx={{ fontSize: 11, color: AMBER }} />
      <Typography sx={{ fontSize: '11px', color: AMBER, fontWeight: 600, lineHeight: 1 }}>Ready for review</Typography>
    </Box>
  )
  if (status === 'scheduled') return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.6, bgcolor: 'rgba(182,39,161,0.08)', borderRadius: '4px', px: 0.9, py: 0.3 }}>
      <ScheduleIcon sx={{ fontSize: 11, color: PURPLE }} />
      <Typography sx={{ fontSize: '11px', color: PURPLE, fontWeight: 600, lineHeight: 1 }}>Scheduled</Typography>
    </Box>
  )
  return null
}

function CadenceBadge({ cadence }) {
  return (
    <Box sx={{ display: 'inline-flex', px: 0.9, py: 0.2, bgcolor: 'rgba(0,0,0,0.05)', borderRadius: '4px' }}>
      <Typography sx={{ fontSize: '10px', fontWeight: 700, color: 'text.secondary', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        {cadence}
      </Typography>
    </Box>
  )
}

function SearchPills({ searches = [], max = 3, onEdit }) {
  const visible = searches.slice(0, max)
  const overflow = searches.length - max
  return (
    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', alignItems: 'center' }}>
      {visible.map(s => {
        const cfg = SEARCH_TYPE_CFG[s.type] || SEARCH_TYPE_CFG.explore
        return (
          <Box key={s.name} sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.4, bgcolor: cfg.bg, borderRadius: '4px', px: 0.75, py: 0.25 }}>
            {cfg.Icon
              ? <cfg.Icon sx={{ fontSize: 11, color: cfg.color }} />
              : <Typography sx={{ fontSize: '10px', fontWeight: 800, color: cfg.color, lineHeight: 1 }}>#</Typography>
            }
            <Typography sx={{ fontSize: '11px', fontWeight: 500, color: cfg.color }}>{s.name}</Typography>
          </Box>
        )
      })}
      {overflow > 0 && (
        <Typography sx={{ fontSize: '11px', color: 'text.disabled' }}>+{overflow} more</Typography>
      )}
      {onEdit && (
        <Box
          onClick={onEdit}
          sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.4, px: 0.75, py: 0.25, borderRadius: '4px', border: '1px dashed rgba(0,0,0,0.2)', cursor: 'pointer', '&:hover': { borderColor: TEAL } }}
        >
          <AddIcon sx={{ fontSize: 11, color: 'text.disabled' }} />
          <Typography sx={{ fontSize: '11px', color: 'text.disabled' }}>Edit</Typography>
        </Box>
      )}
    </Box>
  )
}

// kept for backward compat in AllNewslettersInbox
function SourcePills({ sources }) {
  return (
    <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
      {sources.map(src => {
        const { Icon, color, bg } = SOURCE_CFG[src]
        return (
          <Box key={src} sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, bgcolor: bg, borderRadius: '4px', px: 0.9, py: 0.3 }}>
            <Icon sx={{ fontSize: 12, color }} />
            <Typography sx={{ fontSize: '11px', fontWeight: 500, color }}>{src}</Typography>
          </Box>
        )
      })}
    </Box>
  )
}

// ── Newsletter thumbnail ──────────────────────────────────────────────────────
function NewsletterThumbnail({ series, size = 'md' }) {
  const accent  = SERIES_COLORS[series.id] || SOURCE_CFG[series.sources[0]]?.color || TEAL
  const isLg    = size === 'lg'
  const w       = isLg ? 88 : 68
  const h       = isLg ? 110 : 86

  // Vary content rows per series so each looks slightly distinct
  const rows = {
    'daily-brief':      [82, 58, 90, 64, 75, 50],
    'monthly-roundup':  [90, 70, 60, 85, 55, 78],
    'media-coverage':   [75, 55, 88, 62, 70, 48],
    'competitor-digest':[85, 65, 78, 55, 90, 60],
  }[series.id] || [80, 60, 85, 55, 72, 48]

  return (
    <Box sx={{
      width: w, height: h, flexShrink: 0,
      borderRadius: '6px', overflow: 'hidden',
      border: '1px solid rgba(0,0,0,0.13)',
      boxShadow: '0 3px 10px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08)',
      bgcolor: '#fff',
      display: 'flex', flexDirection: 'column',
      userSelect: 'none',
    }}>
      {/* Header bar */}
      <Box sx={{ bgcolor: accent, px: 1, pt: 0.9, pb: 0.75, display: 'flex', alignItems: 'center', gap: 0.6, flexShrink: 0 }}>
        <Box sx={{ width: 8, height: 8, borderRadius: '2px', bgcolor: 'rgba(255,255,255,0.75)', flexShrink: 0 }} />
        <Box sx={{ height: 4, width: 30, borderRadius: '2px', bgcolor: 'rgba(255,255,255,0.55)' }} />
      </Box>

      {/* Hero line */}
      <Box sx={{ px: 0.9, pt: 0.8, pb: 0.5 }}>
        <Box sx={{ height: 4, width: '88%', borderRadius: '2px', bgcolor: 'rgba(0,0,0,0.18)', mb: 0.5 }} />
        <Box sx={{ height: 3, width: '65%', borderRadius: '2px', bgcolor: 'rgba(0,0,0,0.09)' }} />
      </Box>

      {/* Divider */}
      <Box sx={{ height: '1px', mx: 0.9, bgcolor: 'rgba(0,0,0,0.07)', my: 0.5 }} />

      {/* Content rows */}
      <Box sx={{ px: 0.9, display: 'flex', flexDirection: 'column', gap: 0.55, flex: 1 }}>
        {rows.map((pct, i) => (
          <Box key={i} sx={{ height: 3, width: `${pct}%`, borderRadius: '2px', bgcolor: i % 3 === 0 ? `${accent}40` : 'rgba(0,0,0,0.08)' }} />
        ))}
      </Box>

      {/* Footer strip */}
      <Box sx={{ height: 7, bgcolor: 'rgba(0,0,0,0.04)', borderTop: '1px solid rgba(0,0,0,0.06)' }} />
    </Box>
  )
}

// ── Series sidebar item ───────────────────────────────────────────────────────
function SeriesListItem({ series, selected, onClick }) {
  const [anchor, setAnchor] = useState(null)
  return (
    <Box
      onClick={onClick}
      sx={{
        px: 2, py: 1.5, cursor: 'pointer', position: 'relative',
        borderLeft: selected ? `3px solid ${TEAL}` : '3px solid transparent',
        bgcolor: selected ? TEAL_LIGHT : 'transparent',
        '&:hover': { bgcolor: selected ? TEAL_LIGHT : 'action.hover' },
        '&:hover .series-menu-btn': { opacity: 1 },
        borderBottom: '1px solid', borderColor: 'divider',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1.25 }}>
        {/* Stacked NlIcon — 3 offset copies conveys series of newsletters */}
        <NlStackIcon
          size={18}
          color={selected ? TEAL : series.status === 'ready' ? AMBER : 'rgba(0,0,0,0.28)'}
        />

        <Box sx={{ flex: 1, minWidth: 0, pr: 0.5 }}>
          <Typography sx={{ fontSize: '13px', fontWeight: selected ? 700 : 500, mb: 0.5, color: 'text.primary', lineHeight: 1.3 }}>
            {series.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexWrap: 'wrap' }}>
            <CadenceBadge cadence={series.cadence} />
            <StatusBadge status={series.status} />
          </Box>
          <Typography sx={{ fontSize: '11px', color: series.status === 'ready' ? AMBER : 'text.disabled', mt: 0.5 }}>
            {series.status === 'curating' && `${series.articlesCount} articles curated so far`}
            {series.status === 'ready' && `${series.articlesCount} articles · send by ${series.daysUntil}d`}
          </Typography>
        </Box>
        <IconButton
          className="series-menu-btn"
          size="small"
          sx={{ p: 0.25, flexShrink: 0, opacity: 0, transition: 'opacity 0.15s' }}
          onClick={e => { e.stopPropagation(); setAnchor(e.currentTarget) }}
        >
          <MoreVertIcon sx={{ fontSize: 15 }} />
        </IconButton>
      </Box>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
        {['Edit series settings', 'Manage recipients', 'Duplicate series'].map(label => (
          <MenuItem key={label} sx={{ fontSize: '13px' }} onClick={() => setAnchor(null)}>{label}</MenuItem>
        ))}
        <Divider />
        <MenuItem sx={{ fontSize: '13px', color: 'error.main' }} onClick={() => setAnchor(null)}>Delete series</MenuItem>
      </Menu>
    </Box>
  )
}

// ── Latest edition card ───────────────────────────────────────────────────────
function LatestEditionCard({ series, onEdit }) {
  const isCurating = series.status === 'curating'
  const isReady    = series.status === 'ready'
  const borderColor = isReady ? AMBER : TEAL
  const headerBg    = isReady ? AMBER_LIGHT : TEAL_LIGHT

  return (
    <Box sx={{ border: `1.5px solid ${borderColor}`, borderRadius: '10px', overflow: 'hidden', mb: 3, bgcolor: 'background.paper', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
      {/* Header strip */}
      <Box sx={{ px: 2.5, py: 1.5, bgcolor: headerBg, borderBottom: `1px solid ${isReady ? 'rgba(245,158,11,0.2)' : 'rgba(0,130,127,0.15)'}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <NlIcon size={22} color={isReady ? AMBER : TEAL} />
          <Box>
            <Typography sx={{ fontSize: '13px', fontWeight: 700, color: 'text.primary' }}>{series.latestLabel} Edition</Typography>
            <Typography sx={{ fontSize: '11px', color: 'text.secondary' }}>Latest · In progress</Typography>
          </Box>
        </Box>
        <StatusBadge status={series.status} />
      </Box>

      {/* Body */}
      <Box sx={{ px: 2.5, py: 2 }}>
        {isCurating && (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.25 }}>
              <AutoAwesomeIcon sx={{ fontSize: 14, color: TEAL }} />
              <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>
                AI is curating content from <strong>{series.sources.length} sources</strong>
              </Typography>
            </Box>
            <Box sx={{ mb: 0.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>{series.articlesCount} articles curated</Typography>
                <Typography sx={{ fontSize: '12px', fontWeight: 700, color: TEAL }}>{series.progress}%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={series.progress} sx={{ height: 5, borderRadius: 3, bgcolor: 'rgba(0,0,0,0.07)', '& .MuiLinearProgress-bar': { bgcolor: TEAL, borderRadius: 3 } }} />
            </Box>
            {series.estReady && (
              <Typography sx={{ fontSize: '12px', color: 'text.disabled', mt: 0.5, mb: 2 }}>
                Estimated ready: {series.estReady}
              </Typography>
            )}
          </>
        )}

        {isReady && (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <CheckCircleOutlineIcon sx={{ fontSize: 14, color: TEAL }} />
              <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>
                <strong>{series.articlesCount} articles</strong> curated and ready for your review
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, p: 1.25, bgcolor: AMBER_LIGHT, borderRadius: '6px', border: '1px solid rgba(245,158,11,0.2)' }}>
              <WarningAmberIcon sx={{ fontSize: 14, color: AMBER }} />
              <Typography sx={{ fontSize: '12px', color: AMBER }}>
                Send by: <strong>{series.deadline}</strong>
                {series.daysUntil != null && ` (${series.daysUntil} days away)`}
              </Typography>
            </Box>
          </>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: isCurating && !series.estReady ? 2 : 0 }}>
          <SearchPills searches={series.searches} max={3} />
          <Box sx={{ display: 'flex', gap: 1, ml: 1 }}>
            {isCurating && (
              <Button size="small" variant="outlined" onClick={() => onEdit(series.id)} sx={{ textTransform: 'none', fontSize: '12px', borderColor: 'divider', color: 'text.secondary', py: 0.5 }}>
                Preview draft
              </Button>
            )}
            <Button
              size="small"
              variant="contained"
              endIcon={<ArrowForwardIcon sx={{ fontSize: 14 }} />}
              onClick={() => onEdit(series.id)}
              sx={{ textTransform: 'none', fontSize: '12px', py: 0.5, fontWeight: 600, color: '#fff', bgcolor: isReady ? AMBER : TEAL, '&:hover': { bgcolor: isReady ? '#9a4e08' : '#006e6b' } }}
            >
              {isReady ? 'Review & Edit' : 'Open in editor'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

// ── Previous editions table row ───────────────────────────────────────────────
function EditionRow({ edition, seriesId }) {
  const navigate = useNavigate()
  return (
    <Box
      onClick={() => navigate(`/mw-newsletters/editor/${seriesId}`)}
      sx={{
        display: 'flex', alignItems: 'center', px: 2.5, py: 1.5,
        borderBottom: '1px solid', borderColor: 'divider', cursor: 'pointer',
        '&:hover': { bgcolor: 'rgba(0,0,0,0.015)' },
        '&:hover .ed-action': { opacity: 1 },
        '&:last-child': { borderBottom: 'none' },
      }}
    >
      <NlIcon size={20} color={TEAL} sx={{ mr: 1.5, opacity: 0.7 }} />
      <Box sx={{ flex: 1 }}>
        <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>{edition.label}</Typography>
        <Typography sx={{ fontSize: '11px', color: 'text.disabled' }}>Sent {edition.sent} · {edition.articles} articles</Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 3, mr: 2 }}>
        {[{ val: edition.open, label: 'Open' }, { val: edition.clicks, label: 'Clicks' }].map(m => (
          <Box key={m.label} sx={{ textAlign: 'center', minWidth: 44 }}>
            <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>{m.val}</Typography>
            <Typography sx={{ fontSize: '10px', color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{m.label}</Typography>
          </Box>
        ))}
      </Box>
      <Tooltip title="View edition">
        <IconButton className="ed-action" size="small" sx={{ opacity: 0, transition: 'opacity 0.15s' }} onClick={e => e.stopPropagation()}>
          <OpenInNewIcon sx={{ fontSize: 14 }} />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

// ── Series detail right panel ─────────────────────────────────────────────────
function SeriesDetail({ series }) {
  const navigate = useNavigate()
  const editions = EDITION_HISTORY[series.id] || []
  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      {/* Header */}
      <Box sx={{ px: 3, pt: 3, pb: 2.5, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1.5, gap: 2 }}>
          {/* Left: thumbnail + title block */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, flex: 1, minWidth: 0 }}>
            <NewsletterThumbnail series={series} size="lg" />
            <Box sx={{ minWidth: 0, pt: 0.25 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '20px' }}>{series.name}</Typography>
                <CadenceBadge cadence={series.cadence} />
              </Box>
              <Typography sx={{ fontSize: '13px', color: 'text.secondary', maxWidth: 480 }}>{series.description}</Typography>
            </Box>
          </Box>

          {/* Right: action buttons */}
          <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
            <Button size="small" startIcon={<PeopleOutlineIcon sx={{ fontSize: 15 }} />} variant="outlined" sx={{ textTransform: 'none', fontSize: '12px', borderColor: 'divider', color: 'text.secondary', py: 0.5 }}>
              {series.recipients} recipients
            </Button>
            <Button size="small" startIcon={<AutoAwesomeIcon sx={{ fontSize: 15 }} />} variant="outlined" sx={{ textTransform: 'none', fontSize: '12px', borderColor: 'divider', color: 'text.secondary', py: 0.5 }}>
              Curation settings
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <CalendarTodayOutlinedIcon sx={{ fontSize: 13, color: 'text.disabled' }} />
            <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>Next send: <strong>{series.nextSend}</strong></Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>Searches:</Typography>
            <SearchPills searches={series.searches} max={4} />
          </Box>
        </Box>
      </Box>

      {/* Performance metrics strip */}
      {editions.length > 0 && (() => {
        const opens  = editions.map(e => parseFloat(e.open))
        const clicks = editions.map(e => parseFloat(e.clicks))
        const avgOpen   = (opens.reduce((a, b) => a + b, 0) / opens.length).toFixed(1)
        const avgClicks = (clicks.reduce((a, b) => a + b, 0) / clicks.length).toFixed(1)
        const avgArticles = (editions.reduce((a, e) => a + e.articles, 0) / editions.length).toFixed(1)
        const openTrend   = opens[0]   - (opens[1]   ?? opens[0])
        const clickTrend  = clicks[0]  - (clicks[1]  ?? clicks[0])

        const metrics = [
          { label: 'Avg Open Rate',   value: `${avgOpen}%`,    trend: openTrend,  trendLabel: 'vs prev edition', color: TEAL },
          { label: 'Avg Click Rate',  value: `${avgClicks}%`,  trend: clickTrend, trendLabel: 'vs prev edition', color: TEAL },
          { label: 'Editions Sent',   value: editions.length,  trend: null,       trendLabel: 'total sent',       color: null },
          { label: 'Avg Articles',    value: avgArticles,      trend: null,       trendLabel: 'per edition',      color: null },
          { label: 'Recipients',      value: series.recipients, trend: null,      trendLabel: 'subscribers',      color: null },
        ]

        return (
          <Box sx={{ px: 3, py: 1.5, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', display: 'flex', alignItems: 'center', gap: 0 }}>
            <Typography sx={{ fontSize: '10px', fontWeight: 700, color: 'text.disabled', letterSpacing: '0.08em', textTransform: 'uppercase', mr: 2, flexShrink: 0 }}>
              Performance
            </Typography>
            <Box sx={{ display: 'flex', flex: 1, gap: 0, border: '1px solid', borderColor: 'divider', borderRadius: '8px', overflow: 'hidden', bgcolor: 'background.paper' }}>
              {metrics.map((m, i) => (
                <Box
                  key={m.label}
                  sx={{
                    flex: 1, px: 1.5, py: 1,
                    borderRight: i < metrics.length - 1 ? '1px solid' : 'none',
                    borderColor: 'divider',
                    display: 'flex', alignItems: 'baseline', gap: 1,
                  }}
                >
                  <Typography sx={{ fontSize: '15px', fontWeight: 700, color: 'text.primary', lineHeight: 1, flexShrink: 0 }}>
                    {m.value}
                  </Typography>
                  <Box>
                    <Typography sx={{ fontSize: '11px', color: 'text.secondary', fontWeight: 500, lineHeight: 1.2 }}>
                      {m.label}
                    </Typography>
                    {m.trend !== null ? (
                      <Typography sx={{
                        fontSize: '10px', fontWeight: 600,
                        color: m.trend > 0 ? '#16a34a' : m.trend < 0 ? '#dc2626' : 'text.disabled',
                      }}>
                        {m.trend > 0 ? `↑ +${m.trend.toFixed(1)}%` : m.trend < 0 ? `↓ ${m.trend.toFixed(1)}%` : '—'}
                      </Typography>
                    ) : (
                      <Typography sx={{ fontSize: '10px', color: 'text.disabled' }}>{m.trendLabel}</Typography>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        )
      })()}

      {/* Content */}
      <Box sx={{ p: 3 }}>
        <Typography sx={{ fontSize: '11px', fontWeight: 700, color: 'text.disabled', letterSpacing: '0.08em', textTransform: 'uppercase', mb: 1.5 }}>
          Next Edition
        </Typography>
        <LatestEditionCard series={series} onEdit={() => navigate(`/mw-newsletters/editor/${series.id}`)} />

        {editions.length > 0 && (
          <>
            <Typography sx={{ fontSize: '11px', fontWeight: 700, color: 'text.disabled', letterSpacing: '0.08em', textTransform: 'uppercase', mb: 1 }}>
              Sent ({editions.length})
            </Typography>
            <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '8px', overflow: 'hidden', bgcolor: 'background.paper' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', px: 2.5, py: 1, bgcolor: 'rgba(0,0,0,0.02)', borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography sx={{ flex: 1, fontSize: '11px', fontWeight: 700, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Edition</Typography>
                <Box sx={{ display: 'flex', gap: 3, mr: 2 }}>
                  {['Open', 'Clicks'].map(h => (
                    <Typography key={h} sx={{ fontSize: '11px', fontWeight: 700, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.06em', width: 40, textAlign: 'center' }}>{h}</Typography>
                  ))}
                </Box>
                <Box sx={{ width: 28 }} />
              </Box>
              {editions.map(ed => <EditionRow key={ed.label} edition={ed} seriesId={series.id} />)}
            </Box>
          </>
        )}
      </Box>
    </Box>
  )
}

// ── Stacked thumbnails ────────────────────────────────────────────────────────
function StackedThumbnails() {
  // Show the first 3 series as a fanned stack, front-to-back
  const stack = [...SERIES].slice(0, 3).reverse()
  const w = 68, h = 86

  return (
    <Box sx={{ position: 'relative', width: w + 20, height: h + 12, flexShrink: 0 }}>
      {stack.map((series, i) => {
        const isFront  = i === stack.length - 1
        const backness = stack.length - 1 - i          // 0 = front
        const rotate   = backness === 0 ? 0 : backness === 1 ? -5 : -9
        const tx       = backness === 0 ? 10 : backness === 1 ? 4 : 0
        const ty       = backness === 0 ? 12 : backness === 1 ? 6 : 0
        return (
          <Box
            key={series.id}
            sx={{
              position: 'absolute',
              top: ty, left: tx,
              zIndex: i + 1,
              transform: `rotate(${rotate}deg)`,
              transformOrigin: 'bottom center',
              opacity: isFront ? 1 : 0.75 - backness * 0.1,
              filter: isFront ? 'none' : `brightness(${1 - backness * 0.06})`,
            }}
          >
            <NewsletterThumbnail series={series} size="md" />
          </Box>
        )
      })}
    </Box>
  )
}

// ── All Newsletters inbox ─────────────────────────────────────────────────────

const STATUS_ORDER = { ready: 0, curating: 1, sent: 2 }
const COL_GRID = '2fr 140px 90px 90px 90px 90px 140px'

// Date→numeric map for sorting mock data
const DATE_SORT = {
  'Tomorrow': 20260421, 'April 22, 2026': 20260422, 'April 25, 2026': 20260425,
  'May 1, 2026': 20260501,
  'Apr 19': 20260419, 'Apr 18': 20260418, 'Apr 17': 20260417, 'Apr 16': 20260416,
  'Apr 7': 20260407, 'Mar 31': 20260331, 'Mar 24': 20260324,
  'Mar 1': 20260301, 'Mar 3': 20260303,
  'Feb 1': 20260201, 'Feb 3': 20260203,
  'Jan 1': 20260101, 'Jan 2': 20260102,
  'Dec 2': 20251202,
}

// Build unified flat item list from SERIES + EDITION_HISTORY
const buildInboxItems = () => {
  const inProgress = SERIES.map(s => ({
    _key: `ip-${s.id}`,
    type: 'inprogress',
    series: s,
    editionLabel: s.latestLabel,
    status: s.status,
    date: s.nextSend,
    dateSortVal: DATE_SORT[s.nextSend] ?? 99999999,
    articles: s.articlesCount,
    recipients: s.recipients,
    open: null,
    clicks: null,
  }))
  const sent = SERIES.flatMap(s =>
    (EDITION_HISTORY[s.id] || []).map((ed, i) => ({
      _key: `sent-${s.id}-${i}`,
      type: 'sent',
      series: s,
      editionLabel: ed.label,
      status: 'sent',
      date: ed.sent,
      dateSortVal: DATE_SORT[ed.sent] ?? 0,
      articles: ed.articles,
      recipients: s.recipients,
      open: parseFloat(ed.open),
      clicks: parseFloat(ed.clicks),
    }))
  )
  return [...inProgress, ...sent]
}
const ALL_INBOX_ITEMS = buildInboxItems()

// ── Sort header cell ──────────────────────────────────────────────────────────
function SortHeader({ colKey, label, align, sortCol, sortDir, onSort }) {
  const active = sortCol === colKey
  return (
    <Box
      onClick={() => onSort(colKey)}
      sx={{
        display: 'flex', alignItems: 'center', gap: 0.5,
        justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
        cursor: 'pointer', userSelect: 'none',
        '&:hover .sort-arrows': { opacity: 0.7 },
      }}
    >
      <Typography sx={{
        fontSize: '11px', fontWeight: active ? 700 : 600,
        color: active ? TEAL : 'text.disabled',
        textTransform: 'uppercase', letterSpacing: '0.06em',
      }}>
        {label}
      </Typography>
      <Box className="sort-arrows" sx={{ display: 'flex', flexDirection: 'column', gap: '1px', opacity: active ? 1 : 0.35, transition: 'opacity 0.15s' }}>
        <Box sx={{ width: 0, height: 0, borderLeft: '3px solid transparent', borderRight: '3px solid transparent', borderBottom: `4px solid ${active && sortDir === 'asc' ? TEAL : '#999'}` }} />
        <Box sx={{ width: 0, height: 0, borderLeft: '3px solid transparent', borderRight: '3px solid transparent', borderTop: `4px solid ${active && sortDir === 'desc' ? TEAL : '#999'}` }} />
      </Box>
    </Box>
  )
}

// ── Inbox row ─────────────────────────────────────────────────────────────────
function InboxRow({ item }) {
  const navigate = useNavigate()
  const [menuAnchor, setMenuAnchor] = useState(null)
  const isReady    = item.status === 'ready'
  const isCurating = item.status === 'curating'
  const isSent     = item.status === 'sent'

  const openMenu = e => { e.stopPropagation(); setMenuAnchor(e.currentTarget) }
  const closeMenu = () => setMenuAnchor(null)

  // Context-appropriate menu items per status
  const menuItems = isSent
    ? [
        { label: 'View edition',          icon: <OpenInNewIcon sx={{ fontSize: 15 }} /> },
        { label: 'View analytics',         icon: <BarChartOutlinedIcon sx={{ fontSize: 15 }} /> },
        { label: 'Download PDF',           icon: <AllInboxOutlinedIcon sx={{ fontSize: 15 }} /> },
        'divider',
        { label: 'Generate audio podcast',  icon: <GraphicEqOutlinedIcon sx={{ fontSize: 15 }} /> },
        { label: 'Resend to new recipients', icon: <SendOutlinedIcon sx={{ fontSize: 15 }} /> },
        { label: 'Duplicate edition',      icon: <ViewStreamOutlinedIcon sx={{ fontSize: 15 }} /> },
        'divider',
        { label: 'Delete record', icon: null, danger: true },
      ]
    : isReady
    ? [
        { label: 'Review & Edit',          icon: <OpenInNewIcon sx={{ fontSize: 15 }} />, primary: true },
        { label: 'Schedule send',          icon: <AccessTimeOutlinedIcon sx={{ fontSize: 15 }} /> },
        'divider',
        { label: 'Edit series settings',   icon: <SettingsOutlinedIcon sx={{ fontSize: 15 }} /> },
        { label: 'Manage recipients',      icon: <PeopleOutlineIcon sx={{ fontSize: 15 }} /> },
        { label: 'Duplicate series',       icon: <ViewStreamOutlinedIcon sx={{ fontSize: 15 }} /> },
        'divider',
        { label: 'Delete edition', icon: null, danger: true },
      ]
    : [
        { label: 'Open in editor',         icon: <OpenInNewIcon sx={{ fontSize: 15 }} />, primary: true },
        { label: 'Preview draft',          icon: <AllInboxOutlinedIcon sx={{ fontSize: 15 }} /> },
        'divider',
        { label: 'Edit series settings',   icon: <SettingsOutlinedIcon sx={{ fontSize: 15 }} /> },
        { label: 'Manage recipients',      icon: <PeopleOutlineIcon sx={{ fontSize: 15 }} /> },
        { label: 'Duplicate series',       icon: <ViewStreamOutlinedIcon sx={{ fontSize: 15 }} /> },
        'divider',
        { label: 'Pause curating', icon: null, danger: true },
      ]

  return (
    <>
      <Box
        onClick={() => navigate(`/mw-newsletters/editor/${item.series.id}`)}
        sx={{
          display: 'grid', gridTemplateColumns: COL_GRID, alignItems: 'center',
          px: 2.5, py: 1.5, gap: 1.5,
          borderBottom: '1px solid', borderColor: 'divider', cursor: 'pointer',
          bgcolor: isReady ? 'rgba(245,158,11,0.07)' : isCurating ? 'rgba(0,130,127,0.04)' : 'transparent',
          '&:hover': { bgcolor: 'rgba(0,0,0,0.025)' },
          '&:hover .row-kebab': { opacity: 1 },
        }}
      >
        {/* Edition — date as primary title, series + status as secondary */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
          <NlIcon
            size={18}
            color={isSent ? 'rgba(0,0,0,0.22)' : isReady ? AMBER : TEAL}
            sx={{ flexShrink: 0 }}
          />
          <Box sx={{ minWidth: 0 }}>
            {/* Date title + status badge on same line */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.4 }}>
              <Typography sx={{ fontSize: '13px', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flexShrink: 1, minWidth: 0 }}>
                {item.editionLabel}
              </Typography>
              <Box sx={{ flexShrink: 0 }}>
                {isSent
                  ? <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.4, bgcolor: 'rgba(0,0,0,0.05)', borderRadius: '4px', px: 0.75, py: 0.2 }}>
                      <SendOutlinedIcon sx={{ fontSize: 10, color: 'text.disabled' }} />
                      <Typography sx={{ fontSize: '10px', color: 'text.secondary', fontWeight: 500, lineHeight: 1 }}>Sent</Typography>
                    </Box>
                  : <StatusBadge status={item.status} />
                }
              </Box>
            </Box>
            {/* Series name alone on second line — full width, no crowding */}
            <Typography sx={{ fontSize: '11px', color: 'text.secondary', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {item.series.name}
            </Typography>
          </Box>
        </Box>

        {/* Send Date */}
        <Box>
          <Typography sx={{ fontSize: '13px', color: 'text.primary', fontWeight: 500 }}>{item.date}</Typography>
          {!isSent && (
            <Typography sx={{ fontSize: '10px', color: 'text.disabled', mt: 0.3 }}>
              {isReady ? 'send by' : 'next send'}
            </Typography>
          )}
        </Box>

        {/* Recipients */}
        <Box sx={{ textAlign: 'right' }}>
          <Typography sx={{ fontSize: '13px', fontWeight: 500 }}>{item.recipients}</Typography>
        </Box>

        {/* Articles */}
        <Box sx={{ textAlign: 'right' }}>
          <Typography sx={{ fontSize: '13px', fontWeight: 500 }}>{item.articles}</Typography>
        </Box>

        {/* Open */}
        <Box sx={{ textAlign: 'right' }}>
          {item.open != null
            ? <Typography sx={{ fontSize: '13px', fontWeight: 600, color: item.open >= 45 ? TEAL : 'text.primary' }}>{item.open}%</Typography>
            : <Typography sx={{ fontSize: '13px', color: 'text.disabled' }}>—</Typography>
          }
        </Box>

        {/* Clicks */}
        <Box sx={{ textAlign: 'right' }}>
          {item.clicks != null
            ? <Typography sx={{ fontSize: '13px', fontWeight: 600, color: item.clicks >= 15 ? TEAL : 'text.primary' }}>{item.clicks}%</Typography>
            : <Typography sx={{ fontSize: '13px', color: 'text.disabled' }}>—</Typography>
          }
        </Box>

        {/* Action: primary CTA + hover kebab */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
          {!isSent
            ? <Button
                size="small"
                variant={isReady ? 'contained' : 'outlined'}
                onClick={e => { e.stopPropagation(); navigate(`/mw-newsletters/editor/${item.series.id}`) }}
                sx={{
                  textTransform: 'none', fontSize: '11px', py: 0.4, px: 1.25,
                  fontWeight: 600, whiteSpace: 'nowrap',
                  ...(isReady
                    ? { bgcolor: AMBER, '&:hover': { bgcolor: '#9a4e08' }, color: '#fff' }
                    : { borderColor: 'divider', color: 'text.secondary' }
                  ),
                }}
              >
                {isReady ? 'Review & Edit' : 'Preview'}
              </Button>
            : <Tooltip title="View edition">
                <IconButton
                  size="small"
                  onClick={e => e.stopPropagation()}
                  sx={{ color: 'text.disabled' }}
                >
                  <OpenInNewIcon sx={{ fontSize: 14 }} />
                </IconButton>
              </Tooltip>
          }
          <Tooltip title="More options">
            <IconButton
              className="row-kebab"
              size="small"
              onClick={openMenu}
              sx={{
                opacity: 0, transition: 'opacity 0.15s',
                color: 'text.secondary',
                '&:hover': { color: 'text.primary', bgcolor: 'rgba(0,0,0,0.06)' },
              }}
            >
              <MoreVertIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Kebab menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={closeMenu}
        onClick={e => e.stopPropagation()}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{ sx: { minWidth: 210, boxShadow: '0 4px 20px rgba(0,0,0,0.12)', borderRadius: '8px', mt: 0.5 } }}
      >
        {menuItems.map((item, i) =>
          item === 'divider'
            ? <Divider key={`div-${i}`} sx={{ my: 0.5 }} />
            : <MenuItem
                key={item.label}
                onClick={closeMenu}
                sx={{
                  fontSize: '13px', gap: 1.25, py: 0.9, px: 2,
                  color: item.danger ? 'error.main' : item.primary ? TEAL : 'text.primary',
                  fontWeight: item.primary ? 600 : 400,
                  '& svg': { color: item.danger ? 'error.main' : item.primary ? TEAL : 'text.disabled' },
                }}
              >
                {item.icon}
                {item.label}
              </MenuItem>
        )}
      </Menu>
    </>
  )
}

// ── All Newsletters main view ─────────────────────────────────────────────────
function AllNewslettersInbox() {
  const [filter,  setFilter]  = useState('all')
  const [sortCol, setSortCol] = useState('date')
  const [sortDir, setSortDir] = useState('desc')

  const handleSort = col => {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortCol(col); setSortDir('desc') }
  }

  const sentCount     = ALL_INBOX_ITEMS.filter(i => i.type === 'sent').length
  const readyCount    = SERIES.filter(s => s.status === 'ready').length
  const curatingCount = SERIES.filter(s => s.status === 'curating').length

  const filtered = ALL_INBOX_ITEMS.filter(item => {
    if (filter === 'inprogress') return item.type === 'inprogress'
    if (filter === 'sent')       return item.type === 'sent'
    return true
  })

  const sorted = [...filtered].sort((a, b) => {
    let av, bv
    switch (sortCol) {
      case 'edition':    av = `${a.series.name} ${a.editionLabel}`;   bv = `${b.series.name} ${b.editionLabel}`; break
      case 'status':     av = STATUS_ORDER[a.status] ?? 9;             bv = STATUS_ORDER[b.status] ?? 9;           break
      case 'date':       av = a.dateSortVal;                           bv = b.dateSortVal;                         break
      case 'recipients': av = a.recipients;                            bv = b.recipients;                          break
      case 'articles':   av = a.articles;                              bv = b.articles;                            break
      case 'open':       av = a.open   ?? -1;                          bv = b.open   ?? -1;                        break
      case 'clicks':     av = a.clicks ?? -1;                          bv = b.clicks ?? -1;                        break
      default: return 0
    }
    if (typeof av === 'string') return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
    return sortDir === 'asc' ? av - bv : bv - av
  })

  const HEADER_COLS = [
    { key: 'edition',    label: 'Edition',     align: 'left'  },
    { key: 'date',       label: 'Send Date',   align: 'left'  },
    { key: 'recipients', label: 'Recipients',  align: 'right' },
    { key: 'articles',   label: 'Articles',    align: 'right' },
    { key: 'open',       label: 'Open',        align: 'right' },
    { key: 'clicks',     label: 'Clicks',      align: 'right' },
    { key: '_action',    label: '',            align: 'right', noSort: true },
  ]

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <Box sx={{ px: 3, pt: 3, pb: 2, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', flexShrink: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
            <StackedThumbnails />
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: '20px', mb: 0.25 }}>All Newsletters</Typography>
              <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>
                {SERIES.length} series · {sentCount} sent editions
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {readyCount > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, bgcolor: AMBER_LIGHT, borderRadius: '6px', px: 1.25, py: 0.5 }}>
                <WarningAmberIcon sx={{ fontSize: 13, color: AMBER }} />
                <Typography sx={{ fontSize: '12px', fontWeight: 700, color: AMBER }}>{readyCount} need review</Typography>
              </Box>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, bgcolor: TEAL_LIGHT, borderRadius: '6px', px: 1.25, py: 0.5 }}>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: TEAL, '@keyframes blink': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.3 } }, animation: 'blink 1.8s ease-in-out infinite' }} />
              <Typography sx={{ fontSize: '12px', fontWeight: 700, color: TEAL }}>{curatingCount} auto-curating</Typography>
            </Box>
          </Box>
        </Box>

        {/* Filter tabs */}
        <Box sx={{ display: 'flex', gap: 0.75 }}>
          {[
            { key: 'all',        label: 'All',         count: ALL_INBOX_ITEMS.length },
            { key: 'inprogress', label: 'In Progress', count: SERIES.length },
            { key: 'sent',       label: 'Sent',        count: sentCount },
          ].map(tab => (
            <Box
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              sx={{
                display: 'inline-flex', alignItems: 'center', gap: 0.75,
                px: 1.25, py: 0.5, borderRadius: '6px', cursor: 'pointer',
                bgcolor: filter === tab.key ? TEAL_LIGHT : 'transparent',
                border: `1px solid ${filter === tab.key ? 'rgba(0,130,127,0.25)' : 'divider'}`,
                '&:hover': { bgcolor: filter === tab.key ? TEAL_LIGHT : 'rgba(0,0,0,0.04)' },
              }}
            >
              <Typography sx={{ fontSize: '12px', fontWeight: filter === tab.key ? 700 : 500, color: filter === tab.key ? TEAL : 'text.secondary' }}>
                {tab.label}
              </Typography>
              <Box sx={{ bgcolor: filter === tab.key ? 'rgba(0,130,127,0.15)' : 'rgba(0,0,0,0.07)', borderRadius: '10px', px: 0.75, py: 0.1 }}>
                <Typography sx={{ fontSize: '10px', fontWeight: 700, color: filter === tab.key ? TEAL : 'text.secondary' }}>{tab.count}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Sortable column header */}
      <Box sx={{ display: 'grid', gridTemplateColumns: COL_GRID, alignItems: 'center', px: 2.5, py: 1, gap: 1.5, bgcolor: 'rgba(0,0,0,0.025)', borderBottom: '1px solid', borderColor: 'divider', flexShrink: 0 }}>
        {HEADER_COLS.map(col => (
          col.noSort
            ? <Box key={col.key} />
            : <SortHeader key={col.key} colKey={col.key} label={col.label} align={col.align} sortCol={sortCol} sortDir={sortDir} onSort={handleSort} />
        ))}
      </Box>

      {/* Rows */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {sorted.map(item => <InboxRow key={item._key} item={item} />)}
        {sorted.length === 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 120 }}>
            <Typography sx={{ color: 'text.disabled', fontSize: '13px' }}>No editions found</Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

// ── New Series Modal ──────────────────────────────────────────────────────────
const CADENCES = ['Daily', 'Weekly', 'Monthly']

const MODAL_SEARCHES = {
  'Explore Search': [
    { name: 'Meltwater Leadership', type: 'explore' },
    { name: 'Meltwater', type: 'explore' },
    { name: 'Google Alerts', type: 'explore' },
    { name: 'Cision', type: 'explore' },
    { name: 'Burrelles', type: 'explore' },
    { name: 'TVEyes', type: 'explore' },
    { name: 'LexisNexis Newsdesk', type: 'explore' },
  ],
  'RSS Feeds': [
    { name: 'TechCrunch', type: 'rss' },
    { name: 'PR Week RSS', type: 'rss' },
    { name: 'Digiday Feed', type: 'rss' },
  ],
  'Tags': [
    { name: 'SocialReach', type: 'tag' },
    { name: 'BrandHealth', type: 'tag' },
  ],
}

const MODAL_SEARCH_ICON = {
  explore: { Icon: SearchIcon,             color: '#4F6AF5' },
  rss:     { Icon: DynamicFeedOutlinedIcon, color: '#e86c5a' },
  tag:     { Icon: null,                   color: '#7c3aed' },
}

const PROMPT_EXAMPLES = [
  {
    label: 'Brand coverage digest',
    prompt: 'Curate the top 5–8 earned media articles mentioning our brand this week. Prioritise tier-1 outlets, positive sentiment, and coverage that drives brand awareness. Skip press releases and syndicated wire copy.',
  },
  {
    label: 'Competitive intelligence',
    prompt: 'Surface the most significant news about our top 3 competitors. Focus on product launches, leadership changes, funding announcements, and negative press. Include share-of-voice shifts from Analyze.',
  },
  {
    label: 'Industry trends roundup',
    prompt: 'Find the most-read industry articles relevant to our sector this month. Include analyst commentary, regulatory updates, and emerging technology stories. Avoid opinion pieces unless from recognised thought leaders.',
  },
  {
    label: 'Crisis & reputation monitoring',
    prompt: 'Identify any articles with negative or critical sentiment about our brand or sector. Flag stories with high reach first. Include Monitor alerts on brand mention spikes.',
  },
  {
    label: 'Executive thought leadership',
    prompt: 'Curate media coverage featuring our CEO, CMO, and senior leaders. Prioritise interviews, op-eds, and speaking event coverage. Include social signals where reach is significant.',
  },
  {
    label: 'Campaign performance recap',
    prompt: 'Pull coverage tied to our latest campaign, product launch, or partnership announcement. Prioritise outlet reach and positive framing. Include before/after share-of-voice comparison from Analyze.',
  },
]

const STEPS = ['Basics', 'Sources', 'AI Prompt', 'Audience']

function StepIndicator({ current }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
      {STEPS.map((label, i) => {
        const done    = i < current
        const active  = i === current
        return (
          <Box key={label} sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.4 }}>
              <Box sx={{
                width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                bgcolor: done ? TEAL : active ? PURPLE : 'rgba(0,0,0,0.08)',
                border: `2px solid ${done ? TEAL : active ? PURPLE : 'rgba(0,0,0,0.12)'}`,
                transition: 'all 0.2s',
              }}>
                {done
                  ? <CheckIcon sx={{ fontSize: 13, color: '#fff' }} />
                  : <Typography sx={{ fontSize: '11px', fontWeight: 700, color: active ? '#fff' : 'text.disabled' }}>{i + 1}</Typography>
                }
              </Box>
              <Typography sx={{ fontSize: '10px', fontWeight: active ? 700 : 500, color: active ? PURPLE : done ? TEAL : 'text.disabled', whiteSpace: 'nowrap' }}>
                {label}
              </Typography>
            </Box>
            {i < STEPS.length - 1 && (
              <Box sx={{ width: 48, height: 2, bgcolor: i < current ? TEAL : 'rgba(0,0,0,0.1)', mx: 0.5, mb: 2.5, transition: 'background-color 0.3s' }} />
            )}
          </Box>
        )
      })}
    </Box>
  )
}

function NewSeriesModal({ open, onClose }) {
  const [step, setStep]           = useState(0)
  const [name, setName]           = useState('')
  const [cadence, setCadence]     = useState('Weekly')
  const [description, setDesc]    = useState('')
  const [searches, setSearches]   = useState([])
  const [searchFind, setSearchFind] = useState('')
  const [prompt, setPrompt]       = useState('')
  const [recipients, setRecipients] = useState('')

  const reset = () => { setStep(0); setName(''); setCadence('Weekly'); setDesc(''); setSearches([]); setPrompt(''); setRecipients('') }
  const handleClose = () => { reset(); onClose() }

  const toggleSearch = (item) => {
    setSearches(prev =>
      prev.find(s => s.name === item.name) ? prev.filter(s => s.name !== item.name) : [...prev, item]
    )
  }
  const isSearchActive = (name) => searches.some(s => s.name === name)

  const canNext = () => {
    if (step === 0) return name.trim().length > 0
    if (step === 1) return searches.length > 0
    if (step === 2) return prompt.trim().length > 0
    return true
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '14px', overflow: 'hidden' } }}>
      {/* Header */}
      <Box sx={{ px: 3, pt: 2.5, pb: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: '16px' }}>New Newsletter Series</Typography>
          <Typography sx={{ fontSize: '12px', color: 'text.secondary', mt: 0.25 }}>Set up AI-powered curation in 4 quick steps</Typography>
        </Box>
        <IconButton size="small" onClick={handleClose}><CloseIcon sx={{ fontSize: 18 }} /></IconButton>
      </Box>

      <DialogContent sx={{ px: 3, pt: 3, pb: 2 }}>
        {/* Step indicator */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3.5 }}>
          <StepIndicator current={step} />
        </Box>

        {/* ── Step 0: Basics ── */}
        {step === 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Box>
              <Typography sx={{ fontSize: '12px', fontWeight: 600, mb: 0.75, color: 'text.secondary' }}>Series name *</Typography>
              <TextField
                fullWidth size="small" autoFocus
                placeholder="e.g. Weekly Brand Digest, Competitor Watch, CMO Brief…"
                value={name} onChange={e => setName(e.target.value)}
                sx={{ '& .MuiInputBase-root': { fontSize: '13px', borderRadius: '8px' } }}
              />
            </Box>
            <Box>
              <Typography sx={{ fontSize: '12px', fontWeight: 600, mb: 0.75, color: 'text.secondary' }}>Cadence</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {CADENCES.map(c => (
                  <Box
                    key={c}
                    onClick={() => setCadence(c)}
                    sx={{
                      flex: 1, py: 1.25, textAlign: 'center', borderRadius: '8px', cursor: 'pointer',
                      border: `1.5px solid ${cadence === c ? PURPLE : 'rgba(0,0,0,0.15)'}`,
                      bgcolor: cadence === c ? 'rgba(182,39,161,0.06)' : 'transparent',
                      transition: 'all 0.15s',
                    }}
                  >
                    <Typography sx={{ fontSize: '13px', fontWeight: cadence === c ? 700 : 500, color: cadence === c ? PURPLE : 'text.secondary' }}>{c}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box>
              <Typography sx={{ fontSize: '12px', fontWeight: 600, mb: 0.75, color: 'text.secondary' }}>Description <Box component="span" sx={{ fontWeight: 400, color: 'text.disabled' }}>(optional)</Box></Typography>
              <TextField
                fullWidth size="small" multiline rows={2}
                placeholder="Brief description of this series for your team…"
                value={description} onChange={e => setDesc(e.target.value)}
                sx={{ '& .MuiInputBase-root': { fontSize: '13px', borderRadius: '8px' } }}
              />
            </Box>
          </Box>
        )}

        {/* ── Step 1: Searches ── */}
        {step === 1 && (
          <Box>
            <Typography sx={{ fontSize: '13px', color: 'text.secondary', mb: 1.5 }}>
              Choose which of your saved searches AI should pull from when curating each edition.
            </Typography>

            {/* Active chips */}
            {searches.length > 0 && (
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1.5 }}>
                {searches.map(s => {
                  const cfg = MODAL_SEARCH_ICON[s.type] || MODAL_SEARCH_ICON.explore
                  return (
                    <Chip
                      key={s.name} size="small"
                      icon={cfg.Icon ? <cfg.Icon sx={{ fontSize: '12px !important', color: `${cfg.color} !important` }} /> : <Typography sx={{ fontSize: '11px', fontWeight: 800, color: cfg.color, ml: '6px !important' }}>#</Typography>}
                      label={s.name}
                      onDelete={() => toggleSearch(s)}
                      sx={{ bgcolor: `${cfg.color}12`, border: `1px solid ${cfg.color}35`, '& .MuiChip-label': { fontSize: '0.72rem', color: cfg.color, fontWeight: 600 } }}
                    />
                  )
                })}
              </Box>
            )}

            {/* Find input */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, bgcolor: 'rgba(0,0,0,0.04)', borderRadius: '8px', px: 1.25, py: 0.75, mb: 1 }}>
              <SearchIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
              <input
                value={searchFind}
                onChange={e => setSearchFind(e.target.value)}
                placeholder="Find..."
                style={{ border: 'none', background: 'none', outline: 'none', fontSize: '13px', flex: 1, color: 'inherit', fontFamily: 'inherit' }}
              />
            </Box>

            {/* Categorised list */}
            <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '8px', overflow: 'hidden' }}>
              {Object.entries(MODAL_SEARCHES).map(([cat, items], ci) => {
                const filtered = items.filter(i => i.name.toLowerCase().includes(searchFind.toLowerCase()))
                if (filtered.length === 0) return null
                const cfg = MODAL_SEARCH_ICON[filtered[0].type] || MODAL_SEARCH_ICON.explore
                return (
                  <Box key={cat} sx={{ borderTop: ci > 0 ? '1px solid' : 'none', borderColor: 'divider' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 1.5, pt: 0.875, pb: 0.25 }}>
                      <Typography sx={{ fontSize: '10px', fontWeight: 800, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{cat}</Typography>
                      {searches.some(s => items.find(i => i.name === s.name)) && (
                        <Typography onClick={() => setSearches(prev => prev.filter(s => !items.find(i => i.name === s.name)))}
                          sx={{ fontSize: '10px', color: TEAL, cursor: 'pointer', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}>Clear</Typography>
                      )}
                    </Box>
                    {filtered.map(item => (
                      <Box key={item.name} onClick={() => toggleSearch(item)}
                        sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1.5, py: 0.6, cursor: 'pointer', '&:hover': { bgcolor: 'rgba(0,0,0,0.025)' } }}>
                        <Box sx={{
                          width: 15, height: 15, border: `1.5px solid ${isSearchActive(item.name) ? TEAL : 'rgba(0,0,0,0.25)'}`,
                          bgcolor: isSearchActive(item.name) ? TEAL : 'transparent',
                          borderRadius: '3px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {isSearchActive(item.name) && <CheckIcon sx={{ fontSize: 10, color: '#fff' }} />}
                        </Box>
                        <Typography sx={{ fontSize: '12px', flex: 1 }}>{item.name}</Typography>
                        {cfg.Icon ? <cfg.Icon sx={{ fontSize: 13, color: 'rgba(0,0,0,0.2)' }} /> : <Typography sx={{ fontSize: '12px', color: 'rgba(0,0,0,0.25)', fontWeight: 700 }}>#</Typography>}
                      </Box>
                    ))}
                  </Box>
                )
              })}
            </Box>
          </Box>
        )}

        {/* ── Step 2: AI Prompt ── */}
        {step === 2 && (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, p: 1.5, bgcolor: 'rgba(0,130,127,0.05)', borderRadius: '8px', border: '1px solid rgba(0,130,127,0.15)', mb: 2.5 }}>
              <AutoAwesomeIcon sx={{ fontSize: 14, color: TEAL, mt: '2px', flexShrink: 0 }} />
              <Typography sx={{ fontSize: '12px', color: 'text.secondary', lineHeight: 1.5 }}>
                Tell AI what to curate for each edition. Be specific about topics, tone, outlet preferences, and what to exclude. This prompt runs every time a new edition is generated.
              </Typography>
            </Box>

            <TextField
              fullWidth multiline rows={4} size="small"
              placeholder="e.g. Curate the top 5–8 earned media articles about our brand this week. Prioritise tier-1 outlets and positive sentiment. Skip press releases and wire copy…"
              value={prompt} onChange={e => setPrompt(e.target.value)}
              sx={{ mb: 2.5, '& .MuiInputBase-root': { fontSize: '13px', borderRadius: '8px' } }}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1.25 }}>
              <LightbulbOutlinedIcon sx={{ fontSize: 13, color: AMBER }} />
              <Typography sx={{ fontSize: '11px', fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Example prompts — click to use
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {PROMPT_EXAMPLES.map(ex => (
                <Box
                  key={ex.label}
                  onClick={() => setPrompt(ex.prompt)}
                  sx={{
                    p: 1.25, borderRadius: '8px', cursor: 'pointer',
                    border: `1px solid ${prompt === ex.prompt ? TEAL : 'rgba(0,0,0,0.1)'}`,
                    bgcolor: prompt === ex.prompt ? 'rgba(0,130,127,0.05)' : 'transparent',
                    '&:hover': { borderColor: TEAL, bgcolor: 'rgba(0,130,127,0.03)' },
                    transition: 'all 0.15s',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.4 }}>
                    {prompt === ex.prompt && <CheckIcon sx={{ fontSize: 11, color: TEAL }} />}
                    <Typography sx={{ fontSize: '12px', fontWeight: 700, color: prompt === ex.prompt ? TEAL : 'text.primary' }}>{ex.label}</Typography>
                  </Box>
                  <Typography sx={{ fontSize: '11px', color: 'text.secondary', lineHeight: 1.45 }}>
                    {ex.prompt.length > 110 ? ex.prompt.slice(0, 110) + '…' : ex.prompt}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* ── Step 3: Audience ── */}
        {step === 3 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Box>
              <Typography sx={{ fontSize: '12px', fontWeight: 600, mb: 0.75, color: 'text.secondary' }}>Add recipients</Typography>
              <TextField
                fullWidth size="small"
                placeholder="Enter email addresses, separated by commas…"
                value={recipients} onChange={e => setRecipients(e.target.value)}
                InputProps={{ startAdornment: <GroupOutlinedIcon sx={{ fontSize: 16, color: 'text.disabled', mr: 0.75 }} /> }}
                sx={{ '& .MuiInputBase-root': { fontSize: '13px', borderRadius: '8px' } }}
              />
              <Typography sx={{ fontSize: '11px', color: 'text.disabled', mt: 0.75 }}>
                You can add or change recipients any time in series settings.
              </Typography>
            </Box>

            <Box>
              <Typography sx={{ fontSize: '12px', fontWeight: 600, mb: 0.75, color: 'text.secondary' }}>First send</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {[
                  { val: 'next', label: `Next ${cadence.toLowerCase()} slot`, sub: cadence === 'Daily' ? 'Tomorrow morning' : cadence === 'Weekly' ? 'This coming Monday' : 'First of next month' },
                  { val: 'custom', label: 'Choose a specific date', sub: 'Pick a custom first send date' },
                ].map(opt => (
                  <Box key={opt.val} sx={{ display: 'flex', alignItems: 'center', gap: 1.25, p: 1.25, borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', bgcolor: 'transparent' }}>
                    <AccessTimeOutlinedIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>{opt.label}</Typography>
                      <Typography sx={{ fontSize: '11px', color: 'text.secondary' }}>{opt.sub}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Summary */}
            <Box sx={{ p: 1.5, bgcolor: 'rgba(0,130,127,0.04)', borderRadius: '10px', border: '1px solid rgba(0,130,127,0.15)' }}>
              <Typography sx={{ fontSize: '11px', fontWeight: 700, color: TEAL, textTransform: 'uppercase', letterSpacing: '0.06em', mb: 1 }}>Series summary</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.6 }}>
                {[
                  { label: 'Name',    val: name },
                  { label: 'Cadence', val: cadence },
                  { label: 'Searches', val: searches.length > 0 ? searches.map(s => s.name).join(', ') : 'None selected' },
                ].map(({ label, val }) => (
                  <Box key={label} sx={{ display: 'flex', gap: 1 }}>
                    <Typography sx={{ fontSize: '11px', color: 'text.disabled', width: 60, flexShrink: 0 }}>{label}</Typography>
                    <Typography sx={{ fontSize: '11px', fontWeight: 600, color: 'text.primary' }}>{val}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </DialogContent>

      {/* Footer */}
      <Box sx={{ px: 3, py: 2, borderTop: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Button
          onClick={() => step === 0 ? handleClose() : setStep(s => s - 1)}
          sx={{ textTransform: 'none', color: 'text.secondary' }}
        >
          {step === 0 ? 'Cancel' : '← Back'}
        </Button>
        <Button
          variant="contained"
          disabled={!canNext()}
          onClick={() => step < STEPS.length - 1 ? setStep(s => s + 1) : handleClose()}
          sx={{
            textTransform: 'none', fontWeight: 600, borderRadius: '8px',
            bgcolor: step === STEPS.length - 1 ? TEAL : PURPLE,
            '&:hover': { bgcolor: step === STEPS.length - 1 ? '#006e6b' : '#9a2088' },
            '&.Mui-disabled': { bgcolor: 'rgba(0,0,0,0.1)', color: 'rgba(0,0,0,0.3)' },
          }}
        >
          {step === STEPS.length - 1 ? '✓ Create series & start curating' : 'Continue →'}
        </Button>
      </Box>
    </Dialog>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function MwNewslettersPage() {
  const [selectedId, setSelectedId] = useState(ALL_VIEW_ID)
  const [search, setSearch]         = useState('')
  const [newSeriesOpen, setNewSeriesOpen] = useState(false)

  const selectedSeries = SERIES.find(s => s.id === selectedId)
  const filtered       = SERIES.filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
  const readyCount     = SERIES.filter(s => s.status === 'ready').length
  const isAllView      = selectedId === ALL_VIEW_ID

  return (
    <Box sx={{ display: 'flex', height: '100%', overflow: 'hidden' }}>

      {/* ── Left sidebar ── */}
      <Box sx={{ width: 290, flexShrink: 0, display: 'flex', flexDirection: 'column', borderRight: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', overflow: 'hidden' }}>
        <Box sx={{ px: 2, pt: 2, pb: 1.5 }}>
          <Button fullWidth variant="outlined" startIcon={<AddIcon sx={{ fontSize: 15 }} />}
            onClick={() => setNewSeriesOpen(true)}
            sx={{ borderColor: 'rgba(0,0,0,0.18)', color: 'text.secondary', textTransform: 'none', fontWeight: 500, fontSize: '13px', '&:hover': { borderColor: PURPLE, color: PURPLE, bgcolor: 'rgba(182,39,161,0.04)' }, borderRadius: '8px', mb: 1.5, py: 0.75 }}>
            New Newsletter Series
          </Button>
          <NewSeriesModal open={newSeriesOpen} onClose={() => setNewSeriesOpen(false)} />
          <TextField fullWidth size="small" placeholder="Search series..." value={search} onChange={e => setSearch(e.target.value)}
            InputProps={{ startAdornment: <Box component="span" sx={{ display: 'flex', mr: 0.5 }}><SearchIcon sx={{ fontSize: 16, color: 'text.disabled' }} /></Box> }}
            sx={{ '& .MuiInputBase-root': { fontSize: '13px', borderRadius: '8px' } }}
          />
        </Box>

        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {/* All Newsletters inbox entry */}
          <Box
            onClick={() => setSelectedId(ALL_VIEW_ID)}
            sx={{
              mx: 1.5, mb: 0.5, mt: 0.5, px: 1.5, py: 1.25,
              borderRadius: '8px', cursor: 'pointer',
              bgcolor: isAllView ? TEAL_LIGHT : 'transparent',
              border: `1px solid ${isAllView ? 'rgba(0,130,127,0.2)' : 'transparent'}`,
              display: 'flex', alignItems: 'center', gap: 1.5,
              '&:hover': { bgcolor: isAllView ? TEAL_LIGHT : 'rgba(0,0,0,0.04)' },
            }}
          >
            <Box sx={{
              width: 30, height: 30, borderRadius: '6px', flexShrink: 0,
              bgcolor: isAllView ? 'rgba(0,130,127,0.15)' : 'rgba(0,0,0,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <AllInboxOutlinedIcon sx={{ fontSize: 16, color: isAllView ? TEAL : 'text.secondary' }} />
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: '13px', fontWeight: isAllView ? 700 : 500, color: isAllView ? TEAL : 'text.primary' }}>
                All Newsletters
              </Typography>
              <Typography sx={{ fontSize: '11px', color: 'text.disabled' }}>
                {SERIES.length} series · all editions
              </Typography>
            </Box>
            {readyCount > 0 && (
              <Box sx={{ bgcolor: AMBER_LIGHT, borderRadius: '10px', px: 0.8, py: 0.2, flexShrink: 0 }}>
                <Typography sx={{ fontSize: '10px', fontWeight: 700, color: AMBER }}>{readyCount}</Typography>
              </Box>
            )}
          </Box>

          <Divider sx={{ mx: 1.5, mb: 0.5 }} />

          {/* Series section header */}
          <Box sx={{ px: 2, pt: 0.75, pb: 0.75, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: '10px', fontWeight: 700, color: 'text.disabled', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Series ({filtered.length})
            </Typography>
            {readyCount > 0 && (
              <Box sx={{ bgcolor: AMBER_LIGHT, borderRadius: '10px', px: 0.9, py: 0.2 }}>
                <Typography sx={{ fontSize: '10px', fontWeight: 700, color: AMBER }}>{readyCount} need review</Typography>
              </Box>
            )}
          </Box>
          {filtered.map(s => (
            <SeriesListItem key={s.id} series={s} selected={selectedId === s.id} onClick={() => setSelectedId(s.id)} />
          ))}
        </Box>
      </Box>

      {/* ── Right panel ── */}
      <Box sx={{ flex: 1, overflow: 'hidden', bgcolor: isAllView ? 'background.paper' : 'rgba(0,0,0,0.02)' }}>
        {isAllView
          ? <AllNewslettersInbox />
          : selectedSeries
            ? <SeriesDetail series={selectedSeries} />
            : (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <Typography sx={{ color: 'text.disabled' }}>Select a series to view editions</Typography>
              </Box>
            )
        }
      </Box>
    </Box>
  )
}

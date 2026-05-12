import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Typography, Button, TextField, InputAdornment, Divider,
  IconButton, Tooltip, Menu, MenuItem, LinearProgress, Chip,
  Dialog, DialogContent, DialogTitle, DialogActions, Snackbar,
  ToggleButton, ToggleButtonGroup,
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
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

// ── Constants ─────────────────────────────────────────────────────────────────
const ALL_VIEW_ID        = '__all__'
const RECIPIENTS_VIEW_ID = '__recipients__'
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

// ── Curation skill types ───────────────────────────────────────────────────────
const CURATION_SKILLS = {
  'coverage-roundup': {
    id: 'coverage-roundup',
    label: 'Coverage Roundup',
    color: TEAL,
    bg: TEAL_LIGHT,
    Icon: ViewStreamOutlinedIcon,
    description: 'Aggregates the top articles across all sources, organised by topic and coverage volume.',
  },
  'executive-briefing': {
    id: 'executive-briefing',
    label: 'Executive Briefing',
    color: PURPLE,
    bg: 'rgba(182,39,161,0.08)',
    Icon: AutoAwesomeIcon,
    description: 'Distils key insights and strategic signals into a concise, executive-ready summary.',
  },
  'analytics-snapshot': {
    id: 'analytics-snapshot',
    label: 'Analytics Snapshot',
    color: '#e86c5a',
    bg: 'rgba(232,108,90,0.10)',
    Icon: BarChartOutlinedIcon,
    description: 'Surfaces share of voice, sentiment trends, and top metrics for the period.',
  },
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
    sendTime: '7:00 AM',
    sendDay: null,
    status: 'curating',
    articlesCount: 23,
    progress: 35,
    sources: ['Explore', 'Monitor', 'RSS'],
    searches: [
      { name: 'Brand Monitoring', type: 'explore' },
      { name: 'Meltwater Leadership', type: 'explore' },
      { name: 'TechCrunch', type: 'rss' },
    ],
    recipients: 8,
    nextSend: 'Tomorrow, 7:00 AM',
    latestLabel: 'April 20, 2026',
    estReady: null,
    curationSkill: 'executive-briefing',
    description: 'Daily snapshot of brand mentions and industry news from saved searches.',
  },
  {
    id: 'monthly-roundup',
    name: 'Monthly Round Up',
    cadence: 'Monthly',
    sendTime: '9:00 AM',
    sendDay: '1st',
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
    nextSend: 'May 1, 9:00 AM',
    latestLabel: 'April 2026',
    estReady: 'April 28, 2026',
    curationSkill: 'coverage-roundup',
    description: 'Monthly digest pulling top stories across brand, industry, and social searches.',
  },
  {
    id: 'media-coverage',
    name: 'Media Coverage Monthly',
    cadence: 'Monthly',
    sendTime: '8:30 AM',
    sendDay: '3rd',
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
    nextSend: 'April 22, 8:30 AM',
    latestLabel: 'April 2026',
    deadline: 'April 22, 2026',
    daysUntil: 2,
    curationSkill: 'coverage-roundup',
    description: 'Monthly overview of earned media coverage from top monitoring searches.',
  },
  {
    id: 'competitor-digest',
    name: 'Competitor Digest',
    cadence: 'Weekly',
    sendTime: '8:00 AM',
    sendDay: 'Friday',
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
    nextSend: 'Fri Apr 25, 8:00 AM',
    latestLabel: 'Week of Apr 14',
    estReady: 'April 23, 2026',
    curationSkill: 'analytics-snapshot',
    description: 'Weekly competitive intelligence digest from saved competitor searches.',
  },
]

const EDITION_HISTORY = {
  'daily-brief': [
    { label: 'April 19, 2026', sent: 'Apr 19', time: '7:02 AM', articles: 6, open: '51%', clicks: '12%' },
    { label: 'April 18, 2026', sent: 'Apr 18', time: '7:01 AM', articles: 8, open: '47%', clicks: '9%'  },
    { label: 'April 17, 2026', sent: 'Apr 17', time: '7:00 AM', articles: 5, open: '44%', clicks: '11%' },
    { label: 'April 16, 2026', sent: 'Apr 16', time: '7:03 AM', articles: 7, open: '39%', clicks: '8%'  },
  ],
  'monthly-roundup': [
    { label: 'March 2026',    sent: 'Mar 1',  time: '9:00 AM', articles: 8,  open: '42%', clicks: '14%' },
    { label: 'February 2026', sent: 'Feb 1',  time: '9:00 AM', articles: 12, open: '38%', clicks: '11%' },
    { label: 'January 2026',  sent: 'Jan 1',  time: '9:00 AM', articles: 10, open: '29%', clicks: '9%'  },
    { label: 'December 2025', sent: 'Dec 2',  time: '9:00 AM', articles: 14, open: '35%', clicks: '12%' },
  ],
  'media-coverage': [
    { label: 'March 2026',    sent: 'Mar 3',  time: '8:30 AM', articles: 9,  open: '44%', clicks: '16%' },
    { label: 'February 2026', sent: 'Feb 3',  time: '8:30 AM', articles: 7,  open: '36%', clicks: '13%' },
    { label: 'January 2026',  sent: 'Jan 2',  time: '8:30 AM', articles: 11, open: '41%', clicks: '15%' },
  ],
  'competitor-digest': [
    { label: 'Week of Apr 7',  sent: 'Apr 7',  time: '8:00 AM', articles: 9,  open: '48%', clicks: '17%' },
    { label: 'Week of Mar 31', sent: 'Mar 31', time: '8:00 AM', articles: 11, open: '52%', clicks: '19%' },
    { label: 'Week of Mar 24', sent: 'Mar 24', time: '8:00 AM', articles: 8,  open: '44%', clicks: '15%' },
  ],
}

// ── Newsletter icons ──────────────────────────────────────────────────────────
// Single newsletter icon — uses the provided Vector.svg path, coloured via currentColor
function NlIcon({ size = 20, color, sx = {} }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      sx={{ width: size, height: size, flexShrink: 0, display: 'block', color, ...sx }}
    >
      {/* White background fills the transparent cutout areas so stacked layers don't bleed through */}
      <rect x="0" y="0" width="16" height="16" fill="white" rx="1.5" />
      <path
        d="M13.5147 0H1.61067C1.18618 0.00275609 0.77971 0.171878 0.478553 0.471041C0.177396 0.770204 0.00557648 1.17554 0 1.6V14.4C0.00557648 14.8245 0.177396 15.2298 0.478553 15.529C0.77971 15.8281 1.18618 15.9972 1.61067 16H13.5147C13.9392 15.9972 14.3456 15.8281 14.6468 15.529C14.9479 15.2298 15.1198 14.8245 15.1253 14.4V1.6C15.1198 1.17554 14.9479 0.770204 14.6468 0.471041C14.3456 0.171878 13.9392 0.00275609 13.5147 0V0ZM13.5147 14.3787H1.61067V1.6H13.5147V14.3787ZM3.232 4.55467H4.85333V6.176H3.232V4.55467ZM3.232 7.75467H8.62933V9.376H3.232V7.75467ZM10.2613 7.75467H11.8827V9.376H10.272L10.2613 7.75467ZM11.8827 10.9547V12.576H3.232V11.008L11.8827 10.9547ZM11.8827 4.55467V6.176H6.496V4.55467H11.8827Z"
        fill="currentColor"
      />
    </Box>
  )
}

// Stacked series icon — 3 offset copies; white is baked into each NlIcon so layers occlude cleanly
function NlStackIcon({ size = 20, color }) {
  const offset = Math.round(size * 0.22)
  const total = size + offset * 2
  return (
    <Box sx={{ position: 'relative', width: total, height: total, flexShrink: 0 }}>
      {/* Back page */}
      <Box sx={{ position: 'absolute', top: offset * 2, left: offset * 2, opacity: 0.35 }}>
        <NlIcon size={size} color={color} />
      </Box>
      {/* Mid page */}
      <Box sx={{ position: 'absolute', top: offset, left: offset, opacity: 0.65 }}>
        <NlIcon size={size} color={color} />
      </Box>
      {/* Front page */}
      <Box sx={{ position: 'absolute', top: 0, left: 0 }}>
        <NlIcon size={size} color={color} />
      </Box>
    </Box>
  )
}

// ── Atoms ─────────────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const badgeSx = { display: 'inline-flex', alignItems: 'center', gap: 0.5, borderRadius: '4px', px: 1, py: 0.5 }
  const iconSx  = { fontSize: 12, flexShrink: 0 }
  const textSx  = { fontSize: '11px', fontWeight: 600, lineHeight: 1 }

  if (status === 'curating') return (
    <Box sx={{ ...badgeSx, bgcolor: TEAL_LIGHT }}>
      <AutoAwesomeIcon sx={{
        ...iconSx, color: TEAL,
        '@keyframes ai-pulse': {
          '0%':   { opacity: 1,   transform: 'scale(1)' },
          '50%':  { opacity: 0.5, transform: 'scale(0.85)' },
          '100%': { opacity: 1,   transform: 'scale(1)' },
        },
        animation: 'ai-pulse 1.8s ease-in-out infinite',
      }} />
      <Typography sx={{ ...textSx, color: TEAL }}>Auto-curating</Typography>
    </Box>
  )
  if (status === 'ready') return (
    <Box sx={{ ...badgeSx, bgcolor: AMBER_LIGHT }}>
      <CheckCircleOutlineIcon sx={{ ...iconSx, color: AMBER }} />
      <Typography sx={{ ...textSx, color: AMBER }}>Ready for review</Typography>
    </Box>
  )
  if (status === 'scheduled') return (
    <Box sx={{ ...badgeSx, bgcolor: 'rgba(182,39,161,0.08)' }}>
      <ScheduleIcon sx={{ ...iconSx, color: PURPLE }} />
      <Typography sx={{ ...textSx, color: PURPLE }}>Scheduled</Typography>
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
            {series.status === 'ready' && `${series.articlesCount} articles · Send in ${series.daysUntil}d`}
          </Typography>
          {series.sendTime && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
              <AccessTimeOutlinedIcon sx={{ fontSize: 10, color: 'text.disabled' }} />
              <Typography sx={{ fontSize: '11px', color: 'text.disabled' }}>
                {series.cadence === 'Daily'
                  ? `Daily · ${series.sendTime}`
                  : series.sendDay
                  ? `${series.sendDay} · ${series.sendTime}`
                  : series.sendTime}
              </Typography>
            </Box>
          )}
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

// ── Curation skill badge ──────────────────────────────────────────────────────
function CurationSkillBadge({ skillId, onClick, showChange = false }) {
  const skill = CURATION_SKILLS[skillId]
  if (!skill) return null
  const { Icon } = skill
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'inline-flex', alignItems: 'center', gap: 0.6,
        borderRadius: '4px', px: 1, py: 0.4,
        bgcolor: skill.bg,
        cursor: onClick ? 'pointer' : 'default',
        border: `1px solid ${skill.color}28`,
        transition: 'all 0.15s',
        ...(onClick && { '&:hover': { borderColor: `${skill.color}55`, bgcolor: `${skill.color}14` } }),
      }}
    >
      <Icon sx={{ fontSize: 12, color: skill.color }} />
      <Typography sx={{ fontSize: '11px', fontWeight: 600, color: skill.color, lineHeight: 1 }}>
        {skill.label}
      </Typography>
      {showChange && <ArrowDropDownIcon sx={{ fontSize: 14, color: skill.color, ml: -0.25 }} />}
    </Box>
  )
}

// ── Curation skill menu ───────────────────────────────────────────────────────
function CurationSkillMenu({ anchor, onClose, currentSkill, onSelect }) {
  return (
    <Menu
      anchorEl={anchor}
      open={Boolean(anchor)}
      onClose={onClose}
      onClick={e => e.stopPropagation()}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      PaperProps={{ sx: { minWidth: 275, borderRadius: '10px', boxShadow: '0 4px 20px rgba(0,0,0,0.13)', p: 0.75, mt: 0.5 } }}
    >
      <Typography sx={{ fontSize: '10px', fontWeight: 700, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.07em', px: 1.25, pt: 0.5, pb: 0.75 }}>
        Curation Skill
      </Typography>
      {Object.values(CURATION_SKILLS).map(skill => {
        const { Icon } = skill
        const active = currentSkill === skill.id
        return (
          <MenuItem
            key={skill.id}
            onClick={() => { onSelect(skill.id); onClose() }}
            sx={{
              borderRadius: '7px', px: 1.25, py: 1, mb: 0.25, alignItems: 'flex-start',
              bgcolor: active ? skill.bg : 'transparent',
              border: `1px solid ${active ? `${skill.color}28` : 'transparent'}`,
              '&:hover': { bgcolor: skill.bg, border: `1px solid ${skill.color}20` },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25, width: '100%' }}>
              <Box sx={{
                width: 28, height: 28, borderRadius: '6px',
                bgcolor: `${skill.color}18`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, mt: 0.1,
              }}>
                <Icon sx={{ fontSize: 15, color: skill.color }} />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <Typography sx={{ fontSize: '13px', fontWeight: 600, color: skill.color }}>
                    {skill.label}
                  </Typography>
                  {active && <CheckIcon sx={{ fontSize: 12, color: skill.color }} />}
                </Box>
                <Typography sx={{ fontSize: '11px', color: 'text.secondary', lineHeight: 1.4, mt: 0.15 }}>
                  {skill.description}
                </Typography>
              </Box>
            </Box>
          </MenuItem>
        )
      })}
    </Menu>
  )
}

// ── Draft email preview ───────────────────────────────────────────────────────
const PREVIEW_DATA = {
  'daily-brief': {
    intro: 'Welcome to your Daily Brief. This edition covers your top brand mentions, key industry developments, and competitor activity — curated by Mira from your Explore searches and Monitor streams.',
    aiOverview: 'Today\'s brief shows a <strong>spike in brand mentions</strong> driven by your Q1 earnings coverage. Sentiment is trending positive across Tier 1 outlets. Competitor activity is moderate — one acquisition story worth watching.',
    widget: { label: 'Mention Volume', value: '3.2K', trend: '+11%', period: 'Last 24h', reason: 'Spike driven by Q1 earnings pick-up across financial media.' },
    articles: [
      { sourceCode: 'TC', sourceName: 'TechCrunch', sourceType: 'News', score: 97, time: 'Apr 20, 6:00 AM', tag: 'Brand Mention', title: 'Meltwater expands AI capabilities with new partnership announcement', body: 'The media intelligence platform announced a strategic integration with three leading AI providers, aiming to enhance real-time sentiment analysis and automated reporting.', aiSummary: 'Brand visibility up significantly in tech press following the partnership news. Tone is positive and forward-looking.', sentiment: 'Positive', reach: '4.1M', similar: 18, ave: '$34K' },
      { sourceCode: 'FT', sourceName: 'Forbes', sourceType: 'News', score: 91, time: 'Apr 20, 8:30 AM', tag: 'Industry', title: 'Social listening market projected to reach $9.4B by 2028 as enterprises scale up', body: 'New research shows enterprise adoption of media monitoring tools accelerating, with AI-driven curation cited as the primary driver of renewed investment in the category.', aiSummary: 'Strong category tailwind — positions Meltwater favourably against the broader market narrative.', sentiment: 'Positive', reach: '2.9M', similar: 24, ave: '$28K' },
      { sourceCode: 'HB', sourceName: 'Harvard Business Review', sourceType: 'News', score: 88, time: 'Apr 20, 10:00 AM', tag: 'Leadership', title: 'CEO interview: "Data literacy is the new executive superpower"', body: 'An in-depth conversation on how communications leaders are rethinking earned media measurement and competitive intelligence in the AI era.', aiSummary: 'Thought leadership angle — relevant for exec audience and reinforces Meltwater\'s positioning as a strategic partner.', sentiment: 'Neutral', reach: '1.8M', similar: 9, ave: '$21K' },
    ],
  },
  'monthly-roundup': {
    intro: 'Welcome to your Monthly Coverage Roundup. This edition highlights your biggest earned media wins, key industry narratives, and competitive landscape shifts from the past month.',
    aiOverview: 'This month\'s digest shows a <strong>strong earned media performance</strong> — Q1 coverage is up 34% year-over-year across your key brand topics. The industry conversation is shifting toward AI-powered media intelligence, with your brand well-positioned in that narrative. Competitive monitoring shows a <strong>+12% share-of-voice gain</strong> versus primary competitors this month.',
    widget: { label: 'Mention Volume', value: '12.4K', trend: '+18%', period: 'Last 30 days', reason: 'Mention volume spiked +18% this period, driven by Q1 earnings coverage and product launch activity.' },
    articles: [
      { sourceCode: 'GR', sourceName: 'Gartner', sourceType: 'Research', score: 97, time: 'Apr 14', tag: 'Coverage Trend', title: 'Meltwater named a Leader in 2026 Gartner Magic Quadrant for Social Analytics', body: 'The annual report highlights Meltwater\'s strong execution and completeness of vision, particularly in AI-assisted curation and cross-channel monitoring capabilities.', aiSummary: 'Highest-impact coverage of the month. Analyst recognition drives significant downstream media pickup and sales enablement value.', sentiment: 'Positive', reach: '3.8M', similar: 41, ave: '$52K' },
      { sourceCode: 'BW', sourceName: 'Business Wire', sourceType: 'News', score: 94, time: 'Apr 9', tag: 'Product', title: 'New Mira features drive 40% increase in newsletter engagement across enterprise accounts', body: 'Internal data and customer case studies show significant uplift in open rates and click-throughs since the rollout of AI-curated newsletter editions.', aiSummary: 'Strong product narrative with quantified customer outcomes. Good asset for sales and customer success teams.', sentiment: 'Positive', reach: '2.1M', similar: 28, ave: '$31K' },
      { sourceCode: 'MW', sourceName: 'Marketing Week', sourceType: 'Trade', score: 89, time: 'Apr 3', tag: 'Market', title: 'Brands are doubling down on owned media as trust in paid channels erodes', body: 'A new study underscores a strategic shift toward curated newsletters and direct audience relationships as primary comms channels for enterprise brands.', aiSummary: 'Category-level narrative that validates Meltwater\'s newsletter product direction and strengthens the owned media positioning.', sentiment: 'Positive', reach: '1.4M', similar: 16, ave: '$18K' },
    ],
  },
  'competitor-digest': {
    intro: 'Welcome to your Competitor Digest. This edition tracks the latest moves from key competitors across product launches, funding activity, and media coverage — curated automatically by Mira.',
    aiOverview: 'Competitor activity was <strong>elevated this period</strong>. Cision made a significant acquisition move. Brandwatch is pushing into real-time social listening. Sprinklr showed mixed signals — enterprise retention strong but SMB churn worth monitoring.',
    widget: { label: 'Competitor Mentions', value: '847', trend: '+22%', period: 'Last 7 days', reason: 'Cision acquisition story drove a significant spike in competitor media coverage across tech and business outlets.' },
    articles: [
      { sourceCode: 'WS', sourceName: 'Wall Street Journal', sourceType: 'News', score: 96, time: 'Apr 21', tag: 'Cision', title: 'Cision acquires PR analytics startup for $280M in bid to strengthen AI roadmap', body: 'The acquisition is expected to accelerate Cision\'s move into predictive media analytics, putting it in more direct competition with Meltwater\'s Mira platform.', aiSummary: 'High-impact competitive signal. Meltwater\'s Mira roadmap should be evaluated in context of this move — recommend flagging to product team.', sentiment: 'Neutral', reach: '5.2M', similar: 34, ave: '$61K' },
      { sourceCode: 'AW', sourceName: 'Adweek', sourceType: 'Trade', score: 91, time: 'Apr 18', tag: 'Brandwatch', title: 'Brandwatch launches real-time trend detection for social listening enterprise tier', body: 'The new feature positions Brandwatch more directly against Meltwater\'s Explore product, targeting enterprise comms teams with high-volume monitoring needs.', aiSummary: 'Feature-level competitive pressure in core product area. Worth monitoring customer reactions and updating competitive battlecard.', sentiment: 'Neutral', reach: '1.6M', similar: 19, ave: '$22K' },
      { sourceCode: 'RE', sourceName: 'Reuters', sourceType: 'News', score: 85, time: 'Apr 15', tag: 'Sprinklr', title: 'Sprinklr reports Q1 beat but lowers full-year guidance amid SMB churn', body: 'Analysts note the divergence between enterprise retention and SMB churn as a signal of broader market segmentation in the social analytics space.', aiSummary: 'Mixed signals — Sprinklr\'s SMB weakness may indicate opportunity in the mid-market segment for Meltwater.', sentiment: 'Neutral', reach: '3.1M', similar: 27, ave: '$38K' },
    ],
  },
  'media-coverage': {
    intro: 'Welcome to your April 2026 media coverage digest. This edition covers your top earned media wins, key industry trends, and a competitive landscape snapshot — all curated from your Explore searches and Monitor streams.',
    aiOverview: 'This month\'s digest highlights a <strong>strong earned media performance</strong> — Q1 coverage is up 34% year-over-year across your key brand topics. The industry conversation is shifting decisively toward AI-powered media intelligence, with your brand well-positioned in that narrative. Competitive monitoring shows a <strong>+12% share-of-voice gain</strong> versus primary competitors this month, driven by product launch coverage and executive thought leadership placements.',
    widget: { label: 'Mention Volume', value: '12.4K', trend: '+18%', period: 'Mar 22 – Apr 20, 2026', reason: 'Mention volume spiked +18% this period, driven by your Q1 earnings coverage. This gives readers immediate context on how much conversation your brand generated during the edition window.' },
    articles: [
      { sourceCode: 'CM', sourceName: 'Competitor Monitor', sourceType: 'Monitor', score: 97, time: 'Apr 20, 6:00 AM', tag: 'Competitive Intel', title: 'Competitor share-of-voice shift: your brand up 12% this month', body: 'Your Monitor streams detected a significant share-of-voice gain versus key competitors, driven by product launch coverage and exec thought leadership.', aiSummary: 'Brand share-of-voice increased 12% MoM, outperforming the category average of 4%. Competitor A saw a 7% decline coinciding with a product recall story.', sentiment: 'Positive', reach: '2.8M', similar: 34, ave: '$28K' },
      { sourceCode: 'FT', sourceName: 'Financial Times', sourceType: 'News', score: 94, time: 'Apr 20, 8:30 AM', tag: 'Tier 1', title: 'AI-driven media monitoring transforms PR strategy for enterprise brands', body: 'Leading companies are shifting from reactive to proactive media management using AI-powered monitoring platforms, with significant gains in coverage quality and stakeholder engagement.', aiSummary: 'AI-powered media monitoring is enabling enterprise PR teams to shift from reactive to proactive strategies, with leading brands reporting significant gains in coverage quality and stakeholder engagement.', sentiment: 'Positive', reach: '4.2M', similar: 41, ave: '$48K' },
      { sourceCode: 'BW', sourceName: 'Brand Watch Monitor', sourceType: 'Monitor', score: 91, time: 'Apr 20, 7:00 AM', tag: 'Brand', title: 'Q1 earnings coverage drives peak brand visibility across financial media', body: 'Your Q1 earnings announcement generated a record media footprint this quarter, with coverage spanning Tier 1 financial outlets and specialist trade press in 14 markets.', aiSummary: 'Earnings-driven coverage creates a sustained halo effect. Recommend capitalising on the momentum with targeted thought leadership placements in the next 2 weeks.', sentiment: 'Positive', reach: '3.5M', similar: 29, ave: '$41K' },
    ],
  },
}

const SENTIMENT_COLORS = {
  Positive: { color: '#16a34a', bg: 'rgba(22,163,74,0.09)' },
  Neutral:  { color: '#6b7280', bg: 'rgba(107,114,128,0.09)' },
  Negative: { color: '#dc2626', bg: 'rgba(220,38,38,0.09)' },
}

function DraftEmailPreview({ series }) {
  const data = PREVIEW_DATA[series.id] || PREVIEW_DATA['media-coverage']
  const accentColor = SERIES_COLORS[series.id] || TEAL
  const accentLight = `${accentColor}12`
  const accentBorder = `${accentColor}22`

  return (
    <Box sx={{ bgcolor: '#f4f5f7', borderTop: '1px solid', borderColor: 'divider', mx: -2.5, mb: -2, px: 2, pt: 2, pb: 2 }}>
      <Box sx={{ maxWidth: 680, mx: 'auto', borderRadius: '8px', overflow: 'hidden', border: '1px solid', borderColor: 'divider', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>

        {/* Colored edition header bar — mirrors editor */}
        <Box sx={{ bgcolor: accentColor, px: 3, py: 1.25, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>
            {series.latestLabel} Edition · {series.cadence}
          </Typography>
          <Typography sx={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', textDecoration: 'underline', cursor: 'default' }}>View in browser</Typography>
        </Box>

        <Box sx={{ bgcolor: '#ffffff', px: 3, pt: 3, pb: 2 }}>

          {/* Newsletter title + logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.75 }}>
            {series.logoUrl
              ? <Box component="img" src={series.logoUrl} alt="Logo" sx={{ height: 32, maxWidth: 80, objectFit: 'contain' }} />
              : <Box sx={{ width: 32, height: 32, borderRadius: '6px', bgcolor: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <NlIcon size={16} color="#fff" />
                </Box>
            }
            <Box>
              <Typography sx={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.02em', color: 'text.primary', lineHeight: 1.2 }}>{series.name}</Typography>
              <Box sx={{ width: 36, height: 3, borderRadius: '2px', bgcolor: accentColor, mt: 0.5 }} />
            </Box>
          </Box>
          <Typography sx={{ fontSize: '12px', color: 'text.disabled', mb: 2 }}>{series.latestLabel} Edition</Typography>

          {/* Intro paragraph */}
          <Typography sx={{ fontSize: '13.5px', lineHeight: 1.7, color: 'text.secondary', mb: 2.5 }}>
            {data.intro}
          </Typography>

          {/* AI Overview box */}
          <Box sx={{ bgcolor: accentLight, border: `1px solid ${accentBorder}`, borderRadius: '6px', px: 2, py: 1.5, mb: 2.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.75 }}>
              <AutoAwesomeIcon sx={{ fontSize: 13, color: accentColor }} />
              <Typography sx={{ fontSize: '10px', fontWeight: 800, color: accentColor, textTransform: 'uppercase', letterSpacing: '0.08em' }}>AI Overview</Typography>
            </Box>
            <Typography sx={{ fontSize: '13px', lineHeight: 1.7, color: 'text.secondary', fontStyle: 'italic' }}
              dangerouslySetInnerHTML={{ __html: data.aiOverview }}
            />
          </Box>

          {/* Data widget */}
          <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '6px', p: 1.75, mb: 3, bgcolor: '#fafafa' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <BarChartOutlinedIcon sx={{ fontSize: 13, color: accentColor }} />
                <Typography sx={{ fontSize: '11px', fontWeight: 700, color: 'text.primary', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{data.widget.label}</Typography>
                <Box sx={{ px: 0.75, py: 0.2, bgcolor: `${accentColor}15`, borderRadius: '3px' }}>
                  <Typography sx={{ fontSize: '10px', fontWeight: 700, color: accentColor }}>+ Auto-added</Typography>
                </Box>
              </Box>
            </Box>
            <Typography sx={{ fontSize: '11px', color: 'text.disabled', mb: 1 }}>{data.widget.period} · Mentions</Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
              <Typography sx={{ fontSize: '26px', fontWeight: 800, color: 'text.primary', letterSpacing: '-0.02em' }}>{data.widget.value}</Typography>
              <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>total mentions</Typography>
              <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#16a34a', ml: 'auto' }}>{data.widget.trend}</Typography>
            </Box>
            {/* Sparkline placeholder */}
            <Box sx={{ height: 36, bgcolor: `${accentColor}08`, borderRadius: '4px', mb: 1, position: 'relative', overflow: 'hidden' }}>
              <svg width="100%" height="36" viewBox="0 0 300 36" preserveAspectRatio="none">
                <polyline points="0,28 40,22 80,26 120,18 160,20 200,12 240,15 300,8" fill="none" stroke={accentColor} strokeWidth="1.5" strokeOpacity="0.6" />
                <polygon points="0,28 40,22 80,26 120,18 160,20 200,12 240,15 300,8 300,36 0,36" fill={accentColor} fillOpacity="0.07" />
              </svg>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <CalendarTodayOutlinedIcon sx={{ fontSize: 11, color: 'text.disabled' }} />
              <Typography sx={{ fontSize: '11px', color: 'text.disabled' }}>Snapshot: {data.widget.period}</Typography>
            </Box>
            {/* Why AI picked this */}
            <Box sx={{ mt: 1, pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.4 }}>
                <AutoAwesomeIcon sx={{ fontSize: 11, color: accentColor }} />
                <Typography sx={{ fontSize: '10px', fontWeight: 700, color: accentColor }}>Why AI picked this</Typography>
              </Box>
              <Typography sx={{ fontSize: '12px', color: 'text.secondary', lineHeight: 1.5 }}>{data.widget.reason}</Typography>
            </Box>
          </Box>

          {/* Articles */}
          {data.articles.map((article, i) => {
            const sentCfg = SENTIMENT_COLORS[article.sentiment] || SENTIMENT_COLORS.Neutral
            return (
              <Box key={i} sx={{ mb: i < data.articles.length - 1 ? 0 : 0, pb: 2.5, borderBottom: i < data.articles.length - 1 ? '1px solid rgba(0,0,0,0.07)' : 'none' }}>
                {/* Source row */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75 }}>
                  <Box sx={{ width: 22, height: 22, borderRadius: '4px', bgcolor: `${accentColor}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Typography sx={{ fontSize: '9px', fontWeight: 800, color: accentColor }}>{article.sourceCode}</Typography>
                  </Box>
                  <Typography sx={{ fontSize: '12px', fontWeight: 600, color: 'text.primary' }}>{article.sourceName}</Typography>
                  <Typography sx={{ fontSize: '11px', color: 'text.disabled' }}>{article.sourceType}</Typography>
                  <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.4 }}>
                    <Typography sx={{ fontSize: '11px', fontWeight: 700, color: accentColor }}>· {article.score}%</Typography>
                    <Typography sx={{ fontSize: '11px', color: 'text.disabled' }}>{article.time}</Typography>
                  </Box>
                </Box>

                {/* Title + thumbnail placeholder */}
                <Box sx={{ display: 'flex', gap: 1.5, mb: 1 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: '14px', fontWeight: 700, lineHeight: 1.4, color: 'text.primary', mb: 0.6 }}>{article.title}</Typography>
                    <Typography sx={{ fontSize: '12.5px', color: 'text.secondary', lineHeight: 1.6 }}>{article.body}</Typography>
                  </Box>
                  <Box sx={{ width: 52, height: 48, borderRadius: '5px', bgcolor: `${accentColor}10`, border: `1px solid ${accentBorder}`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ViewStreamOutlinedIcon sx={{ fontSize: 16, color: accentColor, opacity: 0.4 }} />
                  </Box>
                </Box>

                {/* AI Summary */}
                <Box sx={{ bgcolor: accentLight, border: `1px solid ${accentBorder}`, borderRadius: '5px', px: 1.5, py: 1, mb: 0.75 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.4 }}>
                    <AutoAwesomeIcon sx={{ fontSize: 11, color: accentColor }} />
                    <Typography sx={{ fontSize: '10px', fontWeight: 700, color: accentColor, textTransform: 'uppercase', letterSpacing: '0.06em' }}>AI Summary</Typography>
                  </Box>
                  <Typography sx={{ fontSize: '12px', color: 'text.secondary', lineHeight: 1.55 }}>{article.aiSummary}</Typography>
                </Box>

                {/* Sentiment + stats */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                  <Box sx={{ px: 1, py: 0.3, borderRadius: '4px', bgcolor: sentCfg.bg }}>
                    <Typography sx={{ fontSize: '11px', fontWeight: 600, color: sentCfg.color }}>{article.sentiment}</Typography>
                  </Box>
                  <Typography sx={{ fontSize: '11px', color: 'text.disabled' }}>{article.reach} Reach</Typography>
                  <Typography sx={{ fontSize: '11px', color: 'text.disabled' }}>{article.similar} Similar</Typography>
                  <Typography sx={{ fontSize: '11px', color: 'text.disabled' }}>{article.ave} AVE</Typography>
                </Box>
              </Box>
            )
          })}
        </Box>

        {/* Footer */}
        <Box sx={{ px: 3, py: 1.5, bgcolor: 'rgba(0,0,0,0.025)', borderTop: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: '11px', color: 'text.disabled' }}>
            {series.articlesCount} of ~{Math.round(series.articlesCount / (series.progress / 100))} articles curated · More being added automatically
          </Typography>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, px: 1, py: 0.35, bgcolor: 'rgba(0,0,0,0.05)', borderRadius: '4px' }}>
            <Typography sx={{ fontSize: '10px', fontWeight: 700, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Draft preview</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

// ── Latest edition card ───────────────────────────────────────────────────────
function LatestEditionCard({ series, onEdit, curationSkill, onCurationSkillChange, initialPreviewOpen = false }) {
  const isCurating = series.status === 'curating'
  const isReady    = series.status === 'ready'
  const borderColor = isReady ? AMBER : TEAL
  const headerBg    = isReady ? AMBER_LIGHT : TEAL_LIGHT
  const [skillMenuAnchor, setSkillMenuAnchor] = useState(null)
  const [previewOpen, setPreviewOpen] = useState(initialPreviewOpen)

  return (
    <Box sx={{ border: `1.5px solid ${previewOpen ? TEAL : borderColor}`, borderRadius: '10px', overflow: 'hidden', mb: 3, bgcolor: 'background.paper', boxShadow: previewOpen ? '0 4px 20px rgba(0,130,127,0.12)' : '0 2px 12px rgba(0,0,0,0.06)', transition: 'box-shadow 0.2s, border-color 0.2s' }}>
      {/* Header strip */}
      <Box sx={{ px: 2.5, py: 1.5, bgcolor: headerBg, borderBottom: `1px solid ${isReady ? 'rgba(245,158,11,0.2)' : 'rgba(0,130,127,0.15)'}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <NlIcon size={22} color={isReady ? AMBER : TEAL} />
          <Box>
            <Typography sx={{ fontSize: '13px', fontWeight: 700, color: 'text.primary' }}>{series.latestLabel} Edition</Typography>
            <Typography sx={{ fontSize: '11px', color: 'text.secondary' }}>Latest · In progress</Typography>
          </Box>
        </Box>
        {/* Action buttons in header */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          {isCurating && (
            <Button size="small" variant={previewOpen ? 'contained' : 'outlined'}
              onClick={e => { e.stopPropagation(); setPreviewOpen(p => !p) }}
              startIcon={previewOpen ? <ExpandMoreIcon sx={{ fontSize: 14, transform: 'rotate(180deg)' }} /> : <VisibilityOutlinedIcon sx={{ fontSize: 14 }} />}
              sx={{
                textTransform: 'none', fontSize: '12px', py: 0.5,
                ...(previewOpen
                  ? { bgcolor: TEAL, color: '#fff', '&:hover': { bgcolor: '#006e6b' } }
                  : { borderColor: 'rgba(0,130,127,0.35)', color: TEAL, bgcolor: 'rgba(255,255,255,0.6)', '&:hover': { bgcolor: 'rgba(255,255,255,0.9)', borderColor: TEAL } }
                ),
              }}>
              {previewOpen ? 'Close preview' : 'Preview draft'}
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

      {/* Body */}
      <Box sx={{ px: 2.5, py: 2 }}>
        {isCurating && (
          <>
            {/* Skill badge row */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.25 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AutoAwesomeIcon sx={{ fontSize: 14, color: TEAL }} />
                <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>
                  AI is curating content from <strong>{series.sources.length} sources</strong>
                </Typography>
              </Box>
              {curationSkill && (
                <CurationSkillBadge
                  skillId={curationSkill}
                  showChange={!!onCurationSkillChange}
                  onClick={onCurationSkillChange ? e => { e.stopPropagation(); setSkillMenuAnchor(e.currentTarget) } : undefined}
                />
              )}
            </Box>
            {onCurationSkillChange && (
              <CurationSkillMenu
                anchor={skillMenuAnchor}
                onClose={() => setSkillMenuAnchor(null)}
                currentSkill={curationSkill}
                onSelect={onCurationSkillChange}
              />
            )}
            <Box sx={{ mb: 0.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>{series.articlesCount} articles curated</Typography>
                <Typography sx={{ fontSize: '12px', fontWeight: 700, color: TEAL }}>{series.progress}%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={series.progress} sx={{ height: 5, borderRadius: 3, bgcolor: 'rgba(0,0,0,0.07)', '& .MuiLinearProgress-bar': { bgcolor: TEAL, borderRadius: 3 } }} />
            </Box>
            {series.nextSend ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 0.75, mb: series.estReady ? 0.5 : 2 }}>
                <ScheduleIcon sx={{ fontSize: 12, color: TEAL }} />
                <Typography sx={{ fontSize: '12px', color: TEAL, fontWeight: 500 }}>
                  Scheduled: <strong>{series.nextSend}</strong>
                </Typography>
              </Box>
            ) : series.estReady && (
              <Typography sx={{ fontSize: '12px', color: 'text.disabled', mt: 0.5, mb: 2 }}>
                Estimated ready: {series.estReady}
              </Typography>
            )}
          </>
        )}

        {isReady && (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, flexWrap: 'wrap' }}>
              <CheckCircleOutlineIcon sx={{ fontSize: 14, color: TEAL }} />
              <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>
                <strong>{series.articlesCount} articles</strong> curated and ready for your review
              </Typography>
              <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
                {curationSkill && (
                  <CurationSkillBadge
                    skillId={curationSkill}
                    showChange={!!onCurationSkillChange}
                    onClick={onCurationSkillChange ? e => { e.stopPropagation(); setSkillMenuAnchor(e.currentTarget) } : undefined}
                  />
                )}
                <StatusBadge status={series.status} />
              </Box>
            </Box>
            {onCurationSkillChange && (
              <CurationSkillMenu
                anchor={skillMenuAnchor}
                onClose={() => setSkillMenuAnchor(null)}
                currentSkill={curationSkill}
                onSelect={onCurationSkillChange}
              />
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, p: 1.25, bgcolor: AMBER_LIGHT, borderRadius: '6px', border: '1px solid rgba(245,158,11,0.2)' }}>
              <WarningAmberIcon sx={{ fontSize: 14, color: AMBER }} />
              <Typography sx={{ fontSize: '12px', color: AMBER }}>
                Send by: <strong>{series.deadline}</strong>
                {series.daysUntil != null && ` (${series.daysUntil} days away)`}
              </Typography>
            </Box>
          </>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: isCurating && !series.estReady ? 2 : 0, mb: previewOpen ? 2 : 0, '&:hover .edit-sources-link': { opacity: 1 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexWrap: 'wrap' }}>
            <SearchPills searches={series.searches} max={3} />
            <Typography
              className="edit-sources-link"
              onClick={e => e.stopPropagation()}
              sx={{ fontSize: '12px', color: TEAL, cursor: 'pointer', fontWeight: 500, opacity: 0, transition: 'opacity 0.15s', '&:hover': { textDecoration: 'underline' } }}
            >
              Edit sources
            </Typography>
          </Box>
          {isCurating && <StatusBadge status={series.status} />}
        </Box>

        {/* Inline draft preview */}
        {previewOpen && (
          <DraftEmailPreview series={series} curationSkill={curationSkill} />
        )}
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
        <Typography sx={{ fontSize: '11px', color: 'text.disabled' }}>Sent {edition.sent}{edition.time ? ` · ${edition.time}` : ''} · {edition.articles} articles</Typography>
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

// ── Curation Settings Modal ───────────────────────────────────────────────────
const CURATION_STEPS = ['Sources', 'Mira Skill', 'Preferences']

const DEFAULT_PROMPTS = {
  'daily-brief':      'If our CEO or C-suite is mentioned directly, always include that story. Flag any coverage that could require a comms response. Skip earnings call recaps and syndicated republications.',
  'monthly-roundup':  'Weight stories by narrative impact, not just reach. Include at least one piece of long-form analysis if available. If a story appears in three or more outlets, treat it as a signal worth highlighting.',
  'media-coverage':   'Lead with the story that would matter most to our PR team. Group coverage by theme rather than outlet. Note if any coverage contradicts our official messaging.',
  'competitor-digest':'Prioritise funding announcements, leadership changes, and product launches over general mentions. If a competitor gains significant share of voice this week, flag it explicitly.',
}

function CurationStepIndicator({ current }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
      {CURATION_STEPS.map((label, i) => {
        const done   = i < current
        const active = i === current
        return (
          <Box key={label} sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.4 }}>
              <Box sx={{
                width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                bgcolor: done ? TEAL : active ? TEAL : 'rgba(0,0,0,0.08)',
                border: `2px solid ${done ? TEAL : active ? TEAL : 'rgba(0,0,0,0.12)'}`,
                transition: 'all 0.2s',
              }}>
                {done
                  ? <CheckIcon sx={{ fontSize: 13, color: '#fff' }} />
                  : <Typography sx={{ fontSize: '11px', fontWeight: 700, color: active ? '#fff' : 'text.disabled' }}>{i + 1}</Typography>
                }
              </Box>
              <Typography sx={{ fontSize: '10px', fontWeight: active ? 700 : 500, color: active ? TEAL : done ? TEAL : 'text.disabled', whiteSpace: 'nowrap' }}>
                {label}
              </Typography>
            </Box>
            {i < CURATION_STEPS.length - 1 && (
              <Box sx={{ width: 48, height: 2, bgcolor: i < current ? TEAL : 'rgba(0,0,0,0.1)', mx: 0.5, mb: 2.5, transition: 'background-color 0.3s' }} />
            )}
          </Box>
        )
      })}
    </Box>
  )
}

function CurationSettingsModal({ open, onClose, series }) {
  const [activeSection, setActiveSection] = useState('skill')
  const [searches, setSearches]     = useState(series?.searches || [])
  const [searchFind, setSearchFind]  = useState('')
  const [prompt, setPrompt]          = useState(DEFAULT_PROMPTS[series?.id] || '')
  const [skillId, setSkillId]        = useState(series?.curationSkill || 'executive-briefing')
  const [articleCount, setArticleCount] = useState(8)
  const [sentiment, setSentiment]       = useState('all')
  const [outletTier, setOutletTier]     = useState('all')
  const [schedCadence, setSchedCadence] = useState(series?.cadence || 'Weekly')
  const [schedDay, setSchedDay]         = useState(series?.sendDay || 'Friday')
  const [schedTime, setSchedTime]       = useState(series?.sendTime || '8:00 AM')

  useEffect(() => {
    if (open) {
      setActiveSection('skill')
      setSearches(series?.searches || [])
      setPrompt(DEFAULT_PROMPTS[series?.id] || '')
      setSkillId(series?.curationSkill || 'executive-briefing')
      setSearchFind('')
      setSchedCadence(series?.cadence || 'Weekly')
      setSchedDay(series?.sendDay || 'Friday')
      setSchedTime(series?.sendTime || '8:00 AM')
    }
  }, [open, series?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const toggleSearch = (item) =>
    setSearches(prev => prev.find(s => s.name === item.name) ? prev.filter(s => s.name !== item.name) : [...prev, item])
  const isSearchActive = (name) => searches.some(s => s.name === name)

  const ARTICLE_COUNTS = [3, 5, 8, 10, 12, 15]

  const schedBadge = schedCadence === 'Daily'
    ? `Daily · ${schedTime}`
    : schedDay
    ? `${schedDay} · ${schedTime}`
    : schedTime

  const NAV = [
    { id: 'skill',    label: 'Mira Skill',    Icon: AutoAwesomeIcon,       badge: CURATION_SKILLS[skillId]?.label },
    { id: 'sources',  label: 'Sources',        Icon: ManageSearchIcon,      badge: searches.length ? `${searches.length} selected` : null },
    { id: 'prompt',   label: 'Instructions',   Icon: EditOutlinedIcon,      badge: prompt.trim() ? 'Set' : 'Optional' },
    { id: 'prefs',    label: 'Preferences',    Icon: SettingsOutlinedIcon,  badge: null },
    { id: 'schedule', label: 'Schedule',        Icon: ScheduleIcon,          badge: schedBadge },
  ]

  const PillGroup = ({ options, value, onChange }) => (
    <Box sx={{ display: 'flex', gap: 0.75 }}>
      {options.map(opt => (
        <Box key={opt.val} onClick={() => onChange(opt.val)}
          sx={{
            flex: 1, py: 0.75, px: 0.5, textAlign: 'center', borderRadius: '8px', cursor: 'pointer',
            border: `1.5px solid ${value === opt.val ? TEAL : 'rgba(0,0,0,0.12)'}`,
            bgcolor: value === opt.val ? 'rgba(0,130,127,0.07)' : 'transparent',
            transition: 'all 0.15s', '&:hover': { borderColor: TEAL },
          }}
        >
          <Typography sx={{ fontSize: '12px', fontWeight: value === opt.val ? 700 : 400, color: value === opt.val ? TEAL : 'text.secondary' }}>
            {opt.label}
          </Typography>
        </Box>
      ))}
    </Box>
  )

  return (
    <Dialog open={open} onClose={onClose}
      PaperProps={{ sx: { borderRadius: '14px', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '88vh', width: 680, maxWidth: '96vw' } }}>

      {/* ── Header ── */}
      <Box sx={{ px: 3, pt: 2.5, pb: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AutoAwesomeIcon sx={{ fontSize: 16, color: TEAL }} />
          <Typography sx={{ fontWeight: 700, fontSize: '15px' }}>Curation Settings</Typography>
          <Typography sx={{ fontSize: '13px', color: 'text.disabled' }}>·</Typography>
          <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>{series?.name}</Typography>
        </Box>
        <IconButton size="small" onClick={onClose}><CloseIcon sx={{ fontSize: 18 }} /></IconButton>
      </Box>

      {/* ── Body: left nav + right content ── */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Left nav */}
        <Box sx={{ width: 168, flexShrink: 0, borderRight: '1px solid', borderColor: 'divider', bgcolor: 'rgba(0,0,0,0.015)', pt: 1.5, pb: 2, display: 'flex', flexDirection: 'column', gap: 0.25 }}>
          {NAV.map(item => {
            const active = activeSection === item.id
            const NavIcon = item.Icon
            return (
              <Box key={item.id} onClick={() => setActiveSection(item.id)}
                sx={{
                  mx: 1, px: 1.25, py: 1, borderRadius: '8px', cursor: 'pointer',
                  bgcolor: active ? TEAL_LIGHT : 'transparent',
                  border: `1px solid ${active ? 'rgba(0,130,127,0.2)' : 'transparent'}`,
                  '&:hover': { bgcolor: active ? TEAL_LIGHT : 'rgba(0,0,0,0.04)' },
                  transition: 'all 0.12s',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.2 }}>
                  <NavIcon sx={{ fontSize: 14, color: active ? TEAL : 'text.disabled', flexShrink: 0 }} />
                  <Typography sx={{ fontSize: '13px', fontWeight: active ? 700 : 500, color: active ? TEAL : 'text.primary' }}>
                    {item.label}
                  </Typography>
                </Box>
                {item.badge && (
                  <Typography sx={{ fontSize: '11px', color: active ? TEAL : 'text.disabled', pl: '22px', lineHeight: 1.2 }}>
                    {item.badge}
                  </Typography>
                )}
              </Box>
            )
          })}
        </Box>

        {/* Right content — scrollable */}
        <Box sx={{ flex: 1, overflowY: 'auto', p: 3 }}>

          {/* ── Mira Skill ── */}
          {activeSection === 'skill' && (
            <Box>
              <Typography sx={{ fontSize: '13px', color: 'text.secondary', mb: 2 }}>
                Choose how Mira approaches curation for this series.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                {Object.values(CURATION_SKILLS).map(skill => {
                  const selected = skillId === skill.id
                  const SkillIcon = skill.Icon
                  return (
                    <Box key={skill.id} onClick={() => setSkillId(skill.id)}
                      sx={{
                        display: 'flex', alignItems: 'center', gap: 1.5,
                        px: 1.5, py: 1.25, borderRadius: '10px', cursor: 'pointer',
                        border: `1.5px solid ${selected ? skill.color : 'rgba(0,0,0,0.1)'}`,
                        bgcolor: selected ? skill.bg : 'transparent',
                        transition: 'all 0.15s',
                        '&:hover': { borderColor: skill.color, bgcolor: skill.bg },
                      }}
                    >
                      <Box sx={{ width: 34, height: 34, borderRadius: '8px', flexShrink: 0, bgcolor: selected ? `${skill.color}22` : 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <SkillIcon sx={{ fontSize: 17, color: selected ? skill.color : 'text.disabled' }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontWeight: 700, fontSize: '13px', color: selected ? skill.color : 'text.primary' }}>{skill.label}</Typography>
                        <Typography sx={{ fontSize: '11px', color: 'text.secondary', lineHeight: 1.4 }}>{skill.description}</Typography>
                      </Box>
                      {selected && <CheckCircleIcon sx={{ fontSize: 16, color: skill.color, flexShrink: 0 }} />}
                    </Box>
                  )
                })}
              </Box>
            </Box>
          )}

          {/* ── Sources ── */}
          {activeSection === 'sources' && (
            <Box>
              <Typography sx={{ fontSize: '13px', color: 'text.secondary', mb: 1.5 }}>
                Choose which saved searches Mira pulls from when curating each edition.
              </Typography>

              {searches.length > 0 && (
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1.5 }}>
                  {searches.map(s => {
                    const cfg = MODAL_SEARCH_ICON[s.type] || MODAL_SEARCH_ICON.explore
                    return (
                      <Chip key={s.name} size="small"
                        icon={cfg.Icon ? <cfg.Icon sx={{ fontSize: '12px !important', color: `${cfg.color} !important` }} /> : <Typography sx={{ fontSize: '11px', fontWeight: 800, color: cfg.color, ml: '6px !important' }}>#</Typography>}
                        label={s.name} onDelete={() => toggleSearch(s)}
                        sx={{ bgcolor: `${cfg.color}12`, border: `1px solid ${cfg.color}35`, '& .MuiChip-label': { fontSize: '0.72rem', color: cfg.color, fontWeight: 600 } }}
                      />
                    )
                  })}
                </Box>
              )}

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, bgcolor: 'rgba(0,0,0,0.04)', borderRadius: '8px', px: 1.25, py: 0.75, mb: 1 }}>
                <SearchIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                <input value={searchFind} onChange={e => setSearchFind(e.target.value)} placeholder="Find a search…"
                  style={{ border: 'none', background: 'none', outline: 'none', fontSize: '13px', flex: 1, color: 'inherit', fontFamily: 'inherit' }} />
              </Box>

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
                          <Box sx={{ width: 15, height: 15, border: `1.5px solid ${isSearchActive(item.name) ? TEAL : 'rgba(0,0,0,0.25)'}`, bgcolor: isSearchActive(item.name) ? TEAL : 'transparent', borderRadius: '3px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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

          {/* ── Instructions ── */}
          {activeSection === 'prompt' && (
            <Box>
              <Typography sx={{ fontSize: '13px', color: 'text.secondary', mb: 2 }}>
                Give Mira extra guidance on what to include, exclude, or prioritise. This runs every time a new edition is generated.
              </Typography>
              <TextField fullWidth multiline rows={5} size="small"
                placeholder="e.g. Always lead with stories that mention our CEO. Flag anything that contradicts our official messaging. Skip earnings call recaps and republished wire copy…"
                value={prompt} onChange={e => setPrompt(e.target.value)}
                sx={{ mb: 1.5, '& .MuiInputBase-root': { fontSize: '13px', borderRadius: '8px' } }}
              />
              <Typography sx={{ fontSize: '11px', color: 'text.disabled' }}>
                Leave blank and Mira will use the selected skill's default behaviour.
              </Typography>
            </Box>
          )}

          {/* ── Preferences ── */}
          {activeSection === 'prefs' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

              <Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, mb: 0.25 }}>Articles per edition</Typography>
                <Typography sx={{ fontSize: '12px', color: 'text.secondary', mb: 1.25 }}>Maximum articles Mira includes in each edition.</Typography>
                <Box sx={{ display: 'flex', gap: 0.75 }}>
                  {ARTICLE_COUNTS.map(n => (
                    <Box key={n} onClick={() => setArticleCount(n)}
                      sx={{ flex: 1, py: 0.75, textAlign: 'center', borderRadius: '8px', cursor: 'pointer', border: `1.5px solid ${articleCount === n ? TEAL : 'rgba(0,0,0,0.12)'}`, bgcolor: articleCount === n ? 'rgba(0,130,127,0.07)' : 'transparent', transition: 'all 0.15s', '&:hover': { borderColor: TEAL } }}
                    >
                      <Typography sx={{ fontSize: '13px', fontWeight: articleCount === n ? 700 : 400, color: articleCount === n ? TEAL : 'text.secondary' }}>{n}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, mb: 0.25 }}>Sentiment filter</Typography>
                <Typography sx={{ fontSize: '12px', color: 'text.secondary', mb: 1.25 }}>Only surface articles matching the selected sentiment.</Typography>
                <PillGroup value={sentiment} onChange={setSentiment} options={[
                  { val: 'all', label: 'All sentiment' },
                  { val: 'pos-neu', label: 'Positive & Neutral' },
                  { val: 'positive', label: 'Positive only' },
                ]} />
              </Box>

              <Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, mb: 0.25 }}>Outlet tier</Typography>
                <Typography sx={{ fontSize: '12px', color: 'text.secondary', mb: 1.25 }}>Restrict Mira to outlets of a certain reach tier.</Typography>
                <PillGroup value={outletTier} onChange={setOutletTier} options={[
                  { val: 'all', label: 'All outlets' },
                  { val: 'tier12', label: 'Tier 1 & 2 only' },
                  { val: 'tier1', label: 'Tier 1 only' },
                ]} />
              </Box>

            </Box>
          )}

          {/* ── Schedule ── */}
          {activeSection === 'schedule' && (() => {
            const WEEKDAYS   = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            const MONTH_DAYS = ['1st', '2nd', '3rd', '4th', '5th', '7th', '10th', '14th', '15th', '21st', '28th']
            const SEND_TIMES = ['6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '5:00 PM']
            const handleSchedCadenceChange = c => {
              setSchedCadence(c)
              if (c === 'Daily') setSchedDay(null)
              if (c === 'Weekly') setSchedDay(WEEKDAYS.includes(schedDay) ? schedDay : 'Friday')
              if (c === 'Monthly') setSchedDay(MONTH_DAYS.includes(schedDay) ? schedDay : '1st')
            }
            const summaryLabel = schedCadence === 'Daily'
              ? `Every day at ${schedTime}`
              : schedCadence === 'Weekly'
              ? `Every ${schedDay} at ${schedTime}`
              : `Monthly on the ${schedDay} at ${schedTime}`
            return (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                  <Typography sx={{ fontSize: '13px', color: 'text.secondary', mb: 2 }}>
                    Set when each edition is sent. Mira will complete curation before this time.
                  </Typography>

                  {/* Summary badge */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, p: 1.5, bgcolor: TEAL_LIGHT, borderRadius: '10px', border: `1.5px solid ${TEAL}20`, mb: 3 }}>
                    <ScheduleIcon sx={{ fontSize: 18, color: TEAL, flexShrink: 0 }} />
                    <Typography sx={{ fontSize: '13px', fontWeight: 700, color: TEAL }}>{summaryLabel}</Typography>
                  </Box>

                  {/* Cadence */}
                  <Box sx={{ mb: 3 }}>
                    <Typography sx={{ fontSize: '12px', fontWeight: 600, color: 'text.secondary', mb: 1, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Cadence</Typography>
                    <Box sx={{ display: 'flex', gap: 0.75 }}>
                      {['Daily', 'Weekly', 'Monthly'].map(c => (
                        <Box key={c} onClick={() => handleSchedCadenceChange(c)}
                          sx={{
                            flex: 1, py: 1, textAlign: 'center', borderRadius: '8px', cursor: 'pointer',
                            border: `1.5px solid ${schedCadence === c ? TEAL : 'rgba(0,0,0,0.12)'}`,
                            bgcolor: schedCadence === c ? TEAL_LIGHT : 'transparent',
                            transition: 'all 0.15s', '&:hover': { borderColor: TEAL },
                          }}
                        >
                          <Typography sx={{ fontSize: '13px', fontWeight: schedCadence === c ? 700 : 400, color: schedCadence === c ? TEAL : 'text.secondary' }}>{c}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  {/* Day picker — conditional */}
                  {schedCadence !== 'Daily' && (
                    <Box sx={{ mb: 3 }}>
                      <Typography sx={{ fontSize: '12px', fontWeight: 600, color: 'text.secondary', mb: 1, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        {schedCadence === 'Weekly' ? 'Day of week' : 'Day of month'}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {(schedCadence === 'Weekly' ? WEEKDAYS : MONTH_DAYS).map(day => (
                          <Box key={day} onClick={() => setSchedDay(day)}
                            sx={{
                              px: 1.25, py: 0.6, borderRadius: '7px', cursor: 'pointer',
                              border: `1.5px solid ${schedDay === day ? TEAL : 'rgba(0,0,0,0.12)'}`,
                              bgcolor: schedDay === day ? TEAL_LIGHT : 'transparent',
                              transition: 'all 0.15s', '&:hover': { borderColor: TEAL },
                            }}
                          >
                            <Typography sx={{ fontSize: '12px', fontWeight: schedDay === day ? 700 : 400, color: schedDay === day ? TEAL : 'text.secondary' }}>
                              {schedCadence === 'Weekly' ? day.slice(0, 3) : day}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  )}

                  {/* Time picker */}
                  <Box>
                    <Typography sx={{ fontSize: '12px', fontWeight: 600, color: 'text.secondary', mb: 1, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Send time</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {SEND_TIMES.map(t => (
                        <Box key={t} onClick={() => setSchedTime(t)}
                          sx={{
                            px: 1.25, py: 0.6, borderRadius: '7px', cursor: 'pointer',
                            border: `1.5px solid ${schedTime === t ? TEAL : 'rgba(0,0,0,0.12)'}`,
                            bgcolor: schedTime === t ? TEAL_LIGHT : 'transparent',
                            transition: 'all 0.15s', '&:hover': { borderColor: TEAL },
                          }}
                        >
                          <Typography sx={{ fontSize: '12px', fontWeight: schedTime === t ? 700 : 400, color: schedTime === t ? TEAL : 'text.secondary' }}>{t}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            )
          })()}

        </Box>
      </Box>

      {/* ── Footer ── */}
      <Box sx={{ px: 3, py: 2, borderTop: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1.5, flexShrink: 0 }}>
        <Button onClick={onClose} sx={{ textTransform: 'none', color: 'text.secondary', fontWeight: 500 }}>Cancel</Button>
        <Button variant="contained" onClick={onClose}
          sx={{ textTransform: 'none', fontWeight: 600, borderRadius: '8px', color: '#fff', bgcolor: TEAL, '&:hover': { bgcolor: '#006e6b' } }}>
          Save changes
        </Button>
      </Box>
    </Dialog>
  )
}

// ── Series detail right panel ─────────────────────────────────────────────────
function SeriesDetail({ series, curationSkill, onCurationSkillChange, initialPreviewOpen = false }) {
  const navigate = useNavigate()
  const editions = EDITION_HISTORY[series.id] || []
  const [curationOpen, setCurationOpen] = useState(false)
  const [headerSkillAnchor, setHeaderSkillAnchor] = useState(null)
  const openCuration = () => setCurationOpen(true)
  const effectiveSkill = curationSkill || series.curationSkill
  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      <CurationSettingsModal open={curationOpen} onClose={() => setCurationOpen(false)} series={series} />
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
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1, flexShrink: 0 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button size="small" startIcon={<PeopleOutlineIcon sx={{ fontSize: 15 }} />} variant="outlined" sx={{ textTransform: 'none', fontSize: '12px', borderColor: 'divider', color: 'text.secondary', py: 0.5 }}>
                {series.recipients} recipients
              </Button>
              <Button size="small" startIcon={<AutoAwesomeIcon sx={{ fontSize: 15 }} />} variant="outlined"
                onClick={() => openCuration()}
                sx={{ textTransform: 'none', fontSize: '12px', borderColor: 'divider', color: 'text.secondary', py: 0.5, '&:hover': { borderColor: TEAL, color: TEAL, bgcolor: 'rgba(0,130,127,0.04)' } }}>
                Curation settings
              </Button>
            </Box>
            {/* Series-level curation skill */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ fontSize: '11px', color: 'text.disabled' }}>Mira Curation Skill:</Typography>
              <CurationSkillBadge
                skillId={effectiveSkill}
                showChange
                onClick={e => setHeaderSkillAnchor(e.currentTarget)}
              />
              <CurationSkillMenu
                anchor={headerSkillAnchor}
                onClose={() => setHeaderSkillAnchor(null)}
                currentSkill={effectiveSkill}
                onSelect={skillId => { onCurationSkillChange && onCurationSkillChange(skillId); setHeaderSkillAnchor(null) }}
              />
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <CalendarTodayOutlinedIcon sx={{ fontSize: 13, color: 'text.disabled' }} />
            <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>Next send: <strong>{series.nextSend}</strong></Typography>
          </Box>
          <Box
            sx={{
              display: 'flex', alignItems: 'center', gap: 0.75, flexWrap: 'wrap',
              '&:hover .edit-sources-link': { opacity: 1 },
            }}
          >
            <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>Sources:</Typography>
            <SearchPills searches={series.searches} max={4} />
            <Typography
              className="edit-sources-link"
              onClick={() => openCuration()}
              sx={{ fontSize: '12px', color: TEAL, cursor: 'pointer', fontWeight: 500, ml: 0.25, opacity: 0, transition: 'opacity 0.15s', '&:hover': { textDecoration: 'underline' } }}
            >
              Edit sources
            </Typography>
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
          Next {series.cadence} Edition
        </Typography>
        <LatestEditionCard
          series={series}
          onEdit={() => navigate(`/mw-newsletters/editor/${series.id}`)}
          curationSkill={effectiveSkill}
          onCurationSkillChange={onCurationSkillChange}
          initialPreviewOpen={initialPreviewOpen}
        />

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

// ── Contact card thumbnail (mirrors NewsletterThumbnail style) ───────────────
function ContactCardThumbnail({ accentColor = PURPLE }) {
  const w = 68, h = 86
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
      <Box sx={{ bgcolor: accentColor, px: 1, pt: 0.9, pb: 0.75, display: 'flex', alignItems: 'center', gap: 0.6, flexShrink: 0 }}>
        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.75)', flexShrink: 0 }} />
        <Box sx={{ height: 4, width: 28, borderRadius: '2px', bgcolor: 'rgba(255,255,255,0.5)' }} />
      </Box>
      {/* Avatar circle */}
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1.25, pb: 0.75 }}>
        <Box sx={{ width: 22, height: 22, borderRadius: '50%', bgcolor: `${accentColor}20`, border: `1.5px solid ${accentColor}50`, overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Person silhouette: head circle + shoulders arc */}
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: accentColor, opacity: 0.55, mt: '3px', flexShrink: 0 }} />
          <Box sx={{ width: 14, height: 7, borderRadius: '7px 7px 0 0', bgcolor: accentColor, opacity: 0.35, mt: '1px', flexShrink: 0 }} />
        </Box>
      </Box>
      {/* Name line */}
      <Box sx={{ px: 1, mb: 0.75, display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ height: 4, width: '68%', borderRadius: '2px', bgcolor: 'rgba(0,0,0,0.2)' }} />
      </Box>
      {/* Info rows */}
      <Box sx={{ px: 1, display: 'flex', flexDirection: 'column', gap: 0.5, flex: 1 }}>
        <Box sx={{ height: 3, width: '88%', borderRadius: '2px', bgcolor: 'rgba(0,0,0,0.08)' }} />
        <Box sx={{ height: 3, width: '70%', borderRadius: '2px', bgcolor: `${accentColor}35` }} />
        <Box sx={{ height: 3, width: '82%', borderRadius: '2px', bgcolor: 'rgba(0,0,0,0.06)' }} />
        <Box sx={{ height: 3, width: '60%', borderRadius: '2px', bgcolor: `${accentColor}25` }} />
      </Box>
      {/* Footer strip */}
      <Box sx={{ height: 7, bgcolor: 'rgba(0,0,0,0.04)', borderTop: '1px solid rgba(0,0,0,0.06)' }} />
    </Box>
  )
}

// ── Stacked contact cards (mirrors StackedThumbnails style) ──────────────────
function StackedContactCards() {
  const cards = ['#8a1b78', '#a01e8e', PURPLE]  // back → front
  const w = 68, h = 86
  return (
    <Box sx={{ position: 'relative', width: w + 20, height: h + 12, flexShrink: 0 }}>
      {cards.map((color, i) => {
        const backness = cards.length - 1 - i   // 0 = front
        const rotate   = backness === 0 ? 0 : backness === 1 ? -5 : -9
        const tx       = backness === 0 ? 10 : backness === 1 ? 4 : 0
        const ty       = backness === 0 ? 12 : backness === 1 ? 6 : 0
        const isFront  = backness === 0
        return (
          <Box key={i} sx={{
            position: 'absolute', top: ty, left: tx, zIndex: i + 1,
            transform: `rotate(${rotate}deg)`, transformOrigin: 'bottom center',
            opacity: isFront ? 1 : 0.75 - backness * 0.1,
            filter: isFront ? 'none' : `brightness(${1 - backness * 0.06})`,
          }}>
            <ContactCardThumbnail accentColor={color} />
          </Box>
        )
      })}
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
const COL_GRID = '1.6fr 140px 150px 1fr 1fr 1fr 1fr 210px'

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
        { label: 'Edit series settings', icon: <SettingsOutlinedIcon sx={{ fontSize: 15 }} /> },
        { label: 'Manage recipients',      icon: <PeopleOutlineIcon sx={{ fontSize: 15 }} /> },
        { label: 'Duplicate series',       icon: <ViewStreamOutlinedIcon sx={{ fontSize: 15 }} /> },
        'divider',
        { label: 'Delete edition', icon: null, danger: true },
      ]
    : [
        { label: 'Open in editor',         icon: <OpenInNewIcon sx={{ fontSize: 15 }} />, primary: true },
        { label: 'Preview draft',          icon: <AllInboxOutlinedIcon sx={{ fontSize: 15 }} /> },
        'divider',
        { label: 'Edit series settings', icon: <SettingsOutlinedIcon sx={{ fontSize: 15 }} /> },
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
            {/* Date title */}
            <Box sx={{ mb: 0.4 }}>
              <Typography sx={{ fontSize: '13px', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.editionLabel}
              </Typography>
            </Box>
            {/* Series name alone on second line — full width, no crowding */}
            <Typography sx={{ fontSize: '11px', color: 'text.secondary', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {item.series.name}
            </Typography>
          </Box>
        </Box>

        {/* Status */}
        <Box>
          {isSent
            ? <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, bgcolor: 'rgba(0,0,0,0.05)', borderRadius: '4px', px: 1, py: 0.5 }}>
                <SendOutlinedIcon sx={{ fontSize: 12, color: 'text.disabled' }} />
                <Typography sx={{ fontSize: '11px', color: 'text.secondary', fontWeight: 600, lineHeight: 1 }}>Sent</Typography>
              </Box>
            : <StatusBadge status={item.status} />
          }
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
          {isSent
            ? <Tooltip title="View edition">
                <IconButton
                  size="small"
                  onClick={e => { e.stopPropagation(); window.open(`/mw-newsletters/preview/${item.series.id}`, '_blank') }}
                  sx={{ color: 'text.disabled' }}
                >
                  <OpenInNewIcon sx={{ fontSize: 14 }} />
                </IconButton>
              </Tooltip>
            : isReady
            ? <>
                {/* Preview button for ready editions */}
                <Button
                  size="small"
                  variant="outlined"
                  onClick={e => { e.stopPropagation(); window.open(`/mw-newsletters/preview/${item.series.id}`, '_blank') }}
                  sx={{
                    textTransform: 'none', fontSize: '11px', py: 0.5, px: 1.5,
                    fontWeight: 600, whiteSpace: 'nowrap',
                    borderColor: 'divider', color: 'text.secondary',
                  }}
                >
                  Preview
                </Button>
                {/* Review & Edit button for ready editions */}
                <Box
                  component="button"
                  onClick={e => { e.stopPropagation(); navigate(`/mw-newsletters/editor/${item.series.id}`) }}
                  sx={{
                    display: 'inline-flex', alignItems: 'center',
                    border: 'none', borderRadius: '6px', cursor: 'pointer',
                    padding: '0px 12px', height: '30px',
                    fontSize: '11px', fontWeight: 600, whiteSpace: 'nowrap',
                    bgcolor: AMBER, color: '#fff',
                    '&:hover': { bgcolor: '#9a4e08' },
                  }}
                >
                  Review &amp; Edit
                </Box>
              </>
            : <>
                {/* Preview button for curating editions */}
                <Button
                  size="small"
                  variant="outlined"
                  onClick={e => { e.stopPropagation(); window.open(`/mw-newsletters/preview/${item.series.id}`, '_blank') }}
                  sx={{
                    textTransform: 'none', fontSize: '11px', py: 0.5, px: 1.5,
                    fontWeight: 600, whiteSpace: 'nowrap',
                    borderColor: 'divider', color: 'text.secondary',
                  }}
                >
                  Preview
                </Button>
                {/* Edit button for curating editions */}
                <Button
                  size="small"
                  variant="outlined"
                  onClick={e => { e.stopPropagation(); navigate(`/mw-newsletters/editor/${item.series.id}`) }}
                  sx={{
                    textTransform: 'none', fontSize: '11px', py: 0.5, px: 1.5,
                    fontWeight: 600, whiteSpace: 'nowrap',
                    borderColor: TEAL, color: TEAL,
                    '&:hover': { bgcolor: 'rgba(0,130,127,0.06)', borderColor: TEAL },
                  }}
                >
                  Edit
                </Button>
              </>
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
                onClick={() => {
                  closeMenu()
                  if (item.label === 'Manage recipients') navigate('/mw-newsletters/recipients')
                  else if (item.label === 'Open in editor' || item.label === 'Review & Edit') navigate(`/mw-newsletters/editor/${item.series?.id || ''}`)
                }}
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

// ── Recipient list data ───────────────────────────────────────────────────────
const NEWSLETTERS_LIST = ['The Daily Brief', 'Monthly Round Up', 'Media Coverage Monthly', 'Competitor Digest']

const INITIAL_RECIPIENT_LISTS = [
  { id: 'external-list',    name: 'External List',      subscribers: 2840, usedIn: ['The Daily Brief', 'Monthly Round Up', 'Media Coverage Monthly'], owner: 'Maricela', updated: 'Mar 25, 2026', contacts: ['sarah.johnson@techcorp.com','michael.chen@mediagroup.com','emily.rodriguez@brandco.com','james.wilson@prweek.com','olivia.martinez@digitalink.com','david.kim@commsplus.com','sophie.taylor@globalpr.com','noah.brown@newsdesk.com','ava.davis@mediawatch.com','liam.miller@brandbeat.com','isabella.moore@coverage.io','mason.jackson@prfirm.com','mia.white@mediahub.com','ethan.harris@brandpulse.com','charlotte.martin@pr24.com','alexander.garcia@mediavault.com','amelia.walker@commslab.com','henry.hall@newspr.com'] },
  { id: 'c-suite',          name: 'C-Suite Leadership', subscribers: 12,   usedIn: ['Monthly Round Up', 'Media Coverage Monthly'], owner: 'Maricela', updated: 'Mar 25, 2026', contacts: ['ceo@company.com','coo@company.com','cfo@company.com','cmo@company.com','cto@company.com','chro@company.com','cso@company.com','chief.legal@company.com','chief.comm@company.com','evp.strategy@company.com','evp.operations@company.com','vp.brand@company.com'] },
  { id: 'tech-team',        name: 'Tech Team',          subscribers: 34,   usedIn: ['The Daily Brief', 'Monthly Round Up', 'Media Coverage Monthly', 'Competitor Digest'], owner: 'Maricela', updated: 'Mar 25, 2026', contacts: Array.from({length:34},(_,i)=>`engineer${i+1}@company.com`) },
  { id: 'media-team',       name: 'Media Team',         subscribers: 2677, usedIn: ['The Daily Brief'], owner: 'Maricela', updated: 'Mar 25, 2026', contacts: Array.from({length:20},(_,i)=>`mediacontact${i+1}@outlet.com`) },
  { id: 'leadership-team',  name: 'Leadership Team',    subscribers: 111,  usedIn: ['Monthly Round Up'], owner: 'Maricela', updated: 'Mar 25, 2026', contacts: Array.from({length:20},(_,i)=>`leader${i+1}@company.com`) },
  { id: 'press-contacts',   name: 'Press Contacts',     subscribers: 448,  usedIn: ['Media Coverage Monthly'], owner: 'Tony', updated: 'Apr 2, 2026', contacts: Array.from({length:20},(_,i)=>`press${i+1}@media.com`) },
  { id: 'partner-network',  name: 'Partner Network',    subscribers: 892,  usedIn: ['Competitor Digest', 'Monthly Round Up'], owner: 'Tony', updated: 'Apr 10, 2026', contacts: Array.from({length:20},(_,i)=>`partner${i+1}@agency.com`) },
  { id: 'board-members',    name: 'Board Members',      subscribers: 8,    usedIn: ['Monthly Round Up'], owner: 'Maricela', updated: 'Feb 14, 2026', contacts: Array.from({length:8},(_,i)=>`board.member${i+1}@company.com`) },
]

// ── Recipient Lists panel ─────────────────────────────────────────────────────
function RecipientListsPanel({ lists, setLists, onSelectList }) {
  const [search, setSearch] = useState('')
  const [expandedUsedIn, setExpandedUsedIn] = useState({})
  const [newListOpen, setNewListOpen] = useState(false)
  const [newListName, setNewListName] = useState('')
  const [snackMsg, setSnackMsg] = useState(null)
  const [rowMenuAnchor, setRowMenuAnchor] = useState(null)
  const [rowMenuList, setRowMenuList] = useState(null)
  const openRowMenu = (e, list) => { e.stopPropagation(); setRowMenuAnchor(e.currentTarget); setRowMenuList(list) }
  const closeRowMenu = () => { setRowMenuAnchor(null); setRowMenuList(null) }

  const filtered = lists.filter(l => l.name.toLowerCase().includes(search.toLowerCase()))
  const toggleUsedIn = id => setExpandedUsedIn(prev => ({ ...prev, [id]: !prev[id] }))

  const handleNewList = () => {
    if (!newListName.trim()) return
    const id = newListName.toLowerCase().replace(/\s+/g,'-') + '-' + Date.now()
    setLists(prev => [...prev, { id, name: newListName.trim(), subscribers: 0, usedIn: [], owner: 'Tony', updated: 'Apr 20, 2026', contacts: [] }])
    setNewListOpen(false); setNewListName(''); setSnackMsg('List created')
  }
  const handleDuplicate = list => {
    setLists(prev => [...prev, { ...list, id: list.id+'-copy', name: list.name+' (Copy)', updated: 'Apr 20, 2026' }])
    setSnackMsg(`"${list.name}" duplicated`)
  }
  const handleDelete = id => {
    const name = lists.find(l=>l.id===id)?.name
    setLists(prev => prev.filter(l=>l.id!==id)); setSnackMsg(`"${name}" deleted`)
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', bgcolor: 'background.paper' }}>
      {/* Header */}
      <Box sx={{ px: 3, pt: 3, pb: 2, borderBottom: '1px solid', borderColor: 'divider', flexShrink: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
            <StackedContactCards />
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: '20px', mb: 0.25 }}>Recipient Lists</Typography>
              <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>{lists.length} lists · {lists.reduce((s,l)=>s+l.subscribers,0).toLocaleString()} total subscribers</Typography>
            </Box>
          </Box>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setNewListOpen(true)}
            sx={{ bgcolor: PURPLE, color: '#fff', '&:hover': { bgcolor: '#9a1f87' }, textTransform: 'none', fontWeight: 600 }}>
            New List
          </Button>
        </Box>
      </Box>

      {/* Table */}
      <Box sx={{ flex: 1, overflow: 'auto', px: 3, py: 2 }}>
        {/* Toolbar */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '13px', color: 'text.secondary' }}>{filtered.length} Lists</Typography>
          <Box sx={{ flex: 1 }} />
          <TextField size="small" placeholder="Search lists…" value={search} onChange={e => setSearch(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 15, color: 'text.disabled' }} /></InputAdornment> }}
            sx={{ width: 200, '& .MuiOutlinedInput-root': { fontSize: '13px', height: 32 } }}
          />
        </Box>

        {/* Column headers */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 110px 200px 110px 1fr', px: 1.5, py: 1, bgcolor: 'rgba(0,0,0,0.025)', borderRadius: '6px 6px 0 0', border: '1px solid', borderColor: 'divider', borderBottom: 'none' }}>
          {['List Name','Subscribers','Used In','Owner','Last Updated'].map((col,i) => (
            <Typography key={col} sx={{ fontSize: '11px', fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: i >= 4 ? 'right' : 'left' }}>{col}</Typography>
          ))}
        </Box>

        {/* Rows */}
        <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '0 0 6px 6px', overflow: 'hidden' }}>
          {filtered.map((list, idx) => (
            <Box key={list.id} sx={{
              display: 'grid', gridTemplateColumns: '2fr 110px 200px 110px 1fr',
              px: 1.5, py: 1.5, alignItems: 'center', position: 'relative',
              borderBottom: idx < filtered.length-1 ? '1px solid' : 'none', borderColor: 'divider',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.015)' },
              '& .row-kebab': { opacity: 0 },
              '&:hover .row-kebab': { opacity: 1 },
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => onSelectList(list.id)}>
                <PeopleOutlineIcon sx={{ fontSize: 18, color: 'text.secondary', flexShrink: 0 }} />
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: TEAL, '&:hover': { textDecoration: 'underline' } }}>{list.name}</Typography>
              </Box>
              <Typography sx={{ fontSize: '13px' }}>{list.subscribers.toLocaleString()}</Typography>
              <Box>
                {list.usedIn.length === 0
                  ? <Typography sx={{ fontSize: '12px', color: 'text.disabled', fontStyle: 'italic' }}>Not used</Typography>
                  : list.usedIn.length === 1
                    ? <Typography sx={{ fontSize: '12px', color: 'text.primary' }}>{list.usedIn[0]}</Typography>
                    : <Box>
                        <Box onClick={() => toggleUsedIn(list.id)} sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.4, cursor: 'pointer', px: 0.75, py: 0.25, borderRadius: '4px', border: '1px solid', borderColor: 'divider', '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' } }}>
                          <Typography sx={{ fontSize: '12px', fontWeight: 500 }}>{list.usedIn.length} Newsletters</Typography>
                          <ArrowDropDownIcon sx={{ fontSize: 15, color: 'text.secondary', transform: expandedUsedIn[list.id] ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
                        </Box>
                        {expandedUsedIn[list.id] && <Box sx={{ mt: 0.5 }}>{list.usedIn.map(nl => <Typography key={nl} sx={{ fontSize: '11px', color: 'text.secondary', pl: 0.5 }}>• {nl}</Typography>)}</Box>}
                      </Box>
                }
              </Box>
              <Typography sx={{ fontSize: '13px', color: 'text.primary' }}>{list.owner}</Typography>
              {/* Last Updated + hover kebab */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>{list.updated}</Typography>
                <IconButton className="row-kebab" size="small" onClick={e => openRowMenu(e, list)}
                  sx={{ color: 'text.disabled', transition: 'opacity 0.15s', '&:hover': { color: 'text.primary', bgcolor: 'rgba(0,0,0,0.06)' } }}>
                  <MoreVertIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Box>
            </Box>
          ))}
          {filtered.length === 0 && <Box sx={{ py: 5, textAlign: 'center' }}><Typography sx={{ color: 'text.disabled', fontSize: '13px' }}>No lists match "{search}"</Typography></Box>}
        </Box>

        {/* Row kebab menu */}
        <Menu anchorEl={rowMenuAnchor} open={Boolean(rowMenuAnchor)} onClose={closeRowMenu}
          PaperProps={{ sx: { minWidth: 160, boxShadow: '0 4px 16px rgba(0,0,0,0.12)', borderRadius: '8px' } }}>
          <MenuItem onClick={() => { onSelectList(rowMenuList?.id); closeRowMenu() }} sx={{ fontSize: '13px', gap: 1.25 }}>
            <EditOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />Edit list
          </MenuItem>
          <MenuItem onClick={() => { handleDuplicate(rowMenuList); closeRowMenu() }} sx={{ fontSize: '13px', gap: 1.25 }}>
            <ContentCopyIcon sx={{ fontSize: 15, color: 'text.secondary' }} />Duplicate
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => { handleDelete(rowMenuList?.id); closeRowMenu() }} sx={{ fontSize: '13px', gap: 1.25, color: 'error.main' }}>
            <DeleteOutlineIcon sx={{ fontSize: 16 }} />Delete
          </MenuItem>
        </Menu>
      </Box>

      {/* New list dialog */}
      <Dialog open={newListOpen} onClose={() => setNewListOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, fontSize: '16px' }}>New Recipient List</DialogTitle>
        <DialogContent>
          <TextField autoFocus fullWidth label="List name" variant="outlined" size="small" value={newListName} onChange={e => setNewListName(e.target.value)} onKeyDown={e => e.key==='Enter' && handleNewList()} sx={{ mt: 1 }} />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setNewListOpen(false)} sx={{ textTransform: 'none', color: 'text.secondary' }}>Cancel</Button>
          <Button variant="contained" onClick={handleNewList} disabled={!newListName.trim()} sx={{ textTransform: 'none', fontWeight: 600, bgcolor: PURPLE, color: '#fff', '&:hover': { bgcolor: '#9a1f87' } }}>Create List</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={Boolean(snackMsg)} autoHideDuration={3000} onClose={() => setSnackMsg(null)}
        message={<Box sx={{ display:'flex', alignItems:'center', gap:1 }}><CheckCircleIcon sx={{ fontSize:15, color:'#4caf50' }} />{snackMsg}</Box>}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} />
    </Box>
  )
}

// ── Recipient detail panel ────────────────────────────────────────────────────
function RecipientDetailPanel({ listId, lists, setLists, onBack }) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [addOpen, setAddOpen] = useState(false)
  const [newEmails, setNewEmails] = useState('')
  const [nlMenuAnchor, setNlMenuAnchor] = useState(null)
  const [kebabAnchor, setKebabAnchor] = useState(null)
  const [snackMsg, setSnackMsg] = useState(null)
  const PAGE_SIZE = 12

  const list = lists.find(l => l.id === listId)
  const updateList = fn => setLists(prev => prev.map(l => l.id === listId ? fn(l) : l))

  if (!list) return null

  const filtered = list.contacts.filter(c => c.toLowerCase().includes(search.toLowerCase()))
  const paginated = filtered.slice(page * PAGE_SIZE, (page+1) * PAGE_SIZE)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)

  const handleDeleteContact = email => updateList(l => ({ ...l, contacts: l.contacts.filter(c=>c!==email), subscribers: l.subscribers-1 }))
  const handleAddContacts = () => {
    const emails = newEmails.split(/[\n,;]+/).map(e=>e.trim()).filter(e=>e.includes('@'))
    if (!emails.length) return
    updateList(l => ({ ...l, contacts: [...l.contacts,...emails], subscribers: l.subscribers+emails.length }))
    setAddOpen(false); setNewEmails(''); setSnackMsg(`${emails.length} contact${emails.length>1?'s':''} added`)
  }
  const handleToggleNewsletter = nl => updateList(l => ({ ...l, usedIn: l.usedIn.includes(nl) ? l.usedIn.filter(n=>n!==nl) : [...l.usedIn,nl] }))

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', bgcolor: 'background.paper' }}>
      {/* Header */}
      <Box sx={{ px: 3, pt: 3, pb: 2, borderBottom: '1px solid', borderColor: 'divider', flexShrink: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.25 }}>
          <Tooltip title="Back to Recipient Lists">
            <IconButton size="small" onClick={onBack} sx={{ color: 'text.secondary', bgcolor: 'rgba(0,0,0,0.04)', '&:hover': { bgcolor: 'rgba(0,0,0,0.08)' } }}>
              <ArrowBackIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Typography sx={{ fontWeight: 700, fontSize: '20px' }}>{list.name}</Typography>
          <IconButton size="small" onClick={e => setKebabAnchor(e.currentTarget)} sx={{ color: 'text.secondary' }}><MoreVertIcon fontSize="small" /></IconButton>
          <Box sx={{ flex: 1 }} />
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddOpen(true)}
            sx={{ bgcolor: PURPLE, color: '#fff', '&:hover': { bgcolor: '#9a1f87' }, textTransform: 'none', fontWeight: 600 }}>
            Add Recipients
          </Button>
        </Box>
        {/* Newsletter chips */}
        <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography sx={{ fontSize: '12px', color: 'text.disabled', mr: 0.5 }}>Sent to:</Typography>
          {list.usedIn.length === 0
            ? <Typography sx={{ fontSize: '12px', color: 'text.disabled', fontStyle: 'italic' }}>No newsletters assigned</Typography>
            : list.usedIn.map(nl => <Chip key={nl} label={nl} size="small" sx={{ fontSize: '11px', height: 22, bgcolor: TEAL_LIGHT, color: TEAL, fontWeight: 600 }} />)
          }
          <Chip icon={<AddIcon sx={{ fontSize:'12px !important' }} />} label="Assign to series" size="small"
            onClick={e => setNlMenuAnchor(e.currentTarget)}
            sx={{ fontSize: '11px', height: 22, cursor: 'pointer', bgcolor: 'transparent', border: '1px dashed rgba(0,0,0,0.2)', color: 'text.secondary', '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' } }} />
        </Box>
      </Box>

      {/* Newsletter assignment menu */}
      <Menu anchorEl={nlMenuAnchor} open={Boolean(nlMenuAnchor)} onClose={() => setNlMenuAnchor(null)}>
        <Box sx={{ px: 2, py: 0.75, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography sx={{ fontSize: '11px', fontWeight: 700, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Assign to newsletter series</Typography>
        </Box>
        {NEWSLETTERS_LIST.map(nl => (
          <MenuItem key={nl} onClick={() => handleToggleNewsletter(nl)} sx={{ fontSize: '13px', gap: 1 }}>
            <Box sx={{ width: 15, height: 15, borderRadius: '3px', border: `2px solid ${list.usedIn.includes(nl) ? TEAL : 'rgba(0,0,0,0.25)'}`, bgcolor: list.usedIn.includes(nl) ? TEAL : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {list.usedIn.includes(nl) && <Box sx={{ width: 5, height: 5, bgcolor: '#fff', borderRadius: '1px' }} />}
            </Box>
            {nl}
          </MenuItem>
        ))}
      </Menu>

      {/* Kebab menu */}
      <Menu anchorEl={kebabAnchor} open={Boolean(kebabAnchor)} onClose={() => setKebabAnchor(null)}>
        <MenuItem sx={{ fontSize: '13px' }} onClick={() => setKebabAnchor(null)}>Rename list</MenuItem>
        <MenuItem sx={{ fontSize: '13px' }} onClick={() => setKebabAnchor(null)}>Export contacts</MenuItem>
        <MenuItem sx={{ fontSize: '13px' }} onClick={() => setKebabAnchor(null)}>Duplicate list</MenuItem>
        <Divider />
        <MenuItem sx={{ fontSize: '13px', color: 'error.main' }} onClick={() => { setKebabAnchor(null); onBack() }}>Delete list</MenuItem>
      </Menu>

      {/* Table */}
      <Box sx={{ flex: 1, overflow: 'auto', px: 3, py: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1.5 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '13px', color: 'text.secondary' }}>{filtered.length.toLocaleString()} Contacts</Typography>
          <Box sx={{ flex: 1 }} />
          <TextField size="small" placeholder="Search contacts…" value={search} onChange={e => { setSearch(e.target.value); setPage(0) }}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 15, color: 'text.disabled' }} /></InputAdornment> }}
            sx={{ width: 200, '& .MuiOutlinedInput-root': { fontSize: '13px', height: 32 } }}
          />
        </Box>

        <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '6px', overflow: 'hidden' }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 70px', px: 1.5, py: 1, bgcolor: 'rgba(0,0,0,0.025)', borderBottom: '1px solid', borderColor: 'divider' }}>
            {['Email','Actions'].map((col,i) => <Typography key={col} sx={{ fontSize: '11px', fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: i===1?'right':'left' }}>{col}</Typography>)}
          </Box>
          {paginated.map((email, idx) => (
            <Box key={email+idx} sx={{ display: 'grid', gridTemplateColumns: '1fr 70px', px: 1.5, py: 1.25, alignItems: 'center', borderBottom: idx < paginated.length-1 ? '1px solid' : 'none', borderColor: 'divider', '&:hover': { bgcolor: 'rgba(0,0,0,0.015)' }, '& .del-btn': { opacity: 0 }, '&:hover .del-btn': { opacity: 1 } }}>
              <Typography sx={{ fontSize: '13px' }}>{email}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Tooltip title="Remove">
                  <IconButton className="del-btn" size="small" onClick={() => handleDeleteContact(email)} sx={{ color: 'text.disabled', transition: 'opacity 0.15s', '&:hover': { color: 'error.main' } }}>
                    <DeleteOutlineIcon sx={{ fontSize: 15 }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          ))}
          {filtered.length === 0 && <Box sx={{ py: 5, textAlign: 'center' }}><Typography sx={{ color: 'text.disabled', fontSize: '13px' }}>{search ? `No contacts match "${search}"` : 'No contacts yet.'}</Typography></Box>}
          {totalPages > 1 && (
            <Box sx={{ px: 1.5, py: 1, display: 'flex', alignItems: 'center', borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography sx={{ fontSize: '12px', color: 'text.secondary', flex: 1 }}>{page*PAGE_SIZE+1}–{Math.min((page+1)*PAGE_SIZE, filtered.length)} of {filtered.length.toLocaleString()}</Typography>
              <Button size="small" disabled={page===0} onClick={() => setPage(p=>p-1)} sx={{ textTransform: 'none', fontSize: '12px', px: 1 }}>Previous</Button>
              <Button size="small" disabled={page>=totalPages-1} onClick={() => setPage(p=>p+1)} sx={{ textTransform: 'none', fontSize: '12px', px: 1 }}>Next</Button>
            </Box>
          )}
        </Box>
      </Box>

      {/* Add contacts dialog */}
      <Dialog open={addOpen} onClose={() => setAddOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, fontSize: '16px' }}>Add Recipients</DialogTitle>
        <DialogContent>
          <Typography sx={{ fontSize: '13px', color: 'text.secondary', mb: 1.5 }}>Enter email addresses separated by commas, semicolons, or new lines.</Typography>
          <TextField autoFocus fullWidth multiline rows={5} placeholder="name@company.com, name2@company.com…" value={newEmails} onChange={e => setNewEmails(e.target.value)} sx={{ '& .MuiOutlinedInput-root': { fontSize: '13px' } }} />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setAddOpen(false)} sx={{ textTransform: 'none', color: 'text.secondary' }}>Cancel</Button>
          <Button variant="contained" onClick={handleAddContacts} disabled={!newEmails.trim()} sx={{ textTransform: 'none', fontWeight: 600, bgcolor: PURPLE, color: '#fff', '&:hover': { bgcolor: '#9a1f87' } }}>Add Recipients</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={Boolean(snackMsg)} autoHideDuration={3000} onClose={() => setSnackMsg(null)}
        message={<Box sx={{ display:'flex', alignItems:'center', gap:1 }}><CheckCircleIcon sx={{ fontSize:15, color:'#4caf50' }} />{snackMsg}</Box>}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} />
    </Box>
  )
}

// ── All Newsletters main view ─────────────────────────────────────────────────
function AllNewslettersInbox() {
  const [filter,  setFilter]  = useState('all')
  const [sortCol, setSortCol] = useState('status')
  const [sortDir, setSortDir] = useState('asc')

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
    const primary = typeof av === 'string'
      ? (sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av))
      : (sortDir === 'asc' ? av - bv : bv - av)
    // Secondary sort by date descending within same status group
    if (primary === 0 && sortCol === 'status') return b.dateSortVal - a.dateSortVal
    return primary
  })

  const HEADER_COLS = [
    { key: 'edition',    label: 'Edition',     align: 'left'  },
    { key: 'status',     label: 'Status',      align: 'left'  },
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

        {/* Performance strip — aggregated across all series */}
        {(() => {
          const allEditions = Object.values(EDITION_HISTORY).flat()
          const opens  = allEditions.map(e => parseFloat(e.open))
          const clicks = allEditions.map(e => parseFloat(e.clicks))
          const avgOpen   = (opens.reduce((a, b) => a + b, 0) / opens.length).toFixed(1)
          const avgClicks = (clicks.reduce((a, b) => a + b, 0) / clicks.length).toFixed(1)
          const totalRecipients = SERIES.reduce((a, s) => a + s.recipients, 0)

          // Trend: average of most-recent edition per series vs second-most-recent
          const recentOpens = Object.values(EDITION_HISTORY).map(eds => parseFloat(eds[0]?.open ?? 0))
          const prevOpens   = Object.values(EDITION_HISTORY).map(eds => parseFloat(eds[1]?.open ?? eds[0]?.open ?? 0))
          const openTrend   = (recentOpens.reduce((a,b)=>a+b,0)/recentOpens.length) - (prevOpens.reduce((a,b)=>a+b,0)/prevOpens.length)

          const recentClicks = Object.values(EDITION_HISTORY).map(eds => parseFloat(eds[0]?.clicks ?? 0))
          const prevClicks   = Object.values(EDITION_HISTORY).map(eds => parseFloat(eds[1]?.clicks ?? eds[0]?.clicks ?? 0))
          const clickTrend   = (recentClicks.reduce((a,b)=>a+b,0)/recentClicks.length) - (prevClicks.reduce((a,b)=>a+b,0)/prevClicks.length)

          const metrics = [
            { label: 'Avg Open Rate',    value: `${avgOpen}%`,       trend: openTrend,  trendLabel: 'vs prev editions' },
            { label: 'Avg Click Rate',   value: `${avgClicks}%`,     trend: clickTrend, trendLabel: 'vs prev editions' },
            { label: 'Editions Sent',    value: allEditions.length,  trend: null,       trendLabel: 'total sent'       },
            { label: 'Total Subscribers',value: totalRecipients,     trend: null,       trendLabel: 'across all series'},
            { label: 'Active Series',    value: SERIES.length,       trend: null,       trendLabel: 'newsletters'      },
          ]

          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0, mb: 1.75, mt: 0.25 }}>
              <Typography sx={{ fontSize: '10px', fontWeight: 700, color: 'text.disabled', letterSpacing: '0.08em', textTransform: 'uppercase', mr: 2, flexShrink: 0 }}>
                Overall Performance
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
                        <Typography sx={{ fontSize: '10px', fontWeight: 600, color: m.trend > 0 ? '#16a34a' : m.trend < 0 ? '#dc2626' : 'text.disabled' }}>
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
            textTransform: 'none', fontWeight: 600, borderRadius: '8px', color: '#fff',
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

// ── Newsletter Onboarding Flow ────────────────────────────────────────────────

const AVAILABLE_SEARCHES = [
  { name: 'Brand Monitoring',   type: 'explore' },
  { name: 'Competitor Watch',   type: 'explore' },
  { name: 'Industry News',      type: 'rss' },
  { name: 'Executive Coverage', type: 'explore' },
  { name: 'Product Mentions',   type: 'explore' },
  { name: 'Market Trends',      type: 'rss' },
]

// Mock analysis results Mira would surface from a reference upload/paste
const MOCK_ANALYSIS = {
  'coverage-roundup': {
    sections: ['Corporate News', 'Competitor Coverage', 'Industry Must-Reads'],
    sources: ['Yahoo Finance', 'CNBC', 'Bloomberg', 'Fast Company'],
    sourcesExtra: 4,
    cadence: 'Weekly (Mondays)',
    format: 'Broad coverage · ~12 articles · 1–2 sentence summaries',
    audience: 'Internal comms & leadership team',
  },
  'executive-briefing': {
    sections: ['Key Highlights', 'Strategic Context', 'What to Watch'],
    sources: ['Reuters', 'Financial Times', 'Bloomberg', 'Axios'],
    sourcesExtra: 2,
    cadence: 'Weekly (Fridays)',
    format: 'Executive-facing · ~8 articles · 2–3 sentence summaries',
    audience: 'Leadership & C-Suite',
  },
  'analytics-snapshot': {
    sections: ['Share of Voice', 'Sentiment Breakdown', 'Top Stories by Reach'],
    sources: ['Meltwater', 'Brandwatch', 'Google Analytics'],
    sourcesExtra: 2,
    cadence: 'Monthly',
    format: 'Data-focused · ~6 metric sections · Charts + narrative',
    audience: 'Brand & comms team',
  },
}

const GEN_STEPS_BASE = [
  { pct: 0,  msg: 'Setting up your newsletter series…' },
  { pct: 18, msg: 'Connecting to Brand Monitoring search…' },
  { pct: 42, msg: 'Mira is scanning and ranking articles…' },
  { pct: 67, msg: 'Curating your first edition…' },
  { pct: 88, msg: 'Applying your style and preferences…' },
]

const GEN_STEPS_WITH_REF = [
  { pct: 0,  msg: 'Setting up your newsletter series…' },
  { pct: 15, msg: 'Connecting to Brand Monitoring search…' },
  { pct: 32, msg: 'Analysing your reference edition for style and structure…' },
  { pct: 56, msg: 'Mira is applying your editorial voice to article selection…' },
  { pct: 78, msg: 'Curating your first edition in your style…' },
  { pct: 92, msg: 'Final formatting and quality checks…' },
]

// Visual on the landing page — shows the "searches → newsletter" transformation
function OnboardingVisual() {
  const articles = [
    { title: 'Meltwater expands AI capabilities with new acquisition', source: 'TechCrunch', age: '2h ago' },
    { title: 'Media intelligence: what leading brands do differently', source: 'Forbes',     age: '5h ago' },
    { title: 'Q1 earnings: media software sector up 14%',              source: 'Reuters',    age: '8h ago' },
  ]
  return (
    <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'center' }}>
      {/* Source cards */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, flex: 1 }}>
        {articles.map((a, i) => (
          <Box key={i} sx={{
            p: 1.5, bgcolor: '#fff', borderRadius: '8px',
            border: '1px solid rgba(0,0,0,0.09)',
            boxShadow: `0 ${1 + i}px ${4 + i * 2}px rgba(0,0,0,0.06)`,
            transform: `translateY(${i * 1}px)`,
          }}>
            <Typography sx={{ fontSize: '10.5px', fontWeight: 600, lineHeight: 1.4, mb: 0.5, color: 'text.primary' }}>
              {a.title}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: TEAL, flexShrink: 0 }} />
              <Typography sx={{ fontSize: '10px', color: TEAL, fontWeight: 600 }}>{a.source}</Typography>
              <Typography sx={{ fontSize: '10px', color: 'text.disabled' }}>{a.age}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Arrow + AI sparkle */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.75, px: 0.25 }}>
        <AutoAwesomeIcon sx={{
          fontSize: 24, color: TEAL,
          '@keyframes ob-sparkle': { '0%,100%': { opacity:1, transform:'scale(1) rotate(-5deg)' }, '50%': { opacity:0.65, transform:'scale(1.2) rotate(5deg)' } },
          animation: 'ob-sparkle 2.4s ease-in-out infinite',
        }} />
        <ArrowForwardIcon sx={{ fontSize: 16, color: TEAL, opacity: 0.35 }} />
      </Box>

      {/* Newsletter preview card */}
      <Box sx={{
        width: 130, flexShrink: 0, bgcolor: '#fff', borderRadius: '10px',
        border: `1.5px solid ${TEAL}35`,
        boxShadow: '0 12px 32px rgba(0,130,127,0.14), 0 3px 10px rgba(0,0,0,0.07)',
        overflow: 'hidden',
      }}>
        <Box sx={{ bgcolor: TEAL, px: 1.5, py: 1.25, display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '2px', bgcolor: 'rgba(255,255,255,0.75)', flexShrink: 0 }} />
          <Box sx={{ height: 4, width: 44, bgcolor: 'rgba(255,255,255,0.5)', borderRadius: 2 }} />
        </Box>
        <Box sx={{ p: 1.25, display: 'flex', flexDirection: 'column', gap: 0.8 }}>
          <Box sx={{ height: 5, width: '92%', bgcolor: 'rgba(0,0,0,0.18)', borderRadius: 2 }} />
          <Box sx={{ height: 3, width: '68%', bgcolor: 'rgba(0,0,0,0.09)', borderRadius: 2 }} />
          <Box sx={{ height: 1, bgcolor: 'rgba(0,0,0,0.07)', my: 0.25 }} />
          {[78, 58, 88, 50, 72].map((w, i) => (
            <Box key={i} sx={{ height: i % 2 === 0 ? 3 : 2.5, width: `${w}%`, borderRadius: 2, bgcolor: i % 3 === 0 ? `${TEAL}40` : 'rgba(0,0,0,0.07)' }} />
          ))}
        </Box>
        <Box sx={{ height: 18, bgcolor: 'rgba(0,0,0,0.03)', borderTop: '1px solid rgba(0,0,0,0.06)' }} />
      </Box>
    </Box>
  )
}

// Per-skill copy for the "learn from example" step
const SKILL_EXAMPLE_COPY = {
  'coverage-roundup': {
    headline: 'Share a roundup Mira can learn from',
    subhead: 'Upload or paste a previous edition and Mira will study how you select stories, structure coverage, and balance topics — so every roundup it produces sounds unmistakably like you.',
    learnPoints: ['Story selection and prioritisation', 'Section structure and cadence', 'Tone and editorial voice'],
    uploadLabel: 'Drop a previous roundup edition here',
    pasteLabel: 'Or paste a past edition below',
    pastePlaceholder: 'Paste the full content of a previous roundup — subject line, body copy, article selections, any commentary. The richer the example, the better Mira calibrates…',
  },
  'executive-briefing': {
    headline: 'Show Mira how you brief the room',
    subhead: 'Upload or paste a past executive briefing and Mira will learn how you distil complex news into clear, decisive intelligence — your framing, your depth, your language.',
    learnPoints: ['How you frame and synthesise news', 'Level of depth vs. brevity', 'The language your executives expect'],
    uploadLabel: 'Drop a previous executive briefing here',
    pasteLabel: 'Or paste a past briefing below',
    pastePlaceholder: 'Paste a previous executive briefing — the key points, context, and any recommendations or framing. Mira will learn to match your voice and judgement…',
  },
  'analytics-snapshot': {
    headline: 'Teach Mira your metrics narrative',
    subhead: 'Upload or paste a past report and Mira will learn which numbers you lead with, how you contextualise performance, and what story matters most to your stakeholders.',
    learnPoints: ['Which metrics you prioritise', 'How you contextualise and benchmark', 'The narrative arc your audience expects'],
    uploadLabel: 'Drop a previous analytics report here',
    pasteLabel: 'Or paste a past report below',
    pastePlaceholder: 'Paste a previous analytics or performance report — metrics, commentary, trends, and any storytelling context. Mira will learn how you turn data into a narrative…',
  },
}

function NewsletterOnboarding({ onComplete }) {
  const [phase, setPhase]     = useState('landing')   // 'landing' | 'wizard' | 'generating'
  const [step, setStep]       = useState(0)            // 0=skill, 1=example, 2=logo, 3=recipients, 4=schedule
  const [skill, setSkill]     = useState(null)
  const [logoUrl, setLogoUrl]   = useState(null)
  const [logoName, setLogoName] = useState('')
  const [brandAssets, setBrandAssets] = useState([])   // [{ name, size, type }]
  const brandAssetsInputRef = useRef(null)
  const [refFileName, setRefFileName] = useState('')
  const [refPaste, setRefPaste]       = useState('')
  const [analysisState, setAnalysisState] = useState(null)  // null | 'loading' | 'shown' | 'confirmed'
  const [recipients, setRecipients] = useState('')
  const [selectedSearches, setSelectedSearches] = useState(AVAILABLE_SEARCHES.slice(0, 3).map(s => s.name))
  const [cadence, setCadence]   = useState('Weekly')
  const [sendDay, setSendDay]   = useState('Friday')
  const [sendTime, setSendTime] = useState('8:00 AM')
  const [genProgress, setGenProgress] = useState(0)
  const [genMessage, setGenMessage]   = useState(GEN_STEPS_BASE[0].msg)
  const [genDone, setGenDone] = useState(false)
  const logoInputRef = useRef(null)
  const refFileInputRef = useRef(null)

  const STEP_LABELS = ['Share an example', 'Choose a skill', 'Upload your logo', 'Add recipients', 'Set a schedule']

  const hasRefContent = !!(refFileName || refPaste.trim())

  // Drive the generating animation — use richer steps when a reference was provided
  useEffect(() => {
    if (phase !== 'generating') return
    const GEN_STEPS = hasRefContent ? GEN_STEPS_WITH_REF : GEN_STEPS_BASE
    setGenProgress(GEN_STEPS[0].pct)
    setGenMessage(GEN_STEPS[0].msg)
    setGenDone(false)
    let i = 1
    const tick = setInterval(() => {
      if (i < GEN_STEPS.length) {
        setGenProgress(GEN_STEPS[i].pct)
        setGenMessage(GEN_STEPS[i].msg)
        i++
      } else {
        clearInterval(tick)
        setGenProgress(100)
        setGenMessage('Your first edition is ready!')
        setGenDone(true)
        setTimeout(() => onComplete({ skill, logoUrl, recipients, cadence, sendDay, sendTime, selectedSearches }), 1400)
      }
    }, 920)
    return () => clearInterval(tick)
  }, [phase, onComplete, hasRefContent]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogoFile = file => {
    if (!file) return
    setLogoUrl(URL.createObjectURL(file))
    setLogoName(file.name)
  }

  const handleRefFile = file => {
    if (!file) return
    setRefFileName(file.name)
    setRefPaste('')
    setAnalysisState(null)  // reset analysis when content changes
  }

  const handleRefPasteChange = val => {
    setRefPaste(val)
    setAnalysisState(null)  // reset analysis when content changes
  }

  const runAnalysis = () => {
    setAnalysisState('loading')
    setTimeout(() => setAnalysisState('shown'), 1900)
  }

  const recipientCount = recipients
    .split(/[\n,]/).map(s => s.trim()).filter(s => s.includes('@')).length

  // ── Generating ────────────────────────────────────────────────────────────
  if (phase === 'generating') {
    const activeSkill = CURATION_SKILLS[skill]
    const { Icon: SkillIcon } = activeSkill || {}
    return (
      <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#fafffe', p: 4 }}>
        <Box sx={{ maxWidth: 460, width: '100%', textAlign: 'center' }}>
          {/* Animated icon */}
          <Box sx={{
            width: 72, height: 72, borderRadius: '20px',
            bgcolor: activeSkill ? activeSkill.bg : TEAL_LIGHT,
            border: `2px solid ${activeSkill ? activeSkill.color : TEAL}25`,
            mx: 'auto', mb: 3.5,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {genDone
              ? <CheckCircleIcon sx={{ fontSize: 34, color: '#22c55e' }} />
              : <AutoAwesomeIcon sx={{
                  fontSize: 34, color: activeSkill ? activeSkill.color : TEAL,
                  '@keyframes gen-pulse': { '0%,100%': { opacity:1, transform:'scale(1)' }, '50%': { opacity:0.6, transform:'scale(1.15)' } },
                  animation: 'gen-pulse 1.8s ease-in-out infinite',
                }} />
            }
          </Box>

          <Typography sx={{ fontWeight: 800, fontSize: '22px', letterSpacing: '-0.02em', mb: 1 }}>
            {genDone ? 'Your newsletter is ready!' : 'Generating your newsletter…'}
          </Typography>
          <Typography sx={{ fontSize: '14px', color: 'text.secondary', mb: 4, minHeight: 24 }}>
            {genDone
              ? 'Head to the editor to review and customise before sending.'
              : genMessage
            }
          </Typography>

          {/* Progress bar */}
          <LinearProgress
            variant="determinate"
            value={genProgress}
            sx={{
              height: 7, borderRadius: 4, bgcolor: 'rgba(0,0,0,0.07)',
              '& .MuiLinearProgress-bar': {
                bgcolor: genDone ? '#22c55e' : (activeSkill ? activeSkill.color : TEAL),
                borderRadius: 4, transition: 'transform 0.7s ease',
              },
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography sx={{ fontSize: '11px', color: 'text.disabled' }}>
              Skill: <strong>{activeSkill?.label}</strong> · Sources: <strong>{selectedSearches.length} searches</strong>
              {hasRefContent && <> · <strong>Style reference loaded</strong></>}
            </Typography>
            <Typography sx={{ fontSize: '11px', fontWeight: 700, color: genDone ? '#22c55e' : (activeSkill ? activeSkill.color : TEAL) }}>
              {genProgress}%
            </Typography>
          </Box>
        </Box>
      </Box>
    )
  }

  // ── Landing ────────────────────────────────────────────────────────────────
  if (phase === 'landing') {
    return (
      <Box sx={{
        height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'auto', py: 5,
        background: 'radial-gradient(ellipse 70% 50% at 65% 55%, rgba(0,130,127,0.07) 0%, transparent 70%), #fafffe',
      }}>
        <Box sx={{ maxWidth: 980, mx: 'auto', px: 5, display: 'flex', gap: 7, alignItems: 'center', width: '100%' }}>

          {/* ── Left: copy ── */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Eyebrow */}
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, bgcolor: TEAL_LIGHT, border: `1px solid ${TEAL}25`, borderRadius: '20px', px: 1.5, py: 0.6, mb: 3 }}>
              <AutoAwesomeIcon sx={{ fontSize: 12, color: TEAL }} />
              <Typography sx={{ fontSize: '11px', fontWeight: 700, color: TEAL, letterSpacing: '0.04em', lineHeight: 1 }}>
                AI-powered newsletters
              </Typography>
            </Box>

            {/* Headline */}
            <Typography sx={{ fontSize: 'clamp(30px, 3.8vw, 46px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.025em', color: 'text.primary', mb: 2.5 }}>
              Newsletters that<br />
              <Box component="span" sx={{ color: TEAL }}>think for themselves.</Box>
            </Typography>

            {/* Body */}
            <Typography sx={{ fontSize: '15px', lineHeight: 1.7, color: 'text.secondary', mb: 3.5, maxWidth: 420 }}>
              Connect your saved searches. Mira monitors the news, curates the most relevant stories, and assembles a polished edition — automatically, every time.
            </Typography>

            {/* Search selector */}
            <Box sx={{ bgcolor: 'background.paper', borderRadius: '10px', border: `1.5px solid ${TEAL}20`, p: 2, mb: 3.5, boxShadow: '0 2px 10px rgba(0,0,0,0.05)', maxWidth: 420 }}>
              <Typography sx={{ fontSize: '12px', fontWeight: 600, color: 'text.secondary', mb: 1.25 }}>
                Select searches to power your newsletter
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mb: 1.25 }}>
                {AVAILABLE_SEARCHES.map(s => {
                  const cfg = SEARCH_TYPE_CFG[s.type] || SEARCH_TYPE_CFG.explore
                  const isSelected = selectedSearches.includes(s.name)
                  return (
                    <Box
                      key={s.name}
                      onClick={() => setSelectedSearches(prev =>
                        prev.includes(s.name) ? prev.filter(n => n !== s.name) : [...prev, s.name]
                      )}
                      sx={{
                        display: 'flex', alignItems: 'center', gap: 1, px: 1.25, py: 0.9,
                        borderRadius: '7px', cursor: 'pointer', border: '1.5px solid',
                        borderColor: isSelected ? `${TEAL}35` : 'transparent',
                        bgcolor: isSelected ? `${TEAL}08` : 'rgba(0,0,0,0.025)',
                        transition: 'all 0.15s',
                        '&:hover': { bgcolor: isSelected ? `${TEAL}10` : 'rgba(0,0,0,0.045)' },
                      }}
                    >
                      <Box sx={{
                        width: 16, height: 16, borderRadius: '4px', flexShrink: 0,
                        border: `2px solid ${isSelected ? TEAL : 'rgba(0,0,0,0.2)'}`,
                        bgcolor: isSelected ? TEAL : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.15s',
                      }}>
                        {isSelected && <CheckIcon sx={{ fontSize: 10, color: '#fff' }} />}
                      </Box>
                      <cfg.Icon sx={{ fontSize: 13, color: cfg.color, flexShrink: 0 }} />
                      <Typography sx={{ fontSize: '13px', fontWeight: 500, color: isSelected ? 'text.primary' : 'text.secondary', flex: 1 }}>
                        {s.name}
                      </Typography>
                      <Box sx={{ px: 0.75, py: 0.2, bgcolor: cfg.bg, borderRadius: '3px' }}>
                        <Typography sx={{ fontSize: '10px', fontWeight: 600, color: cfg.color, textTransform: 'capitalize' }}>{s.type}</Typography>
                      </Box>
                    </Box>
                  )
                })}
              </Box>
              {selectedSearches.length > 0 ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <CheckCircleIcon sx={{ fontSize: 14, color: TEAL }} />
                  <Typography sx={{ fontSize: '12px', color: TEAL, fontWeight: 600 }}>
                    {selectedSearches.length} search{selectedSearches.length !== 1 ? 'es' : ''} selected
                  </Typography>
                </Box>
              ) : (
                <Typography sx={{ fontSize: '12px', color: 'text.disabled' }}>Select at least one search to continue</Typography>
              )}
            </Box>

            {/* CTA */}
            <Box>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={() => setPhase('wizard')}
                disabled={selectedSearches.length === 0}
                sx={{
                  bgcolor: TEAL, color: '#fff', fontWeight: 700, fontSize: '15px',
                  textTransform: 'none', borderRadius: '10px', px: 3.5, py: 1.5,
                  boxShadow: '0 4px 16px rgba(0,130,127,0.28)',
                  '&:hover': { bgcolor: '#006e6b', transform: 'translateY(-1px)', boxShadow: '0 7px 24px rgba(0,130,127,0.35)' },
                  '&.Mui-disabled': { bgcolor: 'rgba(0,0,0,0.1)', color: 'rgba(0,0,0,0.3)', boxShadow: 'none' },
                  transition: 'all 0.2s',
                  display: 'block', mb: 1.5,
                }}
              >
                Generate my first newsletter
              </Button>
              <Typography sx={{ fontSize: '12px', color: 'text.disabled' }}>
                Ready in about 30 seconds · Nothing is sent without your review
              </Typography>
            </Box>
          </Box>

          {/* ── Right: visual ── */}
          <Box sx={{ flexShrink: 0, display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'center', minWidth: 360 }}>
            <OnboardingVisual />
          </Box>
        </Box>
      </Box>
    )
  }

  // ── Wizard ─────────────────────────────────────────────────────────────────
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#fafffe', overflow: 'hidden' }}>

      {/* Header */}
      <Box sx={{ px: 4, pt: 3, pb: 2.5, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', flexShrink: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2.5 }}>
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: '20px', letterSpacing: '-0.015em', mb: 0.3 }}>
              Set up your newsletter
            </Typography>
            <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>
              Step {step + 1} of {STEP_LABELS.length} — {STEP_LABELS[step]}
            </Typography>
          </Box>
          <Button onClick={() => setPhase('landing')} sx={{ textTransform: 'none', color: 'text.secondary', fontSize: '13px', mt: 0.5 }}>
            ← Back
          </Button>
        </Box>

        {/* Step indicators */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {STEP_LABELS.map((label, i) => {
            const done   = i < step
            const active = i === step
            return (
              <Box key={label} sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <Box sx={{
                    width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    bgcolor: done ? TEAL : active ? TEAL : 'rgba(0,0,0,0.08)',
                    border: `2px solid ${done ? TEAL : active ? TEAL : 'rgba(0,0,0,0.12)'}`,
                    transition: 'all 0.2s',
                  }}>
                    {done
                      ? <CheckIcon sx={{ fontSize: 12, color: '#fff' }} />
                      : <Typography sx={{ fontSize: '10px', fontWeight: 700, color: active ? '#fff' : 'text.disabled', lineHeight: 1 }}>{i + 1}</Typography>
                    }
                  </Box>
                  <Typography sx={{ fontSize: '12px', fontWeight: active ? 700 : 500, color: active ? TEAL : done ? TEAL : 'text.disabled', whiteSpace: 'nowrap' }}>
                    {label}
                  </Typography>
                </Box>
                {i < STEP_LABELS.length - 1 && (
                  <Box sx={{ width: 36, height: 2, bgcolor: i < step ? TEAL : 'rgba(0,0,0,0.1)', mx: 1.25, transition: 'background-color 0.3s' }} />
                )}
              </Box>
            )
          })}
        </Box>
      </Box>

      {/* Body */}
      <Box sx={{ flex: 1, overflow: 'auto', py: 4, px: 4 }}>

        {/* ── Step 1: Choose skill ── */}
        {step === 1 && (
          <Box sx={{ maxWidth: 600, mx: 'auto' }}>
            <Typography sx={{ fontSize: '15px', color: 'text.secondary', lineHeight: 1.65, mb: 3.5 }}>
              Choose how Mira approaches curation for this newsletter. You can change it anytime.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {Object.values(CURATION_SKILLS).map(s => {
                const { Icon: SkillIcon } = s
                const active = skill === s.id
                return (
                  <Box
                    key={s.id}
                    onClick={() => setSkill(s.id)}
                    sx={{
                      p: 2.5, borderRadius: '12px', cursor: 'pointer',
                      border: `2px solid ${active ? s.color : 'rgba(0,0,0,0.1)'}`,
                      bgcolor: active ? s.bg : 'background.paper',
                      display: 'flex', alignItems: 'flex-start', gap: 2,
                      transition: 'all 0.15s',
                      '&:hover': { borderColor: s.color, bgcolor: s.bg },
                      boxShadow: active ? `0 0 0 3px ${s.color}12` : '0 1px 4px rgba(0,0,0,0.04)',
                    }}
                  >
                    <Box sx={{
                      width: 44, height: 44, borderRadius: '10px', bgcolor: `${s.color}18`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, mt: 0.15,
                    }}>
                      <SkillIcon sx={{ fontSize: 22, color: s.color }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
                        <Typography sx={{ fontWeight: 700, fontSize: '15px', color: active ? s.color : 'text.primary' }}>
                          {s.label}
                        </Typography>
                        {active && <CheckCircleIcon sx={{ fontSize: 16, color: s.color }} />}
                      </Box>
                      <Typography sx={{ fontSize: '13px', color: 'text.secondary', lineHeight: 1.55 }}>
                        {s.description}
                      </Typography>
                    </Box>
                  </Box>
                )
              })}
            </Box>
          </Box>
        )}

        {/* ── Step 0: Share an example edition ── */}
        {step === 0 && (() => {
          const ex = SKILL_EXAMPLE_COPY[skill] || SKILL_EXAMPLE_COPY['executive-briefing']
          const activeSkill = CURATION_SKILLS[skill]
          return (
            <Box sx={{ maxWidth: 580, mx: 'auto' }}>
              {/* Skill-aware header */}
              {(() => {
                const SkillHeaderIcon = activeSkill?.Icon || AutoAwesomeIcon
                return (
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3.5, p: 2.5, bgcolor: activeSkill ? activeSkill.bg : TEAL_LIGHT, borderRadius: '12px', border: `1.5px solid ${activeSkill ? activeSkill.color : TEAL}25` }}>
                    <Box sx={{ width: 40, height: 40, borderRadius: '10px', bgcolor: activeSkill ? `${activeSkill.color}20` : TEAL_LIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <SkillHeaderIcon sx={{ fontSize: 20, color: activeSkill ? activeSkill.color : TEAL }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: '16px', mb: 0.5, color: activeSkill ? activeSkill.color : TEAL }}>
                        {ex.headline}
                      </Typography>
                      <Typography sx={{ fontSize: '13px', color: 'text.secondary', lineHeight: 1.6 }}>
                        {ex.subhead}
                      </Typography>
                    </Box>
                  </Box>
                )
              })()}

              {/* What Mira learns */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1.5 }}>
                <AutoAwesomeIcon sx={{ fontSize: 13, color: 'text.disabled' }} />
                <Typography sx={{ fontSize: '11px', fontWeight: 700, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                  Mira will analyse
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                {ex.learnPoints.map(pt => (
                  <Box key={pt} sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.6, bgcolor: 'rgba(0,0,0,0.04)', borderRadius: '20px', px: 1.25, py: 0.5, border: '1px solid rgba(0,0,0,0.07)' }}>
                    <CheckIcon sx={{ fontSize: 11, color: TEAL }} />
                    <Typography sx={{ fontSize: '11px', color: 'text.secondary', fontWeight: 500 }}>{pt}</Typography>
                  </Box>
                ))}
              </Box>

              {/* File upload area */}
              <input
                ref={refFileInputRef}
                type="file"
                accept=".pdf,.html,.htm,.docx,.doc,.txt"
                style={{ display: 'none' }}
                onChange={e => handleRefFile(e.target.files?.[0])}
              />

              {refFileName ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, mb: 2, bgcolor: activeSkill ? activeSkill.bg : TEAL_LIGHT, borderRadius: '10px', border: `1.5px solid ${activeSkill ? activeSkill.color : TEAL}30` }}>
                  <Box sx={{ width: 36, height: 36, borderRadius: '8px', bgcolor: activeSkill ? `${activeSkill.color}18` : TEAL_LIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CheckCircleIcon sx={{ fontSize: 18, color: activeSkill ? activeSkill.color : TEAL }} />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{refFileName}</Typography>
                    <Typography sx={{ fontSize: '11px', color: 'text.secondary' }}>Ready for Mira to learn from</Typography>
                  </Box>
                  <Button size="small" onClick={() => setRefFileName('')} sx={{ textTransform: 'none', fontSize: '11px', color: 'text.secondary', flexShrink: 0 }}>
                    Remove
                  </Button>
                </Box>
              ) : (
                <Box
                  onClick={() => refFileInputRef.current?.click()}
                  sx={{
                    border: '2px dashed rgba(0,0,0,0.15)', borderRadius: '10px',
                    p: 3, textAlign: 'center', cursor: 'pointer', mb: 2,
                    transition: 'all 0.15s',
                    '&:hover': { borderColor: activeSkill ? activeSkill.color : TEAL, bgcolor: activeSkill ? activeSkill.bg : TEAL_LIGHT },
                  }}
                >
                  <Typography sx={{ fontWeight: 600, fontSize: '13px', mb: 0.4 }}>{ex.uploadLabel}</Typography>
                  <Typography sx={{ fontSize: '12px', color: 'text.disabled' }}>PDF, HTML, DOCX or TXT</Typography>
                </Box>
              )}

              {/* OR divider */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Box sx={{ flex: 1, height: 1, bgcolor: 'rgba(0,0,0,0.08)' }} />
                <Typography sx={{ fontSize: '11px', color: 'text.disabled', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>or</Typography>
                <Box sx={{ flex: 1, height: 1, bgcolor: 'rgba(0,0,0,0.08)' }} />
              </Box>

              {/* Paste area */}
              <Typography sx={{ fontSize: '12px', fontWeight: 600, color: 'text.secondary', mb: 1 }}>{ex.pasteLabel}</Typography>
              <TextField
                fullWidth multiline rows={5}
                placeholder={ex.pastePlaceholder}
                value={refPaste}
                disabled={!!refFileName || analysisState === 'shown' || analysisState === 'confirmed'}
                onChange={e => handleRefPasteChange(e.target.value)}
                sx={{
                  mb: 1.5,
                  '& .MuiInputBase-root': { fontSize: '13px', borderRadius: '10px', fontFamily: 'inherit', lineHeight: 1.6 },
                  opacity: (refFileName || analysisState === 'shown' || analysisState === 'confirmed') ? 0.5 : 1,
                }}
              />

              <Typography sx={{ fontSize: '12px', color: 'text.disabled', mb: hasRefContent && !analysisState ? 2.5 : 0 }}>
                Optional — you can skip this and Mira will still produce a great first edition.
              </Typography>

              {/* ── Analyse CTA ── appears once content is provided */}
              {hasRefContent && !analysisState && (
                <Box sx={{ mt: 2, p: 2.5, bgcolor: activeSkill ? activeSkill.bg : TEAL_LIGHT, borderRadius: '12px', border: `1.5px solid ${activeSkill ? activeSkill.color : TEAL}25`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                  <Box>
                    <Typography sx={{ fontWeight: 600, fontSize: '13px', mb: 0.3, color: 'text.primary' }}>
                      {refFileName ? `"${refFileName}" ready to analyse` : `${refPaste.trim().split(/\s+/).length} words ready to analyse`}
                    </Typography>
                    <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>
                      Let Mira read your example before you continue
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    startIcon={<AutoAwesomeIcon sx={{ fontSize: 15 }} />}
                    onClick={runAnalysis}
                    sx={{
                      bgcolor: activeSkill ? activeSkill.color : TEAL,
                      color: '#fff', fontWeight: 700, fontSize: '13px',
                      textTransform: 'none', borderRadius: '8px', px: 2.25, py: 1,
                      flexShrink: 0,
                      '&:hover': { bgcolor: activeSkill ? activeSkill.color : TEAL, filter: 'brightness(0.88)' },
                      boxShadow: `0 4px 14px ${activeSkill ? activeSkill.color : TEAL}40`,
                    }}
                  >
                    Analyse with Mira
                  </Button>
                </Box>
              )}

              {/* ── Loading state ── */}
              {analysisState === 'loading' && (
                <Box sx={{ mt: 2, p: 3, bgcolor: 'background.paper', borderRadius: '12px', border: '1.5px solid', borderColor: 'divider', textAlign: 'center' }}>
                  <AutoAwesomeIcon sx={{
                    fontSize: 28, color: activeSkill ? activeSkill.color : TEAL, mb: 1.5,
                    '@keyframes an-pulse': { '0%,100%': { opacity:1, transform:'scale(1) rotate(-5deg)' }, '50%': { opacity:0.6, transform:'scale(1.18) rotate(5deg)' } },
                    animation: 'an-pulse 1.6s ease-in-out infinite',
                  }} />
                  <Typography sx={{ fontWeight: 600, fontSize: '14px', mb: 0.5 }}>Mira is reading your example…</Typography>
                  <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>Detecting structure, tone, sources and cadence</Typography>
                  <LinearProgress sx={{ mt: 2, borderRadius: 2, height: 4, bgcolor: 'rgba(0,0,0,0.07)', '& .MuiLinearProgress-bar': { bgcolor: activeSkill ? activeSkill.color : TEAL, borderRadius: 2 } }} />
                </Box>
              )}

              {/* ── Analysis results card ── */}
              {(analysisState === 'shown' || analysisState === 'confirmed') && (() => {
                const analysis = MOCK_ANALYSIS[skill] || MOCK_ANALYSIS['executive-briefing']
                const ac = activeSkill ? activeSkill.color : TEAL
                const ab = activeSkill ? activeSkill.bg : TEAL_LIGHT
                const isConfirmed = analysisState === 'confirmed'

                const rows = [
                  { Icon: ViewStreamOutlinedIcon, label: 'Sections detected',
                    content: (
                      <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', mt: 0.5 }}>
                        {analysis.sections.map(s => (
                          <Box key={s} sx={{ px: 1.25, py: 0.4, borderRadius: '20px', border: `1.5px solid ${ac}35`, bgcolor: ab, display: 'inline-flex' }}>
                            <Typography sx={{ fontSize: '12px', fontWeight: 600, color: ac }}>{s}</Typography>
                          </Box>
                        ))}
                      </Box>
                    )
                  },
                  { Icon: AllInboxOutlinedIcon, label: 'Sources identified',
                    content: (
                      <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', mt: 0.5 }}>
                        {analysis.sources.map(s => (
                          <Box key={s} sx={{ px: 1.1, py: 0.35, borderRadius: '20px', border: '1.5px solid rgba(0,0,0,0.12)', bgcolor: 'rgba(0,0,0,0.03)' }}>
                            <Typography sx={{ fontSize: '12px', fontWeight: 500, color: 'text.primary' }}>{s}</Typography>
                          </Box>
                        ))}
                        {analysis.sourcesExtra > 0 && (
                          <Box sx={{ px: 1.1, py: 0.35, borderRadius: '20px', border: '1.5px solid rgba(0,0,0,0.12)', bgcolor: 'rgba(0,0,0,0.03)' }}>
                            <Typography sx={{ fontSize: '12px', fontWeight: 500, color: 'text.secondary' }}>+{analysis.sourcesExtra} more</Typography>
                          </Box>
                        )}
                      </Box>
                    )
                  },
                  { Icon: AccessTimeOutlinedIcon, label: 'Cadence', content: <Typography sx={{ fontSize: '14px', fontWeight: 700, mt: 0.25 }}>{analysis.cadence}</Typography> },
                  { Icon: EditOutlinedIcon,        label: 'Format & tone', content: <Typography sx={{ fontSize: '14px', fontWeight: 700, mt: 0.25 }}>{analysis.format}</Typography> },
                  { Icon: GroupOutlinedIcon,       label: 'Audience', content: <Typography sx={{ fontSize: '14px', fontWeight: 700, mt: 0.25 }}>{analysis.audience}</Typography> },
                ]

                return (
                  <Box sx={{ mt: 2, borderRadius: '12px', overflow: 'hidden', border: `1.5px solid ${ac}30`, boxShadow: `0 4px 20px ${ac}15` }}>
                    {/* Header */}
                    <Box sx={{ px: 2.5, py: 1.75, bgcolor: ab, borderBottom: `1px solid ${ac}20`, display: 'flex', alignItems: 'center', gap: 1.25 }}>
                      {isConfirmed
                        ? <CheckCircleIcon sx={{ fontSize: 16, color: ac }} />
                        : <AutoAwesomeIcon sx={{ fontSize: 16, color: ac }} />
                      }
                      <Typography sx={{ fontWeight: 700, fontSize: '14px', color: ac }}>
                        {isConfirmed ? 'Mira is calibrated to your style' : 'Detected from your example'}
                      </Typography>
                      {isConfirmed && (
                        <Button size="small" onClick={() => setAnalysisState('shown')}
                          sx={{ ml: 'auto', textTransform: 'none', fontSize: '11px', color: 'text.secondary', p: 0 }}>
                          Edit
                        </Button>
                      )}
                    </Box>

                    {/* Rows */}
                    <Box sx={{ bgcolor: 'background.paper' }}>
                      {rows.map((row, i) => {
                        const RowIcon = row.Icon
                        return (
                          <Box key={row.label} sx={{ px: 2.5, py: 1.75, display: 'flex', alignItems: 'flex-start', gap: 2, borderBottom: i < rows.length - 1 ? '1px solid' : 'none', borderColor: 'divider' }}>
                            <Box sx={{ width: 30, height: 30, borderRadius: '7px', bgcolor: 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, mt: 0.15 }}>
                              <RowIcon sx={{ fontSize: 15, color: 'text.disabled' }} />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Typography sx={{ fontSize: '11px', color: 'text.disabled', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{row.label}</Typography>
                              {row.content}
                            </Box>
                          </Box>
                        )
                      })}
                    </Box>

                    {/* Actions */}
                    {!isConfirmed && (
                      <Box sx={{ px: 2.5, py: 2, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'rgba(0,0,0,0.015)', display: 'flex', gap: 1.25 }}>
                        <Button
                          variant="contained"
                          startIcon={<CheckIcon sx={{ fontSize: 14 }} />}
                          onClick={() => setAnalysisState('confirmed')}
                          sx={{
                            bgcolor: ac, color: '#fff', fontWeight: 700, fontSize: '13px',
                            textTransform: 'none', borderRadius: '8px', px: 2.5, py: 1,
                            '&:hover': { bgcolor: ac, filter: 'brightness(0.88)' },
                            boxShadow: `0 3px 12px ${ac}35`,
                          }}
                        >
                          Yes, looks good
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => { setAnalysisState(null); setRefFileName(''); setRefPaste('') }}
                          sx={{
                            borderColor: 'rgba(0,0,0,0.15)', color: 'text.secondary',
                            fontWeight: 600, fontSize: '13px',
                            textTransform: 'none', borderRadius: '8px', px: 2,
                            '&:hover': { borderColor: 'rgba(0,0,0,0.3)', bgcolor: 'rgba(0,0,0,0.03)' },
                          }}
                        >
                          Edit a few things
                        </Button>
                      </Box>
                    )}
                  </Box>
                )
              })()}
            </Box>
          )
        })()}

        {/* ── Step 2: Upload logo + brand assets ── */}
        {step === 2 && (
          <Box sx={{ maxWidth: 560, mx: 'auto' }}>
            <input ref={logoInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleLogoFile(e.target.files?.[0])} />
            <input
              ref={brandAssetsInputRef}
              type="file"
              multiple
              accept=".pdf,.pptx,.ppt,.docx,.doc,.png,.jpg,.jpeg,.svg,.zip,.ai,.eps,.sketch,.fig"
              style={{ display: 'none' }}
              onChange={e => {
                const files = Array.from(e.target.files || [])
                setBrandAssets(prev => {
                  const existing = new Set(prev.map(f => f.name))
                  const newFiles = files.filter(f => !existing.has(f.name)).map(f => ({ name: f.name, size: f.size, type: f.name.split('.').pop().toLowerCase() }))
                  return [...prev, ...newFiles]
                })
                e.target.value = ''
              }}
            />

            {/* Logo section */}
            <Typography sx={{ fontSize: '13px', fontWeight: 700, color: 'text.primary', mb: 1 }}>Logo</Typography>
            <Typography sx={{ fontSize: '13.5px', color: 'text.secondary', lineHeight: 1.6, mb: 2 }}>
              Add your brand logo so every edition feels on-brand.
            </Typography>

            {logoUrl ? (
              <Box sx={{ p: 2, border: `2px solid ${TEAL}30`, borderRadius: '10px', bgcolor: TEAL_LIGHT, display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Box sx={{ width: 80, height: 52, borderRadius: '7px', bgcolor: '#fff', border: '1px solid rgba(0,0,0,0.09)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 6px rgba(0,0,0,0.07)' }}>
                  <Box component="img" src={logoUrl} alt="Logo" sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', p: 0.5 }} />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.25 }}>
                    <CheckCircleIcon sx={{ fontSize: 13, color: TEAL }} />
                    <Typography sx={{ fontWeight: 600, fontSize: '13px' }}>Logo uploaded</Typography>
                  </Box>
                  <Typography sx={{ fontSize: '12px', color: 'text.secondary', mb: 0.75 }} noWrap>{logoName}</Typography>
                  <Box sx={{ display: 'flex', gap: 1.5 }}>
                    <Button size="small" onClick={() => logoInputRef.current?.click()} sx={{ textTransform: 'none', fontSize: '12px', color: TEAL, p: 0, minWidth: 0 }}>Replace</Button>
                    <Button size="small" onClick={() => { setLogoUrl(null); setLogoName('') }} sx={{ textTransform: 'none', fontSize: '12px', color: 'text.secondary', p: 0, minWidth: 0 }}>Remove</Button>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box onClick={() => logoInputRef.current?.click()} sx={{ border: '2px dashed rgba(0,0,0,0.13)', borderRadius: '10px', p: 3.5, textAlign: 'center', cursor: 'pointer', mb: 3, transition: 'all 0.15s', '&:hover': { borderColor: TEAL, bgcolor: TEAL_LIGHT } }}>
                <Box sx={{ width: 40, height: 40, borderRadius: '10px', bgcolor: 'rgba(0,0,0,0.05)', mx: 'auto', mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AddIcon sx={{ fontSize: 22, color: 'text.disabled' }} />
                </Box>
                <Typography sx={{ fontWeight: 600, fontSize: '13.5px', mb: 0.4 }}>Click to upload your logo</Typography>
                <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>PNG, SVG or JPG · Recommended 200 × 60 px</Typography>
              </Box>
            )}

            <Divider sx={{ mb: 3 }} />

            {/* Brand assets section */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
              <Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 700, color: 'text.primary', mb: 0.5 }}>Brand assets</Typography>
                <Typography sx={{ fontSize: '13px', color: 'text.secondary', lineHeight: 1.6, maxWidth: 400 }}>
                  Upload a brand guide, deck, or any creative assets. Mira will use them to inform the look and feel of your newsletter.
                </Typography>
              </Box>
              {brandAssets.length > 0 && (
                <Button size="small" onClick={() => brandAssetsInputRef.current?.click()}
                  sx={{ textTransform: 'none', fontSize: '12px', color: TEAL, fontWeight: 600, flexShrink: 0, ml: 2 }}>
                  + Add more
                </Button>
              )}
            </Box>

            {brandAssets.length > 0 && (
              <Box sx={{ mb: 1.5, display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                {brandAssets.map((file, i) => {
                  const iconMap = { pdf: '📄', pptx: '📊', ppt: '📊', docx: '📝', doc: '📝', png: '🖼', jpg: '🖼', jpeg: '🖼', svg: '🖼', zip: '📦', ai: '🎨', eps: '🎨', sketch: '🎨', fig: '🎨' }
                  const icon = iconMap[file.type] || '📁'
                  const sizeLabel = file.size > 1024 * 1024 ? `${(file.size / 1024 / 1024).toFixed(1)} MB` : `${Math.round(file.size / 1024)} KB`
                  return (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.25, p: 1.25, bgcolor: 'rgba(0,0,0,0.025)', borderRadius: '8px', border: '1px solid', borderColor: 'divider' }}>
                      <Typography sx={{ fontSize: '18px', lineHeight: 1, flexShrink: 0 }}>{icon}</Typography>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography sx={{ fontSize: '13px', fontWeight: 500, color: 'text.primary' }} noWrap>{file.name}</Typography>
                        <Typography sx={{ fontSize: '11px', color: 'text.disabled' }}>{file.type.toUpperCase()} · {sizeLabel}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
                        <CheckCircleIcon sx={{ fontSize: 14, color: TEAL }} />
                        <IconButton size="small" onClick={() => setBrandAssets(prev => prev.filter((_, idx) => idx !== i))} sx={{ p: 0.4, color: 'text.disabled', '&:hover': { color: 'text.primary' } }}>
                          <CloseIcon sx={{ fontSize: 13 }} />
                        </IconButton>
                      </Box>
                    </Box>
                  )
                })}
              </Box>
            )}

            <Box
              onClick={() => brandAssetsInputRef.current?.click()}
              sx={{
                border: '2px dashed rgba(0,0,0,0.13)', borderRadius: '10px',
                p: brandAssets.length > 0 ? 2 : 3.5,
                textAlign: 'center', cursor: 'pointer',
                transition: 'all 0.15s',
                '&:hover': { borderColor: PURPLE, bgcolor: 'rgba(182,39,161,0.04)' },
              }}
            >
              {brandAssets.length === 0 ? (
                <>
                  <Box sx={{ width: 40, height: 40, borderRadius: '10px', bgcolor: 'rgba(0,0,0,0.05)', mx: 'auto', mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <AddIcon sx={{ fontSize: 22, color: 'text.disabled' }} />
                  </Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '13.5px', mb: 0.4 }}>Upload brand assets</Typography>
                  <Typography sx={{ fontSize: '12px', color: 'text.secondary', mb: 0.5 }}>Drag and drop or click to browse</Typography>
                  <Typography sx={{ fontSize: '11.5px', color: 'text.disabled' }}>Brand guides · PowerPoints · PDFs · Images · Figma exports</Typography>
                </>
              ) : (
                <Typography sx={{ fontSize: '12.5px', color: 'text.secondary' }}>
                  + Drop more files here or click to browse
                </Typography>
              )}
            </Box>

            <Typography sx={{ fontSize: '12px', color: 'text.disabled', mt: 2 }}>
              Optional — both logo and assets can be updated anytime in settings
            </Typography>
          </Box>
        )}

        {/* ── Step 3: Add recipients ── */}
        {step === 3 && (
          <Box sx={{ maxWidth: 500, mx: 'auto' }}>
            <Typography sx={{ fontSize: '15px', color: 'text.secondary', lineHeight: 1.65, mb: 3.5 }}>
              Who should receive this newsletter? Enter email addresses below — one per line, or comma-separated. You can manage full recipient lists later.
            </Typography>

            <TextField
              fullWidth multiline rows={6}
              placeholder={'sarah@company.com\nmichael@company.com\nleadership@company.com\n\nOr paste a comma-separated list…'}
              value={recipients}
              onChange={e => setRecipients(e.target.value)}
              sx={{ mb: 1.5, '& .MuiInputBase-root': { fontSize: '13px', borderRadius: '10px', fontFamily: 'inherit', lineHeight: 1.6 } }}
            />

            {recipientCount > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 2, px: 1.25, py: 1, bgcolor: TEAL_LIGHT, borderRadius: '8px', border: `1px solid ${TEAL}20` }}>
                <CheckCircleIcon sx={{ fontSize: 14, color: TEAL }} />
                <Typography sx={{ fontSize: '12px', color: TEAL, fontWeight: 600 }}>
                  {recipientCount} valid email address{recipientCount !== 1 ? 'es' : ''} detected
                </Typography>
              </Box>
            )}

            <Typography sx={{ fontSize: '12px', color: 'text.disabled' }}>
              Optional — skip this and configure recipient lists after your series is created.
            </Typography>
          </Box>
        )}

        {/* ── Step 4: Set a schedule ── */}
        {step === 4 && (() => {
          const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
          const MONTH_DAYS = ['1st', '2nd', '3rd', '4th', '5th', '7th', '10th', '14th', '15th', '21st', '28th']
          const SEND_TIMES = ['6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '5:00 PM']
          const scheduleLabel = cadence === 'Daily'
            ? `Every day at ${sendTime}`
            : cadence === 'Weekly'
            ? `Every ${sendDay} at ${sendTime}`
            : `Monthly on the ${sendDay} at ${sendTime}`
          const handleCadenceChange = c => {
            setCadence(c)
            if (c === 'Daily') setSendDay(null)
            if (c === 'Weekly') setSendDay(WEEKDAYS.includes(sendDay) ? sendDay : 'Friday')
            if (c === 'Monthly') setSendDay(MONTH_DAYS.includes(sendDay) ? sendDay : '1st')
          }
          return (
            <Box sx={{ maxWidth: 520, mx: 'auto' }}>
              <Typography sx={{ fontSize: '15px', color: 'text.secondary', lineHeight: 1.65, mb: 3.5 }}>
                Set when each edition should be sent. Mira will complete curation before this time so your newsletter is ready to go.
              </Typography>

              {/* Cadence */}
              <Box sx={{ mb: 3 }}>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, mb: 1 }}>Cadence</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {['Daily', 'Weekly', 'Monthly'].map(c => (
                    <Box key={c} onClick={() => handleCadenceChange(c)}
                      sx={{
                        flex: 1, py: 1.25, textAlign: 'center', borderRadius: '10px', cursor: 'pointer',
                        border: `2px solid ${cadence === c ? TEAL : 'rgba(0,0,0,0.12)'}`,
                        bgcolor: cadence === c ? TEAL_LIGHT : 'transparent',
                        transition: 'all 0.15s', '&:hover': { borderColor: TEAL },
                      }}
                    >
                      <Typography sx={{ fontSize: '14px', fontWeight: cadence === c ? 700 : 500, color: cadence === c ? TEAL : 'text.secondary' }}>{c}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Send day — conditional on cadence */}
              {cadence !== 'Daily' && (
                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ fontSize: '13px', fontWeight: 600, mb: 1 }}>
                    {cadence === 'Weekly' ? 'Day of week' : 'Day of month'}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                    {(cadence === 'Weekly' ? WEEKDAYS : MONTH_DAYS).map(day => (
                      <Box key={day} onClick={() => setSendDay(day)}
                        sx={{
                          px: 1.5, py: 0.75, borderRadius: '8px', cursor: 'pointer',
                          border: `1.5px solid ${sendDay === day ? TEAL : 'rgba(0,0,0,0.12)'}`,
                          bgcolor: sendDay === day ? TEAL_LIGHT : 'transparent',
                          transition: 'all 0.15s', '&:hover': { borderColor: TEAL },
                        }}
                      >
                        <Typography sx={{ fontSize: '13px', fontWeight: sendDay === day ? 700 : 400, color: sendDay === day ? TEAL : 'text.secondary' }}>
                          {cadence === 'Weekly' ? day.slice(0, 3) : day}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}

              {/* Send time */}
              <Box sx={{ mb: 3.5 }}>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, mb: 1 }}>Send time</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                  {SEND_TIMES.map(t => (
                    <Box key={t} onClick={() => setSendTime(t)}
                      sx={{
                        px: 1.25, py: 0.6, borderRadius: '8px', cursor: 'pointer',
                        border: `1.5px solid ${sendTime === t ? TEAL : 'rgba(0,0,0,0.12)'}`,
                        bgcolor: sendTime === t ? TEAL_LIGHT : 'transparent',
                        transition: 'all 0.15s', '&:hover': { borderColor: TEAL },
                      }}
                    >
                      <Typography sx={{ fontSize: '12px', fontWeight: sendTime === t ? 700 : 400, color: sendTime === t ? TEAL : 'text.secondary' }}>{t}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Summary banner */}
              <Box sx={{ p: 2, bgcolor: TEAL_LIGHT, borderRadius: '10px', border: `1.5px solid ${TEAL}20`, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <ScheduleIcon sx={{ fontSize: 22, color: TEAL, flexShrink: 0 }} />
                <Box>
                  <Typography sx={{ fontSize: '14px', fontWeight: 700, color: TEAL }}>
                    {scheduleLabel}
                  </Typography>
                  <Typography sx={{ fontSize: '11px', color: 'text.secondary', mt: 0.3 }}>
                    Mira will have your edition ready before the send time. You can adjust this anytime in settings.
                  </Typography>
                </Box>
              </Box>
            </Box>
          )
        })()}
      </Box>

      {/* Footer */}
      <Box sx={{ px: 4, py: 2.5, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <Button
          onClick={() => step === 0 ? setPhase('landing') : setStep(s => s - 1)}
          sx={{ textTransform: 'none', color: 'text.secondary', fontSize: '13px' }}
        >
          {step === 0 ? '← Overview' : '← Back'}
        </Button>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {step > 0 && step < STEP_LABELS.length - 1 && (
            <Button
              onClick={() => setStep(s => s + 1)}
              sx={{ textTransform: 'none', color: 'text.secondary', fontSize: '13px' }}
            >
              Skip for now
            </Button>
          )}
          {step === STEP_LABELS.length - 1 && (
            <Button
              onClick={() => setPhase('generating')}
              sx={{ textTransform: 'none', color: 'text.secondary', fontSize: '13px' }}
            >
              Skip &amp; generate
            </Button>
          )}
          <Button
            variant="contained"
            disabled={step === 1 && !skill}
            endIcon={step === STEP_LABELS.length - 1
              ? <AutoAwesomeIcon sx={{ fontSize: 15 }} />
              : <ArrowForwardIcon sx={{ fontSize: 15 }} />
            }
            onClick={() => step < STEP_LABELS.length - 1 ? setStep(s => s + 1) : setPhase('generating')}
            sx={{
              bgcolor: TEAL, color: '#fff', fontWeight: 700, fontSize: '13px',
              textTransform: 'none', borderRadius: '8px', px: 2.5, py: 1,
              boxShadow: step === STEP_LABELS.length - 1 ? '0 4px 14px rgba(0,130,127,0.25)' : 'none',
              '&:hover': { bgcolor: '#006e6b' },
              '&.Mui-disabled': { bgcolor: 'rgba(0,0,0,0.1)', color: 'rgba(0,0,0,0.3)' },
            }}
          >
            {step === STEP_LABELS.length - 1 ? 'Generate my newsletter' : 'Continue'}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function MwNewslettersPage({ ftuxMode = false }) {
  const [selectedId, setSelectedId]         = useState(ALL_VIEW_ID)
  const [search, setSearch]                 = useState('')
  const [newSeriesOpen, setNewSeriesOpen]   = useState(false)
  const [recipientLists, setRecipientLists] = useState(INITIAL_RECIPIENT_LISTS)
  const [selectedListId, setSelectedListId] = useState(null) // for drill-down inside recipients view

  // In ftuxMode the user must complete onboarding first; otherwise go straight to inbox
  const [onboarded, setOnboarded] = useState(!ftuxMode)

  // In ftuxMode, holds the single series built from the onboarding wizard
  const [ftuxSeries, setFtuxSeries] = useState(null)

  // Auto-open the draft preview after onboarding completes
  const [autoOpenPreview, setAutoOpenPreview] = useState(false)

  // Series-level curation skill overrides (keyed by series id)
  const [seriesSkills, setSeriesSkills] = useState(() =>
    Object.fromEntries(SERIES.map(s => [s.id, s.curationSkill]))
  )
  const handleCurationSkillChange = (seriesId, skillId) =>
    setSeriesSkills(prev => ({ ...prev, [seriesId]: skillId }))

  if (!onboarded) {
    return (
      <NewsletterOnboarding
        onComplete={(data) => {
          if (ftuxMode && data?.skill) {
            const skillNames = {
              'coverage-roundup':   'Coverage Roundup',
              'executive-briefing': 'Executive Briefing',
              'analytics-snapshot': 'Analytics Snapshot',
            }
            const recipientCount = data.recipients
              ? data.recipients.split(/[\s,;]+/).filter(s => /\S+@\S+\.\S+/.test(s)).length
              : 0
            const seriesCadence  = data.cadence  || 'Weekly'
            const seriesSendDay  = data.sendDay  || 'Friday'
            const seriesSendTime = data.sendTime || '8:00 AM'
            const computedNextSend = seriesCadence === 'Daily'
              ? `Tomorrow, ${seriesSendTime}`
              : seriesCadence === 'Weekly'
              ? `${seriesSendDay}, ${seriesSendTime}`
              : `${seriesSendDay} of next month, ${seriesSendTime}`
            const newSeries = {
              id: 'my-newsletter',
              name: skillNames[data.skill] || 'My Newsletter',
              cadence: seriesCadence,
              sendDay: seriesCadence !== 'Daily' ? seriesSendDay : null,
              sendTime: seriesSendTime,
              status: 'curating',
              articlesCount: 6,
              progress: 12,
              sources: ['Explore'],
              searches: AVAILABLE_SEARCHES.filter(s => (data.selectedSearches || []).includes(s.name)),
              recipients: recipientCount,
              nextSend: computedNextSend,
              latestLabel: 'May 11, 2026',
              curationSkill: data.skill,
              description: 'Your first newsletter, auto-curated by Mira.',
              logoUrl: data.logoUrl || null,
            }
            setFtuxSeries(newSeries)
            setSeriesSkills({ 'my-newsletter': data.skill })
            setSelectedId('my-newsletter')
            setAutoOpenPreview(true)
          } else {
            setSelectedId('daily-brief')
          }
          setOnboarded(true)
        }}
      />
    )
  }

  // When in ftux mode use only the single series built from the onboarding flow;
  // otherwise show the full pre-populated series list.
  const activeSeries = (ftuxMode && ftuxSeries) ? [ftuxSeries] : SERIES

  const isRecipientsView = selectedId === RECIPIENTS_VIEW_ID

  const selectedSeries = activeSeries.find(s => s.id === selectedId)
  const filtered       = activeSeries.filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
  const readyCount     = activeSeries.filter(s => s.status === 'ready').length
  const isAllView      = selectedId === ALL_VIEW_ID && !ftuxMode

  return (
    <Box sx={{ display: 'flex', height: '100%', overflow: 'hidden' }}>

      {/* ── Left sidebar ── */}
      <Box sx={{ width: 290, flexShrink: 0, display: 'flex', flexDirection: 'column', borderRight: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', overflow: 'hidden' }}>
        <Box sx={{ px: 2, pt: 2, pb: 1.5 }}>
          <Button fullWidth variant="contained" startIcon={<AddIcon sx={{ fontSize: 15 }} />}
            onClick={() => setNewSeriesOpen(true)}
            sx={{ bgcolor: PURPLE, color: '#fff', '&:hover': { bgcolor: '#9a1f87' }, textTransform: 'none', fontWeight: 600, fontSize: '13px', borderRadius: '8px', mb: 1.5, py: 0.75 }}>
            New Newsletter Series
          </Button>
          <NewSeriesModal open={newSeriesOpen} onClose={() => setNewSeriesOpen(false)} />
          <TextField fullWidth size="small" placeholder="Search series..." value={search} onChange={e => setSearch(e.target.value)}
            InputProps={{ startAdornment: <Box component="span" sx={{ display: 'flex', mr: 0.5 }}><SearchIcon sx={{ fontSize: 16, color: 'text.disabled' }} /></Box> }}
            sx={{ '& .MuiInputBase-root': { fontSize: '13px', borderRadius: '8px' } }}
          />
        </Box>

        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {/* All Newsletters inbox entry — hidden in ftux mode (only one series exists) */}
          {!ftuxMode && (
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
                  {activeSeries.length} series · all editions
                </Typography>
              </Box>
              {readyCount > 0 && (
                <Box sx={{ bgcolor: TEAL, borderRadius: '10px', px: 0.8, py: 0.2, flexShrink: 0 }}>
                  <Typography sx={{ fontSize: '10px', fontWeight: 700, color: '#fff' }}>{readyCount}</Typography>
                </Box>
              )}
            </Box>
          )}

          {/* Recipient Lists nav item — hidden in ftux mode */}
          {!ftuxMode && (
            <Box
              onClick={() => { setSelectedId(RECIPIENTS_VIEW_ID); setSelectedListId(null) }}
              sx={{
                mx: 1.5, mb: 0.5, px: 1.5, py: 1.25,
                borderRadius: '8px', cursor: 'pointer',
                bgcolor: isRecipientsView ? TEAL_LIGHT : 'transparent',
                border: `1px solid ${isRecipientsView ? 'rgba(0,130,127,0.2)' : 'transparent'}`,
                display: 'flex', alignItems: 'center', gap: 1.5,
                '&:hover': { bgcolor: isRecipientsView ? TEAL_LIGHT : 'rgba(0,0,0,0.04)' },
              }}
            >
              <Box sx={{
                width: 30, height: 30, borderRadius: '6px', flexShrink: 0,
                bgcolor: isRecipientsView ? 'rgba(0,130,127,0.15)' : 'rgba(0,0,0,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <PeopleOutlineIcon sx={{ fontSize: 16, color: isRecipientsView ? TEAL : 'text.secondary' }} />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontSize: '13px', fontWeight: isRecipientsView ? 700 : 500, color: isRecipientsView ? TEAL : 'text.primary' }}>Recipient Lists</Typography>
                <Typography sx={{ fontSize: '11px', color: 'text.disabled' }}>{recipientLists.length} lists · {recipientLists.reduce((s,l)=>s+l.subscribers,0).toLocaleString()} subscribers</Typography>
              </Box>
            </Box>
          )}

          {!ftuxMode && <Divider sx={{ mx: 1.5, mb: 0.5 }} />}

          {/* Series section header */}
          <Box sx={{ px: 2, pt: 0.75, pb: 0.75, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: '10px', fontWeight: 700, color: 'text.disabled', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Series ({filtered.length})
            </Typography>
            {readyCount > 0 && (
              <Box sx={{ bgcolor: TEAL, borderRadius: '10px', px: 0.9, py: 0.2 }}>
                <Typography sx={{ fontSize: '10px', fontWeight: 700, color: '#fff' }}>{readyCount} need review</Typography>
              </Box>
            )}
          </Box>
          {filtered.map(s => (
            <SeriesListItem key={s.id} series={s} selected={selectedId === s.id} onClick={() => setSelectedId(s.id)} />
          ))}
        </Box>
      </Box>

      {/* ── Right panel ── */}
      <Box sx={{ flex: 1, overflow: 'hidden', bgcolor: (isAllView || isRecipientsView) ? 'background.paper' : 'rgba(0,0,0,0.02)' }}>
        {isRecipientsView
          ? selectedListId
            ? <RecipientDetailPanel listId={selectedListId} lists={recipientLists} setLists={setRecipientLists} onBack={() => setSelectedListId(null)} />
            : <RecipientListsPanel lists={recipientLists} setLists={setRecipientLists} onSelectList={id => setSelectedListId(id)} />
          : isAllView
          ? <AllNewslettersInbox />
          : selectedSeries
            ? <SeriesDetail
                series={selectedSeries}
                curationSkill={seriesSkills[selectedSeries.id]}
                onCurationSkillChange={skillId => handleCurationSkillChange(selectedSeries.id, skillId)}
                initialPreviewOpen={autoOpenPreview}
              />
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

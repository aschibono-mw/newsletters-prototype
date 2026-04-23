import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Typography, Button, Divider, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, IconButton, Switch,
  Tooltip, Menu, MenuItem, Dialog, Slider, Avatar, Select, TextField,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import BoltIcon from '@mui/icons-material/Bolt'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined'
import XIcon from '@mui/icons-material/X'
import ApartmentIcon from '@mui/icons-material/Apartment'
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined'
import RssFeedIcon from '@mui/icons-material/RssFeed'
import SyncIcon from '@mui/icons-material/Sync'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import ReplyIcon from '@mui/icons-material/Reply'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import GroupsIcon from '@mui/icons-material/Groups'
import ApiIcon from '@mui/icons-material/Api'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import LayersIcon from '@mui/icons-material/Layers'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'

// ── Tracker icon — crosshair/target ───────────────────────────────────────────
function TrackerIcon({ size = 18, color = 'currentColor' }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 20 20"
      sx={{ width: size, height: size, display: 'block', flexShrink: 0 }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="6" stroke={color} strokeWidth="1.5" />
      <circle cx="10" cy="10" r="1.75" fill={color} />
      <line x1="10" y1="1.5" x2="10" y2="4"    stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="10" y1="16"  x2="10" y2="18.5"  stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="1.5" y1="10" x2="4"   y2="10"   stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16"  y1="10" x2="18.5" y2="10"  stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </Box>
  )
}

// ── Palette ────────────────────────────────────────────────────────────────────
const TEAL = '#00827F'
const TEAL_LIGHT = 'rgba(0,130,127,0.10)'

// ── Data ──────────────────────────────────────────────────────────────────────
const ALL_ALERTS = [
  {
    id: 1, type: 'Spike Detection', title: 'Unusual spike detected',
    desc: '847 mentions in the last hour vs. 120 average',
    group: 'Nike Core Monitoring', time: '2m ago', Icon: BoltIcon, unread: true,
  },
  {
    id: 2, type: 'Sentiment Shift', title: 'Sentiment shifted to positive',
    desc: 'Overall sentiment changed from neutral to positive (78%)',
    group: 'Nike Core Monitoring', time: '15m ago', Icon: TrendingUpIcon, unread: true,
  },
  {
    id: 3, type: 'Top Reach', title: 'Wall Street Journal mention',
    desc: 'Major coverage in WSJ with estimated reach of 2.4M',
    group: 'ESG & Regulatory', time: '32m ago', Icon: CampaignOutlinedIcon, unread: true,
  },
  {
    id: 4, type: 'X Influencer', title: '@TechAnalyst posted about your search',
    desc: 'High-influence account (1.2M followers) mentioned your brand',
    group: 'Competitor Watch', time: '1h ago', Icon: XIcon, unread: false,
  },
  {
    id: 5, type: 'Company Events', title: 'Acquisition announced',
    desc: 'Acme Corp announced acquisition of TechStartup Inc.',
    group: 'Competitor Watch', time: '2h ago', Icon: ApartmentIcon, unread: false,
  },
  {
    id: 6, type: 'Breakout Post', title: 'Breakout post detected',
    desc: 'A post is gaining unusual traction across social platforms',
    group: 'Executive Monitoring', time: '3h ago', Icon: LocalFireDepartmentIcon, unread: false,
  },
]

const ALL_NOTIFICATIONS = [
  {
    id: 1, type: 'Export Complete', title: 'Export complete',
    desc: 'Your "Q4 Brand Report" PDF export is ready to download.',
    action: 'Download', time: '5m ago', Icon: FileDownloadOutlinedIcon, unread: true,
  },
  {
    id: 2, type: 'Shared With You', title: 'Dashboard shared with you',
    desc: 'Sarah Johnson shared "Competitor Analysis 2025" with you.',
    action: 'View', time: '1h ago', Icon: ShareOutlinedIcon, unread: true,
  },
  {
    id: 3, type: 'New Feature', title: 'New: AI-powered summaries',
    desc: 'Generate instant summaries of your searches with our new AI feature.',
    action: 'Try it', time: '3h ago', Icon: AutoAwesomeIcon, unread: true,
  },
  {
    id: 4, type: 'Report Ready', title: 'Weekly report generated',
    desc: 'Your scheduled "Brand Health Weekly" report is ready.',
    action: 'View report', time: '6h ago', Icon: DescriptionOutlinedIcon, unread: false,
  },
  {
    id: 5, type: 'Limit Warning', title: 'Approaching search limit',
    desc: "You've used 85% of your monthly search quota.",
    action: 'Upgrade', time: '1d ago', Icon: WarningAmberIcon, unread: false,
  },
  {
    id: 6, type: 'Team Invite', title: 'New team member joined',
    desc: 'Maria Garcia has accepted your invitation and joined the workspace.',
    action: null, time: '1d ago', Icon: PersonAddOutlinedIcon, unread: false,
  },
]

// Delivery channel definitions
const DELIVERY_CHANNELS = {
  Email:  { label: 'Email',  Icon: MailOutlineIcon },
  Slack:  { label: 'Slack',  Icon: ForumOutlinedIcon },
  InApp:  { label: 'In-app', Icon: NotificationsNoneOutlinedIcon },
}

// Source chip styles by type
const SOURCE_TYPE_STYLES = {
  search: { bgcolor: 'rgba(0,130,127,0.08)',   color: '#00827F', Icon: SearchIcon },
  brand:  { bgcolor: 'rgba(182,39,161,0.08)',  color: '#B627A1', Icon: DiamondOutlinedIcon },
  rss:    { bgcolor: 'rgba(230,81,0,0.08)',    color: '#E65100', Icon: RssFeedIcon },
}

const MANAGE_ALERT_GROUPS = [
  {
    id: 1,
    name: 'The Morning News Update',
    sources: [
      { label: 'Nike Sustainability', type: 'search' },
      { label: 'Nike Brand Health',   type: 'search' },
      { label: 'Nike',                type: 'brand'  },
    ],
    digest: { cadence: 'Weekly' },
    alerts: [
      { id: 1, alertType: 'Spike Detection', Icon: BoltIcon,             delivery: ['Email', 'Slack', 'In-app'], active: true,  triggeredAgo: '12m ago', ai: true  },
      { id: 2, alertType: 'Sentiment Shift', Icon: TrendingUpIcon,       delivery: ['Email', 'In-app'],          active: true,  triggeredAgo: '2h ago',  ai: true  },
      { id: 3, alertType: 'Top Reach',       Icon: CampaignOutlinedIcon, delivery: ['Email'],                    active: true,  triggeredAgo: '45m ago', ai: false },
    ],
  },
  {
    id: 2,
    name: 'Competitor Watch',
    sources: [
      { label: 'Sportswear Industry', type: 'search' },
      { label: 'Adidas',              type: 'brand'  },
    ],
    digest: null,
    alerts: [
      { id: 4, alertType: 'X Influencers',  Icon: XIcon,                    delivery: ['Slack', 'In-app'],  active: false, triggeredAgo: '6h ago',  ai: false },
      { id: 5, alertType: 'Company Events', Icon: ApartmentIcon,            delivery: ['Email', 'Slack'],   active: true,  triggeredAgo: '2h ago',  ai: false },
      { id: 6, alertType: 'Likely Boosted', Icon: RocketLaunchOutlinedIcon, delivery: ['Slack', 'In-app'],  active: true,  triggeredAgo: '1d ago',  ai: false },
    ],
  },
  {
    id: 3,
    name: 'ESG & Regulatory',
    sources: [
      { label: 'EU Regulatory News',      type: 'search' },
      { label: 'Sustainability Journals', type: 'rss'    },
    ],
    digest: { cadence: 'Daily' },
    alerts: [
      { id: 7, alertType: 'Industry Events', Icon: CalendarMonthOutlinedIcon, delivery: ['Email'], active: true, triggeredAgo: '2h ago', ai: false },
      { id: 8, alertType: 'RSS Feed',        Icon: RssFeedIcon,              delivery: ['Email'], active: true, triggeredAgo: '8h ago', ai: false },
    ],
  },
  {
    id: 4,
    name: 'Executive Monitoring',
    sources: [
      { label: 'Brand Mentions — Exec', type: 'search' },
      { label: 'Sports Journalists',    type: 'search' },
    ],
    digest: null,
    alerts: [
      { id:  9, alertType: 'Every Mention', Icon: NotificationsNoneOutlinedIcon, delivery: ['In-app'],          active: false, triggeredAgo: '5m ago',  ai: false },
      { id: 10, alertType: 'Follow Post',   Icon: BookmarkBorderOutlinedIcon,    delivery: ['Email', 'In-app'], active: true,  triggeredAgo: '11h ago', ai: false },
    ],
  },
]

const MANAGE_NOTIF_ROWS = [
  { id: 1, name: 'Publish Assignment',       desc: 'Alert me when I have a new assigned post in Publish Engage',          active: true  },
  { id: 2, name: 'Publish Approval',         desc: 'Alert me when I have a new approved post in Publish Engage',          active: true  },
  { id: 3, name: 'Downloads',                desc: 'Alert me when my files are ready',                                     active: true  },
  { id: 4, name: 'Historical data retrieval',desc: 'Alert me when my historical data retrieval is finished',               active: false },
  { id: 5, name: 'Contact updates',          desc: 'Alert me when contacts on media lists have their profiles updated',    active: true  },
  { id: 6, name: 'Alerts Error',             desc: "Alert me if an alert doesn't run properly",                            active: true  },
]


// ── Alert group stack icon (3 bells offset like newsletter stack) ─────────────
function AlertStackIcon({ size = 18, color = TEAL }) {
  const offset = Math.round(size * 0.22)
  const total = size + offset * 2
  return (
    <Box sx={{ position: 'relative', width: total, height: total, flexShrink: 0 }}>
      <Box sx={{ position: 'absolute', top: offset * 2, left: offset * 2, opacity: 0.3 }}>
        <NotificationsNoneOutlinedIcon sx={{ fontSize: size, color, display: 'block' }} />
      </Box>
      <Box sx={{ position: 'absolute', top: offset, left: offset, opacity: 0.6 }}>
        <NotificationsNoneOutlinedIcon sx={{ fontSize: size, color, display: 'block' }} />
      </Box>
      <Box sx={{ position: 'absolute', top: 0, left: 0 }}>
        <NotificationsNoneOutlinedIcon sx={{ fontSize: size, color, display: 'block' }} />
      </Box>
    </Box>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function TabGroup({ tabs, activeTab, onTabChange }) {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '8px',
        overflow: 'hidden',
        bgcolor: 'background.paper',
      }}
    >
      {tabs.map((tab, i) => {
        const isActive = activeTab === tab.key
        return (
          <Box
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            sx={{
              px: 2,
              py: 0.875,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,
              bgcolor: isActive ? '#fff' : 'transparent',
              fontWeight: isActive ? 600 : 400,
              fontSize: '14px',
              color: isActive ? 'text.primary' : 'text.secondary',
              borderRight: i < tabs.length - 1 ? '1px solid' : 'none',
              borderColor: 'divider',
              transition: 'background 0.15s',
              '&:hover': { bgcolor: isActive ? '#fff' : 'action.hover' },
              userSelect: 'none',
            }}
          >
            <Typography sx={{ fontSize: '14px', fontWeight: 'inherit', color: 'inherit', lineHeight: 1 }}>
              {tab.label}
            </Typography>
            {tab.count != null && (
              <Box
                sx={{
                  minWidth: 20, height: 20, borderRadius: '10px',
                  bgcolor: TEAL, color: '#fff',
                  fontSize: '11px', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  px: 0.75,
                }}
              >
                {tab.count}
              </Box>
            )}
          </Box>
        )
      })}
    </Box>
  )
}

function AlertFeedCard({ item }) {
  const { Icon, type, title, desc, group, time, unread, action } = item
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        px: 3,
        py: 2.5,
        borderBottom: '1px solid',
        borderColor: 'divider',
        '&:last-child': { borderBottom: 'none' },
        '&:hover': { bgcolor: 'rgba(0,0,0,0.015)' },
        cursor: 'pointer',
      }}
    >
      {/* Icon */}
      <Box
        sx={{
          width: 40, height: 40, borderRadius: '50%',
          bgcolor: TEAL_LIGHT, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <Icon sx={{ fontSize: 18, color: TEAL }} />
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        {unread && (
          <Typography sx={{ fontSize: '12px', color: TEAL, fontWeight: 600, mb: 0.25 }}>
            {type}
          </Typography>
        )}
        <Typography sx={{ fontSize: '14px', fontWeight: unread ? 700 : 500, color: 'text.primary' }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: '13px', color: 'text.secondary', mt: 0.25 }}>
          {desc}
        </Typography>
        {action && (
          <Typography sx={{ fontSize: '13px', color: TEAL, mt: 0.5, fontWeight: 500, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
            {action}
          </Typography>
        )}
        {group && (
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, mt: 0.75 }}>
            <NotificationsNoneOutlinedIcon sx={{ fontSize: 12, color: 'text.disabled' }} />
            <Typography sx={{ fontSize: '12px', color: 'text.disabled' }}>{group}</Typography>
          </Box>
        )}
      </Box>

      {/* Time */}
      <Typography sx={{ fontSize: '12px', color: 'text.disabled', flexShrink: 0, pt: 0.25 }}>
        {time}
      </Typography>
    </Box>
  )
}

function AllAlertsTab() {
  const unreadCount = ALL_ALERTS.filter(a => a.unread).length
  return (
    <Box>
      {/* Sub-header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>{ALL_ALERTS.length} alerts</Typography>
          <Box
            sx={{
              display: 'flex', alignItems: 'center', gap: 0.5,
              border: '1px solid', borderColor: 'divider', borderRadius: '6px',
              px: 1.25, py: 0.5, cursor: 'pointer', fontSize: '13px', color: 'text.secondary',
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            All types
            <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
          </Box>
        </Box>
        <Typography sx={{ fontSize: '13px', color: TEAL, fontWeight: 500, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
          Mark all as read
        </Typography>
      </Box>

      {/* Feed */}
      {ALL_ALERTS.map(item => <AlertFeedCard key={item.id} item={item} />)}
    </Box>
  )
}

function ManageAlertsTab() {
  const [trackerMenuAnchor, setTrackerMenuAnchor] = useState(null)
  const [alertMenuAnchor, setAlertMenuAnchor] = useState(null)

  // Keep active flags separate so group data (digest etc.) is always read fresh from the constant
  const [groupActive, setGroupActive] = useState(() =>
    Object.fromEntries(MANAGE_ALERT_GROUPS.map(g => [g.id, true]))
  )
  const [alertActive, setAlertActive] = useState(() =>
    Object.fromEntries(MANAGE_ALERT_GROUPS.flatMap(g => g.alerts.map(a => [a.id, a.active])))
  )
  const [groupExpanded, setGroupExpanded] = useState(() =>
    Object.fromEntries(MANAGE_ALERT_GROUPS.map(g => [g.id, true]))
  )

  const toggleGroup = (groupId) =>
    setGroupActive(prev => ({ ...prev, [groupId]: !prev[groupId] }))

  const toggleAlert = (alertId) =>
    setAlertActive(prev => ({ ...prev, [alertId]: !prev[alertId] }))

  const toggleExpanded = (groupId) =>
    setGroupExpanded(prev => ({ ...prev, [groupId]: !prev[groupId] }))

  const switchSx = {
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#00B4AF', opacity: 1 },
    '& .MuiSwitch-switchBase.Mui-checked': { color: '#fff' },
  }

  return (
    <Box>
      {/* Column headers */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 150px 90px 130px 40px', px: 3, py: 1.25, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
        <Typography sx={{ fontSize: '12px', fontWeight: 700, color: 'text.secondary' }}>Tracker</Typography>
        <Typography sx={{ fontSize: '12px', fontWeight: 700, color: 'text.secondary' }}>Delivery</Typography>
        <Typography sx={{ fontSize: '12px', fontWeight: 700, color: 'text.secondary' }}>Status</Typography>
        <Typography sx={{ fontSize: '12px', fontWeight: 700, color: 'text.secondary' }}>Last triggered</Typography>
        <Box />
      </Box>

      {/* Groups */}
      {MANAGE_ALERT_GROUPS.map((group, gi) => {
        const isGroupOn = groupActive[group.id] ?? true
        const isExpanded = groupExpanded[group.id] ?? true
        return (
        <Box key={group.id} sx={{ borderBottom: gi < MANAGE_ALERT_GROUPS.length - 1 ? '1px solid' : 'none', borderColor: 'divider' }}>

          {/* Group header — same grid as alert rows so switch lines up under Status */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 150px 90px 130px 40px', alignItems: 'center', px: 3, py: 1.75, bgcolor: 'rgba(0,0,0,0.02)', borderBottom: isExpanded ? '1px solid' : 'none', borderColor: 'divider' }}>
            {/* Col 1: chevron + icon + name + count + chips */}
            <Box
              onClick={() => toggleExpanded(group.id)}
              sx={{ display: 'flex', alignItems: 'center', gap: 1.25, flexWrap: 'wrap', cursor: 'pointer', userSelect: 'none' }}
            >
              <KeyboardArrowDownIcon sx={{
                fontSize: 18, color: 'text.secondary', flexShrink: 0,
                transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                transition: 'transform 0.2s ease',
              }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.875 }}>
                <TrackerIcon size={16} color={isGroupOn ? TEAL : 'rgba(0,0,0,0.26)'} />
                <Typography sx={{ fontSize: '14px', fontWeight: 700, color: isGroupOn ? 'text.primary' : 'text.disabled' }}>
                  {group.name}
                </Typography>
                {/* Alert count badge */}
                <Box sx={{
                  px: 0.875, py: 0.125, borderRadius: '10px',
                  bgcolor: 'rgba(0,0,0,0.07)',
                  display: 'flex', alignItems: 'center',
                }}>
                  <Typography sx={{ fontSize: '11px', fontWeight: 600, color: 'text.secondary', lineHeight: 1.6 }}>
                    {group.alerts.length} alert{group.alerts.length !== 1 ? 's' : ''}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 0.625, flexWrap: 'wrap', opacity: isGroupOn ? 1 : 0.4 }}>
                {group.sources.map(src => {
                  const s = SOURCE_TYPE_STYLES[src.type]
                  return (
                    <Box key={src.label} onClick={e => e.stopPropagation()} sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, bgcolor: s.bgcolor, borderRadius: '20px', px: 1, py: 0.375 }}>
                      <s.Icon sx={{ fontSize: 12, color: s.color }} />
                      <Typography sx={{ fontSize: '12px', color: s.color, fontWeight: 500, lineHeight: 1 }}>{src.label}</Typography>
                    </Box>
                  )
                })}
              </Box>
            </Box>
            {/* Col 2: empty (Delivery) */}
            <Box />
            {/* Col 3: Status switch */}
            <Switch
              checked={isGroupOn}
              onChange={() => toggleGroup(group.id)}
              size="small"
              sx={switchSx}
            />
            {/* Col 4: digest cadence */}
            <Box>
              {group.digest ? (
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, opacity: isGroupOn ? 1 : 0.4 }}>
                  <ArticleOutlinedIcon sx={{ fontSize: 14, color: TEAL }} />
                  <Typography sx={{ fontSize: '13px', color: TEAL, fontWeight: 700 }}>{group.digest.cadence} digest</Typography>
                </Box>
              ) : (
                <Box
                  className="no-digest-cell"
                  sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, cursor: 'default', '&:hover .add-digest': { opacity: 1 } }}
                >
                  <Typography sx={{ fontSize: '13px', color: 'text.disabled', fontWeight: 700 }}>No digest</Typography>
                  <Typography className="add-digest" sx={{ fontSize: '13px', color: TEAL, fontWeight: 500, opacity: 0, cursor: 'pointer', transition: 'opacity 0.15s', '&:hover': { textDecoration: 'underline' } }}>
                    + Add
                  </Typography>
                </Box>
              )}
            </Box>
            {/* Col 5: tracker menu */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <IconButton size="small" sx={{ p: 0, width: 28, height: 28, borderRadius: '50%' }} onClick={e => { e.stopPropagation(); setTrackerMenuAnchor(e.currentTarget) }}>
                <MoreVertIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>
          </Box>

          {/* Alert rows — collapsible */}
          <Box sx={{
            maxHeight: isExpanded ? '2000px' : 0,
            overflow: 'hidden',
            transition: isExpanded
              ? 'max-height 0.3s ease'
              : 'max-height 0.25s ease',
          }}>
          {group.alerts.map((alert, ai) => {
            const isAlertOn = alertActive[alert.id] ?? alert.active
            return (
            <Box
              key={alert.id}
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 150px 90px 130px 40px',
                alignItems: 'center',
                px: 3,
                py: 1.25,
                borderBottom: ai < group.alerts.length - 1 ? '1px solid' : 'none',
                borderColor: 'rgba(0,0,0,0.06)',
                opacity: isGroupOn ? 1 : 0.45,
                '&:hover': { bgcolor: 'rgba(0,0,0,0.015)' },
              }}
            >
              {/* Alert type + AI badge */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <NotificationsNoneOutlinedIcon sx={{ fontSize: 15, color: 'text.disabled', flexShrink: 0 }} />
                <Typography sx={{ fontSize: '13px', fontWeight: 500 }}>{alert.alertType}</Typography>
              </Box>
              {/* Delivery */}
              <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>{alert.delivery.join(', ')}</Typography>
              {/* Status switch */}
              <Switch
                checked={isAlertOn}
                onChange={() => toggleAlert(alert.id)}
                size="small"
                disabled={!isGroupOn}
                sx={switchSx}
              />
              {/* Last triggered */}
              <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>{alert.triggeredAgo}</Typography>
              {/* Row menu */}
              <IconButton size="small" sx={{ p: 0, width: 28, height: 28, borderRadius: '50%' }} onClick={e => setAlertMenuAnchor(e.currentTarget)}>
                <MoreVertIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>
          )})}
          </Box>{/* end collapse wrapper */}
        </Box>
      )})}


      {/* Footer */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 3, py: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography sx={{ fontSize: '12px', color: 'text.disabled' }}>
          {MANAGE_ALERT_GROUPS.reduce((acc, g) => acc + g.alerts.length, 0)} alerts across {MANAGE_ALERT_GROUPS.length} groups
        </Typography>
      </Box>

      {/* Tracker-level menu */}
      <Menu anchorEl={trackerMenuAnchor} open={Boolean(trackerMenuAnchor)} onClose={() => setTrackerMenuAnchor(null)}>
        <MenuItem onClick={() => setTrackerMenuAnchor(null)} sx={{ fontSize: '14px' }}>Edit</MenuItem>
        <MenuItem onClick={() => setTrackerMenuAnchor(null)} sx={{ fontSize: '14px' }}>Duplicate</MenuItem>
        <MenuItem onClick={() => setTrackerMenuAnchor(null)} sx={{ fontSize: '14px', color: 'error.main' }}>Delete</MenuItem>
      </Menu>

      {/* Alert-level menu */}
      <Menu anchorEl={alertMenuAnchor} open={Boolean(alertMenuAnchor)} onClose={() => setAlertMenuAnchor(null)}>
        <MenuItem onClick={() => setAlertMenuAnchor(null)} sx={{ fontSize: '14px' }}>Edit</MenuItem>
        <MenuItem onClick={() => setAlertMenuAnchor(null)} sx={{ fontSize: '14px', color: 'error.main' }}>Delete</MenuItem>
      </Menu>
    </Box>
  )
}

function AllNotificationsTab() {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>{ALL_NOTIFICATIONS.length} notifications</Typography>
        <Typography sx={{ fontSize: '13px', color: TEAL, fontWeight: 500, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
          Mark all as read
        </Typography>
      </Box>
      {ALL_NOTIFICATIONS.map(item => <AlertFeedCard key={item.id} item={item} />)}
    </Box>
  )
}

function ManageNotificationsTab() {
  const [rows, setRows] = useState(MANAGE_NOTIF_ROWS)
  const toggleRow = (id) => setRows(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r))

  return (
    <Box>
      <Typography sx={{ fontSize: '13px', color: 'text.secondary', px: 3, pt: 2, pb: 1.5 }}>
        System notifications for Meltwater features and activity
      </Typography>

      {/* Card */}
      <Box sx={{ mx: 3, border: '1px solid', borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
        {/* Card header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2.5, py: 1.5, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.default' }}>
          <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>System notifications</Typography>
          <Tooltip title="Notifications about Meltwater platform activity">
            <InfoOutlinedIcon sx={{ fontSize: 15, color: 'text.disabled', cursor: 'pointer' }} />
          </Tooltip>
        </Box>

        {/* Rows */}
        {rows.map((row, i) => (
          <Box
            key={row.id}
            sx={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              px: 2.5, py: 2,
              borderBottom: i < rows.length - 1 ? '1px solid' : 'none',
              borderColor: 'divider',
            }}
          >
            <Box>
              <Typography sx={{ fontSize: '14px', fontWeight: 500 }}>{row.name}</Typography>
              <Typography sx={{ fontSize: '12px', color: 'text.secondary', mt: 0.25 }}>{row.desc}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0, ml: 4 }}>
              <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>Email, In-app</Typography>
              <Switch
                checked={row.active}
                onChange={() => toggleRow(row.id)}
                size="small"
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': { color: '#fff' },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: TEAL },
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

// ── Create Alert Modal ────────────────────────────────────────────────────────

const SAVED_SEARCHES_LIST = [
  { id: 1,  name: 'Brand Coverage',     type: 'Standard'  },
  { id: 2,  name: 'Crisis Keywords',    type: 'Standard'  },
  { id: 3,  name: 'Competitor A',       type: 'Optimized' },
  { id: 4,  name: 'Product Launches',   type: 'Standard'  },
  { id: 5,  name: 'CEO Name',           type: 'Optimized' },
  { id: 6,  name: 'Industry News',      type: 'Standard'  },
  { id: 7,  name: 'Executive Mentions', type: 'Standard'  },
  { id: 8,  name: 'Social Trends',      type: 'Optimized' },
  { id: 9,  name: 'Competitor B',       type: 'Standard'  },
  { id: 10, name: 'Market Analysis',    type: 'Standard'  },
]

const ALERT_TYPE_GROUPS = [
  {
    section: 'SEARCH ALERTS',
    types: [
      { id: 'every_mention',   name: 'Every Mention',   desc: 'Sends an alert every time a new mention appears in a search.',           Icon: ChatBubbleOutlineIcon },
      { id: 'follow_post',     name: 'Follow Post',     desc: "Notifies you when there's activity on a specific post you're following.", Icon: ReplyIcon },
      { id: 'sentiment_shift', name: 'Sentiment Shift', desc: 'Triggers when overall sentiment for a search meaningfully changes.',     Icon: TrendingUpIcon },
      { id: 'spike_detection', name: 'Spike Detection', desc: 'Alerts when mention volume suddenly jumps above normal.',                Icon: BoltIcon },
      { id: 'top_reach',       name: 'Top Reach',       desc: 'Flags when a high-reach source mentions your search.',                  Icon: CampaignOutlinedIcon },
      { id: 'x_influencer',    name: 'X Influencer',    desc: 'Notifies when a high-influence X account posts about your search.',     Icon: XIcon },
    ],
  },
  {
    section: 'EVENT ALERTS',
    types: [
      { id: 'company_events',  name: 'Company Events',  desc: 'Alerts when a significant business event is detected for a company.',   Icon: ApartmentIcon },
      { id: 'industry_events', name: 'Industry Events', desc: 'Alerts on major developments affecting an entire industry.',            Icon: EqualizerIcon },
    ],
  },
  {
    section: 'SOCIAL ALERTS',
    types: [
      { id: 'likely_boosted',  name: 'Likely Boosted',  desc: 'Identifies Facebook posts that are likely being paid-boosted.',         Icon: AttachMoneyIcon },
    ],
  },
  {
    section: 'RSS ALERTS',
    types: [
      { id: 'rss_feed',        name: 'RSS Feed',        desc: 'Sends an alert when a new article appears in a connected RSS feed.',     Icon: RssFeedIcon },
    ],
  },
]

const DELIVERY_CHANNEL_OPTIONS = [
  { key: 'email',   label: 'Email',   Icon: MailOutlineIcon },
  { key: 'inapp',   label: 'In-app',  Icon: NotificationsNoneOutlinedIcon },
  { key: 'slack',   label: 'Slack',   Icon: ForumOutlinedIcon },
  { key: 'teams',   label: 'Teams',   Icon: GroupsIcon },
  { key: 'webhook', label: 'Webhook', Icon: ApiIcon },
]

function StepIndicator({ currentStep }) {
  const steps = ['Searches', 'Output', 'Configure', 'Preview']
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {steps.map((label, i) => {
        const num = i + 1
        const done = num < currentStep
        const active = num === currentStep
        return (
          <Box key={label} sx={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 'none' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexShrink: 0 }}>
              <Box sx={{ width: 24, height: 24, borderRadius: '50%', bgcolor: done || active ? TEAL : 'rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {done
                  ? <CheckIcon sx={{ fontSize: 13, color: '#fff' }} />
                  : <Typography sx={{ fontSize: '11px', fontWeight: 700, color: active ? '#fff' : 'rgba(0,0,0,0.35)', lineHeight: 1 }}>{num}</Typography>
                }
              </Box>
              <Typography sx={{ fontSize: '13px', fontWeight: active ? 700 : 400, color: active ? 'text.primary' : 'text.secondary', whiteSpace: 'nowrap' }}>
                {label}
              </Typography>
            </Box>
            {i < steps.length - 1 && (
              <Box sx={{ flex: 1, height: '1px', bgcolor: done ? TEAL : 'rgba(0,0,0,0.15)', mx: 1.5 }} />
            )}
          </Box>
        )
      })}
    </Box>
  )
}

function SectionCard({ children, sx }) {
  return (
    <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '8px', p: 2.5, ...sx }}>
      {children}
    </Box>
  )
}

function CustomCheckbox({ checked, onChange }) {
  return (
    <Box
      onClick={onChange}
      sx={{ width: 18, height: 18, borderRadius: '4px', border: '2px solid', borderColor: checked ? TEAL : 'rgba(0,0,0,0.3)', bgcolor: checked ? TEAL : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer' }}
    >
      {checked && <CheckIcon sx={{ fontSize: 12, color: '#fff' }} />}
    </Box>
  )
}

function CustomRadio({ checked, onChange }) {
  return (
    <Box onClick={onChange} sx={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid', borderColor: checked ? TEAL : 'rgba(0,0,0,0.3)', bgcolor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer', mt: '2px' }}>
      {checked && <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: TEAL }} />}
    </Box>
  )
}

function CreateTrackerModal({ open, onClose }) {
  const [step, setStep] = useState(1)
  const [trackerName, setTrackerName] = useState('')
  const [selectedSearchIds, setSelectedSearchIds] = useState([])
  const [outputType, setOutputType] = useState(null) // 'alerts' | 'digest' | 'both'
  const [selectedTypeIds, setSelectedTypeIds] = useState([])
  const [digestSchedule, setDigestSchedule] = useState('weekly')
  const [channels, setChannels] = useState({ email: true, inapp: true, slack: false, teams: false, webhook: false })
  const [frequency, setFrequency] = useState('immediate')
  const [quietHours, setQuietHours] = useState(false)

  const toggleSearch = (id) => setSelectedSearchIds(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])
  const toggleType = (id) => setSelectedTypeIds(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])
  const toggleChannel = (key) => setChannels(p => ({ ...p, [key]: !p[key] }))

  const handleClose = () => { onClose(); setStep(1); setTrackerName(''); setSelectedSearchIds([]); setSelectedTypeIds([]); setOutputType(null) }

  const nextDisabled =
    (step === 1 && (!trackerName.trim() || selectedSearchIds.length === 0)) ||
    (step === 2 && !outputType) ||
    (step === 3 && outputType !== 'digest' && selectedTypeIds.length === 0)

  const previewTypeIds = selectedTypeIds.length > 0 ? selectedTypeIds : ['spike_detection', 'sentiment_shift']
  const allTypes = ALERT_TYPE_GROUPS.flatMap(g => g.types)

  const OUTPUT_OPTIONS = [
    {
      value: 'alerts',
      Icon: NotificationsNoneOutlinedIcon,
      label: 'Alerts only',
      desc: 'Get notified in real-time when specific events happen across your searches',
    },
    {
      value: 'digest',
      Icon: ArticleOutlinedIcon,
      label: 'Digest only',
      desc: 'Receive a curated email summary of your searches on a regular schedule',
    },
    {
      value: 'both',
      label: 'Alerts & Digest',
      desc: 'Combine real-time alerts with a scheduled digest for full coverage',
      both: true,
    },
  ]

  const digestScheduleDesc = {
    daily: 'Delivered every morning at 8am',
    weekly: 'Delivered every Monday at 8am',
    monthly: 'Delivered on the 1st of each month',
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      PaperProps={{ sx: { width: 660, maxHeight: '92vh', borderRadius: '12px', display: 'flex', flexDirection: 'column', overflow: 'hidden' } }}
    >
      {/* ── Header ── */}
      <Box sx={{ px: 3, pt: 3, pb: 2.5, flexShrink: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
            <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: TEAL, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AddIcon sx={{ fontSize: 18, color: '#fff' }} />
            </Box>
            <Typography sx={{ fontSize: '18px', fontWeight: 700 }}>Create tracker</Typography>
          </Box>
          <IconButton onClick={handleClose} size="small"><CloseIcon sx={{ fontSize: 20 }} /></IconButton>
        </Box>
        <StepIndicator currentStep={step} />
      </Box>

      {/* ── Scrollable content ── */}
      <Box sx={{ flex: 1, overflowY: 'auto', px: 3, pb: 2 }}>

        {/* ── STEP 1: Searches ── */}
        {step === 1 && (
          <Box>
            {/* Tracker name */}
            <Box sx={{ mb: 2.5 }}>
              <Typography sx={{ fontSize: '13px', fontWeight: 600, mb: 0.75 }}>Tracker name</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="e.g. Nike Core Monitoring"
                value={trackerName}
                onChange={e => setTrackerName(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: TEAL } }}
              />
            </Box>

            {selectedSearchIds.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 1.5 }}>
                {selectedSearchIds.map(id => {
                  const s = SAVED_SEARCHES_LIST.find(x => x.id === id)
                  return (
                    <Chip key={id} label={s.name} size="small" onDelete={() => toggleSearch(id)}
                      sx={{ bgcolor: 'rgba(0,130,127,0.1)', color: TEAL, '& .MuiChip-deleteIcon': { color: TEAL, fontSize: 16 } }}
                    />
                  )
                })}
              </Box>
            )}
            <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '8px', overflow: 'hidden' }}>
              <Box sx={{ px: 3, py: 2, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
                <Typography sx={{ fontSize: '15px', fontWeight: 700 }}>Saved searches</Typography>
                <Typography sx={{ fontSize: '13px', color: 'text.secondary', mt: 0.25 }}>Select one or more searches to monitor</Typography>
              </Box>
              {SAVED_SEARCHES_LIST.map((s, i) => {
                const sel = selectedSearchIds.includes(s.id)
                return (
                  <Box key={s.id} onClick={() => toggleSearch(s.id)} sx={{ display: 'flex', alignItems: 'center', px: 3, py: 1.75, borderBottom: i < SAVED_SEARCHES_LIST.length - 1 ? '1px solid' : 'none', borderColor: 'divider', cursor: 'pointer', bgcolor: sel ? 'rgba(0,130,127,0.04)' : 'transparent', '&:hover': { bgcolor: sel ? 'rgba(0,130,127,0.07)' : 'rgba(0,0,0,0.02)' } }}>
                    <CustomCheckbox checked={sel} onChange={() => toggleSearch(s.id)} />
                    <SearchIcon sx={{ fontSize: 16, color: 'text.disabled', mx: 1.25 }} />
                    <Typography sx={{ fontSize: '14px', flex: 1, color: sel ? TEAL : 'text.primary', fontWeight: sel ? 500 : 400 }}>{s.name}</Typography>
                    <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>{s.type}</Typography>
                  </Box>
                )
              })}
            </Box>
            <Typography sx={{ fontSize: '12px', color: 'text.secondary', mt: 1.5 }}>{selectedSearchIds.length}/10 selected</Typography>
          </Box>
        )}

        {/* ── STEP 2: Output type ── */}
        {step === 2 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            <Box sx={{ mb: 1 }}>
              <Typography sx={{ fontSize: '15px', fontWeight: 700, mb: 0.5 }}>What do you want from this tracker?</Typography>
              <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>You can change this later from the tracker settings.</Typography>
            </Box>
            {OUTPUT_OPTIONS.map(opt => {
              const sel = outputType === opt.value
              return (
                <Box
                  key={opt.value}
                  onClick={() => setOutputType(opt.value)}
                  sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, border: '1.5px solid', borderRadius: '10px', p: 2, cursor: 'pointer', borderColor: sel ? TEAL : 'divider', bgcolor: sel ? 'rgba(0,130,127,0.04)' : 'transparent', '&:hover': { borderColor: sel ? TEAL : 'rgba(0,0,0,0.25)' } }}
                >
                  {/* Icon */}
                  <Box sx={{ width: 40, height: 40, borderRadius: '8px', bgcolor: sel ? 'rgba(0,130,127,0.12)' : 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {opt.both ? (
                      <Box sx={{ display: 'flex', gap: 0.25 }}>
                        <NotificationsNoneOutlinedIcon sx={{ fontSize: 16, color: sel ? TEAL : 'text.secondary' }} />
                        <ArticleOutlinedIcon sx={{ fontSize: 16, color: sel ? TEAL : 'text.secondary' }} />
                      </Box>
                    ) : (
                      <opt.Icon sx={{ fontSize: 20, color: sel ? TEAL : 'text.secondary' }} />
                    )}
                  </Box>
                  {/* Text */}
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: '14px', fontWeight: 600, color: sel ? TEAL : 'text.primary', mb: 0.375 }}>{opt.label}</Typography>
                    <Typography sx={{ fontSize: '13px', color: 'text.secondary', lineHeight: 1.5 }}>{opt.desc}</Typography>
                  </Box>
                  {/* Radio dot */}
                  <Box sx={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid', borderColor: sel ? TEAL : 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, mt: 0.25 }}>
                    {sel && <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: TEAL }} />}
                  </Box>
                </Box>
              )
            })}
          </Box>
        )}

        {/* ── STEP 3: Configure ── */}
        {step === 3 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

            {/* ── Alerts section ── */}
            {(outputType === 'alerts' || outputType === 'both') && (
              <>
                {outputType === 'both' && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <NotificationsNoneOutlinedIcon sx={{ fontSize: 16, color: TEAL }} />
                    <Typography sx={{ fontSize: '14px', fontWeight: 700, color: TEAL }}>Alerts</Typography>
                    <Box sx={{ flex: 1, height: '1px', bgcolor: 'divider', ml: 1 }} />
                  </Box>
                )}

                {/* Alert type grid */}
                <SectionCard>
                  <Typography sx={{ fontSize: '14px', fontWeight: 700, mb: 0.5 }}>Alert types</Typography>
                  <Typography sx={{ fontSize: '13px', color: 'text.secondary', mb: 2 }}>Select one or more types to trigger alerts</Typography>
                  {ALERT_TYPE_GROUPS.map(group => (
                    <Box key={group.section} sx={{ mb: 2, '&:last-child': { mb: 0 } }}>
                      <Typography sx={{ fontSize: '11px', fontWeight: 700, color: 'text.disabled', letterSpacing: '0.08em', mb: 1 }}>{group.section}</Typography>
                      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0.875 }}>
                        {group.types.map(type => {
                          const { Icon } = type
                          const sel = selectedTypeIds.includes(type.id)
                          return (
                            <Box key={type.id} onClick={() => toggleType(type.id)} sx={{ border: '1px solid', borderRadius: '8px', borderColor: sel ? TEAL : 'divider', bgcolor: sel ? 'rgba(0,130,127,0.04)' : 'transparent', p: 1.5, cursor: 'pointer', '&:hover': { borderColor: sel ? TEAL : 'rgba(0,0,0,0.25)' } }}>
                              <Box sx={{ width: 32, height: 32, borderRadius: '6px', bgcolor: sel ? 'rgba(0,130,127,0.12)' : 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                                <Icon sx={{ fontSize: 16, color: sel ? TEAL : 'text.secondary' }} />
                              </Box>
                              <Typography sx={{ fontSize: '13px', fontWeight: 600, color: sel ? TEAL : 'text.primary', mb: 0.375 }}>{type.name}</Typography>
                              <Typography sx={{ fontSize: '11px', color: 'text.secondary', lineHeight: 1.4 }}>{type.desc}</Typography>
                            </Box>
                          )
                        })}
                      </Box>
                    </Box>
                  ))}
                </SectionCard>

                {/* Delivery channels */}
                <SectionCard>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <MailOutlineIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>Delivery channels</Typography>
                  </Box>
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0.875 }}>
                    {DELIVERY_CHANNEL_OPTIONS.map(ch => {
                      const { Icon } = ch
                      const on = channels[ch.key]
                      return (
                        <Box key={ch.key} onClick={() => toggleChannel(ch.key)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid', borderRadius: '8px', px: 1.5, py: 1.125, borderColor: on ? TEAL : 'divider', bgcolor: on ? 'rgba(0,130,127,0.04)' : 'transparent', cursor: 'pointer' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                            <Icon sx={{ fontSize: 15, color: on ? TEAL : 'text.secondary' }} />
                            <Typography sx={{ fontSize: '13px', color: on ? TEAL : 'text.primary' }}>{ch.label}</Typography>
                          </Box>
                          <Switch checked={on} onChange={() => toggleChannel(ch.key)} size="small" sx={{ '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: TEAL } }} />
                        </Box>
                      )
                    })}
                  </Box>
                </SectionCard>

                {/* Timing */}
                <SectionCard>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <AccessTimeOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>Frequency</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.75, mb: 2 }}>
                    {['Immediate', 'Hourly', 'Daily'].map(f => {
                      const active = frequency === f.toLowerCase()
                      return (
                        <Box key={f} onClick={() => setFrequency(f.toLowerCase())} sx={{ px: 1.75, py: 0.625, borderRadius: '20px', border: '1px solid', cursor: 'pointer', borderColor: active ? TEAL : 'divider', color: active ? TEAL : 'text.secondary', bgcolor: active ? 'rgba(0,130,127,0.06)' : 'transparent', fontSize: '13px', fontWeight: active ? 600 : 400 }}>
                          {f}
                        </Box>
                      )
                    })}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>Quiet hours</Typography>
                      <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>Pause alerts between 10pm – 7am</Typography>
                    </Box>
                    <Switch checked={quietHours} onChange={() => setQuietHours(v => !v)} size="small" sx={{ '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: TEAL } }} />
                  </Box>
                </SectionCard>
              </>
            )}

            {/* ── Digest section ── */}
            {(outputType === 'digest' || outputType === 'both') && (
              <>
                {outputType === 'both' && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5, mb: 0.5 }}>
                    <ArticleOutlinedIcon sx={{ fontSize: 16, color: TEAL }} />
                    <Typography sx={{ fontSize: '14px', fontWeight: 700, color: TEAL }}>Digest</Typography>
                    <Box sx={{ flex: 1, height: '1px', bgcolor: 'divider', ml: 1 }} />
                  </Box>
                )}

                {/* Schedule */}
                <SectionCard>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <CalendarMonthOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>Schedule</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.75, mb: 1.5 }}>
                    {['Daily', 'Weekly', 'Monthly'].map(f => {
                      const active = digestSchedule === f.toLowerCase()
                      return (
                        <Box key={f} onClick={() => setDigestSchedule(f.toLowerCase())} sx={{ px: 1.75, py: 0.625, borderRadius: '20px', border: '1px solid', cursor: 'pointer', borderColor: active ? TEAL : 'divider', color: active ? TEAL : 'text.secondary', bgcolor: active ? 'rgba(0,130,127,0.06)' : 'transparent', fontSize: '13px', fontWeight: active ? 600 : 400 }}>
                          {f}
                        </Box>
                      )
                    })}
                  </Box>
                  <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>{digestScheduleDesc[digestSchedule]}</Typography>
                </SectionCard>

                {/* Recipients */}
                <SectionCard>
                  <Typography sx={{ fontSize: '14px', fontWeight: 700, mb: 0.5 }}>Recipients</Typography>
                  <Typography sx={{ fontSize: '13px', color: 'text.secondary', mb: 1.5 }}>Who receives this digest</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, border: '1px solid', borderColor: 'divider', borderRadius: '6px', px: 1.5, py: 1, mb: 1 }}>
                    <SearchIcon sx={{ fontSize: 15, color: 'text.disabled' }} />
                    <Typography sx={{ fontSize: '13px', color: 'text.disabled' }}>Search by name or email address</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, border: '1px solid', borderColor: 'divider', borderRadius: '6px', px: 1.5, py: 1.25 }}>
                    <Avatar sx={{ width: 30, height: 30, bgcolor: 'rgba(0,130,127,0.15)', color: TEAL, fontSize: '11px', fontWeight: 700 }}>MT</Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>Mariano Titanti</Typography>
                      <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>mariano.titanti@meltwater.com</Typography>
                    </Box>
                    <IconButton size="small"><CloseIcon sx={{ fontSize: 13 }} /></IconButton>
                  </Box>
                </SectionCard>
              </>
            )}
          </Box>
        )}

        {/* ── STEP 4: Preview ── */}
        {step === 4 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Volume estimate */}
            <SectionCard sx={{ p: 0, overflow: 'hidden' }}>
              <Box sx={{ px: 2.5, py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>Estimated alert volume</Typography>
                <Typography sx={{ fontSize: '12px', color: 'text.secondary', mt: 0.25 }}>
                  Based on {selectedSearchIds.length || 1} search(es) × 1 recipient(s)
                </Typography>
              </Box>
              <Box sx={{ px: 2.5, py: 2 }}>
                <Box sx={{ mb: 1.5 }}>
                  <Typography component="span" sx={{ fontSize: '36px', fontWeight: 700, lineHeight: 1 }}>~240</Typography>
                  <Typography component="span" sx={{ fontSize: '14px', color: 'text.secondary', ml: 1 }}>emails per day</Typography>
                </Box>
                <Box sx={{ bgcolor: 'rgba(211,47,47,0.05)', border: '1px solid rgba(211,47,47,0.2)', borderRadius: '8px', px: 2, py: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1 }}>
                    <WarningAmberIcon sx={{ fontSize: 16, color: '#d32f2f' }} />
                    <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#d32f2f' }}>High alert volume detected</Typography>
                  </Box>
                  <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                    <Box component="li" sx={{ mb: 0.5 }}>
                      <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>
                        Switch to{' '}
                        <Typography component="span" sx={{ color: TEAL, cursor: 'pointer', textDecoration: 'underline', fontSize: '12px' }}>Daily threshold</Typography>
                      </Typography>
                    </Box>
                    <Box component="li">
                      <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>
                        Enable{' '}
                        <Typography component="span" sx={{ color: TEAL, cursor: 'pointer', textDecoration: 'underline', fontSize: '12px' }}>Relevance Boost</Typography>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </SectionCard>

            {/* Alert types being created */}
            <SectionCard>
              <Typography sx={{ fontSize: '14px', fontWeight: 700, mb: 1.5 }}>Alert types being created</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                {previewTypeIds.map(id => {
                  const type = allTypes.find(t => t.id === id)
                  if (!type) return null
                  const { Icon } = type
                  return (
                    <Box key={id} sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.625, border: '1px solid', borderColor: 'divider', borderRadius: '20px', px: 1.25, py: 0.5 }}>
                      <Icon sx={{ fontSize: 14, color: 'text.secondary' }} />
                      <Typography sx={{ fontSize: '13px' }}>{type.name}</Typography>
                    </Box>
                  )
                })}
              </Box>
            </SectionCard>

            {/* Email preview */}
            <SectionCard>
              <Typography sx={{ fontSize: '14px', fontWeight: 700, mb: 2 }}>Email preview</Typography>
              <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '8px', p: 2, bgcolor: '#fafafa' }}>
                {/* Alert header */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: 'rgba(0,130,127,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <AttachMoneyIcon sx={{ fontSize: 20, color: TEAL }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '15px', fontWeight: 700 }}>Likely Boosted Alert</Typography>
                    <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>Brand Coverage</Typography>
                  </Box>
                </Box>

                {/* Why you received this */}
                <Typography sx={{ fontSize: '10px', fontWeight: 700, color: 'text.disabled', letterSpacing: '0.08em', mb: 0.5 }}>WHY YOU RECEIVED THIS</Typography>
                <Typography sx={{ fontSize: '12px', color: 'text.secondary', mb: 0.75 }}>
                  This article matched your search: <strong>"Brand Coverage"</strong>
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
                  {['keyword match', 'brand'].map(tag => (
                    <Box key={tag} sx={{ bgcolor: 'rgba(0,130,127,0.08)', borderRadius: '12px', px: 1, py: 0.25 }}>
                      <Typography sx={{ fontSize: '11px', color: TEAL }}>{tag}</Typography>
                    </Box>
                  ))}
                </Box>

                {/* Article card */}
                <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '8px', p: 1.75, bgcolor: '#fff', mb: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      <Box sx={{ width: 22, height: 22, borderRadius: '4px', bgcolor: '#E31B23', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Typography sx={{ fontSize: '9px', fontWeight: 700, color: '#fff' }}>Y!</Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: '12px', fontWeight: 500 }}>News Source · Wire Service</Typography>
                        <Typography sx={{ fontSize: '11px', color: 'text.secondary' }}>News | US | Feb 10, 2:36 PM</Typography>
                      </Box>
                    </Box>
                    <Typography sx={{ fontSize: '12px', color: TEAL, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, ml: 1 }}>View article ↗</Typography>
                  </Box>
                  <Typography sx={{ fontSize: '13px', fontWeight: 700, lineHeight: 1.4, mb: 0.75 }}>
                    Sample Article Title: Breaking News Coverage Related to Your Brand Monitoring Search
                  </Typography>
                  <Typography sx={{ fontSize: '12px', color: 'text.secondary', mb: 1.25, lineHeight: 1.5 }}>
                    The article discusses developments related to your search query, demonstrating how mentions appear in your alert emails...
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>📈 649.7k Reach</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'grey.400' }} />
                        <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>Neutral Sentiment</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                      <Typography sx={{ fontSize: '12px', color: TEAL, cursor: 'pointer' }}>Tag</Typography>
                      <Typography sx={{ fontSize: '12px', color: TEAL, cursor: 'pointer' }}>Share</Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Feedback */}
                <Box sx={{ bgcolor: 'rgba(0,0,0,0.03)', borderRadius: '8px', p: 1.5, textAlign: 'center', mb: 1.5 }}>
                  <Typography sx={{ fontSize: '13px', mb: 1 }}>Was this alert helpful?</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                    {[{ emoji: '👍', label: 'Yes' }, { emoji: '👎', label: 'No' }].map(b => (
                      <Box key={b.label} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '6px', px: 1.75, py: 0.625, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: '#fff', '&:hover': { bgcolor: 'action.hover' } }}>
                        <Typography sx={{ fontSize: '14px' }}>{b.emoji}</Typography>
                        <Typography sx={{ fontSize: '13px' }}>{b.label}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* CTA buttons */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button sx={{ bgcolor: '#E53935', color: '#fff', textTransform: 'none', flex: 1, fontSize: '13px', py: 1, borderRadius: '6px', '&:hover': { bgcolor: '#C62828' } }}>
                    Edit alert frequency
                  </Button>
                  <Button variant="outlined" sx={{ flex: 1, textTransform: 'none', fontSize: '13px', py: 1, borderRadius: '6px' }}>
                    View all alerts
                  </Button>
                </Box>
              </Box>
            </SectionCard>
          </Box>
        )}
      </Box>

      {/* ── Footer ── */}
      <Box sx={{ px: 3, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1, borderTop: '1px solid', borderColor: 'divider', flexShrink: 0 }}>
        {step > 1 && (
          <Button onClick={() => setStep(s => s - 1)} variant="text" sx={{ color: 'text.secondary', textTransform: 'none', fontWeight: 500 }}>
            Back
          </Button>
        )}
        {step < 4 ? (
          <Button variant="contained" onClick={() => setStep(s => s + 1)} disabled={nextDisabled}
            sx={{ bgcolor: TEAL, color: '#fff', textTransform: 'none', fontWeight: 600, '&:hover': { bgcolor: '#006e6b' }, '&.Mui-disabled': { bgcolor: 'rgba(0,130,127,0.3)', color: '#fff' } }}
          >
            Next
          </Button>
        ) : (
          <Button variant="contained" onClick={handleClose}
            sx={{ bgcolor: TEAL, color: '#fff', textTransform: 'none', fontWeight: 600, '&:hover': { bgcolor: '#006e6b' } }}
          >
            Save
          </Button>
        )}
      </Box>
    </Dialog>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function MwAlertsPage() {
  const navigate = useNavigate()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'background.default' }}>
      {/* Page header */}
      <Box sx={{ px: 3, pt: 3, pb: 2.5, bgcolor: 'background.default', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, fontSize: '20px', mb: 0.5 }}>Your trackers</Typography>
          <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>
            Stay on top of your searches with real-time alerts and scheduled digests
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/mw-alerts/create')}
          sx={{
            bgcolor: TEAL, color: '#fff', textTransform: 'none', fontWeight: 500,
            '&:hover': { bgcolor: '#006e6b' }, borderRadius: '8px', px: 2.5,
          }}
        >
          Create Tracker
        </Button>
      </Box>

      {/* Content card */}
      <Box sx={{ flex: 1, overflow: 'auto', px: 3, pb: 3 }}>
        <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, bgcolor: 'background.paper', overflow: 'hidden' }}>
          <ManageAlertsTab />
        </Box>
      </Box>
    </Box>
  )
}

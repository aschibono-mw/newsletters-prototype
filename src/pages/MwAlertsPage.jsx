import { useState } from 'react'
import {
  Box, Typography, Button, Divider, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, IconButton, Switch,
  Tooltip, Menu, MenuItem, Dialog, Slider, Avatar, Select,
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

// ── Palette ────────────────────────────────────────────────────────────────────
const TEAL = '#00827F'
const TEAL_LIGHT = 'rgba(0,130,127,0.10)'

// ── Data ──────────────────────────────────────────────────────────────────────
const ALL_ALERTS = [
  {
    id: 1, type: 'Spike Detection', title: 'Unusual spike detected',
    desc: '847 mentions in the last hour vs. 120 average',
    source: 'Brand Mentions Search', time: '2m ago', Icon: BoltIcon, unread: true,
  },
  {
    id: 2, type: 'Sentiment Shift', title: 'Sentiment shifted to positive',
    desc: 'Overall sentiment changed from neutral to positive (78%)',
    source: 'Product Launch Campaign', time: '15m ago', Icon: TrendingUpIcon, unread: true,
  },
  {
    id: 3, type: 'Top Reach', title: 'Wall Street Journal mention',
    desc: 'Major coverage in WSJ with estimated reach of 2.4M',
    source: 'Industry News Search', time: '32m ago', Icon: CampaignOutlinedIcon, unread: true,
  },
  {
    id: 4, type: 'X Influencer', title: '@TechAnalyst posted about your search',
    desc: 'High-influence account (1.2M followers) mentioned your brand',
    source: 'Competitor Monitoring', time: '1h ago', Icon: XIcon, unread: false,
  },
  {
    id: 5, type: 'Company Events', title: 'Acquisition announced',
    desc: 'Acme Corp announced acquisition of TechStartup Inc.',
    source: 'Competitor Watch', time: '2h ago', Icon: ApartmentIcon, unread: false,
  },
  {
    id: 6, type: 'Breakout Post', title: 'Breakout post detected',
    desc: 'A post is gaining unusual traction across social platforms',
    source: 'Social Monitoring', time: '3h ago', Icon: LocalFireDepartmentIcon, unread: false,
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

const MANAGE_ALERTS_ROWS = [
  { id:  1, alertType: 'Spike Detection',  Icon: BoltIcon,                      iconBg: '#FFF3E0', iconColor: '#E65100', search: 'Nike Sustainability',           delivery: ['Email','Slack','InApp'], triggered: 'Apr 9, 2026 · 9:14 AM',  active: true,  digest: 'Weekly Brand Monitor' },
  { id:  2, alertType: 'Sentiment Shift',  Icon: TrendingUpIcon,                iconBg: '#FCE4EC', iconColor: '#C2185B', search: 'Nike Brand Health',             delivery: ['Email','InApp'],         triggered: 'Apr 9, 2026 · 8:30 AM',  active: true,  digest: null },
  { id:  3, alertType: 'Top Reach',        Icon: CampaignOutlinedIcon,          iconBg: '#E0F2F1', iconColor: '#00827F', search: 'Sportswear Industry',           delivery: ['Email'],                  triggered: 'Apr 9, 2026 · 7:45 AM',  active: false, digest: null },
  { id:  4, alertType: 'X Influencers',    Icon: XIcon,                         iconBg: '#F5F5F5', iconColor: '#424242', search: 'Nike Sustainability',           delivery: ['Slack','InApp'],          triggered: 'Apr 9, 2026 · 6:20 AM',  active: false, digest: null },
  { id:  5, alertType: 'Company Events',   Icon: ApartmentIcon,                 iconBg: '#E3F2FD', iconColor: '#1565C0', search: 'Nike Corporate',                delivery: ['Email','Slack'],          triggered: 'Apr 8, 2026 · 4:00 PM',  active: true,  digest: null },
  { id:  6, alertType: 'Industry Events',  Icon: CalendarMonthOutlinedIcon,     iconBg: '#EDE7F6', iconColor: '#6A1B9A', search: 'EU Regulatory News',            delivery: ['Email'],                  triggered: 'Apr 8, 2026 · 2:00 PM',  active: true,  digest: 'ESG & Sustainability Tracker' },
  { id:  7, alertType: 'Every Mention',    Icon: NotificationsNoneOutlinedIcon, iconBg: '#E0F7FA', iconColor: '#00838F', search: 'Brand Mentions — Exec',         delivery: ['InApp'],                  triggered: 'Apr 8, 2026 · 3:45 PM',  active: false, digest: null },
  { id:  8, alertType: 'Follow Post',      Icon: BookmarkBorderOutlinedIcon,    iconBg: '#E8EAF6', iconColor: '#3949AB', search: 'Followed — Sports Journalists', delivery: ['Email','InApp'],          triggered: 'Apr 7, 2026 · 11:30 AM', active: true,  digest: null },
  { id:  9, alertType: 'Likely Boosted',   Icon: RocketLaunchOutlinedIcon,      iconBg: '#FCE4EC', iconColor: '#AD1457', search: 'Competitor — Adidas',           delivery: ['Slack','InApp'],          triggered: 'Apr 6, 2026 · 9:00 AM',  active: true,  digest: null },
  { id: 10, alertType: 'RSS Feed',         Icon: RssFeedIcon,                   iconBg: '#FFF3E0', iconColor: '#E65100', search: 'Sustainability Journals',        delivery: ['Email'],                  triggered: 'Apr 6, 2026 · 8:00 AM',  active: true,  digest: null },
]

const MANAGE_NOTIF_ROWS = [
  { id: 1, name: 'Publish Assignment',       desc: 'Alert me when I have a new assigned post in Publish Engage',          active: true  },
  { id: 2, name: 'Publish Approval',         desc: 'Alert me when I have a new approved post in Publish Engage',          active: true  },
  { id: 3, name: 'Downloads',                desc: 'Alert me when my files are ready',                                     active: true  },
  { id: 4, name: 'Historical data retrieval',desc: 'Alert me when my historical data retrieval is finished',               active: false },
  { id: 5, name: 'Contact updates',          desc: 'Alert me when contacts on media lists have their profiles updated',    active: true  },
  { id: 6, name: 'Alerts Error',             desc: "Alert me if an alert doesn't run properly",                            active: true  },
]


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
  const { Icon, type, title, desc, source, time, unread, action } = item
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
        {source && !action && (
          <Typography sx={{ fontSize: '12px', color: 'text.disabled', mt: 0.5 }}>
            {source}
          </Typography>
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
  const [rows, setRows] = useState(MANAGE_ALERTS_ROWS)
  const [anchorEl, setAnchorEl] = useState(null)

  const toggleActive = (id) => setRows(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r))

  return (
    <Box>
      {/* Filter bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 3, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>Filter:</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, border: '1px solid', borderColor: 'divider', borderRadius: '6px', px: 1.25, py: 0.5, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}>
          <Typography sx={{ fontSize: '13px', color: 'text.primary', fontWeight: 500 }}>All types</Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
        </Box>
      </Box>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ '& th': { fontSize: '12px', fontWeight: 700, color: 'text.secondary', py: 1.5, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' } }}>
              <TableCell sx={{ pl: 3 }}>Alert Type</TableCell>
              <TableCell>Saved Search</TableCell>
              <TableCell>Delivery</TableCell>
              <TableCell>Triggered</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created via</TableCell>
              <TableCell sx={{ pr: 2, width: 40 }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => {
              const { Icon } = row
              return (
                <TableRow
                  key={row.id}
                  sx={{ '&:hover': { bgcolor: 'rgba(0,0,0,0.015)' }, '& td': { py: 2, borderBottom: '1px solid', borderColor: 'divider', verticalAlign: 'middle' } }}
                >
                  {/* Alert Type */}
                  <TableCell sx={{ pl: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                      <Box sx={{ width: 32, height: 32, borderRadius: '8px', bgcolor: row.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon sx={{ fontSize: 16, color: row.iconColor }} />
                      </Box>
                      <Typography sx={{ fontSize: '13px', fontWeight: 500, whiteSpace: 'nowrap' }}>{row.alertType}</Typography>
                    </Box>
                  </TableCell>

                  {/* Saved Search */}
                  <TableCell>
                    <Typography sx={{ fontSize: '13px', color: 'text.primary' }}>{row.search}</Typography>
                  </TableCell>

                  {/* Delivery — stacked icons */}
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      {row.delivery.map(key => {
                        const ch = DELIVERY_CHANNELS[key]
                        return (
                          <Box key={key} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                            <ch.Icon sx={{ fontSize: 14, color: 'text.disabled' }} />
                            <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>{ch.label}</Typography>
                          </Box>
                        )
                      })}
                    </Box>
                  </TableCell>

                  {/* Triggered */}
                  <TableCell>
                    <Typography sx={{ fontSize: '13px', color: 'text.secondary', whiteSpace: 'nowrap' }}>{row.triggered}</Typography>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Switch
                      checked={row.active}
                      onChange={() => toggleActive(row.id)}
                      size="small"
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': { color: '#fff' },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: TEAL },
                      }}
                    />
                  </TableCell>

                  {/* Created via */}
                  <TableCell>
                    {row.digest ? (
                      <Box sx={{ display: 'inline-flex', flexDirection: 'column', border: '1px solid', borderColor: TEAL, borderRadius: '6px', px: 1.25, py: 0.6, cursor: 'pointer', '&:hover': { bgcolor: 'rgba(0,130,127,0.04)' } }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <ArticleOutlinedIcon sx={{ fontSize: 13, color: TEAL }} />
                          <Typography sx={{ fontSize: '12px', fontWeight: 700, color: TEAL }}>Digest setup</Typography>
                        </Box>
                        <Typography sx={{ fontSize: '11px', color: TEAL, opacity: 0.75, mt: 0.25, maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {row.digest}
                        </Typography>
                      </Box>
                    ) : (
                      <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, border: '1px solid', borderColor: 'divider', borderRadius: '6px', px: 1.25, py: 0.6, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}>
                        <SyncIcon sx={{ fontSize: 13, color: 'text.disabled' }} />
                        <Typography sx={{ fontSize: '12px', fontWeight: 500, color: 'text.secondary' }}>Alert setup</Typography>
                      </Box>
                    )}
                  </TableCell>

                  {/* Menu */}
                  <TableCell sx={{ pr: 2 }}>
                    <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
                      <MoreVertIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 3, py: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography sx={{ fontSize: '12px', color: 'text.disabled' }}>1–{rows.length} of {rows.length}</Typography>
      </Box>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => setAnchorEl(null)} sx={{ fontSize: '14px' }}>Edit</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)} sx={{ fontSize: '14px' }}>Duplicate</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)} sx={{ fontSize: '14px', color: 'error.main' }}>Delete</MenuItem>
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
  const steps = ['Searches', 'Alert Types', 'Details', 'Preview']
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

function CreateAlertModal({ open, onClose }) {
  const [step, setStep] = useState(1)
  const [selectedSearchIds, setSelectedSearchIds] = useState([])
  const [selectedTypeIds, setSelectedTypeIds] = useState([])
  const [relevanceBoost, setRelevanceBoost] = useState(false)
  const [urgency, setUrgency] = useState(50)
  const [channels, setChannels] = useState({ email: true, inapp: true, slack: false, teams: false, webhook: false })
  const [notifyMode, setNotifyMode] = useState('immediate')
  const [frequency, setFrequency] = useState('immediate')
  const [quietHours, setQuietHours] = useState(false)
  const [showImages, setShowImages] = useState(true)

  const toggleSearch = (id) => setSelectedSearchIds(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])
  const toggleType = (id) => setSelectedTypeIds(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])
  const toggleChannel = (key) => setChannels(p => ({ ...p, [key]: !p[key] }))

  const handleClose = () => { onClose(); setStep(1); setSelectedSearchIds([]); setSelectedTypeIds([]) }

  const urgencyText = urgency < 30
    ? { label: 'All coverage', desc: 'You will receive all alerts as they happen' }
    : urgency < 70
    ? { label: 'Important only', desc: "We'll filter out low-relevance mentions using AI ranking" }
    : { label: 'Urgent spikes only', desc: 'Only alerts with significant volume spikes will be sent' }

  const previewTypeIds = selectedTypeIds.length > 0 ? selectedTypeIds : ['likely_boosted', 'every_mention']
  const allTypes = ALERT_TYPE_GROUPS.flatMap(g => g.types)

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
            <Typography sx={{ fontSize: '18px', fontWeight: 700 }}>Create alert</Typography>
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

        {/* ── STEP 2: Alert Types ── */}
        {step === 2 && (
          <SectionCard>
            <Typography sx={{ fontSize: '15px', fontWeight: 700, mb: 0.5 }}>Alert types</Typography>
            <Typography sx={{ fontSize: '13px', color: 'text.secondary', mb: 2.5 }}>Select one or more alert types to create</Typography>
            {ALERT_TYPE_GROUPS.map(group => (
              <Box key={group.section} sx={{ mb: 2.5, '&:last-child': { mb: 0 } }}>
                <Typography sx={{ fontSize: '11px', fontWeight: 700, color: 'text.disabled', letterSpacing: '0.08em', mb: 1.25 }}>
                  {group.section}
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                  {group.types.map(type => {
                    const { Icon } = type
                    const sel = selectedTypeIds.includes(type.id)
                    return (
                      <Box key={type.id} onClick={() => toggleType(type.id)} sx={{ border: '1px solid', borderRadius: '8px', borderColor: sel ? TEAL : 'divider', bgcolor: sel ? 'rgba(0,130,127,0.04)' : 'transparent', p: 1.75, cursor: 'pointer', '&:hover': { borderColor: sel ? TEAL : 'rgba(0,0,0,0.3)' } }}>
                        <Box sx={{ width: 36, height: 36, borderRadius: '8px', bgcolor: sel ? 'rgba(0,130,127,0.12)' : 'rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.25 }}>
                          <Icon sx={{ fontSize: 18, color: sel ? TEAL : 'text.secondary' }} />
                        </Box>
                        <Typography sx={{ fontSize: '13px', fontWeight: 600, color: sel ? TEAL : 'text.primary', mb: 0.5 }}>{type.name}</Typography>
                        <Typography sx={{ fontSize: '12px', color: 'text.secondary', lineHeight: 1.45 }}>{type.desc}</Typography>
                      </Box>
                    )
                  })}
                </Box>
              </Box>
            ))}
          </SectionCard>
        )}

        {/* ── STEP 3: Details ── */}
        {step === 3 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <Typography sx={{ fontSize: '16px', fontWeight: 700, mb: 0.75 }}>Configure details for Likely Boosted alert</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <SearchIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>
                  {selectedSearchIds.length > 0 ? SAVED_SEARCHES_LIST.find(s => s.id === selectedSearchIds[0])?.name : 'Brand Coverage'}
                </Typography>
              </Box>
            </Box>

            {/* Relevance Boost */}
            <Box sx={{ border: `1.5px solid ${TEAL}`, borderRadius: '8px', p: 2.5, bgcolor: 'rgba(0,130,127,0.02)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
                <AutoAwesomeIcon sx={{ fontSize: 15, color: TEAL }} />
                <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>Relevance Boost</Typography>
                <Box sx={{ bgcolor: 'rgba(0,130,127,0.12)', borderRadius: '4px', px: 0.75, py: 0.2 }}>
                  <Typography sx={{ fontSize: '10px', fontWeight: 700, color: TEAL, lineHeight: 1.4 }}>Beta</Typography>
                </Box>
              </Box>
              <Typography sx={{ fontSize: '13px', color: 'text.secondary', mb: 2 }}>Reduce noise by prioritizing mentions that match your intent.</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: '#fff', border: '1px solid', borderColor: 'divider', borderRadius: '6px', px: 1.75, py: 1.25 }}>
                <Typography sx={{ fontSize: '14px' }}>Enable relevance filtering</Typography>
                <Switch checked={relevanceBoost} onChange={() => setRelevanceBoost(v => !v)} size="small" sx={{ '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: TEAL } }} />
              </Box>
            </Box>

            {/* Urgency Level */}
            <SectionCard>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <BoltIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>Urgency level</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5, px: 0.5 }}>
                {['All coverage', 'Important only', 'Urgent spikes only'].map(l => (
                  <Typography key={l} sx={{ fontSize: '11px', color: 'text.secondary' }}>{l}</Typography>
                ))}
              </Box>
              <Slider value={urgency} onChange={(_, v) => setUrgency(v)} step={50} marks={[{ value: 0 }, { value: 50 }, { value: 100 }]} sx={{ color: TEAL, '& .MuiSlider-mark': { bgcolor: TEAL, opacity: 0.4 }, mb: 0.5 }} />
              <Box sx={{ bgcolor: 'rgba(0,0,0,0.04)', borderRadius: '6px', px: 1.5, py: 1, mt: 0.5 }}>
                <Typography sx={{ fontSize: '13px' }}>
                  <strong>{urgencyText.label}:</strong> {urgencyText.desc}
                </Typography>
              </Box>
            </SectionCard>

            {/* Settings */}
            <SectionCard>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 2 }}>
                <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>Settings</Typography>
                <HelpOutlineIcon sx={{ fontSize: 15, color: 'text.disabled' }} />
              </Box>
              <Typography sx={{ fontSize: '11px', fontWeight: 700, color: 'text.disabled', letterSpacing: '0.08em', mb: 1 }}>SIMILAR MENTIONS</Typography>
              <Select value="exclude" size="small" fullWidth sx={{ fontSize: '14px', mb: 2 }}>
                <MenuItem value="exclude">Exclude similar mentions</MenuItem>
                <MenuItem value="include">Include similar mentions</MenuItem>
              </Select>
              <Typography sx={{ fontSize: '11px', fontWeight: 700, color: 'text.disabled', letterSpacing: '0.08em', mb: 1 }}>DISPLAY</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => setShowImages(v => !v)}>
                <CustomCheckbox checked={showImages} onChange={() => setShowImages(v => !v)} />
                <Typography sx={{ fontSize: '14px' }}>Images</Typography>
              </Box>
            </SectionCard>

            {/* Delivery Channels */}
            <SectionCard>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <MailOutlineIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>Delivery channels</Typography>
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                {DELIVERY_CHANNEL_OPTIONS.map(ch => {
                  const { Icon } = ch
                  const on = channels[ch.key]
                  return (
                    <Box key={ch.key} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid', borderRadius: '8px', px: 1.5, py: 1.25, borderColor: on ? TEAL : 'divider', bgcolor: on ? 'rgba(0,130,127,0.04)' : 'transparent' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                        <Icon sx={{ fontSize: 16, color: on ? TEAL : 'text.secondary' }} />
                        <Typography sx={{ fontSize: '14px', color: on ? TEAL : 'text.primary' }}>{ch.label}</Typography>
                      </Box>
                      <Switch checked={on} onChange={() => toggleChannel(ch.key)} size="small" sx={{ '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: TEAL } }} />
                    </Box>
                  )
                })}
              </Box>
            </SectionCard>

            {/* When to notify me */}
            <SectionCard>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 2 }}>
                <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>When to notify me</Typography>
                <HelpOutlineIcon sx={{ fontSize: 15, color: 'text.disabled' }} />
              </Box>
              {[
                { value: 'immediate', label: 'Immediately (every mention)', desc: 'You will receive notification for every single mention as they happen' },
                { value: 'daily',     label: 'Daily threshold (last 24 hours)', desc: 'Sends an alert as soon as mentions exceed your threshold (24-hour window is fixed)' },
              ].map(opt => (
                <Box key={opt.value} onClick={() => setNotifyMode(opt.value)} sx={{ display: 'flex', gap: 1.5, mb: 1.5, cursor: 'pointer', '&:last-child': { mb: 0 } }}>
                  <CustomRadio checked={notifyMode === opt.value} onChange={() => setNotifyMode(opt.value)} />
                  <Box>
                    <Typography sx={{ fontSize: '14px', fontWeight: 500 }}>{opt.label}</Typography>
                    <Typography sx={{ fontSize: '12px', color: 'text.secondary', mt: 0.25 }}>{opt.desc}</Typography>
                  </Box>
                </Box>
              ))}
            </SectionCard>

            {/* Timing */}
            <SectionCard>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <AccessTimeOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>Timing</Typography>
              </Box>
              <Typography sx={{ fontSize: '13px', fontWeight: 600, mb: 1 }}>Frequency</Typography>
              <Box sx={{ display: 'flex', gap: 0.75, mb: 2.5 }}>
                {['Immediate', 'Hourly', 'Daily'].map(f => {
                  const active = frequency === f.toLowerCase()
                  return (
                    <Box key={f} onClick={() => setFrequency(f.toLowerCase())} sx={{ px: 1.75, py: 0.625, borderRadius: '20px', border: '1px solid', cursor: 'pointer', borderColor: active ? TEAL : 'divider', color: active ? TEAL : 'text.secondary', bgcolor: active ? 'rgba(0,130,127,0.06)' : 'transparent', fontSize: '13px', fontWeight: active ? 600 : 400 }}>
                      {f}
                    </Box>
                  )
                })}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <Box>
                  <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>Quiet hours</Typography>
                  <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>Pause alerts between 10pm – 7am</Typography>
                </Box>
                <Switch checked={quietHours} onChange={() => setQuietHours(v => !v)} size="small" sx={{ '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: TEAL } }} />
              </Box>
            </SectionCard>

            {/* Recipients */}
            <SectionCard>
              <Typography sx={{ fontSize: '14px', fontWeight: 700, mb: 0.5 }}>Recipients</Typography>
              <Typography sx={{ fontSize: '13px', color: 'text.secondary', mb: 1.5 }}>Send alerts to the following people</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, border: '1px solid', borderColor: 'divider', borderRadius: '6px', px: 1.5, py: 1, mb: 1 }}>
                <SearchIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                <Typography sx={{ fontSize: '13px', color: 'text.disabled' }}>Search by name or enter an email address</Typography>
              </Box>
              <Typography sx={{ fontSize: '12px', color: 'text.secondary', mb: 1 }}>1/10</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, border: '1px solid', borderColor: 'divider', borderRadius: '6px', px: 1.5, py: 1.25 }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(0,130,127,0.15)', color: TEAL, fontSize: '11px', fontWeight: 700 }}>MT</Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>Mariano Titanti</Typography>
                  <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>mariano.titanti@meltwater.com</Typography>
                </Box>
                <IconButton size="small"><CloseIcon sx={{ fontSize: 14 }} /></IconButton>
              </Box>
            </SectionCard>

            {/* Delivery Method */}
            <SectionCard>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
                <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>Delivery method</Typography>
                <HelpOutlineIcon sx={{ fontSize: 15, color: 'text.disabled' }} />
              </Box>
              <Typography sx={{ fontSize: '13px', color: 'text.secondary', mb: 1.5 }}>How would you like to receive alerts?</Typography>
              <Typography sx={{ fontSize: '11px', fontWeight: 700, color: 'text.disabled', letterSpacing: '0.08em', mb: 1 }}>STANDARD</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CustomCheckbox checked onChange={() => {}} />
                <Typography sx={{ fontSize: '14px' }}>Email</Typography>
              </Box>
            </SectionCard>
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
          <Button variant="contained" onClick={() => setStep(s => s + 1)} disabled={step === 1 && selectedSearchIds.length === 0}
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
  const [activeTab, setActiveTab] = useState('allAlerts')
  const [createOpen, setCreateOpen] = useState(false)

  const alertsTabs = [
    { key: 'allAlerts',    label: 'All Alerts',    count: 3 },
    { key: 'manageAlerts', label: 'Manage Alerts', count: null },
  ]
  const notifTabs = [
    { key: 'allNotifications',    label: 'All Notifications',    count: 3 },
    { key: 'manageNotifications', label: 'Manage Notifications', count: null },
  ]

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'background.default' }}>
      {/* Page header */}
      <Box sx={{ px: 3, pt: 3, pb: 2, bgcolor: 'background.default', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, fontSize: '24px', mb: 0.5 }}>Alerts &amp; Notifications</Typography>
          <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>
            Stay informed with real-time notifications from your searches
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setCreateOpen(true)}
          sx={{
            bgcolor: TEAL, color: '#fff', textTransform: 'none', fontWeight: 500,
            '&:hover': { bgcolor: '#006e6b' }, borderRadius: '8px', px: 2.5,
          }}
        >
          Create Alert
        </Button>
      </Box>

      {/* Tab bar + icons */}
      <Box sx={{ px: 3, pb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: 'background.default' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TabGroup tabs={alertsTabs} activeTab={activeTab} onTabChange={setActiveTab} />
          <TabGroup tabs={notifTabs}  activeTab={activeTab} onTabChange={setActiveTab} />
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton size="small" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '6px', p: 0.75 }}>
            <SearchIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton size="small" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '6px', p: 0.75 }}>
            <FilterListIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
      </Box>

      {/* Content card */}
      <Box sx={{ flex: 1, overflow: 'auto', px: 3, pb: 3 }}>
        <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, bgcolor: 'background.paper', overflow: 'hidden' }}>
          {activeTab === 'allAlerts'            && <AllAlertsTab />}
          {activeTab === 'manageAlerts'         && <ManageAlertsTab />}
          {activeTab === 'allNotifications'     && <AllNotificationsTab />}
          {activeTab === 'manageNotifications'  && <ManageNotificationsTab />}
        </Box>
      </Box>

      <CreateAlertModal open={createOpen} onClose={() => setCreateOpen(false)} />
    </Box>
  )
}

import { useState } from 'react'
import {
  Box, Typography, Button, Divider, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, IconButton, Switch,
  Tooltip, Menu, MenuItem,
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

const MANAGE_ALERTS_ROWS = [
  { id: 1, name: 'Brand Crisis Monitor',      sub: 'Brand Coverage, Crisis Keywords',    source: 'Explore Search',          delivery: 'Email, Slack',  active: true,  last: '2 hours ago' },
  { id: 2, name: 'Competitor Launch Tracker', sub: 'Competitor A, Product Launches',     source: 'Explore Search',          delivery: 'Email',         active: true,  last: 'Yesterday'   },
  { id: 3, name: 'Campaign Performance',      sub: 'Summer Campaign 2026',               source: 'Competitor & Industry',   delivery: 'Slack',         active: true,  last: '3 days ago'  },
  { id: 4, name: 'CEO Mentions',              sub: 'CEO Name, Executive Team',           source: 'Explore Search',          delivery: 'Email, In-app', active: false, last: '1 week ago'  },
  { id: 5, name: 'Industry News Daily',       sub: 'Industry Keywords',                  source: 'Competitor & Industry',   delivery: 'Email',         active: true,  last: 'Today'       },
  { id: 6, name: 'Social Influencers',        sub: 'Influencer Mentions Tracker',        source: 'Social',                  delivery: 'Email, Slack',  active: true,  last: '5 hours ago' },
  { id: 7, name: 'Product Launches',          sub: 'Competitor Product Launches',        source: 'Competitor & Industry',   delivery: 'In-app',        active: false, last: '2 weeks ago' },
  { id: 8, name: 'Earnings Coverage',         sub: 'Earnings Call Mentions',             source: 'Explore Search',          delivery: 'Email',         active: true,  last: 'Yesterday'   },
]

const MANAGE_NOTIF_ROWS = [
  { id: 1, name: 'Publish Assignment',       desc: 'Alert me when I have a new assigned post in Publish Engage',          active: true  },
  { id: 2, name: 'Publish Approval',         desc: 'Alert me when I have a new approved post in Publish Engage',          active: true  },
  { id: 3, name: 'Downloads',                desc: 'Alert me when my files are ready',                                     active: true  },
  { id: 4, name: 'Historical data retrieval',desc: 'Alert me when my historical data retrieval is finished',               active: false },
  { id: 5, name: 'Contact updates',          desc: 'Alert me when contacts on media lists have their profiles updated',    active: true  },
  { id: 6, name: 'Alerts Error',             desc: "Alert me if an alert doesn't run properly",                            active: true  },
]

const SOURCE_CHIP_STYLES = {
  'Explore Search':        { bg: 'rgba(0,130,127,0.10)', color: '#00827F' },
  'Competitor & Industry': { bg: 'rgba(237,137,54,0.12)', color: '#b45309' },
  'Social':                { bg: 'rgba(236,72,153,0.10)', color: '#be185d' },
}

const MANAGE_SUB_TABS = ['All (8)', 'Urgent (2)', 'Paused (1)', 'Needs attention (1)', 'My alerts (5)', 'Team alerts (3)']

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
  const [subTab, setSubTab] = useState(0)
  const [rows, setRows] = useState(MANAGE_ALERTS_ROWS)
  const [anchorEl, setAnchorEl] = useState(null)
  const [menuRow, setMenuRow] = useState(null)

  const toggleActive = (id) => {
    setRows(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r))
  }

  return (
    <Box>
      {/* Sub-header */}
      <Box sx={{ px: 3, pt: 2, pb: 0 }}>
        <Typography sx={{ fontSize: '15px', fontWeight: 600, mb: 1.5 }}>All ({rows.length} alerts)</Typography>

        {/* Sub-tabs */}
        <Box sx={{ display: 'flex', gap: 0, borderBottom: '1px solid', borderColor: 'divider' }}>
          {MANAGE_SUB_TABS.map((tab, i) => (
            <Box
              key={tab}
              onClick={() => setSubTab(i)}
              sx={{
                px: 2, py: 1, cursor: 'pointer', fontSize: '13px',
                color: subTab === i ? TEAL : 'text.secondary',
                fontWeight: subTab === i ? 600 : 400,
                borderBottom: subTab === i ? `2px solid ${TEAL}` : '2px solid transparent',
                mb: '-1px',
                whiteSpace: 'nowrap',
                '&:hover': { color: subTab === i ? TEAL : 'text.primary' },
              }}
            >
              {tab}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Table */}
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ '& th': { fontSize: '12px', fontWeight: 600, color: 'text.secondary', py: 1.5, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.default' } }}>
              <TableCell sx={{ pl: 3 }}>Name</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Delivery</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Triggered</TableCell>
              <TableCell sx={{ pr: 2 }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => {
              const chipStyle = SOURCE_CHIP_STYLES[row.source] || { bg: '#f0f0f0', color: '#666' }
              return (
                <TableRow
                  key={row.id}
                  sx={{ '&:hover': { bgcolor: 'rgba(0,0,0,0.015)' }, '& td': { py: 1.5, borderBottom: '1px solid', borderColor: 'divider' } }}
                >
                  <TableCell sx={{ pl: 3 }}>
                    <Typography sx={{ fontSize: '14px', fontWeight: 500 }}>{row.name}</Typography>
                    <Typography sx={{ fontSize: '12px', color: 'text.disabled' }}>{row.sub}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'inline-flex', px: 1.25, py: 0.4, borderRadius: '12px',
                        bgcolor: chipStyle.bg, color: chipStyle.color,
                        fontSize: '12px', fontWeight: 500, whiteSpace: 'nowrap',
                      }}
                    >
                      {row.source}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>{row.delivery}</Typography>
                  </TableCell>
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
                  <TableCell>
                    <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>{row.last}</Typography>
                  </TableCell>
                  <TableCell sx={{ pr: 2 }}>
                    <IconButton
                      size="small"
                      onClick={(e) => { setAnchorEl(e.currentTarget); setMenuRow(row.id) }}
                    >
                      <MoreVertIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Row count */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 3, py: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography sx={{ fontSize: '12px', color: 'text.disabled' }}>1-{rows.length} of {rows.length}</Typography>
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

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function MwAlertsPage() {
  const [activeTab, setActiveTab] = useState('allAlerts')

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
          <Typography variant="h5" sx={{ fontWeight: 700, fontSize: '24px', mb: 0.5 }}>Alerts</Typography>
          <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>
            Stay informed with real-time notifications from your searches
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
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
    </Box>
  )
}

import { useState } from 'react'
import {
  Box, Typography, Switch, Tooltip, IconButton,
} from '@mui/material'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

// ── Palette ────────────────────────────────────────────────────────────────────
const TEAL = '#00827F'
const TEAL_LIGHT = 'rgba(0,130,127,0.10)'

// ── Data ──────────────────────────────────────────────────────────────────────
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

const MANAGE_NOTIF_ROWS = [
  { id: 1, name: 'Publish Assignment',        desc: 'Alert me when I have a new assigned post in Publish Engage',          active: true  },
  { id: 2, name: 'Publish Approval',          desc: 'Alert me when I have a new approved post in Publish Engage',          active: true  },
  { id: 3, name: 'Downloads',                 desc: 'Alert me when my files are ready',                                     active: true  },
  { id: 4, name: 'Historical data retrieval', desc: 'Alert me when my historical data retrieval is finished',               active: false },
  { id: 5, name: 'Contact updates',           desc: 'Alert me when contacts on media lists have their profiles updated',    active: true  },
  { id: 6, name: 'Alerts Error',              desc: "Alert me if an alert doesn't run properly",                            active: true  },
]

// ── Sub-components ─────────────────────────────────────────────────────────────

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

function NotifFeedCard({ item }) {
  const { Icon, type, title, desc, time, unread, action } = item
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
      <Box
        sx={{
          width: 40, height: 40, borderRadius: '50%',
          bgcolor: TEAL_LIGHT, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <Icon sx={{ fontSize: 18, color: TEAL }} />
      </Box>

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
      </Box>

      <Typography sx={{ fontSize: '12px', color: 'text.disabled', flexShrink: 0, pt: 0.25 }}>
        {time}
      </Typography>
    </Box>
  )
}

function AllNotificationsTab() {
  const unreadCount = ALL_NOTIFICATIONS.filter(n => n.unread).length
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>{ALL_NOTIFICATIONS.length} notifications</Typography>
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
      {ALL_NOTIFICATIONS.map(item => <NotifFeedCard key={item.id} item={item} />)}
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

      <Box sx={{ mx: 3, border: '1px solid', borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2.5, py: 1.5, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.default' }}>
          <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>System notifications</Typography>
          <Tooltip title="Notifications about Meltwater platform activity">
            <InfoOutlinedIcon sx={{ fontSize: 15, color: 'text.disabled', cursor: 'pointer' }} />
          </Tooltip>
        </Box>

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
export default function MwNotificationsPage() {
  const [activeTab, setActiveTab] = useState('allNotifications')

  const tabs = [
    { key: 'allNotifications',    label: 'All Notifications', count: 3 },
    { key: 'manageNotifications', label: 'Settings',          count: null },
  ]

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'background.default' }}>
      {/* Page header */}
      <Box sx={{ px: 3, pt: 3, pb: 2, bgcolor: 'background.default' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, fontSize: '20px', mb: 0.5 }}>Notifications</Typography>
        <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>
          Platform activity, exports, sharing, and feature updates
        </Typography>
      </Box>

      {/* Tab bar */}
      <Box sx={{ px: 3, pb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: 'background.default' }}>
        <TabGroup tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
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
          {activeTab === 'allNotifications'    && <AllNotificationsTab />}
          {activeTab === 'manageNotifications' && <ManageNotificationsTab />}
        </Box>
      </Box>
    </Box>
  )
}

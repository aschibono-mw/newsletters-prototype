import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Typography, Button, IconButton, Switch, Menu, MenuItem, Tooltip,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import BoltIcon from '@mui/icons-material/Bolt'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined'
import XIcon from '@mui/icons-material/X'
import ApartmentIcon from '@mui/icons-material/Apartment'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import SearchIcon from '@mui/icons-material/Search'
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined'
import RssFeedIcon from '@mui/icons-material/RssFeed'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined'

// ── Palette ───────────────────────────────────────────────────────────────────
const TEAL   = '#00827F'
const PURPLE = '#B627A1'

// ── Source chip styles ────────────────────────────────────────────────────────
const SOURCE_TYPE_STYLES = {
  search: { bgcolor: 'rgba(0,130,127,0.08)',  color: TEAL,      Icon: SearchIcon },
  brand:  { bgcolor: 'rgba(182,39,161,0.08)', color: PURPLE,    Icon: DiamondOutlinedIcon },
  rss:    { bgcolor: 'rgba(230,81,0,0.08)',   color: '#E65100', Icon: RssFeedIcon },
}

// ── Delivery channel icons ─────────────────────────────────────────────────────
const DELIVERY_ICONS = {
  'Email':  { Icon: MailOutlineIcon,               label: 'Email' },
  'Slack':  { Icon: ForumOutlinedIcon,             label: 'Slack' },
  'In-app': { Icon: NotificationsNoneOutlinedIcon, label: 'In-app' },
}

// ── Source groups (alerts grouped by the search/brand they monitor) ───────────
const SOURCE_GROUPS = [
  {
    id: 'brand-coverage',
    source: { label: 'Brand Coverage', type: 'search' },
    alerts: [
      { id: 1, name: 'Spike Detection', Icon: BoltIcon,       delivery: ['Email', 'Slack'],   active: true,  triggeredAgo: '12m ago' },
      { id: 2, name: 'Sentiment Shift', Icon: TrendingUpIcon, delivery: ['Email', 'In-app'],  active: true,  triggeredAgo: '2h ago'  },
    ],
  },
  {
    id: 'crisis-keywords',
    source: { label: 'Crisis Keywords', type: 'search' },
    alerts: [
      { id: 3, name: 'Top Reach', Icon: CampaignOutlinedIcon, delivery: ['Email'], active: true, triggeredAgo: '45m ago' },
    ],
  },
  {
    id: 'sportswear-industry',
    source: { label: 'Sportswear Industry', type: 'search' },
    alerts: [
      { id: 4, name: 'X Influencer', Icon: XIcon, delivery: ['Slack', 'In-app'], active: false, triggeredAgo: '6h ago' },
    ],
  },
  {
    id: 'executive-mentions',
    source: { label: 'Executive Mentions', type: 'search' },
    alerts: [
      { id: 7, name: 'Breakout Post', Icon: LocalFireDepartmentIcon, delivery: ['Email', 'In-app'], active: false, triggeredAgo: '3h ago' },
    ],
  },
  {
    id: 'ceo-name',
    source: { label: 'CEO Name', type: 'search' },
    alerts: [
      { id: 8, name: 'Every Mention', Icon: ChatBubbleOutlineIcon, delivery: ['In-app'], active: true, triggeredAgo: '5m ago' },
    ],
  },
  {
    id: 'eu-regulatory-news',
    source: { label: 'EU Regulatory News', type: 'search' },
    alerts: [
      { id: 9, name: 'Industry Events', Icon: EqualizerIcon, delivery: ['Email'], active: true, triggeredAgo: '8h ago' },
    ],
  },
  {
    id: 'nike',
    source: { label: 'Nike', type: 'brand' },
    alerts: [
      { id: 5, name: 'Company Events', Icon: ApartmentIcon, delivery: ['Email', 'Slack'], active: true, triggeredAgo: '2h ago' },
    ],
  },
  {
    id: 'adidas',
    source: { label: 'Adidas', type: 'brand' },
    alerts: [
      { id: 6, name: 'GenAI Lens', Icon: AutoAwesomeIcon, delivery: ['In-app'], active: true, triggeredAgo: '1d ago' },
    ],
  },
  {
    id: 'puma',
    source: { label: 'Puma', type: 'brand' },
    alerts: [
      { id: 10, name: 'Company Events', Icon: ApartmentIcon, delivery: ['Email', 'Slack'], active: true, triggeredAgo: '4h ago' },
    ],
  },
]

// ── Sub-components ────────────────────────────────────────────────────────────

function SourceChip({ source, size = 'sm' }) {
  const s = SOURCE_TYPE_STYLES[source.type]
  const isLg = size === 'lg'
  return (
    <Box sx={{
      display: 'inline-flex', alignItems: 'center', gap: 0.5,
      bgcolor: s.bgcolor, borderRadius: '20px',
      px: isLg ? 1.25 : 1, py: isLg ? 0.4 : 0.25,
    }}>
      <s.Icon sx={{ fontSize: isLg ? 13 : 11, color: s.color }} />
      <Typography sx={{ fontSize: isLg ? '13px' : '12px', color: s.color, fontWeight: 600, lineHeight: 1 }}>
        {source.label}
      </Typography>
    </Box>
  )
}

function DeliveryChannels({ channels }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.625 }}>
      {channels.map(ch => {
        const d = DELIVERY_ICONS[ch]
        if (!d) return null
        return (
          <Tooltip key={ch} title={d.label} placement="top">
            <Box sx={{
              width: 22, height: 22, borderRadius: '4px', bgcolor: 'rgba(0,0,0,0.05)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <d.Icon sx={{ fontSize: 13, color: 'text.secondary' }} />
            </Box>
          </Tooltip>
        )
      })}
    </Box>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function MwAlertsStandalonePage() {
  const navigate = useNavigate()

  const [groupActive, setGroupActive] = useState(() =>
    Object.fromEntries(SOURCE_GROUPS.map(g => [g.id, true]))
  )
  const [alertActive, setAlertActive] = useState(() =>
    Object.fromEntries(SOURCE_GROUPS.flatMap(g => g.alerts.map(a => [a.id, a.active])))
  )
  const [expanded, setExpanded] = useState(() =>
    Object.fromEntries(SOURCE_GROUPS.map(g => [g.id, true]))
  )
  const [groupMenu, setGroupMenu] = useState(null)
  const [alertMenu, setAlertMenu] = useState(null)

  const switchSx = {
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#00B4AF', opacity: 1 },
    '& .MuiSwitch-switchBase.Mui-checked': { color: '#fff' },
  }

  const totalAlerts = SOURCE_GROUPS.reduce((a, g) => a + g.alerts.length, 0)
  const totalActive = SOURCE_GROUPS.reduce((sum, g) =>
    sum + g.alerts.filter(a => alertActive[a.id] ?? a.active).length, 0)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'background.default' }}>

      {/* Page header */}
      <Box sx={{ px: 3, pt: 3, pb: 2.5, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, fontSize: '20px', mb: 0.5 }}>Active monitoring</Typography>
          <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>
            Real-time notifications triggered by events across your searches and brands
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/alerts/create')}
          sx={{ bgcolor: TEAL, color: '#fff', textTransform: 'none', fontWeight: 500, '&:hover': { bgcolor: '#006e6b' }, borderRadius: '8px', px: 2.5 }}
        >
          Create Alert
        </Button>
      </Box>

      {/* Source groups */}
      <Box sx={{ flex: 1, overflow: 'auto', px: 3, pb: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {SOURCE_GROUPS.map(group => {
            const isOn       = groupActive[group.id] ?? true
            const isExpanded = expanded[group.id]    ?? true
            const s = SOURCE_TYPE_STYLES[group.source.type]

            return (
              <Box
                key={group.id}
                sx={{
                  border: '1px solid', borderColor: 'divider', borderRadius: '10px',
                  bgcolor: 'background.paper', overflow: 'hidden',
                  opacity: isOn ? 1 : 0.55, transition: 'opacity 0.2s',
                }}
              >
                {/* ── Group header ──────────────────────────────────── */}
                <Box
                  sx={{
                    display: 'flex', alignItems: 'center', px: 2.5, py: 1.625,
                    borderBottom: isExpanded ? '1px solid' : 'none', borderColor: 'divider',
                    bgcolor: 'rgba(0,0,0,0.015)',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.025)' },
                    userSelect: 'none',
                  }}
                  onClick={() => setExpanded(p => ({ ...p, [group.id]: !p[group.id] }))}
                >
                  {/* Chevron */}
                  <KeyboardArrowDownIcon sx={{
                    fontSize: 18, color: 'text.secondary', mr: 1, flexShrink: 0,
                    transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                    transition: 'transform 0.2s ease',
                  }} />

                  {/* Source type icon + name */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }} onClick={e => e.stopPropagation()}>
                    <Box sx={{
                      width: 28, height: 28, borderRadius: '6px', bgcolor: s.bgcolor,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <s.Icon sx={{ fontSize: 14, color: s.color }} />
                    </Box>
                    <Typography sx={{ fontSize: '14px', fontWeight: 700, color: isOn ? 'text.primary' : 'text.disabled' }}>
                      {group.source.label}
                    </Typography>
                    <Box sx={{
                      display: 'inline-flex', alignItems: 'center', gap: 0.5,
                      bgcolor: s.bgcolor, borderRadius: '20px', px: 0.875, py: 0.25,
                      ml: 0.25,
                    }}>
                      <Typography sx={{ fontSize: '11px', color: s.color, fontWeight: 600, lineHeight: 1, textTransform: 'capitalize' }}>
                        {group.source.type}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Right side: alert count + switch + menu */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }} onClick={e => e.stopPropagation()}>
                    <Box sx={{
                      display: 'flex', alignItems: 'center', gap: 0.5,
                      bgcolor: 'rgba(0,130,127,0.07)', borderRadius: '20px', px: 1, py: 0.25,
                    }}>
                      <NotificationsNoneOutlinedIcon sx={{ fontSize: 12, color: TEAL }} />
                      <Typography sx={{ fontSize: '11px', fontWeight: 600, color: TEAL }}>{group.alerts.length}</Typography>
                    </Box>
                    <Switch
                      checked={isOn}
                      onChange={() => setGroupActive(p => ({ ...p, [group.id]: !p[group.id] }))}
                      size="small"
                      sx={switchSx}
                    />
                    <IconButton
                      size="small"
                      sx={{ p: 0, width: 28, height: 28, borderRadius: '50%' }}
                      onClick={e => { e.stopPropagation(); setGroupMenu(e.currentTarget) }}
                    >
                      <MoreVertIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Box>
                </Box>

                {/* ── Expanded alert rows ───────────────────────────── */}
                <Box sx={{
                  maxHeight: isExpanded ? '1000px' : 0,
                  overflow: 'hidden',
                  transition: isExpanded ? 'max-height 0.3s ease' : 'max-height 0.25s ease',
                }}>
                  {/* Column headers */}
                  <Box sx={{
                    display: 'grid', gridTemplateColumns: '1fr 100px 90px 120px 40px',
                    px: 3, py: 0.75,
                    borderBottom: '1px solid', borderColor: 'rgba(0,0,0,0.05)',
                  }}>
                    {['Alert type', 'Delivery', 'Status', 'Last triggered', ''].map((h, i) => (
                      <Typography key={i} sx={{ fontSize: '11px', fontWeight: 700, color: 'text.disabled', letterSpacing: '0.04em' }}>
                        {h}
                      </Typography>
                    ))}
                  </Box>

                  {/* Alert rows */}
                  {group.alerts.map((alert, ai) => {
                    const isAlertOn = alertActive[alert.id] ?? alert.active
                    const { Icon } = alert
                    return (
                      <Box
                        key={alert.id}
                        sx={{
                          display: 'grid', gridTemplateColumns: '1fr 100px 90px 120px 40px',
                          alignItems: 'center', px: 3, py: 1.125,
                          borderBottom: '1px solid',
                          borderColor: 'rgba(0,0,0,0.05)',
                          opacity: isOn ? (isAlertOn ? 1 : 0.55) : 0.45,
                          '&:hover': { bgcolor: 'rgba(0,0,0,0.01)' },
                        }}
                      >
                        {/* Alert type */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{
                            width: 26, height: 26, borderRadius: '6px',
                            bgcolor: 'rgba(0,130,127,0.07)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                          }}>
                            <Icon sx={{ fontSize: 13, color: TEAL }} />
                          </Box>
                          <Typography sx={{ fontSize: '13px', fontWeight: 500 }}>{alert.name}</Typography>
                        </Box>

                        {/* Delivery */}
                        <DeliveryChannels channels={alert.delivery} />

                        {/* Status */}
                        <Switch
                          checked={isAlertOn}
                          onChange={() => setAlertActive(p => ({ ...p, [alert.id]: !p[alert.id] }))}
                          size="small"
                          disabled={!isOn}
                          sx={switchSx}
                        />

                        {/* Last triggered */}
                        <Typography sx={{ fontSize: '12px', color: 'text.disabled' }}>{alert.triggeredAgo}</Typography>

                        {/* Menu */}
                        <IconButton
                          size="small"
                          sx={{ p: 0, width: 28, height: 28, borderRadius: '50%' }}
                          onClick={e => setAlertMenu(e.currentTarget)}
                        >
                          <MoreVertIcon sx={{ fontSize: 15 }} />
                        </IconButton>
                      </Box>
                    )
                  })}

                  {/* Add Alert CTA */}
                  <Box
                    sx={{
                      display: 'flex', alignItems: 'center', gap: 0.75,
                      px: 3, py: 1,
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'rgba(0,0,0,0.015)' },
                      '&:hover .add-alert-label': { color: '#006e6b' },
                    }}
                    onClick={() => navigate('/alerts/create', { state: { source: group.source } })}
                  >
                    <AddIcon sx={{ fontSize: 15, color: TEAL }} />
                    <Typography className="add-alert-label" sx={{ fontSize: '13px', color: TEAL, fontWeight: 500, transition: 'color 0.15s' }}>
                      Add alert
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )
          })}
        </Box>

        {/* Footer */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 1.5 }}>
          <Typography sx={{ fontSize: '12px', color: 'text.disabled' }}>
            {totalAlerts} alerts · {totalActive} active · {SOURCE_GROUPS.length} sources
          </Typography>
        </Box>
      </Box>

      {/* Source group menu */}
      <Menu anchorEl={groupMenu} open={Boolean(groupMenu)} onClose={() => setGroupMenu(null)}>
        <MenuItem onClick={() => setGroupMenu(null)} sx={{ fontSize: '14px' }}>Add alert</MenuItem>
        <MenuItem onClick={() => setGroupMenu(null)} sx={{ fontSize: '14px' }}>Edit source</MenuItem>
        <MenuItem onClick={() => setGroupMenu(null)} sx={{ fontSize: '14px', color: 'error.main' }}>Remove source</MenuItem>
      </Menu>

      {/* Alert row menu */}
      <Menu anchorEl={alertMenu} open={Boolean(alertMenu)} onClose={() => setAlertMenu(null)}>
        <MenuItem onClick={() => setAlertMenu(null)} sx={{ fontSize: '14px' }}>Edit</MenuItem>
        <MenuItem onClick={() => setAlertMenu(null)} sx={{ fontSize: '14px', color: 'error.main' }}>Delete</MenuItem>
      </Menu>
    </Box>
  )
}

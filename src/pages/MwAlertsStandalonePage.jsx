import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Typography, Button, IconButton, Switch, Menu, MenuItem, Chip,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import MoreVertIcon from '@mui/icons-material/MoreVert'
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

const TEAL = '#00827F'
const PURPLE = '#B627A1'

const SOURCE_TYPE_STYLES = {
  search: { bgcolor: 'rgba(0,130,127,0.08)',  color: TEAL,   Icon: SearchIcon },
  brand:  { bgcolor: 'rgba(182,39,161,0.08)', color: PURPLE, Icon: DiamondOutlinedIcon },
  rss:    { bgcolor: 'rgba(230,81,0,0.08)',   color: '#E65100', Icon: RssFeedIcon },
}

const ALERTS_DATA = [
  { id: 1,  name: 'Spike Detection',  Icon: BoltIcon,                      source: { label: 'Brand Coverage',        type: 'search' }, delivery: ['Email', 'Slack'],    active: true,  triggeredAgo: '12m ago' },
  { id: 2,  name: 'Sentiment Shift',  Icon: TrendingUpIcon,                source: { label: 'Brand Coverage',        type: 'search' }, delivery: ['Email', 'In-app'],   active: true,  triggeredAgo: '2h ago' },
  { id: 3,  name: 'Top Reach',        Icon: CampaignOutlinedIcon,          source: { label: 'Crisis Keywords',       type: 'search' }, delivery: ['Email'],             active: true,  triggeredAgo: '45m ago' },
  { id: 4,  name: 'X Influencer',     Icon: XIcon,                         source: { label: 'Sportswear Industry',   type: 'search' }, delivery: ['Slack', 'In-app'],   active: false, triggeredAgo: '6h ago' },
  { id: 5,  name: 'Company Events',   Icon: ApartmentIcon,                 source: { label: 'Nike',                  type: 'brand'  }, delivery: ['Email', 'Slack'],    active: true,  triggeredAgo: '2h ago' },
  { id: 6,  name: 'GenAI Lens',       Icon: AutoAwesomeIcon,               source: { label: 'Adidas',                type: 'brand'  }, delivery: ['In-app'],            active: true,  triggeredAgo: '1d ago' },
  { id: 7,  name: 'Breakout Post',    Icon: LocalFireDepartmentIcon,       source: { label: 'Executive Mentions',    type: 'search' }, delivery: ['Email', 'In-app'],   active: false, triggeredAgo: '3h ago' },
  { id: 8,  name: 'Every Mention',    Icon: ChatBubbleOutlineIcon,         source: { label: 'CEO Name',              type: 'search' }, delivery: ['In-app'],            active: true,  triggeredAgo: '5m ago' },
  { id: 9,  name: 'Industry Events',  Icon: EqualizerIcon,                 source: { label: 'EU Regulatory News',   type: 'search' }, delivery: ['Email'],             active: true,  triggeredAgo: '8h ago' },
  { id: 10, name: 'Company Events',   Icon: ApartmentIcon,                 source: { label: 'Puma',                  type: 'brand'  }, delivery: ['Email', 'Slack'],    active: true,  triggeredAgo: '4h ago' },
]

function SourceChip({ source }) {
  const s = SOURCE_TYPE_STYLES[source.type]
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, bgcolor: s.bgcolor, borderRadius: '20px', px: 1, py: 0.25 }}>
      <s.Icon sx={{ fontSize: 11, color: s.color }} />
      <Typography sx={{ fontSize: '12px', color: s.color, fontWeight: 500, lineHeight: 1 }}>{source.label}</Typography>
    </Box>
  )
}

export default function MwAlertsStandalonePage() {
  const navigate = useNavigate()
  const [activeMap, setActiveMap] = useState(() =>
    Object.fromEntries(ALERTS_DATA.map(a => [a.id, a.active]))
  )
  const [menuAnchor, setMenuAnchor] = useState(null)

  const toggle = (id) => setActiveMap(p => ({ ...p, [id]: !p[id] }))

  const switchSx = {
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#00B4AF', opacity: 1 },
    '& .MuiSwitch-switchBase.Mui-checked': { color: '#fff' },
  }

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

      {/* Table */}
      <Box sx={{ flex: 1, overflow: 'auto', px: 3, pb: 3 }}>
        <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, bgcolor: 'background.paper', overflow: 'hidden' }}>

          {/* Column headers */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 180px 160px 90px 120px 40px', px: 3, py: 1.25, borderBottom: '1px solid', borderColor: 'divider' }}>
            {['Alert type', 'Source', 'Delivery', 'Status', 'Last triggered', ''].map((h, i) => (
              <Typography key={i} sx={{ fontSize: '12px', fontWeight: 700, color: 'text.secondary' }}>{h}</Typography>
            ))}
          </Box>

          {/* Rows */}
          {ALERTS_DATA.map((alert, i) => {
            const isOn = activeMap[alert.id] ?? alert.active
            const { Icon } = alert
            return (
              <Box
                key={alert.id}
                sx={{
                  display: 'grid', gridTemplateColumns: '1fr 180px 160px 90px 120px 40px',
                  alignItems: 'center', px: 3, py: 1.375,
                  borderBottom: i < ALERTS_DATA.length - 1 ? '1px solid' : 'none',
                  borderColor: 'rgba(0,0,0,0.06)',
                  opacity: isOn ? 1 : 0.55,
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.015)' },
                }}
              >
                {/* Alert type */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                  <Box sx={{ width: 30, height: 30, borderRadius: '6px', bgcolor: 'rgba(0,130,127,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon sx={{ fontSize: 15, color: TEAL }} />
                  </Box>
                  <Typography sx={{ fontSize: '13px', fontWeight: 500 }}>{alert.name}</Typography>
                </Box>
                {/* Source */}
                <Box><SourceChip source={alert.source} /></Box>
                {/* Delivery */}
                <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>{alert.delivery.join(', ')}</Typography>
                {/* Status */}
                <Switch checked={isOn} onChange={() => toggle(alert.id)} size="small" sx={switchSx} />
                {/* Last triggered */}
                <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>{alert.triggeredAgo}</Typography>
                {/* Menu */}
                <IconButton size="small" sx={{ p: 0, width: 28, height: 28, borderRadius: '50%' }} onClick={e => setMenuAnchor(e.currentTarget)}>
                  <MoreVertIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Box>
            )
          })}

          {/* Footer */}
          <Box sx={{ px: 3, py: 1.5, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'flex-end' }}>
            <Typography sx={{ fontSize: '12px', color: 'text.disabled' }}>
              {ALERTS_DATA.length} alerts · {ALERTS_DATA.filter(a => activeMap[a.id] ?? a.active).length} active
            </Typography>
          </Box>
        </Box>
      </Box>

      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
        <MenuItem onClick={() => setMenuAnchor(null)} sx={{ fontSize: '14px' }}>Edit</MenuItem>
        <MenuItem onClick={() => setMenuAnchor(null)} sx={{ fontSize: '14px', color: 'error.main' }}>Delete</MenuItem>
      </Menu>
    </Box>
  )
}

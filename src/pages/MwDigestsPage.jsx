import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Typography, Button, IconButton, Switch, Menu, MenuItem, Avatar,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import SearchIcon from '@mui/icons-material/Search'
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined'
import RssFeedIcon from '@mui/icons-material/RssFeed'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'

const TEAL = '#00827F'
const PURPLE = '#B627A1'

const SOURCE_TYPE_STYLES = {
  search: { bgcolor: 'rgba(0,130,127,0.08)',  color: TEAL,      Icon: SearchIcon },
  brand:  { bgcolor: 'rgba(182,39,161,0.08)', color: PURPLE,    Icon: DiamondOutlinedIcon },
  rss:    { bgcolor: 'rgba(230,81,0,0.08)',   color: '#E65100', Icon: RssFeedIcon },
}

const CADENCE_COLORS = {
  Daily:   { bg: 'rgba(0,130,127,0.08)',    color: TEAL },
  Weekly:  { bg: 'rgba(63,81,181,0.08)',    color: '#3F51B5' },
  Monthly: { bg: 'rgba(121,85,72,0.08)',    color: '#795548' },
}

const DIGESTS_DATA = [
  {
    id: 1,
    name: 'Weekly Brand Roundup',
    sources: [
      { label: 'Brand Coverage',   type: 'search' },
      { label: 'Crisis Keywords',  type: 'search' },
    ],
    cadence: 'Weekly',
    schedule: 'Every Monday at 8am',
    recipients: [
      { initials: 'AT', name: 'Antonio T.' },
      { initials: 'SJ', name: 'Sarah J.' },
    ],
    active: true,
    lastSent: '3 days ago',
  },
  {
    id: 2,
    name: 'Daily Competitor Brief',
    sources: [
      { label: 'Sportswear Industry', type: 'search' },
      { label: 'Adidas',              type: 'brand'  },
      { label: 'Puma',                type: 'brand'  },
    ],
    cadence: 'Daily',
    schedule: 'Every day at 8am',
    recipients: [
      { initials: 'AT', name: 'Antonio T.' },
      { initials: 'MG', name: 'Maria G.' },
      { initials: 'JL', name: 'James L.' },
      { initials: 'SK', name: 'Soo K.' },
    ],
    active: true,
    lastSent: 'Today, 8:02am',
  },
  {
    id: 3,
    name: 'Monthly Executive Summary',
    sources: [
      { label: 'Brand Coverage',     type: 'search' },
      { label: 'Executive Mentions', type: 'search' },
      { label: 'Market Analysis',    type: 'search' },
      { label: 'Nike',               type: 'brand'  },
    ],
    cadence: 'Monthly',
    schedule: '1st of each month at 8am',
    recipients: [
      { initials: 'AT', name: 'Antonio T.' },
      { initials: 'SJ', name: 'Sarah J.' },
      { initials: 'MG', name: 'Maria G.' },
      { initials: 'PD', name: 'Paul D.' },
      { initials: 'JL', name: 'James L.' },
      { initials: 'CM', name: 'Clara M.' },
    ],
    active: false,
    lastSent: '22 days ago',
  },
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

export default function MwDigestsPage() {
  const navigate = useNavigate()
  const [activeMap, setActiveMap] = useState(() =>
    Object.fromEntries(DIGESTS_DATA.map(d => [d.id, d.active]))
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
          <Typography variant="h5" sx={{ fontWeight: 700, fontSize: '20px', mb: 0.5 }}>Scheduled summaries</Typography>
          <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>
            Scheduled email summaries delivered on your schedule
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/digests/create')}
          sx={{ bgcolor: TEAL, color: '#fff', textTransform: 'none', fontWeight: 500, '&:hover': { bgcolor: '#006e6b' }, borderRadius: '8px', px: 2.5 }}
        >
          Create Digest
        </Button>
      </Box>

      {/* Cards */}
      <Box sx={{ flex: 1, overflow: 'auto', px: 3, pb: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {DIGESTS_DATA.map(digest => {
            const isOn = activeMap[digest.id] ?? digest.active
            const cadenceStyle = CADENCE_COLORS[digest.cadence]
            const MAX_VISIBLE_AVATARS = 3
            const extraRecipients = digest.recipients.length - MAX_VISIBLE_AVATARS

            return (
              <Box
                key={digest.id}
                sx={{
                  border: '1px solid', borderColor: 'divider', borderRadius: 1,
                  bgcolor: 'background.paper', overflow: 'hidden',
                  opacity: isOn ? 1 : 0.6,
                  transition: 'opacity 0.2s',
                }}
              >
                {/* Card header */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2.5, py: 1.75, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'rgba(0,0,0,0.015)' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ width: 34, height: 34, borderRadius: '8px', bgcolor: 'rgba(0,130,127,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <ArticleOutlinedIcon sx={{ fontSize: 17, color: TEAL }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>{digest.name}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.25 }}>
                        <CalendarMonthOutlinedIcon sx={{ fontSize: 12, color: 'text.disabled' }} />
                        <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>{digest.schedule}</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    {/* Cadence badge */}
                    <Box sx={{ bgcolor: cadenceStyle.bg, borderRadius: '20px', px: 1.25, py: 0.375 }}>
                      <Typography sx={{ fontSize: '12px', color: cadenceStyle.color, fontWeight: 600 }}>{digest.cadence}</Typography>
                    </Box>
                    <Switch checked={isOn} onChange={() => toggle(digest.id)} size="small" sx={switchSx} />
                    <IconButton size="small" sx={{ p: 0, width: 28, height: 28, borderRadius: '50%' }} onClick={e => setMenuAnchor(e.currentTarget)}>
                      <MoreVertIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Box>
                </Box>

                {/* Card body */}
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', px: 2.5, py: 1.75, gap: 2 }}>
                  {/* Sources */}
                  <Box>
                    <Typography sx={{ fontSize: '11px', fontWeight: 700, color: 'text.disabled', letterSpacing: '0.07em', mb: 1 }}>SOURCES</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.625 }}>
                      {digest.sources.map(src => <SourceChip key={src.label} source={src} />)}
                    </Box>
                  </Box>

                  {/* Recipients */}
                  <Box>
                    <Typography sx={{ fontSize: '11px', fontWeight: 700, color: 'text.disabled', letterSpacing: '0.07em', mb: 1 }}>RECIPIENTS</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      {digest.recipients.slice(0, MAX_VISIBLE_AVATARS).map(r => (
                        <Avatar key={r.initials} sx={{ width: 26, height: 26, bgcolor: 'rgba(0,130,127,0.15)', color: TEAL, fontSize: '10px', fontWeight: 700 }}>
                          {r.initials}
                        </Avatar>
                      ))}
                      {extraRecipients > 0 && (
                        <Box sx={{ width: 26, height: 26, borderRadius: '50%', bgcolor: 'rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Typography sx={{ fontSize: '10px', fontWeight: 700, color: 'text.secondary' }}>+{extraRecipients}</Typography>
                        </Box>
                      )}
                      <Typography sx={{ fontSize: '12px', color: 'text.secondary', ml: 0.5 }}>
                        {digest.recipients.length} recipient{digest.recipients.length !== 1 ? 's' : ''}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Card footer */}
                <Box sx={{ px: 2.5, py: 1, borderTop: '1px solid', borderColor: 'rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontSize: '12px', color: 'text.disabled' }}>
                    Last sent: {digest.lastSent}
                  </Typography>
                  <Typography
                    sx={{ fontSize: '12px', color: TEAL, fontWeight: 500, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                  >
                    Preview email →
                  </Typography>
                </Box>
              </Box>
            )
          })}
        </Box>
      </Box>

      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
        <MenuItem onClick={() => setMenuAnchor(null)} sx={{ fontSize: '14px' }}>Edit</MenuItem>
        <MenuItem onClick={() => setMenuAnchor(null)} sx={{ fontSize: '14px' }}>Duplicate</MenuItem>
        <MenuItem onClick={() => setMenuAnchor(null)} sx={{ fontSize: '14px', color: 'error.main' }}>Delete</MenuItem>
      </Menu>
    </Box>
  )
}

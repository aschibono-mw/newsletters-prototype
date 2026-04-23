import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Typography, Button, IconButton, Switch, Menu, MenuItem, Tooltip,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import BoltIcon from '@mui/icons-material/Bolt'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined'
import XIcon from '@mui/icons-material/X'
import ApartmentIcon from '@mui/icons-material/Apartment'
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined'
import RssFeedIcon from '@mui/icons-material/RssFeed'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined'
import SearchIcon from '@mui/icons-material/Search'
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

// ── Palette ───────────────────────────────────────────────────────────────────
const TEAL = '#00827F'
const PURPLE = '#B627A1'

// ── Custom tracker icon ───────────────────────────────────────────────────────
function TrackerIcon({ size = 18, color = 'currentColor' }) {
  return (
    <Box component="svg" viewBox="0 0 20 20" sx={{ width: size, height: size, display: 'block', flexShrink: 0 }} fill="none">
      <circle cx="10" cy="10" r="6" stroke={color} strokeWidth="1.5" />
      <circle cx="10" cy="10" r="1.75" fill={color} />
      <line x1="10" y1="1.5" x2="10" y2="4"    stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="10" y1="16"  x2="10" y2="18.5"  stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="1.5" y1="10" x2="4"   y2="10"   stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16"  y1="10" x2="18.5" y2="10"  stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </Box>
  )
}

// ── Source chip styles ────────────────────────────────────────────────────────
const SOURCE_TYPE_STYLES = {
  search: { bgcolor: 'rgba(0,130,127,0.08)',  color: TEAL,      Icon: SearchIcon },
  brand:  { bgcolor: 'rgba(182,39,161,0.08)', color: PURPLE,    Icon: DiamondOutlinedIcon },
  rss:    { bgcolor: 'rgba(230,81,0,0.08)',   color: '#E65100', Icon: RssFeedIcon },
}

// ── Delivery channel icons ─────────────────────────────────────────────────────
const DELIVERY_ICONS = {
  'Email':  { Icon: MailOutlineIcon,                label: 'Email' },
  'Slack':  { Icon: ForumOutlinedIcon,              label: 'Slack' },
  'In-app': { Icon: NotificationsNoneOutlinedIcon,  label: 'In-app' },
}

// ── Data ──────────────────────────────────────────────────────────────────────
const TRACKERS = [
  {
    id: 1,
    name: 'The Morning News Update',
    sources: [
      { label: 'Nike Sustainability', type: 'search' },
      { label: 'Nike Brand Health',   type: 'search' },
      { label: 'Nike',                type: 'brand'  },
    ],
    digest: { cadence: 'Weekly', schedule: 'Every Monday at 8am', recipients: 2 },
    alerts: [
      { id: 1, name: 'Spike Detection', Icon: BoltIcon,             delivery: ['Email', 'Slack', 'In-app'], active: true,  triggeredAgo: '12m ago' },
      { id: 2, name: 'Sentiment Shift', Icon: TrendingUpIcon,       delivery: ['Email', 'In-app'],          active: true,  triggeredAgo: '2h ago'  },
      { id: 3, name: 'Top Reach',       Icon: CampaignOutlinedIcon, delivery: ['Email'],                    active: true,  triggeredAgo: '45m ago' },
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
      { id: 4, name: 'X Influencers',  Icon: XIcon,                    delivery: ['Slack', 'In-app'], active: false, triggeredAgo: '6h ago' },
      { id: 5, name: 'Company Events', Icon: ApartmentIcon,            delivery: ['Email', 'Slack'],  active: true,  triggeredAgo: '2h ago' },
      { id: 6, name: 'Likely Boosted', Icon: RocketLaunchOutlinedIcon, delivery: ['Slack', 'In-app'], active: true,  triggeredAgo: '1d ago' },
    ],
  },
  {
    id: 3,
    name: 'ESG & Regulatory',
    sources: [
      { label: 'EU Regulatory News',      type: 'search' },
      { label: 'Sustainability Journals', type: 'rss'    },
    ],
    digest: { cadence: 'Daily', schedule: 'Every day at 8am', recipients: 4 },
    alerts: [
      { id: 7, name: 'Industry Events', Icon: CalendarMonthOutlinedIcon, delivery: ['Email'], active: true, triggeredAgo: '2h ago' },
      { id: 8, name: 'RSS Feed',        Icon: RssFeedIcon,               delivery: ['Email'], active: true, triggeredAgo: '8h ago' },
    ],
  },
  {
    id: 5,
    name: 'Weekly Industry Roundup',
    sources: [
      { label: 'Industry News',   type: 'search' },
      { label: 'Market Analysis', type: 'search' },
    ],
    digest: { cadence: 'Weekly', schedule: 'Every Friday at 7am', recipients: 8 },
    alerts: [],
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
      { id: 9,  name: 'Every Mention', Icon: NotificationsNoneOutlinedIcon, delivery: ['In-app'],          active: false, triggeredAgo: '5m ago'  },
      { id: 10, name: 'Follow Post',   Icon: BookmarkBorderOutlinedIcon,    delivery: ['Email', 'In-app'], active: true,  triggeredAgo: '11h ago' },
    ],
  },
]

// ── Sub-components ────────────────────────────────────────────────────────────

function SourceChip({ source }) {
  const s = SOURCE_TYPE_STYLES[source.type]
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, bgcolor: s.bgcolor, borderRadius: '20px', px: 1, py: 0.3 }}>
      <s.Icon sx={{ fontSize: 11, color: s.color }} />
      <Typography sx={{ fontSize: '12px', color: s.color, fontWeight: 500, lineHeight: 1 }}>{source.label}</Typography>
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
            <Box sx={{ width: 22, height: 22, borderRadius: '4px', bgcolor: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <d.Icon sx={{ fontSize: 13, color: 'text.secondary' }} />
            </Box>
          </Tooltip>
        )
      })}
    </Box>
  )
}

// ── Section label (Real-time / Digest) ───────────────────────────────────────
function DeliveryLabel({ icon, label, count }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, px: 3, py: 0.875, bgcolor: 'rgba(0,0,0,0.025)', borderBottom: '1px solid', borderColor: 'rgba(0,0,0,0.06)' }}>
      {icon}
      <Typography sx={{ fontSize: '11px', fontWeight: 700, color: 'text.disabled', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
        {label}
      </Typography>
      {count != null && (
        <Box sx={{ height: 16, minWidth: 16, borderRadius: '8px', bgcolor: 'rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', px: 0.5 }}>
          <Typography sx={{ fontSize: '10px', fontWeight: 700, color: 'text.secondary', lineHeight: 1 }}>{count}</Typography>
        </Box>
      )}
    </Box>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function MwAlertsV2Page() {
  const navigate = useNavigate()

  const [trackerActive, setTrackerActive] = useState(() =>
    Object.fromEntries(TRACKERS.map(t => [t.id, true]))
  )
  const [alertActive, setAlertActive] = useState(() =>
    Object.fromEntries(TRACKERS.flatMap(t => t.alerts.map(a => [a.id, a.active])))
  )
  const [digestActive, setDigestActive] = useState(() =>
    Object.fromEntries(TRACKERS.filter(t => t.digest).map(t => [t.id, true]))
  )
  const [expanded, setExpanded] = useState(() =>
    Object.fromEntries(TRACKERS.map(t => [t.id, true]))
  )
  const [trackerMenu, setTrackerMenu] = useState(null)
  const [alertMenu, setAlertMenu]     = useState(null)

  const switchSx = {
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#00B4AF', opacity: 1 },
    '& .MuiSwitch-switchBase.Mui-checked': { color: '#fff' },
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'background.default' }}>

      {/* Page header */}
      <Box sx={{ px: 3, pt: 3, pb: 2.5, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, fontSize: '20px', mb: 0.5 }}>Your trackers</Typography>
          <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>
            Each tracker monitors a source and delivers output through real-time alerts and scheduled digests
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/mw-alerts/create')}
          sx={{ bgcolor: TEAL, color: '#fff', textTransform: 'none', fontWeight: 500, '&:hover': { bgcolor: '#006e6b' }, borderRadius: '8px', px: 2.5 }}
        >
          Create Tracker
        </Button>
      </Box>

      {/* Tracker list */}
      <Box sx={{ flex: 1, overflow: 'auto', px: 3, pb: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {TRACKERS.map(tracker => {
            const isOn       = trackerActive[tracker.id] ?? true
            const isExpanded = expanded[tracker.id] ?? true
            const totalAlerts = tracker.alerts.length

            return (
              <Box
                key={tracker.id}
                sx={{
                  border: '1px solid', borderColor: 'divider', borderRadius: '10px',
                  bgcolor: 'background.paper', overflow: 'hidden',
                  opacity: isOn ? 1 : 0.55, transition: 'opacity 0.2s',
                }}
              >
                {/* ── Tracker header ─────────────────────────────────── */}
                <Box
                  sx={{
                    display: 'flex', alignItems: 'center', px: 2.5, py: 1.75,
                    borderBottom: isExpanded ? '1px solid' : 'none', borderColor: 'divider',
                    bgcolor: 'rgba(0,0,0,0.015)',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.025)' },
                    userSelect: 'none',
                  }}
                  onClick={() => setExpanded(p => ({ ...p, [tracker.id]: !p[tracker.id] }))}
                >
                  {/* Chevron */}
                  <KeyboardArrowDownIcon sx={{
                    fontSize: 18, color: 'text.secondary', mr: 1, flexShrink: 0,
                    transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                    transition: 'transform 0.2s ease',
                  }} />

                  {/* Tracker icon + name */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 1.5, flexShrink: 0 }}>
                    <TrackerIcon size={16} color={isOn ? TEAL : 'rgba(0,0,0,0.26)'} />
                    <Typography sx={{ fontSize: '14px', fontWeight: 700, color: isOn ? 'text.primary' : 'text.disabled', whiteSpace: 'nowrap' }}>
                      {tracker.name}
                    </Typography>
                  </Box>

                  {/* Sources */}
                  <Box sx={{ display: 'flex', gap: 0.625, flexWrap: 'wrap', flex: 1, opacity: isOn ? 1 : 0.4 }}
                    onClick={e => e.stopPropagation()}>
                    {tracker.sources.map(src => <SourceChip key={src.label} source={src} />)}
                  </Box>

                  {/* Summary badges */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1.5, flexShrink: 0 }} onClick={e => e.stopPropagation()}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: 'rgba(0,130,127,0.07)', borderRadius: '20px', px: 1, py: 0.25 }}>
                      <NotificationsNoneOutlinedIcon sx={{ fontSize: 12, color: TEAL }} />
                      <Typography sx={{ fontSize: '11px', fontWeight: 600, color: TEAL }}>{totalAlerts}</Typography>
                    </Box>
                    {tracker.digest && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: 'rgba(63,81,181,0.07)', borderRadius: '20px', px: 1, py: 0.25 }}>
                        <ArticleOutlinedIcon sx={{ fontSize: 12, color: '#3F51B5' }} />
                        <Typography sx={{ fontSize: '11px', fontWeight: 600, color: '#3F51B5' }}>{tracker.digest.cadence}</Typography>
                      </Box>
                    )}
                    <Switch
                      checked={isOn}
                      onChange={() => setTrackerActive(p => ({ ...p, [tracker.id]: !p[tracker.id] }))}
                      size="small"
                      sx={switchSx}
                    />
                    <IconButton size="small" sx={{ p: 0, width: 28, height: 28, borderRadius: '50%' }}
                      onClick={e => { e.stopPropagation(); setTrackerMenu(e.currentTarget) }}>
                      <MoreVertIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Box>
                </Box>

                {/* ── Expanded content ───────────────────────────────── */}
                <Box sx={{
                  maxHeight: isExpanded ? '2000px' : 0,
                  overflow: 'hidden',
                  transition: isExpanded ? 'max-height 0.3s ease' : 'max-height 0.25s ease',
                }}>

                  {/* ── Digest-only trackers: show digest first ── */}
                  {tracker.alerts.length === 0 && tracker.digest && (<>
                  <DeliveryLabel
                    icon={<ArticleOutlinedIcon sx={{ fontSize: 13, color: 'text.disabled' }} />}
                    label="Digest"
                  />
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 100px 90px 100px 40px', alignItems: 'center', px: 3, py: 1.125, opacity: isOn ? 1 : 0.45, '&:hover': { bgcolor: 'rgba(0,0,0,0.01)' } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 26, height: 26, borderRadius: '6px', bgcolor: 'rgba(63,81,181,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <CalendarMonthOutlinedIcon sx={{ fontSize: 13, color: '#3F51B5' }} />
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: '13px', fontWeight: 500 }}>{tracker.digest.cadence} digest</Typography>
                        <Typography sx={{ fontSize: '11px', color: 'text.secondary', mt: 0.125 }}>{tracker.digest.schedule}</Typography>
                      </Box>
                    </Box>
                    <DeliveryChannels channels={['Email']} />
                    <Switch checked={digestActive[tracker.id] ?? true} onChange={() => setDigestActive(p => ({ ...p, [tracker.id]: !p[tracker.id] }))} size="small" disabled={!isOn} sx={switchSx} />
                    <Typography sx={{ fontSize: '12px', color: 'text.disabled' }}>{tracker.digest.recipients} recipient{tracker.digest.recipients !== 1 ? 's' : ''}</Typography>
                    <IconButton size="small" sx={{ p: 0, width: 28, height: 28, borderRadius: '50%' }} onClick={e => setTrackerMenu(e.currentTarget)}><MoreVertIcon sx={{ fontSize: 15 }} /></IconButton>
                  </Box>
                  </>)}

                  {/* ── REAL-TIME ALERTS section ── */}
                  <DeliveryLabel
                    icon={<NotificationsNoneOutlinedIcon sx={{ fontSize: 13, color: 'text.disabled' }} />}
                    label="Real-time alerts"
                    count={tracker.alerts.length}
                  />

                  {/* Alert column headers — only show if there are alerts */}
                  {tracker.alerts.length > 0 && (
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 100px 90px 100px 40px', px: 3, py: 0.75, borderBottom: '1px solid', borderColor: 'rgba(0,0,0,0.04)' }}>
                      {['Alert type', 'Delivery', 'Status', 'Last triggered', ''].map((h, i) => (
                        <Typography key={i} sx={{ fontSize: '11px', fontWeight: 700, color: 'text.disabled', letterSpacing: '0.04em' }}>{h}</Typography>
                      ))}
                    </Box>
                  )}

                  {tracker.alerts.length === 0 && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 3, py: 1.375, opacity: isOn ? 1 : 0.45 }}>
                      <Typography sx={{ fontSize: '13px', color: 'text.disabled' }}>No real-time alerts configured</Typography>
                      <Typography sx={{ fontSize: '13px', color: TEAL, fontWeight: 500, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                        + Add alert
                      </Typography>
                    </Box>
                  )}

                  {tracker.alerts.map((alert, ai) => {
                    const isAlertOn = alertActive[alert.id] ?? alert.active
                    const { Icon } = alert
                    return (
                      <Box
                        key={alert.id}
                        sx={{
                          display: 'grid', gridTemplateColumns: '1fr 100px 90px 100px 40px',
                          alignItems: 'center', px: 3, py: 1.125,
                          borderBottom: ai < tracker.alerts.length - 1 ? '1px solid' : 'none',
                          borderColor: 'rgba(0,0,0,0.05)',
                          opacity: isOn ? 1 : 0.45,
                          '&:hover': { bgcolor: 'rgba(0,0,0,0.01)' },
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ width: 26, height: 26, borderRadius: '6px', bgcolor: 'rgba(0,130,127,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Icon sx={{ fontSize: 13, color: TEAL }} />
                          </Box>
                          <Typography sx={{ fontSize: '13px', fontWeight: 500 }}>{alert.name}</Typography>
                        </Box>
                        <DeliveryChannels channels={alert.delivery} />
                        <Switch checked={isAlertOn} onChange={() => setAlertActive(p => ({ ...p, [alert.id]: !p[alert.id] }))} size="small" disabled={!isOn} sx={switchSx} />
                        <Typography sx={{ fontSize: '12px', color: 'text.disabled' }}>{alert.triggeredAgo}</Typography>
                        <IconButton size="small" sx={{ p: 0, width: 28, height: 28, borderRadius: '50%' }} onClick={e => setAlertMenu(e.currentTarget)}>
                          <MoreVertIcon sx={{ fontSize: 15 }} />
                        </IconButton>
                      </Box>
                    )
                  })}

                  {/* ── DIGEST section (only rendered here when tracker has alerts; digest-only shows it above) ── */}
                  {tracker.alerts.length > 0 && (<>
                    <DeliveryLabel
                      icon={<ArticleOutlinedIcon sx={{ fontSize: 13, color: 'text.disabled' }} />}
                      label="Digest"
                    />
                    {tracker.digest ? (
                      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 100px 90px 100px 40px', alignItems: 'center', px: 3, py: 1.125, opacity: isOn ? 1 : 0.45, '&:hover': { bgcolor: 'rgba(0,0,0,0.01)' } }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ width: 26, height: 26, borderRadius: '6px', bgcolor: 'rgba(63,81,181,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <CalendarMonthOutlinedIcon sx={{ fontSize: 13, color: '#3F51B5' }} />
                          </Box>
                          <Box>
                            <Typography sx={{ fontSize: '13px', fontWeight: 500 }}>{tracker.digest.cadence} digest</Typography>
                            <Typography sx={{ fontSize: '11px', color: 'text.secondary', mt: 0.125 }}>{tracker.digest.schedule}</Typography>
                          </Box>
                        </Box>
                        <DeliveryChannels channels={['Email']} />
                        <Switch checked={digestActive[tracker.id] ?? true} onChange={() => setDigestActive(p => ({ ...p, [tracker.id]: !p[tracker.id] }))} size="small" disabled={!isOn} sx={switchSx} />
                        <Typography sx={{ fontSize: '12px', color: 'text.disabled' }}>{tracker.digest.recipients} recipient{tracker.digest.recipients !== 1 ? 's' : ''}</Typography>
                        <IconButton size="small" sx={{ p: 0, width: 28, height: 28, borderRadius: '50%' }} onClick={e => setTrackerMenu(e.currentTarget)}><MoreVertIcon sx={{ fontSize: 15 }} /></IconButton>
                      </Box>
                    ) : (
                      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 100px 90px 100px 40px', alignItems: 'center', px: 3, py: 1.375, opacity: isOn ? 1 : 0.45 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Typography sx={{ fontSize: '13px', color: 'text.disabled' }}>No digest configured</Typography>
                          <Typography sx={{ fontSize: '13px', color: TEAL, fontWeight: 500, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>+ Set up</Typography>
                        </Box>
                        <Box /><Box /><Box /><Box />
                      </Box>
                    )}
                  </>)}

                </Box>
              </Box>
            )
          })}
        </Box>

        {/* Footer */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 1.5 }}>
          <Typography sx={{ fontSize: '12px', color: 'text.disabled' }}>
            {TRACKERS.reduce((a, t) => a + t.alerts.length, 0)} alerts · {TRACKERS.filter(t => t.digest).length} digests across {TRACKERS.length} trackers
          </Typography>
        </Box>
      </Box>

      {/* Tracker menu */}
      <Menu anchorEl={trackerMenu} open={Boolean(trackerMenu)} onClose={() => setTrackerMenu(null)}>
        <MenuItem onClick={() => setTrackerMenu(null)} sx={{ fontSize: '14px' }}>Edit</MenuItem>
        <MenuItem onClick={() => setTrackerMenu(null)} sx={{ fontSize: '14px' }}>Duplicate</MenuItem>
        <MenuItem onClick={() => setTrackerMenu(null)} sx={{ fontSize: '14px', color: 'error.main' }}>Delete</MenuItem>
      </Menu>

      {/* Alert menu */}
      <Menu anchorEl={alertMenu} open={Boolean(alertMenu)} onClose={() => setAlertMenu(null)}>
        <MenuItem onClick={() => setAlertMenu(null)} sx={{ fontSize: '14px' }}>Edit</MenuItem>
        <MenuItem onClick={() => setAlertMenu(null)} sx={{ fontSize: '14px', color: 'error.main' }}>Delete</MenuItem>
      </Menu>
    </Box>
  )
}

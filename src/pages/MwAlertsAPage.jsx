import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Typography, Button, IconButton, Switch, Tooltip, Chip,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import BoltIcon from '@mui/icons-material/Bolt'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined'
import XIcon from '@mui/icons-material/X'
import ApartmentIcon from '@mui/icons-material/Apartment'
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import RssFeedIcon from '@mui/icons-material/RssFeed'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined'
import SearchIcon from '@mui/icons-material/Search'
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'

// ── Palette ───────────────────────────────────────────────────────────────────
const TEAL   = '#00827F'
const PURPLE = '#B627A1'
const ORANGE = '#E65100'

// ── Source type styles ────────────────────────────────────────────────────────
const SOURCE_STYLES = {
  search: { bgcolor: 'rgba(0,130,127,0.08)',  color: TEAL,   Icon: SearchIcon },
  brand:  { bgcolor: 'rgba(182,39,161,0.08)', color: PURPLE, Icon: DiamondOutlinedIcon },
  rss:    { bgcolor: 'rgba(230,81,0,0.08)',   color: ORANGE, Icon: RssFeedIcon },
}

// ── Delivery icons ────────────────────────────────────────────────────────────
const DELIVERY_ICONS = {
  Email:    { Icon: MailOutlineIcon,               label: 'Email'  },
  Slack:    { Icon: ForumOutlinedIcon,             label: 'Slack'  },
  'In-app': { Icon: NotificationsNoneOutlinedIcon, label: 'In-app' },
}

// ── Alert type registry (for rendering chips) ─────────────────────────────────
const ALERT_TYPE_META = {
  spike:          { name: 'Spike Detection',  Icon: BoltIcon,                    color: ORANGE  },
  sentiment:      { name: 'Sentiment Shift',  Icon: TrendingUpIcon,              color: TEAL    },
  top_reach:      { name: 'Top Reach',        Icon: CampaignOutlinedIcon,        color: TEAL    },
  x_influencer:   { name: 'X Influencers',    Icon: XIcon,                       color: '#111'  },
  every_mention:  { name: 'Every Mention',    Icon: NotificationsNoneOutlinedIcon, color: TEAL  },
  company_events: { name: 'Company Events',   Icon: ApartmentIcon,               color: PURPLE  },
  likely_boosted: { name: 'Likely Boosted',   Icon: RocketLaunchOutlinedIcon,    color: PURPLE  },
  follow_post:    { name: 'Follow Post',       Icon: BookmarkBorderOutlinedIcon,  color: TEAL    },
  industry_events:{ name: 'Industry Events',  Icon: CalendarMonthOutlinedIcon,   color: TEAL    },
  rss_feed:       { name: 'RSS Feed',         Icon: RssFeedIcon,                 color: ORANGE  },
}

// ── Mock data ─────────────────────────────────────────────────────────────────
// Structure: user-named groups → each group has searches → each search has alert types
const ALERT_GROUPS = [
  {
    id: 1,
    name: 'Nike Brand Watch',
    icon: 'notifications',
    sources: [
      {
        id: 's1',
        label: 'Brand Coverage',
        type: 'search',
        meta: '420 articles/week · Tracks brand mentions across news and social',
        alertTypes: ['spike', 'sentiment'],
        delivery: ['Email', 'Slack', 'In-app'],
        active: true,
        triggeredAgo: '12m ago',
      },
      {
        id: 's2',
        label: 'Nike',
        type: 'brand',
        meta: 'Sportswear & Athletics · GenAI Lens brand',
        alertTypes: ['top_reach', 'sentiment'],
        delivery: ['Email'],
        active: true,
        triggeredAgo: '45m ago',
      },
      {
        id: 's3',
        label: 'Crisis Keywords',
        type: 'search',
        meta: '85 articles/week · High-risk terms and negative press signals',
        alertTypes: ['spike', 'top_reach'],
        delivery: ['Email'],
        active: true,
        triggeredAgo: '45m ago',
      },
    ],
  },
  {
    id: 2,
    name: 'Competitor Intelligence',
    icon: 'bolt',
    sources: [
      {
        id: 's4',
        label: 'Sportswear Industry',
        type: 'search',
        meta: '680 articles/week · Industry-wide coverage across all major brands',
        alertTypes: ['x_influencer', 'company_events', 'likely_boosted'],
        delivery: ['Slack', 'In-app'],
        active: false,
        triggeredAgo: '6h ago',
      },
      {
        id: 's5',
        label: 'Adidas',
        type: 'brand',
        meta: 'Sportswear & Athletics · GenAI Lens brand',
        alertTypes: ['x_influencer', 'company_events'],
        delivery: ['Slack'],
        active: true,
        triggeredAgo: '1h ago',
      },
      {
        id: 's6',
        label: 'Competitor A',
        type: 'search',
        meta: '310 articles/week · Optimised search for competitor activity',
        alertTypes: ['sentiment', 'spike'],
        delivery: ['Email', 'Slack'],
        active: true,
        triggeredAgo: '3h ago',
      },
    ],
  },
  {
    id: 3,
    name: 'ESG & Regulatory',
    icon: 'campaign',
    sources: [
      {
        id: 's7',
        label: 'EU Regulatory News',
        type: 'search',
        meta: '175 articles/week · EU green claims, carbon policy and compliance',
        alertTypes: ['industry_events'],
        delivery: ['Email'],
        active: true,
        triggeredAgo: '2h ago',
      },
      {
        id: 's8',
        label: 'Sustainability Journals',
        type: 'rss',
        meta: 'RSS · 3 subscribed feeds · Academic and industry publications',
        alertTypes: ['rss_feed'],
        delivery: ['Email'],
        active: true,
        triggeredAgo: '8h ago',
      },
    ],
  },
  {
    id: 4,
    name: 'Executive Monitoring',
    icon: 'trending',
    sources: [
      {
        id: 's9',
        label: 'Brand Mentions — Exec',
        type: 'search',
        meta: '95 articles/week · CEO, CMO and senior leadership coverage',
        alertTypes: ['every_mention', 'follow_post'],
        delivery: ['In-app'],
        active: false,
        triggeredAgo: '5m ago',
      },
      {
        id: 's10',
        label: 'Sports Journalists',
        type: 'search',
        meta: '230 articles/week · Key media voices covering the sportswear beat',
        alertTypes: ['top_reach', 'x_influencer'],
        delivery: ['Email', 'In-app'],
        active: true,
        triggeredAgo: '11h ago',
      },
    ],
  },
]

// ── Group icon resolver ───────────────────────────────────────────────────────
function GroupIcon({ size = 18 }) {
  return <NotificationsNoneOutlinedIcon sx={{ fontSize: size, color: TEAL, flexShrink: 0 }} />
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SourceChip({ source }) {
  const s = SOURCE_STYLES[source.type]
  return (
    <Box sx={{
      display: 'inline-flex', alignItems: 'center', gap: 0.5,
      bgcolor: s.bgcolor, borderRadius: '20px', px: 1.25, py: 0.35,
      flexShrink: 0,
    }}>
      <s.Icon sx={{ fontSize: 11, color: s.color }} />
      <Typography sx={{ fontSize: '12px', color: s.color, fontWeight: 600, lineHeight: 1, whiteSpace: 'nowrap' }}>
        {source.label}
      </Typography>
    </Box>
  )
}

function AlertTypeChips({ types }) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
      {types.map(typeId => {
        const meta = ALERT_TYPE_META[typeId]
        if (!meta) return null
        return (
          <Tooltip key={typeId} title={meta.name} placement="top">
            <Box sx={{
              display: 'inline-flex', alignItems: 'center', gap: 0.4,
              border: '1px solid', borderColor: 'rgba(0,0,0,0.1)',
              borderRadius: '6px', px: 0.75, py: 0.3,
              bgcolor: 'background.paper',
            }}>
              <meta.Icon sx={{ fontSize: 12, color: meta.color }} />
              <Typography sx={{ fontSize: '11px', color: 'text.secondary', fontWeight: 500, lineHeight: 1 }}>
                {meta.name}
              </Typography>
            </Box>
          </Tooltip>
        )
      })}
    </Box>
  )
}

function DeliveryChannels({ channels }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      {channels.map(ch => {
        const d = DELIVERY_ICONS[ch]
        if (!d) return null
        return (
          <Tooltip key={ch} title={d.label} placement="top">
            <Box sx={{
              width: 22, height: 22, borderRadius: '4px',
              bgcolor: 'rgba(0,0,0,0.05)',
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

// ── Alert group card ──────────────────────────────────────────────────────────
function AlertGroupCard({ group, sourceActive, onToggleSource }) {
  const [expanded,    setExpanded]    = useState(true)
  const [groupActive, setGroupActive] = useState(true)

  const activeCount = group.sources.filter(s => sourceActive[s.id]).length

  // Most recent trigger across the group
  const parse = (str) => {
    if (!str || str === 'Never') return Infinity
    const [n, u] = str.split(' ')
    if (u?.startsWith('m')) return parseInt(n)
    if (u?.startsWith('h')) return parseInt(n) * 60
    return parseInt(n) * 1440
  }
  const recentSource = [...group.sources]
    .filter(s => sourceActive[s.id])
    .sort((a, b) => parse(a.triggeredAgo) - parse(b.triggeredAgo))[0]

  // Unique alert types across all sources in this group
  const allTypes = [...new Set(group.sources.flatMap(s => s.alertTypes))]

  const switchSx = {
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#00B4AF', opacity: 1 },
    '& .MuiSwitch-switchBase.Mui-checked': { color: '#fff' },
  }

  return (
    <Box sx={{
      border: '1px solid',
      borderColor: 'rgba(0,0,0,0.10)',
      borderRadius: '10px',
      overflow: 'hidden',
      opacity: groupActive ? 1 : 0.6,
      transition: 'opacity 0.2s',
      bgcolor: 'background.paper',
    }}>

      {/* ── Group header ─────────────────────────────────────── */}
      <Box
        sx={{
          px: 2, py: 1.75,
          display: 'flex', alignItems: 'center', gap: 1.25,
          bgcolor: groupActive ? 'rgba(0,0,0,0.015)' : 'rgba(0,0,0,0.01)',
          cursor: 'pointer', userSelect: 'none',
        }}
        onClick={() => setExpanded(e => !e)}
      >
        {/* Expand arrow */}
        <ExpandMoreIcon sx={{
          fontSize: 18, color: 'text.secondary', flexShrink: 0,
          transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)',
          transition: 'transform 0.2s',
        }} />

        {/* Group icon */}
        <GroupIcon />

        {/* Group name + meta */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
            <Typography sx={{ fontSize: '15px', fontWeight: 700 }}>
              {group.name}
            </Typography>
            <Chip
              label={`${activeCount} of ${group.sources.length} active`}
              size="small"
              sx={{
                height: 18, fontSize: '0.68rem', fontWeight: 600,
                bgcolor: activeCount > 0 ? 'rgba(0,130,127,0.1)' : 'rgba(0,0,0,0.06)',
                color: activeCount > 0 ? TEAL : 'text.disabled',
                borderRadius: '4px',
              }}
            />
            {recentSource && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                <AccessTimeOutlinedIcon sx={{ fontSize: 11, color: 'text.disabled' }} />
                <Typography sx={{ fontSize: '11px', color: 'text.disabled' }}>
                  Last triggered {recentSource.triggeredAgo}
                </Typography>
              </Box>
            )}
          </Box>

        </Box>

        {/* Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}
          onClick={e => e.stopPropagation()}>
          <Switch
            checked={groupActive}
            size="small"
            onChange={e => setGroupActive(e.target.checked)}
            sx={switchSx}
          />
          <IconButton size="small" sx={{ opacity: 0.4, '&:hover': { opacity: 1 } }}>
            <MoreVertIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
      </Box>

      {/* ── Expanded content ──────────────────────────────────── */}
      {expanded && (
        <>
          {/* ── Searches section ──────────────────────────────── */}
          <Box sx={{ borderTop: '1px solid', borderColor: 'rgba(0,0,0,0.07)' }}>
            <Box sx={{ px: 2.5, py: 0.875, bgcolor: 'rgba(0,0,0,0.02)' }}>
              <Typography sx={{ fontSize: '10px', fontWeight: 700, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Search / Source
              </Typography>
            </Box>

            {group.sources.map((source) => {
              const s = SOURCE_STYLES[source.type]
              return (
                <Box
                  key={source.id}
                  sx={{
                    px: 2.5, py: 1.25,
                    display: 'flex', alignItems: 'center', gap: 1.5,
                    borderTop: '1px solid', borderColor: 'rgba(0,0,0,0.05)',
                    bgcolor: 'background.paper',
                    '&:hover .row-kebab': { opacity: 1 },
                  }}
                >
                  {/* Type icon */}
                  <Box sx={{
                    width: 28, height: 28, borderRadius: '6px',
                    bgcolor: s.bgcolor,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <s.Icon sx={{ fontSize: 14, color: s.color }} />
                  </Box>

                  {/* Name + meta */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontSize: '13px', fontWeight: 600, lineHeight: 1.3 }}>
                      {source.label}
                    </Typography>
                    {source.meta && (
                      <Typography sx={{ fontSize: '11px', color: 'text.secondary', mt: 0.2, lineHeight: 1.4 }}>
                        {source.meta}
                      </Typography>
                    )}
                  </Box>

                  <IconButton size="small" className="row-kebab" sx={{ opacity: 0, transition: 'opacity 0.15s', flexShrink: 0 }}>
                    <MoreVertIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Box>
              )
            })}

            <Box sx={{ px: 2.5, py: 1.25, borderTop: '1px solid', borderColor: 'rgba(0,0,0,0.05)', bgcolor: 'rgba(0,0,0,0.01)' }}>
              <Button size="small" startIcon={<AddIcon sx={{ fontSize: '14px !important' }} />}
                sx={{ textTransform: 'none', fontSize: '12px', color: TEAL, fontWeight: 600, px: 1, py: 0.25, '&:hover': { bgcolor: 'rgba(0,130,127,0.06)' } }}>
                Add search
              </Button>
            </Box>
          </Box>

          {/* ── Alert types section ───────────────────────────── */}
          <Box sx={{ borderTop: '1px solid', borderColor: 'rgba(0,0,0,0.07)' }}>
            <Box sx={{ px: 2.5, py: 0.875, bgcolor: 'rgba(0,0,0,0.02)' }}>
              <Typography sx={{ fontSize: '10px', fontWeight: 700, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Alert types
              </Typography>
            </Box>

            {allTypes.map((typeId) => {
              const meta = ALERT_TYPE_META[typeId]
              if (!meta) return null
              return (
                <Box key={typeId} sx={{
                  px: 2.5, py: 1,
                  display: 'flex', alignItems: 'center', gap: 1.5,
                  borderTop: '1px solid', borderColor: 'rgba(0,0,0,0.05)',
                  bgcolor: 'background.paper',
                  '&:hover .alert-kebab': { opacity: 1 },
                }}>
                  <Box sx={{ width: 28, height: 28, borderRadius: '6px', bgcolor: 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <meta.Icon sx={{ fontSize: 15, color: meta.color }} />
                  </Box>
                  <Typography sx={{ fontSize: '13px', fontWeight: 600, flex: 1 }}>{meta.name}</Typography>
                  <IconButton size="small" className="alert-kebab" sx={{ opacity: 0, transition: 'opacity 0.15s' }}>
                    <MoreVertIcon sx={{ fontSize: 15 }} />
                  </IconButton>
                </Box>
              )
            })}

            <Box sx={{ px: 2.5, py: 1.25, borderTop: '1px solid', borderColor: 'rgba(0,0,0,0.05)', bgcolor: 'rgba(0,0,0,0.01)' }}>
              <Button size="small" startIcon={<AddIcon sx={{ fontSize: '14px !important' }} />}
                sx={{ textTransform: 'none', fontSize: '12px', color: TEAL, fontWeight: 600, px: 1, py: 0.25, '&:hover': { bgcolor: 'rgba(0,130,127,0.06)' } }}>
                Add alert type
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function MwAlertsAPage() {
  const navigate = useNavigate()

  const [sourceActive, setSourceActive] = useState(() =>
    Object.fromEntries(
      ALERT_GROUPS.flatMap(g => g.sources.map(s => [s.id, s.active]))
    )
  )

  const totalActive = Object.values(sourceActive).filter(Boolean).length
  const totalPairs  = ALERT_GROUPS.flatMap(g => g.sources).length

  const toggleSource = (id) =>
    setSourceActive(prev => ({ ...prev, [id]: !prev[id] }))

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', bgcolor: 'grey.50' }}>

      {/* ── Page header ──────────────────────────────────────── */}
      <Box sx={{ bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{
          maxWidth: 1100, mx: 'auto', px: 3, py: 2.5,
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2,
        }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>Alerts</Typography>
            <Typography variant="body2" color="text.secondary">
              Real-time notifications triggered by events across your searches and brands
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/mw-alerts/create')}
            sx={{ textTransform: 'none', fontWeight: 600, flexShrink: 0, bgcolor: TEAL, '&:hover': { bgcolor: '#006B68' } }}
          >
            Create Alert
          </Button>
        </Box>

        {/* Summary stats */}
        <Box sx={{ maxWidth: 1100, mx: 'auto', px: 3, pb: 2, display: 'flex', gap: 3 }}>
          {[
            { label: 'Alert groups',   value: ALERT_GROUPS.length },
            { label: 'Active sources', value: totalActive },
            { label: 'Total sources',  value: totalPairs },
          ].map(stat => (
            <Box key={stat.label} sx={{ display: 'flex', alignItems: 'baseline', gap: 0.75 }}>
              <Typography sx={{ fontSize: '20px', fontWeight: 700, color: TEAL }}>{stat.value}</Typography>
              <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>{stat.label}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ── Groups ───────────────────────────────────────────── */}
      <Box sx={{ maxWidth: 1100, mx: 'auto', px: 3, py: 3, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {ALERT_GROUPS.map(group => (
          <AlertGroupCard
            key={group.id}
            group={group}
            sourceActive={sourceActive}
            onToggleSource={toggleSource}
          />
        ))}
      </Box>

    </Box>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  IconButton,
  Button,
  Tabs,
  Tab,
  Checkbox,
  Chip,
  Avatar,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tooltip,
  Slider,
} from '@mui/material'
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from 'recharts'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import FilterListIcon from '@mui/icons-material/FilterList'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import TuneIcon from '@mui/icons-material/Tune'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import SearchIcon from '@mui/icons-material/Search'
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined'
import RefreshIcon from '@mui/icons-material/Refresh'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import TrackChangesIcon from '@mui/icons-material/TrackChanges'
import CloseIcon from '@mui/icons-material/Close'
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'

// ── Query display ──────────────────────────────────────────────────────────────

function QueryDisplay() {
  const quoted = [
    '"Yelp"', '"reviews"', '"ratings"', '"local business"', '"recommendations"',
    '"listings"', '"customer experience"', '"user feedback"', '"directory"',
    '"app"', '"website"', '"mobile"', '"reservation"', '"delivery"', '"check-in"',
    '"business page"', '"photos"',
  ]
  const operators = ['AND', 'OR', 'NOT']
  const tealTokens = [
    'contentCategory:press_releases', 'nsfw:true',
    'contentCategory:market_research_reports', 'contentCategory:aggregator',
    'contentCategory:stock_market_news',
  ]

  const raw =
    '"Yelp" AND ("reviews" OR "ratings" OR "local business" OR "recommendations" OR "listings" OR "customer experience" OR "user feedback" OR "directory" OR "app" OR "website" OR "mobile" OR "reservation" OR "delivery" OR "check-in" OR "business page" OR "photos") NOT contentCategory:press_releases NOT nsfw:true NOT contentCategory:market_research_reports NOT contentCategory:aggregator NOT contentCategory:stock_market_news'

  // Tokenise: split around known tokens while preserving them
  const allTokens = [...quoted, ...operators, ...tealTokens]
  // Build a regex that splits on token boundaries
  const escapedTokens = allTokens.map((t) =>
    t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  )
  const regex = new RegExp(`(${escapedTokens.join('|')})`)
  const parts = raw.split(regex).filter(Boolean)

  return (
    <Box sx={{ fontFamily: 'monospace', fontSize: '13px', lineHeight: 1.7, color: '#333', wordBreak: 'break-word' }}>
      {parts.map((part, i) => {
        if (quoted.includes(part)) {
          return <span key={i} style={{ color: '#2e7d32' }}>{part}</span>
        }
        if (operators.includes(part)) {
          return <span key={i} style={{ fontWeight: 700, color: '#1a1a1a' }}>{part}</span>
        }
        if (tealTokens.includes(part)) {
          return <span key={i} style={{ color: '#00827F' }}>{part}</span>
        }
        return <span key={i}>{part}</span>
      })}
    </Box>
  )
}

// ── Mention card helpers ───────────────────────────────────────────────────────

function MetricChip({ label, color }) {
  return (
    <Chip
      label={label}
      size="small"
      sx={{
        height: 22,
        fontSize: '11px',
        bgcolor: color === 'positive' ? 'rgba(46,125,50,0.1)' : color === 'negative' ? 'rgba(211,47,47,0.1)' : 'rgba(0,0,0,0.06)',
        color: color === 'positive' ? '#2e7d32' : color === 'negative' ? '#d32f2f' : 'text.secondary',
        border: 'none',
      }}
    />
  )
}

function ReachChip({ label }) {
  return (
    <Chip
      label={label}
      size="small"
      sx={{
        height: 22,
        fontSize: '11px',
        bgcolor: 'rgba(0,0,0,0.06)',
        color: 'text.secondary',
        border: 'none',
      }}
    />
  )
}

function CardFooter({ reach, sentiment, similar }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 1, flexWrap: 'wrap' }}>
      {reach && <ReachChip label={reach} />}
      {sentiment && <MetricChip label={`${sentiment} ▾`} color={sentiment === 'Positive' ? 'positive' : sentiment === 'Negative' ? 'negative' : 'neutral'} />}
      {similar && (
        <Typography
          component="span"
          sx={{ fontSize: '12px', color: '#00827F', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
        >
          {similar} Similar ↕
        </Typography>
      )}
    </Box>
  )
}

function CardTags({ tags }) {
  return (
    <Typography sx={{ fontSize: '11px', color: 'text.disabled', fontStyle: 'italic', mt: 0.5 }}>
      {tags}
    </Typography>
  )
}

// ── Individual mention cards ───────────────────────────────────────────────────

function cardSx() {
  return {
    borderBottom: '1px solid rgba(0,0,0,0.07)',
    px: 2.5,
    py: 2,
    '&:hover': { bgcolor: 'rgba(0,0,0,0.01)' },
  }
}

function HighlightText({ text, highlights }) {
  if (!highlights || highlights.length === 0) return <span>{text}</span>
  const regex = new RegExp(`(${highlights.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi')
  const parts = text.split(regex)
  return (
    <>
      {parts.map((part, i) => {
        const isHighlight = highlights.some(h => h.toLowerCase() === part.toLowerCase())
        return isHighlight
          ? <span key={i} style={{ color: '#00827F', fontWeight: 500 }}>{part}</span>
          : <span key={i}>{part}</span>
      })}
    </>
  )
}

function CardXPost({ avatar, avatarBg, name, handle, geo, time, body, highlights, tags, reach, sentiment }) {
  return (
    <Box sx={cardSx()}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75 }}>
        <Avatar sx={{ width: 32, height: 32, bgcolor: avatarBg || '#00827F', fontSize: '12px' }}>
          {avatar}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontSize: '13px', fontWeight: 700, display: 'inline' }}>{name}</Typography>
          {handle && <Typography component="span" sx={{ fontSize: '12px', color: 'text.secondary', ml: 0.5 }}>{handle}</Typography>}
        </Box>
        <Typography sx={{ fontSize: '11px', color: 'text.secondary', whiteSpace: 'nowrap' }}>
          𝕏 · {geo} · {time}
        </Typography>
      </Box>
      <Typography sx={{ fontSize: '13px', lineHeight: 1.5 }}>
        <HighlightText text={body} highlights={highlights} />
      </Typography>
      {tags && <CardTags tags={tags} />}
      <CardFooter reach={reach} sentiment={sentiment} />
    </Box>
  )
}

function CardNews({ avatarText, avatarBg, source, byline, meta, headline, excerpt, highlights, subCard, tags, reach, sentiment, similar }) {
  return (
    <Box sx={cardSx()}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75 }}>
        <Avatar sx={{ width: 32, height: 32, bgcolor: avatarBg || 'grey.300', fontSize: '12px', color: 'text.primary' }}>
          {avatarText}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontSize: '13px', fontWeight: 700, display: 'inline' }}>{source}</Typography>
          {byline && <Typography component="span" sx={{ fontSize: '12px', color: 'text.secondary', ml: 0.5 }}>• {byline}</Typography>}
        </Box>
        <Typography sx={{ fontSize: '11px', color: 'text.secondary', whiteSpace: 'nowrap' }}>
          {meta}
        </Typography>
      </Box>
      {headline && (
        <Typography sx={{ fontSize: '14px', fontWeight: 700, mb: 0.5, lineHeight: 1.4 }}>
          {headline}
        </Typography>
      )}
      {excerpt && (
        <Typography sx={{ fontSize: '13px', color: 'text.secondary', lineHeight: 1.5 }}>
          <HighlightText text={excerpt} highlights={highlights} />
        </Typography>
      )}
      {subCard && (
        <Box
          sx={{
            bgcolor: 'rgba(0,0,0,0.04)',
            borderRadius: '6px',
            px: 1.5,
            py: 0.75,
            mt: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Avatar sx={{ width: 20, height: 20, bgcolor: 'grey.400', fontSize: '10px' }}>
            {subCard.avatar}
          </Avatar>
          <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>{subCard.text}</Typography>
        </Box>
      )}
      {tags && <CardTags tags={tags} />}
      <CardFooter reach={reach} sentiment={sentiment} similar={similar} />
    </Box>
  )
}

function CardReddit({ subreddit, author, time, title, excerpt, highlights, tags, reach, sentiment }) {
  return (
    <Box sx={cardSx()}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75 }}>
        <Avatar sx={{ width: 32, height: 32, bgcolor: '#FF4500', fontSize: '11px', color: '#fff' }}>r/</Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontSize: '13px', fontWeight: 700, display: 'inline' }}>{subreddit}</Typography>
          {author && <Typography component="span" sx={{ fontSize: '12px', color: 'text.secondary', ml: 0.5 }}>• {author}</Typography>}
        </Box>
        <Typography sx={{ fontSize: '11px', color: 'text.secondary', whiteSpace: 'nowrap' }}>
          Reddit · {time}
        </Typography>
      </Box>
      {title && (
        <Typography sx={{ fontSize: '13px', fontWeight: 700, mb: 0.5 }}>{title}</Typography>
      )}
      {excerpt && (
        <Typography sx={{ fontSize: '13px', color: 'text.secondary', lineHeight: 1.5 }}>
          <HighlightText text={excerpt} highlights={highlights} />
        </Typography>
      )}
      {tags && <CardTags tags={tags} />}
      <CardFooter reach={reach} sentiment={sentiment} />
    </Box>
  )
}

// ── Analytics cards ────────────────────────────────────────────────────────────

const mentionData = [
  { date: 'Apr 22', value: 590 },
  { date: 'Apr 23', value: 510 },
  { date: 'Apr 24', value: 430 },
  { date: 'Apr 25', value: 360 },
  { date: 'Apr 26', value: 390 },
  { date: 'Apr 27', value: 560 },
  { date: 'Apr 28', value: 290 },
]

const reachData = [
  { date: 'Apr 22', value: 750 },
  { date: 'Apr 23', value: 680 },
  { date: 'Apr 24', value: 590 },
  { date: 'Apr 25', value: 450 },
  { date: 'Apr 26', value: 420 },
  { date: 'Apr 27', value: 400 },
  { date: 'Apr 28', value: 310 },
]

function StatBlock({ label, value, delta, prev }) {
  const isDown = delta.startsWith('↓')
  return (
    <Box>
      <Typography sx={{ fontSize: '12px', color: 'text.secondary', mb: 0.25 }}>{label}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
        <Typography sx={{ fontSize: '28px', fontWeight: 700, lineHeight: 1.1 }}>{value}</Typography>
        <Chip
          label={delta}
          size="small"
          sx={{
            height: 20,
            fontSize: '11px',
            bgcolor: isDown ? 'rgba(211,47,47,0.1)' : 'rgba(46,125,50,0.1)',
            color: isDown ? '#d32f2f' : '#2e7d32',
          }}
        />
      </Box>
      <Typography sx={{ fontSize: '12px', color: 'text.disabled', mt: 0.25 }}>{prev}</Typography>
    </Box>
  )
}

function TrendCard({ title, col1, col2, data }) {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '8px',
        p: 2,
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '14px' }}>{title}</Typography>
          <InfoOutlinedIcon sx={{ fontSize: 12, color: 'text.disabled' }} />
        </Box>
        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Button
            size="small"
            variant="outlined"
            endIcon={<ArrowDropDownIcon />}
            sx={{ textTransform: 'none', fontSize: '12px', borderRadius: '4px', py: 0.25, px: 1 }}
          >
            Daily
          </Button>
          <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
        </Box>
      </Box>

      {/* Stats */}
      <Box sx={{ display: 'flex', gap: 4, mb: 2 }}>
        <StatBlock {...col1} />
        <StatBlock {...col2} />
      </Box>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={140}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: '#999' }}
            axisLine={false}
            tickLine={false}
          />
          <RechartsTooltip
            contentStyle={{ fontSize: 12, borderRadius: 4 }}
            itemStyle={{ color: '#00827F' }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#00827F"
            fill="rgba(0,130,127,0.12)"
            strokeWidth={2}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  )
}

// ── Create Tracker Dialog ──────────────────────────────────────────────────────

const TEAL = '#00827F'
const PURPLE = '#B627A1'

const ALL_ALERT_TYPES = [
  { id: 'spike_detection', name: 'Spike Detection',   desc: 'Sudden increases in mentions related to this search' },
  { id: 'sentiment_shift', name: 'Sentiment Shift',   desc: 'Changes in sentiment for this search' },
  { id: 'top_reach',       name: 'Top Reach',         desc: 'High-reach editorial sources mention your search keywords' },
  { id: 'every_mention',   name: 'Every Mention',     desc: 'Each new mention in this search, up to 200 per hour' },
  { id: 'x_influencer',    name: 'X Influencers',     desc: 'Top influencers on X mention your search keywords' },
]

const DIGEST_SCHEDULES = [
  { value: 'daily',   label: 'Daily',   desc: 'Every morning at 9:00 AM' },
  { value: 'weekly',  label: 'Weekly',  desc: 'Every Monday at 9:00 AM' },
  { value: 'monthly', label: 'Monthly', desc: 'On the 1st of each month' },
]

const DELIVERY_OPTIONS = [
  { key: 'email',  label: 'Email' },
  { key: 'mwweb',  label: 'Meltwater web' },
  { key: 'slack',  label: 'Slack' },
]

const DEFAULT_ALERTS = [
  { id: 'spike_detection', channels: { email: true,  mwweb: true,  slack: false } },
  { id: 'sentiment_shift', channels: { email: true,  mwweb: true,  slack: false } },
  { id: 'top_reach',       channels: { email: false, mwweb: true,  slack: false } },
]

// ~481 mentions/day from this search — AI suggests top ~5% = 25 articles
const DEFAULT_DIGESTS = [
  { id: 'daily-1', schedule: 'daily', channels: { email: true }, articleCount: 25 },
]

function CreateTrackerDialog({ open, onClose }) {
  const [trackerName, setTrackerName]       = useState('Yelp Brand Search')
  const [alerts, setAlerts]                 = useState(DEFAULT_ALERTS)
  const [digests, setDigests]               = useState(DEFAULT_DIGESTS)
  const [showAlertPicker, setShowAlertPicker] = useState(false)
  const [showDigestPicker, setShowDigestPicker] = useState(false)

  const removeAlert  = (id)  => setAlerts((prev) => prev.filter((a) => a.id !== id))
  const addAlert     = (id)  => {
    setAlerts((prev) => [...prev, { id, channels: { email: true, mwweb: true, slack: false } }])
    setShowAlertPicker(false)
  }
  const toggleAlertChannel = (alertId, ch) =>
    setAlerts((prev) => prev.map((a) => a.id === alertId ? { ...a, channels: { ...a.channels, [ch]: !a.channels[ch] } } : a))

  const removeDigest = (id)  => setDigests((prev) => prev.filter((d) => d.id !== id))
  const addDigest    = (schedule) => {
    setDigests((prev) => [...prev, { id: `${schedule}-${Date.now()}`, schedule, channels: { email: true }, articleCount: 25 }])
    setShowDigestPicker(false)
  }
  const toggleDigestChannel = (digestId, ch) =>
    setDigests((prev) => prev.map((d) => d.id === digestId ? { ...d, channels: { ...d.channels, [ch]: !d.channels[ch] } } : d))
  const setDigestArticleCount = (digestId, count) =>
    setDigests((prev) => prev.map((d) => d.id === digestId ? { ...d, articleCount: count } : d))

  const usedAlertIds = alerts.map((a) => a.id)
  const availableAlertTypes = ALL_ALERT_TYPES.filter((t) => !usedAlertIds.includes(t.id))

  const channelChipSx = (on) => ({
    display: 'inline-flex', alignItems: 'center',
    border: '1px solid', borderRadius: '20px',
    px: 1, py: 0.3, cursor: 'pointer', fontSize: '11px',
    borderColor: on ? TEAL : 'rgba(0,0,0,0.18)',
    bgcolor: on ? 'rgba(0,130,127,0.09)' : 'transparent',
    color: on ? TEAL : 'text.secondary',
    fontWeight: on ? 600 : 400,
    transition: 'all 0.12s',
    '&:hover': { borderColor: on ? '#006e6b' : 'rgba(0,0,0,0.32)' },
  })

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '10px' } }}>

      {/* Header */}
      <DialogTitle sx={{ pb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
        <TrackChangesIcon sx={{ color: TEAL, fontSize: 20 }} />
        <Typography sx={{ fontWeight: 700, fontSize: '16px', flex: 1 }}>Create Tracker</Typography>
        <IconButton size="small" onClick={onClose}><CloseIcon fontSize="small" /></IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 0 }}>

        {/* AI Banner */}
        <Box sx={{ bgcolor: 'rgba(182,39,161,0.06)', border: '1px solid rgba(182,39,161,0.2)', borderRadius: '8px', px: 2, py: 1.25, mb: 2.5, display: 'flex', gap: 1 }}>
          <AutoAwesomeIcon sx={{ color: PURPLE, fontSize: 15, mt: 0.3, flexShrink: 0 }} />
          <Typography sx={{ fontSize: '13px', color: 'text.secondary', lineHeight: 1.6 }}>
            Pre-configured based on your search. Remove, add, or adjust anything before saving.
          </Typography>
        </Box>

        {/* Tracker Name */}
        <Typography sx={{ fontSize: '11px', fontWeight: 700, color: 'text.secondary', mb: 0.75, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Tracker Name
        </Typography>
        <TextField fullWidth size="small" value={trackerName} onChange={(e) => setTrackerName(e.target.value)} sx={{ mb: 3 }} />

        {/* ── Alerts ── */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          <NotificationsActiveOutlinedIcon sx={{ fontSize: 15, color: TEAL, mr: 0.75 }} />
          <Typography sx={{ fontSize: '13px', fontWeight: 700, flex: 1 }}>Alerts</Typography>
          <Chip icon={<AutoAwesomeIcon sx={{ fontSize: '11px !important', color: `${PURPLE} !important` }} />} label="Pre-configured" size="small"
            sx={{ height: 20, fontSize: '11px', bgcolor: 'rgba(182,39,161,0.08)', color: PURPLE, border: 'none' }} />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 1 }}>
          {alerts.map((alert) => {
            const type = ALL_ALERT_TYPES.find((t) => t.id === alert.id)
            return (
              <Box key={alert.id} sx={{ border: '1px solid rgba(0,130,127,0.2)', borderRadius: '8px', px: 2, py: 1.25, bgcolor: 'rgba(0,130,127,0.02)' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <NotificationsOutlinedIcon sx={{ fontSize: 16, color: TEAL, mt: 0.2, mr: 1, flexShrink: 0 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: '13px', fontWeight: 600, mb: 0.2 }}>{type?.name}</Typography>
                    <Typography sx={{ fontSize: '12px', color: 'text.secondary', lineHeight: 1.45 }}>{type?.desc}</Typography>
                  </Box>
                  <IconButton size="small" sx={{ ml: 0.5, opacity: 0.45, '&:hover': { opacity: 1 } }} onClick={() => removeAlert(alert.id)}>
                    <CloseIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                </Box>
                {/* Delivery channels */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 1, pl: 3 }}>
                  <Typography sx={{ fontSize: '11px', color: 'text.disabled', mr: 0.25 }}>Deliver via</Typography>
                  {DELIVERY_OPTIONS.map((ch) => (
                    <Box key={ch.key} component="span" sx={channelChipSx(alert.channels[ch.key])}
                      onClick={() => toggleAlertChannel(alert.id, ch.key)}>
                      {ch.label}
                    </Box>
                  ))}
                </Box>
              </Box>
            )
          })}
        </Box>

        {/* Alert picker */}
        {showAlertPicker && availableAlertTypes.length > 0 && (
          <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '8px', overflow: 'hidden', mb: 1 }}>
            {availableAlertTypes.map((type, i) => (
              <Box key={type.id} onClick={() => addAlert(type.id)}
                sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1.125, cursor: 'pointer',
                  borderBottom: i < availableAlertTypes.length - 1 ? '1px solid' : 'none', borderColor: 'rgba(0,0,0,0.06)',
                  '&:hover': { bgcolor: 'rgba(0,130,127,0.04)' } }}>
                <NotificationsOutlinedIcon sx={{ fontSize: 15, color: 'text.secondary' }} />
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: '13px', fontWeight: 500 }}>{type.name}</Typography>
                  <Typography sx={{ fontSize: '11px', color: 'text.secondary' }}>{type.desc}</Typography>
                </Box>
                <Typography sx={{ fontSize: '12px', color: TEAL, fontWeight: 500 }}>Add</Typography>
              </Box>
            ))}
          </Box>
        )}

        <Button size="small" startIcon={<NotificationsOutlinedIcon sx={{ fontSize: 15 }} />}
          onClick={() => setShowAlertPicker((v) => !v)}
          disabled={availableAlertTypes.length === 0}
          sx={{ textTransform: 'none', fontSize: '13px', color: TEAL, fontWeight: 500, mb: 3, pl: 0,
            '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}>
          {showAlertPicker ? 'Cancel' : '+ Add alert type'}
        </Button>

        {/* ── Digest ── */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          <MailOutlineIcon sx={{ fontSize: 15, color: TEAL, mr: 0.75 }} />
          <Typography sx={{ fontSize: '13px', fontWeight: 700, flex: 1 }}>Digest</Typography>
          <Chip icon={<AutoAwesomeIcon sx={{ fontSize: '11px !important', color: `${PURPLE} !important` }} />} label="Pre-configured" size="small"
            sx={{ height: 20, fontSize: '11px', bgcolor: 'rgba(182,39,161,0.08)', color: PURPLE, border: 'none' }} />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 1 }}>
          {digests.map((digest) => {
            const sched = DIGEST_SCHEDULES.find((s) => s.value === digest.schedule)
            // Contextual volume based on schedule
            const WEEKLY_TOTAL = 3370
            const available = digest.schedule === 'daily'   ? Math.round(WEEKLY_TOTAL / 7)
                            : digest.schedule === 'weekly'  ? WEEKLY_TOTAL
                            : digest.schedule === 'monthly' ? Math.round(WEEKLY_TOTAL * 4.3)
                            : WEEKLY_TOTAL
            const sliderMax  = Math.max(50, Math.min(200, available))
            const aiSugg     = Math.min(75, Math.max(5, Math.round((available * 0.20) / 5) * 5))
            const recMin     = Math.max(5, Math.round(available * 0.10 / 5) * 5)
            const recMax     = Math.min(sliderMax, Math.round(available * 0.35 / 5) * 5)
            const count      = digest.articleCount ?? aiSugg
            const tooFew     = count < recMin
            const tooMany    = count > recMax
            const feedbackColor = tooFew || tooMany ? '#E65100' : TEAL
            const feedbackBg    = tooFew || tooMany ? 'rgba(230,81,0,0.07)' : 'rgba(0,130,127,0.07)'
            const feedbackText  = tooFew
              ? `${count} articles — you may miss important coverage at this volume`
              : tooMany
              ? `${count} articles — large digest, may feel overwhelming for recipients`
              : `${count} articles per digest`
            const sliderMarks = [
              { value: Math.round(sliderMax * 0.05 / 5) * 5 || 5, label: `${Math.round(sliderMax * 0.05 / 5) * 5 || 5}` },
              { value: Math.round(sliderMax * 0.25 / 5) * 5,       label: `${Math.round(sliderMax * 0.25 / 5) * 5}` },
              { value: Math.round(sliderMax * 0.50 / 5) * 5,       label: `${Math.round(sliderMax * 0.50 / 5) * 5}` },
              { value: Math.round(sliderMax * 0.75 / 5) * 5,       label: `${Math.round(sliderMax * 0.75 / 5) * 5}` },
              { value: sliderMax,                                   label: `${sliderMax}` },
            ]

            return (
              <Box key={digest.id} sx={{ border: '1px solid rgba(0,130,127,0.2)', borderRadius: '8px', px: 2, py: 1.5, bgcolor: 'rgba(0,130,127,0.02)' }}>

                {/* Header row */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <MailOutlineIcon sx={{ fontSize: 16, color: TEAL, mt: 0.2, mr: 1, flexShrink: 0 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: '13px', fontWeight: 600, mb: 0.2 }}>{sched?.label} Digest</Typography>
                    <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>{sched?.desc}</Typography>
                  </Box>
                  <IconButton size="small" sx={{ ml: 0.5, opacity: 0.45, '&:hover': { opacity: 1 } }} onClick={() => removeDigest(digest.id)}>
                    <CloseIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                </Box>

                {/* Delivery channels */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 1, pl: 3 }}>
                  <Typography sx={{ fontSize: '11px', color: 'text.disabled', mr: 0.25 }}>Deliver via</Typography>
                  {DELIVERY_OPTIONS.map((ch) => (
                    <Box key={ch.key} component="span" sx={channelChipSx(digest.channels[ch.key])}
                      onClick={() => toggleDigestChannel(digest.id, ch.key)}>
                      {ch.label}
                    </Box>
                  ))}
                </Box>

                {/* Article volume slider */}
                <Box sx={{ mt: 2, pl: 3, pr: 0.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
                    <AutoAwesomeIcon sx={{ fontSize: 12, color: PURPLE, flexShrink: 0 }} />
                    <Typography sx={{ fontSize: '11px', color: 'text.secondary' }}>
                      {available.toLocaleString()} articles available per {digest.schedule} from this search
                    </Typography>
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Slider
                      value={count}
                      min={5}
                      max={sliderMax}
                      step={5}
                      marks={sliderMarks}
                      onChange={(_, v) => setDigestArticleCount(digest.id, v)}
                      sx={{
                        color: tooFew || tooMany ? '#E65100' : TEAL,
                        height: 4,
                        '& .MuiSlider-thumb': { width: 14, height: 14 },
                        '& .MuiSlider-rail': { opacity: 0.25 },
                        '& .MuiSlider-markLabel': { fontSize: '10px', color: 'text.disabled' },
                      }}
                    />
                  </Box>

                  {/* Feedback pill */}
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, mt: 0.25, px: 1.25, py: 0.4, borderRadius: '20px', bgcolor: feedbackBg }}>
                    {(tooFew || tooMany) && (
                      <Box component="span" sx={{ fontSize: '13px', lineHeight: 1 }}>⚠</Box>
                    )}
                    <Typography sx={{ fontSize: '12px', color: feedbackColor, fontWeight: tooFew || tooMany ? 600 : 500 }}>
                      {feedbackText}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: '10px', color: 'text.disabled', mt: 0.5 }}>
                    Recommended: {recMin}–{recMax} articles ({Math.round(recMin / available * 100)}–{Math.round(recMax / available * 100)}% of available)
                  </Typography>
                </Box>

              </Box>
            )
          })}
        </Box>

        {/* Digest picker */}
        {showDigestPicker && (
          <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '8px', overflow: 'hidden', mb: 1 }}>
            {DIGEST_SCHEDULES.map((s, i) => (
              <Box key={s.value} onClick={() => addDigest(s.value)}
                sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1.125, cursor: 'pointer',
                  borderBottom: i < DIGEST_SCHEDULES.length - 1 ? '1px solid' : 'none', borderColor: 'rgba(0,0,0,0.06)',
                  '&:hover': { bgcolor: 'rgba(0,130,127,0.04)' } }}>
                <MailOutlineIcon sx={{ fontSize: 15, color: 'text.secondary' }} />
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: '13px', fontWeight: 500 }}>{s.label}</Typography>
                  <Typography sx={{ fontSize: '11px', color: 'text.secondary' }}>{s.desc}</Typography>
                </Box>
                <Typography sx={{ fontSize: '12px', color: TEAL, fontWeight: 500 }}>Add</Typography>
              </Box>
            ))}
          </Box>
        )}

        <Button size="small" startIcon={<MailOutlineIcon sx={{ fontSize: 15 }} />}
          onClick={() => setShowDigestPicker((v) => !v)}
          sx={{ textTransform: 'none', fontSize: '13px', color: TEAL, fontWeight: 500, pl: 0,
            '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}>
          {showDigestPicker ? 'Cancel' : '+ Add digest'}
        </Button>

      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5, pt: 1.5, gap: 1 }}>
        <Button onClick={onClose} variant="outlined" sx={{ textTransform: 'none', borderRadius: '6px' }}>
          Cancel
        </Button>
        <Button variant="contained" onClick={onClose}
          sx={{ textTransform: 'none', borderRadius: '6px', bgcolor: TEAL, '&:hover': { bgcolor: '#006d6a' } }}>
          Save Tracker
        </Button>
      </DialogActions>
    </Dialog>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function MwExploreResultsPage() {
  const navigate = useNavigate()
  const [analyticsTab, setAnalyticsTab] = useState(0)
  const [trackerDialogOpen, setTrackerDialogOpen] = useState(false)

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default', overflow: 'hidden' }}>

      {/* Top Bar */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          height: 52,
          display: 'flex',
          alignItems: 'center',
          px: 2,
          gap: 1.5,
          flexShrink: 0,
        }}
      >
        <IconButton size="small" onClick={() => navigate('/mw-explore')}>
          <ArrowBackIcon fontSize="small" />
        </IconButton>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            cursor: 'pointer',
            px: 1,
            py: 0.5,
            borderRadius: '4px',
            flexShrink: 0,
            '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' },
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: '14px', whiteSpace: 'nowrap' }}>Yelp Brand Search</Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
        </Box>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5, my: 1.5 }} />

        <Button
          size="small"
          variant="outlined"
          startIcon={<CalendarMonthOutlinedIcon sx={{ fontSize: '14px !important' }} />}
          endIcon={<ArrowDropDownIcon />}
          sx={{ textTransform: 'none', fontSize: '13px', borderRadius: '4px', flexShrink: 0, whiteSpace: 'nowrap' }}
        >
          Last 7 days
        </Button>

        <Button
          size="small"
          variant="outlined"
          endIcon={<ArrowDropDownIcon />}
          sx={{ textTransform: 'none', fontSize: '13px', borderRadius: '4px', minWidth: 0, flexShrink: 0 }}
        >
          Aa
        </Button>

        <Button
          size="small"
          variant="outlined"
          startIcon={<BarChartOutlinedIcon sx={{ fontSize: '14px !important' }} />}
          endIcon={<ArrowDropDownIcon />}
          sx={{ textTransform: 'none', fontSize: '13px', borderRadius: '4px', flexShrink: 0, whiteSpace: 'nowrap' }}
        >
          Brand analysis
        </Button>

        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
          <Tooltip
            title={
              <Box sx={{ maxWidth: 210 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '12px', mb: 0.5 }}>Track this search</Typography>
                <Typography sx={{ fontSize: '12px', lineHeight: 1.5 }}>
                  Get alerts and a daily digest for this search — pre-configured based on what you're monitoring.
                </Typography>
              </Box>
            }
            placement="bottom"
            arrow
          >
            <IconButton size="small" onClick={() => setTrackerDialogOpen(true)}>
              <TrackChangesIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <IconButton size="small"><NotificationsNoneOutlinedIcon fontSize="small" /></IconButton>
          <IconButton size="small"><FileDownloadOutlinedIcon fontSize="small" /></IconButton>
          <IconButton size="small"><CalendarTodayOutlinedIcon fontSize="small" /></IconButton>
          <IconButton size="small"><ShareOutlinedIcon fontSize="small" /></IconButton>
          <Button
            size="small"
            endIcon={<ArrowDropDownIcon />}
            sx={{
              bgcolor: '#B627A1',
              color: '#fff',
              fontSize: '13px',
              textTransform: 'none',
              borderRadius: '4px',
              whiteSpace: 'nowrap',
              '&:hover': { bgcolor: '#9a1f87' },
            }}
          >
            Save
          </Button>
          <IconButton size="small"><KeyboardArrowUpIcon fontSize="small" /></IconButton>
        </Box>
      </Box>

      {/* Query Editor */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          px: 2.5,
          pt: 1.5,
          pb: 1,
          flexShrink: 0,
        }}
      >
        <QueryDisplay />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 0.75,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<AutoAwesomeIcon sx={{ fontSize: '14px !important', color: '#B627A1' }} />}
              endIcon={<ArrowDropDownIcon />}
              sx={{ textTransform: 'none', fontSize: '13px', borderRadius: '4px', color: '#B627A1', borderColor: 'rgba(182,39,161,0.4)' }}
            >
              Refine with AI
            </Button>
            <Typography
              component="span"
              sx={{ color: '#00827F', fontSize: '12px', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
            >
              Supported operators
            </Typography>
          </Box>
          <Typography sx={{ fontSize: '12px', color: 'text.disabled' }}>
            Ctrl + Enter to update results
          </Typography>
        </Box>
      </Box>

      {/* Filter Bar */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          px: 2,
          py: 1,
          gap: 1,
          flexShrink: 0,
          flexWrap: 'wrap',
        }}
      >
        <Button
          size="small"
          variant="outlined"
          startIcon={<FilterListIcon />}
          sx={{
            textTransform: 'none',
            fontSize: '13px',
            borderColor: '#00827F',
            color: '#00827F',
            borderRadius: '4px',
          }}
        >
          All Filters
        </Button>
        <Divider orientation="vertical" flexItem />
        {['Saved Filter Sets', 'Source Type', 'Location', 'Language'].map((label) => (
          <Chip
            key={label}
            label={`${label} ▾`}
            variant="outlined"
            size="small"
            sx={{ fontSize: '13px', textTransform: 'none', borderRadius: '16px', cursor: 'pointer' }}
          />
        ))}
        <Box sx={{ ml: 'auto' }}>
          <Button
            size="small"
            sx={{
              bgcolor: '#00827F',
              color: '#fff',
              textTransform: 'none',
              fontSize: '13px',
              px: 2,
              borderRadius: '4px',
              '&:hover': { bgcolor: '#006d6a' },
            }}
          >
            Search
          </Button>
        </Box>
      </Box>

      {/* Unified Results + Analytics Toolbar */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          flexShrink: 0,
          height: 44,
          overflow: 'hidden',
        }}
      >
        {/* Left: results count + actions */}
        <Box
          sx={{
            width: 390,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            px: 1.5,
            borderRight: '1px solid',
            borderColor: 'divider',
            height: '100%',
          }}
        >
          <Checkbox size="small" sx={{ color: 'text.secondary', '&.Mui-checked': { color: '#00827F' }, p: 0.5 }} />
          <Typography sx={{ fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap' }}>3.37k results</Typography>
          <IconButton size="small" sx={{ color: 'text.secondary' }}><EditOutlinedIcon sx={{ fontSize: 16 }} /></IconButton>
          <IconButton size="small" sx={{ color: 'text.secondary' }}><FileDownloadOutlinedIcon sx={{ fontSize: 16 }} /></IconButton>
          <IconButton size="small" sx={{ color: 'text.secondary' }}><TuneIcon sx={{ fontSize: 16 }} /></IconButton>
          <IconButton size="small" sx={{ color: 'text.secondary' }}><MoreVertIcon sx={{ fontSize: 16 }} /></IconButton>
          <Divider orientation="vertical" flexItem sx={{ mx: 0.5, my: 1 }} />
          <Typography sx={{ fontSize: '12px', color: 'text.secondary', whiteSpace: 'nowrap' }}>Sort by:</Typography>
          <Chip label="Date ▾" size="small" sx={{ fontSize: '12px', cursor: 'pointer', height: 22 }} />
          <IconButton size="small" sx={{ color: 'text.secondary' }}><ArrowDownwardIcon sx={{ fontSize: 16 }} /></IconButton>
        </Box>

        {/* Right: analytics tabs + view controls */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <Tabs
            value={analyticsTab}
            onChange={(_, v) => setAnalyticsTab(v)}
            sx={{
              minHeight: 44,
              flex: 1,
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '13px',
                minHeight: 44,
                py: 0,
                px: 2,
              },
              '& .MuiTabs-indicator': { backgroundColor: '#00827F' },
              '& .Mui-selected': { color: '#00827F !important' },
            }}
          >
            {['Volume', 'Narrative', 'Sentiment', 'Engagement'].map((t) => (
              <Tab key={t} label={t} />
            ))}
          </Tabs>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, px: 1, flexShrink: 0 }}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<DashboardCustomizeOutlinedIcon sx={{ fontSize: '14px !important' }} />}
              endIcon={<ArrowDropDownIcon />}
              sx={{ textTransform: 'none', fontSize: '12px', borderRadius: '4px', py: 0.25, whiteSpace: 'nowrap' }}
            >
              Analytics
            </Button>
            <IconButton size="small"><ViewModuleIcon fontSize="small" /></IconButton>
          </Box>
        </Box>
      </Box>

      {/* Main Two-Column Area */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* LEFT PANEL */}
        <Box
          sx={{
            width: 390,
            borderRight: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'background.paper',
            flexShrink: 0,
          }}
        >
          {/* Article Feed */}
          <Box sx={{ flex: 1, overflow: 'auto' }}>
            <CardXPost
              avatar="MZ"
              avatarBg="#00827F"
              name="Martin Zuev"
              handle="@carpetcleanzuev"
              geo="US"
              time="Apr 28, 10:49 AM"
              body='1 (415) 941-8921 💬Get a Free Estimate… Check our Yelp reviews: (link in bio) #sanfrancisco…'
              highlights={['Yelp', 'reviews']}
              tags="Yelp, reviews"
              reach="8.58k Reach"
              sentiment="Neutral"
            />

            <CardNews
              avatarText="HT"
              avatarBg="#78909C"
              source="Harbinger Times"
              meta="News | US | Apr 28, 10:22 AM"
              headline="Top Real Estate Listing Agent in Granada Hills, CA, Advises Homeowners on Leveraging Mortgage Forbearance to Avoid Forec..."
              excerpt='reputation is reflected in their over 800 five-star reviews across Zillow, Google, and Yelp, with most clients coming from repeat business,'
              highlights={['reviews', 'Yelp']}
              subCard={{ avatar: 'MM', text: 'Top Reach: 1.06k | News | US | Apr 28, 8:15 AM' }}
              tags="Website, reviews, Yelp"
              sentiment="Positive"
              similar="14"
            />

            <CardReddit
              subreddit="r/SanJose"
              author="svg2019"
              time="Apr 28, 10:22 AM"
              title="Mortgage lender recommendations"
              excerpt="over the years. His reviews speak for themselves. [Yelp link]"
              highlights={['reviews', 'Yelp']}
              tags="reviews, yelp, recommendations"
              reach="256.78k Reach"
              sentiment="Neutral"
            />

            <CardNews
              avatarText="AC"
              avatarBg="#5C6BC0"
              source="The Augusta Chronicle"
              byline="Miguel Legoas"
              meta="News | US | Apr 28, 10:21 AM"
              headline="Local Business Owner Credits Yelp Reviews for Driving New Customers"
              excerpt="A local restaurant owner says that claiming their Yelp page and actively responding to reviews has been the single biggest driver of new foot traffic over the past year."
              highlights={['Yelp', 'reviews']}
              tags="Yelp, reviews, local business"
              sentiment="Positive"
              similar="3"
            />

            <CardXPost
              avatar="YB"
              avatarBg="#1976D2"
              name="YelpBusiness"
              handle="@YelpForBusiness"
              geo="US"
              time="Apr 28, 9:55 AM"
              body="⭐ Your customers are talking — are you listening? Claim your free Yelp Business page today…"
              highlights={['Yelp']}
              tags="Yelp, business page"
              reach="124.3k Reach"
              sentiment="Positive"
            />

            <CardNews
              avatarText="TC"
              avatarBg="#E53935"
              source="TechCrunch"
              byline="Sarah Johnson"
              meta="News | US | Apr 28, 9:12 AM"
              headline="Yelp Q1 2025 earnings beat expectations as local review platform sees surge in mobile usage"
              excerpt="Yelp reported Q1 2025 revenue of $357M, up 8% year-over-year, driven largely by a 23% increase in mobile app engagement and continued growth in its restaurant and home services verticals."
              highlights={['Yelp']}
              tags="Yelp, earnings, mobile"
              reach="2.1M Reach"
              sentiment="Positive"
              similar="22"
            />
          </Box>
        </Box>

        {/* RIGHT PANEL */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            bgcolor: 'background.default',
          }}
        >
          {/* Scrollable Analytics Content */}
          <Box
            sx={{
              flex: 1,
              overflow: 'auto',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {/* AI-Powered Insight Card */}
            <Box
              sx={{
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'rgba(182,39,161,0.25)',
                borderRadius: '8px',
                p: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <AutoAwesomeIcon sx={{ color: '#B627A1', fontSize: 16 }} />
                  <Typography sx={{ color: '#B627A1', fontWeight: 700, fontSize: '14px' }}>
                    AI-Powered Insight
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto' }}>
                  <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
                </Box>
              </Box>

              <Box component="ul" sx={{ m: 0, pl: 2.5, '& li': { mb: 0.75 } }}>
                <li>
                  <Typography component="span" sx={{ fontSize: '13px', color: 'text.secondary', lineHeight: 1.6 }}>
                    Multiple posts emphasize a consistent list of 10 free apps proven to simplify travel in Japan, including Google Maps, HyperDia, Suica/PASMO app, Tabelog/Yelp, and JapanTaxi or Uber Japan.{' '}
                    <Typography component="span" sx={{ color: '#00827F', fontSize: '13px', cursor: 'pointer' }}>ie.pinterest.com</Typography>
                  </Typography>
                </li>
                <li>
                  <Typography component="span" sx={{ fontSize: '13px', color: 'text.secondary', lineHeight: 1.6 }}>
                    The apps collectively aid navigation, dining, weather updates, communication, currency exchange, and transport management, enhancing efficiency for first-time visitors.{' '}
                    <Typography component="span" sx={{ color: '#00827F', fontSize: '13px', cursor: 'pointer' }}>ie.pinterest.com</Typography>
                  </Typography>
                </li>
                <li>
                  <Typography component="span" sx={{ fontSize: '13px', color: 'text.secondary', lineHeight: 1.6 }}>
                    The repeated high engagement across different authors highlights strong community interest and validation of this curated app toolkit for Japan travelers.{' '}
                    <Typography component="span" sx={{ color: '#00827F', fontSize: '13px', cursor: 'pointer' }}>ie.pinterest.com</Typography>
                  </Typography>
                </li>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1.5 }}>
                <Typography
                  component="span"
                  sx={{ color: '#00827F', fontSize: '13px', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                >
                  View More Insights
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <IconButton size="small" sx={{ color: 'text.disabled' }}><ThumbUpOutlinedIcon sx={{ fontSize: 14 }} /></IconButton>
                  <IconButton size="small" sx={{ color: 'text.disabled' }}><ThumbDownOutlinedIcon sx={{ fontSize: 14 }} /></IconButton>
                  <IconButton size="small" sx={{ color: 'text.disabled' }}><RefreshIcon sx={{ fontSize: 14 }} /></IconButton>
                  <IconButton size="small" sx={{ color: 'text.disabled' }}><ContentCopyIcon sx={{ fontSize: 14 }} /></IconButton>
                </Box>
              </Box>
            </Box>

            {/* Mentions Trend Card */}
            <TrendCard
              title="Mentions Trend"
              col1={{
                label: 'Total Mentions',
                value: '3.37K',
                delta: '↓ 5.2%',
                prev: 'Previous period 3.56K',
              }}
              col2={{
                label: 'Daily Average',
                value: '481',
                delta: '↓ 5.2%',
                prev: 'Previous period 508',
              }}
              data={mentionData}
            />

            {/* Reach Trend Card */}
            <TrendCard
              title="Reach Trend"
              col1={{
                label: 'Total Reach',
                value: '3.13B',
                delta: '↓ 20.7%',
                prev: 'Previous period 3.95B',
              }}
              col2={{
                label: 'Daily Average',
                value: '447M',
                delta: '↓ 20.7%',
                prev: 'Previous period 564M',
              }}
              data={reachData}
            />
          </Box>
        </Box>
      </Box>

      <CreateTrackerDialog open={trackerDialogOpen} onClose={() => setTrackerDialogOpen(false)} />
    </Box>
  )
}

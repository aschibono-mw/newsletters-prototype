import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Typography, Button, TextField, IconButton, Avatar, Chip,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SearchIcon from '@mui/icons-material/Search'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined'
import BoltIcon from '@mui/icons-material/Bolt'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined'
import XIcon from '@mui/icons-material/X'
import ApartmentIcon from '@mui/icons-material/Apartment'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import RssFeedIcon from '@mui/icons-material/RssFeed'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import ReplyIcon from '@mui/icons-material/Reply'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import GroupsIcon from '@mui/icons-material/Groups'
import ApiIcon from '@mui/icons-material/Api'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import LanguageIcon from '@mui/icons-material/Language'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'

// ── Palette ──────────────────────────────────────────────────────────────────
const TEAL = '#00827F'
const PURPLE = '#B627A1'

// ── Data ─────────────────────────────────────────────────────────────────────

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

// Brands currently configured in GenAI Lens
const BRAND_LIST = [
  { id: 1, name: 'Nike',   sector: 'Sportswear & Athletics' },
  { id: 2, name: 'Adidas', sector: 'Sportswear & Athletics' },
  { id: 3, name: 'Puma',   sector: 'Sportswear & Athletics' },
]

const SEARCH_ALERT_TYPE_GROUPS = [
  {
    section: 'SEARCH ALERTS',
    singleSelect: false,
    types: [
      { id: 'every_mention',   name: 'Every Mention',   desc: 'Each new mention in my search, up to 200 per hour.',                  Icon: ChatBubbleOutlineIcon },
      { id: 'follow_post',     name: 'Follow Post',     desc: "Notifies when there's activity on a post you're following.",          Icon: ReplyIcon },
      { id: 'sentiment_shift', name: 'Sentiment Shift', desc: 'Changes in sentiment for my search.',                                 Icon: TrendingUpIcon },
      { id: 'spike_detection', name: 'Spike Detection', desc: 'Sudden increases in mentions related to my search.',                  Icon: BoltIcon },
      { id: 'top_reach',       name: 'Top Reach',       desc: 'High-reach editorial sources mention my search keywords.',            Icon: CampaignOutlinedIcon },
      { id: 'x_influencer',    name: 'X Influencers',   desc: 'Top influencers mention my search keywords.',                         Icon: XIcon },
    ],
  },
  {
    section: 'EVENT ALERTS',
    singleSelect: true,
    notice: 'Event alerts can only be created one at a time',
    types: [
      { id: 'company_events',  name: 'Company Events',  desc: 'Alerts on significant business events for companies you monitor.',    Icon: ApartmentIcon },
      { id: 'industry_events', name: 'Industry Events', desc: 'Major industry events (partnerships, product launches, layoffs, etc.)', Icon: EqualizerIcon },
    ],
  },
  {
    section: 'SOCIAL ALERTS',
    singleSelect: true,
    notice: 'Social alerts can only be created one at a time',
    types: [
      { id: 'breakout_post',   name: 'Breakout Post',   desc: 'Emerging or trending posts on my Facebook page.',                     Icon: LocalFireDepartmentIcon },
      { id: 'likely_boosted',  name: 'Likely Boosted',  desc: 'Posts that are likely boosted on monitored Facebook pages.',          Icon: AttachMoneyIcon },
      { id: 'page_engagement', name: 'Page Engagement', desc: 'Notable increases of engagement on my Facebook page.',                Icon: CampaignOutlinedIcon },
    ],
  },
  {
    section: 'RSS ALERTS',
    singleSelect: true,
    notice: 'RSS alerts can only be created one at a time',
    types: [
      { id: 'rss_feed',        name: 'RSS Feed',        desc: 'New documents in my RSS Feed.',                                       Icon: RssFeedIcon },
    ],
  },
]

const BRAND_ALERT_TYPE_GROUPS = [
  {
    section: 'BRAND ALERTS',
    singleSelect: false,
    types: [
      { id: 'brand_company_events', name: 'Company Events', desc: 'Alerts when a significant business event is detected for this brand.', Icon: ApartmentIcon },
      { id: 'genai_lens',           name: 'GenAI Lens',     desc: 'AI-powered brand intelligence, narrative analysis, and sentiment trends.', Icon: AutoAwesomeIcon, isNew: true },
    ],
  },
]

const DELIVERY_CHANNELS = [
  { key: 'email',   label: 'Email',          Icon: MailOutlineIcon,                  defaultOn: true  },
  { key: 'mwweb',   label: 'Meltwater web',  Icon: NotificationsNoneOutlinedIcon,    defaultOn: true  },
  { key: 'slack',   label: 'Slack',          Icon: ForumOutlinedIcon,                defaultOn: false },
  { key: 'teams',   label: 'Teams',          Icon: GroupsIcon,                       defaultOn: false },
  { key: 'webhook', label: 'Webhook',        Icon: ApiIcon,                          defaultOn: false },
]

const LANGUAGES = ['English', 'French', 'German', 'Spanish', 'Portuguese', 'Italian', 'Dutch', 'Japanese']
const TIMEZONES = [
  'UTC', 'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
  'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Asia/Tokyo', 'Asia/Singapore', 'Australia/Sydney',
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function CustomCheckbox({ checked }) {
  return (
    <Box sx={{
      width: 18, height: 18, borderRadius: '4px', border: '2px solid',
      borderColor: checked ? TEAL : 'rgba(0,0,0,0.28)',
      bgcolor: checked ? TEAL : 'transparent',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      {checked && <CheckIcon sx={{ fontSize: 11, color: '#fff' }} />}
    </Box>
  )
}

function CustomRadio({ checked }) {
  return (
    <Box sx={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid', borderColor: checked ? TEAL : 'rgba(0,0,0,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      {checked && <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: TEAL }} />}
    </Box>
  )
}

// Progressive reveal with smooth animation
function RevealSection({ visible, children }) {
  return (
    <Box sx={{
      maxHeight: visible ? '5000px' : 0,
      opacity: visible ? 1 : 0,
      overflow: 'hidden',
      transition: visible
        ? 'max-height 0.5s ease, opacity 0.3s ease 0.05s'
        : 'max-height 0.35s ease, opacity 0.15s ease',
      pointerEvents: visible ? 'auto' : 'none',
    }}>
      {children}
    </Box>
  )
}

function FormCard({ children }) {
  return (
    <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '8px', overflow: 'hidden' }}>
      {children}
    </Box>
  )
}

function SectionHeader({ title, description }) {
  return (
    <Box sx={{ mb: 1.5 }}>
      <Typography sx={{ fontSize: '15px', fontWeight: 700 }}>{title}</Typography>
      {description && (
        <Typography sx={{ fontSize: '13px', color: 'text.secondary', mt: 0.25 }}>{description}</Typography>
      )}
    </Box>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function CreateTrackerPage() {
  const navigate = useNavigate()

  // Form state
  const [trackerName, setTrackerName]           = useState('')
  const [sourceType, setSourceType]             = useState(null)     // 'search' | 'brand'
  const [searchFilter, setSearchFilter]         = useState('')
  const [brandFilter, setBrandFilter]           = useState('')
  const [selectedSearchIds, setSelectedSearchIds] = useState([])
  const [selectedBrand, setSelectedBrand]       = useState(null)
  const [outputType, setOutputType]             = useState(null)      // 'alerts' | 'digest' | 'both'
  const [selectedAlertTypeIds, setSelectedAlertTypeIds] = useState([])
  const [alertDelivery, setAlertDelivery]       = useState({})       // { [alertTypeId]: { email, inapp, slack } }
  const [digestSchedule, setDigestSchedule]     = useState(null)     // 'daily' | 'weekly' | 'monthly'
  const [language, setLanguage]                 = useState('English')
  const [timezone, setTimezone]                 = useState('UTC')
  const [recipients, setRecipients]             = useState([
    { id: 1, initials: 'AT', name: 'Antonio T.', email: 'tony.schibono@meltwater.com' },
  ])
  const [recipientQuery, setRecipientQuery]     = useState('')
  const [recipientFocused, setRecipientFocused] = useState(false)

  const ALL_USERS = [
    { id: 1, initials: 'AT', name: 'Antonio T.',  email: 'tony.schibono@meltwater.com' },
    { id: 2, initials: 'SJ', name: 'Sarah J.',    email: 'sarah.johnson@meltwater.com' },
    { id: 3, initials: 'MG', name: 'Maria G.',    email: 'maria.garcia@meltwater.com' },
    { id: 4, initials: 'JL', name: 'James L.',    email: 'james.lee@meltwater.com' },
    { id: 5, initials: 'PD', name: 'Paul D.',     email: 'paul.davis@meltwater.com' },
    { id: 6, initials: 'CM', name: 'Clara M.',    email: 'clara.mills@meltwater.com' },
    { id: 7, initials: 'SK', name: 'Soo K.',      email: 'soo.kim@meltwater.com' },
    { id: 8, initials: 'RB', name: 'Rachel B.',   email: 'rachel.brown@meltwater.com' },
  ]
  const recipientIds = recipients.map(r => r.id)
  const recipientSuggestions = recipientQuery.trim().length > 0
    ? ALL_USERS.filter(u =>
        !recipientIds.includes(u.id) &&
        (u.name.toLowerCase().includes(recipientQuery.toLowerCase()) ||
         u.email.toLowerCase().includes(recipientQuery.toLowerCase()))
      )
    : []
  const addRecipient    = (user) => { setRecipients(prev => [...prev, user]); setRecipientQuery('') }
  const removeRecipient = (id)   => setRecipients(prev => prev.filter(r => r.id !== id))

  // Progressive visibility
  const sourceSelected =
    sourceType === 'search' ? selectedSearchIds.length > 0 :
    sourceType === 'brand'  ? selectedBrand !== null :
    false
  const wantsAlerts  = outputType === 'alerts' || outputType === 'both'
  const wantsDigest  = outputType === 'digest' || outputType === 'both'
  const alertTypeSelected = selectedAlertTypeIds.length > 0
  const digestValid  = !wantsDigest || digestSchedule !== null
  const alertsValid  = !wantsAlerts || alertTypeSelected
  const canCreate = trackerName.trim().length > 0 && sourceSelected && outputType !== null && alertsValid && digestValid

  const DIGEST_SCHEDULES = [
    { value: 'daily',   label: 'Daily',   desc: 'Delivered every morning at 8am' },
    { value: 'weekly',  label: 'Weekly',  desc: 'Delivered every Monday at 8am' },
    { value: 'monthly', label: 'Monthly', desc: 'Delivered on the 1st of each month' },
  ]

  // Handlers
  const handleSourceTypeChange = (type) => {
    if (sourceType === type) return
    setSourceType(type)
    setSelectedSearchIds([])
    setSelectedBrand(null)
    setOutputType(null)
    setSelectedAlertTypeIds([])
    setAlertDelivery({})
    setDigestSchedule(null)
    setSearchFilter('')
    setBrandFilter('')
  }

  const toggleSearch = (id) =>
    setSelectedSearchIds(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])

  const toggleAlertType = (id) => {
    // Find if the group for this type is single-select
    const allGroups = [...SEARCH_ALERT_TYPE_GROUPS, ...BRAND_ALERT_TYPE_GROUPS]
    const group = allGroups.find(g => g.types.some(t => t.id === id))
    const isSingleSelect = group?.singleSelect ?? false
    const groupTypeIds = group?.types.map(t => t.id) ?? []

    setSelectedAlertTypeIds(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id)
      // For single-select, deselect others in the same group
      const filtered = isSingleSelect ? prev.filter(x => !groupTypeIds.includes(x)) : prev
      const defaults = Object.fromEntries(DELIVERY_CHANNELS.map(ch => [ch.key, ch.defaultOn]))
      setAlertDelivery(d => ({ ...d, [id]: defaults }))
      return [...filtered, id]
    })
  }

  const toggleDelivery = (alertId, channel) => {
    setAlertDelivery(prev => ({
      ...prev,
      [alertId]: { ...(prev[alertId] || {}), [channel]: !(prev[alertId]?.[channel] ?? false) },
    }))
  }

  const currentAlertTypeGroups = sourceType === 'brand' ? BRAND_ALERT_TYPE_GROUPS : SEARCH_ALERT_TYPE_GROUPS

  const filteredSearches = SAVED_SEARCHES_LIST.filter(s =>
    s.name.toLowerCase().includes(searchFilter.toLowerCase())
  )
  const filteredBrands = BRAND_LIST.filter(b =>
    b.name.toLowerCase().includes(brandFilter.toLowerCase())
  )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'background.default' }}>

      {/* ── Breadcrumb header ── */}
      <Box sx={{
        px: 3, py: 1.75,
        display: 'flex', alignItems: 'center', gap: 0.75,
        borderBottom: '1px solid', borderColor: 'divider',
        bgcolor: 'background.paper', flexShrink: 0,
      }}>
        <IconButton size="small" onClick={() => navigate('/mw-alerts')} sx={{ mr: 0.25, p: 0.5 }}>
          <ArrowBackIcon sx={{ fontSize: 18 }} />
        </IconButton>
        <Typography
          onClick={() => navigate('/mw-alerts')}
          sx={{ fontSize: '13px', color: 'text.secondary', cursor: 'pointer', '&:hover': { color: TEAL } }}
        >
          Trackers
        </Typography>
        <Typography sx={{ fontSize: '13px', color: 'text.disabled', mx: 0.25 }}>/</Typography>
        <Typography sx={{ fontSize: '13px', fontWeight: 500, color: 'text.primary' }}>
          Create Tracker
        </Typography>
      </Box>

      {/* ── Scrollable form ── */}
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Box sx={{ maxWidth: 640, mx: 'auto', px: 3, py: 4 }}>

          {/* Page title */}
          <Typography sx={{ fontSize: '22px', fontWeight: 700, mb: 4 }}>
            Create Tracker
          </Typography>

          {/* ─── 1. Tracker name ──────────────────────────────────────── */}
          <Box sx={{ mb: 3.5 }}>
            <SectionHeader title="Tracker name" />
            <TextField
              fullWidth
              size="small"
              placeholder="e.g. Nike Core Monitoring"
              value={trackerName}
              onChange={e => setTrackerName(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: TEAL },
                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0,0,0,0.4)' },
              }}
            />
          </Box>

          {/* ─── 2. Source type ──────────────────────────────────────── */}
          <Box sx={{ mb: 3.5 }}>
            <SectionHeader
              title="Source type"
              description="What do you want this tracker to monitor?"
            />
            <Box sx={{ display: 'flex', gap: 1.5, mt: 1.5 }}>
              {[
                { value: 'search', label: 'Saved Search', Icon: SearchIcon,        desc: 'Monitor keyword searches and boolean queries' },
                { value: 'brand',  label: 'Brand',        Icon: DiamondOutlinedIcon, desc: 'Monitor a specific brand or company' },
              ].map(opt => {
                const sel = sourceType === opt.value
                return (
                  <Box
                    key={opt.value}
                    onClick={() => handleSourceTypeChange(opt.value)}
                    sx={{
                      flex: 1, border: '1.5px solid', borderRadius: '10px', p: 2.25, cursor: 'pointer',
                      borderColor: sel ? TEAL : 'divider',
                      bgcolor: sel ? 'rgba(0,130,127,0.04)' : 'background.paper',
                      '&:hover': { borderColor: sel ? TEAL : 'rgba(0,0,0,0.25)' },
                      transition: 'border-color 0.15s, background-color 0.15s',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.25 }}>
                      <Box sx={{
                        width: 38, height: 38, borderRadius: '9px',
                        bgcolor: sel ? 'rgba(0,130,127,0.12)' : 'rgba(0,0,0,0.05)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <opt.Icon sx={{ fontSize: 18, color: sel ? TEAL : 'text.secondary' }} />
                      </Box>
                      {sel && (
                        <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: TEAL, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <CheckIcon sx={{ fontSize: 12, color: '#fff' }} />
                        </Box>
                      )}
                    </Box>
                    <Typography sx={{ fontSize: '14px', fontWeight: 700, color: sel ? TEAL : 'text.primary', mb: 0.375 }}>
                      {opt.label}
                    </Typography>
                    <Typography sx={{ fontSize: '12px', color: 'text.secondary', lineHeight: 1.45 }}>
                      {opt.desc}
                    </Typography>
                  </Box>
                )
              })}
            </Box>
          </Box>

          {/* ─── 3a. Saved search list (progressive) ─────────────────── */}
          <RevealSection visible={sourceType === 'search'}>
            <Box sx={{ mb: 3.5 }}>
              <SectionHeader
                title="Saved searches"
                description="Select one or more searches to monitor"
              />

              {/* Selected chips */}
              {selectedSearchIds.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 1.5 }}>
                  {selectedSearchIds.map(id => {
                    const s = SAVED_SEARCHES_LIST.find(x => x.id === id)
                    return (
                      <Chip
                        key={id}
                        label={s.name}
                        size="small"
                        onDelete={() => toggleSearch(id)}
                        sx={{ bgcolor: 'rgba(0,130,127,0.1)', color: TEAL, '& .MuiChip-deleteIcon': { color: TEAL } }}
                      />
                    )
                  })}
                </Box>
              )}

              <FormCard>
                {/* Filter input */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1.25, borderBottom: '1px solid', borderColor: 'divider' }}>
                  <SearchIcon sx={{ fontSize: 15, color: 'text.disabled', flexShrink: 0 }} />
                  <Box
                    component="input"
                    placeholder="Filter searches…"
                    value={searchFilter}
                    onChange={e => setSearchFilter(e.target.value)}
                    sx={{
                      border: 'none', outline: 'none', fontSize: '13px', flex: 1,
                      bgcolor: 'transparent', color: 'text.primary',
                      '&::placeholder': { color: 'rgba(0,0,0,0.35)' },
                    }}
                  />
                  {searchFilter && (
                    <IconButton size="small" sx={{ p: 0.25 }} onClick={() => setSearchFilter('')}>
                      <CloseIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  )}
                </Box>
                {/* Search rows */}
                {filteredSearches.map((s, i) => {
                  const sel = selectedSearchIds.includes(s.id)
                  return (
                    <Box
                      key={s.id}
                      onClick={() => toggleSearch(s.id)}
                      sx={{
                        display: 'flex', alignItems: 'center', gap: 1.5, px: 2.5, py: 1.625,
                        borderBottom: i < filteredSearches.length - 1 ? '1px solid' : 'none',
                        borderColor: 'rgba(0,0,0,0.06)',
                        cursor: 'pointer',
                        bgcolor: sel ? 'rgba(0,130,127,0.04)' : '#fff',
                        '&:hover': { bgcolor: sel ? 'rgba(0,130,127,0.07)' : 'rgba(0,0,0,0.02)' },
                      }}
                    >
                      <CustomCheckbox checked={sel} />
                      <SearchIcon sx={{ fontSize: 14, color: 'text.disabled', flexShrink: 0 }} />
                      <Typography sx={{ fontSize: '13px', flex: 1, color: sel ? TEAL : 'text.primary', fontWeight: sel ? 500 : 400 }}>
                        {s.name}
                      </Typography>
                      <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>{s.type}</Typography>
                    </Box>
                  )
                })}
              </FormCard>
              <Typography sx={{ fontSize: '12px', color: 'text.secondary', mt: 1 }}>
                {selectedSearchIds.length} of {SAVED_SEARCHES_LIST.length} selected
              </Typography>
            </Box>
          </RevealSection>

          {/* ─── 3b. Brand selection (progressive) ──────────────────── */}
          <RevealSection visible={sourceType === 'brand'}>
            <Box sx={{ mb: 3.5 }}>
              <SectionHeader
                title="Brand"
                description="Select a brand to monitor. Brands are sourced from your GenAI Lens configuration."
              />

              {/* Selected brand pill */}
              {selectedBrand && (
                <Box sx={{
                  display: 'flex', alignItems: 'center', gap: 1.25,
                  bgcolor: 'rgba(182,39,161,0.05)', border: '1.5px solid rgba(182,39,161,0.25)',
                  borderRadius: '8px', px: 2, py: 1.25, mb: 1.5,
                }}>
                  <Box sx={{ width: 28, height: 28, borderRadius: '6px', bgcolor: 'rgba(182,39,161,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <DiamondOutlinedIcon sx={{ fontSize: 14, color: PURPLE }} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: '13px', fontWeight: 600, color: PURPLE }}>{selectedBrand.name}</Typography>
                    <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>{selectedBrand.sector}</Typography>
                  </Box>
                  <IconButton size="small" sx={{ p: 0.25 }} onClick={() => { setSelectedBrand(null); setSelectedAlertTypeIds([]); setAlertDelivery({}) }}>
                    <CloseIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                </Box>
              )}

              <FormCard>
                {/* Brand filter */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1.25, borderBottom: '1px solid', borderColor: 'divider', bgcolor: '#fff' }}>
                  <SearchIcon sx={{ fontSize: 15, color: 'text.disabled', flexShrink: 0 }} />
                  <Box
                    component="input"
                    placeholder="Search brands…"
                    value={brandFilter}
                    onChange={e => setBrandFilter(e.target.value)}
                    sx={{
                      border: 'none', outline: 'none', fontSize: '13px', flex: 1,
                      bgcolor: 'transparent', color: 'text.primary',
                      '&::placeholder': { color: 'rgba(0,0,0,0.35)' },
                    }}
                  />
                  {brandFilter && (
                    <IconButton size="small" sx={{ p: 0.25 }} onClick={() => setBrandFilter('')}>
                      <CloseIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  )}
                </Box>
                {/* Brand rows */}
                {filteredBrands.map((brand, i) => {
                  const sel = selectedBrand?.id === brand.id
                  return (
                    <Box
                      key={brand.id}
                      onClick={() => { setSelectedBrand(brand); setSelectedAlertTypeIds([]); setAlertDelivery({}) }}
                      sx={{
                        display: 'flex', alignItems: 'center', gap: 1.5, px: 2.5, py: 1.625,
                        borderBottom: i < filteredBrands.length - 1 ? '1px solid' : 'none',
                        borderColor: 'rgba(0,0,0,0.06)',
                        cursor: 'pointer',
                        bgcolor: sel ? 'rgba(182,39,161,0.04)' : '#fff',
                        '&:hover': { bgcolor: sel ? 'rgba(182,39,161,0.07)' : 'rgba(0,0,0,0.02)' },
                      }}
                    >
                      {/* Radio */}
                      <Box sx={{
                        width: 18, height: 18, borderRadius: '50%', border: '2px solid', flexShrink: 0,
                        borderColor: sel ? PURPLE : 'rgba(0,0,0,0.28)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {sel && <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: PURPLE }} />}
                      </Box>
                      <Box sx={{ width: 28, height: 28, borderRadius: '6px', bgcolor: 'rgba(182,39,161,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <DiamondOutlinedIcon sx={{ fontSize: 14, color: PURPLE }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: '13px', fontWeight: sel ? 600 : 400, color: sel ? PURPLE : 'text.primary' }}>
                          {brand.name}
                        </Typography>
                        <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>{brand.sector}</Typography>
                      </Box>
                    </Box>
                  )
                })}
              </FormCard>
              <Typography sx={{ fontSize: '12px', color: 'text.secondary', mt: 1 }}>
                Showing brands tracked in{' '}
                <Typography component="span" sx={{ fontSize: '12px', color: TEAL, fontWeight: 500, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                  GenAI Lens
                </Typography>
                . To add brands, update your GenAI Lens configuration.
              </Typography>
            </Box>
          </RevealSection>

          {/* ─── 4. Output type (progressive) ───────────────────────── */}
          <RevealSection visible={sourceSelected}>
            <Box sx={{ mb: 3.5 }}>
              <SectionHeader title="What do you want from this tracker?" description="You can change this later from tracker settings." />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {[
                  { value: 'alerts', label: 'Alerts only',     desc: 'Get notified in real-time when specific events happen',          IconA: NotificationsNoneOutlinedIcon, IconB: null },
                  { value: 'digest', label: 'Digest only',     desc: 'Receive a scheduled email summary of your sources',              IconA: ArticleOutlinedIcon,           IconB: null },
                  { value: 'both',   label: 'Alerts & Digest', desc: 'Combine real-time alerts with a scheduled digest for full coverage', IconA: NotificationsNoneOutlinedIcon, IconB: ArticleOutlinedIcon },
                ].map(opt => {
                  const sel = outputType === opt.value
                  return (
                    <Box key={opt.value} onClick={() => setOutputType(opt.value)}
                      sx={{ display: 'flex', alignItems: 'center', gap: 2, border: '1.5px solid', borderRadius: '10px', p: 2, cursor: 'pointer', borderColor: sel ? TEAL : 'divider', bgcolor: sel ? 'rgba(0,130,127,0.04)' : 'background.paper', '&:hover': { borderColor: sel ? TEAL : 'rgba(0,0,0,0.25)' }, transition: 'all 0.15s' }}>
                      <Box sx={{ width: 38, height: 38, borderRadius: '8px', bgcolor: sel ? 'rgba(0,130,127,0.12)' : 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {opt.IconB ? (
                          <Box sx={{ display: 'flex', gap: 0.25 }}>
                            <opt.IconA sx={{ fontSize: 15, color: sel ? TEAL : 'text.secondary' }} />
                            <opt.IconB sx={{ fontSize: 15, color: sel ? TEAL : 'text.secondary' }} />
                          </Box>
                        ) : (
                          <opt.IconA sx={{ fontSize: 18, color: sel ? TEAL : 'text.secondary' }} />
                        )}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: sel ? TEAL : 'text.primary', mb: 0.25 }}>{opt.label}</Typography>
                        <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>{opt.desc}</Typography>
                      </Box>
                      <Box sx={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid', borderColor: sel ? TEAL : 'rgba(0,0,0,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {sel && <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: TEAL }} />}
                      </Box>
                    </Box>
                  )
                })}
              </Box>
            </Box>
          </RevealSection>

          {/* ─── 5. Alert types (progressive) ───────────────────────── */}
          <RevealSection visible={sourceSelected && wantsAlerts}>
            <Box sx={{ mb: 3.5 }}>
              <SectionHeader
                title="Alert types"
                description="Choose which types of alerts to receive for this tracker"
              />
              <FormCard>
                {currentAlertTypeGroups.map((group, gi) => (
                  <Box key={group.section}>
                    {/* Section label */}
                    <Box sx={{ px: 2.5, py: 0.875, bgcolor: 'rgba(0,0,0,0.025)', borderBottom: '1px solid', borderColor: 'divider', borderTop: gi > 0 ? '1px solid' : 'none', borderTopColor: 'divider' }}>
                      <Typography sx={{ fontSize: '11px', fontWeight: 700, color: 'text.disabled', letterSpacing: '0.08em' }}>
                        {group.section}
                      </Typography>
                    </Box>

                    {/* Single-select notice */}
                    {group.notice && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.875, px: 2.5, py: 0.875, bgcolor: 'rgba(0,0,0,0.015)', borderBottom: '1px solid', borderColor: 'rgba(0,0,0,0.06)' }}>
                        <InfoOutlinedIcon sx={{ fontSize: 13, color: 'text.disabled' }} />
                        <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>{group.notice}</Typography>
                      </Box>
                    )}

                    {group.types.map((type, ti) => {
                      const { Icon } = type
                      const sel = selectedAlertTypeIds.includes(type.id)
                      const delivery = alertDelivery[type.id] || {}
                      const isLastInGroup = ti === group.types.length - 1
                      const isLastGroup = gi === currentAlertTypeGroups.length - 1

                      return (
                        <Box key={type.id}>
                          {/* Alert type row */}
                          <Box
                            onClick={() => toggleAlertType(type.id)}
                            sx={{
                              display: 'flex', alignItems: 'flex-start', gap: 1.5, px: 2.5, py: 1.625,
                              cursor: 'pointer',
                              bgcolor: sel ? 'rgba(0,130,127,0.03)' : '#fff',
                              '&:hover': { bgcolor: sel ? 'rgba(0,130,127,0.055)' : 'rgba(0,0,0,0.02)' },
                              '&:hover .view-example': { opacity: 1 },
                              borderBottom: (!isLastInGroup || !isLastGroup) && !sel ? '1px solid' : 'none',
                              borderColor: 'rgba(0,0,0,0.06)',
                            }}
                          >
                            <Box sx={{ mt: '3px', flexShrink: 0 }}>
                              {group.singleSelect ? <CustomRadio checked={sel} /> : <CustomCheckbox checked={sel} />}
                            </Box>
                            <Box sx={{ width: 32, height: 32, borderRadius: '6px', flexShrink: 0, bgcolor: sel ? 'rgba(0,130,127,0.1)' : 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Icon sx={{ fontSize: 16, color: sel ? TEAL : 'text.secondary' }} />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.875 }}>
                                <Typography sx={{ fontSize: '13px', fontWeight: sel ? 600 : 500, color: sel ? TEAL : 'text.primary' }}>
                                  {type.name}
                                </Typography>
                                {type.isNew && (
                                  <Box sx={{ bgcolor: TEAL, color: '#fff', fontSize: '10px', fontWeight: 700, px: 0.75, py: 0.2, borderRadius: '4px', lineHeight: 1.6 }}>New</Box>
                                )}
                              </Box>
                              <Typography sx={{ fontSize: '12px', color: 'text.secondary', mt: 0.25, lineHeight: 1.45 }}>{type.desc}</Typography>
                            </Box>
                            <Typography
                              className="view-example"
                              onClick={e => e.stopPropagation()}
                              sx={{ fontSize: '12px', color: TEAL, fontWeight: 500, whiteSpace: 'nowrap', opacity: 0, transition: 'opacity 0.15s', cursor: 'pointer', flexShrink: 0, mt: 0.25, '&:hover': { textDecoration: 'underline' } }}
                            >
                              View example
                            </Typography>
                          </Box>

                          {/* Delivery channels — inline reveal when selected */}
                          <RevealSection visible={sel}>
                            <Box sx={{
                              display: 'flex', alignItems: 'center', gap: 2,
                              px: 2.5, py: 1.125,
                              pl: 8.5,
                              bgcolor: 'rgba(0,130,127,0.025)',
                              borderBottom: '1px solid', borderColor: 'rgba(0,0,0,0.06)',
                            }}>
                              <Typography sx={{ fontSize: '12px', color: 'text.secondary', fontWeight: 500, whiteSpace: 'nowrap' }}>
                                Deliver via
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
                                {DELIVERY_CHANNELS.map(ch => {
                                  const on = delivery[ch.key] ?? false
                                  const ChIcon = ch.Icon
                                  return (
                                    <Box
                                      key={ch.key}
                                      onClick={e => { e.stopPropagation(); toggleDelivery(type.id, ch.key) }}
                                      sx={{
                                        display: 'inline-flex', alignItems: 'center', gap: 0.5,
                                        border: '1px solid', borderRadius: '20px',
                                        px: 1.25, py: 0.4, cursor: 'pointer',
                                        borderColor: on ? TEAL : 'rgba(0,0,0,0.2)',
                                        bgcolor: on ? 'rgba(0,130,127,0.09)' : 'transparent',
                                        '&:hover': { borderColor: on ? '#006e6b' : 'rgba(0,0,0,0.35)', bgcolor: on ? 'rgba(0,130,127,0.13)' : 'rgba(0,0,0,0.03)' },
                                        transition: 'all 0.15s',
                                      }}
                                    >
                                      <ChIcon sx={{ fontSize: 13, color: on ? TEAL : 'text.secondary' }} />
                                      <Typography sx={{ fontSize: '12px', color: on ? TEAL : 'text.secondary', fontWeight: on ? 600 : 400, lineHeight: 1 }}>
                                        {ch.label}
                                      </Typography>
                                    </Box>
                                  )
                                })}
                              </Box>
                            </Box>
                          </RevealSection>
                        </Box>
                      )
                    })}
                  </Box>
                ))}
              </FormCard>
              <Typography sx={{ fontSize: '12px', color: 'text.secondary', mt: 1 }}>
                {selectedAlertTypeIds.length} alert type{selectedAlertTypeIds.length !== 1 ? 's' : ''} selected
              </Typography>
            </Box>
          </RevealSection>

          {/* ─── 6. Digest schedule (progressive) ───────────────────── */}
          <RevealSection visible={sourceSelected && wantsDigest}>
            <Box sx={{ mb: 3.5 }}>
              <SectionHeader title="Digest schedule" description="How often should this digest be delivered?" />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {DIGEST_SCHEDULES.map(s => {
                  const sel = digestSchedule === s.value
                  return (
                    <Box key={s.value} onClick={() => setDigestSchedule(s.value)}
                      sx={{ display: 'flex', alignItems: 'center', gap: 2, border: '1.5px solid', borderRadius: '10px', p: 2, cursor: 'pointer', borderColor: sel ? TEAL : 'divider', bgcolor: sel ? 'rgba(0,130,127,0.04)' : 'background.paper', '&:hover': { borderColor: sel ? TEAL : 'rgba(0,0,0,0.25)' }, transition: 'all 0.15s' }}>
                      <Box sx={{ width: 38, height: 38, borderRadius: '8px', bgcolor: sel ? 'rgba(0,130,127,0.12)' : 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <CalendarMonthOutlinedIcon sx={{ fontSize: 18, color: sel ? TEAL : 'text.secondary' }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: sel ? TEAL : 'text.primary', mb: 0.25 }}>{s.label}</Typography>
                        <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>{s.desc}</Typography>
                      </Box>
                      <Box sx={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid', borderColor: sel ? TEAL : 'rgba(0,0,0,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {sel && <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: TEAL }} />}
                      </Box>
                    </Box>
                  )
                })}
              </Box>
            </Box>
          </RevealSection>

          {/* ─── 7. Recipients (progressive) ────────────────────────── */}
          <RevealSection visible={(wantsAlerts && alertTypeSelected) || (wantsDigest && digestSchedule !== null)}>
            <Box sx={{ mb: 4 }}>
              <SectionHeader
                title="Recipients"
                description="Who should receive these alerts?"
              />
              <Box sx={{ border: '1px solid', borderColor: recipientFocused ? TEAL : 'divider', borderRadius: '8px', overflow: 'visible', transition: 'border-color 0.15s', position: 'relative' }}>
                {/* Search input */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1.25, borderBottom: recipients.length > 0 ? '1px solid' : 'none', borderColor: 'rgba(0,0,0,0.06)', bgcolor: '#fff', borderRadius: recipients.length > 0 ? '8px 8px 0 0' : '8px' }}>
                  <SearchIcon sx={{ fontSize: 15, color: recipientFocused ? TEAL : 'text.disabled', flexShrink: 0, transition: 'color 0.15s' }} />
                  <Box component="input" placeholder="Search by name or email address" value={recipientQuery}
                    onChange={e => setRecipientQuery(e.target.value)}
                    onFocus={() => setRecipientFocused(true)}
                    onBlur={() => setTimeout(() => setRecipientFocused(false), 150)}
                    sx={{ border: 'none', outline: 'none', fontSize: '13px', flex: 1, bgcolor: 'transparent', color: 'text.primary', '&::placeholder': { color: 'rgba(0,0,0,0.35)' } }}
                  />
                </Box>
                {/* Suggestions dropdown */}
                {recipientSuggestions.length > 0 && (
                  <Box sx={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10, border: '1px solid', borderColor: 'divider', borderRadius: '0 0 8px 8px', bgcolor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden', mt: '-1px' }}>
                    {recipientSuggestions.map((u, i) => (
                      <Box key={u.id} onMouseDown={() => addRecipient(u)}
                        sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2.5, py: 1.125, cursor: 'pointer', borderBottom: i < recipientSuggestions.length - 1 ? '1px solid' : 'none', borderColor: 'rgba(0,0,0,0.06)', '&:hover': { bgcolor: 'rgba(0,130,127,0.04)' } }}>
                        <Avatar sx={{ width: 28, height: 28, bgcolor: 'rgba(0,130,127,0.12)', color: TEAL, fontSize: '10px', fontWeight: 700 }}>{u.initials}</Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography sx={{ fontSize: '13px', fontWeight: 500 }}>{u.name}</Typography>
                          <Typography sx={{ fontSize: '11px', color: 'text.secondary' }}>{u.email}</Typography>
                        </Box>
                        <Typography sx={{ fontSize: '12px', color: TEAL, fontWeight: 500 }}>Add</Typography>
                      </Box>
                    ))}
                  </Box>
                )}
                {/* Added recipients */}
                {recipients.map((r, i) => (
                  <Box key={r.id} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2.5, py: 1.125, borderBottom: i < recipients.length - 1 ? '1px solid' : 'none', borderColor: 'rgba(0,0,0,0.06)', bgcolor: '#fff' }}>
                    <Avatar sx={{ width: 30, height: 30, bgcolor: 'rgba(0,130,127,0.15)', color: TEAL, fontSize: '11px', fontWeight: 700 }}>{r.initials}</Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>{r.name}</Typography>
                      <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>{r.email}</Typography>
                    </Box>
                    <IconButton size="small" sx={{ p: 0.375, opacity: 0.4, '&:hover': { opacity: 1 } }} onClick={() => removeRecipient(r.id)}>
                      <CloseIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Box>
                ))}
              </Box>
              <Typography sx={{ fontSize: '12px', color: 'text.secondary', mt: 1 }}>
                {recipients.length}/10 recipients
              </Typography>
            </Box>
          </RevealSection>

          {/* ─── 8. Language & timezone (progressive) ───────────────── */}
          <RevealSection visible={(wantsAlerts && alertTypeSelected) || (wantsDigest && digestSchedule !== null)}>
            <Box sx={{ mb: 4 }}>
              <SectionHeader title="Language & time zone" description="Alerts will be sent in the selected language and time zone for all recipients" />
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                {/* Language */}
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.75 }}>
                    <LanguageIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                    <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>Language</Typography>
                  </Box>
                  <Box component="select" value={language} onChange={e => setLanguage(e.target.value)}
                    sx={{ width: '100%', px: 1.5, py: 1.125, borderRadius: '8px', border: '1px solid', borderColor: 'divider', fontSize: '13px', bgcolor: 'background.paper', color: 'text.primary', cursor: 'pointer', outline: 'none', '&:focus': { borderColor: TEAL } }}>
                    {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                  </Box>
                </Box>
                {/* Timezone */}
                <Box sx={{ flex: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.75 }}>
                    <AccessTimeOutlinedIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                    <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>Time zone</Typography>
                  </Box>
                  <Box component="select" value={timezone} onChange={e => setTimezone(e.target.value)}
                    sx={{ width: '100%', px: 1.5, py: 1.125, borderRadius: '8px', border: '1px solid', borderColor: 'divider', fontSize: '13px', bgcolor: 'background.paper', color: 'text.primary', cursor: 'pointer', outline: 'none', '&:focus': { borderColor: TEAL } }}>
                    {TIMEZONES.map(tz => <option key={tz} value={tz}>{tz}</option>)}
                  </Box>
                </Box>
              </Box>
            </Box>
          </RevealSection>

          {/* ─── Footer buttons ───────────────────────────────────────── */}
          <Box sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1.5,
            pt: 2.5, mt: 1, borderTop: '1px solid', borderColor: 'divider',
          }}>
            <Button
              variant="text"
              onClick={() => navigate('/mw-alerts')}
              sx={{ color: 'text.secondary', textTransform: 'none', fontWeight: 500 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={!canCreate}
              startIcon={<AddIcon />}
              onClick={() => navigate('/mw-alerts')}
              sx={{
                bgcolor: TEAL, color: '#fff', textTransform: 'none', fontWeight: 600,
                borderRadius: '8px', px: 2.5,
                '&:hover': { bgcolor: '#006e6b' },
                '&.Mui-disabled': { bgcolor: 'rgba(0,130,127,0.3)', color: 'rgba(255,255,255,0.8)' },
              }}
            >
              Create Tracker
            </Button>
          </Box>

        </Box>
      </Box>
    </Box>
  )
}

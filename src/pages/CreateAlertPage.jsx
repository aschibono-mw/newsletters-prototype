import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
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

const TEAL = '#00827F'
const PURPLE = '#B627A1'

const SOURCE_TYPE_STYLES = {
  search: { bgcolor: 'rgba(0,130,127,0.08)',  color: TEAL,    Icon: SearchIcon },
  brand:  { bgcolor: 'rgba(182,39,161,0.08)', color: PURPLE,  Icon: DiamondOutlinedIcon },
}

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

const BRAND_LIST = [
  { id: 1, name: 'Nike',   sector: 'Sportswear & Athletics' },
  { id: 2, name: 'Adidas', sector: 'Sportswear & Athletics' },
  { id: 3, name: 'Puma',   sector: 'Sportswear & Athletics' },
]

const SEARCH_ALERT_TYPE_GROUPS = [
  {
    section: 'SEARCH ALERTS',
    types: [
      { id: 'every_mention',   name: 'Every Mention',   desc: 'Sends an alert every time a new mention appears.',           Icon: ChatBubbleOutlineIcon },
      { id: 'follow_post',     name: 'Follow Post',     desc: "Notifies when there's activity on a post you're following.", Icon: ReplyIcon },
      { id: 'sentiment_shift', name: 'Sentiment Shift', desc: 'Triggers when sentiment meaningfully changes.',              Icon: TrendingUpIcon },
      { id: 'spike_detection', name: 'Spike Detection', desc: 'Alerts when mention volume suddenly spikes.',               Icon: BoltIcon },
      { id: 'top_reach',       name: 'Top Reach',       desc: 'Flags when a high-reach source mentions your search.',      Icon: CampaignOutlinedIcon },
      { id: 'x_influencer',    name: 'X Influencer',    desc: 'Notifies when a high-influence X account posts.',           Icon: XIcon },
    ],
  },
  {
    section: 'EVENT ALERTS',
    types: [
      { id: 'company_events',  name: 'Company Events',  desc: 'Alerts on significant business events for a company.',      Icon: ApartmentIcon },
      { id: 'industry_events', name: 'Industry Events', desc: 'Alerts on major developments affecting an industry.',       Icon: EqualizerIcon },
    ],
  },
  {
    section: 'SOCIAL ALERTS',
    types: [
      { id: 'likely_boosted',  name: 'Likely Boosted',  desc: 'Identifies Facebook posts likely being paid-boosted.',      Icon: AttachMoneyIcon },
    ],
  },
  {
    section: 'RSS ALERTS',
    types: [
      { id: 'rss_feed',        name: 'RSS Feed',        desc: 'Sends an alert when a new article appears in an RSS feed.', Icon: RssFeedIcon },
    ],
  },
]

const BRAND_ALERT_TYPE_GROUPS = [
  {
    section: 'BRAND ALERTS',
    types: [
      { id: 'brand_company_events', name: 'Company Events', desc: 'Alerts when a significant business event is detected for this brand.', Icon: ApartmentIcon },
      { id: 'genai_lens',           name: 'GenAI Lens',     desc: 'AI-powered brand intelligence, narrative analysis, and sentiment trends.', Icon: AutoAwesomeIcon, isNew: true },
    ],
  },
]

const DELIVERY_CHANNELS = [
  { key: 'email', label: 'Email',  Icon: MailOutlineIcon },
  { key: 'inapp', label: 'In-app', Icon: NotificationsNoneOutlinedIcon },
  { key: 'slack', label: 'Slack',  Icon: ForumOutlinedIcon },
]

function CustomCheckbox({ checked }) {
  return (
    <Box sx={{ width: 18, height: 18, borderRadius: '4px', border: '2px solid', borderColor: checked ? TEAL : 'rgba(0,0,0,0.28)', bgcolor: checked ? TEAL : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      {checked && <CheckIcon sx={{ fontSize: 11, color: '#fff' }} />}
    </Box>
  )
}

function RevealSection({ visible, children }) {
  return (
    <Box sx={{
      maxHeight: visible ? '5000px' : 0,
      opacity: visible ? 1 : 0,
      overflow: 'hidden',
      transition: visible ? 'max-height 0.5s ease, opacity 0.3s ease 0.05s' : 'max-height 0.35s ease, opacity 0.15s ease',
      pointerEvents: visible ? 'auto' : 'none',
    }}>
      {children}
    </Box>
  )
}

function FormCard({ children }) {
  return <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '8px', overflow: 'hidden' }}>{children}</Box>
}

function SectionHeader({ title, description }) {
  return (
    <Box sx={{ mb: 1.5 }}>
      <Typography sx={{ fontSize: '15px', fontWeight: 700 }}>{title}</Typography>
      {description && <Typography sx={{ fontSize: '13px', color: 'text.secondary', mt: 0.25 }}>{description}</Typography>}
    </Box>
  )
}

export default function CreateAlertPage() {
  const navigate   = useNavigate()
  const location   = useLocation()
  const preset     = location.state?.source ?? null  // { label, type } passed from Alerts page

  // Pre-populate from preset source context
  const presetSearchId = preset?.type === 'search'
    ? (SAVED_SEARCHES_LIST.find(s => s.name === preset.label)?.id ?? null)
    : null
  const presetBrand = preset?.type === 'brand'
    ? (BRAND_LIST.find(b => b.name === preset.label) ?? null)
    : null

  const [sourceType, setSourceType]               = useState(() => preset?.type ?? null)
  const [searchFilter, setSearchFilter]           = useState('')
  const [selectedSearchIds, setSelectedSearchIds] = useState(() => presetSearchId ? [presetSearchId] : [])
  const [brandFilter, setBrandFilter]             = useState('')
  const [selectedBrand, setSelectedBrand]         = useState(() => presetBrand)
  const [selectedTypeIds, setSelectedTypeIds]     = useState([])
  const [alertDelivery, setAlertDelivery]         = useState({})
  const [recipients]                              = useState([
    { id: 1, initials: 'AT', name: 'Antonio T.', email: 'tony.schibono@meltwater.com' },
  ])

  const sourceSelected =
    sourceType === 'search' ? selectedSearchIds.length > 0 :
    sourceType === 'brand'  ? selectedBrand !== null : false
  const alertTypeSelected = selectedTypeIds.length > 0
  const canCreate = sourceSelected && alertTypeSelected

  const handleSourceTypeChange = (type) => {
    if (sourceType === type) return
    setSourceType(type)
    setSelectedSearchIds([])
    setSelectedBrand(null)
    setSelectedTypeIds([])
    setAlertDelivery({})
    setSearchFilter('')
    setBrandFilter('')
  }

  const toggleSearch = (id) =>
    setSelectedSearchIds(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])

  const toggleType = (id) => {
    setSelectedTypeIds(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id)
      setAlertDelivery(d => ({ ...d, [id]: { email: true, inapp: true, slack: false } }))
      return [...prev, id]
    })
  }

  const toggleDelivery = (typeId, channel) => {
    setAlertDelivery(prev => ({
      ...prev,
      [typeId]: { ...(prev[typeId] || {}), [channel]: !(prev[typeId]?.[channel] ?? false) },
    }))
  }

  const currentGroups = sourceType === 'brand' ? BRAND_ALERT_TYPE_GROUPS : SEARCH_ALERT_TYPE_GROUPS
  const filteredSearches = SAVED_SEARCHES_LIST.filter(s => s.name.toLowerCase().includes(searchFilter.toLowerCase()))
  const filteredBrands = BRAND_LIST.filter(b => b.name.toLowerCase().includes(brandFilter.toLowerCase()))

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'background.default' }}>

      {/* Breadcrumb */}
      <Box sx={{ px: 3, py: 1.75, display: 'flex', alignItems: 'center', gap: 0.75, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', flexShrink: 0 }}>
        <IconButton size="small" onClick={() => navigate('/alerts')} sx={{ mr: 0.25, p: 0.5 }}>
          <ArrowBackIcon sx={{ fontSize: 18 }} />
        </IconButton>
        <Typography onClick={() => navigate('/alerts')} sx={{ fontSize: '13px', color: 'text.secondary', cursor: 'pointer', '&:hover': { color: TEAL } }}>
          Alerts
        </Typography>
        <Typography sx={{ fontSize: '13px', color: 'text.disabled', mx: 0.25 }}>/</Typography>
        <Typography sx={{ fontSize: '13px', fontWeight: 500, color: 'text.primary' }}>Create Alert</Typography>
      </Box>

      {/* Form */}
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Box sx={{ maxWidth: 640, mx: 'auto', px: 3, py: 4 }}>
          <Typography sx={{ fontSize: '22px', fontWeight: 700, mb: preset ? 2.5 : 4 }}>Create Alert</Typography>

          {/* Context banner — shown when arriving from a specific source */}
          {preset && (() => {
            const s = SOURCE_TYPE_STYLES[preset.type]
            return (
              <Box sx={{
                display: 'flex', alignItems: 'center', gap: 1.25,
                border: '1px solid', borderColor: s.color + '40',
                bgcolor: s.bgcolor, borderRadius: '8px',
                px: 2, py: 1.25, mb: 3.5,
              }}>
                <Box sx={{ width: 30, height: 30, borderRadius: '6px', bgcolor: s.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <s.Icon sx={{ fontSize: 15, color: s.color }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: '12px', color: 'text.secondary', mb: 0.2 }}>Adding alert to</Typography>
                  <Typography sx={{ fontSize: '13px', fontWeight: 700, color: s.color }}>{preset.label}</Typography>
                </Box>
                <Typography
                  sx={{ fontSize: '12px', color: 'text.secondary', cursor: 'pointer', '&:hover': { color: 'text.primary' } }}
                  onClick={() => navigate('/alerts/create', { replace: true, state: null })}
                >
                  Change
                </Typography>
              </Box>
            )
          })()}

          {/* Source type — hidden when preset source is locked in */}
          {!preset && <Box sx={{ mb: 3.5 }}>
            <SectionHeader title="Source type" description="What do you want to monitor?" />
            <Box sx={{ display: 'flex', gap: 1.5, mt: 1.5 }}>
              {[
                { value: 'search', label: 'Saved Search', Icon: SearchIcon, desc: 'Monitor keyword searches and boolean queries' },
                { value: 'brand',  label: 'Brand',        Icon: DiamondOutlinedIcon, desc: 'Monitor a specific brand or company' },
              ].map(opt => {
                const sel = sourceType === opt.value
                return (
                  <Box key={opt.value} onClick={() => handleSourceTypeChange(opt.value)}
                    sx={{ flex: 1, border: '1.5px solid', borderRadius: '10px', p: 2.25, cursor: 'pointer', borderColor: sel ? TEAL : 'divider', bgcolor: sel ? 'rgba(0,130,127,0.04)' : 'background.paper', '&:hover': { borderColor: sel ? TEAL : 'rgba(0,0,0,0.25)' }, transition: 'all 0.15s' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.25 }}>
                      <Box sx={{ width: 38, height: 38, borderRadius: '9px', bgcolor: sel ? 'rgba(0,130,127,0.12)' : 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <opt.Icon sx={{ fontSize: 18, color: sel ? TEAL : 'text.secondary' }} />
                      </Box>
                      {sel && <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: TEAL, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckIcon sx={{ fontSize: 12, color: '#fff' }} /></Box>}
                    </Box>
                    <Typography sx={{ fontSize: '14px', fontWeight: 700, color: sel ? TEAL : 'text.primary', mb: 0.375 }}>{opt.label}</Typography>
                    <Typography sx={{ fontSize: '12px', color: 'text.secondary', lineHeight: 1.45 }}>{opt.desc}</Typography>
                  </Box>
                )
              })}
            </Box>
          </Box>}

          {/* Saved search list — hidden when source is locked in from context */}
          <RevealSection visible={sourceType === 'search' && !preset}>
            <Box sx={{ mb: 3.5 }}>
              <SectionHeader title="Saved searches" description="Select one or more searches to monitor" />
              {selectedSearchIds.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 1.5 }}>
                  {selectedSearchIds.map(id => {
                    const s = SAVED_SEARCHES_LIST.find(x => x.id === id)
                    return <Chip key={id} label={s.name} size="small" onDelete={() => toggleSearch(id)} sx={{ bgcolor: 'rgba(0,130,127,0.1)', color: TEAL, '& .MuiChip-deleteIcon': { color: TEAL } }} />
                  })}
                </Box>
              )}
              <FormCard>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1.25, borderBottom: '1px solid', borderColor: 'divider', bgcolor: '#fff' }}>
                  <SearchIcon sx={{ fontSize: 15, color: 'text.disabled', flexShrink: 0 }} />
                  <Box component="input" placeholder="Filter searches…" value={searchFilter} onChange={e => setSearchFilter(e.target.value)}
                    sx={{ border: 'none', outline: 'none', fontSize: '13px', flex: 1, bgcolor: 'transparent', color: 'text.primary', '&::placeholder': { color: 'rgba(0,0,0,0.35)' } }} />
                </Box>
                {filteredSearches.map((s, i) => {
                  const sel = selectedSearchIds.includes(s.id)
                  return (
                    <Box key={s.id} onClick={() => toggleSearch(s.id)}
                      sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2.5, py: 1.625, borderBottom: i < filteredSearches.length - 1 ? '1px solid' : 'none', borderColor: 'rgba(0,0,0,0.06)', cursor: 'pointer', bgcolor: sel ? 'rgba(0,130,127,0.04)' : '#fff', '&:hover': { bgcolor: sel ? 'rgba(0,130,127,0.07)' : 'rgba(0,0,0,0.02)' } }}>
                      <CustomCheckbox checked={sel} />
                      <SearchIcon sx={{ fontSize: 14, color: 'text.disabled', flexShrink: 0 }} />
                      <Typography sx={{ fontSize: '13px', flex: 1, color: sel ? TEAL : 'text.primary', fontWeight: sel ? 500 : 400 }}>{s.name}</Typography>
                      <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>{s.type}</Typography>
                    </Box>
                  )
                })}
              </FormCard>
              <Typography sx={{ fontSize: '12px', color: 'text.secondary', mt: 1 }}>{selectedSearchIds.length} of {SAVED_SEARCHES_LIST.length} selected</Typography>
            </Box>
          </RevealSection>

          {/* Brand selection — hidden when source is locked in from context */}
          <RevealSection visible={sourceType === 'brand' && !preset}>
            <Box sx={{ mb: 3.5 }}>
              <SectionHeader title="Brand" description="Select a brand to monitor. Brands are sourced from your GenAI Lens configuration." />
              {selectedBrand && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, bgcolor: 'rgba(182,39,161,0.05)', border: '1.5px solid rgba(182,39,161,0.25)', borderRadius: '8px', px: 2, py: 1.25, mb: 1.5 }}>
                  <Box sx={{ width: 28, height: 28, borderRadius: '6px', bgcolor: 'rgba(182,39,161,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <DiamondOutlinedIcon sx={{ fontSize: 14, color: PURPLE }} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: '13px', fontWeight: 600, color: PURPLE }}>{selectedBrand.name}</Typography>
                    <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>{selectedBrand.sector}</Typography>
                  </Box>
                  <IconButton size="small" sx={{ p: 0.25 }} onClick={() => { setSelectedBrand(null); setSelectedTypeIds([]); setAlertDelivery({}) }}>
                    <CloseIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                </Box>
              )}
              <FormCard>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1.25, borderBottom: '1px solid', borderColor: 'divider', bgcolor: '#fff' }}>
                  <SearchIcon sx={{ fontSize: 15, color: 'text.disabled', flexShrink: 0 }} />
                  <Box component="input" placeholder="Search brands…" value={brandFilter} onChange={e => setBrandFilter(e.target.value)}
                    sx={{ border: 'none', outline: 'none', fontSize: '13px', flex: 1, bgcolor: 'transparent', color: 'text.primary', '&::placeholder': { color: 'rgba(0,0,0,0.35)' } }} />
                </Box>
                {filteredBrands.map((brand, i) => {
                  const sel = selectedBrand?.id === brand.id
                  return (
                    <Box key={brand.id} onClick={() => { setSelectedBrand(brand); setSelectedTypeIds([]); setAlertDelivery({}) }}
                      sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2.5, py: 1.625, borderBottom: i < filteredBrands.length - 1 ? '1px solid' : 'none', borderColor: 'rgba(0,0,0,0.06)', cursor: 'pointer', bgcolor: sel ? 'rgba(182,39,161,0.04)' : '#fff', '&:hover': { bgcolor: sel ? 'rgba(182,39,161,0.07)' : 'rgba(0,0,0,0.02)' } }}>
                      <Box sx={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid', borderColor: sel ? PURPLE : 'rgba(0,0,0,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {sel && <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: PURPLE }} />}
                      </Box>
                      <Box sx={{ width: 28, height: 28, borderRadius: '6px', bgcolor: 'rgba(182,39,161,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <DiamondOutlinedIcon sx={{ fontSize: 14, color: PURPLE }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: '13px', fontWeight: sel ? 600 : 400, color: sel ? PURPLE : 'text.primary' }}>{brand.name}</Typography>
                        <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>{brand.sector}</Typography>
                      </Box>
                    </Box>
                  )
                })}
              </FormCard>
              <Typography sx={{ fontSize: '12px', color: 'text.secondary', mt: 1 }}>
                Showing brands tracked in{' '}
                <Typography component="span" sx={{ fontSize: '12px', color: TEAL, fontWeight: 500, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>GenAI Lens</Typography>
                . To add brands, update your GenAI Lens configuration.
              </Typography>
            </Box>
          </RevealSection>

          {/* Alert types */}
          <RevealSection visible={sourceSelected}>
            <Box sx={{ mb: 3.5 }}>
              <SectionHeader title="Alert types" description="Choose which types of alerts to receive" />
              <FormCard>
                {currentGroups.map((group, gi) => (
                  <Box key={group.section}>
                    <Box sx={{ px: 2.5, py: 0.875, bgcolor: 'rgba(0,0,0,0.025)', borderBottom: '1px solid', borderColor: 'divider', borderTop: gi > 0 ? '1px solid' : 'none', borderTopColor: 'divider' }}>
                      <Typography sx={{ fontSize: '11px', fontWeight: 700, color: 'text.disabled', letterSpacing: '0.08em' }}>{group.section}</Typography>
                    </Box>
                    {group.types.map((type, ti) => {
                      const { Icon } = type
                      const sel = selectedTypeIds.includes(type.id)
                      const delivery = alertDelivery[type.id] || {}
                      return (
                        <Box key={type.id}>
                          <Box onClick={() => toggleType(type.id)}
                            sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, px: 2.5, py: 1.75, cursor: 'pointer', bgcolor: sel ? 'rgba(0,130,127,0.03)' : '#fff', '&:hover': { bgcolor: sel ? 'rgba(0,130,127,0.055)' : 'rgba(0,0,0,0.02)' }, borderBottom: ti < group.types.length - 1 && !sel ? '1px solid' : 'none', borderColor: 'rgba(0,0,0,0.06)' }}>
                            <Box sx={{ mt: '2px', flexShrink: 0 }}><CustomCheckbox checked={sel} /></Box>
                            <Box sx={{ width: 32, height: 32, borderRadius: '6px', flexShrink: 0, bgcolor: sel ? 'rgba(0,130,127,0.1)' : 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Icon sx={{ fontSize: 16, color: sel ? TEAL : 'text.secondary' }} />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.875 }}>
                                <Typography sx={{ fontSize: '13px', fontWeight: sel ? 600 : 500, color: sel ? TEAL : 'text.primary' }}>{type.name}</Typography>
                                {type.isNew && <Box sx={{ bgcolor: TEAL, color: '#fff', fontSize: '10px', fontWeight: 700, px: 0.75, py: 0.2, borderRadius: '4px', lineHeight: 1.6 }}>New</Box>}
                              </Box>
                              <Typography sx={{ fontSize: '12px', color: 'text.secondary', mt: 0.25, lineHeight: 1.45 }}>{type.desc}</Typography>
                            </Box>
                          </Box>
                          <RevealSection visible={sel}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2.5, py: 1.125, pl: 8.5, bgcolor: 'rgba(0,130,127,0.025)', borderBottom: '1px solid', borderColor: 'rgba(0,0,0,0.06)' }}>
                              <Typography sx={{ fontSize: '12px', color: 'text.secondary', fontWeight: 500, whiteSpace: 'nowrap' }}>Deliver via</Typography>
                              <Box sx={{ display: 'flex', gap: 0.75 }}>
                                {DELIVERY_CHANNELS.map(ch => {
                                  const on = delivery[ch.key] ?? false
                                  const ChIcon = ch.Icon
                                  return (
                                    <Box key={ch.key} onClick={e => { e.stopPropagation(); toggleDelivery(type.id, ch.key) }}
                                      sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, border: '1px solid', borderRadius: '20px', px: 1.25, py: 0.4, cursor: 'pointer', borderColor: on ? TEAL : 'rgba(0,0,0,0.2)', bgcolor: on ? 'rgba(0,130,127,0.09)' : 'transparent', '&:hover': { borderColor: on ? '#006e6b' : 'rgba(0,0,0,0.35)' }, transition: 'all 0.15s' }}>
                                      <ChIcon sx={{ fontSize: 13, color: on ? TEAL : 'text.secondary' }} />
                                      <Typography sx={{ fontSize: '12px', color: on ? TEAL : 'text.secondary', fontWeight: on ? 600 : 400, lineHeight: 1 }}>{ch.label}</Typography>
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
              <Typography sx={{ fontSize: '12px', color: 'text.secondary', mt: 1 }}>{selectedTypeIds.length} alert type{selectedTypeIds.length !== 1 ? 's' : ''} selected</Typography>
            </Box>
          </RevealSection>

          {/* Recipients */}
          <RevealSection visible={alertTypeSelected}>
            <Box sx={{ mb: 4 }}>
              <SectionHeader title="Recipients" description="Who should receive these alerts?" />
              <FormCard>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1.25, borderBottom: '1px solid', borderColor: 'divider', bgcolor: '#fff' }}>
                  <SearchIcon sx={{ fontSize: 15, color: 'text.disabled' }} />
                  <Typography sx={{ fontSize: '13px', color: 'text.disabled' }}>Search by name or email address</Typography>
                </Box>
                {recipients.map((r, i) => (
                  <Box key={r.id} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2.5, py: 1.25, borderBottom: i < recipients.length - 1 ? '1px solid' : 'none', borderColor: 'rgba(0,0,0,0.06)', bgcolor: '#fff' }}>
                    <Avatar sx={{ width: 30, height: 30, bgcolor: 'rgba(0,130,127,0.15)', color: TEAL, fontSize: '11px', fontWeight: 700 }}>{r.initials}</Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>{r.name}</Typography>
                      <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>{r.email}</Typography>
                    </Box>
                  </Box>
                ))}
              </FormCard>
            </Box>
          </RevealSection>

          {/* Footer */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1.5, pt: 2.5, mt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
            <Button variant="text" onClick={() => navigate('/alerts')} sx={{ color: 'text.secondary', textTransform: 'none', fontWeight: 500 }}>Cancel</Button>
            <Button variant="contained" disabled={!canCreate} startIcon={<AddIcon />} onClick={() => navigate('/alerts')}
              sx={{ bgcolor: TEAL, color: '#fff', textTransform: 'none', fontWeight: 600, borderRadius: '8px', px: 2.5, '&:hover': { bgcolor: '#006e6b' }, '&.Mui-disabled': { bgcolor: 'rgba(0,130,127,0.3)', color: 'rgba(255,255,255,0.8)' } }}>
              Create Alert
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

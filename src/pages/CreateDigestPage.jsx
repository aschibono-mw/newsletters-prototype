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
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined'
import RssFeedIcon from '@mui/icons-material/RssFeed'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'

const TEAL = '#00827F'
const PURPLE = '#B627A1'

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

const SCHEDULES = [
  { value: 'daily',   label: 'Daily',   desc: 'Delivered every morning at 8am' },
  { value: 'weekly',  label: 'Weekly',  desc: 'Delivered every Monday at 8am' },
  { value: 'monthly', label: 'Monthly', desc: 'Delivered on the 1st of each month' },
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
    <Box sx={{ maxHeight: visible ? '5000px' : 0, opacity: visible ? 1 : 0, overflow: 'hidden', transition: visible ? 'max-height 0.5s ease, opacity 0.3s ease 0.05s' : 'max-height 0.35s ease, opacity 0.15s ease', pointerEvents: visible ? 'auto' : 'none' }}>
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

export default function CreateDigestPage() {
  const navigate = useNavigate()

  const [digestName, setDigestName]           = useState('')
  const [sourceType, setSourceType]           = useState(null)
  const [searchFilter, setSearchFilter]       = useState('')
  const [selectedSearchIds, setSelectedSearchIds] = useState([])
  const [brandFilter, setBrandFilter]         = useState('')
  const [selectedBrand, setSelectedBrand]     = useState(null)
  const [schedule, setSchedule]               = useState(null)
  const [brandCompetitorQuery, setBrandCompetitorQuery] = useState('')
  const [selectedBrandCompetitors, setSelectedBrandCompetitors] = useState([])
  const [digestType, setDigestType]           = useState('standard')
  const [contentOptions, setContentOptions]   = useState({
    topStories: true,
    volumeSummary: true,
    alertHighlights: true,
    aiOverview: false,
  })
  const [recipients, setRecipients] = useState([
    { id: 1, initials: 'AT', name: 'Antonio T.', email: 'tony.schibono@meltwater.com' },
  ])
  const [recipientQuery, setRecipientQuery] = useState('')
  const [recipientFocused, setRecipientFocused] = useState(false)

  const sourceSelected =
    sourceType === 'search' ? selectedSearchIds.length > 0 :
    sourceType === 'brand'  ? selectedBrand !== null : false
  const scheduleSelected = schedule !== null
  const canCreate = digestName.trim().length > 0 && sourceSelected && scheduleSelected

  const handleSourceTypeChange = (type) => {
    if (sourceType === type) return
    setSourceType(type)
    setSelectedSearchIds([])
    setSelectedBrand(null)
    setSearchFilter('')
    setBrandFilter('')
    setSchedule(null)
  }

  const toggleSearch = (id) =>
    setSelectedSearchIds(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])

  const filteredSearches = SAVED_SEARCHES_LIST.filter(s => s.name.toLowerCase().includes(searchFilter.toLowerCase()))
  const filteredBrands = BRAND_LIST.filter(b => b.name.toLowerCase().includes(brandFilter.toLowerCase()))

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

  const addRecipient = (user) => {
    setRecipients(prev => [...prev, user])
    setRecipientQuery('')
  }

  const removeRecipient = (id) => setRecipients(prev => prev.filter(r => r.id !== id))

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'background.default' }}>

      {/* Breadcrumb */}
      <Box sx={{ px: 3, py: 1.75, display: 'flex', alignItems: 'center', gap: 0.75, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', flexShrink: 0 }}>
        <IconButton size="small" onClick={() => navigate('/digests')} sx={{ mr: 0.25, p: 0.5 }}>
          <ArrowBackIcon sx={{ fontSize: 18 }} />
        </IconButton>
        <Typography onClick={() => navigate('/digests')} sx={{ fontSize: '13px', color: 'text.secondary', cursor: 'pointer', '&:hover': { color: TEAL } }}>
          Digests
        </Typography>
        <Typography sx={{ fontSize: '13px', color: 'text.disabled', mx: 0.25 }}>/</Typography>
        <Typography sx={{ fontSize: '13px', fontWeight: 500, color: 'text.primary' }}>Create Digest</Typography>
      </Box>

      {/* Form */}
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Box sx={{ maxWidth: 640, mx: 'auto', px: 3, py: 4 }}>
          <Typography sx={{ fontSize: '22px', fontWeight: 700, mb: 4 }}>Create Digest</Typography>

          {/* Digest name */}
          <Box sx={{ mb: 3.5 }}>
            <SectionHeader title="Digest name" />
            <TextField fullWidth size="small" placeholder="e.g. Weekly Brand Roundup" value={digestName} onChange={e => setDigestName(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: TEAL } }} />
          </Box>

          {/* Source type */}
          <Box sx={{ mb: 3.5 }}>
            <SectionHeader title="Source type" description="What content should this digest summarise?" />
            <Box sx={{ display: 'flex', gap: 1.5, mt: 1.5 }}>
              {[
                { value: 'search', label: 'Saved Search', Icon: SearchIcon, desc: 'Summarise results from keyword searches' },
                { value: 'brand',  label: 'Brand',        Icon: DiamondOutlinedIcon, desc: 'Summarise coverage of a specific brand' },
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
          </Box>

          {/* Saved search list */}
          <RevealSection visible={sourceType === 'search'}>
            <Box sx={{ mb: 3.5 }}>
              <SectionHeader title="Saved searches" description="Select one or more searches to include in this digest" />
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

          {/* Brand selection */}
          <RevealSection visible={sourceType === 'brand'}>
            <Box sx={{ mb: 3.5 }}>
              <SectionHeader title="Brand" description="Select a brand to summarise. Brands are sourced from your GenAI Lens configuration." />
              {selectedBrand && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, bgcolor: 'rgba(182,39,161,0.05)', border: '1.5px solid rgba(182,39,161,0.25)', borderRadius: '8px', px: 2, py: 1.25, mb: 1.5 }}>
                  <Box sx={{ width: 28, height: 28, borderRadius: '6px', bgcolor: 'rgba(182,39,161,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <DiamondOutlinedIcon sx={{ fontSize: 14, color: PURPLE }} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: '13px', fontWeight: 600, color: PURPLE }}>{selectedBrand.name}</Typography>
                    <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>{selectedBrand.sector}</Typography>
                  </Box>
                  <IconButton size="small" sx={{ p: 0.25 }} onClick={() => { setSelectedBrand(null); setSchedule(null) }}>
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
                    <Box key={brand.id} onClick={() => { setSelectedBrand(brand); setSchedule(null) }}
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
            </Box>
          </RevealSection>

          {/* ── Brands & Competitors (new) ──────────────────────────── */}
          <RevealSection visible={sourceSelected}>
            <Box sx={{ mb: 3.5 }}>
              <SectionHeader
                title="Brands & Competitors"
                description="Add companies to include brand intelligence in the digest."
              />
              <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '8px', overflow: 'visible', position: 'relative' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1.25, bgcolor: '#fff', borderRadius: selectedBrandCompetitors.length > 0 ? '8px 8px 0 0' : '8px', borderBottom: selectedBrandCompetitors.length > 0 ? '1px solid' : 'none', borderColor: 'rgba(0,0,0,0.06)' }}>
                  <SearchIcon sx={{ fontSize: 15, color: 'text.disabled', flexShrink: 0 }} />
                  <Box
                    component="input"
                    placeholder="Search for a company or brand…"
                    value={brandCompetitorQuery}
                    onChange={e => setBrandCompetitorQuery(e.target.value)}
                    sx={{ border: 'none', outline: 'none', fontSize: '13px', flex: 1, bgcolor: 'transparent', color: 'text.primary', '&::placeholder': { color: 'rgba(0,0,0,0.35)' } }}
                  />
                  {brandCompetitorQuery && (
                    <IconButton size="small" sx={{ p: 0.25 }} onClick={() => setBrandCompetitorQuery('')}>
                      <CloseIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  )}
                </Box>
                {/* Inline suggestion — brand list filtered by query */}
                {brandCompetitorQuery.trim().length > 0 && (
                  <Box sx={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10, border: '1px solid', borderColor: 'divider', borderRadius: '0 0 8px 8px', bgcolor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden', mt: '-1px' }}>
                    {BRAND_LIST.filter(b =>
                      b.name.toLowerCase().includes(brandCompetitorQuery.toLowerCase()) &&
                      !selectedBrandCompetitors.some(s => s.id === b.id)
                    ).map((b, i, arr) => (
                      <Box key={b.id} onMouseDown={() => { setSelectedBrandCompetitors(p => [...p, b]); setBrandCompetitorQuery('') }}
                        sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2.5, py: 1.125, cursor: 'pointer', borderBottom: i < arr.length - 1 ? '1px solid' : 'none', borderColor: 'rgba(0,0,0,0.06)', '&:hover': { bgcolor: 'rgba(0,130,127,0.04)' } }}>
                        <Box sx={{ width: 28, height: 28, borderRadius: '6px', bgcolor: 'rgba(182,39,161,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <DiamondOutlinedIcon sx={{ fontSize: 14, color: PURPLE }} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography sx={{ fontSize: '13px', fontWeight: 500 }}>{b.name}</Typography>
                          <Typography sx={{ fontSize: '11px', color: 'text.secondary' }}>{b.sector}</Typography>
                        </Box>
                        <Typography sx={{ fontSize: '12px', color: TEAL, fontWeight: 500 }}>Add</Typography>
                      </Box>
                    ))}
                    {BRAND_LIST.filter(b =>
                      b.name.toLowerCase().includes(brandCompetitorQuery.toLowerCase()) &&
                      !selectedBrandCompetitors.some(s => s.id === b.id)
                    ).length === 0 && (
                      <Box sx={{ px: 2.5, py: 1.5 }}>
                        <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>No brands found</Typography>
                      </Box>
                    )}
                  </Box>
                )}
                {/* Added brands */}
                {selectedBrandCompetitors.map((b, i) => (
                  <Box key={b.id} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2.5, py: 1.125, borderBottom: i < selectedBrandCompetitors.length - 1 ? '1px solid' : 'none', borderColor: 'rgba(0,0,0,0.06)', bgcolor: '#fff' }}>
                    <Box sx={{ width: 28, height: 28, borderRadius: '6px', bgcolor: 'rgba(182,39,161,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <DiamondOutlinedIcon sx={{ fontSize: 14, color: PURPLE }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>{b.name}</Typography>
                      <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>{b.sector}</Typography>
                    </Box>
                    <IconButton size="small" sx={{ p: 0.375, opacity: 0.4, '&:hover': { opacity: 1 } }} onClick={() => setSelectedBrandCompetitors(p => p.filter(x => x.id !== b.id))}>
                      <CloseIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Box>
                ))}
              </Box>
              <Typography sx={{ fontSize: '12px', color: 'text.secondary', mt: 1 }}>
                Optional — adds brand intelligence sections to the digest
              </Typography>
            </Box>
          </RevealSection>

          {/* Schedule */}
          <RevealSection visible={sourceSelected}>
            <Box sx={{ mb: 3.5 }}>
              <SectionHeader title="Schedule" description="How often should this digest be delivered?" />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {SCHEDULES.map(s => {
                  const sel = schedule === s.value
                  return (
                    <Box key={s.value} onClick={() => setSchedule(s.value)}
                      sx={{ display: 'flex', alignItems: 'center', gap: 2, border: '1.5px solid', borderRadius: '10px', p: 2, cursor: 'pointer', borderColor: sel ? TEAL : 'divider', bgcolor: sel ? 'rgba(0,130,127,0.04)' : 'background.paper', '&:hover': { borderColor: sel ? TEAL : 'rgba(0,0,0,0.25)' }, transition: 'all 0.15s' }}>
                      <Box sx={{ width: 36, height: 36, borderRadius: '8px', bgcolor: sel ? 'rgba(0,130,127,0.12)' : 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <CalendarMonthOutlinedIcon sx={{ fontSize: 18, color: sel ? TEAL : 'text.secondary' }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 700, color: sel ? TEAL : 'text.primary' }}>{s.label}</Typography>
                        <Typography sx={{ fontSize: '12px', color: 'text.secondary', mt: 0.25 }}>{s.desc}</Typography>
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

          {/* ── Digest Type (new) ───────────────────────────────────── */}
          <RevealSection visible={scheduleSelected}>
            <Box sx={{ mb: 3.5 }}>
              <SectionHeader title="Digest type" description="Each type sends a separate scheduled email." />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>

                {/* Standard Digest */}
                <Box
                  onClick={() => setDigestType('standard')}
                  sx={{
                    border: '1.5px solid',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    borderColor: digestType === 'standard' ? TEAL : 'divider',
                    bgcolor: digestType === 'standard' ? 'rgba(0,130,127,0.04)' : 'background.paper',
                    overflow: 'hidden',
                    transition: 'all 0.15s',
                    '&:hover': { borderColor: digestType === 'standard' ? TEAL : 'rgba(0,0,0,0.25)' },
                  }}
                >
                  {/* Row */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
                    <Box sx={{ width: 36, height: 36, borderRadius: '8px', bgcolor: digestType === 'standard' ? 'rgba(0,130,127,0.12)' : 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <ArticleOutlinedIcon sx={{ fontSize: 18, color: digestType === 'standard' ? TEAL : 'text.secondary' }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontSize: '14px', fontWeight: 700, color: digestType === 'standard' ? TEAL : 'text.primary' }}>Standard Digest</Typography>
                      <Typography sx={{ fontSize: '12px', color: 'text.secondary', mt: 0.25 }}>Top stories, volume summary, and alert highlights</Typography>
                    </Box>
                    <Box sx={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid', borderColor: digestType === 'standard' ? TEAL : 'rgba(0,0,0,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {digestType === 'standard' && <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: TEAL }} />}
                    </Box>
                  </Box>

                  {/* Content options — visible when selected */}
                  {digestType === 'standard' && (
                    <Box
                      onClick={e => e.stopPropagation()}
                      sx={{ px: 2.5, pb: 2, pt: 0.5, borderTop: '1px solid', borderColor: 'rgba(0,130,127,0.15)', bgcolor: 'rgba(0,130,127,0.02)', display: 'flex', flexDirection: 'column', gap: 1.25 }}
                    >
                      <Typography sx={{ fontSize: '12px', fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.06em', mt: 1.25, mb: 0.25 }}>
                        Content sections
                      </Typography>
                      {[
                        { key: 'topStories',      label: 'Top Stories',      desc: 'Most-read and highest-reach articles from this period' },
                        { key: 'volumeSummary',   label: 'Volume Summary',   desc: 'Mention count and trend chart' },
                        { key: 'alertHighlights', label: 'Alert Highlights', desc: 'Mentions that triggered your tracker alerts' },
                      ].map(opt => (
                        <Box key={opt.key}
                          onClick={() => setContentOptions(p => ({ ...p, [opt.key]: !p[opt.key] }))}
                          sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer', '&:hover': { opacity: 0.85 } }}
                        >
                          <CustomCheckbox checked={contentOptions[opt.key]} />
                          <Box>
                            <Typography sx={{ fontSize: '13px', fontWeight: contentOptions[opt.key] ? 600 : 400, color: contentOptions[opt.key] ? 'text.primary' : 'text.secondary' }}>{opt.label}</Typography>
                            <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>{opt.desc}</Typography>
                          </Box>
                        </Box>
                      ))}

                      {/* AI Overview — styled distinctly */}
                      <Box sx={{ mt: 0.5, pt: 1.25, borderTop: '1px dashed rgba(182,39,161,0.2)' }}>
                        <Box
                          onClick={() => setContentOptions(p => ({ ...p, aiOverview: !p.aiOverview }))}
                          sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, cursor: 'pointer', '&:hover': { opacity: 0.85 } }}
                        >
                          <CustomCheckbox checked={contentOptions.aiOverview} />
                          <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography sx={{ fontSize: '13px', fontWeight: contentOptions.aiOverview ? 600 : 400, color: contentOptions.aiOverview ? PURPLE : 'text.secondary' }}>
                                AI Overview
                              </Typography>
                              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.4, bgcolor: 'rgba(182,39,161,0.1)', px: 0.75, py: 0.2, borderRadius: '4px' }}>
                                <AutoAwesomeIcon sx={{ fontSize: 11, color: PURPLE }} />
                                <Typography sx={{ fontSize: '10px', fontWeight: 700, color: PURPLE, lineHeight: 1.6 }}>Beta</Typography>
                              </Box>
                            </Box>
                            <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>AI-generated summary placed at the top of the digest</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Box>

                {/* Trends Center Digest — coming soon */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, border: '1.5px solid', borderRadius: '10px', p: 2, borderColor: 'divider', bgcolor: 'background.paper', opacity: 0.6 }}>
                  <Box sx={{ width: 36, height: 36, borderRadius: '8px', bgcolor: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <TrendingUpIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography sx={{ fontSize: '14px', fontWeight: 700, color: 'text.secondary' }}>Trends Center Digest</Typography>
                      <Chip label="Coming soon" size="small" sx={{ height: 18, fontSize: '10px', bgcolor: 'rgba(0,0,0,0.07)', color: 'text.secondary' }} />
                    </Box>
                    <Typography sx={{ fontSize: '12px', color: 'text.secondary', mt: 0.25 }}>Trending hashtags and topics — separate email</Typography>
                  </Box>
                  <Box sx={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid rgba(0,0,0,0.2)', flexShrink: 0 }} />
                </Box>

                {/* Risk Categories Digest — coming soon */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, border: '1.5px solid', borderRadius: '10px', p: 2, borderColor: 'divider', bgcolor: 'background.paper', opacity: 0.6 }}>
                  <Box sx={{ width: 36, height: 36, borderRadius: '8px', bgcolor: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ShieldOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography sx={{ fontSize: '14px', fontWeight: 700, color: 'text.secondary' }}>Risk Categories Digest</Typography>
                      <Chip label="Coming soon" size="small" sx={{ height: 18, fontSize: '10px', bgcolor: 'rgba(0,0,0,0.07)', color: 'text.secondary' }} />
                    </Box>
                    <Typography sx={{ fontSize: '12px', color: 'text.secondary', mt: 0.25 }}>AI reputation risk assessment — separate email</Typography>
                  </Box>
                  <Box sx={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid rgba(0,0,0,0.2)', flexShrink: 0 }} />
                </Box>

              </Box>
            </Box>
          </RevealSection>

          {/* Recipients */}
          <RevealSection visible={scheduleSelected}>
            <Box sx={{ mb: 4 }}>
              <SectionHeader title="Recipients" description="Who should receive this digest?" />
              <Box sx={{ border: '1px solid', borderColor: recipientFocused ? TEAL : 'divider', borderRadius: '8px', overflow: 'visible', transition: 'border-color 0.15s', position: 'relative' }}>
                {/* Search input */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1.25, borderBottom: recipients.length > 0 ? '1px solid' : 'none', borderColor: 'rgba(0,0,0,0.06)', bgcolor: '#fff', borderRadius: recipients.length > 0 ? '8px 8px 0 0' : '8px' }}>
                  <SearchIcon sx={{ fontSize: 15, color: recipientFocused ? TEAL : 'text.disabled', flexShrink: 0, transition: 'color 0.15s' }} />
                  <Box
                    component="input"
                    placeholder="Search by name or email address"
                    value={recipientQuery}
                    onChange={e => setRecipientQuery(e.target.value)}
                    onFocus={() => setRecipientFocused(true)}
                    onBlur={() => { setTimeout(() => setRecipientFocused(false), 150) }}
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
                {recipients.length} recipient{recipients.length !== 1 ? 's' : ''}
              </Typography>
            </Box>
          </RevealSection>

          {/* Footer */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1.5, pt: 2.5, mt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
            <Button variant="text" onClick={() => navigate('/digests')} sx={{ color: 'text.secondary', textTransform: 'none', fontWeight: 500 }}>Cancel</Button>
            <Button variant="contained" disabled={!canCreate} startIcon={<AddIcon />} onClick={() => navigate('/digests')}
              sx={{ bgcolor: TEAL, color: '#fff', textTransform: 'none', fontWeight: 600, borderRadius: '8px', px: 2.5, '&:hover': { bgcolor: '#006e6b' }, '&.Mui-disabled': { bgcolor: 'rgba(0,130,127,0.3)', color: 'rgba(255,255,255,0.8)' } }}>
              Create Digest
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

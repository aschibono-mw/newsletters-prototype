import { useState, useRef, useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Box, Button, Chip, Divider, IconButton, InputBase, Tab, Tabs, Tooltip,
  Typography, Menu, MenuItem, LinearProgress, Switch, Popover, Slider, Select, FormControl, InputLabel,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import TrackChangesOutlinedIcon from '@mui/icons-material/TrackChangesOutlined'
import UndoIcon from '@mui/icons-material/Undo'
import RedoIcon from '@mui/icons-material/Redo'
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined'
import ViewModuleOutlinedIcon from '@mui/icons-material/ViewModuleOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import AddIcon from '@mui/icons-material/Add'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import TuneIcon from '@mui/icons-material/Tune'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined'
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'
import ViewStreamOutlinedIcon from '@mui/icons-material/ViewStreamOutlined'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CheckIcon from '@mui/icons-material/Check'
import SortIcon from '@mui/icons-material/Sort'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined'
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import SearchIcon from '@mui/icons-material/Search'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import CodeIcon from '@mui/icons-material/Code'
import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined'
import WebOutlinedIcon from '@mui/icons-material/WebOutlined'
import ViewHeadlineOutlinedIcon from '@mui/icons-material/ViewHeadlineOutlined'
import CropOriginalOutlinedIcon from '@mui/icons-material/CropOriginalOutlined'
import NotesOutlinedIcon from '@mui/icons-material/NotesOutlined'
import TableRowsOutlinedIcon from '@mui/icons-material/TableRowsOutlined'
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import DonutLargeOutlinedIcon from '@mui/icons-material/DonutLargeOutlined'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined'
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined'
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined'
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'

// ── Constants ──────────────────────────────────────────────────────────────────
const TEAL       = '#00827F'
const TEAL_LIGHT = 'rgba(0,130,127,0.08)'
const AMBER  = '#b45309'
const PURPLE = '#B627A1'

// ── Series colours ─────────────────────────────────────────────────────────────
const SERIES_COLORS = {
  'daily-brief':       '#00827F',
  'monthly-roundup':   '#B627A1',
  'media-coverage':    '#e86c5a',
  'competitor-digest': '#4F6AF5',
}

// ── Series lookup ──────────────────────────────────────────────────────────────
const SERIES_META = {
  'daily-brief':      { name: 'The Daily Brief',       edition: 'April 20, 2026', cadence: 'Daily',   status: 'curating', sources: ['Explore', 'Monitor'] },
  'monthly-roundup':  { name: 'Monthly Round Up',      edition: 'April 2026',     cadence: 'Monthly', status: 'curating', sources: ['Explore', 'Analyze', 'Monitor'] },
  'media-coverage':   { name: 'Media Coverage Monthly',edition: 'April 2026',     cadence: 'Monthly', status: 'ready',    sources: ['Explore', 'Monitor'] },
  'competitor-digest':{ name: 'Competitor Digest',     edition: 'Week of Apr 14', cadence: 'Weekly',  status: 'curating', sources: ['Explore', 'Analyze'] },
}

const SOURCE_CFG = {
  Explore:  { Icon: ExploreOutlinedIcon,    color: '#4F6AF5', bg: 'rgba(79,106,245,0.10)',  label: 'Explore' },
  Analyze:  { Icon: BarChartOutlinedIcon,   color: '#e86c5a', bg: 'rgba(232,108,90,0.10)',  label: 'Analyze' },
  Monitor:  { Icon: ViewStreamOutlinedIcon, color: TEAL,      bg: 'rgba(0,130,127,0.08)',    label: 'Monitor' },
  Searches: { Icon: ManageSearchIcon,       color: '#7c3aed', bg: 'rgba(124,58,237,0.09)',  label: 'Saved searches' },
}

// ── Auto-curated articles data ────────────────────────────────────────────────
const CURATED_ARTICLES = [
  {
    id: 9, source: 'Competitor Monitor', type: 'Monitor', country: '', date: 'Apr 20, 6:00 AM',
    headline: 'Competitor share-of-voice shift: your brand up 12% this month',
    excerpt: 'Your Monitor streams detected a significant share-of-voice gain versus key competitors, driven by product launch coverage and exec thought leadership.',
    sentiment: 'Positive', reach: '—', origin: 'Monitor', added: true,
    aiSummary: 'Brand share-of-voice increased 12% MoM, outperforming the category average of 4%. Competitor A saw a 7% decline coinciding with a product recall story.',
    similar: 0, ave: null, avatarColor: '#00827F', matchScore: 97,
    aiReason: 'Competitive signal your readers can act on — share-of-voice shifts are a consistent click driver in this series.',
  },
  {
    id: 2, source: 'Financial Times', type: 'News', country: 'GB', date: 'Apr 20, 8:30 AM',
    headline: 'AI-driven media monitoring transforms PR strategy for enterprise brands',
    excerpt: 'Leading companies are shifting from reactive to proactive media management using AI-powered monitoring platforms.',
    sentiment: 'Positive', reach: '2.8M', origin: 'Explore', added: true,
    aiSummary: 'AI-powered media monitoring is enabling enterprise PR teams to shift from reactive to proactive strategies, with leading brands reporting significant gains in coverage quality and stakeholder engagement.',
    similar: 34, ave: '$28K', avatarColor: '#c9a14a', matchScore: 94,
    aiReason: 'High reach & strong positive sentiment on a topic your audience consistently engages with.',
  },
  {
    id: 5, source: 'Brand Watch Monitor', type: 'Monitor', country: '', date: 'Apr 20, 7:00 AM',
    headline: 'Top trending brand conversations this week',
    excerpt: 'Your Monitor view surfaced 847 new brand mentions this week, with 73% rated positive sentiment. Key topics: sustainability, product launches.',
    sentiment: 'Positive', reach: '—', origin: 'Monitor', added: true,
    aiSummary: null, similar: 0, ave: null, avatarColor: '#00827F', matchScore: 91,
    aiReason: 'Surfaces your highest-volume brand signal this week — keeps readers close to real-time brand health.',
  },
  {
    id: 10, source: 'Wall Street Journal', type: 'News', country: 'US', date: 'Apr 17, 9:00 AM',
    headline: 'Enterprise software brands gain share as legacy vendors struggle',
    excerpt: 'A wave of enterprise software consolidation is reshaping competitive dynamics, with AI-first vendors gaining significant ground in Q1 2026.',
    sentiment: 'Neutral', reach: '5.4M', origin: 'Analyze', added: true,
    aiSummary: null, similar: 143, ave: '$54K', avatarColor: '#003a6e', matchScore: 89,
    aiReason: 'Highest reach article this cycle — broad industry context that sets up your competitive coverage.',
  },
  {
    id: 7, source: 'PR Week', type: 'News', country: 'GB', date: 'Apr 19, 10:30 AM',
    headline: 'Earned media value hits five-year high as trust in paid ads declines',
    excerpt: 'New industry data shows earned media is generating 3× more trust than paid placements, pushing comms teams to invest heavily in coverage quality.',
    sentiment: 'Positive', reach: '780k', origin: 'Explore', added: true,
    aiSummary: null, similar: 19, ave: '$7.8K', avatarColor: '#e91e8c', matchScore: 86,
    aiReason: "Directly relevant to your audience's KPIs — earned media ROI is a top recurring theme in past editions.",
  },
  {
    id: 8, source: 'Digiday', type: 'News', country: 'US', date: 'Apr 18, 3:45 PM',
    headline: 'Why media relations is back at the top of the CMO agenda',
    excerpt: 'After years of social-first thinking, marketing leaders are returning to earned media as a core brand-building lever in 2026.',
    sentiment: 'Positive', reach: '1.1M', origin: 'Explore', added: true,
    aiSummary: null, similar: 8, ave: '$11K', avatarColor: '#1da1f2', matchScore: 82,
    aiReason: "Aligns with the edition's theme and mirrors topics your subscribers clicked most in the last 3 editions.",
  },
  {
    id: 3, source: 'TechCrunch', type: 'News', country: 'US', date: 'Apr 19, 4:00 PM',
    headline: 'Meltwater study: 67% of comms teams now use AI for content curation',
    excerpt: 'New research shows rapid adoption of AI tools in communications departments, with newsletter automation cited as a top use case.',
    sentiment: 'Positive', reach: '1.6M', origin: 'Explore', added: false,
    aiSummary: null, similar: 22, ave: '$16K', avatarColor: '#0d9b5b', matchScore: 74,
    aiReason: null,
  },
  {
    id: 4, source: 'Bloomberg', type: 'News', country: 'US', date: 'Apr 19, 2:15 PM',
    headline: 'Competitor media spend analysis: Q1 2026 industry report',
    excerpt: 'New analysis reveals significant shifts in competitor media investment and earned media strategies across key verticals.',
    sentiment: 'Neutral', reach: '3.1M', origin: 'Analyze', added: false,
    aiSummary: null, similar: 61, ave: '$31K', avatarColor: '#4a90d9', matchScore: 69,
    aiReason: null,
  },
  {
    id: 1, source: 'Reuters', type: 'News', country: 'GB', date: 'Apr 20, 9:14 AM',
    headline: 'Global brands report record media coverage in Q1 2026',
    excerpt: 'Brands across tech, finance and consumer goods saw a 34% increase in earned media coverage compared to the same period last year.',
    sentiment: 'Positive', reach: '4.2M', origin: 'Explore', added: false,
    aiSummary: null, similar: 87, ave: '$42K', avatarColor: '#e85d04', matchScore: 65,
    aiReason: null,
  },
  {
    id: 12, source: 'The Guardian', type: 'News', country: 'GB', date: 'Apr 20, 6:45 AM',
    headline: 'Media trust reaches decade high as audiences return to established outlets',
    excerpt: 'New survey data shows readers are gravitating back to premium editorial brands, with newsletter subscriptions up 41% year-on-year.',
    sentiment: 'Positive', reach: '3.8M', origin: 'Searches', added: false,
    aiSummary: null, similar: 29, ave: '$38K', avatarColor: '#1a6b3c', matchScore: 61,
  },
  {
    id: 13, source: 'Campaign', type: 'News', country: 'GB', date: 'Apr 19, 3:30 PM',
    headline: 'CMOs rank earned media as top channel for brand credibility in 2026',
    excerpt: 'A global survey of 300 senior marketers places earned media ahead of paid and owned channels for building long-term brand equity.',
    sentiment: 'Positive', reach: '1.4M', origin: 'Searches', added: false,
    aiSummary: null, similar: 17, ave: '$14K', avatarColor: '#b45309', matchScore: 57,
  },
  {
    id: 6, source: 'Wired', type: 'News', country: 'US', date: 'Apr 18, 11:00 AM',
    headline: 'The newsletter renaissance: why brands are doubling down on email',
    excerpt: 'Despite social media dominance, branded newsletters are seeing a resurgence with open rates exceeding 40% for curated content.',
    sentiment: 'Positive', reach: '900k', origin: 'Explore', added: false,
    aiSummary: null, similar: 11, ave: '$9K', avatarColor: '#7B68EE', matchScore: 52,
    aiReason: null,
  },
  {
    id: 11, source: 'Marketing Week', type: 'News', country: 'GB', date: 'Apr 17, 2:00 PM',
    headline: 'Brands that publish more than 3× weekly see 28% higher brand recall',
    excerpt: 'A longitudinal study of 500 mid-market brands finds consistent content cadence is a stronger predictor of brand recall than spend alone.',
    sentiment: 'Positive', reach: '620k', origin: 'Explore', added: false,
    aiSummary: null, similar: 6, ave: '$6.2K', avatarColor: '#ff4081', matchScore: 44,
  },
]

// ── Sentiment chip ─────────────────────────────────────────────────────────────
function SentimentChip({ value }) {
  const colors = {
    Positive: { bg: 'rgba(0,160,70,0.09)', color: '#1a7a45' },
    Neutral:  { bg: 'rgba(0,0,0,0.06)',    color: '#555' },
    Negative: { bg: 'rgba(220,50,50,0.09)',color: '#c0392b' },
  }
  const c = colors[value] || colors.Neutral
  return (
    <Box sx={{ display: 'inline-flex', px: 0.9, py: 0.25, borderRadius: '4px', bgcolor: c.bg }}>
      <Typography sx={{ fontSize: '11px', fontWeight: 600, color: c.color }}>{value}</Typography>
    </Box>
  )
}

// ── Source tag ─────────────────────────────────────────────────────────────────
function SourceTag({ origin }) {
  const cfg = SOURCE_CFG[origin]
  if (!cfg) return null
  const { Icon, color, bg } = cfg
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.4, bgcolor: bg, borderRadius: '4px', px: 0.75, py: 0.2 }}>
      <Icon sx={{ fontSize: 11, color }} />
      <Typography sx={{ fontSize: '10px', fontWeight: 600, color }}>{origin}</Typography>
    </Box>
  )
}

// ── Audiocast canvas block ────────────────────────────────────────────────────
function AudiocastBlock({ generating, playing, onPlayPause, onRemove, accentColor }) {
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= 100) { clearInterval(intervalRef.current); return 100 }
          return p + 0.3
        })
      }, 100)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [playing])

  const totalSecs = 312 // 5:12
  const currentSecs = Math.round((progress / 100) * totalSecs)
  const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  return (
    <Box sx={{
      mx: 3, mb: 2, mt: 1, border: `1.5px solid ${accentColor}30`,
      borderRadius: '8px', overflow: 'hidden',
      position: 'relative',
      '& .block-controls': { opacity: 0 },
      '&:hover .block-controls': { opacity: 1 },
    }}>
      {/* Hover controls */}
      <Box className="block-controls" sx={{ position: 'absolute', top: 6, right: 6, display: 'flex', gap: 0.5, transition: 'opacity 0.15s', zIndex: 1 }}>
        <Tooltip title="Move up"><IconButton size="small" sx={{ bgcolor: 'rgba(255,255,255,0.9)', width: 24, height: 24 }}><KeyboardArrowUpIcon sx={{ fontSize: 14 }} /></IconButton></Tooltip>
        <Tooltip title="Move down"><IconButton size="small" sx={{ bgcolor: 'rgba(255,255,255,0.9)', width: 24, height: 24 }}><KeyboardArrowDownIcon sx={{ fontSize: 14 }} /></IconButton></Tooltip>
        <Tooltip title="Remove"><IconButton size="small" onClick={onRemove} sx={{ bgcolor: 'rgba(255,255,255,0.9)', width: 24, height: 24, '&:hover': { color: 'error.main' } }}><DeleteOutlineIcon sx={{ fontSize: 14 }} /></IconButton></Tooltip>
      </Box>

      {generating ? (
        /* Generating state */
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 3, gap: 1.5, bgcolor: `${accentColor}06` }}>
          <CampaignOutlinedIcon sx={{ fontSize: 28, color: accentColor, opacity: 0.5, animation: 'pulse 1.4s ease-in-out infinite', '@keyframes pulse': { '0%,100%': { opacity: 0.3 }, '50%': { opacity: 0.8 } } }} />
          <Typography sx={{ fontSize: '12px', color: 'text.disabled', fontStyle: 'italic' }}>Generating audiocast…</Typography>
          <LinearProgress sx={{ width: 120, borderRadius: 4, '& .MuiLinearProgress-bar': { bgcolor: accentColor } }} />
        </Box>
      ) : (
        /* Player state */
        <Box sx={{ bgcolor: `${accentColor}06` }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, pt: 1.5, pb: 0.5 }}>
            <CampaignOutlinedIcon sx={{ fontSize: 13, color: accentColor, opacity: 0.8 }} />
            <Typography sx={{ fontSize: '11px', fontWeight: 700, color: accentColor, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Audiocast</Typography>
          </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, pb: 1.5 }}>
          <IconButton
            size="small"
            onClick={onPlayPause}
            sx={{ width: 32, height: 32, bgcolor: accentColor, color: '#fff', flexShrink: 0, '&:hover': { bgcolor: accentColor, opacity: 0.85 } }}
          >
            {playing ? <PauseIcon sx={{ fontSize: 18 }} /> : <PlayArrowIcon sx={{ fontSize: 18 }} />}
          </IconButton>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Slider
              value={progress}
              onChange={(_, v) => setProgress(v)}
              size="small"
              sx={{
                color: accentColor, p: 0, height: 3,
                '& .MuiSlider-thumb': { width: 10, height: 10 },
                '& .MuiSlider-rail': { opacity: 0.25 },
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.25 }}>
              <Typography sx={{ fontSize: '10px', color: 'text.secondary' }}>{fmt(currentSecs)}</Typography>
              <Typography sx={{ fontSize: '10px', color: 'text.disabled' }}>{fmt(totalSecs)}</Typography>
            </Box>
          </Box>
          <VolumeUpOutlinedIcon sx={{ fontSize: 16, color: 'text.disabled', flexShrink: 0 }} />
        </Box>
        </Box>
      )}
    </Box>
  )
}

// ── Create Audiocast side panel ───────────────────────────────────────────────
function AudiocastPanel({ onClose, onAdd, generated, onRegenerate }) {
  const [maxLength, setMaxLength] = useState(25)
  const [voice, setVoice] = useState('Sarah')
  const [tone, setTone] = useState('Professional')
  const [previewPlaying, setPreviewPlaying] = useState(false)

  return (
    <Box sx={{ width: 340, flexShrink: 0, display: 'flex', flexDirection: 'column', bgcolor: 'background.paper', borderLeft: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
      {/* Header */}
      <Box sx={{ px: 2.5, pt: 2, pb: 1.5, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CampaignOutlinedIcon sx={{ fontSize: 18, color: TEAL }} />
          <Typography sx={{ fontWeight: 700, fontSize: '14px' }}>Create Audiocast</Typography>
        </Box>
        <IconButton size="small" onClick={onClose} sx={{ color: 'text.disabled' }}>
          <CloseIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>

      {/* Body */}
      <Box sx={{ flex: 1, overflow: 'auto', px: 2.5, py: 2 }}>
        <Typography sx={{ fontSize: '12px', color: 'text.secondary', mb: 2.5, lineHeight: 1.6 }}>
          Convert your newsletter content into an AI-generated audiocast episode.
        </Typography>

        {/* Max Length */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography sx={{ fontSize: '12px', fontWeight: 600, color: 'text.primary' }}>Max Length</Typography>
            <Typography sx={{ fontSize: '12px', color: TEAL, fontWeight: 600 }}>{maxLength} seconds</Typography>
          </Box>
          <Slider
            value={maxLength}
            min={10}
            max={60}
            onChange={(_, v) => setMaxLength(v)}
            sx={{ color: TEAL, '& .MuiSlider-thumb': { width: 16, height: 16 }, '& .MuiSlider-rail': { opacity: 0.2 } }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.25 }}>
            <Typography sx={{ fontSize: '10px', color: 'text.disabled' }}>10 seconds</Typography>
            <Typography sx={{ fontSize: '10px', color: 'text.disabled' }}>1 min</Typography>
          </Box>
        </Box>

        {/* Voice */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ fontSize: '12px' }}>Voice</InputLabel>
              <Select
                value={voice}
                label="Voice"
                onChange={e => setVoice(e.target.value)}
                sx={{ fontSize: '13px' }}
              >
                {['Sarah', 'James', 'Priya', 'Marcus', 'Elena'].map(v => (
                  <MenuItem key={v} value={v} sx={{ fontSize: '13px' }}>{v}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Tooltip title="Preview voice">
              <IconButton
                size="small"
                onClick={() => setPreviewPlaying(v => !v)}
                sx={{ flexShrink: 0, color: previewPlaying ? TEAL : 'text.disabled', border: '1px solid', borderColor: previewPlaying ? TEAL : 'divider', borderRadius: '8px', p: 0.75 }}
              >
                {previewPlaying ? <PauseIcon sx={{ fontSize: 16 }} /> : <VolumeUpOutlinedIcon sx={{ fontSize: 16 }} />}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Tone */}
        <Box sx={{ mb: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel sx={{ fontSize: '12px' }}>Tone</InputLabel>
            <Select
              value={tone}
              label="Tone"
              onChange={e => setTone(e.target.value)}
              sx={{ fontSize: '13px' }}
            >
              {['Professional', 'Conversational', 'Energetic', 'Calm', 'Authoritative'].map(t => (
                <MenuItem key={t} value={t} sx={{ fontSize: '13px' }}>{t}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Footer actions */}
      <Box sx={{ px: 2.5, py: 2, borderTop: '1px solid', borderColor: 'divider', display: 'flex', gap: 1 }}>
        {generated ? (
          <Button
            fullWidth
            variant="contained"
            startIcon={<RefreshOutlinedIcon sx={{ fontSize: 15 }} />}
            onClick={onRegenerate}
            sx={{ bgcolor: TEAL, color: '#fff', textTransform: 'none', fontWeight: 600, fontSize: '13px', '&:hover': { bgcolor: '#006b68' } }}
          >
            Regenerate Audiocast
          </Button>
        ) : (
          <>
            <Button
              fullWidth
              variant="contained"
              startIcon={<CampaignOutlinedIcon sx={{ fontSize: 15 }} />}
              onClick={onAdd}
              sx={{ bgcolor: TEAL, color: '#fff', textTransform: 'none', fontWeight: 600, fontSize: '13px', '&:hover': { bgcolor: '#006b68' } }}
            >
              Add Audiocast
            </Button>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{ textTransform: 'none', fontSize: '13px', color: 'text.secondary', borderColor: 'divider', flexShrink: 0 }}
            >
              Cancel
            </Button>
          </>
        )}
      </Box>
    </Box>
  )
}

// ── Curated article card (right panel) ────────────────────────────────────────
function CuratedArticleCard({ article, onToggleAdd, onGenerateSummary }) {
  const [showSummary, setShowSummary] = useState(false)
  const [generating, setGenerating] = useState(false)

  const handleGenerate = () => {
    setGenerating(true)
    setTimeout(() => { setGenerating(false); setShowSummary(true); onGenerateSummary(article.id) }, 1500)
  }

  const initials = article.source.split(' ').map(w => w[0]).slice(0, 2).join('')

  return (
    <Box
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = 'copy'
        e.dataTransfer.setData('articleId', String(article.id))
      }}
      onDragEnd={(e) => { e.currentTarget.style.opacity = '1' }}
      sx={{
        borderBottom: '1px solid', borderColor: 'divider', display: 'flex',
        cursor: 'grab', position: 'relative',
        '&:hover': { bgcolor: 'rgba(0,0,0,0.015)' },
        '&:active': { opacity: 0.6 },
        '& .drag-handle': { opacity: 0 },
        '&:hover .drag-handle': { opacity: 1 },
      }}
    >
      {/* Drag handle — appears on left edge on hover */}
      <Box className="drag-handle" sx={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'opacity 0.15s', pointerEvents: 'none',
      }}>
        <DragIndicatorIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
      </Box>

      {/* ── Left strip: add toggle ── */}
      <Box sx={{ width: 38, flexShrink: 0, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', pt: 1.5, borderRight: '1px solid', borderColor: 'divider' }}>
        <Tooltip title={article.added ? 'Remove from newsletter' : 'Add to newsletter'}>
          <IconButton
            size="small"
            onClick={() => onToggleAdd(article.id)}
            sx={{
              width: 22, height: 22, borderRadius: '4px', p: 0,
              bgcolor: article.added ? TEAL : 'transparent',
              border: `1.5px solid ${article.added ? TEAL : 'rgba(0,0,0,0.18)'}`,
              color: article.added ? '#fff' : 'rgba(0,0,0,0.3)',
              '&:hover': { bgcolor: article.added ? '#006e6b' : 'rgba(0,130,127,0.08)', borderColor: TEAL, color: article.added ? '#fff' : TEAL },
            }}
          >
            {article.added ? <CheckIcon sx={{ fontSize: 13 }} /> : <AddIcon sx={{ fontSize: 13 }} />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* ── Main card body ── */}
      <Box sx={{ flex: 1, px: 2, py: 1.5, minWidth: 0 }}>

        {/* Source + date row */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.75 }}>
          {/* Logo placeholder */}
          <Box sx={{
            width: 28, height: 28, borderRadius: '6px', flexShrink: 0,
            bgcolor: 'grey.200', border: '1px solid', borderColor: 'divider',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Typography sx={{ fontSize: '8px', fontWeight: 800, color: 'text.disabled', lineHeight: 1 }}>{initials}</Typography>
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
              <Typography sx={{ fontSize: '11px', fontWeight: 700, color: 'text.primary', whiteSpace: 'nowrap' }}>{article.source}</Typography>
              {(article.type || article.country) && (
                <Typography sx={{ fontSize: '10px', color: 'text.disabled', whiteSpace: 'nowrap' }}>
                  | {article.type}{article.country ? ` · ${article.country}` : ''}
                </Typography>
              )}
            </Box>
          </Box>
          <Box sx={{ flex: 1 }} />
          {/* Match score badge */}
          {article.matchScore != null && (() => {
            const score = article.matchScore
            const color = score >= 80 ? TEAL : score >= 65 ? '#b45309' : 'rgba(0,0,0,0.35)'
            const bg = score >= 80 ? 'rgba(0,130,127,0.09)' : score >= 65 ? 'rgba(180,83,9,0.09)' : 'rgba(0,0,0,0.05)'
            return (
              <Tooltip title={`AI match score: how well this article fits your newsletter's topics, audience and past performance`} placement="top">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4, px: 0.7, py: 0.2, bgcolor: bg, borderRadius: '4px', flexShrink: 0, cursor: 'default' }}>
                  <AutoAwesomeIcon sx={{ fontSize: 9, color }} />
                  <Typography sx={{ fontSize: '10.5px', fontWeight: 700, color, lineHeight: 1 }}>{score}%</Typography>
                </Box>
              </Tooltip>
            )
          })()}
          <Typography sx={{ fontSize: '10px', color: 'text.disabled', whiteSpace: 'nowrap', flexShrink: 0 }}>{article.date}</Typography>
        </Box>

        {/* Headline + thumbnail */}
        <Box sx={{ display: 'flex', gap: 1, mb: 0.5, alignItems: 'flex-start' }}>
          <Typography sx={{
            fontSize: '13px', fontWeight: 600, lineHeight: 1.4, flex: 1,
            cursor: 'pointer', color: 'text.primary', '&:hover': { color: TEAL },
          }}>
            {article.headline}
          </Typography>
          {/* Article image placeholder */}
          <Box sx={{
            width: 70, height: 52, flexShrink: 0, bgcolor: 'grey.200',
            borderRadius: '4px', border: '1px solid', borderColor: 'divider',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ImageOutlinedIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
          </Box>
        </Box>

        {/* Excerpt */}
        <Typography sx={{ fontSize: '12px', color: 'text.secondary', lineHeight: 1.5, mb: 0.75 }}>
          {article.excerpt}
        </Typography>

        {/* AI curation reason — hidden once an AI summary is visible */}
        {article.aiReason && !article.aiSummary && !showSummary && (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.6, mb: 0.75, px: 1, py: 0.6, bgcolor: 'rgba(0,130,127,0.05)', borderRadius: '6px', borderLeft: `2.5px solid ${TEAL}` }}>
            <AutoAwesomeIcon sx={{ fontSize: 11, color: TEAL, mt: '2px', flexShrink: 0 }} />
            <Typography sx={{ fontSize: '11px', color: 'text.secondary', lineHeight: 1.45 }}>
              <Box component="span" sx={{ fontWeight: 700, color: TEAL }}>Why AI picked this · </Box>
              {article.aiReason}
            </Typography>
          </Box>
        )}

        {/* AI Summary */}
        {(article.aiSummary || showSummary) && (
          <Box sx={{ bgcolor: 'rgba(0,130,127,0.05)', border: '1px solid rgba(0,130,127,0.12)', borderRadius: '6px', px: 1.25, py: 1, mb: 0.75 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
              <AutoAwesomeIcon sx={{ fontSize: 12, color: TEAL }} />
              <Typography sx={{ fontSize: '10px', fontWeight: 700, color: TEAL, textTransform: 'uppercase', letterSpacing: '0.04em' }}>AI Summary</Typography>
            </Box>
            <Typography sx={{ fontSize: '12px', color: 'text.secondary', lineHeight: 1.5, fontStyle: 'italic' }}>
              {article.aiSummary || 'AI-powered media monitoring is enabling enterprise PR teams to shift from reactive to proactive strategies, with leading brands reporting significant gains in coverage quality.'}
            </Typography>
          </Box>
        )}

        {/* Metrics row */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap' }}>
          {article.reach !== '—' && (
            <Typography sx={{ fontSize: '11px', color: 'text.secondary' }}>⊙ {article.reach} Reach</Typography>
          )}
          {article.reach !== '—' && <Typography sx={{ fontSize: '11px', color: 'text.disabled' }}>·</Typography>}
          <SentimentChip value={article.sentiment} />
          {article.similar > 0 && (
            <>
              <Typography sx={{ fontSize: '11px', color: 'text.disabled' }}>·</Typography>
              <Typography sx={{ fontSize: '11px', color: 'text.secondary' }}>{article.similar} Similar</Typography>
            </>
          )}
          {article.ave && (
            <>
              <Typography sx={{ fontSize: '11px', color: 'text.disabled' }}>·</Typography>
              <Typography sx={{ fontSize: '11px', color: 'text.secondary' }}>{article.ave} AVE</Typography>
            </>
          )}
          <Box sx={{ flex: 1 }} />
          {!article.aiSummary && !showSummary && (
            <Tooltip title="Generate AI summary">
              <IconButton
                size="small"
                sx={{ p: 0.4, color: generating ? TEAL : 'text.disabled' }}
                onClick={handleGenerate}
                disabled={generating}
              >
                <AutoAwesomeIcon sx={{ fontSize: 14 }} />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        {generating && (
          <LinearProgress sx={{ mt: 0.75, height: 2, borderRadius: 1, bgcolor: 'rgba(0,130,127,0.1)', '& .MuiLinearProgress-bar': { bgcolor: TEAL } }} />
        )}
      </Box>
    </Box>
  )
}

// ── Canvas section block ───────────────────────────────────────────────────────
function SectionBlock({ label, children, hasContent, accentColor = TEAL, onArticleDrop }) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [sectionTitle, setSectionTitle] = useState(label)

  const handleDragOver = (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; setIsDragOver(true) }
  const handleDragLeave = (e) => { if (!e.currentTarget.contains(e.relatedTarget)) setIsDragOver(false) }
  const handleDrop = (e) => { e.preventDefault(); setIsDragOver(false); onArticleDrop?.(e) }

  return (
    <Box
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      sx={{
        border: '1px solid', mb: 2, borderRadius: '2px', overflow: 'hidden',
        borderColor: isDragOver ? accentColor : 'divider',
        boxShadow: isDragOver ? `0 0 0 2px ${accentColor}40` : 'none',
        transition: 'border-color 0.15s, box-shadow 0.15s',
      }}
    >
      {/* Section toolbar */}
      <Box sx={{ display: 'flex', alignItems: 'center', px: 1, py: 0.75, bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', gap: 0.5 }}>
        <Tooltip title="Drag to reorder section" placement="top">
          <IconButton size="small" sx={{ cursor: 'grab', color: 'text.disabled' }}><DragIndicatorIcon fontSize="small" /></IconButton>
        </Tooltip>
        <Tooltip title="Move section up" placement="top">
          <IconButton size="small" sx={{ color: 'text.disabled' }}><KeyboardArrowUpIcon fontSize="small" /></IconButton>
        </Tooltip>
        <Tooltip title="Move section down" placement="top">
          <IconButton size="small" sx={{ color: 'text.disabled' }}><KeyboardArrowDownIcon fontSize="small" /></IconButton>
        </Tooltip>
        {/* Section title — plain text in toolbar, editable in canvas below */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <Typography sx={{ fontSize: '12px', fontWeight: 600, color: 'text.secondary', letterSpacing: '0.02em' }}>
            {sectionTitle || label}
          </Typography>
        </Box>
        <Tooltip title="Generate AI summary for this section" placement="top">
          <IconButton size="small" sx={{ color: 'secondary.main' }}><AutoAwesomeIcon sx={{ fontSize: 14 }} /></IconButton>
        </Tooltip>
        <Tooltip title="Duplicate section" placement="top">
          <IconButton size="small" sx={{ color: 'text.disabled' }}><ContentCopyOutlinedIcon fontSize="small" /></IconButton>
        </Tooltip>
        <Tooltip title="Merge with another section" placement="top">
          <IconButton size="small" sx={{ color: 'text.disabled' }}><CompareArrowsIcon fontSize="small" /></IconButton>
        </Tooltip>
        <Tooltip title="Add article to section" placement="top">
          <IconButton size="small" sx={{ color: 'text.disabled' }}><AddIcon fontSize="small" /></IconButton>
        </Tooltip>
        <Tooltip title="Section settings" placement="top">
          <IconButton size="small" sx={{ color: 'text.disabled' }}><SettingsOutlinedIcon fontSize="small" /></IconButton>
        </Tooltip>
        <Tooltip title="More options" placement="top">
          <IconButton size="small" sx={{ color: 'text.disabled' }}><MoreVertIcon fontSize="small" /></IconButton>
        </Tooltip>
      </Box>

      {/* Accent top border on content area */}
      <Box sx={{ height: 3, bgcolor: accentColor, opacity: 0.25 }} />

      {/* Editable section title in the canvas */}
      <Box sx={{
        borderLeft: `3px solid ${accentColor}`,
        px: 2, py: 1.25,
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}>
        <InputBase
          value={sectionTitle}
          onChange={e => setSectionTitle(e.target.value)}
          placeholder="Section title"
          inputProps={{ 'aria-label': 'Section title' }}
          sx={{
            fontSize: '16px',
            fontWeight: 700,
            color: 'text.primary',
            width: '100%',
            letterSpacing: '-0.01em',
            '& input': { p: 0, cursor: 'text' },
            '& input::placeholder': { color: 'text.disabled', fontWeight: 400 },
          }}
        />
      </Box>

      <Box sx={{ m: 1, mt: 0, border: '1px dashed', borderColor: isDragOver ? accentColor : 'grey.200', transition: 'border-color 0.15s' }}>
        {hasContent ? (
          <>
            {children}
            {/* Drop target strip at bottom of existing content */}
            <Box sx={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.75,
              py: isDragOver ? 1.5 : 0.5,
              borderTop: isDragOver ? `1px dashed ${accentColor}` : '1px dashed transparent',
              bgcolor: isDragOver ? `${accentColor}08` : 'transparent',
              transition: 'all 0.15s',
            }}>
              {isDragOver && (
                <>
                  <AddIcon sx={{ fontSize: 13, color: accentColor }} />
                  <Typography sx={{ fontSize: '11px', color: accentColor, fontWeight: 600 }}>Drop to add article</Typography>
                </>
              )}
            </Box>
          </>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5, px: 3, textAlign: 'center' }}>
            <Box sx={{ width: 60, height: 60, borderRadius: '50%', bgcolor: `${accentColor}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {[1, 2, 3].map(i => (
                  <Box key={i} sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                    <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: accentColor }} />
                    <Box sx={{ width: i === 1 ? 20 : i === 2 ? 14 : 17, height: 2.5, bgcolor: accentColor, borderRadius: 1 }} />
                  </Box>
                ))}
              </Box>
            </Box>
            <Typography variant="body2" fontWeight={700} gutterBottom>Add articles or content</Typography>
            <Typography variant="caption" color="text.secondary">
              Drag articles from the panel, or use AI to auto-fill this section.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

// ── Canvas article item ────────────────────────────────────────────────────────
function CanvasArticleItem({ headline, source, excerpt, sentiment, aiCurated = true, aiReason }) {
  const [summary, setSummary] = useState(null)
  const [generating, setGenerating] = useState(false)
  const [thumbVote, setThumbVote] = useState(null) // 'up' | 'down' | null

  const handleGenerateSummary = () => {
    setGenerating(true)
    setTimeout(() => {
      setSummary(`This article highlights a key development in the media and communications landscape. The coverage is broadly positive with strong engagement potential, directly relevant to your brand's earned media strategy and audience interests.`)
      setGenerating(false)
    }, 1400)
  }

  return (
    <Box
      sx={{
        px: 3, py: 2, borderBottom: '1px solid', borderColor: 'divider',
        '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' },
        '&:hover .canvas-article-actions': { opacity: 1 },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
        <Box sx={{ flex: 1 }}>
          {/* Source row + AI badge */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
            <Box sx={{ width: 18, height: 18, borderRadius: '50%', bgcolor: 'rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography sx={{ fontSize: '8px', fontWeight: 800 }}>{source.charAt(0)}</Typography>
            </Box>
            <Typography sx={{ fontSize: '11px', color: 'text.secondary', fontWeight: 500 }}>{source}</Typography>
            {aiCurated && (
              <Tooltip title="Added by AI curation" placement="top">
                <Box sx={{
                  display: 'inline-flex', alignItems: 'center', gap: 0.3,
                  bgcolor: 'rgba(0,130,127,0.08)', border: '1px solid rgba(0,130,127,0.18)',
                  borderRadius: '20px', px: 0.6, py: 0.15, cursor: 'default',
                }}>
                  <AutoAwesomeIcon sx={{ fontSize: 9, color: TEAL }} />
                  <Typography sx={{ fontSize: '9px', fontWeight: 700, color: TEAL, lineHeight: 1 }}>AI</Typography>
                </Box>
              </Tooltip>
            )}
          </Box>
          <Typography sx={{ fontSize: '13px', fontWeight: 600, lineHeight: 1.4, mb: 0.4 }}>{headline}</Typography>
          {excerpt && <Typography sx={{ fontSize: '12px', color: 'text.secondary', lineHeight: 1.5 }}>{excerpt}</Typography>}
          {aiCurated && aiReason && (
            <Box sx={{ mt: 1, px: 1.5, py: 1.25, bgcolor: 'rgba(0,130,127,0.05)', borderRadius: '6px', borderLeft: `3px solid ${TEAL}` }}>
              {/* Header row */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, mb: 0.6 }}>
                <AutoAwesomeIcon sx={{ fontSize: 11, color: TEAL, flexShrink: 0 }} />
                <Typography sx={{ fontSize: '11px', fontWeight: 700, color: TEAL, lineHeight: 1 }}>
                  Why AI picked this
                </Typography>
              </Box>
              {/* Reason text */}
              <Typography sx={{ fontSize: '11.5px', color: 'text.secondary', lineHeight: 1.55, mb: 1 }}>
                {aiReason}
              </Typography>
              {/* Feedback row */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, pt: 0.75, borderTop: '1px solid rgba(0,130,127,0.1)' }}>
                <Typography sx={{ fontSize: '11px', color: 'text.disabled', mr: 0.25 }}>Tune AI for this series:</Typography>
                <Tooltip title="More like this" placement="bottom">
                  <IconButton
                    size="small"
                    onClick={() => setThumbVote(v => v === 'up' ? null : 'up')}
                    sx={{ p: 0.4, borderRadius: '4px', color: thumbVote === 'up' ? TEAL : 'text.disabled', bgcolor: thumbVote === 'up' ? 'rgba(0,130,127,0.1)' : 'transparent', '&:hover': { color: TEAL, bgcolor: 'rgba(0,130,127,0.08)' } }}
                  >
                    {thumbVote === 'up' ? <ThumbUpIcon sx={{ fontSize: 13 }} /> : <ThumbUpOutlinedIcon sx={{ fontSize: 13 }} />}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Less like this" placement="bottom">
                  <IconButton
                    size="small"
                    onClick={() => setThumbVote(v => v === 'down' ? null : 'down')}
                    sx={{ p: 0.4, borderRadius: '4px', color: thumbVote === 'down' ? 'error.main' : 'text.disabled', bgcolor: thumbVote === 'down' ? 'rgba(211,47,47,0.08)' : 'transparent', '&:hover': { color: 'error.main', bgcolor: 'rgba(211,47,47,0.06)' } }}
                  >
                    {thumbVote === 'down' ? <ThumbDownIcon sx={{ fontSize: 13 }} /> : <ThumbDownOutlinedIcon sx={{ fontSize: 13 }} />}
                  </IconButton>
                </Tooltip>
                {thumbVote && (
                  <Typography sx={{ fontSize: '11px', color: thumbVote === 'up' ? TEAL : 'error.main', fontWeight: 500 }}>
                    {thumbVote === 'up' ? 'Got it — more like this' : 'Got it — less like this'}
                  </Typography>
                )}
              </Box>
            </Box>
          )}
          {/* AI summary (canvas) */}
          {(summary || generating) && (
            <Box sx={{ mt: 0.75, bgcolor: 'rgba(0,130,127,0.05)', border: '1px solid rgba(0,130,127,0.12)', borderRadius: '6px', px: 1.25, py: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.4 }}>
                <AutoAwesomeIcon sx={{ fontSize: 11, color: TEAL, ...(generating && { animation: 'spin 1s linear infinite', '@keyframes spin': { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } } }) }} />
                <Typography sx={{ fontSize: '10px', fontWeight: 700, color: TEAL, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {generating ? 'Generating…' : 'AI Summary'}
                </Typography>
              </Box>
              {summary && (
                <Typography sx={{ fontSize: '12px', color: 'text.secondary', lineHeight: 1.5, fontStyle: 'italic' }}>
                  {summary}
                </Typography>
              )}
              {generating && <LinearProgress sx={{ mt: 0.5, height: 2, borderRadius: 1, bgcolor: 'rgba(0,130,127,0.1)', '& .MuiLinearProgress-bar': { bgcolor: TEAL } }} />}
            </Box>
          )}
          <Box sx={{ mt: 0.75 }}><SentimentChip value={sentiment} /></Box>
        </Box>
        <Box className="canvas-article-actions" sx={{ display: 'flex', flexDirection: 'column', gap: 0.25, opacity: 0, transition: 'opacity 0.15s' }}>
          <IconButton size="small" sx={{ p: 0.4 }}><DragIndicatorIcon sx={{ fontSize: 14 }} /></IconButton>
          <Tooltip title={summary ? 'Regenerate AI summary' : 'Generate AI summary'} placement="left">
            <IconButton size="small" sx={{ p: 0.4, color: summary ? TEAL : 'text.secondary' }} onClick={handleGenerateSummary} disabled={generating}>
              <AutoAwesomeIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Tooltip>
          <IconButton size="small" sx={{ p: 0.4, color: 'error.light' }}><DeleteOutlineIcon sx={{ fontSize: 14 }} /></IconButton>
        </Box>
      </Box>
    </Box>
  )
}

// ── Analyze widget (canvas embed) ─────────────────────────────────────────────
const CHART_BARS = [
  { label: 'Jan', you: 38, comp: 22 },
  { label: 'Feb', you: 42, comp: 28 },
  { label: 'Mar', you: 35, comp: 31 },
  { label: 'Apr', you: 61, comp: 24 },
  { label: 'May', you: 54, comp: 29 },
  { label: 'Jun', you: 68, comp: 21 },
]
const MAX_VAL = 80

function AnalyzeWidget({ accentColor, onRemove }) {
  return (
    <Box sx={{ mx: 3, my: 2, borderRadius: '8px', overflow: 'hidden', border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
      {/* Widget header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, px: 2, py: 1.25, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'rgba(0,0,0,0.02)' }}>
        <BarChartOutlinedIcon sx={{ fontSize: 14, color: '#e86c5a' }} />
        <Typography sx={{ fontSize: '11px', fontWeight: 700, color: 'text.primary', flex: 1, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Share of Voice · Last 6 Months
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {[{ label: 'You', color: accentColor }, { label: 'Competitors', color: 'rgba(0,0,0,0.18)' }].map(({ label, color }) => (
            <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '2px', bgcolor: color }} />
              <Typography sx={{ fontSize: '10px', color: 'text.secondary' }}>{label}</Typography>
            </Box>
          ))}
        </Box>
        <Tooltip title="Remove widget">
          <IconButton size="small" onClick={onRemove} sx={{ p: 0.3, color: 'text.disabled', '&:hover': { color: 'error.main' } }}>
            <CloseIcon sx={{ fontSize: 12 }} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Chart */}
      <Box sx={{ px: 2.5, pt: 2, pb: 1.5 }}>
        {/* Y-axis label */}
        <Typography sx={{ fontSize: '9px', color: 'text.disabled', mb: 1 }}>Share of voice (%)</Typography>

        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1.5, height: 80 }}>
          {CHART_BARS.map(({ label, you, comp }) => (
            <Box key={label} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, height: '100%', justifyContent: 'flex-end' }}>
              <Box sx={{ width: '100%', display: 'flex', gap: '2px', alignItems: 'flex-end', height: '100%' }}>
                {/* Your bar */}
                <Box sx={{
                  flex: 1, borderRadius: '2px 2px 0 0',
                  height: `${(you / MAX_VAL) * 100}%`,
                  bgcolor: accentColor, opacity: 0.85,
                  transition: 'height 0.4s ease',
                }} />
                {/* Competitor bar */}
                <Box sx={{
                  flex: 1, borderRadius: '2px 2px 0 0',
                  height: `${(comp / MAX_VAL) * 100}%`,
                  bgcolor: 'rgba(0,0,0,0.12)',
                  transition: 'height 0.4s ease',
                }} />
              </Box>
            </Box>
          ))}
        </Box>

        {/* X-axis labels */}
        <Box sx={{ display: 'flex', gap: 1.5, mt: 0.5, borderTop: '1px solid', borderColor: 'divider', pt: 0.5 }}>
          {CHART_BARS.map(({ label }) => (
            <Box key={label} sx={{ flex: 1, textAlign: 'center' }}>
              <Typography sx={{ fontSize: '9px', color: 'text.disabled' }}>{label}</Typography>
            </Box>
          ))}
        </Box>

        {/* Summary stats */}
        <Box sx={{ display: 'flex', gap: 2, mt: 1.5, pt: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
          {[
            { label: 'Avg. share of voice', value: '49.7%', delta: '+12%', positive: true },
            { label: 'Peak month', value: 'June', delta: '68%', positive: true },
            { label: 'vs. Competitors', value: '+28pp', delta: 'ahead', positive: true },
          ].map(({ label, value, delta, positive }) => (
            <Box key={label} sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: '9px', color: 'text.disabled', mb: 0.25 }}>{label}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                <Typography sx={{ fontSize: '13px', fontWeight: 700, color: 'text.primary' }}>{value}</Typography>
                <Typography sx={{ fontSize: '10px', fontWeight: 600, color: positive ? '#1a7a45' : 'error.main' }}>{delta}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ px: 2, py: 0.75, bgcolor: 'rgba(0,0,0,0.02)', borderTop: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <BarChartOutlinedIcon sx={{ fontSize: 11, color: 'text.disabled' }} />
        <Typography sx={{ fontSize: '10px', color: 'text.disabled' }}>Powered by Meltwater Analyze · Updated Apr 20, 2026</Typography>
        <Box sx={{ flex: 1 }} />
        <Typography sx={{ fontSize: '10px', color: '#e86c5a', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>Open in Analyze →</Typography>
      </Box>
    </Box>
  )
}

// ── Settings helpers ───────────────────────────────────────────────────────────
function SettingsSection({ label, children, last = false }) {
  return (
    <Box sx={{ borderBottom: last ? 'none' : '1px solid', borderColor: 'divider' }}>
      <Box sx={{ px: 2, pt: 1.5, pb: 0.5 }}>
        <Typography sx={{ fontSize: '10px', fontWeight: 700, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {label}
        </Typography>
      </Box>
      <Box sx={{ px: 2, pb: 1.25 }}>{children}</Box>
    </Box>
  )
}

function SettingsRow({ label, sub, children }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1.5, py: 1, borderBottom: '1px solid', borderColor: 'divider', '&:last-child': { borderBottom: 'none' } }}>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: '13px', fontWeight: 500 }}>{label}</Typography>
        <Typography sx={{ fontSize: '11px', color: 'text.secondary', lineHeight: 1.4, mt: 0.2 }}>{sub}</Typography>
      </Box>
      <Box sx={{ flexShrink: 0 }}>{children}</Box>
    </Box>
  )
}

function CurationModeOption({ id, label, sub, accentColor, selected, onSelect }) {
  return (
    <Box
      onClick={() => onSelect(id)}
      sx={{
        display: 'flex', alignItems: 'flex-start', gap: 1, py: 0.75, cursor: 'pointer',
        '&:hover .mode-label': { color: accentColor },
      }}
    >
      <Box sx={{
        width: 15, height: 15, borderRadius: '50%', flexShrink: 0, mt: 0.2,
        border: `2px solid ${selected ? accentColor : 'rgba(0,0,0,0.2)'}`,
        bgcolor: selected ? accentColor : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.15s',
      }}>
        {selected && <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: '#fff' }} />}
      </Box>
      <Box>
        <Typography className="mode-label" sx={{ fontSize: '12px', fontWeight: selected ? 700 : 500, color: selected ? accentColor : 'text.primary', transition: 'color 0.15s' }}>
          {label}
        </Typography>
        <Typography sx={{ fontSize: '11px', color: 'text.secondary' }}>{sub}</Typography>
      </Box>
    </Box>
  )
}

// ── Canvas widget card (added widgets shown inside the newsletter) ─────────────
function CanvasWidget({ widget, accentColor, onRemove }) {
  const [aiOpen, setAiOpen] = useState(true) // open by default in canvas
  const isAutoAdded = AUTO_ADDED_IDS.includes(widget.id)

  return (
    <Box sx={{ mx: 3, my: 2, borderRadius: '8px', overflow: 'hidden', border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
      {/* Canvas widget header */}
      <Box sx={{
        display: 'flex', alignItems: 'center', gap: 0.75, px: 2, py: 1.25,
        borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'rgba(0,0,0,0.02)',
      }}>
        <BarChartOutlinedIcon sx={{ fontSize: 14, color: accentColor }} />
        <Typography sx={{ fontSize: '11px', fontWeight: 700, color: 'text.primary', flex: 1, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {widget.title}
        </Typography>
        {isAutoAdded && (
          <Box sx={{ px: 0.6, py: 0.15, bgcolor: 'rgba(0,130,127,0.1)', borderRadius: '3px', display: 'inline-flex', alignItems: 'center', gap: 0.4, mr: 0.5 }}>
            <AutoAwesomeIcon sx={{ fontSize: 9, color: TEAL }} />
            <Typography sx={{ fontSize: '9px', fontWeight: 700, color: TEAL, letterSpacing: '0.04em' }}>Auto-added</Typography>
          </Box>
        )}
        <Tooltip title="Remove widget">
          <IconButton size="small" onClick={onRemove} sx={{ p: 0.3, color: 'text.disabled', '&:hover': { color: 'error.main' } }}>
            <CloseIcon sx={{ fontSize: 12 }} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Full-width dashboard preview */}
      <Box sx={{ px: 2, pt: 1.5, pb: 1 }}>
        <DashboardWidgetPreview widget={widget} />
      </Box>

      {/* Why AI picked this — inline, collapsible */}
      <Box sx={{ borderTop: '1px solid rgba(0,130,127,0.15)', mx: 2, mb: 1.5 }}>
        <Box
          onClick={() => setAiOpen(v => !v)}
          sx={{
            display: 'flex', alignItems: 'center', gap: 0.6, py: 0.75, cursor: 'pointer',
            '&:hover .ai-label': { opacity: 0.8 },
          }}
        >
          <AutoAwesomeIcon sx={{ fontSize: 11, color: TEAL }} />
          <Typography className="ai-label" sx={{ fontSize: '10.5px', fontWeight: 600, color: TEAL, flex: 1 }}>Why AI picked this</Typography>
          <Box sx={{ transform: aiOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', display: 'flex' }}>
            <ArrowDropDownIcon sx={{ fontSize: 16, color: TEAL }} />
          </Box>
        </Box>
        {aiOpen && (
          <Box sx={{
            bgcolor: 'rgba(0,130,127,0.05)', borderRadius: '6px',
            px: 1.25, py: 1, borderLeft: `3px solid ${TEAL}`,
          }}>
            <Typography sx={{ fontSize: '11.5px', color: 'text.secondary', lineHeight: 1.6 }}>
              {widget.aiReason}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

// ── Main editor page ───────────────────────────────────────────────────────────
export default function MwNewslettersEditorPage() {
  const navigate = useNavigate()
  const { id }   = useParams()

  const meta = SERIES_META[id] || SERIES_META['media-coverage']
  const isReady = meta.status === 'ready'

  const [seriesColor, setSeriesColor] = useState(SERIES_COLORS[id] || SERIES_COLORS['media-coverage'])
  const [logoSrc, setLogoSrc] = useState(null)
  const [fontFamily, setFontFamily] = useState('Arial, Helvetica, sans-serif')
  const [colorAnchor, setColorAnchor] = useState(null)
  const [fontAnchor, setFontAnchor] = useState(null)
  const [overviewAnchor, setOverviewAnchor] = useState(null)
  const [elementsAnchor, setElementsAnchor] = useState(null)
  const [showOverview, setShowOverview] = useState(true)
  const [regenerating, setRegenerating] = useState(false)
  const [showAnalyzeWidget, setShowAnalyzeWidget] = useState(false)

  // ── Audiocast state ──
  const [audioCastPanelOpen, setAudioCastPanelOpen] = useState(false)
  const [audioCastBlock, setAudioCastBlock] = useState(false)   // visible in canvas
  const [audioCastGenerating, setAudioCastGenerating] = useState(false)
  const [audioCastGenerated, setAudioCastGenerated] = useState(false)
  const [audioCastPlaying, setAudioCastPlaying] = useState(false)

  const handleAddAudiocast = () => {
    setAudioCastPanelOpen(false)
    setAudioCastBlock(true)
    setAudioCastGenerating(true)
    setAudioCastGenerated(false)
    setAudioCastPlaying(false)
    setTimeout(() => {
      setAudioCastGenerating(false)
      setAudioCastGenerated(true)
    }, 2200)
  }

  const handleRegenerateAudiocast = () => {
    setAudioCastGenerating(true)
    setAudioCastGenerated(false)
    setAudioCastPlaying(false)
    setTimeout(() => {
      setAudioCastGenerating(false)
      setAudioCastGenerated(true)
    }, 2200)
  }

  // ── Widget state (shared: canvas + right panel) ──
  const [addedWidgets, setAddedWidgets] = useState(AUTO_ADDED_IDS)
  const toggleWidget = id => setAddedWidgets(prev =>
    prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
  )

  // ── Panel resize ──
  const [panelWidth, setPanelWidth] = useState(420)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartX = useRef(0)
  const dragStartWidth = useRef(420)

  const onResizeStart = useCallback((e) => {
    e.preventDefault()
    dragStartX.current = e.clientX
    dragStartWidth.current = panelWidth
    setIsDragging(true)
  }, [panelWidth])

  useEffect(() => {
    if (!isDragging) return
    const onMove = (e) => {
      // Dragging LEFT increases panel width (handle is to the left of the panel)
      const delta = dragStartX.current - e.clientX
      const next = Math.min(640, Math.max(300, dragStartWidth.current + delta))
      setPanelWidth(next)
    }
    const onUp = () => setIsDragging(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [isDragging])

  const handleRegenerate = () => {
    setRegenerating(true)
    setOverviewAnchor(null)
    setTimeout(() => setRegenerating(false), 1800)
  }

  // ── Canvas sections (stateful so dropped articles appear) ──
  const [sections, setSections] = useState([
    { id: 'top-stories', label: 'Top Stories', items: [
      { id: 'cs1', headline: 'AI-driven media monitoring transforms PR strategy for enterprise brands', source: 'Financial Times', excerpt: 'Leading companies are shifting from reactive to proactive media management using AI-powered monitoring platforms.', sentiment: 'Positive', aiCurated: true, aiReason: 'High reach & strong positive sentiment on a topic your audience consistently engages with.' },
      { id: 'cs2', headline: 'Global brands report record media coverage in Q1 2026', source: 'Reuters', excerpt: 'Brands across tech, finance and consumer goods saw a 34% increase in earned media coverage compared to the same period last year.', sentiment: 'Positive', aiCurated: true, aiReason: 'Highest reach article this cycle — broad industry context that sets up your competitive coverage.' },
      { id: 'cs3', headline: 'Top trending brand conversations this week', source: 'Brand Watch Monitor', excerpt: 'Your Monitor view surfaced 847 new brand mentions this week, with 73% rated positive sentiment.', sentiment: 'Positive', aiCurated: true, aiReason: 'Surfaces your highest-volume brand signal this week — keeps readers close to real-time brand health.' },
    ]},
    { id: 'industry-news', label: 'Industry News', items: [
      { id: 'cs4', headline: 'Earned media value hits five-year high as trust in paid ads declines', source: 'PR Week', excerpt: 'New industry data shows earned media is generating 3× more trust than paid placements, pushing comms teams to invest heavily in coverage quality.', sentiment: 'Positive', aiCurated: true, aiReason: 'Directly relevant to your audience\'s KPIs — earned media ROI is a top recurring theme in past editions.' },
      { id: 'cs5', headline: 'Why media relations is back at the top of the CMO agenda', source: 'Digiday', excerpt: 'After years of social-first thinking, marketing leaders are returning to earned media as a core brand-building lever in 2026.', sentiment: 'Positive', aiCurated: true, aiReason: 'Aligns with the edition\'s theme and mirrors topics your subscribers clicked most in the last 3 editions.' },
    ]},
    { id: 'competitive', label: 'Competitive Intelligence', items: [
      { id: 'cs6', headline: 'Competitor share-of-voice shift: your brand up 12% this month', source: 'Competitor Monitor', excerpt: 'Your Monitor streams detected a significant share-of-voice gain versus key competitors, driven by product launch coverage and exec thought leadership.', sentiment: 'Positive', aiCurated: true, aiReason: 'Competitive signal your readers can act on — share-of-voice shifts are a consistent click driver in this series.' },
      { id: 'cs7', headline: 'Enterprise software brands gain share as legacy vendors struggle', source: 'Wall Street Journal', excerpt: 'A wave of enterprise software consolidation is reshaping competitive dynamics, with AI-first vendors gaining significant ground in Q1 2026.', sentiment: 'Neutral', aiCurated: true, aiReason: 'Highest reach article this cycle — broad industry context that sets up your competitive coverage.' },
    ]},
  ])

  const handleSectionDrop = useCallback((sectionId, e) => {
    const articleId = Number(e.dataTransfer.getData('articleId'))
    setArticles(prev => {
      const article = prev.find(a => a.id === articleId)
      if (!article) return prev
      setSections(secs => secs.map(s =>
        s.id === sectionId && !s.items.find(i => i.sourceId === articleId)
          ? { ...s, items: [...s.items, {
              id: `dropped-${Date.now()}`,
              sourceId: articleId,
              headline: article.headline,
              source: article.source,
              excerpt: article.excerpt,
              sentiment: article.sentiment,
              aiCurated: false,
            }]}
          : s
      ))
      return prev.map(a => a.id === articleId ? { ...a, added: true } : a)
    })
  }, [])
  const fileInputRef = useRef(null)

  // ── Extract dominant (non-white, non-black) color from an image element ──
  const extractDominantColor = useCallback((imgEl) => {
    const canvas = document.createElement('canvas')
    const SIZE = 80
    canvas.width = SIZE; canvas.height = SIZE
    const ctx = canvas.getContext('2d')
    ctx.drawImage(imgEl, 0, 0, SIZE, SIZE)
    const { data } = ctx.getImageData(0, 0, SIZE, SIZE)
    const counts = {}
    for (let i = 0; i < data.length; i += 4) {
      const [r, g, b, a] = [data[i], data[i+1], data[i+2], data[i+3]]
      if (a < 128) continue
      const brightness = (r + g + b) / 3
      if (brightness > 215 || brightness < 25) continue
      // Boost saturation weight: skip near-grey pixels
      const max = Math.max(r, g, b), min = Math.min(r, g, b)
      if (max - min < 30) continue
      const qr = Math.round(r / 24) * 24
      const qg = Math.round(g / 24) * 24
      const qb = Math.round(b / 24) * 24
      const key = `${qr},${qg},${qb}`
      counts[key] = (counts[key] || 0) + 1
    }
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]
    if (!top) return null
    const [r, g, b] = top[0].split(',').map(Number)
    return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')
  }, [])

  // ── Handle file selection ──
  const handleFileChange = useCallback((e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      setLogoSrc(url)
      const color = extractDominantColor(img)
      if (color) setSeriesColor(color)
    }
    img.src = url
    // Reset input so same file can be re-selected
    e.target.value = ''
  }, [extractDominantColor])
  const [rightTab, setRightTab] = useState(0)
  const [saveAnchor, setSaveAnchor] = useState(null)
  const [articles, setArticles] = useState(CURATED_ARTICLES)
  const addedCount = articles.filter(a => a.added).length

  const toggleAdd = (articleId) => {
    setArticles(prev => prev.map(a => a.id === articleId ? { ...a, added: !a.added } : a))
  }

  const generateSummary = (articleId) => {
    setArticles(prev => prev.map(a =>
      a.id === articleId && !a.aiSummary
        ? { ...a, aiSummary: 'AI-curated summary: This article highlights a key development relevant to your brand tracking. The coverage is broadly positive with high engagement potential among your target audience segments.' }
        : a
    ))
  }

  return (
    <Box sx={{ position: 'fixed', inset: 0, bgcolor: 'grey.100', zIndex: 1300, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* ── Top header ── */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2.5, py: 1, bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', flexShrink: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Meltwater logo */}
          <CodeIcon sx={{ color: 'primary.main', fontSize: 26 }} />
          {/* Breadcrumb */}
          <Typography sx={{ fontSize: '14px', color: 'text.primary', fontWeight: 800 }}>Newsletters</Typography>
          <Typography sx={{ fontSize: '13px', color: 'text.disabled' }}>›</Typography>
          <Typography sx={{ fontSize: '13px', color: 'text.secondary', fontWeight: 500 }}>{meta.name}</Typography>
          <Typography sx={{ fontSize: '13px', color: 'text.disabled' }}>›</Typography>
          <Typography sx={{ fontSize: '13px', fontWeight: 700, color: 'text.primary' }}>{meta.edition}</Typography>
          {/* Status pill */}
          {isReady
            ? <Box sx={{ bgcolor: 'rgba(245,158,11,0.10)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '4px', px: 0.9, py: 0.2 }}>
                <Typography sx={{ fontSize: '11px', fontWeight: 700, color: AMBER }}>Ready for review</Typography>
              </Box>
            : <Box sx={{ bgcolor: 'rgba(0,130,127,0.08)', border: '1px solid rgba(0,130,127,0.2)', borderRadius: '4px', px: 0.9, py: 0.2 }}>
                <Typography sx={{ fontSize: '11px', fontWeight: 700, color: TEAL }}>Auto-curated draft</Typography>
              </Box>
          }
        </Box>
        {/* Send-by deadline */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
            <CalendarMonthOutlinedIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
            <Box>
              <Typography sx={{ fontSize: '10px', fontWeight: 500, color: 'text.disabled', lineHeight: 1, mb: 0.2 }}>
                Scheduled to send
              </Typography>
              <Typography sx={{ fontSize: '12px', fontWeight: 700, color: 'text.primary', lineHeight: 1 }}>
                Fri, Apr 25 · 8:00 AM
              </Typography>
            </Box>
          </Box>
          <Divider orientation="vertical" flexItem sx={{ mx: 0.25, my: 0.5 }} />
          <IconButton onClick={() => navigate('/mw-newsletters')} size="small">
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
      </Box>

      {/* ── Toolbar ── */}
      <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 0.75, bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', flexShrink: 0, gap: 0.5 }}>
        <Tooltip title="Preview"><IconButton size="small" sx={{ color: 'text.secondary' }}><VisibilityOutlinedIcon fontSize="small" /></IconButton></Tooltip>
        <Tooltip title="Track changes"><IconButton size="small" sx={{ color: 'text.secondary' }}><TrackChangesOutlinedIcon fontSize="small" /></IconButton></Tooltip>
        <Tooltip title="Undo"><IconButton size="small" sx={{ color: 'text.disabled' }}><UndoIcon fontSize="small" /></IconButton></Tooltip>
        <Tooltip title="Redo"><IconButton size="small" sx={{ color: 'text.disabled' }}><RedoIcon fontSize="small" /></IconButton></Tooltip>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

        {/* Add Elements */}
        <Button
          startIcon={<ViewModuleOutlinedIcon sx={{ fontSize: '15px !important', color: elementsAnchor ? TEAL : 'text.secondary' }} />}
          onClick={e => setElementsAnchor(e.currentTarget)}
          sx={{ color: elementsAnchor ? TEAL : 'text.secondary', textTransform: 'none', fontSize: '0.8rem', px: 1, fontWeight: elementsAnchor ? 600 : 400 }}
        >
          Add Elements
        </Button>
        <Button
          startIcon={<BarChartOutlinedIcon sx={{ fontSize: '15px !important', color: showAnalyzeWidget ? '#e86c5a' : 'text.secondary' }} />}
          onClick={() => setShowAnalyzeWidget(v => !v)}
          sx={{ color: showAnalyzeWidget ? '#e86c5a' : 'text.secondary', textTransform: 'none', fontSize: '0.8rem', px: 1, fontWeight: showAnalyzeWidget ? 600 : 400 }}
        >
          Add Analyze widget
        </Button>

        {/* Add Elements popover */}
        <Popover
          open={Boolean(elementsAnchor)}
          anchorEl={elementsAnchor}
          onClose={() => setElementsAnchor(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          PaperProps={{ sx: { mt: 0.5, borderRadius: '10px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', width: 360 } }}
        >
          <Box sx={{ p: 2 }}>
            <Typography sx={{ fontSize: '13px', fontWeight: 700, mb: 1.5 }}>Add Elements</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
              {/* Featured: Add Audiocast */}
              <Box
                onClick={() => { setElementsAnchor(null); setAudioCastPanelOpen(true) }}
                sx={{
                  gridColumn: '1 / -1',
                  display: 'flex', alignItems: 'center', gap: 1.5,
                  p: 1.5, border: `1.5px solid ${TEAL}40`, borderRadius: '8px',
                  cursor: 'pointer', transition: 'all 0.15s',
                  bgcolor: 'rgba(0,130,127,0.04)',
                  '&:hover': { borderColor: TEAL, bgcolor: 'rgba(0,130,127,0.08)' },
                }}
              >
                <Box sx={{ width: 36, height: 36, borderRadius: '8px', bgcolor: `${TEAL}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <CampaignOutlinedIcon sx={{ fontSize: 20, color: TEAL }} />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '12px', fontWeight: 700, color: TEAL }}>Add Audiocast</Typography>
                  <Typography sx={{ fontSize: '10px', color: 'text.secondary', lineHeight: 1.4 }}>AI-generated audio version of this newsletter</Typography>
                </Box>
              </Box>

              {[
                { label: 'View in Browser Link', Icon: LinkOutlinedIcon },
                { label: 'Header',               Icon: WebOutlinedIcon },
                { label: 'Text Banner',          Icon: ViewHeadlineOutlinedIcon },
                { label: 'Banner Image',         Icon: CropOriginalOutlinedIcon },
                { label: 'Advanced Text',        Icon: NotesOutlinedIcon },
                { label: 'Section Navigation',   Icon: TableRowsOutlinedIcon },
                { label: 'Simple Text',          Icon: SubjectOutlinedIcon },
                { label: 'Section',              Icon: ArticleOutlinedIcon },
              ].map(({ label, Icon }) => (
                <Box
                  key={label}
                  onClick={() => setElementsAnchor(null)}
                  sx={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    gap: 1, p: 1.5, border: '1px solid', borderColor: 'divider', borderRadius: '8px',
                    cursor: 'pointer', transition: 'all 0.15s', position: 'relative',
                    '&:hover': { borderColor: TEAL, bgcolor: 'rgba(0,130,127,0.04)' },
                  }}
                >
                  <Box sx={{ position: 'absolute', top: 6, left: 6 }}>
                    <Typography sx={{ fontSize: '16px', color: 'text.disabled', lineHeight: 1 }}>+</Typography>
                  </Box>
                  <Icon sx={{ fontSize: 28, color: 'text.disabled' }} />
                  <Typography sx={{ fontSize: '11px', color: 'text.secondary', textAlign: 'center', lineHeight: 1.3 }}>{label}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Popover>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

        {/* ── Template colour picker ── */}
        <Tooltip title="Template colour">
          <Button
            onClick={e => setColorAnchor(e.currentTarget)}
            sx={{ textTransform: 'none', fontSize: '0.8rem', color: 'text.secondary', px: 1, gap: 0.75, minWidth: 0 }}
            startIcon={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <PaletteOutlinedIcon sx={{ fontSize: '15px !important', color: 'text.secondary' }} />
                <Box sx={{ width: 14, height: 14, borderRadius: '3px', bgcolor: seriesColor, border: '1.5px solid rgba(0,0,0,0.12)', flexShrink: 0 }} />
              </Box>
            }
          >
            Colour
          </Button>
        </Tooltip>

        {/* ── Font picker ── */}
        <Tooltip title="Template font">
          <Button
            onClick={e => setFontAnchor(e.currentTarget)}
            sx={{ textTransform: 'none', fontSize: '0.8rem', color: 'text.secondary', px: 1, fontFamily }}
            startIcon={<TextFieldsIcon sx={{ fontSize: '15px !important' }} />}
          >
            {fontFamily.split(',')[0]}
          </Button>
        </Tooltip>

        <Popover
          open={Boolean(fontAnchor)}
          anchorEl={fontAnchor}
          onClose={() => setFontAnchor(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          PaperProps={{ sx: { borderRadius: '10px', boxShadow: '0 8px 32px rgba(0,0,0,0.14)', minWidth: 220, overflow: 'hidden' } }}
        >
          <Box sx={{ px: 1.5, pt: 1.25, pb: 0.5 }}>
            <Typography sx={{ fontSize: '11px', fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Email-safe fonts
            </Typography>
          </Box>
          {[
            { label: 'Arial',          stack: 'Arial, Helvetica, sans-serif',         style: 'Clean & universal' },
            { label: 'Georgia',        stack: 'Georgia, "Times New Roman", serif',     style: 'Editorial & warm' },
            { label: 'Verdana',        stack: 'Verdana, Geneva, sans-serif',           style: 'Spacious & readable' },
            { label: 'Trebuchet MS',   stack: '"Trebuchet MS", Helvetica, sans-serif', style: 'Friendly & modern' },
            { label: 'Tahoma',         stack: 'Tahoma, Verdana, sans-serif',           style: 'Compact & crisp' },
            { label: 'Times New Roman',stack: '"Times New Roman", Times, serif',       style: 'Classic & formal' },
          ].map(({ label, stack, style }) => {
            const active = fontFamily === stack
            return (
              <Box
                key={label}
                onClick={() => { setFontFamily(stack); setFontAnchor(null) }}
                sx={{
                  px: 1.5, py: 1, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  bgcolor: active ? `${seriesColor}12` : 'transparent',
                  borderLeft: active ? `3px solid ${seriesColor}` : '3px solid transparent',
                  '&:hover': { bgcolor: active ? `${seriesColor}18` : 'rgba(0,0,0,0.04)' },
                }}
              >
                <Box>
                  <Typography sx={{ fontFamily: stack, fontSize: '15px', fontWeight: active ? 700 : 400, color: active ? seriesColor : 'text.primary', lineHeight: 1.2 }}>
                    {label}
                  </Typography>
                  <Typography sx={{ fontSize: '10px', color: 'text.disabled', mt: 0.2 }}>{style}</Typography>
                </Box>
                {active && <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: seriesColor, flexShrink: 0 }} />}
              </Box>
            )
          })}
          <Box sx={{ height: 8 }} />
        </Popover>

        {/* Hidden file input */}
        <Box
          component="input"
          type="file"
          accept=".png,.jpg,.jpeg"
          ref={fileInputRef}
          onChange={handleFileChange}
          sx={{ display: 'none' }}
        />

        {/* Upload / replace logo button */}
        <Tooltip title={logoSrc ? 'Replace logo' : 'Upload a .png or .jpg logo — the template colour will auto-match'}>
          <Button
            startIcon={<FileUploadOutlinedIcon sx={{ fontSize: '15px !important' }} />}
            onClick={() => fileInputRef.current?.click()}
            sx={{ textTransform: 'none', fontSize: '0.8rem', color: logoSrc ? TEAL : 'text.secondary', px: 1 }}
          >
            {logoSrc ? 'Replace logo' : 'Upload logo'}
          </Button>
        </Tooltip>
        {logoSrc && (
          <Tooltip title="Remove logo">
            <IconButton size="small" onClick={() => setLogoSrc(null)} sx={{ p: 0.4, color: 'text.disabled', '&:hover': { color: 'error.main' } }}>
              <CloseIcon sx={{ fontSize: 13 }} />
            </IconButton>
          </Tooltip>
        )}

        {/* Colour picker popover */}
        <Popover
          open={Boolean(colorAnchor)}
          anchorEl={colorAnchor}
          onClose={() => setColorAnchor(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          PaperProps={{ sx: { p: 1.5, borderRadius: '10px', boxShadow: '0 8px 32px rgba(0,0,0,0.14)', minWidth: 200 } }}
        >
          <Typography sx={{ fontSize: '11px', fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.06em', mb: 1 }}>
            Template colour
          </Typography>
          {/* Preset swatches */}
          <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', mb: 1.25 }}>
            {[
              '#00827F', '#B627A1', '#e86c5a', '#4F6AF5',
              '#e91e8c', '#0d9b5b', '#f59e0b', '#374151',
            ].map(c => (
              <Box
                key={c}
                onClick={() => { setSeriesColor(c); setColorAnchor(null) }}
                sx={{
                  width: 26, height: 26, borderRadius: '6px', bgcolor: c, cursor: 'pointer',
                  border: seriesColor === c ? '2.5px solid rgba(0,0,0,0.5)' : '2px solid transparent',
                  boxShadow: seriesColor === c ? `0 0 0 1px ${c}` : 'none',
                  transition: 'transform 0.1s',
                  '&:hover': { transform: 'scale(1.15)' },
                }}
              />
            ))}
          </Box>
          {/* Custom colour input */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography sx={{ fontSize: '11px', color: 'text.secondary' }}>Custom</Typography>
            <Box
              component="input"
              type="color"
              value={seriesColor}
              onChange={e => setSeriesColor(e.target.value)}
              sx={{
                width: 32, height: 26, borderRadius: '5px', border: '1px solid', borderColor: 'divider',
                cursor: 'pointer', p: 0.25, bgcolor: 'transparent',
              }}
            />
            <Typography sx={{ fontSize: '11px', color: 'text.disabled', fontFamily: 'monospace' }}>{seriesColor}</Typography>
          </Box>
        </Popover>

        <Box sx={{ flex: 1 }} />

        {/* Right actions — AI Overview (contextual) */}
        <Box sx={{ display: 'flex', border: '1px solid', borderColor: showOverview ? TEAL : 'divider', borderRadius: 1, overflow: 'hidden', transition: 'border-color 0.2s' }}>
          <Button
            startIcon={
              regenerating
                ? <AutoAwesomeIcon sx={{ fontSize: '14px !important', color: TEAL, animation: 'spin 1s linear infinite', '@keyframes spin': { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } } }} />
                : <AutoAwesomeIcon sx={{ fontSize: '14px !important', color: showOverview ? TEAL : 'text.disabled' }} />
            }
            onClick={() => !showOverview && setShowOverview(true)}
            sx={{
              textTransform: 'none', fontSize: '0.82rem', px: 1.25, borderRadius: 0,
              color: showOverview ? TEAL : 'text.secondary',
              bgcolor: showOverview ? `${TEAL}08` : 'transparent',
              fontWeight: showOverview ? 600 : 400,
            }}
          >
            {regenerating ? 'Generating…' : showOverview ? 'AI Overview' : 'Add AI Overview'}
          </Button>
          {showOverview && (
            <>
              <Divider orientation="vertical" flexItem />
              <IconButton size="small" sx={{ borderRadius: 0, px: 0.75 }} onClick={e => setOverviewAnchor(e.currentTarget)}>
                <ArrowDropDownIcon fontSize="small" />
              </IconButton>
            </>
          )}
        </Box>
        <Menu anchorEl={overviewAnchor} open={Boolean(overviewAnchor)} onClose={() => setOverviewAnchor(null)}>
          <MenuItem sx={{ fontSize: '13px', gap: 1 }} onClick={handleRegenerate}>
            <RefreshOutlinedIcon sx={{ fontSize: 15, color: TEAL }} /> Regenerate
          </MenuItem>
          <MenuItem sx={{ fontSize: '13px', gap: 1, color: 'error.main' }} onClick={() => { setShowOverview(false); setOverviewAnchor(null) }}>
            <DeleteOutlineIcon sx={{ fontSize: 15 }} /> Remove from newsletter
          </MenuItem>
        </Menu>
        <Box sx={{ display: 'flex', border: '1px solid', borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
          <Button startIcon={<SaveOutlinedIcon sx={{ fontSize: '15px !important' }} />} sx={{ color: 'text.primary', textTransform: 'none', fontSize: '0.82rem', px: 1.5, borderRadius: 0 }}>
            Save
          </Button>
          <Divider orientation="vertical" flexItem />
          <IconButton size="small" sx={{ borderRadius: 0, px: 0.75 }} onClick={e => setSaveAnchor(e.currentTarget)}>
            <ArrowDropDownIcon fontSize="small" />
          </IconButton>
        </Box>
        <Button
          variant="contained"
          startIcon={<SendOutlinedIcon sx={{ fontSize: '15px !important' }} />}
          sx={{ bgcolor: isReady ? AMBER : PURPLE, color: '#fff', textTransform: 'none', fontWeight: 600, fontSize: '0.82rem', '&:hover': { bgcolor: isReady ? '#9a4e08' : '#9a2088' } }}
        >
          {isReady ? 'Schedule & Send' : 'Settings & Schedule'}
        </Button>
        <Menu anchorEl={saveAnchor} open={Boolean(saveAnchor)} onClose={() => setSaveAnchor(null)}>
          <MenuItem sx={{ fontSize: '13px' }} onClick={() => setSaveAnchor(null)}>Save draft</MenuItem>
          <MenuItem sx={{ fontSize: '13px' }} onClick={() => setSaveAnchor(null)}>Save and preview</MenuItem>
        </Menu>
      </Box>

      {/* ── Body ── */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden', userSelect: isDragging ? 'none' : 'auto', cursor: isDragging ? 'col-resize' : 'auto' }}>

        {/* ── Left: newsletter canvas ── */}
        <Box sx={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4, px: 4, bgcolor: 'grey.100' }}>
          <Box style={{ fontFamily }} sx={{ width: '100%', maxWidth: 660, bgcolor: 'background.paper', boxShadow: '0 2px 16px rgba(0,0,0,0.10)', borderRadius: '2px', '& .MuiTypography-root': { fontFamily: 'inherit' } }}>
            {/* Coloured header bar */}
            <Box sx={{ bgcolor: seriesColor, py: 1, px: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '11px' }}>
                {meta.edition} Edition · {meta.cadence}
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', textDecoration: 'underline', cursor: 'pointer' }}>
                View in browser
              </Typography>
            </Box>

            {/* Newsletter header block */}
            <Box sx={{ px: 3, py: 2.5, borderBottom: '1px solid', borderColor: 'divider', cursor: 'text', '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' }, display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Brand logo */}
              <Box
                onClick={() => fileInputRef.current?.click()}
                sx={{
                  width: 52, height: 52, flexShrink: 0,
                  bgcolor: logoSrc ? '#fff' : seriesColor,
                  borderRadius: '8px',
                  border: logoSrc ? '1px solid' : 'none',
                  borderColor: 'divider',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', position: 'relative', overflow: 'hidden',
                  transition: 'background-color 0.2s',
                  '&:hover .logo-overlay': { opacity: 1 },
                }}
              >
                {logoSrc ? (
                  <Box
                    component="img"
                    src={logoSrc}
                    alt="Brand logo"
                    sx={{ width: '100%', height: '100%', objectFit: 'contain', p: 0.5 }}
                  />
                ) : (
                  <AddPhotoAlternateOutlinedIcon sx={{ fontSize: 22, color: 'rgba(255,255,255,0.85)' }} />
                )}
                <Box className="logo-overlay" sx={{
                  position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.38)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0.25,
                  opacity: 0, transition: 'opacity 0.15s',
                }}>
                  <FileUploadOutlinedIcon sx={{ fontSize: 15, color: '#fff' }} />
                  <Typography sx={{ fontSize: '8px', color: '#fff', fontWeight: 600 }}>{logoSrc ? 'Replace' : 'Upload'}</Typography>
                </Box>
              </Box>
              <Box>
                <Typography sx={{ fontSize: '22px', fontWeight: 800, color: seriesColor, mb: 0.25, lineHeight: 1.2 }}>{meta.name}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 0.5 }}>
                  <Box sx={{ width: 28, height: 3, borderRadius: 1, bgcolor: seriesColor, opacity: 0.4 }} />
                  <Typography sx={{ fontSize: '12px', color: 'text.secondary', fontWeight: 500 }}>{meta.edition} Edition</Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ px: 3, py: 1.5, borderBottom: '1px dashed', borderColor: 'grey.200', cursor: 'text', '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' } }}>
              {isReady
                ? <Typography sx={{ fontSize: '13px', color: 'text.secondary', lineHeight: 1.6 }}>
                    Welcome to your April 2026 media coverage digest. This edition covers your top earned media wins, key industry trends, and a competitive landscape snapshot — all curated from your Explore searches and Monitor streams.
                  </Typography>
                : <Typography sx={{ color: 'text.disabled', fontSize: '13px', fontStyle: 'italic' }}>Add an intro message...</Typography>
              }
            </Box>

            {/* AI Overview block — controlled by toolbar toggle */}
            {showOverview && (
              <Box sx={{ mx: 3, my: 2, borderRadius: '8px', overflow: 'hidden', border: `1px solid rgba(0,130,127,0.18)`, bgcolor: 'rgba(0,130,127,0.03)' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, px: 2, py: 1, bgcolor: 'rgba(0,130,127,0.07)', borderBottom: '1px solid rgba(0,130,127,0.12)' }}>
                  <AutoAwesomeIcon sx={{ fontSize: 13, color: TEAL }} />
                  <Typography sx={{ fontSize: '11px', fontWeight: 700, color: TEAL, textTransform: 'uppercase', letterSpacing: '0.06em' }}>AI Overview</Typography>
                  <Box sx={{ flex: 1 }} />
                  {regenerating && (
                    <Typography sx={{ fontSize: '10px', color: TEAL, fontStyle: 'italic' }}>Regenerating…</Typography>
                  )}
                </Box>
                {regenerating ? (
                  <Box sx={{ px: 2, py: 1.5, display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                    {[100, 85, 90, 60].map((w, i) => (
                      <Box key={i} sx={{ height: 11, width: `${w}%`, borderRadius: 1, bgcolor: 'rgba(0,130,127,0.1)',
                        animation: 'pulse 1.4s ease-in-out infinite', animationDelay: `${i * 0.1}s`,
                        '@keyframes pulse': { '0%,100%': { opacity: 0.4 }, '50%': { opacity: 1 } }
                      }} />
                    ))}
                  </Box>
                ) : (
                  <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography sx={{ fontSize: '13px', color: 'text.secondary', lineHeight: 1.7, fontStyle: 'italic' }}>
                      This month's digest highlights a <strong style={{ fontStyle: 'normal', color: '#1a7a45' }}>strong earned media performance</strong> — Q1 coverage is up 34% year-over-year across your key brand topics. The industry conversation is shifting decisively toward AI-powered media intelligence, with your brand well-positioned in that narrative. Competitive monitoring shows a <strong style={{ fontStyle: 'normal', color: '#1a7a45' }}>+12% share-of-voice gain</strong> versus primary competitors this month, driven by product launch coverage and executive thought leadership placements.
                    </Typography>
                  </Box>
                )}
              </Box>
            )}

            {/* Audiocast block */}
            {audioCastBlock && (
              <AudiocastBlock
                generating={audioCastGenerating}
                generated={audioCastGenerated}
                playing={audioCastPlaying}
                onPlayPause={() => setAudioCastPlaying(v => !v)}
                onRemove={() => { setAudioCastBlock(false); setAudioCastGenerated(false); setAudioCastPlaying(false) }}
                accentColor={seriesColor}
              />
            )}

            {/* Analyze widget — controlled by toolbar toggle */}
            {showAnalyzeWidget && (
              <AnalyzeWidget
                accentColor={seriesColor}
                onRemove={() => setShowAnalyzeWidget(false)}
              />
            )}

            {/* AI-added widgets — rendered in the newsletter canvas */}
            {addedWidgets.length > 0 && RECOMMENDED_WIDGETS.filter(w => addedWidgets.includes(w.id)).map(widget => (
              <CanvasWidget
                key={widget.id}
                widget={widget}
                accentColor={seriesColor}
                onRemove={() => toggleWidget(widget.id)}
              />
            ))}

            {/* Section blocks — driven by sections state so dropped articles appear */}
            <Box sx={{ p: 2.5 }}>
              {sections.map(section => (
                <SectionBlock
                  key={section.id}
                  label={section.label}
                  hasContent={section.items.length > 0}
                  accentColor={seriesColor}
                  onArticleDrop={(e) => handleSectionDrop(section.id, e)}
                >
                  {section.items.map(item => (
                    <CanvasArticleItem
                      key={item.id}
                      headline={item.headline}
                      source={item.source}
                      excerpt={item.excerpt}
                      sentiment={item.sentiment}
                      aiCurated={item.aiCurated}
                      aiReason={item.aiReason}
                    />
                  ))}
                </SectionBlock>
              ))}

              {/* Add section button */}
              <Button
                startIcon={<AddIcon />}
                fullWidth
                sx={{ border: '1px dashed', borderColor: 'grey.300', textTransform: 'none', color: 'text.disabled', py: 1.5, mt: 1, '&:hover': { borderColor: TEAL, color: TEAL, bgcolor: 'rgba(0,130,127,0.03)' } }}
              >
                Add section
              </Button>
            </Box>

            {/* Footer */}
            <Box sx={{ mt: 1, overflow: 'hidden' }}>
              <Box sx={{ height: 4, bgcolor: seriesColor }} />
              <Box sx={{ px: 3, py: 2, bgcolor: `${seriesColor}0d` }}>
                <Typography sx={{ fontSize: '11px', color: 'text.disabled', textAlign: 'center' }}>
                  © 2026 Meltwater · <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Unsubscribe</span> · Privacy Policy
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Resize handle */}
        <Box
          onMouseDown={onResizeStart}
          sx={{
            width: 5, flexShrink: 0, cursor: 'col-resize', position: 'relative', zIndex: 1,
            bgcolor: isDragging ? TEAL : 'divider',
            transition: isDragging ? 'none' : 'background-color 0.15s',
            '&:hover': { bgcolor: TEAL },
            // wider invisible hit area so it's easier to grab
            '&::before': {
              content: '""', position: 'absolute', inset: '0 -4px',
            },
          }}
        />

        {/* ── Right panel: Audiocast OR curated articles ── */}
        {audioCastPanelOpen ? (
          <AudiocastPanel
            onClose={() => setAudioCastPanelOpen(false)}
            onAdd={handleAddAudiocast}
            generated={audioCastGenerated}
            onRegenerate={handleRegenerateAudiocast}
          />
        ) : (
        <Box sx={{ width: panelWidth, flexShrink: 0, display: 'flex', flexDirection: 'column', bgcolor: 'background.paper', borderLeft: '1px solid', borderColor: 'divider', overflow: 'hidden', userSelect: isDragging ? 'none' : 'auto' }}>

          {/* Tabs */}
          <Box sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
            <Tabs
              value={rightTab}
              onChange={(_, v) => setRightTab(v)}
              sx={{ '& .MuiTab-root': { textTransform: 'none', fontSize: '0.82rem', minHeight: 44 }, '& .MuiTabs-indicator': { bgcolor: TEAL } }}
            >
              <Tab
                icon={<AutoAwesomeIcon sx={{ fontSize: 14, color: rightTab === 0 ? TEAL : 'text.disabled' }} />}
                iconPosition="start"
                label={`AI Curated (${articles.length})`}
              />
              <Tab
                icon={<SearchIcon sx={{ fontSize: 14 }} />}
                iconPosition="start"
                label="Search"
              />
              <Tab
                icon={<SettingsOutlinedIcon sx={{ fontSize: 14 }} />}
                iconPosition="start"
                label="Settings"
              />
            </Tabs>
          </Box>

          {/* Tab: AI Curated */}
          {rightTab === 0 && (
            <AiCuratedPanel articles={articles} addedCount={addedCount} toggleAdd={toggleAdd} generateSummary={generateSummary} addedWidgets={addedWidgets} toggleWidget={toggleWidget} />
          )}

          {/* Tab: Search */}
          {rightTab === 1 && (
            <SearchTab />
          )}

          {/* Tab: Settings */}
          {rightTab === 2 && (
            <SettingsTabContent />
          )}
        </Box>
        )}
      </Box>
    </Box>
  )
}

// ── AI Curated panel — articles + widgets sub-tabs ────────────────────────────
function AiCuratedPanel({ articles, addedCount, toggleAdd, generateSummary, addedWidgets, toggleWidget }) {
  const [subTab, setSubTab] = useState('articles') // 'articles' | 'widgets'
  const [populating, setPopulating] = useState(false)
  const [populated, setPopulated] = useState(false)
  const availableWidgetCount = RECOMMENDED_WIDGETS.filter(w => !addedWidgets.includes(w.id)).length

  const handleAutoPopulate = () => {
    setPopulating(true)
    setPopulated(false)
    setTimeout(() => { setPopulating(false); setPopulated(true) }, 1800)
  }

  const SubTabBtn = ({ id, icon, label, count }) => {
    const active = subTab === id
    return (
      <Box
        onClick={() => setSubTab(id)}
        sx={{
          display: 'flex', alignItems: 'center', gap: 0.6,
          px: 1.25, py: 0.6, cursor: 'pointer', borderRadius: '6px',
          bgcolor: active ? (id === 'widgets' ? 'rgba(232,108,90,0.1)' : TEAL_LIGHT) : 'transparent',
          border: `1.5px solid ${active ? (id === 'widgets' ? 'rgba(232,108,90,0.3)' : 'rgba(0,130,127,0.3)') : 'transparent'}`,
          '&:hover': { bgcolor: active ? undefined : 'rgba(0,0,0,0.04)' },
          transition: 'all 0.12s',
        }}
      >
        {icon}
        <Typography sx={{ fontSize: '12px', fontWeight: active ? 700 : 500, color: active ? (id === 'widgets' ? '#e86c5a' : TEAL) : 'text.secondary', lineHeight: 1 }}>
          {count} {label}
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Source filter chips */}
      <Box sx={{ px: 1.5, py: 1, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 0.75, flexWrap: 'wrap' }}>
        {Object.entries(SOURCE_CFG).filter(([key]) => key === 'Analyze' || key === 'Searches').map(([key, { color, bg, Icon }]) => {
          const count = articles.filter(a => a.origin === key).length
          if (!count) return null
          return (
            <Box key={key} sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, bgcolor: bg, borderRadius: '20px', px: 1, py: 0.35, border: `1px solid ${color}30` }}>
              <Icon sx={{ fontSize: 11, color, flexShrink: 0 }} />
              <Typography sx={{ fontSize: '11px', fontWeight: 600, color }}>{key}</Typography>
              <Typography sx={{ fontSize: '11px', color, opacity: 0.7 }}>{count}</Typography>
            </Box>
          )
        })}
        <Box sx={{ flex: 1 }} />
        <Tooltip title="Refresh curated articles">
          <IconButton size="small" sx={{ p: 0.4, color: 'text.disabled' }}>
            <RefreshOutlinedIcon sx={{ fontSize: 15 }} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Sub-tab switcher: articles ↔ widgets */}
      <Box sx={{ px: 1.5, py: 0.75, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 0.75 }}>
        <SubTabBtn
          id="articles"
          label="articles"
          count={articles.length}
          icon={<ArticleOutlinedIcon sx={{ fontSize: 13, color: subTab === 'articles' ? TEAL : 'text.disabled' }} />}
        />
        <SubTabBtn
          id="widgets"
          label="widgets"
          count={availableWidgetCount}
          icon={<WidgetsOutlinedIcon sx={{ fontSize: 13, color: subTab === 'widgets' ? '#e86c5a' : 'text.disabled' }} />}
        />
        <Box sx={{ flex: 1 }} />

        {/* Auto-populate button */}
        <Tooltip title="Automatically pull the best articles and widgets into this edition" placement="top">
          <Button
            size="small"
            variant="outlined"
            onClick={handleAutoPopulate}
            disabled={populating}
            startIcon={populated
              ? <CheckCircleIcon sx={{ fontSize: 13 }} />
              : <AutoAwesomeIcon sx={{ fontSize: 13, ...(populating ? { animation: 'spin 1s linear infinite', '@keyframes spin': { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } } } : {}) }} />
            }
            sx={{
              textTransform: 'none', fontSize: '11px', py: 0.35, px: 1, fontWeight: 600,
              borderColor: populated ? TEAL : 'rgba(0,130,127,0.4)',
              color: populated ? TEAL : TEAL,
              bgcolor: populated ? TEAL_LIGHT : 'transparent',
              '&:hover': { borderColor: TEAL, bgcolor: TEAL_LIGHT },
              '&.Mui-disabled': { borderColor: 'rgba(0,130,127,0.25)', color: 'rgba(0,130,127,0.5)' },
              transition: 'all 0.2s',
            }}
          >
            {populating ? 'Populating…' : populated ? 'Populated' : 'Auto-populate'}
          </Button>
        </Tooltip>

      </Box>

      {/* AI match score explanation banner */}
      {subTab === 'articles' && (
        <Box sx={{ px: 1.5, py: 0.875, bgcolor: 'rgba(0,130,127,0.05)', borderBottom: '1px solid rgba(0,130,127,0.1)', display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <AutoAwesomeIcon sx={{ fontSize: 11, color: TEAL, flexShrink: 0 }} />
          <Typography sx={{ fontSize: '11px', color: 'text.secondary', lineHeight: 1.4 }}>
            Articles ranked by <Box component="span" sx={{ fontWeight: 700, color: TEAL }}>AI match score</Box>. The top {addedCount} were auto-added to this edition.
          </Typography>
        </Box>
      )}

      {/* Content */}
      <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
        {subTab === 'articles' && articles.map((article, idx) => {
          const prevAdded = idx > 0 && articles[idx - 1].added
          const showThreshold = !article.added && prevAdded
          return (
            <Box key={article.id}>
              {showThreshold && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1.5, py: 0.75, bgcolor: 'rgba(0,0,0,0.02)', borderTop: '1px dashed rgba(0,0,0,0.12)', borderBottom: '1px dashed rgba(0,0,0,0.12)' }}>
                  <Box sx={{ flex: 1, height: '1px', bgcolor: 'rgba(0,0,0,0.1)' }} />
                  <Typography sx={{ fontSize: '10px', color: 'text.disabled', whiteSpace: 'nowrap', px: 0.5 }}>
                    Below auto-add threshold
                  </Typography>
                  <Box sx={{ flex: 1, height: '1px', bgcolor: 'rgba(0,0,0,0.1)' }} />
                </Box>
              )}
              <CuratedArticleCard
                article={article}
                onToggleAdd={toggleAdd}
                onGenerateSummary={generateSummary}
              />
            </Box>
          )
        })}
        {subTab === 'widgets' && <WidgetsTab addedWidgets={addedWidgets} toggleWidget={toggleWidget} />}
      </Box>
    </Box>
  )
}

// ── Widgets tab ───────────────────────────────────────────────────────────────
const RECOMMENDED_WIDGETS = [
  {
    id: 'mention-volume',
    title: 'Mention Volume',
    subtitle: 'Last 30 days | Mentions',
    snapshot: 'Mar 22 – Apr 20, 2026',
    metricValue: '12.4K',
    metricLabel: 'total mentions',
    metricDelta: '+18%',
    metricUp: true,
    preview: 'mentionTrend',
    aiReason: 'Mention volume spiked +18% this period, driven by your Q1 earnings coverage. This gives readers immediate context on how much conversation your brand generated during the edition window.',
  },
  {
    id: 'share-of-voice',
    title: 'Share of Voice',
    subtitle: 'Last 30 days | Coverage',
    snapshot: 'Mar 22 – Apr 20, 2026',
    metricValue: '42%',
    metricLabel: 'share of voice',
    metricDelta: '+5pp',
    metricUp: true,
    preview: 'sov',
    aiReason: 'Your brand holds the leading share this period. Including this helps readers benchmark competitive position at a glance — especially relevant given the competitive coverage in this edition.',
  },
  {
    id: 'sentiment-breakdown',
    title: 'Total Avg. Sentiment',
    subtitle: 'Last 30 days | Net Sentiment',
    snapshot: 'Mar 22 – Apr 20, 2026',
    metricValue: '+15.39',
    metricLabel: 'net sentiment',
    metricDelta: '+3.2',
    metricUp: true,
    preview: 'sentiment',
    aiReason: 'Sentiment improved significantly vs. last period, largely tied to the positive product launch coverage curated in this edition. This widget gives readers the "so what" behind the article selection.',
  },
  {
    id: 'top-sources',
    title: 'Top Sources',
    subtitle: 'Last 30 days | Mentions',
    snapshot: 'Mar 22 – Apr 20, 2026',
    metricValue: '17',
    metricLabel: 'sources tracked',
    preview: 'topSources',
    aiReason: 'Reuters, AP, and TechCrunch drove the majority of coverage this period. Including source attribution helps readers evaluate the quality and reach of the media attention.',
  },
  {
    id: 'sentiment-by-source',
    title: 'Sentiment by Source Type',
    subtitle: 'Last 30 days | Mentions',
    snapshot: 'Mar 22 – Apr 20, 2026',
    metricValue: 'X / News',
    metricLabel: 'top sources',
    preview: 'sentimentBySource',
    aiReason: 'X (Twitter) and News-Online dominate coverage volume, and both skew positive this period. This context helps readers understand which channels are amplifying your brand story.',
  },
  {
    id: 'reach-trend',
    title: 'Reach Over Time',
    subtitle: 'Last 30 days | Audience reach',
    snapshot: 'Mar 22 – Apr 20, 2026',
    metricValue: '84M',
    metricLabel: 'total reach',
    metricDelta: '+22%',
    metricUp: true,
    preview: 'reachArea',
    aiReason: 'Audience reach hit a 90-day high this period, correlating with the high-reach Reuters and AP articles selected for this edition. This adds tangible proof of impact for readers.',
  },
  {
    id: 'word-cloud',
    title: 'Top Keywords',
    subtitle: 'Last 30 days | Mentions',
    snapshot: 'Mar 22 – Apr 20, 2026',
    metricValue: '142',
    metricLabel: 'unique themes',
    preview: 'wordCloud',
    aiReason: '"AI", "Earnings", and "Product Launch" are the dominant themes this period — all reflected in the curated articles. This widget surfaces the narrative thread running through the edition.',
  },
  {
    id: 'geo-distribution',
    title: 'Geographic Distribution',
    subtitle: 'Last 30 days | Coverage origin',
    snapshot: 'Mar 22 – Apr 20, 2026',
    metricValue: '38',
    metricLabel: 'countries',
    preview: 'geo',
    aiReason: 'Coverage is concentrated in the US, UK, and Germany — matching the regional focus of this edition\'s audience segments. Useful context for newsletters sent to regional stakeholders.',
  },
]

// ── Dashboard-style widget preview ──────────────────────────────────────────
function DashboardWidgetPreview({ widget }) {
  const teal = TEAL
  const green = '#4caf50'
  const red = '#e53935'
  const grey = '#bdbdbd'
  const purple = '#B627A1'
  const amber = '#e86c5a'

  const renderChart = () => {
    if (widget.preview === 'mentionTrend') return (
      <Box sx={{ px: 1, pt: 0.5, pb: 0.25 }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.75, mb: 0.75 }}>
          <Typography sx={{ fontSize: '20px', fontWeight: 700, color: 'text.primary', lineHeight: 1 }}>{widget.metricValue}</Typography>
          <Typography sx={{ fontSize: '10px', color: 'text.secondary' }}>{widget.metricLabel}</Typography>
          {widget.metricDelta && (
            <Typography sx={{ fontSize: '10px', fontWeight: 600, color: widget.metricUp ? green : red, ml: 'auto' }}>{widget.metricDelta}</Typography>
          )}
        </Box>
        <Box component="svg" viewBox="0 0 200 52" sx={{ width: '100%', height: 52 }}>
          {/* Area fill */}
          <polygon points="0,44 20,40 40,42 60,30 80,34 100,22 120,18 140,24 160,14 180,10 200,12 200,52 0,52"
            fill={`${teal}18`} />
          {/* Line */}
          <polyline points="0,44 20,40 40,42 60,30 80,34 100,22 120,18 140,24 160,14 180,10 200,12"
            fill="none" stroke={teal} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
        </Box>
      </Box>
    )

    if (widget.preview === 'sentiment') return (
      <Box sx={{ px: 1, pt: 0.5, pb: 0.25 }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.75, mb: 1 }}>
          <Typography sx={{ fontSize: '22px', fontWeight: 700, color: teal, lineHeight: 1 }}>{widget.metricValue}</Typography>
          <Typography sx={{ fontSize: '10px', color: 'text.secondary' }}>{widget.metricLabel}</Typography>
        </Box>
        {/* Stacked bar chart */}
        <Box component="svg" viewBox="0 0 200 50" sx={{ width: '100%', height: 50 }}>
          {/* Grouped bars per date */}
          {[
            [50,30,18],[42,26,20],[38,22,14],[30,28,16],[55,20,12],
            [34,32,18],[28,24,14],[45,28,16],[40,30,14],[22,18,12],
          ].map(([g,pos,neg], i) => {
            const x = i * 20 + 2
            const total = g + pos + neg
            const scale = 44 / total
            const gh = g * scale, ph = pos * scale, nh = neg * scale
            return (
              <g key={i}>
                <rect x={x} y={50-nh-ph-gh} width="14" height={gh} fill={grey} rx="1" />
                <rect x={x} y={50-nh-ph} width="14" height={ph} fill={green} rx="1" />
                <rect x={x} y={50-nh} width="14" height={nh} fill={red} rx="1" />
              </g>
            )
          })}
        </Box>
        {/* Legend */}
        <Box sx={{ display: 'flex', gap: 1.5, mt: 0.5 }}>
          {[['Neutral', grey],['Positive', green],['Negative', red]].map(([l,c]) => (
            <Box key={l} sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: c }} />
              <Typography sx={{ fontSize: '9px', color: 'text.secondary' }}>{l}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    )

    if (widget.preview === 'sov') return (
      <Box sx={{ px: 1, pt: 0.5, pb: 0.25, display: 'flex', gap: 1.5, alignItems: 'center' }}>
        <Box component="svg" viewBox="0 0 72 72" sx={{ width: 72, height: 72, flexShrink: 0 }}>
          <circle cx="36" cy="36" r="26" fill="none" stroke={teal} strokeWidth="14" strokeDasharray="69 31" strokeDashoffset="25" />
          <circle cx="36" cy="36" r="26" fill="none" stroke={purple} strokeWidth="14" strokeDasharray="22 78" strokeDashoffset="-44" />
          <circle cx="36" cy="36" r="26" fill="none" stroke={amber} strokeWidth="14" strokeDasharray="9 91" strokeDashoffset="-66" />
          <circle cx="36" cy="36" r="20" fill="white" />
          <text x="36" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={teal}>42%</text>
          <text x="36" y="44" textAnchor="middle" fontSize="7.5" fill="#888">your brand</text>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.6 }}>
          {[['Your Brand', teal, '42%'],['Competitor A', purple, '28%'],['Competitor B', amber, '18%'],['Others', grey, '12%']].map(([name,color,pct]) => (
            <Box key={name} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: color, flexShrink: 0 }} />
              <Typography sx={{ fontSize: '9.5px', color: 'text.secondary', minWidth: 70 }}>{name}</Typography>
              <Typography sx={{ fontSize: '9.5px', fontWeight: 700, color: 'text.primary' }}>{pct}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    )

    if (widget.preview === 'topSources') return (
      <Box sx={{ px: 1, pt: 0.5, pb: 0.5 }}>
        {[['X', '158K'],['News - Online', null],['Pinterest', null],['YouTube', null],['Reddit', null]].map(([src, a], i) => (
          <Box key={src} sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: i < 4 ? 0.6 : 0 }}>
            <Typography sx={{ fontSize: '9px', color: 'text.disabled', width: 10 }}>{i+1}</Typography>
            <Typography sx={{ fontSize: '10px', color: 'text.primary', flex: 1 }}>{src}</Typography>
            {a ? (
              <Box sx={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                <Box sx={{ height: 6, width: 28, bgcolor: grey, borderRadius: '2px' }} />
                <Box sx={{ height: 6, width: 44, bgcolor: teal, borderRadius: '2px' }} />
                <Box sx={{ height: 6, width: 10, bgcolor: red, borderRadius: '2px' }} />
              </Box>
            ) : (
              <Box sx={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                <Box sx={{ height: 6, width: 6, bgcolor: green, borderRadius: '2px' }} />
                <Box sx={{ height: 6, width: 6, bgcolor: teal, borderRadius: '2px' }} />
                <Box sx={{ height: 6, width: 6, bgcolor: red, borderRadius: '2px' }} />
              </Box>
            )}
          </Box>
        ))}
      </Box>
    )

    if (widget.preview === 'sentimentBySource') return (
      <Box sx={{ px: 1, pt: 0.5, pb: 0.5 }}>
        {[['X', 78, 14],['News - Online', 60, 28],['Pinterest', 55, 30],['YouTube', 52, 33],['Reddit', 48, 38]].map(([src, pos, neg], i) => (
          <Box key={src} sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: i < 4 ? 0.6 : 0 }}>
            <Typography sx={{ fontSize: '9px', color: 'text.disabled', width: 10 }}>{i+1}</Typography>
            <Typography sx={{ fontSize: '10px', color: 'text.primary', width: 65, flexShrink: 0 }}>{src}</Typography>
            <Box sx={{ flex: 1, height: 8, borderRadius: '3px', overflow: 'hidden', display: 'flex', bgcolor: 'rgba(0,0,0,0.05)' }}>
              <Box sx={{ height: '100%', width: `${pos}%`, bgcolor: green }} />
              <Box sx={{ height: '100%', width: `${100-pos-neg}%`, bgcolor: teal }} />
              <Box sx={{ height: '100%', width: `${neg}%`, bgcolor: red }} />
            </Box>
          </Box>
        ))}
      </Box>
    )

    if (widget.preview === 'reachArea') return (
      <Box sx={{ px: 1, pt: 0.5, pb: 0.25 }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.75, mb: 0.75 }}>
          <Typography sx={{ fontSize: '20px', fontWeight: 700, color: 'text.primary', lineHeight: 1 }}>{widget.metricValue}</Typography>
          <Typography sx={{ fontSize: '10px', color: 'text.secondary' }}>{widget.metricLabel}</Typography>
          {widget.metricDelta && (
            <Typography sx={{ fontSize: '10px', fontWeight: 600, color: green, ml: 'auto' }}>{widget.metricDelta}</Typography>
          )}
        </Box>
        <Box component="svg" viewBox="0 0 200 52" sx={{ width: '100%', height: 52 }}>
          <polygon points="0,48 20,44 40,38 60,42 80,28 100,30 120,20 140,16 160,10 180,6 200,8 200,52 0,52"
            fill={`${purple}18`} />
          <polyline points="0,48 20,44 40,38 60,42 80,28 100,30 120,20 140,16 160,10 180,6 200,8"
            fill="none" stroke={purple} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
        </Box>
      </Box>
    )

    if (widget.preview === 'wordCloud') return (
      <Box sx={{ px: 1, pt: 0.75, pb: 0.5, display: 'flex', flexWrap: 'wrap', gap: 0.6, alignItems: 'center' }}>
        {[['AI',16],['Earnings',14],['Product Launch',13],['Media',11],['PR',10],['Coverage',10],['Reach',9],['Strategy',9],['Brand',8],['Digital',8]].map(([word, size]) => (
          <Typography key={word} sx={{ fontSize: `${size}px`, color: teal, fontWeight: 600, opacity: 0.4 + (size - 8) * 0.07, lineHeight: 1.3 }}>{word}</Typography>
        ))}
      </Box>
    )

    if (widget.preview === 'geo') return (
      <Box sx={{ px: 1, pt: 0.5, pb: 0.5 }}>
        {[['United States', 38],['United Kingdom', 22],['Germany', 14],['Australia', 10],['Canada', 8]].map(([country, pct], i) => (
          <Box key={country} sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: i < 4 ? 0.5 : 0 }}>
            <Typography sx={{ fontSize: '10px', color: 'text.primary', flex: 1 }}>{country}</Typography>
            <Box sx={{ width: 60, height: 6, bgcolor: 'rgba(0,0,0,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
              <Box sx={{ height: '100%', width: `${pct / 38 * 100}%`, bgcolor: teal, borderRadius: '3px' }} />
            </Box>
            <Typography sx={{ fontSize: '9.5px', color: 'text.secondary', width: 24, textAlign: 'right' }}>{pct}%</Typography>
          </Box>
        ))}
      </Box>
    )

    return null
  }

  return (
    <Box sx={{ border: '1px solid rgba(0,0,0,0.1)', borderRadius: '6px', overflow: 'hidden', bgcolor: 'background.paper' }}>
      {/* Widget header — matches dashboard style */}
      <Box sx={{ px: 1.25, pt: 1, pb: 0.75, borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box>
          <Typography sx={{ fontSize: '11px', fontWeight: 600, color: 'text.primary', lineHeight: 1.2 }}>{widget.title}</Typography>
          <Typography sx={{ fontSize: '9.5px', color: 'text.secondary', mt: 0.2 }}>{widget.subtitle}</Typography>
        </Box>
        <MoreVertIcon sx={{ fontSize: 13, color: 'text.disabled', mt: 0.25 }} />
      </Box>
      {/* Chart body */}
      <Box sx={{ bgcolor: 'rgba(0,0,0,0.01)' }}>
        {renderChart()}
      </Box>
      {/* Snapshot footer */}
      <Box sx={{ px: 1.25, py: 0.6, bgcolor: 'rgba(0,130,127,0.04)', borderTop: '1px solid rgba(0,130,127,0.1)', display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <CalendarMonthOutlinedIcon sx={{ fontSize: 10, color: TEAL }} />
        <Typography sx={{ fontSize: '9px', color: TEAL, fontWeight: 500 }}>Snapshot: {widget.snapshot}</Typography>
      </Box>
    </Box>
  )
}

const AUTO_ADDED_IDS = ['mention-volume', 'share-of-voice', 'sentiment-breakdown']

function WidgetsTab({ addedWidgets }) {
  const [expandedAi, setExpandedAi] = useState({})
  const toggleAi = id => setExpandedAi(prev => ({ ...prev, [id]: !prev[id] }))

  const available = RECOMMENDED_WIDGETS.filter(w => !addedWidgets.includes(w.id))

  if (available.length === 0) return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 5, px: 3, gap: 1 }}>
      <CheckCircleIcon sx={{ fontSize: 28, color: TEAL, opacity: 0.6 }} />
      <Typography sx={{ fontSize: '13px', fontWeight: 600, color: 'text.primary', textAlign: 'center' }}>
        All widgets added
      </Typography>
      <Typography sx={{ fontSize: '11.5px', color: 'text.secondary', textAlign: 'center', lineHeight: 1.5 }}>
        All recommended widgets have been added to this edition. You can remove them from the newsletter canvas.
      </Typography>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {/* Widget cards */}
      <Box sx={{ px: 1.5, py: 1.25, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {available.map(widget => {
          const aiOpen = expandedAi[widget.id]
          return (
            <Box
              key={widget.id}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.effectAllowed = 'copy'
                e.dataTransfer.setData('widgetId', widget.id)
              }}
              sx={{
                border: '1.5px solid rgba(0,0,0,0.1)', borderRadius: '8px', overflow: 'hidden',
                bgcolor: 'background.paper', position: 'relative', cursor: 'grab',
                '&:active': { opacity: 0.7 },
                '& .widget-drag-handle': { opacity: 0 },
                '&:hover .widget-drag-handle': { opacity: 1 },
              }}
            >
              {/* Drag handle — left edge, hover only */}
              <Box className="widget-drag-handle" sx={{
                position: 'absolute', left: 0, top: 0, bottom: 0, width: 20,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'opacity 0.15s', pointerEvents: 'none', zIndex: 1,
                bgcolor: 'rgba(255,255,255,0.85)',
              }}>
                <DragIndicatorIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
              </Box>

              {/* Dashboard-style widget preview */}
              <Box sx={{ px: 1.25, pt: 1.25, pb: 1 }}>
                <DashboardWidgetPreview widget={widget} />
              </Box>

              {/* Why AI picked this — collapsible */}
              <Box sx={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                <Box
                  onClick={() => toggleAi(widget.id)}
                  sx={{
                    px: 1.5, py: 0.6, display: 'flex', alignItems: 'center', gap: 0.6, cursor: 'pointer',
                    bgcolor: aiOpen ? 'rgba(0,130,127,0.05)' : 'transparent',
                    '&:hover': { bgcolor: 'rgba(0,130,127,0.05)' }, transition: 'background 0.15s',
                  }}
                >
                  <AutoAwesomeIcon sx={{ fontSize: 11, color: TEAL }} />
                  <Typography sx={{ fontSize: '10.5px', fontWeight: 600, color: TEAL, flex: 1 }}>Why AI picked this</Typography>
                  <Box sx={{ transform: aiOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', display: 'flex' }}>
                    <ArrowDropDownIcon sx={{ fontSize: 16, color: TEAL }} />
                  </Box>
                </Box>
                {aiOpen && (
                  <Box sx={{ px: 1.5, pb: 1, pt: 0.25, bgcolor: 'rgba(0,130,127,0.03)' }}>
                    <Typography sx={{ fontSize: '11px', color: 'text.secondary', lineHeight: 1.55 }}>{widget.aiReason}</Typography>
                  </Box>
                )}
              </Box>
            </Box>
          )
        })}
      </Box>

      {/* Footer — added count */}
    </Box>
  )
}

// ── Search tab — manage which searches power this edition ─────────────────────
const ALL_AVAILABLE_SEARCHES = {
  'Explore Search': [
    { name: 'Meltwater Leadership', type: 'explore' },
    { name: 'Meltwater', type: 'explore' },
    { name: 'Google Alerts', type: 'explore' },
    { name: 'Cision', type: 'explore' },
    { name: 'Burrelles', type: 'explore' },
    { name: 'TVEyes', type: 'explore' },
    { name: 'LexisNexis Newsdesk', type: 'explore' },
  ],
  'RSS Feeds': [
    { name: 'TechCrunch', type: 'rss' },
    { name: 'PR Week RSS', type: 'rss' },
    { name: 'Digiday Feed', type: 'rss' },
  ],
  'Tags': [
    { name: 'SocialReach', type: 'tag' },
    { name: 'BrandHealth', type: 'tag' },
  ],
}

const SEARCH_TYPE_ICON = {
  explore: { Icon: SearchIcon,             color: '#4F6AF5' },
  rss:     { Icon: DynamicFeedOutlinedIcon, color: '#e86c5a' },
  tag:     { Icon: null,                   color: '#7c3aed', label: '#' },
}

function SearchTab() {
  const [active, setActive] = useState([
    { name: 'Brand Monitoring', type: 'explore' },
    { name: 'Meltwater Leadership', type: 'explore' },
  ])
  const [find, setFind] = useState('')
  const [showPicker, setShowPicker] = useState(false)
  const [expanded, setExpanded] = useState({ 'Explore Search': true, 'RSS Feeds': false, 'Tags': false })

  const toggle = (item) => {
    setActive(prev =>
      prev.find(a => a.name === item.name)
        ? prev.filter(a => a.name !== item.name)
        : [...prev, item]
    )
  }

  const isActive = (name) => active.some(a => a.name === name)

  const filtered = Object.fromEntries(
    Object.entries(ALL_AVAILABLE_SEARCHES).map(([cat, items]) => [
      cat,
      items.filter(i => i.name.toLowerCase().includes(find.toLowerCase())),
    ])
  )

  return (
    <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Active searches row */}
      <Box sx={{ px: 1.5, py: 1, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 0.75, flexWrap: 'wrap' }}>
        <Button
          size="small" variant="outlined" startIcon={<AddIcon sx={{ fontSize: 13 }} />}
          onClick={() => setShowPicker(v => !v)}
          sx={{ textTransform: 'none', fontSize: '0.78rem', borderColor: showPicker ? TEAL : 'divider', color: showPicker ? TEAL : 'text.primary', minWidth: 0, flexShrink: 0 }}
        >
          Add search
        </Button>
        {active.map(s => {
          const cfg = SEARCH_TYPE_ICON[s.type] || SEARCH_TYPE_ICON.explore
          return (
            <Chip
              key={s.name}
              size="small"
              icon={cfg.Icon ? <cfg.Icon sx={{ fontSize: '12px !important', color: `${cfg.color} !important` }} /> : <Typography sx={{ fontSize: '11px', fontWeight: 800, color: cfg.color, ml: '6px !important' }}>#</Typography>}
              label={s.name}
              onDelete={() => toggle(s)}
              sx={{ bgcolor: `${cfg.color}15`, border: `1px solid ${cfg.color}40`, '& .MuiChip-label': { fontSize: '0.72rem', color: cfg.color, fontWeight: 600 }, '& .MuiChip-deleteIcon': { color: `${cfg.color}80`, '&:hover': { color: cfg.color } } }}
            />
          )
        })}
        <Box sx={{ flex: 1 }} />
        <IconButton size="small" sx={{ color: 'text.secondary' }}><RefreshOutlinedIcon fontSize="small" /></IconButton>
      </Box>

      {/* Search picker panel */}
      {showPicker && (
        <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', flexShrink: 0 }}>
          {/* Find input */}
          <Box sx={{ px: 1.25, py: 0.875, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, bgcolor: 'rgba(0,0,0,0.04)', borderRadius: '6px', px: 1, py: 0.5 }}>
              <SearchIcon sx={{ fontSize: 13, color: 'text.disabled' }} />
              <input
                value={find}
                onChange={e => setFind(e.target.value)}
                placeholder="Find..."
                style={{ border: 'none', background: 'none', outline: 'none', fontSize: '12px', flex: 1, color: 'inherit', fontFamily: 'inherit' }}
              />
            </Box>
          </Box>

          {/* Categorised list */}
          <Box sx={{ maxHeight: 260, overflow: 'auto' }}>
            {Object.entries(filtered).map(([cat, items]) => {
              const showAll = expanded[cat]
              const visible = showAll ? items : items.slice(0, 6)
              if (items.length === 0) return null
              const catCfg = cat === 'Explore Search' ? SEARCH_TYPE_ICON.explore : cat === 'RSS Feeds' ? SEARCH_TYPE_ICON.rss : SEARCH_TYPE_ICON.tag
              return (
                <Box key={cat}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 1.5, pt: 1, pb: 0.25 }}>
                    <Typography sx={{ fontSize: '10px', fontWeight: 800, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{cat}</Typography>
                    {active.some(a => items.find(i => i.name === a.name)) && (
                      <Typography
                        onClick={() => setActive(prev => prev.filter(a => !items.find(i => i.name === a.name)))}
                        sx={{ fontSize: '10px', color: TEAL, cursor: 'pointer', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}
                      >Clear</Typography>
                    )}
                  </Box>
                  {visible.map(item => (
                    <Box
                      key={item.name}
                      onClick={() => toggle(item)}
                      sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1.5, py: 0.6, cursor: 'pointer', '&:hover': { bgcolor: 'rgba(0,0,0,0.03)' } }}
                    >
                      <Box sx={{
                        width: 15, height: 15, border: `1.5px solid ${isActive(item.name) ? TEAL : 'rgba(0,0,0,0.25)'}`,
                        bgcolor: isActive(item.name) ? TEAL : 'transparent',
                        borderRadius: '3px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {isActive(item.name) && <CheckIcon sx={{ fontSize: 10, color: '#fff' }} />}
                      </Box>
                      <Typography sx={{ fontSize: '12px', flex: 1, color: 'text.primary' }}>{item.name}</Typography>
                      {catCfg.Icon
                        ? <catCfg.Icon sx={{ fontSize: 13, color: 'rgba(0,0,0,0.25)' }} />
                        : <Typography sx={{ fontSize: '12px', color: 'rgba(0,0,0,0.3)', fontWeight: 700 }}>#</Typography>
                      }
                    </Box>
                  ))}
                  {items.length > 6 && (
                    <Box onClick={() => setExpanded(e => ({ ...e, [cat]: !e[cat] }))} sx={{ textAlign: 'center', py: 0.5, cursor: 'pointer' }}>
                      <Typography sx={{ fontSize: '11px', fontWeight: 600, color: 'text.secondary', '&:hover': { color: TEAL } }}>
                        {showAll ? 'Show less' : `Show all (${items.length})`}
                      </Typography>
                    </Box>
                  )}
                </Box>
              )
            })}
          </Box>
        </Box>
      )}

      {/* Results header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1.5, py: 0.75, borderBottom: '1px solid', borderColor: 'divider', flexShrink: 0 }}>
        <CheckBoxOutlineBlankIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
        <Typography variant="body2" fontWeight={600}>3.17k results</Typography>
        <Box sx={{ flex: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, border: '1px solid', borderColor: 'divider', borderRadius: 1, px: 1, py: 0.25, cursor: 'pointer' }}>
          <CalendarMonthOutlinedIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
          <Typography variant="caption">Last 7 days</Typography>
          <ArrowDropDownIcon sx={{ fontSize: 16 }} />
        </Box>
        <IconButton size="small" sx={{ color: 'text.disabled' }}><TuneIcon sx={{ fontSize: 16 }} /></IconButton>
      </Box>

      {/* Article results */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {CURATED_ARTICLES.slice(0, 5).map(article => (
          <CuratedArticleCard key={article.id} article={article} onToggleAdd={() => {}} onGenerateSummary={() => {}} />
        ))}
      </Box>
    </Box>
  )
}

function SettingsTabContent() {
  const [curationMode, setCurationMode] = useState('full')

  return (
    <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto' }}>

              {/* ── Curation ── */}
              <SettingsSection label="Curation">
                {/* Curation mode — radio group */}
                <Box sx={{ pb: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Typography sx={{ fontSize: '13px', fontWeight: 500, mb: 0.35 }}>AI curation mode</Typography>
                  <Typography sx={{ fontSize: '11px', color: 'text.secondary', mb: 1 }}>
                    How much should AI do before flagging for your review?
                  </Typography>
                  {[
                    { id: 'full',    label: 'Fully automatic',    sub: 'AI fills the edition and marks it ready' },
                    { id: 'suggest', label: 'Suggest & await',    sub: 'AI adds suggestions; you approve each article' },
                    { id: 'manual',  label: 'Manual only',        sub: 'AI off — you add all articles yourself' },
                  ].map(({ id, label, sub }) => (
                    <CurationModeOption key={id} id={id} label={label} sub={sub} accentColor={TEAL} selected={curationMode === id} onSelect={setCurationMode} />
                  ))}
                </Box>
                <SettingsRow label="Minimum articles before ready" sub="Don't mark edition ready until this threshold is met">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, border: '1px solid', borderColor: 'divider', borderRadius: '6px', px: 1, py: 0.3, width: 64 }}>
                    <Typography sx={{ fontSize: '13px', fontWeight: 600, flex: 1, textAlign: 'center' }}>5</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                      <Box component="span" sx={{ fontSize: '8px', color: 'text.disabled', cursor: 'pointer', lineHeight: 1, userSelect: 'none' }}>▲</Box>
                      <Box component="span" sx={{ fontSize: '8px', color: 'text.disabled', cursor: 'pointer', lineHeight: 1, userSelect: 'none' }}>▼</Box>
                    </Box>
                  </Box>
                </SettingsRow>
              </SettingsSection>

              {/* ── AI writing ── */}
              <SettingsSection label="AI writing">
                <SettingsRow label="AI overview block" sub="Show an auto-generated summary at the top of the newsletter" defaultOn>
                  <Switch defaultChecked size="small" sx={{ '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: TEAL } }} />
                </SettingsRow>
                <SettingsRow label="Writing tone" sub="Tone applied when AI generates summaries and the overview">
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    {['Formal', 'Neutral', 'Friendly'].map((t, i) => (
                      <Box key={t} sx={{
                        px: 1, py: 0.3, borderRadius: '20px', fontSize: '11px', cursor: 'pointer', fontWeight: i === 1 ? 700 : 400,
                        bgcolor: i === 1 ? TEAL : 'transparent',
                        color: i === 1 ? '#fff' : 'text.secondary',
                        border: `1px solid ${i === 1 ? TEAL : 'rgba(0,0,0,0.15)'}`,
                      }}>
                        <Typography sx={{ fontSize: '11px', fontWeight: 'inherit', color: 'inherit' }}>{t}</Typography>
                      </Box>
                    ))}
                  </Box>
                </SettingsRow>
              </SettingsSection>

              {/* ── Content ── */}
              <SettingsSection label="Content">
                <SettingsRow label="Analyze dashboard widgets" sub="Embed live chart snapshots from your Analyze dashboards" defaultOn>
                  <Switch defaultChecked size="small" sx={{ '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: TEAL } }} />
                </SettingsRow>
                <SettingsRow label="Monitor stream highlights" sub="Pull top-ranked mentions directly from your Monitor feeds" defaultOn>
                  <Switch defaultChecked size="small" sx={{ '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: TEAL } }} />
                </SettingsRow>
              </SettingsSection>

              {/* ── Notifications ── */}
              <SettingsSection label="Notifications" last>
                <SettingsRow label="Ready for review" sub="Alert me when this edition has been auto-curated and is awaiting approval" defaultOn>
                  <Switch defaultChecked size="small" sx={{ '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: TEAL } }} />
                </SettingsRow>
                <SettingsRow label="Send deadline reminder" sub="Remind me 24 h before the scheduled send time">
                  <Switch size="small" sx={{ '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: TEAL } }} />
                </SettingsRow>
              </SettingsSection>

              {/* Spacer so last item clears the floating Intercom widget */}
              <Box sx={{ height: 72 }} />

    </Box>
  )
}

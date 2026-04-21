import { useState, useEffect, useRef } from 'react'
import {
  Box,
  Typography,
  Stack,
  IconButton,
  LinearProgress,
  CircularProgress,
  Avatar,
  Divider,
  Paper,
  Button,
  Chip,
  Switch,
  TextField,
  Tabs,
  Tab,
  Tooltip,
  Container,
} from '@mui/material'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined'
import MenuIcon from '@mui/icons-material/Menu'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import RefreshIcon from '@mui/icons-material/Refresh'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ShareIcon from '@mui/icons-material/Share'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import { AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis } from 'recharts'
import Indicator from '../core/Indicator'
import { MODEL_META } from '../../lib/ai/runModel.js'

// ─── Sidebar constants ────────────────────────────────────────────────────────

const SIDEBAR_BG = '#111827'
const SIDEBAR_TEXT = 'rgba(255,255,255,0.85)'
const SIDEBAR_MUTED = 'rgba(255,255,255,0.42)'
const SIDEBAR_DIVIDER = 'rgba(255,255,255,0.1)'
const SIDEBAR_ACTIVE_BG = 'rgba(0,130,127,0.22)'
const SIDEBAR_ACTIVE = '#00B3AF'
const SIDEBAR_HOVER = 'rgba(255,255,255,0.07)'

const NAV_ITEMS = [
  { id: 'brand-perception', label: 'Brand Perception',  Icon: RemoveRedEyeOutlinedIcon },
  { id: 'perspectives',     label: 'Perspectives',       Icon: AutoAwesomeOutlinedIcon  },
  { id: 'executive-brief',  label: 'Executive Brief',    Icon: ArticleOutlinedIcon      },
  { id: 'actions',          label: 'Actions',            Icon: BoltOutlinedIcon         },
]

// ─── Model metadata (display names, colors, letters) ─────────────────────────

const ORDERED_MODELS = ['openai', 'anthropic', 'gemini']

// ─── Analyzing view ───────────────────────────────────────────────────────────

function AnalyzingView({ brand, modelStatus = {}, modelRetry = {}, progress = 0 }) {
  // Smoothly animate progress bar
  const [displayProgress, setDisplayProgress] = useState(0)
  // Tick every second to drive retry countdowns
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const target = progress
    let current = displayProgress
    if (current >= target) { setDisplayProgress(target); return }
    const timer = setInterval(() => {
      current = Math.min(current + 1, target)
      setDisplayProgress(current)
      if (current >= target) clearInterval(timer)
    }, 60)
    return () => clearInterval(timer)
  }, [progress]) // eslint-disable-line react-hooks/exhaustive-deps

  // Keep countdown ticking only while any model is retrying
  const anyRetrying = ORDERED_MODELS.some(k => modelRetry[k])
  useEffect(() => {
    if (!anyRetrying) return
    const id = setInterval(() => setNow(Date.now()), 500)
    return () => clearInterval(id)
  }, [anyRetrying])

  // Count active retries to show a global notice
  const retryingCount = ORDERED_MODELS.filter(k => modelRetry[k]).length

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100%', p: 4 }}>
      <Box sx={{ width: '100%', maxWidth: 520 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 0.5, fontWeight: 600 }}>
          Analyzing {brand.name}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary', mb: 4 }}>
          {retryingCount > 0
            ? 'Groq is rate limiting — waiting to retry automatically…'
            : 'Querying AI models for brand perception...'}
        </Typography>

        <Box sx={{ mb: 0.5 }}>
          <LinearProgress
            variant="determinate"
            value={displayProgress}
            sx={{ height: 6, borderRadius: 3,
              '& .MuiLinearProgress-bar': {
                bgcolor: retryingCount > 0 ? '#f59e0b' : 'primary.main',
                transition: 'background-color 0.4s',
              }
            }}
          />
        </Box>
        <Typography variant="body2" sx={{ textAlign: 'right', color: 'text.secondary', mb: 3 }}>
          {Math.round(displayProgress)}%
        </Typography>

        <Typography variant="overline" sx={{ display: 'block', color: 'text.disabled', letterSpacing: 1.5, mb: 1.5 }}>
          AI MODELS
        </Typography>

        <Stack spacing={1.25}>
          {ORDERED_MODELS.map(modelKey => {
            const meta   = MODEL_META[modelKey]
            const status = modelStatus[modelKey] || 'pending'
            const retry  = modelRetry[modelKey] || null

            // Compute remaining seconds for the countdown
            const remaining = retry
              ? Math.max(0, Math.ceil((retry.startedAt + retry.waitSeconds * 1000 - now) / 1000))
              : 0

            const isRetrying = !!retry

            return (
              <Box key={modelKey}>
                <Box
                  sx={{
                    px: 2, py: 1.5,
                    display: 'flex', alignItems: 'center', gap: 2,
                    bgcolor: isRetrying ? '#fffbeb'
                           : status === 'complete' ? 'rgba(0,130,127,0.03)'
                           : status === 'error'    ? 'rgba(239,68,68,0.03)'
                           : 'white',
                    border: '1px solid',
                    borderColor: isRetrying ? '#fcd34d'
                               : status === 'complete' ? 'rgba(0,130,127,0.25)'
                               : status === 'error'    ? 'rgba(239,68,68,0.25)'
                               : 'rgba(0,0,0,0.1)',
                    borderRadius: retry ? '8px 8px 0 0' : 1.5,
                    opacity: status === 'pending' ? 0.45 : 1,
                    transition: 'all 0.3s',
                  }}
                >
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: meta.color, flexShrink: 0 }} />
                  <Typography sx={{ flex: 1, fontWeight: 500, fontSize: 14 }}>{meta.label}</Typography>

                  {isRetrying ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CircularProgress size={14} thickness={3} sx={{ color: '#f59e0b' }} />
                      <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#b45309' }}>
                        retrying in {remaining}s
                      </Typography>
                    </Box>
                  ) : status === 'loading' ? (
                    <CircularProgress size={16} thickness={3} sx={{ color: 'primary.main' }} />
                  ) : status === 'complete' ? (
                    <CheckCircleIcon sx={{ fontSize: 18, color: 'success.main' }} />
                  ) : status === 'error' ? (
                    <ErrorIcon sx={{ fontSize: 18, color: 'error.main' }} />
                  ) : (
                    <Box sx={{ width: 16, height: 16, borderRadius: '50%', border: '1.5px solid', borderColor: 'divider' }} />
                  )}
                </Box>

                {/* Retry detail strip */}
                {isRetrying && (
                  <Box sx={{
                    px: 2, py: 1,
                    bgcolor: '#fef3c7',
                    border: '1px solid #fcd34d',
                    borderTop: 'none',
                    borderRadius: '0 0 8px 8px',
                    display: 'flex', alignItems: 'center', gap: 1,
                  }}>
                    <Typography sx={{ fontSize: 11, color: '#92400e' }}>
                      Rate limited · attempt {retry.attempt} of {retry.maxAttempts} · resuming in {remaining}s
                    </Typography>
                    <Box sx={{ flex: 1 }} />
                    <Box sx={{
                      height: 3, width: 80, bgcolor: '#fde68a', borderRadius: 2, overflow: 'hidden',
                    }}>
                      <Box sx={{
                        height: '100%',
                        bgcolor: '#f59e0b',
                        borderRadius: 2,
                        width: `${retry.waitSeconds > 0 ? Math.max(4, (1 - remaining / retry.waitSeconds) * 100) : 100}%`,
                        transition: 'width 0.5s linear',
                      }} />
                    </Box>
                  </Box>
                )}
              </Box>
            )
          })}
        </Stack>

        <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary', mt: 3, fontSize: 12 }}>
          {retryingCount > 0
            ? 'Free tier rate limits apply — this will complete automatically.'
            : 'This typically takes 30–60 seconds.'}
        </Typography>
      </Box>
    </Box>
  )
}

// ─── Brand Perception view ────────────────────────────────────────────────────

// Helper: Generate 6 months of trend data
function generateTrendData(baseScore) {
  const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']
  let score = Math.max(20, baseScore - 20)
  return months.map(month => {
    score = Math.min(100, Math.max(10, score + (Math.random() * 16 - 6)))
    return { month, score: Math.round(score) }
  })
}


function BrandPerceptionView({ brand, data, rawResponses = {}, perspectiveResults = [] }) {
  const [expandedModel, setExpandedModel] = useState(null)
  const [activeNav, setActiveNav]         = useState('overview')
  const overviewRef    = useRef(null)
  const understandRef  = useRef(null)
  const competitiveRef = useRef(null)
  const signalsRef     = useRef(null)

  const stats               = data?.stats || {}
  const narrative           = data?.narrative || ''
  const competitivePosition = data?.competitivePosition || []
  const differentiators     = data?.differentiators || []
  const strengths           = data?.strengths || []
  const weaknesses          = data?.weaknesses || []
  const risks               = data?.risks || []
  const positioning         = data?.positioning || ''
  const competitiveSummary  = data?.competitiveSummary || ''

  const pos            = stats.positiveSentiment || 50
  const sentimentLabel = pos >= 65 ? 'Positive' : pos >= 45 ? 'Neutral to Positive' : 'Neutral'

  const modelCards = ORDERED_MODELS.filter(k => rawResponses[k]).map(k => {
    const meta  = MODEL_META[k]
    const raw   = rawResponses[k] || ''
    // Strip markdown, list markers, headers, and common prompt echo patterns
    const clean = raw
      .replace(/\*\*/g, '').replace(/\*/g, '')
      .replace(/^#+\s+/gm, '')
      .replace(/^\d+\.\s+/gm, '')
      .replace(/^[-•]\s+/gm, '')
      // Remove lines that look like prompt echoes or section titles
      .replace(/^(brand analysis|what does this company do|overview|summary|introduction)[^\n]*/gim, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
    const sentences = clean.split(/[.!?]+/).filter(s => s.trim().length > 14)
    return { key: k, model: meta.label, color: meta.color, letter: meta.letter,
      preview: sentences.slice(0, 2).join('. ').trim() + '.', text: clean }
  })

  const dominantThemes = differentiators.slice(0, 5).map((d, i) => ({
    label: d.label,
    pct: d.level === 'strong' ? Math.max(55, 85 - i * 6) : d.level === 'moderate' ? Math.max(35, 62 - i * 5) : Math.max(20, 38 - i * 4),
  }))

  const narrativeRadar = [
    { subject: 'Visibility', value: Math.round((stats.visibilityScore || 50) * 0.9) },
    { subject: 'Accuracy',   value: stats.aiAccuracy        || 60 },
    { subject: 'Clarity',    value: stats.brandClarity      || 60 },
    { subject: 'Narrative',  value: stats.narrativeControl  || 50 },
    { subject: 'Audience',   value: stats.audienceAccuracy  || 55 },
  ]

  const topicAssocs = [
    ...differentiators.slice(0, 3).map((d, i) => ({ label: d.label, pct: d.level === 'strong' ? 80 - i * 7 : d.level === 'moderate' ? 60 - i * 6 : 38 - i * 5 })),
    ...strengths.slice(0, 2).map((s, i) => ({ label: s, pct: 52 - i * 8 })),
  ].slice(0, 5)

  const disclosureRisk  = risks.length <= 1 ? 'Low' : risks.length <= 3 ? 'Medium' : 'High'
  const innovationExcl  = weaknesses.length <= 1 ? 'Low' : weaknesses.length <= 2 ? 'Moderate' : 'High'
  const toneScore       = ((pos / 100) * 5).toFixed(1)
  const compWinRate     = Math.min(100, Math.round((stats.shareOfVoice || 20) * 1.8))
  const trendData       = generateTrendData(stats.visibilityScore || 50)
  const sovColors       = ['#00827F', '#4285f4', '#9333ea', '#ff6b35', '#e91e63']

  // Shared style tokens
  const CARD     = { bgcolor: 'white', borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)' }
  const LBL      = { fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.38)', display: 'block', mb: 1.5 }
  const BIG      = { fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em' }

  const scrollTo = (ref, id) => { ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); setActiveNav(id) }

  // Section header with number prefix
  const SH = ({ n, label }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
      <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#00827F', opacity: 0.55, letterSpacing: '0.04em', flexShrink: 0, minWidth: 22 }}>
        {String(n).padStart(2, '0')}
      </Typography>
      <Typography sx={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.65)' }}>
        {label}
      </Typography>
      <Box sx={{ flex: 1, height: '1px', bgcolor: 'rgba(0,0,0,0.07)' }} />
    </Box>
  )

  const NAV = [['overview','Overview',overviewRef],['understand','Understanding',understandRef],['competitive','Competitive',competitiveRef],['signals','Signals',signalsRef]]

  return (
    <Box sx={{ bgcolor: '#F7F8FA', minHeight: '100vh' }}>

      {/* ── Sub-nav ── */}
      <Box sx={{ position: 'sticky', top: 0, zIndex: 10, bgcolor: 'white', borderBottom: '1px solid rgba(0,0,0,0.07)', px: 4 }}>
        <Box sx={{ display: 'flex', maxWidth: 1180, mx: 'auto' }}>
          {NAV.map(([id, label, ref]) => (
            <Button key={id} onClick={() => scrollTo(ref, id)} disableRipple
              sx={{ textTransform: 'none', fontWeight: activeNav === id ? 600 : 400, fontSize: 13,
                color: activeNav === id ? 'primary.main' : 'rgba(0,0,0,0.45)',
                px: 2.5, py: 1.75, borderRadius: 0, minWidth: 0,
                borderBottom: '2px solid', borderBottomColor: activeNav === id ? 'primary.main' : 'transparent',
                transition: 'all 0.15s', '&:hover': { color: 'text.primary', bgcolor: 'transparent' } }}>
              {label}
            </Button>
          ))}
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1180, mx: 'auto', px: 4, py: 5 }}>

        {/* ══════════════════════════════════════════
            OVERVIEW
        ══════════════════════════════════════════ */}
        <Box ref={overviewRef} sx={{ mb: 8, scrollMarginTop: 56 }}>

          {/* Hero */}
          <Box sx={{ mb: 5 }}>
            <Typography sx={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#00827F', mb: 2, opacity: 0.75 }}>
              Brand Perception · {brand.name}
            </Typography>
            <Typography sx={{ fontSize: 22, fontWeight: 700, lineHeight: 1.6, mb: 3, maxWidth: 820, letterSpacing: '-0.01em', color: 'rgba(0,0,0,0.87)' }}>
              {narrative || `AI models are beginning to recognize ${brand.name} in relevant queries.`}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, px: 1.5, py: 0.6, borderRadius: 10,
                bgcolor: pos >= 65 ? '#dcfce7' : pos >= 45 ? '#dbeafe' : '#f4f4f5',
                color:  pos >= 65 ? '#15803d' : pos >= 45 ? '#1d4ed8' : '#52525b' }}>
                <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: pos >= 65 ? '#22c55e' : pos >= 45 ? '#3b82f6' : '#a1a1aa' }} />
                <Typography sx={{ fontSize: 12, fontWeight: 600, lineHeight: 1 }}>{sentimentLabel}</Typography>
              </Box>
              <Typography sx={{ fontSize: 12, color: 'rgba(0,0,0,0.35)' }}>Analyzed just now</Typography>
            </Box>
          </Box>

          {/* AI Perception card */}
          <Box sx={{ ...CARD, overflow: 'hidden' }}>

            {/* Card header */}
            <Box sx={{ px: 3.5, pt: 2.5, pb: 2, borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ ...LBL, mb: 0 }}>Current AI Perception</Typography>
              <Box sx={{ flex: 1 }} />
              {/* Model count pills */}
              <Box sx={{ display: 'flex', gap: 0.75 }}>
                {ORDERED_MODELS.map(k => {
                  const has = !!rawResponses[k]
                  const c   = MODEL_META[k].color
                  return (
                    <Box key={k} sx={{
                      width: 7, height: 7, borderRadius: '50%',
                      bgcolor: has ? c : 'rgba(0,0,0,0.12)',
                      transition: 'background-color 0.3s',
                    }} />
                  )
                })}
                <Typography sx={{ fontSize: 11, color: 'rgba(0,0,0,0.3)', ml: 0.5 }}>
                  {modelCards.length} of 3
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 260px' }}>

              {/* ── Model responses ── */}
              <Box sx={{ p: 3.5, borderRight: '1px solid rgba(0,0,0,0.05)' }}>
                {modelCards.length === 0 ? (
                  <Box sx={{ py: 6, textAlign: 'center' }}>
                    <Typography sx={{ fontSize: 13, color: 'rgba(0,0,0,0.3)', fontStyle: 'italic' }}>
                      Run an analysis to see how AI models perceive {brand.name}.
                    </Typography>
                  </Box>
                ) : modelCards.map((card, idx) => (
                  <Box key={card.key} sx={{
                    display: 'flex',
                    pb: idx < modelCards.length - 1 ? 3 : 0,
                    mb: idx < modelCards.length - 1 ? 3 : 0,
                    borderBottom: idx < modelCards.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                  }}>
                    {/* Thick left accent */}
                    <Box sx={{ width: 4, borderRadius: '4px', bgcolor: card.color, flexShrink: 0, mr: 2.5, alignSelf: 'stretch', minHeight: 52 }} />

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      {/* Model badge row */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 1.25 }}>
                        <Box sx={{
                          display: 'inline-flex', alignItems: 'center', gap: 0.75,
                          bgcolor: `${card.color}14`, border: `1px solid ${card.color}30`,
                          px: 1.25, py: 0.35, borderRadius: 10,
                        }}>
                          <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: card.color }} />
                          <Typography sx={{ fontSize: 11, fontWeight: 700, color: card.color, letterSpacing: '0.04em' }}>
                            {card.model}
                          </Typography>
                        </Box>
                        <Typography sx={{ fontSize: 11, color: 'rgba(0,0,0,0.25)', letterSpacing: '0.02em' }}>
                          via Groq
                        </Typography>
                      </Box>

                      {/* Response text */}
                      <Typography sx={{ fontSize: 13.5, color: 'rgba(0,0,0,0.65)', lineHeight: 1.82, mb: 1 }}>
                        {expandedModel === card.key ? card.text : card.preview}
                      </Typography>

                      <Button size="small" disableRipple
                        onClick={() => setExpandedModel(expandedModel === card.key ? null : card.key)}
                        sx={{
                          textTransform: 'none', fontSize: 11.5, fontWeight: 500,
                          p: 0, minWidth: 0, color: card.color, opacity: 0.8,
                          '&:hover': { bgcolor: 'transparent', opacity: 1, textDecoration: 'underline' },
                        }}>
                        {expandedModel === card.key ? '↑ Show less' : 'Read full response →'}
                      </Button>
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* ── Sidebar ── */}
              <Box sx={{ bgcolor: '#F9FAFB', display: 'flex', flexDirection: 'column' }}>

                {/* Snapshot */}
                <Box sx={{ p: 2.75, borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                  <Typography sx={LBL}>Snapshot</Typography>
                  <Stack spacing={1.25}>
                    {[
                      { k: 'Emotion', v: pos >= 65 ? 'Positive' : pos >= 45 ? 'Mixed' : 'Cautious',
                        pill: true, pillBg: pos >= 65 ? '#dcfce7' : pos >= 45 ? '#dbeafe' : '#f4f4f5',
                        pillColor: pos >= 65 ? '#15803d' : pos >= 45 ? '#1d4ed8' : '#52525b',
                        dot: pos >= 65 ? '#22c55e' : pos >= 45 ? '#3b82f6' : '#a1a1aa' },
                      { k: 'Tone', v: sentimentLabel },
                      { k: 'Themes', v: `${differentiators.length} identified` },
                      { k: 'Risks', v: `${risks.length} flagged`,
                        pill: risks.length > 2, pillBg: '#fef3c7', pillColor: '#92400e', dot: '#f59e0b' },
                      { k: 'Models', v: `${modelCards.length} / 3` },
                    ].map(({ k, v, pill, pillBg, pillColor, dot }) => (
                      <Box key={k} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: 11.5, color: 'rgba(0,0,0,0.4)' }}>{k}</Typography>
                        {pill ? (
                          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.6,
                            bgcolor: pillBg, px: 1.1, py: 0.3, borderRadius: 10 }}>
                            {dot && <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: dot }} />}
                            <Typography sx={{ fontSize: 11, fontWeight: 700, color: pillColor }}>{v}</Typography>
                          </Box>
                        ) : (
                          <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'rgba(0,0,0,0.68)' }}>{v}</Typography>
                        )}
                      </Box>
                    ))}
                  </Stack>
                </Box>

                {/* Watch Out For */}
                {risks.length > 0 && (
                  <Box sx={{ p: 2.75, borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                    <Typography sx={LBL}>Watch Out For</Typography>
                    <Stack spacing={1.25}>
                      {risks.slice(0, 3).map((risk, i) => (
                        <Box key={i} sx={{
                          display: 'flex', gap: 1.25, alignItems: 'flex-start',
                          borderLeft: '2.5px solid #f59e0b',
                          pl: 1.5, py: 0.25,
                        }}>
                          <Typography sx={{ fontSize: 11.5, color: 'rgba(0,0,0,0.58)', lineHeight: 1.6 }}>{risk}</Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                )}

                {/* Dominant Themes */}
                {dominantThemes.length > 0 && (
                  <Box sx={{ p: 2.75 }}>
                    <Typography sx={LBL}>Dominant Themes</Typography>
                    <Stack spacing={1.75}>
                      {dominantThemes.map(t => (
                        <Box key={t.label}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75, alignItems: 'center' }}>
                            <Typography sx={{ fontSize: 11.5, color: 'rgba(0,0,0,0.6)', fontWeight: 500,
                              maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {t.label}
                            </Typography>
                            <Typography sx={{ fontSize: 11, fontWeight: 700, color: 'rgba(0,0,0,0.38)', flexShrink: 0, ml: 1 }}>
                              {t.pct}%
                            </Typography>
                          </Box>
                          <Box sx={{ bgcolor: 'rgba(0,0,0,0.07)', borderRadius: 2, height: 4, overflow: 'hidden' }}>
                            <Box sx={{
                              width: `${t.pct}%`, height: '100%',
                              background: `linear-gradient(90deg, #00827F, #00B3AF)`,
                              borderRadius: 2, transition: 'width 1s ease',
                            }} />
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>

        {/* ══════════════════════════════════════════
            UNDERSTANDING
        ══════════════════════════════════════════ */}
        <Box ref={understandRef} sx={{ mb: 8, scrollMarginTop: 56 }}>
          <SH n={1} label="Understanding" />

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2.5, mb: 2.5 }}>
            {/* Narrative Health */}
            <Box sx={{ ...CARD, p: 3 }}>
              <Typography sx={LBL}>Narrative Health</Typography>
              <ResponsiveContainer width="100%" height={148}>
                <RadarChart data={narrativeRadar} outerRadius={54}>
                  <PolarGrid stroke="rgba(0,0,0,0.07)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: 'rgba(0,0,0,0.42)' }} />
                  <Radar dataKey="value" stroke="#00827F" fill="#00827F" fillOpacity={0.16} strokeWidth={1.5} />
                </RadarChart>
              </ResponsiveContainer>
              <Box sx={{ textAlign: 'center', mt: 1.5 }}>
                <Typography sx={{ fontSize: 38, ...BIG, color: 'rgba(0,0,0,0.84)' }}>{stats.brandClarity || '--'}</Typography>
                <Typography sx={{ fontSize: 11.5, color: 'rgba(0,0,0,0.4)', mt: 0.5 }}>Brand health score</Typography>
              </Box>
            </Box>

            {/* Model Accuracy */}
            <Box sx={{ ...CARD, p: 3 }}>
              <Typography sx={LBL}>Model Accuracy</Typography>
              <Stack spacing={2.25}>
                {modelCards.map((card, i) => {
                  const acc = Math.max(20, Math.min(99, (stats.aiAccuracy || 60) + (i === 0 ? 8 : i === 1 ? -6 : 3)))
                  return (
                    <Box key={card.key}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75, alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.875 }}>
                          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: card.color }} />
                          <Typography sx={{ fontSize: 12, color: 'rgba(0,0,0,0.52)' }}>{card.model}</Typography>
                        </Box>
                        <Typography sx={{ fontSize: 13, fontWeight: 700, color: 'rgba(0,0,0,0.72)' }}>{acc}</Typography>
                      </Box>
                      <Box sx={{ bgcolor: 'rgba(0,0,0,0.07)', borderRadius: 2, height: 5, overflow: 'hidden' }}>
                        <Box sx={{ width: `${acc}%`, height: '100%', bgcolor: card.color, borderRadius: 2, transition: 'width 0.9s ease' }} />
                      </Box>
                    </Box>
                  )
                })}
              </Stack>
              <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                <Typography sx={{ fontSize: 12, color: 'rgba(0,0,0,0.4)' }}>
                  {modelCards.length} of {ORDERED_MODELS.length} models tested
                </Typography>
              </Box>
            </Box>

            {/* Topic Associations */}
            <Box sx={{ ...CARD, p: 3 }}>
              <Typography sx={LBL}>Topic Associations</Typography>
              <Stack spacing={2.25}>
                {topicAssocs.map((item, i) => (
                  <Box key={i}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75, alignItems: 'center' }}>
                      <Typography sx={{ fontSize: 12, color: 'rgba(0,0,0,0.52)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 155 }}>{item.label}</Typography>
                      <Typography sx={{ fontSize: 13, fontWeight: 700, color: 'rgba(0,0,0,0.72)', flexShrink: 0, ml: 1 }}>{item.pct}%</Typography>
                    </Box>
                    <Box sx={{ bgcolor: 'rgba(0,0,0,0.07)', borderRadius: 2, height: 5 }}>
                      <Box sx={{ width: `${item.pct}%`, height: '100%', bgcolor: '#4285f4', borderRadius: 2, transition: 'width 0.9s ease' }} />
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>

          {/* Insight callout strip */}
          <Box sx={{ ...CARD, overflow: 'hidden' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
              {[
                { icon: '✓', bg: '#f0fdf4', ic: '#16a34a', title: stats.aiAccuracy >= 70 ? 'Strong narrative health' : 'Narrative developing', body: `${brand.name}'s core story is ${stats.aiAccuracy >= 70 ? 'well-established' : 'still forming'} — ${pos}% positive tone.` },
                { icon: '↗', bg: '#eff6ff', ic: '#2563eb', title: `${stats.topThreeMentionRate || 0}% top-3 mention rate`, body: `AI accuracy sits at ${stats.aiAccuracy || 0}%. ${stats.aiAccuracy >= 70 ? 'Strong signal coverage.' : 'Room to improve coverage.'}` },
                { icon: '⚡', bg: '#fffbeb', ic: '#d97706', title: weaknesses[0] || 'Key gap identified', body: strengths[0] ? `Biggest strength: ${strengths[0]}` : 'Refining brand signals across AI systems.' },
              ].map(({ icon, bg, ic, title, body }, i) => (
                <Box key={i} sx={{ p: 3, bgcolor: bg, borderRight: i < 2 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
                  <Box sx={{ display: 'flex', gap: 1.5 }}>
                    <Typography sx={{ color: ic, fontWeight: 800, fontSize: 15, lineHeight: 1.3, flexShrink: 0, mt: 0.1 }}>{icon}</Typography>
                    <Box>
                      <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 0.5, lineHeight: 1.35, color: 'rgba(0,0,0,0.8)' }}>{title}</Typography>
                      <Typography sx={{ fontSize: 12, color: 'rgba(0,0,0,0.48)', lineHeight: 1.65 }}>{body}</Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* ══════════════════════════════════════════
            COMPETITIVE
        ══════════════════════════════════════════ */}
        <Box ref={competitiveRef} sx={{ mb: 8, scrollMarginTop: 56 }}>
          <SH n={2} label="Competitive" />

          {/* Competitor pills */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
            {competitivePosition.filter(c => c.name !== brand.name).map(c => (
              <Box key={c.name} sx={{ px: 2, py: 0.6, bgcolor: 'white', border: '1px solid rgba(0,0,0,0.12)', borderRadius: 10,
                fontSize: 12, color: 'rgba(0,0,0,0.6)', fontWeight: 500, boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
                {c.name}
              </Box>
            ))}
          </Box>

          {/* 4 headline metrics */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 2.5 }}>
            {[
              { label: 'Visibility Rate',  val: `${stats.visibilityScore || '--'}`, unit: '%', sub: `${stats.visibilityScore >= 50 ? '+' : ''}${((stats.visibilityScore||50)-50).toFixed(0)}% vs avg`, color: '#00827F' },
              { label: 'Citation Score',   val: `${stats.citationFrequency || '--'}`, unit: '', sub: `${stats.topThreeMentionRate||0}% top-3 rate`, color: '#2563eb' },
              { label: 'Share of Voice',   val: `${stats.shareOfVoice || '--'}`, unit: '%', sub: `${competitivePosition.length - 1} competitors tracked`, color: '#7c3aed' },
              { label: 'Avg. Position',    val: `#${stats.competitiveRank || '--'}`, unit: '', sub: `Out of ${competitivePosition.length} tracked`, color: 'rgba(0,0,0,0.75)' },
            ].map(m => (
              <Box key={m.label} sx={{ ...CARD, p: 3 }}>
                <Typography sx={LBL}>{m.label}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, mb: 0.75 }}>
                  <Typography sx={{ fontSize: 36, ...BIG, color: m.color }}>{m.val}</Typography>
                  {m.unit && <Typography sx={{ fontSize: 20, fontWeight: 600, color: m.color, opacity: 0.65 }}>{m.unit}</Typography>}
                </Box>
                <Typography sx={{ fontSize: 11.5, color: 'rgba(0,0,0,0.38)' }}>{m.sub}</Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2.5 }}>
            <Box sx={{ ...CARD, p: 3 }}>
              <Typography sx={LBL}>AI Visibility by Brand</Typography>
              <Stack spacing={2}>
                {competitivePosition.map(item => (
                  <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography sx={{ minWidth: 112, fontSize: 12.5, fontWeight: item.name === brand.name ? 700 : 400,
                      color: item.name === brand.name ? '#00827F' : 'rgba(0,0,0,0.58)',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.name}
                    </Typography>
                    <Box sx={{ flex: 1, bgcolor: 'rgba(0,0,0,0.06)', borderRadius: 2, height: 7, overflow: 'hidden' }}>
                      <Box sx={{ width: `${item.score}%`, height: '100%', bgcolor: item.name === brand.name ? '#00827F' : 'rgba(0,0,0,0.18)', borderRadius: 2, transition: 'width 0.9s ease' }} />
                    </Box>
                    <Typography sx={{ minWidth: 28, textAlign: 'right', fontSize: 12.5, fontWeight: item.name === brand.name ? 700 : 500,
                      color: item.name === brand.name ? '#00827F' : 'rgba(0,0,0,0.45)' }}>{item.score}</Typography>
                  </Box>
                ))}
              </Stack>
            </Box>

            <Box sx={{ ...CARD, p: 3 }}>
              <Typography sx={LBL}>Competitive Summary</Typography>
              <Typography sx={{ fontSize: 14, color: 'rgba(0,0,0,0.62)', lineHeight: 1.82 }}>
                {competitiveSummary || `${brand.name} competes in a defined market where AI visibility varies significantly across providers.`}
              </Typography>
              {positioning && (
                <Box sx={{ mt: 2.5, pt: 2.5, borderTop: '1px solid rgba(0,0,0,0.07)' }}>
                  <Typography sx={{ ...LBL, mb: 1 }}>Positioning</Typography>
                  <Typography sx={{ fontSize: 13.5, lineHeight: 1.72, color: 'rgba(0,0,0,0.65)', fontStyle: 'italic' }}>{positioning}</Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        {/* ══════════════════════════════════════════
            EXPOSURE INTELLIGENCE
        ══════════════════════════════════════════ */}
        <Box sx={{ mb: 8 }}>
          <SH n={3} label="Exposure Intelligence" />

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 2 }}>
            {[
              { label: 'Industry Inclusion',  val: `${stats.aiAccuracy || '--'}%`,         desc: 'Accuracy within industry context' },
              { label: 'Tone & Themes',        val: toneScore,                               desc: 'Avg tone score (1–5 scale)' },
              { label: 'Recommendation Rate', val: `${stats.topThreeMentionRate || '--'}%`, desc: 'Rate of top-3 model mentions' },
              { label: 'Comparison Win Rate', val: `${compWinRate}%`,                        desc: 'Win rate in brand comparisons' },
            ].map(m => (
              <Box key={m.label} sx={{ ...CARD, p: 3 }}>
                <Typography sx={LBL}>{m.label}</Typography>
                <Typography sx={{ fontSize: 32, ...BIG, color: 'rgba(0,0,0,0.82)', mb: 0.75 }}>{m.val}</Typography>
                <Typography sx={{ fontSize: 11.5, color: 'rgba(0,0,0,0.38)', lineHeight: 1.45 }}>{m.desc}</Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: 2 }}>
            <Box sx={{ ...CARD, p: 3, borderTop: '3px solid',
              borderTopColor: disclosureRisk === 'Low' ? '#22c55e' : disclosureRisk === 'Medium' ? '#f59e0b' : '#ef4444' }}>
              <Typography sx={LBL}>Disclosure Risk</Typography>
              <Typography sx={{ fontSize: 26, fontWeight: 700,
                color: disclosureRisk === 'Low' ? '#15803d' : disclosureRisk === 'Medium' ? '#b45309' : '#dc2626', mb: 0.75 }}>
                {disclosureRisk}
              </Typography>
              <Typography sx={{ fontSize: 11.5, color: 'rgba(0,0,0,0.38)' }}>{risks.length} risk signal{risks.length !== 1 ? 's' : ''}</Typography>
            </Box>
            <Box sx={{ ...CARD, p: 3 }}>
              <Typography sx={LBL}>Tier Classification</Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 500, lineHeight: 1.72, color: 'rgba(0,0,0,0.72)' }}>
                {brand.name} is {positioning
                  ? positioning.replace(new RegExp(`^${brand.name}\\s*`, 'i'), '')
                  : 'positioned within a defined competitive tier in its market.'}
              </Typography>
            </Box>
            <Box sx={{ ...CARD, p: 3 }}>
              <Typography sx={LBL}>Innovation Exclusion</Typography>
              <Typography sx={{ fontSize: 26, fontWeight: 700,
                color: innovationExcl === 'Low' ? '#15803d' : innovationExcl === 'Moderate' ? '#b45309' : '#dc2626', mb: 0.75 }}>
                {innovationExcl}
              </Typography>
              <Typography sx={{ fontSize: 11.5, color: 'rgba(0,0,0,0.38)' }}>{weaknesses.length} narrative gap{weaknesses.length !== 1 ? 's' : ''}</Typography>
            </Box>
          </Box>
        </Box>

        {/* ══════════════════════════════════════════
            TREND + SHARE OF VOICE
        ══════════════════════════════════════════ */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 2.5 }}>
            <Box sx={{ ...CARD, p: 3 }}>
              <Typography sx={LBL}>Visibility Trend</Typography>
              <ResponsiveContainer width="100%" height={210}>
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#00827F" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00827F" stopOpacity={0.01} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="rgba(0,0,0,0.1)" tick={{ fontSize: 11, fill: 'rgba(0,0,0,0.38)' }} axisLine={false} tickLine={false} />
                  <YAxis stroke="rgba(0,0,0,0.1)" domain={[0, 100]} tick={{ fontSize: 11, fill: 'rgba(0,0,0,0.38)' }} axisLine={false} tickLine={false} />
                  <RechartsTooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', fontSize: 12 }} />
                  <Area type="monotone" dataKey="score" stroke="#00827F" strokeWidth={2} fillOpacity={1} fill="url(#trendGrad)"
                    dot={{ r: 3, fill: '#00827F', strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
            <Box sx={{ ...CARD, p: 3 }}>
              <Typography sx={LBL}>Share of Voice</Typography>
              <Stack spacing={2.25}>
                {competitivePosition.slice(0, 5).map((item, i) => (
                  <Box key={item.name}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
                      <Typography sx={{ fontSize: 12.5, fontWeight: item.name === brand.name ? 700 : 400,
                        color: item.name === brand.name ? '#00827F' : 'rgba(0,0,0,0.58)' }}>{item.name}</Typography>
                      <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: 'rgba(0,0,0,0.5)' }}>{item.score}%</Typography>
                    </Box>
                    <Box sx={{ bgcolor: 'rgba(0,0,0,0.07)', borderRadius: 2, height: 7 }}>
                      <Box sx={{ width: `${item.score}%`, height: '100%', bgcolor: sovColors[i] || 'rgba(0,0,0,0.18)', borderRadius: 2, transition: 'width 0.9s ease' }} />
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>
        </Box>

        {/* ══════════════════════════════════════════
            SIGNALS
        ══════════════════════════════════════════ */}
        <Box ref={signalsRef} sx={{ mb: 6, scrollMarginTop: 56 }}>
          <SH n={4} label="Signals" />
          {perspectiveResults.length === 0 ? (
            <Box sx={{ ...CARD, p: 5, textAlign: 'center' }}>
              <Typography sx={{ fontSize: 13, color: 'rgba(0,0,0,0.32)', fontStyle: 'italic' }}>
                Signals appear after analysis completes.
              </Typography>
            </Box>
          ) : (
            <Stack spacing={2}>
              {perspectiveResults.map(pr => {
                const isOpp = pr.riskOrOpportunity?.toLowerCase().includes('opportunit')
                return (
                  <Box key={pr.id} sx={{ ...CARD, overflow: 'hidden', display: 'flex' }}>
                    <Box sx={{ width: 4, bgcolor: isOpp ? '#22c55e' : '#f59e0b', flexShrink: 0 }} />
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ px: 3, py: 2, display: 'flex', alignItems: 'center', gap: 1.5, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                        <Box sx={{ px: 1.5, py: 0.45, borderRadius: 4, bgcolor: isOpp ? '#dcfce7' : '#fef3c7', display: 'inline-block', flexShrink: 0 }}>
                          <Typography sx={{ fontSize: 11, fontWeight: 600, color: isOpp ? '#15803d' : '#92400e' }}>
                            {isOpp ? 'Opportunity' : 'Risk signal'}
                          </Typography>
                        </Box>
                        <Typography sx={{ fontSize: 13.5, fontWeight: 600, color: 'rgba(0,0,0,0.78)' }}>{pr.question}</Typography>
                      </Box>
                      <Box sx={{ px: 3, py: 2.5 }}>
                        <Typography sx={{ fontSize: 13.5, color: 'rgba(0,0,0,0.58)', lineHeight: 1.82, mb: pr.signals?.length > 0 ? 2 : 0 }}>
                          {pr.insight}
                        </Typography>
                        {pr.signals?.length > 0 && (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                            {pr.signals.map((s, i) => (
                              <Box key={i} sx={{ px: 1.5, py: 0.45, bgcolor: 'rgba(0,0,0,0.05)', borderRadius: 4, fontSize: 11.5, color: 'rgba(0,0,0,0.52)', fontWeight: 500 }}>
                                {s}
                              </Box>
                            ))}
                          </Box>
                        )}
                        {pr.riskOrOpportunity && (
                          <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                            <Typography sx={{ fontSize: 12.5, color: isOpp ? '#15803d' : '#92400e', fontWeight: 600, lineHeight: 1.6 }}>
                              💡 {pr.riskOrOpportunity}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Box>
                )
              })}
            </Stack>
          )}
        </Box>

      </Box>
    </Box>
  )
}

// ─── Perspectives view ────────────────────────────────────────────────────────

function PerspectiveCard({ perspective, perspectiveResult, rawResponses }) {
  const [expanded, setExpanded] = useState(false)

  const insight = perspectiveResult?.insight
  const signals = perspectiveResult?.signals || []
  const riskOrOpportunity = perspectiveResult?.riskOrOpportunity

  // Build per-model content from raw responses (excerpt relevant to this perspective)
  const modelExcerpts = ORDERED_MODELS
    .filter(m => rawResponses?.[m])
    .map(m => ({
      key: m,
      model: MODEL_META[m].label,
      color: MODEL_META[m].color,
      letter: MODEL_META[m].letter,
      text: rawResponses[m] || '',
    }))

  return (
    <Paper variant="outlined" sx={{ overflow: 'hidden', mb: 1.5 }}>
      <Box
        sx={{ px: 3, py: 2, display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
        onClick={() => setExpanded(e => !e)}
      >
        <ExpandMoreIcon sx={{
          fontSize: 20, color: 'text.secondary', flexShrink: 0,
          transform: expanded ? 'none' : 'rotate(-90deg)',
          transition: 'transform 0.2s',
        }} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>{perspective.question}</Typography>
          <Box sx={{ display: 'flex', gap: 0.75 }}>
            <Chip label="As recommended" size="small" />
            {perspective.enabled && insight && <Indicator label="Complete" color="green" size="small" />}
            {perspective.enabled && !insight && <Indicator label="Analyzing" color="cyan" size="small" />}
          </Box>
        </Box>
        <Switch
          checked={perspective.enabled}
          size="small"
          color="primary"
          onClick={e => e.stopPropagation()}
        />
      </Box>

      {expanded && (
        <Box sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
          {/* Insight summary */}
          {insight ? (
            <Box sx={{ px: 3, py: 2, bgcolor: 'grey.50' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic', lineHeight: 1.7, mb: signals.length > 0 ? 1.5 : 0 }}>
                {insight}
              </Typography>
              {signals.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                  {signals.map((sig, i) => (
                    <Chip key={i} label={sig} size="small" />
                  ))}
                </Box>
              )}
              {riskOrOpportunity && (
                <Typography variant="body2" sx={{ mt: 1.5, color: 'text.secondary', fontWeight: 500 }}>
                  💡 {riskOrOpportunity}
                </Typography>
              )}
            </Box>
          ) : (
            <Box sx={{ px: 3, py: 2, bgcolor: 'grey.50' }}>
              <Typography variant="body2" sx={{ color: 'text.disabled', fontStyle: 'italic' }}>
                Analysis for this perspective will appear after the run completes.
              </Typography>
            </Box>
          )}

          {/* Per-model excerpts */}
          {modelExcerpts.map(m => (
            <Box key={m.key} sx={{ borderTop: '1px solid', borderColor: 'divider', px: 3, py: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                <Avatar sx={{ width: 28, height: 28, bgcolor: m.color, fontSize: 12, fontWeight: 700 }}>{m.letter}</Avatar>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>By {m.model}</Typography>
                <Button size="small" variant="outlined" startIcon={<FlagOutlinedIcon />} sx={{ ml: 'auto', fontSize: 11 }}>
                  Flag report
                </Button>
              </Box>
              <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.8 }}>
                {m.text.slice(0, 500)}{m.text.length > 500 ? '…' : ''}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Paper>
  )
}

function PerspectivesView({ brand, perspectives, setPerspectives, perspectiveResults = [], rawResponses = {} }) {
  const [customQ, setCustomQ] = useState('')
  const activeCount = perspectives.filter(p => p.enabled).length

  const addCustom = () => {
    if (!customQ.trim()) return
    setPerspectives(prev => [...prev, { id: Date.now(), question: customQ, description: '', enabled: true }])
    setCustomQ('')
  }

  return (
    <Box sx={{ p: 4, maxWidth: 900, mx: 'auto' }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
          Strategic questions shaping
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5 }}>
          your analysis.
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {activeCount} of {perspectives.length} active
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>·</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {perspectiveResults.length} results ready
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>·</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Analyzing: <strong>{brand.name}</strong>
          </Typography>
        </Box>
      </Box>

      {perspectives.map(p => {
        const result = perspectiveResults.find(r => r.id === p.id) || null
        return (
          <PerspectiveCard
            key={p.id}
            perspective={p}
            perspectiveResult={result}
            rawResponses={rawResponses}
          />
        )
      })}

      <Paper variant="outlined" sx={{ p: 3, mt: 2, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          Add your own perspective
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            size="small"
            fullWidth
            placeholder="e.g., How does AI describe our sustainability efforts?"
            value={customQ}
            onChange={e => setCustomQ(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addCustom()}
          />
          <Button variant="contained" onClick={addCustom} disabled={!customQ.trim()} sx={{ flexShrink: 0 }}>
            Add
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

// ─── Executive Brief view ─────────────────────────────────────────────────────

function ExecutiveBriefView({ brand, brief, results }) {
  const [checkedItems, setCheckedItems] = useState({})

  const toggleItem = id => setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }))

  const stats = results?.stats
  const statItems = [
    { label: 'AI Visibility Score',  value: stats ? String(stats.visibilityScore)    : '--', suffix: stats ? '/100' : '' },
    { label: 'Positive Sentiment',   value: stats ? String(stats.positiveSentiment)   : '--', suffix: stats ? '%'    : '' },
    { label: 'Top-3 Mention Rate',   value: stats ? String(stats.topThreeMentionRate) : '--', suffix: stats ? '%'    : '' },
    { label: 'Competitive Rank',     value: stats ? `#${stats.competitiveRank}`       : '--', suffix: ''                  },
  ]

  const headline = brief?.headline
    || `${brand.name.charAt(0).toUpperCase() + brand.name.slice(1)} must sharpen external messaging to articulate AI capabilities and differentiate from legacy competitors.`

  const findings = brief?.findings || []
  const opportunities = brief?.opportunities || []
  const actionItems = brief?.actionItems || []

  const findingColor = sev => sev === 'high' ? 'error.main' : sev === 'medium' ? 'warning.main' : 'success.main'

  return (
    <Box sx={{ p: 4, maxWidth: 900, mx: 'auto' }}>
      {/* Headline */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.5, flex: 1 }}>
          {headline}
        </Typography>
        <Tooltip title="Share brief">
          <IconButton size="small" sx={{ flexShrink: 0 }}><ShareIcon fontSize="small" /></IconButton>
        </Tooltip>
      </Box>

      {/* Stats */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        {statItems.map(stat => (
          <Paper key={stat.label} variant="outlined" sx={{ flex: 1, p: 2, textAlign: 'center' }}>
            <Typography sx={{ fontSize: 24, fontWeight: 700, color: 'primary.main', lineHeight: 1.2 }}>
              {stat.value}
              <Typography component="span" sx={{ fontSize: 13, color: 'text.secondary' }}>{stat.suffix}</Typography>
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>
              {stat.label}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Priority findings */}
      {findings.length > 0 && (
        <>
          <Typography variant="overline" sx={{ display: 'block', color: 'text.disabled', letterSpacing: 1.5, mb: 1.5 }}>
            PRIORITY FINDINGS
          </Typography>
          <Stack spacing={1.5} sx={{ mb: 3 }}>
            {findings.map((item, i) => (
              <Paper key={i} variant="outlined" sx={{ px: 2.5, py: 2, borderLeft: '3px solid', borderLeftColor: findingColor(item.severity) }}>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>{item.title}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>{item.description}</Typography>
              </Paper>
            ))}
          </Stack>
        </>
      )}

      {/* Strategic opportunities */}
      {opportunities.length > 0 && (
        <>
          <Typography variant="overline" sx={{ display: 'block', color: 'text.disabled', letterSpacing: 1.5, mb: 1.5 }}>
            STRATEGIC DIFFERENTIATORS
          </Typography>
          <Stack spacing={1.5} sx={{ mb: 3 }}>
            {opportunities.map((item, i) => (
              <Paper key={i} variant="outlined" sx={{ px: 2.5, py: 2, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>{item.title}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>{item.description}</Typography>
                </Box>
                <Button size="small" variant="outlined" sx={{ flexShrink: 0, fontSize: 12 }}>View action</Button>
              </Paper>
            ))}
          </Stack>
        </>
      )}

      {/* Action items */}
      {actionItems.length > 0 && (
        <>
          <Typography variant="overline" sx={{ display: 'block', color: 'text.disabled', letterSpacing: 1.5, mb: 1.5 }}>
            ACTION ITEMS
          </Typography>
          <Paper variant="outlined">
            {actionItems.map((item, i) => (
              <Box
                key={i}
                sx={{
                  px: 2.5, py: 1.75,
                  display: 'flex', alignItems: 'center', gap: 1.5,
                  borderBottom: i < actionItems.length - 1 ? '1px solid' : 'none',
                  borderColor: 'divider',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
                onClick={() => toggleItem(i)}
              >
                {checkedItems[i]
                  ? <CheckBoxIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                  : <CheckBoxOutlineBlankIcon sx={{ fontSize: 20, color: 'text.disabled' }} />
                }
                <Typography
                  variant="body2"
                  sx={{ textDecoration: checkedItems[i] ? 'line-through' : 'none', color: checkedItems[i] ? 'text.secondary' : 'text.primary' }}
                >
                  {item}
                </Typography>
              </Box>
            ))}
          </Paper>
        </>
      )}

      {/* Empty state */}
      {findings.length === 0 && opportunities.length === 0 && (
        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'text.disabled' }}>
            Executive brief will appear here after analysis completes.
          </Typography>
        </Paper>
      )}
    </Box>
  )
}

// ─── Actions view ─────────────────────────────────────────────────────────────

function ActionsView({ actions: realActions }) {
  const [filter, setFilter] = useState('all')
  const [actionStatuses, setActionStatuses] = useState({})

  const getStatus = id => actionStatuses[id] || 'pending'
  const toggleInProgress = id => {
    setActionStatuses(prev => {
      const current = prev[id] || 'pending'
      return { ...prev, [id]: current === 'in_progress' ? 'pending' : 'in_progress' }
    })
  }

  const actions = realActions || []

  const filteredActions = actions.filter(a => {
    const s = getStatus(a.id)
    if (filter === 'all')         return true
    if (filter === 'pending')     return s === 'pending'
    if (filter === 'in-progress') return s === 'in_progress'
    if (filter === 'completed')   return s === 'completed'
    return true
  })

  const inProgressCount = actions.filter(a => getStatus(a.id) === 'in_progress').length
  const completedCount  = actions.filter(a => getStatus(a.id) === 'completed').length
  const highImpactCount = actions.filter(a => a.priority === 'HIGH').length

  return (
    <Box sx={{ p: 4, maxWidth: 900, mx: 'auto' }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="overline" sx={{ color: 'primary.main', letterSpacing: 1.5 }}>
          STRATEGIC ACTIONS
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5 }}>
          {actions.length > 0
            ? `${actions.length} strategic actions identified across your analysis.`
            : 'Strategic actions will appear here after analysis.'}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
          Run an AI agent to automatically generate strategy recommendations and content.
        </Typography>
      </Box>

      {/* Stats */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        {[
          { label: 'TOTAL ACTIONS', value: actions.length },
          { label: 'HIGH IMPACT',   value: highImpactCount },
          { label: 'IN PROGRESS',   value: inProgressCount },
          { label: 'COMPLETED',     value: completedCount },
        ].map(stat => (
          <Paper key={stat.label} variant="outlined" sx={{ flex: 1, p: 2, textAlign: 'center' }}>
            <Typography sx={{ fontSize: 28, fontWeight: 700, lineHeight: 1.2 }}>{stat.value}</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', letterSpacing: 1, display: 'block', mt: 0.25 }}>
              {stat.label}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Filter tabs */}
      <Tabs
        value={filter}
        onChange={(_, v) => setFilter(v)}
        sx={{ mb: 2, borderBottom: '1px solid', borderColor: 'divider' }}
      >
        {[
          { value: 'all',         label: `All ${actions.length}` },
          { value: 'pending',     label: 'Pending' },
          { value: 'in-progress', label: 'In Progress' },
          { value: 'completed',   label: 'Completed' },
        ].map(tab => (
          <Tab key={tab.value} value={tab.value} label={tab.label} sx={{ textTransform: 'none', fontWeight: 500 }} />
        ))}
      </Tabs>

      {/* Action cards */}
      <Stack spacing={1.5}>
        {filteredActions.map(action => (
          <Paper key={action.id} variant="outlined" sx={{ p: 2.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1 }}>
              <Indicator
                label={action.priority || 'MEDIUM'}
                color={action.priority === 'HIGH' ? 'orange' : 'blue'}
                size="small"
              />
              <Typography variant="body2" sx={{ fontWeight: 600, flex: 1 }}>
                {action.title}
              </Typography>
              <Button
                size="small"
                variant="contained"
                startIcon={<PlayArrowIcon sx={{ fontSize: 14 }} />}
                onClick={() => toggleInProgress(action.id)}
                sx={{ flexShrink: 0, fontSize: 12, py: 0.5 }}
              >
                {getStatus(action.id) === 'in_progress' ? 'Running...' : 'Run Agent'}
              </Button>
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 1.5 }}>
              {action.description}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              {action.signals && <Chip label={action.signals} size="small" />}
              {action.effort  && <Chip label={`Effort: ${action.effort}`} size="small" />}
              {getStatus(action.id) === 'in_progress' && (
                <Indicator label="In Progress" color="cyan" size="small" />
              )}
            </Box>
          </Paper>
        ))}
        {filteredActions.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {actions.length === 0
                ? 'Strategic actions will appear here after analysis completes.'
                : 'No actions in this category.'}
            </Typography>
          </Box>
        )}
      </Stack>
    </Box>
  )
}

// ─── Main Layout ──────────────────────────────────────────────────────────────

export default function GenAIMainLayout({
  brand,
  analysis = {},
  activeTab,
  onTabChange,
  perspectives,
  setPerspectives,
  onReanalyze,
}) {
  const {
    status = 'idle',
    progress = 0,
    modelStatus = {},
    modelRetry = {},
    results = null,
    rawResponses = {},
  } = analysis

  const isRunning = status === 'running'

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', bgcolor: '#F8F9FA' }}>

      {/* ── Sidebar ── */}
      <Box sx={{
        width: 272,
        flexShrink: 0,
        bgcolor: SIDEBAR_BG,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}>
        {/* Logo */}
        <Box sx={{ px: 2.5, pt: 2.5, pb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ fontWeight: 800, fontSize: 19, lineHeight: 1, color: SIDEBAR_ACTIVE, letterSpacing: -0.5 }}>{'<'}</Typography>
              <Box sx={{
                width: 12, height: 12, borderRadius: '50%',
                border: '2.5px solid', borderColor: SIDEBAR_ACTIVE,
                mx: '2px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Box sx={{ width: 3, height: 3, borderRadius: '50%', bgcolor: SIDEBAR_ACTIVE }} />
              </Box>
              <Typography sx={{ fontWeight: 800, fontSize: 19, lineHeight: 1, color: SIDEBAR_ACTIVE, letterSpacing: -0.5 }}>{'>'}</Typography>
            </Box>
            <Typography sx={{ fontWeight: 600, fontSize: 15, color: SIDEBAR_TEXT }}>GenAI Lens</Typography>
          </Box>
          <IconButton size="small" sx={{ color: SIDEBAR_MUTED }}>
            <MenuIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>

        {/* Brand selector */}
        <Box sx={{ px: 2, pb: 1 }}>
          <Typography sx={{ fontSize: 10, fontWeight: 600, color: SIDEBAR_MUTED, letterSpacing: 2, mb: 1, display: 'block' }}>
            ANALYZING
          </Typography>
          <Box sx={{
            display: 'flex', alignItems: 'center', gap: 1.5,
            px: 1.5, py: 1,
            borderRadius: 1,
            border: '1px solid rgba(255,255,255,0.14)',
            cursor: 'pointer',
            '&:hover': { bgcolor: SIDEBAR_HOVER },
          }}>
            <Avatar sx={{ width: 26, height: 26, bgcolor: SIDEBAR_ACTIVE, fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
              {brand.name ? brand.name[0].toUpperCase() : 'M'}
            </Avatar>
            <Typography sx={{ flex: 1, color: SIDEBAR_TEXT, fontSize: 13.5, fontWeight: 500 }}>
              {brand.name || 'Select brand'}
            </Typography>
            <KeyboardArrowDownIcon sx={{ fontSize: 16, color: SIDEBAR_MUTED }} />
          </Box>

          <Box
            onClick={!isRunning ? onReanalyze : undefined}
            sx={{
              mt: 1, px: 1.5, py: 0.875,
              borderRadius: 1,
              display: 'flex', alignItems: 'center', gap: 1,
              cursor: isRunning ? 'default' : 'pointer',
              bgcolor: 'rgba(255,255,255,0.05)',
              '&:hover': !isRunning ? { bgcolor: 'rgba(255,255,255,0.1)' } : {},
            }}
          >
            <RefreshIcon sx={{
              fontSize: 15,
              color: isRunning ? SIDEBAR_ACTIVE : SIDEBAR_MUTED,
              '@keyframes spin': { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } },
              animation: isRunning ? 'spin 1s linear infinite' : 'none',
            }} />
            <Typography sx={{ fontSize: 13, color: isRunning ? SIDEBAR_ACTIVE : SIDEBAR_MUTED }}>
              {isRunning ? 'Analyzing...' : 'Re-analyze'}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderColor: SIDEBAR_DIVIDER, mx: 2, my: 1 }} />

        {/* Nav items */}
        <Box sx={{ flex: 1, px: 1.5, overflow: 'auto' }}>
          <Stack spacing={0.25}>
            {NAV_ITEMS.map(item => {
              const isActive = activeTab === item.id
              const { Icon } = item
              return (
                <Box
                  key={item.id}
                  onClick={() => !isRunning && onTabChange(item.id)}
                  sx={{
                    display: 'flex', alignItems: 'center', gap: 1.5,
                    px: 1.5, py: 1.25,
                    borderRadius: 1.5,
                    cursor: isRunning ? 'default' : 'pointer',
                    bgcolor: isActive ? SIDEBAR_ACTIVE_BG : 'transparent',
                    opacity: isRunning && !isActive ? 0.4 : 1,
                    '&:hover': !isRunning ? { bgcolor: isActive ? SIDEBAR_ACTIVE_BG : SIDEBAR_HOVER } : {},
                  }}
                >
                  <Icon sx={{ fontSize: 18, color: isActive ? SIDEBAR_ACTIVE : SIDEBAR_MUTED }} />
                  <Typography sx={{
                    fontSize: 13.5,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? SIDEBAR_ACTIVE : SIDEBAR_TEXT,
                  }}>
                    {item.label}
                  </Typography>
                </Box>
              )
            })}
          </Stack>
        </Box>

        {/* User info */}
        <Divider sx={{ borderColor: SIDEBAR_DIVIDER, mx: 2, mb: 1.5 }} />
        <Box sx={{ px: 2, pb: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ width: 30, height: 30, bgcolor: 'rgba(255,255,255,0.14)', fontSize: 13, fontWeight: 600, color: SIDEBAR_TEXT }}>
            A
          </Avatar>
          <Box>
            <Typography sx={{ fontSize: 12.5, fontWeight: 500, color: SIDEBAR_TEXT, lineHeight: 1.3 }}>aschibono</Typography>
            <Typography sx={{ fontSize: 11, color: SIDEBAR_MUTED, lineHeight: 1.3 }}>tony.schibono@meltwater.com</Typography>
          </Box>
        </Box>
      </Box>

      {/* ── Main content ── */}
      <Box sx={{ flex: 1, overflow: 'auto', height: '100%' }}>
        {isRunning ? (
          <AnalyzingView brand={brand} modelStatus={modelStatus} modelRetry={modelRetry} progress={progress} />
        ) : (
          <>
            {activeTab === 'brand-perception' && (
              <BrandPerceptionView
                brand={brand}
                data={results}
                rawResponses={rawResponses}
                perspectiveResults={results?.perspectiveResults || []}
              />
            )}
            {activeTab === 'perspectives' && (
              <PerspectivesView
                brand={brand}
                perspectives={perspectives}
                setPerspectives={setPerspectives}
                perspectiveResults={results?.perspectiveResults || []}
                rawResponses={rawResponses}
              />
            )}
            {activeTab === 'executive-brief' && (
              <ExecutiveBriefView
                brand={brand}
                brief={results?.brief || null}
                results={results}
              />
            )}
            {activeTab === 'actions' && (
              <ActionsView
                actions={results?.actions || null}
              />
            )}
          </>
        )}
      </Box>
    </Box>
  )
}

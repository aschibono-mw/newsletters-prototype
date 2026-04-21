import { useState, Fragment } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Checkbox,
  IconButton,
  Stack,
  InputAdornment,
  Switch,
  CircularProgress,
  Skeleton,
  Alert,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import LanguageIcon from '@mui/icons-material/Language'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'

// AI_SUGGESTED_PERSPECTIVES is now dynamically generated per brand (see aiSuggestedPerspectives prop)

function GenAILensLogo() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ fontWeight: 800, fontSize: 20, lineHeight: 1, color: 'primary.main', letterSpacing: -1 }}>
          {'<'}
        </Typography>
        <Box sx={{
          width: 13, height: 13, borderRadius: '50%',
          border: '2.5px solid', borderColor: 'primary.main',
          mx: '2px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Box sx={{ width: 3.5, height: 3.5, borderRadius: '50%', bgcolor: 'primary.main' }} />
        </Box>
        <Typography sx={{ fontWeight: 800, fontSize: 20, lineHeight: 1, color: 'primary.main', letterSpacing: -1 }}>
          {'>'}
        </Typography>
      </Box>
      <Typography sx={{ fontWeight: 600, fontSize: 16, color: 'text.primary' }}>GenAI Lens</Typography>
    </Box>
  )
}

function StepIndicator({ steps, currentStep }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {steps.map((step, index) => {
        const stepNum = index + 1
        const isCompleted = stepNum < currentStep
        const isActive = stepNum === currentStep
        return (
          <Fragment key={step}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Box sx={{
                width: 28, height: 28, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                bgcolor: isCompleted || isActive ? 'primary.main' : 'grey.200',
                color: isCompleted || isActive ? 'common.white' : 'text.disabled',
                fontSize: '13px', fontWeight: 600, flexShrink: 0,
              }}>
                {isCompleted ? <CheckIcon sx={{ fontSize: 14 }} /> : stepNum}
              </Box>
              <Typography variant="body2" sx={{
                color: isActive ? 'text.primary' : isCompleted ? 'text.secondary' : 'text.disabled',
                fontWeight: isActive ? 600 : 400,
                whiteSpace: 'nowrap',
              }}>
                {step}
              </Typography>
            </Box>
            {index < steps.length - 1 && (
              <Box sx={{
                width: 48, height: 1,
                bgcolor: stepNum < currentStep ? 'primary.main' : 'grey.300',
                mx: 1.5, flexShrink: 0,
              }} />
            )}
          </Fragment>
        )
      })}
    </Box>
  )
}

// ─── Step 1 ──────────────────────────────────────────────────────────────────

function Step1Brand({ brand, setBrand }) {
  return (
    <Box sx={{ width: '100%', maxWidth: 480, textAlign: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Box sx={{
          width: 80, height: 80, borderRadius: '50%',
          bgcolor: 'grey.100',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}>
          <Stack spacing={0.75} alignItems="flex-start">
            {[36, 44, 44, 28].map((w, i) => (
              <Box key={i} sx={{ height: 3, bgcolor: 'grey.400', borderRadius: 1, width: w }} />
            ))}
          </Stack>
          <Box sx={{
            position: 'absolute', bottom: 14, right: 14,
            width: 12, height: 12, borderRadius: '50%', bgcolor: 'primary.main',
          }} />
        </Box>
      </Box>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>Tell us about your brand</Typography>
      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
        We'll use this to track how AI engines reference your brand.
      </Typography>
      <Box sx={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box>
          <Typography variant="body2" sx={{ mb: 0.75, fontWeight: 500 }}>Brand Name</Typography>
          <TextField
            fullWidth
            placeholder="e.g., Acme Corp"
            value={brand.name}
            onChange={e => setBrand(prev => ({ ...prev, name: e.target.value }))}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmailIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box>
          <Typography variant="body2" sx={{ mb: 0.75, fontWeight: 500 }}>Website URL</Typography>
          <TextField
            fullWidth
            placeholder="e.g., acmecorp.com"
            value={brand.website}
            onChange={e => setBrand(prev => ({ ...prev, website: e.target.value }))}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LanguageIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}

// ─── Step 2 ──────────────────────────────────────────────────────────────────

function Step2Competitors({ brand, competitors, competitorsLoading, competitorsError, selectedCount, toggleCompetitor, removeCompetitor, newComp, setNewComp, addCompetitor }) {
  const [expandedId, setExpandedId] = useState(null)

  return (
    <Box sx={{ width: '100%', maxWidth: 580 }}>
      <Typography variant="h4" sx={{ mb: 0.75, fontWeight: 600, textAlign: 'center' }}>
        Competitors for {brand.name}
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', textAlign: 'center' }}>
        Select the competitors you want to track and compare share of voice.
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Top competitors in {brand.name}'s market
          </Typography>
          {competitorsLoading && (
            <CircularProgress size={12} thickness={4} sx={{ color: 'primary.main' }} />
          )}
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {selectedCount} selected
        </Typography>
      </Box>

      <Stack spacing={1} sx={{ mb: 2 }}>
        {competitorsLoading && competitors.length === 0 ? (
          [1,2,3,4,5,6].map(i => (
            <Paper key={i} variant="outlined" sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Skeleton variant="rectangular" width={18} height={18} sx={{ borderRadius: 0.5, flexShrink: 0 }} />
              <Box sx={{ flex: 1 }}>
                <Skeleton width="40%" height={18} />
                <Skeleton width="28%" height={14} sx={{ mt: 0.5 }} />
              </Box>
            </Paper>
          ))
        ) : competitors.map(comp => {
          const isExpanded = expandedId === comp.id
          return (
            <Paper
              key={comp.id}
              variant="outlined"
              sx={{
                overflow: 'hidden',
                borderColor: comp.selected ? 'primary.main' : 'divider',
                bgcolor: comp.selected ? 'rgba(0,130,127,0.03)' : 'common.white',
              }}
            >
              {/* Header row */}
              <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Checkbox
                  checked={comp.selected}
                  onChange={() => toggleCompetitor(comp.id)}
                  size="small"
                  sx={{ p: 0 }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>{comp.name}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {comp.domain} · {comp.urlCount} URLs found
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  sx={{ color: 'text.secondary' }}
                  onClick={() => setExpandedId(isExpanded ? null : comp.id)}
                >
                  <ExpandMoreIcon
                    fontSize="small"
                    sx={{ transform: isExpanded ? 'none' : 'rotate(-90deg)', transition: 'transform 0.2s' }}
                  />
                </IconButton>
                <IconButton size="small" onClick={() => removeCompetitor(comp.id)} sx={{ color: 'text.secondary' }}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
              {/* Expanded URL list */}
              {isExpanded && comp.urls && (
                <Box sx={{ px: 2.5, pb: 2, pt: 0.5, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'grey.50' }}>
                  <Stack spacing={0.25}>
                    {comp.urls.map(url => (
                      <Typography key={url} variant="caption" sx={{ color: 'text.secondary', display: 'block', py: 0.25 }}>
                        {url}
                      </Typography>
                    ))}
                  </Stack>
                </Box>
              )}
            </Paper>
          )
        })}
      </Stack>

      {!competitorsLoading && competitorsError && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
            Auto-discovery failed
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
            {competitorsError}
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
            Add competitors manually below, or check your API key in the .env file.
          </Typography>
        </Alert>
      )}

      {!competitorsLoading && !competitorsError && competitors.length === 0 && (
        <Paper variant="outlined" sx={{ p: 3, mb: 2, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            No competitors found automatically. Add them manually below.
          </Typography>
        </Paper>
      )}

      <Paper
        variant="outlined"
        sx={{ p: 2.5, borderStyle: 'dashed', textAlign: 'center' }}
      >
        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          Or add a competitor manually
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
          <TextField
            size="small"
            placeholder="Competitor name"
            value={newComp.name}
            onChange={e => setNewComp(prev => ({ ...prev, name: e.target.value }))}
            sx={{ flex: 1 }}
          />
          <TextField
            size="small"
            placeholder="Website (optional)"
            value={newComp.website}
            onChange={e => setNewComp(prev => ({ ...prev, website: e.target.value }))}
            sx={{ flex: 1 }}
          />
        </Box>
        <Button
          fullWidth
          variant="contained"
          startIcon={<AddIcon />}
          onClick={addCompetitor}
          disabled={!newComp.name.trim()}
        >
          Add Competitor
        </Button>
      </Paper>

      <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 2, color: 'text.secondary' }}>
        {selectedCount}/10 competitors added
      </Typography>
    </Box>
  )
}

// ─── Step 3 ──────────────────────────────────────────────────────────────────

function PerspectiveRow({ perspective, onToggle }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <Paper variant="outlined" sx={{ borderRadius: 1, overflow: 'hidden' }}>
      <Box
        sx={{
          px: 2, py: 1.25,
          display: 'flex', alignItems: 'flex-start', gap: 1,
          cursor: 'pointer',
          '&:hover': { bgcolor: 'action.hover' },
        }}
        onClick={() => setExpanded(e => !e)}
      >
        <ExpandMoreIcon sx={{
          fontSize: 18, color: 'text.disabled', flexShrink: 0, mt: '3px',
          transform: expanded ? 'none' : 'rotate(-90deg)',
          transition: 'transform 0.2s',
        }} />
        <Typography variant="body2" sx={{ flex: 1, fontWeight: 500, lineHeight: 1.5 }}>
          {perspective.question}
        </Typography>
        <Switch
          checked={perspective.enabled}
          onChange={e => { e.stopPropagation(); onToggle() }}
          size="small"
          color="primary"
          onClick={e => e.stopPropagation()}
          sx={{ flexShrink: 0, ml: 0.5 }}
        />
      </Box>
      {expanded && perspective.description && (
        <Box sx={{ px: 2, pb: 1.5, pt: 1, bgcolor: 'grey.50', borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.6, display: 'block' }}>
            {perspective.description}
          </Typography>
        </Box>
      )}
    </Paper>
  )
}

function Step3Perspectives({ brand, perspectives, togglePerspective, aiEnabled, toggleAi, customQ, setCustomQ, addCustom, aiSuggestedPerspectives, aiPerspectivesLoading }) {
  return (
    <Box sx={{ width: '100%', maxWidth: 680 }}>
      <Typography variant="h4" sx={{ mb: 0.75, fontWeight: 600, textAlign: 'center' }}>
        Choose your perspectives
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', textAlign: 'center' }}>
        Each perspective is a question that guides how to analyze your brand.
      </Typography>

      <Typography variant="overline" sx={{ display: 'block', mb: 1, color: 'text.disabled', letterSpacing: 1.5 }}>
        RECOMMENDED
      </Typography>
      <Stack spacing={0.75} sx={{ mb: 3 }}>
        {perspectives.map(p => (
          <PerspectiveRow key={p.id} perspective={p} onToggle={() => togglePerspective(p.id)} />
        ))}
      </Stack>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <Typography variant="overline" sx={{ color: 'text.disabled', letterSpacing: 1.5 }}>
          AI SUGGESTIONS FOR {brand.name.toUpperCase()}
        </Typography>
        {aiPerspectivesLoading && <CircularProgress size={12} thickness={4} sx={{ color: 'primary.main' }} />}
      </Box>
      <Stack spacing={0.75} sx={{ mb: 3 }}>
        {aiPerspectivesLoading && aiSuggestedPerspectives.length === 0 ? (
          [1,2,3,4,5].map(i => (
            <Paper key={i} variant="outlined" sx={{ px: 2, py: 1.25, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Skeleton variant="circular" width={16} height={16} sx={{ flexShrink: 0 }} />
              <Skeleton width={`${55 + i * 6}%`} height={16} />
            </Paper>
          ))
        ) : aiSuggestedPerspectives.length > 0 ? (
          aiSuggestedPerspectives.map(p => (
            <PerspectiveRow
              key={p.id}
              perspective={{ ...p, enabled: aiEnabled[p.id] || false }}
              onToggle={() => toggleAi(p.id)}
            />
          ))
        ) : (
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              AI suggestions unavailable — add your own question below.
            </Typography>
          </Paper>
        )}
      </Stack>

      <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 2 }}>
        <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.25 }}>
          Add a custom perspective
        </Typography>
        <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', mb: 1.5 }}>
          Ask anything you want AI models to evaluate about your brand.
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="e.g., How does AI describe our sustainability efforts?"
          value={customQ}
          onChange={e => setCustomQ(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addCustom()}
          sx={{ mb: 1.5 }}
        />
        <Button
          variant="contained"
          fullWidth
          disabled={!customQ.trim()}
          onClick={addCustom}
        >
          + Add Perspective
        </Button>
      </Box>
    </Box>
  )
}

// ─── Step 4 ──────────────────────────────────────────────────────────────────

function Step4Confirm({ brand, selectedCount, enabledCount }) {
  return (
    <Box sx={{ width: '100%', maxWidth: 560, textAlign: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Box sx={{
          width: 80, height: 80, borderRadius: '50%',
          bgcolor: 'rgba(0,130,127,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <CheckIcon sx={{ fontSize: 38, color: 'primary.main' }} />
        </Box>
      </Box>

      <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>You're all set!</Typography>
      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
        Your workspace is ready. Let's start tracking your AI visibility.
      </Typography>

      <Typography variant="overline" sx={{ display: 'block', mb: 1.5, color: 'text.disabled', letterSpacing: 1.5 }}>
        SETUP SUMMARY
      </Typography>
      <Paper variant="outlined" sx={{ mb: 4, textAlign: 'left', borderRadius: 1, overflow: 'hidden' }}>
        {[
          { label: 'Brand', value: brand.name },
          { label: 'Website', value: brand.website },
          { label: 'Competitors', value: `${selectedCount} tracked` },
          { label: 'Perspectives', value: `${enabledCount} configured` },
        ].map((row, i, arr) => (
          <Box key={row.label} sx={{
            px: 3, py: 2,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            borderBottom: i < arr.length - 1 ? '1px solid' : 'none',
            borderColor: 'divider',
          }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>{row.label}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{row.value}</Typography>
              <CheckIcon sx={{ fontSize: 16, color: 'primary.main' }} />
            </Box>
          </Box>
        ))}
      </Paper>

      <Typography variant="overline" sx={{ display: 'block', mb: 1.5, color: 'text.disabled', letterSpacing: 1.5 }}>
        WHAT HAPPENS NEXT
      </Typography>
      <Stack spacing={1.5}>
        {[
          `We'll start scanning AI engines for mentions of ${brand.name}`,
          'Initial results will be ready in your narrative within minutes',
          'Automated runs will track changes over time',
        ].map((text, i) => (
          <Paper key={i} variant="outlined" sx={{ px: 3, py: 2, display: 'flex', alignItems: 'center', gap: 2, textAlign: 'left' }}>
            <Box sx={{
              width: 28, height: 28, borderRadius: '50%',
              bgcolor: 'grey.100',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>{i + 1}</Typography>
            </Box>
            <Typography variant="body2">{text}</Typography>
          </Paper>
        ))}
      </Stack>
    </Box>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

const STEPS = ['Brand', 'Competitors', 'Perspectives', 'Confirm']

export default function GenAIOnboarding({ brand, setBrand, competitors, setCompetitors, competitorsLoading, competitorsError, onBrandComplete, perspectives, setPerspectives, aiSuggestedPerspectives = [], aiPerspectivesLoading = false, onComplete }) {
  const [step, setStep] = useState(1)
  const [newComp, setNewComp] = useState({ name: '', website: '' })
  const [customQ, setCustomQ] = useState('')
  const [aiEnabled, setAiEnabled] = useState({})

  const selectedCount = competitors.filter(c => c.selected).length
  const enabledCount = perspectives.filter(p => p.enabled).length

  const toggleCompetitor = id => setCompetitors(prev => prev.map(c => c.id === id ? { ...c, selected: !c.selected } : c))
  const removeCompetitor = id => setCompetitors(prev => prev.filter(c => c.id !== id))
  const addCompetitor = () => {
    if (!newComp.name.trim()) return
    const slug = newComp.name.toLowerCase().replace(/[^a-z0-9]/g, '')
    const domain = newComp.website
      ? newComp.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/.*$/, '')
      : `${slug}.com`
    const urls = [
      domain,
      `www.${domain}`,
      `twitter.com/${slug}`,
      `linkedin.com/company/${slug}`,
      `instagram.com/${slug}`,
      `facebook.com/${slug}`,
      `youtube.com/@${slug}`,
      `tiktok.com/@${slug}`,
    ]
    setCompetitors(prev => [...prev, {
      id: Date.now(),
      name: newComp.name,
      domain,
      urls,
      urlCount: urls.length,
      selected: true,
    }])
    setNewComp({ name: '', website: '' })
  }

  const togglePerspective = id => setPerspectives(prev => prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p))
  const toggleAi = id => setAiEnabled(prev => ({ ...prev, [id]: !prev[id] }))
  const addCustom = () => {
    if (!customQ.trim()) return
    setPerspectives(prev => [...prev, { id: Date.now(), question: customQ, description: '', enabled: true }])
    setCustomQ('')
  }

  const handleContinue = () => {
    if (step === 1 && onBrandComplete) {
      onBrandComplete(brand) // triggers AI competitor discovery
    }
    setStep(s => s + 1)
  }

  const canContinue = () => {
    if (step === 1) return brand.name.trim() && brand.website.trim()
    if (step === 2) return !competitorsLoading && selectedCount > 0
    return true
  }

  return (
    <Box sx={{ position: 'fixed', inset: 0, zIndex: 1200, bgcolor: '#F8F9FA', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{
        bgcolor: 'common.white',
        borderBottom: '1px solid', borderColor: 'divider',
        px: 4, py: 2,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <GenAILensLogo />
        <StepIndicator steps={STEPS} currentStep={step} />
        <Box sx={{ width: 130 }} />
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', py: 6, px: 2, overflowY: 'auto' }}>
        {step === 1 && <Step1Brand brand={brand} setBrand={setBrand} />}
        {step === 2 && (
          <Step2Competitors
            brand={brand}
            competitors={competitors}
            competitorsLoading={competitorsLoading}
            competitorsError={competitorsError}
            selectedCount={selectedCount}
            toggleCompetitor={toggleCompetitor}
            removeCompetitor={removeCompetitor}
            newComp={newComp}
            setNewComp={setNewComp}
            addCompetitor={addCompetitor}
          />
        )}
        {step === 3 && (
          <Step3Perspectives
            brand={brand}
            perspectives={perspectives}
            togglePerspective={togglePerspective}
            aiEnabled={aiEnabled}
            toggleAi={toggleAi}
            customQ={customQ}
            setCustomQ={setCustomQ}
            addCustom={addCustom}
            aiSuggestedPerspectives={aiSuggestedPerspectives}
            aiPerspectivesLoading={aiPerspectivesLoading}
          />
        )}
        {step === 4 && (
          <Step4Confirm brand={brand} selectedCount={selectedCount} enabledCount={enabledCount} />
        )}
      </Box>

      {/* Footer */}
      <Box sx={{
        px: 4, py: 2.5,
        bgcolor: 'common.white',
        borderTop: '1px solid', borderColor: 'divider',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => setStep(s => s - 1)}
          variant="text"
          sx={{ color: 'text.secondary' }}
          disabled={step === 1}
        >
          Back
        </Button>
        {step < 4 ? (
          <Button
            endIcon={<ArrowForwardIcon />}
            onClick={handleContinue}
            variant="contained"
            disabled={!canContinue()}
          >
            Continue
          </Button>
        ) : (
          <Button startIcon={<RocketLaunchIcon />} onClick={onComplete} variant="contained">
            Run Analysis
          </Button>
        )}
      </Box>
    </Box>
  )
}

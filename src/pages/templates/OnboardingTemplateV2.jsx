import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Button,
  Paper,
  Checkbox,
  FormControlLabel,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SearchIcon from '@mui/icons-material/Search'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'

// Mock brand data (would come from account in real app)
const BRAND_DATA = {
  name: 'Tesla',
  logo: 'T', // In real app, this would be an image URL
  logoColor: '#E82127', // Tesla red
}

// Initial brand presence URLs
const INITIAL_URLS = [
  { id: 1, url: 'Tesla.com', checked: true },
  { id: 2, url: 'instagram.com/tesla', checked: true },
  { id: 3, url: 'facebook.com/tesla', checked: true },
  { id: 4, url: 'x.com/tesla', checked: true },
  { id: 5, url: 'linkedin/tesla', checked: true },
]

// Initial competitors
const INITIAL_COMPETITORS = [
  { id: 1, name: 'Ford Motor Company', checked: true },
  { id: 2, name: 'General Motors Company (GM)', checked: true },
  { id: 3, name: 'Volkswagen Group', checked: true },
  { id: 4, name: 'Lucid Group Inc', checked: true },
  { id: 5, name: 'BYD Company Limited', checked: true },
]

// Lenses to build
const LENSES = [
  { id: 1, name: 'Brands & Competitive Benchmarking', duration: 800 },
  { id: 2, name: 'Product level performance', duration: 1200 },
  { id: 3, name: 'Influencers & Key Personalities', duration: 1000 },
  { id: 4, name: 'Messaging & Narrative Trends', duration: 1400 },
  { id: 5, name: 'ROI & Implementation', duration: 1600 },
  { id: 6, name: 'Geographic Insights', duration: 1100 },
  { id: 7, name: 'Acquisition & Performance (Google Analytics integration)', duration: 2000 },
]

// ==========================================
// STEP 1: WELCOME
// ==========================================
function WelcomeStep({ onNext }) {
  const theme = useTheme()

  return (
    <Box sx={{ py: 6, px: 3 }}>
      {/* Brand logo + greeting */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            backgroundColor: BRAND_DATA.logoColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          {BRAND_DATA.logo}
        </Box>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
            Hi {BRAND_DATA.name}.
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Turn AI analysis into brand intelligence
          </Typography>
        </Box>
      </Box>

      {/* Description */}
      <Typography
        variant="body1"
        sx={{
          color: theme.palette.text.secondary,
          maxWidth: 700,
          lineHeight: 1.7,
          mb: 4,
        }}
      >
        GenAI Lens reveals how AI perceives your brand across ChatGPT, Gemini,
        Perplexity, and more. We've identified {BRAND_DATA.name} from your account details and will
        analyze how it's represented, compared, and talked about across major AI models.
        See sentiment, trends, competitive positioning, and turn complex AI data into clear,
        actionable insights.
      </Typography>

      {/* Get Started button */}
      <Button
        variant="outlined"
        onClick={onNext}
        sx={{
          textTransform: 'none',
          px: 4,
          py: 1.5,
          borderColor: theme.palette.divider,
          color: theme.palette.text.primary,
          fontWeight: 500,
          '&:hover': {
            borderColor: theme.palette.text.primary,
            backgroundColor: 'transparent',
          },
        }}
      >
        Get Started
      </Button>
    </Box>
  )
}

// ==========================================
// STEP 2: BRAND PRESENCE
// ==========================================
function BrandPresenceStep({ onNext }) {
  const theme = useTheme()
  const [urls, setUrls] = useState(INITIAL_URLS)
  const [newUrl, setNewUrl] = useState('')

  const handleToggle = (id) => {
    setUrls(urls.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)))
  }

  const handleAddUrl = () => {
    if (newUrl.trim()) {
      setUrls([...urls, { id: Date.now(), url: newUrl.trim(), checked: true }])
      setNewUrl('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddUrl()
    }
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 4,
        maxWidth: 700,
        mx: 'auto',
        my: 4,
        borderRadius: 2,
        borderColor: theme.palette.divider,
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Confirm your brand presence
      </Typography>

      <Typography
        variant="body1"
        sx={{ color: theme.palette.text.secondary, mb: 4, lineHeight: 1.7 }}
      >
        To generate accurate AI insights, GenAI Lens needs to understand where your
        brand lives online. Review and confirm the URLs below — these help us
        identify your brand's content, competitors, key personalities, and product
        signals across AI models.
      </Typography>

      {/* URL checkboxes */}
      <Box sx={{ mb: 3 }}>
        {urls.map((item) => (
          <FormControlLabel
            key={item.id}
            control={
              <Checkbox
                checked={item.checked}
                onChange={() => handleToggle(item.id)}
                sx={{
                  color: theme.palette.primary.main,
                  '&.Mui-checked': {
                    color: theme.palette.primary.main,
                  },
                }}
              />
            }
            label={
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {item.url}
              </Typography>
            }
            sx={{ display: 'flex', mb: 1.5 }}
          />
        ))}
      </Box>

      {/* Add URL section */}
      <Typography
        variant="body2"
        sx={{ color: theme.palette.text.secondary, mb: 2 }}
      >
        Add any missing websites or social channels to make your analysis as
        complete as possible.
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          placeholder="Enter URL"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          onKeyPress={handleKeyPress}
          size="small"
          sx={{ flex: 1, maxWidth: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: theme.palette.text.secondary, fontSize: 20 }} />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="outlined"
          onClick={handleAddUrl}
          sx={{
            textTransform: 'none',
            px: 3,
            borderColor: theme.palette.divider,
            color: theme.palette.text.primary,
            '&:hover': {
              borderColor: theme.palette.text.primary,
              backgroundColor: 'transparent',
            },
          }}
        >
          Add
        </Button>
      </Box>

      {/* Next button */}
      <Button
        variant="outlined"
        onClick={onNext}
        sx={{
          textTransform: 'none',
          px: 3,
          py: 1,
          borderColor: theme.palette.divider,
          color: theme.palette.text.primary,
          fontWeight: 500,
          '&:hover': {
            borderColor: theme.palette.text.primary,
            backgroundColor: 'transparent',
          },
        }}
      >
        Next &gt;&gt; Identify Competitors
      </Button>
    </Paper>
  )
}

// ==========================================
// STEP 3: COMPETITORS
// ==========================================
function CompetitorsStep({ onNext }) {
  const theme = useTheme()
  const [competitors, setCompetitors] = useState(INITIAL_COMPETITORS)
  const [newCompetitor, setNewCompetitor] = useState('')

  const handleToggle = (id) => {
    setCompetitors(
      competitors.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    )
  }

  const handleAddCompetitor = () => {
    if (newCompetitor.trim()) {
      setCompetitors([
        ...competitors,
        { id: Date.now(), name: newCompetitor.trim(), checked: true },
      ])
      setNewCompetitor('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddCompetitor()
    }
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 4,
        maxWidth: 700,
        mx: 'auto',
        my: 4,
        borderRadius: 2,
        borderColor: theme.palette.divider,
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Choose the competitors you want to benchmark against
      </Typography>

      <Typography
        variant="body1"
        sx={{ color: theme.palette.text.secondary, mb: 4, lineHeight: 1.7 }}
      >
        GenAI Lens compares your brand with others in your space to generate
        insights on positioning, sentiment, narratives, and share of voice.
        Review the competitors we found and select the ones most relevant to
        your brand. Add any missing competitors to strengthen your analysis.
      </Typography>

      {/* Competitor checkboxes */}
      <Box sx={{ mb: 3 }}>
        {competitors.map((item) => (
          <FormControlLabel
            key={item.id}
            control={
              <Checkbox
                checked={item.checked}
                onChange={() => handleToggle(item.id)}
                sx={{
                  color: theme.palette.primary.main,
                  '&.Mui-checked': {
                    color: theme.palette.primary.main,
                  },
                }}
              />
            }
            label={
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {item.name}
              </Typography>
            }
            sx={{ display: 'flex', mb: 1.5 }}
          />
        ))}
      </Box>

      {/* Add competitor section */}
      <Typography
        variant="body2"
        sx={{ color: theme.palette.text.primary, fontWeight: 500, mb: 2 }}
      >
        Don't see a competitor? Enter one manually below.
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          placeholder="Enter competitor"
          value={newCompetitor}
          onChange={(e) => setNewCompetitor(e.target.value)}
          onKeyPress={handleKeyPress}
          size="small"
          sx={{ flex: 1, maxWidth: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: theme.palette.text.secondary, fontSize: 20 }} />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="outlined"
          onClick={handleAddCompetitor}
          sx={{
            textTransform: 'none',
            px: 3,
            borderColor: theme.palette.divider,
            color: theme.palette.text.primary,
            '&:hover': {
              borderColor: theme.palette.text.primary,
              backgroundColor: 'transparent',
            },
          }}
        >
          Add
        </Button>
      </Box>

      {/* Next button */}
      <Button
        variant="outlined"
        onClick={onNext}
        sx={{
          textTransform: 'none',
          px: 3,
          py: 1,
          borderColor: theme.palette.divider,
          color: theme.palette.text.primary,
          fontWeight: 500,
          '&:hover': {
            borderColor: theme.palette.text.primary,
            backgroundColor: 'transparent',
          },
        }}
      >
        Next &gt;&gt; Generate Lenses
      </Button>
    </Paper>
  )
}

// ==========================================
// STEP 4: BUILDING LENSES
// ==========================================
// eslint-disable-next-line no-unused-vars
function BuildingLensesStep({ onComplete: _onComplete }) {
  const theme = useTheme()
  const navigate = useNavigate()
  const [completedLenses, setCompletedLenses] = useState([])
  const [currentLensIndex, setCurrentLensIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentLensIndex < LENSES.length) {
      const timer = setTimeout(() => {
        setCompletedLenses([...completedLenses, LENSES[currentLensIndex].id])
        setCurrentLensIndex(currentLensIndex + 1)
      }, LENSES[currentLensIndex].duration)

      return () => clearTimeout(timer)
    } else if (currentLensIndex === LENSES.length && !isComplete) {
      // All lenses complete, wait a moment then redirect
      const timer = setTimeout(() => {
        setIsComplete(true)
        navigate('/genai-lens')
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [currentLensIndex, completedLenses, navigate, isComplete])

  const getLensStatus = (lens, index) => {
    if (completedLenses.includes(lens.id)) {
      return 'complete'
    }
    if (index === currentLensIndex) {
      return 'loading'
    }
    return 'pending'
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 4,
        maxWidth: 700,
        mx: 'auto',
        my: 4,
        borderRadius: 2,
        borderColor: theme.palette.divider,
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Building your AI lenses
      </Typography>

      <Typography
        variant="body1"
        sx={{ color: theme.palette.text.secondary, mb: 4, lineHeight: 1.7 }}
      >
        GenAI Lens is organizing your brand and competitive data into focused
        lenses that highlight the key themes shaping your AI presence.
      </Typography>

      {/* Lenses list */}
      <Box sx={{ pl: 2 }}>
        {LENSES.map((lens, index) => {
          const status = getLensStatus(lens, index)

          return (
            <Box
              key={lens.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 2.5,
              }}
            >
              {/* Status icon */}
              {status === 'complete' ? (
                <CheckCircleIcon
                  sx={{
                    color: theme.palette.primary.main,
                    fontSize: 24,
                  }}
                />
              ) : status === 'loading' ? (
                <CircularProgress
                  size={22}
                  thickness={3}
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                />
              ) : (
                <RadioButtonUncheckedIcon
                  sx={{
                    color: theme.palette.grey[300],
                    fontSize: 24,
                  }}
                />
              )}

              {/* Lens name */}
              <Typography
                variant="body1"
                sx={{
                  fontWeight: status === 'complete' ? 500 : 400,
                  color:
                    status === 'pending'
                      ? theme.palette.text.secondary
                      : theme.palette.text.primary,
                }}
              >
                {lens.name}
              </Typography>
            </Box>
          )
        })}
      </Box>
    </Paper>
  )
}

// ==========================================
// MAIN COMPONENT
// ==========================================
function OnboardingTemplateV2() {
  const theme = useTheme()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    if (currentStep === 0) {
      navigate('/templates')
    } else {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep onNext={handleNext} />
      case 1:
        return <BrandPresenceStep onNext={handleNext} />
      case 2:
        return <CompetitorsStep onNext={handleNext} />
      case 3:
        return <BuildingLensesStep />
      default:
        return <WelcomeStep onNext={handleNext} />
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.grey[100] }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 3,
          py: 1.5,
          borderBottom: '1px solid',
          borderColor: theme.palette.divider,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <IconButton
          onClick={handleBack}
          sx={{ mr: 1, color: theme.palette.text.secondary }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          GenAI Lens
        </Typography>
      </Box>

      {/* Content */}
      <Box sx={{ maxWidth: 900, mx: 'auto', px: 3 }}>
        {renderStep()}
      </Box>
    </Box>
  )
}

export default OnboardingTemplateV2

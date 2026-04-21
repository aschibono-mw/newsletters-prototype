import {
  Box,
  Container,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Checkbox,
  Button,
  Chip,
  Divider,
} from '@mui/material'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined'
import { Link as RouterLink } from 'react-router-dom'

// ─── Mock data ─────────────────────────────────────────────────────────────────

const SIGNAL_GROUPS = [
  {
    groupLabel: 'Monitors',
    items: [
      {
        id: 1,
        icon: 'monitor',
        name: 'Nike Sustainability Monitor',
        description: '14 new articles this week',
        activity: 'Active · Updated Apr 9',
        checked: true,
      },
      {
        id: 2,
        icon: 'monitor',
        name: 'Competitor Monitor',
        description: 'Adidas, Under Armour, Puma tracked',
        activity: 'Active · 89 mentions',
        checked: true,
      },
      {
        id: 3,
        icon: 'monitor',
        name: 'ESG & Regulatory Monitor',
        description: 'EU green claims, carbon policy',
        activity: 'Active · Updated Apr 7',
        checked: false,
      },
    ],
  },
  {
    groupLabel: 'Dashboards',
    items: [
      {
        id: 4,
        icon: 'dashboard',
        name: 'Brand Sentiment Dashboard',
        description: 'Sentiment across news and social',
        activity: 'Updated Apr 9 · 9:14 AM',
        checked: true,
      },
    ],
  },
  {
    groupLabel: 'Alerts',
    items: [
      {
        id: 5,
        icon: 'alert',
        name: 'Spike Detection Alert',
        description: 'Triggers when mentions spike >50%',
        activity: 'Triggered 2× this week',
        checked: false,
      },
      {
        id: 6,
        icon: 'alert',
        name: 'Every Mention Alert',
        description: 'Nike brand · all sources',
        activity: 'High volume · 260 mentions/wk',
        checked: false,
      },
    ],
  },
]

const AI_SECTIONS = [
  {
    title: 'Executive Summary',
    description: 'AI narrative overview of the week\'s key developments',
    source: 'All selected signals',
  },
  {
    title: 'Top Stories',
    description: 'Highest-reach articles ranked by impact',
    source: 'Nike Sustainability Monitor',
  },
  {
    title: 'Sentiment Snapshot',
    description: 'Sentiment breakdown with trend vs. last issue',
    source: 'Brand Sentiment Dashboard',
  },
  {
    title: 'Competitor Pulse',
    description: 'Competitor mention volume and sentiment',
    source: 'Competitor Monitor',
  },
]

const STEPS = ['Choose Starting Point', 'Select Signals', 'Review & Schedule']

// ─── Sub-components ────────────────────────────────────────────────────────────

function SignalIcon({ type }) {
  const sx = { fontSize: 16 }
  if (type === 'dashboard') return <DashboardOutlinedIcon sx={{ ...sx, color: 'primary.main' }} />
  if (type === 'alert') return <NotificationsOutlinedIcon sx={{ ...sx, color: '#E65100' }} />
  return <TuneOutlinedIcon sx={{ ...sx, color: 'primary.main' }} />
}

function SignalSourceRow({ item }) {
  const isAlert = item.icon === 'alert'
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1.5,
        py: 1.5,
        opacity: item.checked ? 1 : 0.65,
      }}
    >
      <Checkbox
        checked={item.checked}
        size="small"
        sx={{ p: 0, mt: 0.25, flexShrink: 0, color: 'primary.main' }}
        readOnly
      />
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: 0.75,
          bgcolor: isAlert ? '#FFF3E0' : '#E0F2F1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <SignalIcon type={item.icon} />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
          {item.name}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
          {item.description}
        </Typography>
        <Typography variant="caption" sx={{ color: item.checked ? 'primary.main' : 'text.disabled', fontWeight: 500 }}>
          {item.activity}
        </Typography>
      </Box>
    </Box>
  )
}

function AiSectionPreview({ section, index }) {
  return (
    <Box
      sx={{
        p: 1.5,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 0.5,
        bgcolor: 'background.paper',
        display: 'flex',
        gap: 1.5,
        alignItems: 'flex-start',
      }}
    >
      <Box
        sx={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          bgcolor: 'grey.100',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          mt: 0.1,
        }}
      >
        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.65rem' }}>
          {index + 1}
        </Typography>
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.3, mb: 0.25 }}>
          {section.title}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.4, mb: 0.5 }}>
          {section.description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <AutoAwesomeOutlinedIcon sx={{ fontSize: 11, color: 'secondary.main' }} />
          <Typography variant="caption" sx={{ color: 'secondary.main', fontSize: '0.68rem' }}>
            from {section.source}
          </Typography>
        </Box>
      </Box>
      <CheckCircleOutlinedIcon sx={{ fontSize: 16, color: '#66BB6A', flexShrink: 0 }} />
    </Box>
  )
}

// ─── Main page ─────────────────────────────────────────────────────────────────

function DigestCreatePage() {
  const selectedCount = SIGNAL_GROUPS.flatMap((g) => g.items).filter((i) => i.checked).length

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', bgcolor: 'grey.50' }}>
      {/* Page header */}
      <Paper elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="xl" sx={{ py: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Create Digest
          </Typography>
          <Typography variant="body2" color="text.secondary">
            AI will build your digest structure from selected signals
          </Typography>
        </Container>
      </Paper>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Stepper */}
        <Stepper activeStep={1} sx={{ mb: 4 }}>
          {STEPS.map((label, i) => (
            <Step key={label} completed={i < 1}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Main card */}
        <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
          {/* Card header */}
          <Box
            sx={{
              px: 3,
              py: 2,
              borderBottom: '1px solid',
              borderColor: 'divider',
              bgcolor: 'grey.50',
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.25 }}>
              Select your signal sources
            </Typography>
            <Typography variant="body2" color="text.secondary">
              AI will generate digest sections based on the signals you select. You can edit sections after generation.
            </Typography>
          </Box>

          {/* Two-column content */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 360px', minHeight: 480 }}>

            {/* ── Left: signal picker ─────────────────────────────── */}
            <Box sx={{ p: 3, borderRight: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Available signal sources
                </Typography>
                <Chip
                  label={`${selectedCount} selected`}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    bgcolor: '#E0F2F1',
                    color: 'primary.dark',
                    borderRadius: '4px',
                  }}
                />
              </Box>

              {SIGNAL_GROUPS.map((group, gi) => (
                <Box key={group.groupLabel} sx={{ mb: gi < SIGNAL_GROUPS.length - 1 ? 2 : 0 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      color: 'text.secondary',
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                      display: 'block',
                      mb: 0.5,
                    }}
                  >
                    {group.groupLabel}
                  </Typography>
                  <Box
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 0.5,
                      overflow: 'hidden',
                    }}
                  >
                    {group.items.map((item, ii) => (
                      <Box
                        key={item.id}
                        sx={{
                          px: 1.5,
                          borderBottom: ii < group.items.length - 1 ? '1px solid' : 'none',
                          borderColor: 'divider',
                          bgcolor: item.checked ? '#FAFFFE' : 'background.paper',
                        }}
                      >
                        <SignalSourceRow item={item} />
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>

            {/* ── Right: AI preview ────────────────────────────────── */}
            <Box
              sx={{
                p: 3,
                bgcolor: '#FAFAFA',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Preview header */}
              <Box
                sx={{
                  p: 1.5,
                  mb: 2,
                  border: '1px solid #CE93D8',
                  borderRadius: 0.5,
                  bgcolor: '#F3E5F5',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1,
                }}
              >
                <AutoAwesomeOutlinedIcon
                  sx={{ fontSize: 18, color: 'secondary.main', flexShrink: 0, mt: 0.1 }}
                />
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: 'secondary.dark', mb: 0.25 }}
                  >
                    AI will generate {AI_SECTIONS.length} sections
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'secondary.dark' }}>
                    Based on {selectedCount} selected signals · You can reorder or remove sections before sending
                  </Typography>
                </Box>
              </Box>

              {/* Section previews */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
                {AI_SECTIONS.map((section, i) => (
                  <AiSectionPreview key={section.title} section={section} index={i} />
                ))}
              </Box>

              {/* Reuse note */}
              <Box
                sx={{
                  mt: 2,
                  p: 1.25,
                  bgcolor: '#E0F2F1',
                  border: '1px solid',
                  borderColor: 'primary.light',
                  borderRadius: 0.5,
                }}
              >
                <Typography variant="caption" color="primary.dark" sx={{ lineHeight: 1.5 }}>
                  <Box component="span" sx={{ fontWeight: 600 }}>
                    Reuse tip:
                  </Box>{' '}
                  This structure will be saved as a template so future digests can reuse the same signal-to-section mapping.
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Footer actions */}
          <Box
            sx={{
              px: 3,
              py: 2,
              borderTop: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              bgcolor: 'grey.50',
            }}
          >
            <Button
              component={RouterLink}
              to="/digests"
              variant="outlined"
              startIcon={<ArrowBackOutlinedIcon />}
              sx={{ textTransform: 'none' }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              endIcon={<ArrowForwardOutlinedIcon />}
              sx={{ textTransform: 'none' }}
            >
              Generate draft
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default DigestCreatePage

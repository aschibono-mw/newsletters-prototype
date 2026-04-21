import { useState, useEffect } from 'react'
import { Box, Typography, Grid, Card, CardContent, Link } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined'
import {
  MiraGradientBox,
  MiraButton,
  MiraGradientText,
  MiraChip,
} from '../components/mira'

// Section definitions for TOC
const SECTIONS = [
  { id: 'branding', label: 'Branding' },
  { id: 'chat', label: 'Chat' },
  { id: 'progress', label: 'Progress' },
  { id: 'cards', label: 'Cards' },
  { id: 'surfaces', label: 'Surfaces' },
]

// Component card
function ComponentCard({ name, path, preview }) {
  const navigate = useNavigate()

  return (
    <Card
      onClick={() => navigate(path)}
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid',
        borderColor: 'divider',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 2,
        },
      }}
    >
      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 0,
        }}
      >
        {/* Preview Area - Top */}
        <Box
          sx={{
            height: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(to bottom, #EEEEEE 0%, #F5F5F5 100%)',
            p: 3,
            pointerEvents: 'none',
          }}
        >
          {preview}
        </Box>

        {/* Title - Bottom */}
        <Box
          sx={{
            p: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {name}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

// Section component for rendering category groups
function ComponentSection({ id, title, components }) {
  return (
    <Box id={id} sx={{ mb: 6, scrollMarginTop: 100 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: 'text.primary' }}>
        {title}
      </Typography>
      <Grid container spacing={3}>
        {components.map((component) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={component.name}>
            <ComponentCard
              name={component.name}
              path={component.path}
              preview={component.preview}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

// Abstract illustration components
function AbstractPromptCard() {
  return (
    <Box sx={{ width: 180, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Box sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: 'grey.200',
        display: 'flex',
        gap: 1.5,
        alignItems: 'flex-start',
      }}>
        <Box sx={{ width: 28, height: 28, borderRadius: '50%', bgcolor: 'grey.400', flexShrink: 0 }} />
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          <Box sx={{ width: '90%', height: 10, bgcolor: 'grey.400', borderRadius: 1 }} />
          <Box sx={{ width: '70%', height: 8, bgcolor: 'grey.300', borderRadius: 1 }} />
        </Box>
      </Box>
    </Box>
  )
}

function AbstractChatInput() {
  return (
    <Box sx={{ width: 200 }}>
      <Box sx={{
        height: 40,
        borderRadius: 20,
        bgcolor: 'grey.200',
        display: 'flex',
        alignItems: 'center',
        px: 2,
        justifyContent: 'space-between',
      }}>
        <Box sx={{ width: 100, height: 8, bgcolor: 'grey.300', borderRadius: 4 }} />
        <Box sx={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #E91E8C 0%, #00BCD4 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Box sx={{
            width: 0,
            height: 0,
            borderLeft: '6px solid white',
            borderTop: '4px solid transparent',
            borderBottom: '4px solid transparent',
            ml: 0.25,
          }} />
        </Box>
      </Box>
    </Box>
  )
}

function AbstractPromoBanner() {
  return (
    <Box sx={{ width: 200 }}>
      <Box sx={{
        p: 1.5,
        borderRadius: 2,
        bgcolor: 'grey.200',
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
      }}>
        <Box sx={{ width: 28, height: 28, borderRadius: 1, bgcolor: 'grey.400', flexShrink: 0 }} />
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Box sx={{ width: '80%', height: 8, bgcolor: 'grey.400', borderRadius: 1 }} />
        </Box>
        <Box sx={{
          width: 40,
          height: 20,
          borderRadius: 1,
          background: 'linear-gradient(135deg, #E91E8C 0%, #00BCD4 100%)',
          flexShrink: 0,
        }} />
      </Box>
    </Box>
  )
}

function AbstractSourceCard() {
  return (
    <Box sx={{ width: 160 }}>
      <Box sx={{
        p: 1.5,
        borderRadius: 2,
        bgcolor: 'grey.200',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 20, height: 24, borderRadius: 0.5, bgcolor: 'grey.400' }} />
          <Box sx={{ width: '60%', height: 8, bgcolor: 'grey.400', borderRadius: 1 }} />
        </Box>
        <Box sx={{ width: '100%', height: 6, bgcolor: 'grey.300', borderRadius: 1 }} />
        <Box sx={{ width: '85%', height: 6, bgcolor: 'grey.300', borderRadius: 1 }} />
        <Box sx={{ width: '70%', height: 6, bgcolor: 'grey.300', borderRadius: 1 }} />
      </Box>
    </Box>
  )
}

function AbstractFrostedToolbar() {
  return (
    <Box sx={{ width: 180 }}>
      <Box sx={{
        height: 36,
        borderRadius: 1.5,
        bgcolor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(8px)',
        border: '1px solid',
        borderColor: 'grey.300',
        display: 'flex',
        alignItems: 'center',
        px: 1.5,
        gap: 1,
      }}>
        <Box sx={{ width: 80, height: 8, bgcolor: 'grey.400', borderRadius: 1 }} />
        <Box sx={{ flex: 1 }} />
        <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: 'grey.300' }} />
      </Box>
    </Box>
  )
}

function AbstractThinkingState() {
  return (
    <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'center' }}>
      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'grey.500' }} />
      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'grey.400' }} />
      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'grey.300' }} />
    </Box>
  )
}

function AbstractActivityMessage() {
  return (
    <Box sx={{ width: 160 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: 'grey.400', flexShrink: 0 }} />
        <Box sx={{ width: '80%', height: 8, bgcolor: 'grey.300', borderRadius: 1 }} />
      </Box>
    </Box>
  )
}

function AbstractProgressStub() {
  return (
    <Box sx={{ width: 180, display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Box sx={{
        height: 8,
        borderRadius: 4,
        bgcolor: 'grey.200',
        overflow: 'hidden',
      }}>
        <Box sx={{
          width: '65%',
          height: '100%',
          borderRadius: 4,
          background: 'linear-gradient(135deg, #E91E8C 0%, #00BCD4 100%)',
        }} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'grey.400' }} />
        <Box sx={{ width: '60%', height: 6, bgcolor: 'grey.300', borderRadius: 1 }} />
      </Box>
    </Box>
  )
}

function AbstractChatMessage() {
  return (
    <Box sx={{ width: 160, display: 'flex', flexDirection: 'column', gap: 1 }}>
      {/* User message - right aligned */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Box sx={{
          px: 1.5,
          py: 1,
          borderRadius: 2,
          borderBottomRightRadius: 0.5,
          bgcolor: 'grey.400',
          width: '70%',
        }}>
          <Box sx={{ width: '100%', height: 6, bgcolor: 'grey.300', borderRadius: 1 }} />
        </Box>
      </Box>
      {/* Assistant message - left aligned */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Box sx={{
          px: 1.5,
          py: 1,
          borderRadius: 2,
          borderBottomLeftRadius: 0.5,
          bgcolor: 'grey.200',
          width: '80%',
        }}>
          <Box sx={{ width: '100%', height: 6, bgcolor: 'grey.300', borderRadius: 1, mb: 0.5 }} />
          <Box sx={{ width: '70%', height: 6, bgcolor: 'grey.300', borderRadius: 1 }} />
        </Box>
      </Box>
    </Box>
  )
}

function AbstractSourcesPanel() {
  return (
    <Box sx={{ width: 140, display: 'flex', flexDirection: 'column', gap: 0.75 }}>
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            p: 1,
            borderRadius: 1.5,
            border: '1px solid',
            borderColor: 'grey.300',
            bgcolor: i === 0 ? 'grey.100' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Box sx={{ width: 14, height: 16, borderRadius: 0.5, bgcolor: 'grey.400' }} />
          <Box sx={{ width: '60%', height: 6, bgcolor: 'grey.300', borderRadius: 1 }} />
        </Box>
      ))}
    </Box>
  )
}

function AbstractStreamToolbar() {
  return (
    <Box sx={{ width: 200 }}>
      <Box sx={{
        height: 40,
        borderRadius: 1.5,
        bgcolor: 'grey.200',
        display: 'flex',
        alignItems: 'center',
        px: 1.5,
        gap: 1,
      }}>
        {/* Back arrow */}
        <Box sx={{
          width: 0,
          height: 0,
          borderRight: '6px solid',
          borderRightColor: 'grey.400',
          borderTop: '4px solid transparent',
          borderBottom: '4px solid transparent',
        }} />
        {/* Title */}
        <Box sx={{ width: 60, height: 8, bgcolor: 'grey.400', borderRadius: 1 }} />
        <Box sx={{ flex: 1 }} />
        {/* Toggle shapes */}
        <Box sx={{
          width: 36,
          height: 18,
          borderRadius: 9,
          bgcolor: 'grey.300',
          display: 'flex',
          alignItems: 'center',
          px: 0.25,
        }}>
          <Box sx={{ width: 14, height: 14, borderRadius: '50%', bgcolor: 'grey.400' }} />
        </Box>
      </Box>
    </Box>
  )
}

// Abstract previews for new components
function AbstractAvatar() {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Box sx={{
        width: 32,
        height: 32,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #B627A1 0%, #00827F 100%)',
        p: '1px',
      }}>
        <Box sx={{ width: '100%', height: '100%', borderRadius: '50%', bgcolor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ width: 12, height: 12, bgcolor: 'grey.400', borderRadius: '50%' }} />
        </Box>
      </Box>
      <Box sx={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #B627A1 0%, #00827F 100%)',
        p: '1px',
      }}>
        <Box sx={{ width: '100%', height: '100%', borderRadius: '50%', bgcolor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ width: 16, height: 16, bgcolor: 'grey.400', borderRadius: '50%' }} />
        </Box>
      </Box>
      <Box sx={{
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #B627A1 0%, #00827F 100%)',
        p: '1px',
      }}>
        <Box sx={{ width: '100%', height: '100%', borderRadius: '50%', bgcolor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ width: 24, height: 24, bgcolor: 'grey.400', borderRadius: '50%' }} />
        </Box>
      </Box>
    </Box>
  )
}

function AbstractSuggestionChip() {
  return (
    <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
      <Box sx={{
        px: 2,
        py: 1,
        borderRadius: 50,
        bgcolor: 'grey.100',
        border: '1px solid',
        borderColor: 'grey.300',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}>
        <Box sx={{ width: 80, height: 8, bgcolor: 'grey.400', borderRadius: 1 }} />
      </Box>
      <Box sx={{
        px: 2,
        py: 1,
        borderRadius: 50,
        bgcolor: 'grey.100',
        border: '1px solid',
        borderColor: 'grey.300',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}>
        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'grey.400' }} />
        <Box sx={{ width: 60, height: 8, bgcolor: 'grey.400', borderRadius: 1 }} />
      </Box>
    </Box>
  )
}

function AbstractFeedbackButtons() {
  return (
    <Box sx={{ display: 'flex', gap: 0.5 }}>
      <Box sx={{ width: 16, height: 16, borderRadius: 0.5, bgcolor: 'grey.400' }} />
      <Box sx={{ width: 16, height: 16, borderRadius: 0.5, bgcolor: 'grey.300' }} />
    </Box>
  )
}

function AbstractEmptyState() {
  return (
    <Box sx={{ width: 160, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
      <Box sx={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: 'linear-gradient(-45deg, rgba(182, 39, 161, 0.1) 0%, rgba(0, 130, 127, 0.1) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Box sx={{ width: 24, height: 24, borderRadius: '50%', bgcolor: 'grey.300' }} />
      </Box>
      <Box sx={{ width: '80%', height: 10, bgcolor: 'grey.400', borderRadius: 1 }} />
      <Box sx={{ width: '60%', height: 6, bgcolor: 'grey.300', borderRadius: 1 }} />
    </Box>
  )
}

function MiraComponentsPage() {
  const [activeSection, setActiveSection] = useState('branding')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )

    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const handleSectionClick = (e, sectionId) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Branding components
  const brandingComponents = [
    {
      name: 'MiraGradientBox',
      path: '/mira-components/gradient-box',
      preview: (
        <MiraGradientBox variant="full" opacity={0.5} sx={{ width: 200, height: 80, borderRadius: 1 }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>Pink-Cyan Gradient</Typography>
          </Box>
        </MiraGradientBox>
      ),
    },
    {
      name: 'MiraGradientText',
      path: '/mira-components/gradient-text',
      preview: (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, alignItems: 'center' }}>
          <MiraGradientText variant="h5" sx={{ fontWeight: 600 }}>
            Brand Monitoring
          </MiraGradientText>
          <MiraGradientText variant="subtitle1" sx={{ fontWeight: 600 }}>
            Analysis & Reporting
          </MiraGradientText>
          <MiraGradientText variant="body2">
            Gradient text styling
          </MiraGradientText>
        </Box>
      ),
    },
    {
      name: 'MiraButton',
      path: '/mira-components/button',
      preview: (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, alignItems: 'center' }}>
          <MiraButton variant="gradient" startIcon={<RocketLaunchOutlinedIcon />}>
            Try Now
          </MiraButton>
          <MiraButton variant="outlined">
            Learn More
          </MiraButton>
        </Box>
      ),
    },
    {
      name: 'MiraChip',
      path: '/mira-components/chip',
      preview: (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, alignItems: 'center' }}>
          <MiraChip label="Mira Companion" />
          <MiraChip label="AI Powered" size="small" />
        </Box>
      ),
    },
    {
      name: 'MiraAvatar',
      path: '/mira-components/avatar',
      preview: <AbstractAvatar />,
    },
  ]

  // Chat components
  const chatComponents = [
    {
      name: 'MiraChatInput',
      path: '/mira-components/chat-input',
      preview: <AbstractChatInput />,
    },
    {
      name: 'MiraChatMessage',
      path: '/mira-components/chat-message',
      preview: <AbstractChatMessage />,
    },
    {
      name: 'MiraThinkingState',
      path: '/mira-components/thinking-state',
      preview: <AbstractThinkingState />,
    },
    {
      name: 'MiraActivityMessage',
      path: '/mira-components/activity-message',
      preview: <AbstractActivityMessage />,
    },
    {
      name: 'MiraSuggestionChip',
      path: '/mira-components/suggestion-chip',
      preview: <AbstractSuggestionChip />,
    },
    {
      name: 'MiraFeedbackButtons',
      path: '/mira-components/feedback-buttons',
      preview: <AbstractFeedbackButtons />,
    },
  ]

  // Progress components
  const progressComponents = [
    {
      name: 'MiraProgressStub',
      path: '/mira-components/progress-stub',
      preview: <AbstractProgressStub />,
    },
    {
      name: 'MiraStreamToolbar',
      path: '/mira-components/stream-toolbar',
      preview: <AbstractStreamToolbar />,
    },
  ]

  // Cards components
  const cardsComponents = [
    {
      name: 'MiraPromptCard',
      path: '/mira-components/prompt-card',
      preview: <AbstractPromptCard />,
    },
    {
      name: 'MiraSourceCard',
      path: '/mira-components/source-card',
      preview: <AbstractSourceCard />,
    },
    {
      name: 'MiraSourcesPanel',
      path: '/mira-components/sources-panel',
      preview: <AbstractSourcesPanel />,
    },
    {
      name: 'MiraPromoBanner',
      path: '/mira-components/promo-banner',
      preview: <AbstractPromoBanner />,
    },
    {
      name: 'MiraEmptyState',
      path: '/mira-components/empty-state',
      preview: <AbstractEmptyState />,
    },
  ]

  // Surfaces components
  const surfacesComponents = [
    {
      name: 'MiraFrostedToolbar',
      path: '/mira-components/frosted-toolbar',
      preview: <AbstractFrostedToolbar />,
    },
  ]

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', px: 3, pt: 6, pb: 8 }}>
      {/* Main Content */}
      <Box sx={{ maxWidth: 900, width: '100%' }}>
        {/* Header */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 600, mb: 2 }}>
            Mira Components
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, lineHeight: 1.6 }}>
            AI-powered components that establish the distinct Mira visual identity. These complement the core Design System.
          </Typography>
        </Box>

        {/* Sections */}
        <ComponentSection id="branding" title="Branding" components={brandingComponents} />
        <ComponentSection id="chat" title="Chat" components={chatComponents} />
        <ComponentSection id="progress" title="Progress" components={progressComponents} />
        <ComponentSection id="cards" title="Cards" components={cardsComponents} />
        <ComponentSection id="surfaces" title="Surfaces" components={surfacesComponents} />
      </Box>

      {/* Fixed Sections Nav */}
      <Box
        sx={{
          width: 200,
          flexShrink: 0,
          ml: 6,
          display: { xs: 'none', lg: 'block' },
        }}
      >
        <Box sx={{ position: 'fixed', top: 80 }}>
          <Typography
            variant="overline"
            sx={{
              fontWeight: 600,
              color: 'text.secondary',
              display: 'block',
              mb: 1.5,
              fontSize: '0.7rem',
              letterSpacing: 1,
            }}
          >
            Sections
          </Typography>

          <Box
            component="nav"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
              borderLeft: '1px solid',
              borderColor: 'divider',
              pl: 2,
            }}
          >
            {SECTIONS.map((section) => {
              const isActive = activeSection === section.id
              return (
                <Link
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => handleSectionClick(e, section.id)}
                  sx={{
                    color: isActive ? 'primary.main' : 'text.secondary',
                    textDecoration: 'none',
                    fontSize: '0.8125rem',
                    fontWeight: isActive ? 600 : 400,
                    py: 0.5,
                    ml: -2,
                    pl: 2,
                    borderLeft: '2px solid',
                    borderColor: isActive ? 'primary.main' : 'transparent',
                    transition: 'all 0.15s',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  {section.label}
                </Link>
              )
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default MiraComponentsPage

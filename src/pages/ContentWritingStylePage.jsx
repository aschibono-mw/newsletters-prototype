import { useState, useEffect } from 'react'
import { Box, Typography, Divider, Link, Paper } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'

const SECTIONS = [
  { id: 'active-voice', label: 'Active Voice' },
  { id: 'second-person', label: 'Address Users' },
  { id: 'capitalization', label: 'Capitalization' },
  { id: 'tone', label: 'Tone' },
  { id: 'contractions', label: 'Contractions' },
  { id: 'resources', label: 'Resources' },
]

function ContentWritingStylePage() {
  const [activeSection, setActiveSection] = useState('active-voice')

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

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', px: 3, pt: 6, pb: 8 }}>
      {/* Main Content */}
      <Box sx={{ maxWidth: 800, width: '100%' }}>
        {/* Breadcrumb */}
        <Box sx={{ mb: 4 }}>
          <Link
            component={RouterLink}
            to="/content"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              color: 'text.secondary',
              textDecoration: 'none',
              fontSize: '0.875rem',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 16 }} />
            Content
          </Link>
        </Box>

        {/* Header */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 600, mb: 2 }}>
            Writing Style
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, lineHeight: 1.6 }}>
            Use simple verbs and tenses. Keep sentences short, friendly, and direct. Focus on the user's context.
          </Typography>
        </Box>

        {/* Active voice section */}
        <Box id="active-voice" sx={{ mb: 6, scrollMarginTop: 24 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Use Active Voice
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            Active voice sounds natural. People speak in active voice. It's more direct and easier to understand.
          </Typography>

          {/* Examples */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 3 }}>
            <Paper
              sx={{
                flex: 1,
                p: 3,
                backgroundColor: 'success.50',
                border: '1px solid',
                borderColor: 'success.200',
                borderRadius: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <CheckCircleOutlineIcon sx={{ color: 'success.main', fontSize: 20 }} />
                <Typography variant="subtitle2" sx={{ color: 'success.dark', fontWeight: 600 }}>
                  Do
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'text.primary' }}>
                "Click Save to update your settings."
              </Typography>
            </Paper>

            <Paper
              sx={{
                flex: 1,
                p: 3,
                backgroundColor: 'error.50',
                border: '1px solid',
                borderColor: 'error.200',
                borderRadius: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <CancelOutlinedIcon sx={{ color: 'error.main', fontSize: 20 }} />
                <Typography variant="subtitle2" sx={{ color: 'error.dark', fontWeight: 600 }}>
                  Don't
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'text.primary' }}>
                "Your settings will be updated when Save is clicked."
              </Typography>
            </Paper>
          </Box>
        </Box>

        <Divider sx={{ my: 5 }} />

        {/* Second person section */}
        <Box id="second-person" sx={{ mb: 6, scrollMarginTop: 24 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Address Users Directly
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            Use second person (you, your). First person (I, we, our) focuses on the writer, not the reader. Users care about what they can do and how the product applies to their workflow.
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            Exception: Use first person for possessive labels specific to user data—"My Account" or "My Projects." In explanatory text, switch back to second person.
          </Typography>

          {/* Examples */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 3 }}>
            <Paper
              sx={{
                flex: 1,
                p: 3,
                backgroundColor: 'success.50',
                border: '1px solid',
                borderColor: 'success.200',
                borderRadius: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <CheckCircleOutlineIcon sx={{ color: 'success.main', fontSize: 20 }} />
                <Typography variant="subtitle2" sx={{ color: 'success.dark', fontWeight: 600 }}>
                  Do
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'text.primary' }}>
                "You can customize your dashboard."
              </Typography>
            </Paper>

            <Paper
              sx={{
                flex: 1,
                p: 3,
                backgroundColor: 'error.50',
                border: '1px solid',
                borderColor: 'error.200',
                borderRadius: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <CancelOutlinedIcon sx={{ color: 'error.main', fontSize: 20 }} />
                <Typography variant="subtitle2" sx={{ color: 'error.dark', fontWeight: 600 }}>
                  Don't
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'text.primary' }}>
                "We allow users to customize their dashboard."
              </Typography>
            </Paper>
          </Box>
        </Box>

        <Divider sx={{ my: 5 }} />

        {/* Capitalization section */}
        <Box id="capitalization" sx={{ mb: 6, scrollMarginTop: 24 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Capitalization
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            Use title case for UI text—headings, labels, and buttons. Capitalize each major word.
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            In title case, capitalize all words except articles (a, an, the), prepositions (in, on, for, with), and conjunctions (and, but, or)—unless they're the first word.
          </Typography>

          {/* List of rules */}
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
            <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>Headings: Title Case</Typography>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>Button labels: Title Case</Typography>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>Form labels: Title Case</Typography>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>Table column headers: Title Case</Typography>
              <Typography component="li" variant="body2">Product names: As branded</Typography>
            </Box>
          </Paper>
        </Box>

        <Divider sx={{ my: 5 }} />

        {/* Tone section */}
        <Box id="tone" sx={{ mb: 6, scrollMarginTop: 24 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Tone
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            Aim for friendly and encouraging. Speak to the user. Keep sentences and paragraphs short. Cut unnecessary words.
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            While we aim for warmth, avoid being too casual or forcing humor. Error states and critical actions require a more serious, helpful tone.
          </Typography>
        </Box>

        <Divider sx={{ my: 5 }} />

        {/* Contractions section */}
        <Box id="contractions" sx={{ mb: 6, scrollMarginTop: 24 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Use Contractions
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            Contractions make content conversational and approachable. Use common contractions: "you'll," "we're," "don't," "can't."
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            Avoid unusual or ambiguous contractions like "there'd" or "would've." When emphasis matters, spell out the words: "do not" is stronger than "don't."
          </Typography>
        </Box>

        <Divider sx={{ my: 5 }} />

        {/* Related resources */}
        <Box id="resources" sx={{ mb: 6, scrollMarginTop: 24 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Resources
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Link
              component={RouterLink}
              to="/content/action-labels"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 500,
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Action Labels Guide
              <ArrowForwardIcon sx={{ fontSize: 16 }} />
            </Link>
            <Link
              component={RouterLink}
              to="/guidelines/accessibility"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 500,
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Accessibility Guidelines
              <ArrowForwardIcon sx={{ fontSize: 16 }} />
            </Link>
          </Box>
        </Box>

        {/* Page navigation */}
        <Box
          sx={{
            mt: 8,
            pt: 4,
            borderTop: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Link
            component={RouterLink}
            to="/content/overview"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              color: 'primary.main',
              textDecoration: 'none',
              fontWeight: 500,
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 16 }} />
            Overview
          </Link>
          <Link
            component={RouterLink}
            to="/content/action-labels"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              color: 'primary.main',
              textDecoration: 'none',
              fontWeight: 500,
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Action Labels
            <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Link>
        </Box>
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
        <Box
          sx={{
            position: 'fixed',
            top: 80,
          }}
        >
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

export default ContentWritingStylePage

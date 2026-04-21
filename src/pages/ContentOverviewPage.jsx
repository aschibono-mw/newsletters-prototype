import { useState, useEffect } from 'react'
import { Box, Typography, Divider, Link, Paper } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const SECTIONS = [
  { id: 'voice', label: 'Voice and Personality' },
  { id: 'principles', label: 'Content Principles' },
  { id: 'resources', label: 'Resources' },
]

function ContentOverviewPage() {
  const [activeSection, setActiveSection] = useState('voice')

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
            Overview
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, lineHeight: 1.6 }}>
            Clear content helps people accomplish goals. When words work, users move through interfaces with confidence.
          </Typography>
        </Box>

        {/* Voice section */}
        <Box id="voice" sx={{ mb: 6, scrollMarginTop: 24 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Voice and Personality
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            Voice expresses a company's personality. Whether spoken or written, our verbal identity stays as recognizable as our visual identity.
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            The underlying voice remains consistent across contexts. Word choice and sentence structure adapt to the situation, but the core personality stays the same.
          </Typography>
        </Box>

        <Divider sx={{ my: 5 }} />

        {/* Principles section */}
        <Box id="principles" sx={{ mb: 6, scrollMarginTop: 24 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Content Principles
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8 }}>
            These principles guide content decisions across all products.
          </Typography>

          {/* Principle 1 */}
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Be Clear
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
              Clarity is the foundation of good UX writing. Remove jargon. Use familiar words. Get to the point. If someone reads a sentence twice to understand it, rewrite it.
            </Typography>
          </Paper>

          {/* Principle 2 */}
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Be Concise
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
              Respect people's time. Every word earns its place. Cut filler, avoid redundancy, use short sentences. Aim for the fewest words that convey full meaning.
            </Typography>
          </Paper>

          {/* Principle 3 */}
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Be Helpful
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
              Anticipate what people need to know. Provide context when useful. Guide users toward success. Error messages explain what went wrong and how to fix it.
            </Typography>
          </Paper>

          {/* Principle 4 */}
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Be Human
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
              Write like a knowledgeable colleague, not a robot. Use contractions. Speak to the user. Choose warmth over formality when appropriate—but don't force humor where it doesn't fit.
            </Typography>
          </Paper>
        </Box>

        <Divider sx={{ my: 5 }} />

        {/* Related resources */}
        <Box id="resources" sx={{ mb: 6, scrollMarginTop: 24 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Resources
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            For guidance on writing for all users, see the resources below.
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
            <Link
              component={RouterLink}
              to="/content/writing-style"
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
              Writing Style Guide
              <ArrowForwardIcon sx={{ fontSize: 16 }} />
            </Link>
          </Box>
        </Box>

        {/* Next page navigation */}
        <Box
          sx={{
            mt: 8,
            pt: 4,
            borderTop: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Link
            component={RouterLink}
            to="/content/writing-style"
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
            Writing Style
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

export default ContentOverviewPage

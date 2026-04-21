import { useState, useEffect } from 'react'
import { Box, Typography, Divider, Link, Paper, Chip } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'

const SECTIONS = [
  { id: 'transparency', label: 'Why Transparency Matters' },
  { id: 'labeling', label: 'AI Labeling' },
  { id: 'explainability', label: 'Explainability' },
  { id: 'trust', label: 'Trust Patterns' },
  { id: 'resources', label: 'Further Reading' },
]

function AiPresenceGuidelinePage() {
  const [activeSection, setActiveSection] = useState('transparency')

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
          to="/guidelines"
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
          Guidelines
        </Link>
      </Box>

      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: 600, mb: 2 }}>
          AI Presence
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, lineHeight: 1.6 }}>
          AI should be transparent, not hidden. Users deserve to know when they're interacting with AI and how it influences their experience.
        </Typography>
      </Box>

      {/* Overview section */}
      <Box id="transparency" sx={{ mb: 6, scrollMarginTop: 24 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Why Transparency Matters
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
          As AI becomes embedded in our products, users need clear signals about where AI is at work. This isn't just about ethics—it's about building trust. When users understand how AI contributes to their experience, they can make better decisions about how to use it.
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
          Transparency also protects users from over-reliance. AI systems make mistakes. When users know AI is involved, they're more likely to verify important outputs and catch errors.
        </Typography>

        <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, backgroundColor: 'grey.50' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
            Core principles
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              <strong>Disclose:</strong> Always indicate when AI is present or has influenced content
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              <strong>Explain:</strong> Help users understand how AI reached its conclusions
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              <strong>Control:</strong> Give users the ability to override, edit, or dismiss AI outputs
            </Typography>
            <Typography component="li" variant="body2">
              <strong>Verify:</strong> Make it easy for users to check AI's work
            </Typography>
          </Box>
        </Paper>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* AI Labeling section */}
      <Box id="labeling" sx={{ mb: 6, scrollMarginTop: 24 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          AI Labeling
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8 }}>
          Use consistent visual indicators to mark AI-generated or AI-assisted content. Users should be able to recognize AI involvement at a glance.
        </Typography>

        {/* When to Label */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            When to Use AI Labels
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 2.5, color: 'text.secondary' }}>
            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
              AI-generated text, images, or media
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
              AI-powered suggestions and recommendations
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
              Automated decisions that affect user outcomes
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
              Predictive features (autocomplete, smart replies)
            </Typography>
            <Typography component="li" variant="body2">
              Content summarization or extraction
            </Typography>
          </Box>
        </Box>

        {/* Label Patterns */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Label Patterns
          </Typography>

          {/* Example: AI chip */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5, color: 'text.secondary' }}>
              AI indicator chip
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
              <Chip
                icon={<AutoAwesomeOutlinedIcon sx={{ fontSize: 16 }} />}
                label="AI generated"
                size="small"
                sx={{
                  backgroundColor: 'grey.100',
                  '& .MuiChip-icon': { color: 'text.secondary' },
                }}
              />
              <Chip
                icon={<AutoAwesomeOutlinedIcon sx={{ fontSize: 16 }} />}
                label="AI assisted"
                size="small"
                sx={{
                  backgroundColor: 'grey.100',
                  '& .MuiChip-icon': { color: 'text.secondary' },
                }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Use near the content it describes. "Generated" means fully AI-created; "Assisted" means AI helped but humans contributed.
            </Typography>
          </Box>

          {/* Example: Inline indicator */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5, color: 'text.secondary' }}>
              Inline sparkle icon
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5 }}>
              <AutoAwesomeOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2">Suggested by AI</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              The sparkle icon is our standard AI indicator. Use it inline for subtle labeling.
            </Typography>
          </Box>
        </Box>

        {/* Visual Distinction */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Visual Distinction
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary', mb: 2 }}>
            AI content can be visually distinguished through subtle styling differences:
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 2.5, color: 'text.secondary' }}>
            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
              Subtle background tint (e.g., light purple or gradient)
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
              Distinct border style (dashed, gradient)
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
              Consistent icon usage (sparkle/magic wand motif)
            </Typography>
            <Typography component="li" variant="body2">
              Don't overdo it—subtle is better than distracting
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* Explainability section */}
      <Box id="explainability" sx={{ mb: 6, scrollMarginTop: 24 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Explainability
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8 }}>
          When AI makes decisions or recommendations, help users understand why. Explainability builds trust and helps users make informed choices.
        </Typography>

        {/* Levels of Explanation */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Levels of Explanation
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary', mb: 2 }}>
            Not all situations require the same depth of explanation. Match the level to the stakes.
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 2.5, color: 'text.secondary' }}>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              <strong>Minimal:</strong> "Based on your preferences" — For low-stakes suggestions
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              <strong>Summary:</strong> "We considered X, Y, and Z factors" — For moderate-stakes decisions
            </Typography>
            <Typography component="li" variant="body2">
              <strong>Detailed:</strong> Full breakdown of inputs, weights, and reasoning — For high-stakes or regulated contexts
            </Typography>
          </Box>
        </Box>

        {/* Confidence Indicators */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Confidence Indicators
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary', mb: 2 }}>
            Show users how confident the AI is in its output. This helps them calibrate their trust.
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 2.5, color: 'text.secondary' }}>
            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
              Confidence scores (e.g., "85% confident")
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
              Qualitative labels (e.g., "High confidence", "Needs review")
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
              Visual indicators (progress bars, color coding)
            </Typography>
            <Typography component="li" variant="body2">
              Be honest about uncertainty—never hide low confidence
            </Typography>
          </Box>
        </Box>

        {/* Sources and Reasoning */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Show Your Sources
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
            When AI synthesizes information, cite the sources it drew from. This allows users to verify claims and builds credibility. Link to original documents, data points, or references whenever possible.
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* Trust Patterns section */}
      <Box id="trust" sx={{ mb: 6, scrollMarginTop: 24 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Trust Patterns
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8 }}>
          Trust is earned through consistent, predictable behavior. These patterns help build and maintain user trust in AI features.
        </Typography>

        {/* User Control */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Give Users Control
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 2.5, color: 'text.secondary' }}>
            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
              Allow users to edit, override, or reject AI outputs
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
              Provide settings to adjust AI behavior (aggressiveness, style, focus)
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
              Let users opt out of AI features entirely when appropriate
            </Typography>
            <Typography component="li" variant="body2">
              Make it easy to undo AI-initiated changes
            </Typography>
          </Box>
        </Box>

        {/* Feedback Loops */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Enable Feedback
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary', mb: 2 }}>
            Give users a way to tell the AI when it got something wrong. Thumbs up/down, star ratings, or explicit correction mechanisms help improve the system and give users a sense of agency.
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 2.5, color: 'text.secondary' }}>
            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
              Simple binary feedback (helpful / not helpful)
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
              Specific issue reporting (wrong, outdated, inappropriate)
            </Typography>
            <Typography component="li" variant="body2">
              Acknowledge when feedback is received
            </Typography>
          </Box>
        </Box>

        {/* Consistency */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Be Consistent
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
            AI behavior should be predictable. If similar inputs produce wildly different outputs, users lose trust. Establish clear patterns for how AI responds and stick to them. When behavior changes, communicate why.
          </Typography>
        </Box>

        {/* Acknowledge Limitations */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Acknowledge Limitations
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
            Don't pretend AI is infallible. Proactively communicate what the AI can and cannot do. When the AI is uncertain or operating outside its comfort zone, say so. Honesty about limitations builds more trust than false confidence.
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* Resources */}
      <Box id="resources" sx={{ mb: 6, scrollMarginTop: 24 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Further Reading
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Link
            href="https://carbondesignsystem.com/guidelines/carbon-for-ai/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              color: 'primary.main',
              textDecoration: 'none',
              fontWeight: 500,
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Carbon for AI guidelines
            <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Link>
          <Link
            href="https://pair.withgoogle.com/guidebook"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              color: 'primary.main',
              textDecoration: 'none',
              fontWeight: 500,
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Google PAIR AI guidebook
            <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Link>
          <Link
            href="https://www.microsoft.com/en-us/haxtoolkit/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              color: 'primary.main',
              textDecoration: 'none',
              fontWeight: 500,
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Microsoft HAX Toolkit
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
          to="/guidelines/accessibility"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            color: 'primary.main',
            textDecoration: 'none',
            fontWeight: 500,
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 16 }} />
          Accessibility
        </Link>
        <Link
          component={RouterLink}
          to="/guidelines/motion"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            color: 'primary.main',
            textDecoration: 'none',
            fontWeight: 500,
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Motion
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

export default AiPresenceGuidelinePage

import { useState, useEffect } from 'react'
import { Box, Typography, Divider, Link, Paper } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'keyboard-navigation', label: 'Keyboard Navigation' },
  { id: 'screen-readers', label: 'Screen Readers' },
  { id: 'color-and-contrast', label: 'Color and Contrast' },
  { id: 'cognitive-load', label: 'Cognitive Load' },
  { id: 'testing-and-resources', label: 'Testing and Resources' },
]

function AccessibilityGuidelinePage() {
  const [activeSection, setActiveSection] = useState('overview')

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
            Accessibility
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, lineHeight: 1.6 }}>
            We design for people with a wide range of abilities—blind, low vision, deaf, hard of hearing, motor disabilities, cognitive disabilities, and situational impairments.
          </Typography>
        </Box>

        {/* Overview section */}
        <Box id="overview" sx={{ mb: 6, scrollMarginTop: 24 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Overview
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            We follow WCAG 2.1 Level AA as our baseline. All interactive elements work via keyboard. All content works with assistive technologies. Interfaces stay understandable and robust across devices.
          </Typography>

          <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, backgroundColor: 'grey.50' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
              The Four Principles (POUR)
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                <strong>Perceivable:</strong> Content can be seen, heard, or felt
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                <strong>Operable:</strong> The interface works with keyboard, voice, or other input methods
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                <strong>Understandable:</strong> Users can comprehend both content and interface behavior
              </Typography>
              <Typography component="li" variant="body2">
                <strong>Robust:</strong> Everything functions across browsers, devices, and assistive tools
              </Typography>
            </Box>
          </Paper>
        </Box>

        <Divider sx={{ my: 5 }} />

        {/* Keyboard Navigation section */}
        <Box id="keyboard-navigation" sx={{ mb: 6, scrollMarginTop: 24 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Keyboard Navigation
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8 }}>
            Every interactive element works without a mouse.
          </Typography>

          {/* Focus Order */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Focus Order
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary', mb: 2 }}>
              Focus follows visual reading order—left to right, top to bottom.
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2.5, color: 'text.secondary' }}>
              <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                <code>tabindex="0"</code> makes custom elements focusable
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                <code>tabindex="-1"</code> allows programmatic focus only
              </Typography>
              <Typography component="li" variant="body2">
                Never use <code>tabindex="1"</code> or higher—let DOM order control the sequence
              </Typography>
            </Box>
          </Box>

          {/* Focus Indicators */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Focus Indicators
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary', mb: 2 }}>
              Use a visible 2px outline offset from the element:
            </Typography>

            {/* Focus State Illustration */}
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, mb: 3, backgroundColor: 'grey.50' }}>
              <Box sx={{ display: 'flex', gap: 4, alignItems: 'center', flexWrap: 'wrap' }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      px: 3,
                      py: 1,
                      backgroundColor: 'primary.main',
                      color: 'white',
                      borderRadius: 1,
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      mb: 1,
                    }}
                  >
                    Submit
                  </Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Default state
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      px: 3,
                      py: 1,
                      backgroundColor: 'primary.main',
                      color: 'white',
                      borderRadius: 1,
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      mb: 1,
                      outline: '2px solid #0891B2',
                      outlineOffset: '2px',
                    }}
                  >
                    Submit
                  </Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Focused state
                  </Typography>
                </Box>
              </Box>
            </Paper>

            <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
              <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                {`outline: 2px solid #0891B2;`}<br />
                {`outline-offset: 2px;`}
              </Typography>
            </Paper>
          </Box>

          {/* Keyboard Patterns */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Common Keyboard Patterns
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2.5, color: 'text.secondary' }}>
              <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                <strong>Tab / Shift+Tab:</strong> Move between focusable elements
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                <strong>Enter / Space:</strong> Activate buttons and links
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                <strong>Arrow keys:</strong> Navigate within menus, tabs, radio groups
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                <strong>Escape:</strong> Close modals, menus, popups
              </Typography>
              <Typography component="li" variant="body2">
                <strong>Home / End:</strong> Jump to first or last item
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 5 }} />

        {/* Screen Readers section */}
        <Box id="screen-readers" sx={{ mb: 6, scrollMarginTop: 24 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Screen Readers
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8 }}>
            Screen readers convert interfaces to audio or braille. Support them with semantic structure, labels, and dynamic updates.
          </Typography>

          {/* Semantic HTML */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Semantic HTML First
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary', mb: 2 }}>
              Native HTML has built-in accessibility. Use <code>&lt;button&gt;</code> for buttons, <code>&lt;a&gt;</code> for links, <code>&lt;input&gt;</code> for form fields. Reach for ARIA only when native semantics fall short.
            </Typography>
          </Box>

          {/* ARIA Landmarks */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              ARIA Landmarks
            </Typography>

            {/* Landmarks Illustration */}
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, mb: 3, backgroundColor: 'grey.50' }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1.5 }}>
                Page structure with landmark regions
              </Typography>
              <Box sx={{ border: '1px dashed', borderColor: 'grey.400', borderRadius: 1, overflow: 'hidden' }}>
                {/* Header */}
                <Box sx={{ p: 1.5, backgroundColor: 'primary.light', borderBottom: '1px dashed', borderColor: 'grey.400' }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: 'primary.dark' }}>
                    &lt;header&gt; — banner
                  </Typography>
                </Box>
                {/* Nav */}
                <Box sx={{ p: 1, backgroundColor: 'secondary.light', borderBottom: '1px dashed', borderColor: 'grey.400' }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: 'secondary.dark' }}>
                    &lt;nav&gt; — navigation
                  </Typography>
                </Box>
                {/* Main + Aside */}
                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ flex: 1, p: 2, backgroundColor: 'success.light', borderRight: '1px dashed', borderColor: 'grey.400' }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: 'success.dark' }}>
                      &lt;main&gt;
                    </Typography>
                    <Box sx={{ mt: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 0.5 }} />
                  </Box>
                  <Box sx={{ width: 100, p: 1.5, backgroundColor: 'warning.light' }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: 'warning.dark', fontSize: '0.65rem' }}>
                      &lt;aside&gt;
                    </Typography>
                  </Box>
                </Box>
                {/* Footer */}
                <Box sx={{ p: 1.5, backgroundColor: 'grey.300', borderTop: '1px dashed', borderColor: 'grey.400' }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: 'grey.700' }}>
                    &lt;footer&gt; — contentinfo
                  </Typography>
                </Box>
              </Box>
            </Paper>

            <Box component="ul" sx={{ m: 0, pl: 2.5, color: 'text.secondary' }}>
              <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                <code>&lt;header&gt;</code> or <code>role="banner"</code> — Site header
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                <code>&lt;nav&gt;</code> or <code>role="navigation"</code> — Navigation
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                <code>&lt;main&gt;</code> or <code>role="main"</code> — Primary content
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                <code>&lt;aside&gt;</code> or <code>role="complementary"</code> — Sidebar
              </Typography>
              <Typography component="li" variant="body2">
                <code>&lt;footer&gt;</code> or <code>role="contentinfo"</code> — Site footer
              </Typography>
            </Box>
          </Box>

          {/* Labels and Descriptions */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Labels and Descriptions
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2.5, color: 'text.secondary' }}>
              <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                <code>aria-label</code> — Names an element when visible text is absent
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                <code>aria-labelledby</code> — References another element as the label
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                <code>aria-describedby</code> — References additional descriptive text
              </Typography>
              <Typography component="li" variant="body2">
                <code>alt="Description"</code> for meaningful images; <code>alt=""</code> for decorative ones
              </Typography>
            </Box>
          </Box>

          </Box>

        <Divider sx={{ my: 5 }} />

        {/* Color and Contrast section */}
        <Box id="color-and-contrast" sx={{ mb: 6, scrollMarginTop: 24 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Color and Contrast
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8 }}>
            Color alone cannot convey information. Contrast keeps text readable for users with low vision or color blindness.
          </Typography>

          {/* Contrast Ratios */}
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              WCAG Contrast Requirements
            </Typography>

            <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 80,
                    height: 50,
                    backgroundColor: 'grey.100',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1,
                  }}
                >
                  <Typography sx={{ color: '#757575', fontSize: '0.75rem' }}>Text</Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'error.main', fontWeight: 600 }}>
                  2.5:1 Fail
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 80,
                    height: 50,
                    backgroundColor: 'grey.100',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1,
                  }}
                >
                  <Typography sx={{ color: '#595959', fontSize: '0.75rem' }}>Text</Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 600 }}>
                  4.5:1 Pass
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 80,
                    height: 50,
                    backgroundColor: 'grey.100',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1,
                  }}
                >
                  <Typography sx={{ color: '#1a1a1a', fontSize: '0.75rem' }}>Text</Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 600 }}>
                  15:1 Excellent
                </Typography>
              </Box>
            </Box>

            <Box component="ul" sx={{ m: 0, pl: 2.5, color: 'text.secondary' }}>
              <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                <strong>Normal text (under 18px or 14px bold):</strong> 4.5:1 ratio
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                <strong>Large text (18px+ or 14px+ bold):</strong> 3:1 ratio
              </Typography>
              <Typography component="li" variant="body2">
                <strong>UI components and graphics:</strong> 3:1 against adjacent colors
              </Typography>
            </Box>
          </Paper>

          {/* Color Blindness */}
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Design for Color Blindness
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
              About 8% of males and 0.5% of females have some form of color blindness.
            </Typography>

            <Box sx={{ display: 'flex', gap: 4, mb: 3, flexWrap: 'wrap' }}>
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block', mb: 1 }}>
                  Standard (red/green)
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Box sx={{ px: 1.5, py: 0.5, backgroundColor: '#d32f2f', color: 'white', borderRadius: 1, fontSize: '0.75rem' }}>
                    Error
                  </Box>
                  <Box sx={{ px: 1.5, py: 0.5, backgroundColor: '#2e7d32', color: 'white', borderRadius: 1, fontSize: '0.75rem' }}>
                    Success
                  </Box>
                </Box>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block', mb: 1 }}>
                  Colorblind-safe (orange/blue)
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Box sx={{ px: 1.5, py: 0.5, backgroundColor: '#e65100', color: 'white', borderRadius: 1, fontSize: '0.75rem' }}>
                    Error
                  </Box>
                  <Box sx={{ px: 1.5, py: 0.5, backgroundColor: '#0277bd', color: 'white', borderRadius: 1, fontSize: '0.75rem' }}>
                    Success
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box component="ul" sx={{ m: 0, pl: 2.5, color: 'text.secondary' }}>
              <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                Avoid red/green for critical information
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                Pair color with icons, patterns, or text
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                Test with simulators (Chrome DevTools includes one)
              </Typography>
              <Typography component="li" variant="body2">
                Our colorblind-safe palettes use blue for success, orange for error
              </Typography>
            </Box>
          </Paper>

          {/* Pair Color With Another Indicator */}
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Pair Color With Another Indicator
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
              Error states need red AND an icon or message. Success states need green AND confirmation text.
            </Typography>

            {/* Error states */}
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block', mb: 1.5 }}>
              Error states
            </Typography>
            <Box sx={{ display: 'flex', gap: 4, mb: 4, flexWrap: 'wrap' }}>
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
                  Color only
                </Typography>
                <Box sx={{ px: 2, py: 1, border: '2px solid', borderColor: 'error.main', borderRadius: 1, backgroundColor: 'grey.50' }}>
                  <Typography variant="body2" sx={{ color: 'error.main' }}>Email</Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
                  Color + icon + text
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Box sx={{ px: 2, py: 1, border: '2px solid', borderColor: 'error.main', borderRadius: 1, backgroundColor: 'grey.50' }}>
                    <Typography variant="body2" sx={{ color: 'error.main' }}>Email</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <ErrorOutlineIcon sx={{ fontSize: 14, color: 'error.main' }} />
                    <Typography variant="caption" sx={{ color: 'error.main' }}>
                      Please enter a valid email
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Success states */}
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block', mb: 1.5 }}>
              Success states
            </Typography>
            <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
                  Color only
                </Typography>
                <Box sx={{ px: 2, py: 1, border: '2px solid', borderColor: 'success.main', borderRadius: 1, backgroundColor: 'grey.50' }}>
                  <Typography variant="body2" sx={{ color: 'success.main' }}>Email</Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
                  Color + icon + text
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Box sx={{ px: 2, py: 1, border: '2px solid', borderColor: 'success.main', borderRadius: 1, backgroundColor: 'grey.50' }}>
                    <Typography variant="body2" sx={{ color: 'success.main' }}>Email</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CheckCircleOutlineIcon sx={{ fontSize: 14, color: 'success.main' }} />
                    <Typography variant="caption" sx={{ color: 'success.main' }}>
                      Email address is valid
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>

        <Divider sx={{ my: 5 }} />

        {/* Cognitive Load section */}
        <Box id="cognitive-load" sx={{ mb: 6, scrollMarginTop: 24 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Cognitive Load
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8 }}>
            Reduce mental effort. This helps users with cognitive disabilities and everyone else when tired, distracted, or stressed.
          </Typography>

          {/* Simple Language */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Use Simple Language
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2.5, color: 'text.secondary' }}>
              <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                Write at an 8th-grade reading level
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                Define jargon and abbreviations
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                Keep sentences short
              </Typography>
              <Typography component="li" variant="body2">
                Lead with the main point
              </Typography>
            </Box>
          </Box>

          {/* Progressive Disclosure */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Progressive Disclosure
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary', mb: 2 }}>
              Show what's needed at each step. Hide advanced options behind expandable sections. Break complex tasks into smaller steps.
            </Typography>

            {/* Progressive Disclosure Illustration */}
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, backgroundColor: 'grey.50' }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>
                Show essentials first, details on demand
              </Typography>
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                <Box sx={{ flex: 1, minWidth: 150 }}>
                  <Box sx={{ p: 2, backgroundColor: 'white', border: '1px solid', borderColor: 'grey.300', borderRadius: 1 }}>
                    <Box sx={{ height: 8, width: '80%', backgroundColor: 'grey.300', borderRadius: 0.5, mb: 1 }} />
                    <Box sx={{ height: 8, width: '60%', backgroundColor: 'grey.300', borderRadius: 0.5, mb: 2 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <ArrowForwardIcon sx={{ fontSize: 12, color: 'primary.main' }} />
                      <Typography variant="caption" sx={{ color: 'primary.main' }}>Show advanced</Typography>
                    </Box>
                  </Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 1, textAlign: 'center' }}>
                    Collapsed
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, minWidth: 150 }}>
                  <Box sx={{ p: 2, backgroundColor: 'white', border: '1px solid', borderColor: 'grey.300', borderRadius: 1 }}>
                    <Box sx={{ height: 8, width: '80%', backgroundColor: 'grey.300', borderRadius: 0.5, mb: 1 }} />
                    <Box sx={{ height: 8, width: '60%', backgroundColor: 'grey.300', borderRadius: 0.5, mb: 2 }} />
                    <Divider sx={{ my: 1.5 }} />
                    <Box sx={{ height: 8, width: '70%', backgroundColor: 'grey.200', borderRadius: 0.5, mb: 1 }} />
                    <Box sx={{ height: 8, width: '50%', backgroundColor: 'grey.200', borderRadius: 0.5 }} />
                  </Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 1, textAlign: 'center' }}>
                    Expanded
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Box>

          {/* Error Prevention */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Error Prevention and Recovery
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2.5, color: 'text.secondary' }}>
              <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                Give clear instructions before users act
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                Validate inline to catch mistakes early
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                Explain what went wrong and how to fix it
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                Allow undo for destructive actions
              </Typography>
              <Typography component="li" variant="body2">
                Preserve input when errors occur
              </Typography>
            </Box>
          </Box>

          {/* Consistency */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Consistency
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
              Same patterns everywhere. Once users learn how tabs work in one place, tabs work the same everywhere.
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 5 }} />

        {/* Resources */}
        <Box id="testing-and-resources" sx={{ mb: 6, scrollMarginTop: 24 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Testing and Resources
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            Test accessibility—don't assume it. Use automated tools, manual keyboard testing, and screen reader walkthroughs.
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Link
              href="https://www.deque.com/axe/browser-extensions/"
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
              axe DevTools (browser extension)
              <ArrowForwardIcon sx={{ fontSize: 16 }} />
            </Link>
            <Link
              href="https://webaim.org/resources/contrastchecker/"
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
              WebAIM Contrast Checker
              <ArrowForwardIcon sx={{ fontSize: 16 }} />
            </Link>
            <Link
              href="https://www.nvaccess.org/download/"
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
              NVDA screen reader (free)
              <ArrowForwardIcon sx={{ fontSize: 16 }} />
            </Link>
            <Link
              href="https://www.w3.org/WAI/standards-guidelines/wcag/"
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
              WCAG 2.1 full specification
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
            to="/guidelines/ai-presence"
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
            AI Presence
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

export default AccessibilityGuidelinePage

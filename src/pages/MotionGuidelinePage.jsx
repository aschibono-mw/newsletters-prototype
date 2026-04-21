import React, { useState, useEffect } from 'react'
import { Box, Typography, Divider, Link, Paper, IconButton } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

const SECTIONS = [
  { id: 'purpose', label: 'Purpose of Motion' },
  { id: 'principles', label: 'Animation Principles' },
  { id: 'timing', label: 'Timing' },
  { id: 'easing', label: 'Easing Curves' },
  { id: 'patterns', label: 'Common Patterns' },
  { id: 'resources', label: 'Resources' },
]

// Easing definitions for the race comparison
const EASING_CURVES = [
  { name: 'instant', label: 'Instant', value: 'step-end', color: '#7C4DFF', isInstant: true },
  { name: 'easeOut', label: 'Ease Out', value: 'cubic-bezier(0.0, 0, 0.2, 1)', color: '#2196F3' },
  { name: 'easeInOut', label: 'Ease In-Out', value: 'cubic-bezier(0.4, 0, 0.2, 1)', color: '#00897B' },
  { name: 'linear', label: 'Linear', value: 'linear', color: '#9E9E9E' },
  { name: 'sharp', label: 'Sharp', value: 'cubic-bezier(0.4, 0, 0.6, 1)', color: '#FF9800' },
  { name: 'easeIn', label: 'Ease In', value: 'cubic-bezier(0.4, 0, 1, 1)', color: '#E91E63' },
]

// Side-by-side race comparison component
function EasingRace({ duration = 800 }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [loopKey, setLoopKey] = useState(0)

  const handlePlay = () => {
    if (isPlaying) return
    setIsPlaying(true)
  }

  const handleStop = () => {
    setIsPlaying(false)
    // Reset positions
    setLoopKey(prev => prev + 1)
  }

  // Handle looping
  useEffect(() => {
    if (!isPlaying) return

    const loopTimeout = setTimeout(() => {
      // Reset and restart
      setLoopKey(prev => prev + 1)
    }, duration + 600) // Pause at end before restart

    return () => clearTimeout(loopTimeout)
  }, [isPlaying, loopKey, duration])

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, backgroundColor: 'grey.50' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          Compare Easing Curves
        </Typography>
        <IconButton
          onClick={isPlaying ? handleStop : handlePlay}
          size="small"
          sx={{
            width: 32,
            height: 32,
            backgroundColor: isPlaying ? 'error.100' : 'primary.100',
            '&:hover': {
              backgroundColor: isPlaying ? 'error.200' : 'primary.200',
            },
          }}
        >
          {isPlaying ? (
            <Box sx={{ width: 10, height: 10, backgroundColor: 'error.main', borderRadius: 0.5 }} />
          ) : (
            <PlayArrowIcon sx={{ fontSize: 18, color: 'primary.main' }} />
          )}
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {EASING_CURVES.map((curve) => (
          <Box key={`${curve.name}-${loopKey}`} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Label */}
            <Typography
              variant="caption"
              sx={{
                width: 80,
                flexShrink: 0,
                fontWeight: 500,
                color: curve.color,
              }}
            >
              {curve.label}
            </Typography>
            {/* Track */}
            <Box
              sx={{
                flex: 1,
                height: 28,
                backgroundColor: 'background.paper',
                borderRadius: 1.5,
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'grey.200',
              }}
            >
              {/* Animated ball */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: isPlaying ? 'calc(100% - 22px)' : '8px',
                  width: 14,
                  height: 14,
                  backgroundColor: curve.color,
                  borderRadius: '50%',
                  transform: 'translateY(-50%)',
                  transition: isPlaying
                    ? `left ${duration}ms ${curve.value}`
                    : 'none',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>

      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
        Watch how each curve reaches the finish line differently. Ease-out arrives first but slows down. Ease-in starts slow but accelerates.
      </Typography>
    </Paper>
  )
}

function MotionGuidelinePage() {
  const [activeSection, setActiveSection] = useState('purpose')

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
          Motion
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, lineHeight: 1.6 }}>
          Motion brings interfaces to life. When done well, it guides attention, provides feedback, and creates a sense of continuity. When overdone, it becomes distracting and slow.
        </Typography>
      </Box>

      {/* Overview section */}
      <Box id="purpose" sx={{ mb: 6, scrollMarginTop: 24 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Purpose of Motion
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
          Every animation should have a purpose. Motion is not decoration—it's communication. Use it to help users understand spatial relationships, see cause and effect, and stay oriented during transitions.
        </Typography>

        <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, backgroundColor: 'grey.50' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
            When to use motion
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              <strong>Feedback:</strong> Confirm user actions (button press, form submission)
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              <strong>Orientation:</strong> Show where elements came from or are going
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              <strong>Focus:</strong> Draw attention to important changes
            </Typography>
            <Typography component="li" variant="body2">
              <strong>Continuity:</strong> Maintain context during navigation
            </Typography>
          </Box>
        </Paper>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* Animation Principles section */}
      <Box id="principles" sx={{ mb: 6, scrollMarginTop: 24 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Animation Principles
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8 }}>
          These principles guide how we approach motion design. They ensure animations feel natural, purposeful, and consistent.
        </Typography>

        {/* Subtle */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Keep It Subtle
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
            The best animations are barely noticed. They enhance the experience without calling attention to themselves. If users comment on how "animated" your UI is, you've probably overdone it.
          </Typography>
        </Box>

        {/* Quick */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Keep It Quick
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
            Users expect interfaces to respond instantly. Long animations feel sluggish. Most UI animations should complete in 100-300ms. Anything longer needs a strong justification.
          </Typography>
        </Box>

        {/* Meaningful */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Make It Meaningful
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary', mb: 2 }}>
            Every animation should answer a question: "What just happened?" or "What's changing?" If an animation doesn't add clarity, remove it.
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 2.5, color: 'text.secondary' }}>
            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
              Expand/collapse reveals hidden content
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
              Slide transitions show navigation direction
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
              Fade indicates adding/removing without movement
            </Typography>
            <Typography component="li" variant="body2">
              Scale suggests hierarchy or emphasis
            </Typography>
          </Box>
        </Box>

        {/* Consistent */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Stay Consistent
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
            Similar actions should have similar animations. If dropdowns slide down, all dropdowns should slide down. Inconsistent motion creates cognitive dissonance.
          </Typography>
        </Box>

        {/* Respect Preferences */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Respect User Preferences
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary', mb: 2 }}>
            Some users have motion sensitivities or prefer reduced motion. Always respect the <code>prefers-reduced-motion</code> media query.
          </Typography>
          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
              {`@media (prefers-reduced-motion: reduce) {`}<br />
              {`  * {`}<br />
              {`    animation-duration: 0.01ms !important;`}<br />
              {`    transition-duration: 0.01ms !important;`}<br />
              {`  }`}<br />
              {`}`}
            </Typography>
          </Paper>
        </Box>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* Timing section */}
      <Box id="timing" sx={{ mb: 6, scrollMarginTop: 24 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Timing
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8 }}>
          Duration affects how an interface feels. Too fast feels abrupt; too slow feels sluggish. These timing guidelines help maintain consistency.
        </Typography>

        {/* Duration Scale */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Duration Scale
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Shortest */}
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 1.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Shortest</Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                  150ms
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Micro-interactions: button states, hover effects, focus rings, toggle switches
              </Typography>
            </Paper>

            {/* Shorter */}
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 1.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Shorter</Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                  200ms
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Small UI changes: tooltips, dropdown menus, chip selection, icon transitions
              </Typography>
            </Paper>

            {/* Short */}
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 1.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Short</Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                  250ms
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Medium elements: expanding panels, card transitions, tab switches
              </Typography>
            </Paper>

            {/* Standard */}
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 1.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Standard</Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                  300ms
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Default duration: modals, sidebars, most UI transitions
              </Typography>
            </Paper>

            {/* Complex */}
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 1.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Complex</Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                  375ms
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Large changes: page transitions, complex reveals, onboarding sequences
              </Typography>
            </Paper>
          </Box>
        </Box>

        {/* Screen transitions */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Screen Transitions
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 1.5, flex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Entering</Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                  225ms
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Elements entering the screen
              </Typography>
            </Paper>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 1.5, flex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Leaving</Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                  195ms
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Elements leaving the screen
              </Typography>
            </Paper>
          </Box>
        </Box>

        {/* Context Matters */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Context Affects Timing
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 2.5, color: 'text.secondary' }}>
            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
              <strong>Entering:</strong> Slightly slower to establish presence
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
              <strong>Exiting:</strong> Faster to get out of the way
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
              <strong>Responding to input:</strong> As fast as possible (&lt;100ms)
            </Typography>
            <Typography component="li" variant="body2">
              <strong>Background changes:</strong> Can be slower since they're not blocking
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* Easing section */}
      <Box id="easing" sx={{ mb: 6, scrollMarginTop: 24 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Easing Curves
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8 }}>
          Easing determines how an animation accelerates and decelerates. Natural motion doesn't move at constant speed—it ramps up and slows down.
        </Typography>

        {/* Race comparison */}
        <Box sx={{ mb: 5 }}>
          <EasingRace duration={800} />
        </Box>

        {/* Curve Reference Table */}
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Curve Reference
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Instant */}
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 1.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#7C4DFF' }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Instant</Typography>
              </Box>
              <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary', fontSize: '0.75rem' }}>
                0ms / step-end
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              No animation. Jumps immediately. Use sparingly—only when speed is critical and context is clear.
            </Typography>
          </Paper>

          {/* Ease Out */}
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 1.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#2196F3' }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Ease Out</Typography>
              </Box>
              <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary', fontSize: '0.75rem' }}>
                cubic-bezier(0.0, 0, 0.2, 1)
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Starts fast, slows to a stop. Use for entrances, modals appearing, menus opening.
            </Typography>
          </Paper>

          {/* Ease In-Out */}
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 1.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#00897B' }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Ease In-Out</Typography>
              </Box>
              <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary', fontSize: '0.75rem' }}>
                cubic-bezier(0.4, 0, 0.2, 1)
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Default for most transitions. Starts slow, speeds up, slows down. Balanced and natural.
            </Typography>
          </Paper>

          {/* Linear */}
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 1.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#9E9E9E' }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Linear</Typography>
              </Box>
              <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary', fontSize: '0.75rem' }}>
                linear
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Constant speed. Feels mechanical. Use for progress bars and loading spinners.
            </Typography>
          </Paper>

          {/* Sharp */}
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 1.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FF9800' }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Sharp</Typography>
              </Box>
              <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary', fontSize: '0.75rem' }}>
                cubic-bezier(0.4, 0, 0.6, 1)
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Quick and snappy. Use for toggle switches, micro-interactions, quick state changes.
            </Typography>
          </Paper>

          {/* Ease In */}
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 1.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#E91E63' }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Ease In</Typography>
              </Box>
              <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary', fontSize: '0.75rem' }}>
                cubic-bezier(0.4, 0, 1, 1)
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Starts slow, accelerates away. Use for exits, modals closing, elements leaving view.
            </Typography>
          </Paper>
        </Box>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* Common Patterns */}
      <Box id="patterns" sx={{ mb: 6, scrollMarginTop: 24 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Common Motion Patterns
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Fade */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Fade
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Opacity transition. Use for elements appearing/disappearing without movement. Quick: 150ms.
            </Typography>
          </Box>

          {/* Slide */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Slide
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Translate + fade. Shows directional relationship. Slide right for "forward", left for "back". Moderate: 250ms.
            </Typography>
          </Box>

          {/* Scale */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Scale
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Grow from small to full size. Suggests hierarchy or emphasis. Use sparingly. Quick: 200ms.
            </Typography>
          </Box>

          {/* Collapse/Expand */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Collapse/Expand
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Height/width transition with fade. Shows content being revealed or hidden. Moderate: 250-300ms.
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* Resources */}
      <Box id="resources" sx={{ mb: 6, scrollMarginTop: 24 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Resources
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Link
            href="https://m3.material.io/styles/motion/overview"
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
            Material Design 3 motion
            <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Link>
          <Link
            href="https://cubic-bezier.com/"
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
            Cubic bezier playground
            <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Link>
          <Link
            href="https://easings.net/"
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
            Easing functions cheat sheet
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
          justifyContent: 'flex-start',
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
          <ArrowBackIcon sx={{ fontSize: 16 }} />
          AI Presence
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

export default MotionGuidelinePage

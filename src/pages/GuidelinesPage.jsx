import { Box, Container, Typography, Card, CardActionArea } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const guidelinePages = [
  {
    title: 'Accessibility',
    description: 'Design for everyone. Guidelines for keyboard navigation, screen readers, color contrast, and cognitive load.',
    path: '/guidelines/accessibility',
  },
  {
    title: 'AI Presence',
    description: 'Build trust with AI. How to label AI-generated content, show explainability, and maintain transparency.',
    path: '/guidelines/ai-presence',
  },
  {
    title: 'Motion',
    description: 'Bring interfaces to life. Animation principles, timing standards, and easing curves for smooth interactions.',
    path: '/guidelines/motion',
  },
]

function GuidelinesPage() {
  return (
    <Container maxWidth={false} sx={{ maxWidth: 1200, mx: 'auto', px: 3, pt: 8, pb: 4 }}>
      {/* Hero */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: 600, mb: 2 }}>
          Guidelines
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, maxWidth: 720, lineHeight: 1.6 }}>
          Cross-cutting principles that apply across all components and patterns. These guidelines ensure consistency, accessibility, and quality throughout our products.
        </Typography>
      </Box>

      {/* Cards */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {guidelinePages.map((page) => (
          <Card
            key={page.path}
            variant="outlined"
            sx={{
              borderRadius: 2,
              transition: 'border-color 0.2s, box-shadow 0.2s',
              '&:hover': {
                borderColor: 'primary.main',
                boxShadow: 1,
              },
            }}
          >
            <CardActionArea
              component={RouterLink}
              to={page.path}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 3,
              }}
            >
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {page.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {page.description}
                </Typography>
              </Box>
              <ArrowForwardIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
            </CardActionArea>
          </Card>
        ))}
      </Box>

      {/* Foundation section */}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Why Guidelines Matter
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 720 }}>
          Guidelines ensure that our design decisions are consistent, inclusive, and grounded in best practices. They help teams make better decisions faster, reduce rework, and create products that work for everyone.
        </Typography>

        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Box
            component="a"
            href="https://www.w3.org/WAI/standards-guidelines/wcag/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'flex',
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
            WCAG 2.1 Guidelines
            <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Box>
          <Box
            component="a"
            href="https://carbondesignsystem.com/guidelines/accessibility/overview/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'flex',
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
            Carbon accessibility reference
            <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Box>
          <Box
            component="a"
            href="https://m3.material.io/styles/motion/overview"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'flex',
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
            Material Design motion
            <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default GuidelinesPage

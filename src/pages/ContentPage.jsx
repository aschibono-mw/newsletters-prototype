import { Box, Container, Typography, Card, CardContent, CardActionArea } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const contentPages = [
  {
    title: 'Overview',
    description: 'Content principles and how they connect to the design system.',
    path: '/content/overview',
  },
  {
    title: 'Writing Style',
    description: 'Voice, tone, and language for clear, consistent communication.',
    path: '/content/writing-style',
  },
  {
    title: 'Action Labels',
    description: 'Button labels, links, and interactive text.',
    path: '/content/action-labels',
  },
]

function ContentPage() {
  return (
    <Container maxWidth={false} sx={{ maxWidth: 1200, mx: 'auto', px: 3, pt: 8, pb: 4 }}>
      {/* Hero */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: 600, mb: 2 }}>
          Content
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, maxWidth: 720, lineHeight: 1.6 }}>
          Clear content helps people use products with ease. These guidelines are for anyone writing or reviewing interface copy.
        </Typography>
      </Box>

      {/* Cards */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {contentPages.map((page) => (
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
          Resources
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 720 }}>
          Built on assets from brand and accessibility teams.
        </Typography>

        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Box
            component={RouterLink}
            to="/content/overview"
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
            Brand Voice Guidelines
            <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Box>
          <Box
            component={RouterLink}
            to="/guidelines/accessibility"
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
            Accessibility Content Guide
            <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Box>
          <Box
            component={RouterLink}
            to="/content/writing-style"
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
            Writing Style Guide
            <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default ContentPage

import { Box, Container, Typography, Card, CardActionArea } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const developingPages = [
  {
    title: 'Get Started',
    description: 'Install packages, set up your environment, and build your first component.',
    path: '/developing/get-started',
  },
  {
    title: 'React Guide',
    description: 'Learn how to use components, apply theming, and follow best practices in React.',
    path: '/developing/react',
  },
  {
    title: 'Code Patterns',
    description: 'Common patterns, conventions, and recipes for building with the design system.',
    path: '/developing/patterns',
  },
]

function DevelopingPage() {
  return (
    <Container maxWidth={false} sx={{ maxWidth: 1200, mx: 'auto', px: 3, pt: 8, pb: 4 }}>
      {/* Hero */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: 600, mb: 2 }}>
          Developing
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, maxWidth: 720, lineHeight: 1.6 }}>
          Technical resources for developers building with the design system. From installation to advanced patterns, find everything you need to ship consistent UIs.
        </Typography>
      </Box>

      {/* Cards */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {developingPages.map((page) => (
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

      {/* Quick links */}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Quick Links
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Jump to commonly referenced resources.
        </Typography>

        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Box
            component={RouterLink}
            to="/ds-collection"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'primary.main',
              textDecoration: 'none',
              fontWeight: 500,
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Component Library
            <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Box>
          <Box
            component="a"
            href="https://mui.com/material-ui/getting-started/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'primary.main',
              textDecoration: 'none',
              fontWeight: 500,
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            MUI Documentation
            <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default DevelopingPage

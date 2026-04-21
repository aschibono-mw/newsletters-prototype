import { Box, Container, Typography, Card, CardActionArea } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const gettingStartedPages = [
  {
    title: 'Overview',
    description: 'Learn what the design system is, its core principles, and how it helps teams build consistent experiences.',
    path: '/getting-started/overview',
  },
  {
    title: 'For Designers',
    description: 'How to access design resources, use Figma libraries, and apply the system to your design work.',
    path: '/getting-started/for-designers',
  },
  {
    title: 'For Developers',
    description: 'How to install packages, set up your environment, and start building with the component library.',
    path: '/getting-started/for-developers',
  },
]

function GettingStartedPage() {
  return (
    <Container maxWidth={false} sx={{ maxWidth: 1200, mx: 'auto', px: 3, pt: 8, pb: 4 }}>
      {/* Hero */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: 600, mb: 2 }}>
          Getting Started
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, maxWidth: 720, lineHeight: 1.6 }}>
          Everything you need to start using the design system. Whether you're a designer or developer, these guides will help you get up and running quickly.
        </Typography>
      </Box>

      {/* Cards */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {gettingStartedPages.map((page) => (
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
    </Container>
  )
}

export default GettingStartedPage

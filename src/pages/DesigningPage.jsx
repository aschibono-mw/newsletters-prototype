import { Box, Container, Typography, Card, CardActionArea } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const designingPages = [
  {
    title: 'Get Started',
    description: 'Set up your design environment and learn the basics of working with the design system.',
    path: '/designing/get-started',
  },
  {
    title: 'Design Kits',
    description: 'Access Figma libraries, UI kits, and downloadable resources for your design work.',
    path: '/designing/design-kits',
  },
  {
    title: 'Design Principles',
    description: 'The foundational principles that guide our design decisions and visual language.',
    path: '/designing/principles',
  },
  {
    title: 'Layout',
    description: 'Viewport ranges, breakpoints, page types, and spacing guidelines for responsive design.',
    path: '/designing/layout',
  },
]

function DesigningPage() {
  return (
    <Container maxWidth={false} sx={{ maxWidth: 1200, mx: 'auto', px: 3, pt: 8, pb: 4 }}>
      {/* Hero */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: 600, mb: 2 }}>
          Designing
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, maxWidth: 720, lineHeight: 1.6 }}>
          Resources and guidance for designers working with the design system. From Figma setup to design principles, find everything you need to create consistent experiences.
        </Typography>
      </Box>

      {/* Cards */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {designingPages.map((page) => (
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

export default DesigningPage

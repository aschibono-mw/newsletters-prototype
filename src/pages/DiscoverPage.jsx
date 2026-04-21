import { useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  InputBase,
  IconButton,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import NewReleasesOutlinedIcon from '@mui/icons-material/NewReleasesOutlined'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined'
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined'
import IntegrationInstructionsOutlinedIcon from '@mui/icons-material/IntegrationInstructionsOutlined'
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined'
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined'
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

// eslint-disable-next-line no-unused-vars
function DiscoverPage({ chatOpen: _chatOpen = false }) {
  const [showMoreFeatures] = useState(false)

  // Features grid
  const features = [
    { id: 1, title: 'Dashboard Builder', description: 'Create custom dashboards with drag-and-drop', category: 'Analytics', icon: <CategoryOutlinedIcon sx={{ fontSize: 20 }} /> },
    { id: 2, title: 'Data Connectors', description: 'Connect to 100+ data sources seamlessly', category: 'Integrations', icon: <IntegrationInstructionsOutlinedIcon sx={{ fontSize: 20 }} /> },
    { id: 3, title: 'AI Insights', description: 'Get automated insights from your data', category: 'AI', icon: <AutoAwesomeOutlinedIcon sx={{ fontSize: 20 }} /> },
    { id: 4, title: 'Real-time Alerts', description: 'Stay notified about important changes', category: 'Analytics', icon: <LocalFireDepartmentOutlinedIcon sx={{ fontSize: 20 }} /> },
    { id: 5, title: 'Team Collaboration', description: 'Work together on projects in real-time', category: 'Popular', icon: <ExtensionOutlinedIcon sx={{ fontSize: 20 }} /> },
    { id: 6, title: 'Performance Monitor', description: 'Track system health and performance', category: 'Analytics', icon: <SpeedOutlinedIcon sx={{ fontSize: 20 }} /> },
    { id: 7, title: 'Security Center', description: 'Manage access and security settings', category: 'Popular', icon: <SecurityOutlinedIcon sx={{ fontSize: 20 }} /> },
    { id: 8, title: 'API Explorer', description: 'Test and explore available APIs', category: 'Integrations', icon: <ExploreOutlinedIcon sx={{ fontSize: 20 }} /> },
  ]

  // Trending
  const trending = [
    { id: 1, title: 'Natural Language Queries', users: '2.4K users this week' },
    { id: 2, title: 'Automated Reports', users: '1.8K users this week' },
    { id: 3, title: 'Custom Integrations', users: '1.2K users this week' },
    { id: 4, title: 'Data Visualization', users: '980 users this week' },
  ]

  // Collections
  const collections = [
    { id: 1, title: 'Getting Started', count: 8, color: 'primary.light' },
    { id: 2, title: 'Power User Tips', count: 12, color: 'secondary.light' },
    { id: 3, title: 'Best Practices', count: 6, color: 'success.light' },
  ]

  const _visibleFeatures = showMoreFeatures ? features : features.slice(0, 4)

  return (
    <Box sx={{ width: '100%' }}>
      {/* Hero Section - Left aligned with content */}
      <Box sx={{ backgroundColor: 'background.paper', pt: 3, pb: 4 }}>
        <Box
          sx={{
            maxWidth: 1536,
            mx: 'auto',
            px: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mb: 3,
            }}
          >
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                Discover What's Possible
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Explore features, integrations, and capabilities
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="secondary"
              endIcon={<ArrowDropDownIcon />}
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              Actions
            </Button>
          </Box>

        </Box>
      </Box>

      {/* Main Content - 3 equal columns */}
      <Box
        sx={{
          backgroundColor: 'grey.100',
          minHeight: 'calc(100vh - 200px)',
          px: 3,
          py: 4,
        }}
      >
        <Box
          sx={{
            maxWidth: 1536,
            mx: 'auto',
          }}
        >
          {/* 6 horizontal nav cards */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Quick Access
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' },
                gap: 2,
              }}
            >
              {[
                { title: 'Integrations', icon: <ExtensionOutlinedIcon sx={{ fontSize: 20 }} />, bgColor: 'primary.light', iconColor: 'primary.dark' },
                { title: 'Analytics', icon: <CategoryOutlinedIcon sx={{ fontSize: 20 }} />, bgColor: 'secondary.light', iconColor: 'secondary.dark' },
                { title: 'AI Features', icon: <AutoAwesomeOutlinedIcon sx={{ fontSize: 20 }} />, bgColor: 'success.light', iconColor: 'success.dark' },
                { title: 'Workflows', icon: <RocketLaunchOutlinedIcon sx={{ fontSize: 20 }} />, bgColor: 'warning.light', iconColor: 'warning.dark' },
                { title: 'Security', icon: <SecurityOutlinedIcon sx={{ fontSize: 20 }} />, bgColor: 'error.light', iconColor: 'error.dark' },
                { title: 'Performance', icon: <SpeedOutlinedIcon sx={{ fontSize: 20 }} />, bgColor: 'info.light', iconColor: 'info.dark' },
              ].map((card, i) => (
                <Card
                  key={i}
                  sx={{
                    backgroundColor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow: 'none',
                    cursor: 'pointer',
                    '&:hover': { borderColor: 'primary.main' },
                  }}
                >
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 }, textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        backgroundColor: card.bgColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: card.iconColor,
                        mx: 'auto',
                        mb: 1,
                      }}
                    >
                      {card.icon}
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {card.title}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>

          {/* 2 content cards */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Explore
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                gap: 3,
              }}
            >
              {/* Card 1 - Trending & Collections */}
              <Card
                sx={{
                  backgroundColor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  boxShadow: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardContent sx={{ p: 2.5, pb: 0, '&:last-child': { pb: 0 }, flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <LocalFireDepartmentOutlinedIcon sx={{ fontSize: 18, color: 'warning.main' }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Trending Now
                    </Typography>
                  </Box>
                  {trending.map((item) => (
                    <Box
                      key={item.id}
                      sx={{
                        py: 1.5,
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        cursor: 'pointer',
                        '&:hover': { backgroundColor: 'action.hover' },
                        mx: -2.5,
                        px: 2.5,
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {item.users}
                      </Typography>
                    </Box>
                  ))}

                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
                    Collections
                  </Typography>
                  {collections.map((collection, index) => (
                    <Box
                      key={collection.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        py: 1.5,
                        borderBottom: index < collections.length - 1 ? '1px solid' : 'none',
                        borderColor: 'divider',
                        cursor: 'pointer',
                        '&:hover': { backgroundColor: 'action.hover' },
                        mx: -2.5,
                        px: 2.5,
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 1,
                          backgroundColor: collection.color,
                        }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {collection.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {collection.count} items
                        </Typography>
                      </Box>
                      <ArrowForwardIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    </Box>
                  ))}
                </CardContent>
                <Box sx={{ p: 2, pt: 1, textAlign: 'center', borderTop: '1px solid', borderColor: 'divider', mt: 'auto' }}>
                  <Button sx={{ color: 'primary.main', textTransform: 'none', fontWeight: 600 }}>
                    View All
                  </Button>
                </Box>
              </Card>

              {/* Card 2 - New This Week */}
              <Card
                sx={{
                  backgroundColor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  boxShadow: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardContent sx={{ p: 2.5, pb: 0, '&:last-child': { pb: 0 }, flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <NewReleasesOutlinedIcon sx={{ fontSize: 18, color: 'success.main' }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      New This Week
                    </Typography>
                  </Box>
                  <Box sx={{ backgroundColor: 'grey.100', borderRadius: 1, height: 140, mb: 2 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Advanced Filtering
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                    Filter and segment your data with powerful new options
                  </Typography>
                  <Box sx={{ backgroundColor: 'grey.100', borderRadius: 1, height: 140, mb: 2 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Smart Suggestions
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    AI-powered recommendations based on your usage
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, pt: 1, textAlign: 'center', borderTop: '1px solid', borderColor: 'divider', mt: 'auto' }}>
                  <Button sx={{ color: 'primary.main', textTransform: 'none', fontWeight: 600 }}>
                    View All
                  </Button>
                </Box>
              </Card>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default DiscoverPage

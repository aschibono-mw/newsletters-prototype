import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  IconButton,
} from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined'
import PieChartOutlinedIcon from '@mui/icons-material/PieChartOutlined'
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined'
import SentimentNeutralOutlinedIcon from '@mui/icons-material/SentimentNeutralOutlined'
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import CloseIcon from '@mui/icons-material/Close'

// eslint-disable-next-line no-unused-vars
function InsightsPage({ chatOpen: _chatOpen = false }) {
  // Block data for first card - performance metrics
  const performanceBlocks = [
    { title: 'Block Title', time: 'Sent 2d ago', metrics: [{ value: '100%', label: 'Action', highlight: false }, { value: '100%', label: 'Action', highlight: false }, { value: '100%', label: 'Action', highlight: false }] },
    { title: 'Block Title', time: 'Sent 2d ago', metrics: [{ value: '100%', label: 'Action', highlight: false }, { value: '100%', label: 'Action', highlight: false }, { value: '100%', label: 'Action', highlight: true }] },
    { title: 'Block Title', time: 'Sent 2d ago', metrics: [{ value: '100%', label: 'Action', highlight: false }, { value: '100%', label: 'Action', highlight: false }, { value: '100%', label: 'Action', highlight: false }] },
    { title: 'Block Title', time: 'Sent 2d ago', metrics: [{ value: '100%', label: 'Action', highlight: false }, { value: '100%', label: 'Action', highlight: false }, { value: '100%', label: 'Action', highlight: true }] },
    { title: 'Block Title', time: 'Sent 2d ago', metrics: [{ value: '100%', label: 'Action', highlight: false }, { value: '100%', label: 'Action', highlight: false }, { value: '100%', label: 'Action', highlight: false }] },
  ]

  // Contact items for second card
  const contactItems = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ]

  // Sentiment items for third card
  const sentimentItems = [
    { sentiment: 'positive' },
    { sentiment: 'positive' },
    { sentiment: 'neutral' },
    { sentiment: 'neutral' },
    { sentiment: 'neutral' },
    { sentiment: 'negative' },
  ]

  const getSentimentIcon = (sentiment) => {
    if (sentiment === 'positive') return <SentimentSatisfiedOutlinedIcon sx={{ fontSize: 20, color: 'success.main' }} />
    if (sentiment === 'negative') return <SentimentDissatisfiedOutlinedIcon sx={{ fontSize: 20, color: 'error.main' }} />
    return <SentimentNeutralOutlinedIcon sx={{ fontSize: 20, color: 'warning.main' }} />
  }

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
                Title Goes Here Like This and This
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Subtitle goes here like this
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

          {/* Nav cards row */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: 2,
            }}
          >
            {[
              { title: 'Card Title', subtitle: 'Description goes here', icon: <BarChartOutlinedIcon sx={{ fontSize: 20 }} />, bgColor: 'primary.light', iconColor: 'primary.dark' },
              { title: 'Card Title', subtitle: 'Description goes here', icon: <ShowChartOutlinedIcon sx={{ fontSize: 20 }} />, bgColor: 'secondary.light', iconColor: 'secondary.dark' },
              { title: 'Card Title', subtitle: 'Description goes here', icon: <PieChartOutlinedIcon sx={{ fontSize: 20 }} />, bgColor: 'success.light', iconColor: 'success.dark' },
              { title: 'Card Title', subtitle: 'Description goes here', icon: <TrendingUpOutlinedIcon sx={{ fontSize: 20 }} />, bgColor: 'warning.light', iconColor: 'warning.dark' },
            ].map((card, i) => (
              <Card
                key={i}
                sx={{
                  backgroundColor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  boxShadow: 'none',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: 'primary.main',
                  },
                }}
              >
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 }, display: 'flex', alignItems: 'center', gap: 1.5 }}>
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
                      flexShrink: 0,
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {card.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {card.subtitle}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Main Content - 3 equal columns */}
      <Box
        sx={{
          backgroundColor: 'grey.100',
          minHeight: 'calc(100vh - 280px)',
          px: 3,
          py: 4,
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 3,
            maxWidth: 1536,
            mx: 'auto',
          }}
        >
          {/* Card 1 - Performance Metrics */}
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
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                Card Title
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'primary.main', cursor: 'pointer', mb: 2, fontSize: 13 }}
              >
                What do the colors mean?
              </Typography>

              {performanceBlocks.slice(0, 4).map((block, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.25 }}>
                    {block.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
                    {block.time}
                  </Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 }}>
                    {block.metrics.map((metric, mIndex) => (
                      <Box
                        key={mIndex}
                        sx={{
                          backgroundColor: metric.highlight ? 'secondary.light' : 'success.light',
                          borderRadius: 0.5,
                          p: 1,
                          textAlign: 'center',
                          border: '1px solid',
                          borderColor: metric.highlight ? 'secondary.main' : 'success.main',
                        }}
                      >
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                          {metric.value}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {metric.label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </CardContent>
            <Box sx={{ p: 2, pt: 1, textAlign: 'center', borderTop: '1px solid', borderColor: 'divider', mt: 'auto' }}>
              <Button sx={{ color: 'primary.main', textTransform: 'none', fontWeight: 600 }}>
                View All
              </Button>
            </Box>
          </Card>

          {/* Card 2 - Contact List */}
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
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                Card Title
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'primary.main', cursor: 'pointer', mb: 2, fontSize: 13 }}
              >
                Important tooltip surfaced here?
              </Typography>

              {contactItems.map((item, index) => (
                <Box
                  key={item.id}
                  sx={{
                    py: 1.5,
                    borderBottom: index < contactItems.length - 1 ? '1px solid' : 'none',
                    borderColor: 'divider',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: 'grey.200',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <PersonOutlineIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ height: 10, width: 100, backgroundColor: 'grey.300', borderRadius: 0.5 }} />
                        <LinkedInIcon sx={{ fontSize: 16, color: '#0077B5' }} />
                        <CloseIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                      </Box>
                    </Box>
                    <IconButton size="small">
                      <TuneOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                    </IconButton>
                  </Box>
                  {/* Placeholder text lines */}
                  <Box sx={{ pl: 6 }}>
                    <Box sx={{ height: 8, width: '90%', backgroundColor: 'grey.200', borderRadius: 0.5, mb: 0.75 }} />
                    <Box sx={{ height: 8, width: '75%', backgroundColor: 'grey.200', borderRadius: 0.5, mb: 0.75 }} />
                    <Box sx={{ height: 8, width: '60%', backgroundColor: 'grey.200', borderRadius: 0.5 }} />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, mt: 1.5, pl: 6 }}>
                    <IconButton size="small">
                      <ThumbUpOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    </IconButton>
                    <IconButton size="small">
                      <ThumbDownOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </CardContent>
            <Box sx={{ p: 2, pt: 1, textAlign: 'center', borderTop: '1px solid', borderColor: 'divider', mt: 'auto' }}>
              <Button sx={{ color: 'primary.main', textTransform: 'none', fontWeight: 600 }}>
                View All
              </Button>
            </Box>
          </Card>

          {/* Card 3 - Donut Chart + Sentiment List */}
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
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                Card Title
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'primary.main', cursor: 'pointer', mb: 3, fontSize: 13 }}
              >
                Important tooltip surfaced here?
              </Typography>

              {/* Donut Chart Placeholder */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Box sx={{ position: 'relative', width: 140, height: 140 }}>
                  {/* Outer ring segments */}
                  <svg width="140" height="140" viewBox="0 0 140 140">
                    <circle cx="70" cy="70" r="55" fill="none" stroke="#e0e0e0" strokeWidth="20" />
                    <circle
                      cx="70"
                      cy="70"
                      r="55"
                      fill="none"
                      stroke="#4caf50"
                      strokeWidth="20"
                      strokeDasharray="200 345"
                      strokeDashoffset="0"
                      transform="rotate(-90 70 70)"
                    />
                    <circle
                      cx="70"
                      cy="70"
                      r="55"
                      fill="none"
                      stroke="#ff9800"
                      strokeWidth="20"
                      strokeDasharray="80 345"
                      strokeDashoffset="-200"
                      transform="rotate(-90 70 70)"
                    />
                    <circle
                      cx="70"
                      cy="70"
                      r="55"
                      fill="none"
                      stroke="#f44336"
                      strokeWidth="20"
                      strokeDasharray="65 345"
                      strokeDashoffset="-280"
                      transform="rotate(-90 70 70)"
                    />
                  </svg>
                  {/* Center text */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1 }}>
                      999k
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Total Items
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Legend */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 3 }}>
                {[
                  { color: '#4caf50', label: 'Key', value: '%k' },
                  { color: '#ff9800', label: 'Key', value: '%k' },
                  { color: '#f44336', label: 'Key', value: '%k' },
                ].map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        border: index === 0 ? '2px solid' : 'none',
                        borderColor: item.color,
                        backgroundColor: index === 0 ? 'transparent' : item.color,
                      }}
                    />
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="caption" sx={{ display: 'block', fontWeight: 500 }}>
                        {item.label}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {item.value}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Sentiment List */}
              {sentimentItems.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    py: 1,
                    borderBottom: index < sentimentItems.length - 1 ? '1px solid' : 'none',
                    borderColor: 'divider',
                  }}
                >
                  {getSentimentIcon(item.sentiment)}
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ height: 8, width: '80%', backgroundColor: 'grey.200', borderRadius: 0.5, mb: 0.5 }} />
                    <Box sx={{ height: 8, width: '60%', backgroundColor: 'grey.200', borderRadius: 0.5 }} />
                  </Box>
                  <IconButton size="small">
                    <FileDownloadOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  </IconButton>
                </Box>
              ))}
            </CardContent>
            <Box sx={{ p: 2, pt: 1, textAlign: 'center', borderTop: '1px solid', borderColor: 'divider', mt: 'auto' }}>
              <Button sx={{ color: 'primary.main', textTransform: 'none', fontWeight: 600 }}>
                All Media Lists
              </Button>
            </Box>
          </Card>
        </Box>
      </Box>
    </Box>
  )
}

export default InsightsPage

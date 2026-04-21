import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  Chip,
  IconButton,
  Checkbox,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Fab,
  Divider,
  Tooltip,
} from '@mui/material'
import DummySidebar from '../components/layout/DummySidebar'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import FilterListIcon from '@mui/icons-material/FilterList'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import SearchIcon from '@mui/icons-material/Search'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import BarChartIcon from '@mui/icons-material/BarChart'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import ViewWeekOutlinedIcon from '@mui/icons-material/ViewWeekOutlined'
import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

function LayoutDemoPageV2({ chatOpen = false }) {
  const navigate = useNavigate()
  const [selectedTab, setSelectedTab] = useState(0)
  const [category, setCategory] = useState('category1')
  const [dateRange, setDateRange] = useState('range1')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [drilldownOpen, setDrilldownOpen] = useState(false)
  const [drilldownTitle, setDrilldownTitle] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [hoveredCardId, setHoveredCardId] = useState(null)
  const [savedFilterSet, setSavedFilterSet] = useState('')
  const [sourceType, setSourceType] = useState('news')
  const [location, setLocation] = useState('')
  const [language, setLanguage] = useState('')
  const [customCategory, setCustomCategory] = useState('')
  const [showFab, setShowFab] = useState(false)
  const contentFeedRef = useRef(null)

  const handleOpenSidebar = () => {
    setSidebarOpen(true)
    setDrilldownOpen(false)
  }

  const handleCloseSidebar = () => {
    setSidebarOpen(false)
    setDrilldownOpen(false)
  }

  const handleDrillIn = (title) => {
    setDrilldownTitle(title)
    setDrilldownOpen(true)
  }

  const handleDrillBack = () => {
    setDrilldownOpen(false)
  }

  const handleScrollToTop = () => {
    if (contentFeedRef.current) {
      contentFeedRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Scroll listener for FAB visibility
  useEffect(() => {
    const feedElement = contentFeedRef.current
    if (!feedElement) return

    const handleScroll = () => {
      // Show FAB after scrolling 400px
      if (feedElement.scrollTop > 400) {
        setShowFab(true)
      } else {
        setShowFab(false)
      }
    }

    feedElement.addEventListener('scroll', handleScroll)
    return () => feedElement.removeEventListener('scroll', handleScroll)
  }, [])

  // Mock content items - Extended to 35 items for scrolling
  const authors = ['John Smith', 'Jane Doe', 'Mike Johnson', 'Sarah Williams', 'Robert Brown', 'Emily Davis', 'Alex Chen', 'Maria Garcia', 'David Lee', 'Lisa Wang']
  const types = ['News article', 'Blog post', 'Social media', 'Press release', 'Podcast']
  const locations = ['US', 'UK', 'CA', 'AU', 'CN', 'DE', 'FR', 'JP', 'IN']
  const dates = ['Jan 26', 'Jan 25', 'Jan 24', 'Jan 23', 'Jan 22']
  const reaches = ['115M', '89M', '156M', '72M', '203M', '45M', '178M', '92M', '134M', '67M']

  const contentItems = Array.from({ length: 35 }, (_, i) => ({
    id: i + 1,
    author: authors[i % authors.length],
    type: types[i % types.length],
    location: locations[i % locations.length],
    date: dates[Math.floor(i / 7) % dates.length],
    time: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
    reach: reaches[i % reaches.length],
    sentiment: 'Positive',
  }))

  return (
    <Box sx={{ height: 'calc(100vh)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Top Section - White Background */}
      <Box sx={{ backgroundColor: 'white', px: 2, pt: 0 }}>
      {/* Top Filter Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          pb: 0,
          mb: 3,
          minHeight: 48,
          py: 1.5,
        }}
      >
        <Tooltip title="Back to Home">
          <IconButton size="small" onClick={() => navigate('/')} sx={{ color: 'text.secondary', p: 0.5 }}>
            <ArrowBackIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem sx={{ mx: 0 }} />

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            displayEmpty
            variant="standard"
            disableUnderline
            startAdornment={<SearchIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />}
            sx={{
              fontWeight: 700,
              '& .MuiSelect-select': {
                paddingBottom: 0,
                paddingTop: 0,
              },
              '& .MuiSelect-icon': {
                color: 'text.secondary',
                fontSize: '18px',
              },
            }}
          >
            <MenuItem value="category1">Keyword search</MenuItem>
            <MenuItem value="category2">Topic search</MenuItem>
          </Select>
        </FormControl>

        <Divider orientation="vertical" flexItem sx={{ mx: 0 }} />

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <Select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            displayEmpty
            variant="standard"
            disableUnderline
            startAdornment={<CalendarTodayIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />}
            sx={{
              fontWeight: 700,
              '& .MuiSelect-select': {
                paddingBottom: 0,
                paddingTop: 0,
              },
              '& .MuiSelect-icon': {
                color: 'text.secondary',
                fontSize: '18px',
              },
            }}
          >
            <MenuItem value="range1">Last 7 days</MenuItem>
            <MenuItem value="range2">Last 30 days</MenuItem>
            <MenuItem value="range3">Last 90 days</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 80 }}>
          <Select
            defaultValue="medium"
            variant="standard"
            disableUnderline
            startAdornment={
              <Box
                component="span"
                sx={{
                  fontSize: 16,
                  fontWeight: 400,
                  color: 'text.primary',
                  mr: 0.5,
                  letterSpacing: '-0.02em',
                }}
              >
                Aa
              </Box>
            }
            sx={{
              fontWeight: 700,
              '& .MuiSelect-select': {
                paddingBottom: 0,
                paddingTop: 0,
                paddingLeft: 0,
              },
              '& .MuiSelect-icon': {
                color: 'text.secondary',
                fontSize: '18px',
              },
            }}
          >
            <MenuItem value="small">Small</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="large">Large</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <Select
            defaultValue="brand"
            variant="standard"
            disableUnderline
            startAdornment={<BarChartIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />}
            sx={{
              fontWeight: 700,
              '& .MuiSelect-select': {
                paddingBottom: 0,
                paddingTop: 0,
              },
              '& .MuiSelect-icon': {
                color: 'text.secondary',
                fontSize: '18px',
              },
            }}
          >
            <MenuItem value="brand">Brand analysis</MenuItem>
            <MenuItem value="sentiment">Sentiment analysis</MenuItem>
            <MenuItem value="reach">Reach analysis</MenuItem>
          </Select>
        </FormControl>

        {/* Action Buttons - Right Side */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 'auto' }}>
          <IconButton size="small" sx={{ color: 'text.secondary', p: 0.5 }}>
            <NotificationsOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={{ color: 'text.secondary', p: 0.5 }}>
            <EmailOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={{ color: 'text.secondary', p: 0.5 }}>
            <ViewWeekOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={{ color: 'text.secondary', p: 0.5 }}>
            <ViewAgendaOutlinedIcon fontSize="small" />
          </IconButton>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              px: 2,
              py: 0.5,
            }}
          >
            Button
          </Button>
        </Box>
      </Box>

      {/* Filter Fields - Three Columns */}
      <Box sx={{ display: 'flex', gap: 4, mb: 3 }}>
        <TextField
          label="All of these"
          placeholder="Add keywords..."
          variant="outlined"
          size="small"
          fullWidth
          sx={{ flex: 1 }}
        />
        <TextField
          label="At least one"
          placeholder="Add keywords..."
          variant="outlined"
          size="small"
          fullWidth
          sx={{ flex: 1 }}
        />
        <TextField
          label="None of these"
          placeholder="Add keywords..."
          variant="outlined"
          size="small"
          fullWidth
          sx={{ flex: 1 }}
        />
      </Box>

      {/* Filter Chips Bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, flexWrap: 'wrap' }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<FilterListIcon />}
          sx={{
            color: 'primary.main',
            borderColor: 'divider',
            textTransform: 'none',
            fontWeight: 500,
          }}
        >
          All Filters
        </Button>
        {/* Saved Filter Sets Dropdown */}
        <FormControl size="small">
          <Select
            value={savedFilterSet}
            onChange={(e) => setSavedFilterSet(e.target.value)}
            displayEmpty
            startAdornment={<BookmarkBorderIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />}
            sx={{
              minWidth: 160,
              fontSize: 14,
              borderRadius: 1,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'divider',
              },
              '& .MuiSelect-icon': {
                color: 'text.secondary',
                fontSize: '18px',
              },
            }}
          >
            <MenuItem value="">Saved Filter Sets</MenuItem>
            <MenuItem value="q1-2024">Q1 2024 Report</MenuItem>
            <MenuItem value="competitors">Competitor Analysis</MenuItem>
            <MenuItem value="brand-health">Brand Health</MenuItem>
          </Select>
        </FormControl>

        {/* Source Type Dropdown */}
        <FormControl size="small">
          <Select
            value={sourceType}
            onChange={(e) => setSourceType(e.target.value)}
            displayEmpty
            sx={{
              minWidth: 150,
              fontSize: 14,
              borderRadius: 1,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'divider',
              },
              '& .MuiSelect-icon': {
                color: 'text.secondary',
                fontSize: '18px',
              },
            }}
          >
            <MenuItem value="news">Source Type: News</MenuItem>
            <MenuItem value="blog">Source Type: Blog</MenuItem>
            <MenuItem value="social">Source Type: Social</MenuItem>
          </Select>
        </FormControl>

        {/* Location Dropdown */}
        <FormControl size="small">
          <Select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            displayEmpty
            sx={{
              minWidth: 110,
              fontSize: 14,
              borderRadius: 1,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'divider',
              },
              '& .MuiSelect-icon': {
                color: 'text.secondary',
                fontSize: '18px',
              },
            }}
          >
            <MenuItem value="">Location</MenuItem>
            <MenuItem value="us">United States</MenuItem>
            <MenuItem value="uk">United Kingdom</MenuItem>
            <MenuItem value="global">Global</MenuItem>
          </Select>
        </FormControl>

        {/* Language Dropdown */}
        <FormControl size="small">
          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            displayEmpty
            sx={{
              minWidth: 110,
              fontSize: 14,
              borderRadius: 1,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'divider',
              },
              '& .MuiSelect-icon': {
                color: 'text.secondary',
                fontSize: '18px',
              },
            }}
          >
            <MenuItem value="">Language</MenuItem>
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="es">Spanish</MenuItem>
            <MenuItem value="fr">French</MenuItem>
          </Select>
        </FormControl>

        {/* Custom Categories Dropdown */}
        <FormControl size="small">
          <Select
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            displayEmpty
            sx={{
              minWidth: 160,
              fontSize: 14,
              borderRadius: 1,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'divider',
              },
              '& .MuiSelect-icon': {
                color: 'text.secondary',
                fontSize: '18px',
              },
            }}
          >
            <MenuItem value="">Custom Categories</MenuItem>
            <MenuItem value="tech">Technology</MenuItem>
            <MenuItem value="business">Business</MenuItem>
            <MenuItem value="health">Health</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            px: 2,
            ml: 'auto',
          }}
        >
          Button
        </Button>
      </Box>

      {/* Tabs with Right-Aligned Dropdown */}
      <Box sx={{
        borderTop: 1,
        borderBottom: 1,
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'grey.50',
        px: 2,
        mx: -3,
      }}>
        <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)}>
          <Tab label="Content" sx={{ textTransform: 'none' }} />
          <Tab label="Topics" sx={{ textTransform: 'none' }} />
          <Tab label="Sentiment" sx={{ textTransform: 'none' }} />
          <Tab label="Geography" sx={{ textTransform: 'none' }} />
          <Tab label="Outlets" sx={{ textTransform: 'none' }} />
          <Tab label="Influencers" sx={{ textTransform: 'none' }} />
        </Tabs>

        {/* Right-aligned View Selector */}
        <FormControl size="small">
          <Select
            defaultValue="analytics"
            displayEmpty
            variant="standard"
            disableUnderline
            startAdornment={<ViewAgendaOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 0.5 }} />}
            sx={{
              fontSize: 14,
              fontWeight: 500,
              '& .MuiSelect-icon': {
                color: 'text.secondary',
                fontSize: '18px',
                ml: 0.5,
              },
            }}
          >
            <MenuItem value="analytics">Classic analytics</MenuItem>
            <MenuItem value="brand">Brand analytics</MenuItem>
            <MenuItem value="custom">Custom view</MenuItem>
          </Select>
        </FormControl>
      </Box>
      </Box>

      {/* Bottom Section - Grey Background */}
      <Box sx={{ backgroundColor: 'grey.50', flex: 1, px: 3, pt: 3, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      {/* Tab Content - Only show Content tab, others are empty */}
      {selectedTab !== 0 ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '40vh',
          }}
        >
          <Typography variant="h6" color="text.secondary">
            Empty state for testing
          </Typography>
        </Box>
      ) : (
        <>
          {/* Main Content Area - 2 Column Layout */}
          <Box sx={{ display: 'flex', gap: 2, flex: 1, minHeight: 0 }}>
        {/* Left Content Feed */}
        <Box
          ref={contentFeedRef}
          sx={{
            flex: 1,
            display: { xs: 'block', lg: 'block' },
            overflow: 'auto',
            position: 'relative',
            backgroundColor: 'white',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            p: 2,
            minWidth: 0,
          }}
        >
          {/* Content Stream Header Toolbar - Sticky */}
          <Box sx={{
            position: 'sticky',
            top: -16,
            zIndex: 10,
            backgroundColor: 'white',
            mb: 2,
            pb: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
            pt: 1,
            mx: -2,
            px: 2,
          }}>
            {/* Top Row - Select All, Count, & Action Icons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
              <Checkbox size="small" />
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                186k Mentions
              </Typography>

              {/* Action Icons Group - Right Aligned */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 'auto' }}>
                {/* Download */}
                <IconButton size="small" sx={{ color: 'text.secondary' }}>
                  <FileDownloadOutlinedIcon fontSize="small" />
                </IconButton>

                {/* Card View */}
                <IconButton size="small" sx={{ color: 'text.secondary' }}>
                  <ViewAgendaOutlinedIcon fontSize="small" />
                </IconButton>

                {/* Copy */}
                <IconButton size="small" sx={{ color: 'text.secondary' }}>
                  <ContentCopyOutlinedIcon fontSize="small" />
                </IconButton>

                {/* Hide/Visibility */}
                <IconButton size="small" sx={{ color: 'text.secondary' }}>
                  <VisibilityOffOutlinedIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {/* Bottom Row - Sort Controls (Left Aligned) */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Sort Label */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FilterListIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
                  Sorted by:
                </Typography>
              </Box>

              {/* Sort Dropdown */}
              <FormControl size="small" sx={{ minWidth: 100 }}>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  displayEmpty
                  sx={{
                    fontWeight: 600,
                    fontSize: 14,
                    '& .MuiSelect-icon': {
                      color: 'text.secondary',
                      fontSize: '18px',
                    },
                  }}
                >
                  <MenuItem value="date">Date</MenuItem>
                  <MenuItem value="reach">Reach</MenuItem>
                  <MenuItem value="sentiment">Sentiment</MenuItem>
                </Select>
              </FormControl>

              {/* Sort Direction Toggle */}
              <IconButton size="small" sx={{ color: 'text.secondary' }}>
                <SwapVertIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Back to Top FAB - Attached to bottom of toolbar */}
            {showFab && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2.5 }}>
                <Button
                  onClick={handleScrollToTop}
                  startIcon={<KeyboardArrowUpIcon />}
                  sx={{
                    backgroundColor: 'white',
                    color: 'text.primary',
                    boxShadow: 3,
                    textTransform: 'none',
                    px: 3,
                    py: 1,
                    borderRadius: '20px',
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: 'grey.50',
                      boxShadow: 4,
                    },
                  }}
                >
                  Back To Top
                </Button>
              </Box>
            )}
          </Box>

          {/* Content Cards */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {contentItems.map((item) => (
              <Box
                key={item.id}
                onMouseEnter={() => setHoveredCardId(item.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                sx={{
                  display: 'flex',
                  gap: 2,
                  p: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  backgroundColor: 'background.paper',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                {/* Avatar with Checkbox Hover Interaction */}
                <Box sx={{ position: 'relative', flexShrink: 0 }}>
                  {hoveredCardId === item.id ? (
                    // Show checkbox on hover
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        backgroundColor: 'background.paper',
                        border: '2px solid',
                        borderColor: 'divider',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <Checkbox size="small" sx={{ p: 0 }} />
                    </Box>
                  ) : (
                    // Show avatar when not hovered
                    <>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          backgroundColor: 'text.primary',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 600,
                          fontSize: 18,
                        }}
                      >
                        M
                      </Box>
                      <CheckCircleIcon
                        sx={{
                          position: 'absolute',
                          bottom: -2,
                          right: -2,
                          fontSize: 18,
                          color: 'primary.main',
                          backgroundColor: 'white',
                          borderRadius: '50%',
                        }}
                      />
                    </>
                  )}
                </Box>

                {/* Content */}
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Content
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      •{' '}
                      <Box
                        component="span"
                        onClick={handleOpenSidebar}
                        sx={{
                          cursor: 'pointer',
                          '&:hover': {
                            textDecoration: 'underline',
                            color: 'primary.main',
                          },
                        }}
                      >
                        {item.author}
                      </Box>
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="primary" sx={{ display: 'block', mb: 1.5 }}>
                    {item.type} | {item.location} | {item.date} • {item.time}
                  </Typography>

                  {/* Skeleton Text Lines */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, mb: 2 }}>
                    <Box sx={{ height: 8, width: '95%', backgroundColor: 'action.hover', borderRadius: 1 }} />
                    <Box sx={{ height: 8, width: '88%', backgroundColor: 'action.hover', borderRadius: 1 }} />
                    <Box sx={{ height: 8, width: '60%', backgroundColor: 'action.hover', borderRadius: 1 }} />
                  </Box>

                  {/* Reach and Sentiment */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {item.reach} Reach
                    </Typography>
                    <Chip
                      label={item.sentiment}
                      size="small"
                      icon={<Box component="span" sx={{ fontSize: 12, ml: 1 }}>○</Box>}
                      sx={{
                        borderRadius: 2,
                        backgroundColor: 'transparent',
                        border: '1px solid',
                        borderColor: 'success.main',
                        color: 'success.main',
                        fontWeight: 500,
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Right Insights Panel */}
        <Box
          sx={{
            flex: 2,
            display: { xs: 'none', lg: 'block' },
            overflow: 'auto',
            pr: 2,
            pb: 3,
            minHeight: 0,
          }}
        >
          {/* AI-Powered Insight Card */}
          <Box
            sx={{
              p: 2,
              mb: 2,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              backgroundColor: 'background.paper',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <AutoAwesomeOutlinedIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                AI-Powered Insight
              </Typography>
            </Box>

            {/* Skeleton Text */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, mb: 1.5 }}>
              <Box sx={{ height: 10, width: '100%', backgroundColor: 'action.hover', borderRadius: 1 }} />
              <Box sx={{ height: 10, width: '75%', backgroundColor: 'action.hover', borderRadius: 1 }} />
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small" sx={{ color: 'text.secondary' }}>
                <ThumbUpOutlinedIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ color: 'text.secondary' }}>
                <ThumbDownOutlinedIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ color: 'text.secondary' }}>
                <BookmarkBorderIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* Mentions Trend Card */}
          <Box
            sx={{
              p: 2,
              mb: 2,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              backgroundColor: 'background.paper',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Mentions Trend
                </Typography>
                <InfoOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              </Box>
              <IconButton size="small" sx={{ color: 'text.secondary' }}>
                <FileDownloadOutlinedIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Metrics Row */}
            <Box sx={{ display: 'flex', gap: 4, mb: 3 }}>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                  Total Mentions
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 0.25 }}>
                  69
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.25 }}>
                  <TrendingDownIcon sx={{ fontSize: 14, color: 'error.main' }} />
                  <Typography variant="caption" sx={{ color: 'error.main', fontWeight: 500 }}>
                    23%
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Previous period 90
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                  Daily Average
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 0.25 }}>
                  9
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.25 }}>
                  <TrendingDownIcon sx={{ fontSize: 14, color: 'error.main' }} />
                  <Typography variant="caption" sx={{ color: 'error.main', fontWeight: 500 }}>
                    23%
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Previous period 12
                </Typography>
              </Box>
            </Box>

            {/* Area Chart */}
            <Box sx={{ mt: 3 }}>
              <Box sx={{ height: 120, position: 'relative' }}>
                <svg width="100%" height="120" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Define gradient for area fill */}
                  <defs>
                    <linearGradient id="mentionsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#2196F3" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#2196F3" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>

                  {/* Area fill */}
                  <path
                    d="M 0,65 L 14,50 L 28,30 L 42,40 L 56,70 L 70,68 L 84,67 L 100,75 L 100,100 L 0,100 Z"
                    fill="url(#mentionsGradient)"
                  />

                  {/* Line stroke */}
                  <path
                    d="M 0,65 L 14,50 L 28,30 L 42,40 L 56,70 L 70,68 L 84,67 L 100,75"
                    fill="none"
                    stroke="#2196F3"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Box>

              {/* X-axis labels */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="caption" color="text.secondary">Nov 12</Typography>
                <Typography variant="caption" color="text.secondary">Nov 13</Typography>
                <Typography variant="caption" color="text.secondary">Nov 14</Typography>
                <Typography variant="caption" color="text.secondary">Nov 15</Typography>
                <Typography variant="caption" color="text.secondary">Nov 16</Typography>
                <Typography variant="caption" color="text.secondary">Nov 17</Typography>
                <Typography variant="caption" color="text.secondary">Nov 18</Typography>
              </Box>
            </Box>
          </Box>

          {/* Reach Trend Card */}
          <Box
            sx={{
              p: 2,
              mb: 2,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              backgroundColor: 'background.paper',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Reach Trend
              </Typography>
              <InfoOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Box sx={{ ml: 'auto' }}>
                <IconButton size="small" sx={{ color: 'text.secondary' }}>
                  <FileDownloadOutlinedIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {/* Metrics */}
            <Box sx={{ display: 'flex', gap: 4, mb: 3 }}>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                  Total Reach
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 0.25 }}>
                  1.86B
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.25 }}>
                  <TrendingDownIcon sx={{ fontSize: 14, color: 'error.main' }} />
                  <Typography variant="caption" sx={{ color: 'error.main', fontWeight: 500 }}>
                    -3%
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Previous period 1.91B
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                  Daily Average
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 0.25 }}>
                  266M
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.25 }}>
                  <TrendingDownIcon sx={{ fontSize: 14, color: 'error.main' }} />
                  <Typography variant="caption" sx={{ color: 'error.main', fontWeight: 500 }}>
                    -3%
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Previous period 273M
                </Typography>
              </Box>
            </Box>

            {/* Area Chart */}
            <Box sx={{ mt: 3 }}>
              <Box sx={{ height: 120, position: 'relative' }}>
                <svg width="100%" height="120" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Define gradient for area fill */}
                  <defs>
                    <linearGradient id="reachGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#9C27B0" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#9C27B0" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>

                  {/* Area fill */}
                  <path
                    d="M 0,55 L 14,45 L 28,50 L 42,35 L 56,40 L 70,30 L 84,45 L 100,60 L 100,100 L 0,100 Z"
                    fill="url(#reachGradient)"
                  />

                  {/* Line stroke */}
                  <path
                    d="M 0,55 L 14,45 L 28,50 L 42,35 L 56,40 L 70,30 L 84,45 L 100,60"
                    fill="none"
                    stroke="#9C27B0"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Box>

              {/* X-axis labels */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="caption" color="text.secondary">Dec 12</Typography>
                <Typography variant="caption" color="text.secondary">Dec 13</Typography>
                <Typography variant="caption" color="text.secondary">Dec 14</Typography>
                <Typography variant="caption" color="text.secondary">Dec 15</Typography>
                <Typography variant="caption" color="text.secondary">Dec 16</Typography>
                <Typography variant="caption" color="text.secondary">Dec 17</Typography>
                <Typography variant="caption" color="text.secondary">Dec 18</Typography>
              </Box>
            </Box>
          </Box>

          {/* Word Cloud Card */}
          <Box
            sx={{
              p: 2,
              mb: 2,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              backgroundColor: 'background.paper',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Top Keywords
              </Typography>
              <IconButton size="small" sx={{ color: 'text.secondary' }}>
                <FileDownloadOutlinedIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Mock Word Cloud */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'center', py: 2 }}>
              <Typography sx={{ fontSize: 24, fontWeight: 600, color: 'primary.main' }}>Innovation</Typography>
              <Typography sx={{ fontSize: 18, fontWeight: 500, color: 'text.primary' }}>Technology</Typography>
              <Typography sx={{ fontSize: 28, fontWeight: 600, color: 'secondary.main' }}>Growth</Typography>
              <Typography sx={{ fontSize: 16, fontWeight: 500, color: 'text.secondary' }}>Digital</Typography>
              <Typography sx={{ fontSize: 20, fontWeight: 600, color: 'primary.main' }}>Strategy</Typography>
              <Typography sx={{ fontSize: 22, fontWeight: 500, color: 'text.primary' }}>Market</Typography>
              <Typography sx={{ fontSize: 16, fontWeight: 500, color: 'text.secondary' }}>Future</Typography>
              <Typography sx={{ fontSize: 26, fontWeight: 600, color: 'secondary.main' }}>AI</Typography>
              <Typography sx={{ fontSize: 18, fontWeight: 500, color: 'text.primary' }}>Platform</Typography>
            </Box>
          </Box>

          {/* Side by Side Cards - Top Insights & Empty State */}
          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexDirection: { xs: 'column', lg: 'row' } }}>
            {/* Top Insights List Card */}
            <Box
              sx={{
                flex: 1,
                p: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                backgroundColor: 'background.paper',
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Top Insights
              </Typography>

              {/* Insight Items */}
              {[
                { label: 'Most mentioned topic', value: 'Product Launch', count: '1,245' },
                { label: 'Highest engagement', value: 'Social Media Campaign', count: '892' },
                { label: 'Trending hashtag', value: '#Innovation2024', count: '567' },
                { label: 'Top influencer', value: '@TechLeader', count: '423' },
              ].map((item, i) => (
                <Box
                  key={i}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 1.5,
                    borderBottom: i < 3 ? '1px solid' : 'none',
                    borderColor: 'divider',
                  }}
                >
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      {item.label}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'primary.main',
                        fontWeight: 500,
                        cursor: 'pointer',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Box>
                  <Chip
                    label={item.count}
                    size="small"
                    sx={{
                      backgroundColor: 'action.selected',
                      fontWeight: 600,
                    }}
                  />
                </Box>
              ))}
            </Box>

            {/* Empty State Card */}
            <Box
              sx={{
                flex: 1,
                p: 4,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                backgroundColor: 'background.paper',
                textAlign: 'center',
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  backgroundColor: 'action.hover',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  mb: 2,
                }}
              >
                <InfoOutlinedIcon sx={{ fontSize: 32, color: 'text.disabled' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                No Documents Found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                We couldn't find any documents matching your search criteria. Try adjusting your filters.
              </Typography>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                }}
              >
                Clear Filters
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Third Column - Super Skinny Quick Actions */}
        <Box
          sx={{
            display: { xs: 'none', lg: 'flex' },
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 3,
            pt: 2,
          }}
        >
          {/* Share Action */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
            <IconButton
              size="medium"
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                width: 48,
                height: 48,
              }}
            >
              <ShareOutlinedIcon />
            </IconButton>
            <Typography variant="caption" color="text.secondary">
              Share
            </Typography>
          </Box>

          {/* View Action */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
            <IconButton
              size="medium"
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                width: 48,
                height: 48,
              }}
            >
              <ViewAgendaOutlinedIcon />
            </IconButton>
            <Typography variant="caption" color="text.secondary">
              View
            </Typography>
          </Box>
        </Box>
      </Box>
        </>
      )}
      </Box>

      {/* Dummy Sidebar - Main */}
      <DummySidebar
        open={sidebarOpen && !drilldownOpen}
        onClose={handleCloseSidebar}
        chatOpen={chatOpen}
        variant="sidebar1"
        title="Sidebar Title"
        onDrillIn={handleDrillIn}
        animationMode="hybrid"
      />

      {/* Dummy Sidebar - Drilldown */}
      <DummySidebar
        open={drilldownOpen}
        onClose={handleCloseSidebar}
        chatOpen={chatOpen}
        variant="sidebar2"
        title={drilldownTitle}
        showBackButton={true}
        onBack={handleDrillBack}
        animationMode="hybrid"
      />
    </Box>
  )
}

export default LayoutDemoPageV2

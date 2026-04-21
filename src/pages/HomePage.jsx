import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Typography,
  InputBase,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Link,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined'
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined'

// Data visualization components
import DataModuleCard from '../components/home/DataModuleCard'
import SentimentLineChart from '../components/charts/SentimentLineChart'
import NarrativeHeatmap from '../components/charts/NarrativeHeatmap'
import BubbleChart from '../components/charts/BubbleChart'
import {
  sentimentTrendData,
  narrativeHeatmapRows,
  narrativeHeatmapColumns,
  narrativeHeatmapCells,
  bubbleChartData,
  aiInsights,
  dataModuleConfigs,
  alertsData,
  alertsUnreadCount,
} from '../data/homePageChartsData'
import AlertsCard from '../components/home/AlertsCard'

// eslint-disable-next-line no-unused-vars
function HomePage({ chatOpen: _chatOpen = false }) {
  const [showMoreProducts, setShowMoreProducts] = useState(false)
  const [carouselIndex, setCarouselIndex] = useState(0)

  // Mock data for "Pick up where you left off"
  const recentItems = [
    { id: 1, title: 'Q4 Analysis', app: 'Analytics', time: '2 hours ago', icon: <BarChartOutlinedIcon sx={{ fontSize: 20 }} /> },
    { id: 2, title: 'Campaign Report', app: 'Marketing', time: '4 hours ago', icon: <CampaignOutlinedIcon sx={{ fontSize: 20 }} /> },
    { id: 3, title: 'User Research', app: 'Research', time: 'Yesterday', icon: <GroupOutlinedIcon sx={{ fontSize: 20 }} /> },
    { id: 4, title: 'Competitor Data', app: 'Intelligence', time: 'Yesterday', icon: <TravelExploreOutlinedIcon sx={{ fontSize: 20 }} /> },
    { id: 5, title: 'Weekly Metrics', app: 'Dashboard', time: '2 days ago', icon: <DashboardOutlinedIcon sx={{ fontSize: 20 }} /> },
    { id: 6, title: 'Team Updates', app: 'Collaboration', time: '3 days ago', icon: <ForumOutlinedIcon sx={{ fontSize: 20 }} /> },
  ]

  // Mock data for "Product Overview"
  const productItems = [
    { id: 1, title: 'Dashboard Overview', app: 'Analytics', time: '2 hours ago', description: 'Get a comprehensive view of your key metrics and performance indicators in one place.', icon: <DashboardOutlinedIcon sx={{ fontSize: 20 }} /> },
    { id: 2, title: 'Campaign Performance', app: 'Marketing', time: '4 hours ago', description: 'Track and analyze the effectiveness of your marketing campaigns across channels.', icon: <CampaignOutlinedIcon sx={{ fontSize: 20 }} /> },
    { id: 3, title: 'Team Insights', app: 'Collaboration', time: 'Yesterday', description: 'Monitor team productivity and collaboration metrics to improve workflows.', icon: <GroupOutlinedIcon sx={{ fontSize: 20 }} /> },
    { id: 4, title: 'Market Analysis', app: 'Intelligence', time: 'Yesterday', description: 'Stay ahead with real-time competitive intelligence and market trends.', icon: <TravelExploreOutlinedIcon sx={{ fontSize: 20 }} /> },
    { id: 5, title: 'Growth Metrics', app: 'Analytics', time: '2 days ago', description: 'Understand your growth trajectory with detailed analytics and forecasting.', icon: <BarChartOutlinedIcon sx={{ fontSize: 20 }} /> },
    { id: 6, title: 'Communication Hub', app: 'Collaboration', time: '3 days ago', description: 'Centralize team communications and stay connected across projects.', icon: <ForumOutlinedIcon sx={{ fontSize: 20 }} /> },
  ]

  // Mock data for "Guides and Resources"
  const guideItems = [
    { id: 1, title: 'Getting Started Guide', app: 'Documentation', time: 'Updated today', description: 'Learn the basics and get up to speed quickly with our step-by-step guide.', icon: <MenuBookOutlinedIcon sx={{ fontSize: 20 }} /> },
    { id: 2, title: 'Best Practices', app: 'Resources', time: 'Updated this week', description: 'Discover proven strategies and tips to maximize your results.', icon: <LightbulbOutlinedIcon sx={{ fontSize: 20 }} /> },
    { id: 3, title: 'API Documentation', app: 'Developer', time: 'Updated yesterday', description: 'Comprehensive API reference for developers and integrations.', icon: <CodeOutlinedIcon sx={{ fontSize: 20 }} /> },
  ]

  // Carousel items
  const carouselItems = [
    { id: 1, title: 'New Feature Release', description: 'Check out our latest updates and improvements' },
    { id: 2, title: 'Webinar: Data Tips', description: 'Join us for expert insights on data analysis' },
    { id: 3, title: 'Case Study', description: 'See how teams are using the platform' },
  ]

  const visibleProducts = showMoreProducts ? productItems : productItems.slice(0, 4)

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header Section - White Background */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: 3,
          pb: 4,
          backgroundColor: 'background.paper',
          px: 3,
        }}
      >
        {/* Greeting */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 400,
            color: 'text.primary',
            mb: 3,
          }}
        >
          Hello, <span style={{ fontWeight: 700 }}>Kevin</span>
        </Typography>

        {/* Search Bar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'grey.100',
            borderRadius: '999px',
            px: 3,
            py: 1.5,
            width: '100%',
            maxWidth: 560,
            mb: 2,
          }}
        >
          <SearchIcon sx={{ color: 'text.secondary', mr: 2, fontSize: 22 }} />
          <InputBase
            placeholder="Search for anything..."
            sx={{
              flex: 1,
              fontSize: 15,
              '& input::placeholder': {
                color: 'text.secondary',
                opacity: 0.8,
              },
            }}
          />
        </Box>

        {/* Mira Studio CTA */}
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Mira Studio has arrived.{' '}
          <Link
            component={RouterLink}
            to="/studio"
            sx={{ color: 'text.primary', fontWeight: 500 }}
          >
            Ask any questions here
          </Link>
          .
        </Typography>
      </Box>

      {/* Main Content - Two Column Layout */}
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
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            gap: 3,
            maxWidth: 1536,
            mx: 'auto',
          }}
        >
        {/* Left Column - Main Content */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {/* Pick up where you left off */}
          <Box sx={{ mb: 5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Pick up where you left off
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' },
                gap: 2,
              }}
            >
              {recentItems.map((item) => (
                <Card
                  key={item.id}
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
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 }, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        backgroundColor: 'primary.light',
                        opacity: 0.7,
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'primary.dark',
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {item.app} · {item.time}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>

          {/* Data Visualization Modules */}
          <Box sx={{ mb: 5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Insights & Analytics
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                gap: 2,
              }}
            >
              {/* Sentiment Trend Chart */}
              <DataModuleCard
                title={dataModuleConfigs.sentimentTrend.title}
                subtitle={dataModuleConfigs.sentimentTrend.subtitle}
                aiInsight={aiInsights.sentimentTrend}
              >
                <SentimentLineChart
                  data={sentimentTrendData}
                  height={240}
                  xAxis={{ label: 'Date' }}
                  yAxis={{ label: 'Percentage' }}
                />
              </DataModuleCard>

              {/* Narrative Heatmap */}
              <DataModuleCard
                title={dataModuleConfigs.narrativeHeatmap.title}
                subtitle={dataModuleConfigs.narrativeHeatmap.subtitle}
                aiInsight={aiInsights.narrativeHeatmap}
              >
                <NarrativeHeatmap
                  rows={narrativeHeatmapRows}
                  columns={narrativeHeatmapColumns}
                  cells={narrativeHeatmapCells}
                />
              </DataModuleCard>
            </Box>

            {/* Full-width Bubble Chart */}
            <Box sx={{ mt: 2 }}>
              <DataModuleCard
                title={dataModuleConfigs.bubbleChart.title}
                subtitle={dataModuleConfigs.bubbleChart.subtitle}
                aiInsight={aiInsights.bubbleChart}
              >
                <BubbleChart
                  data={bubbleChartData}
                  height={320}
                  xAxis={{ label: 'Satisfaction Score', min: 0, max: 100 }}
                  yAxis={{ label: 'Mentions', min: 0, max: 20000 }}
                  sizeAxis={{ label: 'Reach' }}
                />
              </DataModuleCard>
            </Box>
          </Box>

          {/* Product Overview */}
          <Box sx={{ mb: 5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Product Overview
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                gap: 2,
              }}
            >
              {visibleProducts.map((item) => (
                <Card
                  key={item.id}
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
                  <Box sx={{ display: 'flex' }}>
                    {/* Left column - 2/3 */}
                    <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 }, flex: 2 }}>
                      {/* Header with icon and title */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            backgroundColor: 'primary.light',
                            opacity: 0.7,
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'primary.dark',
                          }}
                        >
                          {item.icon}
                        </Box>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            {item.title}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {item.app} · {item.time}
                          </Typography>
                        </Box>
                      </Box>
                      {/* Description */}
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                        {item.description}
                      </Typography>
                      {/* Buttons */}
                      <Box sx={{ display: 'flex', gap: 1.5 }}>
                        <Button variant="outlined" size="small" sx={{ fontWeight: 700, textTransform: 'none' }}>
                          Button
                        </Button>
                        <Button variant="outlined" size="small" sx={{ fontWeight: 700, textTransform: 'none' }}>
                          Button
                        </Button>
                      </Box>
                    </CardContent>
                    {/* Right column - 1/3 image placeholder */}
                    <Box
                      sx={{
                        flex: 1,
                        backgroundColor: 'grey.300',
                        borderTopRightRadius: 4,
                        borderBottomRightRadius: 4,
                        minHeight: 160,
                      }}
                    />
                  </Box>
                </Card>
              ))}
            </Box>
            <Button
              variant="outlined"
              fullWidth
              endIcon={<ExpandMoreIcon sx={{ transform: showMoreProducts ? 'rotate(180deg)' : 'none', fontSize: 18 }} />}
              onClick={() => setShowMoreProducts(!showMoreProducts)}
              sx={{
                mt: 2,
                py: 0.75,
                color: 'text.primary',
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '0.875rem',
                borderColor: 'divider',
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  borderColor: 'divider',
                },
              }}
            >
              {showMoreProducts ? 'Show Less' : 'Show More'}
            </Button>
          </Box>

          {/* Guides and Resources */}
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Guides and Resources
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                gap: 2,
              }}
            >
              {guideItems.map((item) => (
                <Card
                  key={item.id}
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
                  <Box sx={{ display: 'flex' }}>
                    {/* Left column - 2/3 */}
                    <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 }, flex: 2 }}>
                      {/* Header with icon and title */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            backgroundColor: 'primary.light',
                            opacity: 0.7,
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'primary.dark',
                          }}
                        >
                          {item.icon}
                        </Box>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            {item.title}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {item.app} · {item.time}
                          </Typography>
                        </Box>
                      </Box>
                      {/* Description */}
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                        {item.description}
                      </Typography>
                      {/* Buttons */}
                      <Box sx={{ display: 'flex', gap: 1.5 }}>
                        <Button variant="outlined" size="small" sx={{ fontWeight: 700, textTransform: 'none' }}>
                          Button
                        </Button>
                        <Button variant="outlined" size="small" sx={{ fontWeight: 700, textTransform: 'none' }}>
                          Button
                        </Button>
                      </Box>
                    </CardContent>
                    {/* Right column - 1/3 image placeholder */}
                    <Box
                      sx={{
                        flex: 1,
                        backgroundColor: 'grey.300',
                        borderTopRightRadius: 4,
                        borderBottomRightRadius: 4,
                        minHeight: 160,
                      }}
                    />
                  </Box>
                </Card>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Right Column - Sidebar */}
        <Box sx={{ width: { xs: '100%', lg: 320 }, flexShrink: 0 }}>
          {/* More to check out - Carousel Card */}
          <Card
            sx={{
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: 'none',
              mb: 3,
            }}
          >
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
                More to check out
              </Typography>

              {/* Carousel Image Placeholder */}
              <Box
                sx={{
                  backgroundColor: 'grey.200',
                  borderRadius: 1,
                  height: 140,
                  mb: 2,
                }}
              />

              {/* Carousel Content */}
              <Typography variant="subtitle2" sx={{ fontWeight: 700, textAlign: 'center' }}>
                {carouselItems[carouselIndex].title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', textAlign: 'center', mb: 2 }}
              >
                {carouselItems[carouselIndex].description}
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Button variant="outlined" size="small">
                  Button
                </Button>
              </Box>

              {/* Carousel Dots */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                {carouselItems.map((_, index) => (
                  <Box
                    key={index}
                    onClick={() => setCarouselIndex(index)}
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: index === carouselIndex ? 'text.primary' : 'grey.300',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>

          {/* Alerts Card */}
          <AlertsCard
            alerts={alertsData}
            unreadCount={alertsUnreadCount}
            onCreateAlert={() => console.log('Create alert')}
            onSettings={() => console.log('Go to settings')}
            onAlertClick={(alert) => console.log('Alert clicked:', alert)}
          />
        </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default HomePage

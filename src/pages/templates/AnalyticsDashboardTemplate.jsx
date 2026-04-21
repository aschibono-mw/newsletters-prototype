import { useState } from 'react'
import { Box, Container, Typography, Button, Card, CardContent, IconButton, Menu, MenuItem, Tabs, Tab, Chip, Select, FormControl, InputLabel, Grid, LinearProgress, Divider, Avatar, Tooltip } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import Indicator from '../../components/core/Indicator'
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded'
import TrendingUpIcon from '@mui/icons-material/TrendingUpRounded'
import TrendingDownIcon from '@mui/icons-material/TrendingDownRounded'
import MoreVertIcon from '@mui/icons-material/MoreVertRounded'
import RefreshIcon from '@mui/icons-material/RefreshRounded'
import FullscreenIcon from '@mui/icons-material/FullscreenRounded'
import DownloadIcon from '@mui/icons-material/DownloadRounded'
import AddIcon from '@mui/icons-material/AddRounded'
import CalendarTodayIcon from '@mui/icons-material/CalendarTodayRounded'
import FilterListIcon from '@mui/icons-material/FilterListRounded'
import ShareIcon from '@mui/icons-material/ShareRounded'
import EditIcon from '@mui/icons-material/EditRounded'
import DragIndicatorIcon from '@mui/icons-material/DragIndicatorRounded'
import BarChartIcon from '@mui/icons-material/BarChartRounded'
import PieChartIcon from '@mui/icons-material/PieChartRounded'
import ShowChartIcon from '@mui/icons-material/ShowChartRounded'
import TableChartIcon from '@mui/icons-material/TableChartRounded'
import SpeedIcon from '@mui/icons-material/SpeedRounded'

const kpis = [
  { label: 'Total Revenue', value: '$1.24M', change: '+12.5%', trend: 'up', target: '85%', sparkline: [30, 40, 35, 50, 49, 60, 70, 65, 75, 80] },
  { label: 'Active Users', value: '24,521', change: '+8.2%', trend: 'up', target: '92%', sparkline: [20, 25, 30, 28, 35, 40, 38, 45, 50, 55] },
  { label: 'Conversion Rate', value: '3.24%', change: '-0.5%', trend: 'down', target: '78%', sparkline: [40, 38, 42, 35, 30, 32, 28, 30, 25, 28] },
  { label: 'Avg. Order Value', value: '$156.42', change: '+4.1%', trend: 'up', target: '95%', sparkline: [25, 30, 28, 35, 40, 38, 42, 45, 48, 52] },
]

const topProducts = [
  { name: 'Product Alpha', revenue: '$245,890', growth: '+15%', units: '1,234' },
  { name: 'Product Beta', revenue: '$198,450', growth: '+8%', units: '987' },
  { name: 'Product Gamma', revenue: '$156,780', growth: '+22%', units: '756' },
  { name: 'Product Delta', revenue: '$134,560', growth: '-3%', units: '654' },
  { name: 'Product Epsilon', revenue: '$98,340', growth: '+5%', units: '432' },
]

const topRegions = [
  { name: 'North America', value: 45, color: 'primary' },
  { name: 'Europe', value: 28, color: 'secondary' },
  { name: 'Asia Pacific', value: 18, color: 'success' },
  { name: 'Other', value: 9, color: 'warning' },
]

const recentActivity = [
  { event: 'New order #12345', amount: '$1,234', time: '2 min ago', avatar: 'O' },
  { event: 'User signup', amount: null, time: '5 min ago', avatar: 'U' },
  { event: 'Subscription renewed', amount: '$99', time: '12 min ago', avatar: 'S' },
  { event: 'Refund processed', amount: '-$45', time: '25 min ago', avatar: 'R' },
  { event: 'New order #12344', amount: '$567', time: '32 min ago', avatar: 'O' },
]

function Sparkline({ data, color = 'primary' }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - ((v - min) / range) * 100}`).join(' ')

  return (
    <svg width="80" height="24" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        style={{ color: color === 'up' ? '#10B981' : color === 'down' ? '#EF4444' : '#0891B2' }}
      />
    </svg>
  )
}

function AnalyticsDashboardTemplate() {
  const [currentTab, setCurrentTab] = useState(0)
  const [dateRange, setDateRange] = useState('last30')
  const [anchorEl, setAnchorEl] = useState(null)

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'grey.100' }}>
      {/* Header */}
      <Box sx={{ backgroundColor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', py: 2 }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button component={RouterLink} to="/templates" startIcon={<ArrowBackIcon />} sx={{ textTransform: 'none' }}>
                Back to Templates
              </Button>
              <Divider orientation="vertical" flexItem />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>Analytics Dashboard</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <Select value={dateRange} onChange={(e) => setDateRange(e.target.value)} displayEmpty>
                  <MenuItem value="today">Today</MenuItem>
                  <MenuItem value="last7">Last 7 days</MenuItem>
                  <MenuItem value="last30">Last 30 days</MenuItem>
                  <MenuItem value="thisMonth">This Month</MenuItem>
                  <MenuItem value="lastQuarter">Last Quarter</MenuItem>
                  <MenuItem value="custom">Custom Range</MenuItem>
                </Select>
              </FormControl>
              <Button variant="outlined" startIcon={<FilterListIcon />} sx={{ textTransform: 'none' }}>Filters</Button>
              <IconButton><RefreshIcon /></IconButton>
              <Button variant="contained" color="secondary" startIcon={<ShareIcon />} sx={{ textTransform: 'none' }}>Share</Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Dashboard Tabs */}
      <Box sx={{ backgroundColor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Tabs value={currentTab} onChange={(e, v) => setCurrentTab(v)}>
              <Tab label="Overview" sx={{ textTransform: 'none' }} />
              <Tab label="Sales" sx={{ textTransform: 'none' }} />
              <Tab label="Marketing" sx={{ textTransform: 'none' }} />
              <Tab label="Operations" sx={{ textTransform: 'none' }} />
            </Tabs>
            <Button startIcon={<AddIcon />} sx={{ textTransform: 'none' }}>Add Dashboard</Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* KPI Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {kpis.map((kpi) => (
            <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={kpi.label}>
              <Card sx={{ height: '100%', boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">{kpi.label}</Typography>
                    <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}><MoreVertIcon fontSize="small" /></IconButton>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>{kpi.value}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: kpi.trend === 'up' ? 'success.main' : 'error.main' }}>
                      {kpi.trend === 'up' ? <TrendingUpIcon sx={{ fontSize: 16 }} /> : <TrendingDownIcon sx={{ fontSize: 16 }} />}
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{kpi.change}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="caption" color="text.secondary">Target:</Typography>
                      <LinearProgress variant="determinate" value={parseInt(kpi.target)} sx={{ width: 60, height: 4, borderRadius: 2 }} />
                      <Typography variant="caption" color="text.secondary">{kpi.target}</Typography>
                    </Box>
                    <Sparkline data={kpi.sparkline} color={kpi.trend} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          {/* Revenue Chart */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>Revenue Overview</Typography>
                    <Typography variant="body2" color="text.secondary">Monthly revenue vs. target</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Indicator label="Revenue" color="info" />
                    <Chip label="Target" size="small" variant="outlined" />
                    <IconButton size="small"><FullscreenIcon fontSize="small" /></IconButton>
                    <IconButton size="small"><DownloadIcon fontSize="small" /></IconButton>
                  </Box>
                </Box>
                <Box sx={{ p: 3, height: 300, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', gap: 2 }}>
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => {
                    const height = Math.random() * 60 + 30
                    const targetHeight = Math.random() * 60 + 35
                    return (
                      <Box key={month} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 0.5, height: 240 }}>
                          <Box sx={{ width: 16, height: `${height}%`, backgroundColor: 'primary.main', borderRadius: '4px 4px 0 0' }} />
                          <Box sx={{ width: 16, height: `${targetHeight}%`, backgroundColor: 'grey.300', borderRadius: '4px 4px 0 0' }} />
                        </Box>
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>{month}</Typography>
                      </Box>
                    )
                  })}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Regional Breakdown */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Card sx={{ height: '100%', boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>Revenue by Region</Typography>
                  <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
                </Box>
                {/* Donut Chart Placeholder */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                  <Box sx={{ position: 'relative', width: 160, height: 160 }}>
                    <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>$1.24M</Typography>
                        <Typography variant="caption" color="text.secondary">Total Revenue</Typography>
                      </Box>
                    </Box>
                    <svg width="160" height="160" viewBox="0 0 160 160">
                      <circle cx="80" cy="80" r="60" fill="none" stroke="#E5E7EB" strokeWidth="20" />
                      <circle cx="80" cy="80" r="60" fill="none" stroke="#0891B2" strokeWidth="20" strokeDasharray="170 377" strokeDashoffset="0" transform="rotate(-90 80 80)" />
                      <circle cx="80" cy="80" r="60" fill="none" stroke="#A21CAF" strokeWidth="20" strokeDasharray="105 377" strokeDashoffset="-170" transform="rotate(-90 80 80)" />
                      <circle cx="80" cy="80" r="60" fill="none" stroke="#10B981" strokeWidth="20" strokeDasharray="68 377" strokeDashoffset="-275" transform="rotate(-90 80 80)" />
                    </svg>
                  </Box>
                </Box>
                {topRegions.map((region) => (
                  <Box key={region.name} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: `${region.color}.main` }} />
                      <Typography variant="body2">{region.name}</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{region.value}%</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Top Products */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>Top Products</Typography>
                  <Button size="small" sx={{ textTransform: 'none' }}>View All</Button>
                </Box>
                {topProducts.map((product, i) => (
                  <Box key={product.name} sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: i < topProducts.length - 1 ? '1px solid' : 'none', borderColor: 'divider' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ width: 20 }}>#{i + 1}</Typography>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{product.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{product.units} units sold</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{product.revenue}</Typography>
                      <Typography variant="caption" sx={{ color: product.growth.startsWith('+') ? 'success.main' : 'error.main' }}>{product.growth}</Typography>
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Activity */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>Recent Activity</Typography>
                  <Indicator label="Live" color="success" />
                </Box>
                {recentActivity.map((activity, i) => (
                  <Box key={i} sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: i < recentActivity.length - 1 ? '1px solid' : 'none', borderColor: 'divider' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ width: 36, height: 36, backgroundColor: 'grey.100', color: 'text.secondary', fontSize: 14 }}>{activity.avatar}</Avatar>
                      <Box>
                        <Typography variant="body2">{activity.event}</Typography>
                        <Typography variant="caption" color="text.secondary">{activity.time}</Typography>
                      </Box>
                    </Box>
                    {activity.amount && (
                      <Typography variant="body2" sx={{ fontWeight: 600, color: activity.amount.startsWith('-') ? 'error.main' : 'success.main' }}>
                        {activity.amount}
                      </Typography>
                    )}
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Widget Selector */}
          <Grid size={{ xs: 12 }}>
            <Card sx={{ backgroundColor: 'grey.100', border: '2px dashed', borderColor: 'grey.300' }}>
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>Add widgets to customize your dashboard</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                  {[
                    { icon: <BarChartIcon />, label: 'Bar Chart' },
                    { icon: <ShowChartIcon />, label: 'Line Chart' },
                    { icon: <PieChartIcon />, label: 'Pie Chart' },
                    { icon: <TableChartIcon />, label: 'Table' },
                    { icon: <SpeedIcon />, label: 'Gauge' },
                  ].map((widget) => (
                    <Button
                      key={widget.label}
                      variant="outlined"
                      startIcon={widget.icon}
                      sx={{ textTransform: 'none', backgroundColor: 'background.paper' }}
                    >
                      {widget.label}
                    </Button>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Widget Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => setAnchorEl(null)}><EditIcon sx={{ mr: 1, fontSize: 18 }} /> Edit Widget</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}><FullscreenIcon sx={{ mr: 1, fontSize: 18 }} /> Expand</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}><DownloadIcon sx={{ mr: 1, fontSize: 18 }} /> Export Data</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}><RefreshIcon sx={{ mr: 1, fontSize: 18 }} /> Refresh</MenuItem>
      </Menu>
    </Box>
  )
}

export default AnalyticsDashboardTemplate

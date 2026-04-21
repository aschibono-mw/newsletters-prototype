import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Paper,
  Typography,
  Stack,
  Tooltip,
  Link,
  Switch,
  Skeleton,
  CircularProgress,
} from '@mui/material'
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import WorkspacesOutlinedIcon from '@mui/icons-material/WorkspacesOutlined'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined'
import InputOutlinedIcon from '@mui/icons-material/InputOutlined'
import RssFeedOutlinedIcon from '@mui/icons-material/RssFeedOutlined'
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

// Mock chart data - realistic monthly usage pattern
const CHART_DATA = [
  { month: 'January', value: 142000 },
  { month: 'February', value: 158000 },
  { month: 'March', value: 175000 },
  { month: 'April', value: 163000 },
  { month: 'May', value: 189000 },
  { month: 'June', value: 201000 },
  { month: 'July', value: 178000 },
  { month: 'August', value: 156000 },
  { month: 'September', value: 192000 },
  { month: 'October', value: 210000 },
  { month: 'November', value: 198000 },
  { month: 'December', value: 168000 },
]

const ACCOUNT_DETAILS = [
  { icon: PeopleOutlinedIcon, label: 'Users', value: '30/100' },
  { icon: SearchOutlinedIcon, label: 'Saved Searches', value: '500/500' },
  { icon: BarChartOutlinedIcon, label: 'Explore+ Documents', value: '476.9M/520M' },
  { icon: DashboardOutlinedIcon, label: 'Dashboards', value: '11/100' },
  { icon: WidgetsOutlinedIcon, label: 'Widgets Per Dashboard', value: '20' },
  { icon: InputOutlinedIcon, label: 'Inputs Per Widget', value: '10' },
  { icon: RssFeedOutlinedIcon, label: 'RSS Feeds', value: '2/5' },
  { icon: FeedOutlinedIcon, label: 'Newsfeeds', value: '4/5' },
  { divider: true },
  { icon: ArticleOutlinedIcon, label: 'Newsletters', value: 'Enabled' },
  { icon: PublicOutlinedIcon, label: 'Premium Social', value: 'Enabled' },
  { icon: GroupsOutlinedIcon, label: 'Media Relations', value: 'Enabled' },
  { icon: ChatOutlinedIcon, label: 'Engage', value: 'Enabled' },
  { icon: null, label: 'X Volume', sublabel: 'Unlimited posts per day', value: 'Enabled', isX: true },
]

function AccountPageV10() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [displayAve, setDisplayAve] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const chartMax = 250000 // Scale for bar heights

  const formatValue = (val) => {
    if (val >= 1000) return `${(val / 1000).toFixed(val >= 100000 ? 0 : 1)}K`
    return val.toString()
  }

  const QUICK_ACTIONS = [
    {
      icon: PersonAddOutlinedIcon,
      label: 'Create User',
      description: 'Add a new team member',
      path: '/seats-v10/users/new',
      color: 'primary.main',
      bgColor: 'primary.light',
    },
    {
      icon: PeopleAltOutlinedIcon,
      label: 'Users & Seats',
      description: 'Manage access and permissions',
      path: '/seats-v10',
      color: 'secondary.main',
      bgColor: 'secondary.light',
    },
    {
      icon: WorkspacesOutlinedIcon,
      label: 'Workspaces',
      description: 'Organize team environments',
      path: '/seats-v10/workspaces',
      color: 'info.main',
      bgColor: 'info.light',
    },
    {
      icon: BadgeOutlinedIcon,
      label: 'Roles',
      description: 'Define permission sets',
      path: '/seats-v10/roles',
      color: 'warning.main',
      bgColor: 'warning.light',
    },
  ]

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', backgroundColor: 'grey.50' }}>
      {/* Hero Section */}
      <Box sx={{ backgroundColor: 'background.paper', pt: 3, pb: 4 }}>
        <Box sx={{ maxWidth: 1536, mx: 'auto', px: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
            Account Settings
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
            Manage your account details and subscriptions
          </Typography>

          {/* Quick Action Cards */}
          <Stack direction="row" spacing={2}>
            {QUICK_ACTIONS.map((action) => {
              const IconComponent = action.icon
              return (
                <Paper
                  key={action.label}
                  variant="outlined"
                  onClick={() => navigate(action.path)}
                  sx={{
                    flex: 1,
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    cursor: 'pointer',
                    '&:hover': {
                      borderColor: 'primary.main',
                      backgroundColor: 'grey.50',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1,
                      backgroundColor: action.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <IconComponent sx={{ fontSize: 20, color: action.color }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {action.label}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {action.description}
                    </Typography>
                  </Box>
                </Paper>
              )
            })}
          </Stack>
        </Box>
      </Box>

      <Box sx={{ backgroundColor: '#F5F5F5', flex: 1 }}>
        <Box sx={{ p: 3, maxWidth: 1536, mx: 'auto' }}>
        {/* Note */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Please note these counts reflect the total number of clicks or snippet hits for all time, and do not represent any single billing period. Unused clicks for a billing period will roll over into the next period and do not expire.
        </Typography>

        <Stack direction="row" spacing={3} alignItems="flex-start">
          {/* Left Column */}
          <Box sx={{ flex: 1 }}>
            {/* DACH Premium */}
            <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                <strong>DACH Premium</strong> Remaining Limits
              </Typography>
              <Stack direction="row" spacing={2}>
                {loading ? (
                  <>
                    <Paper variant="outlined" sx={{ flex: 1, p: 2, textAlign: 'center', backgroundColor: 'grey.100', height: 76 }}>
                      <Skeleton variant="text" width="50%" sx={{ mx: 'auto', fontSize: '1.5rem' }} />
                      <Skeleton variant="text" width="70%" sx={{ mx: 'auto' }} />
                    </Paper>
                    <Paper variant="outlined" sx={{ flex: 1, p: 2, textAlign: 'center', backgroundColor: 'grey.100', height: 76 }}>
                      <Skeleton variant="text" width="50%" sx={{ mx: 'auto', fontSize: '1.5rem' }} />
                      <Skeleton variant="text" width="70%" sx={{ mx: 'auto' }} />
                    </Paper>
                  </>
                ) : (
                  <>
                    <Paper variant="outlined" sx={{ flex: 1, p: 2, textAlign: 'center' }}>
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>2/10</Typography>
                      <Typography variant="body2" color="text.secondary">Full-Text Clicks</Typography>
                    </Paper>
                    <Paper variant="outlined" sx={{ flex: 1, p: 2, textAlign: 'center' }}>
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>1/10</Typography>
                      <Typography variant="body2" color="text.secondary">Newsletter Clicks</Typography>
                    </Paper>
                  </>
                )}
              </Stack>
            </Paper>

            {/* Australian Print Usage */}
            <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                <strong>Australian Print</strong> Usage
              </Typography>
              {loading ? (
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', backgroundColor: 'grey.100', height: 76 }}>
                  <Skeleton variant="text" width="30%" sx={{ mx: 'auto', fontSize: '1.5rem' }} />
                  <Skeleton variant="text" width="50%" sx={{ mx: 'auto' }} />
                </Paper>
              ) : (
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>0/100</Typography>
                  <Typography variant="body2" color="text.secondary">Full-Text Clicks</Typography>
                </Paper>
              )}
            </Paper>

            {/* Downloads */}
            <Paper variant="outlined" sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Downloads
              </Typography>

              {/* Stats Cards */}
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                {loading ? (
                  <>
                    {[1, 2, 3].map((i) => (
                      <Paper key={i} variant="outlined" sx={{ flex: 1, p: 2, textAlign: 'center', backgroundColor: 'grey.100', height: 76 }}>
                        <Skeleton variant="text" width="50%" sx={{ mx: 'auto', fontSize: '1.5rem' }} />
                        <Skeleton variant="text" width="80%" sx={{ mx: 'auto' }} />
                      </Paper>
                    ))}
                  </>
                ) : (
                  <>
                    <Paper variant="outlined" sx={{ flex: 1, p: 2, textAlign: 'center' }}>
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>230K</Typography>
                      <Typography variant="body2" color="text.secondary">Documents Limit Per Month</Typography>
                    </Paper>
                    <Paper variant="outlined" sx={{ flex: 1, p: 2, textAlign: 'center' }}>
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>20K</Typography>
                      <Typography variant="body2" color="text.secondary">Documents Per Download Limit</Typography>
                    </Paper>
                    <Paper variant="outlined" sx={{ flex: 1, p: 2, textAlign: 'center' }}>
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>168.2K</Typography>
                      <Typography variant="body2" color="text.secondary">Remaining Limit</Typography>
                    </Paper>
                  </>
                )}
              </Stack>

              {/* Chart Section */}
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Downloaded Documents
                    </Typography>
                    <Tooltip title="Total documents downloaded per month">
                      <InfoOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    </Tooltip>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={0.5} sx={{ cursor: 'pointer' }}>
                    <CalendarTodayOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      Last 12 Months
                    </Typography>
                    <ArrowDropDownIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  </Stack>
                </Stack>

                {/* Bar Chart */}
                <Box sx={{ position: 'relative', height: 280 }}>
                  {loading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                      <CircularProgress size={40} />
                    </Box>
                  ) : (
                    <>
                      {/* Y-axis labels */}
                      <Box sx={{ position: 'absolute', left: 0, top: 0, bottom: 40, width: 45 }}>
                        {[250, 200, 150, 100, 50, 0].map((val, i) => (
                          <Typography
                            key={i}
                            variant="caption"
                            color="text.secondary"
                            sx={{
                              position: 'absolute',
                              right: 4,
                              top: `${(i / 5) * 100}%`,
                              transform: 'translateY(-50%)',
                              fontSize: 11,
                            }}
                          >
                            {val === 0 ? '0' : `${val}K`}
                          </Typography>
                        ))}
                      </Box>

                      {/* Chart area */}
                      <Box sx={{ position: 'absolute', left: 50, right: 0, top: 0, bottom: 40 }}>
                        {/* Limit line at 230K */}
                        <Box
                          sx={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: '8%',
                            borderTop: '2px dashed',
                            borderColor: 'error.main',
                          }}
                        />

                        {/* Bars */}
                        <Box sx={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, display: 'flex' }}>
                          {CHART_DATA.map((item, index) => {
                            const barHeight = item.value > 0 ? (item.value / chartMax) * 100 : 0
                            return (
                              <Box
                                key={index}
                                sx={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}
                              >
                                {item.value > 0 && (
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      fontSize: 10,
                                      position: 'absolute',
                                      bottom: `${barHeight + 2}%`,
                                    }}
                                  >
                                    {formatValue(item.value)}
                                  </Typography>
                                )}
                                <Box
                                  sx={{
                                    width: '60%',
                                    backgroundColor: 'primary.main',
                                    borderRadius: '2px 2px 0 0',
                                    animation: `growToHeight 0.8s ease-out forwards`,
                                    '--target-height': `${barHeight}%`,
                                    '@keyframes growToHeight': {
                                      '0%': { height: '0%' },
                                      '100%': { height: 'var(--target-height)' },
                                    },
                                  }}
                                />
                              </Box>
                            )
                          })}
                        </Box>
                      </Box>

                      {/* X-axis labels */}
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ position: 'absolute', left: 50, right: 0, bottom: 0, height: 35 }}
                      >
                        {CHART_DATA.map((item, index) => (
                          <Box key={index} sx={{ flex: 1, textAlign: 'center' }}>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10 }}>
                              {item.month.slice(0, 3)}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>
                    </>
                  )}
                </Box>
              </Paper>
            </Paper>
          </Box>

          {/* Right Column - Account Details */}
          <Box sx={{ width: 360 }}>
            <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Account Details
              </Typography>

              {loading ? (
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Skeleton variant="circular" width={24} height={24} />
                  <Skeleton variant="text" width={140} />
                  <Box sx={{ flex: 1 }} />
                  <Skeleton variant="text" width={80} />
                </Stack>
              ) : (
                <Stack spacing={1.5}>
                  {ACCOUNT_DETAILS.map((item, index) => {
                    if (item.divider) {
                      return <Box key={index} sx={{ borderTop: '1px solid', borderColor: 'divider', my: 1 }} />
                    }

                    const IconComponent = item.icon

                    return (
                      <Stack
                        key={index}
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                          {item.isX ? (
                            <Typography sx={{ fontSize: 18, fontWeight: 700, width: 24, textAlign: 'center' }}>
                              X
                            </Typography>
                          ) : IconComponent ? (
                            <IconComponent sx={{ fontSize: 20, color: 'text.secondary' }} />
                          ) : null}
                          <Box>
                            <Typography variant="body2">
                              {item.label}
                            </Typography>
                            {item.sublabel && (
                              <Typography variant="caption" color="text.secondary">
                                {item.sublabel}
                              </Typography>
                            )}
                          </Box>
                        </Stack>
                        <Typography variant="body2" color="text.secondary">
                          {item.value}
                        </Typography>
                      </Stack>
                    )
                  })}
                </Stack>
              )}
            </Paper>

            {/* Premium subscription password */}
            <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                Premium Subscription Password
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                An organizational password is required for some readers to access subscription based content
              </Typography>

              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <LockOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  <Typography variant="body2">
                    {showPassword ? 'secretpass123' : '****'}
                  </Typography>
                </Stack>
                <Link
                  component="button"
                  variant="body2"
                  color="text.secondary"
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  {showPassword ? 'Hide password' : 'Show password'}
                </Link>
              </Stack>
            </Paper>

            {/* AVE Visibility */}
            <Paper variant="outlined" sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                AVE Visibility
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Advertising value equivalency approximates the monetary value of earned media efforts by comparing them to the equivalent cost of placing advertisements.
              </Typography>
              <Link href="#" variant="body2" sx={{ display: 'block', mb: 2 }}>
                Learn more
              </Link>

              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2 }}>
                <Typography variant="body2">
                  Display AVE
                </Typography>
                <Switch
                  checked={displayAve}
                  onChange={(e) => setDisplayAve(e.target.checked)}
                  color="primary"
                />
              </Stack>
            </Paper>
          </Box>
        </Stack>
        </Box>
      </Box>
    </Box>
  )
}

export default AccountPageV10

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  IconButton,
  Alert,
  Paper,
  Stack,
  Tooltip,
  Card,
  CardContent,
  Divider,
  TextField,
  MenuItem,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'

// Mock token data (same as ApiTokensPage)
const MOCK_TOKENS = {
  1: {
    id: 1,
    name: 'Production API',
    token: 'sk_prod_xxxxxxxxxxxxx',
    created: '2025-10-15',
    lastUsed: '2025-11-05',
    createdBy: 'Sarah Johnson',
    usage: 1247,
  },
  2: {
    id: 2,
    name: 'Development API',
    token: 'sk_dev_xxxxxxxxxxxxx',
    created: '2025-10-20',
    lastUsed: '2025-11-06',
    createdBy: 'Michael Chen',
    usage: 342,
  },
  3: {
    id: 3,
    name: 'Staging Environment',
    token: 'sk_stage_xxxxxxxxxxxx',
    created: '2025-09-12',
    lastUsed: '2025-11-04',
    createdBy: 'Emily Rodriguez',
    usage: 856,
  },
  4: {
    id: 4,
    name: 'Mobile App Integration',
    token: 'sk_mobile_xxxxxxxxxxx',
    created: '2025-08-05',
    lastUsed: '2025-11-06',
    createdBy: 'David Kim',
    usage: 2103,
  },
  5: {
    id: 5,
    name: 'Analytics Dashboard',
    token: 'sk_analytics_xxxxxxxx',
    created: '2025-07-22',
    lastUsed: '2025-10-28',
    createdBy: 'Jessica Martinez',
    usage: 489,
  },
  6: {
    id: 6,
    name: 'CI/CD Pipeline',
    token: 'sk_cicd_xxxxxxxxxxxxx',
    created: '2025-06-18',
    lastUsed: 'Never',
    createdBy: 'Alex Thompson',
    usage: 0,
  },
}

// Mock usage data for cards
const MOCK_USAGE_DATA = [
  {
    id: 1,
    period: 'Last 7 days',
    totalCalls: 3420,
    successRate: 99.2,
    avgResponseTime: 145,
    errorCount: 27,
    topEndpoints: [
      { name: '/api/v1/analytics', calls: 1240 },
      { name: '/api/v1/mentions', calls: 980 },
      { name: '/api/v1/search', calls: 750 },
    ],
  },
  {
    id: 2,
    period: 'Last 30 days',
    totalCalls: 14680,
    successRate: 98.9,
    avgResponseTime: 152,
    errorCount: 162,
    topEndpoints: [
      { name: '/api/v1/analytics', calls: 5320 },
      { name: '/api/v1/mentions', calls: 4210 },
      { name: '/api/v1/search', calls: 3180 },
    ],
  },
  {
    id: 3,
    period: 'Last 90 days',
    totalCalls: 42150,
    successRate: 98.7,
    avgResponseTime: 148,
    errorCount: 548,
    topEndpoints: [
      { name: '/api/v1/analytics', calls: 15240 },
      { name: '/api/v1/mentions', calls: 12810 },
      { name: '/api/v1/search', calls: 9120 },
    ],
  },
]

function TokenDetailsPage() {
  const { tokenId } = useParams()
  const navigate = useNavigate()
  const token = MOCK_TOKENS[tokenId]
  const [timePeriod, setTimePeriod] = useState('12months')

  // If token not found, redirect back
  useEffect(() => {
    if (!token) {
      navigate('/api-tokens')
    }
  }, [token, navigate])

  // Don't render if token not found
  if (!token) {
    return null
  }

  return (
    <Box>
      {/* Back navigation toolbar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
          pb: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton onClick={() => navigate('/api-tokens')} size="small">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {token.name}
          </Typography>
        </Stack>

        <TextField
          select
          size="small"
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
          sx={{ minWidth: 180 }}
          InputProps={{
            startAdornment: <CalendarTodayIcon sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />,
          }}
        >
          <MenuItem value="7days">Last 7 days</MenuItem>
          <MenuItem value="30days">Last 30 days</MenuItem>
          <MenuItem value="3months">Last 3 months</MenuItem>
          <MenuItem value="6months">Last 6 months</MenuItem>
          <MenuItem value="12months">Last 12 months</MenuItem>
        </TextField>
      </Box>

      {/* UTC timezone alert */}
      <Alert severity="warning" sx={{ mb: 3 }}>
        All timestamps are displayed in UTC timezone.
      </Alert>

      {/* Listening API Limits Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Listening API Limits
        </Typography>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: 'center',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 600, mb: 1 }}>
            0/1K
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5}>
            <Typography variant="body2" color="text.secondary">
              Analytics calls per day
            </Typography>
            <Tooltip title="Number of analytics API calls made today out of your daily limit">
              <IconButton size="small" sx={{ color: 'text.secondary' }}>
                <Typography variant="body2">ⓘ</Typography>
              </IconButton>
            </Tooltip>
          </Stack>
        </Paper>
      </Box>

      {/* Usage Data Cards */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Usage Statistics
        </Typography>
        <Stack spacing={2}>
          {MOCK_USAGE_DATA.map((data) => (
            <Card key={data.id} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                {/* Period Header */}
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  {data.period}
                </Typography>

                <Divider sx={{ mb: 2 }} />

                {/* Stats Grid */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 3,
                    mb: 3,
                  }}
                >
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                      Total API Calls
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {data.totalCalls.toLocaleString()}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                      Success Rate
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.main' }}>
                      {data.successRate}%
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                      Avg Response Time
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {data.avgResponseTime}ms
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                      Error Count
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'error.main' }}>
                      {data.errorCount}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ mb: 2 }} />

                {/* Top Endpoints */}
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
                    Top Endpoints
                  </Typography>
                  <Stack spacing={1}>
                    {data.topEndpoints.map((endpoint, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                          {endpoint.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {endpoint.calls.toLocaleString()} calls
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}

export default TokenDetailsPage

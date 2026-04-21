import { useState, useMemo } from 'react'
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Alert,
  Stack,
  CircularProgress,
  Tooltip,
  FormControl,
  Select,
  MenuItem,
  Avatar,
  Checkbox,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'
import EditOutlined from '@mui/icons-material/EditOutlined'
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import TableHeader from '../components/core/TableHeader'

// Mock initial tokens - sorted alphabetically by name (P0: alphabetical order by label)
const INITIAL_TOKENS = [
  {
    id: 5,
    name: 'Analytics Dashboard',
    created: '2025-07-22',
    lastUsed: '2025-10-28',
    createdBy: 'Jessica Martinez',
    apiCalls: 489,
  },
  {
    id: 6,
    name: 'CI/CD Pipeline',
    created: '2025-06-18',
    lastUsed: 'Never',
    createdBy: 'Alex Thompson',
    apiCalls: 0,
  },
  {
    id: 2,
    name: 'Development API',
    created: '2025-10-20',
    lastUsed: '2025-11-06',
    createdBy: 'Michael Chen',
    apiCalls: 342,
  },
  {
    id: 4,
    name: 'Mobile App Integration',
    created: '2025-08-05',
    lastUsed: '2025-11-06',
    createdBy: 'David Kim',
    apiCalls: 2103,
  },
  {
    id: 1,
    name: 'Production API',
    created: '2025-10-15',
    lastUsed: '2025-11-05',
    createdBy: 'Sarah Johnson',
    apiCalls: 1247,
  },
  {
    id: 3,
    name: 'Staging Environment',
    created: '2025-09-12',
    lastUsed: '2025-11-04',
    createdBy: 'Emily Rodriguez',
    apiCalls: 856,
  },
].sort((a, b) => a.name.localeCompare(b.name)) // P0: alphabetical order

// Mock usage data for chart
const generateUsageData = () => {
  const data = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      calls: Math.floor(Math.random() * 500) + 100,
    })
  }
  return data
}

// Resource cards data
const RESOURCES = [
  {
    id: 1,
    title: 'Getting Started with API Tokens',
    source: 'Documentation',
    time: '5 min read',
    description: 'Learn how to generate and manage API tokens for secure programmatic access to your account.',
  },
  {
    id: 2,
    title: 'API Authentication Best Practices',
    source: 'Security Guide',
    time: '8 min read',
    description: 'Follow these security best practices when working with API tokens to protect your data and applications.',
  },
  {
    id: 3,
    title: 'Rate Limits and Usage Guidelines',
    source: 'API Reference',
    time: '3 min read',
    description: 'Understand rate limits, usage quotas, and how to monitor your API consumption effectively.',
  },
]

function ApiTokensPageV2() {
  const [tokens, setTokens] = useState(INITIAL_TOKENS)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogStep, setDialogStep] = useState(1)
  const [tokenName, setTokenName] = useState('')
  const [tokenNameError, setTokenNameError] = useState('')
  const [generatedToken, setGeneratedToken] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copiedToken, setCopiedToken] = useState(false)
  const [dateRange, setDateRange] = useState('7days')
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [tokenToRevoke, setTokenToRevoke] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTokens, setSelectedTokens] = useState([])

  const usageData = useMemo(() => generateUsageData(), [])
  const totalCalls = useMemo(() => usageData.reduce((sum, d) => sum + d.calls, 0), [usageData])
  const maxCalls = useMemo(() => Math.max(...usageData.map(d => d.calls)), [usageData])

  // Filter tokens based on search
  const filteredTokens = useMemo(() => {
    if (!searchQuery) return tokens
    const query = searchQuery.toLowerCase()
    return tokens.filter(
      (t) =>
        t.name.toLowerCase().includes(query) ||
        t.createdBy.toLowerCase().includes(query)
    )
  }, [tokens, searchQuery])

  const handleOpenDialog = () => {
    setDialogOpen(true)
    setDialogStep(1)
    setTokenName('')
    setTokenNameError('')
    setGeneratedToken('')
    setCopiedToken(false)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setDialogStep(1)
    setTokenName('')
    setTokenNameError('')
    setGeneratedToken('')
  }

  const validateTokenName = (name) => {
    const trimmedName = name.trim()
    if (!trimmedName) {
      return 'Token name is required'
    }
    const exists = tokens.some(t => t.name.toLowerCase() === trimmedName.toLowerCase())
    if (exists) {
      return 'A token with this name already exists. Each token must have a unique label.'
    }
    return ''
  }

  const handleTokenNameChange = (e) => {
    const value = e.target.value
    setTokenName(value)
    setTokenNameError(validateTokenName(value))
  }

  const handleGenerateToken = () => {
    const error = validateTokenName(tokenName)
    if (error) {
      setTokenNameError(error)
      return
    }

    setIsGenerating(true)
    setDialogStep(2)

    setTimeout(() => {
      const newToken = `sk_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
      setGeneratedToken(newToken)
      setIsGenerating(false)

      const newTokenObj = {
        id: tokens.length + 1,
        name: tokenName.trim(),
        created: new Date().toISOString().split('T')[0],
        lastUsed: 'Never',
        createdBy: 'Current User',
        apiCalls: 0,
      }
      const updatedTokens = [...tokens, newTokenObj].sort((a, b) => a.name.localeCompare(b.name))
      setTokens(updatedTokens)
    }, 1500)
  }

  const handleCopyToken = () => {
    navigator.clipboard.writeText(generatedToken)
    setCopiedToken(true)
    setTimeout(() => setCopiedToken(false), 2000)
  }

  const handleRevokeClick = (token) => {
    setTokenToRevoke(token)
    setConfirmDialogOpen(true)
  }

  const handleConfirmRevoke = () => {
    if (tokenToRevoke) {
      setTokens(tokens.filter((token) => token.id !== tokenToRevoke.id))
      setSelectedTokens(selectedTokens.filter((id) => id !== tokenToRevoke.id))
    }
    setConfirmDialogOpen(false)
    setTokenToRevoke(null)
  }

  const handleCancelRevoke = () => {
    setConfirmDialogOpen(false)
    setTokenToRevoke(null)
  }

  // Selection handlers
  const handleSelectAll = (e) => {
    setSelectedTokens(e.target.checked ? filteredTokens.map((t) => t.id) : [])
  }

  const handleSelectOne = (id) => {
    setSelectedTokens((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const handleClearSelection = () => {
    setSelectedTokens([])
  }

  const handleBulkRevoke = () => {
    if (window.confirm(`Are you sure you want to revoke ${selectedTokens.length} token(s)? This action cannot be undone.`)) {
      setTokens(tokens.filter((t) => !selectedTokens.includes(t.id)))
      setSelectedTokens([])
    }
  }

  const canGenerateMore = tokens.length < 10

  // Subtitle alert based on token count
  const getSubtitleAlert = () => {
    if (!canGenerateMore) {
      return (
        <Alert severity="warning" sx={{ borderRadius: 0 }}>
          You have reached the maximum limit of 10 API tokens. Please revoke an existing token to generate a new one.
        </Alert>
      )
    }
    return (
      <Alert severity="info" sx={{ borderRadius: 0 }}>
        Your account has a limit of 10 API tokens total. You have {10 - tokens.length} remaining.
      </Alert>
    )
  }

  return (
    <Box sx={{ height: 'calc(100vh)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Main Content Area */}
      <Box sx={{ backgroundColor: 'grey.100', flex: 1, px: 3, pt: 3, overflow: 'auto' }}>
        <Box sx={{ maxWidth: 1536, mx: 'auto' }}>

          {/* Token Usage Chart Card */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 3,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  API Usage
                </Typography>
                <Tooltip title="Total API calls made using your tokens">
                  <IconButton size="small" sx={{ color: 'text.secondary' }}>
                    <Typography variant="body2">ⓘ</Typography>
                  </IconButton>
                </Tooltip>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                  variant="text"
                  size="small"
                  endIcon={<OpenInNewIcon sx={{ fontSize: 14 }} />}
                  sx={{ textTransform: 'none', fontWeight: 500 }}
                >
                  View all usage
                </Button>
                <FormControl size="small">
                  <Select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    displayEmpty
                    variant="outlined"
                    startAdornment={<CalendarTodayIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />}
                    sx={{
                      minWidth: 140,
                      fontSize: 14,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'divider',
                      },
                    }}
                  >
                    <MenuItem value="7days">Last 7 days</MenuItem>
                    <MenuItem value="30days">Last 30 days</MenuItem>
                    <MenuItem value="90days">Last 90 days</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {/* Metrics Row */}
            <Box sx={{ display: 'flex', gap: 6, mb: 3 }}>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                  Total API Calls
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 0.25 }}>
                  {totalCalls.toLocaleString()}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <TrendingUpIcon sx={{ fontSize: 14, color: 'success.main' }} />
                  <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 500 }}>
                    +12%
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
                    vs previous period
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                  Active Tokens
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 0.25 }}>
                  {tokens.filter(t => t.lastUsed !== 'Never').length}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  of {tokens.length} total
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                  Daily Average
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 0.25 }}>
                  {Math.round(totalCalls / 7).toLocaleString()}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  calls per day
                </Typography>
              </Box>
            </Box>

            {/* Simple Bar Chart */}
            <Box sx={{ mt: 3 }}>
              <Box sx={{ height: 120, display: 'flex', alignItems: 'flex-end', gap: 1 }}>
                {usageData.map((day, index) => (
                  <Box
                    key={index}
                    sx={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        maxWidth: 60,
                        height: `${(day.calls / maxCalls) * 100}px`,
                        backgroundColor: 'primary.main',
                        borderRadius: '4px 4px 0 0',
                        minHeight: 4,
                      }}
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                {usageData.map((day, index) => (
                  <Box key={index} sx={{ flex: 1, textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      {day.date}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Paper>

          {/* Tokens Table */}
          {tokens.length > 0 ? (
            <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 3 }}>
              <TableHeader
                title="Tokens"
                count={filteredTokens.length}
                infotip="API tokens allow programmatic access to your account. Each token must have a unique label."
                primaryAction={{
                  label: 'Generate Token',
                  icon: <AddIcon />,
                  onClick: handleOpenDialog,
                  disabled: !canGenerateMore,
                }}
                showFind={true}
                findValue={searchQuery}
                onFindChange={setSearchQuery}
                subtitle={getSubtitleAlert()}
                selectedCount={selectedTokens.length}
                onClearSelection={handleClearSelection}
                selectedActions={[
                  {
                    label: 'Revoke',
                    icon: <DeleteOutlined />,
                    onClick: handleBulkRevoke,
                  },
                ]}
                itemLabel="Tokens"
              />

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Tooltip title={selectedTokens.length === filteredTokens.length ? 'Deselect all' : 'Select all'}>
                          <Checkbox
                            indeterminate={
                              selectedTokens.length > 0 && selectedTokens.length < filteredTokens.length
                            }
                            checked={
                              filteredTokens.length > 0 && selectedTokens.length === filteredTokens.length
                            }
                            onChange={handleSelectAll}
                          />
                        </Tooltip>
                      </TableCell>
                      <TableCell sx={{
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          right: 0,
                          top: '25%',
                          height: '50%',
                          width: '1px',
                          backgroundColor: 'divider'
                        }
                      }}><strong>Label / Name</strong></TableCell>
                      <TableCell sx={{
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          right: 0,
                          top: '25%',
                          height: '50%',
                          width: '1px',
                          backgroundColor: 'divider'
                        }
                      }}><strong>Associated User</strong></TableCell>
                      <TableCell sx={{
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          right: 0,
                          top: '25%',
                          height: '50%',
                          width: '1px',
                          backgroundColor: 'divider'
                        }
                      }}><strong>Created At</strong></TableCell>
                      <TableCell sx={{
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          right: 0,
                          top: '25%',
                          height: '50%',
                          width: '1px',
                          backgroundColor: 'divider'
                        }
                      }}><strong>Last Active</strong></TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredTokens.map((token) => (
                      <TableRow
                        key={token.id}
                        hover
                        selected={selectedTokens.includes(token.id)}
                        sx={{
                          '& .action-buttons': {
                            opacity: 0,
                          },
                          '&:hover .action-buttons': {
                            opacity: 1,
                          },
                        }}
                      >
                        <TableCell padding="checkbox">
                          <Tooltip title={selectedTokens.includes(token.id) ? 'Deselect' : 'Select'}>
                            <Checkbox
                              checked={selectedTokens.includes(token.id)}
                              onChange={() => handleSelectOne(token.id)}
                            />
                          </Tooltip>
                        </TableCell>
                        <TableCell>{token.name}</TableCell>
                        <TableCell>{token.createdBy}</TableCell>
                        <TableCell>{token.created}</TableCell>
                        <TableCell>{token.lastUsed}</TableCell>
                        <TableCell align="right">
                          <Stack direction="row" spacing={0.5} justifyContent="flex-end" className="action-buttons">
                            <Tooltip title="Edit Token">
                              <IconButton size="small">
                                <EditOutlined fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="See Usage">
                              <IconButton size="small">
                                <BarChartOutlinedIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Revoke Token">
                              <IconButton
                                size="small"
                                onClick={() => handleRevokeClick(token)}
                              >
                                <DeleteOutlined fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Box
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: 'background.default'
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    End of list • {filteredTokens.length} {filteredTokens.length === 1 ? 'token' : 'tokens'} total
                  </Typography>
                </Box>
              </TableContainer>
            </Paper>
          ) : (
            <Paper elevation={0} sx={{ p: 8, textAlign: 'center', border: '1px solid', borderColor: 'divider', mb: 3 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No API Tokens Yet
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Generate your first API token to get started with programmatic access.
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
                onClick={handleOpenDialog}
              >
                Generate API Token
              </Button>
            </Paper>
          )}

          {/* Guides and Resources Section */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Guides and Resources
            </Typography>

            <Box sx={{ display: 'flex', gap: 2 }}>
              {RESOURCES.map((resource) => (
                <Paper
                  key={resource.id}
                  elevation={0}
                  sx={{
                    flex: 1,
                    display: 'flex',
                    border: '1px solid',
                    borderColor: 'divider',
                    overflow: 'hidden',
                    '&:hover': {
                      borderColor: 'primary.main',
                      cursor: 'pointer',
                    },
                  }}
                >
                  <Box sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: 'primary.light',
                          color: 'primary.main',
                        }}
                      >
                        {resource.source.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                          {resource.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {resource.source} • {resource.time}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        flex: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {resource.description}
                    </Typography>

                    <Button
                      variant="outlined"
                      size="small"
                      endIcon={<OpenInNewIcon sx={{ fontSize: 14 }} />}
                      sx={{
                        textTransform: 'none',
                        alignSelf: 'flex-start',
                      }}
                    >
                      Read More
                    </Button>
                  </Box>

                  <Box
                    sx={{
                      width: 140,
                      backgroundColor: 'grey.200',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        backgroundColor: 'grey.300',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10 }}>
                        ✕
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Box>

        </Box>
      </Box>

      {/* Token Generation Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        disableEscapeKeyDown={dialogStep === 2 && isGenerating}
      >
        {dialogStep === 1 && (
          <>
            <DialogTitle>Generate New API Token</DialogTitle>
            <DialogContent>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Enter a unique name for the token. This name will help you identify the token later.
              </Typography>
              <TextField
                autoFocus
                fullWidth
                label="Token Name"
                placeholder="e.g., Production API, Development API"
                value={tokenName}
                onChange={handleTokenNameChange}
                error={!!tokenNameError}
                helperText={tokenNameError || 'Each token must have a unique label'}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button
                variant="contained"
                onClick={handleGenerateToken}
                disabled={!tokenName.trim() || !!tokenNameError}
              >
                Generate
              </Button>
            </DialogActions>
          </>
        )}

        {dialogStep === 2 && (
          <>
            <DialogTitle>Your API Token</DialogTitle>
            <DialogContent>
              {isGenerating ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <CircularProgress size={48} />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    Generating your token...
                  </Typography>
                </Box>
              ) : (
                <>
                  <Alert severity="warning" sx={{ mb: 3 }}>
                    Make sure you copy the token now. For security reasons, you will not be able to view it again after closing this dialog.
                  </Alert>

                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      backgroundColor: 'background.default',
                      fontFamily: 'monospace',
                      wordBreak: 'break-all',
                      position: 'relative',
                    }}
                  >
                    <Typography variant="body2" sx={{ pr: 5 }}>
                      {generatedToken}
                    </Typography>
                    <Tooltip title={copiedToken ? 'Copied!' : 'Copy to clipboard'}>
                      <IconButton
                        size="small"
                        onClick={handleCopyToken}
                        sx={{ position: 'absolute', top: 8, right: 8 }}
                        color={copiedToken ? 'success' : 'default'}
                      >
                        <ContentCopyIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Paper>

                  {copiedToken && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                      Token copied to clipboard!
                    </Alert>
                  )}
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={handleCloseDialog} disabled={isGenerating}>
                Done
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Revoke Confirmation Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={handleCancelRevoke}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Revoke API Token?</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Are you sure you want to revoke <strong>{tokenToRevoke?.name}</strong>? This action cannot be undone and any applications using this token will lose access immediately.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelRevoke}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmRevoke}
          >
            Revoke Token
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ApiTokensPageV2

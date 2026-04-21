import { useState } from 'react'
import { Box, Container, Typography, Button, Card, CardContent, CardMedia, IconButton, TextField, Chip, InputAdornment, Tabs, Tab, Stepper, Step, StepLabel, Select, MenuItem, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions, Avatar, Rating, LinearProgress, Divider, Switch, FormControlLabel, Grid } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import Indicator from '../../components/core/Indicator'
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded'
import SearchIcon from '@mui/icons-material/SearchRounded'
import CheckCircleIcon from '@mui/icons-material/CheckCircleRounded'
import ErrorIcon from '@mui/icons-material/ErrorRounded'
import SettingsIcon from '@mui/icons-material/SettingsRounded'
import SyncIcon from '@mui/icons-material/SyncRounded'
import PauseIcon from '@mui/icons-material/PauseRounded'
import PlayArrowIcon from '@mui/icons-material/PlayArrowRounded'
import RefreshIcon from '@mui/icons-material/RefreshRounded'
import MoreVertIcon from '@mui/icons-material/MoreVertRounded'
import OpenInNewIcon from '@mui/icons-material/OpenInNewRounded'
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardRounded'
import CloseIcon from '@mui/icons-material/CloseRounded'
import LinkIcon from '@mui/icons-material/LinkRounded'
import StorageIcon from '@mui/icons-material/StorageRounded'

const categories = ['All', 'CRM', 'Marketing', 'Finance', 'HR', 'Productivity', 'Developer Tools']

const integrations = [
  { id: 1, name: 'Salesforce', category: 'CRM', description: 'Sync contacts, leads, and opportunities', rating: 4.8, reviews: 234, connected: true, status: 'active', logo: 'SF' },
  { id: 2, name: 'HubSpot', category: 'Marketing', description: 'Marketing automation and CRM integration', rating: 4.6, reviews: 189, connected: true, status: 'error', logo: 'HS' },
  { id: 3, name: 'Slack', category: 'Productivity', description: 'Send notifications and collaborate', rating: 4.9, reviews: 456, connected: false, status: null, logo: 'SL', featured: true },
  { id: 4, name: 'QuickBooks', category: 'Finance', description: 'Financial data sync and invoicing', rating: 4.5, reviews: 123, connected: false, status: null, logo: 'QB' },
  { id: 5, name: 'Jira', category: 'Developer Tools', description: 'Issue tracking and project management', rating: 4.7, reviews: 312, connected: true, status: 'active', logo: 'JR' },
  { id: 6, name: 'Workday', category: 'HR', description: 'HR and payroll integration', rating: 4.4, reviews: 87, connected: false, status: null, logo: 'WD' },
  { id: 7, name: 'Mailchimp', category: 'Marketing', description: 'Email marketing campaigns', rating: 4.5, reviews: 201, connected: false, status: null, logo: 'MC', featured: true },
  { id: 8, name: 'GitHub', category: 'Developer Tools', description: 'Code repository and CI/CD', rating: 4.8, reviews: 278, connected: true, status: 'active', logo: 'GH' },
  { id: 9, name: 'Stripe', category: 'Finance', description: 'Payment processing and billing', rating: 4.7, reviews: 345, connected: false, status: null, logo: 'ST' },
  { id: 10, name: 'Zendesk', category: 'CRM', description: 'Customer support ticketing', rating: 4.6, reviews: 167, connected: false, status: null, logo: 'ZD' },
  { id: 11, name: 'Google Workspace', category: 'Productivity', description: 'Calendar, Drive, and Gmail sync', rating: 4.8, reviews: 423, connected: true, status: 'paused', logo: 'GW' },
  { id: 12, name: 'Microsoft 365', category: 'Productivity', description: 'Office apps and OneDrive integration', rating: 4.7, reviews: 389, connected: false, status: null, logo: 'MS' },
]

const syncLogs = [
  { id: 1, time: '2024-11-24 10:30:00', integration: 'Salesforce', action: 'Sync contacts', records: 125, status: 'success' },
  { id: 2, time: '2024-11-24 10:15:00', integration: 'GitHub', action: 'Sync issues', records: 43, status: 'success' },
  { id: 3, time: '2024-11-24 10:00:00', integration: 'HubSpot', action: 'Sync leads', records: 0, status: 'error', error: 'Authentication expired' },
  { id: 4, time: '2024-11-24 09:30:00', integration: 'Jira', action: 'Sync projects', records: 12, status: 'success' },
]

const fieldMappings = [
  { source: 'FirstName', target: 'first_name', type: 'text' },
  { source: 'LastName', target: 'last_name', type: 'text' },
  { source: 'Email', target: 'email', type: 'email' },
  { source: 'Phone', target: 'phone_number', type: 'phone' },
  { source: 'Company', target: 'company_name', type: 'text' },
]

function IntegrationMarketplaceTemplate() {
  const [currentTab, setCurrentTab] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIntegration, setSelectedIntegration] = useState(null)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [setupDialogOpen, setSetupDialogOpen] = useState(false)
  const [setupStep, setSetupStep] = useState(0)

  const filteredIntegrations = integrations.filter((int) => {
    const matchesCategory = selectedCategory === 'All' || int.category === selectedCategory
    const matchesSearch = int.name.toLowerCase().includes(searchQuery.toLowerCase())
    if (currentTab === 1) return matchesCategory && matchesSearch && int.connected
    return matchesCategory && matchesSearch
  })

  const getStatusChip = (status) => {
    switch (status) {
      case 'active': return <Indicator label="Active" size="small" status="success" />
      case 'error': return <Indicator label="Error" size="small" status="error" />
      case 'paused': return <Indicator label="Paused" size="small" status="warning" />
      default: return null
    }
  }

  const openDetail = (integration) => {
    setSelectedIntegration(integration)
    setDetailDialogOpen(true)
  }

  const openSetup = (integration) => {
    setSelectedIntegration(integration)
    setSetupStep(0)
    setSetupDialogOpen(true)
  }

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
              <Typography variant="h5" sx={{ fontWeight: 700 }}>Integration Marketplace</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Tabs */}
      <Box sx={{ backgroundColor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="xl">
          <Tabs value={currentTab} onChange={(e, v) => setCurrentTab(v)}>
            <Tab label="Browse Marketplace" sx={{ textTransform: 'none' }} />
            <Tab label={`My Integrations (${integrations.filter(i => i.connected).length})`} sx={{ textTransform: 'none' }} />
          </Tabs>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Search & Filters */}
        <Box sx={{ mb: 4, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search integrations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ flex: 1, minWidth: 300 }}
            size="small"
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
            }}
          />
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                variant={selectedCategory === cat ? 'filled' : 'outlined'}
                color={selectedCategory === cat ? 'primary' : 'default'}
                onClick={() => setSelectedCategory(cat)}
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Box>
        </Box>

        {currentTab === 0 && (
          <>
            {/* Featured Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Featured Integrations</Typography>
              <Grid container spacing={3}>
                {integrations.filter(i => i.featured).map((integration) => (
                  <Grid size={{ xs: 12, md: 6 }} key={integration.id}>
                    <Card sx={{ display: 'flex', p: 3, cursor: 'pointer', '&:hover': { boxShadow: 4 } }} onClick={() => openDetail(integration)}>
                      <Avatar sx={{ width: 64, height: 64, backgroundColor: 'primary.light', color: 'primary.main', fontSize: 20, fontWeight: 700, mr: 3 }}>
                        {integration.logo}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>{integration.name}</Typography>
                          <Indicator label="Featured" size="small" color="cyan" />
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{integration.description}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Rating value={integration.rating} precision={0.1} size="small" readOnly />
                          <Typography variant="caption" color="text.secondary">({integration.reviews} reviews)</Typography>
                        </Box>
                      </Box>
                      <Button variant="outlined" onClick={(e) => { e.stopPropagation(); openSetup(integration) }} sx={{ textTransform: 'none', alignSelf: 'center' }}>
                        Connect
                      </Button>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* All Integrations */}
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>All Integrations</Typography>
          </>
        )}

        {/* Integration Grid */}
        <Grid container spacing={3}>
          {filteredIntegrations.map((integration) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 3 }} key={integration.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer', '&:hover': { boxShadow: 4 } }} onClick={() => openDetail(integration)}>
                <CardContent sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                    <Avatar sx={{ width: 48, height: 48, backgroundColor: 'grey.100', color: 'text.primary', fontWeight: 700 }}>
                      {integration.logo}
                    </Avatar>
                    {integration.connected && getStatusChip(integration.status)}
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>{integration.name}</Typography>
                  <Chip label={integration.category} size="small" variant="outlined" sx={{ mb: 1 }} />
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{integration.description}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Rating value={integration.rating} precision={0.1} size="small" readOnly />
                    <Typography variant="caption" color="text.secondary">({integration.reviews})</Typography>
                  </Box>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  {integration.connected ? (
                    <Button variant="outlined" fullWidth startIcon={<SettingsIcon />} onClick={(e) => { e.stopPropagation(); openDetail(integration) }} sx={{ textTransform: 'none' }}>
                      Configure
                    </Button>
                  ) : (
                    <Button variant="contained" fullWidth onClick={(e) => { e.stopPropagation(); openSetup(integration) }} sx={{ textTransform: 'none' }}>
                      Connect
                    </Button>
                  )}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* My Integrations - Sync Logs */}
        {currentTab === 1 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Recent Sync Activity</Typography>
            <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
              {syncLogs.map((log, i) => (
                <Box key={log.id} sx={{ p: 2, display: 'flex', alignItems: 'center', borderBottom: i < syncLogs.length - 1 ? '1px solid' : 'none', borderColor: 'divider' }}>
                  {log.status === 'success' ? (
                    <CheckCircleIcon sx={{ color: 'success.main', mr: 2 }} />
                  ) : (
                    <ErrorIcon sx={{ color: 'error.main', mr: 2 }} />
                  )}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{log.integration} - {log.action}</Typography>
                    <Typography variant="caption" color="text.secondary">{log.time}</Typography>
                  </Box>
                  {log.status === 'success' ? (
                    <Typography variant="body2" color="text.secondary">{log.records} records</Typography>
                  ) : (
                    <Typography variant="body2" color="error">{log.error}</Typography>
                  )}
                </Box>
              ))}
            </Card>
          </Box>
        )}
      </Container>

      {/* Integration Detail Dialog */}
      <Dialog open={detailDialogOpen} onClose={() => setDetailDialogOpen(false)} maxWidth="md" fullWidth>
        {selectedIntegration && (
          <>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ width: 48, height: 48, backgroundColor: 'grey.100', color: 'text.primary', fontWeight: 700 }}>
                {selectedIntegration.logo}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>{selectedIntegration.name}</Typography>
                <Typography variant="body2" color="text.secondary">{selectedIntegration.category}</Typography>
              </Box>
              <IconButton onClick={() => setDetailDialogOpen(false)}><CloseIcon /></IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Typography variant="body1" sx={{ mb: 3 }}>{selectedIntegration.description}</Typography>

              {selectedIntegration.connected && (
                <>
                  <Box sx={{ mb: 3, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Connection Status</Typography>
                      {getStatusChip(selectedIntegration.status)}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 3 }}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Last Sync</Typography>
                        <Typography variant="body2">10 minutes ago</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Sync Frequency</Typography>
                        <Typography variant="body2">Every 15 minutes</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Records Synced</Typography>
                        <Typography variant="body2">1,234</Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Field Mappings</Typography>
                  <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, mb: 3 }}>
                    <Box sx={{ display: 'flex', backgroundColor: 'grey.50', p: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="caption" sx={{ flex: 1, fontWeight: 600 }}>Source Field</Typography>
                      <Typography variant="caption" sx={{ width: 40, textAlign: 'center' }}></Typography>
                      <Typography variant="caption" sx={{ flex: 1, fontWeight: 600 }}>Target Field</Typography>
                    </Box>
                    {fieldMappings.map((mapping, i) => (
                      <Box key={i} sx={{ display: 'flex', alignItems: 'center', p: 1.5, borderBottom: i < fieldMappings.length - 1 ? '1px solid' : 'none', borderColor: 'divider' }}>
                        <Typography variant="body2" sx={{ flex: 1 }}>{mapping.source}</Typography>
                        <ArrowForwardIcon sx={{ color: 'text.secondary', mx: 1 }} />
                        <Typography variant="body2" sx={{ flex: 1 }}>{mapping.target}</Typography>
                      </Box>
                    ))}
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="outlined" startIcon={<RefreshIcon />} sx={{ textTransform: 'none' }}>Sync Now</Button>
                    {selectedIntegration.status === 'active' ? (
                      <Button variant="outlined" startIcon={<PauseIcon />} sx={{ textTransform: 'none' }}>Pause</Button>
                    ) : (
                      <Button variant="outlined" startIcon={<PlayArrowIcon />} sx={{ textTransform: 'none' }}>Resume</Button>
                    )}
                    <Button variant="outlined" color="error" sx={{ textTransform: 'none', ml: 'auto' }}>Disconnect</Button>
                  </Box>
                </>
              )}

              {!selectedIntegration.connected && (
                <>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Features</Typography>
                  <Box sx={{ mb: 3 }}>
                    {['Two-way data sync', 'Real-time updates', 'Custom field mapping', 'Webhook support'].map((feature) => (
                      <Box key={feature} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <CheckCircleIcon sx={{ color: 'success.main', fontSize: 18 }} />
                        <Typography variant="body2">{feature}</Typography>
                      </Box>
                    ))}
                  </Box>

                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Requirements</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    You'll need admin access to your {selectedIntegration.name} account to complete the integration.
                  </Typography>
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDetailDialogOpen(false)} sx={{ textTransform: 'none' }}>Close</Button>
              {!selectedIntegration.connected && (
                <Button variant="contained" onClick={() => { setDetailDialogOpen(false); openSetup(selectedIntegration) }} sx={{ textTransform: 'none' }}>
                  Connect Now
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Setup Wizard Dialog */}
      <Dialog open={setupDialogOpen} onClose={() => setSetupDialogOpen(false)} maxWidth="md" fullWidth>
        {selectedIntegration && (
          <>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ width: 40, height: 40, backgroundColor: 'grey.100', color: 'text.primary', fontWeight: 700 }}>
                {selectedIntegration.logo}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Connect {selectedIntegration.name}</Typography>
              </Box>
              <IconButton onClick={() => setSetupDialogOpen(false)}><CloseIcon /></IconButton>
            </DialogTitle>
            <DialogContent>
              <Stepper activeStep={setupStep} sx={{ mb: 4 }}>
                {['Authenticate', 'Configure', 'Map Fields', 'Sync Settings', 'Test'].map((label) => (
                  <Step key={label}><StepLabel>{label}</StepLabel></Step>
                ))}
              </Stepper>

              {setupStep === 0 && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <LinkIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" sx={{ mb: 1 }}>Connect your {selectedIntegration.name} account</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    You'll be redirected to {selectedIntegration.name} to authorize the connection.
                  </Typography>
                  <Button variant="contained" startIcon={<OpenInNewIcon />} sx={{ textTransform: 'none' }}>
                    Connect with {selectedIntegration.name}
                  </Button>
                </Box>
              )}

              {setupStep === 1 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Select accounts to sync</Typography>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Main Account" />
                  <FormControlLabel control={<Checkbox />} label="Sandbox Account" />
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Data to sync</Typography>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Contacts" />
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Companies" />
                  <FormControlLabel control={<Checkbox />} label="Deals" />
                  <FormControlLabel control={<Checkbox />} label="Activities" />
                </Box>
              )}

              {setupStep === 2 && (
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Map fields between systems</Typography>
                  <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                    <Box sx={{ display: 'flex', backgroundColor: 'grey.50', p: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="caption" sx={{ flex: 1, fontWeight: 600 }}>{selectedIntegration.name} Field</Typography>
                      <Typography variant="caption" sx={{ flex: 1, fontWeight: 600 }}>Your Field</Typography>
                    </Box>
                    {fieldMappings.map((mapping, i) => (
                      <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1.5, borderBottom: i < fieldMappings.length - 1 ? '1px solid' : 'none', borderColor: 'divider' }}>
                        <Typography variant="body2" sx={{ flex: 1 }}>{mapping.source}</Typography>
                        <FormControl size="small" sx={{ flex: 1 }}>
                          <Select defaultValue={mapping.target}>
                            <MenuItem value={mapping.target}>{mapping.target}</MenuItem>
                            <MenuItem value="custom">Custom field...</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}

              {setupStep === 3 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Sync settings</Typography>
                  <FormControl fullWidth size="small">
                    <InputLabel>Sync frequency</InputLabel>
                    <Select label="Sync frequency" defaultValue="15">
                      <MenuItem value="5">Every 5 minutes</MenuItem>
                      <MenuItem value="15">Every 15 minutes</MenuItem>
                      <MenuItem value="60">Every hour</MenuItem>
                      <MenuItem value="manual">Manual only</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth size="small">
                    <InputLabel>Sync direction</InputLabel>
                    <Select label="Sync direction" defaultValue="both">
                      <MenuItem value="both">Two-way sync</MenuItem>
                      <MenuItem value="import">Import only</MenuItem>
                      <MenuItem value="export">Export only</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControlLabel control={<Switch defaultChecked />} label="Enable real-time webhooks" />
                </Box>
              )}

              {setupStep === 4 && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <CheckCircleIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
                  <Typography variant="h6" sx={{ mb: 1 }}>Connection successful!</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Your {selectedIntegration.name} integration is now active. The first sync will begin shortly.
                  </Typography>
                  <LinearProgress sx={{ maxWidth: 300, mx: 'auto', mb: 2 }} />
                  <Typography variant="caption" color="text.secondary">Syncing data...</Typography>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              {setupStep > 0 && setupStep < 4 && (
                <Button onClick={() => setSetupStep(setupStep - 1)} sx={{ textTransform: 'none' }}>Back</Button>
              )}
              <Box sx={{ flex: 1 }} />
              {setupStep < 4 ? (
                <Button variant="contained" onClick={() => setSetupStep(setupStep + 1)} sx={{ textTransform: 'none' }}>
                  {setupStep === 3 ? 'Complete Setup' : 'Continue'}
                </Button>
              ) : (
                <Button variant="contained" onClick={() => setSetupDialogOpen(false)} sx={{ textTransform: 'none' }}>
                  Done
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  )
}

export default IntegrationMarketplaceTemplate

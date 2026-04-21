import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  IconButton,
  TextField,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Avatar,
  Switch,
  LinearProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
} from '@mui/material'
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Business as BusinessIcon,
  People as PeopleIcon,
  Storage as StorageIcon,
  Speed as SpeedIcon,
  Settings as SettingsIcon,
  Block as BlockIcon,
  CheckCircle as ActiveIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  CloudQueue as CloudIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Api as ApiIcon,
  Assessment as MetricsIcon,
  Schedule as ScheduleIcon,
  Dns as DnsIcon,
  VpnKey as KeyIcon,
  ContentCopy as CopyIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  MoreVert as MoreIcon,
  Launch as LaunchIcon,
} from '@mui/icons-material'
import Indicator from '../../components/core/Indicator'

// Mock data
const mockTenants = [
  {
    id: 1,
    name: 'Acme Corporation',
    subdomain: 'acme',
    plan: 'Enterprise',
    status: 'active',
    users: 156,
    storage: 45.2,
    storageLimit: 100,
    apiCalls: 124500,
    apiLimit: 500000,
    mrr: 2499,
    created: '2023-06-15',
    lastActive: '2 minutes ago',
  },
  {
    id: 2,
    name: 'TechStart Inc',
    subdomain: 'techstart',
    plan: 'Pro',
    status: 'active',
    users: 42,
    storage: 12.8,
    storageLimit: 50,
    apiCalls: 45200,
    apiLimit: 100000,
    mrr: 499,
    created: '2024-01-20',
    lastActive: '15 minutes ago',
  },
  {
    id: 3,
    name: 'Global Systems',
    subdomain: 'globalsys',
    plan: 'Enterprise',
    status: 'active',
    users: 312,
    storage: 78.5,
    storageLimit: 200,
    apiCalls: 289000,
    apiLimit: 1000000,
    mrr: 4999,
    created: '2022-11-08',
    lastActive: '1 hour ago',
  },
  {
    id: 4,
    name: 'Startup Labs',
    subdomain: 'startuplabs',
    plan: 'Basic',
    status: 'trial',
    users: 8,
    storage: 1.2,
    storageLimit: 10,
    apiCalls: 2100,
    apiLimit: 10000,
    mrr: 0,
    created: '2024-11-10',
    lastActive: '3 hours ago',
    trialEnds: '2024-12-10',
  },
  {
    id: 5,
    name: 'Legacy Corp',
    subdomain: 'legacycorp',
    plan: 'Pro',
    status: 'suspended',
    users: 28,
    storage: 22.4,
    storageLimit: 50,
    apiCalls: 0,
    apiLimit: 100000,
    mrr: 499,
    created: '2023-03-22',
    lastActive: '30 days ago',
    suspendReason: 'Payment failed',
  },
]

const plans = [
  { id: 'basic', name: 'Basic', price: 99, users: 10, storage: 10, apiCalls: 10000 },
  { id: 'pro', name: 'Pro', price: 499, users: 50, storage: 50, apiCalls: 100000 },
  { id: 'enterprise', name: 'Enterprise', price: 2499, users: 500, storage: 100, apiCalls: 500000 },
  { id: 'custom', name: 'Custom', price: null, users: null, storage: null, apiCalls: null },
]

const platformMetrics = {
  totalTenants: 127,
  activeTenants: 118,
  totalUsers: 4256,
  totalMRR: 89500,
  storageUsed: 2.4,
  storageTotal: 10,
  apiCallsToday: 1.2,
}

const recentActivity = [
  { id: 1, tenant: 'Acme Corporation', action: 'User added', details: 'john@acme.com', time: '2 min ago' },
  { id: 2, tenant: 'TechStart Inc', action: 'Plan upgraded', details: 'Basic → Pro', time: '15 min ago' },
  { id: 3, tenant: 'Global Systems', action: 'API key created', details: 'Production key', time: '1 hour ago' },
  { id: 4, tenant: 'Startup Labs', action: 'Trial started', details: '14 days remaining', time: '3 hours ago' },
]

function MultiTenantAdminTemplate() {
  const [activeTab, setActiveTab] = useState(0)
  const [selectedTenant, setSelectedTenant] = useState(null)
  const [tenantDialogOpen, setTenantDialogOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success'
      case 'trial': return 'info'
      case 'suspended': return 'error'
      case 'inactive': return 'inactive'
      default: return 'warning'
    }
  }

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* Header */}
      <Paper elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="xl" sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>Multi-Tenant Admin</Typography>
              <Typography variant="body2" color="text.secondary">
                Manage organizations, usage, and platform settings
              </Typography>
            </Box>
            <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={() => setTenantDialogOpen(true)}>
              Add Tenant
            </Button>
          </Box>
        </Container>
      </Paper>

      {/* Platform Metrics */}
      <Container maxWidth="xl" sx={{ py: 3 }}>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Total Tenants', value: platformMetrics.totalTenants, subtext: `${platformMetrics.activeTenants} active`, icon: BusinessIcon, color: 'primary.main', bgColor: 'primary.light' },
          { label: 'Total Users', value: formatNumber(platformMetrics.totalUsers), subtext: 'Across all tenants', icon: PeopleIcon, color: 'text.secondary', bgColor: 'grey.200' },
          { label: 'Monthly Revenue', value: `$${formatNumber(platformMetrics.totalMRR)}`, subtext: 'MRR', icon: TrendingUpIcon, color: 'text.secondary', bgColor: 'grey.200' },
          { label: 'Storage Used', value: `${platformMetrics.storageUsed}TB`, subtext: `of ${platformMetrics.storageTotal}TB`, icon: StorageIcon, color: 'text.secondary', bgColor: 'grey.200' },
        ].map((metric) => {
          const Icon = metric.icon
          return (
            <Grid size={{ xs: 6, md: 3 }} key={metric.label}>
              <Paper sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">{metric.label}</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>{metric.value}</Typography>
                    <Typography variant="caption" color="text.secondary">{metric.subtext}</Typography>
                  </Box>
                  <Avatar sx={{ backgroundColor: metric.bgColor, color: metric.color }}>
                    <Icon />
                  </Avatar>
                </Box>
              </Paper>
            </Grid>
          )
        })}
      </Grid>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(e, v) => setActiveTab(v)}
          sx={{ borderBottom: 1, borderColor: 'divider', '& .MuiTab-root': { textTransform: 'none' } }}
        >
          <Tab label="All Tenants" />
          <Tab label="Usage & Billing" />
          <Tab label="Platform Settings" />
          <Tab label="Activity Log" />
        </Tabs>
      </Paper>

      {/* All Tenants Tab */}
      {activeTab === 0 && (
        <Paper>
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <TextField
              size="small"
              placeholder="Search tenants..."
              slotProps={{
                input: { startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} /> }
              }}
              sx={{ width: 300 }}
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip label="All" size="small" sx={{ bgcolor: 'grey.200' }} />
              <Chip label="Active" variant="outlined" size="small" />
              <Chip label="Trial" variant="outlined" size="small" />
              <Chip label="Suspended" variant="outlined" size="small" />
            </Box>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Organization</TableCell>
                  <TableCell>Plan</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Users</TableCell>
                  <TableCell>Storage</TableCell>
                  <TableCell>API Usage</TableCell>
                  <TableCell>MRR</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockTenants.map((tenant) => (
                  <TableRow
                    key={tenant.id}
                    hover
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      setSelectedTenant(tenant)
                      setDetailsOpen(true)
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ backgroundColor: 'primary.main' }}>
                          {tenant.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>{tenant.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{tenant.subdomain}.app.com</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>{tenant.plan}</Typography>
                    </TableCell>
                    <TableCell>
                      <Indicator
                        label={tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}
                        status={getStatusColor(tenant.status)}
                      />
                    </TableCell>
                    <TableCell>{tenant.users}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={(tenant.storage / tenant.storageLimit) * 100}
                          sx={{ width: 50, height: 6, borderRadius: 3 }}
                          color={(tenant.storage / tenant.storageLimit) > 0.9 ? 'error' : 'primary'}
                        />
                        <Typography variant="caption">{tenant.storage}GB</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={(tenant.apiCalls / tenant.apiLimit) * 100}
                          sx={{ width: 50, height: 6, borderRadius: 3 }}
                          color={(tenant.apiCalls / tenant.apiLimit) > 0.9 ? 'error' : 'primary'}
                        />
                        <Typography variant="caption">{formatNumber(tenant.apiCalls)}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        ${tenant.mrr.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                      <IconButton size="small"><LaunchIcon fontSize="small" /></IconButton>
                      <IconButton size="small"><SettingsIcon fontSize="small" /></IconButton>
                      <IconButton size="small"><MoreIcon fontSize="small" /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* Usage & Billing Tab */}
      {activeTab === 1 && (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Resource Usage by Plan</Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Plan</TableCell>
                      <TableCell align="center">Tenants</TableCell>
                      <TableCell align="center">Users</TableCell>
                      <TableCell align="center">Storage</TableCell>
                      <TableCell align="center">API Calls</TableCell>
                      <TableCell align="right">Revenue</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { plan: 'Enterprise', tenants: 12, users: 1850, storage: '890GB', api: '4.2M', revenue: 29988 },
                      { plan: 'Pro', tenants: 45, users: 1680, storage: '520GB', api: '2.1M', revenue: 22455 },
                      { plan: 'Basic', tenants: 62, users: 520, storage: '180GB', api: '450K', revenue: 6138 },
                      { plan: 'Trial', tenants: 8, users: 42, storage: '12GB', api: '8K', revenue: 0 },
                    ].map((row) => (
                      <TableRow key={row.plan}>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>{row.plan}</Typography>
                        </TableCell>
                        <TableCell align="center">{row.tenants}</TableCell>
                        <TableCell align="center">{row.users}</TableCell>
                        <TableCell align="center">{row.storage}</TableCell>
                        <TableCell align="center">{row.api}</TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>${row.revenue.toLocaleString()}</Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Tenants Approaching Limits</Typography>
              {mockTenants
                .filter(t => (t.storage / t.storageLimit) > 0.7 || (t.apiCalls / t.apiLimit) > 0.7)
                .map((tenant) => (
                  <Box key={tenant.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1.5, borderBottom: 1, borderColor: 'divider' }}>
                    <Avatar sx={{ width: 32, height: 32 }}>{tenant.name.charAt(0)}</Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>{tenant.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{tenant.plan}</Typography>
                    </Box>
                    {(tenant.storage / tenant.storageLimit) > 0.7 && (
                      <Indicator
                        label={`Storage ${Math.round((tenant.storage / tenant.storageLimit) * 100)}%`}
                        status={(tenant.storage / tenant.storageLimit) > 0.9 ? 'error' : 'warning'}
                        size="small"
                        startIcon={<StorageIcon sx={{ fontSize: 14 }} />}
                      />
                    )}
                    {(tenant.apiCalls / tenant.apiLimit) > 0.7 && (
                      <Indicator
                        label={`API ${Math.round((tenant.apiCalls / tenant.apiLimit) * 100)}%`}
                        status={(tenant.apiCalls / tenant.apiLimit) > 0.9 ? 'error' : 'warning'}
                        size="small"
                        startIcon={<ApiIcon sx={{ fontSize: 14 }} />}
                      />
                    )}
                    <Button size="small">Notify</Button>
                  </Box>
                ))}
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Available Plans</Typography>
              {plans.map((plan) => (
                <Box
                  key={plan.id}
                  sx={{
                    p: 2,
                    mb: 1,
                    borderRadius: 1,
                    border: 1,
                    borderColor: 'divider',
                    '&:hover': { borderColor: 'primary.main' },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{plan.name}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                      {plan.price ? `$${plan.price}/mo` : 'Custom'}
                    </Typography>
                  </Box>
                  {plan.users && (
                    <Typography variant="caption" color="text.secondary" display="block">
                      Up to {plan.users} users • {plan.storage}GB storage • {formatNumber(plan.apiCalls)} API calls
                    </Typography>
                  )}
                </Box>
              ))}
              <Button fullWidth variant="outlined" startIcon={<AddIcon />} sx={{ mt: 1 }}>
                Create Custom Plan
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Platform Settings Tab */}
      {activeTab === 2 && (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Global Settings</Typography>
              <List>
                {[
                  { icon: SecurityIcon, primary: 'Enforce 2FA', secondary: 'Require two-factor authentication for all tenants', enabled: true },
                  { icon: DnsIcon, primary: 'Custom Domains', secondary: 'Allow tenants to use custom domains', enabled: true },
                  { icon: CloudIcon, primary: 'Data Residency', secondary: 'Allow tenants to choose data region', enabled: false },
                  { icon: NotificationsIcon, primary: 'System Notifications', secondary: 'Send platform-wide announcements', enabled: true },
                ].map((setting, i) => {
                  const Icon = setting.icon
                  return (
                    <ListItem key={i} sx={{ px: 0 }}>
                      <ListItemIcon>
                        <Icon sx={{ color: 'text.secondary' }} />
                      </ListItemIcon>
                      <ListItemText primary={setting.primary} secondary={setting.secondary} />
                      <Switch defaultChecked={setting.enabled} />
                    </ListItem>
                  )
                })}
              </List>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Default Limits</Typography>
              <Grid container spacing={2}>
                {[
                  { label: 'Max Users (Basic)', value: 10 },
                  { label: 'Max Users (Pro)', value: 50 },
                  { label: 'Max Users (Enterprise)', value: 500 },
                  { label: 'Trial Duration', value: '14 days' },
                  { label: 'API Rate Limit', value: '1000/min' },
                  { label: 'Max File Size', value: '100MB' },
                ].map((limit) => (
                  <Grid size={{ xs: 6 }} key={limit.label}>
                    <TextField
                      label={limit.label}
                      defaultValue={limit.value}
                      size="small"
                      fullWidth
                    />
                  </Grid>
                ))}
              </Grid>
            </Paper>

            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Maintenance</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button variant="outlined" startIcon={<ScheduleIcon />}>
                  Schedule Maintenance Window
                </Button>
                <Button variant="outlined" color="warning" startIcon={<WarningIcon />}>
                  Enable Maintenance Mode
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Activity Log Tab */}
      {activeTab === 3 && (
        <Paper>
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Recent Activity</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Tenant</InputLabel>
                <Select label="Tenant" defaultValue="all">
                  <MenuItem value="all">All Tenants</MenuItem>
                  {mockTenants.map((t) => (
                    <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Action</InputLabel>
                <Select label="Action" defaultValue="all">
                  <MenuItem value="all">All Actions</MenuItem>
                  <MenuItem value="user">User Actions</MenuItem>
                  <MenuItem value="billing">Billing</MenuItem>
                  <MenuItem value="api">API</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tenant</TableCell>
                  <TableCell>Action</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentActivity.map((activity) => (
                  <TableRow key={activity.id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>{activity.tenant}</Typography>
                    </TableCell>
                    <TableCell>{activity.action}</TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">{activity.details}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">{activity.time}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
      </Container>

      {/* Tenant Details Dialog */}
      <Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)} maxWidth="md" fullWidth>
        {selectedTenant && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ width: 48, height: 48, backgroundColor: 'primary.main' }}>
                  {selectedTenant.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedTenant.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{selectedTenant.subdomain}.app.com</Typography>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>{selectedTenant.users}</Typography>
                    <Typography variant="caption" color="text.secondary">Users</Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>{selectedTenant.storage}GB</Typography>
                    <Typography variant="caption" color="text.secondary">Storage</Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>{formatNumber(selectedTenant.apiCalls)}</Typography>
                    <Typography variant="caption" color="text.secondary">API Calls</Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>${selectedTenant.mrr}</Typography>
                    <Typography variant="caption" color="text.secondary">MRR</Typography>
                  </Paper>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="caption" color="text.secondary">Plan</Typography>
                  <Typography variant="body1">{selectedTenant.plan}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="caption" color="text.secondary">Status</Typography>
                  <Box>
                    <Indicator
                      label={selectedTenant.status.charAt(0).toUpperCase() + selectedTenant.status.slice(1)}
                      status={getStatusColor(selectedTenant.status)}
                    />
                  </Box>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="caption" color="text.secondary">Created</Typography>
                  <Typography variant="body1">{selectedTenant.created}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="caption" color="text.secondary">Last Active</Typography>
                  <Typography variant="body1">{selectedTenant.lastActive}</Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDetailsOpen(false)}>Close</Button>
              <Button variant="outlined" startIcon={<LaunchIcon />}>Open Tenant</Button>
              <Button variant="contained" startIcon={<SettingsIcon />}>Manage</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Add Tenant Dialog */}
      <Dialog open={tenantDialogOpen} onClose={() => setTenantDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Tenant</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Organization Name"
              size="small"
              fullWidth
              placeholder="e.g., Acme Corporation"
            />
            <TextField
              label="Subdomain"
              size="small"
              fullWidth
              placeholder="acme"
              helperText="Will be accessible at acme.app.com"
            />
            <TextField
              label="Admin Email"
              size="small"
              fullWidth
              placeholder="admin@company.com"
            />
            <FormControl fullWidth size="small">
              <InputLabel>Plan</InputLabel>
              <Select label="Plan" defaultValue="trial">
                <MenuItem value="trial">14-Day Trial</MenuItem>
                {plans.map((plan) => (
                  <MenuItem key={plan.id} value={plan.id}>
                    {plan.name} {plan.price ? `- $${plan.price}/mo` : ''}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTenantDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setTenantDialogOpen(false)}>Create Tenant</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default MultiTenantAdminTemplate

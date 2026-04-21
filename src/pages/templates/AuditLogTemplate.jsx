import { useState, Fragment } from 'react'
import { Box, Container, Typography, Button, Card, CardContent, IconButton, TextField, Chip, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, FormControl, Dialog, DialogTitle, DialogContent, DialogActions, Drawer, Divider, Collapse, Avatar, Grid, Switch } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import Indicator from '../../components/core/Indicator'
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded'
import SearchIcon from '@mui/icons-material/SearchRounded'
import FilterListIcon from '@mui/icons-material/FilterListRounded'
import DownloadIcon from '@mui/icons-material/DownloadRounded'
import RefreshIcon from '@mui/icons-material/RefreshRounded'
import ExpandMoreIcon from '@mui/icons-material/ExpandMoreRounded'
import ExpandLessIcon from '@mui/icons-material/ExpandLessRounded'
import PersonIcon from '@mui/icons-material/PersonRounded'
import LockIcon from '@mui/icons-material/LockRounded'
import EditIcon from '@mui/icons-material/EditRounded'
import DeleteIcon from '@mui/icons-material/DeleteRounded'
import AddIcon from '@mui/icons-material/AddRounded'
import VisibilityIcon from '@mui/icons-material/VisibilityRounded'
import SettingsIcon from '@mui/icons-material/SettingsRounded'
import SecurityIcon from '@mui/icons-material/SecurityRounded'
import WarningIcon from '@mui/icons-material/WarningRounded'
import ErrorIcon from '@mui/icons-material/ErrorRounded'
import InfoIcon from '@mui/icons-material/InfoRounded'
import CalendarTodayIcon from '@mui/icons-material/CalendarTodayRounded'
import AccessTimeIcon from '@mui/icons-material/AccessTimeRounded'
import ComputerIcon from '@mui/icons-material/ComputerRounded'
import LocationOnIcon from '@mui/icons-material/LocationOnRounded'
import CloseIcon from '@mui/icons-material/CloseRounded'
import CheckCircleIcon from '@mui/icons-material/CheckCircleRounded'
import NotificationsIcon from '@mui/icons-material/NotificationsRounded'
import DescriptionIcon from '@mui/icons-material/DescriptionRounded'

const auditLogs = [
  { id: 1, timestamp: '2024-11-24 10:30:45', user: 'Sarah Chen', email: 'sarah@company.com', action: 'User Login', category: 'Authentication', resource: 'Session', resourceId: 'sess_12345', status: 'success', ip: '192.168.1.100', location: 'New York, US', device: 'Chrome on MacOS', details: { method: 'Password' } },
  { id: 2, timestamp: '2024-11-24 10:28:12', user: 'Mike Johnson', email: 'mike@company.com', action: 'Record Updated', category: 'Data', resource: 'Contact', resourceId: 'cnt_67890', status: 'success', ip: '192.168.1.101', location: 'San Francisco, US', device: 'Firefox on Windows', details: { field: 'email', old: 'old@email.com', new: 'new@email.com' } },
  { id: 3, timestamp: '2024-11-24 10:25:33', user: 'Emily Davis', email: 'emily@company.com', action: 'Failed Login', category: 'Authentication', resource: 'Session', resourceId: null, status: 'error', ip: '192.168.1.102', location: 'Chicago, US', device: 'Safari on iOS', details: { reason: 'Invalid password', attempts: 3 } },
  { id: 4, timestamp: '2024-11-24 10:22:18', user: 'System', email: 'system', action: 'Scheduled Export', category: 'Export', resource: 'Report', resourceId: 'rpt_11111', status: 'success', ip: '10.0.0.1', location: 'Internal', device: 'Scheduler', details: { records: 1234, format: 'CSV' } },
  { id: 5, timestamp: '2024-11-24 10:20:05', user: 'Alex Kim', email: 'alex@company.com', action: 'Permission Changed', category: 'Security', resource: 'User', resourceId: 'usr_22222', status: 'warning', ip: '192.168.1.103', location: 'Seattle, US', device: 'Chrome on Windows', details: { role: 'Admin', grantedBy: 'Sarah Chen' } },
  { id: 6, timestamp: '2024-11-24 10:15:42', user: 'Chris Brown', email: 'chris@company.com', action: 'Record Deleted', category: 'Data', resource: 'Task', resourceId: 'tsk_33333', status: 'success', ip: '192.168.1.104', location: 'Boston, US', device: 'Edge on Windows', details: { title: 'Old Task', deletedAt: '2024-11-24' } },
  { id: 7, timestamp: '2024-11-24 10:12:30', user: 'Lisa Wang', email: 'lisa@company.com', action: 'API Key Generated', category: 'Security', resource: 'API Key', resourceId: 'key_44444', status: 'warning', ip: '192.168.1.105', location: 'Austin, US', device: 'Chrome on MacOS', details: { permissions: ['read', 'write'], expiresIn: '90 days' } },
  { id: 8, timestamp: '2024-11-24 10:10:15', user: 'David Lee', email: 'david@company.com', action: 'Bulk Import', category: 'Data', resource: 'Contacts', resourceId: 'imp_55555', status: 'success', ip: '192.168.1.106', location: 'Denver, US', device: 'Firefox on Linux', details: { imported: 500, failed: 12 } },
]

const eventCategories = ['All', 'Authentication', 'Data', 'Security', 'Export', 'Settings', 'Integration']

const alertRules = [
  { id: 1, name: 'Failed Login Alert', condition: 'More than 3 failed logins', channel: 'Email', active: true },
  { id: 2, name: 'Admin Permission Change', condition: 'Any admin role change', channel: 'Slack', active: true },
  { id: 3, name: 'Bulk Delete Warning', condition: 'More than 100 records deleted', channel: 'Email + Slack', active: false },
]

function AuditLogTemplate() {
  const [expandedRow, setExpandedRow] = useState(null)
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [selectedLog, setSelectedLog] = useState(null)
  const [alertDialogOpen, setAlertDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [dateRange, setDateRange] = useState('today')


  const getActionIcon = (category) => {
    switch (category) {
      case 'Authentication': return <LockIcon sx={{ fontSize: 18 }} />
      case 'Data': return <EditIcon sx={{ fontSize: 18 }} />
      case 'Security': return <SecurityIcon sx={{ fontSize: 18 }} />
      case 'Export': return <DownloadIcon sx={{ fontSize: 18 }} />
      case 'Settings': return <SettingsIcon sx={{ fontSize: 18 }} />
      default: return <InfoIcon sx={{ fontSize: 18 }} />
    }
  }

  const openDetail = (log) => {
    setSelectedLog(log)
    setDetailDialogOpen(true)
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
              <Typography variant="h5" sx={{ fontWeight: 700 }}>Audit Log</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="outlined" startIcon={<NotificationsIcon />} onClick={() => setAlertDialogOpen(true)} sx={{ textTransform: 'none' }}>Alerts</Button>
              <Button variant="outlined" startIcon={<DescriptionIcon />} sx={{ textTransform: 'none' }}>Generate Report</Button>
              <Button variant="outlined" startIcon={<DownloadIcon />} sx={{ textTransform: 'none' }}>Export</Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Stats */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {[
            { label: 'Total Events', value: '12,456', change: '+234 today', color: 'primary' },
            { label: 'Successful', value: '12,123', change: '97.3%', color: 'success' },
            { label: 'Warnings', value: '289', change: '2.3%', color: 'warning' },
            { label: 'Failures', value: '44', change: '0.4%', color: 'error' },
          ].map((stat) => (
            <Grid size={{ xs: 6, md: 3 }} key={stat.label}>
              <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>{stat.label}</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: `${stat.color}.main` }}>{stat.value}</Typography>
                  <Typography variant="caption" color="text.secondary">{stat.change}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Filters */}
        <Card sx={{ mb: 3, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <TextField
                placeholder="Search by user, action, resource..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
                sx={{ flex: 1, minWidth: 300 }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 20 }} /></InputAdornment>,
                }}
              />
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <Select value={dateRange} onChange={(e) => setDateRange(e.target.value)} displayEmpty>
                  <MenuItem value="today">Today</MenuItem>
                  <MenuItem value="yesterday">Yesterday</MenuItem>
                  <MenuItem value="last7">Last 7 days</MenuItem>
                  <MenuItem value="last30">Last 30 days</MenuItem>
                  <MenuItem value="custom">Custom range</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {eventCategories.map((cat) => (
                  <Chip
                    key={cat}
                    label={cat}
                    variant="outlined"
                    onClick={() => setSelectedCategory(cat)}
                    size="small"
                    sx={{
                      cursor: 'pointer',
                      bgcolor: selectedCategory === cat ? 'grey.200' : 'transparent',
                      fontWeight: selectedCategory === cat ? 600 : 400,
                    }}
                  />
                ))}
              </Box>
              <IconButton onClick={() => setFilterDrawerOpen(true)}><FilterListIcon /></IconButton>
              <IconButton><RefreshIcon /></IconButton>
            </Box>
          </CardContent>
        </Card>

        {/* Audit Log Table */}
        <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableCell sx={{ width: 40 }}></TableCell>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Action</TableCell>
                  <TableCell>Resource</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>IP / Location</TableCell>
                  <TableCell align="right">Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {auditLogs.map((log) => (
                  <Fragment key={log.id}>
                    <TableRow
                      hover
                      onClick={() => setExpandedRow(expandedRow === log.id ? null : log.id)}
                      sx={{ cursor: 'pointer', '& > *': { borderBottom: expandedRow === log.id ? 'none' : undefined } }}
                    >
                      <TableCell>
                        <IconButton size="small">
                          {expandedRow === log.id ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{log.timestamp}</Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ width: 28, height: 28, fontSize: 12 }}>{log.user.charAt(0)}</Avatar>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>{log.user}</Typography>
                            <Typography variant="caption" color="text.secondary">{log.email}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ width: 24, height: 24, backgroundColor: 'grey.100', color: 'text.secondary' }}>
                            {getActionIcon(log.category)}
                          </Avatar>
                          <Box>
                            <Typography variant="body2">{log.action}</Typography>
                            <Typography variant="caption" color="text.secondary">{log.category}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{log.resource}</Typography>
                        {log.resourceId && <Typography variant="caption" color="text.secondary">{log.resourceId}</Typography>}
                      </TableCell>
                      <TableCell>
                        <Indicator label={log.status} status={log.status} size="small" />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{log.ip}</Typography>
                        <Typography variant="caption" color="text.secondary">{log.location}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Button size="small" onClick={(e) => { e.stopPropagation(); openDetail(log) }} sx={{ textTransform: 'none' }}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={8} sx={{ p: 0 }}>
                        <Collapse in={expandedRow === log.id}>
                          <Box sx={{ p: 2, backgroundColor: 'grey.50' }}>
                            <Grid container spacing={3}>
                              <Grid size={{ xs: 12, md: 4 }}>
                                <Typography variant="caption" color="text.secondary">Device</Typography>
                                <Typography variant="body2">{log.device}</Typography>
                              </Grid>
                              <Grid size={{ xs: 12, md: 8 }}>
                                <Typography variant="caption" color="text.secondary">Event Details</Typography>
                                <Box sx={{ mt: 0.5, p: 1.5, backgroundColor: 'background.paper', borderRadius: 1, fontFamily: 'monospace', fontSize: 12 }}>
                                  {JSON.stringify(log.details, null, 2)}
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography variant="body2" color="text.secondary">Showing 1-8 of 12,456 events</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button size="small" disabled>Previous</Button>
              <Button size="small">Next</Button>
            </Box>
          </Box>
        </Card>
      </Container>

      {/* Filter Drawer */}
      <Drawer anchor="right" open={filterDrawerOpen} onClose={() => setFilterDrawerOpen(false)} PaperProps={{ sx: { width: 320 } }}>
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Advanced Filters</Typography>
          <IconButton onClick={() => setFilterDrawerOpen(false)}><CloseIcon /></IconButton>
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Date Range</Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
            <TextField type="date" size="small" fullWidth label="From" InputLabelProps={{ shrink: true }} />
            <TextField type="date" size="small" fullWidth label="To" InputLabelProps={{ shrink: true }} />
          </Box>

          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>User</Typography>
          <TextField placeholder="Search users..." size="small" fullWidth sx={{ mb: 3 }} />

          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Action Type</Typography>
          <FormControl fullWidth size="small" sx={{ mb: 3 }}>
            <Select defaultValue="all">
              <MenuItem value="all">All Actions</MenuItem>
              <MenuItem value="create">Create</MenuItem>
              <MenuItem value="update">Update</MenuItem>
              <MenuItem value="delete">Delete</MenuItem>
              <MenuItem value="login">Login</MenuItem>
              <MenuItem value="export">Export</MenuItem>
            </Select>
          </FormControl>

          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Status</Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
            <Chip label="Success" variant="outlined" onClick={() => {}} />
            <Chip label="Warning" variant="outlined" onClick={() => {}} />
            <Chip label="Error" variant="outlined" onClick={() => {}} />
          </Box>

          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>IP Address</Typography>
          <TextField placeholder="e.g., 192.168.1.*" size="small" fullWidth sx={{ mb: 3 }} />

          <Button variant="contained" fullWidth sx={{ textTransform: 'none', mb: 1 }}>Apply Filters</Button>
          <Button variant="outlined" fullWidth sx={{ textTransform: 'none' }}>Reset</Button>
        </Box>
      </Drawer>

      {/* Detail Dialog */}
      <Dialog open={detailDialogOpen} onClose={() => setDetailDialogOpen(false)} maxWidth="md" fullWidth>
        {selectedLog && (
          <>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ backgroundColor: `${selectedLog.status}.light`, color: `${selectedLog.status}.main` }}>
                {getActionIcon(selectedLog.category)}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>{selectedLog.action}</Typography>
                <Typography variant="body2" color="text.secondary">{selectedLog.timestamp}</Typography>
              </Box>
              <Indicator label={selectedLog.status} status={selectedLog.status} />
              <IconButton onClick={() => setDetailDialogOpen(false)}><CloseIcon /></IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Event Information</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <PersonIcon sx={{ color: 'text.secondary' }} />
                      <Box>
                        <Typography variant="caption" color="text.secondary">User</Typography>
                        <Typography variant="body2">{selectedLog.user} ({selectedLog.email})</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <AccessTimeIcon sx={{ color: 'text.secondary' }} />
                      <Box>
                        <Typography variant="caption" color="text.secondary">Timestamp</Typography>
                        <Typography variant="body2">{selectedLog.timestamp}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <ComputerIcon sx={{ color: 'text.secondary' }} />
                      <Box>
                        <Typography variant="caption" color="text.secondary">Device</Typography>
                        <Typography variant="body2">{selectedLog.device}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <LocationOnIcon sx={{ color: 'text.secondary' }} />
                      <Box>
                        <Typography variant="caption" color="text.secondary">Location</Typography>
                        <Typography variant="body2">{selectedLog.ip} - {selectedLog.location}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Resource Details</Typography>
                  <Box sx={{ p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
                    <Typography variant="caption" color="text.secondary">Resource Type</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>{selectedLog.resource}</Typography>
                    {selectedLog.resourceId && (
                      <>
                        <Typography variant="caption" color="text.secondary">Resource ID</Typography>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{selectedLog.resourceId}</Typography>
                      </>
                    )}
                  </Box>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Event Data</Typography>
                  <Box sx={{ p: 2, backgroundColor: 'grey.100', borderRadius: 1, border: '1px solid', borderColor: 'divider', fontFamily: 'monospace', fontSize: 13, overflow: 'auto' }}>
                    <pre style={{ margin: 0 }}>{JSON.stringify(selectedLog.details, null, 2)}</pre>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button sx={{ textTransform: 'none' }}>View Related Events</Button>
              <Button variant="outlined" sx={{ textTransform: 'none' }}>Export Event</Button>
              <Button variant="contained" onClick={() => setDetailDialogOpen(false)} sx={{ textTransform: 'none' }}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Alert Rules Dialog */}
      <Dialog open={alertDialogOpen} onClose={() => setAlertDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Alert Rules</Typography>
            <Button startIcon={<AddIcon />} sx={{ textTransform: 'none' }}>New Rule</Button>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {alertRules.map((rule) => (
            <Box key={rule.id} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>{rule.name}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{rule.condition}</Typography>
                  <Chip label={rule.channel} size="small" variant="outlined" />
                </Box>
                <Switch checked={rule.active} />
              </Box>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAlertDialogOpen(false)} sx={{ textTransform: 'none' }}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default AuditLogTemplate

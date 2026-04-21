import { useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  Chip,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Tabs,
  Tab,
  Card,
  CardContent,
  Avatar,
  Alert,
  InputAdornment,
} from '@mui/material'
import Indicator from '../../components/core/Indicator'
import AccountCircleIcon from '@mui/icons-material/AccountCircleRounded'
import DashboardIcon from '@mui/icons-material/DashboardRounded'
import ReceiptIcon from '@mui/icons-material/ReceiptRounded'
import SupportAgentIcon from '@mui/icons-material/SupportAgentRounded'
import ArticleIcon from '@mui/icons-material/ArticleRounded'
import BarChartIcon from '@mui/icons-material/BarChartRounded'
import CreditCardIcon from '@mui/icons-material/CreditCardRounded'
import SettingsIcon from '@mui/icons-material/SettingsRounded'
import HistoryIcon from '@mui/icons-material/HistoryRounded'
import DownloadIcon from '@mui/icons-material/DownloadRounded'
import AddIcon from '@mui/icons-material/AddRounded'
import VisibilityIcon from '@mui/icons-material/VisibilityRounded'
import SearchIcon from '@mui/icons-material/SearchRounded'
import EditIcon from '@mui/icons-material/EditRounded'
import CheckCircleIcon from '@mui/icons-material/CheckCircleRounded'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmptyRounded'
import ErrorIcon from '@mui/icons-material/ErrorRounded'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpwardRounded'
import SecurityIcon from '@mui/icons-material/SecurityRounded'
import NotificationsIcon from '@mui/icons-material/NotificationsRounded'

const mockUser = {
  name: 'Acme Corporation',
  email: 'admin@acme.com',
  plan: 'Enterprise',
  accountId: 'ACME-12345',
  memberSince: 'January 2022',
}

const mockInvoices = [
  { id: 'INV-2024-011', date: '2024-11-01', amount: 2499.00, status: 'paid', dueDate: '2024-11-15' },
  { id: 'INV-2024-010', date: '2024-10-01', amount: 2499.00, status: 'paid', dueDate: '2024-10-15' },
  { id: 'INV-2024-009', date: '2024-09-01', amount: 2499.00, status: 'paid', dueDate: '2024-09-15' },
  { id: 'INV-2024-008', date: '2024-08-01', amount: 2299.00, status: 'paid', dueDate: '2024-08-15' },
]

const mockTickets = [
  { id: 'TKT-5432', subject: 'API rate limit issue', status: 'open', priority: 'high', created: '2024-11-18', lastUpdate: '2024-11-20' },
  { id: 'TKT-5431', subject: 'Feature request: export to PDF', status: 'in-progress', priority: 'normal', created: '2024-11-15', lastUpdate: '2024-11-19' },
  { id: 'TKT-5420', subject: 'Billing question', status: 'resolved', priority: 'low', created: '2024-11-10', lastUpdate: '2024-11-12' },
]

const mockArticles = [
  { id: 1, title: 'Getting Started Guide', category: 'Onboarding', views: 1250 },
  { id: 2, title: 'API Documentation', category: 'Technical', views: 890 },
  { id: 3, title: 'Billing & Payments FAQ', category: 'Billing', views: 567 },
  { id: 4, title: 'Security Best Practices', category: 'Security', views: 432 },
]

const mockUsageData = {
  apiCalls: { used: 850000, limit: 1000000 },
  storage: { used: 45, limit: 100 },
  users: { used: 48, limit: 50 },
}

const mockActivity = [
  { action: 'API key regenerated', user: 'john@acme.com', date: '2024-11-20 14:30' },
  { action: 'New user added', user: 'admin@acme.com', date: '2024-11-19 10:15' },
  { action: 'Plan upgraded to Enterprise', user: 'admin@acme.com', date: '2024-11-15 09:00' },
  { action: 'Password changed', user: 'jane@acme.com', date: '2024-11-12 16:45' },
]

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
  { id: 'billing', label: 'Billing & Invoices', icon: <ReceiptIcon /> },
  { id: 'support', label: 'Support Tickets', icon: <SupportAgentIcon /> },
  { id: 'knowledge', label: 'Knowledge Base', icon: <ArticleIcon /> },
  { id: 'usage', label: 'Usage & Metrics', icon: <BarChartIcon /> },
  { id: 'settings', label: 'Account Settings', icon: <SettingsIcon /> },
]

const getStatusIcon = (status) => {
  switch (status) {
    case 'open':
      return <ErrorIcon color="error" fontSize="small" />
    case 'in-progress':
      return <HourglassEmptyIcon color="warning" fontSize="small" />
    case 'resolved':
      return <CheckCircleIcon color="success" fontSize="small" />
    default:
      return null
  }
}

export default function CustomerPortalTemplate() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [ticketDialogOpen, setTicketDialogOpen] = useState(false)
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false)
  const [profileDialogOpen, setProfileDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Sidebar */}
      <Paper
        sx={{
          width: 280,
          flexShrink: 0,
          borderRadius: 0,
          borderRight: 1,
          borderColor: 'divider',
        }}
      >
        {/* User Info */}
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar sx={{ width: 48, height: 48, bgcolor: 'primary.main' }}>AC</Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                {mockUser.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {mockUser.accountId}
              </Typography>
            </Box>
          </Box>
          <Indicator label={mockUser.plan} color="cyan" size="small" />
        </Box>

        {/* Navigation */}
        <List sx={{ p: 1 }}>
          {navItems.map((item) => (
            <ListItemButton
              key={item.id}
              selected={activeSection === item.id}
              onClick={() => setActiveSection(item.id)}
              sx={{ borderRadius: 1, mb: 0.5 }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Paper>

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 3 }}>
        {/* Dashboard */}
        {activeSection === 'dashboard' && (
          <>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
              Welcome back, {mockUser.name}
            </Typography>

            {/* Quick Stats */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Current Plan
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    {mockUser.plan}
                  </Typography>
                  <Button size="small" startIcon={<ArrowUpwardIcon />} sx={{ mt: 1 }}>
                    Upgrade Plan
                  </Button>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Open Tickets
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    {mockTickets.filter((t) => t.status !== 'resolved').length}
                  </Typography>
                  <Button size="small" onClick={() => setActiveSection('support')} sx={{ mt: 1 }}>
                    View Tickets
                  </Button>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Next Invoice
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    Dec 1, 2024
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    $2,499.00
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            {/* Usage Overview */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Usage This Month
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    API Calls
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="h6">
                      {(mockUsageData.apiCalls.used / 1000).toFixed(0)}K
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      / {(mockUsageData.apiCalls.limit / 1000).toFixed(0)}K
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(mockUsageData.apiCalls.used / mockUsageData.apiCalls.limit) * 100}
                    sx={{ height: 8, borderRadius: 1 }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    Storage
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="h6">{mockUsageData.storage.used} GB</Typography>
                    <Typography variant="body2" color="text.secondary">
                      / {mockUsageData.storage.limit} GB
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(mockUsageData.storage.used / mockUsageData.storage.limit) * 100}
                    sx={{ height: 8, borderRadius: 1 }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    Team Members
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="h6">{mockUsageData.users.used}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      / {mockUsageData.users.limit}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(mockUsageData.users.used / mockUsageData.users.limit) * 100}
                    color="warning"
                    sx={{ height: 8, borderRadius: 1 }}
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Recent Activity */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Recent Activity
              </Typography>
              <List dense>
                {mockActivity.map((activity, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <HistoryIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={activity.action} secondary={`${activity.user} • ${activity.date}`} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </>
        )}

        {/* Billing */}
        {activeSection === 'billing' && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>Billing & Invoices</Typography>
              <Button variant="outlined" startIcon={<CreditCardIcon />} onClick={() => setPaymentDialogOpen(true)}>
                Update Payment Method
              </Button>
            </Box>

            {/* Current Plan */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6">{mockUser.plan} Plan</Typography>
                  <Typography variant="body2" color="text.secondary">
                    $2,499/month • Billed monthly
                  </Typography>
                </Box>
                <Box>
                  <Button variant="outlined" sx={{ mr: 1 }}>
                    Change Plan
                  </Button>
                  <Button color="error">Cancel Subscription</Button>
                </Box>
              </Box>
            </Paper>

            {/* Invoices */}
            <Paper>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6">Invoice History</Typography>
              </Box>
              <Divider />
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Invoice</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockInvoices.map((invoice) => (
                      <TableRow key={invoice.id} hover>
                        <TableCell>
                          <Typography variant="body1" fontWeight={500}>
                            {invoice.id}
                          </Typography>
                        </TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Indicator label={invoice.status} status="success" size="small" />
                        </TableCell>
                        <TableCell align="right">
                          <Button size="small" startIcon={<DownloadIcon />}>
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </>
        )}

        {/* Support */}
        {activeSection === 'support' && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>Support Tickets</Typography>
              <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={() => setTicketDialogOpen(true)}>
                New Ticket
              </Button>
            </Box>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Ticket ID</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell>Last Update</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockTickets.map((ticket) => (
                    <TableRow key={ticket.id} hover>
                      <TableCell>
                        <Typography variant="body2" fontFamily="monospace">
                          {ticket.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" fontWeight={500}>
                          {ticket.subject}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getStatusIcon(ticket.status)}
                          <span>{ticket.status}</span>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Indicator
                          label={ticket.priority}
                          status={ticket.priority === 'high' ? 'error' : ticket.priority === 'normal' ? 'warning' : 'inactive'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{ticket.created}</TableCell>
                      <TableCell>{ticket.lastUpdate}</TableCell>
                      <TableCell align="right">
                        <Button size="small">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        {/* Knowledge Base */}
        {activeSection === 'knowledge' && (
          <>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
              Knowledge Base
            </Typography>

            <TextField
              fullWidth
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Grid container spacing={3}>
              {mockArticles.map((article) => (
                <Grid size={{ xs: 12, md: 6 }} key={article.id}>
                  <Card sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}>
                    <CardContent>
                      <Chip label={article.category} size="small" sx={{ mb: 1 }} />
                      <Typography variant="h6" gutterBottom>
                        {article.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {article.views} views
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {/* Usage */}
        {activeSection === 'usage' && (
          <>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
              Usage & Metrics
            </Typography>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    API Usage (Last 30 Days)
                  </Typography>
                  <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.100', borderRadius: 1 }}>
                    <Typography color="text.secondary">Chart visualization</Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Storage Breakdown
                  </Typography>
                  <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.100', borderRadius: 1 }}>
                    <Typography color="text.secondary">Chart visualization</Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Team Activity
                  </Typography>
                  <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.100', borderRadius: 1 }}>
                    <Typography color="text.secondary">Chart visualization</Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </>
        )}

        {/* Settings */}
        {activeSection === 'settings' && (
          <>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
              Account Settings
            </Typography>

            <Grid container spacing={3}>
              {/* Profile */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">Profile Information</Typography>
                    <IconButton onClick={() => setProfileDialogOpen(true)}>
                      <EditIcon />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Company Name
                      </Typography>
                      <Typography variant="body1">{mockUser.name}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Email
                      </Typography>
                      <Typography variant="body1">{mockUser.email}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Account ID
                      </Typography>
                      <Typography variant="body1">{mockUser.accountId}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Member Since
                      </Typography>
                      <Typography variant="body1">{mockUser.memberSince}</Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              {/* Security */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Security
                  </Typography>
                  <List>
                    <ListItemButton>
                      <ListItemIcon>
                        <SecurityIcon />
                      </ListItemIcon>
                      <ListItemText primary="Change Password" secondary="Last changed 30 days ago" />
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemIcon>
                        <SecurityIcon />
                      </ListItemIcon>
                      <ListItemText primary="Two-Factor Authentication" secondary="Enabled" />
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemIcon>
                        <NotificationsIcon />
                      </ListItemIcon>
                      <ListItemText primary="Notification Preferences" secondary="Email and in-app" />
                    </ListItemButton>
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </>
        )}
      </Box>

      {/* New Ticket Dialog */}
      <Dialog open={ticketDialogOpen} onClose={() => setTicketDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Submit Support Ticket</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Subject" sx={{ mt: 2, mb: 2 }} />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select label="Category" defaultValue="">
              <MenuItem value="technical">Technical Issue</MenuItem>
              <MenuItem value="billing">Billing Question</MenuItem>
              <MenuItem value="feature">Feature Request</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Priority</InputLabel>
            <Select label="Priority" defaultValue="normal">
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="normal">Normal</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
          <TextField fullWidth multiline rows={4} label="Description" placeholder="Describe your issue in detail..." />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTicketDialogOpen(false)}>Cancel</Button>
          <Button variant="contained">Submit Ticket</Button>
        </DialogActions>
      </Dialog>

      {/* Payment Method Dialog */}
      <Dialog open={paymentDialogOpen} onClose={() => setPaymentDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Update Payment Method</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
            Current card: •••• •••• •••• 4242 (Expires 12/25)
          </Alert>
          <TextField fullWidth label="Card Number" placeholder="1234 5678 9012 3456" sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid size={{ xs: 6 }}>
              <TextField fullWidth label="Expiry Date" placeholder="MM/YY" />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <TextField fullWidth label="CVV" placeholder="123" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPaymentDialogOpen(false)}>Cancel</Button>
          <Button variant="contained">Update Card</Button>
        </DialogActions>
      </Dialog>

      {/* Profile Dialog */}
      <Dialog open={profileDialogOpen} onClose={() => setProfileDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Company Name" defaultValue={mockUser.name} sx={{ mt: 2, mb: 2 }} />
          <TextField fullWidth label="Email" defaultValue={mockUser.email} sx={{ mb: 2 }} />
          <TextField fullWidth label="Phone" placeholder="+1 (555) 123-4567" sx={{ mb: 2 }} />
          <TextField fullWidth label="Address" multiline rows={2} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProfileDialogOpen(false)}>Cancel</Button>
          <Button variant="contained">Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

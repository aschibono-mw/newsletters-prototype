import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  IconButton,
  Tabs,
  Tab,
  Divider,
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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import Indicator from '../../components/core/Indicator'
import TrendingUpIcon from '@mui/icons-material/TrendingUpRounded'
import TrendingDownIcon from '@mui/icons-material/TrendingDownRounded'
import AttachMoneyIcon from '@mui/icons-material/AttachMoneyRounded'
import PeopleIcon from '@mui/icons-material/PeopleRounded'
import AutorenewIcon from '@mui/icons-material/AutorenewRounded'
import CancelIcon from '@mui/icons-material/CancelRounded'
import DownloadIcon from '@mui/icons-material/DownloadRounded'
import SendIcon from '@mui/icons-material/SendRounded'
import WarningIcon from '@mui/icons-material/WarningRounded'
import CheckCircleIcon from '@mui/icons-material/CheckCircleRounded'
import CreditCardIcon from '@mui/icons-material/CreditCardRounded'
import ReceiptIcon from '@mui/icons-material/ReceiptRounded'
import AddIcon from '@mui/icons-material/AddRounded'
import EditIcon from '@mui/icons-material/EditRounded'
import SearchIcon from '@mui/icons-material/SearchRounded'
import FilterListIcon from '@mui/icons-material/FilterListRounded'

const subscriptions = [
  { id: 1, customer: 'Acme Corporation', plan: 'Enterprise', price: 2499, billing: 'Monthly', status: 'active', startDate: '2024-01-15', nextBilling: '2024-12-15', mrr: 2499 },
  { id: 2, customer: 'TechStart Inc', plan: 'Professional', price: 499, billing: 'Monthly', status: 'active', startDate: '2024-03-01', nextBilling: '2024-12-01', mrr: 499 },
  { id: 3, customer: 'Global Systems', plan: 'Enterprise', price: 24990, billing: 'Annual', status: 'active', startDate: '2024-06-01', nextBilling: '2025-06-01', mrr: 2082.50 },
  { id: 4, customer: 'Startup Labs', plan: 'Starter', price: 99, billing: 'Monthly', status: 'trial', startDate: '2024-11-01', nextBilling: '2024-12-01', mrr: 0 },
  { id: 5, customer: 'BigCorp Ltd', plan: 'Enterprise', price: 4999, billing: 'Monthly', status: 'active', startDate: '2023-08-15', nextBilling: '2024-12-15', mrr: 4999 },
  { id: 6, customer: 'SmallBiz Co', plan: 'Professional', price: 499, billing: 'Monthly', status: 'past_due', startDate: '2024-02-01', nextBilling: '2024-11-01', mrr: 499 },
  { id: 7, customer: 'Enterprise Plus', plan: 'Enterprise', price: 2499, billing: 'Monthly', status: 'cancelled', startDate: '2024-01-01', nextBilling: null, mrr: 0 },
  { id: 8, customer: 'Digital Agency', plan: 'Professional', price: 4990, billing: 'Annual', status: 'active', startDate: '2024-09-15', nextBilling: '2025-09-15', mrr: 415.83 },
]

const invoices = [
  { id: 'INV-2024-0156', customer: 'Acme Corporation', amount: 2499.00, status: 'paid', date: '2024-11-15', dueDate: '2024-11-30' },
  { id: 'INV-2024-0155', customer: 'TechStart Inc', amount: 499.00, status: 'paid', date: '2024-11-01', dueDate: '2024-11-15' },
  { id: 'INV-2024-0154', customer: 'SmallBiz Co', amount: 499.00, status: 'overdue', date: '2024-11-01', dueDate: '2024-11-15' },
  { id: 'INV-2024-0153', customer: 'BigCorp Ltd', amount: 4999.00, status: 'paid', date: '2024-11-15', dueDate: '2024-11-30' },
  { id: 'INV-2024-0152', customer: 'Digital Agency', amount: 4990.00, status: 'pending', date: '2024-11-20', dueDate: '2024-12-05' },
  { id: 'INV-2024-0151', customer: 'Acme Corporation', amount: 2499.00, status: 'paid', date: '2024-10-15', dueDate: '2024-10-30' },
]

const plans = [
  { name: 'Starter', monthlyPrice: 99, annualPrice: 990, features: ['5 Users', '10GB Storage', 'Basic Support'] },
  { name: 'Professional', monthlyPrice: 499, annualPrice: 4990, features: ['25 Users', '100GB Storage', 'Priority Support', 'API Access'] },
  { name: 'Enterprise', monthlyPrice: 2499, annualPrice: 24990, features: ['Unlimited Users', 'Unlimited Storage', 'Dedicated Support', 'API Access', 'Custom Integrations', 'SLA'] },
]

export default function SubscriptionBillingTemplate() {
  const [activeTab, setActiveTab] = useState(0)
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false)
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false)
  const [selectedSubscription, setSelectedSubscription] = useState(null)

  // Calculate metrics
  const totalMRR = subscriptions.reduce((sum, sub) => sum + sub.mrr, 0)
  const totalARR = totalMRR * 12
  const activeSubscriptions = subscriptions.filter(s => s.status === 'active').length
  const churnedThisMonth = subscriptions.filter(s => s.status === 'cancelled').length
  const churnRate = ((churnedThisMonth / (activeSubscriptions + churnedThisMonth)) * 100).toFixed(1)

  const getStatusIndicator = (status) => {
    switch (status) {
      case 'active':
        return <Indicator label="Active" status="success" size="small" />
      case 'trial':
        return <Indicator label="Trial" status="info" size="small" />
      case 'past_due':
        return <Indicator label="Past Due" status="error" size="small" />
      case 'cancelled':
        return <Indicator label="Cancelled" status="inactive" size="small" />
      case 'paid':
        return <Indicator label="Paid" status="success" size="small" />
      case 'pending':
        return <Indicator label="Pending" status="warning" size="small" />
      case 'overdue':
        return <Indicator label="Overdue" status="error" size="small" />
      default:
        return <Indicator label={status} status="inactive" size="small" />
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* Header */}
      <Paper elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="xl" sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h5" fontWeight={600}>Subscription & Billing</Typography>
              <Typography variant="body2" color="text.secondary">
                Manage customer subscriptions, invoices, and revenue
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="outlined" startIcon={<ReceiptIcon />} onClick={() => setInvoiceDialogOpen(true)}>
                Generate Invoice
              </Button>
              <Button variant="contained" color="secondary" startIcon={<AddIcon />}>
                New Subscription
              </Button>
            </Box>
          </Box>
        </Container>
      </Paper>

      {/* Metrics Cards */}
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Monthly Recurring Revenue</Typography>
                  <AttachMoneyIcon color="primary" />
                </Box>
                <Typography variant="h4" fontWeight={700}>${totalMRR.toLocaleString()}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                  <TrendingUpIcon sx={{ fontSize: 16, color: 'success.main' }} />
                  <Typography variant="caption" color="success.main">+12.5% from last month</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Annual Recurring Revenue</Typography>
                  <TrendingUpIcon color="success" />
                </Box>
                <Typography variant="h4" fontWeight={700}>${(totalARR / 1000).toFixed(0)}K</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                  <TrendingUpIcon sx={{ fontSize: 16, color: 'success.main' }} />
                  <Typography variant="caption" color="success.main">+18.2% YoY</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Active Subscriptions</Typography>
                  <PeopleIcon color="info" />
                </Box>
                <Typography variant="h4" fontWeight={700}>{activeSubscriptions}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                  <TrendingUpIcon sx={{ fontSize: 16, color: 'success.main' }} />
                  <Typography variant="caption" color="success.main">+3 this month</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Churn Rate</Typography>
                  <CancelIcon color="error" />
                </Box>
                <Typography variant="h4" fontWeight={700}>{churnRate}%</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                  <TrendingDownIcon sx={{ fontSize: 16, color: 'success.main' }} />
                  <Typography variant="caption" color="success.main">-0.5% from last month</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Alerts */}
        <Box sx={{ mb: 3 }}>
          <Alert severity="warning" sx={{ mb: 1 }}>
            <strong>1 subscription</strong> has a past due payment. <Button size="small">View Details</Button>
          </Alert>
          <Alert severity="info">
            <strong>2 subscriptions</strong> are renewing in the next 7 days. <Button size="small">Review</Button>
          </Alert>
        </Box>

        {/* Tabs */}
        <Paper sx={{ mb: 3 }}>
          <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} sx={{ '& .MuiTab-root': { textTransform: 'none' } }}>
            <Tab label="Subscriptions" />
            <Tab label="Invoices" />
            <Tab label="Plans" />
            <Tab label="Revenue" />
          </Tabs>
        </Paper>

        {/* Subscriptions Tab */}
        {activeTab === 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Plan</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Billing</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>MRR</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Next Billing</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subscriptions.map((sub) => (
                  <TableRow key={sub.id} hover>
                    <TableCell>
                      <Typography fontWeight={500}>{sub.customer}</Typography>
                    </TableCell>
                    <TableCell>
                      <Indicator label={sub.plan} color="cyan" size="small" />
                    </TableCell>
                    <TableCell>{sub.billing}</TableCell>
                    <TableCell>${sub.price.toLocaleString()}</TableCell>
                    <TableCell>${sub.mrr.toLocaleString()}</TableCell>
                    <TableCell>{getStatusIndicator(sub.status)}</TableCell>
                    <TableCell>{sub.nextBilling || '-'}</TableCell>
                    <TableCell align="right">
                      <Button
                        size="small"
                        onClick={() => {
                          setSelectedSubscription(sub)
                          setUpgradeDialogOpen(true)
                        }}
                      >
                        Manage
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Invoices Tab */}
        {activeTab === 1 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Invoice</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Due Date</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id} hover>
                    <TableCell>
                      <Typography fontWeight={500} fontFamily="monospace">{invoice.id}</Typography>
                    </TableCell>
                    <TableCell>{invoice.customer}</TableCell>
                    <TableCell>${invoice.amount.toLocaleString()}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.dueDate}</TableCell>
                    <TableCell>{getStatusIndicator(invoice.status)}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small">
                        <DownloadIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small">
                        <SendIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Plans Tab */}
        {activeTab === 2 && (
          <Grid container spacing={3}>
            {plans.map((plan) => (
              <Grid size={{ xs: 12, md: 4 }} key={plan.name}>
                <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom>{plan.name}</Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="h4" fontWeight={700} component="span">
                        ${plan.monthlyPrice}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" component="span">/month</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      or ${plan.annualPrice}/year (save 17%)
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <List dense disablePadding>
                      {plan.features.map((feature) => (
                        <ListItem key={feature} disableGutters sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircleIcon fontSize="small" color="success" />
                          </ListItemIcon>
                          <ListItemText primary={feature} primaryTypographyProps={{ variant: 'body2' }} />
                        </ListItem>
                      ))}
                    </List>
                    <Button variant="outlined" fullWidth sx={{ mt: 2 }} startIcon={<EditIcon />}>
                      Edit Plan
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Revenue Tab */}
        {activeTab === 3 && (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>Revenue Trend</Typography>
                <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.100', borderRadius: 1 }}>
                  <Typography color="text.secondary">Revenue Chart Placeholder</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>Revenue by Plan</Typography>
                <Box sx={{ mt: 2 }}>
                  {[
                    { name: 'Enterprise', revenue: 9580.50, percent: 68 },
                    { name: 'Professional', revenue: 1413.83, percent: 24 },
                    { name: 'Starter', revenue: 0, percent: 0 },
                  ].map((item) => (
                    <Box key={item.name} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">{item.name}</Typography>
                        <Typography variant="body2" fontWeight={600}>${item.revenue.toLocaleString()}</Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={item.percent}
                        sx={{ height: 8, borderRadius: 1 }}
                      />
                    </Box>
                  ))}
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" fontWeight={600}>Total MRR</Typography>
                  <Typography variant="body2" fontWeight={700}>${totalMRR.toLocaleString()}</Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>

      {/* Manage Subscription Dialog */}
      <Dialog open={upgradeDialogOpen} onClose={() => setUpgradeDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Manage Subscription</DialogTitle>
        <DialogContent>
          {selectedSubscription && (
            <>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary">Customer</Typography>
                <Typography variant="h6">{selectedSubscription.customer}</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">Current Plan</Typography>
                  <Typography variant="body1" fontWeight={500}>{selectedSubscription.plan}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">Status</Typography>
                  {getStatusIndicator(selectedSubscription.status)}
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">Billing Cycle</Typography>
                  <Typography variant="body1">{selectedSubscription.billing}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">Next Billing</Typography>
                  <Typography variant="body1">{selectedSubscription.nextBilling || 'N/A'}</Typography>
                </Grid>
              </Grid>
              <Divider sx={{ my: 3 }} />
              <Typography variant="subtitle2" gutterBottom>Change Plan</Typography>
              <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <InputLabel>Plan</InputLabel>
                <Select label="Plan" defaultValue={selectedSubscription.plan}>
                  {plans.map(p => (
                    <MenuItem key={p.name} value={p.name}>{p.name} - ${p.monthlyPrice}/mo</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Alert severity="info" sx={{ mt: 2 }}>
                Plan changes will be prorated and reflected in the next invoice.
              </Alert>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUpgradeDialogOpen(false)}>Cancel</Button>
          <Button variant="outlined" color="error" startIcon={<CancelIcon />}>
            Cancel Subscription
          </Button>
          <Button variant="contained">Save Changes</Button>
        </DialogActions>
      </Dialog>

      {/* Generate Invoice Dialog */}
      <Dialog open={invoiceDialogOpen} onClose={() => setInvoiceDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Generate Invoice</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
            <InputLabel>Customer</InputLabel>
            <Select label="Customer">
              {subscriptions.map(s => (
                <MenuItem key={s.id} value={s.id}>{s.customer}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Amount"
            type="number"
            sx={{ mb: 2 }}
            InputProps={{ startAdornment: <Typography sx={{ mr: 1 }}>$</Typography> }}
          />
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={2}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Due Date"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInvoiceDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" startIcon={<ReceiptIcon />}>Generate</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

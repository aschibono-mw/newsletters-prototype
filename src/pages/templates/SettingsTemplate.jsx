import { useState } from 'react'
import { Box, Container, Typography, Button, Grid, Card, CardContent, Avatar, TextField, Switch, FormControlLabel, Select, MenuItem, FormControl, InputLabel, Tabs, Tab, Divider, IconButton, Chip, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, Radio, RadioGroup, FormLabel, Alert, Dialog, DialogTitle, DialogContent, DialogActions, LinearProgress } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import Indicator from '../../components/core/Indicator'
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded'
import PersonIcon from '@mui/icons-material/PersonRounded'
import SecurityIcon from '@mui/icons-material/SecurityRounded'
import NotificationsIcon from '@mui/icons-material/NotificationsRounded'
import PaletteIcon from '@mui/icons-material/PaletteRounded'
import PaymentIcon from '@mui/icons-material/PaymentRounded'
import LockIcon from '@mui/icons-material/LockRounded'
import EditIcon from '@mui/icons-material/EditRounded'
import DeleteIcon from '@mui/icons-material/DeleteRounded'
import GoogleIcon from '@mui/icons-material/Google'
import GitHubIcon from '@mui/icons-material/GitHub'
import CheckCircleIcon from '@mui/icons-material/CheckCircleRounded'
import WarningIcon from '@mui/icons-material/WarningRounded'
import CameraAltIcon from '@mui/icons-material/CameraAltRounded'
import VisibilityIcon from '@mui/icons-material/VisibilityRounded'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOffRounded'

const settingsTabs = [
  { icon: <PersonIcon />, label: 'Profile' },
  { icon: <SecurityIcon />, label: 'Account' },
  { icon: <NotificationsIcon />, label: 'Notifications' },
  { icon: <LockIcon />, label: 'Privacy' },
  { icon: <PaymentIcon />, label: 'Billing' },
  { icon: <PaletteIcon />, label: 'Appearance' },
]

const connectedAccounts = [
  { name: 'Google', email: 'john.doe@gmail.com', icon: <GoogleIcon />, connected: true },
  { name: 'GitHub', email: 'Not connected', icon: <GitHubIcon />, connected: false },
]

const notificationSettings = [
  { category: 'Email Notifications', items: [
    { name: 'Product updates', description: 'News about product features', enabled: true },
    { name: 'Security alerts', description: 'Account security notifications', enabled: true },
    { name: 'Marketing emails', description: 'Promotional content and offers', enabled: false },
  ]},
  { category: 'Push Notifications', items: [
    { name: 'New messages', description: 'When you receive a new message', enabled: true },
    { name: 'Task reminders', description: 'Upcoming task notifications', enabled: true },
    { name: 'Team updates', description: 'Activity from your team', enabled: false },
  ]},
]

const paymentMethods = [
  { type: 'Visa', last4: '4242', expiry: '12/25', default: true },
  { type: 'Mastercard', last4: '8888', expiry: '03/26', default: false },
]

const billingHistory = [
  { date: 'Nov 1, 2024', description: 'Professional Plan - Monthly', amount: '$29.00', status: 'Paid' },
  { date: 'Oct 1, 2024', description: 'Professional Plan - Monthly', amount: '$29.00', status: 'Paid' },
  { date: 'Sep 1, 2024', description: 'Professional Plan - Monthly', amount: '$29.00', status: 'Paid' },
]

function SettingsTemplate() {
  const [currentTab, setCurrentTab] = useState(0)
  const [showPassword, setShowPassword] = useState(false) // eslint-disable-line no-unused-vars
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  const ProfileTab = () => (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Profile Information</Typography>

      {/* Avatar */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
        <Box sx={{ position: 'relative' }}>
          <Avatar sx={{ width: 100, height: 100, fontSize: '2rem' }}>JD</Avatar>
          <IconButton
            size="small"
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': { backgroundColor: 'primary.dark' },
            }}
          >
            <CameraAltIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Profile Photo</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>JPG, PNG or GIF. Max 5MB.</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button size="small" variant="outlined" sx={{ textTransform: 'none' }}>Upload</Button>
            <Button size="small" color="error" sx={{ textTransform: 'none' }}>Remove</Button>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField label="First Name" defaultValue="John" fullWidth />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField label="Last Name" defaultValue="Doe" fullWidth />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField label="Email" defaultValue="john.doe@example.com" fullWidth />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField label="Phone" defaultValue="+1 (555) 123-4567" fullWidth />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField label="Bio" multiline rows={3} defaultValue="Product designer with 10+ years of experience." fullWidth />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <InputLabel>Timezone</InputLabel>
            <Select defaultValue="utc-8" label="Timezone">
              <MenuItem value="utc-8">Pacific Time (UTC-8)</MenuItem>
              <MenuItem value="utc-5">Eastern Time (UTC-5)</MenuItem>
              <MenuItem value="utc+0">UTC</MenuItem>
              <MenuItem value="utc+1">Central European Time (UTC+1)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <InputLabel>Language</InputLabel>
            <Select defaultValue="en" label="Language">
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="es">Spanish</MenuItem>
              <MenuItem value="fr">French</MenuItem>
              <MenuItem value="de">German</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  )

  const AccountTab = () => (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Account Security</Typography>

      {/* Password */}
      <Card sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Change Password</Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField label="Current Password" type="password" fullWidth />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField label="New Password" type={showPassword ? 'text' : 'password'} fullWidth />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField label="Confirm New Password" type="password" fullWidth />
          </Grid>
        </Grid>
        <Button variant="contained" sx={{ mt: 2, textTransform: 'none' }}>Update Password</Button>
      </Card>

      {/* Two-Factor */}
      <Card sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Two-Factor Authentication</Typography>
            <Typography variant="body2" color="text.secondary">Add an extra layer of security to your account</Typography>
          </Box>
          <Switch checked={twoFactorEnabled} onChange={() => setTwoFactorEnabled(!twoFactorEnabled)} />
        </Box>
        {twoFactorEnabled && (
          <Alert severity="success" sx={{ mt: 2 }}>Two-factor authentication is enabled</Alert>
        )}
      </Card>

      {/* Connected Accounts */}
      <Card sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Connected Accounts</Typography>
        <List disablePadding>
          {connectedAccounts.map((account) => (
            <ListItem key={account.name} sx={{ px: 0 }}>
              <ListItemIcon>{account.icon}</ListItemIcon>
              <ListItemText primary={account.name} secondary={account.email} />
              <Button variant={account.connected ? 'outlined' : 'contained'} size="small" sx={{ textTransform: 'none' }}>
                {account.connected ? 'Disconnect' : 'Connect'}
              </Button>
            </ListItem>
          ))}
        </List>
      </Card>

      {/* Danger Zone */}
      <Card sx={{ p: 3, border: '1px solid', borderColor: 'error.main' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'error.main', mb: 1 }}>Danger Zone</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Once you delete your account, there is no going back. Please be certain.
        </Typography>
        <Button variant="outlined" color="error" onClick={() => setDeleteDialogOpen(true)} sx={{ textTransform: 'none' }}>
          Delete Account
        </Button>
      </Card>
    </Box>
  )

  const NotificationsTab = () => (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Notification Preferences</Typography>
      {notificationSettings.map((category) => (
        <Card key={category.category} sx={{ p: 3, mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>{category.category}</Typography>
          <List disablePadding>
            {category.items.map((item, i) => (
              <ListItem key={item.name} sx={{ px: 0 }} divider={i < category.items.length - 1}>
                <ListItemText primary={item.name} secondary={item.description} />
                <Switch defaultChecked={item.enabled} />
              </ListItem>
            ))}
          </List>
        </Card>
      ))}
      <Card sx={{ p: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Email Digest</Typography>
        <FormControl fullWidth>
          <Select defaultValue="weekly">
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="never">Never</MenuItem>
          </Select>
        </FormControl>
      </Card>
    </Box>
  )

  const PrivacyTab = () => (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Privacy Settings</Typography>
      <Card sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Profile Visibility</Typography>
        <RadioGroup defaultValue="public">
          <FormControlLabel value="public" control={<Radio />} label="Public - Anyone can see your profile" />
          <FormControlLabel value="private" control={<Radio />} label="Private - Only approved followers can see" />
          <FormControlLabel value="hidden" control={<Radio />} label="Hidden - Your profile is not visible" />
        </RadioGroup>
      </Card>
      <Card sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Data & Privacy</Typography>
        <List disablePadding>
          <ListItem sx={{ px: 0 }}>
            <ListItemText primary="Show activity status" secondary="Let others see when you're active" />
            <Switch defaultChecked />
          </ListItem>
          <ListItem sx={{ px: 0 }}>
            <ListItemText primary="Allow analytics" secondary="Help us improve by sharing usage data" />
            <Switch defaultChecked />
          </ListItem>
        </List>
      </Card>
      <Button variant="outlined" sx={{ textTransform: 'none' }}>Download My Data</Button>
    </Box>
  )

  const BillingTab = () => (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Billing & Subscription</Typography>

      {/* Current Plan */}
      <Card sx={{ p: 3, mb: 3, backgroundColor: 'primary.main', color: 'white' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>Professional Plan</Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>$29/month - Next billing: Dec 1, 2024</Typography>
          </Box>
          <Button variant="contained" sx={{ backgroundColor: 'white', color: 'primary.main', textTransform: 'none', '&:hover': { backgroundColor: 'grey.100' } }}>
            Upgrade
          </Button>
        </Box>
      </Card>

      {/* Payment Methods */}
      <Card sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Payment Methods</Typography>
          <Button size="small" sx={{ textTransform: 'none' }}>+ Add New</Button>
        </Box>
        <List disablePadding>
          {paymentMethods.map((method) => (
            <ListItem key={method.last4} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, mb: 1, px: 2 }}>
              <ListItemText
                primary={`${method.type} **** ${method.last4}`}
                secondary={`Expires ${method.expiry}`}
              />
              {method.default && <Box component="span" sx={{ mr: 2 }}><Indicator label="Default" status="success" /></Box>}
              <IconButton size="small"><EditIcon fontSize="small" /></IconButton>
              <IconButton size="small"><DeleteIcon fontSize="small" /></IconButton>
            </ListItem>
          ))}
        </List>
      </Card>

      {/* Billing History */}
      <Card sx={{ p: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Billing History</Typography>
        <List disablePadding>
          {billingHistory.map((item, i) => (
            <ListItem key={i} sx={{ px: 0 }} divider={i < billingHistory.length - 1}>
              <ListItemText primary={item.description} secondary={item.date} />
              <Typography variant="body2" sx={{ mr: 2 }}>{item.amount}</Typography>
              <Indicator label={item.status} status={item.status} />
            </ListItem>
          ))}
        </List>
      </Card>
    </Box>
  )

  const AppearanceTab = () => (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Appearance</Typography>
      <Card sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Theme</Typography>
        <RadioGroup defaultValue="light" row>
          {['Light', 'Dark', 'System'].map((theme) => (
            <Box key={theme} sx={{ mr: 3, textAlign: 'center' }}>
              <Box
                sx={{
                  width: 80,
                  height: 60,
                  border: '2px solid',
                  borderColor: theme === 'Light' ? 'primary.main' : 'divider',
                  borderRadius: 1,
                  mb: 1,
                  backgroundColor: theme === 'Dark' ? 'grey.900' : theme === 'System' ? 'grey.500' : 'white',
                }}
              />
              <FormControlLabel value={theme.toLowerCase()} control={<Radio />} label={theme} />
            </Box>
          ))}
        </RadioGroup>
      </Card>
      <Card sx={{ p: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Display</Typography>
        <List disablePadding>
          <ListItem sx={{ px: 0 }}>
            <ListItemText primary="Compact mode" secondary="Reduce spacing and padding" />
            <Switch />
          </ListItem>
          <ListItem sx={{ px: 0 }}>
            <ListItemText primary="Reduce animations" secondary="Minimize motion effects" />
            <Switch />
          </ListItem>
        </List>
      </Card>
    </Box>
  )

  const renderTabContent = () => {
    switch (currentTab) {
      case 0: return <ProfileTab />
      case 1: return <AccountTab />
      case 2: return <NotificationsTab />
      case 3: return <PrivacyTab />
      case 4: return <BillingTab />
      case 5: return <AppearanceTab />
      default: return <ProfileTab />
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'grey.100' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Button component={RouterLink} to="/templates" startIcon={<ArrowBackIcon />} sx={{ mb: 3, textTransform: 'none' }}>
          Back to Templates
        </Button>

        <Typography variant="h5" sx={{ fontWeight: 700, mb: 4 }}>Settings</Typography>

        <Grid container spacing={3}>
          {/* Sidebar Tabs */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
              <List disablePadding>
                {settingsTabs.map((tab, i) => (
                  <ListItem
                    key={tab.label}
                    button
                    selected={currentTab === i}
                    onClick={() => setCurrentTab(i)}
                    sx={{
                      borderLeft: currentTab === i ? '3px solid' : '3px solid transparent',
                      borderColor: currentTab === i ? 'primary.main' : 'transparent',
                      '&.Mui-selected': { backgroundColor: 'primary.light' },
                    }}
                  >
                    <ListItemIcon sx={{ color: currentTab === i ? 'primary.main' : 'text.secondary', minWidth: 40 }}>
                      {tab.icon}
                    </ListItemIcon>
                    <ListItemText primary={tab.label} primaryTypographyProps={{ fontWeight: currentTab === i ? 600 : 400 }} />
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>

          {/* Content */}
          <Grid size={{ xs: 12, md: 9 }}>
            <Card sx={{ p: 4 }}>
              {renderTabContent()}
              <Divider sx={{ my: 4 }} />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="outlined" sx={{ textTransform: 'none' }}>Cancel</Button>
                <Button variant="contained" sx={{ textTransform: 'none' }}>Save Changes</Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete your account? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} sx={{ textTransform: 'none' }}>Cancel</Button>
          <Button color="error" variant="contained" sx={{ textTransform: 'none' }}>Delete Account</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default SettingsTemplate

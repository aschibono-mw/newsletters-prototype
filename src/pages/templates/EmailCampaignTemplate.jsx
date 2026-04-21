import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  FormControlLabel,
} from '@mui/material'
import Indicator from '../../components/core/Indicator'
import EmailIcon from '@mui/icons-material/EmailRounded'
import AddIcon from '@mui/icons-material/AddRounded'
import EditIcon from '@mui/icons-material/EditRounded'
import DeleteIcon from '@mui/icons-material/DeleteRounded'
import SendIcon from '@mui/icons-material/SendRounded'
import ScheduleIcon from '@mui/icons-material/ScheduleRounded'
import PreviewIcon from '@mui/icons-material/PreviewRounded'
import TextFieldsIcon from '@mui/icons-material/TextFieldsRounded'
import ImageIcon from '@mui/icons-material/ImageRounded'
import SmartButtonIcon from '@mui/icons-material/SmartButtonRounded'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRuleRounded'
import ContentCopyIcon from '@mui/icons-material/ContentCopyRounded'
import VisibilityIcon from '@mui/icons-material/VisibilityRounded'
import TouchAppIcon from '@mui/icons-material/TouchAppRounded'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphoneRounded'
import ComputerIcon from '@mui/icons-material/ComputerRounded'
import GroupIcon from '@mui/icons-material/GroupRounded'
import BarChartIcon from '@mui/icons-material/BarChartRounded'

const mockTemplates = [
  { id: 1, name: 'Welcome Email', category: 'Onboarding', thumbnail: '/api/placeholder/200/150' },
  { id: 2, name: 'Newsletter', category: 'Marketing', thumbnail: '/api/placeholder/200/150' },
  { id: 3, name: 'Product Update', category: 'Announcement', thumbnail: '/api/placeholder/200/150' },
  { id: 4, name: 'Promotional Offer', category: 'Sales', thumbnail: '/api/placeholder/200/150' },
]

const mockCampaigns = [
  {
    id: 1,
    name: 'November Newsletter',
    status: 'sent',
    recipients: 5420,
    sent: '2024-11-15',
    opens: 2845,
    clicks: 892,
    openRate: 52.5,
    clickRate: 16.5,
  },
  {
    id: 2,
    name: 'Black Friday Sale',
    status: 'scheduled',
    recipients: 12500,
    scheduled: '2024-11-29 09:00 AM',
    opens: 0,
    clicks: 0,
    openRate: 0,
    clickRate: 0,
  },
  {
    id: 3,
    name: 'Product Launch Teaser',
    status: 'draft',
    recipients: 0,
    opens: 0,
    clicks: 0,
    openRate: 0,
    clickRate: 0,
  },
]

const mockLists = [
  { id: 1, name: 'All Subscribers', count: 15420 },
  { id: 2, name: 'Premium Users', count: 3250 },
  { id: 3, name: 'Trial Users', count: 1890 },
  { id: 4, name: 'Inactive (30+ days)', count: 4520 },
]

const editorComponents = [
  { icon: <TextFieldsIcon />, label: 'Text Block' },
  { icon: <ImageIcon />, label: 'Image' },
  { icon: <SmartButtonIcon />, label: 'Button' },
  { icon: <HorizontalRuleIcon />, label: 'Divider' },
]

export default function EmailCampaignTemplate() {
  const [activeTab, setActiveTab] = useState(0)
  const [campaigns] = useState(mockCampaigns)
  const [editorOpen, setEditorOpen] = useState(false)
  const [previewMode, setPreviewMode] = useState('desktop')
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [scheduleOpen, setScheduleOpen] = useState(false)
  const [testEmailOpen, setTestEmailOpen] = useState(false)
  const [abTestEnabled, setAbTestEnabled] = useState(false)
  const [emailContent] = useState({
    subject: 'Your November Newsletter is Here!',
    subjectB: '',
    preheader: 'Check out our latest updates and exclusive offers',
    recipientList: 1,
    components: [
      { type: 'text', content: 'Hello {{first_name}},' },
      { type: 'text', content: 'We have exciting news to share with you this month!' },
      { type: 'image', src: '/api/placeholder/600/200', alt: 'Hero image' },
      { type: 'button', text: 'Learn More', url: '#' },
    ],
  })

  const _getStatusColor = (status) => {
    switch (status) {
      case 'sent':
        return 'success'
      case 'scheduled':
        return 'info'
      case 'draft':
        return 'default'
      default:
        return 'default'
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* Header */}
      <Paper elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="xl" sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h5" fontWeight={600}>Email Campaigns</Typography>
              <Typography variant="body2" color="text.secondary">
                Create and manage email marketing campaigns
              </Typography>
            </Box>
            <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={() => setEditorOpen(true)}>
              New Campaign
            </Button>
          </Box>
        </Container>
      </Paper>

      {/* Tabs */}
      <Container maxWidth="xl" sx={{ py: 3 }}>
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} sx={{ '& .MuiTab-root': { textTransform: 'none' } }}>
          <Tab label="Campaigns" />
          <Tab label="Templates" />
          <Tab label="Analytics" />
          <Tab label="Lists" />
        </Tabs>
      </Paper>

      {/* Campaigns Tab */}
      {activeTab === 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Campaign Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Recipients</TableCell>
                <TableCell>Open Rate</TableCell>
                <TableCell>Click Rate</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id} hover>
                  <TableCell>
                    <Typography variant="body1" fontWeight={500}>
                      {campaign.name}
                    </Typography>
                    {campaign.sent && (
                      <Typography variant="caption" color="text.secondary">
                        Sent {campaign.sent}
                      </Typography>
                    )}
                    {campaign.scheduled && (
                      <Typography variant="caption" color="text.secondary">
                        Scheduled for {campaign.scheduled}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Indicator label={campaign.status} status={campaign.status === 'sent' ? 'success' : campaign.status === 'scheduled' ? 'info' : 'inactive'} size="small" />
                  </TableCell>
                  <TableCell>{campaign.recipients.toLocaleString()}</TableCell>
                  <TableCell>
                    {campaign.status === 'sent' && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={campaign.openRate}
                          sx={{ width: 60, height: 6, borderRadius: 1 }}
                        />
                        <Typography variant="body2">{campaign.openRate}%</Typography>
                      </Box>
                    )}
                    {campaign.status !== 'sent' && '-'}
                  </TableCell>
                  <TableCell>
                    {campaign.status === 'sent' && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={campaign.clickRate}
                          sx={{ width: 60, height: 6, borderRadius: 1 }}
                          color="secondary"
                        />
                        <Typography variant="body2">{campaign.clickRate}%</Typography>
                      </Box>
                    )}
                    {campaign.status !== 'sent' && '-'}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Templates Tab */}
      {activeTab === 1 && (
        <Grid container spacing={3}>
          {mockTemplates.map((template) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={template.id}>
              <Card sx={{ height: '100%', boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
                <CardMedia
                  component="div"
                  sx={{ height: 150, bgcolor: 'grey.200', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <EmailIcon sx={{ fontSize: 48, color: 'grey.400' }} />
                </CardMedia>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={500}>
                    {template.name}
                  </Typography>
                  <Chip label={template.category} size="small" sx={{ mt: 1 }} />
                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Button size="small" variant="outlined" fullWidth>
                      Preview
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      fullWidth
                      onClick={() => {
                        setSelectedTemplate(template)
                        setEditorOpen(true)
                      }}
                    >
                      Use
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Analytics Tab */}
      {activeTab === 2 && (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <GroupIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4">15,420</Typography>
              <Typography variant="body2" color="text.secondary">
                Total Subscribers
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <SendIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              <Typography variant="h4">48</Typography>
              <Typography variant="body2" color="text.secondary">
                Campaigns Sent
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <VisibilityIcon sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
              <Typography variant="h4">45.2%</Typography>
              <Typography variant="body2" color="text.secondary">
                Avg Open Rate
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <TouchAppIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
              <Typography variant="h4">12.8%</Typography>
              <Typography variant="body2" color="text.secondary">
                Avg Click Rate
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Campaign Performance (Last 30 Days)
              </Typography>
              <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.100', borderRadius: 1 }}>
                <BarChartIcon sx={{ fontSize: 64, color: 'grey.400' }} />
                <Typography variant="body1" color="text.secondary" sx={{ ml: 2 }}>
                  Chart visualization would go here
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Lists Tab */}
      {activeTab === 3 && (
        <Paper>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Subscriber Lists</Typography>
            <Button variant="outlined" startIcon={<AddIcon />}>
              Create List
            </Button>
          </Box>
          <Divider />
          <List>
            {mockLists.map((list) => (
              <ListItem
                key={list.id}
                secondaryAction={
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button size="small">View</Button>
                    <IconButton size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary={list.name} secondary={`${list.count.toLocaleString()} subscribers`} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
      </Container>

      {/* Email Editor Dialog */}
      <Dialog open={editorOpen} onClose={() => setEditorOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">{selectedTemplate ? `Edit: ${selectedTemplate.name}` : 'New Campaign'}</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                onClick={() => setPreviewMode('desktop')}
                color={previewMode === 'desktop' ? 'primary' : 'default'}
              >
                <ComputerIcon />
              </IconButton>
              <IconButton
                onClick={() => setPreviewMode('mobile')}
                color={previewMode === 'mobile' ? 'primary' : 'default'}
              >
                <PhoneIphoneIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            {/* Left Panel - Components */}
            <Grid size={{ xs: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 2 }}>
                Components
              </Typography>
              {editorComponents.map((comp, index) => (
                <Paper
                  key={index}
                  sx={{
                    p: 2,
                    mb: 1,
                    textAlign: 'center',
                    cursor: 'grab',
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                >
                  {comp.icon}
                  <Typography variant="caption" display="block">
                    {comp.label}
                  </Typography>
                </Paper>
              ))}
            </Grid>

            {/* Center - Email Preview */}
            <Grid size={{ xs: 6 }}>
              <Paper
                sx={{
                  p: 3,
                  maxWidth: previewMode === 'mobile' ? 375 : '100%',
                  mx: 'auto',
                  minHeight: 400,
                }}
              >
                <TextField fullWidth label="Subject Line" value={emailContent.subject} sx={{ mb: 2 }} size="small" />
                {abTestEnabled && (
                  <TextField
                    fullWidth
                    label="Subject Line B (A/B Test)"
                    value={emailContent.subjectB}
                    sx={{ mb: 2 }}
                    size="small"
                  />
                )}
                <TextField
                  fullWidth
                  label="Preheader Text"
                  value={emailContent.preheader}
                  sx={{ mb: 3 }}
                  size="small"
                  helperText="Preview text shown in inbox"
                />
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1, minHeight: 200 }}>
                  {emailContent.components.map((comp, index) => (
                    <Box key={index} sx={{ mb: 2, p: 1, border: '1px dashed', borderColor: 'grey.300', borderRadius: 1 }}>
                      {comp.type === 'text' && <Typography>{comp.content}</Typography>}
                      {comp.type === 'image' && (
                        <Box sx={{ bgcolor: 'grey.200', height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <ImageIcon sx={{ color: 'grey.400' }} />
                        </Box>
                      )}
                      {comp.type === 'button' && (
                        <Button variant="contained" size="small">
                          {comp.text}
                        </Button>
                      )}
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>

            {/* Right Panel - Settings */}
            <Grid size={{ xs: 4 }}>
              <Typography variant="subtitle2" sx={{ mb: 2 }}>
                Campaign Settings
              </Typography>
              <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <InputLabel>Recipient List</InputLabel>
                <Select value={emailContent.recipientList} label="Recipient List">
                  {mockLists.map((list) => (
                    <MenuItem key={list.id} value={list.id}>
                      {list.name} ({list.count.toLocaleString()})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControlLabel
                control={<Switch checked={abTestEnabled} onChange={(e) => setAbTestEnabled(e.target.checked)} />}
                label="Enable A/B Test"
                sx={{ mb: 2 }}
              />
              <Divider sx={{ my: 2 }} />
              <Typography variant="caption" color="text.secondary">
                Unsubscribe link will be automatically added to the footer of your email.
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditorOpen(false)}>Cancel</Button>
          <Button variant="outlined" onClick={() => setTestEmailOpen(true)}>
            Send Test
          </Button>
          <Button variant="outlined" startIcon={<ScheduleIcon />} onClick={() => setScheduleOpen(true)}>
            Schedule
          </Button>
          <Button variant="contained" startIcon={<SendIcon />}>
            Send Now
          </Button>
        </DialogActions>
      </Dialog>

      {/* Schedule Dialog */}
      <Dialog open={scheduleOpen} onClose={() => setScheduleOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Schedule Campaign</DialogTitle>
        <DialogContent>
          <TextField fullWidth type="datetime-local" label="Send Date & Time" sx={{ mt: 2 }} InputLabelProps={{ shrink: true }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setScheduleOpen(false)}>Cancel</Button>
          <Button variant="contained">Schedule</Button>
        </DialogActions>
      </Dialog>

      {/* Test Email Dialog */}
      <Dialog open={testEmailOpen} onClose={() => setTestEmailOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Send Test Email</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Email Address" placeholder="test@example.com" sx={{ mt: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTestEmailOpen(false)}>Cancel</Button>
          <Button variant="contained">Send Test</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

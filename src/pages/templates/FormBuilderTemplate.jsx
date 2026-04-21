import { useState } from 'react'
import {
  Box,
  Container,
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Card,
  CardContent,
  Checkbox,
  Radio,
  RadioGroup,
} from '@mui/material'
import Indicator from '../../components/core/Indicator'
import DynamicFormIcon from '@mui/icons-material/DynamicFormRounded'
import AddIcon from '@mui/icons-material/AddRounded'
import EditIcon from '@mui/icons-material/EditRounded'
import DeleteIcon from '@mui/icons-material/DeleteRounded'
import ContentCopyIcon from '@mui/icons-material/ContentCopyRounded'
import VisibilityIcon from '@mui/icons-material/VisibilityRounded'
import ShareIcon from '@mui/icons-material/ShareRounded'
import DownloadIcon from '@mui/icons-material/DownloadRounded'
import TextFieldsIcon from '@mui/icons-material/TextFieldsRounded'
import EmailIcon from '@mui/icons-material/EmailRounded'
import NumbersIcon from '@mui/icons-material/NumbersRounded'
import CalendarTodayIcon from '@mui/icons-material/CalendarTodayRounded'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDownRounded'
import CheckBoxIcon from '@mui/icons-material/CheckBoxRounded'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonCheckedRounded'
import AttachFileIcon from '@mui/icons-material/AttachFileRounded'
import DragIndicatorIcon from '@mui/icons-material/DragIndicatorRounded'
import SettingsIcon from '@mui/icons-material/SettingsRounded'
import CodeIcon from '@mui/icons-material/CodeRounded'
import LinkIcon from '@mui/icons-material/LinkRounded'

const mockForms = [
  {
    id: 1,
    name: 'Contact Form',
    status: 'published',
    submissions: 156,
    lastSubmission: '2024-11-20 14:32',
    created: '2024-10-15',
  },
  {
    id: 2,
    name: 'Event Registration',
    status: 'published',
    submissions: 89,
    lastSubmission: '2024-11-19 09:15',
    created: '2024-11-01',
  },
  {
    id: 3,
    name: 'Customer Feedback Survey',
    status: 'draft',
    submissions: 0,
    lastSubmission: null,
    created: '2024-11-18',
  },
]

const mockSubmissions = [
  { id: 1, name: 'John Doe', email: 'john@example.com', message: 'Great product!', submitted: '2024-11-20 14:32' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', message: 'Need more info...', submitted: '2024-11-20 10:15' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', message: 'Quick question...', submitted: '2024-11-19 16:45' },
]

const fieldTypes = [
  { type: 'text', icon: <TextFieldsIcon />, label: 'Short Text' },
  { type: 'email', icon: <EmailIcon />, label: 'Email' },
  { type: 'number', icon: <NumbersIcon />, label: 'Number' },
  { type: 'date', icon: <CalendarTodayIcon />, label: 'Date' },
  { type: 'dropdown', icon: <ArrowDropDownIcon />, label: 'Dropdown' },
  { type: 'checkbox', icon: <CheckBoxIcon />, label: 'Checkbox' },
  { type: 'radio', icon: <RadioButtonCheckedIcon />, label: 'Radio' },
  { type: 'file', icon: <AttachFileIcon />, label: 'File Upload' },
]

export default function FormBuilderTemplate() {
  const [forms] = useState(mockForms)
  const [activeTab, setActiveTab] = useState(0)
  const [builderOpen, setBuilderOpen] = useState(false)
  const [, setSelectedForm] = useState(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [formFields, setFormFields] = useState([
    { id: 1, type: 'text', label: 'Full Name', required: true, placeholder: 'Enter your name' },
    { id: 2, type: 'email', label: 'Email Address', required: true, placeholder: 'your@email.com' },
    { id: 3, type: 'dropdown', label: 'Subject', required: true, options: ['General Inquiry', 'Support', 'Sales', 'Other'] },
    { id: 4, type: 'text', label: 'Message', required: false, placeholder: 'Your message...', multiline: true },
  ])
  const [formSettings, setFormSettings] = useState({
    name: 'Contact Form',
    submitButtonText: 'Submit',
    successMessage: 'Thank you for your submission!',
    emailNotification: true,
    notificationEmail: 'admin@example.com',
  })

  const handleAddField = (fieldType) => {
    const newField = {
      id: Date.now(),
      type: fieldType.type,
      label: `New ${fieldType.label}`,
      required: false,
      placeholder: '',
    }
    if (fieldType.type === 'dropdown' || fieldType.type === 'radio') {
      newField.options = ['Option 1', 'Option 2', 'Option 3']
    }
    setFormFields([...formFields, newField])
  }

  const handleDeleteField = (fieldId) => {
    setFormFields(formFields.filter((f) => f.id !== fieldId))
  }

  const renderFieldPreview = (field) => {
    switch (field.type) {
      case 'text':
        return <TextField fullWidth size="small" label={field.label} placeholder={field.placeholder} required={field.required} multiline={field.multiline} rows={field.multiline ? 3 : 1} />
      case 'email':
        return <TextField fullWidth size="small" type="email" label={field.label} placeholder={field.placeholder} required={field.required} />
      case 'number':
        return <TextField fullWidth size="small" type="number" label={field.label} placeholder={field.placeholder} required={field.required} />
      case 'date':
        return <TextField fullWidth size="small" type="date" label={field.label} required={field.required} InputLabelProps={{ shrink: true }} />
      case 'dropdown':
        return (
          <FormControl fullWidth size="small" required={field.required}>
            <InputLabel>{field.label}</InputLabel>
            <Select label={field.label}>
              {field.options?.map((opt, i) => (
                <MenuItem key={i} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )
      case 'checkbox':
        return <FormControlLabel control={<Checkbox />} label={field.label} />
      case 'radio':
        return (
          <FormControl>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {field.label} {field.required && '*'}
            </Typography>
            <RadioGroup>
              {field.options?.map((opt, i) => (
                <FormControlLabel key={i} value={opt} control={<Radio />} label={opt} />
              ))}
            </RadioGroup>
          </FormControl>
        )
      case 'file':
        return (
          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {field.label} {field.required && '*'}
            </Typography>
            <Button variant="outlined" component="label" startIcon={<AttachFileIcon />}>
              Choose File
              <input type="file" hidden />
            </Button>
          </Box>
        )
      default:
        return null
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* Header */}
      <Paper elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="xl" sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h5" fontWeight={600}>Form Builder</Typography>
              <Typography variant="body2" color="text.secondary">
                Create and manage custom forms
              </Typography>
            </Box>
            <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={() => setBuilderOpen(true)}>
              New Form
            </Button>
          </Box>
        </Container>
      </Paper>

      {/* Tabs */}
      <Container maxWidth="xl" sx={{ py: 3 }}>
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)}>
          <Tab label="My Forms" />
          <Tab label="Submissions" />
        </Tabs>
      </Paper>

      {/* Forms Tab */}
      {activeTab === 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Form Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Submissions</TableCell>
                <TableCell>Last Submission</TableCell>
                <TableCell>Created</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {forms.map((form) => (
                <TableRow key={form.id} hover>
                  <TableCell>
                    <Typography variant="body1" fontWeight={500}>
                      {form.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Indicator label={form.status} status={form.status === 'published' ? 'success' : 'inactive'} size="small" />
                  </TableCell>
                  <TableCell>{form.submissions}</TableCell>
                  <TableCell>{form.lastSubmission || '-'}</TableCell>
                  <TableCell>{form.created}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => {
                        setSelectedForm(form)
                        setBuilderOpen(true)
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => setPreviewOpen(true)}>
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => setShareOpen(true)}>
                      <ShareIcon fontSize="small" />
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

      {/* Submissions Tab */}
      {activeTab === 1 && (
        <Paper>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Select Form</InputLabel>
              <Select label="Select Form" defaultValue={1}>
                {forms.map((form) => (
                  <MenuItem key={form.id} value={form.id}>
                    {form.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="outlined" startIcon={<DownloadIcon />}>
              Export CSV
            </Button>
          </Box>
          <Divider />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Submitted</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockSubmissions.map((submission) => (
                  <TableRow key={submission.id} hover>
                    <TableCell>{submission.name}</TableCell>
                    <TableCell>{submission.email}</TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ maxWidth: 300 }} noWrap>
                        {submission.message}
                      </Typography>
                    </TableCell>
                    <TableCell>{submission.submitted}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small">
                        <VisibilityIcon fontSize="small" />
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
        </Paper>
      )}
      </Container>

      {/* Form Builder Dialog */}
      <Dialog open={builderOpen} onClose={() => setBuilderOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <TextField
              variant="standard"
              value={formSettings.name}
              onChange={(e) => setFormSettings({ ...formSettings, name: e.target.value })}
              sx={{ '& input': { fontSize: '1.25rem', fontWeight: 500 } }}
            />
            <Box>
              <IconButton onClick={() => setSettingsOpen(true)}>
                <SettingsIcon />
              </IconButton>
              <Button variant="outlined" sx={{ ml: 1 }} onClick={() => setPreviewOpen(true)}>
                Preview
              </Button>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            {/* Field Types Panel */}
            <Grid size={{ xs: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 2 }}>
                Field Types
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {fieldTypes.map((fieldType) => (
                  <Paper
                    key={fieldType.type}
                    sx={{
                      p: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                    onClick={() => handleAddField(fieldType)}
                  >
                    {fieldType.icon}
                    <Typography variant="body2">{fieldType.label}</Typography>
                  </Paper>
                ))}
              </Box>
            </Grid>

            {/* Form Canvas */}
            <Grid size={{ xs: 9 }}>
              <Typography variant="subtitle2" sx={{ mb: 2 }}>
                Form Fields (Drag to reorder)
              </Typography>
              <Paper variant="outlined" sx={{ p: 2, minHeight: 400 }}>
                {formFields.map((field) => (
                  <Paper
                    key={field.id}
                    sx={{
                      p: 2,
                      mb: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      '&:hover': { borderColor: 'primary.main' },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <IconButton size="small" sx={{ cursor: 'grab', mt: 0.5 }}>
                        <DragIndicatorIcon />
                      </IconButton>
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Chip label={field.type} size="small" variant="outlined" />
                          <Box>
                            <FormControlLabel
                              control={
                                <Switch
                                  size="small"
                                  checked={field.required}
                                  onChange={(e) => {
                                    const updated = formFields.map((f) =>
                                      f.id === field.id ? { ...f, required: e.target.checked } : f
                                    )
                                    setFormFields(updated)
                                  }}
                                />
                              }
                              label="Required"
                            />
                            <IconButton size="small" color="error" onClick={() => handleDeleteField(field.id)}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                        {renderFieldPreview(field)}
                      </Box>
                    </Box>
                  </Paper>
                ))}
                {formFields.length === 0 && (
                  <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
                    <DynamicFormIcon sx={{ fontSize: 48, mb: 2 }} />
                    <Typography>Drag fields from the left panel to build your form</Typography>
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBuilderOpen(false)}>Cancel</Button>
          <Button variant="outlined">Save as Draft</Button>
          <Button variant="contained">Publish Form</Button>
        </DialogActions>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Form Preview</DialogTitle>
        <DialogContent>
          <Box sx={{ py: 2 }}>
            {formFields.map((field) => (
              <Box key={field.id} sx={{ mb: 3 }}>
                {renderFieldPreview(field)}
              </Box>
            ))}
            <Button variant="contained" fullWidth sx={{ mt: 2 }}>
              {formSettings.submitButtonText}
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={shareOpen} onClose={() => setShareOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Share Form</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
            Direct Link
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField fullWidth size="small" value="https://forms.example.com/f/abc123" InputProps={{ readOnly: true }} />
            <Button variant="outlined" startIcon={<ContentCopyIcon />}>
              Copy
            </Button>
          </Box>

          <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
            Embed Code
          </Typography>
          <TextField
            fullWidth
            size="small"
            multiline
            rows={3}
            value={`<iframe src="https://forms.example.com/f/abc123" width="100%" height="500"></iframe>`}
            InputProps={{ readOnly: true }}
          />
          <Button variant="outlined" startIcon={<CodeIcon />} sx={{ mt: 1 }}>
            Copy Embed Code
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShareOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={settingsOpen} onClose={() => setSettingsOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Form Settings</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Submit Button Text"
            value={formSettings.submitButtonText}
            onChange={(e) => setFormSettings({ ...formSettings, submitButtonText: e.target.value })}
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Success Message"
            value={formSettings.successMessage}
            onChange={(e) => setFormSettings({ ...formSettings, successMessage: e.target.value })}
            sx={{ mb: 2 }}
            helperText="Shown after form submission"
          />
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Notifications
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={formSettings.emailNotification}
                onChange={(e) => setFormSettings({ ...formSettings, emailNotification: e.target.checked })}
              />
            }
            label="Email notification on new submission"
          />
          {formSettings.emailNotification && (
            <TextField
              fullWidth
              label="Notification Email"
              value={formSettings.notificationEmail}
              onChange={(e) => setFormSettings({ ...formSettings, notificationEmail: e.target.value })}
              sx={{ mt: 2 }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSettingsOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setSettingsOpen(false)}>
            Save Settings
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

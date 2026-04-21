import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Paper,
  Divider,
  Tooltip,
  Stack,
  Autocomplete,
  Chip,
} from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import {
  StudioPageToolbar,
  ScheduleConfigFields,
  DeleteConfirmDialog,
} from '../components/studio'
import {
  INITIAL_RECURRING_PROMPTS,
  TEAM_MEMBERS,
} from '../data/recurringPromptsData'
import { MIRA_STUDIO_GRADIENT_BG } from '../constants/miraStyles'

function RecurringPromptDetailsPage() {
  const navigate = useNavigate()
  const { promptId } = useParams()

  // Find the prompt from mock data
  const existingPrompt = INITIAL_RECURRING_PROMPTS.find((p) => p.id === promptId)

  // Form state
  const [promptName, setPromptName] = useState('')
  const [promptText, setPromptText] = useState('')
  const [selectedDays, setSelectedDays] = useState([])
  const [primaryTime, setPrimaryTime] = useState('08:00')
  const [secondaryTime, setSecondaryTime] = useState('')
  const [recipients, setRecipients] = useState([])
  const [emailSubject, setEmailSubject] = useState('')
  const [emailMessage, setEmailMessage] = useState('')
  const [status, setStatus] = useState('active')
  const [hasChanges, setHasChanges] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  // Load existing prompt data
  useEffect(() => {
    if (existingPrompt) {
      setPromptName(existingPrompt.promptName)
      setPromptText(existingPrompt.prompt)
      setSelectedDays(existingPrompt.schedule.days)
      setPrimaryTime(existingPrompt.schedule.primaryTime)
      setSecondaryTime(existingPrompt.schedule.secondaryTime || '')
      setRecipients(existingPrompt.recipients)
      setEmailSubject(existingPrompt.emailSubject)
      setEmailMessage(existingPrompt.emailMessage)
      setStatus(existingPrompt.status)
    }
  }, [existingPrompt])

  const handleFieldChange = (setter) => (event) => {
    setter(event.target.value)
    setHasChanges(true)
  }

  const handleRecipientsChange = (event, newValue) => {
    setRecipients(newValue)
    setHasChanges(true)
  }

  const handleSave = () => {
    console.log('Saving recurring prompt:', {
      promptName,
      promptText,
      selectedDays,
      primaryTime,
      secondaryTime,
      recipients,
      emailSubject,
      emailMessage,
      status,
    })
    setHasChanges(false)
    navigate('/studio/library?tab=scheduled')
  }

  const handleCancel = () => {
    navigate('/studio/library?tab=scheduled')
  }

  const handleStatusToggle = () => {
    setStatus(status === 'active' ? 'paused' : 'active')
    setHasChanges(true)
  }

  const handleDelete = () => {
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    setDeleteDialogOpen(false)
    navigate('/studio/library?tab=scheduled')
  }

  if (!existingPrompt) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Recurring prompt not found
        </Typography>
        <Button onClick={() => navigate('/studio/library?tab=scheduled')} sx={{ mt: 2 }}>
          Back to Scheduled Prompts
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={{ height: 'calc(100vh)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Top Toolbar */}
      <StudioPageToolbar
        title={promptName}
        onBack={handleCancel}
        backTooltip="Back to Recurring Prompts"
        indicator={{
          label: status === 'active' ? 'Active' : 'Paused',
          color: status === 'active' ? 'green' : 'yellow',
        }}
        customActions={
          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title={status === 'active' ? 'Pause this prompt' : 'Resume this prompt'}>
              <Button
                variant="outlined"
                size="small"
                startIcon={status === 'active' ? <PauseIcon /> : <PlayArrowIcon />}
                onClick={handleStatusToggle}
                sx={{ textTransform: 'none', fontWeight: 500 }}
              >
                {status === 'active' ? 'Pause' : 'Resume'}
              </Button>
            </Tooltip>

            <Tooltip title="Delete this recurring prompt">
              <IconButton size="small" onClick={handleDelete} sx={{ color: 'text.secondary' }}>
                <DeleteOutlineIcon />
              </IconButton>
            </Tooltip>

            <Button
              variant="contained"
              color="secondary"
              size="medium"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              disabled={!hasChanges || !promptName.trim() || selectedDays.length === 0}
              sx={{ textTransform: 'none', fontWeight: 500 }}
            >
              Save Changes
            </Button>
          </Stack>
        }
      />

      {/* Main Content Area */}
      <Box sx={{ ...MIRA_STUDIO_GRADIENT_BG, flex: 1, px: 2, pt: 2, overflow: 'auto' }}>
        <Box sx={{ maxWidth: 800, mx: 'auto', position: 'relative', zIndex: 1, pb: 4 }}>
          {/* Form */}
          <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', backgroundColor: 'white' }}>
            {/* Page Header */}
            <Box
              sx={{
                borderBottom: '1px solid',
                borderColor: 'divider',
                height: 60,
                display: 'flex',
                alignItems: 'center',
                px: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Edit Recurring Prompt
              </Typography>
            </Box>

            {/* Form Content */}
            <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Prompt Section */}
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Prompt Name
                </Typography>
                <TextField
                  fullWidth
                  placeholder="e.g., Weekly Campaign Summary"
                  value={promptName}
                  onChange={handleFieldChange(setPromptName)}
                  required
                />
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Prompt
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Enter your prompt text..."
                  value={promptText}
                  onChange={handleFieldChange(setPromptText)}
                />
              </Box>

              <Divider />

              {/* Schedule Section */}
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Schedule
                </Typography>
                <ScheduleConfigFields
                  selectedDays={selectedDays}
                  onDaysChange={(newDays) => {
                    setSelectedDays(newDays)
                    setHasChanges(true)
                  }}
                  primaryTime={primaryTime}
                  onPrimaryTimeChange={(val) => {
                    setPrimaryTime(val)
                    setHasChanges(true)
                  }}
                  secondaryTime={secondaryTime}
                  onSecondaryTimeChange={(val) => {
                    setSecondaryTime(val)
                    setHasChanges(true)
                  }}
                  compact
                />
              </Box>

              <Divider />

              {/* Recipients Section */}
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Recipients
                </Typography>
                <Autocomplete
                  multiple
                  freeSolo
                  options={TEAM_MEMBERS.map((member) => member.email)}
                  value={recipients}
                  onChange={handleRecipientsChange}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => {
                      const { key, ...tagProps } = getTagProps({ index })
                      return (
                        <Chip
                          key={key}
                          label={option}
                          size="small"
                          {...tagProps}
                        />
                      )
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Add email addresses..."
                      helperText="Enter email addresses or select from team members"
                    />
                  )}
                />
              </Box>

              <Divider />

              {/* Email Customization Section */}
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Email Customization
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    fullWidth
                    label="Email Subject"
                    placeholder="e.g., Your Weekly Campaign Update"
                    value={emailSubject}
                    onChange={handleFieldChange(setEmailSubject)}
                  />

                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Email Message"
                    placeholder="Optional message to include in the email..."
                    value={emailMessage}
                    onChange={handleFieldChange(setEmailMessage)}
                    helperText="This message will appear above the AI-generated content"
                  />
                </Box>
              </Box>

              {/* Info Box */}
              <Box
                sx={{
                  p: 2,
                  backgroundColor: 'rgba(76, 175, 80, 0.08)',
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'rgba(76, 175, 80, 0.24)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1.5,
                }}
              >
                <CheckCircleOutlineIcon sx={{ color: 'success.main', fontSize: 20, mt: 0.25 }} />
                <Typography variant="body2" color="text.secondary">
                  Changes will take effect immediately. The next scheduled run will use the updated configuration.
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Recurring Prompt"
        itemName={promptName}
      />
    </Box>
  )
}

export default RecurringPromptDetailsPage

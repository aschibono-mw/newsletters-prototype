import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
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
  ToggleButtonGroup,
  ToggleButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Autocomplete,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  Card,
  CardContent,
  Checkbox,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Indicator from '../components/core/Indicator'
import {
  DAYS_OF_WEEK,
  TIME_OPTIONS,
  TEAM_MEMBERS,
  SAVED_PROMPTS,
  formatSchedule,
} from '../data/recurringPromptsData'

const STEPS = ['Select Prompt', 'Schedule', 'Recipients', 'Confirm']

const CATEGORY_OPTIONS = [
  'Analysis & Reporting',
  'Brand Monitoring',
  'Competitive Intelligence',
  'Content & Creative',
  'Crisis & Issues',
  'Media Relations',
]

// ==========================================
// STEP 1: SELECT PROMPT
// ==========================================
function SelectPromptStep({
  promptSelection,
  onPromptSelectionChange,
  customPromptName,
  onCustomPromptNameChange,
  customPromptCategory,
  onCustomPromptCategoryChange,
  customPromptText,
  onCustomPromptTextChange,
  customPromptDescription,
  onCustomPromptDescriptionChange,
  customPromptVisibility,
  onCustomPromptVisibilityChange,
  customPromptFavorite,
  onCustomPromptFavoriteChange,
  onNext,
}) {
  const canProceed = promptSelection === 'custom'
    ? customPromptName.trim() && customPromptText.trim()
    : promptSelection !== ''

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        Select a Prompt
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Choose an existing prompt or create a new one for your recurring delivery.
      </Typography>

      <RadioGroup
        value={promptSelection}
        onChange={(e) => onPromptSelectionChange(e.target.value)}
      >
        {/* Custom Prompt */}
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: 'text.secondary' }}>
          CREATE NEW
        </Typography>
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            cursor: 'pointer',
            borderColor: promptSelection === 'custom' ? 'primary.main' : 'divider',
            backgroundColor: promptSelection === 'custom' ? 'action.selected' : 'background.paper',
          }}
          onClick={() => onPromptSelectionChange('custom')}
        >
          <FormControlLabel
            value="custom"
            control={<Radio size="small" />}
            label={
              <Typography variant="body1" sx={{ fontWeight: 500, ml: 1 }}>
                Create a new prompt
              </Typography>
            }
            sx={{ m: 0 }}
          />
        </Paper>

        {/* Custom Prompt Fields */}
        {promptSelection === 'custom' && (
          <Box sx={{ mt: 2, ml: 4, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              fullWidth
              label="Prompt Title"
              placeholder="Create a title"
              value={customPromptName}
              onChange={(e) => onCustomPromptNameChange(e.target.value)}
              required
            />

            <Autocomplete
              freeSolo
              options={CATEGORY_OPTIONS}
              value={customPromptCategory}
              onChange={(e, newValue) => onCustomPromptCategoryChange(newValue)}
              onInputChange={(e, newValue) => onCustomPromptCategoryChange(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  placeholder="Select or create a category"
                />
              )}
            />

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Prompt"
              placeholder="Enter your prompt text..."
              value={customPromptText}
              onChange={(e) => onCustomPromptTextChange(e.target.value)}
              required
            />

            <TextField
              fullWidth
              multiline
              rows={2}
              label="Description (optional)"
              placeholder="Brief description of what this prompt does"
              value={customPromptDescription}
              onChange={(e) => onCustomPromptDescriptionChange(e.target.value)}
            />

            {/* Visibility */}
            <Box sx={{ pt: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5, color: 'text.secondary' }}>
                VISIBILITY
              </Typography>
              <RadioGroup
                value={customPromptVisibility}
                onChange={(e) => onCustomPromptVisibilityChange(e.target.value)}
                sx={{ gap: 1 }}
              >
                <Paper
                  variant="outlined"
                  sx={{
                    p: 1.5,
                    cursor: 'pointer',
                    borderColor: customPromptVisibility === 'user' ? 'primary.main' : 'divider',
                    backgroundColor: customPromptVisibility === 'user' ? 'action.selected' : 'transparent',
                    maxWidth: 280,
                  }}
                  onClick={() => onCustomPromptVisibilityChange('user')}
                >
                  <FormControlLabel
                    value="user"
                    control={<Radio size="small" />}
                    label={
                      <Box sx={{ ml: 0.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>Only me</Typography>
                        <Typography variant="caption" color="text.secondary">Private to your account</Typography>
                      </Box>
                    }
                    sx={{ m: 0, alignItems: 'flex-start' }}
                  />
                </Paper>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 1.5,
                    cursor: 'pointer',
                    borderColor: customPromptVisibility === 'workspace' ? 'primary.main' : 'divider',
                    backgroundColor: customPromptVisibility === 'workspace' ? 'action.selected' : 'transparent',
                    maxWidth: 280,
                  }}
                  onClick={() => onCustomPromptVisibilityChange('workspace')}
                >
                  <FormControlLabel
                    value="workspace"
                    control={<Radio size="small" />}
                    label={
                      <Box sx={{ ml: 0.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>Workspace</Typography>
                        <Typography variant="caption" color="text.secondary">Shared with your workspace</Typography>
                      </Box>
                    }
                    sx={{ m: 0, alignItems: 'flex-start' }}
                  />
                </Paper>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 1.5,
                    cursor: 'pointer',
                    borderColor: customPromptVisibility === 'company' ? 'primary.main' : 'divider',
                    backgroundColor: customPromptVisibility === 'company' ? 'action.selected' : 'transparent',
                    maxWidth: 280,
                  }}
                  onClick={() => onCustomPromptVisibilityChange('company')}
                >
                  <FormControlLabel
                    value="company"
                    control={<Radio size="small" />}
                    label={
                      <Box sx={{ ml: 0.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>Company</Typography>
                        <Typography variant="caption" color="text.secondary">Available to everyone</Typography>
                      </Box>
                    }
                    sx={{ m: 0, alignItems: 'flex-start' }}
                  />
                </Paper>
              </RadioGroup>
            </Box>

            {/* Favorite */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={customPromptFavorite}
                  onChange={(e) => onCustomPromptFavoriteChange(e.target.checked)}
                />
              }
              label={
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Add to favorites
                </Typography>
              }
            />
          </Box>
        )}

        {/* Existing Prompts */}
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, mt: 3, color: 'text.secondary' }}>
          OR SELECT SAVED
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
          {SAVED_PROMPTS.map((prompt) => (
            <Paper
              key={prompt.id}
              variant="outlined"
              sx={{
                p: 2,
                cursor: 'pointer',
                borderColor: promptSelection === prompt.id ? 'primary.main' : 'divider',
                backgroundColor: promptSelection === prompt.id ? 'action.selected' : 'background.paper',
                '&:hover': {
                  borderColor: 'primary.main',
                },
              }}
              onClick={() => onPromptSelectionChange(prompt.id)}
            >
              <FormControlLabel
                value={prompt.id}
                control={<Radio size="small" />}
                label={
                  <Box sx={{ ml: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {prompt.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {prompt.prompt}
                    </Typography>
                  </Box>
                }
                sx={{ m: 0, alignItems: 'flex-start', width: '100%' }}
              />
            </Paper>
          ))}
        </Box>
      </RadioGroup>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          onClick={onNext}
          disabled={!canProceed}
          sx={{ textTransform: 'none', fontWeight: 500 }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  )
}

// ==========================================
// STEP 2: SCHEDULE
// ==========================================
function ScheduleStep({ selectedDays, onDaysChange, primaryTime, onPrimaryTimeChange, secondaryTime, onSecondaryTimeChange, onBack, onNext }) {
  const canProceed = selectedDays.length > 0

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        Set Your Schedule
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Choose when you want your prompt to run and be delivered.
      </Typography>

      {/* Day Picker */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
          Select one or more days for delivery
        </Typography>
        <ToggleButtonGroup
          value={selectedDays}
          onChange={(e, newDays) => newDays.length > 0 && onDaysChange(newDays)}
          aria-label="days of week"
          sx={{ flexWrap: 'wrap', gap: 0.5 }}
        >
          {DAYS_OF_WEEK.map((day) => (
            <ToggleButton
              key={day.id}
              value={day.id}
              sx={{
                px: 2.5,
                py: 1.5,
                borderRadius: '20px !important',
                border: '1px solid',
                borderColor: 'divider',
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                },
              }}
            >
              {day.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      {/* Delivery Time */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
          Delivery time
        </Typography>
        <FormControl fullWidth>
          <Select
            value={primaryTime}
            onChange={(e) => onPrimaryTimeChange(e.target.value)}
          >
            {TIME_OPTIONS.map((time) => (
              <MenuItem key={time.value} value={time.value}>
                {time.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Additional Options */}
      <Accordion
        elevation={0}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          '&:before': { display: 'none' },
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
            ADDITIONAL OPTIONS
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
            Second delivery time
          </Typography>
          <FormControl fullWidth>
            <Select
              value={secondaryTime}
              onChange={(e) => onSecondaryTimeChange(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              {TIME_OPTIONS.map((time) => (
                <MenuItem key={time.value} value={time.value}>
                  {time.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          onClick={onBack}
          sx={{ textTransform: 'none', fontWeight: 500 }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={onNext}
          disabled={!canProceed}
          sx={{ textTransform: 'none', fontWeight: 500 }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  )
}

// ==========================================
// STEP 3: RECIPIENTS
// ==========================================
function RecipientsStep({ recipients, onRecipientsChange, emailSubject, onEmailSubjectChange, emailMessage, onEmailMessageChange, onBack, onNext }) {
  const canProceed = recipients.length > 0

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        Add Recipients
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Choose who will receive the scheduled prompt results via email.
      </Typography>

      {/* Recipients */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
          Email Recipients
        </Typography>
        <Autocomplete
          multiple
          freeSolo
          options={TEAM_MEMBERS.map((member) => member.email)}
          value={recipients}
          onChange={(e, newValue) => onRecipientsChange(newValue)}
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
              helperText="Type an email address and press Enter, or select from suggestions"
            />
          )}
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Email Customization */}
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
          Customize Email (Optional)
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            label="Email Subject"
            placeholder="e.g., Your Weekly Campaign Update"
            value={emailSubject}
            onChange={(e) => onEmailSubjectChange(e.target.value)}
          />

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Email Message"
            placeholder="Optional message to include above the AI-generated content..."
            value={emailMessage}
            onChange={(e) => onEmailMessageChange(e.target.value)}
          />
        </Box>
      </Box>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          onClick={onBack}
          sx={{ textTransform: 'none', fontWeight: 500 }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={onNext}
          disabled={!canProceed}
          sx={{ textTransform: 'none', fontWeight: 500 }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  )
}

// ==========================================
// STEP 4: CONFIRM
// ==========================================
function ConfirmStep({ promptSelection, customPromptName, customPromptText, selectedDays, primaryTime, secondaryTime, recipients, emailSubject, emailMessage, onBack, onSubmit }) {
  const getPromptName = () => {
    if (promptSelection === 'custom') {
      return customPromptName
    }
    const savedPrompt = SAVED_PROMPTS.find((p) => p.id === promptSelection)
    return savedPrompt?.name || 'Unknown Prompt'
  }

  const getPromptText = () => {
    if (promptSelection === 'custom') {
      return customPromptText
    }
    const savedPrompt = SAVED_PROMPTS.find((p) => p.id === promptSelection)
    return savedPrompt?.prompt || ''
  }

  const schedule = {
    days: selectedDays,
    primaryTime,
    secondaryTime: secondaryTime || null,
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        Confirm Your Recurring Prompt
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Review your settings before creating the recurring prompt.
      </Typography>

      {/* Summary Card */}
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          {/* Prompt */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
              PROMPT
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {getPromptName()}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {getPromptText()}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Schedule */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
              SCHEDULE
            </Typography>
            <Typography variant="body1">
              {formatSchedule(schedule)}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Recipients */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
              RECIPIENTS
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {recipients.map((email) => (
                <Chip key={email} label={email} size="small" />
              ))}
            </Box>
          </Box>

          {(emailSubject || emailMessage) && (
            <>
              <Divider sx={{ my: 2 }} />

              {/* Email Customization */}
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                  EMAIL CUSTOMIZATION
                </Typography>
                {emailSubject && (
                  <Typography variant="body2">
                    <strong>Subject:</strong> {emailSubject}
                  </Typography>
                )}
                {emailMessage && (
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    <strong>Message:</strong> {emailMessage}
                  </Typography>
                )}
              </Box>
            </>
          )}
        </CardContent>
      </Card>

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
          Your recurring prompt will be activated immediately and will run according to the schedule you've set.
          You can pause or modify it at any time from the Recurring Prompts page.
        </Typography>
      </Box>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          onClick={onBack}
          sx={{ textTransform: 'none', fontWeight: 500 }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onSubmit}
          sx={{ textTransform: 'none', fontWeight: 500 }}
        >
          Create Recurring Prompt
        </Button>
      </Box>
    </Box>
  )
}

// ==========================================
// MAIN COMPONENT
// ==========================================
function CreateRecurringPromptPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeStep, setActiveStep] = useState(0)

  // Form state
  const [promptSelection, setPromptSelection] = useState('')
  const [customPromptName, setCustomPromptName] = useState('')
  const [customPromptCategory, setCustomPromptCategory] = useState(null)
  const [customPromptText, setCustomPromptText] = useState('')
  const [customPromptDescription, setCustomPromptDescription] = useState('')
  const [customPromptVisibility, setCustomPromptVisibility] = useState('user')
  const [customPromptFavorite, setCustomPromptFavorite] = useState(false)
  const [selectedDays, setSelectedDays] = useState(['mon', 'tue', 'wed', 'thu', 'fri'])
  const [primaryTime, setPrimaryTime] = useState('08:00')
  const [secondaryTime, setSecondaryTime] = useState('')
  const [recipients, setRecipients] = useState([])
  const [emailSubject, setEmailSubject] = useState('')
  const [emailMessage, setEmailMessage] = useState('')

  // Pre-fill form if navigated with prompt data from PromptLibraryPage
  useEffect(() => {
    if (location.state?.promptTitle && location.state?.promptText) {
      setPromptSelection('custom')
      setCustomPromptName(location.state.promptTitle)
      setCustomPromptText(location.state.promptText)
      setActiveStep(1) // Skip to Schedule step
    }
  }, [location.state])

  const handleNext = () => {
    setActiveStep((prev) => prev + 1)
  }

  const handleBack = () => {
    if (activeStep === 0) {
      navigate('/studio/library?tab=scheduled')
    } else {
      setActiveStep((prev) => prev - 1)
    }
  }

  const handleSubmit = () => {
    const newPrompt = {
      promptSelection,
      customPromptName,
      customPromptText,
      selectedDays,
      primaryTime,
      secondaryTime,
      recipients,
      emailSubject,
      emailMessage,
    }
    console.log('Creating recurring prompt:', newPrompt)
    navigate('/studio/library?tab=scheduled')
  }

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <SelectPromptStep
            promptSelection={promptSelection}
            onPromptSelectionChange={setPromptSelection}
            customPromptName={customPromptName}
            onCustomPromptNameChange={setCustomPromptName}
            customPromptCategory={customPromptCategory}
            onCustomPromptCategoryChange={setCustomPromptCategory}
            customPromptText={customPromptText}
            onCustomPromptTextChange={setCustomPromptText}
            customPromptDescription={customPromptDescription}
            onCustomPromptDescriptionChange={setCustomPromptDescription}
            customPromptVisibility={customPromptVisibility}
            onCustomPromptVisibilityChange={setCustomPromptVisibility}
            customPromptFavorite={customPromptFavorite}
            onCustomPromptFavoriteChange={setCustomPromptFavorite}
            onNext={handleNext}
          />
        )
      case 1:
        return (
          <ScheduleStep
            selectedDays={selectedDays}
            onDaysChange={setSelectedDays}
            primaryTime={primaryTime}
            onPrimaryTimeChange={setPrimaryTime}
            secondaryTime={secondaryTime}
            onSecondaryTimeChange={setSecondaryTime}
            onBack={handleBack}
            onNext={handleNext}
          />
        )
      case 2:
        return (
          <RecipientsStep
            recipients={recipients}
            onRecipientsChange={setRecipients}
            emailSubject={emailSubject}
            onEmailSubjectChange={setEmailSubject}
            emailMessage={emailMessage}
            onEmailMessageChange={setEmailMessage}
            onBack={handleBack}
            onNext={handleNext}
          />
        )
      case 3:
        return (
          <ConfirmStep
            promptSelection={promptSelection}
            customPromptName={customPromptName}
            customPromptText={customPromptText}
            selectedDays={selectedDays}
            primaryTime={primaryTime}
            secondaryTime={secondaryTime}
            recipients={recipients}
            emailSubject={emailSubject}
            emailMessage={emailMessage}
            onBack={handleBack}
            onSubmit={handleSubmit}
          />
        )
      default:
        return null
    }
  }

  return (
    <Box sx={{ height: 'calc(100vh)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Top Toolbar - Sticky */}
      <Box sx={{
        backgroundColor: 'background.paper',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 2,
          py: 1,
          minHeight: 48,
        }}>
          {/* Back Button */}
          <Tooltip title="Back">
            <IconButton size="small" onClick={handleBack} sx={{ color: 'text.secondary', p: 0.5 }}>
              <ArrowBackIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>
          <Divider orientation="vertical" flexItem />

          {/* Title */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Create Recurring Prompt
            </Typography>
            <Indicator label="Beta" size="small" color="blue" />
          </Stack>
        </Box>
        <Divider />
      </Box>

      {/* Main Content Area */}
      <Box sx={{
        position: 'relative',
        flex: 1,
        px: 2,
        pt: 2,
        overflow: 'auto',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(74% 84% at 49% 45%, rgba(255, 255, 255, 0) 20%, rgb(255, 255, 255) 40%) center top -150px / 150% 150% no-repeat, radial-gradient(74% 75% at 50% 33%, rgba(255, 255, 255, 0) 25%, rgb(255, 255, 255) 50%), linear-gradient(90deg, rgb(255, 215, 240) 0%, rgb(205, 240, 245) 100%)',
          opacity: 0.5,
          zIndex: 0,
        },
      }}>
        <Box sx={{ maxWidth: 700, mx: 'auto', position: 'relative', zIndex: 1, pb: 4 }}>
          {/* Stepper */}
          <Box sx={{ mb: 4 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {STEPS.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          {/* Step Content */}
          <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', backgroundColor: 'white', p: 4 }}>
            {renderStep()}
          </Paper>
        </Box>
      </Box>
    </Box>
  )
}

export default CreateRecurringPromptPage

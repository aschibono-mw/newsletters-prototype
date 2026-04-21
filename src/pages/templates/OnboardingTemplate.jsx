import { useState } from 'react'
import { Box, Container, Typography, Button, Grid, Card, CardContent, Avatar, TextField, Stepper, Step, StepLabel, StepConnector, Chip, Checkbox, FormControlLabel, FormGroup, LinearProgress, IconButton, Divider, Alert } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded'
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardRounded'
import CheckCircleIcon from '@mui/icons-material/CheckCircleRounded'
import CameraAltIcon from '@mui/icons-material/CameraAltRounded'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunchRounded'
import GroupsIcon from '@mui/icons-material/GroupsRounded'
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructionsRounded'
import CheckIcon from '@mui/icons-material/CheckRounded'
import { styled } from '@mui/material/styles'

const steps = [
  { label: 'Welcome', icon: <RocketLaunchIcon /> },
  { label: 'Profile', icon: <CameraAltIcon /> },
  { label: 'Preferences', icon: <GroupsIcon /> },
  { label: 'Integrations', icon: <IntegrationInstructionsIcon /> },
  { label: 'Complete', icon: <CheckCircleIcon /> },
]

const interests = [
  'Design', 'Development', 'Marketing', 'Product', 'Analytics', 'Sales', 'Operations', 'Finance', 'HR', 'Support'
]

const integrations = [
  { name: 'Slack', description: 'Get notifications in Slack', icon: 'S', connected: false },
  { name: 'GitHub', description: 'Connect your repositories', icon: 'G', connected: false },
  { name: 'Google Drive', description: 'Import files from Drive', icon: 'D', connected: false },
  { name: 'Figma', description: 'Import designs from Figma', icon: 'F', connected: false },
  { name: 'Notion', description: 'Sync with Notion pages', icon: 'N', connected: false },
  { name: 'Jira', description: 'Track issues from Jira', icon: 'J', connected: false },
]

const CustomStepIcon = styled('div')(({ theme, active, completed }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: completed ? theme.palette.primary.main : active ? theme.palette.primary.main : theme.palette.grey[200],
  color: completed || active ? 'white' : theme.palette.text.secondary,
  border: active && !completed ? `2px solid ${theme.palette.primary.main}` : 'none',
  fontWeight: 600,
  transition: 'all 0.3s ease',
}))

function OnboardingTemplate() {
  const [activeStep, setActiveStep] = useState(0)
  const [profile, setProfile] = useState({ firstName: '', lastName: '', role: '', company: '' })
  const [selectedInterests, setSelectedInterests] = useState([])
  const [connectedIntegrations, setConnectedIntegrations] = useState([])

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1)
    }
  }

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
    }
  }

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest))
    } else {
      setSelectedInterests([...selectedInterests, interest])
    }
  }

  const toggleIntegration = (name) => {
    if (connectedIntegrations.includes(name)) {
      setConnectedIntegrations(connectedIntegrations.filter((i) => i !== name))
    } else {
      setConnectedIntegrations([...connectedIntegrations, name])
    }
  }

  const progress = ((activeStep + 1) / steps.length) * 100

  const WelcomeStep = () => (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Box sx={{ width: 80, height: 80, borderRadius: '50%', backgroundColor: 'primary.light', mx: 'auto', mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <RocketLaunchIcon sx={{ fontSize: 40, color: 'primary.main' }} />
      </Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Welcome to ProductName!
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
        Let's get you set up in just a few minutes. We'll personalize your experience and connect your favorite tools.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 4 }}>
        {[
          { icon: '1', text: 'Set up your profile' },
          { icon: '2', text: 'Choose your interests' },
          { icon: '3', text: 'Connect integrations' },
        ].map((item) => (
          <Box key={item.text} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: 'primary.main', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 600 }}>
              {item.icon}
            </Box>
            <Typography variant="body2">{item.text}</Typography>
          </Box>
        ))}
      </Box>
      <Typography variant="body2" color="text.secondary">
        Estimated time: 3 minutes
      </Typography>
    </Box>
  )

  const ProfileStep = () => (
    <Box sx={{ py: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>Set up your profile</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Tell us a bit about yourself so we can personalize your experience.
      </Typography>

      {/* Avatar */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
        <Box sx={{ position: 'relative' }}>
          <Avatar sx={{ width: 80, height: 80, fontSize: '1.5rem', backgroundColor: 'primary.light', color: 'primary.main' }}>
            {profile.firstName ? profile.firstName[0] : 'U'}
          </Avatar>
          <IconButton
            size="small"
            sx={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: 'primary.main', color: 'white', '&:hover': { backgroundColor: 'primary.dark' } }}
          >
            <CameraAltIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Profile Photo</Typography>
          <Typography variant="caption" color="text.secondary">JPG, PNG or GIF. Max 5MB.</Typography>
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="First Name"
            fullWidth
            value={profile.firstName}
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Last Name"
            fullWidth
            value={profile.lastName}
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Role / Job Title"
            fullWidth
            value={profile.role}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Company"
            fullWidth
            value={profile.company}
            onChange={(e) => setProfile({ ...profile, company: e.target.value })}
          />
        </Grid>
      </Grid>
    </Box>
  )

  const PreferencesStep = () => (
    <Box sx={{ py: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>Choose your interests</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Select topics you're interested in to personalize your dashboard and recommendations.
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
        {interests.map((interest) => (
          <Chip
            key={interest}
            label={interest}
            onClick={() => toggleInterest(interest)}
            variant={selectedInterests.includes(interest) ? 'filled' : 'outlined'}
            color={selectedInterests.includes(interest) ? 'primary' : 'default'}
            icon={selectedInterests.includes(interest) ? <CheckIcon /> : undefined}
            sx={{
              cursor: 'pointer',
              py: 2.5,
              px: 1,
              fontSize: '0.875rem',
              transition: 'all 0.2s ease',
            }}
          />
        ))}
      </Box>

      {selectedInterests.length > 0 && (
        <Alert severity="info" sx={{ mt: 3 }}>
          You've selected {selectedInterests.length} interest{selectedInterests.length > 1 ? 's' : ''}
        </Alert>
      )}
    </Box>
  )

  const IntegrationsStep = () => (
    <Box sx={{ py: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>Connect your tools</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Connect the tools you use every day for a seamless workflow. You can always add more later.
      </Typography>

      <Grid container spacing={2}>
        {integrations.map((integration) => (
          <Grid size={{ xs: 12, sm: 6 }} key={integration.name}>
            <Card
              sx={{
                p: 2,
                cursor: 'pointer',
                border: '2px solid',
                borderColor: connectedIntegrations.includes(integration.name) ? 'primary.main' : 'divider',
                transition: 'all 0.2s ease',
                '&:hover': { borderColor: 'primary.main' },
              }}
              onClick={() => toggleIntegration(integration.name)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ backgroundColor: 'grey.100', color: 'text.primary' }}>{integration.icon}</Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{integration.name}</Typography>
                  <Typography variant="caption" color="text.secondary">{integration.description}</Typography>
                </Box>
                {connectedIntegrations.includes(integration.name) && (
                  <CheckCircleIcon color="primary" />
                )}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button variant="text" sx={{ mt: 3, textTransform: 'none' }}>
        Skip for now
      </Button>
    </Box>
  )

  const CompleteStep = () => (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Box sx={{ width: 100, height: 100, borderRadius: '50%', backgroundColor: 'success.light', mx: 'auto', mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CheckCircleIcon sx={{ fontSize: 50, color: 'success.main' }} />
      </Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        You're all set!
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
        Your account is ready to go. Here's a summary of what we've set up for you.
      </Typography>

      <Card sx={{ maxWidth: 400, mx: 'auto', p: 3, textAlign: 'left', mb: 4 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Setup Summary</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">Profile</Typography>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {profile.firstName || 'Not set'} {profile.lastName}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">Interests</Typography>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {selectedInterests.length} selected
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">Integrations</Typography>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {connectedIntegrations.length} connected
          </Typography>
        </Box>
      </Card>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button variant="outlined" component={RouterLink} to="/templates" sx={{ textTransform: 'none' }}>
          Back to Templates
        </Button>
        <Button variant="contained" sx={{ textTransform: 'none' }}>
          Go to Dashboard
        </Button>
      </Box>
    </Box>
  )

  const renderStepContent = () => {
    switch (activeStep) {
      case 0: return <WelcomeStep />
      case 1: return <ProfileStep />
      case 2: return <PreferencesStep />
      case 3: return <IntegrationsStep />
      case 4: return <CompleteStep />
      default: return <WelcomeStep />
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'grey.100' }}>
      {/* Progress Bar */}
      <LinearProgress variant="determinate" value={progress} sx={{ height: 4 }} />

      <Container maxWidth="md" sx={{ py: 4 }}>
        {activeStep === 0 && (
          <Button component={RouterLink} to="/templates" startIcon={<ArrowBackIcon />} sx={{ mb: 3, textTransform: 'none' }}>
            Back to Templates
          </Button>
        )}

        {/* Stepper */}
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 6 }}>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                StepIconComponent={() => (
                  <CustomStepIcon active={index === activeStep} completed={index < activeStep}>
                    {index < activeStep ? <CheckIcon sx={{ fontSize: 18 }} /> : step.icon}
                  </CustomStepIcon>
                )}
              >
                <Typography variant="caption" sx={{ fontWeight: index === activeStep ? 600 : 400 }}>
                  {step.label}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Content */}
        <Card sx={{ p: 4 }}>
          {renderStepContent()}

          {/* Navigation */}
          {activeStep < steps.length - 1 && (
            <>
              <Divider sx={{ my: 4 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  startIcon={<ArrowBackIcon />}
                  sx={{ textTransform: 'none' }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  endIcon={<ArrowForwardIcon />}
                  sx={{ textTransform: 'none' }}
                >
                  {activeStep === steps.length - 2 ? 'Complete' : 'Continue'}
                </Button>
              </Box>
            </>
          )}
        </Card>
      </Container>
    </Box>
  )
}

export default OnboardingTemplate

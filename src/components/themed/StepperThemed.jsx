import { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Stack,
  Paper,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import MuiStepper from '@mui/material/Stepper'
import MuiStep from '@mui/material/Step'
import MuiStepLabel from '@mui/material/StepLabel'
import MuiStepContent from '@mui/material/StepContent'
import MuiStepButton from '@mui/material/StepButton'
import MuiStepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import { typography } from '../../theme-tokens'
import FeaturesSection from '../docs/FeaturesSection'
import CheckIcon from '@mui/icons-material/Check'
import SettingsIcon from '@mui/icons-material/Settings'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import VideoLabelIcon from '@mui/icons-material/VideoLabel'

// Themed Step Connector
const ThemedStepConnector = styled(MuiStepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.divider,
    borderTopWidth: 2,
    borderRadius: 1,
  },
}))

// Themed Step Icon (Circle with number or check)
const StepIconRoot = styled('div', {
  shouldForwardProp: (prop) => prop !== 'ownerState',
})(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.grey[300],
  zIndex: 1,
  color: theme.palette.text.primary,
  width: 40,
  height: 40,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: typography.fontFamily.base,
  fontSize: typography.body1.fontSize,
  fontWeight: typography.fontWeight.bold,
  border: `1px solid ${theme.palette.divider}`,
  ...(ownerState.active && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    border: `1px solid ${theme.palette.primary.main}`,
    boxShadow: '0 2px 8px rgba(8, 145, 178, 0.3)',
  }),
  ...(ownerState.completed && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    border: `1px solid ${theme.palette.primary.main}`,
  }),
  ...(ownerState.error && {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    border: `1px solid ${theme.palette.error.main}`,
  }),
}))

function ThemedStepIcon(props) {
  const { active, completed, error, className, icon } = props

  return (
    <StepIconRoot ownerState={{ active, completed, error }} className={className}>
      {completed ? <CheckIcon sx={{ fontSize: 20 }} /> : icon}
    </StepIconRoot>
  )
}

// Themed Stepper
const ThemedStepper = styled(MuiStepper)(({ theme }) => ({
  '& .MuiStepLabel-label': {
    fontFamily: typography.fontFamily.base,
    fontSize: typography.body1.fontSize,
    color: theme.palette.text.secondary,
    fontWeight: typography.fontWeight.regular,

    '&.Mui-active': {
      color: theme.palette.text.primary,
      fontWeight: typography.fontWeight.bold,
    },

    '&.Mui-completed': {
      color: theme.palette.text.primary,
      fontWeight: typography.fontWeight.regular,
    },

    '&.Mui-error': {
      color: theme.palette.error.main,
    },
  },

  '& .MuiStepLabel-iconContainer': {
    paddingRight: theme.spacing(1),
  },
}))

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad']

function StepperThemed() {
  const [activeStep, setActiveStep] = useState(0)
  const [activeStepVertical, setActiveStepVertical] = useState(0)
  const [activeStepNonLinear, setActiveStepNonLinear] = useState(0)
  const [completed, setCompleted] = useState({})

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const handleNextVertical = () => {
    setActiveStepVertical((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBackVertical = () => {
    setActiveStepVertical((prevActiveStep) => prevActiveStep - 1)
  }

  const handleResetVertical = () => {
    setActiveStepVertical(0)
  }

  const handleStep = (step) => () => {
    setActiveStepNonLinear(step)
  }

  const handleComplete = () => {
    const newCompleted = { ...completed }
    newCompleted[activeStepNonLinear] = true
    setCompleted(newCompleted)
    const nextStep = steps.findIndex((step, i) => !(i in newCompleted))
    if (nextStep !== -1) {
      setActiveStepNonLinear(nextStep)
    }
  }

  return (
    <div className="themed-showcase">
      {/* Horizontal Stepper */}
      <div className="variant-section">
        <h4>Horizontal Stepper</h4>
        <p>Linear stepper with horizontal layout and teal accent color.</p>
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
              Basic Horizontal Stepper
            </Typography>
            <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
              <ThemedStepper
                activeStep={activeStep}
                connector={<ThemedStepConnector />}
              >
                {steps.map((label) => (
                  <MuiStep key={label}>
                    <MuiStepLabel StepIconComponent={ThemedStepIcon}>
                      {label}
                    </MuiStepLabel>
                  </MuiStep>
                ))}
              </ThemedStepper>
              <Box sx={{ mt: 3 }}>
                {activeStep === steps.length ? (
                  <Box>
                    <Typography sx={{ mb: 2 }}>
                      All steps completed - you're finished
                    </Typography>
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
                ) : (
                  <Box>
                    <Typography sx={{ mb: 2 }}>Step {activeStep + 1}</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
                      <Box sx={{ flex: '1 1 auto' }} />
                      <Button variant="contained" onClick={handleNext}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </Box>
                  </Box>
                )}
              </Box>
            </Paper>
          </Box>
        </Stack>
      </div>

      {/* Vertical Stepper */}
      <div className="variant-section">
        <h4>Vertical Stepper</h4>
        <p>Stepper with vertical layout, useful for narrower screens or detailed step content.</p>
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
              Vertical Stepper with Step Content
            </Typography>
            <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', maxWidth: 500 }}>
              <ThemedStepper
                activeStep={activeStepVertical}
                orientation="vertical"
                connector={<ThemedStepConnector />}
              >
                {steps.map((label, index) => (
                  <MuiStep key={label}>
                    <MuiStepLabel StepIconComponent={ThemedStepIcon}>
                      {label}
                    </MuiStepLabel>
                    <MuiStepContent>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {label === 'Select campaign settings' &&
                          'For each ad campaign that you create, you can control how much you\'re willing to spend on clicks and conversions.'}
                        {label === 'Create an ad group' &&
                          'An ad group contains one or more ads which target a shared set of keywords.'}
                        {label === 'Create an ad' &&
                          'Try out different ad text to see what brings in the most customers.'}
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Button
                          variant="contained"
                          onClick={handleNextVertical}
                          size="small"
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {index === steps.length - 1 ? 'Finish' : 'Continue'}
                        </Button>
                        <Button
                          disabled={index === 0}
                          onClick={handleBackVertical}
                          size="small"
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Back
                        </Button>
                      </Box>
                    </MuiStepContent>
                  </MuiStep>
                ))}
              </ThemedStepper>
              {activeStepVertical === steps.length && (
                <Paper square elevation={0} sx={{ p: 3, bgcolor: 'background.default' }}>
                  <Typography>All steps completed - you're finished</Typography>
                  <Button onClick={handleResetVertical} sx={{ mt: 1, mr: 1 }}>
                    Reset
                  </Button>
                </Paper>
              )}
            </Paper>
          </Box>
        </Stack>
      </div>

      {/* Non-linear Stepper */}
      <div className="variant-section">
        <h4>Non-linear Stepper</h4>
        <p>Users can navigate between steps in any order and mark steps as complete.</p>
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
              Non-linear Stepper (Optional Steps)
            </Typography>
            <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
              <ThemedStepper
                activeStep={activeStepNonLinear}
                nonLinear
                connector={<ThemedStepConnector />}
              >
                {steps.map((label, index) => (
                  <MuiStep key={label} completed={completed[index]}>
                    <MuiStepButton onClick={handleStep(index)}>
                      <MuiStepLabel StepIconComponent={ThemedStepIcon}>
                        {label}
                        {index === 1 && (
                          <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                            Optional
                          </Typography>
                        )}
                      </MuiStepLabel>
                    </MuiStepButton>
                  </MuiStep>
                ))}
              </ThemedStepper>
              <Box sx={{ mt: 3 }}>
                <Typography sx={{ mb: 2 }}>Step {activeStepNonLinear + 1}</Typography>
                <Button
                  variant="contained"
                  onClick={handleComplete}
                  sx={{ mr: 1 }}
                  disabled={completed[activeStepNonLinear]}
                >
                  {completed[activeStepNonLinear] ? 'Step Completed' : 'Complete Step'}
                </Button>
              </Box>
            </Paper>
          </Box>
        </Stack>
      </div>

      {/* Alternative Labels */}
      <div className="variant-section">
        <h4>Alternative Label</h4>
        <p>Labels positioned below step icons instead of to the right.</p>
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
              Alternative Label Position
            </Typography>
            <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
              <ThemedStepper
                activeStep={1}
                alternativeLabel
                connector={<ThemedStepConnector />}
              >
                {steps.map((label) => (
                  <MuiStep key={label}>
                    <MuiStepLabel StepIconComponent={ThemedStepIcon}>
                      {label}
                    </MuiStepLabel>
                  </MuiStep>
                ))}
              </ThemedStepper>
            </Paper>
          </Box>
        </Stack>
      </div>

      {/* With Icons */}
      <div className="variant-section">
        <h4>Custom Icons</h4>
        <p>Replace default step numbers with custom icons while maintaining theme styling.</p>
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
              Steps with Custom Icons
            </Typography>
            <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
              <ThemedStepper activeStep={1} connector={<ThemedStepConnector />}>
                <MuiStep>
                  <MuiStepLabel
                    StepIconComponent={() => (
                      <StepIconRoot ownerState={{ active: false, completed: true }}>
                        <SettingsIcon sx={{ fontSize: 20 }} />
                      </StepIconRoot>
                    )}
                  >
                    Select campaign settings
                  </MuiStepLabel>
                </MuiStep>
                <MuiStep>
                  <MuiStepLabel
                    StepIconComponent={() => (
                      <StepIconRoot ownerState={{ active: true, completed: false }}>
                        <GroupAddIcon sx={{ fontSize: 20 }} />
                      </StepIconRoot>
                    )}
                  >
                    Create an ad group
                  </MuiStepLabel>
                </MuiStep>
                <MuiStep>
                  <MuiStepLabel
                    StepIconComponent={() => (
                      <StepIconRoot ownerState={{ active: false, completed: false }}>
                        <VideoLabelIcon sx={{ fontSize: 20 }} />
                      </StepIconRoot>
                    )}
                  >
                    Create an ad
                  </MuiStepLabel>
                </MuiStep>
              </ThemedStepper>
            </Paper>
          </Box>
        </Stack>
      </div>

      {/* Error State */}
      <div className="variant-section">
        <h4>Error State</h4>
        <p>Show error state on a step to indicate validation failure.</p>
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
              Step with Error
            </Typography>
            <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
              <ThemedStepper activeStep={1} connector={<ThemedStepConnector />}>
                <MuiStep>
                  <MuiStepLabel StepIconComponent={ThemedStepIcon} error>
                    Select campaign settings
                  </MuiStepLabel>
                </MuiStep>
                <MuiStep>
                  <MuiStepLabel StepIconComponent={ThemedStepIcon}>
                    Create an ad group
                  </MuiStepLabel>
                </MuiStep>
                <MuiStep>
                  <MuiStepLabel StepIconComponent={ThemedStepIcon}>
                    Create an ad
                  </MuiStepLabel>
                </MuiStep>
              </ThemedStepper>
            </Paper>
          </Box>
        </Stack>
      </div>

      {/* Completed State */}
      <div className="variant-section">
        <h4>States</h4>
        <p>Visualization of different step states: completed, active, error, and upcoming.</p>
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
              Various States
            </Typography>
            <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
              <ThemedStepper activeStep={2} connector={<ThemedStepConnector />}>
                <MuiStep completed>
                  <MuiStepLabel StepIconComponent={ThemedStepIcon}>
                    Completed Step
                  </MuiStepLabel>
                </MuiStep>
                <MuiStep completed>
                  <MuiStepLabel StepIconComponent={ThemedStepIcon} error>
                    Completed with Error
                  </MuiStepLabel>
                </MuiStep>
                <MuiStep>
                  <MuiStepLabel StepIconComponent={ThemedStepIcon}>
                    Active Step
                  </MuiStepLabel>
                </MuiStep>
                <MuiStep disabled>
                  <MuiStepLabel StepIconComponent={ThemedStepIcon}>
                    Upcoming Step
                  </MuiStepLabel>
                </MuiStep>
              </ThemedStepper>
            </Paper>
          </Box>
        </Stack>
      </div>

      <FeaturesSection
        features={[
          { feature: "Step Icon & States", description: "40px circle with 1px border. Active (teal background, white text, shadow), Completed (teal with check icon), Upcoming (grey), Error (red)" },
          { feature: "Connector & Labels", description: "2px solid line (grey default, teal when completed/active). Inter font, 14px regular (secondary text), bold for active step" },
          { feature: "Orientations & Modes", description: "Horizontal (default) or Vertical orientations. Linear (default) or Non-linear (clickable steps) modes" },
          { feature: "Common Use Cases", description: "Multi-step forms, onboarding, checkout, setup wizards. ARIA labels and keyboard navigation for accessibility" },
        ]}
      />
    </div>
  )
}

export default StepperThemed

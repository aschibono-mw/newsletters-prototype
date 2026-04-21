import { useState } from 'react'
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  StepButton,
  Button,
  Stack,
  Paper,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import ErrorIcon from '@mui/icons-material/Error'
import SettingsIcon from '@mui/icons-material/Settings'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import VideoLabelIcon from '@mui/icons-material/VideoLabel'

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad']

function StepperBaseline() {
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
    const newCompleted = completed
    newCompleted[activeStepNonLinear] = true
    setCompleted(newCompleted)
    const nextStep = steps.findIndex((step, i) => !(i in completed))
    if (nextStep !== -1) {
      setActiveStepNonLinear(nextStep)
    }
  }

  return (
    <div className="baseline-showcase">
      {/* Horizontal Stepper */}
      <div className="variant-section">
        <h4>Horizontal Stepper</h4>
        <p>Linear stepper with horizontal layout for multi-step processes.</p>
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
              Basic Horizontal Stepper
            </Typography>
            <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
              <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
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
                      <Button onClick={handleNext}>
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
            <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', maxWidth: 400 }}>
              <Stepper activeStep={activeStepVertical} orientation="vertical">
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
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
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {index === steps.length - 1 ? 'Finish' : 'Continue'}
                        </Button>
                        <Button
                          disabled={index === 0}
                          onClick={handleBackVertical}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Back
                        </Button>
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
              {activeStepVertical === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
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
              <Stepper activeStep={activeStepNonLinear} nonLinear>
                {steps.map((label, index) => (
                  <Step key={label} completed={completed[index]}>
                    <StepButton onClick={handleStep(index)}>
                      {label}
                      {index === 1 && (
                        <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                          Optional
                        </Typography>
                      )}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
              <Box sx={{ mt: 3 }}>
                <Typography sx={{ mb: 2 }}>Step {activeStepNonLinear + 1}</Typography>
                <Button variant="contained" onClick={handleComplete} sx={{ mr: 1 }}>
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
              <Stepper activeStep={1} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Paper>
          </Box>
        </Stack>
      </div>

      {/* With Icons */}
      <div className="variant-section">
        <h4>Custom Icons</h4>
        <p>Replace default step numbers with custom icons.</p>
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
              Steps with Custom Icons
            </Typography>
            <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
              <Stepper activeStep={1}>
                <Step>
                  <StepLabel StepIconComponent={() => <SettingsIcon />}>
                    Select campaign settings
                  </StepLabel>
                </Step>
                <Step>
                  <StepLabel StepIconComponent={() => <GroupAddIcon />}>
                    Create an ad group
                  </StepLabel>
                </Step>
                <Step>
                  <StepLabel StepIconComponent={() => <VideoLabelIcon />}>
                    Create an ad
                  </StepLabel>
                </Step>
              </Stepper>
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
              <Stepper activeStep={1}>
                <Step>
                  <StepLabel error>Select campaign settings</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Create an ad group</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Create an ad</StepLabel>
                </Step>
              </Stepper>
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
              <Stepper activeStep={2}>
                <Step completed>
                  <StepLabel>Completed Step</StepLabel>
                </Step>
                <Step completed error>
                  <StepLabel>Completed with Error</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Active Step</StepLabel>
                </Step>
                <Step disabled>
                  <StepLabel>Upcoming Step</StepLabel>
                </Step>
              </Stepper>
            </Paper>
          </Box>
        </Stack>
      </div>

      {/* Specifications */}
      <div className="variant-section">
        <h4>Specifications</h4>
        <Typography variant="body2" color="text.secondary">
          <strong>Component:</strong> Stepper, Step, StepLabel, StepContent, StepButton (@mui/material)
          <br />
          <strong>Orientations:</strong> horizontal (default), vertical
          <br />
          <strong>Modes:</strong> linear (default), non-linear (clickable steps)
          <br />
          <strong>Label Position:</strong> right (default), below (alternativeLabel)
          <br />
          <strong>States:</strong> active, completed, error, disabled
          <br />
          <strong>Step Icons:</strong> Numbers (default), custom icons, check icon for completed
          <br />
          <strong>Connector:</strong> Line between steps (solid for completed, dashed for upcoming)
          <br />
          <strong>StepContent:</strong> Expandable content area for vertical steppers
          <br />
          <strong>Accessibility:</strong> ARIA labels, keyboard navigation, screen reader support
          <br />
          <strong>Best Practices:</strong> Use for multi-step forms, onboarding flows, checkout processes
          <br />• Commonly used for: Multi-step forms, onboarding, checkout, setup wizards, progress tracking
        </Typography>
      </div>
    </div>
  )
}

export default StepperBaseline

import React from 'react'
import {
  Box,
  Checkbox as MuiCheckbox,
  FormControl,
  FormGroup,
  FormHelperText,
  Stack,
  useTheme,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { borderRadius } from '../theme-tokens'
import AccessibilitySection from '../components/docs/AccessibilitySection'
import FeaturesSection from '../components/docs/FeaturesSection'
import { CoreDetailPageLayout, CoreVariantSection, CorePropsTable } from '../components/core'
import { ThemedFormControlLabel, ThemedFormLabel, ThemedHelperText } from '../components/themed/FormControlsThemed'

// Styled Checkbox using custom design system tokens
const ThemedCheckbox = styled(MuiCheckbox)(({ theme }) => ({
  padding: '8px',
  transition: 'all 0.2s ease',

  '&:not(.Mui-checked):not(.MuiCheckbox-indeterminate)': {
    color: theme.palette.grey[400],
  },

  '&.Mui-checked': {
    color: theme.palette.primary.main,
  },

  '&.MuiCheckbox-indeterminate': {
    color: theme.palette.primary.main,
  },

  '&:hover': {
    backgroundColor: 'rgba(8, 145, 178, 0.04)',
  },

  '&.Mui-focusVisible': {
    outline: `2px solid ${theme.palette.primary.light}`,
    outlineOffset: '2px',
    borderRadius: borderRadius.sm,
  },

  '&.Mui-disabled': {
    color: theme.palette.grey[300],
    opacity: 0.6,
  },

  '& svg': {
    fontSize: '1.5rem',
  },

  '&.Mui-error': {
    color: theme.palette.error.main,
    '&.Mui-checked': {
      color: theme.palette.error.main,
    },
  },
}))

function CheckboxGroupDetailPage() {
  const theme = useTheme()

  // Basic group state
  const [options, setOptions] = React.useState({
    option1: true,
    option2: false,
    option3: false,
  })

  // Select all state
  const [features, setFeatures] = React.useState({
    darkMode: true,
    notifications: true,
    analytics: false,
    autoSave: false,
  })

  // With descriptions state
  const [notifications, setNotifications] = React.useState({
    email: true,
    push: false,
    sms: false,
  })

  // Error state
  const [errorState, setErrorState] = React.useState({
    terms: false,
    privacy: false,
  })

  const handleOptionsChange = (event) => {
    setOptions({ ...options, [event.target.name]: event.target.checked })
  }

  const handleFeaturesChange = (event) => {
    setFeatures({ ...features, [event.target.name]: event.target.checked })
  }

  const handleNotificationsChange = (event) => {
    setNotifications({ ...notifications, [event.target.name]: event.target.checked })
  }

  const handleErrorChange = (event) => {
    setErrorState({ ...errorState, [event.target.name]: event.target.checked })
  }

  // Select All logic
  const featureValues = Object.values(features)
  const allSelected = featureValues.every(Boolean)
  const someSelected = featureValues.some(Boolean) && !allSelected

  const handleSelectAll = (event) => {
    const checked = event.target.checked
    setFeatures({
      darkMode: checked,
      notifications: checked,
      analytics: checked,
      autoSave: checked,
    })
  }

  return (
    <CoreDetailPageLayout
      title="Checkbox Group"
      description="Multi-select checkbox groups with fieldset structure, Select All pattern, and validation."
    >
      <CoreVariantSection title="Basic Checkbox Group">
        <FormControl component="fieldset">
          <ThemedFormLabel component="legend">Select options</ThemedFormLabel>
          <FormGroup>
            <ThemedFormControlLabel
              control={
                <ThemedCheckbox
                  checked={options.option1}
                  onChange={handleOptionsChange}
                  name="option1"
                />
              }
              label="Option 1"
            />
            <ThemedFormControlLabel
              control={
                <ThemedCheckbox
                  checked={options.option2}
                  onChange={handleOptionsChange}
                  name="option2"
                />
              }
              label="Option 2"
            />
            <ThemedFormControlLabel
              control={
                <ThemedCheckbox
                  checked={options.option3}
                  onChange={handleOptionsChange}
                  name="option3"
                />
              }
              label="Option 3"
            />
          </FormGroup>
          <FormHelperText sx={{ ml: 0, mt: 1 }}>
            Select all that apply
          </FormHelperText>
        </FormControl>
      </CoreVariantSection>

      <CoreVariantSection title="Select All Pattern">
        <FormControl component="fieldset">
          <ThemedFormLabel component="legend">Features</ThemedFormLabel>
          <FormGroup>
            <ThemedFormControlLabel
              control={
                <ThemedCheckbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={handleSelectAll}
                />
              }
              label={<strong>Select all</strong>}
            />
            <Box sx={{ ml: 3 }}>
              <ThemedFormControlLabel
                control={
                  <ThemedCheckbox
                    checked={features.darkMode}
                    onChange={handleFeaturesChange}
                    name="darkMode"
                  />
                }
                label="Dark mode"
              />
              <ThemedFormControlLabel
                control={
                  <ThemedCheckbox
                    checked={features.notifications}
                    onChange={handleFeaturesChange}
                    name="notifications"
                  />
                }
                label="Notifications"
              />
              <ThemedFormControlLabel
                control={
                  <ThemedCheckbox
                    checked={features.analytics}
                    onChange={handleFeaturesChange}
                    name="analytics"
                  />
                }
                label="Analytics"
              />
              <ThemedFormControlLabel
                control={
                  <ThemedCheckbox
                    checked={features.autoSave}
                    onChange={handleFeaturesChange}
                    name="autoSave"
                  />
                }
                label="Auto-save"
              />
            </Box>
          </FormGroup>
          <FormHelperText sx={{ ml: 0, mt: 1 }}>
            {featureValues.filter(Boolean).length} of {featureValues.length} selected
          </FormHelperText>
        </FormControl>
      </CoreVariantSection>

      <CoreVariantSection title="With Descriptions">
        <FormControl component="fieldset">
          <ThemedFormLabel component="legend">Notification preferences</ThemedFormLabel>
          <FormGroup>
            <Stack spacing={2}>
              <Box>
                <ThemedFormControlLabel
                  control={
                    <ThemedCheckbox
                      checked={notifications.email}
                      onChange={handleNotificationsChange}
                      name="email"
                    />
                  }
                  label="Email notifications"
                />
                <ThemedHelperText>Receive updates via email</ThemedHelperText>
              </Box>
              <Box>
                <ThemedFormControlLabel
                  control={
                    <ThemedCheckbox
                      checked={notifications.push}
                      onChange={handleNotificationsChange}
                      name="push"
                    />
                  }
                  label="Push notifications"
                />
                <ThemedHelperText>Get real-time alerts on your device</ThemedHelperText>
              </Box>
              <Box>
                <ThemedFormControlLabel
                  control={
                    <ThemedCheckbox
                      checked={notifications.sms}
                      onChange={handleNotificationsChange}
                      name="sms"
                    />
                  }
                  label="SMS notifications"
                />
                <ThemedHelperText>Receive text message alerts</ThemedHelperText>
              </Box>
            </Stack>
          </FormGroup>
        </FormControl>
      </CoreVariantSection>

      <CoreVariantSection title="Required Group">
        <FormControl component="fieldset" required>
          <ThemedFormLabel component="legend">
            Agreements <span style={{ color: theme.palette.error.main }}>*</span>
          </ThemedFormLabel>
          <FormGroup>
            <ThemedFormControlLabel
              control={<ThemedCheckbox />}
              label="I agree to the terms of service"
            />
            <ThemedFormControlLabel
              control={<ThemedCheckbox />}
              label="I agree to the privacy policy"
            />
          </FormGroup>
          <FormHelperText sx={{ ml: 0, mt: 1 }}>
            Both agreements are required
          </FormHelperText>
        </FormControl>
      </CoreVariantSection>

      <CoreVariantSection title="Error State">
        <FormControl component="fieldset" error>
          <ThemedFormLabel
            component="legend"
            sx={{ color: theme.palette.error.main }}
          >
            Required agreements
          </ThemedFormLabel>
          <FormGroup>
            <ThemedFormControlLabel
              control={
                <ThemedCheckbox
                  checked={errorState.terms}
                  onChange={handleErrorChange}
                  name="terms"
                  className="Mui-error"
                />
              }
              label="Terms of service"
            />
            <ThemedFormControlLabel
              control={
                <ThemedCheckbox
                  checked={errorState.privacy}
                  onChange={handleErrorChange}
                  name="privacy"
                  className="Mui-error"
                />
              }
              label="Privacy policy"
            />
          </FormGroup>
          <FormHelperText error sx={{ ml: 0, mt: 1 }}>
            Please accept all required agreements
          </FormHelperText>
        </FormControl>
      </CoreVariantSection>

      <FeaturesSection
        features={[
          { feature: "Structure", description: "FormControl > FormLabel > FormGroup > FormControlLabel" },
          { feature: "Select All", description: "Indeterminate state for partial selection" },
          { feature: "Validation", description: "Group-level error with FormHelperText" },
          { feature: "Descriptions", description: "32px left margin helper text per option" },
        ]}
      />

      <CorePropsTable
        props={[
          { name: 'value', type: 'array', description: 'Array of selected checkbox values' },
          { name: 'onChange', type: 'function', description: 'Callback when selection changes' },
          { name: 'row', type: 'boolean', description: 'If true, displays checkboxes in a row' },
          { name: 'error', type: 'boolean', description: 'If true, shows error state' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "1.3.1", name: "Info and Relationships", level: "A", note: "Fieldset/legend groups related checkboxes" },
          { id: "2.1.1", name: "Keyboard", level: "A", note: "Tab between checkboxes, Space to toggle" },
          { id: "2.4.7", name: "Focus Visible", level: "AA", note: "Teal outline with offset on each checkbox" },
          { id: "3.3.2", name: "Labels or Instructions", level: "A", note: "Group label + individual option labels" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "Native checkboxes with aria-checked" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "4.5:1 label text contrast" },
          { id: "1.4.11", name: "Non-text Contrast", level: "AA", note: "3:1 checkbox border contrast" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default CheckboxGroupDetailPage

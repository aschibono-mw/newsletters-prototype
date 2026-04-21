import React from 'react'
import {
  Box,
  Radio as MuiRadio,
  RadioGroup as MuiRadioGroup,
  FormControl,
  Stack,
  useTheme,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { borderRadius } from '../theme-tokens'
import { CoreDetailPageLayout, CoreVariantSection, CorePropsTable } from '../components/core'
import AccessibilitySection from '../components/docs/AccessibilitySection'
import FeaturesSection from '../components/docs/FeaturesSection'
import { ThemedFormControlLabel, ThemedFormLabel, ThemedHelperText } from '../components/themed/FormControlsThemed'

// Styled Radio using custom design system tokens
const ThemedRadio = styled(MuiRadio)(({ theme }) => ({
  padding: '8px',
  transition: 'all 0.2s ease',

  // Unselected state
  '&:not(.Mui-checked)': {
    color: theme.palette.grey[400], // Grey border for unselected
  },

  // Selected state
  '&.Mui-checked': {
    color: theme.palette.primary.main, // Teal selected
  },

  // Hover states
  '&:hover': {
    backgroundColor: 'rgba(8, 145, 178, 0.04)', // Light teal hover
  },

  // Focus state
  '&.Mui-focusVisible': {
    outline: `2px solid ${theme.palette.primary.light}`,
    outlineOffset: '2px',
    borderRadius: borderRadius.full,
  },

  // Disabled state
  '&.Mui-disabled': {
    color: theme.palette.grey[300],
    opacity: 0.6,
  },

  // Error state
  '&.Mui-error': {
    color: theme.palette.error.main,
    '&.Mui-checked': {
      color: theme.palette.error.main,
    },
  },
}))

function RadioGroupDetailPage() {
  const theme = useTheme()

  const [value, setValue] = React.useState('option1')
  const [gender, setGender] = React.useState('female')
  const [preference, setPreference] = React.useState('email')
  const [errorValue, setErrorValue] = React.useState('')

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleGenderChange = (event) => {
    setGender(event.target.value)
  }

  const handlePreferenceChange = (event) => {
    setPreference(event.target.value)
  }

  return (
    <CoreDetailPageLayout
      title="Radio Group"
      description="Themed radio group component with custom colors, focus states, and single selection enforcement."
    >
      <CoreVariantSection title="Basic">
        <FormControl>
          <ThemedFormLabel id="basic-radio-group-label">Choose One</ThemedFormLabel>
          <MuiRadioGroup
            aria-labelledby="basic-radio-group-label"
            name="basic-radio-group"
            value={value}
            onChange={handleChange}
          >
            <Stack spacing={2}>
              <ThemedFormControlLabel value="option1" control={<ThemedRadio />} label="Option 1" />
              <ThemedFormControlLabel value="option2" control={<ThemedRadio />} label="Option 2" />
              <ThemedFormControlLabel value="option3" control={<ThemedRadio />} label="Option 3" />
            </Stack>
          </MuiRadioGroup>
        </FormControl>
      </CoreVariantSection>

      <CoreVariantSection title="With Description">
        <FormControl>
          <ThemedFormLabel id="preference-label">Contact Preference</ThemedFormLabel>
          <MuiRadioGroup
            aria-labelledby="preference-label"
            name="preference-radio-group"
            value={preference}
            onChange={handlePreferenceChange}
          >
            <Stack spacing={3}>
              <Box>
                <ThemedFormControlLabel
                  value="email"
                  control={<ThemedRadio />}
                  label="Email"
                />
                <ThemedHelperText>
                  We'll send notifications to your email address
                </ThemedHelperText>
              </Box>

              <Box>
                <ThemedFormControlLabel
                  value="sms"
                  control={<ThemedRadio />}
                  label="SMS"
                />
                <ThemedHelperText>
                  Receive text message notifications
                </ThemedHelperText>
              </Box>

              <Box>
                <ThemedFormControlLabel
                  value="none"
                  control={<ThemedRadio />}
                  label="No notifications"
                />
                <ThemedHelperText>
                  You won't receive any notifications
                </ThemedHelperText>
              </Box>
            </Stack>
          </MuiRadioGroup>
        </FormControl>
      </CoreVariantSection>

      <CoreVariantSection title="Required Field">
        <FormControl>
          <ThemedFormLabel id="required-label">
            Gender <span style={{ color: theme.palette.error.main }}>*</span>
          </ThemedFormLabel>
          <MuiRadioGroup
            aria-labelledby="required-label"
            name="gender-radio-group"
            value={gender}
            onChange={handleGenderChange}
          >
            <Stack spacing={2}>
              <ThemedFormControlLabel value="female" control={<ThemedRadio />} label="Female" />
              <ThemedFormControlLabel value="male" control={<ThemedRadio />} label="Male" />
              <ThemedFormControlLabel value="other" control={<ThemedRadio />} label="Other" />
            </Stack>
          </MuiRadioGroup>
          <ThemedHelperText sx={{ marginLeft: 0, marginTop: '8px' }}>
            Required field
          </ThemedHelperText>
        </FormControl>
      </CoreVariantSection>

      <CoreVariantSection title="Error State">
        <FormControl error>
          <ThemedFormLabel
            id="error-label"
            sx={{ color: theme.palette.error.main }}
          >
            Select an option
          </ThemedFormLabel>
          <MuiRadioGroup
            aria-labelledby="error-label"
            name="error-radio-group"
            value={errorValue}
            onChange={(e) => setErrorValue(e.target.value)}
          >
            <Stack spacing={2}>
              <ThemedFormControlLabel
                value="option1"
                control={<ThemedRadio className="Mui-error" />}
                label="Option 1"
              />
              <ThemedFormControlLabel
                value="option2"
                control={<ThemedRadio className="Mui-error" />}
                label="Option 2"
              />
            </Stack>
          </MuiRadioGroup>
          <ThemedHelperText error sx={{ marginLeft: 0, marginTop: '8px' }}>
            This field is required
          </ThemedHelperText>
        </FormControl>
      </CoreVariantSection>

      <FeaturesSection
        features={[
          { feature: "Structure", description: "FormControl > FormLabel > RadioGroup > FormControlLabel" },
          { feature: "Selection", description: "Single selection enforced automatically by RadioGroup" },
          { feature: "Validation", description: "Group-level error with FormHelperText" },
          { feature: "Descriptions", description: "32px left margin helper text per option" },
        ]}
      />

      <CorePropsTable
        props={[
          { name: 'value', type: 'any', description: 'The selected radio value' },
          { name: 'onChange', type: 'function', description: 'Callback when selection changes' },
          { name: 'name', type: 'string', description: 'Name attribute for the radio inputs' },
          { name: 'row', type: 'boolean', description: 'If true, displays radios in a row' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "1.3.1", name: "Info and Relationships", level: "A", note: "Fieldset/legend or role=radiogroup" },
          { id: "2.1.1", name: "Keyboard", level: "A", note: "Arrows to move, Space to select" },
          { id: "2.4.7", name: "Focus Visible", level: "AA", note: "Teal outline with offset" },
          { id: "3.3.2", name: "Labels or Instructions", level: "A", note: "Group label + option labels" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "Native radio, aria-checked" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "4.5:1 label text" },
          { id: "1.4.11", name: "Non-text Contrast", level: "AA", note: "3:1 radio border" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default RadioGroupDetailPage

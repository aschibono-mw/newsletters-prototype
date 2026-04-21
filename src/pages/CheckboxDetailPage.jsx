import React from 'react'
import {
  Box,
  Checkbox as MuiCheckbox,
  Stack,
  useTheme,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { borderRadius } from '../theme-tokens'
import { CoreDetailPageLayout, CoreVariantSection, CorePropsTable } from '../components/core'
import AccessibilitySection from '../components/docs/AccessibilitySection'
import FeaturesSection from '../components/docs/FeaturesSection'
import { ThemedFormControlLabel, ThemedHelperText } from '../components/themed/FormControlsThemed'

// Styled Checkbox using custom design system tokens
const ThemedCheckbox = styled(MuiCheckbox)(({ theme }) => ({
  padding: '8px',
  transition: 'all 0.2s ease',

  // Unchecked state
  '&:not(.Mui-checked):not(.MuiCheckbox-indeterminate)': {
    color: theme.palette.grey[400], // Grey border for unchecked
  },

  // Checked state
  '&.Mui-checked': {
    color: theme.palette.primary.main, // Teal check
  },

  // Indeterminate state
  '&.MuiCheckbox-indeterminate': {
    color: theme.palette.primary.main,
  },

  // Hover states
  '&:hover': {
    backgroundColor: 'rgba(8, 145, 178, 0.04)', // Light teal hover
  },

  // Focus state
  '&.Mui-focusVisible': {
    outline: `2px solid ${theme.palette.primary.light}`,
    outlineOffset: '2px',
    borderRadius: borderRadius.sm,
  },

  // Disabled state
  '&.Mui-disabled': {
    color: theme.palette.grey[300],
    opacity: 0.6,
  },

  // Default size
  '& svg': {
    fontSize: '1.5rem',
  },

  // Error state
  '&.Mui-error': {
    color: theme.palette.error.main,
    '&.Mui-checked': {
      color: theme.palette.error.main,
    },
  },
}))

function CheckboxDetailPage() {
  const theme = useTheme()

  const [state, setState] = React.useState({
    checked: true,
    unchecked: false,
    agreeTerms: false,
    notifications: true,
  })

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    })
  }

  return (
    <CoreDetailPageLayout
      title="Checkbox"
      description="Themed checkbox component with custom colors, focus states, and helper text support."
    >
      <CoreVariantSection title="Basic">
        <Stack spacing={2}>
          <ThemedFormControlLabel
            control={
              <ThemedCheckbox
                checked={state.checked}
                onChange={handleChange}
                name="checked"
              />
            }
            label="Checked"
          />
          <ThemedFormControlLabel
            control={
              <ThemedCheckbox
                checked={state.unchecked}
                onChange={handleChange}
                name="unchecked"
              />
            }
            label="Unchecked"
          />
        </Stack>
      </CoreVariantSection>

      <CoreVariantSection title="States">
        <Stack spacing={2}>
          <ThemedFormControlLabel
            control={<ThemedCheckbox checked />}
            label="Checked"
          />
          <ThemedFormControlLabel
            control={<ThemedCheckbox />}
            label="Unchecked"
          />
          <ThemedFormControlLabel
            control={<ThemedCheckbox checked indeterminate />}
            label="Indeterminate"
          />
          <ThemedFormControlLabel
            control={<ThemedCheckbox disabled />}
            label="Disabled (Unchecked)"
          />
          <ThemedFormControlLabel
            control={<ThemedCheckbox checked disabled />}
            label="Disabled (Checked)"
          />
        </Stack>
      </CoreVariantSection>

      <CoreVariantSection title="With Description">
        <Stack spacing={3}>
          <Box>
            <ThemedFormControlLabel
              control={
                <ThemedCheckbox
                  checked={state.agreeTerms}
                  onChange={handleChange}
                  name="agreeTerms"
                />
              }
              label="I agree to the terms and conditions"
            />
            <ThemedHelperText>
              By checking this box, you agree to our terms of service and privacy policy
            </ThemedHelperText>
          </Box>

          <Box>
            <ThemedFormControlLabel
              control={
                <ThemedCheckbox
                  checked={state.notifications}
                  onChange={handleChange}
                  name="notifications"
                />
              }
              label="Enable notifications"
            />
            <ThemedHelperText>
              Receive email notifications about important updates
            </ThemedHelperText>
          </Box>
        </Stack>
      </CoreVariantSection>

      <CoreVariantSection title="Required Field">
        <Box>
          <ThemedFormControlLabel
            control={<ThemedCheckbox />}
            label={
              <span>
                Agree to terms <span style={{ color: theme.palette.error.main }}>*</span>
              </span>
            }
          />
          <ThemedHelperText>Required field</ThemedHelperText>
        </Box>
      </CoreVariantSection>

      <CoreVariantSection title="Error State">
        <Box>
          <ThemedFormControlLabel
            control={<ThemedCheckbox className="Mui-error" />}
            label={
              <span style={{ color: theme.palette.error.main }}>
                You must agree to continue
              </span>
            }
          />
          <ThemedHelperText error>This field is required</ThemedHelperText>
        </Box>
      </CoreVariantSection>

      <FeaturesSection
        features={[
          { feature: "Theming", description: "Teal checked, grey unchecked, indeterminate support" },
          { feature: "States", description: "Focus (2px outline w/ offset), hover (4% teal bg), disabled (60% opacity), error" },
          { feature: "Labels", description: "Helper text below, required asterisk, label aligned with checkbox center" },
          { feature: "API", description: "FormControlLabel, FormGroup, FormControl compatible" },
        ]}
      />

      <CorePropsTable
        props={[
          { name: 'checked', type: 'boolean', description: 'If true, the checkbox is checked' },
          { name: 'onChange', type: 'function', description: 'Callback when checked state changes' },
          { name: 'indeterminate', type: 'boolean', description: 'If true, shows indeterminate state' },
          { name: 'disabled', type: 'boolean', description: 'If true, the checkbox is disabled' },
          { name: 'color', type: '"primary" | "secondary" | "error" | "default"', description: 'Checkbox color' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "1.3.1", name: "Info and Relationships", level: "A", note: "Label wraps or linked to input" },
          { id: "2.1.1", name: "Keyboard", level: "A", note: "Tab to focus, Space to toggle" },
          { id: "2.4.7", name: "Focus Visible", level: "AA", note: "Teal outline with offset" },
          { id: "3.3.2", name: "Labels or Instructions", level: "A", note: "Visible label text" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "Native checkbox, aria-checked" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "4.5:1 label text" },
          { id: "1.4.11", name: "Non-text Contrast", level: "AA", note: "3:1 checkbox border" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default CheckboxDetailPage

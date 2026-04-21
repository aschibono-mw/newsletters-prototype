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
import { ThemedFormControlLabel, ThemedHelperText } from '../components/themed/FormControlsThemed'

// Styled Radio using custom design system tokens
const ThemedRadio = styled(MuiRadio)(({ theme }) => ({
  padding: '8px',
  transition: 'all 0.2s ease',

  '&:not(.Mui-checked)': {
    color: theme.palette.grey[400],
  },

  '&.Mui-checked': {
    color: theme.palette.primary.main,
  },

  '&:hover': {
    backgroundColor: 'rgba(8, 145, 178, 0.04)',
  },

  '&.Mui-focusVisible': {
    outline: `2px solid ${theme.palette.primary.light}`,
    outlineOffset: '2px',
    borderRadius: borderRadius.full,
  },

  '&.Mui-disabled': {
    color: theme.palette.grey[300],
    opacity: 0.6,
  },

  '&.Mui-error': {
    color: theme.palette.error.main,
    '&.Mui-checked': {
      color: theme.palette.error.main,
    },
  },
}))

function RadioDetailPage() {
  const theme = useTheme()

  return (
    <CoreDetailPageLayout
      title="Radio"
      description="Themed radio button component with custom colors, focus states, and helper text support."
    >
      <CoreVariantSection title="States">
        <FormControl>
          <MuiRadioGroup name="states-radio" defaultValue="selected">
            <Stack spacing={0}>
              <ThemedFormControlLabel
                value="selected"
                control={<ThemedRadio />}
                label="Selected"
              />
              <ThemedFormControlLabel
                value="unselected"
                control={<ThemedRadio />}
                label="Unselected"
              />
              <ThemedFormControlLabel
                value="disabled-unselected"
                control={<ThemedRadio />}
                label="Disabled unselected"
                disabled
              />
              <ThemedFormControlLabel
                value="disabled-selected"
                control={<ThemedRadio checked />}
                label="Disabled selected"
                disabled
              />
            </Stack>
          </MuiRadioGroup>
        </FormControl>
      </CoreVariantSection>

      <CoreVariantSection title="With Helper Text">
        <FormControl>
          <MuiRadioGroup name="helper-radio" defaultValue="option1">
            <Stack spacing={2}>
              <Box>
                <ThemedFormControlLabel
                  value="option1"
                  control={<ThemedRadio />}
                  label="Standard delivery"
                />
                <ThemedHelperText>Arrives in 5-7 business days</ThemedHelperText>
              </Box>
              <Box>
                <ThemedFormControlLabel
                  value="option2"
                  control={<ThemedRadio />}
                  label="Express delivery"
                />
                <ThemedHelperText>Arrives in 1-2 business days</ThemedHelperText>
              </Box>
            </Stack>
          </MuiRadioGroup>
        </FormControl>
      </CoreVariantSection>

      <CoreVariantSection title="Error State">
        <FormControl error>
          <MuiRadioGroup name="error-radio">
            <Stack spacing={0}>
              <ThemedFormControlLabel
                value="option1"
                control={<ThemedRadio className="Mui-error" />}
                label={
                  <span style={{ color: theme.palette.error.main }}>
                    Option 1
                  </span>
                }
              />
              <ThemedFormControlLabel
                value="option2"
                control={<ThemedRadio className="Mui-error" />}
                label={
                  <span style={{ color: theme.palette.error.main }}>
                    Option 2
                  </span>
                }
              />
            </Stack>
          </MuiRadioGroup>
          <ThemedHelperText error sx={{ ml: 0, mt: 1 }}>
            Please select an option
          </ThemedHelperText>
        </FormControl>
      </CoreVariantSection>

      <FeaturesSection
        features={[
          { feature: "States", description: "Selected, unselected, disabled, error" },
          { feature: "Theming", description: "Teal selected (#0891B2), grey unselected (#BDBDBD)" },
          { feature: "Focus", description: "2px teal outline with 2px offset, full border-radius" },
          { feature: "Layout", description: "Helper text 32px left margin, label 8px top margin" },
        ]}
      />

      <CorePropsTable
        props={[
          { name: 'checked', type: 'boolean', description: 'If true, the radio is selected' },
          { name: 'onChange', type: 'function', description: 'Callback when selection changes' },
          { name: 'value', type: 'any', description: 'The value of the radio button' },
          { name: 'disabled', type: 'boolean', description: 'If true, the radio is disabled' },
          { name: 'color', type: '"primary" | "secondary" | "error" | "default"', description: 'Radio color' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "1.3.1", name: "Info and Relationships", level: "A", note: "Label linked to input" },
          { id: "2.1.1", name: "Keyboard", level: "A", note: "Tab to focus, arrows to navigate" },
          { id: "2.4.7", name: "Focus Visible", level: "AA", note: "Teal outline with offset" },
          { id: "3.3.2", name: "Labels or Instructions", level: "A", note: "Visible label text" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "Native radio, aria-checked" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "4.5:1 label text" },
          { id: "1.4.11", name: "Non-text Contrast", level: "AA", note: "3:1 radio border" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default RadioDetailPage

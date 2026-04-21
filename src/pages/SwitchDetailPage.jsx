import React from 'react'
import {
  Box,
  Switch as MuiSwitch,
  FormControl,
  FormGroup,
  Stack,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { CoreDetailPageLayout, CoreVariantSection, CorePropsTable } from '../components/core'
import AccessibilitySection from '../components/docs/AccessibilitySection'
import FeaturesSection from '../components/docs/FeaturesSection'
import { ThemedFormControlLabelSwitch, ThemedFormLabel, ThemedHelperTextSwitch } from '../components/themed/FormControlsThemed'

// Styled Switch using custom design system tokens
const ThemedSwitch = styled(MuiSwitch)(({ theme }) => ({
  '& .MuiSwitch-switchBase': {
    '&.Mui-checked': {
      color: theme.palette.primary.main,
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
}))

function SwitchDetailPage() {
  const [state, setState] = React.useState({
    on: true,
    off: false,
    notifications: true,
    emailAlerts: false,
    darkMode: true,
  })

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    })
  }

  return (
    <CoreDetailPageLayout
      title="Switch"
      description="Themed switch component with custom teal color and helper text support."
    >
      <CoreVariantSection title="Basic">
        <Stack spacing={2}>
          <ThemedFormControlLabelSwitch
            control={
              <ThemedSwitch
                checked={state.on}
                onChange={handleChange}
                name="on"
              />
            }
            label="Switch On"
          />
          <ThemedFormControlLabelSwitch
            control={
              <ThemedSwitch
                checked={state.off}
                onChange={handleChange}
                name="off"
              />
            }
            label="Switch Off"
          />
        </Stack>
      </CoreVariantSection>

      <CoreVariantSection title="States">
        <Stack spacing={2}>
          <ThemedFormControlLabelSwitch
            control={<ThemedSwitch checked />}
            label="On"
          />
          <ThemedFormControlLabelSwitch
            control={<ThemedSwitch />}
            label="Off"
          />
          <ThemedFormControlLabelSwitch
            control={<ThemedSwitch disabled />}
            label="Disabled (Off)"
          />
          <ThemedFormControlLabelSwitch
            control={<ThemedSwitch checked disabled />}
            label="Disabled (On)"
          />
        </Stack>
      </CoreVariantSection>

      <CoreVariantSection title="Label Positioning">
        <Stack spacing={2}>
          <ThemedFormControlLabelSwitch
            control={<ThemedSwitch checked />}
            label="Label on Right (Default)"
          />
          <ThemedFormControlLabelSwitch
            control={<ThemedSwitch checked />}
            label="Label on Left"
            labelPlacement="start"
            sx={{ justifyContent: 'space-between', ml: 0 }}
          />
        </Stack>
      </CoreVariantSection>

      <CoreVariantSection title="With Description">
        <Stack spacing={3}>
          <Box>
            <ThemedFormControlLabelSwitch
              control={
                <ThemedSwitch
                  checked={state.notifications}
                  onChange={handleChange}
                  name="notifications"
                />
              }
              label="Enable notifications"
            />
            <ThemedHelperTextSwitch>
              Receive push notifications for important updates
            </ThemedHelperTextSwitch>
          </Box>

          <Box>
            <ThemedFormControlLabelSwitch
              control={
                <ThemedSwitch
                  checked={state.emailAlerts}
                  onChange={handleChange}
                  name="emailAlerts"
                />
              }
              label="Email alerts"
            />
            <ThemedHelperTextSwitch>
              Get email alerts when someone mentions you
            </ThemedHelperTextSwitch>
          </Box>

          <Box>
            <ThemedFormControlLabelSwitch
              control={
                <ThemedSwitch
                  checked={state.darkMode}
                  onChange={handleChange}
                  name="darkMode"
                />
              }
              label="Dark mode"
            />
            <ThemedHelperTextSwitch>
              Use dark theme throughout the application
            </ThemedHelperTextSwitch>
          </Box>
        </Stack>
      </CoreVariantSection>

      <CoreVariantSection title="Switch Group">
        <FormControl component="fieldset">
          <ThemedFormLabel component="legend">
            Privacy Settings
          </ThemedFormLabel>
          <FormGroup>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <ThemedFormControlLabelSwitch
                control={<ThemedSwitch defaultChecked />}
                label="Profile visible"
              />
              <ThemedFormControlLabelSwitch
                control={<ThemedSwitch />}
                label="Show activity status"
              />
              <ThemedFormControlLabelSwitch
                control={<ThemedSwitch defaultChecked />}
                label="Allow messages"
              />
            </Stack>
          </FormGroup>
        </FormControl>
      </CoreVariantSection>

      <FeaturesSection
        features={[
          { feature: "Theming", description: "Teal on-state, MUI default sizing and track/thumb styles" },
          { feature: "States", description: "On/off toggle, disabled with reduced opacity" },
          { feature: "Labels", description: "Helper text below, left/right label positioning" },
          { feature: "API", description: "FormControlLabel, FormGroup, FormControl compatible" },
        ]}
      />

      <CorePropsTable
        props={[
          { name: 'checked', type: 'boolean', description: 'If true, the switch is on' },
          { name: 'onChange', type: 'function', description: 'Callback when switch is toggled' },
          { name: 'disabled', type: 'boolean', description: 'If true, the switch is disabled' },
          { name: 'color', type: '"primary" | "secondary" | "error" | "default"', description: 'Switch color' },
          { name: 'size', type: '"small" | "medium"', description: 'Switch size. Default: "medium"' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "1.3.1", name: "Info and Relationships", level: "A", note: "Label linked to switch" },
          { id: "2.1.1", name: "Keyboard", level: "A", note: "Tab to focus, Space to toggle" },
          { id: "2.4.7", name: "Focus Visible", level: "AA", note: "Visible focus indicator" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "role=switch, aria-checked" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "4.5:1 label text" },
          { id: "1.4.11", name: "Non-text Contrast", level: "AA", note: "3:1 track and thumb" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default SwitchDetailPage

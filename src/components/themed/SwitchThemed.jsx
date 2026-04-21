import React from 'react';
import {
  Switch as MuiSwitch,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
  FormGroup,
  Stack,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { typography } from '../../theme-tokens';
import FeaturesSection from '../docs/FeaturesSection';

// Styled Switch using custom design system tokens
// Uses MUI's default sizing/proportions, only changes color to teal
const ThemedSwitch = styled(MuiSwitch)(({ theme }) => ({
  '& .MuiSwitch-switchBase': {
    // Checked (on) state - change to teal
    '&.Mui-checked': {
      color: theme.palette.primary.main,
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
}));

// Custom styled FormControlLabel with description support
const ThemedFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  marginLeft: 0,
  marginRight: 0,

  '& .MuiFormControlLabel-label': {
    fontSize: typography.body1.fontSize,
    lineHeight: typography.body1.lineHeight,
    color: theme.palette.text.primary,
    marginLeft: '8px',

    '&.Mui-disabled': {
      color: theme.palette.text.disabled,
    },
  },
}));

// Helper text component
const HelperText = styled(FormHelperText)(({ theme }) => ({
  fontSize: typography.caption.fontSize,
  lineHeight: typography.caption.lineHeight,
  color: theme.palette.text.secondary,
  marginLeft: '50px', // Align with label text (42px switch + 8px gap)
  marginTop: '4px',

  '&.Mui-error': {
    color: theme.palette.error.main,
  },
}));

// Styled FormLabel
const ThemedFormLabel = styled(FormLabel)(({ theme }) => ({
  fontSize: typography.body1.fontSize,
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: '8px',

  '&.Mui-focused': {
    color: theme.palette.text.primary,
  },
}));

export default function SwitchThemed() {
  const [state, setState] = React.useState({
    on: true,
    off: false,
    notifications: true,
    emailAlerts: false,
    darkMode: true,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div className="themed-showcase">
      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Basic Switch
        </h4>
        <Stack spacing={2}>
          <ThemedFormControlLabel
            control={
              <ThemedSwitch
                checked={state.on}
                onChange={handleChange}
                name="on"
              />
            }
            label="Switch On"
          />
          <ThemedFormControlLabel
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
      </section>

      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          States
        </h4>
        <Stack spacing={2}>
          <ThemedFormControlLabel
            control={<ThemedSwitch checked />}
            label="On"
          />
          <ThemedFormControlLabel
            control={<ThemedSwitch />}
            label="Off"
          />
          <ThemedFormControlLabel
            control={<ThemedSwitch disabled />}
            label="Disabled (Off)"
          />
          <ThemedFormControlLabel
            control={<ThemedSwitch checked disabled />}
            label="Disabled (On)"
          />
        </Stack>
      </section>

      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Label Positioning
        </h4>
        <Stack spacing={2}>
          <ThemedFormControlLabel
            control={<ThemedSwitch checked />}
            label="Label on Right (Default)"
          />
          <ThemedFormControlLabel
            control={<ThemedSwitch checked />}
            label="Label on Left"
            labelPlacement="start"
            sx={{ justifyContent: 'space-between', ml: 0 }}
          />
        </Stack>
      </section>

      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          With Description
        </h4>
        <Stack spacing={3}>
          <Box>
            <ThemedFormControlLabel
              control={
                <ThemedSwitch
                  checked={state.notifications}
                  onChange={handleChange}
                  name="notifications"
                />
              }
              label="Enable notifications"
            />
            <HelperText>
              Receive push notifications for important updates
            </HelperText>
          </Box>

          <Box>
            <ThemedFormControlLabel
              control={
                <ThemedSwitch
                  checked={state.emailAlerts}
                  onChange={handleChange}
                  name="emailAlerts"
                />
              }
              label="Email alerts"
            />
            <HelperText>
              Get email alerts when someone mentions you
            </HelperText>
          </Box>

          <Box>
            <ThemedFormControlLabel
              control={
                <ThemedSwitch
                  checked={state.darkMode}
                  onChange={handleChange}
                  name="darkMode"
                />
              }
              label="Dark mode"
            />
            <HelperText>
              Use dark theme throughout the application
            </HelperText>
          </Box>
        </Stack>
      </section>

      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Switch Group
        </h4>
        <FormControl component="fieldset">
          <ThemedFormLabel component="legend">
            Privacy Settings
          </ThemedFormLabel>
          <FormGroup>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <ThemedFormControlLabel
                control={<ThemedSwitch defaultChecked />}
                label="Profile visible"
              />
              <ThemedFormControlLabel
                control={<ThemedSwitch />}
                label="Show activity status"
              />
              <ThemedFormControlLabel
                control={<ThemedSwitch defaultChecked />}
                label="Allow messages"
              />
            </Stack>
          </FormGroup>
        </FormControl>
      </section>

      <FeaturesSection
        features={[
          { feature: "Theming", description: "Teal on-state, MUI default sizing and track/thumb styles" },
          { feature: "States", description: "On/off toggle, disabled with reduced opacity" },
          { feature: "Labels", description: "Helper text below, left/right label positioning" },
          { feature: "API", description: "FormControlLabel, FormGroup, FormControl compatible" },
        ]}
      />
    </div>
  );
}

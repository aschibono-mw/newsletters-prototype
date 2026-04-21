import React from 'react';
import {
  Checkbox as MuiCheckbox,
  FormControlLabel,
  FormControl,
  FormGroup,
  FormLabel,
  FormHelperText,
  Stack,
  Box,
  Typography,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { typography, borderRadius } from '../../theme-tokens';
import FeaturesSection from '../docs/FeaturesSection';

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
}));

// Custom styled FormControlLabel
const ThemedFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  alignItems: 'flex-start',
  marginLeft: '-8px',
  marginRight: 0,

  '& .MuiFormControlLabel-label': {
    fontSize: typography.body1.fontSize,
    lineHeight: typography.body1.lineHeight,
    color: theme.palette.text.primary,
    marginTop: '8px',

    '&.Mui-disabled': {
      color: theme.palette.text.disabled,
    },
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

  '&.Mui-error': {
    color: theme.palette.error.main,
  },
}));

// Helper text component
const HelperText = styled(FormHelperText)(({ theme }) => ({
  fontSize: typography.caption.fontSize,
  lineHeight: typography.caption.lineHeight,
  color: theme.palette.text.secondary,
  marginLeft: '32px',
  marginTop: '4px',

  '&.Mui-error': {
    color: theme.palette.error.main,
  },
}));

// Section header component for consistency
const SectionHeader = ({ children }) => (
  <Typography
    variant="subtitle2"
    sx={{
      fontSize: '0.875rem',
      fontWeight: 600,
      color: 'text.primary',
      mb: 2,
    }}
  >
    {children}
  </Typography>
);

export default function CheckboxGroupThemed() {
  const theme = useTheme();

  // Basic group state
  const [options, setOptions] = React.useState({
    option1: true,
    option2: false,
    option3: false,
  });

  // Select all state
  const [features, setFeatures] = React.useState({
    darkMode: true,
    notifications: true,
    analytics: false,
    autoSave: false,
  });

  // With descriptions state
  const [notifications, setNotifications] = React.useState({
    email: true,
    push: false,
    sms: false,
  });

  // Error state
  const [errorState, setErrorState] = React.useState({
    terms: false,
    privacy: false,
  });

  const handleOptionsChange = (event) => {
    setOptions({ ...options, [event.target.name]: event.target.checked });
  };

  const handleFeaturesChange = (event) => {
    setFeatures({ ...features, [event.target.name]: event.target.checked });
  };

  const handleNotificationsChange = (event) => {
    setNotifications({ ...notifications, [event.target.name]: event.target.checked });
  };

  const handleErrorChange = (event) => {
    setErrorState({ ...errorState, [event.target.name]: event.target.checked });
  };

  // Select All logic
  const featureValues = Object.values(features);
  const allSelected = featureValues.every(Boolean);
  const someSelected = featureValues.some(Boolean) && !allSelected;

  const handleSelectAll = (event) => {
    const checked = event.target.checked;
    setFeatures({
      darkMode: checked,
      notifications: checked,
      analytics: checked,
      autoSave: checked,
    });
  };

  return (
    <div className="themed-showcase">
      {/* Basic Group */}
      <div className="variant-section">
        <SectionHeader>Basic Checkbox Group</SectionHeader>
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
      </div>

      {/* Select All Pattern */}
      <div className="variant-section">
        <SectionHeader>Select All Pattern</SectionHeader>
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
      </div>

      {/* With Descriptions */}
      <div className="variant-section">
        <SectionHeader>With Descriptions</SectionHeader>
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
                <HelperText>Receive updates via email</HelperText>
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
                <HelperText>Get real-time alerts on your device</HelperText>
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
                <HelperText>Receive text message alerts</HelperText>
              </Box>
            </Stack>
          </FormGroup>
        </FormControl>
      </div>

      {/* Required Group */}
      <div className="variant-section">
        <SectionHeader>Required Group</SectionHeader>
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
      </div>

      {/* Error State */}
      <div className="variant-section">
        <SectionHeader>Error State</SectionHeader>
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
      </div>

      <FeaturesSection
        features={[
          { feature: "Structure", description: "FormControl > FormLabel > FormGroup > FormControlLabel" },
          { feature: "Select All", description: "Indeterminate state for partial selection" },
          { feature: "Validation", description: "Group-level error with FormHelperText" },
          { feature: "Descriptions", description: "32px left margin helper text per option" },
        ]}
      />
    </div>
  );
}

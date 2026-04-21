import React from 'react';
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
  Stack,
  Box,
  Typography,
} from '@mui/material';
import FeaturesSection from '../FeaturesSection';

export default function CheckboxGroupBaseline() {
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

  // Notifications state
  const [notifications, setNotifications] = React.useState({
    email: true,
    push: false,
    sms: false,
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
    <div style={{ padding: '1rem' }}>
      {/* Basic Group */}
      <section style={{ marginBottom: '2rem' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
          Basic Checkbox Group
        </Typography>
        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ fontSize: '0.875rem', mb: 1 }}>
            Select options
          </FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={options.option1}
                  onChange={handleOptionsChange}
                  name="option1"
                />
              }
              label="Option 1"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={options.option2}
                  onChange={handleOptionsChange}
                  name="option2"
                />
              }
              label="Option 2"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={options.option3}
                  onChange={handleOptionsChange}
                  name="option3"
                />
              }
              label="Option 3"
            />
          </FormGroup>
          <FormHelperText sx={{ mt: 1 }}>Select all that apply</FormHelperText>
        </FormControl>
      </section>

      {/* Select All Pattern */}
      <section style={{ marginBottom: '2rem' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
          Select All Pattern
        </Typography>
        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ fontSize: '0.875rem', mb: 1 }}>
            Features
          </FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={handleSelectAll}
                />
              }
              label={<strong>Select all</strong>}
            />
            <Box sx={{ ml: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={features.darkMode}
                    onChange={handleFeaturesChange}
                    name="darkMode"
                  />
                }
                label="Dark mode"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={features.notifications}
                    onChange={handleFeaturesChange}
                    name="notifications"
                  />
                }
                label="Notifications"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={features.analytics}
                    onChange={handleFeaturesChange}
                    name="analytics"
                  />
                }
                label="Analytics"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={features.autoSave}
                    onChange={handleFeaturesChange}
                    name="autoSave"
                  />
                }
                label="Auto-save"
              />
            </Box>
          </FormGroup>
          <FormHelperText sx={{ mt: 1 }}>
            {featureValues.filter(Boolean).length} of {featureValues.length} selected
          </FormHelperText>
        </FormControl>
      </section>

      {/* With Descriptions */}
      <section style={{ marginBottom: '2rem' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
          With Descriptions
        </Typography>
        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ fontSize: '0.875rem', mb: 1 }}>
            Notification preferences
          </FormLabel>
          <FormGroup>
            <Stack spacing={1}>
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={notifications.email}
                      onChange={handleNotificationsChange}
                      name="email"
                    />
                  }
                  label="Email notifications"
                />
                <FormHelperText sx={{ ml: 4 }}>
                  Receive updates via email
                </FormHelperText>
              </Box>
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={notifications.push}
                      onChange={handleNotificationsChange}
                      name="push"
                    />
                  }
                  label="Push notifications"
                />
                <FormHelperText sx={{ ml: 4 }}>
                  Get real-time alerts on your device
                </FormHelperText>
              </Box>
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={notifications.sms}
                      onChange={handleNotificationsChange}
                      name="sms"
                    />
                  }
                  label="SMS notifications"
                />
                <FormHelperText sx={{ ml: 4 }}>
                  Receive text message alerts
                </FormHelperText>
              </Box>
            </Stack>
          </FormGroup>
        </FormControl>
      </section>

      {/* Horizontal Layout */}
      <section style={{ marginBottom: '2rem' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
          Horizontal Layout
        </Typography>
        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ fontSize: '0.875rem', mb: 1 }}>
            Select sizes
          </FormLabel>
          <FormGroup row>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Small" />
            <FormControlLabel control={<Checkbox />} label="Medium" />
            <FormControlLabel control={<Checkbox />} label="Large" />
          </FormGroup>
        </FormControl>
      </section>

      {/* Error State */}
      <section style={{ marginBottom: '2rem' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
          Error State
        </Typography>
        <FormControl component="fieldset" error>
          <FormLabel component="legend" sx={{ fontSize: '0.875rem', mb: 1 }}>
            Required agreements
          </FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox color="error" />}
              label="Terms of service"
            />
            <FormControlLabel
              control={<Checkbox color="error" />}
              label="Privacy policy"
            />
          </FormGroup>
          <FormHelperText error sx={{ mt: 1 }}>
            Please accept all required agreements
          </FormHelperText>
        </FormControl>
      </section>

      <FeaturesSection
        features={[
          { feature: "Structure", description: "FormControl > FormLabel > FormGroup > FormControlLabel" },
          { feature: "Layout", description: "Vertical (default) or horizontal with row prop" },
          { feature: "Indeterminate", description: "Parent checkbox for Select All patterns" },
          { feature: "Validation", description: "Error prop on FormControl, error FormHelperText" },
        ]}
      />

      {/* Additional Variants */}
      <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '2px dashed #e0e0e0' }}>
        <h3 style={{ fontSize: '1rem', color: '#92400e', marginTop: 0, marginBottom: '1rem' }}>
          📋 Additional Variants (Not in Themed)
        </h3>

        <section style={{ marginBottom: '2rem' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
            Color Variants in Group
          </Typography>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked color="primary" />}
                label="Primary"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked color="secondary" />}
                label="Secondary"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked color="success" />}
                label="Success"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked color="warning" />}
                label="Warning"
              />
            </FormGroup>
          </FormControl>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
            Mixed Disabled States
          </Typography>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Enabled checked"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Enabled unchecked"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked disabled />}
                label="Disabled checked"
              />
              <FormControlLabel
                control={<Checkbox disabled />}
                label="Disabled unchecked"
              />
            </FormGroup>
          </FormControl>
        </section>
      </div>
    </div>
  );
}

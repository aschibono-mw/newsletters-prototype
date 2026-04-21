import React from 'react';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
  Stack,
  Box,
  Typography,
} from '@mui/material';
import FeaturesSection from '../FeaturesSection';

export default function RadioGroupBaseline() {
  const [value, setValue] = React.useState('option1');
  const [gender, setGender] = React.useState('female');
  const [preference, setPreference] = React.useState('email');
  const [errorValue, setErrorValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handlePreferenceChange = (event) => {
    setPreference(event.target.value);
  };

  return (
    <div style={{ padding: '1rem' }}>
      {/* Basic Radio Group */}
      <section style={{ marginBottom: '2rem' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
          Basic Radio Group
        </Typography>
        <FormControl>
          <FormLabel id="basic-radio-group-label">Choose one</FormLabel>
          <RadioGroup
            aria-labelledby="basic-radio-group-label"
            name="basic-radio-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
            <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
            <FormControlLabel value="option3" control={<Radio />} label="Option 3" />
          </RadioGroup>
          <FormHelperText sx={{ mt: 1 }}>Select one option</FormHelperText>
        </FormControl>
      </section>

      {/* With Descriptions */}
      <section style={{ marginBottom: '2rem' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
          With Descriptions
        </Typography>
        <FormControl>
          <FormLabel id="preference-label">Contact preference</FormLabel>
          <RadioGroup
            aria-labelledby="preference-label"
            name="preference-radio-group"
            value={preference}
            onChange={handlePreferenceChange}
          >
            <Stack spacing={1}>
              <Box>
                <FormControlLabel
                  value="email"
                  control={<Radio />}
                  label="Email"
                />
                <FormHelperText sx={{ ml: 4 }}>
                  We'll send notifications to your email address
                </FormHelperText>
              </Box>
              <Box>
                <FormControlLabel
                  value="sms"
                  control={<Radio />}
                  label="SMS"
                />
                <FormHelperText sx={{ ml: 4 }}>
                  Receive text message notifications
                </FormHelperText>
              </Box>
              <Box>
                <FormControlLabel
                  value="none"
                  control={<Radio />}
                  label="No notifications"
                />
                <FormHelperText sx={{ ml: 4 }}>
                  You won't receive any notifications
                </FormHelperText>
              </Box>
            </Stack>
          </RadioGroup>
        </FormControl>
      </section>

      {/* Horizontal Layout */}
      <section style={{ marginBottom: '2rem' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
          Horizontal Layout
        </Typography>
        <FormControl>
          <FormLabel id="horizontal-label">Size</FormLabel>
          <RadioGroup
            aria-labelledby="horizontal-label"
            name="horizontal-radio"
            defaultValue="medium"
            row
          >
            <FormControlLabel value="small" control={<Radio />} label="Small" />
            <FormControlLabel value="medium" control={<Radio />} label="Medium" />
            <FormControlLabel value="large" control={<Radio />} label="Large" />
          </RadioGroup>
        </FormControl>
      </section>

      {/* Required Group */}
      <section style={{ marginBottom: '2rem' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
          Required Group
        </Typography>
        <FormControl>
          <FormLabel id="required-label">
            Gender <span style={{ color: '#d32f2f' }}>*</span>
          </FormLabel>
          <RadioGroup
            aria-labelledby="required-label"
            name="gender-radio-group"
            value={gender}
            onChange={handleGenderChange}
          >
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
          <FormHelperText sx={{ mt: 1 }}>Required field</FormHelperText>
        </FormControl>
      </section>

      {/* Error State */}
      <section style={{ marginBottom: '2rem' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
          Error State
        </Typography>
        <FormControl error>
          <FormLabel id="error-label">Select an option</FormLabel>
          <RadioGroup
            aria-labelledby="error-label"
            name="error-radio-group"
            value={errorValue}
            onChange={(e) => setErrorValue(e.target.value)}
          >
            <FormControlLabel
              value="option1"
              control={<Radio />}
              label="Option 1"
            />
            <FormControlLabel
              value="option2"
              control={<Radio />}
              label="Option 2"
            />
          </RadioGroup>
          <FormHelperText sx={{ mt: 1 }}>
            Please select an option
          </FormHelperText>
        </FormControl>
      </section>

      <FeaturesSection
        features={[
          { feature: "Structure", description: "FormControl > FormLabel > RadioGroup > FormControlLabel" },
          { feature: "Layout", description: "Vertical (default) or horizontal with row prop" },
          { feature: "Selection", description: "Single selection enforced automatically" },
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
          <FormControl>
            <RadioGroup name="color-radio-group" defaultValue="primary">
              <FormControlLabel
                value="primary"
                control={<Radio color="primary" />}
                label="Primary"
              />
              <FormControlLabel
                value="secondary"
                control={<Radio color="secondary" />}
                label="Secondary"
              />
              <FormControlLabel
                value="success"
                control={<Radio color="success" />}
                label="Success"
              />
              <FormControlLabel
                value="warning"
                control={<Radio color="warning" />}
                label="Warning"
              />
            </RadioGroup>
          </FormControl>
        </section>
      </div>
    </div>
  );
}

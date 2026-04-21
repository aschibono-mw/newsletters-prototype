import React from 'react';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormHelperText,
  Stack,
  Box,
  Typography,
} from '@mui/material';
import FeaturesSection from '../FeaturesSection';

export default function RadioBaseline() {
  return (
    <div style={{ padding: '1rem' }}>
      {/* States */}
      <section style={{ marginBottom: '2rem' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
          States
        </Typography>
        <FormControl>
          <RadioGroup name="states-radio" defaultValue="selected">
            <Stack spacing={0}>
              <FormControlLabel
                value="selected"
                control={<Radio />}
                label="Selected"
              />
              <FormControlLabel
                value="unselected"
                control={<Radio />}
                label="Unselected"
              />
              <FormControlLabel
                value="disabled-unselected"
                control={<Radio />}
                label="Disabled unselected"
                disabled
              />
              <FormControlLabel
                value="disabled-selected"
                control={<Radio checked />}
                label="Disabled selected"
                disabled
              />
            </Stack>
          </RadioGroup>
        </FormControl>
      </section>

      {/* With Helper Text */}
      <section style={{ marginBottom: '2rem' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
          With Helper Text
        </Typography>
        <FormControl>
          <RadioGroup name="helper-radio" defaultValue="option1">
            <Stack spacing={1}>
              <Box>
                <FormControlLabel
                  value="option1"
                  control={<Radio />}
                  label="Standard delivery"
                />
                <FormHelperText sx={{ ml: 4 }}>
                  Arrives in 5-7 business days
                </FormHelperText>
              </Box>
              <Box>
                <FormControlLabel
                  value="option2"
                  control={<Radio />}
                  label="Express delivery"
                />
                <FormHelperText sx={{ ml: 4 }}>
                  Arrives in 1-2 business days
                </FormHelperText>
              </Box>
            </Stack>
          </RadioGroup>
        </FormControl>
      </section>

      {/* Error State */}
      <section style={{ marginBottom: '2rem' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
          Error State
        </Typography>
        <FormControl error>
          <RadioGroup name="error-radio">
            <Stack spacing={0}>
              <FormControlLabel
                value="option1"
                control={<Radio color="error" />}
                label={<span style={{ color: '#d32f2f' }}>Option 1</span>}
              />
              <FormControlLabel
                value="option2"
                control={<Radio color="error" />}
                label={<span style={{ color: '#d32f2f' }}>Option 2</span>}
              />
            </Stack>
          </RadioGroup>
          <FormHelperText sx={{ mt: 1 }}>
            Please select an option
          </FormHelperText>
        </FormControl>
      </section>

      <FeaturesSection
        features={[
          { feature: "States", description: "Selected, unselected, disabled" },
          { feature: "Colors", description: "Primary, secondary, error, warning, success" },
          { feature: "Layout", description: "FormControlLabel for label, FormHelperText for descriptions" },
          { feature: "Use Cases", description: "Single-choice forms, settings, surveys" },
        ]}
      />

      {/* Additional Variants */}
      <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '2px dashed #e0e0e0' }}>
        <h3 style={{ fontSize: '1rem', color: '#92400e', marginTop: 0, marginBottom: '1rem' }}>
          📋 Additional Variants (Not in Themed)
        </h3>

        <section style={{ marginBottom: '2rem' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
            Color Variants
          </Typography>
          <FormControl>
            <RadioGroup name="color-radio" defaultValue="primary">
              <Stack spacing={0}>
                <FormControlLabel
                  value="default"
                  control={<Radio />}
                  label="Default"
                />
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
                  value="error"
                  control={<Radio color="error" />}
                  label="Error"
                />
                <FormControlLabel
                  value="warning"
                  control={<Radio color="warning" />}
                  label="Warning"
                />
                <FormControlLabel
                  value="success"
                  control={<Radio color="success" />}
                  label="Success"
                />
              </Stack>
            </RadioGroup>
          </FormControl>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
            Sizes
          </Typography>
          <FormControl>
            <RadioGroup name="size-radio" defaultValue="medium">
              <Stack spacing={0}>
                <FormControlLabel
                  value="small"
                  control={<Radio size="small" />}
                  label="Small"
                />
                <FormControlLabel
                  value="medium"
                  control={<Radio size="medium" />}
                  label="Medium (default)"
                />
              </Stack>
            </RadioGroup>
          </FormControl>
        </section>
      </div>
    </div>
  );
}

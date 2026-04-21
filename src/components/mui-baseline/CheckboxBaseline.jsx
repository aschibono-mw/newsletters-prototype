import React from 'react';
import {
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Stack,
  Box,
  Typography,
} from '@mui/material';
import FeaturesSection from '../FeaturesSection';

export default function CheckboxBaseline() {
  const [state, setState] = React.useState({
    agreeTerms: false,
    notifications: true,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div style={{ padding: '1rem' }}>
      {/* States */}
      <section style={{ marginBottom: '2rem' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
          States
        </Typography>
        <Stack spacing={0}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Checked"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Unchecked"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked indeterminate />}
            label="Indeterminate"
          />
          <FormControlLabel
            control={<Checkbox disabled />}
            label="Disabled unchecked"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked disabled />}
            label="Disabled checked"
          />
        </Stack>
      </section>

      {/* With Helper Text */}
      <section style={{ marginBottom: '2rem' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
          With Helper Text
        </Typography>
        <Stack spacing={2}>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.agreeTerms}
                  onChange={handleChange}
                  name="agreeTerms"
                />
              }
              label="I agree to the terms and conditions"
            />
            <FormHelperText sx={{ ml: 4 }}>
              By checking this box, you agree to our terms of service
            </FormHelperText>
          </Box>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.notifications}
                  onChange={handleChange}
                  name="notifications"
                />
              }
              label="Enable email notifications"
            />
            <FormHelperText sx={{ ml: 4 }}>
              Receive updates about your account activity
            </FormHelperText>
          </Box>
        </Stack>
      </section>

      {/* Required */}
      <section style={{ marginBottom: '2rem' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
          Required
        </Typography>
        <Box>
          <FormControlLabel
            control={<Checkbox />}
            label={
              <span>
                I accept the privacy policy <span style={{ color: '#d32f2f' }}>*</span>
              </span>
            }
          />
          <FormHelperText sx={{ ml: 4 }}>Required to continue</FormHelperText>
        </Box>
      </section>

      {/* Error State */}
      <section style={{ marginBottom: '2rem' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
          Error State
        </Typography>
        <Box>
          <FormControlLabel
            control={<Checkbox color="error" />}
            label={
              <span style={{ color: '#d32f2f' }}>
                You must agree to continue
              </span>
            }
          />
          <FormHelperText error sx={{ ml: 4 }}>
            This field is required
          </FormHelperText>
        </Box>
      </section>

      <FeaturesSection
        features={[
          { feature: "States", description: "Checked, unchecked, indeterminate, disabled" },
          { feature: "Colors", description: "Primary, secondary, error, warning, success" },
          { feature: "Layout", description: "FormControlLabel for label, FormHelperText for descriptions" },
          { feature: "Use Cases", description: "Consent forms, settings toggles, agreement flows" },
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
          <Stack spacing={0}>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Default"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked color="primary" />}
              label="Primary"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked color="secondary" />}
              label="Secondary"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked color="error" />}
              label="Error"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked color="warning" />}
              label="Warning"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked color="success" />}
              label="Success"
            />
          </Stack>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
            Sizes
          </Typography>
          <Stack spacing={0}>
            <FormControlLabel
              control={<Checkbox defaultChecked size="small" />}
              label="Small"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked size="medium" />}
              label="Medium (default)"
            />
          </Stack>
        </section>
      </div>
    </div>
  );
}

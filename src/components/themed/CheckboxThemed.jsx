import React from 'react';
import {
  Checkbox as MuiCheckbox,
  FormControlLabel,
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

  // Unchecked state
  '&:not(.Mui-checked):not(.MuiCheckbox-indeterminate)': {
    color: theme.palette.grey[400],
  },

  // Checked state
  '&.Mui-checked': {
    color: theme.palette.primary.main,
  },

  // Indeterminate state
  '&.MuiCheckbox-indeterminate': {
    color: theme.palette.primary.main,
  },

  // Hover states
  '&:hover': {
    backgroundColor: 'rgba(8, 145, 178, 0.04)',
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

export default function CheckboxThemed() {
  const theme = useTheme();

  const [state, setState] = React.useState({
    agreeTerms: false,
    notifications: true,
    marketing: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div className="themed-showcase">
      {/* States */}
      <div className="variant-section">
        <SectionHeader>States</SectionHeader>
        <Stack spacing={0}>
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
            label="Disabled unchecked"
          />
          <ThemedFormControlLabel
            control={<ThemedCheckbox checked disabled />}
            label="Disabled checked"
          />
        </Stack>
      </div>

      {/* With Helper Text */}
      <div className="variant-section">
        <SectionHeader>With Helper Text</SectionHeader>
        <Stack spacing={2}>
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
            <HelperText>
              By checking this box, you agree to our terms of service
            </HelperText>
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
              label="Enable email notifications"
            />
            <HelperText>
              Receive updates about your account activity
            </HelperText>
          </Box>
        </Stack>
      </div>

      {/* Required */}
      <div className="variant-section">
        <SectionHeader>Required</SectionHeader>
        <Box>
          <ThemedFormControlLabel
            control={<ThemedCheckbox />}
            label={
              <span>
                I accept the privacy policy{' '}
                <span style={{ color: theme.palette.error.main }}>*</span>
              </span>
            }
          />
          <HelperText>Required to continue</HelperText>
        </Box>
      </div>

      {/* Error State */}
      <div className="variant-section">
        <SectionHeader>Error State</SectionHeader>
        <Box>
          <ThemedFormControlLabel
            control={<ThemedCheckbox className="Mui-error" />}
            label={
              <span style={{ color: theme.palette.error.main }}>
                You must agree to continue
              </span>
            }
          />
          <HelperText error>This field is required</HelperText>
        </Box>
      </div>

      <FeaturesSection
        features={[
          { feature: "States", description: "Checked, unchecked, indeterminate, disabled, error" },
          { feature: "Theming", description: "Teal checked (#0891B2), grey unchecked (#BDBDBD)" },
          { feature: "Focus", description: "2px teal outline with 2px offset" },
          { feature: "Layout", description: "Helper text 32px left margin, label 8px top margin" },
        ]}
      />
    </div>
  );
}

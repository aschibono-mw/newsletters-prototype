import React from 'react';
import {
  Radio as MuiRadio,
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  FormControl,
  FormHelperText,
  Stack,
  Box,
  Typography,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { typography, borderRadius } from '../../theme-tokens';
import FeaturesSection from '../docs/FeaturesSection';

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

export default function RadioThemed() {
  const theme = useTheme();

  return (
    <div className="themed-showcase">
      {/* States */}
      <div className="variant-section">
        <SectionHeader>States</SectionHeader>
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
      </div>

      {/* With Helper Text */}
      <div className="variant-section">
        <SectionHeader>With Helper Text</SectionHeader>
        <FormControl>
          <MuiRadioGroup name="helper-radio" defaultValue="option1">
            <Stack spacing={2}>
              <Box>
                <ThemedFormControlLabel
                  value="option1"
                  control={<ThemedRadio />}
                  label="Standard delivery"
                />
                <HelperText>Arrives in 5-7 business days</HelperText>
              </Box>
              <Box>
                <ThemedFormControlLabel
                  value="option2"
                  control={<ThemedRadio />}
                  label="Express delivery"
                />
                <HelperText>Arrives in 1-2 business days</HelperText>
              </Box>
            </Stack>
          </MuiRadioGroup>
        </FormControl>
      </div>

      {/* Error State */}
      <div className="variant-section">
        <SectionHeader>Error State</SectionHeader>
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
          <HelperText error sx={{ ml: 0, mt: 1 }}>
            Please select an option
          </HelperText>
        </FormControl>
      </div>

      <FeaturesSection
        features={[
          { feature: "States", description: "Selected, unselected, disabled, error" },
          { feature: "Theming", description: "Teal selected (#0891B2), grey unselected (#BDBDBD)" },
          { feature: "Focus", description: "2px teal outline with 2px offset, full border-radius" },
          { feature: "Layout", description: "Helper text 32px left margin, label 8px top margin" },
        ]}
      />
    </div>
  );
}

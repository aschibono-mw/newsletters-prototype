import React from 'react';
import {
  Radio as MuiRadio,
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  FormControl,
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

export default function RadioGroupThemed() {
  const theme = useTheme();

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
    <div className="themed-showcase">
      {/* Basic Radio Group */}
      <div className="variant-section">
        <SectionHeader>Basic Radio Group</SectionHeader>
        <FormControl>
          <ThemedFormLabel id="basic-radio-group-label">Choose one</ThemedFormLabel>
          <MuiRadioGroup
            aria-labelledby="basic-radio-group-label"
            name="basic-radio-group"
            value={value}
            onChange={handleChange}
          >
            <ThemedFormControlLabel value="option1" control={<ThemedRadio />} label="Option 1" />
            <ThemedFormControlLabel value="option2" control={<ThemedRadio />} label="Option 2" />
            <ThemedFormControlLabel value="option3" control={<ThemedRadio />} label="Option 3" />
          </MuiRadioGroup>
          <FormHelperText sx={{ ml: 0, mt: 1 }}>
            Select one option
          </FormHelperText>
        </FormControl>
      </div>

      {/* With Descriptions */}
      <div className="variant-section">
        <SectionHeader>With Descriptions</SectionHeader>
        <FormControl>
          <ThemedFormLabel id="preference-label">Contact preference</ThemedFormLabel>
          <MuiRadioGroup
            aria-labelledby="preference-label"
            name="preference-radio-group"
            value={preference}
            onChange={handlePreferenceChange}
          >
            <Stack spacing={2}>
              <Box>
                <ThemedFormControlLabel
                  value="email"
                  control={<ThemedRadio />}
                  label="Email"
                />
                <HelperText>We'll send notifications to your email address</HelperText>
              </Box>
              <Box>
                <ThemedFormControlLabel
                  value="sms"
                  control={<ThemedRadio />}
                  label="SMS"
                />
                <HelperText>Receive text message notifications</HelperText>
              </Box>
              <Box>
                <ThemedFormControlLabel
                  value="none"
                  control={<ThemedRadio />}
                  label="No notifications"
                />
                <HelperText>You won't receive any notifications</HelperText>
              </Box>
            </Stack>
          </MuiRadioGroup>
        </FormControl>
      </div>

      {/* Required Group */}
      <div className="variant-section">
        <SectionHeader>Required Group</SectionHeader>
        <FormControl>
          <ThemedFormLabel id="required-label">
            Gender <span style={{ color: theme.palette.error.main }}>*</span>
          </ThemedFormLabel>
          <MuiRadioGroup
            aria-labelledby="required-label"
            name="gender-radio-group"
            value={gender}
            onChange={handleGenderChange}
          >
            <ThemedFormControlLabel value="female" control={<ThemedRadio />} label="Female" />
            <ThemedFormControlLabel value="male" control={<ThemedRadio />} label="Male" />
            <ThemedFormControlLabel value="other" control={<ThemedRadio />} label="Other" />
          </MuiRadioGroup>
          <FormHelperText sx={{ ml: 0, mt: 1 }}>
            Required field
          </FormHelperText>
        </FormControl>
      </div>

      {/* Error State */}
      <div className="variant-section">
        <SectionHeader>Error State</SectionHeader>
        <FormControl error>
          <ThemedFormLabel
            id="error-label"
            sx={{ color: theme.palette.error.main }}
          >
            Select an option
          </ThemedFormLabel>
          <MuiRadioGroup
            aria-labelledby="error-label"
            name="error-radio-group"
            value={errorValue}
            onChange={(e) => setErrorValue(e.target.value)}
          >
            <ThemedFormControlLabel
              value="option1"
              control={<ThemedRadio className="Mui-error" />}
              label="Option 1"
            />
            <ThemedFormControlLabel
              value="option2"
              control={<ThemedRadio className="Mui-error" />}
              label="Option 2"
            />
          </MuiRadioGroup>
          <FormHelperText error sx={{ ml: 0, mt: 1 }}>
            Please select an option
          </FormHelperText>
        </FormControl>
      </div>

      <FeaturesSection
        features={[
          { feature: "Structure", description: "FormControl > FormLabel > RadioGroup > FormControlLabel" },
          { feature: "Selection", description: "Single selection enforced by RadioGroup" },
          { feature: "Validation", description: "Group-level error with FormHelperText" },
          { feature: "Descriptions", description: "32px left margin helper text per option" },
        ]}
      />
    </div>
  );
}

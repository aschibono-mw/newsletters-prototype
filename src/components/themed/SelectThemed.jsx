import React from 'react';
import {
  Select as MuiSelect,
  MenuItem as MuiMenuItem,
  FormControl as MuiFormControl,
  InputLabel as MuiInputLabel,
  Stack,
  FormHelperText,
  Tooltip,
  IconButton,
  useTheme,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { styled } from '@mui/material/styles';
import { typography, components } from '../../theme-tokens';
import FeaturesSection from '../docs/FeaturesSection';

// Styled Select using custom design system tokens
const ThemedSelect = styled(MuiSelect)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[300],
    borderWidth: '1px',
    borderRadius: components.button.borderRadius || '6px',
  },

  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[400],
  },

  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
    borderWidth: '2px',
  },

  '&.Mui-error .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.error.main,
  },

  '&.Mui-disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.action.disabled,
    },
    '& .MuiSelect-select': {
      color: theme.palette.text.disabled,
    },
  },

  '& .MuiSelect-select': {
    color: theme.palette.text.primary,
    fontSize: typography.body1.fontSize,
    padding: '14px',
  },

  '& .MuiSelect-icon': {
    color: theme.palette.text.secondary,
  },

  '&.Mui-disabled .MuiSelect-icon': {
    color: theme.palette.text.disabled,
  },
}));

// Styled InputLabel
const ThemedInputLabel = styled(MuiInputLabel)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: typography.body1.fontSize,

  '&.Mui-focused': {
    color: theme.palette.primary.main,
  },

  '&.Mui-error': {
    color: theme.palette.error.main,
  },

  '&.Mui-disabled': {
    color: theme.palette.text.disabled,
  },
}));

// Styled FormHelperText
const ThemedFormHelperText = styled(FormHelperText)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: typography.caption.fontSize,
  marginLeft: '14px',
  marginTop: '4px',

  '&.Mui-error': {
    color: theme.palette.error.main,
  },
}));

export default function SelectThemed() {
  const theme = useTheme();
  const [values, setValues] = React.useState({
    outlined: 'option1',
    withInfotip: 'option2',
    withHelper: '',
    disabled: 'option1',
    error: '',
    small: '',
  });

  const handleChange = (field) => (event) => {
    setValues({
      ...values,
      [field]: event.target.value,
    });
  };

  return (
    <div style={{ padding: '1rem' }}>
      <Stack spacing={4}>
        <MuiFormControl fullWidth>
          <ThemedInputLabel id="outlined-select-label">Outlined</ThemedInputLabel>
          <ThemedSelect
            labelId="outlined-select-label"
            value={values.outlined}
            label="Outlined"
            onChange={handleChange('outlined')}
          >
            <MuiMenuItem value="option1">Option 1</MuiMenuItem>
            <MuiMenuItem value="option2">Option 2</MuiMenuItem>
            <MuiMenuItem value="option3">Option 3</MuiMenuItem>
          </ThemedSelect>
          <ThemedFormHelperText>
            <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <span>Helper text</span>
              <span style={{ color: theme.palette.text.disabled }}>1/3</span>
            </span>
          </ThemedFormHelperText>
        </MuiFormControl>

        <MuiFormControl fullWidth>
          <ThemedInputLabel id="infotip-select-label">
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              With Infotip
              <Tooltip title="This is helpful information about the field" arrow>
                <IconButton size="small" sx={{ padding: 0, marginLeft: '4px' }}>
                  <InfoOutlinedIcon sx={{ fontSize: '16px', color: 'text.secondary' }} />
                </IconButton>
              </Tooltip>
            </span>
          </ThemedInputLabel>
          <ThemedSelect
            labelId="infotip-select-label"
            value={values.withInfotip}
            label="With Infotip"
            onChange={handleChange('withInfotip')}
          >
            <MuiMenuItem value="option1">Option 1</MuiMenuItem>
            <MuiMenuItem value="option2">Option 2</MuiMenuItem>
            <MuiMenuItem value="option3">Option 3</MuiMenuItem>
          </ThemedSelect>
          <ThemedFormHelperText>
            <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <span>Label floats when field has selection</span>
              <span style={{ color: theme.palette.text.disabled }}>1/3</span>
            </span>
          </ThemedFormHelperText>
        </MuiFormControl>

        <MuiFormControl fullWidth>
          <ThemedInputLabel id="helper-select-label">With Helper Text</ThemedInputLabel>
          <ThemedSelect
            labelId="helper-select-label"
            value={values.withHelper}
            label="With Helper Text"
            onChange={handleChange('withHelper')}
          >
            <MuiMenuItem value="option1">Option 1</MuiMenuItem>
            <MuiMenuItem value="option2">Option 2</MuiMenuItem>
            <MuiMenuItem value="option3">Option 3</MuiMenuItem>
          </ThemedSelect>
          <ThemedFormHelperText>
            <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <span>Select an option from the list</span>
              <span style={{ color: theme.palette.text.disabled }}>0/3</span>
            </span>
          </ThemedFormHelperText>
        </MuiFormControl>

        <MuiFormControl fullWidth disabled>
          <ThemedInputLabel id="disabled-select-label">Disabled</ThemedInputLabel>
          <ThemedSelect
            labelId="disabled-select-label"
            value={values.disabled}
            label="Disabled"
          >
            <MuiMenuItem value="option1">Option 1</MuiMenuItem>
            <MuiMenuItem value="option2">Option 2</MuiMenuItem>
            <MuiMenuItem value="option3">Option 3</MuiMenuItem>
          </ThemedSelect>
          <ThemedFormHelperText>
            <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <span>Helper text</span>
              <span style={{ color: theme.palette.text.disabled }}>1/3</span>
            </span>
          </ThemedFormHelperText>
        </MuiFormControl>

        <MuiFormControl fullWidth error>
          <ThemedInputLabel id="error-select-label">Error</ThemedInputLabel>
          <ThemedSelect
            labelId="error-select-label"
            value={values.error}
            label="Error"
            onChange={handleChange('error')}
          >
            <MuiMenuItem value="option1">Option 1</MuiMenuItem>
            <MuiMenuItem value="option2">Option 2</MuiMenuItem>
            <MuiMenuItem value="option3">Option 3</MuiMenuItem>
          </ThemedSelect>
          <ThemedFormHelperText error>
            <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <span>Error message</span>
              <span style={{ color: theme.palette.text.disabled }}>0/3</span>
            </span>
          </ThemedFormHelperText>
        </MuiFormControl>

        <div style={{ marginTop: '2rem', borderTop: '1px solid #e0e0e0', paddingTop: '1rem' }}>
          <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>Small Size Variant</h4>
          <MuiFormControl fullWidth size="small">
            <ThemedInputLabel id="small-select-label">Small</ThemedInputLabel>
            <ThemedSelect
              labelId="small-select-label"
              value={values.small}
              label="Small"
              onChange={handleChange('small')}
              sx={{
                '& .MuiSelect-select': {
                  padding: '8px',
                },
              }}
            >
              <MuiMenuItem value="option1">Option 1</MuiMenuItem>
              <MuiMenuItem value="option2">Option 2</MuiMenuItem>
              <MuiMenuItem value="option3">Option 3</MuiMenuItem>
            </ThemedSelect>
            <ThemedFormHelperText>
              <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span>Helper text</span>
                <span style={{ color: theme.palette.text.disabled }}>0/3</span>
              </span>
            </ThemedFormHelperText>
          </MuiFormControl>
        </div>

        <FeaturesSection
          features={[
            { feature: "Theming", description: "Outlined only, teal focus, red error, 6px radius" },
            { feature: "States", description: "Focus, error, disabled (grey bg)" },
            { feature: "Extras", description: "Helper text with item count, dropdown icon uses text.secondary" },
            { feature: "Sizes", description: "Small (8px padding), medium (14px padding), MUI API compatible" },
          ]}
        />
      </Stack>
    </div>
  );
}

import React from 'react';
import { TextField as MuiTextField, Stack, Tooltip, IconButton, InputAdornment, useTheme } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from '@mui/material/styles';
import { typography, components } from '../../theme-tokens';
import FeaturesSection from '../docs/FeaturesSection';

// Styled TextField using custom design system tokens
const ThemedTextField = styled(MuiTextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: components.button.borderRadius || '6px',

    // Default state
    '& fieldset': {
      borderColor: theme.palette.grey[300],
      borderWidth: '1px',
    },

    // Hover state
    '&:hover fieldset': {
      borderColor: theme.palette.grey[400],
    },

    // Focused state
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      borderWidth: '2px',
    },

    // Error state
    '&.Mui-error fieldset': {
      borderColor: theme.palette.error.main,
    },
    '&.Mui-error:hover fieldset': {
      borderColor: theme.palette.error.dark,
    },
    '&.Mui-error.Mui-focused fieldset': {
      borderColor: theme.palette.error.main,
      borderWidth: '2px',
    },

    // Disabled state
    '&.Mui-disabled': {
      backgroundColor: theme.palette.grey[50],
      '& fieldset': {
        borderColor: theme.palette.grey[200],
      },
    },
  },

  // Label styling
  '& .MuiInputLabel-root': {
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
  },

  // Input text styling
  '& .MuiInputBase-input': {
    color: theme.palette.text.primary,
    fontSize: typography.body1.fontSize,
    padding: '14px',

    '&::placeholder': {
      color: theme.palette.text.disabled,
      opacity: 1,
    },

    '&.Mui-disabled': {
      color: theme.palette.text.disabled,
      WebkitTextFillColor: theme.palette.text.disabled,
    },
  },

  // Helper text styling
  '& .MuiFormHelperText-root': {
    color: theme.palette.text.secondary,
    fontSize: typography.caption.fontSize,
    marginLeft: '14px',
    marginTop: '4px',

    '&.Mui-error': {
      color: theme.palette.error.main,
    },
  },

  // Small size variant
  '&.MuiTextField-sizeSmall': {
    '& .MuiInputBase-input': {
      padding: '8px',
      fontSize: '13px',
    },
  },

  // Standard variant (underline)
  '& .MuiInput-root': {
    '&:before': {
      borderBottomColor: theme.palette.grey[300],
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottomColor: theme.palette.grey[400],
    },
    '&:after': {
      borderBottomColor: theme.palette.primary.main,
    },
    '&.Mui-error:after': {
      borderBottomColor: theme.palette.error.main,
    },
  },

  // Filled variant
  '& .MuiFilledInput-root': {
    backgroundColor: theme.palette.grey[100],
    borderRadius: '6px 6px 0 0',

    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },

    '&.Mui-focused': {
      backgroundColor: theme.palette.grey[100],
    },

    '&:before': {
      borderBottomColor: theme.palette.grey[300],
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottomColor: theme.palette.grey[400],
    },
    '&:after': {
      borderBottomColor: theme.palette.primary.main,
    },
    '&.Mui-error:after': {
      borderBottomColor: theme.palette.error.main,
    },
  },
}));

export default function TextFieldThemed() {
  const theme = useTheme();
  const [values, setValues] = React.useState({
    standard: '',
    outlined: '',
    filled: '',
    multiline: '',
    withClear: '',
    withInfotip: 'Some text',
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
        <ThemedTextField
          label="Outlined"
          variant="outlined"
          value={values.outlined}
          onChange={handleChange('outlined')}
          helperText={
            <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <span>Helper text</span>
              <span style={{ color: theme.palette.text.disabled }}>{values.outlined.length}/100</span>
            </span>
          }
        />
        <ThemedTextField
          label={
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              With Infotip
              <Tooltip title="This is helpful information about the field" arrow>
                <IconButton size="small" sx={{ padding: 0, marginLeft: '4px' }}>
                  <InfoOutlinedIcon sx={{ fontSize: '16px', color: 'text.secondary' }} />
                </IconButton>
              </Tooltip>
            </span>
          }
          variant="outlined"
          value={values.withInfotip}
          onChange={handleChange('withInfotip')}
          helperText={
            <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <span>Label floats when field has content</span>
              <span style={{ color: theme.palette.text.disabled }}>{values.withInfotip.length}/100</span>
            </span>
          }
        />
        <ThemedTextField
          label="With Clear Button"
          variant="outlined"
          value={values.withClear}
          onChange={handleChange('withClear')}
          helperText={
            <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <span>Type to see clear button</span>
              <span style={{ color: theme.palette.text.disabled }}>{values.withClear.length}/100</span>
            </span>
          }
          InputProps={{
            endAdornment: values.withClear && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => setValues({ ...values, withClear: '' })}
                  edge="end"
                  sx={{
                    padding: '4px',
                    backgroundColor: theme.palette.grey[200],
                    borderRadius: '50%',
                    color: theme.palette.text.secondary,
                    width: '20px',
                    height: '20px',
                    '&:hover': {
                      backgroundColor: theme.palette.grey[300],
                      color: theme.palette.text.primary,
                    },
                  }}
                >
                  <ClearIcon sx={{ fontSize: '14px' }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <ThemedTextField
          label="Multiline"
          variant="outlined"
          multiline
          rows={3}
          value={values.multiline}
          onChange={handleChange('multiline')}
          helperText={
            <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <span>Helper text</span>
              <span style={{ color: theme.palette.text.disabled }}>{values.multiline.length}/200</span>
            </span>
          }
        />
        <ThemedTextField
          label="Disabled"
          variant="outlined"
          disabled
          value="Disabled value"
        />
        <ThemedTextField
          label="Error"
          variant="outlined"
          error
          helperText={
            <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <span>Error message</span>
              <span style={{ color: theme.palette.text.disabled }}>0/100</span>
            </span>
          }
        />

        <div style={{ marginTop: '2rem', borderTop: '1px solid #e0e0e0', paddingTop: '1rem' }}>
          <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>Small Size Variant</h4>
          <ThemedTextField
            label="Small"
            variant="outlined"
            size="small"
            helperText={
              <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span>Helper text</span>
                <span style={{ color: theme.palette.text.disabled }}>0/100</span>
              </span>
            }
          />
        </div>

        <FeaturesSection
          features={[
            { feature: "Theming", description: "Outlined default, teal focus, red error, 6px radius" },
            { feature: "States", description: "Focus, error, disabled (grey bg), floating label animation" },
            { feature: "Extras", description: "Helper text, character count, multiline, start/end adornments" },
            { feature: "Sizes", description: "Small (8px padding), medium (14px padding), MUI API compatible" },
          ]}
        />
      </Stack>
    </div>
  );
}

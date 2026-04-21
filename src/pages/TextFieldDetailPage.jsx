import React from 'react'
import { Box, TextField as MuiTextField, Tooltip, IconButton, InputAdornment, useTheme } from '@mui/material'
import { styled } from '@mui/material/styles'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import ClearIcon from '@mui/icons-material/Clear'
import { typography, components } from '../theme-tokens'
import AccessibilitySection from '../components/docs/AccessibilitySection'
import FeaturesSection from '../components/docs/FeaturesSection'
import { CoreDetailPageLayout, CoreVariantSection, CorePropsTable } from '../components/core'

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
}));

function TextFieldDetailPage() {
  const theme = useTheme()
  const [values, setValues] = React.useState({
    outlined: '',
    withClear: '',
    withInfotip: 'Some text',
    multiline: '',
    small: '',
  })

  const handleChange = (field) => (event) => {
    setValues({
      ...values,
      [field]: event.target.value,
    })
  }

  return (
    <CoreDetailPageLayout
      title="Text Field"
      description="Themed text field with custom focus states, character counts, and design system tokens."
    >
      <CoreVariantSection title="Basic">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
        </Box>
      </CoreVariantSection>

      <CoreVariantSection title="With Infotip">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
        </Box>
      </CoreVariantSection>

      <CoreVariantSection title="With Clear Button">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
        </Box>
      </CoreVariantSection>

      <CoreVariantSection title="Multiline">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
        </Box>
      </CoreVariantSection>

      <CoreVariantSection title="States">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
        </Box>
      </CoreVariantSection>

      <CoreVariantSection title="Sizes">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <ThemedTextField
            label="Small"
            variant="outlined"
            size="small"
            value={values.small}
            onChange={handleChange('small')}
            helperText={
              <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span>Helper text</span>
                <span style={{ color: theme.palette.text.disabled }}>{values.small.length}/100</span>
              </span>
            }
          />
          <ThemedTextField
            label="Medium (Default)"
            variant="outlined"
            helperText={
              <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span>Helper text</span>
                <span style={{ color: theme.palette.text.disabled }}>0/100</span>
              </span>
            }
          />
        </Box>
      </CoreVariantSection>

      <FeaturesSection
        features={[
          { feature: "Theming", description: "Outlined variant, teal focus, red error, 6px radius" },
          { feature: "States", description: "Focus, error, disabled (grey bg), floating label animation" },
          { feature: "Extras", description: "Helper text, character count, infotip in label, clear button, multiline" },
          { feature: "Sizes", description: "Small (8px padding) and medium (14px padding)" },
        ]}
      />

      <CorePropsTable
        props={[
          { name: 'value', type: 'string', description: 'Input value' },
          { name: 'onChange', type: 'function', description: 'Callback when value changes' },
          { name: 'label', type: 'string', description: 'Input label' },
          { name: 'placeholder', type: 'string', description: 'Placeholder text' },
          { name: 'helperText', type: 'ReactNode', description: 'Helper text below input' },
          { name: 'error', type: 'boolean', description: 'If true, shows error state' },
          { name: 'disabled', type: 'boolean', description: 'If true, input is disabled' },
          { name: 'multiline', type: 'boolean', description: 'If true, renders as textarea' },
          { name: 'size', type: '"small" | "medium"', description: 'Input size. Default: "medium"' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "1.3.1", name: "Info and Relationships", level: "A", note: "Label linked via htmlFor/id" },
          { id: "1.3.5", name: "Identify Input Purpose", level: "AA", note: "Supports autocomplete attribute" },
          { id: "2.1.1", name: "Keyboard", level: "A", note: "Tab to focus, type to input" },
          { id: "2.4.7", name: "Focus Visible", level: "AA", note: "Teal outline on focus" },
          { id: "3.3.1", name: "Error Identification", level: "A", note: "Error text below field" },
          { id: "3.3.2", name: "Labels or Instructions", level: "A", note: "Floating label + helper text" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "Native input element" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "4.5:1 text, adapts to palette" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default TextFieldDetailPage

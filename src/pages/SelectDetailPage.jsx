import React from 'react'
import {
  Box,
  Select as MuiSelect,
  MenuItem as MuiMenuItem,
  FormControl as MuiFormControl,
  Tooltip,
  IconButton,
  useTheme,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { typography, components } from '../theme-tokens'
import { CoreDetailPageLayout, CoreVariantSection, CorePropsTable } from '../components/core'
import AccessibilitySection from '../components/docs/AccessibilitySection'
import FeaturesSection from '../components/docs/FeaturesSection'
import { ThemedInputLabel, ThemedFormHelperTextSelect } from '../components/themed/FormControlsThemed'

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
}))

function SelectDetailPage() {
  const theme = useTheme()
  const [values, setValues] = React.useState({
    outlined: 'option1',
    withInfotip: 'option2',
    withHelper: '',
    disabled: 'option1',
    error: '',
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
      title="Select"
      description="Themed select component with custom focus states, item counts, and design system tokens."
    >
      <CoreVariantSection title="Basic">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
            <ThemedFormHelperTextSelect>
              <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span>Helper text</span>
                <span style={{ color: theme.palette.text.disabled }}>1/3</span>
              </span>
            </ThemedFormHelperTextSelect>
          </MuiFormControl>
        </Box>
      </CoreVariantSection>

      <CoreVariantSection title="With Infotip">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
            <ThemedFormHelperTextSelect>
              <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span>Label floats when field has selection</span>
                <span style={{ color: theme.palette.text.disabled }}>1/3</span>
              </span>
            </ThemedFormHelperTextSelect>
          </MuiFormControl>
        </Box>
      </CoreVariantSection>

      <CoreVariantSection title="With Helper Text">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
            <ThemedFormHelperTextSelect>
              <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span>Select an option from the list</span>
                <span style={{ color: theme.palette.text.disabled }}>0/3</span>
              </span>
            </ThemedFormHelperTextSelect>
          </MuiFormControl>
        </Box>
      </CoreVariantSection>

      <CoreVariantSection title="States">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
            <ThemedFormHelperTextSelect>
              <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span>Helper text</span>
                <span style={{ color: theme.palette.text.disabled }}>1/3</span>
              </span>
            </ThemedFormHelperTextSelect>
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
            <ThemedFormHelperTextSelect error>
              <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span>Error message</span>
                <span style={{ color: theme.palette.text.disabled }}>0/3</span>
              </span>
            </ThemedFormHelperTextSelect>
          </MuiFormControl>
        </Box>
      </CoreVariantSection>

      <CoreVariantSection title="Sizes">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
            <ThemedFormHelperTextSelect>
              <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span>Helper text</span>
                <span style={{ color: theme.palette.text.disabled }}>0/3</span>
              </span>
            </ThemedFormHelperTextSelect>
          </MuiFormControl>

          <MuiFormControl fullWidth>
            <ThemedInputLabel id="medium-select-label">Medium (Default)</ThemedInputLabel>
            <ThemedSelect
              labelId="medium-select-label"
              value="option1"
              label="Medium (Default)"
            >
              <MuiMenuItem value="option1">Option 1</MuiMenuItem>
              <MuiMenuItem value="option2">Option 2</MuiMenuItem>
              <MuiMenuItem value="option3">Option 3</MuiMenuItem>
            </ThemedSelect>
            <ThemedFormHelperTextSelect>
              <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span>Helper text</span>
                <span style={{ color: theme.palette.text.disabled }}>1/3</span>
              </span>
            </ThemedFormHelperTextSelect>
          </MuiFormControl>
        </Box>
      </CoreVariantSection>

      <FeaturesSection
        features={[
          { feature: "Theming", description: "Outlined variant only, teal focus, red error, 6px radius" },
          { feature: "States", description: "Focus, error, disabled (grey bg)" },
          { feature: "Extras", description: "Helper text with item count indicator, dropdown icon uses text.secondary" },
          { feature: "Sizes", description: "Small (8px padding) and medium (14px padding)" },
        ]}
      />

      <CorePropsTable
        props={[
          { name: 'value', type: 'any', description: 'The selected value' },
          { name: 'onChange', type: 'function', description: 'Callback when selection changes' },
          { name: 'label', type: 'string', description: 'Input label' },
          { name: 'multiple', type: 'boolean', description: 'If true, allows multiple selections' },
          { name: 'disabled', type: 'boolean', description: 'If true, the select is disabled' },
          { name: 'error', type: 'boolean', description: 'If true, shows error state' },
          { name: 'size', type: '"small" | "medium"', description: 'Input size. Default: "medium"' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "1.3.1", name: "Info and Relationships", level: "A", note: "Label linked via htmlFor/id" },
          { id: "2.1.1", name: "Keyboard", level: "A", note: "Tab to focus, arrows to navigate, Enter to select" },
          { id: "2.4.7", name: "Focus Visible", level: "AA", note: "Teal outline on focus" },
          { id: "3.3.2", name: "Labels or Instructions", level: "A", note: "Floating label + helper text" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "combobox role, aria-expanded" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "4.5:1 text, adapts to palette" },
          { id: "1.4.11", name: "Non-text Contrast", level: "AA", note: "3:1 dropdown icon and border" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default SelectDetailPage

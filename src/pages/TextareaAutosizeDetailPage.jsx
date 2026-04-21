import React from 'react'
import {
  Box,
  Typography,
  TextareaAutosize as MuiTextareaAutosize,
  Stack,
  FormLabel,
  FormHelperText,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { CoreDetailPageLayout, CoreVariantSection, CorePropsTable } from '../components/core'
import AccessibilitySection from '../components/docs/AccessibilitySection'
import FeaturesSection from '../components/docs/FeaturesSection'

// Themed TextareaAutosize with design system styling
const ThemedTextarea = styled(MuiTextareaAutosize)(({ theme, error }) => ({
  width: '100%',
  fontFamily: theme.typography.fontFamily,
  fontSize: '1rem',
  fontWeight: 400,
  lineHeight: 1.5,
  padding: '12px 14px',
  borderRadius: '6px',
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${error ? theme.palette.error.main : theme.palette.divider}`,
  boxSizing: 'border-box',
  resize: 'vertical',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',

  '&:hover': {
    borderColor: error ? theme.palette.error.main : theme.palette.text.primary,
  },

  '&:focus': {
    outline: 'none',
    borderColor: error ? theme.palette.error.main : theme.palette.primary.main,
    boxShadow: `0 0 0 3px ${error ? theme.palette.error.main : theme.palette.primary.main}26`,
  },

  '&:disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
    borderColor: theme.palette.divider,
    color: theme.palette.text.disabled,
    cursor: 'not-allowed',
  },

  '&::placeholder': {
    color: theme.palette.text.secondary,
    opacity: 0.7,
  },
}))

// Small size variant
const ThemedTextareaSmall = styled(ThemedTextarea)({
  fontSize: '0.875rem',
  padding: '8px 12px',
})

// Basic MUI TextareaAutosize (unstyled)
const BaseTextarea = styled(MuiTextareaAutosize)(({ theme }) => ({
  width: '100%',
  fontFamily: theme.typography.fontFamily,
  fontSize: '1rem',
  padding: '8px 12px',
  borderRadius: '4px',
  border: `1px solid ${theme.palette.grey[400]}`,
  resize: 'vertical',

  '&:focus': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: '2px',
  },
}))

const FieldWrapper = ({ label, helperText, error, children, characterCount, maxLength }) => (
  <Box sx={{ width: '100%' }}>
    {label && (
      <FormLabel
        sx={{
          display: 'block',
          mb: 1,
          fontWeight: 500,
          fontSize: '0.875rem',
          color: error ? 'error.main' : 'text.primary',
        }}
      >
        {label}
      </FormLabel>
    )}
    {children}
    {(helperText || characterCount !== undefined) && (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
        <FormHelperText error={error} sx={{ m: 0 }}>
          {helperText}
        </FormHelperText>
        {maxLength && (
          <FormHelperText sx={{ m: 0 }}>
            {characterCount}/{maxLength}
          </FormHelperText>
        )}
      </Box>
    )}
  </Box>
)

function TextareaAutosizeDetailPage() {
  const [values, setValues] = React.useState({
    basic: '',
    minRows: '',
    maxRows: '',
    withLabel: '',
    small: '',
    error: '',
    disabled: 'This textarea is disabled and cannot be edited.',
    charCount: '',
  })

  const handleChange = (field) => (event) => {
    setValues({
      ...values,
      [field]: event.target.value,
    })
  }

  return (
    <CoreDetailPageLayout
      title="Textarea Autosize"
      description="A textarea component that automatically adjusts its height to fit the content. Useful for comments, descriptions, and multi-line inputs."
    >
      <CoreVariantSection title="Basic Usage">
        <Stack spacing={4}>
          <Box>
            <Typography gutterBottom sx={{ fontSize: '0.875rem', color: 'text.primary', mb: 2 }}>
              Auto-growing (no limit)
            </Typography>
            <ThemedTextarea
              placeholder="Type here and watch it grow..."
              value={values.basic}
              onChange={handleChange('basic')}
              minRows={3}
            />
          </Box>

          <Box>
            <Typography gutterBottom sx={{ fontSize: '0.875rem', color: 'text.primary', mb: 2 }}>
              Minimum Rows (minRows=4)
            </Typography>
            <ThemedTextarea
              placeholder="Starts with 4 rows minimum..."
              value={values.minRows}
              onChange={handleChange('minRows')}
              minRows={4}
            />
          </Box>

          <Box>
            <Typography gutterBottom sx={{ fontSize: '0.875rem', color: 'text.primary', mb: 2 }}>
              Maximum Rows (minRows=2, maxRows=6)
            </Typography>
            <ThemedTextarea
              placeholder="Grows up to 6 rows, then scrolls..."
              value={values.maxRows}
              onChange={handleChange('maxRows')}
              minRows={2}
              maxRows={6}
            />
          </Box>
        </Stack>
      </CoreVariantSection>

      <CoreVariantSection title="With Labels & Helper Text">
        <Stack spacing={4}>
          <FieldWrapper
            label="Description"
            helperText="Provide a detailed description of your request"
          >
            <ThemedTextarea
              placeholder="Enter description..."
              value={values.withLabel}
              onChange={handleChange('withLabel')}
              minRows={3}
            />
          </FieldWrapper>

          <FieldWrapper
            label="Bio"
            helperText="Tell us about yourself"
            characterCount={values.charCount.length}
            maxLength={280}
          >
            <ThemedTextarea
              placeholder="Write a short bio..."
              value={values.charCount}
              onChange={handleChange('charCount')}
              minRows={3}
              maxRows={6}
            />
          </FieldWrapper>
        </Stack>
      </CoreVariantSection>

      <CoreVariantSection title="Sizes">
        <Stack spacing={4}>
          <Box>
            <Typography gutterBottom sx={{ fontSize: '0.875rem', color: 'text.primary', mb: 2 }}>
              Default Size
            </Typography>
            <ThemedTextarea
              placeholder="Default size textarea..."
              minRows={2}
            />
          </Box>

          <Box>
            <Typography gutterBottom sx={{ fontSize: '0.875rem', color: 'text.primary', mb: 2 }}>
              Small Size
            </Typography>
            <ThemedTextareaSmall
              placeholder="Small size textarea..."
              value={values.small}
              onChange={handleChange('small')}
              minRows={2}
            />
          </Box>
        </Stack>
      </CoreVariantSection>

      <CoreVariantSection title="States">
        <Stack spacing={4}>
          <FieldWrapper
            label="Error State"
            helperText="This field has an error"
            error
          >
            <ThemedTextarea
              placeholder="Error state..."
              value={values.error}
              onChange={handleChange('error')}
              minRows={2}
              error
            />
          </FieldWrapper>

          <FieldWrapper
            label="Disabled State"
            helperText="This field is disabled"
          >
            <ThemedTextarea
              value={values.disabled}
              minRows={2}
              disabled
            />
          </FieldWrapper>
        </Stack>
      </CoreVariantSection>

      <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          MUI Baseline (Unstyled)
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          The base MUI TextareaAutosize component with minimal styling:
        </Typography>
        <BaseTextarea
          placeholder="MUI baseline textarea..."
          minRows={3}
        />
      </Box>

      <FeaturesSection
        features={[
          { feature: "Auto-resize", description: "Height adjusts with content, minRows/maxRows control, manual resize gripper" },
          { feature: "Theming", description: "6px radius, teal focus ring (3px shadow), error state (red)" },
          { feature: "States", description: "Focus, error, disabled, small variant (reduced padding/font)" },
          { feature: "Extras", description: "Character count, label/helper text patterns, accessible" },
        ]}
      />

      <CorePropsTable
        props={[
          { name: 'value', type: 'string', description: 'Textarea value' },
          { name: 'onChange', type: 'function', description: 'Callback when value changes' },
          { name: 'minRows', type: 'number', description: 'Minimum number of rows. Default: 1' },
          { name: 'maxRows', type: 'number', description: 'Maximum rows before scrolling' },
          { name: 'placeholder', type: 'string', description: 'Placeholder text' },
          { name: 'disabled', type: 'boolean', description: 'If true, textarea is disabled' },
        ]}
      />

      <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Usage Notes
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
          • Use minRows to set the initial height of the textarea
          <br />
          • Use maxRows to limit growth and enable scrolling
          <br />
          • Without maxRows, textarea will grow indefinitely
          <br />
          • For forms with validation, pair with FieldWrapper pattern
          <br />
          • Consider character limits for user-generated content
          <br />
          • Alternative: Use TextField with multiline and rows props for outlined styling
        </Typography>
      </Box>

      <AccessibilitySection
        wcag={[
          { id: "1.3.1", name: "Info and Relationships", level: "A", note: "Label linked via htmlFor/id" },
          { id: "2.1.1", name: "Keyboard", level: "A", note: "Tab to focus, type to input" },
          { id: "2.4.7", name: "Focus Visible", level: "AA", note: "Teal outline on focus" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "Native textarea element" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "4.5:1 text contrast" },
          { id: "1.4.11", name: "Non-text Contrast", level: "AA", note: "3:1 border vs background" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default TextareaAutosizeDetailPage

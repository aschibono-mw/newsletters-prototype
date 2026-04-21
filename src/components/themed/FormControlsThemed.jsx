/**
 * FormControlsThemed - Shared themed components for form controls
 *
 * These styled components are extracted from detail pages to provide
 * consistent styling across Checkbox, Radio, Select, and Switch components.
 */

import {
  FormControlLabel,
  FormLabel,
  FormHelperText,
  InputLabel,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { typography } from '../../theme-tokens'

/**
 * ThemedFormControlLabel - Styled label wrapper for checkboxes, radios, and switches
 *
 * Features:
 * - Aligns label text with control center (8px top margin)
 * - Uses body1 typography
 * - Disabled state styling
 */
export const ThemedFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
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
}))

/**
 * ThemedFormControlLabelSwitch - Variant for switches with different margin
 *
 * Features:
 * - No negative left margin
 * - 8px left margin on label
 */
export const ThemedFormControlLabelSwitch = styled(FormControlLabel)(({ theme }) => ({
  marginLeft: 0,
  marginRight: 0,

  '& .MuiFormControlLabel-label': {
    fontSize: typography.body1.fontSize,
    lineHeight: typography.body1.lineHeight,
    color: theme.palette.text.primary,
    marginLeft: '8px',

    '&.Mui-disabled': {
      color: theme.palette.text.disabled,
    },
  },
}))

/**
 * ThemedFormLabel - Styled group label for fieldsets
 *
 * Features:
 * - Bold (600) weight
 * - body1 font size
 * - 8px bottom margin
 * - Focus state doesn't change color
 * - Error state support
 */
export const ThemedFormLabel = styled(FormLabel)(({ theme }) => ({
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
}))

/**
 * ThemedHelperText - Styled helper text for individual form controls
 *
 * Features:
 * - 32px left margin to align with label text (checkbox/radio)
 * - Caption typography
 * - Error state support
 */
export const ThemedHelperText = styled(FormHelperText)(({ theme }) => ({
  fontSize: typography.caption.fontSize,
  lineHeight: typography.caption.lineHeight,
  color: theme.palette.text.secondary,
  marginLeft: '32px',
  marginTop: '4px',

  '&.Mui-error': {
    color: theme.palette.error.main,
  },
}))

/**
 * ThemedHelperTextSwitch - Variant for switches with different margin
 *
 * Features:
 * - 50px left margin to align with switch width
 */
export const ThemedHelperTextSwitch = styled(FormHelperText)(({ theme }) => ({
  fontSize: typography.caption.fontSize,
  lineHeight: typography.caption.lineHeight,
  color: theme.palette.text.secondary,
  marginLeft: '50px',
  marginTop: '4px',

  '&.Mui-error': {
    color: theme.palette.error.main,
  },
}))

/**
 * ThemedInputLabel - Styled floating label for Select components
 *
 * Features:
 * - Focus state uses primary color
 * - Error state support
 * - Disabled state support
 */
export const ThemedInputLabel = styled(InputLabel)(({ theme }) => ({
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
}))

/**
 * ThemedFormHelperTextSelect - Styled helper text for Select components
 *
 * Features:
 * - 14px left margin to match select padding
 * - Caption typography
 * - Error state support
 */
export const ThemedFormHelperTextSelect = styled(FormHelperText)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: typography.caption.fontSize,
  marginLeft: '14px',
  marginTop: '4px',

  '&.Mui-error': {
    color: theme.palette.error.main,
  },
}))

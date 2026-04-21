import { Box, Typography, Button as MuiButton, IconButton as MuiIconButton, CircularProgress } from '@mui/material'
import { styled } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import DownloadIcon from '@mui/icons-material/Download'
import { components } from '../theme-tokens'
import { CoreDetailPageLayout, CoreVariantSection, CorePropsTable } from '../components/core'
import AccessibilitySection from '../components/docs/AccessibilitySection'
import FeaturesSection from '../components/docs/FeaturesSection'
import ResourceLinksSection from '../components/docs/ResourceLinksSection'
import RelatedComponentsSection from '../components/docs/RelatedComponentsSection'
import ComponentMetadata from '../components/docs/ComponentMetadata'
import { getComponentMeta, getRelatedComponents } from '../config/componentRegistry'

// Styled Button using custom design system tokens
const ThemedButton = styled(MuiButton)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: components.button.borderRadius,
  fontWeight: 500,
  transition: 'all 0.2s ease',
  boxShadow: 'none',

  '&:hover': {
    boxShadow: 'none',
  },

  // SIZE VARIANTS
  '&.MuiButton-sizeSmall': {
    padding: components.button.padding.small,
    fontSize: components.button.fontSize.small,
  },
  '&.MuiButton-sizeMedium': {
    padding: components.button.padding.medium,
    fontSize: components.button.fontSize.medium,
  },
  '&.MuiButton-sizeLarge': {
    padding: components.button.padding.large,
    fontSize: components.button.fontSize.large,
  },

  // CONTAINED VARIANTS
  '&.MuiButton-containedPrimary': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      outline: `2px solid ${theme.palette.primary.light}`,
      outlineOffset: '2px',
    },
    '&:active': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  '&.MuiButton-containedSecondary': {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
    '&:focus': {
      backgroundColor: theme.palette.secondary.main,
      outline: `2px solid ${theme.palette.secondary.light}`,
      outlineOffset: '2px',
    },
    '&:active': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  '&.MuiButton-containedError': {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
  '&.MuiButton-containedWarning': {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.warning.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.warning.dark,
    },
  },
  '&.MuiButton-containedSuccess': {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
  '&.MuiButton-containedInfo': {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.info.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.info.dark,
    },
  },

  // OUTLINED VARIANTS
  '&.MuiButton-outlined': {
    borderWidth: '1px',
    borderStyle: 'solid',
    backgroundColor: 'transparent',
  },
  '&.MuiButton-outlinedPrimary': {
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      borderColor: theme.palette.primary.dark,
    },
    '&:focus': {
      outline: `2px solid ${theme.palette.primary.light}`,
      outlineOffset: '2px',
      borderColor: theme.palette.primary.main,
    },
    '&:active': {
      backgroundColor: theme.palette.primary.light,
      borderColor: theme.palette.primary.dark,
    },
  },
  '&.MuiButton-outlinedSecondary': {
    borderColor: theme.palette.secondary.main,
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      borderColor: theme.palette.secondary.dark,
    },
    '&:focus': {
      outline: `2px solid ${theme.palette.secondary.light}`,
      outlineOffset: '2px',
      borderColor: theme.palette.secondary.main,
    },
    '&:active': {
      backgroundColor: theme.palette.secondary.light,
      borderColor: theme.palette.secondary.dark,
    },
  },
  '&.MuiButton-outlinedError': {
    borderColor: theme.palette.error.main,
    color: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.light,
      borderColor: theme.palette.error.dark,
    },
  },

  // TEXT VARIANTS
  '&.MuiButton-textPrimary': {
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  '&.MuiButton-textSecondary': {
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  '&.MuiButton-textError': {
    color: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.light,
    },
  },

  // DISABLED STATE
  '&.Mui-disabled': {
    opacity: 0.4,
    cursor: 'not-allowed',
  },
}));

// Styled Icon Button
const ThemedIconButton = styled(MuiIconButton)(({ theme }) => ({
  borderRadius: components.button.borderRadius,
  padding: '8px',
  transition: 'all 0.2s ease',

  '&.MuiIconButton-colorPrimary': {
    color: theme.palette.text.secondary,
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  },

  '&.Mui-disabled': {
    opacity: 0.4,
  },
}));

function ButtonDetailPage() {
  // Get component metadata from registry
  const componentMeta = getComponentMeta('button')
  const relatedComponents = getRelatedComponents('button')

  return (
    <CoreDetailPageLayout
      title="Button"
      description="Themed button component with custom color palette, focus states, and full MUI API compatibility."
    >
      <Box sx={{ mb: 3 }}>
        {/* Component Metadata - Status, Updated, Availability */}
        <ComponentMetadata
          status={componentMeta?.status}
          lastUpdated={componentMeta?.lastUpdated}
          version={componentMeta?.version}
          availability={componentMeta?.availability}
        />
      </Box>

      <CoreVariantSection title="Variants">
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <ThemedButton variant="contained" color="primary">Contained</ThemedButton>
          <ThemedButton variant="outlined" color="primary">Outlined</ThemedButton>
          <ThemedButton variant="text" color="primary">Text</ThemedButton>
        </Box>
      </CoreVariantSection>

      <CoreVariantSection title="Sizes">
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <ThemedButton variant="contained" color="primary" size="small">Small</ThemedButton>
          <ThemedButton variant="contained" color="primary" size="medium">Medium</ThemedButton>
          <ThemedButton variant="contained" color="primary" size="large">Large</ThemedButton>
        </Box>
      </CoreVariantSection>

      <CoreVariantSection title="Colors (Contained)">
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <ThemedButton variant="contained" color="primary">Primary</ThemedButton>
          <ThemedButton variant="contained" color="secondary">Secondary</ThemedButton>
          <ThemedButton variant="contained" color="error">Error</ThemedButton>
          <ThemedButton variant="contained" color="warning">Warning</ThemedButton>
          <ThemedButton variant="contained" color="success">Success</ThemedButton>
          <ThemedButton variant="contained" color="info">Info</ThemedButton>
        </Box>
      </CoreVariantSection>

      <CoreVariantSection title="States (Primary Contained)">
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <ThemedButton variant="contained" color="primary">Default</ThemedButton>
          <ThemedButton variant="contained" color="primary" disabled>Disabled</ThemedButton>
        </Box>
      </CoreVariantSection>

      <CoreVariantSection title="Outlined Variants">
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <ThemedButton variant="outlined" color="primary">Primary</ThemedButton>
          <ThemedButton variant="outlined" color="secondary">Secondary</ThemedButton>
          <ThemedButton variant="outlined" color="error">Error</ThemedButton>
          <ThemedButton variant="outlined" color="primary" disabled>Disabled</ThemedButton>
        </Box>
      </CoreVariantSection>

      <CoreVariantSection title="Text Variants">
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <ThemedButton variant="text" color="primary">Primary</ThemedButton>
          <ThemedButton variant="text" color="secondary">Secondary</ThemedButton>
          <ThemedButton variant="text" color="error">Error</ThemedButton>
          <ThemedButton variant="text" disabled>Disabled</ThemedButton>
        </Box>
      </CoreVariantSection>

      <CoreVariantSection title="With Icons">
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <ThemedButton variant="contained" color="primary" startIcon={<AddIcon />}>Add Item</ThemedButton>
          <ThemedButton variant="outlined" color="primary" startIcon={<SearchIcon />}>Search</ThemedButton>
          <ThemedButton variant="contained" color="error" startIcon={<DeleteIcon />}>Delete</ThemedButton>
          <ThemedButton variant="outlined" color="primary" endIcon={<DownloadIcon />}>Download</ThemedButton>
        </Box>
      </CoreVariantSection>

      <CoreVariantSection title="Icon Buttons">
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <ThemedIconButton color="primary" size="small">
            <SearchIcon fontSize="small" />
          </ThemedIconButton>
          <ThemedIconButton color="primary">
            <AddIcon />
          </ThemedIconButton>
          <ThemedIconButton color="primary" size="large">
            <DeleteIcon fontSize="large" />
          </ThemedIconButton>
          <ThemedIconButton color="primary" disabled>
            <SearchIcon />
          </ThemedIconButton>
        </Box>
      </CoreVariantSection>

      <CoreVariantSection title="Loading States">
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <ThemedButton
            variant="contained"
            color="primary"
            disabled
            startIcon={<CircularProgress size={16} sx={{ color: (theme) => theme.palette.primary.contrastText }} />}
          >
            Loading
          </ThemedButton>
          <ThemedButton
            variant="outlined"
            color="primary"
            disabled
            startIcon={<CircularProgress size={16} sx={{ color: (theme) => theme.palette.primary.main }} />}
          >
            Loading
          </ThemedButton>
        </Box>
      </CoreVariantSection>

      <FeaturesSection
        features={[
          { feature: "Theming", description: "Teal/purple palette, adapts to colorblind modes, 6px radius, flat design" },
          { feature: "States", description: "Default, hover, focus (2px outline w/ offset), pressed, disabled (40% opacity)" },
          { feature: "Variants", description: "Contained, outlined, text in all status colors" },
          { feature: "Icons", description: "startIcon/endIcon props, icon buttons use text.secondary" },
        ]}
      />

      <CorePropsTable
        props={[
          { name: 'variant', type: '"contained" | "outlined" | "text"', description: 'Button style variant. Default: "contained"' },
          { name: 'color', type: '"primary" | "secondary" | "error" | "warning" | "success" | "info"', description: 'Button color' },
          { name: 'size', type: '"small" | "medium" | "large"', description: 'Button size. Default: "medium"' },
          { name: 'startIcon', type: 'ReactNode', description: 'Icon displayed before the label' },
          { name: 'endIcon', type: 'ReactNode', description: 'Icon displayed after the label' },
          { name: 'disabled', type: 'boolean', description: 'If true, the button is disabled' },
          { name: 'onClick', type: 'function', description: 'Click handler' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "2.1.1", name: "Keyboard", level: "A", note: "Tab to focus, Enter/Space to activate" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "Native button, aria-pressed for toggles" },
          { id: "2.4.7", name: "Focus Visible", level: "AA", note: "2px outline with offset" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "4.5:1 min, adapts to palette" },
          { id: "2.5.8", name: "Target Size", level: "AA", note: "Min 24×24px touch target" },
        ]}
      />

      <ResourceLinksSection
        links={[
          { label: 'Button in Figma', url: null, type: 'figma', description: 'View component specs and variants' },
          { label: 'Button in Storybook', url: null, type: 'storybook', description: 'Interactive examples and props' },
          { label: 'MUI Button API', url: 'https://mui.com/material-ui/api/button/', type: 'mui', description: 'Full API reference' },
          { label: 'Action Labels Guide', url: '/content/action-labels', type: 'internal', description: 'Writing effective button labels' },
        ]}
      />

      <RelatedComponentsSection components={relatedComponents} />
    </CoreDetailPageLayout>
  )
}

export default ButtonDetailPage

import {
  Box,
  Typography,
  Stack,
} from '@mui/material'
import AccessibilitySection from '../components/docs/AccessibilitySection'
import FeaturesSection from '../components/docs/FeaturesSection'
import { CoreDetailPageLayout, CoreVariantSection, CorePropsTable } from '../components/core'

function BoxDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Box"
      description="The most fundamental layout component - a wrapper that maps directly to CSS with theme-aware styling via the sx prop."
    >
      <CoreVariantSection title="Basic Box">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Box renders a div by default with sx prop for styling.
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Simple Wrapper
            </Typography>
            <Box sx={{ p: 2, border: '1px dashed', borderColor: 'divider' }}>
              <Typography>Content inside a Box</Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              With Background
            </Typography>
            <Box sx={{ p: 3, backgroundColor: 'primary.main', color: 'primary.contrastText', borderRadius: 1 }}>
              <Typography>Box with primary background</Typography>
            </Box>
          </Box>
        </Stack>
      </CoreVariantSection>

      <CoreVariantSection title="sx Prop Shortcuts">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Convenient shorthand properties that map to theme values.
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Spacing (p, m, px, py, mx, my)
            </Typography>
            <Stack direction="row" spacing={2}>
              <Box sx={{ p: 1, backgroundColor: 'grey.200' }}>
                <Typography variant="caption">p: 1 (8px)</Typography>
              </Box>
              <Box sx={{ p: 2, backgroundColor: 'grey.200' }}>
                <Typography variant="caption">p: 2 (16px)</Typography>
              </Box>
              <Box sx={{ p: 3, backgroundColor: 'grey.200' }}>
                <Typography variant="caption">p: 3 (24px)</Typography>
              </Box>
              <Box sx={{ px: 3, py: 1, backgroundColor: 'grey.200' }}>
                <Typography variant="caption">px: 3, py: 1</Typography>
              </Box>
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Colors (from palette)
            </Typography>
            <Stack direction="row" spacing={2}>
              <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'primary.contrastText' }}>
                primary.main
              </Box>
              <Box sx={{ p: 2, backgroundColor: 'secondary.main', color: 'secondary.contrastText' }}>
                secondary.main
              </Box>
              <Box sx={{ p: 2, backgroundColor: 'error.main', color: 'error.contrastText' }}>
                error.main
              </Box>
              <Box sx={{ p: 2, backgroundColor: 'grey.100' }}>
                grey.100
              </Box>
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Border Radius
            </Typography>
            <Stack direction="row" spacing={2}>
              <Box sx={{ p: 3, backgroundColor: 'grey.200', borderRadius: 0 }}>
                borderRadius: 0
              </Box>
              <Box sx={{ p: 3, backgroundColor: 'grey.200', borderRadius: 1 }}>
                borderRadius: 1
              </Box>
              <Box sx={{ p: 3, backgroundColor: 'grey.200', borderRadius: 2 }}>
                borderRadius: 2
              </Box>
              <Box sx={{ p: 3, backgroundColor: 'grey.200', borderRadius: '50%', width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                50%
              </Box>
            </Stack>
          </Box>
        </Stack>
      </CoreVariantSection>

      <CoreVariantSection title="Display & Flexbox">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Common layout patterns using flexbox shortcuts.
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Flexbox Center
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 100,
                backgroundColor: 'grey.100',
                borderRadius: 1,
              }}
            >
              <Typography>Centered content</Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Space Between
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                backgroundColor: 'grey.100',
                borderRadius: 1,
              }}
            >
              <Typography>Left</Typography>
              <Typography>Center</Typography>
              <Typography>Right</Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Column Direction
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                p: 2,
                backgroundColor: 'grey.100',
                borderRadius: 1,
                maxWidth: 200,
              }}
            >
              <Typography>Item 1</Typography>
              <Typography>Item 2</Typography>
              <Typography>Item 3</Typography>
            </Box>
          </Box>
        </Stack>
      </CoreVariantSection>

      <CoreVariantSection title="Component Prop">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Box can render as any HTML element or React component.
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Different HTML Elements
            </Typography>
            <Stack spacing={2}>
              <Box component="span" sx={{ p: 1, backgroundColor: 'grey.200', display: 'inline-block' }}>
                component="span"
              </Box>
              <Box component="section" sx={{ p: 2, backgroundColor: 'grey.200' }}>
                component="section"
              </Box>
              <Box component="article" sx={{ p: 2, backgroundColor: 'grey.200' }}>
                component="article"
              </Box>
            </Stack>
          </Box>
        </Stack>
      </CoreVariantSection>

      <CoreVariantSection title="Responsive Values">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          sx prop accepts breakpoint-based responsive values.
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Responsive Padding
            </Typography>
            <Box
              sx={{
                p: { xs: 1, sm: 2, md: 3, lg: 4 },
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                borderRadius: 1,
              }}
            >
              <Typography variant="body2">
                Padding increases at each breakpoint (xs: 8px, sm: 16px, md: 24px, lg: 32px)
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Responsive Display
            </Typography>
            <Box
              sx={{
                display: { xs: 'block', md: 'flex' },
                gap: 2,
                backgroundColor: 'grey.100',
                p: 2,
                borderRadius: 1,
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'grey.300', mb: { xs: 2, md: 0 } }}>Item 1</Box>
              <Box sx={{ p: 2, backgroundColor: 'grey.300', mb: { xs: 2, md: 0 } }}>Item 2</Box>
              <Box sx={{ p: 2, backgroundColor: 'grey.300' }}>Item 3</Box>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Stacked on mobile, flex row on medium+
            </Typography>
          </Box>
        </Stack>
      </CoreVariantSection>

      <CoreVariantSection title="Pseudo Selectors">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          sx prop supports hover, focus, and other pseudo-selectors.
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Hover Effects
            </Typography>
            <Stack direction="row" spacing={2}>
              <Box
                sx={{
                  p: 2,
                  backgroundColor: 'grey.200',
                  borderRadius: 1,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Hover me
              </Box>
              <Box
                sx={{
                  p: 2,
                  border: '2px solid',
                  borderColor: 'grey.300',
                  borderRadius: 1,
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                  '&:hover': {
                    borderColor: 'primary.main',
                  },
                }}
              >
                Border change
              </Box>
            </Stack>
          </Box>
        </Stack>
      </CoreVariantSection>

      <FeaturesSection
        features={[
          { feature: "sx Prop", description: "Theme-aware CSS-in-JS styling with shorthand properties (p, m, color, bgcolor)" },
          { feature: "Theme Values", description: "Colors (primary.main), spacing (1 = 8px), breakpoints (xs, sm, md, lg, xl)" },
          { feature: "component Prop", description: "Render as any HTML element (div, span, section) or React component" },
          { feature: "Responsive Syntax", description: "Object syntax for breakpoint-specific values: { xs: 1, md: 2 }" },
          { feature: "Pseudo Selectors", description: "Supports &:hover, &:focus, &:active, and other CSS selectors in sx" },
        ]}
      />

      <CorePropsTable
        props={[
          { name: 'component', type: 'string | ReactComponent', description: 'The HTML element or component to render. Default: "div"' },
          { name: 'sx', type: 'object', description: 'Theme-aware CSS styles with shorthand props (p, m, color, bgcolor, etc.)' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "1.3.1", name: "Info and Relationships", level: "A", note: "Use semantic component prop (section, article) when appropriate" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "Ensure text on colored backgrounds meets 4.5:1 ratio" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default BoxDetailPage

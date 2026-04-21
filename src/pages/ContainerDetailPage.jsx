import {
  Box,
  Container,
  Typography,
  Stack,
} from '@mui/material'
import AccessibilitySection from '../components/docs/AccessibilitySection'
import FeaturesSection from '../components/docs/FeaturesSection'
import { CoreDetailPageLayout, CoreVariantSection, CorePropsTable } from '../components/core'

function ContainerDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Container"
      description="A wrapper component that centers content horizontally with responsive max-width constraints."
    >
      <CoreVariantSection title="Max Width Options">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Container constrains content to specific maximum widths based on breakpoints.
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              maxWidth="xs" (444px)
            </Typography>
            <Box sx={{ backgroundColor: 'grey.100', p: 1 }}>
              <Container maxWidth="xs" sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', p: 2 }}>
                <Typography variant="body2">xs container - 444px max</Typography>
              </Container>
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              maxWidth="sm" (600px)
            </Typography>
            <Box sx={{ backgroundColor: 'grey.100', p: 1 }}>
              <Container maxWidth="sm" sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', p: 2 }}>
                <Typography variant="body2">sm container - 600px max</Typography>
              </Container>
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              maxWidth="md" (900px)
            </Typography>
            <Box sx={{ backgroundColor: 'grey.100', p: 1 }}>
              <Container maxWidth="md" sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', p: 2 }}>
                <Typography variant="body2">md container - 900px max</Typography>
              </Container>
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              maxWidth="lg" (1200px)
            </Typography>
            <Box sx={{ backgroundColor: 'grey.100', p: 1 }}>
              <Container maxWidth="lg" sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', p: 2 }}>
                <Typography variant="body2">lg container - 1200px max</Typography>
              </Container>
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              maxWidth="xl" (1536px)
            </Typography>
            <Box sx={{ backgroundColor: 'grey.100', p: 1 }}>
              <Container maxWidth="xl" sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', p: 2 }}>
                <Typography variant="body2">xl container - 1536px max</Typography>
              </Container>
            </Box>
          </Box>
        </Stack>
      </CoreVariantSection>

      <CoreVariantSection title="Fixed vs Fluid">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Container behavior at different viewport sizes.
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Fluid (Default)
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Width is 100% until it reaches the maxWidth breakpoint.
            </Typography>
            <Box sx={{ backgroundColor: 'grey.100', p: 1 }}>
              <Container maxWidth="md" sx={{ backgroundColor: 'secondary.main', color: 'secondary.contrastText', p: 2 }}>
                <Typography variant="body2">Fluid container - 100% width up to 900px</Typography>
              </Container>
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Fixed
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Width snaps to discrete breakpoint values.
            </Typography>
            <Box sx={{ backgroundColor: 'grey.100', p: 1 }}>
              <Container fixed sx={{ backgroundColor: 'secondary.main', color: 'secondary.contrastText', p: 2 }}>
                <Typography variant="body2">Fixed container - snaps to breakpoint widths</Typography>
              </Container>
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              maxWidth={'{'}false{'}'} (Full Width)
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              No maximum width constraint, spans full viewport.
            </Typography>
            <Box sx={{ backgroundColor: 'grey.100', p: 1 }}>
              <Container maxWidth={false} sx={{ backgroundColor: 'error.main', color: 'error.contrastText', p: 2 }}>
                <Typography variant="body2">Full width container - no max constraint</Typography>
              </Container>
            </Box>
          </Box>
        </Stack>
      </CoreVariantSection>

      <CoreVariantSection title="Gutters">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Container has default horizontal padding (gutters) that can be disabled.
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              With Gutters (Default)
            </Typography>
            <Box sx={{ backgroundColor: 'grey.200' }}>
              <Container maxWidth="sm" sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', py: 2 }}>
                <Typography variant="body2">Notice the horizontal padding</Typography>
              </Container>
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              disableGutters
            </Typography>
            <Box sx={{ backgroundColor: 'grey.200' }}>
              <Container maxWidth="sm" disableGutters sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', py: 2 }}>
                <Typography variant="body2">No horizontal padding</Typography>
              </Container>
            </Box>
          </Box>
        </Stack>
      </CoreVariantSection>

      <CoreVariantSection title="Common Patterns">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Typical container usage in page layouts.
        </Typography>
        <Stack spacing={4}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Page Content Container
            </Typography>
            <Box sx={{ backgroundColor: 'grey.100', p: 2, borderRadius: 1 }}>
              <Container maxWidth="lg">
                <Box sx={{ backgroundColor: 'background.paper', p: 3, borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>Page Title</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Main content area is typically wrapped in a Container with maxWidth="lg" or "xl" to maintain readable line lengths.
                  </Typography>
                </Box>
              </Container>
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Narrow Content (Forms, Auth)
            </Typography>
            <Box sx={{ backgroundColor: 'grey.100', p: 2, borderRadius: 1 }}>
              <Container maxWidth="xs">
                <Box sx={{ backgroundColor: 'background.paper', p: 3, borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Sign In</Typography>
                  <Box sx={{ height: 40, backgroundColor: 'grey.200', borderRadius: 1, mb: 2 }} />
                  <Box sx={{ height: 40, backgroundColor: 'grey.200', borderRadius: 1, mb: 2 }} />
                  <Box sx={{ height: 36, backgroundColor: 'primary.main', borderRadius: 1 }} />
                </Box>
              </Container>
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Custom Max Width
            </Typography>
            <Box sx={{ backgroundColor: 'grey.100', p: 2, borderRadius: 1 }}>
              <Container maxWidth={false} sx={{ maxWidth: 800 }}>
                <Box sx={{ backgroundColor: 'background.paper', p: 3, borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="body2">
                    Custom max-width (800px) using sx prop for non-standard widths
                  </Typography>
                </Box>
              </Container>
            </Box>
          </Box>
        </Stack>
      </CoreVariantSection>

      <FeaturesSection
        features={[
          { feature: "Max Width Presets", description: "xs (444px), sm (600px), md (900px), lg (1200px), xl (1536px)" },
          { feature: "Fluid vs Fixed", description: "Fluid (default) fills to max; fixed snaps to discrete breakpoint widths" },
          { feature: "Auto Centering", description: "Container is horizontally centered with margin: auto" },
          { feature: "Gutters", description: "Default horizontal padding; use disableGutters for edge-to-edge content" },
          { feature: "Custom Widths", description: "Use maxWidth={false} with sx={{ maxWidth: value }} for custom constraints" },
        ]}
      />

      <CorePropsTable
        props={[
          { name: 'maxWidth', type: '"xs" | "sm" | "md" | "lg" | "xl" | false', description: 'Maximum width breakpoint. Default: "lg"' },
          { name: 'fixed', type: 'boolean', description: 'If true, uses fixed breakpoint widths' },
          { name: 'disableGutters', type: 'boolean', description: 'If true, removes horizontal padding' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "1.4.10", name: "Reflow", level: "AA", note: "Container supports responsive reflow at 320px viewport" },
          { id: "1.4.4", name: "Resize Text", level: "AA", note: "Content remains accessible when text is resized" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default ContainerDetailPage

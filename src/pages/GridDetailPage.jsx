import { Box, Typography, Stack, Grid } from '@mui/material'
import { CoreDetailPageLayout, CoreVariantSection, CorePropsTable } from '../components/core'
import AccessibilitySection from '../components/docs/AccessibilitySection'
import FeaturesSection from '../components/docs/FeaturesSection'

function GridDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Grid"
      description="A responsive 12-column grid layout system built on CSS Flexbox for consistent page structure."
    >
      <CoreVariantSection title="Basic Grid">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Grid container wraps grid items. Items define their column span out of 12.
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Equal Columns
            </Typography>
            <Grid container spacing={2}>
              {[1, 2, 3, 4].map((item) => (
                <Grid item xs={3} key={item}>
                  <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'primary.contrastText', textAlign: 'center', borderRadius: 1 }}>
                    xs=3
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Mixed Widths
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'primary.contrastText', textAlign: 'center', borderRadius: 1 }}>
                  xs=8
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ p: 2, backgroundColor: 'secondary.main', color: 'secondary.contrastText', textAlign: 'center', borderRadius: 1 }}>
                  xs=4
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </CoreVariantSection>

      <CoreVariantSection title="Responsive Breakpoints">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Grid items can change width at different breakpoints.
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Stack to Row (xs=12, sm=6, md=3)
            </Typography>
            <Grid container spacing={2}>
              {[1, 2, 3, 4].map((item) => (
                <Grid item xs={12} sm={6} md={3} key={item}>
                  <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'primary.contrastText', textAlign: 'center', borderRadius: 1 }}>
                    Item {item}
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Full width on mobile, 2 per row on tablet, 4 per row on desktop
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Sidebar + Content Layout
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Box sx={{ p: 2, backgroundColor: 'grey.200', height: 100, borderRadius: 1 }}>
                  <Typography variant="body2">Sidebar (xs=12, md=4)</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                <Box sx={{ p: 2, backgroundColor: 'grey.100', height: 100, borderRadius: 1 }}>
                  <Typography variant="body2">Main Content (xs=12, md=8)</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </CoreVariantSection>

      <CoreVariantSection title="Spacing">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Grid spacing prop controls gap between items (1 unit = 8px).
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              spacing=1 (8px)
            </Typography>
            <Grid container spacing={1}>
              {[1, 2, 3].map((item) => (
                <Grid item xs={4} key={item}>
                  <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'primary.contrastText', textAlign: 'center', borderRadius: 1 }}>
                    {item}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              spacing=2 (16px)
            </Typography>
            <Grid container spacing={2}>
              {[1, 2, 3].map((item) => (
                <Grid item xs={4} key={item}>
                  <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'primary.contrastText', textAlign: 'center', borderRadius: 1 }}>
                    {item}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              spacing=4 (32px)
            </Typography>
            <Grid container spacing={4}>
              {[1, 2, 3].map((item) => (
                <Grid item xs={4} key={item}>
                  <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'primary.contrastText', textAlign: 'center', borderRadius: 1 }}>
                    {item}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Responsive Spacing
            </Typography>
            <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
              {[1, 2, 3].map((item) => (
                <Grid item xs={4} key={item}>
                  <Box sx={{ p: 2, backgroundColor: 'secondary.main', color: 'secondary.contrastText', textAlign: 'center', borderRadius: 1 }}>
                    {item}
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              8px mobile, 16px tablet, 24px desktop
            </Typography>
          </Box>
        </Stack>
      </CoreVariantSection>

      <CoreVariantSection title="Auto-layout">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Items can auto-size to fill available space.
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              xs="auto" (Content Width)
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs="auto">
                <Box sx={{ px: 2, py: 1, backgroundColor: 'primary.main', color: 'primary.contrastText', borderRadius: 1 }}>
                  Auto
                </Box>
              </Grid>
              <Grid item xs="auto">
                <Box sx={{ px: 2, py: 1, backgroundColor: 'primary.main', color: 'primary.contrastText', borderRadius: 1 }}>
                  Auto (longer)
                </Box>
              </Grid>
              <Grid item xs>
                <Box sx={{ px: 2, py: 1, backgroundColor: 'secondary.main', color: 'secondary.contrastText', borderRadius: 1 }}>
                  Fill remaining
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              xs (Equal Fill)
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs>
                <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'primary.contrastText', textAlign: 'center', borderRadius: 1 }}>
                  xs
                </Box>
              </Grid>
              <Grid item xs>
                <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'primary.contrastText', textAlign: 'center', borderRadius: 1 }}>
                  xs
                </Box>
              </Grid>
              <Grid item xs>
                <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'primary.contrastText', textAlign: 'center', borderRadius: 1 }}>
                  xs
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </CoreVariantSection>

      <CoreVariantSection title="Row & Column Spacing">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Control horizontal and vertical spacing independently.
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              rowSpacing=2, columnSpacing=4
            </Typography>
            <Grid container rowSpacing={2} columnSpacing={4}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Grid item xs={4} key={item}>
                  <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'primary.contrastText', textAlign: 'center', borderRadius: 1 }}>
                    {item}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Stack>
      </CoreVariantSection>

      <CoreVariantSection title="Nested Grid">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Grids can be nested for complex layouts.
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Grid Inside Grid Item
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ p: 2, backgroundColor: 'grey.200', borderRadius: 1 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>Outer: xs=6</Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Box sx={{ p: 1, backgroundColor: 'primary.main', color: 'primary.contrastText', textAlign: 'center', borderRadius: 1 }}>
                        Inner
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ p: 1, backgroundColor: 'primary.main', color: 'primary.contrastText', textAlign: 'center', borderRadius: 1 }}>
                        Inner
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: 2, backgroundColor: 'grey.200', height: '100%', borderRadius: 1 }}>
                  <Typography variant="body2">Outer: xs=6</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </CoreVariantSection>

      <FeaturesSection
        features={[
          { feature: "12-Column System", description: "Items specify column span (1-12); columns automatically wrap to next row" },
          { feature: "Responsive Props", description: "xs, sm, md, lg, xl props define width at each breakpoint" },
          { feature: "Spacing", description: "spacing prop sets gap (1 = 8px); rowSpacing/columnSpacing for independent control" },
          { feature: "Auto-layout", description: "xs='auto' sizes to content; xs (no value) fills remaining space equally" },
          { feature: "Nesting", description: "Grid containers can nest inside grid items for complex layouts" },
        ]}
      />

      <CorePropsTable
        props={[
          { name: 'container', type: 'boolean', description: 'If true, component acts as a grid container' },
          { name: 'item', type: 'boolean', description: 'If true, component acts as a grid item' },
          { name: 'spacing', type: 'number | object', description: 'Gap between items (1 = 8px)' },
          { name: 'xs, sm, md, lg, xl', type: 'number | "auto" | boolean', description: 'Column span at each breakpoint (1-12)' },
          { name: 'rowSpacing', type: 'number', description: 'Vertical gap between rows' },
          { name: 'columnSpacing', type: 'number', description: 'Horizontal gap between columns' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "1.3.2", name: "Meaningful Sequence", level: "A", note: "Visual order matches DOM order for screen readers" },
          { id: "1.4.10", name: "Reflow", level: "AA", note: "Content reflows at narrow viewports (320px)" },
          { id: "1.4.4", name: "Resize Text", level: "AA", note: "Grid adapts to text resizing without overlap" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default GridDetailPage

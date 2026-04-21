import {
  Box,
  Stack,
  Typography,
  Paper,
} from '@mui/material'
import FeaturesSection from '../docs/FeaturesSection'

function PaperThemed() {
  return (
    <div className="themed-showcase">
      {/* Elevation Levels */}
      <div className="variant-section">
        <h4>Elevation Levels</h4>
        <p>Paper surfaces with varying shadow depths (0-24).</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Common Elevations
            </Typography>
            <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap', gap: 3 }}>
              {[0, 1, 2, 3, 4, 6, 8, 12, 16, 24].map((elevation) => (
                <Paper
                  key={elevation}
                  elevation={elevation}
                  sx={{
                    width: 100,
                    height: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {elevation}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          </Box>
        </Stack>
      </div>

      {/* Variants */}
      <div className="variant-section">
        <h4>Variants</h4>
        <p>Elevation (shadow) vs outlined (border) styles.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Elevation (Default)
            </Typography>
            <Paper elevation={3} sx={{ p: 3, maxWidth: 400 }}>
              <Typography variant="body1">
                Elevated paper uses box-shadow to create depth. Commonly used for cards, dialogs, and floating elements.
              </Typography>
            </Paper>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Outlined
            </Typography>
            <Paper variant="outlined" sx={{ p: 3, maxWidth: 400 }}>
              <Typography variant="body1">
                Outlined paper uses a 1px border instead of shadow. Useful for flat designs or when reducing visual weight.
              </Typography>
            </Paper>
          </Box>
        </Stack>
      </div>

      {/* Square vs Rounded */}
      <div className="variant-section">
        <h4>Corner Radius</h4>
        <p>Papers can have rounded or square corners.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Rounded (Default)
            </Typography>
            <Paper elevation={2} sx={{ p: 3, maxWidth: 300 }}>
              <Typography variant="body2">
                Default border-radius from theme
              </Typography>
            </Paper>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Square
            </Typography>
            <Paper square elevation={2} sx={{ p: 3, maxWidth: 300 }}>
              <Typography variant="body2">
                No border-radius (square corners)
              </Typography>
            </Paper>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Custom Radius
            </Typography>
            <Paper elevation={2} sx={{ p: 3, maxWidth: 300, borderRadius: 4 }}>
              <Typography variant="body2">
                Custom borderRadius via sx prop
              </Typography>
            </Paper>
          </Box>
        </Stack>
      </div>

      {/* Use Cases */}
      <div className="variant-section">
        <h4>Common Use Cases</h4>
        <p>Paper as foundation for various UI patterns.</p>
        <Stack spacing={4}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Card Container
            </Typography>
            <Paper elevation={1} sx={{ p: 3, maxWidth: 350 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Card Title
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Paper provides the elevated surface for card components.
              </Typography>
              <Box sx={{ pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                <Typography variant="caption" color="text.secondary">
                  Card footer content
                </Typography>
              </Box>
            </Paper>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Menu Surface
            </Typography>
            <Paper elevation={8} sx={{ p: 1, maxWidth: 200 }}>
              <Box sx={{ py: 1, px: 2, '&:hover': { backgroundColor: 'action.hover' }, cursor: 'pointer', borderRadius: 1 }}>
                <Typography variant="body2">Menu item 1</Typography>
              </Box>
              <Box sx={{ py: 1, px: 2, '&:hover': { backgroundColor: 'action.hover' }, cursor: 'pointer', borderRadius: 1 }}>
                <Typography variant="body2">Menu item 2</Typography>
              </Box>
              <Box sx={{ py: 1, px: 2, '&:hover': { backgroundColor: 'action.hover' }, cursor: 'pointer', borderRadius: 1 }}>
                <Typography variant="body2">Menu item 3</Typography>
              </Box>
            </Paper>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Dialog Surface
            </Typography>
            <Paper elevation={24} sx={{ p: 3, maxWidth: 400 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Dialog Title
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Dialogs use the highest elevation (24) to ensure they appear above all other content.
              </Typography>
              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <Typography
                  component="span"
                  sx={{ color: 'primary.main', cursor: 'pointer', fontWeight: 500 }}
                >
                  Cancel
                </Typography>
                <Typography
                  component="span"
                  sx={{ color: 'primary.main', cursor: 'pointer', fontWeight: 500, ml: 2 }}
                >
                  Confirm
                </Typography>
              </Stack>
            </Paper>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Content Section
            </Typography>
            <Paper variant="outlined" sx={{ p: 3, maxWidth: 500 }}>
              <Typography variant="overline" color="text.secondary">
                Section Header
              </Typography>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Content Area
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Outlined papers work well for grouping related content without adding visual weight.
              </Typography>
            </Paper>
          </Box>
        </Stack>
      </div>

      {/* Colored Backgrounds */}
      <div className="variant-section">
        <h4>Background Colors</h4>
        <p>Paper respects theme background colors.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Default (background.paper)
            </Typography>
            <Paper elevation={2} sx={{ p: 3, maxWidth: 300 }}>
              <Typography variant="body2">
                Uses theme.palette.background.paper
              </Typography>
            </Paper>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Custom Background
            </Typography>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                maxWidth: 300,
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
              }}
            >
              <Typography variant="body2">
                Custom colored paper surface
              </Typography>
            </Paper>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Subtle Background
            </Typography>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                maxWidth: 300,
                backgroundColor: 'grey.100',
              }}
            >
              <Typography variant="body2">
                Subtle grey background for sections
              </Typography>
            </Paper>
          </Box>
        </Stack>
      </div>

      <FeaturesSection
        features={[
          { feature: "Elevation System", description: "0-24 levels of box-shadow depth, following Material Design elevation guidelines" },
          { feature: "Variants", description: "elevation (default shadow-based) or outlined (1px border) styles" },
          { feature: "Corner Radius", description: "Default rounded corners from theme, or square prop for sharp corners" },
          { feature: "Foundation Component", description: "Base surface for Card, Dialog, Menu, Drawer, and other overlay components" },
          { feature: "Theme Integration", description: "Automatically uses background.paper color and responds to theme changes" },
        ]}
      />
    </div>
  )
}

export default PaperThemed

import { Box, Divider as MuiDivider, Stack, Typography, Chip } from '@mui/material'
import FeaturesSection from '../docs/FeaturesSection'

function DividerThemed() {
  return (
    <div className="themed-showcase">
      {/* Horizontal Divider */}
      <div className="variant-section">
        <h4>Horizontal Divider</h4>
        <p>Default horizontal line for separating content sections.</p>
        <Stack spacing={2}>
          <Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Content above the divider
            </Typography>
            <MuiDivider />
            <Typography variant="body2" sx={{ mt: 2 }}>
              Content below the divider
            </Typography>
          </Box>
        </Stack>
      </div>

      {/* Vertical Divider */}
      <div className="variant-section">
        <h4>Vertical Divider</h4>
        <p>Vertical line for separating inline elements.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2">Item 1</Typography>
            <MuiDivider orientation="vertical" flexItem />
            <Typography variant="body2">Item 2</Typography>
            <MuiDivider orientation="vertical" flexItem />
            <Typography variant="body2">Item 3</Typography>
          </Box>
        </Stack>
      </div>

      {/* With Text */}
      <div className="variant-section">
        <h4>With Text/Content</h4>
        <p>Divider with centered text or components.</p>
        <Stack spacing={3}>
          <MuiDivider>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </MuiDivider>

          <MuiDivider>
            <Chip label="Section 2" size="small" variant="outlined" />
          </MuiDivider>

          <MuiDivider textAlign="left">
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Left aligned
            </Typography>
          </MuiDivider>

          <MuiDivider textAlign="right">
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Right aligned
            </Typography>
          </MuiDivider>
        </Stack>
      </div>

      {/* Inset Divider */}
      <div className="variant-section">
        <h4>Inset Divider</h4>
        <p>Divider with left/right margins for list items.</p>
        <Stack spacing={2}>
          <Box>
            <Box sx={{ py: 1 }}>
              <Typography variant="body2">List Item 1</Typography>
            </Box>
            <MuiDivider variant="inset" />
            <Box sx={{ py: 1 }}>
              <Typography variant="body2">List Item 2</Typography>
            </Box>
            <MuiDivider variant="inset" />
            <Box sx={{ py: 1 }}>
              <Typography variant="body2">List Item 3</Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
              Middle inset (full width with margins on both sides):
            </Typography>
            <Box sx={{ py: 1 }}>
              <Typography variant="body2">List Item 1</Typography>
            </Box>
            <MuiDivider variant="middle" />
            <Box sx={{ py: 1 }}>
              <Typography variant="body2">List Item 2</Typography>
            </Box>
            <MuiDivider variant="middle" />
            <Box sx={{ py: 1 }}>
              <Typography variant="body2">List Item 3</Typography>
            </Box>
          </Box>
        </Stack>
      </div>

      {/* List Context */}
      <div className="variant-section">
        <h4>In List Context</h4>
        <p>Common usage pattern in lists and menus.</p>
        <Stack spacing={0}>
          <Box sx={{ p: 2, '&:hover': { backgroundColor: 'action.hover' } }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Profile Settings
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Manage your account preferences
            </Typography>
          </Box>
          <MuiDivider />
          <Box sx={{ p: 2, '&:hover': { backgroundColor: 'action.hover' } }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Notifications
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Configure alert preferences
            </Typography>
          </Box>
          <MuiDivider />
          <Box sx={{ p: 2, '&:hover': { backgroundColor: 'action.hover' } }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Privacy & Security
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Control your data and security settings
            </Typography>
          </Box>
        </Stack>
      </div>

      <FeaturesSection
        features={[
          { feature: "Orientation", description: "Horizontal (default), Vertical" },
          { feature: "Variants", description: "Full width (default), Inset (left margin), Middle (both margins)" },
          { feature: "Content", description: "Text, chips, or components centered. Text align: center/left/right" },
          { feature: "Styling", description: "1px border, theme divider color, 16-32px spacing above/below" },
        ]}
      />
    </div>
  )
}

export default DividerThemed

import { Box, Typography, Button } from '@mui/material'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import HistoryIcon from '@mui/icons-material/History'
import { MiraFrostedToolbar, MiraGradientBox } from '../../components/mira'
import {
  MiraDetailPageLayout,
  MiraVariantSection,
  MiraPropsTable,
  MiraCodeBlock,
} from '../../components/mira/layout'

function MiraFrostedToolbarDetailPage() {
  return (
    <MiraDetailPageLayout
      title="MiraFrostedToolbar"
      description="Glassmorphism sticky toolbar with backdrop blur effect. Creates a frosted glass appearance that lets content show through."
    >
      <MiraVariantSection title="With Gradient Background">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          The frosted effect is most visible when content scrolls behind it on a gradient background.
        </Typography>
        <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, overflow: 'hidden', height: 300 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <MiraFrostedToolbar sticky={false}>
              <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Mira Studio</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button size="small" startIcon={<MenuBookOutlinedIcon />} sx={{ textTransform: 'none' }}>
                    Library
                  </Button>
                  <Button size="small" startIcon={<HistoryIcon />} sx={{ textTransform: 'none' }}>
                    History
                  </Button>
                </Box>
              </Box>
            </MiraFrostedToolbar>
            <MiraGradientBox variant="full" opacity={0.5} sx={{ flex: 1, overflow: 'auto' }}>
              <Box sx={{ p: 3 }}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Typography key={i} sx={{ mb: 2 }}>
                    Content line {i} - scroll to see the frosted effect
                  </Typography>
                ))}
              </Box>
            </MiraGradientBox>
          </Box>
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Position Variants">
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>position="top" (default)</Typography>
            <Box sx={{ width: 250, height: 150, border: '1px solid', borderColor: 'divider', borderRadius: 1, overflow: 'hidden', position: 'relative' }}>
              <MiraFrostedToolbar position="top" sticky={false}>
                <Box sx={{ px: 2, py: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>Top Toolbar</Typography>
                </Box>
              </MiraFrostedToolbar>
              <Box sx={{ p: 2, bgcolor: 'grey.100', height: '100%' }}>
                <Typography variant="caption" color="text.secondary">Content area</Typography>
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>position="bottom"</Typography>
            <Box sx={{ width: 250, height: 150, border: '1px solid', borderColor: 'divider', borderRadius: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ p: 2, bgcolor: 'grey.100', flex: 1 }}>
                <Typography variant="caption" color="text.secondary">Content area</Typography>
              </Box>
              <MiraFrostedToolbar position="bottom" sticky={false}>
                <Box sx={{ px: 2, py: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>Bottom Toolbar</Typography>
                </Box>
              </MiraFrostedToolbar>
            </Box>
          </Box>
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Non-Sticky">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Set sticky=false for inline usage without position: sticky.
        </Typography>
        <Box sx={{ width: 300, border: '1px solid', borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
          <MiraFrostedToolbar sticky={false}>
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Non-Sticky Toolbar</Typography>
            </Box>
          </MiraFrostedToolbar>
          <Box sx={{ p: 2, bgcolor: 'grey.50' }}>
            <Typography variant="body2" color="text.secondary">This toolbar scrolls with content</Typography>
          </Box>
        </Box>
      </MiraVariantSection>

      <MiraPropsTable
        props={[
          { name: 'position', type: "'top' | 'bottom'", description: "Toolbar position for sticky behavior. Default: 'top'" },
          { name: 'sticky', type: 'boolean', description: 'Whether toolbar is sticky. Default: true' },
          { name: 'children', type: 'ReactNode', description: 'Toolbar content' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <MiraVariantSection title="Usage Example">
        <MiraCodeBlock
          code={`<Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
  <MiraFrostedToolbar>
    <Box sx={{ px: 2, py: 1.5, display: 'flex', gap: 2 }}>
      <Typography variant="subtitle2">Mira Studio</Typography>
      <Button startIcon={<MenuBookOutlinedIcon />}>Library</Button>
    </Box>
  </MiraFrostedToolbar>

  <MiraGradientBox variant="full" sx={{ flex: 1, overflow: 'auto' }}>
    {/* Content */}
  </MiraGradientBox>
</Box>`}
        />
      </MiraVariantSection>
    </MiraDetailPageLayout>
  )
}

export default MiraFrostedToolbarDetailPage

import { Box, Typography } from '@mui/material'
import { MiraGradientBox } from '../../components/mira'
import {
  MiraDetailPageLayout,
  MiraVariantSection,
  MiraPropsTable,
  MiraCodeBlock,
} from '../../components/mira/layout'

function MiraGradientBoxDetailPage() {
  return (
    <MiraDetailPageLayout
      title="MiraGradientBox"
      description="Foundation wrapper that applies the signature Mira pink-cyan gradient background. Use as a container to establish the AI-powered visual identity."
    >
      <MiraVariantSection title="Variants">
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>full (default)</Typography>
            <MiraGradientBox variant="full" opacity={0.5} sx={{ width: 200, height: 120, borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ p: 2 }}>
                <Typography variant="body2">Full gradient with pseudo-element</Typography>
              </Box>
            </MiraGradientBox>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>subtle</Typography>
            <MiraGradientBox variant="subtle" sx={{ width: 200, height: 120, borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ p: 2 }}>
                <Typography variant="body2">Subtle background tint</Typography>
              </Box>
            </MiraGradientBox>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>insight</Typography>
            <MiraGradientBox variant="insight" sx={{ width: 200, height: 120, borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ p: 2 }}>
                <Typography variant="body2">Stronger tint for AI insights</Typography>
              </Box>
            </MiraGradientBox>
          </Box>
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Opacity Levels (full variant)">
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          {[0.3, 0.5, 0.7, 1].map((opacity) => (
            <Box key={opacity}>
              <Typography variant="caption" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>opacity={opacity}</Typography>
              <MiraGradientBox variant="full" opacity={opacity} sx={{ width: 150, height: 100, borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ p: 2 }}>
                  <Typography variant="caption">{opacity * 100}%</Typography>
                </Box>
              </MiraGradientBox>
            </Box>
          ))}
        </Box>
      </MiraVariantSection>

      <MiraPropsTable
        props={[
          { name: 'variant', type: "'full' | 'subtle' | 'insight'", description: "Gradient intensity. 'full' uses ::before pseudo-element, others use direct background." },
          { name: 'opacity', type: 'number (0-1)', description: "Gradient opacity for 'full' variant. Default: 0.5" },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
          { name: 'children', type: 'ReactNode', description: 'Content to render inside the gradient box' },
        ]}
      />

      <MiraVariantSection title="Usage Example">
        <MiraCodeBlock
          code={`<MiraGradientBox variant="full" opacity={0.5} sx={{ flex: 1 }}>
  <Box sx={{ p: 4 }}>
    <Typography>Your content here</Typography>
  </Box>
</MiraGradientBox>`}
        />
      </MiraVariantSection>
    </MiraDetailPageLayout>
  )
}

export default MiraGradientBoxDetailPage

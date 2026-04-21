import { Box, Typography } from '@mui/material'
import { MiraThinkingState } from '../../components/mira'
import {
  MiraDetailPageLayout,
  MiraVariantSection,
  MiraPropsTable,
  MiraCodeBlock,
} from '../../components/mira/layout'

function MiraThinkingStateDetailPage() {
  return (
    <MiraDetailPageLayout
      title="MiraThinkingState"
      description="AI processing indicator with animated bouncing dots. Shows that Mira is working on a response."
    >
      <MiraVariantSection title="Variants">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>inline (default)</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2">Processing</Typography>
              <MiraThinkingState />
            </Box>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>standalone</Typography>
            <MiraThinkingState variant="standalone" />
          </Box>
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="With Labels">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>Inline with label</Typography>
            <MiraThinkingState label="Analyzing" />
          </Box>
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>Standalone with label</Typography>
            <MiraThinkingState label="Searching sources" variant="standalone" />
          </Box>
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Common Use Cases">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>In a title</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
              Analyzing your query
              <MiraThinkingState sx={{ ml: 1 }} />
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>In a status message</Typography>
            <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="text.secondary">Reading knowledge base</Typography>
              <MiraThinkingState />
            </Box>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>Standalone loading state</Typography>
            <MiraThinkingState label="Generating response..." variant="standalone" />
          </Box>
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Animation Details">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          The dots use a staggered bounce animation:
        </Typography>
        <Box component="ul" sx={{ pl: 2, mb: 2 }}>
          <li><Typography variant="body2">3 dots, each 4px diameter</Typography></li>
          <li><Typography variant="body2">1.4s animation cycle</Typography></li>
          <li><Typography variant="body2">Staggered delays: -0.32s, -0.16s, 0s</Typography></li>
          <li><Typography variant="body2">Scale from 0 to 1 at 40% of cycle</Typography></li>
        </Box>
        <Box sx={{ p: 3, bgcolor: 'grey.900', borderRadius: 1, display: 'flex', justifyContent: 'center' }}>
          <MiraThinkingState />
        </Box>
      </MiraVariantSection>

      <MiraPropsTable
        props={[
          { name: 'label', type: 'string', description: 'Optional label text displayed before dots' },
          { name: 'variant', type: "'inline' | 'standalone'", description: "Display variant. 'standalone' adds background container. Default: 'inline'" },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <MiraVariantSection title="Usage Example">
        <MiraCodeBlock
          code={`// Inline in a title
<Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
  Processing
  <MiraThinkingState sx={{ ml: 1 }} />
</Typography>

// Standalone loading state
{isLoading && (
  <MiraThinkingState
    label="Analyzing..."
    variant="standalone"
  />
)}

// With custom label
<MiraThinkingState label="Reading sources" />`}
        />
      </MiraVariantSection>
    </MiraDetailPageLayout>
  )
}

export default MiraThinkingStateDetailPage

import { useState } from 'react'
import { Box, Typography, Alert } from '@mui/material'
import { MiraChip } from '../../components/mira'
import {
  MiraDetailPageLayout,
  MiraVariantSection,
  MiraPropsTable,
  MiraCodeBlock,
} from '../../components/mira/layout'

function MiraChipDetailPage() {
  const [clicked, setClicked] = useState('')

  return (
    <MiraDetailPageLayout
      title="MiraChip"
      description="Text-only chip with gradient border and gradient text for Mira AI branding. Ideal for labels, tags, and badges. For icon+text combinations, use MiraButton instead."
    >
      {clicked && (
        <Alert severity="info" sx={{ mb: 3 }} onClose={() => setClicked('')}>
          Chip clicked: {clicked}
        </Alert>
      )}

      <MiraVariantSection title="Basic Usage">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Simple text-only chips. White background with gradient border and gradient text.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <MiraChip label="Mira Companion" />
          <MiraChip label="AI Powered" />
          <MiraChip label="Beta" />
          <MiraChip label="New" />
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Sizes">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Two size options for different contexts.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <MiraChip label="Small" size="small" />
          <MiraChip label="Medium (Default)" size="medium" />
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Clickable">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          When onClick is provided, chips become interactive with hover effects.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <MiraChip
            label="Click Me"
            onClick={() => setClicked('Click Me')}
          />
          <MiraChip
            label="Learn More"
            onClick={() => setClicked('Learn More')}
          />
          <MiraChip
            label="Small Clickable"
            size="small"
            onClick={() => setClicked('Small Clickable')}
          />
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Use Cases">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Common applications for MiraChip in the design system.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Feature Badge in Page Header
            </Typography>
            <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Studio
              </Typography>
              <MiraChip label="Mira Companion" size="small" />
            </Box>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Beta/New Feature Indicator
            </Typography>
            <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 1, display: 'flex', gap: 2 }}>
              <MiraChip label="New" size="small" />
              <MiraChip label="Beta" size="small" />
              <MiraChip label="Preview" size="small" />
            </Box>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              AI-Powered Content Label
            </Typography>
            <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    This summary was generated automatically from your media coverage data.
                  </Typography>
                </Box>
                <MiraChip label="AI Generated" size="small" />
              </Box>
            </Box>
          </Box>
        </Box>
      </MiraVariantSection>

      <MiraPropsTable
        props={[
          { name: 'label', type: 'string', description: 'Required. The chip text label.' },
          { name: 'size', type: '"small" | "medium"', description: 'Chip size. Default: "medium"' },
          { name: 'onClick', type: '() => void', description: 'Click handler (optional). Makes chip interactive with hover effect.' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <MiraVariantSection title="Usage Example">
        <MiraCodeBlock
          code={`import { MiraChip } from '../components/mira'

// Basic chip
<MiraChip label="AI Powered" />

// Small size
<MiraChip label="Beta" size="small" />

// Clickable
<MiraChip
  label="Learn More"
  onClick={() => console.log('clicked')}
/>

// Note: For icon+text combinations, use MiraButton instead
import { MiraButton } from '../components/mira'
<MiraButton variant="outlined" startIcon={<AutoAwesomeIcon />}>
  Mira Companion
</MiraButton>`}
        />
      </MiraVariantSection>
    </MiraDetailPageLayout>
  )
}

export default MiraChipDetailPage

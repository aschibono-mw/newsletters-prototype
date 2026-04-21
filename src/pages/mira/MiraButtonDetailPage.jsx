import { useState } from 'react'
import { Box, Typography, Alert } from '@mui/material'
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined'
import AddIcon from '@mui/icons-material/Add'
import SendIcon from '@mui/icons-material/Send'
import { MiraButton } from '../../components/mira'
import {
  MiraDetailPageLayout,
  MiraVariantSection,
  MiraPropsTable,
  MiraCodeBlock,
} from '../../components/mira/layout'

function MiraButtonDetailPage() {
  const [loading, setLoading] = useState(false)
  const [clicked, setClicked] = useState('')

  const handleLoadingDemo = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <MiraDetailPageLayout
      title="MiraButton"
      description="Gradient button component for Mira AI features. Use sparingly for AI-specific CTAs. For standard actions, use the regular MUI Button."
    >
      {clicked && (
        <Alert severity="info" sx={{ mb: 3 }} onClose={() => setClicked('')}>
          Button clicked: {clicked}
        </Alert>
      )}

      <MiraVariantSection title="Gradient Variant (Default)">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Pale gradient background with gradient text. Primary CTA for Mira features.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <MiraButton variant="gradient" onClick={() => setClicked('Gradient')}>
            Try Now
          </MiraButton>
          <MiraButton variant="gradient" startIcon={<RocketLaunchOutlinedIcon />} onClick={() => setClicked('Gradient with icon')}>
            Get Started
          </MiraButton>
          <MiraButton variant="gradient" endIcon={<SendIcon />} onClick={() => setClicked('Gradient with end icon')}>
            Send
          </MiraButton>
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Outlined Variant">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          White background with gradient border and gradient text. Secondary action.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <MiraButton variant="outlined" onClick={() => setClicked('Outlined')}>
            Learn More
          </MiraButton>
          <MiraButton variant="outlined" startIcon={<AddIcon />} onClick={() => setClicked('Outlined with icon')}>
            Add New
          </MiraButton>
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Sizes">
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <MiraButton variant="gradient" size="small">
            Small
          </MiraButton>
          <MiraButton variant="gradient" size="medium">
            Medium
          </MiraButton>
          <MiraButton variant="gradient" size="large">
            Large
          </MiraButton>
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Loading State">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Shows a gradient spinner when loading. Button is disabled during loading state.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <MiraButton variant="gradient" loading={loading} onClick={handleLoadingDemo}>
            {loading ? 'Processing...' : 'Click to Load'}
          </MiraButton>
          <MiraButton variant="outlined" loading>
            Loading...
          </MiraButton>
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Disabled State">
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <MiraButton variant="gradient" disabled>
            Disabled
          </MiraButton>
          <MiraButton variant="outlined" disabled>
            Disabled
          </MiraButton>
        </Box>
      </MiraVariantSection>

      <MiraPropsTable
        props={[
          { name: 'variant', type: '"gradient" | "outlined"', description: 'Button style variant. Default: "gradient"' },
          { name: 'size', type: '"small" | "medium" | "large"', description: 'Button size. Default: "medium"' },
          { name: 'loading', type: 'boolean', description: 'Show loading spinner (disables button)' },
          { name: 'disabled', type: 'boolean', description: 'Disable the button' },
          { name: 'startIcon', type: 'ReactNode', description: 'Icon displayed before the label' },
          { name: 'endIcon', type: 'ReactNode', description: 'Icon displayed after the label' },
          { name: 'onClick', type: '() => void', description: 'Click handler' },
          { name: 'children', type: 'ReactNode', description: 'Button label' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <MiraVariantSection title="Usage Example">
        <MiraCodeBlock
          code={`import { MiraButton } from '../components/mira'

// Gradient button (primary CTA)
<MiraButton variant="gradient" onClick={handleAction}>
  Try Now
</MiraButton>

// Outlined with gradient border (secondary action)
<MiraButton variant="outlined" startIcon={<AddIcon />}>
  Learn More
</MiraButton>

// Loading state
<MiraButton variant="gradient" loading={isLoading}>
  {isLoading ? 'Processing...' : 'Submit'}
</MiraButton>

// Note: For standard (non-AI) actions, use the regular MUI Button
import { Button } from '@mui/material'
<Button variant="contained" color="primary">Continue</Button>`}
        />
      </MiraVariantSection>
    </MiraDetailPageLayout>
  )
}

export default MiraButtonDetailPage

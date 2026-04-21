import { Box, Typography, Avatar } from '@mui/material'
import { MiraAvatar } from '../../components/mira'
import {
  MiraDetailPageLayout,
  MiraVariantSection,
  MiraPropsTable,
  MiraCodeBlock,
} from '../../components/mira/layout'

function MiraAvatarDetailPage() {
  return (
    <MiraDetailPageLayout
      title="MiraAvatar"
      description="AI assistant avatar with gradient ring/border accent. Circular avatar with pink-to-cyan gradient border for Mira AI branding. Shows Mira sparkle icon as default, or custom image when src is provided."
    >
      <MiraVariantSection title="Sizes">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Three size options for different contexts: small (32px), medium (40px), and large (56px).
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <MiraAvatar size="small" />
            <Typography variant="caption" color="text.secondary">Small</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <MiraAvatar size="medium" />
            <Typography variant="caption" color="text.secondary">Medium</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <MiraAvatar size="large" />
            <Typography variant="caption" color="text.secondary">Large</Typography>
          </Box>
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Variants">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Gradient border (default) for primary branding, or solid border for simpler contexts.
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <MiraAvatar variant="gradient" size="large" />
            <Typography variant="caption" color="text.secondary">Gradient</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <MiraAvatar variant="solid" size="large" />
            <Typography variant="caption" color="text.secondary">Solid</Typography>
          </Box>
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="With Image">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          When src is provided, displays the custom image inside the gradient ring.
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'center' }}>
          <MiraAvatar
            size="small"
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
            alt="User avatar"
          />
          <MiraAvatar
            size="medium"
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
            alt="User avatar"
          />
          <MiraAvatar
            size="large"
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
            alt="User avatar"
          />
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Use Cases">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Common applications for MiraAvatar in the design system.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Chat Message Header
            </Typography>
            <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 1, display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <MiraAvatar size="medium" />
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Mira
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  I can help you analyze your data and generate insights...
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Inline with Text
            </Typography>
            <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <MiraAvatar size="small" />
              <Typography variant="body2">
                Powered by Mira AI
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Side-by-Side Comparison (Default vs User)
            </Typography>
            <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 1, display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <MiraAvatar size="medium" />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>AI Assistant</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar sx={{ width: 40, height: 40, bgcolor: 'grey.400' }}>JD</Avatar>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>Jane Doe</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </MiraVariantSection>

      <MiraPropsTable
        props={[
          { name: 'size', type: '"small" | "medium" | "large"', description: 'Avatar size. Default: "medium". Sizes: 32px, 40px, 56px' },
          { name: 'variant', type: '"gradient" | "solid"', description: 'Border style. Default: "gradient". Gradient uses pink-to-cyan, solid uses primary color.' },
          { name: 'src', type: 'string', description: 'Image source (optional). If not provided, shows Mira sparkle icon.' },
          { name: 'alt', type: 'string', description: 'Alt text for accessibility. Default: "Mira AI"' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <MiraVariantSection title="Usage Example">
        <MiraCodeBlock
          code={`import { MiraAvatar } from '../components/mira'

// Default avatar with icon
<MiraAvatar />

// Large size with gradient border
<MiraAvatar size="large" variant="gradient" />

// With custom image
<MiraAvatar
  size="medium"
  src="/path/to/avatar.jpg"
  alt="User profile"
/>

// Solid variant (simpler look)
<MiraAvatar variant="solid" size="small" />`}
        />
      </MiraVariantSection>
    </MiraDetailPageLayout>
  )
}

export default MiraAvatarDetailPage

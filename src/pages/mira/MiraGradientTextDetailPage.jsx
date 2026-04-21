import { Box, Typography } from '@mui/material'
import { MiraGradientText } from '../../components/mira'
import {
  MiraDetailPageLayout,
  MiraVariantSection,
  MiraPropsTable,
  MiraCodeBlock,
} from '../../components/mira/layout'

function MiraGradientTextDetailPage() {
  return (
    <MiraDetailPageLayout
      title="MiraGradientText"
      description="Typography wrapper that applies the Mira brand gradient (purple to slate teal) to text. Inherits all MUI Typography props."
    >
      <MiraVariantSection title="Typography Variants">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <MiraGradientText variant="h3" sx={{ fontWeight: 700 }}>
            Heading 3
          </MiraGradientText>
          <MiraGradientText variant="h4" sx={{ fontWeight: 600 }}>
            Heading 4
          </MiraGradientText>
          <MiraGradientText variant="h5" sx={{ fontWeight: 600 }}>
            Heading 5
          </MiraGradientText>
          <MiraGradientText variant="h6" sx={{ fontWeight: 600 }}>
            Heading 6
          </MiraGradientText>
          <MiraGradientText variant="subtitle1" sx={{ fontWeight: 600 }}>
            Subtitle 1 - Brand Monitoring
          </MiraGradientText>
          <MiraGradientText variant="subtitle2" sx={{ fontWeight: 600 }}>
            Subtitle 2 - Analysis & Reporting
          </MiraGradientText>
          <MiraGradientText variant="body1">
            Body 1 - Regular paragraph text with gradient
          </MiraGradientText>
          <MiraGradientText variant="body2">
            Body 2 - Smaller paragraph text with gradient
          </MiraGradientText>
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Use Cases">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Common applications for gradient text in the Mira design system.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Accordion Headers (PromptLibraryPage)
            </Typography>
            <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1 }}>
              <MiraGradientText variant="subtitle1" sx={{ fontWeight: 600 }}>
                Brand Monitoring
              </MiraGradientText>
            </Box>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Section Titles
            </Typography>
            <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1 }}>
              <MiraGradientText variant="h6" sx={{ fontWeight: 600 }}>
                Competitive Intelligence
              </MiraGradientText>
            </Box>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Feature Labels
            </Typography>
            <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1, display: 'inline-block' }}>
              <MiraGradientText variant="body2" sx={{ fontWeight: 600 }}>
                Powered by Mira AI
              </MiraGradientText>
            </Box>
          </Box>
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="With Custom Styles">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Additional sx styles can be applied while preserving the gradient.
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <MiraGradientText variant="h5" sx={{ fontWeight: 800, letterSpacing: 2 }}>
            EXTRA BOLD
          </MiraGradientText>
          <MiraGradientText variant="h5" sx={{ fontStyle: 'italic' }}>
            Italic Style
          </MiraGradientText>
          <MiraGradientText variant="h5" sx={{ textDecoration: 'underline' }}>
            Underlined
          </MiraGradientText>
        </Box>
      </MiraVariantSection>

      <MiraPropsTable
        props={[
          { name: 'variant', type: 'string', description: 'Typography variant (h1-h6, subtitle1, subtitle2, body1, body2, etc.)' },
          { name: 'component', type: 'string', description: 'HTML element to render as (div, span, p, etc.)' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles (merged with gradient styles)' },
          { name: 'children', type: 'ReactNode', description: 'Text content to display' },
          { name: '...rest', type: 'any', description: 'All other MUI Typography props are passed through' },
        ]}
      />

      <MiraVariantSection title="Usage Example">
        <MiraCodeBlock
          code={`import { MiraGradientText } from '../components/mira'

// Basic usage
<MiraGradientText variant="h6">
  Brand Monitoring
</MiraGradientText>

// With custom styles
<MiraGradientText variant="subtitle1" sx={{ fontWeight: 600 }}>
  Analysis & Reporting
</MiraGradientText>

// In an Accordion header
<AccordionSummary expandIcon={<ExpandMoreIcon />}>
  <MiraGradientText variant="subtitle1" sx={{ fontWeight: 600 }}>
    {category.name}
  </MiraGradientText>
</AccordionSummary>`}
        />
      </MiraVariantSection>
    </MiraDetailPageLayout>
  )
}

export default MiraGradientTextDetailPage

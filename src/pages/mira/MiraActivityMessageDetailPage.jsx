import { Box, Typography } from '@mui/material'
import { MiraActivityMessage } from '../../components/mira'
import {
  MiraDetailPageLayout,
  MiraVariantSection,
  MiraPropsTable,
  MiraCodeBlock,
} from '../../components/mira/layout'

function MiraActivityMessageDetailPage() {
  return (
    <MiraDetailPageLayout
      title="MiraActivityMessage"
      description="Individual activity step with icon, text, and optional source badge. Used to show AI processing steps."
    >
      <MiraVariantSection title="Activity Types">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, bgcolor: 'grey.50', p: 2, borderRadius: 1 }}>
          <MiraActivityMessage type="thinking" text="Understanding your query..." isLatest />
          <MiraActivityMessage type="reading" text="Reading knowledge base" source="internal-docs" />
          <MiraActivityMessage type="searching" text="Searching project context" />
          <MiraActivityMessage type="analyzing" text="Analyzing the data" />
          <MiraActivityMessage type="generating" text="Generating response" />
          <MiraActivityMessage type="canvas" text="Creating document..." />
          <MiraActivityMessage type="insight" text="Found relevant information" />
          <MiraActivityMessage type="complete" text="Analysis complete" />
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Latest vs Previous">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          The isLatest prop highlights the most recent activity step:
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, bgcolor: 'grey.50', p: 2, borderRadius: 1 }}>
          <MiraActivityMessage type="thinking" text="Understanding query" isLatest={false} />
          <MiraActivityMessage type="reading" text="Reading sources" source="docs" isLatest={false} />
          <MiraActivityMessage type="insight" text="Found relevant data" isLatest />
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="With Source Badge">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Add a source chip to show which resource is being consulted:
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, bgcolor: 'grey.50', p: 2, borderRadius: 1 }}>
          <MiraActivityMessage type="reading" text="Searching project context" source="internal-docs" isLatest />
          <MiraActivityMessage type="reading" text="Reading knowledge base" source="knowledge-base" />
          <MiraActivityMessage type="reading" text="Checking API documentation" source="api-docs" />
        </Box>
      </MiraVariantSection>

      <MiraPropsTable
        props={[
          { name: 'type', type: 'string', description: "Activity type: 'thinking' | 'reading' | 'searching' | 'analyzing' | 'generating' | 'canvas' | 'insight' | 'complete'" },
          { name: 'text', type: 'string', description: 'Activity description text' },
          { name: 'source', type: 'string', description: 'Optional source identifier (shows as chip)' },
          { name: 'isLatest', type: 'boolean', description: 'Whether this is the most recent activity (highlighted). Default: false' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <MiraVariantSection title="Usage Example">
        <MiraCodeBlock
          code={`// Basic activity message
<MiraActivityMessage
  type="reading"
  text="Searching project context"
  isLatest
/>

// With source badge
<MiraActivityMessage
  type="reading"
  text="Reading knowledge base"
  source="internal-docs"
  isLatest
/>

// In a list of activities
{activities.map((item, index) => (
  <MiraActivityMessage
    key={index}
    type={item.type}
    text={item.text}
    source={item.source}
    isLatest={index === activities.length - 1}
  />
))}`}
        />
      </MiraVariantSection>
    </MiraDetailPageLayout>
  )
}

export default MiraActivityMessageDetailPage

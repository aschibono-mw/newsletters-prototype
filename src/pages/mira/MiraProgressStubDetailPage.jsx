import { useState } from 'react'
import { Box, Typography, Button, Stack } from '@mui/material'
import { MiraProgressStub } from '../../components/mira'
import {
  MiraDetailPageLayout,
  MiraVariantSection,
  MiraPropsTable,
  MiraCodeBlock,
} from '../../components/mira/layout'

const SAMPLE_ACTIVITIES = [
  { type: 'thinking', text: 'Understanding your query...' },
  { type: 'reading', text: 'Searching project context', source: 'internal-docs' },
  { type: 'insight', text: 'Found relevant project data' },
  { type: 'reading', text: 'Reading knowledge base', source: 'knowledge-base' },
  { type: 'thinking', text: 'Analyzing the available information...' },
]

function MiraProgressStubDetailPage() {
  const [demoState, setDemoState] = useState('processing')

  return (
    <MiraDetailPageLayout
      title="MiraProgressStub"
      description="Processing indicator with progress bar, activity log, and source count. Shows AI processing status with expandable activity history."
    >
      <MiraVariantSection title="Interactive Demo">
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Button
            variant={demoState === 'processing' ? 'contained' : 'outlined'}
            size="small"
            onClick={() => setDemoState('processing')}
          >
            Processing
          </Button>
          <Button
            variant={demoState === 'complete' ? 'contained' : 'outlined'}
            size="small"
            onClick={() => setDemoState('complete')}
          >
            Complete
          </Button>
        </Stack>
        <Box sx={{ maxWidth: 500 }}>
          <MiraProgressStub
            progress={demoState === 'complete' ? 100 : 65}
            isProcessing={demoState === 'processing'}
            isComplete={demoState === 'complete'}
            statusLabel="Reading knowledge base"
            sourceCount={5}
            activityMessages={SAMPLE_ACTIVITIES}
            onStop={() => setDemoState('complete')}
            onSourcesClick={() => alert('Sources clicked!')}
          />
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="States">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          The component has two main states: processing and complete.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>Processing</Typography>
            <Box sx={{ maxWidth: 500 }}>
              <MiraProgressStub
                progress={45}
                isProcessing
                isComplete={false}
                statusLabel="Searching project context"
                sourceCount={3}
                activityMessages={SAMPLE_ACTIVITIES.slice(0, 3)}
                onStop={() => {}}
              />
            </Box>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>Complete</Typography>
            <Box sx={{ maxWidth: 500 }}>
              <MiraProgressStub
                progress={100}
                isProcessing={false}
                isComplete
                statusLabel="Analysis complete"
                sourceCount={8}
                activityMessages={SAMPLE_ACTIVITIES}
                onSourcesClick={() => {}}
              />
            </Box>
          </Box>
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="With Activity Log Expanded">
        <Box sx={{ maxWidth: 500 }}>
          <MiraProgressStub
            progress={75}
            isProcessing
            isComplete={false}
            statusLabel="Analyzing data"
            sourceCount={6}
            activityMessages={SAMPLE_ACTIVITIES}
            defaultExpanded
            onStop={() => {}}
          />
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Minimal (No Activities)">
        <Box sx={{ maxWidth: 500 }}>
          <MiraProgressStub
            progress={30}
            isProcessing
            isComplete={false}
            statusLabel="Processing..."
            sourceCount={0}
            onStop={() => {}}
          />
        </Box>
      </MiraVariantSection>

      <MiraPropsTable
        props={[
          { name: 'progress', type: 'number', description: 'Progress percentage (0-100). Default: 0' },
          { name: 'isProcessing', type: 'boolean', description: 'Whether actively processing (shows thinking dots). Default: false' },
          { name: 'isComplete', type: 'boolean', description: 'Whether processing is complete. Default: false' },
          { name: 'statusLabel', type: 'string', description: "Current status label. Default: 'Processing...'" },
          { name: 'sourceCount', type: 'number', description: 'Number of sources consulted. Default: 0' },
          { name: 'activityMessages', type: 'array', description: 'Array of activity messages {type, text, source}. Default: []' },
          { name: 'onStop', type: 'function', description: 'Callback when stop button clicked' },
          { name: 'onSourcesClick', type: 'function', description: 'Callback when sources chip clicked (only when complete)' },
          { name: 'defaultExpanded', type: 'boolean', description: 'Whether activity log is expanded by default. Default: false' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <MiraVariantSection title="Usage Example">
        <MiraCodeBlock
          code={`const [activities, setActivities] = useState([])
const [progress, setProgress] = useState(0)
const [isComplete, setIsComplete] = useState(false)

<MiraProgressStub
  progress={progress}
  isProcessing={!isComplete}
  isComplete={isComplete}
  statusLabel="Reading knowledge base"
  sourceCount={5}
  activityMessages={activities}
  onStop={() => setIsComplete(true)}
  onSourcesClick={() => setShowSources(true)}
  defaultExpanded={false}
/>`}
        />
      </MiraVariantSection>
    </MiraDetailPageLayout>
  )
}

export default MiraProgressStubDetailPage

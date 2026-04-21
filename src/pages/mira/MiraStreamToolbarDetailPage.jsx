import { useState } from 'react'
import { Box, Typography, Paper, Alert } from '@mui/material'
import { MiraStreamToolbar, MiraChatInput, MiraChatMessage, MiraThinkingState } from '../../components/mira'
import {
  MiraDetailPageLayout,
  MiraVariantSection,
  MiraCodeBlock,
} from '../../components/mira/layout'

function MiraStreamToolbarDetailPage() {
  const [viewModeA, setViewModeA] = useState('thread')
  const [viewModeB, setViewModeB] = useState('thread')
  const [viewModeDemo, setViewModeDemo] = useState('thread')
  const [action, setAction] = useState('')

  const showAction = (msg) => {
    setAction(msg)
    setTimeout(() => setAction(''), 2000)
  }

  return (
    <MiraDetailPageLayout
      title="MiraStreamToolbar"
      description="Toolbar for active chat/stream view with navigation, view toggle, and creation actions."
    >
      {action && (
        <Alert severity="info" sx={{ mb: 3 }} onClose={() => setAction('')}>
          {action}
        </Alert>
      )}

      <MiraVariantSection title="Variant A - Compact">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Back | Title + Project | Thread/Canvas | Create New. Simpler layout for focused work.
        </Typography>
        <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
          <MiraStreamToolbar
            variant="A"
            streamTitle="Tesla News Update"
            projectName="Q1 Coverage"
            viewMode={viewModeA}
            onViewModeChange={setViewModeA}
            onBack={() => showAction('Back clicked')}
            onPromptLibraryClick={() => showAction('Prompt Library opened')}
            onCreateChat={() => showAction('Create Chat')}
            onCreateProject={() => showAction('Create Project')}
            onCreatePrompt={() => showAction('Create Prompt')}
            onCreateWorkflow={() => showAction('Create Workflow')}
          />
        </Paper>
      </MiraVariantSection>

      <MiraVariantSection title="Variant A - No Project">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          When no project is assigned, shows muted 'No Project' text.
        </Typography>
        <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
          <MiraStreamToolbar
            variant="A"
            streamTitle="Quick Analysis"
            viewMode={viewModeA}
            onViewModeChange={setViewModeA}
            onBack={() => showAction('Back clicked')}
            onPromptLibraryClick={() => showAction('Prompt Library opened')}
            onCreateChat={() => showAction('Create Chat')}
            onCreateProject={() => showAction('Create Project')}
            onCreatePrompt={() => showAction('Create Prompt')}
            onCreateWorkflow={() => showAction('Create Workflow')}
          />
        </Paper>
      </MiraVariantSection>

      <MiraVariantSection title="Variant B - With History">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Back | Title + Project | History icon | Thread/Canvas | Create New. Adds quick access to stream history drawer.
        </Typography>
        <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
          <MiraStreamToolbar
            variant="B"
            streamTitle="Competitor Analysis"
            projectName="Market Research"
            viewMode={viewModeB}
            onViewModeChange={setViewModeB}
            onBack={() => showAction('Back clicked')}
            onPromptLibraryClick={() => showAction('Prompt Library opened')}
            onHistoryClick={() => showAction('History drawer opened')}
            onCreateChat={() => showAction('Create Chat')}
            onCreateProject={() => showAction('Create Project')}
            onCreatePrompt={() => showAction('Create Prompt')}
            onCreateWorkflow={() => showAction('Create Workflow')}
          />
        </Paper>
      </MiraVariantSection>

      <MiraVariantSection title="In-Context Demo">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          How it looks within an active stream with chat messages.
        </Typography>
        <Paper
          variant="outlined"
          sx={{
            overflow: 'hidden',
            height: 500,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <MiraStreamToolbar
            variant="B"
            streamTitle="Brand Sentiment Analysis"
            projectName="Social Listening"
            viewMode={viewModeDemo}
            onViewModeChange={setViewModeDemo}
            onBack={() => showAction('Back clicked')}
            onPromptLibraryClick={() => showAction('Prompt Library opened')}
            onHistoryClick={() => showAction('History drawer opened')}
            onCreateChat={() => showAction('Create Chat')}
            onCreateProject={() => showAction('Create Project')}
            onCreatePrompt={() => showAction('Create Prompt')}
            onCreateWorkflow={() => showAction('Create Workflow')}
          />

          <Box
            sx={{
              flex: 1,
              overflow: 'auto',
              p: 3,
              backgroundColor: 'grey.50',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <MiraChatMessage
              role="user"
              content="Analyze the sentiment around our brand mentions from the past week."
            />
            <MiraChatMessage
              role="assistant"
              content="I'll analyze the sentiment from your brand mentions over the past week. Let me pull the data from your connected social listening feeds."
              isStreaming={false}
            />
            <Box sx={{ pl: 6 }}>
              <MiraThinkingState label="Analyzing 2,847 mentions..." variant="standalone" />
            </Box>
          </Box>

          <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider', backgroundColor: 'background.paper' }}>
            <MiraChatInput
              placeholder="Ask a follow-up question..."
              onSend={() => {}}
            />
          </Box>
        </Paper>
      </MiraVariantSection>

      <MiraVariantSection title="Usage Example">
        <MiraCodeBlock
          code={`import { MiraStreamToolbar } from '../components/mira'

// Variant A - Compact
<MiraStreamToolbar
  variant="A"
  streamTitle="Tesla News Update"
  projectName="Q1 Coverage"
  viewMode={viewMode}
  onViewModeChange={setViewMode}
  onBack={() => navigate('/studio')}
  onPromptLibraryClick={() => setPromptLibraryOpen(true)}
  onCreateChat={handleCreateChat}
  onCreateProject={handleCreateProject}
  onCreatePrompt={handleCreatePrompt}
  onCreateWorkflow={handleCreateWorkflow}
/>

// Variant B - With History
<MiraStreamToolbar
  variant="B"
  streamTitle="Competitor Analysis"
  projectName="Market Research"
  viewMode={viewMode}
  onViewModeChange={setViewMode}
  onBack={() => navigate('/studio')}
  onPromptLibraryClick={() => setPromptLibraryOpen(true)}
  onHistoryClick={() => setHistoryOpen(true)}
  onCreateChat={handleCreateChat}
  onCreateProject={handleCreateProject}
  onCreatePrompt={handleCreatePrompt}
  onCreateWorkflow={handleCreateWorkflow}
/>`}
        />
      </MiraVariantSection>
    </MiraDetailPageLayout>
  )
}

export default MiraStreamToolbarDetailPage

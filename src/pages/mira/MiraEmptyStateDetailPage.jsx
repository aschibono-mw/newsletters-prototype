import { useState } from 'react'
import { Box, Typography, Alert, Card } from '@mui/material'
import { MiraEmptyState } from '../../components/mira'
import {
  MiraDetailPageLayout,
  MiraVariantSection,
  MiraPropsTable,
  MiraCodeBlock,
} from '../../components/mira/layout'

function MiraEmptyStateDetailPage() {
  const [clicked, setClicked] = useState('')

  return (
    <MiraDetailPageLayout
      title="MiraEmptyState"
      description="Empty state placeholder with Mira illustrations. Centered layout with abstract gradient illustration/icon, title, description, and optional CTA button."
    >
      {clicked && (
        <Alert severity="info" sx={{ mb: 3 }} onClose={() => setClicked('')}>
          Action clicked: {clicked}
        </Alert>
      )}

      <MiraVariantSection title="Variants">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Four built-in variants with appropriate icons and default text.
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          <Card variant="outlined" sx={{ p: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              no-results
            </Typography>
            <MiraEmptyState variant="no-results" />
          </Card>
          <Card variant="outlined" sx={{ p: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              no-messages
            </Typography>
            <MiraEmptyState variant="no-messages" />
          </Card>
          <Card variant="outlined" sx={{ p: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              error
            </Typography>
            <MiraEmptyState variant="error" />
          </Card>
          <Card variant="outlined" sx={{ p: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              welcome
            </Typography>
            <MiraEmptyState variant="welcome" />
          </Card>
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Custom Content">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Override default title and description with custom text.
        </Typography>
        <Card variant="outlined" sx={{ p: 2 }}>
          <MiraEmptyState
            variant="no-results"
            title="No prompts found"
            description="Create your first prompt template to get started with AI-powered content generation."
          />
        </Card>
      </MiraVariantSection>

      <MiraVariantSection title="With Action Button">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Add an optional CTA button for user actions.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Card variant="outlined" sx={{ p: 2 }}>
            <MiraEmptyState
              variant="no-messages"
              action={{
                label: 'Start a conversation',
                onClick: () => setClicked('Start a conversation'),
              }}
            />
          </Card>
          <Card variant="outlined" sx={{ p: 2 }}>
            <MiraEmptyState
              variant="error"
              title="Connection lost"
              description="Unable to connect to the AI service. Please check your connection."
              action={{
                label: 'Try again',
                onClick: () => setClicked('Try again'),
              }}
            />
          </Card>
          <Card variant="outlined" sx={{ p: 2 }}>
            <MiraEmptyState
              variant="welcome"
              title="Ready to explore?"
              description="Mira can help you analyze data, generate content, and answer questions."
              action={{
                label: 'See examples',
                onClick: () => setClicked('See examples'),
              }}
            />
          </Card>
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Use Cases">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Common applications for MiraEmptyState in the design system.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Search Results Empty State
            </Typography>
            <Card variant="outlined" sx={{ p: 3 }}>
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Searching for: &quot;machine learning&quot;
                </Typography>
              </Box>
              <MiraEmptyState
                variant="no-results"
                title="No matching results"
                description="We couldn't find any prompts matching your search. Try different keywords or browse all prompts."
                action={{
                  label: 'Clear search',
                  onClick: () => setClicked('Clear search'),
                }}
              />
            </Card>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Chat Welcome State
            </Typography>
            <Card
              variant="outlined"
              sx={{
                p: 3,
                minHeight: 300,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MiraEmptyState
                variant="welcome"
                title="How can I help you today?"
                description="Ask me anything about your data, documents, or projects. I'm here to assist."
              />
            </Card>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Error Recovery
            </Typography>
            <Card variant="outlined" sx={{ p: 3, bgcolor: 'error.50' }}>
              <MiraEmptyState
                variant="error"
                title="Failed to load content"
                description="There was a problem loading this page. This might be a temporary issue."
                action={{
                  label: 'Refresh page',
                  onClick: () => setClicked('Refresh page'),
                }}
              />
            </Card>
          </Box>
        </Box>
      </MiraVariantSection>

      <MiraPropsTable
        props={[
          { name: 'variant', type: '"no-results" | "no-messages" | "error" | "welcome"', description: 'Empty state type. Each has a unique icon and default text. Default: "no-results"' },
          { name: 'title', type: 'string', description: 'Custom heading text. If not provided, uses default for the variant.' },
          { name: 'description', type: 'string', description: 'Custom description text. If not provided, uses default for the variant.' },
          { name: 'action', type: '{ label: string, onClick: () => void }', description: 'Optional action button configuration.' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <MiraVariantSection title="Usage Example">
        <MiraCodeBlock
          code={`import { MiraEmptyState } from '../components/mira'

// Basic usage with defaults
<MiraEmptyState variant="no-results" />

// Custom content
<MiraEmptyState
  variant="no-messages"
  title="No conversations yet"
  description="Start chatting to see your history here."
/>

// With action button
<MiraEmptyState
  variant="error"
  title="Connection failed"
  description="Unable to reach the server."
  action={{
    label: 'Retry',
    onClick: () => handleRetry(),
  }}
/>

// Welcome state
<MiraEmptyState
  variant="welcome"
  title="Ready to get started?"
  description="Ask me anything about your project."
  action={{
    label: 'View examples',
    onClick: () => showExamples(),
  }}
/>`}
        />
      </MiraVariantSection>
    </MiraDetailPageLayout>
  )
}

export default MiraEmptyStateDetailPage

import { useState } from 'react'
import { Box, Typography, Alert } from '@mui/material'
import { MiraFeedbackButtons, MiraAvatar } from '../../components/mira'
import {
  MiraDetailPageLayout,
  MiraVariantSection,
  MiraPropsTable,
  MiraCodeBlock,
} from '../../components/mira/layout'

function MiraFeedbackButtonsDetailPage() {
  const [feedback1, setFeedback1] = useState(null)
  const [feedback2, setFeedback2] = useState(null)
  const [feedback3, setFeedback3] = useState('up')
  const [feedback4, setFeedback4] = useState('down')
  const [lastChange, setLastChange] = useState('')

  const handleChange = (setter, name) => (value) => {
    setter(value)
    setLastChange(`${name} changed to: ${value === null ? 'none' : value}`)
  }

  return (
    <MiraDetailPageLayout
      title="MiraFeedbackButtons"
      description="Simple thumbs up/down icon buttons for rating AI responses. Click to select, click again to deselect. Returns a fragment with two IconButtons."
    >
      {lastChange && (
        <Alert severity="info" sx={{ mb: 3 }} onClose={() => setLastChange('')}>
          {lastChange}
        </Alert>
      )}

      <MiraVariantSection title="Basic Usage">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Click to select thumbs up or down. Click again to deselect. Selected state shows filled icon.
        </Typography>
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <Box sx={{ display: 'flex' }}>
              <MiraFeedbackButtons
                value={feedback1}
                onChange={handleChange(setFeedback1, 'Feedback 1')}
              />
            </Box>
            <Typography variant="caption" color="text.secondary">
              {feedback1 === null ? 'No selection' : `Selected: ${feedback1}`}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <Box sx={{ display: 'flex' }}>
              <MiraFeedbackButtons
                value={feedback2}
                onChange={handleChange(setFeedback2, 'Feedback 2')}
              />
            </Box>
            <Typography variant="caption" color="text.secondary">
              {feedback2 === null ? 'No selection' : `Selected: ${feedback2}`}
            </Typography>
          </Box>
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Pre-selected States">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Buttons can start with a pre-selected value showing a filled icon.
        </Typography>
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <Box sx={{ display: 'flex' }}>
              <MiraFeedbackButtons
                value={feedback3}
                onChange={handleChange(setFeedback3, 'Pre-selected up')}
              />
            </Box>
            <Typography variant="caption" color="text.secondary">Thumbs up selected</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <Box sx={{ display: 'flex' }}>
              <MiraFeedbackButtons
                value={feedback4}
                onChange={handleChange(setFeedback4, 'Pre-selected down')}
              />
            </Box>
            <Typography variant="caption" color="text.secondary">Thumbs down selected</Typography>
          </Box>
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Sizes">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Two size options for different contexts.
        </Typography>
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <Box sx={{ display: 'flex' }}>
              <MiraFeedbackButtons size="small" value="up" onChange={() => {}} />
            </Box>
            <Typography variant="caption" color="text.secondary">Small</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <Box sx={{ display: 'flex' }}>
              <MiraFeedbackButtons size="medium" value="up" onChange={() => {}} />
            </Box>
            <Typography variant="caption" color="text.secondary">Medium</Typography>
          </Box>
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Disabled State">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Disabled buttons appear faded and are not interactive.
        </Typography>
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
          <Box sx={{ display: 'flex' }}>
            <MiraFeedbackButtons value={null} onChange={() => {}} disabled />
          </Box>
          <Box sx={{ display: 'flex' }}>
            <MiraFeedbackButtons value="up" onChange={() => {}} disabled />
          </Box>
          <Box sx={{ display: 'flex' }}>
            <MiraFeedbackButtons value="down" onChange={() => {}} disabled />
          </Box>
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Use Cases">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Common applications for MiraFeedbackButtons in chat interfaces.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Below AI Response Message
            </Typography>
            <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <MiraAvatar size="small" />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ mb: 1.5 }}>
                    Based on the data analysis, I found three key trends: increasing engagement rates,
                    improved conversion metrics, and strong audience growth in the 25-34 demographic.
                  </Typography>
                  <Box sx={{ display: 'flex' }}>
                    <MiraFeedbackButtons value={null} onChange={() => {}} />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Inline with Response Actions
            </Typography>
            <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <MiraAvatar size="small" />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ mb: 1.5 }}>
                    Here is the summary you requested with the main points highlighted...
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display: 'flex' }}>
                      <MiraFeedbackButtons value="up" onChange={() => {}} size="small" />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      Thanks for the feedback
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Card Footer
            </Typography>
            <Box
              sx={{
                bgcolor: 'background.paper',
                p: 2,
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="subtitle2" sx={{ mb: 1 }}>AI-Generated Summary</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                This content was automatically generated based on your source documents.
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="caption" color="text.secondary">
                  Was this helpful?
                </Typography>
                <Box sx={{ display: 'flex' }}>
                  <MiraFeedbackButtons value={null} onChange={() => {}} size="small" />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </MiraVariantSection>

      <MiraPropsTable
        props={[
          { name: 'value', type: '"up" | "down" | null', description: 'Current selection. null = no selection.' },
          { name: 'onChange', type: '(value: "up" | "down" | null) => void', description: 'Required. Callback when selection changes. Returns null when toggling off.' },
          { name: 'size', type: '"small" | "medium"', description: 'Icon size. Default: "small"' },
          { name: 'disabled', type: 'boolean', description: 'Disabled state. Default: false' },
        ]}
      />

      <MiraVariantSection title="Usage Example">
        <MiraCodeBlock
          code={`import { useState } from 'react'
import { MiraFeedbackButtons } from '../components/mira'

function ChatMessage() {
  const [feedback, setFeedback] = useState(null)

  const handleFeedback = (value) => {
    setFeedback(value)
    if (value) {
      api.submitFeedback(messageId, value)
    }
  }

  return (
    <div>
      <p>AI response text...</p>
      {/* Returns two IconButtons (fragment), wrap if needed */}
      <Box sx={{ display: 'flex' }}>
        <MiraFeedbackButtons
          value={feedback}
          onChange={handleFeedback}
        />
      </Box>
    </div>
  )
}`}
        />
      </MiraVariantSection>
    </MiraDetailPageLayout>
  )
}

export default MiraFeedbackButtonsDetailPage

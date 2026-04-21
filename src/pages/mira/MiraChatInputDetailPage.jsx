import { useState } from 'react'
import { Box, Typography, Alert } from '@mui/material'
import { MiraChatInput } from '../../components/mira'
import {
  MiraDetailPageLayout,
  MiraVariantSection,
  MiraPropsTable,
  MiraCodeBlock,
} from '../../components/mira/layout'

function MiraChatInputDetailPage() {
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')
  const [value3, setValue3] = useState('')
  const [lastSent, setLastSent] = useState('')

  const handleSend = (val, setValue) => {
    setLastSent(val)
    setValue('')
  }

  return (
    <MiraDetailPageLayout
      title="MiraChatInput"
      description="Pill-shaped multiline input with send button. Features soft shadow, rounded corners, and Enter-to-send behavior."
    >
      <MiraVariantSection title="Interactive Demo">
        {lastSent && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Sent: "{lastSent}"
          </Alert>
        )}
        <Box sx={{ maxWidth: 500 }}>
          <MiraChatInput
            value={value1}
            onChange={setValue1}
            onSend={() => handleSend(value1, setValue1)}
            placeholder="Ask anything..."
          />
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          Press Enter to send, Shift+Enter for new line
        </Typography>
      </MiraVariantSection>

      <MiraVariantSection title="Custom Placeholder">
        <Box sx={{ maxWidth: 500 }}>
          <MiraChatInput
            value={value2}
            onChange={setValue2}
            onSend={() => handleSend(value2, setValue2)}
            placeholder="Ask a follow-up question..."
          />
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Disabled State">
        <Box sx={{ maxWidth: 500 }}>
          <MiraChatInput
            value="Processing..."
            onChange={() => {}}
            onSend={() => {}}
            disabled
          />
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Max Rows">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Input expands up to maxRows, then scrolls.
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>maxRows=2</Typography>
            <Box sx={{ width: 300 }}>
              <MiraChatInput
                value={value3}
                onChange={setValue3}
                onSend={() => {}}
                maxRows={2}
                placeholder="Limited to 2 rows..."
              />
            </Box>
          </Box>
        </Box>
      </MiraVariantSection>

      <MiraPropsTable
        props={[
          { name: 'value', type: 'string', description: 'Input value (controlled)' },
          { name: 'onChange', type: '(value: string) => void', description: 'Change handler, receives string value' },
          { name: 'onSend', type: '() => void', description: 'Called when user presses Enter or clicks send' },
          { name: 'placeholder', type: 'string', description: "Placeholder text. Default: 'Ask anything...'" },
          { name: 'maxRows', type: 'number', description: 'Maximum rows before scrolling. Default: 4' },
          { name: 'disabled', type: 'boolean', description: 'Disable input and send button' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <MiraVariantSection title="Usage Example">
        <MiraCodeBlock
          code={`const [message, setMessage] = useState('')

<MiraChatInput
  value={message}
  onChange={setMessage}
  onSend={() => {
    handleSendMessage(message)
    setMessage('')
  }}
  placeholder="Ask anything..."
  maxRows={4}
/>`}
        />
      </MiraVariantSection>
    </MiraDetailPageLayout>
  )
}

export default MiraChatInputDetailPage

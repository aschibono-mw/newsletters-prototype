import { Box, Typography, Avatar } from '@mui/material'
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined'
import { MiraChatMessage } from '../../components/mira'
import {
  MiraDetailPageLayout,
  MiraVariantSection,
  MiraPropsTable,
  MiraCodeBlock,
} from '../../components/mira/layout'

function MiraChatMessageDetailPage() {
  return (
    <MiraDetailPageLayout
      title="MiraChatMessage"
      description="Basic chat message bubble with user and assistant variants. Renders avatar, label, and message content."
    >
      <MiraVariantSection title="User Message">
        <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 1 }}>
          <MiraChatMessage role="user">
            <Typography variant="body1">
              Analyze recent usage patterns and identify peak times.
            </Typography>
          </MiraChatMessage>
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Assistant Message">
        <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 1 }}>
          <MiraChatMessage role="assistant">
            <Typography variant="body1" sx={{ mb: 2 }}>
              I've analyzed your usage data and found several interesting patterns:
            </Typography>
            <Box component="ul" sx={{ pl: 2, mb: 0 }}>
              <li><Typography variant="body1">Peak usage occurs between 9-11 AM on weekdays</Typography></li>
              <li><Typography variant="body1">Secondary peak at 2-4 PM</Typography></li>
              <li><Typography variant="body1">Lowest activity on weekends</Typography></li>
            </Box>
          </MiraChatMessage>
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Conversation Thread">
        <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 1 }}>
          <MiraChatMessage role="user">
            <Typography variant="body1">What are the top performing endpoints?</Typography>
          </MiraChatMessage>
          <MiraChatMessage role="assistant">
            <Typography variant="body1">
              Based on the data, the top endpoints by request volume are:
            </Typography>
            <Box component="ol" sx={{ pl: 2, mt: 1 }}>
              <li><Typography variant="body1">/api/v1/users - 234,521 calls</Typography></li>
              <li><Typography variant="body1">/api/v1/analytics - 189,234 calls</Typography></li>
              <li><Typography variant="body1">/api/v1/reports - 156,789 calls</Typography></li>
            </Box>
          </MiraChatMessage>
          <MiraChatMessage role="user" sx={{ mb: 0 }}>
            <Typography variant="body1">Can you show me a breakdown by hour?</Typography>
          </MiraChatMessage>
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Custom Labels">
        <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 1 }}>
          <MiraChatMessage role="user" label="Kevin">
            <Typography variant="body1">How do I configure the API?</Typography>
          </MiraChatMessage>
          <MiraChatMessage role="assistant" label="Mira" sx={{ mb: 0 }}>
            <Typography variant="body1">
              To configure the API, you'll need to set up your authentication credentials first...
            </Typography>
          </MiraChatMessage>
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Custom Avatar">
        <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 1 }}>
          <MiraChatMessage
            role="assistant"
            label="Custom Bot"
            avatar={
              <Avatar sx={{ width: 36, height: 36, bgcolor: 'secondary.main' }}>
                <SmartToyOutlinedIcon sx={{ fontSize: 18 }} />
              </Avatar>
            }
            sx={{ mb: 0 }}
          >
            <Typography variant="body1">
              This message uses a custom avatar and label.
            </Typography>
          </MiraChatMessage>
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Rich Content">
        <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 1 }}>
          <MiraChatMessage role="assistant" sx={{ mb: 0 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Here's a summary table of the data:
            </Typography>
            <Box
              component="table"
              sx={{
                width: '100%',
                borderCollapse: 'collapse',
                '& th, & td': { border: '1px solid', borderColor: 'divider', p: 1, textAlign: 'left' },
                '& th': { bgcolor: 'grey.100', fontWeight: 600 },
              }}
            >
              <thead>
                <tr><th>Metric</th><th>Value</th><th>Change</th></tr>
              </thead>
              <tbody>
                <tr><td>Total Calls</td><td>1.2M</td><td>+23%</td></tr>
                <tr><td>Avg Response</td><td>145ms</td><td>-10%</td></tr>
              </tbody>
            </Box>
          </MiraChatMessage>
        </Box>
      </MiraVariantSection>

      <MiraPropsTable
        props={[
          { name: 'role', type: "'user' | 'assistant'", description: "Message role. Default: 'user'" },
          { name: 'avatar', type: 'ReactNode', description: 'Optional custom avatar element' },
          { name: 'label', type: 'string', description: "Optional custom label. Defaults to 'You' for user, 'AI Assistant' for assistant" },
          { name: 'children', type: 'ReactNode', description: 'Message content' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <MiraVariantSection title="Usage Example">
        <MiraCodeBlock
          code={`// User message
<MiraChatMessage role="user">
  <Typography>What's the weather like?</Typography>
</MiraChatMessage>

// Assistant message
<MiraChatMessage role="assistant">
  <Typography>It's sunny and 72°F today.</Typography>
</MiraChatMessage>

// With custom label
<MiraChatMessage role="user" label="Kevin">
  <Typography>Hello!</Typography>
</MiraChatMessage>

// With custom avatar
<MiraChatMessage
  role="assistant"
  label="Mira"
  avatar={<Avatar src="/mira-avatar.png" />}
>
  <Typography>Hi there!</Typography>
</MiraChatMessage>`}
        />
      </MiraVariantSection>
    </MiraDetailPageLayout>
  )
}

export default MiraChatMessageDetailPage

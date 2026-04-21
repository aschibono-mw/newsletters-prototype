import { useState } from 'react'
import { Box, Typography, Alert } from '@mui/material'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import BarChartIcon from '@mui/icons-material/BarChart'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import { MiraSuggestionChip } from '../../components/mira'
import {
  MiraDetailPageLayout,
  MiraVariantSection,
  MiraPropsTable,
  MiraCodeBlock,
} from '../../components/mira/layout'

function MiraSuggestionChipDetailPage() {
  const [clicked, setClicked] = useState('')

  return (
    <MiraDetailPageLayout
      title="MiraSuggestionChip"
      description="Clickable suggestion pills for prompts. Pill-shaped chip for 'Try asking...' suggestions in chat interfaces with subtle gradient border on hover."
    >
      {clicked && (
        <Alert severity="info" sx={{ mb: 3 }} onClose={() => setClicked('')}>
          Suggestion clicked: {clicked}
        </Alert>
      )}

      <MiraVariantSection title="Basic Usage">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Simple text suggestions with arrow indicator. Hover to see gradient border effect.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <MiraSuggestionChip
            label="Summarize this document"
            onClick={() => setClicked('Summarize this document')}
          />
          <MiraSuggestionChip
            label="What are the key insights?"
            onClick={() => setClicked('What are the key insights?')}
          />
          <MiraSuggestionChip
            label="Create a report"
            onClick={() => setClicked('Create a report')}
          />
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="With Icons">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Optional leading icons help categorize suggestions visually.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <MiraSuggestionChip
            icon={<LightbulbOutlinedIcon />}
            label="Generate ideas"
            onClick={() => setClicked('Generate ideas')}
          />
          <MiraSuggestionChip
            icon={<TrendingUpIcon />}
            label="Analyze trends"
            onClick={() => setClicked('Analyze trends')}
          />
          <MiraSuggestionChip
            icon={<BarChartIcon />}
            label="Create chart"
            onClick={() => setClicked('Create chart')}
          />
          <MiraSuggestionChip
            icon={<AutoAwesomeOutlinedIcon />}
            label="Enhance content"
            onClick={() => setClicked('Enhance content')}
          />
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Disabled State">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Disabled suggestions appear faded and are not interactive.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <MiraSuggestionChip
            label="Currently unavailable"
            onClick={() => {}}
            disabled
          />
          <MiraSuggestionChip
            icon={<AutoAwesomeOutlinedIcon />}
            label="Premium feature"
            onClick={() => {}}
            disabled
          />
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Use Cases">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Common applications for MiraSuggestionChip in chat interfaces.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Chat Welcome State
            </Typography>
            <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 1 }}>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Try asking...
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                <MiraSuggestionChip
                  label="What can you do?"
                  onClick={() => setClicked('What can you do?')}
                />
                <MiraSuggestionChip
                  label="Help me get started"
                  onClick={() => setClicked('Help me get started')}
                />
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Follow-up Suggestions
            </Typography>
            <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Based on your analysis, you might also want to:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                <MiraSuggestionChip
                  icon={<BarChartIcon />}
                  label="Visualize this data"
                  onClick={() => setClicked('Visualize this data')}
                />
                <MiraSuggestionChip
                  icon={<TrendingUpIcon />}
                  label="Compare to last month"
                  onClick={() => setClicked('Compare to last month')}
                />
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Quick Actions Grid
            </Typography>
            <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 1 }}>
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                <MiraSuggestionChip
                  icon={<LightbulbOutlinedIcon />}
                  label="Brainstorm"
                  onClick={() => setClicked('Brainstorm')}
                />
                <MiraSuggestionChip
                  icon={<AutoAwesomeOutlinedIcon />}
                  label="Improve"
                  onClick={() => setClicked('Improve')}
                />
                <MiraSuggestionChip
                  label="Summarize"
                  onClick={() => setClicked('Summarize')}
                />
                <MiraSuggestionChip
                  label="Translate"
                  onClick={() => setClicked('Translate')}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </MiraVariantSection>

      <MiraPropsTable
        props={[
          { name: 'label', type: 'string', description: 'Required. The suggestion text.' },
          { name: 'onClick', type: '() => void', description: 'Required. Click handler.' },
          { name: 'icon', type: 'React.ReactNode', description: 'Optional leading icon.' },
          { name: 'disabled', type: 'boolean', description: 'Disabled state. Default: false' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <MiraVariantSection title="Usage Example">
        <MiraCodeBlock
          code={`import { MiraSuggestionChip } from '../components/mira'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined'

// Basic suggestion
<MiraSuggestionChip
  label="Summarize this document"
  onClick={() => handleSuggestion('summarize')}
/>

// With icon
<MiraSuggestionChip
  icon={<LightbulbOutlinedIcon />}
  label="Generate ideas"
  onClick={() => handleSuggestion('ideas')}
/>

// Disabled
<MiraSuggestionChip
  label="Premium feature"
  onClick={() => {}}
  disabled
/>`}
        />
      </MiraVariantSection>
    </MiraDetailPageLayout>
  )
}

export default MiraSuggestionChipDetailPage

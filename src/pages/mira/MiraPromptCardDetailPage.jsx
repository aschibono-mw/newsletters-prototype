import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined'
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined'
import { MiraPromptCard } from '../../components/mira'
import {
  MiraDetailPageLayout,
  MiraVariantSection,
  MiraPropsTable,
  MiraCodeBlock,
} from '../../components/mira/layout'

function MiraPromptCardDetailPage() {
  const [clicked, setClicked] = useState('')

  return (
    <MiraDetailPageLayout
      title="MiraPromptCard"
      description="Clickable card with icon, title, and description. Used for prompt suggestions on the Studio landing page."
    >
      <MiraVariantSection title="Interactive Demo">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Click a card to see the interaction. Last clicked: <strong>{clicked || 'none'}</strong>
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2, maxWidth: 600 }}>
          <MiraPromptCard
            icon={<SummarizeOutlinedIcon />}
            title="Summarize Document"
            description="Create a concise summary of any document or text"
            onClick={() => setClicked('Summarize Document')}
          />
          <MiraPromptCard
            icon={<BarChartOutlinedIcon />}
            title="Analyze Data"
            description="Get insights and analysis from your data sets"
            onClick={() => setClicked('Analyze Data')}
          />
          <MiraPromptCard
            icon={<CodeOutlinedIcon />}
            title="Explain Code"
            description="Understand code snippets and get explanations"
            onClick={() => setClicked('Explain Code')}
          />
          <MiraPromptCard
            icon={<LightbulbOutlinedIcon />}
            title="Brainstorm Ideas"
            description="Generate creative ideas for projects or problems"
            onClick={() => setClicked('Brainstorm Ideas')}
          />
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Hover States">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Hover over cards to see the border and background change.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box sx={{ width: 280 }}>
            <MiraPromptCard
              icon={<SummarizeOutlinedIcon />}
              title="Default State"
              description="Grey border, white background"
              onClick={() => {}}
            />
          </Box>
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Long Content">
        <Box sx={{ maxWidth: 300 }}>
          <MiraPromptCard
            icon={<LightbulbOutlinedIcon />}
            title="Very Long Title That Might Wrap to Multiple Lines"
            description="This is a very long description that will be truncated after two lines using CSS line-clamp. The overflow will be hidden with an ellipsis."
            onClick={() => {}}
          />
        </Box>
      </MiraVariantSection>

      <MiraPropsTable
        props={[
          { name: 'icon', type: 'ReactNode', description: 'Icon element to display in the grey box (required)' },
          { name: 'title', type: 'string', description: 'Card title text (required)' },
          { name: 'description', type: 'string', description: 'Card description, truncated to 2 lines (required)' },
          { name: 'onClick', type: 'function', description: 'Click handler for the card' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <MiraVariantSection title="Usage Example">
        <MiraCodeBlock
          code={`<MiraPromptCard
  icon={<SummarizeOutlinedIcon />}
  title="Summarize Document"
  description="Create a concise summary of any document"
  onClick={() => handlePromptClick('summarize')}
/>`}
        />
      </MiraVariantSection>
    </MiraDetailPageLayout>
  )
}

export default MiraPromptCardDetailPage

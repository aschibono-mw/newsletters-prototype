import { Box, Typography } from '@mui/material'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined'
import ApiOutlinedIcon from '@mui/icons-material/ApiOutlined'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import { MiraSourcesPanel } from '../../components/mira'
import {
  MiraDetailPageLayout,
  MiraVariantSection,
  MiraPropsTable,
  MiraCodeBlock,
} from '../../components/mira/layout'

const SAMPLE_SOURCES = [
  {
    id: 1,
    title: 'Project Usage Analytics Dashboard',
    type: 'internal-docs',
    icon: ArticleOutlinedIcon,
    snippet: 'The usage analytics dashboard provides real-time metrics including API call volume, response times, and error rates...',
    url: '/docs/analytics-dashboard',
    relevance: 'high',
  },
  {
    id: 2,
    title: 'API Performance Best Practices',
    type: 'knowledge-base',
    icon: SchoolOutlinedIcon,
    snippet: 'Peak usage optimization strategies include implementing caching layers, load balancing, and rate limiting...',
    url: '/kb/api-performance',
    relevance: 'high',
  },
  {
    id: 3,
    title: 'Monthly Usage Reports - Q4 2024',
    type: 'internal-docs',
    icon: StorageOutlinedIcon,
    snippet: 'Q4 showed a 23% increase in API calls compared to Q3, with primary growth in data retrieval endpoints...',
    url: '/reports/q4-2024',
    relevance: 'high',
  },
  {
    id: 4,
    title: 'REST API Documentation v2.1',
    type: 'api-docs',
    icon: ApiOutlinedIcon,
    snippet: 'Endpoint reference for /api/v1/users, /api/v1/analytics, and /api/v1/reports including rate limits...',
    url: '/api/docs/v2.1',
    relevance: 'medium',
  },
  {
    id: 5,
    title: 'Infrastructure Scaling Guidelines',
    type: 'best-practices',
    icon: SchoolOutlinedIcon,
    snippet: 'Auto-scaling policies should be configured to handle 2x baseline traffic during peak hours...',
    url: '/kb/scaling-guidelines',
    relevance: 'medium',
  },
]

function MiraSourcesPanelDetailPage() {
  return (
    <MiraDetailPageLayout
      title="MiraSourcesPanel"
      description="Container for listing source cards with a summary of relevance levels. Used to display all sources consulted for an AI response."
    >
      <MiraVariantSection title="Full Example">
        <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 1 }}>
          <MiraSourcesPanel sources={SAMPLE_SOURCES} />
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="High Relevance Only">
        <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 1 }}>
          <MiraSourcesPanel sources={SAMPLE_SOURCES.filter(s => s.relevance === 'high')} />
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Custom Counts">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Override the auto-calculated counts if needed:
        </Typography>
        <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 1 }}>
          <MiraSourcesPanel
            sources={SAMPLE_SOURCES.slice(0, 2)}
            highCount={5}
            mediumCount={3}
          />
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Empty State">
        <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 1 }}>
          <MiraSourcesPanel sources={[]} />
        </Box>
      </MiraVariantSection>

      <MiraPropsTable
        props={[
          { name: 'sources', type: 'array', description: 'Array of source objects with title, icon, snippet, relevance, url. Default: []' },
          { name: 'highCount', type: 'number', description: 'Override high relevance count (auto-calculated if not provided)' },
          { name: 'mediumCount', type: 'number', description: 'Override medium relevance count (auto-calculated if not provided)' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <MiraVariantSection title="Source Object Shape">
        <MiraCodeBlock
          code={`{
  id: 1,                          // Unique identifier
  title: 'Document Title',        // Source title
  icon: ArticleOutlinedIcon,      // MUI icon component
  snippet: 'Preview text...',     // Content snippet
  url: '/path/to/source',         // Source URL
  relevance: 'high' | 'medium',   // Relevance level
}`}
        />
      </MiraVariantSection>

      <MiraVariantSection title="Usage Example">
        <MiraCodeBlock
          code={`import { MiraSourcesPanel } from '../components/mira'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'

const sources = [
  {
    id: 1,
    title: 'API Documentation',
    icon: ArticleOutlinedIcon,
    snippet: 'The API provides endpoints for...',
    url: '/docs/api',
    relevance: 'high',
  },
  // ... more sources
]

<MiraSourcesPanel sources={sources} />

// Or in a tab panel
{threadTab === 'sources' && (
  <MiraSourcesPanel sources={sources} />
)}`}
        />
      </MiraVariantSection>
    </MiraDetailPageLayout>
  )
}

export default MiraSourcesPanelDetailPage

import { Box, Typography } from '@mui/material'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined'
import ApiOutlinedIcon from '@mui/icons-material/ApiOutlined'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import { MiraSourceCard } from '../../components/mira'
import {
  MiraDetailPageLayout,
  MiraVariantSection,
  MiraPropsTable,
  MiraCodeBlock,
} from '../../components/mira/layout'

function MiraSourceCardDetailPage() {
  return (
    <MiraDetailPageLayout
      title="MiraSourceCard"
      description="AI citation/source display card. Shows sources that Mira consulted to generate a response, with relevance indicators."
    >
      <MiraVariantSection title="Relevance Levels">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
          <MiraSourceCard
            title="Project Usage Analytics Dashboard"
            icon={ArticleOutlinedIcon}
            snippet="The usage analytics dashboard provides real-time metrics including API call volume, response times, and error rates..."
            relevance="high"
            url="/docs/analytics-dashboard"
          />
          <MiraSourceCard
            title="REST API Documentation v2.1"
            icon={ApiOutlinedIcon}
            snippet="Endpoint reference for /api/v1/users, /api/v1/analytics, and /api/v1/reports including rate limits..."
            relevance="medium"
            url="/api/docs/v2.1"
          />
          <MiraSourceCard
            title="Archived Notes"
            icon={StorageOutlinedIcon}
            snippet="Historical data that may be outdated or less relevant to current queries..."
            relevance="low"
            url="/archive/notes"
          />
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Different Source Types">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
          <MiraSourceCard
            title="Internal Documentation"
            icon={ArticleOutlinedIcon}
            snippet="Company policies and procedures for data handling and security compliance..."
            relevance="high"
            url="/docs/internal"
          />
          <MiraSourceCard
            title="Knowledge Base Article"
            icon={SchoolOutlinedIcon}
            snippet="Best practices for API integration including authentication flows and error handling..."
            relevance="high"
            url="/kb/api-best-practices"
          />
          <MiraSourceCard
            title="Database Records"
            icon={StorageOutlinedIcon}
            snippet="Q4 showed a 23% increase in API calls compared to Q3, with primary growth in data retrieval..."
            relevance="medium"
            url="/reports/q4-2024"
          />
          <MiraSourceCard
            title="API Reference"
            icon={ApiOutlinedIcon}
            snippet="Full endpoint documentation with request/response schemas and code examples..."
            relevance="medium"
            url="/api/reference"
          />
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Long Content">
        <Box sx={{ maxWidth: 400 }}>
          <MiraSourceCard
            title="Very Long Document Title That Should Be Displayed In Full"
            icon={ArticleOutlinedIcon}
            snippet="This is a very long snippet that demonstrates how the card handles overflow. The text will be truncated after two lines using CSS line-clamp, ensuring consistent card heights across the interface."
            relevance="high"
            url="/docs/very-long-path/to/document/with/many/segments"
          />
        </Box>
      </MiraVariantSection>

      <MiraPropsTable
        props={[
          { name: 'title', type: 'string', description: 'Source title (required)' },
          { name: 'icon', type: 'ElementType', description: 'Icon component (not element) to display' },
          { name: 'snippet', type: 'string', description: 'Source text preview, truncated to 2 lines' },
          { name: 'relevance', type: "'high' | 'medium' | 'low'", description: "Relevance badge. 'high' shows green, others grey" },
          { name: 'url', type: 'string', description: 'Source URL, displayed as link' },
          { name: 'onClick', type: '() => void', description: 'Optional click handler for the card' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <MiraVariantSection title="Usage Example">
        <MiraCodeBlock
          code={`import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'

<MiraSourceCard
  title="API Documentation"
  icon={ArticleOutlinedIcon}  // Pass component, not <ArticleOutlinedIcon />
  snippet="The authentication flow requires a valid JWT token..."
  relevance="high"
  url="/docs/api"
/>`}
        />
      </MiraVariantSection>
    </MiraDetailPageLayout>
  )
}

export default MiraSourceCardDetailPage

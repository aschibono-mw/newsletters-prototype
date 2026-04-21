import { Box, Typography } from '@mui/material'
import MiraSourceCard from './MiraSourceCard'

/**
 * MiraSourcesPanel - Container for listing source cards with summary
 *
 * @param {Array} sources - Array of source objects with title, icon, snippet, relevance, url
 * @param {number} [highCount] - Override high relevance count (auto-calculated if not provided)
 * @param {number} [mediumCount] - Override medium relevance count (auto-calculated if not provided)
 * @param {object} [sx] - Additional MUI sx styles
 */
function MiraSourcesPanel({ sources = [], highCount, mediumCount, sx }) {
  const calculatedHighCount = highCount ?? sources.filter(s => s.relevance === 'high').length
  const calculatedMediumCount = mediumCount ?? sources.filter(s => s.relevance === 'medium').length

  return (
    <Box sx={sx}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          The following sources were consulted to generate this response:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {calculatedHighCount} high relevance · {calculatedMediumCount} medium relevance
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {sources.map((source) => (
          <MiraSourceCard
            key={source.id || source.title}
            title={source.title}
            icon={source.icon}
            snippet={source.snippet}
            relevance={source.relevance}
            url={source.url}
          />
        ))}
      </Box>
    </Box>
  )
}

export default MiraSourcesPanel

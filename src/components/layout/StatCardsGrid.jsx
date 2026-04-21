import { Box, Paper, Typography, Tooltip, Skeleton } from '@mui/material'

/**
 * StatCardsGrid - Grid of stat cards with consistent styling and loading states
 *
 * @param {Object} props
 * @param {Array} props.stats - Array of stat objects
 * @param {string} props.stats[].id - Unique identifier
 * @param {string} props.stats[].label - Display label
 * @param {string|number} props.stats[].value - Primary value to display
 * @param {string} props.stats[].secondary - Secondary text (optional)
 * @param {string} props.stats[].infotip - Tooltip text (optional)
 * @param {boolean} props.isLoading - Show skeleton loading state
 * @param {number} props.columns - Number of columns (default: 4)
 * @param {Object} props.sx - Additional sx styles
 */
function StatCardsGrid({
  stats = [],
  isLoading = false,
  columns = 4,
  sx = {},
}) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 2,
        mb: 3,
        ...sx,
      }}
    >
      {stats.map((stat) => (
        <Paper
          key={stat.id}
          elevation={1}
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 80,
          }}
        >
          {isLoading ? (
            <>
              <Skeleton variant="text" width={80} height={32} />
              <Skeleton variant="text" width={120} height={20} />
            </>
          ) : (
            <>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {stat.value}
              </Typography>
              {stat.infotip ? (
                <Tooltip title={stat.infotip} arrow placement="bottom">
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      textDecoration: 'underline dotted',
                      textUnderlineOffset: '3px',
                      cursor: 'help',
                    }}
                  >
                    {stat.label}{stat.secondary || ''}
                  </Typography>
                </Tooltip>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  {stat.label}{stat.secondary || ''}
                </Typography>
              )}
            </>
          )}
        </Paper>
      ))}
    </Box>
  )
}

export default StatCardsGrid

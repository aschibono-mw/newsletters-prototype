/**
 * MetricsCard
 *
 * Displays a single metric/stat with label, value, and optional change indicator.
 * Commonly used in dashboard-style template headers.
 *
 * Uses existing DS primitives: Card, CardContent, Typography, Box
 */

import { Card, CardContent, Typography, Box } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUpRounded'
import TrendingDownIcon from '@mui/icons-material/TrendingDownRounded'

/**
 * @param {string} label - Metric label (e.g., "Total Users")
 * @param {string|number} value - Metric value (e.g., "1,234")
 * @param {string} [subtitle] - Additional context (e.g., "+12 this month")
 * @param {string} [color="primary"] - MUI color for value (primary, success, warning, error, info)
 * @param {string} [trend] - "up" | "down" | null - Shows trend icon
 * @param {boolean} [compact=false] - Smaller padding for tight layouts
 * @param {object} [sx] - Additional sx props for the Card
 */
export default function MetricsCard({
  label,
  value,
  subtitle,
  color = 'primary',
  trend,
  compact = false,
  sx = {},
}) {
  return (
    <Card sx={{ height: '100%', ...sx }}>
      <CardContent sx={{ p: compact ? 1.5 : 2 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 0.5 }}
        >
          {label}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <Typography
            variant={compact ? 'h5' : 'h4'}
            sx={{ fontWeight: 700, color: `${color}.main` }}
          >
            {value}
          </Typography>
          {trend && (
            <Box
              component="span"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                color: trend === 'up' ? 'success.main' : 'error.main',
              }}
            >
              {trend === 'up' ? (
                <TrendingUpIcon sx={{ fontSize: 18 }} />
              ) : (
                <TrendingDownIcon sx={{ fontSize: 18 }} />
              )}
            </Box>
          )}
        </Box>
        {subtitle && (
          <Typography variant="caption" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

/**
 * MetricsGrid
 *
 * Helper component to render multiple MetricsCards in a responsive grid.
 */
import { Grid } from '@mui/material'

export function MetricsGrid({ metrics, columns = { xs: 6, sm: 6, md: 3 }, spacing = 2, sx = {} }) {
  return (
    <Grid container spacing={spacing} sx={sx}>
      {metrics.map((metric, index) => (
        <Grid size={columns} key={metric.label || index}>
          <MetricsCard {...metric} />
        </Grid>
      ))}
    </Grid>
  )
}

import { useState, useRef, useMemo } from 'react'
import { Box, useTheme } from '@mui/material'
import ChartLegend from './ChartLegend'
import ChartTooltip from './ChartTooltip'
import { colors as tokenColors } from '../../theme-tokens'

// Sentiment colors from design tokens
const SENTIMENT_COLORS = {
  positive: tokenColors.product.lightGreen.main,
  neutral: tokenColors.grey[500],
  negative: tokenColors.product.pink.main,
}

/**
 * 3-line sentiment chart (positive/neutral/negative)
 * @param {array} data - [{ timestamp, positive, neutral, negative, label }]
 * @param {number} height - Chart height
 * @param {object} xAxis - { label, formatTick }
 * @param {object} yAxis - { label, formatTick }
 * @param {boolean} showLegend - Show legend
 */
function SentimentLineChart({
  data = [],
  height = 280,
  xAxis = {},
  yAxis = {},
  showLegend = true,
}) {
  const theme = useTheme()
  const [tooltip, setTooltip] = useState({ open: false, anchorEl: null, data: null })
  const chartRef = useRef(null)

  // Use the sentiment colors
  const colors = SENTIMENT_COLORS

  // Chart dimensions
  const padding = { top: 20, right: 20, bottom: 40, left: 50 }
  const chartWidth = 600
  const chartHeight = height
  const innerWidth = chartWidth - padding.left - padding.right
  const innerHeight = chartHeight - padding.top - padding.bottom

  // Calculate scales
  const { xScale, yScale, yMax } = useMemo(() => {
    if (data.length === 0) return { xScale: () => 0, yScale: () => 0, yMax: 100 }

    const allValues = data.flatMap((d) => [d.positive, d.neutral, d.negative])
    const maxVal = Math.max(...allValues, 0)
    const yMaxVal = Math.ceil(maxVal / 10) * 10 || 100

    return {
      xScale: (index) => (index / (data.length - 1 || 1)) * innerWidth,
      yScale: (value) => innerHeight - (value / yMaxVal) * innerHeight,
      yMax: yMaxVal,
    }
  }, [data, innerWidth, innerHeight])

  // Generate path for a line
  const generatePath = (key) => {
    if (data.length === 0) return ''
    return data
      .map((d, i) => {
        const x = xScale(i)
        const y = yScale(d[key])
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
      })
      .join(' ')
  }

  // Generate Y-axis ticks
  const yTicks = useMemo(() => {
    const ticks = []
    const step = yMax / 5
    for (let i = 0; i <= 5; i++) {
      ticks.push(Math.round(step * i))
    }
    return ticks
  }, [yMax])

  // Handle hover
  const handleMouseMove = (event) => {
    if (!chartRef.current || data.length === 0) return

    const rect = chartRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left - padding.left
    const index = Math.round((x / innerWidth) * (data.length - 1))

    if (index >= 0 && index < data.length) {
      const point = data[index]
      setTooltip({
        open: true,
        anchorEl: event.currentTarget,
        data: point,
        index,
      })
    }
  }

  const handleMouseLeave = () => {
    setTooltip({ open: false, anchorEl: null, data: null })
  }

  const legendItems = [
    { label: 'Positive', color: colors.positive, shape: 'line' },
    { label: 'Neutral', color: colors.neutral, shape: 'line' },
    { label: 'Negative', color: colors.negative, shape: 'line' },
  ]

  const formatYTick = yAxis.formatTick || ((v) => v)
  const formatXTick = xAxis.formatTick || ((d) => d.label || '')

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        ref={chartRef}
        sx={{
          position: 'relative',
          width: '100%',
          cursor: 'crosshair',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          style={{ width: '100%', height: 'auto' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Y-axis grid lines and labels */}
          {yTicks.map((tick) => (
            <g key={tick}>
              <line
                x1={padding.left}
                y1={padding.top + yScale(tick)}
                x2={padding.left + innerWidth}
                y2={padding.top + yScale(tick)}
                stroke={theme.palette.divider}
                strokeDasharray="4,4"
              />
              <text
                x={padding.left - 10}
                y={padding.top + yScale(tick)}
                textAnchor="end"
                alignmentBaseline="middle"
                fill={theme.palette.text.secondary}
                fontSize={11}
              >
                {formatYTick(tick)}
              </text>
            </g>
          ))}

          {/* Y-axis label */}
          {yAxis.label && (
            <text
              x={12}
              y={chartHeight / 2}
              textAnchor="middle"
              fill={theme.palette.text.secondary}
              fontSize={11}
              transform={`rotate(-90, 12, ${chartHeight / 2})`}
            >
              {yAxis.label}
            </text>
          )}

          {/* X-axis labels */}
          {data.map((d, i) => {
            // Show every nth label to avoid overlap
            const showLabel = data.length <= 7 || i % Math.ceil(data.length / 7) === 0
            if (!showLabel) return null
            return (
              <text
                key={i}
                x={padding.left + xScale(i)}
                y={chartHeight - 10}
                textAnchor="middle"
                fill={theme.palette.text.secondary}
                fontSize={11}
              >
                {formatXTick(d)}
              </text>
            )
          })}

          {/* X-axis label */}
          {xAxis.label && (
            <text
              x={padding.left + innerWidth / 2}
              y={chartHeight - 2}
              textAnchor="middle"
              fill={theme.palette.text.secondary}
              fontSize={11}
            >
              {xAxis.label}
            </text>
          )}

          {/* Lines group with transform */}
          <g transform={`translate(${padding.left}, ${padding.top})`}>
            {/* Positive line */}
            <path
              d={generatePath('positive')}
              fill="none"
              stroke={colors.positive}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Neutral line */}
            <path
              d={generatePath('neutral')}
              fill="none"
              stroke={colors.neutral}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Negative line */}
            <path
              d={generatePath('negative')}
              fill="none"
              stroke={colors.negative}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Hover indicator */}
            {tooltip.open && tooltip.data && (
              <>
                <line
                  x1={xScale(tooltip.index)}
                  y1={0}
                  x2={xScale(tooltip.index)}
                  y2={innerHeight}
                  stroke={theme.palette.divider}
                  strokeWidth={1}
                />
                <circle
                  cx={xScale(tooltip.index)}
                  cy={yScale(tooltip.data.positive)}
                  r={4}
                  fill={colors.positive}
                />
                <circle
                  cx={xScale(tooltip.index)}
                  cy={yScale(tooltip.data.neutral)}
                  r={4}
                  fill={colors.neutral}
                />
                <circle
                  cx={xScale(tooltip.index)}
                  cy={yScale(tooltip.data.negative)}
                  r={4}
                  fill={colors.negative}
                />
              </>
            )}
          </g>
        </svg>
      </Box>

      {/* Tooltip */}
      <ChartTooltip
        open={tooltip.open}
        anchorEl={tooltip.anchorEl}
        title={tooltip.data?.label || ''}
        items={
          tooltip.data
            ? [
                { label: 'Positive', value: tooltip.data.positive, color: colors.positive },
                { label: 'Neutral', value: tooltip.data.neutral, color: colors.neutral },
                { label: 'Negative', value: tooltip.data.negative, color: colors.negative },
              ]
            : []
        }
      />

      {/* Legend */}
      {showLegend && (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <ChartLegend items={legendItems} />
        </Box>
      )}
    </Box>
  )
}

export default SentimentLineChart

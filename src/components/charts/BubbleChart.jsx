import { useState, useRef, useMemo } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import ChartLegend from './ChartLegend'
import ChartTooltip from './ChartTooltip'
import { colors as tokenColors } from '../../theme-tokens'

// Sentiment colors from design tokens
const SENTIMENT_COLORS = {
  positive: tokenColors.product.lightGreen.main,
  neutral: tokenColors.grey[400],
  negative: tokenColors.product.pink.main,
}

/**
 * Bubble chart: x=sales, y=mentions, size=reach
 * @param {array} data - [{ id, label, x, y, size, sentiment, metadata }]
 * @param {number} height - Chart height
 * @param {object} xAxis - { label, min, max }
 * @param {object} yAxis - { label, min, max }
 * @param {object} sizeAxis - { label, min, max }
 */
function BubbleChart({
  data = [],
  height = 320,
  xAxis = { label: 'X Axis' },
  yAxis = { label: 'Y Axis' },
  sizeAxis = { label: 'Size' },
}) {
  const theme = useTheme()
  const [tooltip, setTooltip] = useState({ open: false, anchorEl: null, data: null })
  const [hoveredId, setHoveredId] = useState(null)
  const chartRef = useRef(null)

  // Use the sentiment colors
  const sentimentColors = SENTIMENT_COLORS

  // Chart dimensions
  const padding = { top: 20, right: 30, bottom: 50, left: 60 }
  const chartWidth = 600
  const chartHeight = height
  const innerWidth = chartWidth - padding.left - padding.right
  const innerHeight = chartHeight - padding.top - padding.bottom

  // Calculate scales
  const { xScale, yScale, sizeScale, xTicks, yTicks } = useMemo(() => {
    if (data.length === 0) {
      return {
        xScale: () => 0,
        yScale: () => 0,
        sizeScale: () => 10,
        xTicks: [],
        yTicks: [],
      }
    }

    const xValues = data.map((d) => d.x)
    const yValues = data.map((d) => d.y)
    const sizeValues = data.map((d) => d.size)

    const xMin = xAxis.min ?? Math.min(...xValues) * 0.9
    const xMax = xAxis.max ?? Math.max(...xValues) * 1.1
    const yMin = yAxis.min ?? Math.min(...yValues) * 0.9
    const yMax = yAxis.max ?? Math.max(...yValues) * 1.1
    const sizeMin = sizeAxis?.min ?? Math.min(...sizeValues)
    const sizeMax = sizeAxis?.max ?? Math.max(...sizeValues)

    // Generate ticks
    const generateTicks = (min, max, count = 5) => {
      const step = (max - min) / count
      const ticks = []
      for (let i = 0; i <= count; i++) {
        ticks.push(Math.round((min + step * i) * 10) / 10)
      }
      return ticks
    }

    return {
      xScale: (value) => ((value - xMin) / (xMax - xMin)) * innerWidth,
      yScale: (value) => innerHeight - ((value - yMin) / (yMax - yMin)) * innerHeight,
      sizeScale: (value) => {
        const normalized = (value - sizeMin) / (sizeMax - sizeMin || 1)
        return 8 + normalized * 32 // 8-40px radius range
      },
      xTicks: generateTicks(xMin, xMax, 5),
      yTicks: generateTicks(yMin, yMax, 5),
    }
  }, [data, xAxis, yAxis, sizeAxis, innerWidth, innerHeight])

  const handleBubbleHover = (event, item) => {
    setHoveredId(item.id)
    setTooltip({
      open: true,
      anchorEl: event.currentTarget,
      data: item,
    })
  }

  const handleBubbleLeave = () => {
    setHoveredId(null)
    setTooltip({ open: false, anchorEl: null, data: null })
  }

  const getBubbleColor = (sentiment) => {
    return sentimentColors[sentiment] || sentimentColors.neutral
  }

  const legendItems = [
    { label: 'Positive', color: sentimentColors.positive, shape: 'circle' },
    { label: 'Neutral', color: sentimentColors.neutral, shape: 'circle' },
    { label: 'Negative', color: sentimentColors.negative, shape: 'circle' },
  ]

  return (
    <Box sx={{ width: '100%' }}>
      <Box ref={chartRef} sx={{ position: 'relative', width: '100%' }}>
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          style={{ width: '100%', height: 'auto' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid lines */}
          <g>
            {/* Horizontal grid lines */}
            {yTicks.map((tick, i) => (
              <line
                key={`h-${i}`}
                x1={padding.left}
                y1={padding.top + yScale(tick)}
                x2={padding.left + innerWidth}
                y2={padding.top + yScale(tick)}
                stroke={theme.palette.divider}
                strokeDasharray="4,4"
              />
            ))}
            {/* Vertical grid lines */}
            {xTicks.map((tick, i) => (
              <line
                key={`v-${i}`}
                x1={padding.left + xScale(tick)}
                y1={padding.top}
                x2={padding.left + xScale(tick)}
                y2={padding.top + innerHeight}
                stroke={theme.palette.divider}
                strokeDasharray="4,4"
              />
            ))}
          </g>

          {/* Y-axis labels */}
          {yTicks.map((tick, i) => (
            <text
              key={`y-${i}`}
              x={padding.left - 10}
              y={padding.top + yScale(tick)}
              textAnchor="end"
              alignmentBaseline="middle"
              fill={theme.palette.text.secondary}
              fontSize={9}
            >
              {tick}
            </text>
          ))}

          {/* X-axis labels */}
          {xTicks.map((tick, i) => (
            <text
              key={`x-${i}`}
              x={padding.left + xScale(tick)}
              y={chartHeight - 25}
              textAnchor="middle"
              fill={theme.palette.text.secondary}
              fontSize={9}
            >
              {tick}
            </text>
          ))}

          {/* Y-axis label */}
          <text
            x={16}
            y={chartHeight / 2}
            textAnchor="middle"
            fill={theme.palette.text.secondary}
            fontSize={10}
            fontWeight={500}
            transform={`rotate(-90, 16, ${chartHeight / 2})`}
          >
            {yAxis.label}
          </text>

          {/* X-axis label */}
          <text
            x={padding.left + innerWidth / 2}
            y={chartHeight - 6}
            textAnchor="middle"
            fill={theme.palette.text.secondary}
            fontSize={10}
            fontWeight={500}
          >
            {xAxis.label}
          </text>

          {/* Bubbles */}
          <g transform={`translate(${padding.left}, ${padding.top})`}>
            {data.map((item) => {
              const cx = xScale(item.x)
              const cy = yScale(item.y)
              const r = sizeScale(item.size)
              const color = getBubbleColor(item.sentiment)
              const isHovered = hoveredId === item.id

              return (
                <g key={item.id}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill={color}
                    fillOpacity={isHovered ? 0.9 : 0.6}
                    stroke={color}
                    strokeWidth={isHovered ? 2 : 1}
                    style={{
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                      transformOrigin: `${cx}px ${cy}px`,
                    }}
                    onMouseEnter={(e) => handleBubbleHover(e, item)}
                    onMouseLeave={handleBubbleLeave}
                  />
                  {/* Label inside bubble if large enough */}
                  {r > 20 && (
                    <text
                      x={cx}
                      y={cy}
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      fill={theme.palette.common.white}
                      fontSize={10}
                      fontWeight={600}
                      pointerEvents="none"
                    >
                      {item.label?.substring(0, 8)}
                    </text>
                  )}
                </g>
              )
            })}
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
                { label: xAxis.label, value: tooltip.data.x },
                { label: yAxis.label, value: tooltip.data.y },
                { label: sizeAxis.label, value: tooltip.data.size },
                ...(tooltip.data.metadata
                  ? Object.entries(tooltip.data.metadata).map(([key, val]) => ({
                      label: key,
                      value: val,
                    }))
                  : []),
              ]
            : []
        }
      />

      {/* Legend and size indicator */}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <ChartLegend items={legendItems} />
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Bubble size = {sizeAxis.label}
        </Typography>
      </Box>
    </Box>
  )
}

export default BubbleChart

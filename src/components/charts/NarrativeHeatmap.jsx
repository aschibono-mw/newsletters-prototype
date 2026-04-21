import { useState, useMemo } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import ChartLegend from './ChartLegend'
import ChartTooltip from './ChartTooltip'
import { colors as tokenColors } from '../../theme-tokens'

// Sentiment colors from design tokens
const SENTIMENT_COLORS = {
  positive: {
    bg: tokenColors.product.lightGreen.light,
    main: tokenColors.product.lightGreen.main,
    text: tokenColors.product.lightGreen.dark,
  },
  neutral: {
    bg: tokenColors.grey[100],
    main: tokenColors.grey[400],
    text: tokenColors.grey[700],
  },
  negative: {
    bg: tokenColors.product.pink.light,
    main: tokenColors.product.pink.main,
    text: tokenColors.product.pink.dark,
  },
}

/**
 * Heatmap grid with sentiment colors
 * @param {array} rows - [{ id, label }] - Row definitions
 * @param {array} columns - [{ id, label }] - Column definitions
 * @param {array} cells - [{ rowId, columnId, value, sentiment }]
 * @param {boolean} showValues - Show values in cells
 * @param {boolean} showLegend - Show legend
 */
function NarrativeHeatmap({
  rows = [],
  columns = [],
  cells = [],
  showValues = true,
  showLegend = true,
}) {
  const theme = useTheme()
  const [tooltip, setTooltip] = useState({ open: false, anchorEl: null, data: null })

  // Use the sentiment colors
  const sentimentColors = SENTIMENT_COLORS

  // Create cell lookup map
  const cellMap = useMemo(() => {
    const map = {}
    cells.forEach((cell) => {
      const key = `${cell.rowId}-${cell.columnId}`
      map[key] = cell
    })
    return map
  }, [cells])

  const getCell = (rowId, columnId) => {
    return cellMap[`${rowId}-${columnId}`] || null
  }

  const getCellColor = (cell) => {
    if (!cell) return { bg: theme.palette.grey[50], text: theme.palette.grey[400] }
    const sentiment = cell.sentiment || 'neutral'
    const colors = sentimentColors[sentiment] || sentimentColors.neutral

    // Intensity based on value (0-100)
    const intensity = Math.min(1, Math.max(0.3, (cell.value || 0) / 100))
    return {
      bg: colors.bg,
      text: colors.text,
      opacity: intensity,
    }
  }

  const handleCellHover = (event, rowId, columnId) => {
    const cell = getCell(rowId, columnId)
    const row = rows.find((r) => r.id === rowId)
    const col = columns.find((c) => c.id === columnId)

    setTooltip({
      open: true,
      anchorEl: event.currentTarget,
      data: {
        row: row?.label,
        column: col?.label,
        value: cell?.value,
        sentiment: cell?.sentiment,
      },
    })
  }

  const handleCellLeave = () => {
    setTooltip({ open: false, anchorEl: null, data: null })
  }

  const legendItems = [
    { label: 'Positive', color: sentimentColors.positive.main, shape: 'square' },
    { label: 'Neutral', color: sentimentColors.neutral.main, shape: 'square' },
    { label: 'Negative', color: sentimentColors.negative.main, shape: 'square' },
  ]

  const cellSize = 48
  const labelWidth = 100

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      {/* Header row */}
      <Box sx={{ display: 'flex', mb: 0.5 }}>
        {/* Empty corner */}
        <Box sx={{ width: labelWidth, flexShrink: 0 }} />
        {/* Column headers */}
        {columns.map((col) => (
          <Box
            key={col.id}
            sx={{
              width: cellSize,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              pb: 0.5,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 500,
                textAlign: 'center',
                lineHeight: 1.2,
                fontSize: 10,
              }}
            >
              {col.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Data rows */}
      {rows.map((row) => (
        <Box key={row.id} sx={{ display: 'flex', mb: 0.5 }}>
          {/* Row label */}
          <Box
            sx={{
              width: labelWidth,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              pr: 1,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: 11,
              }}
            >
              {row.label}
            </Typography>
          </Box>

          {/* Cells */}
          {columns.map((col) => {
            const cell = getCell(row.id, col.id)
            const cellColor = getCellColor(cell)

            return (
              <Box
                key={col.id}
                sx={{
                  width: cellSize,
                  height: cellSize,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: cellColor.bg,
                  opacity: cellColor.opacity || 1,
                  borderRadius: 0.5,
                  mx: 0.25,
                  cursor: 'pointer',
                  transition: 'transform 0.1s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
                onMouseEnter={(e) => handleCellHover(e, row.id, col.id)}
                onMouseLeave={handleCellLeave}
              >
                {showValues && cell && (
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 600,
                      color: cellColor.text,
                      fontSize: 11,
                    }}
                  >
                    {cell.value}
                  </Typography>
                )}
              </Box>
            )
          })}
        </Box>
      ))}

      {/* Tooltip */}
      <ChartTooltip
        open={tooltip.open}
        anchorEl={tooltip.anchorEl}
        title={`${tooltip.data?.row || ''} × ${tooltip.data?.column || ''}`}
        items={
          tooltip.data?.value !== undefined
            ? [
                {
                  label: 'Value',
                  value: tooltip.data.value,
                  color: sentimentColors[tooltip.data?.sentiment]?.main,
                },
                { label: 'Sentiment', value: tooltip.data?.sentiment || 'N/A' },
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

export default NarrativeHeatmap

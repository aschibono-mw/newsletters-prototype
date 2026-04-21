import { Box, Typography } from '@mui/material'

/**
 * Reusable chart legend component
 * @param {array} items - [{ label, color, shape }] shape: 'line' | 'circle' | 'square'
 * @param {'horizontal'|'vertical'} direction - Layout direction
 */
function ChartLegend({ items = [], direction = 'horizontal' }) {
  const getShapeStyles = (shape, color) => {
    switch (shape) {
      case 'line':
        return {
          width: 16,
          height: 2,
          backgroundColor: color,
          borderRadius: 1,
        }
      case 'circle':
        return {
          width: 10,
          height: 10,
          backgroundColor: color,
          borderRadius: '50%',
        }
      case 'square':
      default:
        return {
          width: 10,
          height: 10,
          backgroundColor: color,
          borderRadius: 1,
        }
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: direction === 'vertical' ? 'column' : 'row',
        gap: direction === 'vertical' ? 1 : 2.5,
        flexWrap: 'wrap',
      }}
    >
      {items.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Box sx={getShapeStyles(item.shape || 'line', item.color)} />
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}
          >
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

export default ChartLegend

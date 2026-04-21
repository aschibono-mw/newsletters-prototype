import { Box, Typography } from '@mui/material'

/**
 * CorePropsTable - Props table with grey header row
 *
 * @param {Array} props - Array of prop definitions {name, type, description}
 * @param {object} [sx] - Additional MUI sx styles
 */
function CorePropsTable({ props = [], sx }) {
  return (
    <Box sx={{ mb: 4, ...sx }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Props
      </Typography>
      <Box
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          overflow: 'hidden',
        }}
      >
        {/* Header row with grey background */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 2fr',
            p: 1.5,
            borderBottom: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'grey.100',
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            Prop
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            Type
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            Description
          </Typography>
        </Box>
        {/* Data rows */}
        {props.map((prop, i) => (
          <Box
            key={prop.name}
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 2fr',
              p: 1.5,
              borderBottom: i < props.length - 1 ? '1px solid' : 'none',
              borderColor: 'divider',
              backgroundColor: 'background.paper',
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontFamily: 'monospace' }}
            >
              {prop.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontFamily: 'monospace', color: 'text.secondary' }}
            >
              {prop.type}
            </Typography>
            <Typography variant="body2">{prop.description}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default CorePropsTable

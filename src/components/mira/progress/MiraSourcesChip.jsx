import { Chip } from '@mui/material'

/**
 * MiraSourcesChip - Clickable source count chip
 *
 * @param {number} [count=0] - Number of sources
 * @param {boolean} [clickable=false] - Whether chip is clickable
 * @param {function} [onClick] - Click handler
 * @param {object} [sx] - Additional MUI sx styles
 */
function MiraSourcesChip({ count = 0, clickable = false, onClick, sx }) {
  return (
    <Chip
      label={`${count} source${count !== 1 ? 's' : ''}`}
      size="small"
      variant="outlined"
      onClick={clickable ? onClick : undefined}
      sx={{
        fontWeight: 500,
        fontSize: '0.75rem',
        cursor: clickable ? 'pointer' : 'default',
        '&:hover': clickable
          ? {
              borderColor: 'primary.main',
              backgroundColor: 'action.hover',
            }
          : {},
        ...sx,
      }}
    />
  )
}

export default MiraSourcesChip

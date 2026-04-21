import { useState } from 'react'
import { Box, Paper, Typography, Popper, Fade } from '@mui/material'

/**
 * Hover tooltip for charts using MUI Popper
 * @param {boolean} open - Whether tooltip is visible
 * @param {object} anchorEl - DOM element to anchor to
 * @param {string} title - Tooltip title
 * @param {array} items - [{ label, value, color }]
 * @param {'top'|'bottom'|'left'|'right'} placement - Tooltip placement
 */
function ChartTooltip({
  open = false,
  anchorEl = null,
  title = '',
  items = [],
  placement = 'top',
  offset = [0, 8],
}) {
  const [arrowRef, setArrowRef] = useState(null)

  if (!anchorEl) return null

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement={placement}
      transition
      modifiers={[
        {
          name: 'offset',
          options: {
            offset: offset,
          },
        },
        {
          name: 'arrow',
          enabled: true,
          options: {
            element: arrowRef,
          },
        },
      ]}
      sx={{ zIndex: 1500 }}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={150}>
          <Paper
            elevation={4}
            sx={{
              px: 1.5,
              py: 1,
              minWidth: 120,
              backgroundColor: 'grey.900',
              color: 'common.white',
              borderRadius: 1,
            }}
          >
            {title && (
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  fontWeight: 600,
                  mb: items.length > 0 ? 0.5 : 0,
                  color: 'grey.300',
                }}
              >
                {title}
              </Typography>
            )}
            {items.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                  py: 0.25,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {item.color && (
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: item.color,
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <Typography variant="caption" sx={{ color: 'grey.300' }}>
                    {item.label}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  {item.value}
                </Typography>
              </Box>
            ))}
            <Box
              ref={setArrowRef}
              sx={{
                position: 'absolute',
                width: 8,
                height: 8,
                backgroundColor: 'grey.900',
                transform: 'rotate(45deg)',
                ...(placement === 'top' && {
                  bottom: -4,
                  left: 'calc(50% - 4px)',
                }),
                ...(placement === 'bottom' && {
                  top: -4,
                  left: 'calc(50% - 4px)',
                }),
                ...(placement === 'left' && {
                  right: -4,
                  top: 'calc(50% - 4px)',
                }),
                ...(placement === 'right' && {
                  left: -4,
                  top: 'calc(50% - 4px)',
                }),
              }}
            />
          </Paper>
        </Fade>
      )}
    </Popper>
  )
}

export default ChartTooltip

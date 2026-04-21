import { Box, Typography, IconButton, Tooltip } from '@mui/material'
import InfoOutlined from '@mui/icons-material/InfoOutlined'

/**
 * Base component for slide-in side panels.
 * Provides consistent backdrop, panel container, and header.
 *
 * @param {object} props
 * @param {boolean} open - Whether panel is open
 * @param {function} onClose - Close handler
 * @param {string} title - Panel title
 * @param {string} infoTooltip - Optional tooltip text for info icon
 * @param {ReactNode} children - Panel content
 * @param {boolean} chatOpen - Whether AI chat panel is open (affects positioning)
 * @param {number} width - Panel width (default: 480)
 */
function BaseSidePanel({
  open,
  onClose,
  title,
  infoTooltip,
  children,
  chatOpen = false,
  width = 480,
}) {
  return (
    <>
      {/* Backdrop - only visible on mobile/tablet */}
      <Box
        onClick={onClose}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1249,
          display: { xs: 'block', sm: 'block', md: 'none' },
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
          transition: 'opacity 0.2s ease, visibility 0.2s ease',
        }}
      />

      {/* Panel */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          right: { xs: 0, sm: 0, md: 0, lg: chatOpen ? '400px' : 0 },
          width: { xs: '100%', sm: '100%', md: `${width}px`, lg: `${width}px` },
          height: '100vh',
          backgroundColor: 'background.paper',
          borderLeft: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1250,
          boxShadow: 3,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.2s ease, right 0.2s ease',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Header */}
          <Box
            sx={{
              minHeight: 64,
              px: 2,
              borderBottom: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {title}
              </Typography>
              {infoTooltip && (
                <Tooltip title={infoTooltip}>
                  <IconButton size="small" sx={{ color: 'text.secondary' }}>
                    <InfoOutlined fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
            <IconButton
              onClick={onClose}
              size="small"
              sx={{ width: 32, height: 32 }}
            >
              <Box
                component="span"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  color: 'text.secondary',
                }}
              >
                ×
              </Box>
            </IconButton>
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
            {children}
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default BaseSidePanel

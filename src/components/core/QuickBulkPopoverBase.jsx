import {
  Popover,
  Box,
  Typography,
  Divider,
  Button,
} from '@mui/material'

/**
 * Base component for bulk action popovers.
 * Provides consistent Popover wrapper, header, and footer.
 *
 * @param {object} props
 * @param {Element} anchorEl - Popover anchor element
 * @param {boolean} open - Whether popover is open
 * @param {function} onClose - Close handler
 * @param {string} title - Header title
 * @param {string} subtitle - Header subtitle (e.g., "3 users selected")
 * @param {ReactNode} children - Main content (list, etc.)
 * @param {function} onApply - Apply button handler
 * @param {boolean} applyDisabled - Whether Apply button is disabled
 * @param {string} applyLabel - Apply button label (default: "Apply")
 * @param {number} width - Popover width (default: 320)
 * @param {ReactNode} footerExtra - Extra content above footer buttons
 */
function QuickBulkPopoverBase({
  anchorEl,
  open,
  onClose,
  title,
  subtitle,
  children,
  onApply,
  applyDisabled = false,
  applyLabel = 'Apply',
  width = 320,
  footerExtra,
}) {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      slotProps={{
        paper: {
          sx: { width, mt: -1 },
        },
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2, pb: 1 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {subtitle}
        </Typography>
      </Box>

      <Divider />

      {/* Content */}
      {children}

      <Divider />

      {/* Footer */}
      <Box sx={{ p: 1.5 }}>
        {footerExtra}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button size="small" onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={onApply}
            disabled={applyDisabled}
          >
            {applyLabel}
          </Button>
        </Box>
      </Box>
    </Popover>
  )
}

export default QuickBulkPopoverBase

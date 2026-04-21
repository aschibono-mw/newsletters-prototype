import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'

/**
 * DeleteConfirmDialog - Reusable delete confirmation dialog
 *
 * @param {object} props
 * @param {boolean} props.open - Dialog open state
 * @param {function} props.onClose - Close handler
 * @param {function} props.onConfirm - Confirm delete handler
 * @param {string} props.title - Dialog title (default: "Delete Item")
 * @param {string} props.itemName - Name of item being deleted (optional)
 * @param {string} props.warningText - Warning text (default: "This action cannot be undone.")
 * @param {string} props.confirmLabel - Confirm button label (default: "Delete")
 * @param {string} props.cancelLabel - Cancel button label (default: "Cancel")
 */
function DeleteConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = 'Delete Item',
  itemName,
  warningText = 'This action cannot be undone.',
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <IconButton size="small" onClick={onClose} sx={{ color: 'text.secondary' }}>
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: 'error.lighter',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <WarningAmberIcon sx={{ color: 'error.main', fontSize: 20 }} />
          </Box>
          <Box>
            {itemName && (
              <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                Are you sure you want to delete "{itemName}"?
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary">
              {warningText}
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button
          onClick={onClose}
          sx={{ textTransform: 'none', fontWeight: 500 }}
        >
          {cancelLabel}
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
          sx={{ textTransform: 'none', fontWeight: 500 }}
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteConfirmDialog

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material'

/**
 * BulkDeleteConfirmDialog - Confirmation dialog for bulk user deletion
 *
 * @param {Object} props
 * @param {boolean} props.open - Dialog open state
 * @param {Function} props.onClose - Called when dialog closes
 * @param {Function} props.onConfirm - Called when delete is confirmed
 * @param {number} props.selectedCount - Number of users to delete
 */
function BulkDeleteConfirmDialog({ open, onClose, onConfirm, selectedCount = 0 }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Delete Users</DialogTitle>
      <DialogContent>
        <Typography variant="body2">
          Are you sure you want to delete <strong>{selectedCount} users</strong>? This action
          cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ textTransform: 'none' }}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={onConfirm} sx={{ textTransform: 'none' }}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default BulkDeleteConfirmDialog

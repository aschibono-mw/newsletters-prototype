import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  FormHelperText,
  Alert,
} from '@mui/material'

/**
 * AdminSettingsDialog - Dialog for managing admin settings (max admin users)
 *
 * @param {Object} props
 * @param {boolean} props.open - Dialog open state
 * @param {Function} props.onClose - Called when dialog closes
 * @param {Function} props.onSave - Called with maxAdminUsers value when saved
 * @param {number} props.currentAdminCount - Current number of platform admins
 */
function AdminSettingsDialog({ open, onClose, onSave, currentAdminCount = 0 }) {
  const [maxAdminUsers, setMaxAdminUsers] = useState('')

  useEffect(() => {
    if (!open) {
      setMaxAdminUsers('')
    }
  }, [open])

  const isZero = maxAdminUsers === '0' || maxAdminUsers === 0
  const willDemote =
    maxAdminUsers &&
    parseInt(maxAdminUsers) > 0 &&
    parseInt(maxAdminUsers) < currentAdminCount

  const handleSave = () => {
    onSave(maxAdminUsers)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ pb: isZero || willDemote ? 1 : 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Admin Settings
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Current Platform Admins: {currentAdminCount}
        </Typography>
      </DialogTitle>

      {isZero && (
        <Alert
          severity="error"
          variant="standard"
          sx={{ borderRadius: 0, backgroundColor: '#FDEDED' }}
        >
          You cannot set the maximum admin users to 0. At least one admin is required.
        </Alert>
      )}

      {willDemote && (
        <Alert
          severity="warning"
          variant="standard"
          sx={{ borderRadius: 0, backgroundColor: '#FFF4E5' }}
        >
          Setting the limit to {maxAdminUsers} will reduce{' '}
          {currentAdminCount - parseInt(maxAdminUsers)} admin
          {currentAdminCount - parseInt(maxAdminUsers) !== 1 ? 's' : ''} to Standard access.
        </Alert>
      )}

      <DialogContent>
        <Box sx={{ pt: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
            Maximum Admin Users
          </Typography>
          <TextField
            fullWidth
            type="number"
            placeholder="No limit"
            value={maxAdminUsers}
            onChange={(e) => setMaxAdminUsers(e.target.value)}
            inputProps={{ min: 0 }}
            size="small"
            error={isZero}
          />
          <FormHelperText>
            Optional. Set a company-wide limit on the number of Platform Admin users. Leave blank
            for no limit.
          </FormHelperText>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ textTransform: 'none' }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={isZero}
          sx={{ textTransform: 'none' }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AdminSettingsDialog

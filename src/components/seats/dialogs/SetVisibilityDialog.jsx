import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  InputBase,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

/**
 * SetVisibilityDialog - Dialog for setting user visibility settings
 *
 * @param {Object} props
 * @param {boolean} props.open - Dialog open state
 * @param {Function} props.onClose - Called when dialog closes
 * @param {Function} props.onSave - Called when save is clicked
 * @param {Object} props.user - User object being edited
 */
function SetVisibilityDialog({ open, onClose, onSave, user }) {
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (!open) {
      setSearchQuery('')
    }
  }, [open])

  const handleClose = () => {
    setSearchQuery('')
    onClose()
  }

  const handleSave = () => {
    onSave()
    handleClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { height: 480 } }}
    >
      <DialogTitle>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Set Visibility
        </Typography>
        {user && (
          <Typography variant="body2" color="text.secondary">
            {user.name}
          </Typography>
        )}
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', p: 0 }}>
        {/* Inline find bar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            px: 3,
            py: 1.5,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <SearchIcon sx={{ color: 'text.secondary', fontSize: 20, mr: 1 }} />
          <InputBase
            placeholder="Find"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ flex: 1, fontSize: 14 }}
          />
        </Box>
        {/* Scrollable content area */}
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            This area will remain unchanged
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} sx={{ textTransform: 'none' }}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSave} sx={{ textTransform: 'none' }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SetVisibilityDialog

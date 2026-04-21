import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListSubheader,
  Divider,
  Stack,
} from '@mui/material'

function QuickWorkspaceEdit({
  open,
  onClose,
  assignment,
  roles,
  onUpdate,
  onEditPermissions,
}) {
  const [role, setRole] = useState('')

  // Sync local state when assignment changes
  useEffect(() => {
    if (assignment) {
      setRole(assignment.role || '')
    }
  }, [assignment])

  const handleSave = () => {
    onUpdate({
      ...assignment,
      role: role || null,
    })
    onClose()
  }

  const handleClose = () => {
    // Reset to original values on cancel
    if (assignment) {
      setRole(assignment.role || '')
    }
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Edit Workspace Assignment</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <FormControl fullWidth>
            <InputLabel>Workspace Role</InputLabel>
            <Select
              value={role}
              label="Workspace Role"
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="">
                Custom
              </MenuItem>
              <Divider />
              <ListSubheader sx={{ backgroundColor: 'background.paper', lineHeight: '32px' }}>OOTB Roles</ListSubheader>
              {roles.filter((r) => r.id.startsWith('explore-')).map((r) => (
                <MenuItem key={r.id} value={r.id}>
                  {r.label}
                </MenuItem>
              ))}
              <Divider />
              <ListSubheader sx={{ backgroundColor: 'background.paper', lineHeight: '32px' }}>Custom Roles</ListSubheader>
              {roles.filter((r) => !r.id.startsWith('explore-')).map((r) => (
                <MenuItem key={r.id} value={r.id}>
                  {r.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {onEditPermissions && (
            <Button
              variant="text"
              size="small"
              onClick={() => {
                onEditPermissions()
                onClose()
              }}
              sx={{ textTransform: 'none', justifyContent: 'flex-start', ml: -1 }}
            >
              Edit Permission Overrides
            </Button>
          )}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} sx={{ textTransform: 'none' }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{ textTransform: 'none' }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default QuickWorkspaceEdit

import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Chip,
  Alert,
} from '@mui/material'

/**
 * BulkRoleChangeDialog - Dialog for changing roles in bulk
 *
 * @param {Object} props
 * @param {boolean} props.open - Dialog open state
 * @param {Function} props.onClose - Called when dialog closes
 * @param {Function} props.onApply - Called with roleId when applied
 * @param {number} props.selectedCount - Number of selected users
 * @param {Array} props.selectedUsers - Array of selected user objects
 * @param {Array} props.roles - Available roles array: { id, label }
 */
function BulkRoleChangeDialog({
  open,
  onClose,
  onApply,
  selectedCount = 0,
  selectedUsers = [],
  roles = [],
}) {
  const [selectedRole, setSelectedRole] = useState(null)

  const handleClose = () => {
    setSelectedRole(null)
    onClose()
  }

  const handleApply = () => {
    onApply(selectedRole)
    handleClose()
  }

  const ineligibleCount = selectedUsers.filter(
    (u) => u.seatType === 'view-only' || u.seatType === 'interactor'
  ).length
  const eligibleCount = selectedUsers.length - ineligibleCount

  const getCurrentRoleCount = (roleId) => {
    return selectedUsers.filter((u) => u.role === roleId && u.seatType === 'platform').length
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Change Role
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Apply to {selectedCount} selected user{selectedCount !== 1 ? 's' : ''}
        </Typography>
      </DialogTitle>
      {ineligibleCount > 0 && (
        <Alert severity="warning" sx={{ borderRadius: 0 }}>
          {ineligibleCount} selected user{ineligibleCount !== 1 ? 's are' : ' is'} View-Only or
          Interactor and cannot have roles assigned.
          {eligibleCount > 0
            ? ` Role will be applied to ${eligibleCount} Platform user${eligibleCount !== 1 ? 's' : ''}.`
            : ''}
        </Alert>
      )}
      <DialogContent dividers sx={{ p: 0 }}>
        <List dense sx={{ py: 1 }}>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedRole === null}
              onClick={() => setSelectedRole(null)}
              sx={{ py: 1.5 }}
            >
              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ fontWeight: 500, fontStyle: 'italic' }}>
                    Custom (remove role)
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
          {roles.map((role) => {
            const currentCount = getCurrentRoleCount(role.id)
            return (
              <ListItem key={role.id} disablePadding>
                <ListItemButton
                  selected={selectedRole === role.id}
                  onClick={() => setSelectedRole(role.id)}
                  sx={{ py: 1.5 }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {role.label}
                        </Typography>
                        {currentCount > 0 && (
                          <Chip
                            label={`${currentCount} selected`}
                            size="small"
                            sx={{
                              height: 18,
                              fontSize: 11,
                              backgroundColor: 'primary.light',
                              color: 'primary.dark',
                            }}
                          />
                        )}
                      </Box>
                    }
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ textTransform: 'none' }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleApply}
          disabled={eligibleCount === 0}
          sx={{ textTransform: 'none' }}
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default BulkRoleChangeDialog

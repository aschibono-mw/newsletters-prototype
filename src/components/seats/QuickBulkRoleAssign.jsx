import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Chip,
  Alert,
} from '@mui/material'
import { useState } from 'react'
import { canAssignRole } from '../../data/seatsData'
import QuickBulkPopoverBase from '../core/QuickBulkPopoverBase'

function QuickBulkRoleAssign({
  anchorEl,
  open,
  onClose,
  selectedUsers = [],
  roles = [],
  onApply,
}) {
  const [selectedRoleId, setSelectedRoleId] = useState(null)

  const handleClose = () => {
    setSelectedRoleId(null)
    onClose()
  }

  const handleApply = () => {
    if (selectedRoleId === '__remove__') {
      onApply(null)
    } else if (selectedRoleId) {
      onApply(selectedRoleId)
    }
    setSelectedRoleId(null)
  }

  // Filter to users who can have roles
  const eligibleUsers = selectedUsers.filter((u) => canAssignRole(u.seatType))
  const ineligibleCount = selectedUsers.length - eligibleUsers.length

  // Count users with each role
  const roleCounts = eligibleUsers.reduce((acc, user) => {
    if (user.role) {
      acc[user.role] = (acc[user.role] || 0) + 1
    }
    return acc
  }, {})

  return (
    <QuickBulkPopoverBase
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      title="Assign Role"
      subtitle={`Apply to ${eligibleUsers.length} eligible user${eligibleUsers.length !== 1 ? 's' : ''}`}
      onApply={handleApply}
      applyDisabled={!selectedRoleId}
    >
      {ineligibleCount > 0 && (
        <Box sx={{ px: 2, py: 1 }}>
          <Alert severity="warning" sx={{ py: 0.5 }}>
            <Typography variant="caption">
              {ineligibleCount} user{ineligibleCount !== 1 ? 's' : ''} will be skipped (View-Only or No Suite Access)
            </Typography>
          </Alert>
        </Box>
      )}

      <List dense sx={{ py: 1, maxHeight: 300, overflow: 'auto' }}>
        {roles.map((role) => {
          const currentCount = roleCounts[role.id] || 0

          return (
            <ListItem key={role.id} disablePadding>
              <ListItemButton
                selected={selectedRoleId === role.id}
                onClick={() => setSelectedRoleId(role.id)}
                sx={{ py: 1 }}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {role.label}
                      </Typography>
                      {currentCount > 0 && (
                        <Chip
                          label={`${currentCount} have this`}
                          size="small"
                          sx={{ height: 18, fontSize: 11, backgroundColor: 'grey.200' }}
                        />
                      )}
                    </Box>
                  }
                />
              </ListItemButton>
            </ListItem>
          )
        })}

        {/* Option to remove role */}
        <Divider sx={{ my: 1 }} />
        <ListItem disablePadding>
          <ListItemButton
            selected={selectedRoleId === '__remove__'}
            onClick={() => setSelectedRoleId('__remove__')}
            sx={{ py: 1 }}
          >
            <ListItemText
              primary={
                <Typography variant="body2" color="text.secondary">
                  Remove role
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      </List>
    </QuickBulkPopoverBase>
  )
}

export default QuickBulkRoleAssign

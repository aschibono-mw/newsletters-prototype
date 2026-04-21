import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  IconButton,
  Stack,
  Chip,
  Avatar,
  Button,
  Divider,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import Indicator from '../core/Indicator'
import { canAssignRole } from '../../data/seatsData'

// Panel animation helper
const getPanelStyles = (isOpen) => ({
  transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
  opacity: isOpen ? 1 : 0,
  visibility: isOpen ? 'visible' : 'hidden',
  transition: isOpen
    ? 'transform 0.3s ease, opacity 0.3s ease'
    : 'transform 0.3s ease, opacity 0.3s ease, visibility 0s linear 0.3s',
})

const SEAT_TYPES = [
  { id: 'admin', label: 'Admin' },
  { id: 'standard', label: 'Standard' },
  { id: 'view-only', label: 'View-Only' },
  { id: 'no-access', label: 'No Access' },
]

function UserQuickEditSidebar({
  open,
  user,
  roles,
  groups,
  chatOpen,
  onClose,
  onSave,
  onEditUser,
}) {
  const [localUser, setLocalUser] = useState(null)
  const [hasChanges, setHasChanges] = useState(false)

  // Sync local state when user changes
  useEffect(() => {
    if (user) {
      setLocalUser({ ...user })
      setHasChanges(false)
    }
  }, [user])

  // Handle seat type change
  const handleSeatChange = (e) => {
    const newSeatType = e.target.value
    const newRole = canAssignRole(newSeatType) ? localUser.role : null
    setLocalUser((prev) => ({
      ...prev,
      seatType: newSeatType,
      role: newRole,
    }))
    setHasChanges(true)
  }

  // Handle role change
  const handleRoleChange = (e) => {
    setLocalUser((prev) => ({
      ...prev,
      role: e.target.value || null,
    }))
    setHasChanges(true)
  }

  // Save changes
  const handleSave = () => {
    if (localUser && hasChanges) {
      onSave(localUser)
      setHasChanges(false)
    }
  }

  // Get group names
  const getGroupNames = (groupIds) => {
    if (!groupIds || groupIds.length === 0) return []
    return groupIds.map((id) => groups.find((g) => g.id === id)?.name || '').filter(Boolean)
  }

  // Get initials
  const getInitials = (name) => {
    if (!name) return '?'
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const canEditRole = localUser && canAssignRole(localUser.seatType)
  const groupNames = localUser ? getGroupNames(localUser.groups) : []

  return (
    <>
      {/* Backdrop */}
      {open && (
        <Box
          onClick={onClose}
          sx={{
            position: 'fixed',
            top: 64,
            left: 0,
            right: chatOpen ? 400 : 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 1199,
          }}
        />
      )}

      {/* Panel */}
      <Box
        sx={{
          position: 'fixed',
          top: 64,
          right: chatOpen ? 400 : 0,
          width: 380,
          height: 'calc(100vh - 64px)',
          backgroundColor: 'background.paper',
          borderLeft: '1px solid',
          borderColor: 'divider',
          zIndex: 1200,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-4px 0 12px rgba(0, 0, 0, 0.1)',
          ...getPanelStyles(open),
        }}
      >
        {localUser && (
          <>
            {/* Header */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Quick Edit
              </Typography>
              <IconButton size="small" onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Content */}
            <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
              {/* User Identity */}
              <Stack spacing={2} alignItems="center" sx={{ mb: 3 }}>
                <Avatar
                  sx={{
                    width: 72,
                    height: 72,
                    bgcolor: 'primary.main',
                    fontSize: 24,
                    fontWeight: 600,
                  }}
                >
                  {getInitials(localUser.name)}
                </Avatar>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {localUser.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {localUser.email}
                  </Typography>
                </Box>
                <Indicator
                  label={localUser.status}
                  status={localUser.status === 'Active' ? 'active' : localUser.status === 'Inactive' ? 'inactive' : 'pending'}
                  size="small"
                />
              </Stack>

              <Divider sx={{ my: 3 }} />

              {/* Editable Fields */}
              <Stack spacing={3}>
                {/* Seat Type */}
                <FormControl fullWidth size="small">
                  <InputLabel>Seat Type</InputLabel>
                  <Select
                    value={localUser.seatType}
                    label="Seat Type"
                    onChange={handleSeatChange}
                  >
                    {SEAT_TYPES.map((seat) => (
                      <MenuItem key={seat.id} value={seat.id}>
                        {seat.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Role */}
                <FormControl fullWidth size="small" disabled={!canEditRole}>
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={localUser.role || ''}
                    label="Role"
                    onChange={handleRoleChange}
                  >
                    <MenuItem value="">
                      <Typography color="text.secondary" sx={{ fontStyle: 'italic' }}>
                        None (use defaults)
                      </Typography>
                    </MenuItem>
                    {roles.map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {role.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {!canEditRole && (
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                      Role assignment not available for this seat type
                    </Typography>
                  )}
                </FormControl>

                {/* Groups (read-only in quick edit) */}
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Groups
                  </Typography>
                  {groupNames.length === 0 ? (
                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                      No groups assigned
                    </Typography>
                  ) : (
                    <Stack direction="row" flexWrap="wrap" gap={0.5}>
                      {groupNames.map((name, i) => (
                        <Chip key={i} label={name} size="small" variant="outlined" />
                      ))}
                    </Stack>
                  )}
                </Box>

                {/* Workspace count */}
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Workspaces
                  </Typography>
                  <Typography variant="body2">
                    {localUser.workspaceAssignments?.length || 0} workspace(s) assigned
                  </Typography>
                </Box>
              </Stack>
            </Box>

            {/* Footer */}
            <Box
              sx={{
                p: 2,
                borderTop: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Stack spacing={1.5}>
                {hasChanges && (
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleSave}
                    sx={{ textTransform: 'none', fontWeight: 500 }}
                  >
                    Save Changes
                  </Button>
                )}
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<EditOutlinedIcon />}
                  onClick={() => onEditUser(localUser)}
                  sx={{ textTransform: 'none', fontWeight: 500 }}
                >
                  Edit Full Profile
                </Button>
              </Stack>
            </Box>
          </>
        )}
      </Box>
    </>
  )
}

export default UserQuickEditSidebar

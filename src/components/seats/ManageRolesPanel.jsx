import { useState } from 'react'
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Stack,
  Paper,
  Chip,
  Divider,
  Alert,
  Tooltip,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import CancelIcon from '@mui/icons-material/Cancel'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import BaseSidePanel from '../core/BaseSidePanel'

function ManageRolesPanel({ open, onClose, roles, users, onRolesChange, onRoleClick, chatOpen = false }) {
  const [newRoleName, setNewRoleName] = useState('')
  const [roleError, setRoleError] = useState('')
  const [editingRoleId, setEditingRoleId] = useState(null)
  const [editingRoleName, setEditingRoleName] = useState('')
  const [editError, setEditError] = useState('')

  // Separate OOTB and custom roles
  const ootbRoles = roles.filter(r => r.id.startsWith('explore-'))
  const customRoles = roles.filter(r => r.id.startsWith('custom-'))

  // Calculate users with roles assigned
  const usersWithRoles = users.filter((user) => user.role).length

  // Get user count for a specific role
  const getUserCountForRole = (roleId) => {
    return users.filter((user) => user.role === roleId).length
  }

  const handleCreateRole = () => {
    if (!newRoleName.trim()) {
      setRoleError('Role name is required')
      return
    }

    if (roles.some((r) => r.label.toLowerCase() === newRoleName.toLowerCase())) {
      setRoleError('A role with this name already exists')
      return
    }

    const newRole = {
      id: `custom-${Date.now()}`,
      label: `Custom: ${newRoleName.trim()}`,
    }

    onRolesChange([...roles, newRole])
    setNewRoleName('')
    setRoleError('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleCreateRole()
  }

  const handleDeleteRole = (roleId) => {
    const userCount = getUserCountForRole(roleId)
    const message = userCount > 0
      ? `This role is assigned to ${userCount} user(s). They will be unassigned. Continue?`
      : 'Are you sure you want to delete this role?'

    if (window.confirm(message)) {
      onRolesChange(roles.filter((r) => r.id !== roleId))
    }
  }

  const handleStartEdit = (role) => {
    const customName = role.label.replace('Custom: ', '')
    setEditingRoleId(role.id)
    setEditingRoleName(customName)
    setEditError('')
  }

  const handleCancelEdit = () => {
    setEditingRoleId(null)
    setEditingRoleName('')
    setEditError('')
  }

  const handleSaveEdit = () => {
    if (!editingRoleName.trim()) {
      setEditError('Role name is required')
      return
    }

    const newLabel = `Custom: ${editingRoleName.trim()}`
    if (roles.some((r) => r.id !== editingRoleId && r.label.toLowerCase() === newLabel.toLowerCase())) {
      setEditError('A role with this name already exists')
      return
    }

    onRolesChange(roles.map((r) => r.id === editingRoleId ? { ...r, label: newLabel } : r))
    handleCancelEdit()
  }

  const handleEditKeyPress = (e) => {
    if (e.key === 'Enter') handleSaveEdit()
    else if (e.key === 'Escape') handleCancelEdit()
  }

  return (
    <BaseSidePanel
      open={open}
      onClose={onClose}
      title="Manage Roles"
      infoTooltip="Roles define what users can do within each product. Assign roles to Admin and Standard users."
      chatOpen={chatOpen}
    >
      <Stack spacing={3}>
        {/* Stats Cards */}
        <Stack direction="row" spacing={2}>
          <Paper elevation={2} sx={{ flex: 1, p: 3, textAlign: 'center', borderRadius: 2 }}>
            <Typography variant="h3" sx={{ fontWeight: 600, mb: 1 }}>{roles.length}</Typography>
            <Typography variant="body2" color="text.secondary">Total Roles</Typography>
          </Paper>
          <Paper elevation={2} sx={{ flex: 1, p: 3, textAlign: 'center', borderRadius: 2 }}>
            <Typography variant="h3" sx={{ fontWeight: 600, mb: 1 }}>{usersWithRoles}</Typography>
            <Typography variant="body2" color="text.secondary">Users with Roles</Typography>
          </Paper>
        </Stack>

        <Divider />

        {/* OOTB Roles */}
        <Box>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Explore+ Roles</Typography>
            <Chip label="OOTB" size="small" sx={{ height: 20, fontSize: 10 }} />
          </Stack>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
            Out-of-the-box roles from Explore+. These cannot be modified.
          </Typography>

          <Stack spacing={1.5}>
            {ootbRoles.map((role) => {
              const userCount = getUserCountForRole(role.id)
              return (
                <Box
                  key={role.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 1.5,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    backgroundColor: 'grey.50',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
                    <BadgeOutlinedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    <Chip label={role.label} variant="outlined" size="small" sx={{ fontWeight: 500, borderRadius: 1 }} />
                    <Typography
                      variant="body2"
                      color="primary"
                      onClick={() => onRoleClick && onRoleClick(role.id)}
                      sx={{
                        fontWeight: 500,
                        ml: 'auto',
                        cursor: onRoleClick ? 'pointer' : 'default',
                        '&:hover': onRoleClick ? { textDecoration: 'underline' } : {},
                      }}
                    >
                      {userCount} User{userCount !== 1 ? 's' : ''}
                    </Typography>
                  </Box>
                  <Tooltip title="OOTB roles cannot be modified">
                    <LockOutlinedIcon sx={{ color: 'text.disabled', fontSize: 18, ml: 2 }} />
                  </Tooltip>
                </Box>
              )
            })}
          </Stack>
        </Box>

        <Divider />

        {/* Create Custom Role */}
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Create Custom Role</Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Role Name"
            value={newRoleName}
            onChange={(e) => { setNewRoleName(e.target.value); setRoleError('') }}
            onKeyPress={handleKeyPress}
            error={!!roleError}
            InputProps={{
              startAdornment: <Typography variant="body2" color="text.secondary" sx={{ mr: 0.5 }}>Custom:</Typography>,
              endAdornment: (
                <IconButton size="small" onClick={handleCreateRole} disabled={!newRoleName.trim()} sx={{ color: 'primary.main', '&:disabled': { color: 'action.disabled' } }}>
                  <AddIcon />
                </IconButton>
              ),
            }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>Press enter or click the plus to create</Typography>
          {roleError && <Alert severity="error" sx={{ mt: 1 }}>{roleError}</Alert>}
        </Box>

        <Divider />

        {/* Custom Roles List */}
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Custom Roles ({customRoles.length})</Typography>

          {customRoles.length === 0 ? (
            <Alert severity="info">No custom roles yet. Create your first custom role above.</Alert>
          ) : (
            <Stack spacing={1.5}>
              {customRoles.map((role) => {
                const userCount = getUserCountForRole(role.id)
                const isEditing = editingRoleId === role.id

                return (
                  <Box
                    key={role.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 1.5,
                      border: '1px solid',
                      borderColor: isEditing ? 'primary.main' : 'divider',
                      borderRadius: 1,
                      backgroundColor: isEditing ? 'action.hover' : 'transparent',
                      '&:hover': { backgroundColor: 'action.hover' },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
                      <BadgeOutlinedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                      {isEditing ? (
                        <TextField
                          size="small"
                          value={editingRoleName}
                          onChange={(e) => { setEditingRoleName(e.target.value); setEditError('') }}
                          onKeyDown={handleEditKeyPress}
                          error={!!editError}
                          autoFocus
                          sx={{ flex: 1 }}
                          InputProps={{
                            startAdornment: <Typography variant="body2" color="text.secondary" sx={{ mr: 0.5 }}>Custom:</Typography>,
                          }}
                        />
                      ) : (
                        <>
                          <Chip label={role.label} variant="outlined" size="small" sx={{ fontWeight: 500, borderRadius: 1 }} />
                          <Typography
                            variant="body2"
                            color="primary"
                            onClick={() => onRoleClick && onRoleClick(role.id)}
                            sx={{
                              fontWeight: 500,
                              ml: 'auto',
                              cursor: onRoleClick ? 'pointer' : 'default',
                              '&:hover': onRoleClick ? { textDecoration: 'underline' } : {},
                            }}
                          >
                            {userCount} User{userCount !== 1 ? 's' : ''}
                          </Typography>
                        </>
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', gap: 0.5, ml: 2 }}>
                      {isEditing ? (
                        <>
                          <IconButton size="small" onClick={handleSaveEdit} sx={{ color: 'success.main', '&:hover': { backgroundColor: 'success.light' } }}>
                            <CheckIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" onClick={handleCancelEdit} sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}>
                            <CancelIcon fontSize="small" />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton size="small" onClick={() => handleStartEdit(role)} sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" onClick={() => handleDeleteRole(role.id)} sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </>
                      )}
                    </Box>
                  </Box>
                )
              })}
            </Stack>
          )}

          {editError && <Alert severity="error" sx={{ mt: 2 }}>{editError}</Alert>}
        </Box>
      </Stack>
    </BaseSidePanel>
  )
}

export default ManageRolesPanel

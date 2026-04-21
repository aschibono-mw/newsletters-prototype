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
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import CancelIcon from '@mui/icons-material/Cancel'
import GroupIcon from '@mui/icons-material/Group'
import BaseSidePanel from '../core/BaseSidePanel'

function ManageGroupsPanel({ open, onClose, groups, users, onGroupsChange, onUsersChange, onGroupClick, chatOpen = false }) {
  const [newGroupName, setNewGroupName] = useState('')
  const [groupError, setGroupError] = useState('')
  const [editingGroupId, setEditingGroupId] = useState(null)
  const [editingGroupName, setEditingGroupName] = useState('')
  const [editError, setEditError] = useState('')

  // Calculate total users assigned to any group
  const usersAssigned = users.filter((user) => user.groups && user.groups.length > 0).length

  // Get user count for a specific group
  const getUserCountForGroup = (groupId) => {
    return users.filter((user) => user.groups && user.groups.includes(groupId)).length
  }

  const handleCreateGroup = () => {
    if (groups.some((g) => g.name.toLowerCase() === newGroupName.toLowerCase())) {
      setGroupError('A group with this name already exists')
      return
    }

    if (!newGroupName.trim()) {
      setGroupError('Group name is required')
      return
    }

    const newGroup = {
      id: Math.max(...groups.map((g) => g.id), 0) + 1,
      name: newGroupName.trim(),
    }

    onGroupsChange([...groups, newGroup])
    setNewGroupName('')
    setGroupError('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleCreateGroup()
  }

  const handleDeleteGroup = (groupId) => {
    if (window.confirm('Are you sure? This will remove the group from all users.')) {
      onUsersChange(users.map((user) => ({ ...user, groups: user.groups.filter((gId) => gId !== groupId) })))
      onGroupsChange(groups.filter((g) => g.id !== groupId))
    }
  }

  const handleStartEdit = (group) => {
    setEditingGroupId(group.id)
    setEditingGroupName(group.name)
    setEditError('')
  }

  const handleCancelEdit = () => {
    setEditingGroupId(null)
    setEditingGroupName('')
    setEditError('')
  }

  const handleSaveEdit = () => {
    if (!editingGroupName.trim()) {
      setEditError('Group name is required')
      return
    }

    if (groups.some((g) => g.id !== editingGroupId && g.name.toLowerCase() === editingGroupName.toLowerCase())) {
      setEditError('A group with this name already exists')
      return
    }

    onGroupsChange(groups.map((g) => g.id === editingGroupId ? { ...g, name: editingGroupName.trim() } : g))
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
      title="Manage Groups"
      infoTooltip="Classify users by business unit and region for enhanced reporting"
      chatOpen={chatOpen}
    >
      <Stack spacing={3}>
        {/* Stats Cards */}
        <Stack direction="row" spacing={2}>
          <Paper elevation={2} sx={{ flex: 1, p: 3, textAlign: 'center', borderRadius: 2 }}>
            <Typography variant="h3" sx={{ fontWeight: 600, mb: 1 }}>{groups.length}</Typography>
            <Typography variant="body2" color="text.secondary">Total Groups</Typography>
          </Paper>
          <Paper elevation={2} sx={{ flex: 1, p: 3, textAlign: 'center', borderRadius: 2 }}>
            <Typography variant="h3" sx={{ fontWeight: 600, mb: 1 }}>{usersAssigned}</Typography>
            <Typography variant="body2" color="text.secondary">Users Assigned</Typography>
          </Paper>
        </Stack>

        <Divider />

        {/* Create New Group */}
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Create New Group</Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Group Name"
            value={newGroupName}
            onChange={(e) => { setNewGroupName(e.target.value); setGroupError('') }}
            onKeyPress={handleKeyPress}
            error={!!groupError}
            InputProps={{
              endAdornment: (
                <IconButton size="small" onClick={handleCreateGroup} disabled={!newGroupName.trim()} sx={{ color: 'primary.main', '&:disabled': { color: 'action.disabled' } }}>
                  <AddIcon />
                </IconButton>
              ),
            }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>Press enter or click the plus to create</Typography>
          {groupError && <Alert severity="error" sx={{ mt: 1 }}>{groupError}</Alert>}
        </Box>

        <Divider />

        {/* All Groups List */}
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>All Groups ({groups.length})</Typography>

          {groups.length === 0 ? (
            <Alert severity="info">No groups yet. Create your first group to get started.</Alert>
          ) : (
            <Stack spacing={1.5}>
              {groups.map((group) => {
                const userCount = getUserCountForGroup(group.id)
                const isEditing = editingGroupId === group.id

                return (
                  <Box
                    key={group.id}
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
                      <GroupIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                      {isEditing ? (
                        <TextField
                          size="small"
                          value={editingGroupName}
                          onChange={(e) => { setEditingGroupName(e.target.value); setEditError('') }}
                          onKeyDown={handleEditKeyPress}
                          error={!!editError}
                          autoFocus
                          sx={{ flex: 1 }}
                        />
                      ) : (
                        <>
                          <Chip label={group.name} variant="outlined" size="small" sx={{ fontWeight: 500, borderRadius: 1 }} />
                          <Typography
                            variant="body2"
                            color="primary"
                            onClick={() => onGroupClick && onGroupClick(group.id)}
                            sx={{
                              fontWeight: 500,
                              ml: 'auto',
                              cursor: onGroupClick ? 'pointer' : 'default',
                              '&:hover': onGroupClick ? { textDecoration: 'underline' } : {},
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
                          <IconButton size="small" onClick={() => handleStartEdit(group)} sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" onClick={() => handleDeleteGroup(group.id)} sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}>
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

export default ManageGroupsPanel

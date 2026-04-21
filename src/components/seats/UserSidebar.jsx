import { useState } from 'react'
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Stack,
  Collapse,
  Tooltip,
  Alert,
} from '@mui/material'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import GroupIcon from '@mui/icons-material/Group'
import AddIcon from '@mui/icons-material/Add'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

function UserSidebar({
  roles,
  groups,
  users,
  sidebarFilter,
  onFilterChange,
  onRolesChange,
  onGroupsChange,
}) {
  // Section expand/collapse state
  const [rolesExpanded, setRolesExpanded] = useState(true)
  const [groupsExpanded, setGroupsExpanded] = useState(true)

  // Create mode state
  const [createRoleMode, setCreateRoleMode] = useState(false)
  const [createGroupMode, setCreateGroupMode] = useState(false)
  const [newRoleName, setNewRoleName] = useState('')
  const [newGroupName, setNewGroupName] = useState('')
  const [createError, setCreateError] = useState('')

  // Edit mode state
  const [editingRoleId, setEditingRoleId] = useState(null)
  const [editingGroupId, setEditingGroupId] = useState(null)
  const [editName, setEditName] = useState('')
  const [editError, setEditError] = useState('')

  // Helper functions
  const getUserCountForRole = (roleId) =>
    users.filter((u) => u.role === roleId).length

  const getUserCountForGroup = (groupId) =>
    users.filter((u) => u.groups?.includes(groupId)).length

  const isFilterActive = (type, id) =>
    sidebarFilter.type === type && sidebarFilter.id === id

  const handleFilterClick = (type, id) => {
    if (isFilterActive(type, id)) {
      onFilterChange({ type: null, id: null }) // Clear filter
    } else {
      onFilterChange({ type, id }) // Set filter
    }
  }

  // Role CRUD handlers
  const handleCreateRole = () => {
    if (!newRoleName.trim()) {
      setCreateError('Role name is required')
      return
    }
    const label = `Custom: ${newRoleName.trim()}`
    if (roles.some((r) => r.label.toLowerCase() === label.toLowerCase())) {
      setCreateError('Role name already exists')
      return
    }
    const newRole = {
      id: `custom-${Date.now()}`,
      label,
    }
    onRolesChange([...roles, newRole])
    setNewRoleName('')
    setCreateRoleMode(false)
    setCreateError('')
  }

  const handleEditRole = (role) => {
    setEditingRoleId(role.id)
    setEditName(role.label.replace('Custom: ', ''))
    setEditError('')
  }

  const handleSaveRoleEdit = () => {
    if (!editName.trim()) {
      setEditError('Role name is required')
      return
    }
    const newLabel = `Custom: ${editName.trim()}`
    if (roles.some((r) => r.id !== editingRoleId && r.label.toLowerCase() === newLabel.toLowerCase())) {
      setEditError('Role name already exists')
      return
    }
    onRolesChange(
      roles.map((r) => (r.id === editingRoleId ? { ...r, label: newLabel } : r))
    )
    setEditingRoleId(null)
    setEditName('')
    setEditError('')
  }

  const handleDeleteRole = (roleId) => {
    const userCount = getUserCountForRole(roleId)
    const msg = userCount > 0
      ? `This role is assigned to ${userCount} user(s). They will be unassigned. Continue?`
      : 'Delete this role?'
    if (window.confirm(msg)) {
      onRolesChange(roles.filter((r) => r.id !== roleId))
      if (sidebarFilter.type === 'role' && sidebarFilter.id === roleId) {
        onFilterChange({ type: null, id: null })
      }
    }
  }

  // Group CRUD handlers
  const handleCreateGroup = () => {
    if (!newGroupName.trim()) {
      setCreateError('Group name is required')
      return
    }
    if (groups.some((g) => g.name.toLowerCase() === newGroupName.trim().toLowerCase())) {
      setCreateError('Group name already exists')
      return
    }
    const newGroup = {
      id: Math.max(...groups.map((g) => g.id), 0) + 1,
      name: newGroupName.trim(),
    }
    onGroupsChange([...groups, newGroup])
    setNewGroupName('')
    setCreateGroupMode(false)
    setCreateError('')
  }

  const handleEditGroup = (group) => {
    setEditingGroupId(group.id)
    setEditName(group.name)
    setEditError('')
  }

  const handleSaveGroupEdit = () => {
    if (!editName.trim()) {
      setEditError('Group name is required')
      return
    }
    if (groups.some((g) => g.id !== editingGroupId && g.name.toLowerCase() === editName.trim().toLowerCase())) {
      setEditError('Group name already exists')
      return
    }
    onGroupsChange(
      groups.map((g) => (g.id === editingGroupId ? { ...g, name: editName.trim() } : g))
    )
    setEditingGroupId(null)
    setEditName('')
    setEditError('')
  }

  const handleDeleteGroup = (groupId) => {
    const userCount = getUserCountForGroup(groupId)
    const msg = userCount > 0
      ? `This group has ${userCount} user(s). They will be removed from this group. Continue?`
      : 'Delete this group?'
    if (window.confirm(msg)) {
      onGroupsChange(groups.filter((g) => g.id !== groupId))
      if (sidebarFilter.type === 'group' && sidebarFilter.id === groupId) {
        onFilterChange({ type: null, id: null })
      }
    }
  }

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action()
    } else if (e.key === 'Escape') {
      setCreateRoleMode(false)
      setCreateGroupMode(false)
      setEditingRoleId(null)
      setEditingGroupId(null)
      setNewRoleName('')
      setNewGroupName('')
      setEditName('')
      setCreateError('')
      setEditError('')
    }
  }

  const isOOTBRole = (roleId) => roleId.startsWith('explore-')

  return (
    <Box
      sx={{
        width: 260,
        minWidth: 260,
        height: '100%',
        borderRight: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* All Users option */}
      <Box sx={{ p: 2, pb: 1 }}>
        <Box
          onClick={() => onFilterChange({ type: null, id: null })}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: 1.5,
            py: 1,
            borderRadius: 1,
            cursor: 'pointer',
            backgroundColor: !sidebarFilter.type ? 'action.selected' : 'transparent',
            color: !sidebarFilter.type ? 'primary.main' : 'text.primary',
            fontWeight: !sidebarFilter.type ? 600 : 400,
            '&:hover': { backgroundColor: !sidebarFilter.type ? 'action.selected' : 'action.hover' },
          }}
        >
          <GroupOutlinedIcon sx={{ fontSize: 20 }} />
          <Typography variant="body2" sx={{ fontWeight: 'inherit' }}>
            All Users
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
            {users.length}
          </Typography>
        </Box>
      </Box>

      {/* Scrollable content */}
      <Box sx={{ flex: 1, overflow: 'auto', px: 2 }}>
        {/* Roles section */}
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              py: 1,
            }}
          >
            <Box
              onClick={() => setRolesExpanded(!rolesExpanded)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                cursor: 'pointer',
                '&:hover': { color: 'primary.main' },
              }}
            >
              {rolesExpanded ? (
                <ExpandLessIcon sx={{ fontSize: 18 }} />
              ) : (
                <ExpandMoreIcon sx={{ fontSize: 18 }} />
              )}
              <Typography variant="caption" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Roles
              </Typography>
            </Box>
            <Tooltip title="Create role">
              <IconButton
                size="small"
                onClick={() => {
                  setCreateRoleMode(true)
                  setCreateError('')
                }}
                sx={{ width: 24, height: 24 }}
              >
                <AddIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          </Box>

          <Collapse in={rolesExpanded}>
            <Stack spacing={0.5}>
              {/* Create role input */}
              {createRoleMode && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, pl: 1 }}>
                  <TextField
                    size="small"
                    placeholder="Role name"
                    value={newRoleName}
                    onChange={(e) => {
                      setNewRoleName(e.target.value)
                      setCreateError('')
                    }}
                    onKeyDown={(e) => handleKeyPress(e, handleCreateRole)}
                    autoFocus
                    error={!!createError}
                    sx={{ flex: 1, '& .MuiInputBase-input': { py: 0.75, fontSize: 13 } }}
                    InputProps={{
                      startAdornment: (
                        <Typography variant="caption" color="text.secondary" sx={{ mr: 0.5 }}>
                          Custom:
                        </Typography>
                      ),
                    }}
                  />
                  <IconButton size="small" onClick={handleCreateRole} sx={{ color: 'success.main' }}>
                    <CheckIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => {
                      setCreateRoleMode(false)
                      setNewRoleName('')
                      setCreateError('')
                    }}
                  >
                    <CloseIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Box>
              )}

              {/* Role items */}
              {roles.map((role) => {
                const isActive = isFilterActive('role', role.id)
                const isOOTB = isOOTBRole(role.id)
                const isEditing = editingRoleId === role.id
                const userCount = getUserCountForRole(role.id)

                if (isEditing) {
                  return (
                    <Box key={role.id} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, pl: 1 }}>
                      <TextField
                        size="small"
                        value={editName}
                        onChange={(e) => {
                          setEditName(e.target.value)
                          setEditError('')
                        }}
                        onKeyDown={(e) => handleKeyPress(e, handleSaveRoleEdit)}
                        autoFocus
                        error={!!editError}
                        sx={{ flex: 1, '& .MuiInputBase-input': { py: 0.75, fontSize: 13 } }}
                        InputProps={{
                          startAdornment: (
                            <Typography variant="caption" color="text.secondary" sx={{ mr: 0.5 }}>
                              Custom:
                            </Typography>
                          ),
                        }}
                      />
                      <IconButton size="small" onClick={handleSaveRoleEdit} sx={{ color: 'success.main' }}>
                        <CheckIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => {
                          setEditingRoleId(null)
                          setEditName('')
                          setEditError('')
                        }}
                      >
                        <CloseIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>
                  )
                }

                return (
                  <Box
                    key={role.id}
                    onClick={() => handleFilterClick('role', role.id)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 1.5,
                      py: 0.75,
                      borderRadius: 1,
                      cursor: 'pointer',
                      backgroundColor: isActive ? 'action.selected' : 'transparent',
                      color: isActive ? 'primary.main' : 'text.primary',
                      '&:hover': {
                        backgroundColor: isActive ? 'action.selected' : 'action.hover',
                        '& .action-icons': { opacity: 1 },
                      },
                    }}
                  >
                    <BadgeOutlinedIcon sx={{ fontSize: 18, color: isActive ? 'primary.main' : 'text.secondary' }} />
                    <Typography
                      variant="body2"
                      sx={{
                        flex: 1,
                        fontWeight: isActive ? 600 : 400,
                        fontSize: 13,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {role.label}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {userCount}
                    </Typography>
                    {isOOTB ? (
                      <Tooltip title="OOTB role (locked)">
                        <LockOutlinedIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                      </Tooltip>
                    ) : (
                      <Stack
                        direction="row"
                        spacing={0}
                        className="action-icons"
                        sx={{ opacity: 0, transition: 'opacity 0.15s' }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <IconButton
                          size="small"
                          onClick={() => handleEditRole(role)}
                          sx={{ width: 22, height: 22, '&:hover': { color: 'primary.main' } }}
                        >
                          <EditIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteRole(role.id)}
                          sx={{ width: 22, height: 22, '&:hover': { color: 'error.main' } }}
                        >
                          <DeleteIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                      </Stack>
                    )}
                  </Box>
                )
              })}
            </Stack>
          </Collapse>
        </Box>

        {/* Groups section */}
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              py: 1,
            }}
          >
            <Box
              onClick={() => setGroupsExpanded(!groupsExpanded)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                cursor: 'pointer',
                '&:hover': { color: 'primary.main' },
              }}
            >
              {groupsExpanded ? (
                <ExpandLessIcon sx={{ fontSize: 18 }} />
              ) : (
                <ExpandMoreIcon sx={{ fontSize: 18 }} />
              )}
              <Typography variant="caption" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Groups
              </Typography>
            </Box>
            <Tooltip title="Create group">
              <IconButton
                size="small"
                onClick={() => {
                  setCreateGroupMode(true)
                  setCreateError('')
                }}
                sx={{ width: 24, height: 24 }}
              >
                <AddIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          </Box>

          <Collapse in={groupsExpanded}>
            <Stack spacing={0.5}>
              {/* Create group input */}
              {createGroupMode && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, pl: 1 }}>
                  <TextField
                    size="small"
                    placeholder="Group name"
                    value={newGroupName}
                    onChange={(e) => {
                      setNewGroupName(e.target.value)
                      setCreateError('')
                    }}
                    onKeyDown={(e) => handleKeyPress(e, handleCreateGroup)}
                    autoFocus
                    error={!!createError}
                    sx={{ flex: 1, '& .MuiInputBase-input': { py: 0.75, fontSize: 13 } }}
                  />
                  <IconButton size="small" onClick={handleCreateGroup} sx={{ color: 'success.main' }}>
                    <CheckIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => {
                      setCreateGroupMode(false)
                      setNewGroupName('')
                      setCreateError('')
                    }}
                  >
                    <CloseIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Box>
              )}

              {/* Group items */}
              {groups.map((group) => {
                const isActive = isFilterActive('group', group.id)
                const isEditing = editingGroupId === group.id
                const userCount = getUserCountForGroup(group.id)

                if (isEditing) {
                  return (
                    <Box key={group.id} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, pl: 1 }}>
                      <TextField
                        size="small"
                        value={editName}
                        onChange={(e) => {
                          setEditName(e.target.value)
                          setEditError('')
                        }}
                        onKeyDown={(e) => handleKeyPress(e, handleSaveGroupEdit)}
                        autoFocus
                        error={!!editError}
                        sx={{ flex: 1, '& .MuiInputBase-input': { py: 0.75, fontSize: 13 } }}
                      />
                      <IconButton size="small" onClick={handleSaveGroupEdit} sx={{ color: 'success.main' }}>
                        <CheckIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => {
                          setEditingGroupId(null)
                          setEditName('')
                          setEditError('')
                        }}
                      >
                        <CloseIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>
                  )
                }

                return (
                  <Box
                    key={group.id}
                    onClick={() => handleFilterClick('group', group.id)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 1.5,
                      py: 0.75,
                      borderRadius: 1,
                      cursor: 'pointer',
                      backgroundColor: isActive ? 'action.selected' : 'transparent',
                      color: isActive ? 'primary.main' : 'text.primary',
                      '&:hover': {
                        backgroundColor: isActive ? 'action.selected' : 'action.hover',
                        '& .action-icons': { opacity: 1 },
                      },
                    }}
                  >
                    <GroupIcon sx={{ fontSize: 18, color: isActive ? 'primary.main' : 'text.secondary' }} />
                    <Typography
                      variant="body2"
                      sx={{
                        flex: 1,
                        fontWeight: isActive ? 600 : 400,
                        fontSize: 13,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {group.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {userCount}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={0}
                      className="action-icons"
                      sx={{ opacity: 0, transition: 'opacity 0.15s' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <IconButton
                        size="small"
                        onClick={() => handleEditGroup(group)}
                        sx={{ width: 22, height: 22, '&:hover': { color: 'primary.main' } }}
                      >
                        <EditIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteGroup(group.id)}
                        sx={{ width: 22, height: 22, '&:hover': { color: 'error.main' } }}
                      >
                        <DeleteIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    </Stack>
                  </Box>
                )
              })}
            </Stack>
          </Collapse>
        </Box>

        {/* Error display */}
        {(createError || editError) && (
          <Alert severity="error" sx={{ mt: 1, py: 0, fontSize: 12 }}>
            {createError || editError}
          </Alert>
        )}
      </Box>
    </Box>
  )
}

export default UserSidebar

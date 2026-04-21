import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Stack,
  IconButton,
  Avatar,
  Snackbar,
  Tabs,
  Tab,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Indicator from '../components/core/Indicator'
import UserProfileTab from '../components/seats/UserProfileTab'
import UserAccessTab from '../components/seats/UserAccessTab'
import UserWorkspacesTab from '../components/seats/UserWorkspacesTab'
import {
  INITIAL_ROLES,
  INITIAL_GROUPS,
  INITIAL_USERS_V5,
  INITIAL_INTERNAL_USERS_V5,
  WORKSPACES,
} from '../data/seatsData'

const TAB_CONFIG = [
  { id: 'profile', label: 'Profile' },
  { id: 'access', label: 'Access & Permissions' },
  { id: 'workspaces', label: 'Workspaces' },
]

function UserDetailPageV9() {
  const { userId, tab } = useParams()
  const navigate = useNavigate()

  // Data state
  const [users, setUsers] = useState(INITIAL_USERS_V5)
  const [internalUsers, setInternalUsers] = useState(INITIAL_INTERNAL_USERS_V5)
  const [roles] = useState(INITIAL_ROLES)
  const [groups] = useState(INITIAL_GROUPS)

  // Find user
  const user = useMemo(() => {
    const id = parseInt(userId, 10)
    return users.find((u) => u.id === id) || internalUsers.find((u) => u.id === id)
  }, [users, internalUsers, userId])

  const isInternalUser = useMemo(() => {
    const id = parseInt(userId, 10)
    return internalUsers.some((u) => u.id === id)
  }, [internalUsers, userId])

  // Local edit state
  const [localUser, setLocalUser] = useState(null)
  const [hasChanges, setHasChanges] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

  // Tab state
  const currentTabIndex = useMemo(() => {
    const tabIndex = TAB_CONFIG.findIndex((t) => t.id === tab)
    return tabIndex >= 0 ? tabIndex : 0
  }, [tab])

  // Sync local state when user changes
  useEffect(() => {
    if (user) {
      setLocalUser({ ...user })
      setHasChanges(false)
    }
  }, [user])

  // Tab change handler
  const handleTabChange = (event, newValue) => {
    const newTab = TAB_CONFIG[newValue].id
    navigate(`/seats-v9/users/${userId}/${newTab}`, { replace: true })
  }

  // Profile tab handlers
  const handleSeatChange = (newSeatType, newRole) => {
    setLocalUser((prev) => ({
      ...prev,
      seatType: newSeatType,
      role: newRole,
    }))
    setHasChanges(true)
  }

  const handleRoleChange = (newRole) => {
    setLocalUser((prev) => ({
      ...prev,
      role: newRole,
    }))
    setHasChanges(true)
  }

  const handleRemoveGroup = (groupId) => {
    setLocalUser((prev) => ({
      ...prev,
      groups: prev.groups.filter((id) => id !== groupId),
    }))
    setHasChanges(true)
  }

  const handleAddGroup = (groupId) => {
    if (localUser.groups.includes(groupId)) return
    setLocalUser((prev) => ({
      ...prev,
      groups: [...prev.groups, groupId],
    }))
    setHasChanges(true)
  }

  // Access tab handlers
  const handleAddOverride = (override) => {
    setLocalUser((prev) => ({
      ...prev,
      permissionOverrides: {
        ...prev.permissionOverrides,
        [override.productId]: override.level,
      },
    }))
    setHasChanges(true)
  }

  const handleRemoveOverride = (productId) => {
    setLocalUser((prev) => {
      const newOverrides = { ...prev.permissionOverrides }
      delete newOverrides[productId]
      return {
        ...prev,
        permissionOverrides: newOverrides,
      }
    })
    setHasChanges(true)
  }

  // Workspaces tab handlers
  const handleUpdateWorkspaceRole = (workspaceId, newRole) => {
    setLocalUser((prev) => ({
      ...prev,
      workspaceAssignments: prev.workspaceAssignments.map((ws) =>
        ws.workspaceId === workspaceId ? { ...ws, role: newRole } : ws
      ),
    }))
    setHasChanges(true)
  }

  const handleRemoveWorkspace = (workspaceId) => {
    setLocalUser((prev) => ({
      ...prev,
      workspaceAssignments: prev.workspaceAssignments.filter(
        (ws) => ws.workspaceId !== workspaceId
      ),
    }))
    setHasChanges(true)
  }

  const handleAddWorkspace = (workspaceId) => {
    if (localUser.workspaceAssignments?.some((ws) => ws.workspaceId === workspaceId)) return
    setLocalUser((prev) => ({
      ...prev,
      workspaceAssignments: [
        ...(prev.workspaceAssignments || []),
        { workspaceId, role: null, accessLevel: 'full' },
      ],
    }))
    setHasChanges(true)
  }

  // Save changes
  const handleSave = () => {
    if (!localUser || !hasChanges) return
    const setterFn = isInternalUser ? setInternalUsers : setUsers
    setterFn((prev) =>
      prev.map((u) => (u.id === localUser.id ? localUser : u))
    )
    setHasChanges(false)
    setSnackbar({ open: true, message: 'User updated successfully' })
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

  if (!user || !localUser) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>User not found</Typography>
        <Button onClick={() => navigate('/seats-v9')} sx={{ mt: 2 }}>
          Back to Users
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', backgroundColor: 'grey.50' }}>
      {/* Page Header */}
      <Box
        sx={{
          backgroundColor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          px: 3,
          py: 2,
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton size="small" onClick={() => navigate('/seats-v9')} sx={{ color: 'text.primary' }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Edit User
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              onClick={() => navigate('/seats-v9')}
              sx={{ textTransform: 'none', fontWeight: 500 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={!hasChanges}
              sx={{ textTransform: 'none', fontWeight: 500 }}
            >
              Save Changes
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* User Identity Bar */}
      <Box
        sx={{
          backgroundColor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          px: 3,
          py: 2,
        }}
      >
        <Stack direction="row" spacing={3} alignItems="center">
          <Avatar
            sx={{
              width: 48,
              height: 48,
              bgcolor: 'primary.main',
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            {getInitials(localUser.name)}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
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
          {isInternalUser && (
            <Chip label="Internal" size="small" variant="outlined" color="secondary" />
          )}
        </Stack>
      </Box>

      {/* Tabs */}
      <Box
        sx={{
          backgroundColor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          px: 3,
        }}
      >
        <Tabs
          value={currentTabIndex}
          onChange={handleTabChange}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              minHeight: 48,
            },
          }}
        >
          {TAB_CONFIG.map((tabItem) => (
            <Tab key={tabItem.id} label={tabItem.label} />
          ))}
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
        {currentTabIndex === 0 && (
          <UserProfileTab
            localUser={localUser}
            roles={roles}
            groups={groups}
            onSeatChange={handleSeatChange}
            onRoleChange={handleRoleChange}
            onAddGroup={handleAddGroup}
            onRemoveGroup={handleRemoveGroup}
          />
        )}
        {currentTabIndex === 1 && (
          <UserAccessTab
            localUser={localUser}
            onAddOverride={handleAddOverride}
            onRemoveOverride={handleRemoveOverride}
          />
        )}
        {currentTabIndex === 2 && (
          <UserWorkspacesTab
            localUser={localUser}
            roles={roles}
            onUpdateWorkspaceRole={handleUpdateWorkspaceRole}
            onRemoveWorkspace={handleRemoveWorkspace}
            onAddWorkspace={handleAddWorkspace}
          />
        )}
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Box>
  )
}

export default UserDetailPageV9

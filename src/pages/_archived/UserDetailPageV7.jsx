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
  Divider,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Snackbar,
  TextField,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AddIcon from '@mui/icons-material/Add'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import Indicator from '../components/core/Indicator'
import AddPermissionOverrideDialog from '../components/seats/AddPermissionOverrideDialog'
import {
  INITIAL_ROLES,
  INITIAL_GROUPS,
  INITIAL_USERS_V5,
  INITIAL_INTERNAL_USERS_V5,
  WORKSPACES,
  PRODUCTS,
  canAssignRole,
} from '../data/seatsData'

const SEAT_TYPES = [
  { id: 'admin', label: 'Admin' },
  { id: 'standard', label: 'Standard' },
  { id: 'view-only', label: 'View-Only' },
  { id: 'no-access', label: 'No Access' },
]

function UserDetailPageV7() {
  const { userId } = useParams()
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

  // Override dialog state
  const [overrideDialogOpen, setOverrideDialogOpen] = useState(false)

  // Sync local state when user changes
  useEffect(() => {
    if (user) {
      setLocalUser({ ...user })
      setHasChanges(false)
    }
  }, [user])

  // Handle field changes
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

  const handleRoleChange = (e) => {
    setLocalUser((prev) => ({
      ...prev,
      role: e.target.value || null,
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

  // Permission override handlers
  const handleAddOverride = (override) => {
    setLocalUser((prev) => ({
      ...prev,
      permissionOverrides: {
        ...prev.permissionOverrides,
        [override.productId]: override.level,
      },
    }))
    setHasChanges(true)
    setOverrideDialogOpen(false)
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

  // Get helpers
  const getGroupName = (groupId) => groups.find((g) => g.id === groupId)?.name || ''
  const getWorkspaceName = (wsId) => WORKSPACES.find((ws) => ws.id === wsId)?.name || ''
  const getRoleLabel = (roleId) => roles.find((r) => r.id === roleId)?.label || 'None'
  const getProductLabel = (productId) => PRODUCTS.find((p) => p.id === productId)?.label || productId

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
  const availableGroups = groups.filter((g) => !localUser?.groups?.includes(g.id))
  const overrideCount = localUser ? Object.keys(localUser.permissionOverrides || {}).length : 0

  if (!user || !localUser) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>User not found</Typography>
        <Button onClick={() => navigate('/seats-v7')} sx={{ mt: 2 }}>
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
            <IconButton size="small" onClick={() => navigate('/seats-v7')} sx={{ color: 'text.primary' }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Edit User
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              onClick={() => navigate('/seats-v7')}
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

      {/* Main Content */}
      <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
        {/* User Identity Card */}
        <Paper sx={{ p: 3, mb: 3, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
          <Stack direction="row" spacing={3} alignItems="center">
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'primary.main',
                fontSize: 28,
                fontWeight: 600,
              }}
            >
              {getInitials(localUser.name)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {localUser.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {localUser.email}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
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
          </Stack>
        </Paper>

        {/* Basic Info Section */}
        <Paper sx={{ p: 3, mb: 3, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 3 }}>
            Basic Information
          </Typography>
          <Stack spacing={3}>
            <Stack direction="row" spacing={3}>
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
              </FormControl>
            </Stack>
            {!canEditRole && (
              <Typography variant="caption" color="text.secondary">
                Role assignment is not available for View-Only or No Access seat types.
              </Typography>
            )}
          </Stack>
        </Paper>

        {/* Groups Section */}
        <Paper sx={{ p: 3, mb: 3, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Groups
            </Typography>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <Select
                value=""
                displayEmpty
                onChange={(e) => handleAddGroup(e.target.value)}
                renderValue={() => (
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <AddIcon sx={{ fontSize: 18 }} />
                    <span>Add Group</span>
                  </Stack>
                )}
              >
                {availableGroups.length === 0 ? (
                  <MenuItem disabled>All groups assigned</MenuItem>
                ) : (
                  availableGroups.map((group) => (
                    <MenuItem key={group.id} value={group.id}>
                      {group.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Stack>
          {localUser.groups.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              No groups assigned
            </Typography>
          ) : (
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {localUser.groups.map((groupId) => (
                <Chip
                  key={groupId}
                  label={getGroupName(groupId)}
                  onDelete={() => handleRemoveGroup(groupId)}
                  variant="outlined"
                />
              ))}
            </Stack>
          )}
        </Paper>

        {/* Permission Overrides Section */}
        <Paper sx={{ p: 3, mb: 3, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Permission Overrides
              </Typography>
              {overrideCount > 0 && (
                <Chip label={overrideCount} size="small" sx={{ backgroundColor: 'grey.200' }} />
              )}
            </Stack>
            <Button
              variant="outlined"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => setOverrideDialogOpen(true)}
              sx={{ textTransform: 'none' }}
            >
              Add Override
            </Button>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Override specific product permissions beyond what the role provides.
          </Typography>
          {overrideCount === 0 ? (
            <Box
              sx={{
                py: 4,
                textAlign: 'center',
                backgroundColor: 'grey.50',
                borderRadius: 1,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                No permission overrides configured
              </Typography>
              <Button
                variant="text"
                size="small"
                startIcon={<AddIcon />}
                onClick={() => setOverrideDialogOpen(true)}
                sx={{ mt: 1, textTransform: 'none' }}
              >
                Add your first override
              </Button>
            </Box>
          ) : (
            <Stack spacing={1}>
              {Object.entries(localUser.permissionOverrides || {}).map(([productId, level]) => (
                <Box
                  key={productId}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 1.5,
                    backgroundColor: 'grey.50',
                    borderRadius: 1,
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {getProductLabel(productId)}
                    </Typography>
                    <Chip
                      label={level}
                      size="small"
                      color={level === 'Admin' ? 'primary' : level === 'View' ? 'default' : 'error'}
                      variant="outlined"
                    />
                  </Stack>
                  <IconButton size="small" onClick={() => handleRemoveOverride(productId)}>
                    <DeleteOutlinedIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Box>
              ))}
            </Stack>
          )}
        </Paper>

        {/* Workspace Assignments Section */}
        <Paper sx={{ p: 3, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Workspace Assignments
              </Typography>
              {localUser.workspaceAssignments?.length > 0 && (
                <Chip label={localUser.workspaceAssignments.length} size="small" sx={{ backgroundColor: 'grey.200' }} />
              )}
            </Stack>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Manage which workspaces this user has access to and their workspace-specific roles.
          </Typography>
          {(!localUser.workspaceAssignments || localUser.workspaceAssignments.length === 0) ? (
            <Box
              sx={{
                py: 4,
                textAlign: 'center',
                backgroundColor: 'grey.50',
                borderRadius: 1,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                No workspace assignments
              </Typography>
            </Box>
          ) : (
            <Stack spacing={1}>
              {localUser.workspaceAssignments.map((ws) => (
                <Box
                  key={ws.workspaceId}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 1.5,
                    backgroundColor: 'grey.50',
                    borderRadius: 1,
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {getWorkspaceName(ws.workspaceId)}
                    </Typography>
                    {ws.role && (
                      <Chip
                        label={getRoleLabel(ws.role)}
                        size="small"
                        variant="outlined"
                      />
                    )}
                    {ws.accessLevel && (
                      <Chip
                        label={ws.accessLevel}
                        size="small"
                        sx={{ backgroundColor: ws.accessLevel === 'full' ? 'success.light' : 'grey.200', color: ws.accessLevel === 'full' ? 'success.dark' : 'text.secondary' }}
                      />
                    )}
                  </Stack>
                </Box>
              ))}
            </Stack>
          )}
        </Paper>
      </Box>

      {/* Add Override Dialog */}
      <AddPermissionOverrideDialog
        open={overrideDialogOpen}
        onClose={() => setOverrideDialogOpen(false)}
        onAdd={handleAddOverride}
        existingOverrides={localUser.permissionOverrides || {}}
        userRole={localUser.role}
      />

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

export default UserDetailPageV7

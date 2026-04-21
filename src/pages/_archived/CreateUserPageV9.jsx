import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  IconButton,
  Snackbar,
  Tabs,
  Tab,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Chip,
  Alert,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AddIcon from '@mui/icons-material/Add'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import AddPermissionOverrideDialog from '../components/seats/AddPermissionOverrideDialog'
import {
  INITIAL_ROLES,
  INITIAL_GROUPS,
  WORKSPACES,
  PRODUCTS,
  canAssignRole,
} from '../data/seatsData'

const TAB_CONFIG = [
  { id: 'profile', label: 'Profile' },
  { id: 'access', label: 'Access & Permissions' },
  { id: 'workspaces', label: 'Workspaces' },
]

const SEAT_TYPES = [
  { id: 'admin', label: 'Admin' },
  { id: 'standard', label: 'Standard' },
  { id: 'view-only', label: 'View-Only' },
  { id: 'no-access', label: 'No Access' },
]

function CreateUserPageV9() {
  const navigate = useNavigate()

  // Data state
  const [roles] = useState(INITIAL_ROLES)
  const [groups] = useState(INITIAL_GROUPS)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    seatType: 'standard',
    role: null,
    groups: [],
    permissionOverrides: {},
    workspaceAssignments: [],
  })

  const [errors, setErrors] = useState({})
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  // Tab state
  const [currentTabIndex, setCurrentTabIndex] = useState(0)

  // Override dialog state
  const [overrideDialogOpen, setOverrideDialogOpen] = useState(false)

  // Validation
  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Tab change handler
  const handleTabChange = (event, newValue) => {
    setCurrentTabIndex(newValue)
  }

  // Profile tab handlers
  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }))
    }
  }

  const handleSeatChange = (e) => {
    const newSeatType = e.target.value
    const newRole = canAssignRole(newSeatType) ? formData.role : null
    setFormData((prev) => ({
      ...prev,
      seatType: newSeatType,
      role: newRole,
    }))
  }

  const handleRoleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      role: e.target.value || null,
    }))
  }

  const handleAddGroup = (groupId) => {
    if (formData.groups.includes(groupId)) return
    setFormData((prev) => ({
      ...prev,
      groups: [...prev.groups, groupId],
    }))
  }

  const handleRemoveGroup = (groupId) => {
    setFormData((prev) => ({
      ...prev,
      groups: prev.groups.filter((id) => id !== groupId),
    }))
  }

  // Access tab handlers
  const handleAddOverride = (override) => {
    setFormData((prev) => ({
      ...prev,
      permissionOverrides: {
        ...prev.permissionOverrides,
        [override.productId]: override.level,
      },
    }))
    setOverrideDialogOpen(false)
  }

  const handleRemoveOverride = (productId) => {
    setFormData((prev) => {
      const newOverrides = { ...prev.permissionOverrides }
      delete newOverrides[productId]
      return {
        ...prev,
        permissionOverrides: newOverrides,
      }
    })
  }

  // Workspaces tab handlers
  const handleAddWorkspace = (workspaceId) => {
    if (formData.workspaceAssignments.some((ws) => ws.workspaceId === workspaceId)) return
    setFormData((prev) => ({
      ...prev,
      workspaceAssignments: [
        ...prev.workspaceAssignments,
        { workspaceId, role: null, accessLevel: 'full' },
      ],
    }))
  }

  const handleUpdateWorkspaceRole = (workspaceId, newRole) => {
    setFormData((prev) => ({
      ...prev,
      workspaceAssignments: prev.workspaceAssignments.map((ws) =>
        ws.workspaceId === workspaceId ? { ...ws, role: newRole } : ws
      ),
    }))
  }

  const handleRemoveWorkspace = (workspaceId) => {
    setFormData((prev) => ({
      ...prev,
      workspaceAssignments: prev.workspaceAssignments.filter(
        (ws) => ws.workspaceId !== workspaceId
      ),
    }))
  }

  // Save handler
  const handleCreate = () => {
    if (!validateForm()) {
      setSnackbar({ open: true, message: 'Please fix the errors before saving', severity: 'error' })
      setCurrentTabIndex(0) // Go back to profile tab to show errors
      return
    }

    // In a real app, this would call an API
    // For now, just show success and navigate back
    setSnackbar({ open: true, message: `${formData.name} has been created`, severity: 'success' })
    setTimeout(() => {
      navigate('/seats-v9')
    }, 1500)
  }

  // Helpers
  const canEditRole = canAssignRole(formData.seatType)
  const availableGroups = groups.filter((g) => !formData.groups.includes(g.id))
  const getGroupName = (groupId) => groups.find((g) => g.id === groupId)?.name || ''
  const getWorkspaceName = (wsId) => WORKSPACES.find((ws) => ws.id === wsId)?.name || ''
  const getProductLabel = (productId) => PRODUCTS.find((p) => p.id === productId)?.label || productId
  const assignedWorkspaceIds = formData.workspaceAssignments.map((ws) => ws.workspaceId)
  const availableWorkspaces = WORKSPACES.filter((ws) => !assignedWorkspaceIds.includes(ws.id))
  const overrideCount = Object.keys(formData.permissionOverrides).length

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
              Add User
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
              color="secondary"
              onClick={handleCreate}
              sx={{ textTransform: 'none', fontWeight: 500 }}
            >
              Save
            </Button>
          </Stack>
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
        {/* Profile Tab */}
        {currentTabIndex === 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* User Details Section */}
            <Paper sx={{ p: 3, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 3 }}>
                User Details
              </Typography>
              <Stack spacing={3}>
                <Stack direction="row" spacing={3}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Full Name"
                    value={formData.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    error={!!errors.name}
                    helperText={errors.name}
                    required
                  />
                  <TextField
                    fullWidth
                    size="small"
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                  />
                </Stack>
              </Stack>
            </Paper>

            {/* Basic Info Section */}
            <Paper sx={{ p: 3, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 3 }}>
                Access Level
              </Typography>
              <Stack spacing={3}>
                <Stack direction="row" spacing={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Seat Type</InputLabel>
                    <Select
                      value={formData.seatType}
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
                      value={formData.role || ''}
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
            <Paper sx={{ p: 3, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
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
              {formData.groups.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  No groups assigned
                </Typography>
              ) : (
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {formData.groups.map((groupId) => (
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
          </Box>
        )}

        {/* Access Tab */}
        {currentTabIndex === 1 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Alert severity="info" sx={{ mb: 1 }}>
              Permission overrides will take effect after the user is created. The user's effective permissions are determined by their seat type and role.
            </Alert>

            {/* Permission Overrides Section */}
            <Paper sx={{ p: 3, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
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
                  {Object.entries(formData.permissionOverrides).map(([productId, level]) => (
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

            {/* Add Override Dialog */}
            <AddPermissionOverrideDialog
              open={overrideDialogOpen}
              onClose={() => setOverrideDialogOpen(false)}
              onAdd={handleAddOverride}
              existingOverrides={formData.permissionOverrides}
              userRole={formData.role}
            />
          </Box>
        )}

        {/* Workspaces Tab */}
        {currentTabIndex === 2 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Workspace Assignments Section */}
            <Paper sx={{ p: 3, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Workspace Assignments
                  </Typography>
                  {formData.workspaceAssignments.length > 0 && (
                    <Chip
                      label={formData.workspaceAssignments.length}
                      size="small"
                      sx={{ backgroundColor: 'grey.200' }}
                    />
                  )}
                </Stack>
                <FormControl size="small" sx={{ minWidth: 180 }}>
                  <Select
                    value=""
                    displayEmpty
                    onChange={(e) => handleAddWorkspace(e.target.value)}
                    renderValue={() => (
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <AddIcon sx={{ fontSize: 18 }} />
                        <span>Add Workspace</span>
                      </Stack>
                    )}
                  >
                    {availableWorkspaces.length === 0 ? (
                      <MenuItem disabled>All workspaces assigned</MenuItem>
                    ) : (
                      availableWorkspaces.map((workspace) => (
                        <MenuItem key={workspace.id} value={workspace.id}>
                          {workspace.name}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Assign this user to workspaces and set their workspace-specific roles.
              </Typography>

              {formData.workspaceAssignments.length === 0 ? (
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
                  <Button
                    variant="text"
                    size="small"
                    startIcon={<AddIcon />}
                    sx={{ mt: 1, textTransform: 'none' }}
                    onClick={() => {
                      if (availableWorkspaces.length > 0) {
                        handleAddWorkspace(availableWorkspaces[0].id)
                      }
                    }}
                    disabled={availableWorkspaces.length === 0}
                  >
                    Add first workspace
                  </Button>
                </Box>
              ) : (
                <Stack spacing={1}>
                  {formData.workspaceAssignments.map((ws) => (
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
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {getWorkspaceName(ws.workspaceId)}
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <FormControl size="small" sx={{ minWidth: 150 }}>
                          <Select
                            value={ws.role || ''}
                            displayEmpty
                            onChange={(e) => handleUpdateWorkspaceRole(ws.workspaceId, e.target.value || null)}
                          >
                            <MenuItem value="">
                              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                No role
                              </Typography>
                            </MenuItem>
                            {roles.map((role) => (
                              <MenuItem key={role.id} value={role.id}>
                                {role.label.replace('Explore+ ', '').replace(' User', '')}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <IconButton size="small" onClick={() => handleRemoveWorkspace(ws.workspaceId)}>
                          <DeleteOutlinedIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              )}
            </Paper>
          </Box>
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

export default CreateUserPageV9

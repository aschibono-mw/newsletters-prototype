import { useState, useMemo } from 'react'
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Stack,
  IconButton,
  Checkbox,
  Tabs,
  Tab,
  Tooltip,
  InputBase,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Alert,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditOutlined from '@mui/icons-material/EditOutlined'
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'
import SearchIcon from '@mui/icons-material/Search'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import GroupIcon from '@mui/icons-material/Group'
import CloseIcon from '@mui/icons-material/Close'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import Indicator from '../components/core/Indicator'
import UserSidebar from '../components/seats/UserSidebar'
import QuickRoleAssign from '../components/seats/QuickRoleAssign'
import QuickGroupsAssign from '../components/seats/QuickGroupsAssign'
import AddUserDialog from '../components/seats/AddUserDialog'
import BulkActionBar from '../components/seats/BulkActionBar'
import QuickBulkSeatChange from '../components/seats/QuickBulkSeatChange'
import QuickBulkRoleAssign from '../components/seats/QuickBulkRoleAssign'
import QuickBulkGroupsAssign from '../components/seats/QuickBulkGroupsAssign'
import PermissionOverridesPanel from '../components/seats/PermissionOverridesPanel'
import WorkspacePermissionsPanel from '../components/seats/WorkspacePermissionsPanel'
import {
  INITIAL_ROLES,
  INITIAL_GROUPS,
  INITIAL_USERS_V5,
  INITIAL_INTERNAL_USERS_V5,
  ENTITLEMENTS,
  WORKSPACES,
  canAssignRole,
  hasPermissionOverrides,
  getWorkspaceCount,
} from '../data/seatsData'

const SEAT_TYPES = [
  { id: 'admin', label: 'Admin', icon: <AdminPanelSettingsOutlinedIcon sx={{ fontSize: 20 }} /> },
  { id: 'standard', label: 'Standard', icon: <PersonOutlineIcon sx={{ fontSize: 20 }} /> },
  { id: 'view-only', label: 'View-Only', icon: <VisibilityOutlinedIcon sx={{ fontSize: 20 }} /> },
  { id: 'no-access', label: 'No Suite Access', icon: <BlockOutlinedIcon sx={{ fontSize: 20 }} /> },
]

function SeatsPageV5({ chatOpen = false }) {
  // Data state (using V5 data with permission overrides and workspace assignments)
  const [users, setUsers] = useState(INITIAL_USERS_V5)
  const [internalUsers, setInternalUsers] = useState(INITIAL_INTERNAL_USERS_V5)
  const [roles, setRoles] = useState(INITIAL_ROLES)
  const [groups, setGroups] = useState(INITIAL_GROUPS)

  // UI state
  const [tabValue, setTabValue] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

  // Sidebar filter state
  const [sidebarFilter, setSidebarFilter] = useState({ type: null, id: null })

  // Quick-assign popover state (single user)
  const [rolePopoverAnchor, setRolePopoverAnchor] = useState(null)
  const [rolePopoverUser, setRolePopoverUser] = useState(null)
  const [groupsPopoverAnchor, setGroupsPopoverAnchor] = useState(null)
  const [groupsPopoverUser, setGroupsPopoverUser] = useState(null)

  // Add/Edit user dialog state
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [isInternalUser, setIsInternalUser] = useState(false)

  // V5: Bulk action popover state
  const [bulkSeatAnchor, setBulkSeatAnchor] = useState(null)
  const [bulkRoleAnchor, setBulkRoleAnchor] = useState(null)
  const [bulkGroupsAnchor, setBulkGroupsAnchor] = useState(null)

  // V5: Permission overrides panel state
  const [permissionsPanelOpen, setPermissionsPanelOpen] = useState(false)
  const [permissionsPanelUser, setPermissionsPanelUser] = useState(null)

  // V5: Workspace permissions panel state
  const [workspacePanelOpen, setWorkspacePanelOpen] = useState(false)
  const [workspacePanelUser, setWorkspacePanelUser] = useState(null)

  // Calculate seat usage
  const seatUsage = useMemo(() => {
    const adminCount = users.filter((u) => u.seatType === 'admin').length
    const standardCount = users.filter((u) => u.seatType === 'standard').length
    const viewOnlyCount = users.filter((u) => u.seatType === 'view-only').length
    return {
      users: { used: adminCount + standardCount, limit: ENTITLEMENTS.users.limit },
      'view-only-users': { used: viewOnlyCount, limit: ENTITLEMENTS['view-only-users'].limit },
    }
  }, [users])

  // Filter users based on tab, search, and sidebar filter
  const filteredUsers = useMemo(() => {
    let result = tabValue === 0 ? users : internalUsers

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query)
      )
    }

    // Apply sidebar filter
    if (sidebarFilter.type === 'role') {
      result = result.filter((u) => u.role === sidebarFilter.id)
    } else if (sidebarFilter.type === 'group') {
      result = result.filter((u) => u.groups?.includes(sidebarFilter.id))
    } else if (sidebarFilter.type === 'seatType') {
      if (sidebarFilter.id === 'platform') {
        // Platform = Admin + Standard
        result = result.filter((u) => u.seatType === 'admin' || u.seatType === 'standard')
      } else if (sidebarFilter.id === 'view-only') {
        result = result.filter((u) => u.seatType === 'view-only')
      }
    }

    return result
  }, [users, internalUsers, tabValue, searchQuery, sidebarFilter])

  // Helper functions
  const getSeatTypeInfo = (id) => SEAT_TYPES.find((s) => s.id === id) || SEAT_TYPES[3]
  const getRoleLabel = (id) => roles.find((r) => r.id === id)?.label || '—'
  const getGroupNames = (groupIds) => {
    if (!groupIds || groupIds.length === 0) return []
    return groupIds.map((id) => groups.find((g) => g.id === id)?.name || '').filter(Boolean)
  }

  // Get selected user objects
  const getSelectedUserObjects = () => {
    const currentList = tabValue === 0 ? users : internalUsers
    return currentList.filter((u) => selectedUsers.includes(u.id))
  }

  // Selection handlers
  const handleSelectAll = (e) => {
    setSelectedUsers(e.target.checked ? filteredUsers.map((u) => u.id) : [])
  }
  const handleSelectOne = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  // Quick role assign handlers (single user)
  const handleRoleClick = (e, user) => {
    if (!canAssignRole(user.seatType)) return
    setRolePopoverAnchor(e.currentTarget)
    setRolePopoverUser(user)
  }

  const handleQuickRoleAssign = (roleId) => {
    if (!rolePopoverUser) return
    const setterFn = tabValue === 0 ? setUsers : setInternalUsers
    setterFn((prev) =>
      prev.map((u) =>
        u.id === rolePopoverUser.id ? { ...u, role: roleId } : u
      )
    )
    setSnackbar({ open: true, message: 'Role updated' })
    setRolePopoverAnchor(null)
    setRolePopoverUser(null)
  }

  // Quick groups assign handlers (single user)
  const handleGroupsClick = (e, user) => {
    setGroupsPopoverAnchor(e.currentTarget)
    setGroupsPopoverUser(user)
  }

  const handleQuickGroupsAssign = (groupIds) => {
    if (!groupsPopoverUser) return
    const setterFn = tabValue === 0 ? setUsers : setInternalUsers
    setterFn((prev) =>
      prev.map((u) =>
        u.id === groupsPopoverUser.id ? { ...u, groups: groupIds } : u
      )
    )
    setSnackbar({ open: true, message: 'Groups updated' })
    setGroupsPopoverAnchor(null)
    setGroupsPopoverUser(null)
  }

  // V5: Bulk action handlers
  const handleBulkSeatChange = (newSeatType) => {
    const setterFn = tabValue === 0 ? setUsers : setInternalUsers
    setterFn((prev) =>
      prev.map((u) =>
        selectedUsers.includes(u.id)
          ? {
              ...u,
              seatType: newSeatType,
              // Clear role if downgrading to view-only or no-access
              role: canAssignRole(newSeatType) ? u.role : null,
            }
          : u
      )
    )
    setSnackbar({ open: true, message: `${selectedUsers.length} users updated to ${getSeatTypeInfo(newSeatType).label}` })
    setBulkSeatAnchor(null)
    setSelectedUsers([])
  }

  const handleBulkRoleAssign = (roleId) => {
    const setterFn = tabValue === 0 ? setUsers : setInternalUsers
    setterFn((prev) =>
      prev.map((u) =>
        selectedUsers.includes(u.id) && canAssignRole(u.seatType)
          ? { ...u, role: roleId }
          : u
      )
    )
    const count = getSelectedUserObjects().filter((u) => canAssignRole(u.seatType)).length
    setSnackbar({ open: true, message: `Role assigned to ${count} users` })
    setBulkRoleAnchor(null)
    setSelectedUsers([])
  }

  const handleBulkGroupsAssign = (groupIds, mode = 'add') => {
    const setterFn = tabValue === 0 ? setUsers : setInternalUsers
    setterFn((prev) =>
      prev.map((u) => {
        if (!selectedUsers.includes(u.id)) return u
        const currentGroups = u.groups || []
        const newGroups = mode === 'replace'
          ? groupIds
          : [...new Set([...currentGroups, ...groupIds])]
        return { ...u, groups: newGroups }
      })
    )
    setSnackbar({ open: true, message: `Groups updated for ${selectedUsers.length} users` })
    setBulkGroupsAnchor(null)
    setSelectedUsers([])
  }

  // V5: Permission overrides panel handlers
  const openPermissionsPanel = (user) => {
    setPermissionsPanelUser(user)
    setPermissionsPanelOpen(true)
  }

  const handlePermissionsSave = (updatedOverrides) => {
    if (!permissionsPanelUser) return
    const setterFn = tabValue === 0 ? setUsers : setInternalUsers
    setterFn((prev) =>
      prev.map((u) =>
        u.id === permissionsPanelUser.id
          ? { ...u, permissionOverrides: updatedOverrides }
          : u
      )
    )
    setSnackbar({ open: true, message: 'Permissions updated' })
    setPermissionsPanelOpen(false)
    setPermissionsPanelUser(null)
  }

  // V5: Workspace permissions panel handlers
  const openWorkspacePanel = (user) => {
    setWorkspacePanelUser(user)
    setWorkspacePanelOpen(true)
  }

  const handleWorkspaceSave = (updatedAssignments) => {
    if (!workspacePanelUser) return
    const setterFn = tabValue === 0 ? setUsers : setInternalUsers
    setterFn((prev) =>
      prev.map((u) =>
        u.id === workspacePanelUser.id
          ? { ...u, workspaceAssignments: updatedAssignments }
          : u
      )
    )
    setSnackbar({ open: true, message: 'Workspace permissions updated' })
    setWorkspacePanelOpen(false)
    setWorkspacePanelUser(null)
  }

  // Add/Edit user handlers
  const openAddDialog = (internal = false) => {
    setEditingUser(null)
    setIsInternalUser(internal || tabValue === 1)
    setDialogOpen(true)
  }

  const openEditDialog = (user, internal = false) => {
    setEditingUser(user)
    setIsInternalUser(internal || tabValue === 1)
    setDialogOpen(true)
  }

  const handleSaveUser = (userData) => {
    const setterFn = isInternalUser ? setInternalUsers : setUsers
    const currentList = isInternalUser ? internalUsers : users

    if (editingUser) {
      setterFn((prev) =>
        prev.map((u) => (u.id === editingUser.id ? { ...u, ...userData } : u))
      )
      setSnackbar({ open: true, message: `${userData.name} updated` })
    } else {
      const newUser = {
        id: Math.max(...currentList.map((u) => u.id), isInternalUser ? 100 : 0) + 1,
        ...userData,
        status: 'Pending',
        lastActive: '—',
        permissionOverrides: {},
        workspaceAssignments: [],
      }
      setterFn((prev) => [...prev, newUser])
      setSnackbar({ open: true, message: `${userData.name} added` })
    }
  }

  // Delete user handler
  const handleDelete = (id, internal = false) => {
    const list = internal ? internalUsers : users
    const user = list.find((u) => u.id === id)
    if (window.confirm(`Delete ${user?.name}?`)) {
      if (internal) {
        setInternalUsers((prev) => prev.filter((u) => u.id !== id))
      } else {
        setUsers((prev) => prev.filter((u) => u.id !== id))
      }
      setSelectedUsers((prev) => prev.filter((x) => x !== id))
      setSnackbar({ open: true, message: `${user?.name} removed` })
    }
  }

  // Get filter label for display
  const getFilterLabel = () => {
    if (sidebarFilter.type === 'role') {
      return roles.find((r) => r.id === sidebarFilter.id)?.label
    }
    if (sidebarFilter.type === 'group') {
      return groups.find((g) => g.id === sidebarFilter.id)?.name
    }
    if (sidebarFilter.type === 'seatType') {
      return sidebarFilter.id === 'platform' ? 'Platform Users' : 'View-Only Users'
    }
    return null
  }

  // Get filter icon for display
  const getFilterIcon = () => {
    if (sidebarFilter.type === 'role') return <BadgeOutlinedIcon />
    if (sidebarFilter.type === 'group') return <GroupIcon />
    if (sidebarFilter.type === 'seatType') {
      return sidebarFilter.id === 'platform' ? <PersonOutlineIcon /> : <VisibilityOutlinedIcon />
    }
    return null
  }

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
      {/* Left Sidebar */}
      <UserSidebar
        roles={roles}
        groups={groups}
        users={[...users, ...internalUsers]}
        sidebarFilter={sidebarFilter}
        onFilterChange={setSidebarFilter}
        onRolesChange={setRoles}
        onGroupsChange={setGroups}
      />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: 'grey.100',
          overflow: 'auto',
          p: 3,
          pb: selectedUsers.length > 0 ? 10 : 3, // Extra padding when bulk bar is visible
        }}
      >
        <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
          {/* Page Header */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Manage Users
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage user access, seat types, roles, and permissions
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<AddIcon />}
                onClick={() => openAddDialog()}
                sx={{ textTransform: 'none', fontWeight: 500 }}
              >
                Create User
              </Button>
            </Box>
          </Box>

          {/* Stats Cards */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
              gap: 2,
              mb: 3,
            }}
          >
            {/* Platform Users - clickable filter */}
            <Tooltip title="Click to filter by Platform Users" placement="top">
              <Card
                onClick={() => {
                  setSidebarFilter(
                    sidebarFilter.type === 'seatType' && sidebarFilter.id === 'platform'
                      ? { type: null, id: null }
                      : { type: 'seatType', id: 'platform' }
                  )
                }}
                sx={{
                  boxShadow: 'none',
                  border: '1px solid',
                  borderColor: sidebarFilter.type === 'seatType' && sidebarFilter.id === 'platform' ? 'primary.main' : 'divider',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: 'primary.main',
                  },
                }}
              >
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 }, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      backgroundColor: 'primary.light',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'primary.dark',
                    }}
                  >
                    <PersonOutlineIcon sx={{ fontSize: 22 }} />
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                      {seatUsage.users.used}
                      <Typography component="span" variant="body1" color="text.secondary">
                        {' '}/ {seatUsage.users.limit}
                      </Typography>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Platform Users
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Tooltip>

            {/* View-Only Users - clickable filter */}
            <Tooltip title="Click to filter by View-Only Users" placement="top">
              <Card
                onClick={() => {
                  setSidebarFilter(
                    sidebarFilter.type === 'seatType' && sidebarFilter.id === 'view-only'
                      ? { type: null, id: null }
                      : { type: 'seatType', id: 'view-only' }
                  )
                }}
                sx={{
                  boxShadow: 'none',
                  border: '1px solid',
                  borderColor: sidebarFilter.type === 'seatType' && sidebarFilter.id === 'view-only' ? 'primary.main' : 'divider',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: 'primary.main',
                  },
                }}
              >
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 }, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      backgroundColor: 'primary.light',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'primary.dark',
                    }}
                  >
                    <VisibilityOutlinedIcon sx={{ fontSize: 22 }} />
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                      {seatUsage['view-only-users'].used}
                      <Typography component="span" variant="body1" color="text.secondary">
                        {' '}/ {seatUsage['view-only-users'].limit}
                      </Typography>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      View-Only Users
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Tooltip>

            {/* Roles & Groups - info only */}
            <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 }, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    backgroundColor: 'grey.200',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'text.secondary',
                  }}
                >
                  <BadgeOutlinedIcon sx={{ fontSize: 22 }} />
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                    {roles.length}
                    <Typography component="span" variant="body1" color="text.secondary">
                      {' '}/ {groups.length}
                    </Typography>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Roles / Groups
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Users Table Card */}
          <Paper sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
            {/* Table Header */}
            <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
                  <Tab label={`Users (${users.length})`} sx={{ textTransform: 'none' }} />
                  <Tab label={`Internal (${internalUsers.length})`} sx={{ textTransform: 'none' }} />
                </Tabs>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    px: 1.5,
                    py: 0.5,
                    backgroundColor: 'background.paper',
                  }}
                >
                  <SearchIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 1 }} />
                  <InputBase
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ fontSize: 14, width: 180 }}
                  />
                </Box>
              </Stack>

              {/* Active filter indicator */}
              {sidebarFilter.type && (
                <Box sx={{ mt: 2 }}>
                  <Alert
                    severity="info"
                    icon={getFilterIcon()}
                    action={
                      <IconButton
                        size="small"
                        onClick={() => setSidebarFilter({ type: null, id: null })}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    }
                    sx={{ py: 0 }}
                  >
                    Filtered by {sidebarFilter.type === 'seatType' ? 'seat type' : sidebarFilter.type}: <strong>{getFilterLabel()}</strong>
                  </Alert>
                </Box>
              )}
            </Box>

            {/* Table */}
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'grey.50' }}>
                    <TableCell padding="checkbox">
                      <Tooltip title={selectedUsers.length === filteredUsers.length ? 'Deselect all' : 'Select all'}>
                        <Checkbox
                          indeterminate={
                            selectedUsers.length > 0 && selectedUsers.length < filteredUsers.length
                          }
                          checked={
                            filteredUsers.length > 0 && selectedUsers.length === filteredUsers.length
                          }
                          onChange={handleSelectAll}
                        />
                      </Tooltip>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Seat Type</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Groups</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Workspaces</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} sx={{ textAlign: 'center', py: 6 }}>
                        <Typography color="text.secondary">No users found</Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => {
                      const groupNames = getGroupNames(user.groups)
                      const canEditRole = canAssignRole(user.seatType)
                      const workspaceCount = getWorkspaceCount(user)
                      const hasOverrides = hasPermissionOverrides(user)

                      return (
                        <TableRow
                          key={user.id}
                          hover
                          selected={selectedUsers.includes(user.id)}
                          sx={{
                            '& .action-buttons': { opacity: 0 },
                            '&:hover .action-buttons': { opacity: 1 },
                          }}
                        >
                          <TableCell padding="checkbox">
                            <Tooltip title={selectedUsers.includes(user.id) ? 'Deselect' : 'Select'}>
                              <Checkbox
                                checked={selectedUsers.includes(user.id)}
                                onChange={() => handleSelectOne(user.id)}
                              />
                            </Tooltip>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {user.name}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {user.email}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {getSeatTypeInfo(user.seatType).label}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Stack direction="row" spacing={0.5} alignItems="center">
                              <Chip
                                label={user.role ? getRoleLabel(user.role) : 'None'}
                                size="small"
                                variant={user.role ? 'outlined' : 'filled'}
                                onClick={(e) => handleRoleClick(e, user)}
                                sx={{
                                  cursor: canEditRole ? 'pointer' : 'default',
                                  opacity: canEditRole ? 1 : 0.6,
                                  backgroundColor: user.role ? 'transparent' : 'grey.100',
                                  '&:hover': canEditRole ? { backgroundColor: 'action.hover' } : {},
                                }}
                              />
                              {hasOverrides && (
                                <Tooltip title="Has permission overrides">
                                  <TuneOutlinedIcon
                                    sx={{
                                      fontSize: 16,
                                      color: 'secondary.main',
                                      cursor: 'pointer',
                                    }}
                                    onClick={() => openPermissionsPanel(user)}
                                  />
                                </Tooltip>
                              )}
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <Box
                              onClick={(e) => handleGroupsClick(e, user)}
                              sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 0.5,
                                cursor: 'pointer',
                                '&:hover': { '& .MuiChip-root': { backgroundColor: 'action.hover' } },
                              }}
                            >
                              {groupNames.length === 0 ? (
                                <Chip
                                  label="None"
                                  size="small"
                                  sx={{ backgroundColor: 'grey.100' }}
                                />
                              ) : (
                                <>
                                  {groupNames.slice(0, 2).map((name, i) => (
                                    <Chip
                                      key={i}
                                      label={name}
                                      size="small"
                                      variant="outlined"
                                    />
                                  ))}
                                  {groupNames.length > 2 && (
                                    <Chip
                                      label={`+${groupNames.length - 2}`}
                                      size="small"
                                      sx={{ backgroundColor: 'grey.200' }}
                                    />
                                  )}
                                </>
                              )}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              icon={<FolderOutlinedIcon sx={{ fontSize: 16 }} />}
                              label={workspaceCount > 0 ? `${workspaceCount} workspace${workspaceCount > 1 ? 's' : ''}` : 'None'}
                              size="small"
                              variant={workspaceCount > 0 ? 'outlined' : 'filled'}
                              onClick={() => openWorkspacePanel(user)}
                              sx={{
                                cursor: 'pointer',
                                backgroundColor: workspaceCount > 0 ? 'transparent' : 'grey.100',
                                '&:hover': { backgroundColor: 'action.hover' },
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Indicator label={user.status} status={user.status} size="small" />
                          </TableCell>
                          <TableCell align="right">
                            <Stack direction="row" spacing={0.5} className="action-buttons">
                              <Tooltip title="Permissions">
                                <IconButton
                                  size="small"
                                  onClick={() => openPermissionsPanel(user)}
                                >
                                  <TuneOutlinedIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Edit">
                                <IconButton
                                  size="small"
                                  onClick={() => openEditDialog(user, tabValue === 1)}
                                >
                                  <EditOutlined fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <IconButton
                                  size="small"
                                  onClick={() => handleDelete(user.id, tabValue === 1)}
                                >
                                  <DeleteOutlined fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Table Footer */}
            {filteredUsers.length > 0 && (
              <Box
                sx={{
                  p: 1.5,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  backgroundColor: 'grey.50',
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}
                  {sidebarFilter.type && ' (filtered)'}
                </Typography>
              </Box>
            )}
          </Paper>
        </Box>
      </Box>

      {/* V5: Bulk Action Bar */}
      <BulkActionBar
        selectedCount={selectedUsers.length}
        selectedUsers={getSelectedUserObjects()}
        onClearSelection={() => setSelectedUsers([])}
        onChangeSeatType={(e) => setBulkSeatAnchor(e.currentTarget)}
        onAssignRole={(e) => setBulkRoleAnchor(e.currentTarget)}
        onAssignGroups={(e) => setBulkGroupsAnchor(e.currentTarget)}
      />

      {/* Quick Role Assign Popover (single user) */}
      <QuickRoleAssign
        anchorEl={rolePopoverAnchor}
        open={Boolean(rolePopoverAnchor)}
        onClose={() => {
          setRolePopoverAnchor(null)
          setRolePopoverUser(null)
        }}
        user={rolePopoverUser}
        roles={roles}
        onAssign={handleQuickRoleAssign}
      />

      {/* Quick Groups Assign Popover (single user) */}
      <QuickGroupsAssign
        anchorEl={groupsPopoverAnchor}
        open={Boolean(groupsPopoverAnchor)}
        onClose={() => {
          setGroupsPopoverAnchor(null)
          setGroupsPopoverUser(null)
        }}
        user={groupsPopoverUser}
        groups={groups}
        onAssign={handleQuickGroupsAssign}
      />

      {/* V5: Bulk Seat Change Popover */}
      <QuickBulkSeatChange
        anchorEl={bulkSeatAnchor}
        open={Boolean(bulkSeatAnchor)}
        onClose={() => setBulkSeatAnchor(null)}
        selectedUsers={getSelectedUserObjects()}
        seatUsage={seatUsage}
        onApply={handleBulkSeatChange}
      />

      {/* V5: Bulk Role Assign Popover */}
      <QuickBulkRoleAssign
        anchorEl={bulkRoleAnchor}
        open={Boolean(bulkRoleAnchor)}
        onClose={() => setBulkRoleAnchor(null)}
        selectedUsers={getSelectedUserObjects()}
        roles={roles}
        onApply={handleBulkRoleAssign}
      />

      {/* V5: Bulk Groups Assign Popover */}
      <QuickBulkGroupsAssign
        anchorEl={bulkGroupsAnchor}
        open={Boolean(bulkGroupsAnchor)}
        onClose={() => setBulkGroupsAnchor(null)}
        selectedUsers={getSelectedUserObjects()}
        groups={groups}
        onApply={handleBulkGroupsAssign}
      />

      {/* V5: Permission Overrides Panel */}
      <PermissionOverridesPanel
        open={permissionsPanelOpen}
        user={permissionsPanelUser}
        chatOpen={chatOpen}
        onClose={() => {
          setPermissionsPanelOpen(false)
          setPermissionsPanelUser(null)
        }}
        onSave={handlePermissionsSave}
      />

      {/* V5: Workspace Permissions Panel */}
      <WorkspacePermissionsPanel
        open={workspacePanelOpen}
        user={workspacePanelUser}
        workspaces={WORKSPACES}
        chatOpen={chatOpen}
        onClose={() => {
          setWorkspacePanelOpen(false)
          setWorkspacePanelUser(null)
        }}
        onSave={handleWorkspaceSave}
      />

      {/* Add/Edit User Dialog */}
      <AddUserDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false)
          setEditingUser(null)
        }}
        user={editingUser}
        roles={roles}
        groups={groups}
        seatUsage={seatUsage}
        isInternalUser={isInternalUser}
        onSave={handleSaveUser}
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

export default SeatsPageV5

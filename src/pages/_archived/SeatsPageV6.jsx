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
  Collapse,
  TextField,
  Alert,
  Link,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CheckIcon from '@mui/icons-material/Check'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import FilterListIcon from '@mui/icons-material/FilterList'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import Indicator from '../components/core/Indicator'
import QuickRoleAssign from '../components/seats/QuickRoleAssign'
import QuickGroupsAssign from '../components/seats/QuickGroupsAssign'
import AddUserDialog from '../components/seats/AddUserDialog'
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
  WORKSPACES,
  canAssignRole,
  hasPermissionOverrides,
} from '../data/seatsData'

// Seat stats config matching Figma design
const SEAT_STATS = [
  { id: 'admin', label: 'Admin Users', icon: AdminPanelSettingsOutlinedIcon, color: '#9C27B0', bgColor: 'rgba(156, 39, 176, 0.12)' },
  { id: 'standard', label: 'Standard Users', icon: PersonOutlineIcon, color: '#FF9800', bgColor: 'rgba(255, 152, 0, 0.12)' },
  { id: 'view-only', label: 'View-Only Users', icon: VisibilityOutlinedIcon, color: '#00827F', bgColor: 'rgba(0, 130, 127, 0.12)' },
  { id: 'no-access', label: 'No Suite Access', icon: BlockOutlinedIcon, color: '#9E9E9E', bgColor: 'rgba(158, 158, 158, 0.12)' },
]

// Seat limits
const SEAT_LIMITS = {
  admin: 10,
  standard: 10,
  'view-only': 15,
  'no-access': null, // Unlimited
}

function SeatsPageV6({ chatOpen = false }) {
  // Data state
  const [users, setUsers] = useState(INITIAL_USERS_V5)
  const [internalUsers, setInternalUsers] = useState(INITIAL_INTERNAL_USERS_V5)
  const [roles, setRoles] = useState(INITIAL_ROLES)
  const [groups] = useState(INITIAL_GROUPS)

  // UI state
  const [tabValue, setTabValue] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

  // Sidebar filter state
  const [sidebarFilter, setSidebarFilter] = useState({ type: null, id: null })
  const [rolesExpanded, setRolesExpanded] = useState(true)
  const [groupsExpanded, setGroupsExpanded] = useState(false)
  const [workspacesExpanded, setWorkspacesExpanded] = useState(false)

  // Create/edit state for sidebar
  const [createRoleMode, setCreateRoleMode] = useState(false)
  const [newRoleName, setNewRoleName] = useState('')
  const [editingRoleId, setEditingRoleId] = useState(null)
  const [editName, setEditName] = useState('')

  // Quick-assign popover state
  const [rolePopoverAnchor, setRolePopoverAnchor] = useState(null)
  const [rolePopoverUser, setRolePopoverUser] = useState(null)
  const [groupsPopoverAnchor, setGroupsPopoverAnchor] = useState(null)
  const [groupsPopoverUser, setGroupsPopoverUser] = useState(null)

  // Add/Edit user dialog state
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [isInternalUser, setIsInternalUser] = useState(false)

  // Bulk action popover state
  const [bulkSeatAnchor, setBulkSeatAnchor] = useState(null)
  const [bulkRoleAnchor, setBulkRoleAnchor] = useState(null)
  const [bulkGroupsAnchor, setBulkGroupsAnchor] = useState(null)

  // Permission panels state
  const [permissionsPanelOpen, setPermissionsPanelOpen] = useState(false)
  const [permissionsPanelUser, setPermissionsPanelUser] = useState(null)
  const [workspacePanelOpen, setWorkspacePanelOpen] = useState(false)
  const [workspacePanelUser, setWorkspacePanelUser] = useState(null)

  // Calculate seat usage
  const seatUsage = useMemo(() => {
    const counts = {
      admin: users.filter((u) => u.seatType === 'admin').length,
      standard: users.filter((u) => u.seatType === 'standard').length,
      'view-only': users.filter((u) => u.seatType === 'view-only').length,
      'no-access': users.filter((u) => u.seatType === 'no-access').length,
    }
    return counts
  }, [users])

  const totalSeats = Object.values(seatUsage).reduce((a, b) => a + b, 0)

  // Filter users based on tab, search, and sidebar filter
  const filteredUsers = useMemo(() => {
    let result = tabValue === 0 ? users : internalUsers

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query)
      )
    }

    if (sidebarFilter.type === 'role') {
      result = result.filter((u) => u.role === sidebarFilter.id)
    } else if (sidebarFilter.type === 'group') {
      result = result.filter((u) => u.groups?.includes(sidebarFilter.id))
    } else if (sidebarFilter.type === 'workspace') {
      result = result.filter((u) => u.workspaceAssignments?.some(ws => ws.workspaceId === sidebarFilter.id))
    }

    return result
  }, [users, internalUsers, tabValue, searchQuery, sidebarFilter])

  // Helper functions
  const getRoleLabel = (id) => roles.find((r) => r.id === id)?.label || '—'
  const getGroupNames = (groupIds) => {
    if (!groupIds || groupIds.length === 0) return []
    return groupIds.map((id) => groups.find((g) => g.id === id)?.name || '').filter(Boolean)
  }
  const getUserCountForRole = (roleId) => [...users, ...internalUsers].filter((u) => u.role === roleId).length

  const getSelectedUserObjects = () => {
    const currentList = tabValue === 0 ? users : internalUsers
    return currentList.filter((u) => selectedUsers.includes(u.id))
  }

  const isFilterActive = (type, id) => sidebarFilter.type === type && sidebarFilter.id === id
  const handleFilterClick = (type, id) => {
    if (isFilterActive(type, id)) {
      setSidebarFilter({ type: null, id: null })
    } else {
      setSidebarFilter({ type, id })
    }
  }

  const isOOTBRole = (roleId) => roleId.startsWith('explore-')

  // Selection handlers
  const handleSelectAll = (e) => {
    setSelectedUsers(e.target.checked ? filteredUsers.map((u) => u.id) : [])
  }
  const handleSelectOne = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  // Quick role assign handlers
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

  // Quick groups assign handlers
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

  // Bulk action handlers
  const handleBulkSeatChange = (newSeatType) => {
    const setterFn = tabValue === 0 ? setUsers : setInternalUsers
    setterFn((prev) =>
      prev.map((u) =>
        selectedUsers.includes(u.id)
          ? {
              ...u,
              seatType: newSeatType,
              role: canAssignRole(newSeatType) ? u.role : null,
            }
          : u
      )
    )
    setSnackbar({ open: true, message: `${selectedUsers.length} users updated` })
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

  // Permission panel handlers
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

  // Role CRUD handlers
  const handleCreateRole = () => {
    if (!newRoleName.trim()) return
    const label = `Custom: ${newRoleName.trim()}`
    if (roles.some((r) => r.label.toLowerCase() === label.toLowerCase())) return
    const newRole = { id: `custom-${Date.now()}`, label }
    setRoles([...roles, newRole])
    setNewRoleName('')
    setCreateRoleMode(false)
  }

  const handleEditRole = (role) => {
    setEditingRoleId(role.id)
    setEditName(role.label.replace('Custom: ', ''))
  }

  const handleSaveRoleEdit = () => {
    if (!editName.trim()) return
    const newLabel = `Custom: ${editName.trim()}`
    setRoles(roles.map((r) => (r.id === editingRoleId ? { ...r, label: newLabel } : r)))
    setEditingRoleId(null)
    setEditName('')
  }

  const handleDeleteRole = (roleId) => {
    const userCount = getUserCountForRole(roleId)
    const msg = userCount > 0 ? `This role is assigned to ${userCount} user(s). Continue?` : 'Delete this role?'
    if (window.confirm(msg)) {
      setRoles(roles.filter((r) => r.id !== roleId))
      if (sidebarFilter.type === 'role' && sidebarFilter.id === roleId) {
        setSidebarFilter({ type: null, id: null })
      }
    }
  }

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') action()
    else if (e.key === 'Escape') {
      setCreateRoleMode(false)
      setEditingRoleId(null)
      setNewRoleName('')
      setEditName('')
    }
  }

  // Seat type label helper
  const getSeatLabel = (seatType) => {
    const labels = { admin: 'Admin', standard: 'Standard', 'view-only': 'View-Only', 'no-access': 'Edit' }
    return labels[seatType] || seatType
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
            <IconButton size="small" sx={{ color: 'text.primary' }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              User Overview Dashboard
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button
              startIcon={<PeopleAltOutlinedIcon />}
              sx={{ textTransform: 'none', fontWeight: 500, color: 'text.primary' }}
            >
              Manage Seats
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => openAddDialog()}
              sx={{ textTransform: 'none', fontWeight: 500 }}
            >
              Create User
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* Main Content */}
      <Box sx={{ p: 3, maxWidth: 1400, mx: 'auto' }}>
        {/* Stats Section */}
        <Box sx={{ mb: 3 }}>
          <Stack direction="row" alignItems="baseline" spacing={1} sx={{ mb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Total Seats
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 400 }}>
              {totalSeats}
            </Typography>
          </Stack>
          <Link href="#" underline="hover" sx={{ fontSize: 14, color: 'primary.main' }}>
            How do seats work?
          </Link>
        </Box>

        {/* Stat Cards */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 2,
            mb: 3,
          }}
        >
          {SEAT_STATS.map((stat) => {
            const IconComponent = stat.icon
            const count = seatUsage[stat.id]
            const limit = SEAT_LIMITS[stat.id]
            return (
              <Paper
                key={stat.id}
                sx={{
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  boxShadow: 'none',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    backgroundColor: stat.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: stat.color,
                  }}
                >
                  <IconComponent sx={{ fontSize: 22 }} />
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                    {count}
                    <Typography component="span" variant="body1" color="text.secondary">
                      {' '}/ {limit !== null ? limit : 'Unlimited'}
                    </Typography>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Paper>
            )
          })}
        </Box>

        {/* Tabs */}
        <Tabs
          value={tabValue}
          onChange={(e, v) => setTabValue(v)}
          sx={{ mb: 0, borderBottom: 'none' }}
        >
          <Tab
            label={`Manage Users (${users.length})`}
            sx={{
              textTransform: 'none',
              fontWeight: tabValue === 0 ? 600 : 400,
              backgroundColor: tabValue === 0 ? 'background.paper' : 'transparent',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              border: tabValue === 0 ? '1px solid' : 'none',
              borderColor: 'divider',
              borderBottom: tabValue === 0 ? 'none' : '1px solid',
              mb: tabValue === 0 ? '-1px' : 0,
              zIndex: 1,
            }}
          />
          <Tab
            label={`Internal-Only (${internalUsers.length})`}
            sx={{
              textTransform: 'none',
              fontWeight: tabValue === 1 ? 600 : 400,
              backgroundColor: tabValue === 1 ? 'background.paper' : 'transparent',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              border: tabValue === 1 ? '1px solid' : 'none',
              borderColor: 'divider',
              borderBottom: tabValue === 1 ? 'none' : '1px solid',
              mb: tabValue === 1 ? '-1px' : 0,
              zIndex: 1,
            }}
          />
        </Tabs>

        {/* Main Card with Sidebar + Table */}
        <Paper sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider', display: 'flex', overflow: 'hidden' }}>
          {/* Sidebar Filter Panel */}
          <Box
            sx={{
              width: 220,
              minWidth: 220,
              borderRight: '1px solid',
              borderColor: 'divider',
              backgroundColor: 'background.paper',
            }}
          >
            {/* ROLES Section */}
            <Box sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
              <Box
                onClick={() => setRolesExpanded(!rolesExpanded)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: 2,
                  py: 1.5,
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: 'action.hover' },
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  {rolesExpanded ? <ExpandMoreIcon sx={{ fontSize: 18 }} /> : <ExpandMoreIcon sx={{ fontSize: 18, transform: 'rotate(-90deg)' }} />}
                  <Typography variant="caption" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    Roles
                  </Typography>
                </Stack>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation()
                    setCreateRoleMode(true)
                  }}
                  sx={{ width: 24, height: 24 }}
                >
                  <AddIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Box>
              <Collapse in={rolesExpanded}>
                <Stack spacing={0} sx={{ px: 1, pb: 1 }}>
                  {createRoleMode && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, px: 1, py: 0.5 }}>
                      <TextField
                        size="small"
                        placeholder="Role name"
                        value={newRoleName}
                        onChange={(e) => setNewRoleName(e.target.value)}
                        onKeyDown={(e) => handleKeyPress(e, handleCreateRole)}
                        autoFocus
                        sx={{ flex: 1, '& .MuiInputBase-input': { py: 0.5, fontSize: 13 } }}
                      />
                      <IconButton size="small" onClick={handleCreateRole} sx={{ color: 'success.main' }}>
                        <CheckIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                      <IconButton size="small" onClick={() => { setCreateRoleMode(false); setNewRoleName('') }}>
                        <CloseIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>
                  )}
                  {roles.map((role) => {
                    const isActive = isFilterActive('role', role.id)
                    const isOOTB = isOOTBRole(role.id)
                    const isEditing = editingRoleId === role.id

                    if (isEditing) {
                      return (
                        <Box key={role.id} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, px: 1, py: 0.5 }}>
                          <TextField
                            size="small"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            onKeyDown={(e) => handleKeyPress(e, handleSaveRoleEdit)}
                            autoFocus
                            sx={{ flex: 1, '& .MuiInputBase-input': { py: 0.5, fontSize: 13 } }}
                          />
                          <IconButton size="small" onClick={handleSaveRoleEdit} sx={{ color: 'success.main' }}>
                            <CheckIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                          <IconButton size="small" onClick={() => { setEditingRoleId(null); setEditName('') }}>
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
                          {role.label.replace('Explore+ ', '').replace(' User', '')}
                        </Typography>
                        {isOOTB ? (
                          <Tooltip title="Default role">
                            <LockOutlinedIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                          </Tooltip>
                        ) : (
                          <Stack
                            direction="row"
                            spacing={0}
                            className="action-icons"
                            sx={{ opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <IconButton size="small" onClick={() => handleEditRole(role)} sx={{ width: 20, height: 20 }}>
                              <EditOutlined sx={{ fontSize: 14 }} />
                            </IconButton>
                            <IconButton size="small" onClick={() => handleDeleteRole(role.id)} sx={{ width: 20, height: 20 }}>
                              <DeleteOutlined sx={{ fontSize: 14 }} />
                            </IconButton>
                          </Stack>
                        )}
                      </Box>
                    )
                  })}
                </Stack>
              </Collapse>
            </Box>

            {/* GROUPS Section */}
            <Box sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
              <Box
                onClick={() => setGroupsExpanded(!groupsExpanded)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: 2,
                  py: 1.5,
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: 'action.hover' },
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  {groupsExpanded ? <ExpandMoreIcon sx={{ fontSize: 18 }} /> : <ExpandMoreIcon sx={{ fontSize: 18, transform: 'rotate(-90deg)' }} />}
                  <Typography variant="caption" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    Groups
                  </Typography>
                </Stack>
                <IconButton size="small" sx={{ width: 24, height: 24 }}>
                  <AddIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Box>
              <Collapse in={groupsExpanded}>
                <Stack spacing={0} sx={{ px: 1, pb: 1 }}>
                  {groups.slice(0, 8).map((group) => {
                    const isActive = isFilterActive('group', group.id)
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
                          '&:hover': { backgroundColor: isActive ? 'action.selected' : 'action.hover' },
                        }}
                      >
                        <Typography variant="body2" sx={{ flex: 1, fontWeight: isActive ? 600 : 400, fontSize: 13 }}>
                          {group.name}
                        </Typography>
                      </Box>
                    )
                  })}
                </Stack>
              </Collapse>
            </Box>

            {/* WORKSPACES Section */}
            <Box>
              <Box
                onClick={() => setWorkspacesExpanded(!workspacesExpanded)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: 2,
                  py: 1.5,
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: 'action.hover' },
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  {workspacesExpanded ? <ExpandMoreIcon sx={{ fontSize: 18 }} /> : <ExpandMoreIcon sx={{ fontSize: 18, transform: 'rotate(-90deg)' }} />}
                  <Typography variant="caption" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    Workspaces
                  </Typography>
                </Stack>
                <IconButton size="small" sx={{ width: 24, height: 24 }}>
                  <AddIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Box>
              <Collapse in={workspacesExpanded}>
                <Stack spacing={0} sx={{ px: 1, pb: 1 }}>
                  {WORKSPACES.map((ws) => {
                    const isActive = isFilterActive('workspace', ws.id)
                    return (
                      <Box
                        key={ws.id}
                        onClick={() => handleFilterClick('workspace', ws.id)}
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
                          '&:hover': { backgroundColor: isActive ? 'action.selected' : 'action.hover' },
                        }}
                      >
                        <Typography variant="body2" sx={{ flex: 1, fontWeight: isActive ? 600 : 400, fontSize: 13 }}>
                          {ws.name}
                        </Typography>
                      </Box>
                    )
                  })}
                </Stack>
              </Collapse>
            </Box>
          </Box>

          {/* Table Area */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Table Toolbar - switches between default and selection mode */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1,
                px: 2,
                height: 48,
                minHeight: 48,
                borderBottom: '1px solid',
                borderColor: 'divider',
                backgroundColor: selectedUsers.length > 0 ? 'primary.light' : 'transparent',
              }}
            >
              {selectedUsers.length > 0 ? (
                // Selection mode
                <>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <IconButton size="small" onClick={() => setSelectedUsers([])} sx={{ color: 'primary.dark' }}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.dark' }}>
                      {selectedUsers.length} {selectedUsers.length === 1 ? 'User' : 'Users'} Selected
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={(e) => setBulkSeatAnchor(e.currentTarget)}
                      sx={{
                        textTransform: 'none',
                        fontWeight: 500,
                        borderColor: 'primary.dark',
                        color: 'primary.dark',
                        '&:hover': { borderColor: 'primary.dark', backgroundColor: 'rgba(0, 130, 127, 0.08)' },
                      }}
                    >
                      Change Seat
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={(e) => setBulkRoleAnchor(e.currentTarget)}
                      sx={{
                        textTransform: 'none',
                        fontWeight: 500,
                        borderColor: 'primary.dark',
                        color: 'primary.dark',
                        '&:hover': { borderColor: 'primary.dark', backgroundColor: 'rgba(0, 130, 127, 0.08)' },
                      }}
                    >
                      Assign Role
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={(e) => setBulkGroupsAnchor(e.currentTarget)}
                      sx={{
                        textTransform: 'none',
                        fontWeight: 500,
                        borderColor: 'primary.dark',
                        color: 'primary.dark',
                        '&:hover': { borderColor: 'primary.dark', backgroundColor: 'rgba(0, 130, 127, 0.08)' },
                      }}
                    >
                      Add to Groups
                    </Button>
                  </Stack>
                </>
              ) : (
                // Default mode
                <>
                  <Box />
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Tooltip title="List view">
                      <IconButton size="small" sx={{ color: 'text.secondary' }}>
                        <ViewListOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Grid view">
                      <IconButton size="small" sx={{ color: 'text.secondary' }}>
                        <GridViewOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Filter">
                      <IconButton size="small" sx={{ color: 'text.secondary' }}>
                        <FilterListIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: '20px',
                        px: 2,
                        py: 0.5,
                        minWidth: 160,
                        backgroundColor: 'background.paper',
                      }}
                    >
                      <SearchIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 1 }} />
                      <InputBase
                        placeholder="Find"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{ fontSize: 14, flex: 1 }}
                      />
                    </Box>
                  </Stack>
                </>
              )}
            </Box>

            {/* Active Filter Alert */}
            {sidebarFilter.type && (
              <Alert
                severity="info"
                icon={sidebarFilter.type === 'role' ? <BadgeOutlinedIcon /> : sidebarFilter.type === 'group' ? <GroupIcon /> : <FolderOutlinedIcon />}
                action={
                  <IconButton size="small" onClick={() => setSidebarFilter({ type: null, id: null })}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                }
                sx={{ borderRadius: 0, py: 0 }}
              >
                Filtered by {sidebarFilter.type}:{' '}
                <strong>
                  {sidebarFilter.type === 'role' && getRoleLabel(sidebarFilter.id)}
                  {sidebarFilter.type === 'group' && groups.find((g) => g.id === sidebarFilter.id)?.name}
                  {sidebarFilter.type === 'workspace' && WORKSPACES.find((ws) => ws.id === sidebarFilter.id)?.name}
                </strong>
              </Alert>
            )}

            {/* Table */}
            <TableContainer sx={{ flex: 1 }}>
              <Table size="small" sx={{ tableLayout: 'fixed' }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'grey.50' }}>
                    <TableCell padding="checkbox" sx={{ width: 48 }}>
                      <Checkbox
                        indeterminate={selectedUsers.length > 0 && selectedUsers.length < filteredUsers.length}
                        checked={filteredUsers.length > 0 && selectedUsers.length === filteredUsers.length}
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, width: '18%' }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: '22%' }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: '18%' }}>Groups</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: '15%' }}>Role</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: '10%' }}>Seat</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: '10%' }}>Status</TableCell>
                    <TableCell sx={{ width: 80 }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} sx={{ textAlign: 'center', py: 6 }}>
                        <Typography color="text.secondary">No users found</Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => {
                      const groupNames = getGroupNames(user.groups)
                      const canEditRole = canAssignRole(user.seatType)
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
                            <Checkbox
                              checked={selectedUsers.includes(user.id)}
                              onChange={() => handleSelectOne(user.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {user.name}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {user.email}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box
                              onClick={(e) => handleGroupsClick(e, user)}
                              sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}
                            >
                              {groupNames.length === 0 ? (
                                <Typography variant="body2" color="text.secondary">—</Typography>
                              ) : (
                                <>
                                  {groupNames.slice(0, 2).map((name, i) => (
                                    <Chip key={i} label={name} size="small" variant="outlined" sx={{ fontSize: 12 }} />
                                  ))}
                                  {groupNames.length > 2 && (
                                    <Chip label={`+${groupNames.length - 2}`} size="small" sx={{ backgroundColor: 'grey.200', fontSize: 12 }} />
                                  )}
                                </>
                              )}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Stack direction="row" spacing={0.5} alignItems="center">
                              <Chip
                                label={user.role ? getRoleLabel(user.role).replace('Explore+ ', '').replace(' User', '') : 'None'}
                                size="small"
                                variant={user.role ? 'outlined' : 'filled'}
                                onClick={(e) => handleRoleClick(e, user)}
                                sx={{
                                  cursor: canEditRole ? 'pointer' : 'default',
                                  opacity: canEditRole ? 1 : 0.6,
                                  backgroundColor: user.role ? 'transparent' : 'grey.100',
                                  fontSize: 12,
                                }}
                              />
                              {hasOverrides && (
                                <Tooltip title="Has permission overrides">
                                  <TuneOutlinedIcon
                                    sx={{ fontSize: 16, color: 'secondary.main', cursor: 'pointer' }}
                                    onClick={() => openPermissionsPanel(user)}
                                  />
                                </Tooltip>
                              )}
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">{getSeatLabel(user.seatType)}</Typography>
                          </TableCell>
                          <TableCell>
                            <Indicator
                              label={user.status}
                              status={user.status === 'Active' ? 'active' : user.status === 'Inactive' ? 'inactive' : 'pending'}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Stack direction="row" spacing={0.5} className="action-buttons">
                              <Tooltip title="Edit">
                                <IconButton size="small" onClick={() => openEditDialog(user, tabValue === 1)}>
                                  <EditOutlined fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <IconButton size="small" onClick={() => handleDelete(user.id, tabValue === 1)}>
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
          </Box>
        </Paper>
      </Box>

      {/* Popovers */}
      <QuickRoleAssign
        anchorEl={rolePopoverAnchor}
        open={Boolean(rolePopoverAnchor)}
        onClose={() => { setRolePopoverAnchor(null); setRolePopoverUser(null) }}
        user={rolePopoverUser}
        roles={roles}
        onAssign={handleQuickRoleAssign}
      />
      <QuickGroupsAssign
        anchorEl={groupsPopoverAnchor}
        open={Boolean(groupsPopoverAnchor)}
        onClose={() => { setGroupsPopoverAnchor(null); setGroupsPopoverUser(null) }}
        user={groupsPopoverUser}
        groups={groups}
        onAssign={handleQuickGroupsAssign}
      />
      <QuickBulkSeatChange
        anchorEl={bulkSeatAnchor}
        open={Boolean(bulkSeatAnchor)}
        onClose={() => setBulkSeatAnchor(null)}
        selectedUsers={getSelectedUserObjects()}
        seatUsage={{ users: { used: seatUsage.admin + seatUsage.standard, limit: 20 }, 'view-only-users': { used: seatUsage['view-only'], limit: 15 } }}
        onApply={handleBulkSeatChange}
      />
      <QuickBulkRoleAssign
        anchorEl={bulkRoleAnchor}
        open={Boolean(bulkRoleAnchor)}
        onClose={() => setBulkRoleAnchor(null)}
        selectedUsers={getSelectedUserObjects()}
        roles={roles}
        onApply={handleBulkRoleAssign}
      />
      <QuickBulkGroupsAssign
        anchorEl={bulkGroupsAnchor}
        open={Boolean(bulkGroupsAnchor)}
        onClose={() => setBulkGroupsAnchor(null)}
        selectedUsers={getSelectedUserObjects()}
        groups={groups}
        onApply={handleBulkGroupsAssign}
      />

      {/* Panels */}
      <PermissionOverridesPanel
        open={permissionsPanelOpen}
        user={permissionsPanelUser}
        chatOpen={chatOpen}
        onClose={() => { setPermissionsPanelOpen(false); setPermissionsPanelUser(null) }}
        onSave={handlePermissionsSave}
      />
      <WorkspacePermissionsPanel
        open={workspacePanelOpen}
        user={workspacePanelUser}
        workspaces={WORKSPACES}
        chatOpen={chatOpen}
        onClose={() => { setWorkspacePanelOpen(false); setWorkspacePanelUser(null) }}
        onSave={handleWorkspaceSave}
      />

      {/* Dialog */}
      <AddUserDialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); setEditingUser(null) }}
        user={editingUser}
        roles={roles}
        groups={groups}
        seatUsage={{ users: { used: seatUsage.admin + seatUsage.standard, limit: 20 }, 'view-only-users': { used: seatUsage['view-only'], limit: 15 } }}
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

export default SeatsPageV6

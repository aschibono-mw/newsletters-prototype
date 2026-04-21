import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
  TablePagination,
  TableSortLabel,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemButton,
  Skeleton,
  LinearProgress,
  TextField,
  FormHelperText,
  FormControlLabel,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import SearchIcon from '@mui/icons-material/Search'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import IntegrationInstructionsOutlinedIcon from '@mui/icons-material/IntegrationInstructionsOutlined'
import ViewColumnOutlinedIcon from '@mui/icons-material/ViewColumnOutlined'
import SortIcon from '@mui/icons-material/Sort'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined'
import WorkspacesOutlinedIcon from '@mui/icons-material/WorkspacesOutlined'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import Indicator from '../components/core/Indicator'
import { ThemedChip } from '../components/themed/ChipThemed'
import { INITIAL_ROLES, INITIAL_USERS_V10, INITIAL_INTERNAL_USERS_V10, V10_USERS_STORAGE_KEY } from '../data/seatsData'
import { headerCellSeparatorSx } from '../constants/tableStyles'

// New seat types for V10 (PRD model)
const SEAT_TYPES_V10 = [
  { id: 'platform', label: 'Platform', description: 'Full platform access (Admin or Standard)' },
  { id: 'view-only', label: 'View-Only', description: 'Read-only app access, can add integrations' },
  { id: 'interactor', label: 'Interactor', description: 'No app access, integrations only' },
]

// Seat stats config for stat cards with infotips (4 cards per PRD)
const SEAT_STATS_V10 = [
  { id: 'platform', label: 'Platform Seats', limit: 100, icon: PersonOutlineIcon, infotip: 'Users with full platform access including all features and integrations' },
  { id: 'view-only', label: 'View-Only Seats', limit: null, icon: VisibilityOutlinedIcon, infotip: 'Users with read-only access to the app, can add integrations' },
  { id: 'interactor', label: 'Interactor Seats', limit: null, icon: GroupOutlinedIcon, infotip: 'Users without app access who interact via integrations only' },
  { id: 'integration', label: 'Integration Seats', limit: 50, icon: IntegrationInstructionsOutlinedIcon, infotip: 'Combined Teams App and Slack Agent integration seats' },
]

function SeatsPageV10NoGroups() {
  const navigate = useNavigate()

  // Data state - populated from localStorage or V10 mock data
  const [users, setUsers] = useState(() => {
    const stored = localStorage.getItem(V10_USERS_STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        return parsed.users || INITIAL_USERS_V10
      } catch {
        return INITIAL_USERS_V10
      }
    }
    return INITIAL_USERS_V10
  })
  const [internalUsers, setInternalUsers] = useState(() => {
    const stored = localStorage.getItem(V10_USERS_STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        return parsed.internalUsers || INITIAL_INTERNAL_USERS_V10
      } catch {
        return INITIAL_INTERNAL_USERS_V10
      }
    }
    return INITIAL_INTERNAL_USERS_V10
  })
  const [roles] = useState(INITIAL_ROLES)

  // Persist users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(V10_USERS_STORAGE_KEY, JSON.stringify({ users, internalUsers }))
  }, [users, internalUsers])

  // Loading state for progressive disclosure
  const [isLoading, setIsLoading] = useState(true)

  // Simulate initial data load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // UI state
  const [tabValue, setTabValue] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

  // Pagination state
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // Filter dropdown state
  const [seatTypeFilterAnchor, setSeatTypeFilterAnchor] = useState(null)
  const [seatTypeFilters, setSeatTypeFilters] = useState([])
  const [roleFilterAnchor, setRoleFilterAnchor] = useState(null)
  const [roleFilters, setRoleFilters] = useState([])

  // Actions dropdown state
  const [actionsAnchor, setActionsAnchor] = useState(null)

  // Column menu state
  const [columnsMenuAnchor, setColumnsMenuAnchor] = useState(null)
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    email: true,
    seatType: true,
    integrations: false,
    premiumContent: false,
    role: true,
    status: true,
    lastActive: true,
  })

  // Column definitions with labels (no groups, separate name/email)
  const COLUMN_CONFIG = {
    name: { label: 'Name', alwaysVisible: false },
    email: { label: 'Email', alwaysVisible: false },
    seatType: { label: 'Seat Type', alwaysVisible: false },
    integrations: { label: 'Integrations', alwaysVisible: false },
    premiumContent: { label: 'Premium Content', alwaysVisible: false },
    role: { label: 'Role', alwaysVisible: false },
    status: { label: 'Status', alwaysVisible: false },
    lastActive: { label: 'Last Active', alwaysVisible: false },
  }

  // Sort menu state
  const [sortMenuAnchor, setSortMenuAnchor] = useState(null)
  const [sortBy, setSortBy] = useState('name')
  const [sortDirection, setSortDirection] = useState('asc')
  const [isSorting, setIsSorting] = useState(false)

  // Bulk action dialogs
  const [bulkSeatDialogOpen, setBulkSeatDialogOpen] = useState(false)
  const [selectedSeatType, setSelectedSeatType] = useState(null)
  const [bulkPlatformSubType, setBulkPlatformSubType] = useState('standard')
  const [bulkIntegrationSeats, setBulkIntegrationSeats] = useState({ teams: false, slack: false })
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false)
  const [adminSettingsDialogOpen, setAdminSettingsDialogOpen] = useState(false)
  const [maxAdminUsers, setMaxAdminUsers] = useState('')
  const [bulkRoleDialogOpen, setBulkRoleDialogOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)
  const [visibilityDialogOpen, setVisibilityDialogOpen] = useState(false)
  const [visibilityDialogUser, setVisibilityDialogUser] = useState(null)
  const [visibilitySearch, setVisibilitySearch] = useState('')


  // Calculate seat usage for stat cards
  const seatUsage = useMemo(() => {
    const platformUsers = users.filter((u) => u.seatType === 'platform')
    const platformAdmins = platformUsers.filter((u) => u.platformSubType === 'admin').length
    // Count integration seats (users with teams OR slack enabled)
    const integrationCount = users.filter((u) => u.integrationSeats?.teams || u.integrationSeats?.slack).length
    return {
      platform: platformUsers.length,
      platformAdmins,
      'view-only': users.filter((u) => u.seatType === 'view-only').length,
      interactor: users.filter((u) => u.seatType === 'interactor').length,
      integration: integrationCount,
    }
  }, [users])


  // Filter and sort users (no group filtering)
  const filteredUsers = useMemo(() => {
    let result = tabValue === 0 ? users : internalUsers

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query)
      )
    }

    // Seat type filter
    if (seatTypeFilters.length > 0) {
      result = result.filter((u) => seatTypeFilters.includes(u.seatType))
    }

    // Role filter
    if (roleFilters.length > 0) {
      result = result.filter((u) => roleFilters.includes(u.role))
    }

    // Sort
    result = [...result].sort((a, b) => {
      let comparison = 0
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name)
      } else if (sortBy === 'email') {
        comparison = (a.email || '').localeCompare(b.email || '')
      } else if (sortBy === 'seatType') {
        comparison = (a.seatType || '').localeCompare(b.seatType || '')
      } else if (sortBy === 'status') {
        comparison = (a.status || '').localeCompare(b.status || '')
      } else if (sortBy === 'role') {
        comparison = (a.role || '').localeCompare(b.role || '')
      } else if (sortBy === 'lastActive') {
        comparison = (a.lastActive || '').localeCompare(b.lastActive || '')
      }
      return sortDirection === 'asc' ? comparison : -comparison
    })

    return result
  }, [users, internalUsers, tabValue, searchQuery, seatTypeFilters, roleFilters, sortBy, sortDirection])

  // Paginated users for display
  const paginatedUsers = useMemo(() => {
    const startIndex = page * rowsPerPage
    return filteredUsers.slice(startIndex, startIndex + rowsPerPage)
  }, [filteredUsers, page, rowsPerPage])

  // Reset page when filters change
  useEffect(() => {
    setPage(0)
  }, [searchQuery, seatTypeFilters, roleFilters, tabValue])

  // Helpers
  const getRoleLabel = (id) => roles.find((r) => r.id === id)?.label || '—'

  // Selection handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      // Add all users on current page to selection
      const pageUserIds = paginatedUsers.map((u) => u.id)
      setSelectedUsers((prev) => [...new Set([...prev, ...pageUserIds])])
    } else {
      // Remove all users on current page from selection
      const pageUserIds = paginatedUsers.map((u) => u.id)
      setSelectedUsers((prev) => prev.filter((id) => !pageUserIds.includes(id)))
    }
  }

  // Check if all users on current page are selected
  const allPageUsersSelected = paginatedUsers.length > 0 && paginatedUsers.every((u) => selectedUsers.includes(u.id))
  const somePageUsersSelected = paginatedUsers.some((u) => selectedUsers.includes(u.id)) && !allPageUsersSelected

  const handleSelectOne = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  // Filter toggle handlers
  const toggleSeatTypeFilter = (seatType) => {
    setSeatTypeFilters((prev) =>
      prev.includes(seatType)
        ? prev.filter((t) => t !== seatType)
        : [...prev, seatType]
    )
  }

  const toggleRoleFilter = (roleId) => {
    setRoleFilters((prev) =>
      prev.includes(roleId)
        ? prev.filter((r) => r !== roleId)
        : [...prev, roleId]
    )
  }

  // Column toggle
  const toggleColumn = (column) => {
    setVisibleColumns((prev) => ({ ...prev, [column]: !prev[column] }))
  }

  // Handle column header sort click
  const handleSort = (column) => {
    setIsSorting(true)
    if (sortBy === column) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy(column)
      setSortDirection('asc')
    }
    // Simulate sort processing time
    setTimeout(() => setIsSorting(false), 400)
  }

  // Navigate to create user page
  const handleCreateUser = () => {
    navigate('/seats-v10-no-groups/users/new')
  }

  // Get status indicator color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'active'
      case 'pending':
        return 'pending'
      case 'inactive':
        return 'inactive'
      default:
        return 'inactive'
    }
  }

  // Get visible columns as array for separator logic
  const visibleColumnKeys = Object.entries(visibleColumns)
    .filter(([, visible]) => visible)
    .map(([key]) => key)

  // Get selected user objects
  const getSelectedUserObjects = () => {
    const currentList = tabValue === 0 ? users : internalUsers
    return currentList.filter((u) => selectedUsers.includes(u.id))
  }

  // Bulk seat change handlers
  const handleBulkSeatChange = () => {
    if (!selectedSeatType) return
    const setterFn = tabValue === 0 ? setUsers : setInternalUsers
    setterFn((prev) =>
      prev.map((u) => {
        if (!selectedUsers.includes(u.id)) return u
        const updated = { ...u, seatType: selectedSeatType }
        // Add platform sub-type for platform users
        if (selectedSeatType === 'platform') {
          updated.platformSubType = bulkPlatformSubType
        } else {
          delete updated.platformSubType
        }
        // Update integration seats if any are selected
        if (bulkIntegrationSeats.teams || bulkIntegrationSeats.slack) {
          updated.integrationSeats = { ...bulkIntegrationSeats }
        }
        return updated
      })
    )
    setSnackbar({ open: true, message: `${selectedUsers.length} users updated to ${SEAT_TYPES_V10.find(t => t.id === selectedSeatType)?.label}` })
    setBulkSeatDialogOpen(false)
    setSelectedSeatType(null)
    setBulkPlatformSubType('standard')
    setBulkIntegrationSeats({ teams: false, slack: false })
    setSelectedUsers([])
  }

  // Bulk delete handler
  const handleBulkDelete = () => {
    const setterFn = tabValue === 0 ? setUsers : setInternalUsers
    setterFn((prev) => prev.filter((u) => !selectedUsers.includes(u.id)))
    setSnackbar({ open: true, message: `${selectedUsers.length} users deleted` })
    setBulkDeleteDialogOpen(false)
    setSelectedUsers([])
  }

  // Bulk role change handler
  const handleBulkRoleChange = () => {
    const setterFn = tabValue === 0 ? setUsers : setInternalUsers
    setterFn((prev) =>
      prev.map((u) =>
        selectedUsers.includes(u.id) ? { ...u, role: selectedRole } : u
      )
    )
    const roleLabel = roles.find(r => r.id === selectedRole)?.label || 'None'
    setSnackbar({ open: true, message: `${selectedUsers.length} users updated to ${roleLabel}` })
    setBulkRoleDialogOpen(false)
    setSelectedRole(null)
    setSelectedUsers([])
  }

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', backgroundColor: '#F5F5F5' }}>
      {/* Page Header */}
      <Paper
        elevation={1}
        sx={{
          backgroundColor: 'background.paper',
          px: 3,
          py: 2,
          borderRadius: 0,
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Tooltip title="Back to Account">
              <IconButton size="small" sx={{ color: 'text.primary' }} onClick={() => navigate('/account-v10')}>
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Seats and Permissions
            </Typography>
          </Stack>
          <Button
            variant="contained"
            color="secondary"
            endIcon={<ArrowDropDownIcon />}
            onClick={(e) => setActionsAnchor(e.currentTarget)}
            sx={{ textTransform: 'none', fontWeight: 500 }}
          >
            Actions
          </Button>
          <Menu
            anchorEl={actionsAnchor}
            open={Boolean(actionsAnchor)}
            onClose={() => setActionsAnchor(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{ sx: { minWidth: 220 } }}
          >
            <MenuItem onClick={() => { handleCreateUser(); setActionsAnchor(null) }}>
              <ListItemIcon>
                <PersonAddOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Create New User" />
            </MenuItem>
            <MenuItem onClick={() => { navigate('/seats-v10-no-groups/roles'); setActionsAnchor(null) }}>
              <ListItemIcon>
                <BadgeOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Manage Roles" />
            </MenuItem>
            <MenuItem onClick={() => { navigate('/seats-v10-no-groups/workspaces'); setActionsAnchor(null) }}>
              <ListItemIcon>
                <WorkspacesOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Workspaces" />
            </MenuItem>
            <MenuItem onClick={() => { setAdminSettingsDialogOpen(true); setActionsAnchor(null) }}>
              <ListItemIcon>
                <AdminPanelSettingsOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Admin Settings" />
            </MenuItem>
          </Menu>
        </Stack>
      </Paper>

      {/* Tabs - directly under header */}
      <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', px: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(e, v) => {
            setTabValue(v)
            setSelectedUsers([])
          }}
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: 'primary.main',
              height: 3,
            },
          }}
        >
          <Tab
            label={isLoading ? 'Manage Users' : `Manage Users (${users.length})`}
            sx={{ textTransform: 'none', fontWeight: 500, minWidth: 'auto', px: 2 }}
          />
          <Tab
            label={isLoading ? 'Internal Only' : `Internal Only (${internalUsers.length})`}
            sx={{ textTransform: 'none', fontWeight: 500, minWidth: 'auto', px: 2 }}
          />
        </Tabs>
      </Box>

      {/* Main Content */}
      <Box sx={{ p: 3, maxWidth: 1536, mx: 'auto' }}>
        {/* Stat Cards - only show on Manage Users tab */}
        {tabValue === 0 && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 2,
              mb: 3,
            }}
          >
            {SEAT_STATS_V10.map((stat) => {
              const count = seatUsage[stat.id] || 0
              const limitDisplay = stat.limit ? `${count} / ${stat.limit}` : `${count} / Unlimited`
              const adminSuffix = stat.id === 'platform' && seatUsage.platformAdmins > 0
                ? ` (${seatUsage.platformAdmins} Admin${seatUsage.platformAdmins !== 1 ? 's' : ''})`
                : ''
              return (
                <Paper
                  key={stat.id}
                  elevation={1}
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 80,
                  }}
                >
                  {isLoading ? (
                    <>
                      <Skeleton variant="text" width={80} height={32} />
                      <Skeleton variant="text" width={120} height={20} />
                    </>
                  ) : (
                    <>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {limitDisplay}
                      </Typography>
                      <Tooltip title={stat.infotip} arrow placement="bottom">
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            textDecoration: 'underline dotted',
                            textUnderlineOffset: '3px',
                            cursor: 'help',
                          }}
                        >
                          {stat.label}{adminSuffix}
                        </Typography>
                      </Tooltip>
                    </>
                  )}
                </Paper>
              )
            })}
          </Box>
        )}

        {/* Table Card */}
        <Paper variant="outlined" sx={{ overflow: 'hidden', backgroundColor: 'background.paper' }}>
          {/* Table Header Row */}
          <Box
            sx={{
              px: 2,
              minHeight: 52,
              borderBottom: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: selectedUsers.length > 0 ? 'primary.light' : 'background.paper',
            }}
          >
            {selectedUsers.length > 0 ? (
              // Selection mode - simplified toolbar
              <>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <IconButton size="small" onClick={() => setSelectedUsers([])}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                  <Typography variant="body2" fontWeight={600} color="primary.main">
                    {selectedUsers.length} Users Selected
                  </Typography>
                  {selectedUsers.length < filteredUsers.length && (
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{
                        color: 'primary.main',
                        cursor: 'pointer',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                      onClick={() => setSelectedUsers(filteredUsers.map((u) => u.id))}
                    >
                      Select all {filteredUsers.length} users
                    </Typography>
                  )}
                  <Tooltip title="Change Seat Type">
                    <IconButton size="small" onClick={() => setBulkSeatDialogOpen(true)}>
                      <SwapHorizOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Change Role">
                    <IconButton size="small" onClick={() => setBulkRoleDialogOpen(true)}>
                      <BadgeOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small" onClick={() => setBulkDeleteDialogOpen(true)}>
                      <DeleteOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Export all selected users">
                    <IconButton size="small" onClick={() => setSnackbar({ open: true, message: `Exported ${selectedUsers.length} users (all selected)` })}>
                      <FileDownloadOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </>
            ) : (
              // Normal mode - full toolbar
              <>
                <Stack direction="row" alignItems="center" spacing={2}>
                  {isLoading ? (
                    <Skeleton variant="text" width={80} height={24} />
                  ) : (
                    <Typography sx={{ fontSize: 16, lineHeight: '22px', fontWeight: 700 }}>
                      {filteredUsers.length} {tabValue === 1 ? 'Internal-Only Users' : 'Users'}
                    </Typography>
                  )}
                  <Tooltip title={filteredUsers.length === 0 ? 'No users to export' : `Export ${filteredUsers.length} users`}>
                    <span>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        startIcon={<FileDownloadOutlinedIcon />}
                        disabled={filteredUsers.length === 0}
                        onClick={() => setSnackbar({ open: true, message: `Exported ${filteredUsers.length} users` })}
                        sx={{ textTransform: 'none' }}
                      >
                        Export
                      </Button>
                    </span>
                  </Tooltip>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                  {/* Seat Types Filter Chip */}
                  <Chip
                    icon={<FilterAltOutlinedIcon sx={{ fontSize: 16 }} />}
                    label={`Seat Types${seatTypeFilters.length > 0 ? ` (${seatTypeFilters.length})` : ''}`}
                    onClick={(e) => setSeatTypeFilterAnchor(e.currentTarget)}
                    onDelete={(e) => setSeatTypeFilterAnchor(e.currentTarget)}
                    deleteIcon={<ArrowDropDownIcon />}
                    variant="outlined"
                    sx={{
                      backgroundColor: '#F5F5F5',
                      borderColor: seatTypeFilters.length > 0 ? 'primary.main' : 'divider',
                      color: 'text.primary',
                      fontWeight: 600,
                      '& .MuiChip-deleteIcon': {
                        color: 'inherit',
                      },
                    }}
                  />
                  <Menu
                    anchorEl={seatTypeFilterAnchor}
                    open={Boolean(seatTypeFilterAnchor)}
                    onClose={() => setSeatTypeFilterAnchor(null)}
                    PaperProps={{ sx: { minWidth: 220 } }}
                  >
                    <Box sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="caption" color="text.secondary" fontWeight={500}>
                        SELECTED({seatTypeFilters.length})
                      </Typography>
                      {seatTypeFilters.length > 0 && (
                        <Typography
                          variant="caption"
                          color="primary"
                          sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                          onClick={() => setSeatTypeFilters([])}
                        >
                          Clear
                        </Typography>
                      )}
                    </Box>
                    {SEAT_TYPES_V10.map((type) => (
                      <MenuItem key={type.id} onClick={() => toggleSeatTypeFilter(type.id)}>
                        <Checkbox
                          checked={seatTypeFilters.includes(type.id)}
                          size="small"
                          sx={{ p: 0, mr: 1.5 }}
                        />
                        <ListItemText
                          primary={type.label}
                          primaryTypographyProps={{ noWrap: true }}
                        />
                      </MenuItem>
                    ))}
                  </Menu>

                  {/* Roles Filter Chip */}
                  <Chip
                    icon={<FilterAltOutlinedIcon sx={{ fontSize: 16 }} />}
                    label={`Roles${roleFilters.length > 0 ? ` (${roleFilters.length})` : ''}`}
                    onClick={(e) => setRoleFilterAnchor(e.currentTarget)}
                    onDelete={(e) => setRoleFilterAnchor(e.currentTarget)}
                    deleteIcon={<ArrowDropDownIcon />}
                    variant="outlined"
                    sx={{
                      backgroundColor: '#F5F5F5',
                      borderColor: roleFilters.length > 0 ? 'primary.main' : 'divider',
                      color: 'text.primary',
                      fontWeight: 600,
                      '& .MuiChip-deleteIcon': {
                        color: 'inherit',
                      },
                    }}
                  />
                  <Menu
                    anchorEl={roleFilterAnchor}
                    open={Boolean(roleFilterAnchor)}
                    onClose={() => setRoleFilterAnchor(null)}
                    PaperProps={{ sx: { minWidth: 220 } }}
                  >
                    <Box sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="caption" color="text.secondary" fontWeight={500}>
                        SELECTED({roleFilters.length})
                      </Typography>
                      {roleFilters.length > 0 && (
                        <Typography
                          variant="caption"
                          color="primary"
                          sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                          onClick={() => setRoleFilters([])}
                        >
                          Clear
                        </Typography>
                      )}
                    </Box>
                    {roles.map((role) => (
                      <MenuItem key={role.id} onClick={() => toggleRoleFilter(role.id)}>
                        <Checkbox
                          checked={roleFilters.includes(role.id)}
                          size="small"
                          sx={{ p: 0, mr: 1.5 }}
                        />
                        <ListItemText
                          primary={role.label}
                          primaryTypographyProps={{ noWrap: true }}
                        />
                      </MenuItem>
                    ))}
                  </Menu>

                  <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

                  {/* Column Toggle */}
                  <Tooltip title="Columns">
                    <IconButton
                      size="small"
                      onClick={(e) => setColumnsMenuAnchor(e.currentTarget)}
                    >
                      <ViewColumnOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={columnsMenuAnchor}
                    open={Boolean(columnsMenuAnchor)}
                    onClose={() => setColumnsMenuAnchor(null)}
                    PaperProps={{ sx: { minWidth: 180 } }}
                  >
                    {Object.entries(COLUMN_CONFIG).map(([key, config]) => (
                      <MenuItem
                        key={key}
                        onClick={() => toggleColumn(key)}
                        sx={{ py: 1 }}
                      >
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          {visibleColumns[key] && <CheckIcon fontSize="small" sx={{ color: 'text.secondary' }} />}
                        </ListItemIcon>
                        <ListItemText
                          primary={config.label}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </MenuItem>
                    ))}
                  </Menu>

                  {/* Sort */}
                  <Tooltip title="Sort">
                    <IconButton
                      size="small"
                      onClick={(e) => setSortMenuAnchor(e.currentTarget)}
                    >
                      <SortIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={sortMenuAnchor}
                    open={Boolean(sortMenuAnchor)}
                    onClose={() => setSortMenuAnchor(null)}
                  >
                    {Object.entries(COLUMN_CONFIG).map(([field, config]) => (
                      <MenuItem
                        key={field}
                        onClick={() => {
                          setIsSorting(true)
                          if (sortBy === field) {
                            setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
                          } else {
                            setSortBy(field)
                            setSortDirection('asc')
                          }
                          setSortMenuAnchor(null)
                          setTimeout(() => setIsSorting(false), 400)
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          {sortBy === field && <CheckIcon fontSize="small" />}
                        </ListItemIcon>
                        <ListItemText
                          primary={config.label}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </MenuItem>
                    ))}
                  </Menu>

                  {/* Search - Pill shaped */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: '999px',
                      px: 1.5,
                      py: 0.5,
                      ml: 1,
                      backgroundColor: 'background.paper',
                    }}
                  >
                    <SearchIcon sx={{ color: 'text.secondary', fontSize: 20, mr: 0.5 }} />
                    <InputBase
                      placeholder="Find"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      sx={{ fontSize: 14, width: 100 }}
                    />
                  </Box>
                </Stack>
              </>
            )}
          </Box>

          {/* Table */}
          <TableContainer sx={{ overflowX: 'auto' }}>
            <Table sx={{ tableLayout: 'auto' }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'background.paper', borderBottom: '2px solid', borderColor: 'divider' }}>
                  <TableCell padding="checkbox" sx={{ position: 'relative', ...headerCellSeparatorSx }}>
                    <Tooltip title="Select">
                      <Checkbox
                        indeterminate={somePageUsersSelected}
                        checked={allPageUsersSelected}
                        onChange={handleSelectAll}
                        size="small"
                      />
                    </Tooltip>
                  </TableCell>
                  {visibleColumns.name && (
                    <TableCell
                      sortDirection={sortBy === 'name' ? sortDirection : false}
                      sx={visibleColumnKeys.indexOf('name') < visibleColumnKeys.length - 1 ? headerCellSeparatorSx : { fontWeight: 600 }}
                    >
                      <TableSortLabel
                        active={sortBy === 'name'}
                        direction={sortBy === 'name' ? sortDirection : 'asc'}
                        onClick={() => handleSort('name')}
                      >
                        Name
                      </TableSortLabel>
                    </TableCell>
                  )}
                  {visibleColumns.email && (
                    <TableCell
                      sortDirection={sortBy === 'email' ? sortDirection : false}
                      sx={visibleColumnKeys.indexOf('email') < visibleColumnKeys.length - 1 ? headerCellSeparatorSx : { fontWeight: 600 }}
                    >
                      <TableSortLabel
                        active={sortBy === 'email'}
                        direction={sortBy === 'email' ? sortDirection : 'asc'}
                        onClick={() => handleSort('email')}
                      >
                        Email
                      </TableSortLabel>
                    </TableCell>
                  )}
                  {visibleColumns.seatType && (
                    <TableCell
                      sortDirection={sortBy === 'seatType' ? sortDirection : false}
                      sx={visibleColumnKeys.indexOf('seatType') < visibleColumnKeys.length - 1 ? headerCellSeparatorSx : { fontWeight: 600 }}
                    >
                      <TableSortLabel
                        active={sortBy === 'seatType'}
                        direction={sortBy === 'seatType' ? sortDirection : 'asc'}
                        onClick={() => handleSort('seatType')}
                      >
                        Seat Type
                      </TableSortLabel>
                    </TableCell>
                  )}
                  {visibleColumns.integrations && (
                    <TableCell sx={visibleColumnKeys.indexOf('integrations') < visibleColumnKeys.length - 1 ? headerCellSeparatorSx : { fontWeight: 600 }}>
                      Integrations
                    </TableCell>
                  )}
                  {visibleColumns.premiumContent && (
                    <TableCell sx={visibleColumnKeys.indexOf('premiumContent') < visibleColumnKeys.length - 1 ? headerCellSeparatorSx : { fontWeight: 600 }}>
                      Premium Content
                    </TableCell>
                  )}
                  {visibleColumns.role && (
                    <TableCell
                      sortDirection={sortBy === 'role' ? sortDirection : false}
                      sx={visibleColumnKeys.indexOf('role') < visibleColumnKeys.length - 1 ? headerCellSeparatorSx : { fontWeight: 600 }}
                    >
                      <TableSortLabel
                        active={sortBy === 'role'}
                        direction={sortBy === 'role' ? sortDirection : 'asc'}
                        onClick={() => handleSort('role')}
                      >
                        Role
                      </TableSortLabel>
                    </TableCell>
                  )}
                  {visibleColumns.status && (
                    <TableCell
                      sortDirection={sortBy === 'status' ? sortDirection : false}
                      sx={visibleColumnKeys.indexOf('status') < visibleColumnKeys.length - 1 ? headerCellSeparatorSx : { fontWeight: 600 }}
                    >
                      <TableSortLabel
                        active={sortBy === 'status'}
                        direction={sortBy === 'status' ? sortDirection : 'asc'}
                        onClick={() => handleSort('status')}
                      >
                        Status
                      </TableSortLabel>
                    </TableCell>
                  )}
                  {visibleColumns.lastActive && (
                    <TableCell
                      sortDirection={sortBy === 'lastActive' ? sortDirection : false}
                      sx={{ fontWeight: 600 }}
                    >
                      <TableSortLabel
                        active={sortBy === 'lastActive'}
                        direction={sortBy === 'lastActive' ? sortDirection : 'asc'}
                        onClick={() => handleSort('lastActive')}
                      >
                        Last Active
                      </TableSortLabel>
                    </TableCell>
                  )}
                  <TableCell sx={{ width: 120 }} />
                </TableRow>
                {isSorting && (
                  <TableRow sx={{ height: 4, p: 0 }}>
                    <TableCell colSpan={8} sx={{ p: 0, border: 0 }}>
                      <LinearProgress
                        sx={{
                          height: 3,
                          backgroundColor: 'transparent',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: 'primary.main',
                          },
                        }}
                      />
                    </TableCell>
                  </TableRow>
                )}
              </TableHead>
              <TableBody>
                {isLoading ? (
                  // Skeleton rows during loading
                  [...Array(rowsPerPage)].map((_, index) => (
                    <TableRow key={`skeleton-${index}`}>
                      <TableCell padding="checkbox">
                        <Skeleton variant="rectangular" width={18} height={18} sx={{ borderRadius: 0.5 }} />
                      </TableCell>
                      {visibleColumns.name && (
                        <TableCell>
                          <Skeleton variant="text" width={140} height={20} />
                        </TableCell>
                      )}
                      {visibleColumns.email && (
                        <TableCell>
                          <Skeleton variant="text" width={180} height={20} />
                        </TableCell>
                      )}
                      {visibleColumns.seatType && (
                        <TableCell>
                          <Skeleton variant="text" width={100} height={20} />
                        </TableCell>
                      )}
                      {visibleColumns.integrations && (
                        <TableCell>
                          <Skeleton variant="text" width={100} height={20} />
                        </TableCell>
                      )}
                      {visibleColumns.premiumContent && (
                        <TableCell>
                          <Skeleton variant="text" width={80} height={20} />
                        </TableCell>
                      )}
                      {visibleColumns.role && (
                        <TableCell>
                          <Skeleton variant="text" width={80} height={20} />
                        </TableCell>
                      )}
                      {visibleColumns.status && (
                        <TableCell>
                          <Skeleton variant="rounded" width={60} height={22} />
                        </TableCell>
                      )}
                      {visibleColumns.lastActive && (
                        <TableCell>
                          <Skeleton variant="text" width={90} height={20} />
                        </TableCell>
                      )}
                      <TableCell>
                        <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                          <Skeleton variant="circular" width={28} height={28} />
                          <Skeleton variant="circular" width={28} height={28} />
                          <Skeleton variant="circular" width={28} height={28} />
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  // Actual data rows
                  paginatedUsers.map((user) => (
                    <TableRow
                      key={user.id}
                      hover
                      selected={selectedUsers.includes(user.id)}
                      onClick={() => navigate(`/seats-v10-no-groups/users/${user.id}`)}
                      sx={{
                        cursor: 'pointer',
                        '& .row-actions': { opacity: 0 },
                        '&:hover .row-actions': { opacity: 1 },
                      }}
                    >
                      <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                        <Tooltip title="Select">
                          <Checkbox
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => handleSelectOne(user.id)}
                            size="small"
                          />
                        </Tooltip>
                      </TableCell>
                      {visibleColumns.name && (
                        <TableCell>
                          <Typography variant="body2" fontWeight={500}>
                            {user.name}
                          </Typography>
                        </TableCell>
                      )}
                      {visibleColumns.email && (
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {user.email}
                          </Typography>
                        </TableCell>
                      )}
                      {visibleColumns.seatType && (
                        <TableCell>
                          <Typography variant="body2">
                            {user.seatType === 'platform'
                              ? `Platform (${user.platformSubType === 'admin' ? 'Admin' : 'Standard'})`
                              : SEAT_TYPES_V10.find((t) => t.id === user.seatType)?.label || '—'}
                          </Typography>
                        </TableCell>
                      )}
                      {visibleColumns.integrations && (
                        <TableCell>
                          <Stack direction="row" spacing={0.5}>
                            {user.integrationSeats?.teams && (
                              <ThemedChip label="Teams" size="small" />
                            )}
                            {user.integrationSeats?.slack && (
                              <ThemedChip label="Slack" size="small" />
                            )}
                            {!user.integrationSeats?.teams && !user.integrationSeats?.slack && (
                              <Typography variant="body2" color="text.secondary">—</Typography>
                            )}
                          </Stack>
                        </TableCell>
                      )}
                      {visibleColumns.premiumContent && (
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {user.premiumContent ? 'Yes' : '—'}
                          </Typography>
                        </TableCell>
                      )}
                      {visibleColumns.role && (
                        <TableCell>
                          <Typography variant="body2">
                            {getRoleLabel(user.role)}
                          </Typography>
                        </TableCell>
                      )}
                      {visibleColumns.status && (
                        <TableCell>
                          <Indicator
                            label={user.status}
                            status={getStatusColor(user.status)}
                            size="small"
                          />
                        </TableCell>
                      )}
                      {visibleColumns.lastActive && (
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {user.lastActive || '—'}
                          </Typography>
                        </TableCell>
                      )}
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Stack direction="row" spacing={0.5} className="row-actions" justifyContent="flex-end">
                          <Tooltip title="Set Visibility">
                            <IconButton size="small" onClick={() => { setVisibilityDialogUser(user); setVisibilityDialogOpen(true) }}>
                              <VisibilityOutlinedIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton size="small" onClick={() => navigate(`/seats-v10-no-groups/users/${user.id}`)}>
                              <EditOutlinedIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Duplicate">
                            <IconButton size="small">
                              <ContentCopyOutlinedIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton size="small">
                              <DeleteOutlinedIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          {!isLoading && filteredUsers.length > 0 && (
            <TablePagination
              component="div"
              count={filteredUsers.length}
              page={page}
              onPageChange={(e, newPage) => {
                setPage(newPage)
                setSnackbar({ open: true, message: `Page ${newPage + 1} of ${Math.ceil(filteredUsers.length / rowsPerPage)}` })
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) => {
                const newRowsPerPage = parseInt(e.target.value, 10)
                setRowsPerPage(newRowsPerPage)
                setPage(0)
                setSnackbar({ open: true, message: `Showing ${newRowsPerPage} rows per page` })
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              rowsPerPageOptions={[10, 25, 50, 100]}
              sx={{ borderTop: '1px solid', borderColor: 'divider' }}
            />
          )}

          {/* Empty State */}
          {!isLoading && filteredUsers.length === 0 && (
            <Box sx={{ py: 8, textAlign: 'center' }}>
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  backgroundColor: 'grey.100',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                }}
              >
                <GroupOutlinedIcon sx={{ fontSize: 56, color: 'grey.400' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {tabValue === 1 ? 'No Internal-Only Users' : 'No Users to Manage Yet'}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 3, maxWidth: 350, mx: 'auto' }}
              >
                {tabValue === 1
                  ? 'Start by creating an internal-only user with preferred permissions'
                  : 'Start by creating a user with preferred permissions'}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateUser}
                sx={{ textTransform: 'none', fontWeight: 500 }}
              >
                {tabValue === 1 ? 'Create New Internal-Only User' : 'Create New User'}
              </Button>
            </Box>
          )}
        </Paper>
      </Box>

      {/* Bulk Seat Change Dialog */}
      <Dialog
        open={bulkSeatDialogOpen}
        onClose={() => {
          setBulkSeatDialogOpen(false)
          setSelectedSeatType(null)
          setBulkPlatformSubType('standard')
          setBulkIntegrationSeats({ teams: false, slack: false })
        }}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Change Seat Type
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Apply to {selectedUsers.length} selected user{selectedUsers.length !== 1 ? 's' : ''}
          </Typography>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 0 }}>
          <List dense sx={{ py: 1 }}>
            {SEAT_TYPES_V10.map((type) => {
              const currentCount = getSelectedUserObjects().filter(u => u.seatType === type.id).length
              return (
                <ListItem key={type.id} disablePadding>
                  <ListItemButton
                    selected={selectedSeatType === type.id}
                    onClick={() => setSelectedSeatType(type.id)}
                    sx={{ py: 1.5 }}
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {type.label}
                          </Typography>
                          {currentCount > 0 && (
                            <ThemedChip
                              label={`${currentCount} selected`}
                              size="small"
                            />
                          )}
                        </Box>
                      }
                      secondary={type.description}
                    />
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>

          {/* Platform sub-type toggle */}
          {selectedSeatType === 'platform' && (
            <Box sx={{ px: 2, py: 2, borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Platform Access Level
              </Typography>
              <ToggleButtonGroup
                value={bulkPlatformSubType}
                exclusive
                onChange={(e, v) => v && setBulkPlatformSubType(v)}
                size="small"
                sx={{ '& .MuiToggleButtonGroup-grouped': { border: '1px solid', borderColor: 'divider' } }}
              >
                <ToggleButton
                  value="standard"
                  sx={{
                    textTransform: 'none',
                    px: 2,
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                      '&:hover': { backgroundColor: 'primary.dark' },
                    },
                  }}
                >
                  Standard
                </ToggleButton>
                <ToggleButton
                  value="admin"
                  sx={{
                    textTransform: 'none',
                    px: 2,
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                      '&:hover': { backgroundColor: 'primary.dark' },
                    },
                  }}
                >
                  Admin
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          )}

          {/* Integration Seats */}
          <Box sx={{ px: 2, py: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Integration Seats (optional)
            </Typography>
            <Stack direction="row" spacing={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={bulkIntegrationSeats.teams}
                    onChange={(e) => setBulkIntegrationSeats({ ...bulkIntegrationSeats, teams: e.target.checked })}
                    size="small"
                  />
                }
                label="Teams App"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={bulkIntegrationSeats.slack}
                    onChange={(e) => setBulkIntegrationSeats({ ...bulkIntegrationSeats, slack: e.target.checked })}
                    size="small"
                  />
                }
                label="Slack Agent"
              />
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setBulkSeatDialogOpen(false)
              setSelectedSeatType(null)
              setBulkPlatformSubType('standard')
              setBulkIntegrationSeats({ teams: false, slack: false })
            }}
            sx={{ textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleBulkSeatChange}
            disabled={!selectedSeatType}
            sx={{ textTransform: 'none' }}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>

      {/* Bulk Role Change Dialog */}
      <Dialog
        open={bulkRoleDialogOpen}
        onClose={() => {
          setBulkRoleDialogOpen(false)
          setSelectedRole(null)
        }}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Change Role
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Apply to {selectedUsers.length} selected user{selectedUsers.length !== 1 ? 's' : ''}
          </Typography>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 0 }}>
          <List dense sx={{ py: 1 }}>
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedRole === null}
                onClick={() => setSelectedRole(null)}
                sx={{ py: 1.5 }}
              >
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontWeight: 500, fontStyle: 'italic' }}>
                      None (remove role)
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
            {roles.map((role) => {
              const currentCount = getSelectedUserObjects().filter(u => u.role === role.id).length
              return (
                <ListItem key={role.id} disablePadding>
                  <ListItemButton
                    selected={selectedRole === role.id}
                    onClick={() => setSelectedRole(role.id)}
                    sx={{ py: 1.5 }}
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {role.label}
                          </Typography>
                          {currentCount > 0 && (
                            <Chip
                              label={`${currentCount} selected`}
                              size="small"
                              sx={{
                                height: 18,
                                fontSize: 11,
                                backgroundColor: 'primary.light',
                                color: 'primary.dark',
                              }}
                            />
                          )}
                        </Box>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setBulkRoleDialogOpen(false)
              setSelectedRole(null)
            }}
            sx={{ textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleBulkRoleChange}
            sx={{ textTransform: 'none' }}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>

      {/* Bulk Delete Confirmation Dialog */}
      <Dialog
        open={bulkDeleteDialogOpen}
        onClose={() => setBulkDeleteDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete Users</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Are you sure you want to delete <strong>{selectedUsers.length} users</strong>? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBulkDeleteDialogOpen(false)} sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBulkDelete}
            sx={{ textTransform: 'none' }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Admin Settings Dialog */}
      <Dialog
        open={adminSettingsDialogOpen}
        onClose={() => setAdminSettingsDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ pb: (maxAdminUsers === '0' || maxAdminUsers === 0 || (maxAdminUsers && parseInt(maxAdminUsers) > 0 && parseInt(maxAdminUsers) < seatUsage.platformAdmins)) ? 1 : 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Admin Settings
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Current Platform Admins: {seatUsage.platformAdmins}
          </Typography>
        </DialogTitle>

        {/* Error: Cannot set to 0 */}
        {(maxAdminUsers === '0' || maxAdminUsers === 0) && (
          <Alert
            severity="error"
            variant="standard"
            sx={{
              borderRadius: 0,
              backgroundColor: '#FDEDED',
            }}
          >
            You cannot set the maximum admin users to 0. At least one admin is required.
          </Alert>
        )}

        {/* Warning: Will demote existing admins */}
        {maxAdminUsers && parseInt(maxAdminUsers) > 0 && parseInt(maxAdminUsers) < seatUsage.platformAdmins && (
          <Alert
            severity="warning"
            variant="standard"
            sx={{
              borderRadius: 0,
              backgroundColor: '#FFF4E5',
            }}
          >
            Setting the limit to {maxAdminUsers} will reduce {seatUsage.platformAdmins - parseInt(maxAdminUsers)} admin{seatUsage.platformAdmins - parseInt(maxAdminUsers) !== 1 ? 's' : ''} to Standard access.
          </Alert>
        )}

        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
              Maximum Admin Users
            </Typography>
            <TextField
              fullWidth
              type="number"
              placeholder="No limit"
              value={maxAdminUsers}
              onChange={(e) => setMaxAdminUsers(e.target.value)}
              inputProps={{ min: 0 }}
              size="small"
              error={maxAdminUsers === '0' || maxAdminUsers === 0}
            />
            <FormHelperText>
              Optional. Set a company-wide limit on the number of Platform Admin users. Leave blank for no limit.
            </FormHelperText>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setAdminSettingsDialogOpen(false)}
            sx={{ textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setAdminSettingsDialogOpen(false)
              setSnackbar({
                open: true,
                message: maxAdminUsers ? `Max admin users set to ${maxAdminUsers}` : 'Admin limit removed'
              })
            }}
            disabled={maxAdminUsers === '0' || maxAdminUsers === 0}
            sx={{ textTransform: 'none' }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Set Visibility Dialog */}
      <Dialog
        open={visibilityDialogOpen}
        onClose={() => {
          setVisibilityDialogOpen(false)
          setVisibilityDialogUser(null)
          setVisibilitySearch('')
        }}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { height: 480 } }}
      >
        <DialogTitle>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Set Visibility
          </Typography>
          {visibilityDialogUser && (
            <Typography variant="body2" color="text.secondary">
              {visibilityDialogUser.name}
            </Typography>
          )}
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', p: 0 }}>
          {/* Inline find bar */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: 3,
              py: 1.5,
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <SearchIcon sx={{ color: 'text.secondary', fontSize: 20, mr: 1 }} />
            <InputBase
              placeholder="Find"
              value={visibilitySearch}
              onChange={(e) => setVisibilitySearch(e.target.value)}
              sx={{ flex: 1, fontSize: 14 }}
            />
          </Box>
          {/* Scrollable content area */}
          <Box
            sx={{
              flex: 1,
              overflow: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 3,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              This area will remain unchanged
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => {
              setVisibilityDialogOpen(false)
              setVisibilityDialogUser(null)
              setVisibilitySearch('')
            }}
            sx={{ textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setVisibilityDialogOpen(false)
              setVisibilityDialogUser(null)
              setVisibilitySearch('')
              setSnackbar({ open: true, message: 'Visibility settings saved' })
            }}
            sx={{ textTransform: 'none' }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

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

export default SeatsPageV10NoGroups

import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Autocomplete,
  Checkbox,
  Tabs,
  Tab,
  Tooltip,
  Menu,
  MenuItem,
  MenuList,
  InputBase,
  Popover,
  Card,
  CardContent,
  FormControlLabel,
  Link,
  Divider,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EditOutlined from '@mui/icons-material/EditOutlined'
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'
import GroupIcon from '@mui/icons-material/Group'
import SearchIcon from '@mui/icons-material/Search'
import DownloadIcon from '@mui/icons-material/Download'
import FilterListIcon from '@mui/icons-material/FilterList'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ViewColumnIcon from '@mui/icons-material/ViewColumn'
import ManageGroupsPanel from '../components/seats/ManageGroupsPanel'
import Indicator from '../components/core/Indicator'

// Mock initial groups - Generate 50 groups
const INITIAL_GROUPS = [
  { id: 1, name: 'APAC' },
  { id: 2, name: 'EMEA' },
  { id: 3, name: 'Engineering' },
  { id: 4, name: 'North America' },
  { id: 5, name: 'Product' },
  { id: 6, name: 'Operations' },
  { id: 7, name: 'Sales' },
  { id: 8, name: 'Marketing' },
  { id: 9, name: 'Finance' },
  { id: 10, name: 'Human Resources' },
  { id: 11, name: 'Legal' },
  { id: 12, name: 'Customer Support' },
  { id: 13, name: 'IT Infrastructure' },
  { id: 14, name: 'Data Science' },
  { id: 15, name: 'Quality Assurance' },
  { id: 16, name: 'Research & Development' },
  { id: 17, name: 'Business Development' },
  { id: 18, name: 'Corporate Strategy' },
  { id: 19, name: 'Facilities' },
  { id: 20, name: 'Procurement' },
  { id: 21, name: 'Latin America' },
  { id: 22, name: 'Middle East' },
  { id: 23, name: 'Africa' },
  { id: 24, name: 'Oceania' },
  { id: 25, name: 'Canada' },
  { id: 26, name: 'UK & Ireland' },
  { id: 27, name: 'Germany' },
  { id: 28, name: 'France' },
  { id: 29, name: 'Spain & Portugal' },
  { id: 30, name: 'Nordics' },
  { id: 31, name: 'Japan' },
  { id: 32, name: 'China' },
  { id: 33, name: 'India' },
  { id: 34, name: 'Southeast Asia' },
  { id: 35, name: 'Australia' },
  { id: 36, name: 'Frontend Engineering' },
  { id: 37, name: 'Backend Engineering' },
  { id: 38, name: 'Mobile Engineering' },
  { id: 39, name: 'DevOps' },
  { id: 40, name: 'Security' },
  { id: 41, name: 'Product Design' },
  { id: 42, name: 'UX Research' },
  { id: 43, name: 'Content Marketing' },
  { id: 44, name: 'Growth Marketing' },
  { id: 45, name: 'Enterprise Sales' },
  { id: 46, name: 'SMB Sales' },
  { id: 47, name: 'Partnerships' },
  { id: 48, name: 'Customer Success' },
  { id: 49, name: 'Training & Education' },
  { id: 50, name: 'Executive Leadership' },
]

// Mock initial users with status and last active
const INITIAL_USERS = [
  {
    id: 1,
    name: 'Alice Bergson',
    email: 'alice.bergson@company.com',
    groups: [2], // EMEA
    status: 'Active',
    lastActive: '59m ago',
  },
  {
    id: 2,
    name: 'Bobby Bonds',
    email: 'bobby.bonds@company.com',
    groups: [1, 6], // APAC, Operations
    status: 'Active',
    lastActive: '3h ago',
  },
  {
    id: 3,
    name: 'Daniel Smith',
    email: 'daniel.smith@company.com',
    groups: [1, 2, 3, 4, 5], // APAC, EMEA, +3 more
    status: 'Active',
    lastActive: 'Oct 1, 2025',
  },
  {
    id: 4,
    name: 'Evan Fischer',
    email: 'evan.fischer@company.com',
    groups: [4, 6, 3, 5, 7, 8, 1, 2], // North America, Operations, +8 total
    status: 'Pending',
    lastActive: '—',
  },
  {
    id: 5,
    name: 'Grace Hooper',
    email: 'grace.hooper@company.com',
    groups: [], // No groups
    status: 'Active',
    lastActive: '1h ago',
  },
  {
    id: 6,
    name: 'Ophelia Fitzgerald',
    email: 'ophelia.fitzgerald@company.com',
    groups: [1, 3, 5], // APAC, Engineering, +3
    status: 'Active',
    lastActive: 'Oct 1, 2025',
  },
  {
    id: 7,
    name: 'Chen Wei',
    email: 'chen.wei@company.com',
    groups: [1, 7], // APAC, Sales
    status: 'Active',
    lastActive: '2h ago',
  },
  {
    id: 8,
    name: 'Maria Garcia',
    email: 'maria.garcia@company.com',
    groups: [2, 8], // EMEA, Marketing
    status: 'Active',
    lastActive: '5h ago',
  },
  {
    id: 9,
    name: 'James Wilson',
    email: 'james.wilson@company.com',
    groups: [4], // North America
    status: 'Inactive',
    lastActive: 'Oct 15, 2025',
  },
  {
    id: 10,
    name: 'Priya Patel',
    email: 'priya.patel@company.com',
    groups: [1, 3], // APAC, Engineering
    status: 'Active',
    lastActive: '30m ago',
  },
  {
    id: 11,
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@company.com',
    groups: [2, 5, 6], // EMEA, Product, Operations
    status: 'Active',
    lastActive: '1d ago',
  },
  {
    id: 12,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    groups: [4, 7], // North America, Sales
    status: 'Pending',
    lastActive: '—',
  },
  {
    id: 13,
    name: 'Liam O\'Connor',
    email: 'liam.oconnor@company.com',
    groups: [2, 3, 5], // EMEA, Engineering, Product
    status: 'Active',
    lastActive: '4h ago',
  },
  {
    id: 14,
    name: 'Yuki Tanaka',
    email: 'yuki.tanaka@company.com',
    groups: [1, 6], // APAC, Operations
    status: 'Active',
    lastActive: '15m ago',
  },
  {
    id: 15,
    name: 'Isabella Rossi',
    email: 'isabella.rossi@company.com',
    groups: [2], // EMEA
    status: 'Inactive',
    lastActive: 'Oct 20, 2025',
  },
]

function UsersPage({ chatOpen = false }) {
  const navigate = useNavigate()
  const [groups, setGroups] = useState(INITIAL_GROUPS)
  const [users, setUsers] = useState(INITIAL_USERS)
  const [selectedUsers, setSelectedUsers] = useState([])
  const [tabValue, setTabValue] = useState(0)

  // Status filters (multi-select)
  const [statusFilters, setStatusFilters] = useState([]) // Array of status strings: ['Active', 'Pending', 'Inactive']

  // Group filters (multi-select)
  const [groupFilters, setGroupFilters] = useState([]) // Array of group IDs

  // Manage Groups Panel
  const [groupsPanelOpen, setGroupsPanelOpen] = useState(false)

  // User creation/edit dialog
  const [userDialogOpen, setUserDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userGroups, setUserGroups] = useState([])
  const [userError, setUserError] = useState('')

  // Menus
  const [filterMenuAnchor, setFilterMenuAnchor] = useState(null)
  const [moreMenuAnchor, setMoreMenuAnchor] = useState(null)

  // Available status options
  const STATUS_OPTIONS = ['Active', 'Pending', 'Inactive']

  // Groups preview popover
  const [groupsPopoverAnchor, setGroupsPopoverAnchor] = useState(null)
  const [hoveredUser, setHoveredUser] = useState(null)

  // Get group name by ID
  const getGroupName = (groupId) => {
    return groups.find((g) => g.id === groupId)?.name || 'Unknown'
  }

  // Handle select all
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedUsers(filteredUsers.map((user) => user.id))
    } else {
      setSelectedUsers([])
    }
  }

  // Handle select one
  const handleSelectOne = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId))
    } else {
      setSelectedUsers([...selectedUsers, userId])
    }
  }

  // Open create user dialog
  const handleOpenCreateDialog = () => {
    setEditingUser(null)
    setUserName('')
    setUserEmail('')
    setUserGroups([])
    setUserError('')
    setUserDialogOpen(true)
  }

  // Open edit user dialog
  const handleOpenEditDialog = (user) => {
    setEditingUser(user)
    setUserName(user.name)
    setUserEmail(user.email)
    setUserGroups(groups.filter((g) => user.groups.includes(g.id)))
    setUserError('')
    setUserDialogOpen(true)
  }

  // Close user dialog
  const handleCloseUserDialog = () => {
    setUserDialogOpen(false)
    setEditingUser(null)
    setUserName('')
    setUserEmail('')
    setUserGroups([])
    setUserError('')
  }

  // Create or update user
  const handleSaveUser = () => {
    // Validate name
    if (!userName.trim()) {
      setUserError('Name is required')
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!userEmail.trim()) {
      setUserError('Email is required')
      return
    }
    if (!emailRegex.test(userEmail)) {
      setUserError('Please enter a valid email address')
      return
    }

    // Check if email already exists (excluding current user if editing)
    if (
      users.some(
        (u) => u.email.toLowerCase() === userEmail.toLowerCase() && u.id !== editingUser?.id
      )
    ) {
      setUserError('A user with this email already exists')
      return
    }

    if (editingUser) {
      // Update existing user
      setUsers(
        users.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                name: userName.trim(),
                email: userEmail.trim(),
                groups: userGroups.map((g) => g.id),
              }
            : user
        )
      )
    } else {
      // Create new user
      const newUser = {
        id: Math.max(...users.map((u) => u.id), 0) + 1,
        name: userName.trim(),
        email: userEmail.trim(),
        groups: userGroups.map((g) => g.id),
        status: 'Pending',
        lastActive: '—',
      }
      setUsers([...users, newUser])
    }

    handleCloseUserDialog()
  }

  // Delete user
  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers(users.filter((user) => user.id !== userId))
      setSelectedUsers(selectedUsers.filter((id) => id !== userId))
    }
  }

  // Handle groups popover
  const handleGroupsMouseEnter = (event, user) => {
    if (user.groups.length > 2) {
      setGroupsPopoverAnchor(event.currentTarget)
      setHoveredUser(user)
    }
  }

  const handleGroupsMouseLeave = () => {
    setGroupsPopoverAnchor(null)
    setHoveredUser(null)
  }

  // Handle filter toggle
  const handleFilterToggle = (status) => {
    if (statusFilters.includes(status)) {
      setStatusFilters(statusFilters.filter((s) => s !== status))
    } else {
      setStatusFilters([...statusFilters, status])
    }
  }

  // Clear all filters
  const handleClearFilters = () => {
    setStatusFilters([])
    setGroupFilters([])
  }

  // Handle group click from panel
  const handleGroupClick = (groupId) => {
    setGroupFilters([groupId])
    setGroupsPanelOpen(false)
  }

  // Export to CSV
  const _handleExport = () => {
    const csvContent = [
      ['Name', 'Email', 'Groups', 'Status', 'Last Active'].join(','),
      ...users.map((user) =>
        [
          user.name,
          user.email,
          user.groups.map((gId) => getGroupName(gId)).join('; '),
          user.status,
          user.lastActive,
        ].join(',')
      ),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'users-export.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  // Filter users based on status and group filters
  const filteredUsers = useMemo(() => {
    if (tabValue === 1) return []
    return users.filter((user) => {
      // Apply status filter
      const matchesStatus = statusFilters.length === 0 || statusFilters.includes(user.status)

      // Apply group filter (user must be in ALL selected groups)
      const matchesGroups = groupFilters.length === 0 || groupFilters.every((groupId) => user.groups.includes(groupId))

      return matchesStatus && matchesGroups
    })
  }, [users, statusFilters, groupFilters, tabValue])

  // Get filter button label
  const getFilterLabel = () => {
    const totalFilters = statusFilters.length + groupFilters.length
    if (totalFilters === 0) return 'Filter'
    if (totalFilters === 1) {
      if (statusFilters.length === 1) return `Filter: ${statusFilters[0]}`
      if (groupFilters.length === 1) return `Filter: ${getGroupName(groupFilters[0])}`
    }
    return `Filter: ${totalFilters}`
  }

  return (
    <Box sx={{ height: 'calc(100vh)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Top Toolbar - Sticky */}
      <Box sx={{
        backgroundColor: 'background.paper',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 2,
          py: 1,
        }}>
          {/* Back Button */}
          <Tooltip title="Back to Home">
            <IconButton size="small" onClick={() => navigate('/')} sx={{ color: 'text.secondary', p: 0.5 }}>
              <ArrowBackIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>
          <Divider orientation="vertical" flexItem />

          {/* Spacer */}
          <Box sx={{ flex: 1 }} />

          {/* Action Buttons */}
          <Button
            variant="text"
            startIcon={<GroupIcon />}
            onClick={() => setGroupsPanelOpen(true)}
            sx={{ color: 'text.primary', textTransform: 'none', fontWeight: 500 }}
          >
            Manage Groups
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={handleOpenCreateDialog}
            sx={{ textTransform: 'none', fontWeight: 500 }}
          >
            Create User
          </Button>
        </Box>
        <Divider />
      </Box>

      {/* Main Content Area */}
      <Box sx={{ backgroundColor: 'grey.100', flex: 1, px: 2, pt: 2, overflow: 'auto' }}>
        <Box sx={{ maxWidth: 1536, mx: 'auto' }}>

      {/* Tabs */}
      <Box sx={{ mb: 2 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="Users" />
          <Tab label="External" />
        </Tabs>
      </Box>

      {/* Users Table with Controls */}
      <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
        {/* Table Controls - Option A Pattern */}
        <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', height: 60, display: 'flex', alignItems: 'center', px: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
            {/* Left: Count */}
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {filteredUsers.length}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Users
              </Typography>
              <Tooltip title="User management interface">
                <IconButton size="small" sx={{ color: 'text.secondary' }}>
                  <Typography variant="body2">ⓘ</Typography>
                </IconButton>
              </Tooltip>
            </Stack>

            {/* Right: Find, Filter, Settings */}
        <Stack direction="row" spacing={1} alignItems="center">
          {/* Find */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '20px',
              px: 2,
              py: 0.5,
              minWidth: 200,
              backgroundColor: 'background.paper',
            }}
          >
            <SearchIcon sx={{ fontSize: 20, color: 'text.secondary', mr: 1 }} />
            <InputBase
              placeholder="Find"
              sx={{
                flex: 1,
                fontSize: 14,
                '& input::placeholder': {
                  color: 'text.secondary',
                  opacity: 1,
                },
              }}
            />
          </Box>

          {/* Filter */}
          <Button
            variant="outlined"
            size="small"
            startIcon={<FilterListIcon />}
            onClick={(e) => setFilterMenuAnchor(e.currentTarget)}
            sx={{
              borderRadius: '20px',
              textTransform: 'none',
              minWidth: 100,
            }}
          >
            {getFilterLabel()}
          </Button>

          {/* View Icons */}
          <IconButton size="small" sx={{ border: '1px solid', borderColor: 'divider' }}>
            <ViewColumnIcon fontSize="small" />
          </IconButton>

          <IconButton size="small" sx={{ border: '1px solid', borderColor: 'divider' }}>
            <DownloadIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            onClick={(e) => setMoreMenuAnchor(e.currentTarget)}
            sx={{ border: '1px solid', borderColor: 'divider' }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Stack>
          </Stack>
        </Box>

        {/* Active Filters */}
        {(groupFilters.length > 0 || statusFilters.length > 0) && (
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Stack direction="row" spacing={1}>
              {groupFilters.length > 0 && (
                <Alert severity="info" sx={{ flex: 1 }}>
                  Filtered by group:{' '}
                  {groupFilters.map((gId) => (
                    <Chip
                      key={gId}
                      label={getGroupName(gId)}
                      size="small"
                      onDelete={() => setGroupFilters(groupFilters.filter((id) => id !== gId))}
                      sx={{ ml: 0.5 }}
                    />
                  ))}
                </Alert>
              )}
              {statusFilters.length > 0 && (
                <Alert severity="info" sx={{ flex: 1 }}>
                  Filtered by status:{' '}
                  {statusFilters.map((status) => (
                    <Chip
                      key={status}
                      label={status}
                      size="small"
                      onDelete={() => setStatusFilters(statusFilters.filter((s) => s !== status))}
                      sx={{ ml: 0.5 }}
                    />
                  ))}
                </Alert>
              )}
            </Stack>
          </Box>
        )}

        {/* Users Table */}
        <TableContainer>
          <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" sx={{
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  right: 0,
                  top: '25%',
                  height: '50%',
                  width: '1px',
                  backgroundColor: 'divider'
                }
              }}>
                <Checkbox
                  indeterminate={selectedUsers.length > 0 && selectedUsers.length < filteredUsers.length}
                  checked={filteredUsers.length > 0 && selectedUsers.length === filteredUsers.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell sx={{
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  right: 0,
                  top: '25%',
                  height: '50%',
                  width: '1px',
                  backgroundColor: 'divider'
                }
              }}>
                <strong>Name</strong>
              </TableCell>
              <TableCell sx={{
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  right: 0,
                  top: '25%',
                  height: '50%',
                  width: '1px',
                  backgroundColor: 'divider'
                }
              }}>
                <strong>Groups</strong>
              </TableCell>
              <TableCell sx={{
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  right: 0,
                  top: '25%',
                  height: '50%',
                  width: '1px',
                  backgroundColor: 'divider'
                }
              }}>
                <strong>Status</strong>
              </TableCell>
              <TableCell sx={{
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  right: 0,
                  top: '25%',
                  height: '50%',
                  width: '1px',
                  backgroundColor: 'divider'
                }
              }}>
                <strong>Last active</strong>
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: 'center', py: 8 }}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No Users Found
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Try adjusting your filters to see more results.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow
                  key={user.id}
                  hover
                  selected={selectedUsers.includes(user.id)}
                  sx={{
                    cursor: 'pointer',
                    '& .action-buttons': {
                      opacity: 0,
                      transition: 'opacity 0.2s',
                    },
                    '&:hover .action-buttons': {
                      opacity: 1,
                    },
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectOne(user.id)}
                    />
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell
                    onMouseEnter={(e) => handleGroupsMouseEnter(e, user)}
                    onMouseLeave={handleGroupsMouseLeave}
                  >
                    {user.groups.length === 0 ? (
                      <Typography variant="body2" color="text.secondary">
                        —
                      </Typography>
                    ) : (
                      <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                        {user.groups.slice(0, 2).map((groupId) => (
                          <Indicator
                            key={groupId}
                            label={getGroupName(groupId)}
                            size="small"
                            color="gray"
                            startIcon={<GroupIcon sx={{ fontSize: 'inherit' }} />}
                          />
                        ))}
                        {user.groups.length > 2 && (
                          <Indicator
                            label={`+${user.groups.length - 2}`}
                            size="small"
                            color="gray"
                            startIcon={<GroupIcon sx={{ fontSize: 'inherit' }} />}
                          />
                        )}
                      </Stack>
                    )}
                  </TableCell>
                  <TableCell>
                    <Indicator label={user.status} status={user.status} size="small" />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{user.lastActive}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={0.5} justifyContent="flex-end" className="action-buttons">
                      <Tooltip title="Edit User">
                        <IconButton size="small" onClick={() => handleOpenEditDialog(user)}>
                          <EditOutlined fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete User">
                        <IconButton size="small" onClick={() => handleDeleteUser(user.id)}>
                          <DeleteOutlined fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* End of Table Indicator */}
        {filteredUsers.length > 0 && (
          <Box
            sx={{
              p: 2,
              textAlign: 'center',
              borderTop: '1px solid',
              borderColor: 'divider',
              backgroundColor: 'background.default'
            }}
          >
            <Typography variant="caption" color="text.secondary">
              End of list • {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'} total
            </Typography>
          </Box>
        )}
      </TableContainer>
      </Paper>

      {/* Filter Menu */}
      <Menu
        anchorEl={filterMenuAnchor}
        open={Boolean(filterMenuAnchor)}
        onClose={() => setFilterMenuAnchor(null)}
        PaperProps={{
          sx: { minWidth: 220 }
        }}
      >
        {/* Header with count and clear */}
        <Box sx={{ px: 2, py: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
            Filters{(statusFilters.length + groupFilters.length) > 0 && ` (${statusFilters.length + groupFilters.length})`}
          </Typography>
          {(statusFilters.length > 0 || groupFilters.length > 0) && (
            <Link
              component="button"
              variant="caption"
              onClick={handleClearFilters}
              sx={{ cursor: 'pointer', textDecoration: 'none' }}
            >
              Clear All
            </Link>
          )}
        </Box>

        {/* Status section */}
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
            STATUS
          </Typography>
        </Box>
        <MenuList sx={{ py: 0 }}>
          {STATUS_OPTIONS.map((status) => (
            <MenuItem
              key={status}
              onClick={() => handleFilterToggle(status)}
              sx={{ py: 0.5 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={statusFilters.includes(status)}
                    size="small"
                  />
                }
                label={status}
                sx={{ m: 0, width: '100%' }}
              />
            </MenuItem>
          ))}
        </MenuList>

        <Divider sx={{ my: 1 }} />

        {/* Groups section */}
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
            GROUPS
          </Typography>
        </Box>
        <MenuList sx={{ py: 0, maxHeight: 200, overflow: 'auto' }}>
          {groups.map((group) => (
            <MenuItem
              key={group.id}
              onClick={() => {
                if (groupFilters.includes(group.id)) {
                  setGroupFilters(groupFilters.filter((id) => id !== group.id))
                } else {
                  setGroupFilters([...groupFilters, group.id])
                }
              }}
              sx={{ py: 0.5 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={groupFilters.includes(group.id)}
                    size="small"
                  />
                }
                label={group.name}
                sx={{ m: 0, width: '100%' }}
              />
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      {/* More Menu */}
      <Menu
        anchorEl={moreMenuAnchor}
        open={Boolean(moreMenuAnchor)}
        onClose={() => setMoreMenuAnchor(null)}
      >
        <MenuItem onClick={() => setMoreMenuAnchor(null)}>Bulk Edit</MenuItem>
        <MenuItem onClick={() => setMoreMenuAnchor(null)}>Delete Selected</MenuItem>
      </Menu>

      {/* User Create/Edit Dialog */}
      <Dialog open={userDialogOpen} onClose={handleCloseUserDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingUser ? `Edit ${editingUser.name}` : 'Create New User'}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {editingUser
              ? 'Update user information and group assignments.'
              : 'Add a new user and optionally assign them to groups.'}
          </Typography>

          <Stack spacing={3}>
            <TextField
              autoFocus
              fullWidth
              label="Name"
              placeholder="e.g., John Doe"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value)
                setUserError('')
              }}
              error={!!userError && !userName.trim()}
              helperText={!userName.trim() && userError ? userError : ''}
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              placeholder="e.g., john.doe@company.com"
              value={userEmail}
              onChange={(e) => {
                setUserEmail(e.target.value)
                setUserError('')
              }}
              error={!!userError && userError.toLowerCase().includes('email')}
              helperText={
                userError.toLowerCase().includes('email') ? userError : 'Must be a valid email address'
              }
            />

            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Assign Groups (Optional)
              </Typography>
              {userGroups.length >= 10 && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                  Maximum of 10 groups per user reached.
                </Alert>
              )}
              <Autocomplete
                multiple
                options={groups}
                getOptionLabel={(option) => option.name}
                value={userGroups}
                onChange={(event, newValue) => {
                  if (newValue.length <= 10) {
                    setUserGroups(newValue)
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder={userGroups.length === 0 ? 'Select groups...' : ''}
                    helperText={`${userGroups.length}/10 groups selected`}
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip label={option.name} {...getTagProps({ index })} />
                  ))
                }
                getOptionDisabled={() => userGroups.length >= 10}
              />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUserDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSaveUser}
            disabled={!userName.trim() || !userEmail.trim()}
          >
            {editingUser ? 'Save Changes' : 'Create User'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Groups Preview Popover */}
      <Popover
        open={Boolean(groupsPopoverAnchor)}
        anchorEl={groupsPopoverAnchor}
        onClose={handleGroupsMouseLeave}
        disableRestoreFocus
        sx={{
          pointerEvents: 'none',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Card sx={{ minWidth: 200, maxWidth: 300, pointerEvents: 'none' }} elevation={3}>
          <CardContent>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
              {hoveredUser?.name}'s Groups
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1.5, display: 'block' }}>
              {hoveredUser?.groups.length}/10 Assigned
            </Typography>
            <Stack spacing={1}>
              {hoveredUser?.groups.map((groupId) => (
                <Box key={groupId} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <GroupIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2">{getGroupName(groupId)}</Typography>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Popover>
        </Box>
      </Box>

      {/* Manage Groups Panel */}
      <ManageGroupsPanel
        open={groupsPanelOpen}
        onClose={() => setGroupsPanelOpen(false)}
        groups={groups}
        users={users}
        onGroupsChange={setGroups}
        onUsersChange={setUsers}
        onGroupClick={handleGroupClick}
        chatOpen={chatOpen}
      />
    </Box>
  )
}

export default UsersPage

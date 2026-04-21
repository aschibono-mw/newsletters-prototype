import { useState, useMemo } from 'react'
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
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined'
import CloseIcon from '@mui/icons-material/Close'
import Indicator from '../components/core/Indicator'
import TableHeader from '../components/core/TableHeader'
import QuickBulkSeatChange from '../components/seats/QuickBulkSeatChange'
import UserQuickEditSidebar from '../components/seats/UserQuickEditSidebar'
import {
  INITIAL_ROLES,
  INITIAL_GROUPS,
  INITIAL_USERS_V5,
  INITIAL_INTERNAL_USERS_V5,
  canAssignRole,
} from '../data/seatsData'

// Seat stats config matching V6 design
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
  'no-access': null,
}

function SeatsPageV7({ chatOpen = false }) {
  const navigate = useNavigate()

  // Data state
  const [users, setUsers] = useState(INITIAL_USERS_V5)
  const [internalUsers, setInternalUsers] = useState(INITIAL_INTERNAL_USERS_V5)
  const [roles] = useState(INITIAL_ROLES)
  const [groups] = useState(INITIAL_GROUPS)

  // UI state
  const [tabValue, setTabValue] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

  // Quick edit sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarUser, setSidebarUser] = useState(null)

  // Bulk action state
  const [bulkSeatAnchor, setBulkSeatAnchor] = useState(null)

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

  // Filter users based on tab and search
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

    return result
  }, [users, internalUsers, tabValue, searchQuery])

  // Helper functions
  const getRoleLabel = (id) => roles.find((r) => r.id === id)?.label || '—'

  const getSelectedUserObjects = () => {
    const currentList = tabValue === 0 ? users : internalUsers
    return currentList.filter((u) => selectedUsers.includes(u.id))
  }

  // Selection handlers
  const handleSelectAll = (e) => {
    setSelectedUsers(e.target.checked ? filteredUsers.map((u) => u.id) : [])
  }

  const handleSelectOne = (id, e) => {
    e.stopPropagation()
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  // Row click opens sidebar
  const handleRowClick = (user) => {
    if (selectedUsers.length > 0) return // Don't open sidebar in selection mode
    setSidebarUser(user)
    setSidebarOpen(true)
  }

  // Sidebar handlers
  const handleCloseSidebar = () => {
    setSidebarOpen(false)
    setSidebarUser(null)
  }

  const handleSidebarSave = (updatedUser) => {
    const setterFn = tabValue === 0 ? setUsers : setInternalUsers
    setterFn((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    )
    setSnackbar({ open: true, message: `${updatedUser.name} updated` })
  }

  const handleEditUser = (user) => {
    navigate(`/seats-v7/users/${user.id}`)
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

  // Seat type label helper
  const getSeatLabel = (seatType) => {
    const labels = { admin: 'Admin', standard: 'Standard', 'view-only': 'View-Only', 'no-access': 'No Access' }
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
              User Management
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button
              variant="outlined"
              onClick={() => navigate('/seats-v7/roles')}
              sx={{ textTransform: 'none', fontWeight: 500 }}
            >
              Manage Roles
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/seats-v7/workspaces')}
              sx={{ textTransform: 'none', fontWeight: 500 }}
            >
              Manage Workspaces
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ textTransform: 'none', fontWeight: 500 }}
            >
              Add User
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

        {/* Main Table Card */}
        <Paper sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
          {/* Table Header */}
          <TableHeader
            title="Users"
            count={filteredUsers.length}
            showFind
            findValue={searchQuery}
            onFindChange={setSearchQuery}
            selectedCount={selectedUsers.length}
            onClearSelection={() => setSelectedUsers([])}
            itemLabel="Users"
            selectedActions={[
              {
                label: 'Change Seat',
                onClick: (e) => setBulkSeatAnchor(e.currentTarget),
              },
            ]}
          />

          {/* Table */}
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableCell padding="checkbox" sx={{ width: 48 }}>
                    <Checkbox
                      indeterminate={selectedUsers.length > 0 && selectedUsers.length < filteredUsers.length}
                      checked={filteredUsers.length > 0 && selectedUsers.length === filteredUsers.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '35%' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '25%' }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '20%' }}>Seat Type</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '20%' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} sx={{ textAlign: 'center', py: 6 }}>
                      <Typography color="text.secondary">No users found</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow
                      key={user.id}
                      hover
                      selected={selectedUsers.includes(user.id)}
                      onClick={() => handleRowClick(user)}
                      sx={{
                        cursor: selectedUsers.length > 0 ? 'default' : 'pointer',
                        '&:hover': {
                          backgroundColor: selectedUsers.length > 0 ? undefined : 'action.hover',
                        },
                      }}
                    >
                      <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedUsers.includes(user.id)}
                          onChange={(e) => handleSelectOne(user.id, e)}
                        />
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {user.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }}>
                            {user.email}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.role ? getRoleLabel(user.role).replace('Explore+ ', '').replace(' User', '') : 'None'}
                          size="small"
                          variant={user.role ? 'outlined' : 'filled'}
                          sx={{
                            backgroundColor: user.role ? 'transparent' : 'grey.100',
                            fontSize: 12,
                          }}
                        />
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
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      {/* Quick Edit Sidebar */}
      <UserQuickEditSidebar
        open={sidebarOpen}
        user={sidebarUser}
        roles={roles}
        groups={groups}
        chatOpen={chatOpen}
        onClose={handleCloseSidebar}
        onSave={handleSidebarSave}
        onEditUser={handleEditUser}
      />

      {/* Bulk Seat Change Popover */}
      <QuickBulkSeatChange
        anchorEl={bulkSeatAnchor}
        open={Boolean(bulkSeatAnchor)}
        onClose={() => setBulkSeatAnchor(null)}
        selectedUsers={getSelectedUserObjects()}
        seatUsage={{ users: { used: seatUsage.admin + seatUsage.standard, limit: 20 }, 'view-only-users': { used: seatUsage['view-only'], limit: 15 } }}
        onApply={handleBulkSeatChange}
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

export default SeatsPageV7

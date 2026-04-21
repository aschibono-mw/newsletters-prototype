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
  Tab,
  Snackbar,
  Slide,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import Indicator from '../components/core/Indicator'
import TableHeader from '../components/core/TableHeader'
import QuickBulkSeatChange from '../components/seats/QuickBulkSeatChange'
import UserPermissionsDialog from '../components/seats/UserPermissionsDialog'
import {
  INITIAL_ROLES,
  INITIAL_GROUPS,
  INITIAL_USERS_V5,
  INITIAL_INTERNAL_USERS_V5,
  canAssignRole,
} from '../data/seatsData'

const SEAT_STATS = [
  { id: 'admin', label: 'Admin Users', icon: AdminPanelSettingsOutlinedIcon, color: '#9C27B0', bgColor: 'rgba(156, 39, 176, 0.12)' },
  { id: 'standard', label: 'Standard Users', icon: PersonOutlineIcon, color: '#FF9800', bgColor: 'rgba(255, 152, 0, 0.12)' },
  { id: 'view-only', label: 'View-Only Users', icon: VisibilityOutlinedIcon, color: '#00827F', bgColor: 'rgba(0, 130, 127, 0.12)' },
  { id: 'no-access', label: 'No Suite Access', icon: BlockOutlinedIcon, color: '#9E9E9E', bgColor: 'rgba(158, 158, 158, 0.12)' },
]

const SEAT_LIMITS = {
  admin: 10,
  standard: 10,
  'view-only': 15,
  'no-access': null,
}

function SeatsPageV8() {
  const navigate = useNavigate()

  const [users, setUsers] = useState(INITIAL_USERS_V5)
  const [internalUsers, setInternalUsers] = useState(INITIAL_INTERNAL_USERS_V5)
  const [roles] = useState(INITIAL_ROLES)

  const [tabValue, setTabValue] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

  // Pagination state
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(25)

  // Sorting state
  const [sortBy, setSortBy] = useState('name')
  const [sortDirection, setSortDirection] = useState('asc')

  const [bulkSeatOpen, setBulkSeatOpen] = useState(false)

  // Permissions dialog state
  const [permissionsDialogOpen, setPermissionsDialogOpen] = useState(false)
  const [permissionsUser, setPermissionsUser] = useState(null)

  // Delete confirmation dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)

  // Bulk delete confirmation dialog state
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false)

  // Loading state for table
  const [isLoading, setIsLoading] = useState(true)

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

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

    // Sort the results
    result = [...result].sort((a, b) => {
      let aVal, bVal
      switch (sortBy) {
        case 'name':
          aVal = a.name.toLowerCase()
          bVal = b.name.toLowerCase()
          break
        case 'role':
          aVal = a.role || ''
          bVal = b.role || ''
          break
        case 'seatType':
          aVal = a.seatType || ''
          bVal = b.seatType || ''
          break
        case 'status':
          aVal = a.status || ''
          bVal = b.status || ''
          break
        default:
          return 0
      }
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

    return result
  }, [users, internalUsers, tabValue, searchQuery, sortBy, sortDirection])

  // Paginated users for current page
  const paginatedUsers = useMemo(() => {
    const startIndex = page * rowsPerPage
    return filteredUsers.slice(startIndex, startIndex + rowsPerPage)
  }, [filteredUsers, page, rowsPerPage])

  const getRoleLabel = (id) => roles.find((r) => r.id === id)?.label || '—'

  const getSelectedUserObjects = () => {
    const currentList = tabValue === 0 ? users : internalUsers
    return currentList.filter((u) => selectedUsers.includes(u.id))
  }

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Reset page when filters change
  const handleSearchChange = (value) => {
    setSearchQuery(value)
    setPage(0)
  }

  const handleTabChange = (e, v) => {
    setTabValue(v)
    setPage(0)
    setSelectedUsers([])
  }

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortDirection('asc')
    }
  }

  const handleSelectAll = (e) => {
    setSelectedUsers(e.target.checked ? paginatedUsers.map((u) => u.id) : [])
  }

  const handleSelectOne = (id, e) => {
    e.stopPropagation()
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  // Row click navigates to edit profile
  const handleRowClick = (user) => {
    if (selectedUsers.length > 0) return
    navigate(`/seats-v8/users/${user.id}/profile`)
  }

  // Edit action (same as row click)
  const handleEditUser = (user, e) => {
    e.stopPropagation()
    navigate(`/seats-v8/users/${user.id}/profile`)
  }

  // View permissions action
  const handleViewPermissions = (user, e) => {
    e.stopPropagation()
    setPermissionsUser(user)
    setPermissionsDialogOpen(true)
  }

  // Delete action - show confirmation
  const handleDeleteClick = (user, e) => {
    e.stopPropagation()
    setUserToDelete(user)
    setDeleteDialogOpen(true)
  }

  // Confirm delete
  const handleConfirmDelete = () => {
    if (!userToDelete) return
    const setterFn = tabValue === 0 ? setUsers : setInternalUsers
    setterFn((prev) => prev.filter((u) => u.id !== userToDelete.id))
    setSnackbar({ open: true, message: `${userToDelete.name} has been deleted` })
    setDeleteDialogOpen(false)
    setUserToDelete(null)
  }

  // Cancel delete
  const handleCancelDelete = () => {
    setDeleteDialogOpen(false)
    setUserToDelete(null)
  }

  // Bulk delete handlers
  const handleConfirmBulkDelete = () => {
    const setterFn = tabValue === 0 ? setUsers : setInternalUsers
    setterFn((prev) => prev.filter((u) => !selectedUsers.includes(u.id)))
    setSnackbar({ open: true, message: `${selectedUsers.length} users deleted` })
    setBulkDeleteDialogOpen(false)
    setSelectedUsers([])
  }

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
    setBulkSeatOpen(false)
    setSelectedUsers([])
  }

  const getSeatLabel = (seatType) => {
    const labels = { admin: 'Admin', standard: 'Standard', 'view-only': 'View-Only', 'no-access': 'No Access' }
    return labels[seatType] || seatType
  }

  const handleDownloadCsv = () => {
    const selectedUserObjects = getSelectedUserObjects()
    const headers = ['Name', 'Email', 'Role', 'Seat Type', 'Status']
    const rows = selectedUserObjects.map((user) => [
      user.name,
      user.email,
      user.role ? getRoleLabel(user.role) : 'None',
      getSeatLabel(user.seatType),
      user.status,
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `users-export-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    URL.revokeObjectURL(url)

    setSnackbar({ open: true, message: `Downloaded ${selectedUserObjects.length} users` })
  }

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        backgroundColor: 'grey.100',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
          width: 8,
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'transparent',
          borderRadius: 4,
        },
        '&:hover::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        },
      }}
    >
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
              onClick={() => navigate('/seats-v8/roles')}
              sx={{ textTransform: 'none', fontWeight: 500 }}
            >
              Manage Roles
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/seats-v8/workspaces')}
              sx={{ textTransform: 'none', fontWeight: 500 }}
            >
              Manage Workspaces
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate('/seats-v8/users/new')}
              sx={{ textTransform: 'none', fontWeight: 500 }}
            >
              Create User
            </Button>
          </Stack>
        </Stack>
      </Box>

      <Box sx={{ p: 3, maxWidth: 1400, mx: 'auto' }}>
        <Box sx={{ mb: 3 }}>
          <Stack direction="row" alignItems="baseline" spacing={1} sx={{ mb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Total Seats
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 400 }}>
              {totalSeats}
            </Typography>
          </Stack>
          <Tooltip
            title="Seats determine what level of access users have to the platform. Admin seats have full access, Standard seats can create and edit, View-Only seats can only view content, and No Access seats are for users who don't need platform access."
            arrow
            placement="bottom-start"
          >
            <Typography
              component="span"
              sx={{
                fontSize: 14,
                color: 'text.secondary',
                textDecoration: 'underline',
                textDecorationStyle: 'dotted',
                textUnderlineOffset: 3,
                cursor: 'help',
                '&:hover': {
                  color: 'text.primary',
                },
              }}
            >
              How do seats work?
            </Typography>
          </Tooltip>
        </Box>

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

        <Stack direction="row" alignItems="flex-end" sx={{ mb: 0 }}>
          <Tab
            label={`Manage Users (${users.length})`}
            onClick={() => handleTabChange(null, 0)}
            sx={{
              textTransform: 'none',
              fontWeight: tabValue === 0 ? 600 : 500,
              color: tabValue === 0 ? 'primary.main' : 'text.primary',
              borderBottom: '2px solid',
              borderColor: tabValue === 0 ? 'primary.main' : 'transparent',
              borderRadius: 0,
              mb: '-1px',
            }}
          />
          <Tab
            label={`Internal-Only (${internalUsers.length})`}
            onClick={() => handleTabChange(null, 1)}
            sx={{
              textTransform: 'none',
              fontWeight: tabValue === 1 ? 600 : 500,
              color: tabValue === 1 ? 'primary.main' : 'text.primary',
              borderBottom: '2px solid',
              borderColor: tabValue === 1 ? 'primary.main' : 'transparent',
              borderRadius: 0,
              mb: '-1px',
            }}
          />
        </Stack>

        <Paper sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
          <TableHeader
            title="Users"
            count={filteredUsers.length}
            showColumns
            showSort
            showFind
            findValue={searchQuery}
            onFindChange={handleSearchChange}
            selectedCount={selectedUsers.length}
            onClearSelection={() => setSelectedUsers([])}
            itemLabel="Users"
            selectedActions={[
              {
                label: 'Change Seat',
                onClick: () => setBulkSeatOpen(true),
              },
            ]}
            selectedIconActions={[
              {
                tooltip: 'Download selected users',
                icon: <FileDownloadOutlinedIcon fontSize="small" />,
                onClick: handleDownloadCsv,
              },
              {
                tooltip: 'Delete selected users',
                icon: <DeleteOutlinedIcon fontSize="small" />,
                onClick: () => setBulkDeleteDialogOpen(true),
              },
            ]}
          />

          <TableContainer>
            <Table size="medium" sx={{ tableLayout: 'fixed' }}>
              <TableHead>
                <TableRow sx={{
                  backgroundColor: 'background.paper',
                  '& th': {
                    borderBottom: '1px solid',
                    borderColor: 'text.secondary',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      right: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      height: '50%',
                      width: '1px',
                      backgroundColor: 'grey.300',
                    },
                  },
                  '& th:last-child::after': {
                    display: 'none',
                  },
                }}>
                  <TableCell padding="checkbox" sx={{ width: 48 }}>
                    <Tooltip title="Select all">
                      <Checkbox
                        indeterminate={selectedUsers.length > 0 && selectedUsers.length < paginatedUsers.length}
                        checked={paginatedUsers.length > 0 && selectedUsers.length === paginatedUsers.length}
                        onChange={handleSelectAll}
                      />
                    </Tooltip>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '30%' }}>
                    <TableSortLabel
                      active={sortBy === 'name'}
                      direction={sortBy === 'name' ? sortDirection : 'asc'}
                      onClick={() => handleSort('name')}
                    >
                      Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '20%' }}>
                    <TableSortLabel
                      active={sortBy === 'role'}
                      direction={sortBy === 'role' ? sortDirection : 'asc'}
                      onClick={() => handleSort('role')}
                    >
                      Role
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '15%' }}>
                    <TableSortLabel
                      active={sortBy === 'seatType'}
                      direction={sortBy === 'seatType' ? sortDirection : 'asc'}
                      onClick={() => handleSort('seatType')}
                    >
                      Seat Type
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '15%' }}>
                    <TableSortLabel
                      active={sortBy === 'status'}
                      direction={sortBy === 'status' ? sortDirection : 'asc'}
                      onClick={() => handleSort('status')}
                    >
                      Status
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ width: 100, '&::after': { display: 'none' } }} />
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  // Skeleton loading rows
                  [...Array(rowsPerPage)].map((_, index) => (
                    <TableRow key={`skeleton-${index}`}>
                      <TableCell padding="checkbox">
                        <Checkbox disabled />
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Skeleton variant="text" width="60%" height={20} />
                          <Skeleton variant="text" width="80%" height={16} />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="rounded" width={60} height={24} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width="70%" height={20} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="rounded" width={50} height={20} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width={80} height={20} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : paginatedUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} sx={{ textAlign: 'center', py: 6 }}>
                      <Typography color="text.secondary">No users found</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedUsers.map((user) => (
                    <TableRow
                      key={user.id}
                      hover
                      selected={selectedUsers.includes(user.id)}
                      onClick={() => handleRowClick(user)}
                      sx={{
                        cursor: selectedUsers.length > 0 ? 'default' : 'pointer',
                        '& .action-buttons': { opacity: 0 },
                        '&:hover .action-buttons': { opacity: 1 },
                      }}
                    >
                      <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                        <Tooltip title="Select">
                          <Checkbox
                            checked={selectedUsers.includes(user.id)}
                            onChange={(e) => handleSelectOne(user.id, e)}
                          />
                        </Tooltip>
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
                        <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>{getSeatLabel(user.seatType)}</Typography>
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
                          <Tooltip title="Edit user">
                            <IconButton size="small" onClick={(e) => handleEditUser(user, e)}>
                              <EditOutlinedIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="View permissions">
                            <IconButton size="small" onClick={(e) => handleViewPermissions(user, e)}>
                              <VisibilityOutlinedIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete user">
                            <IconButton size="small" onClick={(e) => handleDeleteClick(user, e)}>
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
          <TablePagination
            component="div"
            count={filteredUsers.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 25, 50, 100]}
          />
        </Paper>
      </Box>

      <QuickBulkSeatChange
        open={bulkSeatOpen}
        onClose={() => setBulkSeatOpen(false)}
        selectedUsers={getSelectedUserObjects()}
        seatUsage={{ users: { used: seatUsage.admin + seatUsage.standard, limit: 20 }, 'view-only-users': { used: seatUsage['view-only'], limit: 15 } }}
        onApply={handleBulkSeatChange}
      />

      {/* Permissions Dialog */}
      <UserPermissionsDialog
        open={permissionsDialogOpen}
        user={permissionsUser}
        roles={roles}
        onClose={() => {
          setPermissionsDialogOpen(false)
          setPermissionsUser(null)
        }}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete <strong>{userToDelete?.name}</strong>? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            sx={{ textTransform: 'none' }}
          >
            Delete
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
          <DialogContentText>
            Are you sure you want to delete <strong>{selectedUsers.length} users</strong>? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBulkDeleteDialogOpen(false)} sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmBulkDelete}
            variant="contained"
            sx={{ textTransform: 'none' }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        TransitionComponent={(props) => <Slide {...props} direction="up" />}
      />
    </Box>
  )
}

export default SeatsPageV8

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
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import TableHeader from '../components/core/TableHeader'

// Vertical separator style for table header cells
const headerCellSeparatorSx = {
  position: 'relative',
  fontWeight: 600,
  '&::after': {
    content: '""',
    position: 'absolute',
    right: 0,
    top: '25%',
    height: '50%',
    width: '1px',
    backgroundColor: 'divider',
  },
}

// Permission categories for role creation
const PERMISSION_CATEGORIES = [
  { id: 'explore', label: 'Explore', defaultValue: 'viewer' },
  { id: 'analyze', label: 'Analyze', defaultValue: 'viewer' },
  { id: 'mediaRelations', label: 'Media Relations', defaultValue: 'viewer' },
  { id: 'engage', label: 'Engage', defaultValue: 'no-access' },
  { id: 'share', label: 'Share', defaultValue: 'viewer' },
  { id: 'report', label: 'Report', defaultValue: 'viewer' },
  { id: 'account', label: 'Account', defaultValue: 'viewer' },
  { id: 'manageUsersWorkspaces', label: 'Manage Users and Workspaces', defaultValue: 'viewer' },
  { id: 'api', label: 'API', defaultValue: 'no-access' },
  { id: 'explorePlus', label: 'Explore +', defaultValue: 'viewer' },
  { id: 'dashboards', label: 'Dashboards', defaultValue: 'viewer' },
  { id: 'miraStudio', label: 'Mira Studio', defaultValue: 'user' },
]

const PERMISSION_OPTIONS = [
  { value: 'no-access', label: 'No Access' },
  { value: 'viewer', label: 'Viewer' },
  { value: 'user', label: 'User' },
  { value: 'editor', label: 'Editor' },
  { value: 'admin', label: 'Admin' },
]

import {
  INITIAL_ROLES,
  INITIAL_USERS_V5,
  INITIAL_INTERNAL_USERS_V5,
} from '../data/seatsData'

function RolesPageV10() {
  const navigate = useNavigate()

  const [roles, setRoles] = useState(INITIAL_ROLES)
  const [users] = useState(INITIAL_USERS_V5)
  const [internalUsers] = useState(INITIAL_INTERNAL_USERS_V5)

  const [searchQuery, setSearchQuery] = useState('')
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingRole, setEditingRole] = useState(null)
  const [roleName, setRoleName] = useState('')
  const [permissions, setPermissions] = useState({})

  // Pagination state
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const isOOTBRole = (roleId) => roleId.startsWith('explore-')

  const getUserCountForRole = (roleId) => {
    return [...users, ...internalUsers].filter((u) => u.role === roleId).length
  }

  const getRoleType = (roleId) => {
    return isOOTBRole(roleId) ? 'Default' : 'Custom'
  }

  const filteredRoles = useMemo(() => {
    if (!searchQuery) return roles
    const query = searchQuery.toLowerCase()
    return roles.filter((r) => r.label.toLowerCase().includes(query))
  }, [roles, searchQuery])

  const paginatedRoles = filteredRoles.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const initializePermissions = () => {
    const defaultPerms = {}
    PERMISSION_CATEGORIES.forEach((cat) => {
      defaultPerms[cat.id] = cat.defaultValue
    })
    return defaultPerms
  }

  const handleOpenCreate = () => {
    setEditingRole(null)
    setRoleName('')
    setPermissions(initializePermissions())
    setDialogOpen(true)
  }

  const handleOpenEdit = (role) => {
    setEditingRole(role)
    setRoleName(role.label.replace('Custom: ', ''))
    setPermissions(role.permissions || initializePermissions())
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setEditingRole(null)
    setRoleName('')
    setPermissions({})
  }

  const handleSaveRole = () => {
    if (!roleName.trim()) return

    if (editingRole) {
      // Update existing role
      setRoles(roles.map((r) =>
        r.id === editingRole.id
          ? { ...r, label: `Custom: ${roleName.trim()}`, permissions }
          : r
      ))
      setSnackbar({ open: true, message: 'Role updated' })
    } else {
      // Create new role
      const label = `Custom: ${roleName.trim()}`
      if (roles.some((r) => r.label.toLowerCase() === label.toLowerCase())) {
        setSnackbar({ open: true, message: 'Role already exists' })
        return
      }
      const newRole = {
        id: `custom-${Date.now()}`,
        label,
        permissions,
      }
      setRoles([...roles, newRole])
      setSnackbar({ open: true, message: 'Role created' })
    }

    handleCloseDialog()
  }

  const handleDeleteRole = (roleId) => {
    const userCount = getUserCountForRole(roleId)
    const msg = userCount > 0
      ? `This role is assigned to ${userCount} user(s). Are you sure you want to delete it?`
      : 'Delete this role?'
    if (window.confirm(msg)) {
      setRoles(roles.filter((r) => r.id !== roleId))
      setSnackbar({ open: true, message: 'Role deleted' })
    }
  }

  const handlePermissionChange = (categoryId, value) => {
    setPermissions((prev) => ({ ...prev, [categoryId]: value }))
  }

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', backgroundColor: '#F5F5F5' }}>
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
            <IconButton size="small" onClick={() => navigate('/account-v10')} sx={{ color: 'text.primary' }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Manage Roles
            </Typography>
          </Stack>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleOpenCreate}
            sx={{ textTransform: 'none', fontWeight: 500 }}
          >
            Create Role
          </Button>
        </Stack>
      </Paper>

      <Box sx={{ p: 3, maxWidth: 1536, mx: 'auto' }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Roles define what permissions users have across products. Default roles cannot be edited or deleted.
        </Typography>

        <Paper variant="outlined" sx={{ overflow: 'hidden', backgroundColor: 'background.paper' }}>
          <TableHeader
            title="Roles"
            count={filteredRoles.length}
            showFind
            findValue={searchQuery}
            onFindChange={setSearchQuery}
          />

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'background.paper', borderBottom: '2px solid', borderColor: 'divider' }}>
                  <TableCell sx={{ ...headerCellSeparatorSx, width: '40%' }}>Role Name</TableCell>
                  <TableCell sx={{ ...headerCellSeparatorSx, width: '20%' }}>Users</TableCell>
                  <TableCell sx={{ ...headerCellSeparatorSx, width: '20%' }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '20%' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedRoles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} sx={{ textAlign: 'center', py: 6 }}>
                      <Typography color="text.secondary">No roles found</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedRoles.map((role) => {
                    const isOOTB = isOOTBRole(role.id)
                    const userCount = getUserCountForRole(role.id)

                    return (
                      <TableRow
                        key={role.id}
                        hover
                        sx={{
                          '& .action-buttons': { opacity: 0 },
                          '&:hover .action-buttons': { opacity: 1 },
                        }}
                      >
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {role.label}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {userCount} user{userCount !== 1 ? 's' : ''}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={getRoleType(role.id)}
                            size="small"
                            variant="outlined"
                            sx={{
                              backgroundColor: isOOTB ? 'grey.100' : 'transparent',
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          {isOOTB ? (
                            <Tooltip title="Default roles cannot be edited">
                              <LockOutlinedIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                            </Tooltip>
                          ) : (
                            <Stack direction="row" spacing={0.5} className="action-buttons">
                              <Tooltip title="Edit">
                                <IconButton size="small" onClick={() => handleOpenEdit(role)}>
                                  <EditOutlinedIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <IconButton size="small" onClick={() => handleDeleteRole(role.id)}>
                                  <DeleteOutlinedIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Stack>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={filteredRoles.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Paper>
      </Box>

      {/* Create/Edit Role Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { maxHeight: '90vh' } }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>
          {editingRole ? 'Edit Role' : 'Add New Role'}
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            label="Name"
            required
            fullWidth
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Assign permissions
          </Typography>

          <Stack spacing={2}>
            {PERMISSION_CATEGORIES.map((category) => (
              <Stack key={category.id} direction="row" alignItems="center" spacing={1}>
                <FormControl fullWidth size="small">
                  <InputLabel required>{category.label}</InputLabel>
                  <Select
                    value={permissions[category.id] || category.defaultValue}
                    label={category.label}
                    onChange={(e) => handlePermissionChange(category.id, e.target.value)}
                  >
                    {PERMISSION_OPTIONS.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Tooltip title={`Configure ${category.label} permissions`}>
                  <InfoOutlinedIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                </Tooltip>
              </Stack>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveRole}
            disabled={!roleName.trim()}
            sx={{ textTransform: 'none' }}
          >
            {editingRole ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Box>
  )
}

export default RolesPageV10

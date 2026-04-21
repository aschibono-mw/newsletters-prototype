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
  TextField,
  Tooltip,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import TableHeader from '../components/core/TableHeader'
import {
  INITIAL_ROLES,
  INITIAL_USERS_V5,
  INITIAL_INTERNAL_USERS_V5,
} from '../data/seatsData'

function RolesPageV8() {
  const navigate = useNavigate()

  const [roles, setRoles] = useState(INITIAL_ROLES)
  const [users] = useState(INITIAL_USERS_V5)
  const [internalUsers] = useState(INITIAL_INTERNAL_USERS_V5)

  const [searchQuery, setSearchQuery] = useState('')
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

  const [createMode, setCreateMode] = useState(false)
  const [newRoleName, setNewRoleName] = useState('')
  const [editingRoleId, setEditingRoleId] = useState(null)
  const [editName, setEditName] = useState('')

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

  const handleCreateRole = () => {
    if (!newRoleName.trim()) return
    const label = `Custom: ${newRoleName.trim()}`
    if (roles.some((r) => r.label.toLowerCase() === label.toLowerCase())) {
      setSnackbar({ open: true, message: 'Role already exists' })
      return
    }
    const newRole = { id: `custom-${Date.now()}`, label }
    setRoles([...roles, newRole])
    setNewRoleName('')
    setCreateMode(false)
    setSnackbar({ open: true, message: 'Role created' })
  }

  const handleStartEdit = (role) => {
    setEditingRoleId(role.id)
    setEditName(role.label.replace('Custom: ', ''))
  }

  const handleSaveEdit = () => {
    if (!editName.trim()) return
    const newLabel = `Custom: ${editName.trim()}`
    setRoles(roles.map((r) => (r.id === editingRoleId ? { ...r, label: newLabel } : r)))
    setEditingRoleId(null)
    setEditName('')
    setSnackbar({ open: true, message: 'Role updated' })
  }

  const handleCancelEdit = () => {
    setEditingRoleId(null)
    setEditName('')
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

  const handleKeyPress = (e, onSubmit, onCancel) => {
    if (e.key === 'Enter') onSubmit()
    else if (e.key === 'Escape') onCancel()
  }

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', backgroundColor: 'grey.50' }}>
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
            <IconButton size="small" onClick={() => navigate('/seats-v8')} sx={{ color: 'text.primary' }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Manage Roles
            </Typography>
          </Stack>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setCreateMode(true)}
            sx={{ textTransform: 'none', fontWeight: 500 }}
          >
            Create Role
          </Button>
        </Stack>
      </Box>

      <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Roles define what permissions users have across products. Default roles cannot be edited or deleted.
        </Typography>

        <Paper sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
          <TableHeader
            title="Roles"
            count={filteredRoles.length}
            showFind
            findValue={searchQuery}
            onFindChange={setSearchQuery}
          />

          {createMode && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 1.5,
                borderBottom: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'action.hover',
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 500, mr: 1 }}>
                Custom:
              </Typography>
              <TextField
                size="small"
                placeholder="Enter role name"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
                onKeyDown={(e) => handleKeyPress(e, handleCreateRole, () => { setCreateMode(false); setNewRoleName('') })}
                autoFocus
                sx={{ flex: 1, maxWidth: 300 }}
              />
              <IconButton size="small" onClick={handleCreateRole} sx={{ color: 'success.main' }}>
                <CheckIcon />
              </IconButton>
              <IconButton size="small" onClick={() => { setCreateMode(false); setNewRoleName('') }}>
                <CloseIcon />
              </IconButton>
            </Box>
          )}

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 600, width: '40%' }}>Role Name</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '20%' }}>Users</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '20%' }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '20%' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRoles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} sx={{ textAlign: 'center', py: 6 }}>
                      <Typography color="text.secondary">No roles found</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRoles.map((role) => {
                    const isOOTB = isOOTBRole(role.id)
                    const isEditing = editingRoleId === role.id
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
                          {isEditing ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                Custom:
                              </Typography>
                              <TextField
                                size="small"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                onKeyDown={(e) => handleKeyPress(e, handleSaveEdit, handleCancelEdit)}
                                autoFocus
                                sx={{ flex: 1, maxWidth: 200 }}
                              />
                              <IconButton size="small" onClick={handleSaveEdit} sx={{ color: 'success.main' }}>
                                <CheckIcon fontSize="small" />
                              </IconButton>
                              <IconButton size="small" onClick={handleCancelEdit}>
                                <CloseIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          ) : (
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {role.label}
                            </Typography>
                          )}
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
                                <IconButton size="small" onClick={() => handleStartEdit(role)}>
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
        </Paper>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Box>
  )
}

export default RolesPageV8

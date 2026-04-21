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
  Tooltip,
  Drawer,
  FormControl,
  Select,
  MenuItem,
  Avatar,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AddIcon from '@mui/icons-material/Add'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import CloseIcon from '@mui/icons-material/Close'
import TableHeader from '../components/core/TableHeader'
import {
  INITIAL_ROLES,
  INITIAL_USERS_V5,
  INITIAL_INTERNAL_USERS_V5,
  WORKSPACES,
} from '../data/seatsData'

function WorkspacesPageV9() {
  const navigate = useNavigate()

  const [roles] = useState(INITIAL_ROLES)
  const [users, setUsers] = useState(INITIAL_USERS_V5)
  const [internalUsers, setInternalUsers] = useState(INITIAL_INTERNAL_USERS_V5)
  const [workspaces] = useState(WORKSPACES)

  const [searchQuery, setSearchQuery] = useState('')
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

  const [panelOpen, setPanelOpen] = useState(false)
  const [selectedWorkspace, setSelectedWorkspace] = useState(null)

  const getUsersInWorkspace = (workspaceId) => {
    const allUsers = [...users, ...internalUsers]
    return allUsers.filter((u) =>
      u.workspaceAssignments?.some((ws) => ws.workspaceId === workspaceId)
    )
  }

  const getUserCountForWorkspace = (workspaceId) => {
    return getUsersInWorkspace(workspaceId).length
  }

  const getUserWorkspaceAssignment = (user, workspaceId) => {
    return user.workspaceAssignments?.find((ws) => ws.workspaceId === workspaceId)
  }

  const filteredWorkspaces = useMemo(() => {
    if (!searchQuery) return workspaces
    const query = searchQuery.toLowerCase()
    return workspaces.filter(
      (ws) =>
        ws.name.toLowerCase().includes(query) ||
        ws.description.toLowerCase().includes(query)
    )
  }, [workspaces, searchQuery])

  const handleManageUsers = (workspace) => {
    setSelectedWorkspace(workspace)
    setPanelOpen(true)
  }

  const handleClosePanel = () => {
    setPanelOpen(false)
    setSelectedWorkspace(null)
  }

  const handleUpdateWorkspaceRole = (userId, workspaceId, newRole) => {
    const isInternal = internalUsers.some((u) => u.id === userId)
    const setterFn = isInternal ? setInternalUsers : setUsers

    setterFn((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u
        const updatedAssignments = u.workspaceAssignments.map((ws) =>
          ws.workspaceId === workspaceId ? { ...ws, role: newRole || null } : ws
        )
        return { ...u, workspaceAssignments: updatedAssignments }
      })
    )
    setSnackbar({ open: true, message: 'Workspace role updated' })
  }

  const handleRemoveFromWorkspace = (userId, workspaceId) => {
    const isInternal = internalUsers.some((u) => u.id === userId)
    const setterFn = isInternal ? setInternalUsers : setUsers

    setterFn((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u
        const updatedAssignments = u.workspaceAssignments.filter(
          (ws) => ws.workspaceId !== workspaceId
        )
        return { ...u, workspaceAssignments: updatedAssignments }
      })
    )
    setSnackbar({ open: true, message: 'User removed from workspace' })
  }

  const getInitials = (name) => {
    if (!name) return '?'
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const workspaceUsers = selectedWorkspace ? getUsersInWorkspace(selectedWorkspace.id) : []

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
            <IconButton size="small" onClick={() => navigate('/seats-v9')} sx={{ color: 'text.primary' }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Manage Workspaces
            </Typography>
          </Stack>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ textTransform: 'none', fontWeight: 500 }}
          >
            Create Workspace
          </Button>
        </Stack>
      </Box>

      <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Workspaces allow you to organize users and assign workspace-specific roles and permissions.
        </Typography>

        <Paper sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
          <TableHeader
            title="Workspaces"
            count={filteredWorkspaces.length}
            showFind
            findValue={searchQuery}
            onFindChange={setSearchQuery}
          />

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 600, width: '25%' }}>Workspace Name</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '35%' }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '20%' }}>Users</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '20%' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredWorkspaces.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} sx={{ textAlign: 'center', py: 6 }}>
                      <Typography color="text.secondary">No workspaces found</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredWorkspaces.map((workspace) => {
                    const userCount = getUserCountForWorkspace(workspace.id)

                    return (
                      <TableRow
                        key={workspace.id}
                        hover
                        sx={{
                          '& .action-buttons': { opacity: 0 },
                          '&:hover .action-buttons': { opacity: 1 },
                        }}
                      >
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {workspace.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {workspace.description}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={`${userCount} user${userCount !== 1 ? 's' : ''}`}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={0.5} className="action-buttons">
                            <Button
                              size="small"
                              startIcon={<GroupOutlinedIcon />}
                              onClick={() => handleManageUsers(workspace)}
                              sx={{ textTransform: 'none' }}
                            >
                              Manage Users
                            </Button>
                          </Stack>
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

      <Drawer
        anchor="right"
        open={panelOpen}
        onClose={handleClosePanel}
        PaperProps={{
          sx: {
            width: 480,
            top: 64,
            height: 'calc(100% - 64px)',
          },
        }}
      >
        {selectedWorkspace && (
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {selectedWorkspace.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {workspaceUsers.length} user{workspaceUsers.length !== 1 ? 's' : ''} assigned
                </Typography>
              </Box>
              <IconButton size="small" onClick={handleClosePanel}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
              {workspaceUsers.length === 0 ? (
                <Box
                  sx={{
                    py: 6,
                    textAlign: 'center',
                    backgroundColor: 'grey.50',
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    No users assigned to this workspace
                  </Typography>
                  <Button
                    variant="text"
                    size="small"
                    startIcon={<AddIcon />}
                    sx={{ mt: 1, textTransform: 'none' }}
                  >
                    Add users
                  </Button>
                </Box>
              ) : (
                <Stack spacing={1}>
                  {workspaceUsers.map((user) => {
                    const assignment = getUserWorkspaceAssignment(user, selectedWorkspace.id)
                    return (
                      <Box
                        key={user.id}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          p: 1.5,
                          backgroundColor: 'grey.50',
                          borderRadius: 1,
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 36,
                            height: 36,
                            bgcolor: 'primary.main',
                            fontSize: 14,
                          }}
                        >
                          {getInitials(user.name)}
                        </Avatar>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {user.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                            {user.email}
                          </Typography>
                        </Box>
                        <FormControl size="small" sx={{ minWidth: 130 }}>
                          <Select
                            value={assignment?.role || ''}
                            displayEmpty
                            onChange={(e) =>
                              handleUpdateWorkspaceRole(user.id, selectedWorkspace.id, e.target.value)
                            }
                          >
                            <MenuItem value="">
                              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                No role
                              </Typography>
                            </MenuItem>
                            {roles.map((role) => (
                              <MenuItem key={role.id} value={role.id}>
                                <Typography variant="body2">
                                  {role.label.replace('Explore+ ', '').replace(' User', '')}
                                </Typography>
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <Tooltip title="Remove from workspace">
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveFromWorkspace(user.id, selectedWorkspace.id)}
                          >
                            <DeleteOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    )
                  })}
                </Stack>
              )}
            </Box>

            <Box
              sx={{
                p: 2,
                borderTop: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Button
                variant="outlined"
                fullWidth
                startIcon={<AddIcon />}
                sx={{ textTransform: 'none', fontWeight: 500 }}
              >
                Add Users to Workspace
              </Button>
            </Box>
          </Box>
        )}
      </Drawer>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Box>
  )
}

export default WorkspacesPageV9

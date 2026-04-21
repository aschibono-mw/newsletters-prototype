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
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
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

import {
  INITIAL_USERS_V5,
  INITIAL_INTERNAL_USERS_V5,
  WORKSPACES,
} from '../data/seatsData'

function WorkspacesPageV10() {
  const navigate = useNavigate()

  const [users] = useState(INITIAL_USERS_V5)
  const [internalUsers] = useState(INITIAL_INTERNAL_USERS_V5)
  const [workspaces, setWorkspaces] = useState(WORKSPACES)

  const [searchQuery, setSearchQuery] = useState('')
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingWorkspace, setEditingWorkspace] = useState(null)
  const [workspaceName, setWorkspaceName] = useState('')
  const [workspaceDescription, setWorkspaceDescription] = useState('')

  // Pagination state
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const getUserCountForWorkspace = (workspaceId) => {
    const allUsers = [...users, ...internalUsers]
    return allUsers.filter((u) =>
      u.workspaceAssignments?.some((ws) => ws.workspaceId === workspaceId)
    ).length
  }

  const filteredWorkspaces = useMemo(() => {
    if (!searchQuery) return workspaces
    const query = searchQuery.toLowerCase()
    return workspaces.filter(
      (ws) =>
        ws.name.toLowerCase().includes(query) ||
        ws.description?.toLowerCase().includes(query)
    )
  }, [workspaces, searchQuery])

  const paginatedWorkspaces = filteredWorkspaces.slice(
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

  const handleOpenCreate = () => {
    setEditingWorkspace(null)
    setWorkspaceName('')
    setWorkspaceDescription('')
    setDialogOpen(true)
  }

  const handleOpenEdit = (workspace) => {
    setEditingWorkspace(workspace)
    setWorkspaceName(workspace.name)
    setWorkspaceDescription(workspace.description || '')
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setEditingWorkspace(null)
    setWorkspaceName('')
    setWorkspaceDescription('')
  }

  const handleSaveWorkspace = () => {
    if (!workspaceName.trim()) return

    if (editingWorkspace) {
      // Update existing workspace
      setWorkspaces(workspaces.map((ws) =>
        ws.id === editingWorkspace.id
          ? { ...ws, name: workspaceName.trim(), description: workspaceDescription.trim() }
          : ws
      ))
      setSnackbar({ open: true, message: 'Workspace updated' })
    } else {
      // Create new workspace
      if (workspaces.some((ws) => ws.name.toLowerCase() === workspaceName.trim().toLowerCase())) {
        setSnackbar({ open: true, message: 'Workspace already exists' })
        return
      }
      const newWorkspace = {
        id: `workspace-${Date.now()}`,
        name: workspaceName.trim(),
        description: workspaceDescription.trim(),
      }
      setWorkspaces([...workspaces, newWorkspace])
      setSnackbar({ open: true, message: 'Workspace created' })
    }

    handleCloseDialog()
  }

  const handleDeleteWorkspace = (workspaceId) => {
    const userCount = getUserCountForWorkspace(workspaceId)
    const msg = userCount > 0
      ? `This workspace has ${userCount} user(s) assigned. Are you sure you want to delete it?`
      : 'Delete this workspace?'
    if (window.confirm(msg)) {
      setWorkspaces(workspaces.filter((ws) => ws.id !== workspaceId))
      setSnackbar({ open: true, message: 'Workspace deleted' })
    }
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
              Manage Workspaces
            </Typography>
          </Stack>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleOpenCreate}
            sx={{ textTransform: 'none', fontWeight: 500 }}
          >
            Create Workspace
          </Button>
        </Stack>
      </Paper>

      <Box sx={{ p: 3, maxWidth: 1536, mx: 'auto' }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Workspaces allow you to organize users and assign workspace-specific roles and permissions.
        </Typography>

        <Paper variant="outlined" sx={{ overflow: 'hidden', backgroundColor: 'background.paper' }}>
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
                <TableRow sx={{ backgroundColor: 'background.paper', borderBottom: '2px solid', borderColor: 'divider' }}>
                  <TableCell sx={{ ...headerCellSeparatorSx, width: '30%' }}>Workspace Name</TableCell>
                  <TableCell sx={{ ...headerCellSeparatorSx, width: '40%' }}>Description</TableCell>
                  <TableCell sx={{ ...headerCellSeparatorSx, width: '15%' }}>Users</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '15%' }}>Actions</TableCell>
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
                  paginatedWorkspaces.map((workspace) => {
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
                            {workspace.description || '—'}
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
                            <Tooltip title="Edit">
                              <IconButton size="small" onClick={() => handleOpenEdit(workspace)}>
                                <EditOutlinedIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton size="small" onClick={() => handleDeleteWorkspace(workspace.id)}>
                                <DeleteOutlinedIcon fontSize="small" />
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
          <TablePagination
            component="div"
            count={filteredWorkspaces.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Paper>
      </Box>

      {/* Create/Edit Workspace Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 600 }}>
          {editingWorkspace ? 'Edit Workspace' : 'Add Workspace'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1 }}>
            <TextField
              label="Workspace name"
              required
              fullWidth
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value.slice(0, 50))}
              inputProps={{ maxLength: 50 }}
              helperText={`${workspaceName.length} / 50`}
              FormHelperTextProps={{ sx: { textAlign: 'right', mr: 0 } }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Workspace description"
              fullWidth
              multiline
              rows={3}
              value={workspaceDescription}
              onChange={(e) => setWorkspaceDescription(e.target.value.slice(0, 100))}
              inputProps={{ maxLength: 100 }}
              helperText={`${workspaceDescription.length} / 100`}
              FormHelperTextProps={{ sx: { textAlign: 'right', mr: 0 } }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveWorkspace}
            disabled={!workspaceName.trim()}
            sx={{ textTransform: 'none' }}
          >
            {editingWorkspace ? 'Save' : 'Add'}
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

export default WorkspacesPageV10

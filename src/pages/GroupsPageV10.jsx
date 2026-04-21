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
  INITIAL_GROUPS,
  INITIAL_USERS_V5,
  INITIAL_INTERNAL_USERS_V5,
} from '../data/seatsData'

function GroupsPageV10() {
  const navigate = useNavigate()

  const [users] = useState(INITIAL_USERS_V5)
  const [internalUsers] = useState(INITIAL_INTERNAL_USERS_V5)
  const [groups, setGroups] = useState(INITIAL_GROUPS)

  const [searchQuery, setSearchQuery] = useState('')
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingGroup, setEditingGroup] = useState(null)
  const [groupName, setGroupName] = useState('')
  const [groupDescription, setGroupDescription] = useState('')

  // Pagination state
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const getUserCountForGroup = (groupId) => {
    const allUsers = [...users, ...internalUsers]
    return allUsers.filter((u) => u.groups?.includes(groupId)).length
  }

  const filteredGroups = useMemo(() => {
    if (!searchQuery) return groups
    const query = searchQuery.toLowerCase()
    return groups.filter((g) => g.name.toLowerCase().includes(query))
  }, [groups, searchQuery])

  const paginatedGroups = filteredGroups.slice(
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
    setEditingGroup(null)
    setGroupName('')
    setGroupDescription('')
    setDialogOpen(true)
  }

  const handleOpenEdit = (group) => {
    setEditingGroup(group)
    setGroupName(group.name)
    setGroupDescription(group.description || '')
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setEditingGroup(null)
    setGroupName('')
    setGroupDescription('')
  }

  const handleSaveGroup = () => {
    if (!groupName.trim()) return

    if (editingGroup) {
      // Update existing group
      setGroups(groups.map((g) =>
        g.id === editingGroup.id
          ? { ...g, name: groupName.trim(), description: groupDescription.trim() }
          : g
      ))
      setSnackbar({ open: true, message: 'Group updated' })
    } else {
      // Create new group
      if (groups.some((g) => g.name.toLowerCase() === groupName.trim().toLowerCase())) {
        setSnackbar({ open: true, message: 'Group already exists' })
        return
      }
      const newGroup = {
        id: Date.now(),
        name: groupName.trim(),
        description: groupDescription.trim(),
      }
      setGroups([...groups, newGroup])
      setSnackbar({ open: true, message: 'Group created' })
    }

    handleCloseDialog()
  }

  const handleDeleteGroup = (groupId) => {
    const userCount = getUserCountForGroup(groupId)
    const msg = userCount > 0
      ? `This group has ${userCount} user(s). Are you sure you want to delete it?`
      : 'Delete this group?'
    if (window.confirm(msg)) {
      setGroups(groups.filter((g) => g.id !== groupId))
      setSnackbar({ open: true, message: 'Group deleted' })
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
            <IconButton size="small" onClick={() => navigate('/seats-v10')} sx={{ color: 'text.primary' }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Manage Groups
            </Typography>
          </Stack>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleOpenCreate}
            sx={{ textTransform: 'none', fontWeight: 500 }}
          >
            Create Group
          </Button>
        </Stack>
      </Paper>

      <Box sx={{ p: 3, maxWidth: 1536, mx: 'auto' }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Groups allow you to organize users for easier management and bulk operations.
        </Typography>

        <Paper variant="outlined" sx={{ overflow: 'hidden', backgroundColor: 'background.paper' }}>
          <TableHeader
            title="Groups"
            count={filteredGroups.length}
            showFind
            findValue={searchQuery}
            onFindChange={setSearchQuery}
          />

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'background.paper', borderBottom: '2px solid', borderColor: 'divider' }}>
                  <TableCell sx={{ ...headerCellSeparatorSx, width: '35%' }}>Group Name</TableCell>
                  <TableCell sx={{ ...headerCellSeparatorSx, width: '35%' }}>Description</TableCell>
                  <TableCell sx={{ ...headerCellSeparatorSx, width: '15%' }}>Users</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '15%' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedGroups.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} sx={{ textAlign: 'center', py: 6 }}>
                      <Typography color="text.secondary">No groups found</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedGroups.map((group) => {
                    const userCount = getUserCountForGroup(group.id)

                    return (
                      <TableRow
                        key={group.id}
                        hover
                        sx={{
                          '& .action-buttons': { opacity: 0 },
                          '&:hover .action-buttons': { opacity: 1 },
                        }}
                      >
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {group.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {group.description || '—'}
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
                              <IconButton size="small" onClick={() => handleOpenEdit(group)}>
                                <EditOutlinedIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton size="small" onClick={() => handleDeleteGroup(group.id)}>
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
            count={filteredGroups.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Paper>
      </Box>

      {/* Create/Edit Group Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 600 }}>
          {editingGroup ? 'Edit Group' : 'Add Group'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1 }}>
            <TextField
              label="Group name"
              required
              fullWidth
              value={groupName}
              onChange={(e) => setGroupName(e.target.value.slice(0, 50))}
              inputProps={{ maxLength: 50 }}
              helperText={`${groupName.length} / 50`}
              FormHelperTextProps={{ sx: { textAlign: 'right', mr: 0 } }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Group description"
              fullWidth
              multiline
              rows={3}
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value.slice(0, 100))}
              inputProps={{ maxLength: 100 }}
              helperText={`${groupDescription.length} / 100`}
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
            onClick={handleSaveGroup}
            disabled={!groupName.trim()}
            sx={{ textTransform: 'none' }}
          >
            {editingGroup ? 'Save' : 'Add'}
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

export default GroupsPageV10

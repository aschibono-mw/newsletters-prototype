import { useState } from 'react'
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
  Divider,
  Autocomplete,
  Tooltip,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import DownloadIcon from '@mui/icons-material/Download'
import GroupIcon from '@mui/icons-material/Group'
import Indicator from '../components/core/Indicator'

// Mock initial groups
const INITIAL_GROUPS = [
  { id: 1, name: 'Marketing' },
  { id: 2, name: 'Sales' },
  { id: 3, name: 'Engineering' },
  { id: 4, name: 'Design' },
  { id: 5, name: 'Product' },
]

// Mock initial users
const INITIAL_USERS = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice.johnson@company.com',
    groups: [1, 2], // Marketing, Sales
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob.smith@company.com',
    groups: [3], // Engineering
  },
  {
    id: 3,
    name: 'Carol Davis',
    email: 'carol.davis@company.com',
    groups: [4, 5], // Design, Product
  },
  {
    id: 4,
    name: 'David Lee',
    email: 'david.lee@company.com',
    groups: [1, 3, 5], // Marketing, Engineering, Product
  },
  {
    id: 5,
    name: 'Eve Martinez',
    email: 'eve.martinez@company.com',
    groups: [], // No groups
  },
]

function GroupManagementPage() {
  const [groups, setGroups] = useState(INITIAL_GROUPS)
  const [users, setUsers] = useState(INITIAL_USERS)
  const [selectedFilters, setSelectedFilters] = useState([])

  // Group creation dialog
  const [groupDialogOpen, setGroupDialogOpen] = useState(false)
  const [newGroupName, setNewGroupName] = useState('')
  const [groupError, setGroupError] = useState('')

  // User group assignment dialog
  const [userDialogOpen, setUserDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [selectedGroups, setSelectedGroups] = useState([])

  // User creation dialog
  const [createUserDialogOpen, setCreateUserDialogOpen] = useState(false)
  const [newUserName, setNewUserName] = useState('')
  const [newUserEmail, setNewUserEmail] = useState('')
  const [newUserGroups, setNewUserGroups] = useState([])
  const [userError, setUserError] = useState('')

  // Handle group creation
  const handleOpenGroupDialog = () => {
    setGroupDialogOpen(true)
    setNewGroupName('')
    setGroupError('')
  }

  const handleCloseGroupDialog = () => {
    setGroupDialogOpen(false)
    setNewGroupName('')
    setGroupError('')
  }

  const handleCreateGroup = () => {
    // Validate unique name
    if (groups.some((g) => g.name.toLowerCase() === newGroupName.toLowerCase())) {
      setGroupError('A group with this name already exists')
      return
    }

    if (!newGroupName.trim()) {
      setGroupError('Group name is required')
      return
    }

    const newGroup = {
      id: Math.max(...groups.map((g) => g.id), 0) + 1,
      name: newGroupName.trim(),
    }

    setGroups([...groups, newGroup])
    handleCloseGroupDialog()
  }

  const handleDeleteGroup = (groupId) => {
    if (window.confirm('Are you sure? This will remove the group from all users.')) {
      // Remove group from all users
      setUsers(users.map((user) => ({
        ...user,
        groups: user.groups.filter((gId) => gId !== groupId),
      })))
      // Remove group
      setGroups(groups.filter((g) => g.id !== groupId))
    }
  }

  // Handle user group assignment
  const handleOpenUserDialog = (user) => {
    setEditingUser(user)
    setSelectedGroups(groups.filter((g) => user.groups.includes(g.id)))
    setUserDialogOpen(true)
  }

  const handleCloseUserDialog = () => {
    setUserDialogOpen(false)
    setEditingUser(null)
    setSelectedGroups([])
  }

  const handleSaveUserGroups = () => {
    setUsers(users.map((user) =>
      user.id === editingUser.id
        ? { ...user, groups: selectedGroups.map((g) => g.id) }
        : user
    ))
    handleCloseUserDialog()
  }

  // Handle user creation
  const handleOpenCreateUserDialog = () => {
    setCreateUserDialogOpen(true)
    setNewUserName('')
    setNewUserEmail('')
    setNewUserGroups([])
    setUserError('')
  }

  const handleCloseCreateUserDialog = () => {
    setCreateUserDialogOpen(false)
    setNewUserName('')
    setNewUserEmail('')
    setNewUserGroups([])
    setUserError('')
  }

  const handleCreateUser = () => {
    // Validate name
    if (!newUserName.trim()) {
      setUserError('Name is required')
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!newUserEmail.trim()) {
      setUserError('Email is required')
      return
    }
    if (!emailRegex.test(newUserEmail)) {
      setUserError('Please enter a valid email address')
      return
    }

    // Check if email already exists
    if (users.some((u) => u.email.toLowerCase() === newUserEmail.toLowerCase())) {
      setUserError('A user with this email already exists')
      return
    }

    const newUser = {
      id: Math.max(...users.map((u) => u.id), 0) + 1,
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      groups: newUserGroups.map((g) => g.id),
    }

    setUsers([...users, newUser])
    handleCloseCreateUserDialog()
  }

  // Filter users by groups
  const filteredUsers = selectedFilters.length === 0
    ? users
    : users.filter((user) =>
        selectedFilters.every((filterId) => user.groups.includes(filterId))
      )

  // Get group name by ID
  const getGroupName = (groupId) => {
    return groups.find((g) => g.id === groupId)?.name || 'Unknown'
  }

  // Export to CSV
  const handleExport = () => {
    const csvContent = [
      ['Name', 'Email', 'Groups'].join(','),
      ...filteredUsers.map((user) => [
        user.name,
        user.email,
        user.groups.map((gId) => getGroupName(gId)).join('; '),
      ].join(',')),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'users-groups-export.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <Box>
      {/* Action Button */}
      <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ mb: 2 }}>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={handleExport}
        >
          Export Users
        </Button>
      </Stack>

      {/* Groups Section */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h6">
            All Groups ({groups.length})
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<AddIcon />}
            onClick={handleOpenGroupDialog}
          >
            Create Group
          </Button>
        </Stack>

        {groups.length === 0 ? (
          <Alert severity="info">
            No groups yet. Create your first group to get started.
          </Alert>
        ) : (
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {groups.map((group) => (
              <Chip
                key={group.id}
                icon={<GroupIcon />}
                label={group.name}
                onDelete={() => handleDeleteGroup(group.id)}
                deleteIcon={<DeleteIcon />}
                sx={{ mb: 1 }}
              />
            ))}
          </Stack>
        )}
      </Paper>

      {/* Users Section */}
      <Box>
        <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
          {/* Header */}
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">
                Users ({filteredUsers.length})
              </Typography>

              <Stack direction="row" spacing={2} alignItems="center">
                {/* Create User Button */}
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={handleOpenCreateUserDialog}
                >
                  Create User
                </Button>

                {/* Group Filter */}
                <Box sx={{ minWidth: 300 }}>
                  <Autocomplete
                    multiple
                    options={groups}
                    getOptionLabel={(option) => option.name}
                    value={groups.filter((g) => selectedFilters.includes(g.id))}
                    onChange={(event, newValue) => {
                      setSelectedFilters(newValue.map((g) => g.id))
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Filter by Groups"
                        placeholder="Select groups..."
                        size="small"
                      />
                    )}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          label={option.name}
                          size="small"
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                  />
                </Box>
              </Stack>
            </Stack>
          </Box>

          {selectedFilters.length > 0 && (
            <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Alert severity="info">
                Showing users who are in <strong>all</strong> of the selected groups.
              </Alert>
            </Box>
          )}

          <TableContainer>
            <Table>
            <TableHead>
              <TableRow>
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
                }}><strong>Name</strong></TableCell>
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
                }}><strong>Email</strong></TableCell>
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
                }}><strong>Groups</strong></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.groups.length === 0 ? (
                      <Typography variant="body2" color="text.secondary">
                        No groups
                      </Typography>
                    ) : (
                      <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                        {user.groups.map((groupId) => (
                          <Indicator
                            key={groupId}
                            label={getGroupName(groupId)}
                            size="small"
                            color="gray"
                            startIcon={<GroupIcon sx={{ fontSize: 'inherit' }} />}
                          />
                        ))}
                      </Stack>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Groups">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleOpenUserDialog(user)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
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
                backgroundColor: 'grey.50'
              }}
            >
              <Typography variant="caption" color="text.secondary">
                End of list • {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'} total
              </Typography>
            </Box>
          )}
        </TableContainer>
        </Paper>

        {filteredUsers.length === 0 && selectedFilters.length > 0 && (
          <Paper elevation={0} sx={{ p: 4, mt: 2, textAlign: 'center', border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="body1" color="text.secondary">
              No users match the selected group filters.
            </Typography>
          </Paper>
        )}
      </Box>

      {/* Create Group Dialog */}
      <Dialog
        open={groupDialogOpen}
        onClose={handleCloseGroupDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New Group</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Enter a unique group name. This will help you classify users for reporting.
          </Typography>
          <TextField
            autoFocus
            fullWidth
            label="Group Name"
            placeholder="e.g., Marketing, Engineering"
            value={newGroupName}
            onChange={(e) => {
              setNewGroupName(e.target.value)
              setGroupError('')
            }}
            error={!!groupError}
            helperText={groupError || 'Group names must be unique'}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseGroupDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCreateGroup}
            disabled={!newGroupName.trim()}
          >
            Create Group
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Groups Dialog */}
      <Dialog
        open={userDialogOpen}
        onClose={handleCloseUserDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Assign Groups to {editingUser?.name}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Select up to 10 groups for this user.
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 3, display: 'block' }}>
            {editingUser?.email}
          </Typography>

          {selectedGroups.length >= 10 && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              Maximum of 10 groups per user reached.
            </Alert>
          )}

          <Autocomplete
            multiple
            options={groups}
            getOptionLabel={(option) => option.name}
            value={selectedGroups}
            onChange={(event, newValue) => {
              if (newValue.length <= 10) {
                setSelectedGroups(newValue)
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Groups"
                placeholder={selectedGroups.length === 0 ? 'Select groups...' : ''}
                helperText={`${selectedGroups.length}/10 groups selected`}
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  label={option.name}
                  {...getTagProps({ index })}
                />
              ))
            }
            getOptionDisabled={() => selectedGroups.length >= 10}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUserDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSaveUserGroups}
          >
            Save Groups
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create User Dialog */}
      <Dialog
        open={createUserDialogOpen}
        onClose={handleCloseCreateUserDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New User</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Add a new user and optionally assign them to groups.
          </Typography>

          <Stack spacing={3}>
            <TextField
              autoFocus
              fullWidth
              label="Name"
              placeholder="e.g., John Doe"
              value={newUserName}
              onChange={(e) => {
                setNewUserName(e.target.value)
                setUserError('')
              }}
              error={!!userError && !newUserName.trim()}
              helperText={!newUserName.trim() && userError ? userError : ''}
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              placeholder="e.g., john.doe@company.com"
              value={newUserEmail}
              onChange={(e) => {
                setNewUserEmail(e.target.value)
                setUserError('')
              }}
              error={!!userError && userError.toLowerCase().includes('email')}
              helperText={userError.toLowerCase().includes('email') ? userError : 'Must be a valid email address'}
            />

            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Assign Groups (Optional)
              </Typography>
              {newUserGroups.length >= 10 && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                  Maximum of 10 groups per user reached.
                </Alert>
              )}
              <Autocomplete
                multiple
                options={groups}
                getOptionLabel={(option) => option.name}
                value={newUserGroups}
                onChange={(event, newValue) => {
                  if (newValue.length <= 10) {
                    setNewUserGroups(newValue)
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder={newUserGroups.length === 0 ? 'Select groups...' : ''}
                    helperText={`${newUserGroups.length}/10 groups selected`}
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option.name}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                getOptionDisabled={() => newUserGroups.length >= 10}
              />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateUserDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCreateUser}
            disabled={!newUserName.trim() || !newUserEmail.trim()}
          >
            Create User
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default GroupManagementPage

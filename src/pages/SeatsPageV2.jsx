import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Checkbox,
  Tabs,
  Tab,
  Tooltip,
  Menu,
  MenuItem,
  MenuList,
  InputBase,
  Card,
  CardContent,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Link,
  Divider,
  Select,
  InputLabel,
  Snackbar,
  Collapse,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EditOutlined from '@mui/icons-material/EditOutlined'
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'
import SearchIcon from '@mui/icons-material/Search'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import FilterListIcon from '@mui/icons-material/FilterList'
import Indicator from '../components/core/Indicator'
import ManageRolesPanel from '../components/seats/ManageRolesPanel'

// Seat type definitions - enterprise pricing tiers
const SEAT_TYPES = [
  {
    id: 'admin',
    label: 'Admin',
    description: 'Full product access + user & workspace management',
    icon: <AdminPanelSettingsOutlinedIcon sx={{ fontSize: 20 }} />,
    entitlement: 'users', // Counts against platform users
  },
  {
    id: 'standard',
    label: 'Standard',
    description: 'Full product access, no admin capabilities',
    icon: <PersonOutlineIcon sx={{ fontSize: 20 }} />,
    entitlement: 'users', // Counts against platform users
  },
  {
    id: 'view-only',
    label: 'View-Only',
    description: 'Read-only access to dashboards and reports',
    icon: <VisibilityOutlinedIcon sx={{ fontSize: 20 }} />,
    entitlement: 'view-only-users', // Separate entitlement pool
  },
  {
    id: 'no-access',
    label: 'No Suite Access',
    description: 'App Agents only (Teams, Slack integrations)',
    icon: <BlockOutlinedIcon sx={{ fontSize: 20 }} />,
    entitlement: null, // Unlimited
  },
]

// Contract entitlements - what the customer purchased
const ENTITLEMENTS = {
  users: { limit: 25, label: 'Platform Users' },
  'view-only-users': { limit: 10, label: 'View-Only Users' },
}

// Initial roles
const INITIAL_ROLES = [
  { id: 'explore-standard-plus', label: 'Explore+ Standard+ User' },
  { id: 'explore-standard', label: 'Explore+ Standard User' },
  { id: 'custom-analyst', label: 'Custom: Analyst' },
  { id: 'custom-operator', label: 'Custom: Operator' },
]

// Mock users with seat types
const INITIAL_USERS = [
  { id: 1, name: 'Alice Bergson', email: 'alice.bergson@company.com', seatType: 'admin', role: 'explore-standard-plus', status: 'Active', lastActive: '59m ago' },
  { id: 2, name: 'Bobby Bonds', email: 'bobby.bonds@company.com', seatType: 'standard', role: 'explore-standard', status: 'Active', lastActive: '3h ago' },
  { id: 3, name: 'Daniel Smith', email: 'daniel.smith@company.com', seatType: 'standard', role: 'custom-analyst', status: 'Active', lastActive: 'Oct 1, 2025' },
  { id: 4, name: 'Evan Fischer', email: 'evan.fischer@company.com', seatType: 'admin', role: null, status: 'Pending', lastActive: '—' },
  { id: 5, name: 'Grace Hooper', email: 'grace.hooper@company.com', seatType: 'view-only', role: null, status: 'Active', lastActive: '1h ago' },
  { id: 6, name: 'Ophelia Fitzgerald', email: 'ophelia.fitzgerald@company.com', seatType: 'standard', role: 'explore-standard-plus', status: 'Active', lastActive: 'Oct 1, 2025' },
  { id: 7, name: 'Chen Wei', email: 'chen.wei@company.com', seatType: 'standard', role: 'custom-operator', status: 'Active', lastActive: '2h ago' },
  { id: 8, name: 'Maria Garcia', email: 'maria.garcia@company.com', seatType: 'view-only', role: null, status: 'Active', lastActive: '5h ago' },
  { id: 9, name: 'James Wilson', email: 'james.wilson@company.com', seatType: 'standard', role: 'explore-standard', status: 'Inactive', lastActive: 'Oct 15, 2025' },
  { id: 10, name: 'Priya Patel', email: 'priya.patel@company.com', seatType: 'admin', role: 'explore-standard-plus', status: 'Active', lastActive: '30m ago' },
  { id: 11, name: 'Tom Anderson', email: 'tom.anderson@company.com', seatType: 'no-access', role: null, status: 'Active', lastActive: '2d ago' },
]

const INITIAL_INTERNAL_USERS = [
  { id: 101, name: 'Support Agent 1', email: 'support1@app.internal', seatType: 'admin', role: 'explore-standard-plus', status: 'Active', lastActive: '10m ago' },
  { id: 102, name: 'Support Agent 2', email: 'support2@app.internal', seatType: 'standard', role: 'explore-standard', status: 'Active', lastActive: '2h ago' },
]

// Collapsible seat type section with embedded table
// eslint-disable-next-line no-unused-vars
function SeatTypeSection({ seatType, users, expanded, onToggle, onEditUser, onDeleteUser, getRoleLabel, usage: _usage }) {
  const userCount = users.length

  return (
    <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 1.5 }}>
      {/* Section Header - simplified */}
      <Box
        onClick={onToggle}
        sx={{
          px: 2,
          py: 1.5,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          '&:hover': { backgroundColor: 'grey.50' },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box sx={{ color: 'text.secondary' }}>{seatType.icon}</Box>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {seatType.label}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {userCount}
          </Typography>
        </Stack>

        <IconButton size="small" sx={{ color: 'text.secondary' }}>
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      {/* Expanded Content - User Table */}
      <Collapse in={expanded}>
        {userCount === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center', borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography variant="body2" color="text.secondary">
              No {seatType.label.toLowerCase()} users
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 600, py: 1 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600, py: 1 }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 600, py: 1 }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: 600, py: 1 }}>Status</TableCell>
                  <TableCell align="right" sx={{ py: 1 }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user.id}
                    hover
                    sx={{
                      '& .action-buttons': { opacity: 0, transition: 'opacity 0.15s' },
                      '&:hover .action-buttons': { opacity: 1 },
                    }}
                  >
                    <TableCell sx={{ py: 1.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>{user.name}</Typography>
                    </TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      <Typography variant="body2" color="text.secondary">{user.email}</Typography>
                    </TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      <Typography variant="body2" color={user.role ? 'text.primary' : 'text.disabled'}>
                        {getRoleLabel(user.role)}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      <Indicator label={user.status} status={user.status} size="small" />
                    </TableCell>
                    <TableCell align="right" sx={{ py: 1.5 }}>
                      <Stack direction="row" spacing={0.5} justifyContent="flex-end" className="action-buttons">
                        <Tooltip title="Edit">
                          <IconButton size="small" onClick={(e) => { e.stopPropagation(); onEditUser(user); }}>
                            <EditOutlined fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton size="small" onClick={(e) => { e.stopPropagation(); onDeleteUser(user.id); }}>
                            <DeleteOutlined fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Collapse>
    </Paper>
  )
}

function SeatsPageV2({ chatOpen = false }) {
  const navigate = useNavigate()
  const [users, setUsers] = useState(INITIAL_USERS)
  const [internalUsers, setInternalUsers] = useState(INITIAL_INTERNAL_USERS)
  const [roles, setRoles] = useState(INITIAL_ROLES)
  const [tabValue, setTabValue] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  // All sections expanded by default
  const [expandedSections, setExpandedSections] = useState({
    admin: true,
    standard: true,
    'view-only': true,
    'no-access': true,
  })

  const [rolesPanelOpen, setRolesPanelOpen] = useState(false)

  // Dialog state
  const [userDialogOpen, setUserDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [isInternalUser, setIsInternalUser] = useState(false)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userSeatType, setUserSeatType] = useState('standard')
  const [userRole, setUserRole] = useState('')
  const [userError, setUserError] = useState('')

  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

  // Calculate seat usage by entitlement pool
  const getSeatUsage = () => {
    const adminCount = users.filter(u => u.seatType === 'admin').length
    const standardCount = users.filter(u => u.seatType === 'standard').length
    const viewOnlyCount = users.filter(u => u.seatType === 'view-only').length

    return {
      users: { used: adminCount + standardCount, limit: ENTITLEMENTS.users.limit },
      'view-only-users': { used: viewOnlyCount, limit: ENTITLEMENTS['view-only-users'].limit },
    }
  }

  const seatUsage = getSeatUsage()

  const getSeatTypeInfo = (seatTypeId) => SEAT_TYPES.find(s => s.id === seatTypeId) || SEAT_TYPES[3]
  const getRoleLabel = (roleId) => roles.find(r => r.id === roleId)?.label || '—'
  const canAssignRole = (seatType) => seatType === 'admin' || seatType === 'standard'

  const toggleSection = (seatTypeId) => {
    setExpandedSections(prev => ({ ...prev, [seatTypeId]: !prev[seatTypeId] }))
  }

  // Filter users
  const filterUsers = (userList) => {
    if (!searchQuery) return userList
    const q = searchQuery.toLowerCase()
    return userList.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
  }

  const getUsersBySeatType = (seatTypeId) => {
    const currentUsers = tabValue === 0 ? users : internalUsers
    return filterUsers(currentUsers.filter(u => u.seatType === seatTypeId))
  }

  // Get usage for a seat type based on its entitlement pool
  const getUsageForSeatType = (seatType) => {
    if (!seatType.entitlement) return null
    return seatUsage[seatType.entitlement]
  }

  // Dialog handlers
  const handleOpenCreateDialog = () => {
    setEditingUser(null)
    setIsInternalUser(tabValue === 1)
    setUserName('')
    setUserEmail('')
    setUserSeatType('standard')
    setUserRole('')
    setUserError('')
    setUserDialogOpen(true)
  }

  const handleOpenEditDialog = (user, internal = false) => {
    setEditingUser(user)
    setIsInternalUser(internal)
    setUserName(user.name)
    setUserEmail(user.email)
    setUserSeatType(user.seatType)
    setUserRole(user.role || '')
    setUserError('')
    setUserDialogOpen(true)
  }

  const handleCloseUserDialog = () => {
    setUserDialogOpen(false)
    setEditingUser(null)
  }

  const handleSaveUser = () => {
    if (!userName.trim()) { setUserError('Name is required'); return }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!userEmail.trim() || !emailRegex.test(userEmail)) { setUserError('Valid email required'); return }

    // Check entitlement limits for new users
    const seatInfo = getSeatTypeInfo(userSeatType)
    if (!isInternalUser && !editingUser && seatInfo.entitlement) {
      const usage = seatUsage[seatInfo.entitlement]
      if (usage && usage.used >= usage.limit) {
        setUserError(`No ${seatInfo.label} seats remaining (${usage.used}/${usage.limit} used)`)
        return
      }
    }

    const userData = {
      name: userName.trim(),
      email: userEmail.trim(),
      seatType: userSeatType,
      role: canAssignRole(userSeatType) ? (userRole || null) : null,
    }

    if (editingUser) {
      if (isInternalUser) {
        setInternalUsers(internalUsers.map(u => u.id === editingUser.id ? { ...u, ...userData } : u))
      } else {
        setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...userData } : u))
      }
      setSnackbar({ open: true, message: `${userName.trim()} updated` })
    } else {
      const newUser = {
        id: isInternalUser ? Math.max(...internalUsers.map(u => u.id), 100) + 1 : Math.max(...users.map(u => u.id), 0) + 1,
        ...userData,
        status: 'Pending',
        lastActive: '—',
      }
      if (isInternalUser) {
        setInternalUsers([...internalUsers, newUser])
      } else {
        setUsers([...users, newUser])
      }
      setSnackbar({ open: true, message: `${userName.trim()} added` })
    }
    handleCloseUserDialog()
  }

  const handleDeleteUser = (userId, internal = false) => {
    const userList = internal ? internalUsers : users
    const user = userList.find(u => u.id === userId)
    if (window.confirm(`Delete ${user?.name}?`)) {
      if (internal) {
        setInternalUsers(internalUsers.filter(u => u.id !== userId))
      } else {
        setUsers(users.filter(u => u.id !== userId))
      }
      setSnackbar({ open: true, message: `${user?.name} removed` })
    }
  }

  return (
    <Box sx={{ height: 'calc(100vh)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Toolbar */}
      <Box sx={{ backgroundColor: 'background.paper', position: 'sticky', top: 0, zIndex: 100 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1 }}>
          <Tooltip title="Back">
            <IconButton size="small" onClick={() => navigate('/')} sx={{ color: 'text.secondary' }}>
              <ArrowBackIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>
          <Divider orientation="vertical" flexItem />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Manage Users</Typography>
          <Box sx={{ flex: 1 }} />
          <Button
            variant="text"
            startIcon={<BadgeOutlinedIcon />}
            onClick={() => setRolesPanelOpen(true)}
            sx={{ color: 'text.primary', textTransform: 'none', fontWeight: 500 }}
          >
            Manage Roles
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={handleOpenCreateDialog}
            sx={{ textTransform: 'none', fontWeight: 500 }}
          >
            Add User
          </Button>
        </Box>
        <Divider />
      </Box>

      {/* Main Content */}
      <Box sx={{ backgroundColor: 'grey.100', flex: 1, px: 2, pt: 2, overflow: 'auto' }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>

          {/* Entitlement Summary */}
          <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', p: 2, mb: 3 }}>
            <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 600 }}>
              License Usage
            </Typography>
            <Stack direction="row" spacing={4} sx={{ mt: 1 }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  {seatUsage.users.used}
                  <Typography component="span" variant="body1" color="text.secondary">
                    {' '}/ {seatUsage.users.limit}
                  </Typography>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Platform Users (Admin + Standard)
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  {seatUsage['view-only-users'].used}
                  <Typography component="span" variant="body1" color="text.secondary">
                    {' '}/ {seatUsage['view-only-users'].limit}
                  </Typography>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  View-Only Users
                </Typography>
              </Box>
            </Stack>
          </Paper>

          {/* Tabs & Search */}
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
              <Tab label="Users" />
              <Tab label="Internal Users" />
            </Tabs>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              px: 1.5,
              py: 0.5,
              backgroundColor: 'background.paper',
            }}>
              <SearchIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 1 }} />
              <InputBase
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ fontSize: 14 }}
              />
            </Box>
          </Stack>

          {/* Seat Type Sections */}
          {SEAT_TYPES.map((seatType) => (
            <SeatTypeSection
              key={seatType.id}
              seatType={seatType}
              users={getUsersBySeatType(seatType.id)}
              expanded={expandedSections[seatType.id]}
              onToggle={() => toggleSection(seatType.id)}
              onEditUser={(user) => handleOpenEditDialog(user, tabValue === 1)}
              onDeleteUser={(id) => handleDeleteUser(id, tabValue === 1)}
              getRoleLabel={getRoleLabel}
              usage={getUsageForSeatType(seatType)}
            />
          ))}

        </Box>
      </Box>

      {/* Add/Edit Dialog */}
      <Dialog open={userDialogOpen} onClose={handleCloseUserDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingUser ? `Edit ${editingUser.name}` : 'Add User'}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            {isInternalUser && (
              <Alert severity="info" sx={{ py: 0.5 }}>
                Internal users don't count against license limits
              </Alert>
            )}

            <TextField
              autoFocus
              fullWidth
              label="Name"
              value={userName}
              onChange={(e) => { setUserName(e.target.value); setUserError('') }}
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              value={userEmail}
              onChange={(e) => { setUserEmail(e.target.value); setUserError('') }}
            />

            {/* Seat Type */}
            <FormControl component="fieldset">
              <FormLabel sx={{ fontWeight: 600, mb: 1 }}>Seat Type</FormLabel>
              <RadioGroup
                value={userSeatType}
                onChange={(e) => {
                  setUserSeatType(e.target.value)
                  if (!canAssignRole(e.target.value)) setUserRole('')
                  setUserError('')
                }}
              >
                {SEAT_TYPES.map((seat) => {
                  const usage = seat.entitlement ? seatUsage[seat.entitlement] : null
                  const atLimit = usage && usage.used >= usage.limit && (!editingUser || editingUser.seatType !== seat.id)

                  return (
                    <FormControlLabel
                      key={seat.id}
                      value={seat.id}
                      disabled={!isInternalUser && atLimit}
                      control={<Radio size="small" />}
                      label={
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography variant="body2">{seat.label}</Typography>
                          {usage && (
                            <Typography variant="caption" color={atLimit ? 'error.main' : 'text.secondary'}>
                              ({usage.used}/{usage.limit})
                            </Typography>
                          )}
                          {!usage && seat.id === 'no-access' && (
                            <Typography variant="caption" color="text.secondary">(unlimited)</Typography>
                          )}
                        </Stack>
                      }
                      sx={{ mb: 0.5 }}
                    />
                  )
                })}
              </RadioGroup>
            </FormControl>

            {/* Role */}
            {canAssignRole(userSeatType) && (
              <FormControl fullWidth size="small">
                <InputLabel>Role (Optional)</InputLabel>
                <Select value={userRole} label="Role (Optional)" onChange={(e) => setUserRole(e.target.value)}>
                  <MenuItem value=""><em>None</em></MenuItem>
                  {roles.map((role) => (
                    <MenuItem key={role.id} value={role.id}>{role.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {userError && <Alert severity="error" sx={{ py: 0.5 }}>{userError}</Alert>}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUserDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveUser} disabled={!userName.trim() || !userEmail.trim()}>
            {editingUser ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />

      <ManageRolesPanel
        open={rolesPanelOpen}
        onClose={() => setRolesPanelOpen(false)}
        roles={roles}
        users={[...users, ...internalUsers]}
        onRolesChange={setRoles}
        onRoleClick={() => {}}
        chatOpen={chatOpen}
      />
    </Box>
  )
}

export default SeatsPageV2

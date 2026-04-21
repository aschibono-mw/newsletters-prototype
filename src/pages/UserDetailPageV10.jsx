import { useState, useMemo, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Stack,
  IconButton,
  Checkbox,
  FormControlLabel,
  Link,
  Divider,
  Autocomplete,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip,
  Snackbar,
  Alert,
  ListSubheader,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AddIcon from '@mui/icons-material/Add'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import {
  INITIAL_GROUPS,
  INITIAL_USERS_V10,
  INITIAL_INTERNAL_USERS_V10,
  INITIAL_ROLES,
  PRODUCTS,
  ROLE_PERMISSIONS,
  SEAT_PERMISSION_CEILINGS,
  V10_USERS_STORAGE_KEY,
} from '../data/seatsData'
import WorkspacesTable from '../components/seats/WorkspacesTable'
import WorkspacePermissionOverrideDialog from '../components/seats/WorkspacePermissionOverrideDialog'
import { ThemedToggleButton, ThemedToggleButtonGroup } from '../components/themed/ToggleButtonThemed'

// V10 seat types (Platform, View-Only, Interactor only)
const SEAT_TYPES_V10 = [
  { id: 'platform', label: 'Platform' },
  { id: 'view-only', label: 'View-Only' },
  { id: 'interactor', label: 'Interactor' },
]

// Initial workspace assignments based on user ID (simulated)
const getInitialWorkspaceAssignments = (userId) => {
  // Simulate different workspace assignments per user
  const assignments = {
    1: [
      { workspaceId: 'ws-1', role: null, permissionOverrides: {}, accessLevel: 'full' },
      { workspaceId: 'ws-2', role: null, permissionOverrides: {}, accessLevel: 'full' },
      { workspaceId: 'ws-3', role: null, permissionOverrides: {}, accessLevel: 'full' },
    ],
    2: [
      { workspaceId: 'ws-1', role: null, permissionOverrides: {}, accessLevel: 'full' },
      { workspaceId: 'ws-5', role: 'custom-operator', permissionOverrides: {}, accessLevel: 'full' },
    ],
    3: [
      { workspaceId: 'ws-3', role: null, permissionOverrides: {}, accessLevel: 'full' },
    ],
    6: [
      { workspaceId: 'ws-1', role: null, permissionOverrides: {}, accessLevel: 'full' },
      { workspaceId: 'ws-4', role: null, permissionOverrides: { 'monitor': 'View' }, accessLevel: 'full' },
    ],
    7: [
      { workspaceId: 'ws-5', role: null, permissionOverrides: {}, accessLevel: 'full' },
      { workspaceId: 'ws-1', role: null, permissionOverrides: { 'monitor': 'View' }, accessLevel: 'read' },
    ],
  }
  return assignments[userId] || []
}

function UserDetailPageV10({ hideGroups = false }) {
  const navigate = useNavigate()
  const { userId } = useParams()

  // Field refs for scrolling to errors
  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const emailRef = useRef(null)

  // Find the user from localStorage or mock data
  const existingUser = (() => {
    const stored = localStorage.getItem(V10_USERS_STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        const allUsers = [...(parsed.users || []), ...(parsed.internalUsers || [])]
        const found = allUsers.find((u) => u.id === parseInt(userId))
        if (found) return found
      } catch {
        // Fall through to mock data
      }
    }
    return INITIAL_USERS_V10.find((u) => u.id === parseInt(userId)) || {
      name: 'Unknown User',
      email: 'unknown@company.com',
      seatType: 'platform',
      role: null,
      status: 'Active',
    }
  })()

  const nameParts = existingUser.name.split(' ')

  // Form state - pre-populated with user data
  const [firstName, setFirstName] = useState(nameParts[0] || '')
  const [lastName, setLastName] = useState(nameParts.slice(1).join(' ') || '')
  const [email, setEmail] = useState(existingUser.email || '')
  const [useSso, setUseSso] = useState(false)
  const [seatType, setSeatType] = useState(existingUser.seatType || 'platform')
  const [platformSubType, setPlatformSubType] = useState(existingUser.platformSubType || 'standard')
  const [selectedGroups, setSelectedGroups] = useState([])
  const [language, setLanguage] = useState('English')
  const [timezone, setTimezone] = useState('America/Los_Angeles')
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

  // Field error states
  const [errors, setErrors] = useState({ firstName: false, lastName: false, email: false })

  // Role and permission overrides state
  const [accountRole, setAccountRole] = useState(existingUser.role || '')
  const [accountPermissionOverrides, setAccountPermissionOverrides] = useState({})
  const [accountOverrideDialogOpen, setAccountOverrideDialogOpen] = useState(false)

  // Integration seats state
  const [integrationSeats, setIntegrationSeats] = useState(
    existingUser.integrationSeats || { teams: false, slack: false }
  )

  // Workspace table state
  const [workspaceAssignments, setWorkspaceAssignments] = useState(
    () => getInitialWorkspaceAssignments(parseInt(userId))
  )

  // Memoize seat ceiling (depends on seatType)
  const seatCeiling = useMemo(() => {
    const ceilingMap = {
      platform: SEAT_PERMISSION_CEILINGS.admin,
      interactor: SEAT_PERMISSION_CEILINGS.standard,
      agent: SEAT_PERMISSION_CEILINGS['view-only'],
      api: SEAT_PERMISSION_CEILINGS['no-access'],
      'view-only': SEAT_PERMISSION_CEILINGS['view-only'],
    }
    return ceilingMap[seatType] || SEAT_PERMISSION_CEILINGS.standard
  }, [seatType])

  const handleSeatTypeChange = (event, newSeatType) => {
    if (newSeatType !== null) {
      setSeatType(newSeatType)
      // Reset platform sub-type and groups when switching away from platform
      if (newSeatType !== 'platform') {
        setPlatformSubType('standard')
        setSelectedGroups([])
      }
    }
  }

  const handleSave = () => {
    // Reset errors
    setErrors({ firstName: false, lastName: false, email: false })

    // Validation with scroll to error field
    if (!firstName.trim()) {
      setErrors((prev) => ({ ...prev, firstName: true }))
      setSnackbar({ open: true, message: 'First name is required' })
      firstNameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      firstNameRef.current?.focus()
      return
    }
    if (!lastName.trim()) {
      setErrors((prev) => ({ ...prev, lastName: true }))
      setSnackbar({ open: true, message: 'Last name is required' })
      lastNameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      lastNameRef.current?.focus()
      return
    }
    if (!email.trim()) {
      setErrors((prev) => ({ ...prev, email: true }))
      setSnackbar({ open: true, message: 'Email is required' })
      emailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      emailRef.current?.focus()
      return
    }

    if (!email.includes('@')) {
      setErrors((prev) => ({ ...prev, email: true }))
      setSnackbar({ open: true, message: 'Please enter a valid email address' })
      emailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      emailRef.current?.focus()
      return
    }

    // Load existing users from localStorage
    const stored = localStorage.getItem(V10_USERS_STORAGE_KEY)
    let existingData = { users: INITIAL_USERS_V10, internalUsers: INITIAL_INTERNAL_USERS_V10 }
    if (stored) {
      try {
        existingData = JSON.parse(stored)
      } catch {
        // Use defaults
      }
    }

    // Update the user
    const updatedUser = {
      ...existingUser,
      name: `${firstName.trim()} ${lastName.trim()}`,
      email: email.trim(),
      seatType,
      role: seatType === 'platform' ? accountRole || null : null,
      integrationSeats,
    }

    // Add platformSubType for platform users
    if (seatType === 'platform') {
      updatedUser.platformSubType = platformSubType
    } else {
      delete updatedUser.platformSubType
    }

    // Update in the appropriate list
    const userIndex = existingData.users.findIndex((u) => u.id === parseInt(userId))
    if (userIndex >= 0) {
      existingData.users[userIndex] = updatedUser
    } else {
      const internalIndex = existingData.internalUsers.findIndex((u) => u.id === parseInt(userId))
      if (internalIndex >= 0) {
        existingData.internalUsers[internalIndex] = updatedUser
      }
    }

    // Save to localStorage
    localStorage.setItem(V10_USERS_STORAGE_KEY, JSON.stringify(existingData))

    // Navigate back immediately
    navigate('/seats-v10')
  }

  // Workspace CRUD handlers
  const handleAddWorkspace = (assignment) => {
    setWorkspaceAssignments((prev) => [...prev, assignment])
    setSnackbar({ open: true, message: 'Workspace added', severity: 'success' })
  }

  const handleUpdateWorkspace = (updatedAssignment) => {
    setWorkspaceAssignments((prev) =>
      prev.map((a) =>
        a.workspaceId === updatedAssignment.workspaceId ? updatedAssignment : a
      )
    )
  }

  const handleRemoveWorkspace = (workspaceId) => {
    setWorkspaceAssignments((prev) =>
      prev.filter((a) => a.workspaceId !== workspaceId)
    )
    setSnackbar({ open: true, message: 'Workspace removed', severity: 'success' })
  }

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', backgroundColor: 'grey.100' }}>
      {/* Page Header */}
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
            <Tooltip title="Back to Users">
              <IconButton
                size="small"
                sx={{ color: 'text.primary' }}
                onClick={() => navigate('/seats-v10')}
              >
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {existingUser.name}
            </Typography>
          </Stack>
        </Stack>
      </Paper>

      {/* Main Content */}
      <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          {/* User Details Section */}
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            User Details
          </Typography>

          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <TextField
              inputRef={firstNameRef}
              label="First Name"
              required
              fullWidth
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value)
                if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: false }))
              }}
              error={errors.firstName}
            />
            <TextField
              inputRef={lastNameRef}
              label="Last Name"
              required
              fullWidth
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value)
                if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: false }))
              }}
              error={errors.lastName}
            />
          </Stack>

          <TextField
            inputRef={emailRef}
            label="Email Address"
            required
            fullWidth
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (errors.email) setErrors((prev) => ({ ...prev, email: false }))
            }}
            error={errors.email}
            sx={{ mb: 2 }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={useSso}
                onChange={(e) => setUseSso(e.target.checked)}
              />
            }
            label="Use single-sign on"
          />

          <Divider sx={{ my: 3 }} />

          {/* Seat Section */}
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            Seat
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Only Platform users have configurable roles, groups, and workspace settings. Other seat types have fixed permissions.
          </Typography>

          <ThemedToggleButtonGroup
            value={seatType}
            exclusive
            onChange={handleSeatTypeChange}
            sx={{ mb: 2 }}
          >
            {SEAT_TYPES_V10.map((type) => (
              <ThemedToggleButton
                key={type.id}
                value={type.id}
                sx={{ px: 3 }}
              >
                {type.label}
              </ThemedToggleButton>
            ))}
          </ThemedToggleButtonGroup>

          {/* Standard/Admin toggle for Platform users */}
          {seatType === 'platform' && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Platform Access Level
              </Typography>
              <ThemedToggleButtonGroup
                value={platformSubType}
                exclusive
                onChange={(e, v) => v && setPlatformSubType(v)}
                size="small"
              >
                <ThemedToggleButton value="standard" sx={{ px: 2 }}>
                  Standard
                </ThemedToggleButton>
                <ThemedToggleButton value="admin" sx={{ px: 2 }}>
                  Admin
                </ThemedToggleButton>
              </ThemedToggleButtonGroup>
            </Box>
          )}

          {/* Integration Seats checkboxes - available for all seat types */}
          <Box sx={{ mb: 2 }}>
            <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Integration Seats (optional)
              </Typography>
              <Tooltip title="Draws from a separate seat pool">
                <InfoOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary', cursor: 'help' }} />
              </Tooltip>
            </Stack>
            <Stack direction="row" spacing={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={integrationSeats.teams}
                    onChange={(e) => setIntegrationSeats({ ...integrationSeats, teams: e.target.checked })}
                    size="small"
                  />
                }
                label="Teams App"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={integrationSeats.slack}
                    onChange={(e) => setIntegrationSeats({ ...integrationSeats, slack: e.target.checked })}
                    size="small"
                  />
                }
                label="Slack Agent"
              />
            </Stack>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Role Section */}
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5, color: seatType !== 'platform' ? 'text.disabled' : 'text.primary' }}>
              Role
            </Typography>
            {seatType !== 'platform' ? (
              <Typography variant="body2" color="text.disabled">
                Only available for Platform users.
              </Typography>
            ) : (
              <>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Assign a pre-defined permission set. Create and edit roles via the{' '}
                  <Link href="/seats-v10/roles" underline="hover">
                    Roles page
                  </Link>
                  . Visit our{' '}
                  <Link href="#" underline="hover">
                    Help Center article
                  </Link>
                  {' '}for more guidance.
                </Typography>

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Select
                    value={accountRole}
                    onChange={(e) => {
                      setAccountRole(e.target.value)
                      // Clear permission overrides when switching to a predefined role
                      if (e.target.value) {
                        setAccountPermissionOverrides({})
                      }
                    }}
                    displayEmpty
                    renderValue={(value) => {
                      if (!value) {
                        return 'Custom'
                      }
                      const role = INITIAL_ROLES.find((r) => r.id === value)
                      return role ? role.label : value
                    }}
                  >
                    <MenuItem value="">
                      Custom
                    </MenuItem>
                    <Divider />
                    <ListSubheader sx={{ backgroundColor: 'background.paper', lineHeight: '32px' }}>OOTB Roles</ListSubheader>
                    {INITIAL_ROLES.filter((role) => role.id.startsWith('explore-')).map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {role.label}
                      </MenuItem>
                    ))}
                    <Divider />
                    <ListSubheader sx={{ backgroundColor: 'background.paper', lineHeight: '32px' }}>Custom Roles</ListSubheader>
                    {INITIAL_ROLES.filter((role) => !role.id.startsWith('explore-')).map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {role.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {accountRole ? (
                  <Typography variant="caption" color="text.secondary">
                    A Role has been selected for this user. To change the permissions associated with this role, visit the{' '}
                    <Link href="/seats-v10/roles" underline="hover">
                      Roles page
                    </Link>
                    .
                  </Typography>
                ) : (
                  <>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
                      Platform users can be assigned individual permissions per product area. The maximum permission for a product area is defined by a user's seat type.
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Button
                        startIcon={<AddIcon />}
                        onClick={() => setAccountOverrideDialogOpen(true)}
                        sx={{ textTransform: 'none', color: 'primary.main' }}
                      >
                        Edit Permissions
                      </Button>
                      {Object.keys(accountPermissionOverrides).length > 0 && (
                        <Chip
                          label={`${Object.keys(accountPermissionOverrides).length} custom`}
                          size="small"
                          sx={{ backgroundColor: '#E0F7FA', color: '#00838F', fontWeight: 500 }}
                        />
                      )}
                    </Stack>
                  </>
                )}
              </>
            )}
          </Box>

          {!hideGroups && (
            <>
              <Divider sx={{ my: 3 }} />

              {/* Groups Section */}
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5, color: seatType !== 'platform' ? 'text.disabled' : 'text.primary' }}>
                  Groups
                </Typography>
                {seatType !== 'platform' ? (
                  <Typography variant="body2" color="text.disabled">
                    Only available for Platform users.
                  </Typography>
                ) : (
                  <>
                    <Autocomplete
                      multiple
                      disableCloseOnSelect
                      options={INITIAL_GROUPS}
                      getOptionLabel={(option) => option.name}
                      value={INITIAL_GROUPS.filter((g) => selectedGroups.includes(g.id))}
                      onChange={(e, newValue) => {
                        setSelectedGroups(newValue.map((g) => g.id))
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select or Create User Groups"
                        />
                      )}
                      renderOption={(props, option, { selected }) => {
                        const { key, ...restProps } = props
                        return (
                          <li key={key} {...restProps}>
                            <Checkbox
                              checked={selected}
                              size="small"
                              sx={{ mr: 1 }}
                            />
                            {option.name}
                          </li>
                        )
                      }}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            {...getTagProps({ index })}
                            key={option.id}
                            label={option.name}
                            size="small"
                          />
                        ))
                      }
                      sx={{ mb: 1, mt: 2 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {selectedGroups.length}/10 User Groups Assigned
                    </Typography>
                  </>
                )}
              </Box>
            </>
          )}

          {/* Workspaces Section */}
          <Divider sx={{ my: 3 }} />

          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
              Workspaces
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {seatType === 'platform'
                ? 'Manage which workspaces this user has access to and their workspace-specific roles.'
                : `Manage which workspaces this user has access to. ${seatType === 'view-only' ? 'View-Only' : 'Interactor'} users have fixed permissions per workspace.`}
            </Typography>
            <Box sx={{ mb: 3 }}>
              <WorkspacesTable
                workspaceAssignments={workspaceAssignments}
                onAddWorkspace={handleAddWorkspace}
                onUpdateWorkspace={handleUpdateWorkspace}
                onRemoveWorkspace={handleRemoveWorkspace}
                accountRole={accountRole || null}
                accountPermissionOverrides={accountPermissionOverrides}
                disabled={false}
                seatType={seatType === 'platform' ? `platform-${platformSubType}` : seatType}
                showRoles={seatType === 'platform'}
              />
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Preferences Section */}
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            Preferences
          </Typography>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Language</InputLabel>
            <Select
              value={language}
              label="Language"
              onChange={(e) => setLanguage(e.target.value)}
            >
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="Spanish">Spanish</MenuItem>
              <MenuItem value="French">French</MenuItem>
              <MenuItem value="German">German</MenuItem>
              <MenuItem value="Japanese">Japanese</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Time Zone</InputLabel>
            <Select
              value={timezone}
              label="Time Zone"
              onChange={(e) => setTimezone(e.target.value)}
            >
              <MenuItem value="America/Los_Angeles">America/Los_Angeles</MenuItem>
              <MenuItem value="America/New_York">America/New_York</MenuItem>
              <MenuItem value="America/Chicago">America/Chicago</MenuItem>
              <MenuItem value="Europe/London">Europe/London</MenuItem>
              <MenuItem value="Europe/Paris">Europe/Paris</MenuItem>
              <MenuItem value="Asia/Tokyo">Asia/Tokyo</MenuItem>
            </Select>
          </FormControl>
        </Paper>

        {/* Action Buttons */}
        <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mt: 3 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/seats-v10')}
            sx={{ textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ textTransform: 'none' }}
          >
            Save Changes
          </Button>
        </Stack>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity || 'error'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Account-Level Permission Override Dialog */}
      <WorkspacePermissionOverrideDialog
        open={accountOverrideDialogOpen}
        onClose={() => setAccountOverrideDialogOpen(false)}
        workspaceName="Account Level"
        assignment={{ role: accountRole, permissionOverrides: accountPermissionOverrides }}
        products={PRODUCTS}
        rolePermissions={ROLE_PERMISSIONS}
        seatCeiling={seatCeiling}
        seatType={seatType === 'platform' ? `platform-${platformSubType}` : seatType}
        onSave={(overrides) => {
          setAccountPermissionOverrides(overrides)
          setSnackbar({ open: true, message: 'Permissions updated', severity: 'success' })
        }}
      />
    </Box>
  )
}

export default UserDetailPageV10

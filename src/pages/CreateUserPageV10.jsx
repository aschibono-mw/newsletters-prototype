import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
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
  ToggleButton,
  ToggleButtonGroup,
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
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AddIcon from '@mui/icons-material/Add'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import {
  INITIAL_GROUPS,
  V10_USERS_STORAGE_KEY,
  INITIAL_USERS_V10,
  INITIAL_INTERNAL_USERS_V10,
} from '../data/seatsData'
import WorkspacesTable from '../components/seats/WorkspacesTable'

// V10 seat types (Platform, View-Only, Interactor only)
const SEAT_TYPES_V10 = [
  { id: 'platform', label: 'Platform' },
  { id: 'view-only', label: 'View-Only' },
  { id: 'interactor', label: 'Interactor' },
]

function CreateUserPageV10({ hideGroups = false }) {
  const navigate = useNavigate()

  // Field refs for scrolling to errors
  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const emailRef = useRef(null)

  // Form state
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [useSso, setUseSso] = useState(false)
  const [seatType, setSeatType] = useState('platform')
  const [platformSubType, setPlatformSubType] = useState('standard') // 'standard' or 'admin'
  const [selectedGroups, setSelectedGroups] = useState([])
  const [selectedRole, setSelectedRole] = useState('')
  const [language, setLanguage] = useState('English')
  const [timezone, setTimezone] = useState('America/Los_Angeles')

  // Integration seats state
  const [integrationSeats, setIntegrationSeats] = useState({
    teams: false,
    slack: false,
  })

  // Snackbar state
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' })

  // Field error states
  const [errors, setErrors] = useState({ firstName: false, lastName: false, email: false })

  // Workspace assignments state
  const [workspaceAssignments, setWorkspaceAssignments] = useState([])

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

  // Handle create user
  const handleCreateUser = () => {
    // Reset errors
    setErrors({ firstName: false, lastName: false, email: false })

    // Basic validation with scroll to error field
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

    // Email validation
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

    // Generate new user ID
    const allIds = [...existingData.users, ...existingData.internalUsers].map((u) => u.id)
    const newId = Math.max(...allIds, 0) + 1

    // Create new user object
    const newUser = {
      id: newId,
      name: `${firstName.trim()} ${lastName.trim()}`,
      email: email.trim(),
      seatType,
      role: seatType === 'platform' ? selectedRole || null : null,
      status: 'Pending',
      integrationSeats,
    }

    // Add platformSubType for platform users
    if (seatType === 'platform') {
      newUser.platformSubType = platformSubType
    }

    // Add user to the list and save
    const updatedUsers = [...existingData.users, newUser]
    localStorage.setItem(V10_USERS_STORAGE_KEY, JSON.stringify({
      users: updatedUsers,
      internalUsers: existingData.internalUsers,
    }))

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
              Create New User
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

          <ToggleButtonGroup
            value={seatType}
            exclusive
            onChange={handleSeatTypeChange}
            sx={{ mb: 2, '& .MuiToggleButtonGroup-grouped': { border: '1px solid', borderColor: 'divider' } }}
          >
            {SEAT_TYPES_V10.map((type) => (
              <ToggleButton
                key={type.id}
                value={type.id}
                sx={{
                  textTransform: 'none',
                  px: 3,
                  borderColor: 'divider',
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    borderColor: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  },
                }}
              >
                {type.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          {/* Standard/Admin toggle for Platform users */}
          {seatType === 'platform' && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Platform Access Level
              </Typography>
              <ToggleButtonGroup
                value={platformSubType}
                exclusive
                onChange={(e, v) => v && setPlatformSubType(v)}
                size="small"
                sx={{ '& .MuiToggleButtonGroup-grouped': { border: '1px solid', borderColor: 'divider' } }}
              >
                <ToggleButton
                  value="standard"
                  sx={{
                    textTransform: 'none',
                    px: 2,
                    borderColor: 'divider',
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                      borderColor: 'primary.main',
                      '&:hover': { backgroundColor: 'primary.dark' },
                    },
                  }}
                >
                  Standard
                </ToggleButton>
                <ToggleButton
                  value="admin"
                  sx={{
                    textTransform: 'none',
                    px: 2,
                    borderColor: 'divider',
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                      borderColor: 'primary.main',
                      '&:hover': { backgroundColor: 'primary.dark' },
                    },
                  }}
                >
                  Admin
                </ToggleButton>
              </ToggleButtonGroup>
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
          <Box sx={{ opacity: seatType !== 'platform' ? 0.5 : 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Role
            </Typography>
            {seatType !== 'platform' ? (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Only available for Platform users.
              </Typography>
            ) : (
              <>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Assign a pre-defined permission set.{' '}
                  <Link href="/seats-v10/roles" underline="hover">
                    Manage roles
                  </Link>
                  {' | '}
                  <Link href="#" underline="hover">
                    Learn more
                  </Link>
                </Typography>

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    displayEmpty
                    renderValue={(value) => {
                      if (!value) {
                        return <span style={{ color: 'rgba(0, 0, 0, 0.42)' }}>Select Role</span>
                      }
                      const labels = {
                        'explore-standard-plus': 'Explore+ Standard+ User',
                        'explore-standard': 'Explore+ Standard User',
                        'custom-analyst': 'Custom: Analyst',
                        'custom-operator': 'Custom: Operator',
                      }
                      return labels[value] || value
                    }}
                  >
                    <MenuItem value="">
                      <em>None (use defaults)</em>
                    </MenuItem>
                    <MenuItem value="explore-standard-plus">Explore+ Standard+ User</MenuItem>
                    <MenuItem value="explore-standard">Explore+ Standard User</MenuItem>
                    <MenuItem value="custom-analyst">Custom: Analyst</MenuItem>
                    <MenuItem value="custom-operator">Custom: Operator</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  startIcon={<AddIcon />}
                  disabled={!selectedRole}
                  sx={{ textTransform: 'none', color: 'primary.main' }}
                >
                  Add Permission Overrides
                </Button>
              </>
            )}
          </Box>

          {!hideGroups && (
            <>
              <Divider sx={{ my: 3 }} />

              {/* Groups Section */}
              <Box sx={{ opacity: seatType !== 'platform' ? 0.5 : 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  Groups
                </Typography>

                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  disabled={seatType !== 'platform'}
                  options={INITIAL_GROUPS}
                  getOptionLabel={(option) => option.name}
                  value={INITIAL_GROUPS.filter((g) => selectedGroups.includes(g.id))}
                  onChange={(e, newValue) => {
                    setSelectedGroups(newValue.map((g) => g.id))
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder={seatType !== 'platform' ? 'Only available for Platform users' : 'Select or Create User Groups'}
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
                  sx={{ mb: 1 }}
                />
                <Typography variant="caption" color="text.secondary">
                  {selectedGroups.length}/10 User Groups Assigned
                </Typography>
              </Box>
            </>
          )}

          <Divider sx={{ my: 3 }} />

          {/* Workspaces Section */}
          <Box sx={{ opacity: seatType !== 'platform' ? 0.5 : 1 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                Workspaces
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {seatType !== 'platform'
                  ? 'Only available for Platform users.'
                  : 'Manage which workspaces this user has access to and their workspace-specific roles.'}
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <WorkspacesTable
                workspaceAssignments={workspaceAssignments}
                onAddWorkspace={handleAddWorkspace}
                onUpdateWorkspace={handleUpdateWorkspace}
                onRemoveWorkspace={handleRemoveWorkspace}
                accountRole={selectedRole || null}
                disabled={seatType !== 'platform'}
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
            onClick={handleCreateUser}
            sx={{ textTransform: 'none' }}
          >
            Create User
          </Button>
        </Stack>
      </Box>

      {/* Snackbar */}
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
    </Box>
  )
}

export default CreateUserPageV10

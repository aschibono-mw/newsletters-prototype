import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Chip,
  Stack,
  Alert,
  IconButton,
  Divider,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

const SEAT_TYPES = [
  { id: 'admin', label: 'Admin', description: 'Full access + user management' },
  { id: 'standard', label: 'Standard', description: 'Full product access' },
  { id: 'view-only', label: 'View-Only', description: 'Read-only dashboard access' },
  { id: 'no-access', label: 'No Suite Access', description: 'App Agents only' },
]

function AddUserDialog({
  open,
  onClose,
  user,
  roles,
  groups,
  seatUsage,
  isInternalUser,
  onSave,
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    seatType: 'standard',
    role: '',
    groups: [],
  })
  const [errors, setErrors] = useState({})

  // Reset form when dialog opens or user changes
  useEffect(() => {
    if (open) {
      if (user) {
        setFormData({
          name: user.name,
          email: user.email,
          seatType: user.seatType,
          role: user.role || '',
          groups: user.groups || [],
        })
      } else {
        setFormData({
          name: '',
          email: '',
          seatType: 'standard',
          role: '',
          groups: [],
        })
      }
      setErrors({})
    }
  }, [open, user])

  const canAssignRole = (seatType) => seatType === 'admin' || seatType === 'standard'

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    // Check seat entitlement limits (only for non-internal users)
    if (!isInternalUser) {
      const seatType = SEAT_TYPES.find((s) => s.id === formData.seatType)
      if (seatType) {
        if (formData.seatType === 'admin' || formData.seatType === 'standard') {
          const usage = seatUsage.users
          // Only check if adding new user or changing seat type
          if (!user || user.seatType !== formData.seatType) {
            if (usage.used >= usage.limit) {
              newErrors.seatType = `No ${seatType.label} seats available (${usage.used}/${usage.limit})`
            }
          }
        } else if (formData.seatType === 'view-only') {
          const usage = seatUsage['view-only-users']
          if (!user || user.seatType !== formData.seatType) {
            if (usage.used >= usage.limit) {
              newErrors.seatType = `No View-Only seats available (${usage.used}/${usage.limit})`
            }
          }
        }
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onSave({
        name: formData.name.trim(),
        email: formData.email.trim(),
        seatType: formData.seatType,
        role: canAssignRole(formData.seatType) ? formData.role || null : null,
        groups: formData.groups,
      })
      onClose()
    }
  }

  const handleSeatTypeChange = (e) => {
    const newSeatType = e.target.value
    setFormData({
      ...formData,
      seatType: newSeatType,
      // Clear role if new seat type can't have roles
      role: canAssignRole(newSeatType) ? formData.role : '',
    })
    // Clear seat type error when user changes selection
    if (errors.seatType) {
      setErrors({ ...errors, seatType: undefined })
    }
  }

  const getSeatUsageForType = (seatType) => {
    if (seatType === 'admin' || seatType === 'standard') {
      return seatUsage.users
    }
    if (seatType === 'view-only') {
      return seatUsage['view-only-users']
    }
    return null
  }

  const isEdit = Boolean(user)

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { minHeight: 480 } }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {isEdit ? 'Edit User' : 'Add User'}
            </Typography>
            {isInternalUser && (
              <Chip label="Internal User" size="small" sx={{ mt: 0.5 }} />
            )}
          </Box>
          <IconButton size="small" onClick={onClose} sx={{ mr: -1 }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ pt: 3 }}>
        <Stack spacing={3}>
          {/* Name */}
          <TextField
            fullWidth
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={!!errors.name}
            helperText={errors.name}
            autoFocus
          />

          {/* Email */}
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={!!errors.email}
            helperText={errors.email}
          />

          {/* Seat Type */}
          <FormControl fullWidth error={!!errors.seatType}>
            <InputLabel>Seat Type</InputLabel>
            <Select
              value={formData.seatType}
              label="Seat Type"
              onChange={handleSeatTypeChange}
            >
              {SEAT_TYPES.map((seat) => {
                const usage = getSeatUsageForType(seat.id)
                const atLimit = usage && usage.used >= usage.limit && (!user || user.seatType !== seat.id)
                const disabled = !isInternalUser && atLimit

                return (
                  <MenuItem key={seat.id} value={seat.id} disabled={disabled}>
                    <Box>
                      <Typography variant="body2">
                        {seat.label}
                        {usage && (
                          <Typography
                            component="span"
                            variant="caption"
                            color={atLimit ? 'error' : 'text.secondary'}
                            sx={{ ml: 1 }}
                          >
                            ({usage.used}/{usage.limit})
                          </Typography>
                        )}
                        {!usage && (
                          <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                            (Unlimited)
                          </Typography>
                        )}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {seat.description}
                      </Typography>
                    </Box>
                  </MenuItem>
                )
              })}
            </Select>
            {errors.seatType && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                {errors.seatType}
              </Typography>
            )}
          </FormControl>

          {/* Role (only for admin/standard) */}
          <FormControl fullWidth disabled={!canAssignRole(formData.seatType)}>
            <InputLabel>Role</InputLabel>
            <Select
              value={formData.role}
              label="Role"
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <MenuItem value="">
                <em>None (use defaults)</em>
              </MenuItem>
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.label}
                </MenuItem>
              ))}
            </Select>
            {!canAssignRole(formData.seatType) && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, ml: 1.5 }}>
                Roles can only be assigned to Admin or Standard users
              </Typography>
            )}
          </FormControl>

          {/* Groups */}
          <Autocomplete
            multiple
            options={groups}
            getOptionLabel={(option) => option.name}
            value={groups.filter((g) => formData.groups.includes(g.id))}
            onChange={(e, newValue) => {
              if (newValue.length <= 10) {
                setFormData({ ...formData, groups: newValue.map((g) => g.id) })
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Groups"
                placeholder={formData.groups.length === 0 ? 'Select groups...' : ''}
                helperText={`${formData.groups.length}/10 groups selected`}
              />
            )}
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
            getOptionDisabled={() => formData.groups.length >= 10}
            limitTags={3}
            disableCloseOnSelect
          />

          {/* Internal user notice */}
          {isInternalUser && (
            <Alert severity="info" sx={{ py: 0.5 }}>
              Internal users don't count against license limits
            </Alert>
          )}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Button onClick={onClose} sx={{ textTransform: 'none' }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          startIcon={<CheckCircleOutlineIcon />}
          sx={{ textTransform: 'none' }}
        >
          {isEdit ? 'Save Changes' : 'Add User'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddUserDialog

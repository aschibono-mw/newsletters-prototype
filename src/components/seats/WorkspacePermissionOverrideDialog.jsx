import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material'
import { useState, useEffect } from 'react'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

// Permission options (matching seat types) with hierarchy level
const PERMISSION_OPTIONS = [
  { value: 'Admin', label: 'Admin', level: 4 },
  { value: 'Standard', label: 'Standard', level: 3 },
  { value: 'View-Only', label: 'View-Only', level: 2 },
  { value: 'None', label: 'None', level: 1 },
]

// Max permission level by seat type
const SEAT_MAX_LEVEL = {
  'platform-admin': 4,    // Admin
  'platform-standard': 3, // Standard
  'view-only': 2,         // View-Only
  'interactor': 1,        // None
}

// All available permissions
const PERMISSIONS = [
  { id: 'explore', label: 'Explore', tooltip: 'Access to Explore dashboards and data visualization' },
  { id: 'analyze', label: 'Analyze', tooltip: 'Access to analysis tools and reports' },
  { id: 'mediaRelations', label: 'Media Relations', tooltip: 'Access to media contacts and outreach tools' },
  { id: 'engage', label: 'Engage', tooltip: 'Access to engagement and campaign tools' },
  { id: 'share', label: 'Share', tooltip: 'Ability to share content and reports' },
  { id: 'report', label: 'Report', tooltip: 'Access to reporting features' },
  { id: 'account', label: 'Account', tooltip: 'Access to account settings' },
  { id: 'manageUsers', label: 'Manage Users and Workspaces', tooltip: 'Ability to manage users and workspace settings' },
  { id: 'api', label: 'API', tooltip: 'Access to API endpoints' },
  { id: 'explorePlus', label: 'Explore +', tooltip: 'Advanced Explore features and analytics' },
  { id: 'dashboards', label: 'Dashboards', tooltip: 'Access to custom dashboards' },
  { id: 'miraStudio', label: 'Mira Studio', tooltip: 'Access to Mira AI Studio features' },
]

// Default permission values
const DEFAULT_PERMISSIONS = {
  explore: 'Standard',
  analyze: 'Standard',
  mediaRelations: 'Standard',
  engage: 'None',
  share: 'Standard',
  report: 'Standard',
  account: 'View-Only',
  manageUsers: 'View-Only',
  api: 'None',
  explorePlus: 'Standard',
  dashboards: 'Standard',
  miraStudio: 'Standard',
}

function WorkspacePermissionOverrideDialog({
  open,
  onClose,
  workspaceName,
  assignment,
  onSave,
  seatType = 'platform-admin', // 'platform-admin', 'platform-standard', 'view-only', 'interactor'
}) {
  const maxLevel = SEAT_MAX_LEVEL[seatType] || 4
  const [permissions, setPermissions] = useState(DEFAULT_PERMISSIONS)

  useEffect(() => {
    if (open && assignment) {
      setPermissions({
        ...DEFAULT_PERMISSIONS,
        ...(assignment.permissionOverrides || {}),
      })
    }
  }, [open, assignment])

  const handlePermissionChange = (permissionId, value) => {
    setPermissions((prev) => ({
      ...prev,
      [permissionId]: value,
    }))
  }

  const handleSave = () => {
    // Only save permissions that differ from defaults
    const changedPermissions = {}
    Object.entries(permissions).forEach(([key, value]) => {
      if (value !== DEFAULT_PERMISSIONS[key]) {
        changedPermissions[key] = value
      }
    })
    onSave(changedPermissions)
    onClose()
  }

  const handleCancel = () => {
    setPermissions({
      ...DEFAULT_PERMISSIONS,
      ...(assignment?.permissionOverrides || {}),
    })
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Permission Overrides
        </Typography>
        {workspaceName && (
          <Typography variant="body2" color="text.secondary">
            {workspaceName}
          </Typography>
        )}
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Assign permissions
        </Typography>

        <Stack spacing={2.5}>
          {PERMISSIONS.map((permission) => {
            const isCustom = permissions[permission.id] !== DEFAULT_PERMISSIONS[permission.id]
            const defaultValue = DEFAULT_PERMISSIONS[permission.id]
            return (
              <Box key={permission.id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>{permission.label}*</InputLabel>
                  <Select
                    value={permissions[permission.id] || 'None'}
                    onChange={(e) => handlePermissionChange(permission.id, e.target.value)}
                    label={`${permission.label}*`}
                    sx={isCustom ? {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#00BCD4',
                        borderWidth: 2,
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#00ACC1',
                      },
                    } : {}}
                  >
                    {PERMISSION_OPTIONS.map((option) => {
                      const isDisabled = option.level > maxLevel
                      return (
                        <MenuItem
                          key={option.value}
                          value={option.value}
                          disabled={isDisabled}
                        >
                          {option.label}
                          {option.value === defaultValue && (
                            <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                              (default)
                            </Typography>
                          )}
                          {isDisabled && (
                            <Typography variant="caption" color="text.disabled" sx={{ ml: 1 }}>
                              (exceeds seat)
                            </Typography>
                          )}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
                <Tooltip title={`${permission.tooltip}. Default: ${defaultValue}`} placement="right">
                  <IconButton size="small" sx={{ color: 'text.secondary' }}>
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            )
          })}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleCancel} sx={{ textTransform: 'none' }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{ textTransform: 'none' }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default WorkspacePermissionOverrideDialog

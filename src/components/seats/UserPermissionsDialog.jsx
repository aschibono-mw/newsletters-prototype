import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Stack,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { PRODUCTS } from '../../data/seatsData'

// Mock effective permissions based on role
const getEffectivePermissions = (roleId, seatType) => {
  // No access seat type means no permissions
  if (seatType === 'no-access') {
    return {
      insights: 'None',
      discover: 'None',
      workspace: 'None',
      hub: 'None',
    }
  }

  // View-only seat type limits everything to View
  if (seatType === 'view-only') {
    return {
      insights: 'View',
      discover: 'View',
      workspace: 'View',
      hub: 'View',
    }
  }

  // Role-based permissions for admin/standard seats
  const basePermissions = {
    'explore-admin': { insights: 'Admin', discover: 'Admin', workspace: 'Admin', hub: 'Admin' },
    'explore-contributor': { insights: 'Edit', discover: 'Edit', workspace: 'Edit', hub: 'View' },
    'explore-viewer': { insights: 'View', discover: 'View', workspace: 'View', hub: 'View' },
  }

  return basePermissions[roleId] || { insights: 'View', discover: 'View', workspace: 'View', hub: 'View' }
}

// App features/modules that users can access
const APP_FEATURES = [
  { id: 'insights', label: 'Insights Dashboard', description: 'View and analyze data insights' },
  { id: 'discover', label: 'Discover', description: 'Explore and discover new content' },
  { id: 'workspace', label: 'Workspace', description: 'Manage workspace projects and files' },
  { id: 'hub', label: 'Hub', description: 'Access collaboration hub and resources' },
]

// Additional capabilities based on seat type
const SEAT_CAPABILITIES = {
  admin: [
    { label: 'User Management', description: 'Add, edit, and remove users' },
    { label: 'Role Assignment', description: 'Assign and modify user roles' },
    { label: 'Workspace Creation', description: 'Create and manage workspaces' },
    { label: 'API Access', description: 'Generate and manage API tokens' },
    { label: 'Audit Logs', description: 'View system audit logs' },
  ],
  standard: [
    { label: 'Content Creation', description: 'Create and edit content' },
    { label: 'Project Management', description: 'Manage assigned projects' },
    { label: 'Team Collaboration', description: 'Collaborate with team members' },
  ],
  'view-only': [
    { label: 'View Content', description: 'Read-only access to content' },
    { label: 'Download Reports', description: 'Download available reports' },
  ],
  'no-access': [],
}

function UserPermissionsDialog({ open, user, roles, onClose }) {
  if (!user) return null

  const effectivePermissions = getEffectivePermissions(user.role, user.seatType)
  const seatCapabilities = SEAT_CAPABILITIES[user.seatType] || []
  const roleLabel = roles.find((r) => r.id === user.role)?.label || 'No Role'

  const getInitials = (name) => {
    if (!name) return '?'
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getPermissionIcon = (level) => {
    if (level === 'None') {
      return <CancelIcon sx={{ color: 'error.main', fontSize: 20 }} />
    }
    if (level === 'View') {
      return <RemoveCircleOutlineIcon sx={{ color: 'warning.main', fontSize: 20 }} />
    }
    return <CheckCircleIcon sx={{ color: 'success.main', fontSize: 20 }} />
  }

  const getPermissionText = (level) => {
    if (level === 'None') return 'No Access'
    if (level === 'View') return 'View Only'
    if (level === 'Edit') return 'Can Edit'
    if (level === 'Admin') return 'Full Access'
    return level
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: 'primary.main',
              fontSize: 16,
            }}
          >
            {getInitials(user.name)}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {roleLabel} • {user.seatType.charAt(0).toUpperCase() + user.seatType.slice(1)} Seat
            </Typography>
          </Box>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        {/* Product Access Section */}
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
          Product Access
        </Typography>
        <List dense disablePadding>
          {APP_FEATURES.map((feature) => {
            const level = effectivePermissions[feature.id]
            return (
              <ListItem key={feature.id} sx={{ px: 0, py: 0.75 }}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  {getPermissionIcon(level)}
                </ListItemIcon>
                <ListItemText
                  primary={feature.label}
                  secondary={getPermissionText(level)}
                  primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                  secondaryTypographyProps={{ variant: 'caption' }}
                />
              </ListItem>
            )
          })}
        </List>

        {seatCapabilities.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />

            {/* Capabilities Section */}
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
              Capabilities
            </Typography>
            <List dense disablePadding>
              {seatCapabilities.map((capability, index) => (
                <ListItem key={index} sx={{ px: 0, py: 0.75 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleIcon sx={{ color: 'success.main', fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={capability.label}
                    secondary={capability.description}
                    primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                    secondaryTypographyProps={{ variant: 'caption' }}
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}

        {user.seatType === 'no-access' && (
          <Box
            sx={{
              mt: 2,
              p: 2,
              backgroundColor: 'warning.light',
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" color="warning.dark">
              This user has no suite access and cannot use any features.
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ textTransform: 'none' }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UserPermissionsDialog

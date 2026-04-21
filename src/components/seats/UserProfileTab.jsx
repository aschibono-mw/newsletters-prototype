import {
  Box,
  Paper,
  Typography,
  Chip,
  Stack,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { canAssignRole } from '../../data/seatsData'

const SEAT_TYPES = [
  { id: 'admin', label: 'Admin' },
  { id: 'standard', label: 'Standard' },
  { id: 'view-only', label: 'View-Only' },
  { id: 'no-access', label: 'No Access' },
]

function UserProfileTab({
  localUser,
  roles,
  groups,
  onSeatChange,
  onRoleChange,
  onAddGroup,
  onRemoveGroup,
}) {
  const canEditRole = localUser && canAssignRole(localUser.seatType)
  const availableGroups = groups.filter((g) => !localUser?.groups?.includes(g.id))
  const getGroupName = (groupId) => groups.find((g) => g.id === groupId)?.name || ''

  const handleSeatChange = (e) => {
    const newSeatType = e.target.value
    const newRole = canAssignRole(newSeatType) ? localUser.role : null
    onSeatChange(newSeatType, newRole)
  }

  const handleRoleChange = (e) => {
    onRoleChange(e.target.value || null)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Basic Info Section */}
      <Paper sx={{ p: 3, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 3 }}>
          Basic Information
        </Typography>
        <Stack spacing={3}>
          <Stack direction="row" spacing={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Seat Type</InputLabel>
              <Select
                value={localUser.seatType}
                label="Seat Type"
                onChange={handleSeatChange}
              >
                {SEAT_TYPES.map((seat) => (
                  <MenuItem key={seat.id} value={seat.id}>
                    {seat.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth size="small" disabled={!canEditRole}>
              <InputLabel>Role</InputLabel>
              <Select
                value={localUser.role || ''}
                label="Role"
                onChange={handleRoleChange}
              >
                <MenuItem value="">
                  <Typography color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    None (use defaults)
                  </Typography>
                </MenuItem>
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          {!canEditRole && (
            <Typography variant="caption" color="text.secondary">
              Role assignment is not available for View-Only or No Access seat types.
            </Typography>
          )}
        </Stack>
      </Paper>

      {/* Groups Section */}
      <Paper sx={{ p: 3, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Groups
          </Typography>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select
              value=""
              displayEmpty
              onChange={(e) => onAddGroup(e.target.value)}
              renderValue={() => (
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <AddIcon sx={{ fontSize: 18 }} />
                  <span>Add Group</span>
                </Stack>
              )}
            >
              {availableGroups.length === 0 ? (
                <MenuItem disabled>All groups assigned</MenuItem>
              ) : (
                availableGroups.map((group) => (
                  <MenuItem key={group.id} value={group.id}>
                    {group.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Stack>
        {localUser.groups.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            No groups assigned
          </Typography>
        ) : (
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {localUser.groups.map((groupId) => (
              <Chip
                key={groupId}
                label={getGroupName(groupId)}
                onDelete={() => onRemoveGroup(groupId)}
                variant="outlined"
              />
            ))}
          </Stack>
        )}
      </Paper>
    </Box>
  )
}

export default UserProfileTab

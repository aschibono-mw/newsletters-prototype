import { useNavigate } from 'react-router-dom'
import {
  TableRow,
  TableCell,
  Typography,
  Checkbox,
  Stack,
  IconButton,
  Tooltip,
  Skeleton,
} from '@mui/material'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import Indicator from '../core/Indicator'
import { ThemedChip } from '../themed/ChipThemed'

const SEAT_TYPES_V10 = [
  { id: 'platform', label: 'Platform', description: 'Full platform access (Admin or Standard)' },
  { id: 'view-only', label: 'View-Only', description: 'Read-only app access, can add integrations' },
  { id: 'interactor', label: 'Interactor', description: 'No app access, integrations only' },
]

/**
 * SeatsTableRow - Individual row component for the seats table
 *
 * @param {Object} props
 * @param {Object} props.user - User object
 * @param {boolean} props.isSelected - Whether the row is selected
 * @param {Function} props.onSelect - Handler for selection toggle
 * @param {Object} props.visibleColumns - Visible columns object
 * @param {Array} props.groups - All groups array
 * @param {Array} props.roles - All roles array
 * @param {Function} props.onGroupsClick - Handler for groups chip click
 * @param {Function} props.onSetVisibility - Handler for set visibility action
 */
function SeatsTableRow({
  user,
  isSelected,
  onSelect,
  visibleColumns,
  groups = [],
  roles = [],
  onGroupsClick,
  onSetVisibility,
}) {
  const navigate = useNavigate()

  const getRoleLabel = (roleId) => {
    return roles.find((r) => r.id === roleId)?.label || '—'
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'active'
      case 'pending':
        return 'pending'
      case 'inactive':
        return 'inactive'
      default:
        return 'inactive'
    }
  }

  const getGroupsLabel = () => {
    if (!user.groups || user.groups.length === 0) return null
    const groupNames = user.groups
      .map((gId) => groups.find((g) => g.id === gId)?.name)
      .filter(Boolean)
    if (groupNames.length <= 2) return groupNames.join(', ')
    return `${groupNames.slice(0, 2).join(', ')}, +${groupNames.length - 2}`
  }

  return (
    <TableRow
      hover
      selected={isSelected}
      onClick={() => navigate(`/seats-v10/users/${user.id}`)}
      sx={{
        cursor: 'pointer',
        '& .row-actions': { opacity: 0 },
        '&:hover .row-actions': { opacity: 1 },
      }}
    >
      <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
        <Tooltip title="Select">
          <Checkbox checked={isSelected} onChange={() => onSelect(user.id)} size="small" />
        </Tooltip>
      </TableCell>
      {visibleColumns.name && (
        <TableCell>
          <Typography variant="body2" fontWeight={500}>
            {user.name}
          </Typography>
        </TableCell>
      )}
      {visibleColumns.email && (
        <TableCell>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        </TableCell>
      )}
      {visibleColumns.seatType && (
        <TableCell>
          <Typography variant="body2">
            {user.seatType === 'platform'
              ? `Platform (${user.platformSubType === 'admin' ? 'Admin' : 'Standard'})`
              : SEAT_TYPES_V10.find((t) => t.id === user.seatType)?.label || '—'}
          </Typography>
        </TableCell>
      )}
      {visibleColumns.integrations && (
        <TableCell>
          <Stack direction="row" spacing={0.5}>
            {user.integrationSeats?.teams && <ThemedChip label="Teams" size="small" />}
            {user.integrationSeats?.slack && <ThemedChip label="Slack" size="small" />}
            {!user.integrationSeats?.teams && !user.integrationSeats?.slack && (
              <Typography variant="body2" color="text.secondary">
                —
              </Typography>
            )}
          </Stack>
        </TableCell>
      )}
      {visibleColumns.premiumContent && (
        <TableCell>
          <Typography variant="body2" color="text.secondary">
            {user.premiumContent ? 'Yes' : '—'}
          </Typography>
        </TableCell>
      )}
      {visibleColumns.role && (
        <TableCell>
          <Typography variant="body2">
            {user.seatType === 'platform' ? (user.role ? getRoleLabel(user.role) : 'Custom') : '—'}
          </Typography>
        </TableCell>
      )}
      {visibleColumns.groups && (
        <TableCell onClick={(e) => e.stopPropagation()}>
          {user.groups && user.groups.length > 0 ? (
            <ThemedChip
              icon={<GroupsOutlinedIcon />}
              label={getGroupsLabel()}
              size="small"
              onClick={(e) => onGroupsClick(e, user)}
            />
          ) : (
            <Typography variant="body2" color="text.secondary">
              —
            </Typography>
          )}
        </TableCell>
      )}
      {visibleColumns.status && (
        <TableCell>
          <Indicator label={user.status} status={getStatusColor(user.status)} size="small" />
        </TableCell>
      )}
      {visibleColumns.lastActive && (
        <TableCell>
          <Typography variant="body2" color="text.secondary">
            {user.lastActive || '—'}
          </Typography>
        </TableCell>
      )}
      <TableCell onClick={(e) => e.stopPropagation()}>
        <Stack direction="row" spacing={0.5} className="row-actions" justifyContent="flex-end">
          <Tooltip title="Set Visibility">
            <IconButton size="small" onClick={() => onSetVisibility(user)}>
              <VisibilityOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => navigate(`/seats-v10/users/${user.id}`)}>
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Duplicate">
            <IconButton size="small">
              <ContentCopyOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small">
              <DeleteOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </TableCell>
    </TableRow>
  )
}

/**
 * SeatsTableRowSkeleton - Skeleton loading state for table rows
 */
export function SeatsTableRowSkeleton({ visibleColumns }) {
  return (
    <TableRow>
      <TableCell padding="checkbox">
        <Skeleton variant="rectangular" width={18} height={18} sx={{ borderRadius: 0.5 }} />
      </TableCell>
      {visibleColumns.name && (
        <TableCell>
          <Skeleton variant="text" width={140} height={20} />
        </TableCell>
      )}
      {visibleColumns.email && (
        <TableCell>
          <Skeleton variant="text" width={180} height={20} />
        </TableCell>
      )}
      {visibleColumns.seatType && (
        <TableCell>
          <Skeleton variant="text" width={100} height={20} />
        </TableCell>
      )}
      {visibleColumns.integrations && (
        <TableCell>
          <Skeleton variant="text" width={100} height={20} />
        </TableCell>
      )}
      {visibleColumns.premiumContent && (
        <TableCell>
          <Skeleton variant="text" width={80} height={20} />
        </TableCell>
      )}
      {visibleColumns.role && (
        <TableCell>
          <Skeleton variant="text" width={80} height={20} />
        </TableCell>
      )}
      {visibleColumns.groups && (
        <TableCell>
          <Skeleton variant="rounded" width={100} height={24} />
        </TableCell>
      )}
      {visibleColumns.status && (
        <TableCell>
          <Skeleton variant="rounded" width={60} height={22} />
        </TableCell>
      )}
      {visibleColumns.lastActive && (
        <TableCell>
          <Skeleton variant="text" width={90} height={20} />
        </TableCell>
      )}
      <TableCell>
        <Stack direction="row" spacing={0.5} justifyContent="flex-end">
          <Skeleton variant="circular" width={28} height={28} />
          <Skeleton variant="circular" width={28} height={28} />
          <Skeleton variant="circular" width={28} height={28} />
        </Stack>
      </TableCell>
    </TableRow>
  )
}

export default SeatsTableRow

import { Box, Button, IconButton, Typography, Slide, Divider, Tooltip } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined'
import { canAssignRole } from '../../data/seatsData'

function BulkActionBar({
  selectedCount,
  selectedUsers = [],
  onClearSelection,
  onChangeSeatType,
  onAssignRole,
  onAssignGroups,
}) {
  if (selectedCount === 0) return null

  // Check if any selected users can have roles assigned
  const canAssignRoleToAny = selectedUsers.some((u) => canAssignRole(u.seatType))
  const roleEligibleCount = selectedUsers.filter((u) => canAssignRole(u.seatType)).length

  return (
    <Slide direction="up" in={selectedCount > 0} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: 'fixed',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1200,
          backgroundColor: 'grey.900',
          color: 'white',
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0,0,0,0.24)',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 2,
          py: 1,
          minWidth: 500,
        }}
      >
        {/* Selection count */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 1 }}>
          <IconButton
            size="small"
            onClick={onClearSelection}
            sx={{ color: 'grey.400', '&:hover': { color: 'white' } }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2" sx={{ fontWeight: 500, whiteSpace: 'nowrap' }}>
            {selectedCount} user{selectedCount !== 1 ? 's' : ''} selected
          </Typography>
        </Box>

        <Divider orientation="vertical" flexItem sx={{ borderColor: 'grey.700', mx: 1 }} />

        {/* Action buttons */}
        <Button
          size="small"
          startIcon={<SwapHorizIcon />}
          onClick={onChangeSeatType}
          sx={{
            color: 'white',
            textTransform: 'none',
            '&:hover': { backgroundColor: 'grey.800' },
          }}
        >
          Change Seat Type
        </Button>

        <Tooltip
          title={
            !canAssignRoleToAny
              ? 'View-Only and No Suite Access users cannot have roles'
              : roleEligibleCount < selectedCount
              ? `${roleEligibleCount} of ${selectedCount} users can have roles`
              : ''
          }
        >
          <span>
            <Button
              size="small"
              startIcon={<BadgeOutlinedIcon />}
              onClick={onAssignRole}
              disabled={!canAssignRoleToAny}
              sx={{
                color: canAssignRoleToAny ? 'white' : 'grey.600',
                textTransform: 'none',
                '&:hover': { backgroundColor: 'grey.800' },
                '&.Mui-disabled': { color: 'grey.600' },
              }}
            >
              Assign Role
              {canAssignRoleToAny && roleEligibleCount < selectedCount && (
                <Typography
                  component="span"
                  variant="caption"
                  sx={{ ml: 0.5, color: 'grey.400' }}
                >
                  ({roleEligibleCount})
                </Typography>
              )}
            </Button>
          </span>
        </Tooltip>

        <Button
          size="small"
          startIcon={<GroupAddOutlinedIcon />}
          onClick={onAssignGroups}
          sx={{
            color: 'white',
            textTransform: 'none',
            '&:hover': { backgroundColor: 'grey.800' },
          }}
        >
          Add to Groups
        </Button>
      </Box>
    </Slide>
  )
}

export default BulkActionBar

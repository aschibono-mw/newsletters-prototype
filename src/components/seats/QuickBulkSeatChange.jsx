import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined'
import { useState } from 'react'

const SEAT_TYPES = [
  {
    id: 'admin',
    label: 'Admin',
    description: 'Full access + user management',
    icon: <AdminPanelSettingsOutlinedIcon />,
    entitlement: 'users',
  },
  {
    id: 'standard',
    label: 'Standard',
    description: 'Full product access',
    icon: <PersonOutlineIcon />,
    entitlement: 'users',
  },
  {
    id: 'view-only',
    label: 'View-Only',
    description: 'Read-only dashboard access',
    icon: <VisibilityOutlinedIcon />,
    entitlement: 'view-only-users',
  },
  {
    id: 'no-access',
    label: 'No Suite Access',
    description: 'App Agents only',
    icon: <BlockOutlinedIcon />,
    entitlement: null,
  },
]

function QuickBulkSeatChange({
  open,
  onClose,
  selectedUsers = [],
  seatUsage = {},
  onApply,
}) {
  const [selectedSeatType, setSelectedSeatType] = useState(null)

  const handleClose = () => {
    setSelectedSeatType(null)
    onClose()
  }

  const handleApply = () => {
    if (selectedSeatType) {
      onApply(selectedSeatType)
      setSelectedSeatType(null)
    }
  }

  // Calculate how many users are currently in each seat type
  const currentCounts = selectedUsers.reduce((acc, user) => {
    acc[user.seatType] = (acc[user.seatType] || 0) + 1
    return acc
  }, {})

  // Calculate availability for each seat type
  const getAvailability = (seatType) => {
    const entitlement = seatType.entitlement
    if (!entitlement) return { available: Infinity, label: 'Unlimited' }

    const usage = seatUsage[entitlement] || { used: 0, limit: 0 }
    const usersLeavingPool = selectedUsers.filter(
      (u) => SEAT_TYPES.find((s) => s.id === u.seatType)?.entitlement === entitlement
    ).length
    const available = usage.limit - usage.used + usersLeavingPool

    return { available, label: `${available} available` }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Change Seat Type
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Apply to {selectedUsers.length} selected user{selectedUsers.length !== 1 ? 's' : ''}
        </Typography>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 0 }}>
        <List dense sx={{ py: 1 }}>
          {SEAT_TYPES.map((seatType) => {
            const { available, label } = getAvailability(seatType)
            const isDisabled = available < selectedUsers.length && seatType.entitlement !== null
            const currentCount = currentCounts[seatType.id] || 0

            return (
              <ListItem key={seatType.id} disablePadding>
                <ListItemButton
                  selected={selectedSeatType === seatType.id}
                  onClick={() => setSelectedSeatType(seatType.id)}
                  disabled={isDisabled}
                  sx={{ py: 1.5, opacity: isDisabled ? 0.5 : 1 }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {seatType.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {seatType.label}
                        </Typography>
                        {currentCount > 0 && (
                          <Chip
                            label={`${currentCount} selected`}
                            size="small"
                            sx={{
                              height: 18,
                              fontSize: 11,
                              backgroundColor: 'primary.light',
                              color: 'primary.dark',
                            }}
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        {isDisabled ? `Only ${available} available` : label}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ textTransform: 'none' }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleApply}
          disabled={!selectedSeatType}
          sx={{ textTransform: 'none' }}
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default QuickBulkSeatChange

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup,
  FormControlLabel,
  Checkbox,
  Stack,
} from '@mui/material'
import { ThemedChip } from '../../themed/ChipThemed'

const SEAT_TYPES_V10 = [
  { id: 'platform', label: 'Platform', description: 'Full platform access (Admin or Standard)' },
  { id: 'view-only', label: 'View-Only', description: 'Read-only app access, can add integrations' },
  { id: 'interactor', label: 'Interactor', description: 'No app access, integrations only' },
]

/**
 * BulkSeatChangeDialog - Dialog for changing seat types in bulk
 *
 * @param {Object} props
 * @param {boolean} props.open - Dialog open state
 * @param {Function} props.onClose - Called when dialog closes
 * @param {Function} props.onApply - Called with { seatType, platformSubType, integrationSeats } when applied
 * @param {number} props.selectedCount - Number of selected users
 * @param {Array} props.selectedUsers - Array of selected user objects (for counting current types)
 */
function BulkSeatChangeDialog({
  open,
  onClose,
  onApply,
  selectedCount = 0,
  selectedUsers = [],
}) {
  const [selectedSeatType, setSelectedSeatType] = useState(null)
  const [platformSubType, setPlatformSubType] = useState('standard')
  const [integrationSeats, setIntegrationSeats] = useState({ teams: false, slack: false })

  const handleClose = () => {
    setSelectedSeatType(null)
    setPlatformSubType('standard')
    setIntegrationSeats({ teams: false, slack: false })
    onClose()
  }

  const handleApply = () => {
    if (!selectedSeatType) return
    onApply({
      seatType: selectedSeatType,
      platformSubType,
      integrationSeats,
    })
    handleClose()
  }

  const getCurrentCount = (typeId) => {
    return selectedUsers.filter((u) => u.seatType === typeId).length
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Change Seat Type
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Apply to {selectedCount} selected user{selectedCount !== 1 ? 's' : ''}
        </Typography>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 0 }}>
        <List dense sx={{ py: 1 }}>
          {SEAT_TYPES_V10.map((type) => {
            const currentCount = getCurrentCount(type.id)
            return (
              <ListItem key={type.id} disablePadding>
                <ListItemButton
                  selected={selectedSeatType === type.id}
                  onClick={() => setSelectedSeatType(type.id)}
                  sx={{ py: 1.5 }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {type.label}
                        </Typography>
                        {currentCount > 0 && (
                          <ThemedChip label={`${currentCount} selected`} size="small" />
                        )}
                      </Box>
                    }
                    secondary={type.description}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>

        {/* Platform sub-type toggle */}
        {selectedSeatType === 'platform' && (
          <Box sx={{ px: 2, py: 2, borderTop: '1px solid', borderColor: 'divider' }}>
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
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
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
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': { backgroundColor: 'primary.dark' },
                  },
                }}
              >
                Admin
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        )}

        {/* Integration Seats */}
        <Box sx={{ px: 2, py: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Integration Seats (optional)
          </Typography>
          <Stack direction="row" spacing={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={integrationSeats.teams}
                  onChange={(e) =>
                    setIntegrationSeats({ ...integrationSeats, teams: e.target.checked })
                  }
                  size="small"
                />
              }
              label="Teams App"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={integrationSeats.slack}
                  onChange={(e) =>
                    setIntegrationSeats({ ...integrationSeats, slack: e.target.checked })
                  }
                  size="small"
                />
              }
              label="Slack Agent"
            />
          </Stack>
        </Box>
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

import { useState } from 'react'
export default BulkSeatChangeDialog

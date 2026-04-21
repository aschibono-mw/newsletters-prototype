import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Checkbox,
  Chip,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material'
import { useState } from 'react'
import QuickBulkPopoverBase from '../core/QuickBulkPopoverBase'

function QuickBulkGroupsAssign({
  anchorEl,
  open,
  onClose,
  selectedUsers = [],
  groups = [],
  onApply,
}) {
  const [selectedGroupIds, setSelectedGroupIds] = useState([])
  const [mode, setMode] = useState('add') // 'add' or 'replace'

  const handleClose = () => {
    setSelectedGroupIds([])
    setMode('add')
    onClose()
  }

  const handleApply = () => {
    onApply(selectedGroupIds, mode)
    setSelectedGroupIds([])
    setMode('add')
  }

  const handleToggleGroup = (groupId) => {
    setSelectedGroupIds((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    )
  }

  // Count users already in each group
  const groupCounts = groups.reduce((acc, group) => {
    acc[group.id] = selectedUsers.filter((u) => u.groups?.includes(group.id)).length
    return acc
  }, {})

  const footerExtra = selectedGroupIds.length > 0 ? (
    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
      {mode === 'add'
        ? `Will add ${selectedGroupIds.length} group${selectedGroupIds.length !== 1 ? 's' : ''}`
        : `Will replace with ${selectedGroupIds.length} group${selectedGroupIds.length !== 1 ? 's' : ''}`}
    </Typography>
  ) : null

  return (
    <QuickBulkPopoverBase
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      title="Add to Groups"
      subtitle={`${selectedUsers.length} user${selectedUsers.length !== 1 ? 's' : ''} selected`}
      onApply={handleApply}
      applyDisabled={selectedGroupIds.length === 0}
      width={360}
      footerExtra={footerExtra}
    >
      <Box sx={{ px: 2, py: 1 }}>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(e, newMode) => newMode && setMode(newMode)}
          size="small"
          fullWidth
        >
          <ToggleButton value="add" sx={{ textTransform: 'none', fontSize: 12 }}>
            Add to existing
          </ToggleButton>
          <ToggleButton value="replace" sx={{ textTransform: 'none', fontSize: 12 }}>
            Replace all
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <List dense sx={{ py: 1, maxHeight: 300, overflow: 'auto' }}>
        {groups.map((group) => {
          const isSelected = selectedGroupIds.includes(group.id)
          const userCount = groupCounts[group.id] || 0

          return (
            <ListItem key={group.id} disablePadding>
              <ListItemButton onClick={() => handleToggleGroup(group.id)} sx={{ py: 0.5 }}>
                <Checkbox
                  checked={isSelected}
                  tabIndex={-1}
                  disableRipple
                  size="small"
                />
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2">
                        {group.name}
                      </Typography>
                      {userCount > 0 && (
                        <Chip
                          label={
                            userCount === selectedUsers.length
                              ? 'All in group'
                              : `${userCount} in group`
                          }
                          size="small"
                          sx={{
                            height: 18,
                            fontSize: 11,
                            backgroundColor:
                              userCount === selectedUsers.length
                                ? 'success.light'
                                : 'grey.200',
                          }}
                        />
                      )}
                    </Box>
                  }
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </QuickBulkPopoverBase>
  )
}

export default QuickBulkGroupsAssign

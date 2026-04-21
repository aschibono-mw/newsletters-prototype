import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  IconButton,
  Popover,
  TextField,
  Checkbox,
  FormControlLabel,
  Stack,
  Button,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'

function QuickGroupsAssign({ anchorEl, open, onClose, user, groups, onAssign }) {
  const [selectedGroups, setSelectedGroups] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  // Reset state when user changes or popover opens
  useEffect(() => {
    if (open && user) {
      setSelectedGroups(user.groups || [])
      setSearchQuery('')
    }
  }, [open, user])

  const filteredGroups = groups.filter((g) =>
    g.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleToggle = (groupId) => {
    if (selectedGroups.includes(groupId)) {
      setSelectedGroups((prev) => prev.filter((id) => id !== groupId))
    } else if (selectedGroups.length < 10) {
      setSelectedGroups((prev) => [...prev, groupId])
    }
  }

  const handleSave = () => {
    onAssign(selectedGroups)
    onClose()
  }

  const handleCancel = () => {
    onClose()
  }

  const atLimit = selectedGroups.length >= 10

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      PaperProps={{
        sx: {
          width: 300,
          maxHeight: 420,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 3,
        },
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Assign Groups
          </Typography>
          <IconButton size="small" onClick={onClose} sx={{ mr: -0.5 }}>
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
        <TextField
          size="small"
          fullWidth
          placeholder="Search groups..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 1 }} />,
          }}
          sx={{ '& .MuiInputBase-input': { py: 0.75 } }}
        />
      </Box>

      {/* Group list */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 1, maxHeight: 240 }}>
        {filteredGroups.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ p: 1, textAlign: 'center' }}>
            No groups found
          </Typography>
        ) : (
          <Stack spacing={0}>
            {filteredGroups.map((group) => {
              const isSelected = selectedGroups.includes(group.id)
              const isDisabled = !isSelected && atLimit

              return (
                <FormControlLabel
                  key={group.id}
                  control={
                    <Checkbox
                      size="small"
                      checked={isSelected}
                      onChange={() => handleToggle(group.id)}
                      disabled={isDisabled}
                    />
                  }
                  label={
                    <Typography
                      variant="body2"
                      sx={{ color: isDisabled ? 'text.disabled' : 'text.primary' }}
                    >
                      {group.name}
                    </Typography>
                  }
                  sx={{
                    mx: 0,
                    py: 0.25,
                    px: 0.5,
                    borderRadius: 1,
                    '&:hover': { backgroundColor: 'action.hover' },
                  }}
                />
              )
            })}
          </Stack>
        )}
      </Box>

      {/* Footer */}
      <Box
        sx={{
          p: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="caption"
          color={atLimit ? 'warning.main' : 'text.secondary'}
          sx={{ fontWeight: atLimit ? 600 : 400 }}
        >
          {selectedGroups.length}/10 selected
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button size="small" onClick={handleCancel} sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={handleSave}
            sx={{ textTransform: 'none' }}
          >
            Save
          </Button>
        </Stack>
      </Box>
    </Popover>
  )
}

export default QuickGroupsAssign

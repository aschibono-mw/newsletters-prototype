import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Autocomplete,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListSubheader,
  Divider,
  Stack,
  Typography,
  Chip,
  Checkbox,
} from '@mui/material'
import { useState } from 'react'

function AddWorkspaceDialog({
  open,
  onClose,
  workspaces,
  assignedWorkspaceIds,
  roles,
  onAdd,
  showRoles = true,
}) {
  const [selectedWorkspaces, setSelectedWorkspaces] = useState([])
  const [role, setRole] = useState('')

  const availableWorkspaces = workspaces.filter(
    (ws) => !assignedWorkspaceIds.includes(ws.id)
  )

  const handleAdd = () => {
    if (selectedWorkspaces.length > 0) {
      // Add each selected workspace with the same role
      selectedWorkspaces.forEach((workspace) => {
        onAdd({
          workspaceId: workspace.id,
          role: role || null,
          permissionOverrides: {},
        })
      })
      handleClose()
    }
  }

  const handleClose = () => {
    setSelectedWorkspaces([])
    setRole('')
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Assign to Workspace</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <Autocomplete
            multiple
            options={availableWorkspaces}
            getOptionLabel={(option) => option.name}
            value={selectedWorkspaces}
            onChange={(e, newValue) => setSelectedWorkspaces(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Workspaces"
                placeholder={selectedWorkspaces.length === 0 ? "Select workspaces" : ""}
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => {
                const { key, ...tagProps } = getTagProps({ index })
                return (
                  <Chip
                    key={key}
                    label={option.name}
                    size="small"
                    {...tagProps}
                  />
                )
              })
            }
            renderOption={(props, option, { selected }) => {
              const { key, ...restProps } = props
              return (
                <li key={key} {...restProps}>
                  <Checkbox
                    checked={selected}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Stack>
                    <Typography variant="body2">{option.name}</Typography>
                    {option.description && (
                      <Typography variant="caption" color="text.secondary">
                        {option.description}
                      </Typography>
                    )}
                  </Stack>
                </li>
              )
            }}
            disableCloseOnSelect
          />

          {showRoles && (
            <FormControl fullWidth>
              <InputLabel>Workspace Role</InputLabel>
              <Select
                value={role}
                label="Workspace Role"
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="">
                  Custom
                </MenuItem>
                <Divider />
                <ListSubheader sx={{ backgroundColor: 'background.paper', lineHeight: '32px' }}>OOTB Roles</ListSubheader>
                {roles.filter((r) => r.id.startsWith('explore-')).map((r) => (
                  <MenuItem key={r.id} value={r.id}>
                    {r.label}
                  </MenuItem>
                ))}
                <Divider />
                <ListSubheader sx={{ backgroundColor: 'background.paper', lineHeight: '32px' }}>Custom Roles</ListSubheader>
                {roles.filter((r) => !r.id.startsWith('explore-')).map((r) => (
                  <MenuItem key={r.id} value={r.id}>
                    {r.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} sx={{ textTransform: 'none' }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleAdd}
          disabled={selectedWorkspaces.length === 0}
          sx={{ textTransform: 'none' }}
        >
          {selectedWorkspaces.length > 1
            ? `Assign ${selectedWorkspaces.length} Workspaces`
            : 'Assign'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddWorkspaceDialog

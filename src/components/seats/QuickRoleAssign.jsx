import {
  Box,
  Typography,
  IconButton,
  Popover,
  Radio,
  RadioGroup,
  FormControlLabel,
  Stack,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

function QuickRoleAssign({ anchorEl, open, onClose, user, roles, onAssign }) {
  const handleChange = (e) => {
    const value = e.target.value
    onAssign(value || null)
    onClose()
  }

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      PaperProps={{
        sx: {
          width: 280,
          p: 2,
          boxShadow: 3,
        },
      }}
    >
      <Stack spacing={1.5}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Assign Role
          </Typography>
          <IconButton size="small" onClick={onClose} sx={{ mr: -0.5 }}>
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>

        <RadioGroup value={user?.role || ''} onChange={handleChange}>
          <FormControlLabel
            value=""
            control={<Radio size="small" />}
            label={
              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                None (use defaults)
              </Typography>
            }
            sx={{ mx: 0, py: 0.25 }}
          />
          {roles.map((role) => (
            <FormControlLabel
              key={role.id}
              value={role.id}
              control={<Radio size="small" />}
              label={<Typography variant="body2">{role.label}</Typography>}
              sx={{ mx: 0, py: 0.25 }}
            />
          ))}
        </RadioGroup>
      </Stack>
    </Popover>
  )
}

export default QuickRoleAssign

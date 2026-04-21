import { Box, Typography, Paper, Chip, Checkbox, IconButton } from '@mui/material'
import VerifiedIcon from '@mui/icons-material/Verified'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'

// Variant 8: Internal User Card (David Patel style - with last active)
function InternalUserCard({ data }) {
  return (
    <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Checkbox size="small" sx={{ mt: -0.5, ml: -1 }} />
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{data.name}</Typography>
            {data.verified && <VerifiedIcon sx={{ fontSize: 16, color: 'primary.main' }} />}
            {data.warning && <WarningAmberIcon sx={{ fontSize: 16, color: 'warning.main' }} />}
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {data.email}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              icon={<GroupsOutlinedIcon sx={{ fontSize: 14 }} />}
              label={data.teams?.join(', ')}
              size="small"
              sx={{ height: 24, fontSize: '0.75rem' }}
            />
            <Typography variant="caption" color="text.secondary">
              Last active {data.lastActive}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton size="small"><PersonAddOutlinedIcon sx={{ fontSize: 18 }} /></IconButton>
          <IconButton size="small"><EditOutlinedIcon sx={{ fontSize: 18 }} /></IconButton>
          <IconButton size="small"><MoreVertIcon sx={{ fontSize: 18 }} /></IconButton>
        </Box>
      </Box>
    </Paper>
  )
}

export default InternalUserCard

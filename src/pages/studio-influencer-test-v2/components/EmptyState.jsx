import { Box, Typography } from '@mui/material'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'

function EmptyState() {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'text.secondary',
      }}
    >
      <AutoAwesomeOutlinedIcon sx={{ fontSize: 64, mb: 2, opacity: 0.3 }} />
      <Typography variant="h6" sx={{ mb: 1 }}>
        Select a Test Flow
      </Typography>
      <Typography variant="body2">
        Choose a flow from the sidebar to preview the chat interaction
      </Typography>
    </Box>
  )
}

export default EmptyState

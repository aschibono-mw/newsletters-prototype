import { Box, Typography, Avatar } from '@mui/material'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'

function ChatMessage({ role, children, label }) {
  const isUser = role === 'user'

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5 }}>
        <Avatar
          sx={{
            width: 36,
            height: 36,
            backgroundColor: isUser ? 'text.primary' : 'primary.main',
            color: isUser ? 'common.white' : 'primary.contrastText',
            fontSize: '0.875rem',
            fontWeight: 600,
          }}
        >
          {isUser ? 'U' : <AutoAwesomeOutlinedIcon sx={{ fontSize: 18 }} />}
        </Avatar>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
            lineHeight: '36px',
          }}
        >
          {label || (isUser ? 'You' : 'AI Assistant')}
        </Typography>
      </Box>
      <Box sx={{ color: 'text.primary', pl: 0 }}>
        {children}
      </Box>
    </Box>
  )
}

export default ChatMessage

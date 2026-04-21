import { Box, Typography, Avatar } from '@mui/material'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import { MIRA_CHAT_MESSAGE_STYLES } from '../../constants/miraStyles'

/**
 * MiraChatMessage - Basic chat message bubble with user/assistant variants
 *
 * @param {string} [role="user"] - Message role: "user" | "assistant"
 * @param {React.ReactNode} [avatar] - Optional custom avatar element
 * @param {string} [label] - Optional custom label (defaults to "You" for user, "AI Assistant" for assistant)
 * @param {React.ReactNode} children - Message content
 * @param {object} [sx] - Additional MUI sx styles
 */
function MiraChatMessage({ role = 'user', avatar, label, children, sx }) {
  const isUser = role === 'user'
  const { avatarSize, gap, userAvatar, assistantAvatar } = MIRA_CHAT_MESSAGE_STYLES

  const defaultAvatar = isUser ? (
    <Avatar
      sx={{
        width: avatarSize,
        height: avatarSize,
        ...userAvatar,
        color: 'common.white',
        fontSize: '0.875rem',
        fontWeight: 600,
      }}
    >
      U
    </Avatar>
  ) : (
    <Avatar
      sx={{
        width: avatarSize,
        height: avatarSize,
        ...assistantAvatar,
        color: 'primary.contrastText',
      }}
    >
      <AutoAwesomeOutlinedIcon sx={{ fontSize: 18 }} />
    </Avatar>
  )

  const displayLabel = label || (isUser ? 'You' : 'AI Assistant')

  return (
    <Box sx={{ mb: 4, ...sx }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap, mb: 1.5 }}>
        {avatar || defaultAvatar}
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
            lineHeight: `${avatarSize}px`,
          }}
        >
          {displayLabel}
        </Typography>
      </Box>
      <Box sx={{ color: 'text.primary', pl: 0 }}>
        {children}
      </Box>
    </Box>
  )
}

export default MiraChatMessage

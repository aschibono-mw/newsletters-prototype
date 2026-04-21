import { Box, Typography, IconButton } from '@mui/material'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import MiraGradientBox from './MiraGradientBox'
import MiraChatInput from './MiraChatInput'

/**
 * MiraCompanionHeader - Header with icon, title, and close button
 */
function MiraCompanionHeader({ title = 'Mira Companion', onClose }) {
  return (
    <Box
      sx={{
        minHeight: 64,
        px: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'background.paper',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
        {title}
      </Typography>
      <IconButton
        onClick={onClose}
        size="small"
        sx={{ width: 32, height: 32 }}
      >
        <Box
          component="span"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            color: 'text.secondary',
          }}
        >
          ×
        </Box>
      </IconButton>
    </Box>
  )
}

/**
 * MiraCompanionPlaceholder - Empty state with icon and text
 */
function MiraCompanionPlaceholder() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        p: 3,
      }}
    >
      <AutoAwesomeOutlinedIcon
        sx={{
          fontSize: 48,
          mb: 2,
          color: 'text.disabled',
        }}
      />
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>
        Mira Companion
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
        Your intelligent assistant is ready to help.
        <br />
        Chat interface coming soon.
      </Typography>
    </Box>
  )
}

/**
 * MiraCompanionContent - Scrollable content area with subtle gradient background
 */
function MiraCompanionContent({ children }) {
  return (
    <MiraGradientBox
      variant="subtle"
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
      }}
    >
      {children || <MiraCompanionPlaceholder />}
    </MiraGradientBox>
  )
}

/**
 * MiraCompanionFooter - Input area using MiraChatInput
 */
function MiraCompanionFooter({ value, onChange, onSend, disabled = true }) {
  return (
    <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider', backgroundColor: 'background.paper' }}>
      <MiraChatInput
        value={value}
        onChange={onChange}
        onSend={onSend}
        placeholder="Type a message..."
        disabled={disabled}
      />
    </Box>
  )
}

/**
 * MiraCompanion - Main 400px fixed panel with open/close animation
 *
 * @param {boolean} open - Whether the panel is open
 * @param {function} onClose - Callback when close button clicked
 * @param {string} [title="Mira Companion"] - Header title
 * @param {React.ReactNode} [children] - Content to render (uses placeholder if empty)
 * @param {string} [inputValue] - Current input value
 * @param {function} [onInputChange] - Input change handler
 * @param {function} [onSend] - Send message handler
 * @param {boolean} [inputDisabled=true] - Whether input is disabled
 * @param {object} [sx] - Additional MUI sx styles
 */
function MiraCompanion({
  open,
  onClose,
  title = 'Mira Companion',
  children,
  inputValue = '',
  onInputChange,
  onSend,
  inputDisabled = true,
  sx,
}) {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: { xs: '100%', sm: '400px' },
        height: '100vh',
        backgroundColor: 'background.paper',
        borderLeft: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1300,
        boxShadow: 1,
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        opacity: open ? 1 : 0,
        visibility: open ? 'visible' : 'hidden',
        pointerEvents: open ? 'auto' : 'none',
        transition: open
          ? 'transform 0.3s ease, opacity 0.3s ease'
          : 'transform 0.3s ease, opacity 0.3s ease, visibility 0s linear 0.3s',
        ...sx,
      }}
    >
      <MiraCompanionHeader title={title} onClose={onClose} />
      <MiraCompanionContent>{children}</MiraCompanionContent>
      <MiraCompanionFooter
        value={inputValue}
        onChange={onInputChange}
        onSend={onSend}
        disabled={inputDisabled}
      />
    </Box>
  )
}

// Export subcomponents for advanced usage
MiraCompanion.Header = MiraCompanionHeader
MiraCompanion.Content = MiraCompanionContent
MiraCompanion.Placeholder = MiraCompanionPlaceholder
MiraCompanion.Footer = MiraCompanionFooter

export default MiraCompanion

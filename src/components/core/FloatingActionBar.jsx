import { Box, Button, IconButton, Typography, Slide, Divider } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

/**
 * FloatingActionBar - Generic floating bottom bar with slide-in animation
 *
 * @param {number} selectedCount - Number of selected items (bar shows when > 0)
 * @param {function} onClearSelection - Handler to clear selection
 * @param {string} itemLabel - Label for selected items (e.g., "user", "token")
 * @param {Array} actions - Array of action objects { label, icon, onClick, disabled, tooltip }
 * @param {number} minWidth - Minimum width of the bar (default: 400)
 */
function FloatingActionBar({
  selectedCount,
  onClearSelection,
  itemLabel = 'item',
  actions = [],
  minWidth = 400,
}) {
  if (selectedCount === 0) return null

  const pluralLabel = selectedCount !== 1 ? `${itemLabel}s` : itemLabel

  return (
    <Slide direction="up" in={selectedCount > 0} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: 'fixed',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1200,
          backgroundColor: 'grey.900',
          color: 'white',
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0,0,0,0.24)',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 2,
          py: 1,
          minWidth,
        }}
      >
        {/* Selection count */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 1 }}>
          <IconButton
            size="small"
            onClick={onClearSelection}
            sx={{ color: 'grey.400', '&:hover': { color: 'white' } }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2" sx={{ fontWeight: 500, whiteSpace: 'nowrap' }}>
            {selectedCount} {pluralLabel} selected
          </Typography>
        </Box>

        <Divider orientation="vertical" flexItem sx={{ borderColor: 'grey.700', mx: 1 }} />

        {/* Action buttons */}
        {actions.map((action, index) => (
          <Button
            key={index}
            size="small"
            startIcon={action.icon}
            onClick={action.onClick}
            disabled={action.disabled}
            sx={{
              color: action.disabled ? 'grey.600' : 'white',
              textTransform: 'none',
              '&:hover': { backgroundColor: 'grey.800' },
              '&.Mui-disabled': { color: 'grey.600' },
            }}
          >
            {action.label}
          </Button>
        ))}
      </Box>
    </Slide>
  )
}

export default FloatingActionBar

import {
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  Tooltip,
  Stack,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Indicator from '../core/Indicator'

/**
 * StudioPageToolbar - Consistent toolbar for Studio pages
 *
 * @param {object} props
 * @param {string} props.title - Page title
 * @param {function} props.onBack - Back button handler
 * @param {string} props.backTooltip - Tooltip for back button (default: "Back")
 * @param {object} props.indicator - Optional indicator { label, color, size }
 * @param {React.ReactNode} props.children - Custom content between title and actions
 * @param {object[]} props.actions - Action buttons [{ label, onClick, variant, color, startIcon, disabled, tooltip }]
 * @param {React.ReactNode} props.customActions - Custom action elements (replaces actions array)
 */
function StudioPageToolbar({
  title,
  onBack,
  backTooltip = 'Back',
  indicator,
  children,
  actions = [],
  customActions,
}) {
  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 2,
          py: 1,
          minHeight: 48,
        }}
      >
        {/* Back Button */}
        {onBack && (
          <>
            <Tooltip title={backTooltip}>
              <IconButton
                size="small"
                onClick={onBack}
                sx={{ color: 'text.secondary', p: 0.5 }}
              >
                <ArrowBackIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
            <Divider orientation="vertical" flexItem />
          </>
        )}

        {/* Title + Indicator */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
          {indicator && (
            <Indicator
              label={indicator.label}
              color={indicator.color}
              size={indicator.size || 'small'}
            />
          )}
        </Stack>

        {/* Custom children content */}
        {children}

        {/* Spacer */}
        <Box sx={{ flex: 1 }} />

        {/* Actions */}
        {customActions || (
          <Stack direction="row" spacing={1} alignItems="center">
            {actions.map((action, index) => {
              const button = (
                <Button
                  key={index}
                  variant={action.variant || 'contained'}
                  color={action.color || 'primary'}
                  size="small"
                  startIcon={action.startIcon}
                  onClick={action.onClick}
                  disabled={action.disabled}
                  sx={{ textTransform: 'none', fontWeight: 500 }}
                >
                  {action.label}
                </Button>
              )

              return action.tooltip ? (
                <Tooltip key={index} title={action.tooltip}>
                  <span>{button}</span>
                </Tooltip>
              ) : (
                button
              )
            })}
          </Stack>
        )}
      </Box>
      <Divider />
    </Box>
  )
}

export default StudioPageToolbar

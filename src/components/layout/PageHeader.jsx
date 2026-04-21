import { Paper, Stack, Typography, IconButton, Tooltip } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'

/**
 * PageHeader - Consistent page header with back button, title, and actions
 *
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} props.backTo - Navigation path for back button (optional)
 * @param {string} props.backTooltip - Tooltip text for back button (default: "Back")
 * @param {Function} props.onBack - Custom back handler (overrides backTo)
 * @param {React.ReactNode} props.actions - Right-aligned action buttons/content
 * @param {Object} props.sx - Additional sx styles
 */
function PageHeader({
  title,
  backTo,
  backTooltip = 'Back',
  onBack,
  actions,
  sx = {},
}) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else if (backTo) {
      navigate(backTo)
    }
  }

  const showBackButton = backTo || onBack

  return (
    <Paper
      elevation={1}
      sx={{
        backgroundColor: 'background.paper',
        px: 3,
        py: 2,
        borderRadius: 0,
        ...sx,
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={2}>
          {showBackButton && (
            <Tooltip title={backTooltip}>
              <IconButton
                size="small"
                sx={{ color: 'text.primary' }}
                onClick={handleBack}
              >
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
          )}
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Stack>
        {actions && <Stack direction="row" spacing={1}>{actions}</Stack>}
      </Stack>
    </Paper>
  )
}

export default PageHeader

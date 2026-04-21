import {
  Box,
  Stack,
  Typography,
  Alert,
  Button,
} from '@mui/material'
import FeaturesSection from '../docs/FeaturesSection'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'

function AlertThemed() {
  return (
    <div className="themed-showcase">
      {/* Types */}
      <div className="variant-section">
        <h4>Types</h4>
        <p>Four severity levels with semantic colors and icons.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Info
            </Typography>
            <Alert
              severity="info"
              icon={<InfoOutlinedIcon />}
              sx={{ maxWidth: 500 }}
            >
              Informative alert
            </Alert>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Success
            </Typography>
            <Alert
              severity="success"
              icon={<CheckCircleOutlineIcon />}
              sx={{ maxWidth: 500 }}
            >
              Success alert
            </Alert>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Error
            </Typography>
            <Alert
              severity="error"
              icon={<ErrorOutlineIcon />}
              sx={{ maxWidth: 500 }}
            >
              Error alert
            </Alert>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Warning
            </Typography>
            <Alert
              severity="warning"
              icon={<WarningAmberIcon />}
              sx={{ maxWidth: 500 }}
            >
              Warning alert
            </Alert>
          </Box>
        </Stack>
      </div>

      {/* Variations */}
      <div className="variant-section">
        <h4>Variations</h4>
        <p>Different positioning and action button configurations.</p>
        <Stack spacing={3}>
          {/* Popup Alert */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Popup Alert
            </Typography>
            <Alert
              severity="info"
              icon={<InfoOutlinedIcon />}
              onClose={() => {}}
              sx={{ maxWidth: 500 }}
            >
              <Box>
                Popup alert is always dismissible and has 2 optional action buttons
                <Box sx={{ mt: 1.5, display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ textTransform: 'none', fontWeight: 600 }}
                  >
                    Primary button
                  </Button>
                  <Button
                    size="small"
                    sx={{
                      color: 'primary.main',
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Secondary button
                  </Button>
                </Box>
              </Box>
            </Alert>
          </Box>

          {/* Inline Alert */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Inline Alert
            </Typography>
            <Alert
              severity="error"
              icon={<ErrorOutlineIcon />}
              action={
                <Button
                  size="small"
                  sx={{
                    color: 'error.main',
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                >
                  Action button
                </Button>
              }
            >
              Inline alerts have one optional action button
            </Alert>
          </Box>

          {/* Banner Alert - With Title */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Banner Alert (with title)
            </Typography>
            <Alert
              severity="warning"
              icon={<WarningAmberIcon />}
              onClose={() => {}}
              action={
                <Box sx={{ display: 'flex', gap: 1, mr: 1 }}>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      textTransform: 'none',
                      fontWeight: 600,
                      backgroundColor: 'warning.main',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'warning.dark',
                      },
                    }}
                  >
                    Action button
                  </Button>
                  <Button
                    size="small"
                    sx={{
                      color: 'warning.main',
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Action button
                  </Button>
                </Box>
              }
            >
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Banner alerts
                </Typography>
                Banner alerts can have an optional title and 1-2 action buttons with optional dismiss
              </Box>
            </Alert>
          </Box>

          {/* Banner Alert - Without Title */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Banner Alert (without title)
            </Typography>
            <Alert
              severity="success"
              icon={<CheckCircleOutlineIcon />}
              onClose={() => {}}
              action={
                <Box sx={{ display: 'flex', gap: 1, mr: 1 }}>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      textTransform: 'none',
                      fontWeight: 600,
                      backgroundColor: 'success.main',
                      '&:hover': {
                        backgroundColor: 'success.dark',
                      },
                    }}
                  >
                    Action button
                  </Button>
                  <Button
                    size="small"
                    sx={{
                      color: 'success.main',
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Action button
                  </Button>
                </Box>
              }
            >
              Description text only
            </Alert>
          </Box>
        </Stack>
      </div>

      {/* Alert in Dialog */}
      <div className="variant-section">
        <h4>Alert in Dialog</h4>
        <p>Inline alerts positioned underneath dialog headers.</p>
        <Stack spacing={2}>
          <Box
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              p: 3,
              maxWidth: 600,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Dialog title
            </Typography>
            <Alert
              severity="info"
              icon={<InfoOutlinedIcon />}
              action={
                <Button
                  size="small"
                  sx={{
                    color: 'primary.main',
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                >
                  Action button
                </Button>
              }
              sx={{ mb: 3 }}
            >
              This is an inline alert
            </Alert>
            <Box
              sx={{
                minHeight: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'grey.50',
                borderRadius: 1,
                mb: 3,
              }}
            >
              <Typography variant="body1" color="text.secondary">
                Slot
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button
                sx={{
                  color: 'primary.main',
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{ textTransform: 'none', fontWeight: 600 }}
              >
                OK
              </Button>
            </Box>
          </Box>
        </Stack>
      </div>

      <FeaturesSection
        features={[
          { feature: "Alert Variations", description: "Popup (top right, 16px margins), Inline (under header, full width), Banner (page-level with optional title)" },
          { feature: "Severity Colors", description: "Info (blue), Success (green), Error (red), Warning (orange) with outlined icons (InfoOutlined, CheckCircleOutline, ErrorOutline, WarningAmber)" },
          { feature: "Action Buttons", description: "Popup (2 buttons), Inline (1 button), Banner (1-2 buttons + optional dismiss). Primary (contained), Secondary (text), both 600 font weight" },
          { feature: "Common Use Cases", description: "System notifications, form validation feedback, page-level warnings, task confirmations, error messages" },
        ]}
      />
    </div>
  )
}

export default AlertThemed

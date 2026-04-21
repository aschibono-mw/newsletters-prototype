import {
  Box,
  Stack,
  Typography,
  Snackbar,
  Button,
  IconButton,
} from '@mui/material'
import FeaturesSection from '../docs/FeaturesSection'
import CloseIcon from '@mui/icons-material/Close'

function SnackbarThemed() {
  return (
    <div className="themed-showcase">
      {/* Actions */}
      <div className="variant-section">
        <h4>Actions</h4>
        <p>Snackbars with different action button configurations.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Button + Close
            </Typography>
            <Snackbar
              open={true}
              message="Snackbar message"
              action={
                <>
                  <Button
                    size="small"
                    sx={{
                      color: 'primary.main',
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Button
                  </Button>
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </>
              }
              sx={{
                position: 'static',
                transform: 'none',
                '& .MuiSnackbarContent-root': {
                  backgroundColor: '#333333',
                  color: 'white',
                  minWidth: 'auto',
                },
              }}
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Close Only
            </Typography>
            <Snackbar
              open={true}
              message="Snackbar message"
              action={
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
              sx={{
                position: 'static',
                transform: 'none',
                '& .MuiSnackbarContent-root': {
                  backgroundColor: '#333333',
                  color: 'white',
                  minWidth: 'auto',
                },
              }}
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Button Only
            </Typography>
            <Snackbar
              open={true}
              message="Snackbar message"
              action={
                <Button
                  size="small"
                  sx={{
                    color: 'primary.main',
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                >
                  Button
                </Button>
              }
              sx={{
                position: 'static',
                transform: 'none',
                '& .MuiSnackbarContent-root': {
                  backgroundColor: '#333333',
                  color: 'white',
                  minWidth: 'auto',
                },
              }}
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              No Actions
            </Typography>
            <Snackbar
              open={true}
              message="Snackbar message"
              sx={{
                position: 'static',
                transform: 'none',
                '& .MuiSnackbarContent-root': {
                  backgroundColor: '#333333',
                  color: 'white',
                  minWidth: 'auto',
                },
              }}
            />
          </Box>
        </Stack>
      </div>

      {/* Multiline */}
      <div className="variant-section">
        <h4>Multiline</h4>
        <p>Long messages wrap to multiple lines with 600px max width.</p>
        <Stack spacing={2}>
          <Snackbar
            open={true}
            message="This is a snackbar message that is really long so it will wrap into a second line. The max width of a snackbar component is 600px with action buttons."
            action={
              <>
                <Button
                  size="small"
                  sx={{
                    color: 'primary.main',
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                >
                  Button
                </Button>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </>
            }
            sx={{
              position: 'static',
              transform: 'none',
              '& .MuiSnackbarContent-root': {
                backgroundColor: '#333333',
                color: 'white',
                maxWidth: 600,
              },
            }}
          />
        </Stack>
      </div>

      <FeaturesSection
        features={[
          { feature: "Visual Styling", description: "Dark grey background (#333333), white text, teal action button (600 font weight, normal case), white close icon" },
          { feature: "Layout & Actions", description: "Max width 600px with multiline support. Action variants: Button + Close, Close only, Button only, or No actions" },
          { feature: "Positioning & Timing", description: "Bottom left (default), configurable with anchorOrigin. Auto-hide after 6000ms (default, configurable)" },
          { feature: "Common Use Cases", description: "Brief notifications, undo actions, system messages, background task updates" },
        ]}
      />
    </div>
  )
}

export default SnackbarThemed

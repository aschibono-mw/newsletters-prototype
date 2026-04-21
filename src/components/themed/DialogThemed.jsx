import { useState } from 'react'
import {
  Box,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemText,
  Alert,
  InputAdornment,
} from '@mui/material'
import FeaturesSection from '../docs/FeaturesSection'
import CloseIcon from '@mui/icons-material/Close'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

function DialogThemed() {
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)
  const [open4, setOpen4] = useState(false)
  const [open5, setOpen5] = useState(false)
  const [open6, setOpen6] = useState(false)

  return (
    <div className="themed-showcase">
      {/* Header Options */}
      <div className="variant-section">
        <h4>Header Options</h4>
        <p>Title variations with optional info icons, counts, and action buttons.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Title with Infotip
            </Typography>
            <Button variant="outlined" onClick={() => setOpen1(true)}>
              Open Dialog
            </Button>
            <Dialog open={open1} onClose={() => setOpen1(false)} maxWidth="sm" fullWidth>
              <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, pr: 6 }}>
                Dialog title
                <IconButton size="small" sx={{ ml: 0.5 }}>
                  <InfoOutlinedIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                </IconButton>
                <IconButton
                  onClick={() => setOpen1(false)}
                  sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent sx={{ px: 3, py: 2 }}>
                <Box
                  sx={{
                    backgroundColor: '#E0F2F1',
                    p: 3,
                    textAlign: 'center',
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="body2" color="primary.main">
                    Slotted content
                    <br />
                    L/R padding = 24px
                    <br />
                    T/B padding = 16px
                  </Typography>
                </Box>
              </DialogContent>
              <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={() => setOpen1(false)} sx={{ textTransform: 'none', fontWeight: 600 }}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={() => setOpen1(false)} sx={{ textTransform: 'none', fontWeight: 600 }}>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Title with Count (#)
            </Typography>
            <Button variant="outlined" onClick={() => setOpen2(true)}>
              Open Dialog
            </Button>
            <Dialog open={open2} onClose={() => setOpen2(false)} maxWidth="sm" fullWidth>
              <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, pr: 6 }}>
                Dialog title (12)
                <IconButton
                  onClick={() => setOpen2(false)}
                  sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent sx={{ px: 3, py: 2 }}>
                <Box
                  sx={{
                    backgroundColor: '#E0F2F1',
                    p: 3,
                    textAlign: 'center',
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="body2" color="primary.main">
                    Slotted content
                  </Typography>
                </Box>
              </DialogContent>
              <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={() => setOpen2(false)} sx={{ textTransform: 'none', fontWeight: 600 }}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={() => setOpen2(false)} sx={{ textTransform: 'none', fontWeight: 600 }}>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Title with Info & Count
            </Typography>
            <Button variant="outlined" onClick={() => setOpen3(true)}>
              Open Dialog
            </Button>
            <Dialog open={open3} onClose={() => setOpen3(false)} maxWidth="sm" fullWidth>
              <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, pr: 6 }}>
                Dialog title (8)
                <IconButton size="small" sx={{ ml: 0.5 }}>
                  <InfoOutlinedIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                </IconButton>
                <IconButton size="small" sx={{ ml: 0 }}>
                  <InfoOutlinedIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                </IconButton>
                <IconButton
                  onClick={() => setOpen3(false)}
                  sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent sx={{ px: 3, py: 2 }}>
                <Box
                  sx={{
                    backgroundColor: '#E0F2F1',
                    p: 3,
                    textAlign: 'center',
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="body2" color="primary.main">
                    Slotted content
                  </Typography>
                </Box>
              </DialogContent>
              <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={() => setOpen3(false)} sx={{ textTransform: 'none', fontWeight: 600 }}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={() => setOpen3(false)} sx={{ textTransform: 'none', fontWeight: 600 }}>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Stack>
      </div>

      {/* Alert in Header */}
      <div className="variant-section">
        <h4>Alert in Header</h4>
        <p>Inline alert positioned below the dialog title.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              With Alert Message
            </Typography>
            <Button variant="outlined" onClick={() => setOpen4(true)}>
              Open Dialog
            </Button>
            <Dialog open={open4} onClose={() => setOpen4(false)} maxWidth="sm" fullWidth>
              <DialogTitle sx={{ pr: 6 }}>
                Dialog title
                <IconButton
                  onClick={() => setOpen4(false)}
                  sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <Alert
                severity="success"
                icon={<CheckCircleOutlineIcon />}
                sx={{ mx: 3, mt: 0, mb: 2 }}
              >
                Write accurate and concise description of the info you want a user to take away and clarify any concepts, tasks, or details.
              </Alert>
              <DialogContent sx={{ px: 3, py: 2 }}>
                <Box
                  sx={{
                    backgroundColor: '#E0F2F1',
                    p: 3,
                    textAlign: 'center',
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="body2" color="primary.main">
                    Slotted content
                  </Typography>
                </Box>
              </DialogContent>
              <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={() => setOpen4(false)} sx={{ textTransform: 'none', fontWeight: 600 }}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={() => setOpen4(false)} sx={{ textTransform: 'none', fontWeight: 600 }}>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Stack>
      </div>

      {/* Find Bar in Header */}
      <div className="variant-section">
        <h4>Find/Search Bar in Header</h4>
        <p>Search field positioned below the dialog title.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              With Search Bar
            </Typography>
            <Button variant="outlined" onClick={() => setOpen5(true)}>
              Open Dialog
            </Button>
            <Dialog open={open5} onClose={() => setOpen5(false)} maxWidth="sm" fullWidth>
              <DialogTitle sx={{ pr: 6 }}>
                Dialog title
                <IconButton
                  onClick={() => setOpen5(false)}
                  sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <Box sx={{ px: 3, mb: 2 }}>
                <TextField
                  placeholder="Find"
                  size="small"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <DialogContent sx={{ px: 3, py: 2 }}>
                <Box
                  sx={{
                    backgroundColor: '#E0F2F1',
                    p: 3,
                    textAlign: 'center',
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="body2" color="primary.main">
                    Slotted content
                  </Typography>
                </Box>
              </DialogContent>
              <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={() => setOpen5(false)} sx={{ textTransform: 'none', fontWeight: 600 }}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={() => setOpen5(false)} sx={{ textTransform: 'none', fontWeight: 600 }}>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Stack>
      </div>

      {/* Content Variations */}
      <div className="variant-section">
        <h4>Content Variations</h4>
        <p>Different content types within dialogs.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              List Menu
            </Typography>
            <Button variant="outlined" onClick={() => setOpen6(true)}>
              Open Dialog
            </Button>
            <Dialog open={open6} onClose={() => setOpen6(false)} maxWidth="xs" fullWidth>
              <DialogTitle sx={{ pr: 6 }}>
                Dialog title
                <IconButton
                  onClick={() => setOpen6(false)}
                  sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent sx={{ px: 0, py: 0 }}>
                <List sx={{ py: 0 }}>
                  <ListItem sx={{ px: 3, py: 0, mb: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', textTransform: 'uppercase' }}>
                      SUBHEADER
                    </Typography>
                  </ListItem>
                  <ListItem
                    button
                    sx={{
                      px: 3,
                      py: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      color: 'primary.main',
                    }}
                  >
                    <AddIcon sx={{ fontSize: 20 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Add item
                    </Typography>
                  </ListItem>
                  {[1, 2, 3, 4, 5].map((item) => (
                    <ListItem button key={item} sx={{ px: 3, py: 1 }}>
                      <ListItemText primary="List item" />
                    </ListItem>
                  ))}
                  <ListItem
                    button
                    sx={{
                      px: 3,
                      py: 1,
                      justifyContent: 'center',
                      color: 'primary.main',
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Show all
                    </Typography>
                  </ListItem>
                </List>
              </DialogContent>
              <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={() => setOpen6(false)} sx={{ textTransform: 'none', fontWeight: 600 }}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={() => setOpen6(false)} sx={{ textTransform: 'none', fontWeight: 600 }}>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Confirmation (Text)
            </Typography>
            <Dialog open={false} maxWidth="xs">
              <DialogTitle sx={{ pr: 6 }}>
                Dialog title
                <IconButton sx={{ position: 'absolute', right: 8, top: 8 }}>
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent sx={{ px: 3, py: 2 }}>
                <Typography variant="body2">
                  Use a confirmation modal to verify intent and prevent accidental operations. Provide clear, concise language that explains the action's impact.
                </Typography>
              </DialogContent>
              <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button sx={{ textTransform: 'none', fontWeight: 600 }}>
                  Cancel
                </Button>
                <Button variant="contained" sx={{ textTransform: 'none', fontWeight: 600 }}>
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
            <Box
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                p: 2,
                backgroundColor: 'background.paper',
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Dialog title
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                Use a confirmation modal to verify intent and prevent accidental operations. Provide clear, concise language that explains the action's impact.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button sx={{ textTransform: 'none', fontWeight: 600 }}>
                  Cancel
                </Button>
                <Button variant="contained" sx={{ textTransform: 'none', fontWeight: 600 }}>
                  Confirm
                </Button>
              </Box>
            </Box>
          </Box>
        </Stack>
      </div>

      {/* Footer Options */}
      <div className="variant-section">
        <h4>Footer Button Options</h4>
        <p>Different button combinations in dialog footer.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Primary Only
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
              <Button variant="contained" sx={{ textTransform: 'none', fontWeight: 600 }}>
                Primary
              </Button>
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Secondary + Primary
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
              <Button sx={{ textTransform: 'none', fontWeight: 600 }}>
                Secondary
              </Button>
              <Button variant="contained" sx={{ textTransform: 'none', fontWeight: 600 }}>
                Primary
              </Button>
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Tertiary + Secondary + Primary
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
              <Button sx={{ textTransform: 'none', fontWeight: 600, color: 'primary.main' }}>
                Help
              </Button>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button sx={{ textTransform: 'none', fontWeight: 600 }}>
                  Cancel
                </Button>
                <Button variant="contained" sx={{ textTransform: 'none', fontWeight: 600 }}>
                  OK
                </Button>
              </Box>
            </Box>
          </Box>
        </Stack>
      </div>

      <FeaturesSection
        features={[
          { feature: "Header Options", description: "Title with optional infotip icons, count (#), up to 5 action buttons, always includes close X. Alert or search bar below title (24px margins)" },
          { feature: "Content & Padding", description: "24px left/right, 16px top/bottom. Supports custom slots, list menus with subheaders, confirmation text" },
          { feature: "Footer Buttons", description: "Primary only, Secondary + Primary, or Tertiary (Help) + Secondary + Primary. Normal case, 600 font weight" },
          { feature: "Common Use Cases", description: "Forms, confirmations, list selection, settings, onboarding, data entry, delete confirmations. Max widths: xs (444px) to xl (1536px)" },
        ]}
      />
    </div>
  )
}

export default DialogThemed

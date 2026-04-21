import { useState } from 'react'
import {
  Box,
  Stack,
  Typography,
  Button,
  Popover,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material'
import FeaturesSection from '../docs/FeaturesSection'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import LogoutIcon from '@mui/icons-material/Logout'

function PopoverThemed() {
  const [anchorEl1, setAnchorEl1] = useState(null)
  const [anchorEl2, setAnchorEl2] = useState(null)
  const [anchorEl3, setAnchorEl3] = useState(null)
  const [anchorEl4, setAnchorEl4] = useState(null)
  const [hoverAnchor, setHoverAnchor] = useState(null)

  const open1 = Boolean(anchorEl1)
  const open2 = Boolean(anchorEl2)
  const open3 = Boolean(anchorEl3)
  const open4 = Boolean(anchorEl4)
  const hoverOpen = Boolean(hoverAnchor)

  return (
    <div className="themed-showcase">
      {/* Basic Popover */}
      <div className="variant-section">
        <h4>Basic Popover</h4>
        <p>Floating content anchored to a trigger element.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Click to Open
            </Typography>
            <Button
              variant="contained"
              onClick={(e) => setAnchorEl1(e.currentTarget)}
              aria-describedby={open1 ? 'basic-popover' : undefined}
            >
              Open Popover
            </Button>
            <Popover
              id="basic-popover"
              open={open1}
              anchorEl={anchorEl1}
              onClose={() => setAnchorEl1(null)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Typography sx={{ p: 2 }}>
                This is the popover content.
              </Typography>
            </Popover>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              With Rich Content
            </Typography>
            <Button
              variant="outlined"
              onClick={(e) => setAnchorEl2(e.currentTarget)}
            >
              Show Details
            </Button>
            <Popover
              open={open2}
              anchorEl={anchorEl2}
              onClose={() => setAnchorEl2(null)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              PaperProps={{
                sx: { width: 280, p: 2 }
              }}
            >
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Feature Details
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                This popover contains more complex content including text,
                lists, and actions.
              </Typography>
              <Stack direction="row" spacing={1}>
                <Button size="small" variant="text">Learn More</Button>
                <Button size="small" variant="contained">Got It</Button>
              </Stack>
            </Popover>
          </Box>
        </Stack>
      </div>

      {/* Anchor Positions */}
      <div className="variant-section">
        <h4>Anchor Positions</h4>
        <p>Control where the popover appears relative to its anchor.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Position Examples
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              <Button
                variant="outlined"
                size="small"
                onClick={(e) => setAnchorEl3(e.currentTarget)}
              >
                Bottom-Left
              </Button>
              <Popover
                open={open3}
                anchorEl={anchorEl3}
                onClose={() => setAnchorEl3(null)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <Typography sx={{ p: 2 }}>
                  Anchored at bottom-left
                </Typography>
              </Popover>
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Position Reference
            </Typography>
            <Box sx={{ p: 2, backgroundColor: 'grey.100', borderRadius: 1, maxWidth: 400 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                anchorOrigin options:
              </Typography>
              <Typography variant="caption" component="div" sx={{ fontFamily: 'monospace', mb: 2 }}>
                vertical: 'top' | 'center' | 'bottom'<br />
                horizontal: 'left' | 'center' | 'right'
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                transformOrigin options:
              </Typography>
              <Typography variant="caption" component="div" sx={{ fontFamily: 'monospace' }}>
                vertical: 'top' | 'center' | 'bottom'<br />
                horizontal: 'left' | 'center' | 'right'
              </Typography>
            </Box>
          </Box>
        </Stack>
      </div>

      {/* Mouse Hover */}
      <div className="variant-section">
        <h4>Mouse Hover</h4>
        <p>Popover triggered by hover for tooltip-like behavior.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Hover Trigger
            </Typography>
            <Typography
              component="span"
              onMouseEnter={(e) => setHoverAnchor(e.currentTarget)}
              onMouseLeave={() => setHoverAnchor(null)}
              sx={{
                borderBottom: '1px dashed',
                borderColor: 'primary.main',
                cursor: 'help',
                color: 'primary.main',
              }}
            >
              Hover over this text
            </Typography>
            <Popover
              sx={{ pointerEvents: 'none' }}
              open={hoverOpen}
              anchorEl={hoverAnchor}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              onClose={() => setHoverAnchor(null)}
              disableRestoreFocus
            >
              <Typography sx={{ p: 2, maxWidth: 250 }}>
                This popover appears on hover. Use for additional context without
                requiring a click.
              </Typography>
            </Popover>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Icon with Help Popover
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography>Field Label</Typography>
              <IconButton
                size="small"
                onMouseEnter={(e) => setAnchorEl4(e.currentTarget)}
                onMouseLeave={() => setAnchorEl4(null)}
              >
                <HelpOutlineIcon fontSize="small" />
              </IconButton>
              <Popover
                sx={{ pointerEvents: 'none' }}
                open={open4}
                anchorEl={anchorEl4}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                onClose={() => setAnchorEl4(null)}
                disableRestoreFocus
              >
                <Typography sx={{ p: 2, maxWidth: 200 }}>
                  Help text explaining what this field is for.
                </Typography>
              </Popover>
            </Stack>
          </Box>
        </Stack>
      </div>

      {/* Common Patterns */}
      <div className="variant-section">
        <h4>Common Patterns</h4>
        <p>Typical popover use cases.</p>
        <Stack spacing={4}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              User Account Popover
            </Typography>
            <PopoverDemo />
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Info Popover
            </Typography>
            <InfoPopoverDemo />
          </Box>
        </Stack>
      </div>

      {/* Popover vs Tooltip vs Menu */}
      <div className="variant-section">
        <h4>When to Use</h4>
        <p>Choosing between Popover, Tooltip, and Menu.</p>
        <Stack spacing={2}>
          <Box sx={{ p: 2, backgroundColor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="subtitle2" fontWeight={600}>Tooltip</Typography>
            <Typography variant="body2" color="text.secondary">
              Brief text labels. Non-interactive. Triggered by hover/focus.
            </Typography>
          </Box>
          <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'primary.contrastText', borderRadius: 1 }}>
            <Typography variant="subtitle2" fontWeight={600}>Popover</Typography>
            <Typography variant="body2">
              Rich content (text, buttons, forms). Can be interactive. Click or hover triggered.
            </Typography>
          </Box>
          <Box sx={{ p: 2, backgroundColor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="subtitle2" fontWeight={600}>Menu</Typography>
            <Typography variant="body2" color="text.secondary">
              List of actions/options. Always click triggered. Selection dismisses.
            </Typography>
          </Box>
        </Stack>
      </div>

      <FeaturesSection
        features={[
          { feature: "Anchor Element", description: "Positions relative to any DOM element via anchorEl prop" },
          { feature: "Origin Props", description: "anchorOrigin + transformOrigin control exact positioning" },
          { feature: "Rich Content", description: "Can contain any content: text, buttons, forms, lists" },
          { feature: "Hover Trigger", description: "Set pointerEvents: 'none' and disableRestoreFocus for hover behavior" },
          { feature: "Paper Props", description: "Customize underlying Paper component (width, padding, elevation)" },
        ]}
      />
    </div>
  )
}

// Helper component for user account popover demo
function PopoverDemo() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<PersonOutlineIcon />}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        Account
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: { width: 240, mt: 1 }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" fontWeight={600}>John Doe</Typography>
          <Typography variant="body2" color="text.secondary">john@example.com</Typography>
        </Box>
        <Divider />
        <List dense>
          <ListItem button onClick={() => setAnchorEl(null)}>
            <ListItemIcon><PersonOutlineIcon fontSize="small" /></ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button onClick={() => setAnchorEl(null)}>
            <ListItemIcon><SettingsOutlinedIcon fontSize="small" /></ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button onClick={() => setAnchorEl(null)}>
            <ListItemIcon><NotificationsOutlinedIcon fontSize="small" /></ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItem>
        </List>
        <Divider />
        <List dense>
          <ListItem button onClick={() => setAnchorEl(null)}>
            <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
            <ListItemText primary="Sign out" />
          </ListItem>
        </List>
      </Popover>
    </>
  )
}

// Helper component for info popover demo
function InfoPopoverDemo() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography>Processing Status</Typography>
      <IconButton
        size="small"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        aria-describedby={open ? 'info-popover' : undefined}
      >
        <InfoOutlinedIcon fontSize="small" color="action" />
      </IconButton>
      <Popover
        id="info-popover"
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          sx: { maxWidth: 300, p: 2 }
        }}
      >
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
          About Processing Status
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Items are processed in order of submission. Average processing
          time is 2-3 business days. You'll receive an email notification
          when complete.
        </Typography>
      </Popover>
    </Stack>
  )
}

export default PopoverThemed

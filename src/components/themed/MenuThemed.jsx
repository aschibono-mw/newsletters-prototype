import { useState } from 'react'
import {
  Box,
  Stack,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
} from '@mui/material'
import FeaturesSection from '../docs/FeaturesSection'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ContentCutIcon from '@mui/icons-material/ContentCut'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import LogoutIcon from '@mui/icons-material/Logout'
import CheckIcon from '@mui/icons-material/Check'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

function MenuThemed() {
  const [basicAnchor, setBasicAnchor] = useState(null)
  const [iconAnchor, setIconAnchor] = useState(null)
  const [actionsAnchor, setActionsAnchor] = useState(null)
  const [accountAnchor, setAccountAnchor] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(1)

  const basicOpen = Boolean(basicAnchor)
  const iconOpen = Boolean(iconAnchor)
  const actionsOpen = Boolean(actionsAnchor)
  const accountOpen = Boolean(accountAnchor)

  return (
    <div className="themed-showcase">
      {/* Basic Menu */}
      <div className="variant-section">
        <h4>Basic Menu</h4>
        <p>Simple menu triggered by button click.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Button Trigger
            </Typography>
            <Button
              variant="outlined"
              onClick={(e) => setBasicAnchor(e.currentTarget)}
              aria-controls={basicOpen ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={basicOpen ? 'true' : undefined}
            >
              Open Menu
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={basicAnchor}
              open={basicOpen}
              onClose={() => setBasicAnchor(null)}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={() => setBasicAnchor(null)}>Profile</MenuItem>
              <MenuItem onClick={() => setBasicAnchor(null)}>My account</MenuItem>
              <MenuItem onClick={() => setBasicAnchor(null)}>Logout</MenuItem>
            </Menu>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Icon Button Trigger
            </Typography>
            <IconButton
              onClick={(e) => setIconAnchor(e.currentTarget)}
              aria-controls={iconOpen ? 'icon-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={iconOpen ? 'true' : undefined}
              aria-label="more options"
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="icon-menu"
              anchorEl={iconAnchor}
              open={iconOpen}
              onClose={() => setIconAnchor(null)}
            >
              <MenuItem onClick={() => setIconAnchor(null)}>Edit</MenuItem>
              <MenuItem onClick={() => setIconAnchor(null)}>Duplicate</MenuItem>
              <MenuItem onClick={() => setIconAnchor(null)}>Archive</MenuItem>
              <Divider />
              <MenuItem onClick={() => setIconAnchor(null)}>Delete</MenuItem>
            </Menu>
          </Box>
        </Stack>
      </div>

      {/* Menu with Icons */}
      <div className="variant-section">
        <h4>With Icons</h4>
        <p>Menu items with leading icons for visual context.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Edit Actions
            </Typography>
            <Paper sx={{ width: 220 }}>
              <MenuList>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                  <Typography variant="body2" color="text.secondary">
                    Ctrl+X
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCopyIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                  <Typography variant="body2" color="text.secondary">
                    Ctrl+C
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentPasteIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                  <Typography variant="body2" color="text.secondary">
                    Ctrl+V
                  </Typography>
                </MenuItem>
              </MenuList>
            </Paper>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              File Actions
            </Typography>
            <Button
              variant="contained"
              onClick={(e) => setActionsAnchor(e.currentTarget)}
            >
              Actions
            </Button>
            <Menu
              anchorEl={actionsAnchor}
              open={actionsOpen}
              onClose={() => setActionsAnchor(null)}
            >
              <MenuItem onClick={() => setActionsAnchor(null)}>
                <ListItemIcon>
                  <EditOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Edit</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => setActionsAnchor(null)}>
                <ListItemIcon>
                  <ShareOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Share</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => setActionsAnchor(null)}>
                <ListItemIcon>
                  <DownloadOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Download</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => setActionsAnchor(null)}>
                <ListItemIcon>
                  <PrintOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Print</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => setActionsAnchor(null)} sx={{ color: 'error.main' }}>
                <ListItemIcon>
                  <DeleteOutlineIcon fontSize="small" sx={{ color: 'error.main' }} />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Stack>
      </div>

      {/* Menu with Selected State */}
      <div className="variant-section">
        <h4>Selected State</h4>
        <p>Menu items can show selection with checkmarks.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Single Selection
            </Typography>
            <Paper sx={{ width: 200 }}>
              <MenuList>
                {['Option 1', 'Option 2', 'Option 3'].map((option, index) => (
                  <MenuItem
                    key={option}
                    selected={index === selectedIndex}
                    onClick={() => setSelectedIndex(index)}
                  >
                    {index === selectedIndex && (
                      <ListItemIcon>
                        <CheckIcon fontSize="small" />
                      </ListItemIcon>
                    )}
                    <ListItemText inset={index !== selectedIndex}>
                      {option}
                    </ListItemText>
                  </MenuItem>
                ))}
              </MenuList>
            </Paper>
          </Box>
        </Stack>
      </div>

      {/* Dense Menu */}
      <div className="variant-section">
        <h4>Dense Menu</h4>
        <p>Compact menu for space-constrained contexts.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Compact Items
            </Typography>
            <Paper sx={{ width: 200 }}>
              <MenuList dense>
                <MenuItem>
                  <ListItemText>Small item 1</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText>Small item 2</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText>Small item 3</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemText>Small item 4</ListItemText>
                </MenuItem>
              </MenuList>
            </Paper>
          </Box>
        </Stack>
      </div>

      {/* Account Menu */}
      <div className="variant-section">
        <h4>Account Menu</h4>
        <p>Common pattern for user account dropdown.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              User Actions
            </Typography>
            <Button
              variant="text"
              onClick={(e) => setAccountAnchor(e.currentTarget)}
              startIcon={<PersonOutlineIcon />}
            >
              John Doe
            </Button>
            <Menu
              anchorEl={accountAnchor}
              open={accountOpen}
              onClose={() => setAccountAnchor(null)}
              PaperProps={{
                sx: { width: 220, mt: 1 }
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={() => setAccountAnchor(null)}>
                <ListItemIcon>
                  <PersonOutlineIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => setAccountAnchor(null)}>
                <ListItemIcon>
                  <SettingsOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Settings</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => setAccountAnchor(null)}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Stack>
      </div>

      {/* Nested Menu Indicator */}
      <div className="variant-section">
        <h4>Nested Menu Indicator</h4>
        <p>Menu items that indicate submenu availability.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Submenu Arrow
            </Typography>
            <Paper sx={{ width: 200 }}>
              <MenuList>
                <MenuItem>
                  <ListItemText>Option A</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText>Option B</ListItemText>
                  <KeyboardArrowRightIcon fontSize="small" color="action" />
                </MenuItem>
                <MenuItem>
                  <ListItemText>Option C</ListItemText>
                  <KeyboardArrowRightIcon fontSize="small" color="action" />
                </MenuItem>
              </MenuList>
            </Paper>
          </Box>
        </Stack>
      </div>

      <FeaturesSection
        features={[
          { feature: "Trigger Elements", description: "Button, IconButton (MoreVertIcon), or any clickable element can open menus" },
          { feature: "Icon Support", description: "ListItemIcon with outlined icons (EditOutlined, ShareOutlined) for visual context" },
          { feature: "Keyboard Shortcuts", description: "Display shortcuts (Ctrl+C, Ctrl+V) as secondary text aligned right" },
          { feature: "Dividers", description: "Divider component separates menu sections (e.g., actions from destructive options)" },
          { feature: "Positioning", description: "anchorOrigin/transformOrigin props control menu placement relative to trigger" },
        ]}
      />
    </div>
  )
}

export default MenuThemed

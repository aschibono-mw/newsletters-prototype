import { useState } from 'react'
import {
  Box,
  Stack,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material'
import FeaturesSection from '../docs/FeaturesSection'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import AddIcon from '@mui/icons-material/AddRounded'
import MoreVertIcon from '@mui/icons-material/MoreVertRounded'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

function TabsThemed() {
  const [tabValue, setTabValue] = useState(0)
  const [tabValueWithIcons, setTabValueWithIcons] = useState(0)
  const [tabValueActions, setTabValueActions] = useState(0)
  const [anchorEl, setAnchorEl] = useState(null)
  const [moreAnchorEl, setMoreAnchorEl] = useState(null)

  const handleTabChange = (setter) => (event, newValue) => {
    setter(newValue)
  }

  const handleDropdownClick = (event) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleMoreClick = (event) => {
    setMoreAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setMoreAnchorEl(null)
  }

  return (
    <div className="themed-showcase">
      {/* States */}
      <div className="variant-section">
        <h4>States</h4>
        <p>Tab states including default, hover, active, and disabled.</p>
        <Stack spacing={2}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange(setTabValue)}
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                },
              }}
            >
              <Tab label="Default" />
              <Tab label="Hover" />
              <Tab label="Active" />
              <Tab label="Disabled" disabled />
            </Tabs>
          </Box>
        </Stack>
      </div>

      {/* Types - Just Text */}
      <div className="variant-section">
        <h4>Types - Just Text</h4>
        <p>Simple text-only tabs.</p>
        <Stack spacing={2}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={0} sx={{ '& .MuiTab-root': { textTransform: 'none' } }}>
              <Tab label="Just Text" />
            </Tabs>
          </Box>
        </Stack>
      </div>

      {/* Types - With Icons */}
      <div className="variant-section">
        <h4>Types - With Start Icons</h4>
        <p>Tabs with leading icons for visual identification.</p>
        <Stack spacing={2}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValueWithIcons}
              onChange={handleTabChange(setTabValueWithIcons)}
              sx={{ '& .MuiTab-root': { textTransform: 'none' } }}
            >
              <Tab icon={<FacebookIcon />} iconPosition="start" label="Facebook" />
              <Tab icon={<InstagramIcon />} iconPosition="start" label="Instagram" />
              <Tab icon={<TwitterIcon />} iconPosition="start" label="X" />
            </Tabs>
          </Box>
        </Stack>
      </div>

      {/* Types - With Actions (Dropdown) */}
      <div className="variant-section">
        <h4>Types - With Actions</h4>
        <p>Tabs with dropdown menus for additional actions.</p>
        <Stack spacing={2}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValueActions}
              onChange={handleTabChange(setTabValueActions)}
              sx={{ '& .MuiTab-root': { textTransform: 'none' } }}
            >
              <Tab
                icon={<FacebookIcon />}
                iconPosition="start"
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    Facebook
                    <KeyboardArrowDownIcon
                      sx={{ fontSize: 20 }}
                      onClick={handleDropdownClick}
                    />
                  </Box>
                }
              />
              <Tab
                icon={<InstagramIcon />}
                iconPosition="start"
                label="Instagram"
              />
              <Tab
                icon={<TwitterIcon />}
                iconPosition="start"
                label="X"
              />
            </Tabs>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <MenuItem onClick={handleClose}>Edit tab name</MenuItem>
              <MenuItem onClick={handleClose}>Duplicate tab</MenuItem>
              <MenuItem onClick={handleClose}>Duplicate layout</MenuItem>
              <Divider />
              <MenuItem onClick={handleClose} sx={{ color: 'error.main' }}>
                Delete tab
              </MenuItem>
            </Menu>
          </Box>
        </Stack>
      </div>

      {/* Types - More Overflow Menu */}
      <div className="variant-section">
        <h4>Types - More Overflow</h4>
        <p>Overflow menu for tabs that don't fit in the visible area.</p>
        <Stack spacing={2}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Tabs value={0} sx={{ flex: 1, '& .MuiTab-root': { textTransform: 'none' } }}>
                <Tab label="Tabs" />
                <Tab label="Tabs" />
                <Tab label="Tabs" />
                <Tab label="Tabs" />
                <Tab label="Tabs" />
                <Tab label="Tabs" />
              </Tabs>
              <IconButton size="small" onClick={handleMoreClick}>
                <MoreVertIcon />
              </IconButton>
              <Typography variant="body2" sx={{ mx: 1 }}>
                More
              </Typography>
              <IconButton size="small">
                <AddIcon />
              </IconButton>
            </Box>

            <Menu
              anchorEl={moreAnchorEl}
              open={Boolean(moreAnchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleClose}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FacebookIcon sx={{ fontSize: 20 }} />
                  TikTok
                </Box>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <InstagramIcon sx={{ fontSize: 20 }} />
                  Bluesky
                </Box>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TwitterIcon sx={{ fontSize: 20 }} />
                  LinkedIn
                </Box>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TwitterIcon sx={{ fontSize: 20 }} />
                  Threads
                </Box>
              </MenuItem>
            </Menu>
          </Box>
        </Stack>
      </div>

      {/* Uses - Full Width */}
      <div className="variant-section">
        <h4>Uses - Full Width</h4>
        <p>Tabs spanning the full container width with equal distribution.</p>
        <Stack spacing={2}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={0} variant="fullWidth" sx={{ '& .MuiTab-root': { textTransform: 'none' } }}>
              <Tab label="Tabs" />
              <Tab label="Tabs" />
              <Tab label="Tabs" />
              <Tab label="Tabs" />
              <Tab label="Tabs" />
              <Tab label="Tabs" />
            </Tabs>
          </Box>
        </Stack>
      </div>

      {/* Uses - Scrollable */}
      <div className="variant-section">
        <h4>Uses - Scrollable</h4>
        <p>Horizontally scrollable tabs for overflow content.</p>
        <Stack spacing={2}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={0} variant="scrollable" scrollButtons="auto" sx={{ '& .MuiTab-root': { textTransform: 'none' } }}>
              <Tab label="Tabs" />
              <Tab label="Tabs" />
              <Tab label="Tabs" />
              <Tab label="Tabs" />
              <Tab label="Tabs" />
              <Tab label="Tabs" />
            </Tabs>
          </Box>
        </Stack>
      </div>

      {/* Uses - Standard (Default) */}
      <div className="variant-section">
        <h4>Uses - Standard</h4>
        <p>Default tab layout with natural content width.</p>
        <Stack spacing={2}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={0} sx={{ '& .MuiTab-root': { textTransform: 'none' } }}>
              <Tab label="Tabs" />
              <Tab label="Tabs" />
              <Tab label="Tabs" />
              <Tab label="Tabs" />
            </Tabs>
          </Box>
        </Stack>
      </div>

      {/* Uses - With More and Add Button */}
      <div className="variant-section">
        <h4>Uses - With More and Add</h4>
        <p>Tab bar with overflow menu and add button.</p>
        <Stack spacing={2}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Tabs value={2} sx={{ flex: 1, '& .MuiTab-root': { textTransform: 'none' } }}>
                <Tab label="Tabs" />
                <Tab label="Tabs" />
                <Tab label="Tabs" />
                <Tab label="Tabs" />
              </Tabs>
              <IconButton size="small">
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
        </Stack>
      </div>

      {/* Compact Size */}
      <div className="variant-section">
        <h4>Compact Size</h4>
        <p>Smaller tabs for compact layouts.</p>
        <Stack spacing={2}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={0}
              sx={{
                minHeight: 40,
                '& .MuiTab-root': {
                  minHeight: 40,
                  py: 1,
                  fontSize: '0.875rem',
                  textTransform: 'none',
                },
              }}
            >
              <Tab label="Tabs" />
              <Tab label="Tabs" />
              <Tab label="Tabs" />
              <Tab label="Tabs" />
              <Tab label="Tabs" />
              <Tab label="Tabs" />
            </Tabs>
          </Box>
        </Stack>
      </div>

      {/* Large Size */}
      <div className="variant-section">
        <h4>Large Size</h4>
        <p>Larger tabs with more padding for emphasis.</p>
        <Stack spacing={2}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={0}
              sx={{
                minHeight: 56,
                '& .MuiTab-root': {
                  minHeight: 56,
                  py: 2,
                  fontSize: '1rem',
                  textTransform: 'none',
                },
              }}
            >
              <Tab label="Tabs" />
              <Tab label="Tabs" />
              <Tab label="Tabs" />
              <Tab label="Tabs" />
              <Tab label="Tabs" />
              <Tab label="Tabs" />
            </Tabs>
          </Box>
        </Stack>
      </div>

      <FeaturesSection
        features={[
          { feature: "Tab Variants & States", description: "Standard/Full Width/Scrollable variants. States: Default, Hover (grey), Active (2px teal underline with 300ms animation), Disabled" },
          { feature: "Layouts & Actions", description: "Icon positions (Start/Top), dropdown menus on tabs, More overflow menu, Add button. Sizes: Compact (40px), Default (48px), Large (56px)" },
          { feature: "Typography & Spacing", description: "Body2 (14px), 600 font weight, normal case, 16px horizontal padding, 8-16px vertical padding" },
          { feature: "Common Use Cases", description: "Content sections, navigation, settings panels, multi-step forms, data views. ARIA tabs role with keyboard navigation" },
        ]}
      />
    </div>
  )
}

export default TabsThemed

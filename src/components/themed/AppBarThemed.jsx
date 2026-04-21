import { useState } from 'react'
import {
  Box,
  Stack,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  InputBase,
  Menu,
  MenuItem,
  Avatar,
  Badge,
} from '@mui/material'
import { styled, alpha } from '@mui/material/styles'
import FeaturesSection from '../docs/FeaturesSection'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import MailIcon from '@mui/icons-material/Mail'
import HomeIcon from '@mui/icons-material/Home'
import SettingsIcon from '@mui/icons-material/Settings'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

function AppBarThemed() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileAnchorEl, setMobileAnchorEl] = useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileAnchorEl)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuOpen = (event) => {
    setMobileAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setMobileAnchorEl(null)
  }

  return (
    <div className="themed-showcase">
      {/* Basic App Bar */}
      <div className="variant-section">
        <h4>Basic App Bar</h4>
        <p>Standard top navigation with branding and actions.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Simple
            </Typography>
            <Box sx={{ borderRadius: 1, overflow: 'hidden' }}>
              <AppBar position="static">
                <Toolbar>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    App Title
                  </Typography>
                  <Button color="inherit">Login</Button>
                </Toolbar>
              </AppBar>
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              With Navigation Links
            </Typography>
            <Box sx={{ borderRadius: 1, overflow: 'hidden' }}>
              <AppBar position="static">
                <Toolbar>
                  <Typography variant="h6" component="div" sx={{ mr: 4 }}>
                    Logo
                  </Typography>
                  <Button color="inherit">Home</Button>
                  <Button color="inherit">Products</Button>
                  <Button color="inherit">About</Button>
                  <Box sx={{ flexGrow: 1 }} />
                  <Button color="inherit">Contact</Button>
                </Toolbar>
              </AppBar>
            </Box>
          </Box>
        </Stack>
      </div>

      {/* With Search */}
      <div className="variant-section">
        <h4>With Search</h4>
        <p>App bar with integrated search field.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Search Bar
            </Typography>
            <Box sx={{ borderRadius: 1, overflow: 'hidden' }}>
              <AppBar position="static">
                <Toolbar>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                  >
                    App Name
                  </Typography>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search..."
                      inputProps={{ 'aria-label': 'search' }}
                    />
                  </Search>
                  <Box sx={{ flexGrow: 1 }} />
                  <IconButton color="inherit">
                    <Badge badgeContent={4} color="error">
                      <MailIcon />
                    </Badge>
                  </IconButton>
                  <IconButton color="inherit">
                    <Badge badgeContent={17} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    edge="end"
                    color="inherit"
                    onClick={handleProfileMenuOpen}
                  >
                    <AccountCircleIcon />
                  </IconButton>
                </Toolbar>
              </AppBar>
              <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleMenuClose}>My account</MenuItem>
                <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
              </Menu>
            </Box>
          </Box>
        </Stack>
      </div>

      {/* Color Variants */}
      <div className="variant-section">
        <h4>Color Variants</h4>
        <p>AppBar supports different color schemes.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Primary (Default)
            </Typography>
            <Box sx={{ borderRadius: 1, overflow: 'hidden' }}>
              <AppBar position="static" color="primary">
                <Toolbar variant="dense">
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>Primary</Typography>
                  <IconButton color="inherit"><HomeIcon /></IconButton>
                </Toolbar>
              </AppBar>
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Secondary
            </Typography>
            <Box sx={{ borderRadius: 1, overflow: 'hidden' }}>
              <AppBar position="static" color="secondary">
                <Toolbar variant="dense">
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>Secondary</Typography>
                  <IconButton color="inherit"><HomeIcon /></IconButton>
                </Toolbar>
              </AppBar>
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Transparent
            </Typography>
            <Box sx={{ borderRadius: 1, overflow: 'hidden', backgroundColor: 'grey.100', p: 2 }}>
              <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar variant="dense">
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>Transparent</Typography>
                  <IconButton><HomeIcon /></IconButton>
                </Toolbar>
              </AppBar>
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Default (Paper Color)
            </Typography>
            <Box sx={{ borderRadius: 1, overflow: 'hidden' }}>
              <AppBar position="static" color="default">
                <Toolbar variant="dense">
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>Default</Typography>
                  <IconButton><HomeIcon /></IconButton>
                </Toolbar>
              </AppBar>
            </Box>
          </Box>
        </Stack>
      </div>

      {/* Dense Toolbar */}
      <div className="variant-section">
        <h4>Toolbar Variants</h4>
        <p>Regular and dense toolbar heights.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Regular (64px)
            </Typography>
            <Box sx={{ borderRadius: 1, overflow: 'hidden' }}>
              <AppBar position="static">
                <Toolbar>
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>Regular Toolbar</Typography>
                  <Button color="inherit">Action</Button>
                </Toolbar>
              </AppBar>
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Dense (48px)
            </Typography>
            <Box sx={{ borderRadius: 1, overflow: 'hidden' }}>
              <AppBar position="static">
                <Toolbar variant="dense">
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>Dense Toolbar</Typography>
                  <Button color="inherit" size="small">Action</Button>
                </Toolbar>
              </AppBar>
            </Box>
          </Box>
        </Stack>
      </div>

      {/* With User Avatar */}
      <div className="variant-section">
        <h4>With User Menu</h4>
        <p>App bar with avatar and user dropdown.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Avatar Menu
            </Typography>
            <Box sx={{ borderRadius: 1, overflow: 'hidden' }}>
              <AppBar position="static">
                <Toolbar>
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Dashboard
                  </Typography>
                  <IconButton color="inherit">
                    <SettingsIcon />
                  </IconButton>
                  <IconButton color="inherit">
                    <Badge badgeContent={3} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <IconButton sx={{ ml: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                      JD
                    </Avatar>
                  </IconButton>
                </Toolbar>
              </AppBar>
            </Box>
          </Box>
        </Stack>
      </div>

      {/* Responsive Actions */}
      <div className="variant-section">
        <h4>Responsive Actions</h4>
        <p>Show/hide actions based on screen size with mobile menu.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Mobile Menu Pattern
            </Typography>
            <Box sx={{ borderRadius: 1, overflow: 'hidden' }}>
              <AppBar position="static">
                <Toolbar>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Responsive App
                  </Typography>
                  <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <IconButton color="inherit">
                      <Badge badgeContent={4} color="error">
                        <MailIcon />
                      </Badge>
                    </IconButton>
                    <IconButton color="inherit">
                      <NotificationsIcon />
                    </IconButton>
                    <IconButton color="inherit">
                      <AccountCircleIcon />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                      size="large"
                      color="inherit"
                      onClick={handleMobileMenuOpen}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </Toolbar>
              </AppBar>
              <Menu
                anchorEl={mobileAnchorEl}
                open={isMobileMenuOpen}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>
                  <Badge badgeContent={4} color="error" sx={{ mr: 2 }}>
                    <MailIcon />
                  </Badge>
                  Messages
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <NotificationsIcon sx={{ mr: 2 }} />
                  Notifications
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <AccountCircleIcon sx={{ mr: 2 }} />
                  Profile
                </MenuItem>
              </Menu>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              On mobile, actions collapse into overflow menu
            </Typography>
          </Box>
        </Stack>
      </div>

      <FeaturesSection
        features={[
          { feature: "Position Options", description: "static (in flow), fixed (top), sticky (scroll-aware), absolute, relative" },
          { feature: "Color Variants", description: "primary, secondary, default (paper), transparent, or custom via sx" },
          { feature: "Toolbar Variants", description: "Regular (64px height) or dense (48px) for compact layouts" },
          { feature: "Search Integration", description: "Styled InputBase with icon for in-header search functionality" },
          { feature: "Responsive Design", description: "Use display breakpoints to show/hide elements, overflow menu for mobile" },
        ]}
      />
    </div>
  )
}

export default AppBarThemed

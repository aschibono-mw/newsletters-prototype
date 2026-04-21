import { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  InputBase,
  IconButton,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  Popover,
  Badge,
} from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined'
import TokenOutlinedIcon from '@mui/icons-material/TokenOutlined'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import CodeIcon from '@mui/icons-material/Code'
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined'
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined'
import WorkspacesOutlinedIcon from '@mui/icons-material/WorkspacesOutlined'
import HubOutlinedIcon from '@mui/icons-material/HubOutlined'
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import ViewQuiltOutlinedIcon from '@mui/icons-material/ViewQuiltOutlined'
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined'
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined'
import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined'
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined'
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined'

function AppHeader({ pageName = 'Page', parentName = 'App', chatOpen = false, onChatToggle = () => {} }) {
  const theme = useTheme()
  const location = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchExpanded, setSearchExpanded] = useState(false)
  const [appsAnchorEl, setAppsAnchorEl] = useState(null)

  const appsMenuOpen = Boolean(appsAnchorEl)

  // App launcher items - organized by category
  const appLauncherItems = [
    { icon: <InsightsOutlinedIcon />, path: '/insights', label: 'Insights' },
    { icon: <ExploreOutlinedIcon />, path: '/discover', label: 'Discover' },
    { icon: <WorkspacesOutlinedIcon />, path: '/workspace', label: 'Workspace' },
    { icon: <HubOutlinedIcon />, path: '/hub', label: 'Hub' },
    { icon: <SmartToyOutlinedIcon />, path: '/studio', label: 'Studio' },
    { icon: <AutoGraphOutlinedIcon />, path: '/genai-lens', label: 'GenAI Lens' },
  ]

  const adminItems = [
    { icon: <GroupOutlinedIcon />, path: '/users', label: 'Users' },
    { icon: <BadgeOutlinedIcon />, path: '/seats-v10', label: 'Seats' },
    { icon: <BadgeOutlinedIcon />, path: '/seats-v10-no-groups', label: 'Seats (No Groups)' },
    { icon: <TokenOutlinedIcon />, path: '/api-tokens', label: 'API Tokens' },
    { icon: <ViewListOutlinedIcon />, path: '/automation', label: 'Automation' },
  ]

  const toolsItems = [
    { icon: <DashboardCustomizeOutlinedIcon />, path: '/ds-collection', label: 'Components' },
    { icon: <AutoAwesomeOutlinedIcon />, path: '/mira-components', label: 'Mira Components' },
    { icon: <MenuBookOutlinedIcon />, path: '/guidelines', label: 'Guidelines' },
    { icon: <DashboardCustomizeOutlinedIcon />, path: '/templates', label: 'Templates' },
    { icon: <ViewQuiltOutlinedIcon />, path: '/layout-demo', label: 'Layout Demo' },
    { icon: <ViewSidebarOutlinedIcon />, path: '/drawer-test', label: 'Drawer Test' },
    { icon: <ScienceOutlinedIcon />, path: '/uxr/checkbox', label: 'UXR' },
  ]

  // Breakpoint detection
  const isXs = useMediaQuery(theme.breakpoints.down('sm')) // xs = 0-599
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md')) // sm = 600-899
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg')) // md = 900-1199
  const isLg = useMediaQuery(theme.breakpoints.up('lg')) // lg = 1200+

  const navItems = [
    { icon: <SmartToyOutlinedIcon />, path: '/automation', label: 'Automation' },
    { icon: <TokenOutlinedIcon />, path: '/api-tokens', label: 'API Tokens' },
    { icon: <GroupOutlinedIcon />, path: '/users', label: 'Users' },
  ]

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  const handleSearchExpand = () => {
    setSearchExpanded(true)
  }

  const handleSearchCollapse = () => {
    setSearchExpanded(false)
  }

  const handleAppsClick = (event) => {
    setAppsAnchorEl(event.currentTarget)
  }

  const handleAppsClose = () => {
    setAppsAnchorEl(null)
  }

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper',
          zIndex: 1201,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            gap: { xs: 1, sm: 1.5, md: 2 },
            px: { xs: 2, sm: 2, md: 3 },
            pr: { xs: 2, sm: 2, md: 3, lg: chatOpen ? 'calc(400px + 24px)' : 3 },
            minHeight: { xs: 56, sm: 64 },
            transition: 'padding-right 0.3s ease',
          }}
        >
          {/* Left Section: Hamburger + Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {/* Hamburger Menu (xs only) */}
            {isXs && (
              <IconButton
                onClick={handleDrawerToggle}
                sx={{
                  color: 'text.secondary',
                  p: 1,
                }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Logo / App Name */}
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <CodeIcon sx={{ color: 'primary.main', fontSize: 28, strokeWidth: 1.5, stroke: 'currentColor' }} />
              <Box>
                {/* Stacked text at sm/xs breakpoints */}
                {(isSm || isXs) ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: 14 }}>
                      {parentName}
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 400, fontSize: 12, color: 'text.secondary' }}>
                      {pageName}
                    </Typography>
                  </Box>
                ) : (
                  <Typography variant="h6" sx={{ fontWeight: 800, fontSize: 20 }}>
                    {parentName} <span style={{ fontWeight: 400 }}>{pageName}</span>
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>

          {/* Right Section: Search + Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5, md: 2 } }}>
            {/* Search Bar */}
            {(isLg || isMd || (isSm && !searchExpanded)) && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'background.default',
                  borderRadius: '18px',
                  px: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  minWidth: { xs: 0, sm: 160, md: 200, lg: 240 },
                  height: 36,
                  '&:focus-within': {
                    borderColor: 'primary.main',
                  },
                }}
              >
                <SearchIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
                <InputBase
                  placeholder="Find"
                  sx={{
                    flex: 1,
                    fontSize: 14,
                    '& input::placeholder': {
                      color: 'text.secondary',
                      opacity: 1,
                    },
                  }}
                />
              </Box>
            )}

            {/* Search Icon Button (sm collapsed or xs) */}
            {((isSm && searchExpanded) || isXs) && !searchExpanded && (
              <IconButton
                onClick={handleSearchExpand}
                sx={{
                  color: 'text.secondary',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: '50%',
                  width: 36,
                  height: 36,
                }}
              >
                <SearchIcon fontSize="small" />
              </IconButton>
            )}

            {/* Expanded Search (full width overlay at sm/xs) */}
            {searchExpanded && (isSm || isXs) && (
              <Box
                sx={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 64,
                  backgroundColor: 'background.paper',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  display: 'flex',
                  alignItems: 'center',
                  px: 2,
                  gap: 1,
                  zIndex: 1300,
                }}
              >
                <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                <InputBase
                  autoFocus
                  onBlur={handleSearchCollapse}
                  placeholder="Find"
                  sx={{
                    flex: 1,
                    fontSize: 14,
                    '& input::placeholder': {
                      color: 'text.secondary',
                      opacity: 1,
                    },
                  }}
                />
              </Box>
            )}

            {/* Mira Companion Button */}
            {!isXs && (
              <Box
                onClick={onChatToggle}
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  alignItems: 'center',
                  gap: 1,
                  px: { sm: 1, md: 2 },
                  borderRadius: '4px',
                  cursor: 'pointer',
                  height: 36,
                  backgroundColor: chatOpen ? 'action.selected' : 'background.paper',
                  border: '1px solid',
                  borderColor: chatOpen ? 'primary.main' : 'divider',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '4px',
                    padding: '1px',
                    background: 'linear-gradient(135deg, #00827F 0%, #B627A1 100%)',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    opacity: chatOpen ? 0 : 0,
                    transition: 'opacity 0.2s ease',
                  },
                  '&:hover::before': {
                    opacity: chatOpen ? 0 : 1,
                  },
                  '&:active::before': {
                    opacity: chatOpen ? 0 : 1,
                  },
                  '&:hover': {
                    borderColor: chatOpen ? 'primary.main' : 'transparent',
                  },
                }}
              >
                <AutoAwesomeOutlinedIcon
                  sx={{
                    color: 'text.primary',
                    fontSize: 20
                  }}
                />
                {(isMd || isLg) && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.primary',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Mira Companion
                  </Typography>
                )}
              </Box>
            )}

            {/* Grid App Launcher */}
            <IconButton
              onClick={handleAppsClick}
              aria-describedby={appsMenuOpen ? 'apps-popover' : undefined}
              sx={{
                color: appsMenuOpen ? 'primary.main' : 'text.secondary',
                border: '1px solid',
                borderColor: appsMenuOpen ? 'primary.main' : 'divider',
                borderRadius: '50%',
                width: 36,
                height: 36,
                backgroundColor: appsMenuOpen ? 'action.selected' : 'transparent',
              }}
            >
              <AppsOutlinedIcon fontSize="small" />
            </IconButton>

            {/* Bell Icon */}
            <IconButton
              sx={{
                color: 'text.secondary',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '50%',
                width: 36,
                height: 36,
              }}
            >
              <Badge
                badgeContent={3}
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: 'secondary.main',
                    color: 'white',
                    fontSize: 10,
                    minWidth: 18,
                    height: 18,
                  },
                }}
              >
                <NotificationsOutlinedIcon fontSize="small" />
              </Badge>
            </IconButton>

            {/* Help Button */}
            {!isXs && (
              <Box
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  alignItems: 'center',
                  gap: 1,
                  px: { sm: 1, md: 2 },
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  height: 36,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ChatBubbleOutlineIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                {(isMd || isLg) && (
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Help
                  </Typography>
                )}
              </Box>
            )}

            {/* Company / User */}
            {!isXs && (
              <Box
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  alignItems: 'center',
                  gap: 1,
                  pl: 2,
                  pr: 0.5,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: '18px',
                  cursor: 'pointer',
                  height: 36,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <Typography variant="body2" sx={{ color: 'text.primary', whiteSpace: 'nowrap' }}>
                  Company
                </Typography>
                <Avatar
                  sx={{
                    width: 28,
                    height: 28,
                    backgroundColor: 'grey.300',
                  }}
                />
              </Box>
            )}

            {/* User Avatar Only (xs) */}
            {isXs && (
              <IconButton sx={{ p: 0 }}>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    backgroundColor: 'grey.300',
                  }}
                />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer for Navigation */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <CodeIcon sx={{ color: 'primary.main', fontSize: 32, strokeWidth: 1.5, stroke: 'currentColor' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {parentName}
            </Typography>
          </Box>

          {/* Home */}
          <ListItem
            button
            component={RouterLink}
            to="/"
            onClick={handleDrawerToggle}
            sx={{
              borderRadius: 1,
              mb: 1,
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <ListItemIcon>
              <HomeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>

          <Divider sx={{ my: 2 }} />

          {/* Navigation Items */}
          <List>
            {navItems.map((item) => (
              <ListItem
                key={item.path}
                button
                component={RouterLink}
                to={item.path}
                onClick={handleDrawerToggle}
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  '&.Mui-selected': {
                    backgroundColor: 'action.selected',
                    color: 'primary.main',
                    '& .MuiListItemIcon-root': {
                      color: 'primary.main',
                    },
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>

        </Box>
      </Drawer>

      {/* App Launcher Popover */}
      <Popover
        id="apps-popover"
        open={appsMenuOpen}
        anchorEl={appsAnchorEl}
        onClose={handleAppsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              borderRadius: 2,
              boxShadow: theme.shadows[8],
              minWidth: 320,
              maxWidth: 360,
            },
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          {/* Apps Section */}
          <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 600, mb: 1.5, display: 'block' }}>
            Apps
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 1,
              mb: 2,
            }}
          >
            {appLauncherItems.map((item) => (
              <Box
                key={item.path}
                component={RouterLink}
                to={item.path}
                onClick={handleAppsClose}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 0.5,
                  p: 1.5,
                  borderRadius: 1,
                  textDecoration: 'none',
                  color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                  backgroundColor: location.pathname === item.path ? 'action.selected' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <Box
                  sx={{
                    color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                    '& .MuiSvgIcon-root': {
                      fontSize: 24,
                    },
                  }}
                >
                  {item.icon}
                </Box>
                <Typography variant="caption" sx={{ fontWeight: 500, textAlign: 'center' }}>
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: 1.5 }} />

          {/* Admin Section */}
          <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 600, mb: 1.5, display: 'block' }}>
            Admin
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 1,
              mb: 2,
            }}
          >
            {adminItems.map((item) => (
              <Box
                key={item.path}
                component={RouterLink}
                to={item.path}
                onClick={handleAppsClose}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 0.5,
                  p: 1.5,
                  borderRadius: 1,
                  textDecoration: 'none',
                  color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                  backgroundColor: location.pathname === item.path ? 'action.selected' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <Box
                  sx={{
                    color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                    '& .MuiSvgIcon-root': {
                      fontSize: 24,
                    },
                  }}
                >
                  {item.icon}
                </Box>
                <Typography variant="caption" sx={{ fontWeight: 500, textAlign: 'center' }}>
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: 1.5 }} />

          {/* Tools Section */}
          <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 600, mb: 1.5, display: 'block' }}>
            Tools
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 1,
            }}
          >
            {toolsItems.map((item) => (
              <Box
                key={item.path}
                component={RouterLink}
                to={item.path}
                onClick={handleAppsClose}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 0.5,
                  p: 1.5,
                  borderRadius: 1,
                  textDecoration: 'none',
                  color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                  backgroundColor: location.pathname === item.path ? 'action.selected' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <Box
                  sx={{
                    color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                    '& .MuiSvgIcon-root': {
                      fontSize: 24,
                    },
                  }}
                >
                  {item.icon}
                </Box>
                <Typography variant="caption" sx={{ fontWeight: 500, textAlign: 'center' }}>
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Popover>
    </>
  )
}

export default AppHeader

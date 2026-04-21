import { useState } from 'react'
import {
  Box,
  Stack,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Badge,
} from '@mui/material'
import FeaturesSection from '../docs/FeaturesSection'
import HomeIcon from '@mui/icons-material/Home'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import SearchIcon from '@mui/icons-material/Search'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import PersonIcon from '@mui/icons-material/Person'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SettingsIcon from '@mui/icons-material/Settings'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ExploreIcon from '@mui/icons-material/Explore'

function BottomNavigationThemed() {
  const [value1, setValue1] = useState(0)
  const [value2, setValue2] = useState(0)
  const [value3, setValue3] = useState('home')
  const [value4, setValue4] = useState(0)

  return (
    <div className="themed-showcase">
      {/* Basic Bottom Navigation */}
      <div className="variant-section">
        <h4>Basic Bottom Navigation</h4>
        <p>Mobile-style navigation bar with icon and label.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Simple (3 Items)
            </Typography>
            <Paper sx={{ width: 320, borderRadius: 1, overflow: 'hidden' }}>
              <BottomNavigation
                value={value1}
                onChange={(event, newValue) => setValue1(newValue)}
                showLabels
              >
                <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
                <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
              </BottomNavigation>
            </Paper>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              More Items (5)
            </Typography>
            <Paper sx={{ width: 400, borderRadius: 1, overflow: 'hidden' }}>
              <BottomNavigation
                value={value2}
                onChange={(event, newValue) => setValue2(newValue)}
                showLabels
              >
                <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                <BottomNavigationAction label="Search" icon={<SearchIcon />} />
                <BottomNavigationAction label="Add" icon={<AddCircleIcon />} />
                <BottomNavigationAction label="Alerts" icon={<NotificationsIcon />} />
                <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
              </BottomNavigation>
            </Paper>
          </Box>
        </Stack>
      </div>

      {/* With String Values */}
      <div className="variant-section">
        <h4>With String Values</h4>
        <p>Use string values instead of indices for better semantics.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Named Values
            </Typography>
            <Paper sx={{ width: 350, borderRadius: 1, overflow: 'hidden' }}>
              <BottomNavigation
                value={value3}
                onChange={(event, newValue) => setValue3(newValue)}
                showLabels
              >
                <BottomNavigationAction
                  label="Home"
                  value="home"
                  icon={value3 === 'home' ? <HomeIcon /> : <HomeOutlinedIcon />}
                />
                <BottomNavigationAction
                  label="Search"
                  value="search"
                  icon={value3 === 'search' ? <SearchIcon /> : <SearchOutlinedIcon />}
                />
                <BottomNavigationAction
                  label="Favorites"
                  value="favorites"
                  icon={value3 === 'favorites' ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                />
                <BottomNavigationAction
                  label="Profile"
                  value="profile"
                  icon={value3 === 'profile' ? <PersonIcon /> : <PersonOutlineIcon />}
                />
              </BottomNavigation>
            </Paper>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Selected: {value3}
            </Typography>
          </Box>
        </Stack>
      </div>

      {/* Labels Hidden */}
      <div className="variant-section">
        <h4>Label Behavior</h4>
        <p>Labels can be always shown, only on selection, or hidden.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              showLabels (Always Visible)
            </Typography>
            <Paper sx={{ width: 320, borderRadius: 1, overflow: 'hidden' }}>
              <BottomNavigation value={0} showLabels>
                <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                <BottomNavigationAction label="Search" icon={<SearchIcon />} />
                <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
              </BottomNavigation>
            </Paper>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Without showLabels (Selected Only)
            </Typography>
            <Paper sx={{ width: 320, borderRadius: 1, overflow: 'hidden' }}>
              <BottomNavigation value={0}>
                <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                <BottomNavigationAction label="Search" icon={<SearchIcon />} />
                <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
              </BottomNavigation>
            </Paper>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Labels only appear for selected item
            </Typography>
          </Box>
        </Stack>
      </div>

      {/* With Badges */}
      <div className="variant-section">
        <h4>With Badges</h4>
        <p>Show notification counts on navigation items.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Badge Notifications
            </Typography>
            <Paper sx={{ width: 350, borderRadius: 1, overflow: 'hidden' }}>
              <BottomNavigation value={value4} onChange={(e, v) => setValue4(v)} showLabels>
                <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                <BottomNavigationAction
                  label="Cart"
                  icon={
                    <Badge badgeContent={3} color="error">
                      <ShoppingCartIcon />
                    </Badge>
                  }
                />
                <BottomNavigationAction
                  label="Alerts"
                  icon={
                    <Badge badgeContent={12} color="error">
                      <NotificationsIcon />
                    </Badge>
                  }
                />
                <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
              </BottomNavigation>
            </Paper>
          </Box>
        </Stack>
      </div>

      {/* App-like Layout */}
      <div className="variant-section">
        <h4>App-like Layout</h4>
        <p>Fixed bottom navigation simulating mobile app pattern.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Mobile App Pattern
            </Typography>
            <Paper sx={{ width: 320, height: 400, position: 'relative', overflow: 'hidden', borderRadius: 2 }}>
              <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'primary.contrastText' }}>
                <Typography variant="h6">App Header</Typography>
              </Box>
              <Box sx={{ p: 2, height: 'calc(100% - 112px)', overflowY: 'auto', backgroundColor: 'grey.50' }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Main content area. Scroll to see fixed bottom navigation stays in place.
                </Typography>
                {[1, 2, 3, 4, 5].map((item) => (
                  <Box
                    key={item}
                    sx={{
                      p: 2,
                      mb: 1,
                      backgroundColor: 'background.paper',
                      borderRadius: 1,
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Typography variant="body2">Content item {item}</Typography>
                  </Box>
                ))}
              </Box>
              <Paper
                sx={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
                elevation={3}
              >
                <BottomNavigation value={0} showLabels>
                  <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                  <BottomNavigationAction label="Explore" icon={<ExploreIcon />} />
                  <BottomNavigationAction label="Location" icon={<LocationOnIcon />} />
                  <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
                </BottomNavigation>
              </Paper>
            </Paper>
          </Box>
        </Stack>
      </div>

      {/* Custom Styling */}
      <div className="variant-section">
        <h4>Custom Styling</h4>
        <p>Styled bottom navigation with custom colors.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Colored Background
            </Typography>
            <Paper sx={{ width: 350, borderRadius: 1, overflow: 'hidden' }}>
              <BottomNavigation
                value={0}
                showLabels
                sx={{
                  backgroundColor: 'primary.main',
                  '& .MuiBottomNavigationAction-root': {
                    color: 'rgba(255,255,255,0.7)',
                    '&.Mui-selected': {
                      color: 'white',
                    },
                  },
                }}
              >
                <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                <BottomNavigationAction label="Search" icon={<SearchIcon />} />
                <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
                <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
              </BottomNavigation>
            </Paper>
          </Box>
        </Stack>
      </div>

      <FeaturesSection
        features={[
          { feature: "Mobile Navigation", description: "Primary navigation for mobile apps, fixed at bottom of viewport" },
          { feature: "showLabels Prop", description: "true shows all labels; false shows only selected label" },
          { feature: "Value Control", description: "Controlled via numeric index or string value for semantic selection" },
          { feature: "Badge Support", description: "Wrap icons with Badge component for notification indicators" },
          { feature: "Icon States", description: "Use filled/outlined icon pairs to indicate selection state" },
        ]}
      />
    </div>
  )
}

export default BottomNavigationThemed

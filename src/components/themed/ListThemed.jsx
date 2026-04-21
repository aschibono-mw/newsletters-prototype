import {
  Box,
  List as MuiList,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Stack,
  Typography,
  Divider,
  TextField,
  InputAdornment,
  Button,
  MenuItem,
  Avatar,
  Checkbox,
  Radio,
  Switch,
  IconButton,
} from '@mui/material'
import FeaturesSection from '../docs/FeaturesSection'
import SearchIcon from '@mui/icons-material/Search'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import VisibilityIcon from '@mui/icons-material/Visibility'
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

function ListThemed() {
  return (
    <div className="themed-showcase">
      {/* Menu List with Search & Subheaders */}
      <div className="variant-section">
        <h4>Menu List with Search & Subheaders</h4>
        <p>Complex menu pattern with search, grouped sections, and actions.</p>
        <Stack spacing={2}>
          <MuiList
            sx={{
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              maxWidth: 400,
              py: 1,
            }}
          >
            {/* Search Field */}
            <ListItem sx={{ py: 1 }}>
              <TextField
                placeholder="Find..."
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </ListItem>

            <Divider />

            {/* Actions Section */}
            <ListSubheader
              sx={{
                lineHeight: '32px',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                color: 'text.secondary',
                bgcolor: 'background.paper',
              }}
            >
              Actions
            </ListSubheader>
            <MenuItem>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <AddCircleOutlineIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Create Project" />
            </MenuItem>
            <MenuItem>
              <ListItemText primary="Manage Projects" />
            </MenuItem>

            <Divider />

            {/* Projects Section with Action */}
            <ListSubheader
              sx={{
                lineHeight: '32px',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                color: 'text.secondary',
                bgcolor: 'background.paper',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              Projects
              <Button
                size="small"
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  minWidth: 'auto',
                }}
              >
                Clear
              </Button>
            </ListSubheader>
            <MenuItem>Q4 Campaign Analysis</MenuItem>
            <MenuItem>Product Launch Research</MenuItem>
            <MenuItem>Customer Feedback Review</MenuItem>
            <MenuItem>Market Research Initiative</MenuItem>
            <MenuItem>Product Roadmap Planning</MenuItem>
            <MenuItem>
              <ListItemText
                primary="Show More"
                primaryTypographyProps={{
                  sx: { color: 'primary.main', fontWeight: 600 },
                }}
              />
            </MenuItem>
          </MuiList>
        </Stack>
      </div>

      {/* Date Range Picker */}
      <div className="variant-section">
        <h4>Date Range Picker</h4>
        <p>Time period selection menu with predefined ranges and custom options.</p>
        <Stack spacing={2}>
          <MuiList
            sx={{
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              maxWidth: 380,
              py: 1,
            }}
          >
            <MenuItem>Since last viewed</MenuItem>
            <MenuItem>Last hour</MenuItem>
            <MenuItem>
              <ListItemText primary="Today" />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                Detail
              </Typography>
            </MenuItem>
            <MenuItem>This week</MenuItem>
            <MenuItem>This month</MenuItem>
            <MenuItem>This quarter</MenuItem>
            <MenuItem>This year</MenuItem>
            <MenuItem>Last 7 days</MenuItem>
            <MenuItem
              sx={{
                bgcolor: 'rgba(8, 145, 178, 0.08)',
                borderLeft: '3px solid',
                borderLeftColor: 'primary.main',
              }}
            >
              Last 14 days
            </MenuItem>
            <MenuItem>Last 30 days</MenuItem>
            <MenuItem>Last 90 days</MenuItem>
            <MenuItem>Last year</MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CalendarTodayIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
              </ListItemIcon>
              <ListItemText primary="Custom date range" />
              <OpenInNewIcon sx={{ fontSize: 20, color: 'text.secondary', ml: 1 }} />
            </MenuItem>
            <MenuItem>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CompareArrowsIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
              </ListItemIcon>
              <ListItemText primary="Compare date range" />
              <OpenInNewIcon sx={{ fontSize: 20, color: 'text.secondary', ml: 1 }} />
            </MenuItem>
          </MuiList>
        </Stack>
      </div>

      {/* Profile Dropdown */}
      <div className="variant-section">
        <h4>Profile Dropdown</h4>
        <p>User account menu with avatar header and navigation options.</p>
        <Stack spacing={2}>
          <MuiList
            sx={{
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              maxWidth: 380,
              py: 1,
            }}
          >
            {/* User Header */}
            <ListItem sx={{ py: 2, px: 2 }}>
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  bgcolor: 'grey.300',
                  color: 'text.secondary',
                  mr: 2,
                }}
              >
                <Typography variant="h6">AM</Typography>
              </Avatar>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  Arlene McCoy
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  arlene.mccoy@acme.com
                </Typography>
              </Box>
            </ListItem>
            <Divider />
            <MenuItem>
              <ListItemText primary="Account" />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="body2" color="text.secondary">
                  Arlene McCoy
                </Typography>
                <ChevronRightIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
              </Box>
            </MenuItem>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Mobile App Demo</MenuItem>
            <MenuItem>Explore Resource Manager</MenuItem>
            <MenuItem>Access Product Portal</MenuItem>
            <Divider />
            <MenuItem sx={{ color: 'error.main' }}>Logout</MenuItem>
          </MuiList>
        </Stack>
      </div>

      {/* Sorting Menu */}
      <div className="variant-section">
        <h4>Sorting Menu</h4>
        <p>Grouped selection menu for sorting and ordering options.</p>
        <Stack spacing={2}>
          <MuiList
            sx={{
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              maxWidth: 300,
              py: 1,
            }}
          >
            <MenuItem
              sx={{
                bgcolor: 'rgba(8, 145, 178, 0.08)',
                borderLeft: '3px solid',
                borderLeftColor: 'primary.main',
              }}
            >
              Date
            </MenuItem>
            <MenuItem>Reach</MenuItem>
            <MenuItem>Sentiment</MenuItem>
            <MenuItem>Geo</MenuItem>
            <MenuItem>Relevance</MenuItem>
            <MenuItem>Prominence</MenuItem>
            <MenuItem>Social Echo</MenuItem>
            <Divider />
            <MenuItem
              sx={{
                bgcolor: 'rgba(8, 145, 178, 0.08)',
                borderLeft: '3px solid',
                borderLeftColor: 'primary.main',
              }}
            >
              Ascending
            </MenuItem>
            <MenuItem>Descending</MenuItem>
          </MuiList>
        </Stack>
      </div>

      {/* List Item States */}
      <div className="variant-section">
        <h4>List Item States</h4>
        <p>Various list item configurations with interactive elements.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Basic States
            </Typography>
            <Stack spacing={1.5}>
              <Box
                sx={{
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  p: 1.5,
                }}
              >
                <Typography variant="body1">List item</Typography>
              </Box>
              <Box
                sx={{
                  bgcolor: 'rgba(8, 145, 178, 0.08)',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  borderLeft: '3px solid',
                  borderLeftColor: 'primary.main',
                  p: 1.5,
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  List item
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              With Checkbox
            </Typography>
            <Stack spacing={1.5}>
              <Box
                sx={{
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  p: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <Checkbox size="small" />
                <SentimentSatisfiedIcon sx={{ fontSize: 24, color: 'text.secondary' }} />
                <Typography variant="body1" sx={{ flex: 1 }}>
                  List item
                </Typography>
                <IconButton size="small">
                  <InfoOutlinedIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                </IconButton>
              </Box>
              <Box
                sx={{
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  p: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <Checkbox size="small" checked />
                <SentimentSatisfiedIcon sx={{ fontSize: 24, color: 'text.secondary' }} />
                <Typography variant="body1" sx={{ flex: 1 }}>
                  List item
                </Typography>
                <IconButton size="small">
                  <InfoOutlinedIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                </IconButton>
              </Box>
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              With Radio and Secondary Actions
            </Typography>
            <Stack spacing={1.5}>
              <Box
                sx={{
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  p: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <Radio size="small" />
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <VisibilityIcon sx={{ fontSize: 24, color: 'white' }} />
                </Box>
                <Typography variant="body1" sx={{ flex: 1 }}>
                  List item
                </Typography>
                <Switch size="small" />
              </Box>
              <Box
                sx={{
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  p: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <Radio size="small" checked />
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <VisibilityIcon sx={{ fontSize: 24, color: 'white' }} />
                </Box>
                <Typography variant="body1" sx={{ flex: 1 }}>
                  List item
                </Typography>
                <Switch size="small" />
              </Box>
            </Stack>
          </Box>
        </Stack>
      </div>

      {/* Simple Menu List */}
      <div className="variant-section">
        <h4>Simple Menu List</h4>
        <p>Basic clickable list items without search or subheaders.</p>
        <Stack spacing={2}>
          <MuiList
            sx={{
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              maxWidth: 300,
              py: 1,
            }}
          >
            <MenuItem>Menu Item 1</MenuItem>
            <MenuItem>Menu Item 2</MenuItem>
            <MenuItem>Menu Item 3</MenuItem>
          </MuiList>
        </Stack>
      </div>

      {/* Menu with Dividers */}
      <div className="variant-section">
        <h4>Menu with Dividers</h4>
        <p>Visual separation between menu sections.</p>
        <Stack spacing={2}>
          <MuiList
            sx={{
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              maxWidth: 300,
              py: 1,
            }}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem>My Account</MenuItem>
            <Divider />
            <MenuItem>Settings</MenuItem>
            <Divider />
            <MenuItem sx={{ color: 'error.main' }}>Logout</MenuItem>
          </MuiList>
        </Stack>
      </div>

      {/* Menu with Icons */}
      <div className="variant-section">
        <h4>Menu with Icons</h4>
        <p>Icons add visual context to menu items.</p>
        <Stack spacing={2}>
          <MuiList
            sx={{
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              maxWidth: 300,
              py: 1,
            }}
          >
            <MenuItem>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <AddCircleOutlineIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Create New" />
            </MenuItem>
            <MenuItem>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <SearchIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Search" />
            </MenuItem>
          </MuiList>
        </Stack>
      </div>

      {/* Subheader Variants */}
      <div className="variant-section">
        <h4>Subheader Variants</h4>
        <p>Different subheader configurations for organizing lists.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Simple Subheader
            </Typography>
            <MuiList
              sx={{
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                maxWidth: 300,
                py: 1,
              }}
            >
              <ListSubheader
                sx={{
                  lineHeight: '32px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  color: 'text.secondary',
                  bgcolor: 'background.paper',
                }}
              >
                Category
              </ListSubheader>
              <MenuItem>Item 1</MenuItem>
              <MenuItem>Item 2</MenuItem>
            </MuiList>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Subheader with Action Button
            </Typography>
            <MuiList
              sx={{
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                maxWidth: 300,
                py: 1,
              }}
            >
              <ListSubheader
                sx={{
                  lineHeight: '32px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  color: 'text.secondary',
                  bgcolor: 'background.paper',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                Recent Items
                <Button
                  size="small"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    minWidth: 'auto',
                  }}
                >
                  Clear All
                </Button>
              </ListSubheader>
              <MenuItem>Item 1</MenuItem>
              <MenuItem>Item 2</MenuItem>
            </MuiList>
          </Box>
        </Stack>
      </div>

      <FeaturesSection
        features={[
          { feature: "Interactive Menu Items", description: "Hover states (grey background), selected state with teal left border (3px) and light background, bold text for active items" },
          { feature: "Search & Subheaders", description: "Small TextField with search icon at top, uppercase subheaders (0.75rem, 600 weight, 32px line height) with optional action buttons" },
          { feature: "Complex Layouts", description: "Support for icons (20px, 32px minWidth), avatars (56px for profiles), dividers, destructive actions (red text), and secondary text alignment" },
          { feature: "Common Use Cases", description: "Dropdown menus, date range pickers, profile menus, sorting options, project switchers, context menus, navigation lists, settings panels, content filters" },
        ]}
      />
    </div>
  )
}

export default ListThemed

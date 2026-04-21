import {
  Box,
  Container,
  Typography,
  Breadcrumbs,
  Link as MuiLink,
  Stack,
  Button,
  IconButton,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material'
import Indicator from '../components/core/Indicator'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import AccessibilitySection from '../components/docs/AccessibilitySection'
import FeaturesSection from '../components/docs/FeaturesSection'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import FilterListIcon from '@mui/icons-material/FilterList'
import AddIcon from '@mui/icons-material/Add'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'

function PageHeaderPatternPage() {
  const [tabValue, setTabValue] = useState(0)
  const [anchorEl, setAnchorEl] = useState(null)

  return (
    <Container maxWidth={false} sx={{ maxWidth: 1200, mx: 'auto', px: 3, pt: 8, pb: 4 }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: 3 }}
      >
        <MuiLink component={Link} to="/ds-collection" underline="hover" color="inherit">
          DS Collection
        </MuiLink>
        <MuiLink component={Link} to="/patterns" underline="hover" color="inherit">
          Patterns
        </MuiLink>
        <Typography color="text.primary">Page Header</Typography>
      </Breadcrumbs>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          Page Header
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Consistent page header patterns combining title, breadcrumbs, actions, and tabs.
        </Typography>
      </Box>

      <Box sx={{ backgroundColor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 4 }}>
        <div className="themed-showcase">
          {/* Simple Header */}
          <div className="variant-section">
            <h4>Simple Header</h4>
            <p>Basic header with title and optional description.</p>
            <Stack spacing={4}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Title Only
                </Typography>
                <Box sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                  <Typography variant="h4" fontWeight={600}>
                    Dashboard
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Title + Description
                </Typography>
                <Box sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                  <Typography variant="h4" fontWeight={600} gutterBottom>
                    Analytics
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    View performance metrics and insights for your projects.
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </div>

          {/* Header with Breadcrumbs */}
          <div className="variant-section">
            <h4>With Breadcrumbs</h4>
            <p>Navigation context above the page title.</p>
            <Stack spacing={4}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Breadcrumbs Above Title
                </Typography>
                <Box sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                  <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    sx={{ mb: 2 }}
                  >
                    <MuiLink href="#" underline="hover" color="inherit" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <HomeOutlinedIcon fontSize="small" />
                      Home
                    </MuiLink>
                    <MuiLink href="#" underline="hover" color="inherit">
                      Projects
                    </MuiLink>
                    <Typography color="text.primary">Project Alpha</Typography>
                  </Breadcrumbs>
                  <Typography variant="h4" fontWeight={600}>
                    Project Alpha
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </div>

          {/* Header with Actions */}
          <div className="variant-section">
            <h4>With Actions</h4>
            <p>Primary and secondary action buttons aligned with the title.</p>
            <Stack spacing={4}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Title + Primary Action
                </Typography>
                <Box sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4" fontWeight={600}>
                      Users
                    </Typography>
                    <Button variant="contained" startIcon={<AddIcon />}>
                      Add User
                    </Button>
                  </Stack>
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Multiple Actions
                </Typography>
                <Box sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="h4" fontWeight={600} gutterBottom>
                        Reports
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Generate and download reports
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={1}>
                      <Button variant="outlined" startIcon={<FilterListIcon />}>
                        Filter
                      </Button>
                      <Button variant="contained" startIcon={<DownloadOutlinedIcon />}>
                        Export
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Actions with Overflow Menu
                </Typography>
                <Box sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4" fontWeight={600}>
                      Document
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Button variant="outlined" startIcon={<EditOutlinedIcon />}>
                        Edit
                      </Button>
                      <Button variant="outlined" startIcon={<ShareOutlinedIcon />}>
                        Share
                      </Button>
                      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                        <MoreHorizIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                      >
                        <MenuItem onClick={() => setAnchorEl(null)}>
                          <DownloadOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
                          Download
                        </MenuItem>
                        <MenuItem onClick={() => setAnchorEl(null)}>
                          <SettingsOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
                          Settings
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={() => setAnchorEl(null)} sx={{ color: 'error.main' }}>
                          <DeleteOutlineIcon fontSize="small" sx={{ mr: 1 }} />
                          Delete
                        </MenuItem>
                      </Menu>
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            </Stack>
          </div>

          {/* Header with Back Button */}
          <div className="variant-section">
            <h4>With Back Navigation</h4>
            <p>Detail page headers with back button for parent navigation.</p>
            <Stack spacing={4}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Back Button + Title
                </Typography>
                <Box sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <IconButton sx={{ border: '1px solid', borderColor: 'divider' }}>
                      <ArrowBackIcon />
                    </IconButton>
                    <Box>
                      <Typography variant="h5" fontWeight={600}>
                        Order #12345
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Placed on January 15, 2025
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Back + Title + Status + Actions
                </Typography>
                <Box sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Stack direction="row" spacing={2} alignItems="center">
                      <IconButton sx={{ border: '1px solid', borderColor: 'divider' }}>
                        <ArrowBackIcon />
                      </IconButton>
                      <Box>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                          <Typography variant="h5" fontWeight={600}>
                            Invoice INV-2025-001
                          </Typography>
                          <Indicator label="Paid" status="success" size="small" />
                        </Stack>
                        <Typography variant="body2" color="text.secondary">
                          Created Jan 10, 2025 - Due Jan 25, 2025
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Button variant="outlined">Download PDF</Button>
                      <Button variant="contained">Send Reminder</Button>
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            </Stack>
          </div>

          {/* Header with Tabs */}
          <div className="variant-section">
            <h4>With Tabs</h4>
            <p>Page sections navigated via tab bar below the header.</p>
            <Stack spacing={4}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Header + Tab Navigation
                </Typography>
                <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
                  <Box sx={{ p: 3, pb: 0 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                      <Box>
                        <Typography variant="h4" fontWeight={600}>
                          Settings
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Manage your account preferences and configurations
                        </Typography>
                      </Box>
                      <Button variant="contained">Save Changes</Button>
                    </Stack>
                    <Tabs
                      value={tabValue}
                      onChange={(e, v) => setTabValue(v)}
                      sx={{ borderBottom: 1, borderColor: 'divider', mx: -3 }}
                    >
                      <Tab label="General" sx={{ ml: 3 }} />
                      <Tab label="Security" />
                      <Tab label="Notifications" />
                      <Tab label="Integrations" />
                    </Tabs>
                  </Box>
                  <Box sx={{ p: 3, backgroundColor: 'grey.50', minHeight: 100 }}>
                    <Typography variant="body2" color="text.secondary">
                      Tab content area for "{['General', 'Security', 'Notifications', 'Integrations'][tabValue]}" settings
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Stack>
          </div>

          {/* Header with Metadata */}
          <div className="variant-section">
            <h4>With Metadata</h4>
            <p>Additional context like status, timestamps, or tags.</p>
            <Stack spacing={4}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Title + Metadata Row
                </Typography>
                <Box sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                        <Typography variant="h4" fontWeight={600}>
                          Marketing Campaign
                        </Typography>
                        <Indicator label="Active" status="active" size="small" />
                      </Stack>
                      <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                        <Typography variant="body2" color="text.secondary">
                          Created by Jane Doe
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Last modified 2 hours ago
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          3 collaborators
                        </Typography>
                      </Stack>
                    </Box>
                    <Stack direction="row" spacing={1}>
                      <Button variant="outlined">Edit</Button>
                      <Button variant="contained">Publish</Button>
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            </Stack>
          </div>

          <FeaturesSection
            features={[
              { feature: "Hierarchy", description: "Breadcrumbs > Title > Description > Actions from top to bottom" },
              { feature: "Title + Actions Row", description: "Title left-aligned, primary/secondary actions right-aligned" },
              { feature: "Back Navigation", description: "IconButton with ArrowBackIcon for detail page navigation" },
              { feature: "Status Chips", description: "Inline Chip components to show item status (Active, Draft, Paid)" },
              { feature: "Tab Integration", description: "Tabs component below header for sectioned pages" },
            ]}
          />
        </div>

        <AccessibilitySection
          wcag={[
            { id: "1.3.1", name: "Info and Relationships", level: "A", note: "Use h1-h6 heading hierarchy for titles" },
            { id: "2.4.2", name: "Page Titled", level: "A", note: "Page title matches document title" },
            { id: "2.4.8", name: "Location", level: "AAA", note: "Breadcrumbs show user's position in site" },
            { id: "2.4.4", name: "Link Purpose", level: "A", note: "Action buttons have clear, descriptive labels" },
          ]}
        />
      </Box>
    </Container>
  )
}

export default PageHeaderPatternPage

import { useState } from 'react'
import {
  Box,
  Stack,
  Typography,
  Drawer,
  Button,
  IconButton,
  Divider,
  TextField,
  InputAdornment,
  Paper,
  Chip,
  Tab,
  Tabs,
  Alert,
} from '@mui/material'
import FeaturesSection from '../docs/FeaturesSection'
import CloseIcon from '@mui/icons-material/CloseRounded'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import GroupIcon from '@mui/icons-material/GroupRounded'
import AddIcon from '@mui/icons-material/AddRounded'
import DeleteIcon from '@mui/icons-material/DeleteRounded'
import EditIcon from '@mui/icons-material/EditRounded'

function DrawerThemed() {
  const [openManageGroups, setOpenManageGroups] = useState(false)
  const [openWithTabs, setOpenWithTabs] = useState(false)
  const [openWithAlert, setOpenWithAlert] = useState(false)
  const [tabValue, setTabValue] = useState(0)

  const mockGroups = [
    { name: 'APAC', users: 7 },
    { name: 'EMEA', users: 7 },
    { name: 'Engineering', users: 5 },
    { name: 'North America', users: 4 },
    { name: 'Product', users: 5 },
  ]

  return (
    <div className="themed-showcase">
      {/* Side Panel Example (Manage Groups Pattern) */}
      <div className="variant-section">
        <h4>Side Panel (Right Anchor)</h4>
        <p>Full side panel pattern with stats, form, and list with actions.</p>
        <Stack spacing={2}>
          <Button variant="contained" onClick={() => setOpenManageGroups(true)}>
            Open Manage Groups Panel
          </Button>

          <Drawer
            anchor="right"
            open={openManageGroups}
            onClose={() => setOpenManageGroups(false)}
          >
            <Box sx={{ width: 400, height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* Header */}
              <Box sx={{ p: 3, pb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Manage Groups
                    </Typography>
                    <IconButton size="small">
                      <InfoOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <IconButton size="small" onClick={() => setOpenManageGroups(false)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>

              {/* Content Area */}
              <Box sx={{ flex: 1, overflowY: 'auto', px: 3 }}>
                {/* Stats Cards */}
                <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                  <Paper elevation={2} sx={{ flex: 1, p: 2, textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ fontWeight: 600, mb: 0.5 }}>
                      50
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Groups
                    </Typography>
                  </Paper>
                  <Paper elevation={2} sx={{ flex: 1, p: 2, textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ fontWeight: 600, mb: 0.5 }}>
                      14
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Users Assigned
                    </Typography>
                  </Paper>
                </Stack>

                <Divider sx={{ mb: 3 }} />

                {/* Create New Group */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                    Create New Group
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Group Name"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton size="small" disabled>
                            <AddIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                    Press enter or click the plus to create
                  </Typography>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* All Groups List */}
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                    All Groups (50)
                  </Typography>
                  <Stack spacing={1.5}>
                    {mockGroups.map((group, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          p: 1.5,
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 1,
                          '&:hover': {
                            backgroundColor: 'action.hover',
                          },
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
                          <GroupIcon sx={{ color: 'text.secondary' }} />
                          <Chip
                            label={group.name}
                            variant="outlined"
                            size="small"
                            sx={{
                              backgroundColor: 'grey.100',
                              borderColor: 'grey.400',
                            }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {group.users} Users
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <IconButton size="small">
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" color="error">
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Drawer>
        </Stack>
      </div>

      {/* Header Variants */}
      <div className="variant-section">
        <h4>Header Variants</h4>
        <p>Tabs and alerts within drawer headers.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="outlined" onClick={() => setOpenWithTabs(true)}>
              With Tabs
            </Button>
            <Button variant="outlined" onClick={() => setOpenWithAlert(true)}>
              With Alert
            </Button>

            {/* Drawer With Tabs */}
            <Drawer
              anchor="right"
              open={openWithTabs}
              onClose={() => setOpenWithTabs(false)}
            >
              <Box sx={{ width: 400, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ p: 3, pb: 0 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      With Tabs
                    </Typography>
                    <IconButton size="small" onClick={() => setOpenWithTabs(false)}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ px: 3, borderBottom: 1, borderColor: 'divider' }}>
                  <Tab label="Tab 1" />
                  <Tab label="Tab 2" />
                  <Tab label="Tab 3" />
                </Tabs>
                <Box sx={{ p: 3, flex: 1, overflowY: 'auto' }}>
                  <Typography variant="body2" color="text.secondary">
                    Tab {tabValue + 1} content area with navigation.
                  </Typography>
                </Box>
              </Box>
            </Drawer>

            {/* Drawer With Alert */}
            <Drawer
              anchor="right"
              open={openWithAlert}
              onClose={() => setOpenWithAlert(false)}
            >
              <Box sx={{ width: 400, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ p: 3, pb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      With An Alert
                    </Typography>
                    <IconButton size="small" onClick={() => setOpenWithAlert(false)}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Box sx={{ px: 3, flex: 1, overflowY: 'auto' }}>
                  <Alert severity="info" sx={{ mb: 3 }}>
                    Write accurate and concise description of the info you want a user to take away and clarify any concepts, tasks, or details.
                  </Alert>
                  <Typography variant="body2" color="text.secondary">
                    Content area below the alert.
                  </Typography>
                </Box>
              </Box>
            </Drawer>
          </Box>
        </Stack>
      </div>

      <FeaturesSection
        features={[
          { feature: "Drawer Variants", description: "Temporary (overlay with backdrop), Persistent (pushes content), Permanent (always visible). Anchors: Left, Right, Top, Bottom" },
          { feature: "Widths & Layout", description: "Common widths: 240px (navigation), 320px (compact), 400px (detail). Flex layout with overflowY auto for scrollable content" },
          { feature: "Pattern Elements", description: "Header (title + close), stats cards, forms, lists with actions, dividers. Elevation 16 for temporary drawer" },
          { feature: "Common Use Cases", description: "Manage panels, filters, detail views, forms, settings, bulk actions. Focus trap, ARIA role='dialog', keyboard navigation (ESC to close)" },
        ]}
      />
    </div>
  )
}

export default DrawerThemed

import { useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined'
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined'
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined'
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined'
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined'
import DummySidebar from '../components/layout/DummySidebar'

function DrawerTestPage({ chatOpen = false }) {
  const [activeDrawer, setActiveDrawer] = useState(null)
  const [drilldownOpen, setDrilldownOpen] = useState(false)
  const [drilldownTitle, setDrilldownTitle] = useState('')
  const [drilldownParent, setDrilldownParent] = useState(null) // eslint-disable-line no-unused-vars

  const handleToggleDrawer = (drawerId) => {
    if (activeDrawer === drawerId && !drilldownOpen) {
      setActiveDrawer(null)
    } else {
      setActiveDrawer(drawerId)
      setDrilldownOpen(false)
    }
  }

  const handleCloseDrawer = () => {
    setActiveDrawer(null)
    setDrilldownOpen(false)
  }

  const handleDrillIn = (title, parentDrawer) => {
    setDrilldownTitle(title)
    setDrilldownParent(parentDrawer)
    setDrilldownOpen(true)
  }

  const handleDrillBack = () => {
    setDrilldownOpen(false)
  }

  // Quick Access cards
  const quickAccess = [
    { title: 'Over Chrome', icon: <LayersOutlinedIcon sx={{ fontSize: 20 }} />, drawerId: 'over-chrome' },
    { title: 'Under Chrome', icon: <ViewSidebarOutlinedIcon sx={{ fontSize: 20 }} />, drawerId: 'under-chrome' },
    { title: 'Drill-in Over', icon: <AccountTreeOutlinedIcon sx={{ fontSize: 20 }} />, drawerId: 'drill-over' },
    { title: 'Drill-in Under', icon: <AccountTreeOutlinedIcon sx={{ fontSize: 20 }} />, drawerId: 'drill-under' },
    { title: 'Drawer A', icon: <SwapHorizOutlinedIcon sx={{ fontSize: 20 }} />, drawerId: 'drawer-a' },
    { title: 'Drawer B', icon: <SwapHorizOutlinedIcon sx={{ fontSize: 20 }} />, drawerId: 'drawer-b' },
  ]

  // Reference items
  const referenceItems = [
    { title: 'Over Chrome', description: 'Drawer covers the entire viewport including header (z-index higher than header)' },
    { title: 'Under Chrome', description: 'Drawer appears below the header, respects app chrome' },
    { title: 'Mira Companion', description: 'Fixed 400px panel on right, independent of drawers' },
    { title: 'Mutual Exclusivity', description: 'Only one drawer open at a time, companion persists' },
    { title: 'Drill-in', description: 'Click list items in drawer to navigate deeper, back button returns' },
  ]

  return (
    <Box sx={{ width: '100%' }}>
      {/* Main Content */}
      <Box
        sx={{
          backgroundColor: 'grey.100',
          minHeight: 'calc(100vh - 200px)',
          px: 3,
          py: 4,
        }}
      >
        <Box
          sx={{
            maxWidth: 1536,
            mx: 'auto',
          }}
        >
          {/* Page Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
              Drawer / Sidebar Test
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Test drawer and sidebar behavior with the AI companion panel
            </Typography>
          </Box>

          {/* Module 1 - Quick Access (Drawer Triggers) */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Open Drawers
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' },
                gap: 2,
              }}
            >
              {quickAccess.map((item) => (
                <Card
                  key={item.drawerId}
                  onClick={() => handleToggleDrawer(item.drawerId)}
                  sx={{
                    backgroundColor: activeDrawer === item.drawerId ? 'primary.light' : 'background.paper',
                    border: '1px solid',
                    borderColor: activeDrawer === item.drawerId ? 'primary.main' : 'divider',
                    boxShadow: 'none',
                    cursor: 'pointer',
                    '&:hover': { borderColor: 'primary.main' },
                  }}
                >
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 }, textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        backgroundColor: activeDrawer === item.drawerId ? 'primary.main' : 'primary.light',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: activeDrawer === item.drawerId ? 'primary.contrastText' : 'primary.dark',
                        mx: 'auto',
                        mb: 1,
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {item.title}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>

          {/* Module 2 - Quick Reference */}
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Quick Reference
            </Typography>
            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'grey.100' }}>
                    <TableCell sx={{ fontWeight: 600 }}>Term</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {referenceItems.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell sx={{ fontWeight: 500 }}>{item.title}</TableCell>
                      <TableCell sx={{ color: 'text.secondary' }}>{item.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>

      {/* Drawers */}
      <DummySidebar
        open={activeDrawer === 'over-chrome'}
        onClose={handleCloseDrawer}
        chatOpen={chatOpen}
        variant="sidebar1"
        title="Over Chrome Drawer"
        underChrome={false}
        animationMode="hybrid"
      />

      <DummySidebar
        open={activeDrawer === 'under-chrome'}
        onClose={handleCloseDrawer}
        chatOpen={chatOpen}
        variant="sidebar1"
        title="Under Chrome Drawer"
        underChrome={true}
        animationMode="hybrid"
      />

      <DummySidebar
        open={activeDrawer === 'drill-over' && !drilldownOpen}
        onClose={handleCloseDrawer}
        chatOpen={chatOpen}
        variant="sidebar1"
        title="Drill-in Drawer"
        underChrome={false}
        animationMode="hybrid"
        onDrillIn={(title) => handleDrillIn(title, 'drill-over')}
      />

      <DummySidebar
        open={activeDrawer === 'drill-over' && drilldownOpen}
        onClose={handleCloseDrawer}
        chatOpen={chatOpen}
        variant="sidebar2"
        title={drilldownTitle}
        underChrome={false}
        animationMode="hybrid"
        showBackButton={true}
        onBack={handleDrillBack}
      />

      <DummySidebar
        open={activeDrawer === 'drill-under' && !drilldownOpen}
        onClose={handleCloseDrawer}
        chatOpen={chatOpen}
        variant="sidebar1"
        title="Drill-in Drawer"
        underChrome={true}
        animationMode="hybrid"
        onDrillIn={(title) => handleDrillIn(title, 'drill-under')}
      />

      <DummySidebar
        open={activeDrawer === 'drill-under' && drilldownOpen}
        onClose={handleCloseDrawer}
        chatOpen={chatOpen}
        variant="sidebar2"
        title={drilldownTitle}
        underChrome={true}
        animationMode="hybrid"
        showBackButton={true}
        onBack={handleDrillBack}
      />

      <DummySidebar
        open={activeDrawer === 'drawer-a'}
        onClose={handleCloseDrawer}
        chatOpen={chatOpen}
        variant="sidebar1"
        title="Drawer A"
        underChrome={true}
        animationMode="hybrid"
        onDrillIn={(title) => handleDrillIn(title, 'drawer-a')}
      />

      <DummySidebar
        open={activeDrawer === 'drawer-a' && drilldownOpen}
        onClose={handleCloseDrawer}
        chatOpen={chatOpen}
        variant="sidebar2"
        title={drilldownTitle}
        underChrome={true}
        animationMode="hybrid"
        showBackButton={true}
        onBack={handleDrillBack}
      />

      <DummySidebar
        open={activeDrawer === 'drawer-b'}
        onClose={handleCloseDrawer}
        chatOpen={chatOpen}
        variant="sidebar2"
        title="Drawer B"
        underChrome={true}
        animationMode="hybrid"
      />
    </Box>
  )
}

export default DrawerTestPage

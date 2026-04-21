import { useState, useEffect, useLayoutEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { useLocation } from 'react-router-dom'

import IntercomWidget from './components/core/IntercomWidget'
import Sidebar from './components/core/Sidebar'
import AppHeader from './components/core/AppHeader'
import MiraCompanion from './components/mira/MiraCompanion'
import { allRoutes } from './config/routesConfig'

// ScrollToTop component - resets scroll position on route change
function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    const mainContent = document.querySelector('[data-main-content]')
    if (mainContent) {
      mainContent.scrollTop = 0
    }
  }, [pathname])

  return null
}

// Route renderer component
function RouteElement({ route, chatOpen, colorblindType }) {
  const Component = route.element

  // Build props based on what the route needs
  const props = {}
  if (route.props?.includes('chatOpen')) props.chatOpen = chatOpen
  if (route.props?.includes('colorblindType')) props.colorblindType = colorblindType

  // Spread any extra props defined on the route
  if (route.extraProps) Object.assign(props, route.extraProps)

  const element = <Component {...props} />

  // Wrap if needed
  if (route.wrapper) {
    return route.wrapper(element)
  }

  return element
}

function AppContent() {
  const theme = useTheme()
  const location = useLocation()
  const isXs = useMediaQuery(theme.breakpoints.down('sm'))
  const isLg = useMediaQuery(theme.breakpoints.up('lg'))
  const [chatOpen, setChatOpen] = useState(false)

  // Colorblind palette state management (light mode only)
  const [colorblindType, setColorblindType] = useState(() => {
    return localStorage.getItem('colorblindType') || 'none'
  })

  // Save palette preferences to localStorage
  useEffect(() => {
    localStorage.setItem('colorblindType', colorblindType)
  }, [colorblindType])

  const handlePaletteChange = (newColorblindType) => {
    setColorblindType(newColorblindType)
    window.dispatchEvent(new CustomEvent('paletteChange', {
      detail: { colorblindType: newColorblindType }
    }))
  }

  // Determine parent context based on route
  const getParentName = () => {
    if (location.pathname === '/mw-home') return 'Home'
    if (location.pathname.startsWith('/seats-v10')) return 'Account'
    if (location.pathname.startsWith('/account')) return 'Account'
    if (location.pathname.includes('api-tokens')) return 'Account'
    if (location.pathname.startsWith('/studio')) return 'Studio'
    if (location.pathname.startsWith('/mw-newsletters')) return ''
    if (location.pathname.startsWith('/mw-alerts')) return ''
    if (location.pathname.startsWith('/mw-monitor')) return ''

    return 'App'
  }

  // Determine page name based on route
  const getPageName = () => {
    if (location.pathname === '/') return 'Home'
    if (location.pathname === '/automation') return 'Automation'
    if (location.pathname === '/layout-demo') return 'Layout Demo'
    if (location.pathname === '/drawer-test') return 'Drawer Test'
    if (location.pathname === '/studio') return 'Studio'
    if (location.pathname === '/ds-collection') return 'DS Collection'
    if (location.pathname === '/history') return 'History'
    if (location.pathname === '/templates') return 'Templates'
    if (location.pathname.startsWith('/templates/')) return 'Templates'
    if (location.pathname === '/studio/projects' && !location.pathname.includes('/studio/projects/')) return 'Manage Projects'
    if (location.pathname.includes('/studio/projects/')) return 'Project Details'
    if (location.pathname.includes('api-tokens')) return 'Usage Data'
    if (location.pathname.includes('users')) return 'Users'
    if (location.pathname === '/genai-lens') return 'GenAI Lens'
    if (location.pathname === '/seats-v2') return 'Seats V2'
    if (location.pathname === '/seats-v3') return 'Seats V3'
    if (location.pathname === '/seats-v4') return 'Seats V4'
    if (location.pathname === '/seats-v5') return 'Seats V5'
    if (location.pathname.startsWith('/seats-v10')) return 'Users'
    if (location.pathname.includes('seats')) return 'Seats & Permissions'
    if (location.pathname.startsWith('/guidelines')) return 'Guidelines'
    if (location.pathname === '/mw-home') return ''
    if (location.pathname.startsWith('/mw-newsletters')) return 'Newsletters'
    if (location.pathname.includes('/mw-newsletters/editor')) return ''
    if (location.pathname.startsWith('/mw-alerts')) return 'Alerts'
    if (location.pathname === '/mw-monitor') return 'Monitor'
    if (location.pathname.startsWith('/mw-monitor/views')) return 'Monitor'
    if (location.pathname === '/mw-monitor/trends') return 'Trends Center'
    return 'Page'
  }

  const handleChatToggle = () => {
    setChatOpen(!chatOpen)
  }

  // Full-screen routes bypass the main AppHeader + Sidebar
  if (location.pathname.startsWith('/genai-lens-v2')) {
    return (
      <Box sx={{ height: '100vh', overflow: 'hidden' }}>
        <ScrollToTop />
        <Routes>
          {allRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<RouteElement route={route} chatOpen={false} colorblindType="none" />}
            />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <AppHeader
        pageName={getPageName()}
        parentName={getParentName()}
        chatOpen={chatOpen}
        onChatToggle={handleChatToggle}
      />

      {/* Spacer for Fixed Header */}
      <Box sx={{ height: { xs: 56, sm: 64 } }} />

      {/* Content Area */}
      <Box sx={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>
        {/* Sidebar */}
        {!isXs && (
          <Sidebar
            colorblindType={colorblindType}
            onPaletteChange={handlePaletteChange}
          />
        )}

        {/* Main Content */}
        <Box
          data-main-content
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            overflow: 'auto',
            mr: { xs: 0, sm: 0, md: 0, lg: chatOpen ? '400px' : 0 },
            transition: 'margin-right 0.3s ease',
          }}
        >
          <ScrollToTop />
          <Routes>
            {allRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <RouteElement
                    route={route}
                    chatOpen={chatOpen}
                    colorblindType={colorblindType}
                  />
                }
              />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
      </Box>

      {/* Backdrop for overlay mode */}
      {chatOpen && !isLg && (
        <Box
          onClick={handleChatToggle}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1299,
          }}
        />
      )}

      {/* AI Chat Panel */}
      <MiraCompanion open={chatOpen} onClose={handleChatToggle} />

      {!chatOpen && <IntercomWidget />}
    </Box>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App

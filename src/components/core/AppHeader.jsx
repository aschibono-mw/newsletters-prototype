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
  Button,
  Switch,
} from '@mui/material'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import BoltIcon from '@mui/icons-material/Bolt'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined'
import XIcon from '@mui/icons-material/X'
import ApartmentIcon from '@mui/icons-material/Apartment'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined'

// ── Notification dropdown data ──────────────────────────────────────────────────
const TEAL = '#00827F'
const TEAL_LIGHT = 'rgba(0,130,127,0.10)'
const PURPLE = '#B627A1'
const PURPLE_LIGHT = 'rgba(182,39,161,0.10)'
// Meltwater aqua — brighter than brand teal, used for the badge gradient
const MW_AQUA = '#00B4AF'

const ALERTS_DATA = [
  { id: 1, type: 'Spike Detection',  title: 'Unusual spike detected',             desc: '847 mentions in the last hour vs. 120 average',                   tracker: 'The Morning News Update', time: '2m ago',  Icon: BoltIcon,                unread: true  },
  { id: 2, type: 'Sentiment Shift',  title: 'Sentiment shifted to positive',      desc: 'Overall sentiment changed from neutral to positive (78%)',         tracker: 'The Morning News Update', time: '15m ago', Icon: TrendingUpIcon,          unread: true  },
  { id: 3, type: 'Top Reach',        title: 'Wall Street Journal mention',        desc: 'Major coverage in WSJ with estimated reach of 2.4M',              tracker: 'ESG & Regulatory',        time: '32m ago', Icon: CampaignOutlinedIcon,    unread: true  },
  { id: 4, type: 'X Influencer',     title: '@TechAnalyst posted about your search', desc: 'High-influence account (1.2M followers) mentioned your brand', tracker: 'Competitor Watch',        time: '1h ago',  Icon: XIcon,                   unread: false },
  { id: 5, type: 'Company Events',   title: 'Acquisition announced',              desc: 'Acme Corp announced acquisition of TechStartup Inc.',             tracker: 'Competitor Watch',        time: '2h ago',  Icon: ApartmentIcon,           unread: false },
  { id: 6, type: 'Breakout Post',    title: 'Breakout post detected',             desc: 'Facebook post reached 45K engagements vs. 2K weekly average',    tracker: 'Executive Monitoring',    time: '3h ago',  Icon: LocalFireDepartmentIcon, unread: false },
]

const NOTIFS_DATA = [
  { id: 1, type: 'Export Complete',  title: 'Export complete',              desc: 'Your "Q4 Brand Report" PDF export is ready to download.',              action: 'Download',    time: '5m ago',  Icon: FileDownloadOutlinedIcon, unread: true  },
  { id: 2, type: 'Shared With You',  title: 'Dashboard shared with you',   desc: 'Sarah Johnson shared "Competitor Analysis 2025" with you.',            action: 'View',        time: '1h ago',  Icon: ShareOutlinedIcon,       unread: true  },
  { id: 3, type: 'New Feature',      title: 'New: AI-powered summaries',   desc: 'Generate instant summaries of your searches with our new AI feature.', action: 'Try it',      time: '3h ago',  Icon: AutoAwesomeIcon,         unread: true  },
  { id: 4, type: 'Report Ready',     title: 'Weekly report generated',     desc: 'Your scheduled "Brand Health Weekly" report is ready.',                 action: 'View report', time: '6h ago',  Icon: DescriptionOutlinedIcon, unread: false },
  { id: 5, type: 'Limit Warning',    title: 'Approaching search limit',    desc: "You've used 85% of your monthly search quota.",                         action: 'Upgrade',     time: '1d ago',  Icon: WarningAmberIcon,        unread: false },
  { id: 6, type: 'Team Invite',      title: 'Team invitation',             desc: 'Michael Chen invited you to join the "PR Team" workspace.',             action: null,          time: '1d ago',  Icon: PersonAddOutlinedIcon,   unread: false },
]

// ── Notification Dropdown ───────────────────────────────────────────────────────
function NotificationDropdown({ anchorEl, onClose, onViewAll }) {
  const [tab, setTab] = useState('alerts')
  const [alerts, setAlerts] = useState(ALERTS_DATA)
  const [notifs, setNotifs] = useState(NOTIFS_DATA)

  const unreadAlerts = alerts.filter(a => a.unread).length
  const unreadNotifs = notifs.filter(n => n.unread).length

  const markAllRead = () => {
    if (tab === 'alerts') setAlerts(a => a.map(x => ({ ...x, unread: false })))
    else setNotifs(n => n.map(x => ({ ...x, unread: false })))
  }

  const items = tab === 'alerts' ? alerts : notifs
  const accent = tab === 'alerts' ? TEAL : PURPLE
  const accentLight = tab === 'alerts' ? TEAL_LIGHT : PURPLE_LIGHT
  const accentBg = tab === 'alerts' ? 'rgba(0,130,127,0.04)' : 'rgba(182,39,161,0.04)'

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{ sx: { width: 400, borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.14)', mt: 0.5, display: 'flex', flexDirection: 'column', overflow: 'hidden' } }}
    >
      {/* Tabs */}
      <Box sx={{ display: 'flex', borderBottom: '1px solid', borderColor: 'divider' }}>
        {[{ key: 'alerts', label: 'Alerts', count: unreadAlerts }, { key: 'notifs', label: 'Notifications', count: unreadNotifs }].map(t => {
          const tabAccent = t.key === 'alerts' ? TEAL : PURPLE
          const isActive = tab === t.key
          return (
            <Box
              key={t.key}
              onClick={() => setTab(t.key)}
              sx={{
                flex: 1, py: 1.25, px: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.75,
                cursor: 'pointer', borderBottom: `2px solid ${isActive ? tabAccent : 'transparent'}`,
                color: isActive ? tabAccent : 'text.secondary',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.03)' },
              }}
            >
              <Typography sx={{ fontSize: '13px', fontWeight: isActive ? 700 : 500 }}>{t.label}</Typography>
              {t.count > 0 && (
                <Box sx={{ bgcolor: isActive ? tabAccent : 'rgba(0,0,0,0.12)', borderRadius: '10px', px: 0.75, minWidth: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography sx={{ fontSize: '10px', fontWeight: 700, color: isActive ? '#fff' : 'text.secondary' }}>{t.count}</Typography>
                </Box>
              )}
            </Box>
          )
        })}
      </Box>

      {/* Feed */}
      <Box sx={{ maxHeight: 420, overflowY: 'auto' }}>
        {items.map((item, i) => {
          const { Icon } = item
          return (
            <Box
              key={item.id}
              sx={{
                px: 2, py: 1.5, display: 'flex', gap: 1.5, alignItems: 'flex-start',
                bgcolor: item.unread ? accentBg : 'transparent',
                borderBottom: i < items.length - 1 ? '1px solid' : 'none',
                borderColor: 'divider',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.03)' },
              }}
            >
              <Box sx={{ width: 34, height: 34, borderRadius: '50%', bgcolor: item.unread ? accentLight : 'rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, mt: 0.25 }}>
                <Icon sx={{ fontSize: 16, color: item.unread ? accent : 'text.secondary' }} />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.25 }}>
                  <Typography sx={{ fontSize: '11px', fontWeight: 700, color: item.unread ? accent : 'text.disabled' }}>{item.type}</Typography>
                  <Typography sx={{ fontSize: '10px', color: 'text.disabled', flexShrink: 0, ml: 1 }}>{item.time}</Typography>
                </Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, lineHeight: 1.3, mb: 0.25 }}>{item.title}</Typography>
                <Typography sx={{ fontSize: '11px', color: 'text.secondary', lineHeight: 1.4 }}>{item.desc}</Typography>
                {item.tracker && (
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                    <Box component="svg" viewBox="0 0 20 20" sx={{ width: 10, height: 10, flexShrink: 0, color: 'text.disabled' }} fill="none">
                      <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="10" cy="10" r="1.75" fill="currentColor" />
                      <line x1="10" y1="1.5" x2="10" y2="4"    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <line x1="10" y1="16"  x2="10" y2="18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <line x1="1.5" y1="10" x2="4"   y2="10"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <line x1="16"  y1="10" x2="18.5" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </Box>
                    <Typography sx={{ fontSize: '10px', color: 'text.disabled' }}>{item.tracker}</Typography>
                  </Box>
                )}
                {item.action && (
                  <Typography sx={{ fontSize: '11px', fontWeight: 600, color: accent, mt: 0.5, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                    {item.action}
                  </Typography>
                )}
              </Box>
              {item.unread && <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: accent, flexShrink: 0, mt: 1 }} />}
            </Box>
          )
        })}
      </Box>

      {/* Footer */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderTop: '1px solid', borderColor: 'divider', px: 2, py: 1.75, gap: 0 }}>
        {[
          { label: 'View all', onClick: () => { onClose(); onViewAll(tab === 'alerts' ? '/mw-alerts' : '/mw-notifications') } },
          { label: 'Mark all as read', onClick: markAllRead },
          { label: tab === 'alerts' ? 'Manage alerts' : 'Manage notifications', onClick: () => { onClose(); onViewAll(tab === 'alerts' ? '/mw-alerts' : '/mw-notifications') } },
        ].map((link, i, arr) => (
          <Box key={link.label} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              onClick={link.onClick}
              sx={{ fontSize: '13px', color: 'text.secondary', cursor: 'pointer', px: 2, '&:hover': { color: 'text.primary', textDecoration: 'underline' } }}
            >
              {link.label}
            </Typography>
            {i < arr.length - 1 && (
              <Box sx={{ width: '1px', height: 14, bgcolor: 'divider' }} />
            )}
          </Box>
        ))}
      </Box>
    </Popover>
  )
}
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
  const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchExpanded, setSearchExpanded] = useState(false)
  const [appsAnchorEl, setAppsAnchorEl] = useState(null)
  const [notifAnchorEl, setNotifAnchorEl] = useState(null)

  const unreadAlertCount = ALERTS_DATA.filter(a => a.unread).length
  const unreadNotifCount = NOTIFS_DATA.filter(n => n.unread).length
  const totalUnread = unreadAlertCount + unreadNotifCount
  // Smooth gradient — midpoint shifts based on alerts-to-notifications ratio
  const tealPct = totalUnread > 0 ? Math.round((unreadAlertCount / totalUnread) * 100) : 50
  const badgeGradient = `linear-gradient(135deg, ${MW_AQUA} 0%, ${tealPct}%, ${PURPLE} 100%)`
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
                    {parentName} <span style={{ fontWeight: 800 }}>{pageName}</span>
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
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <IconButton
                onClick={e => setNotifAnchorEl(e.currentTarget)}
                sx={{
                  color: Boolean(notifAnchorEl) ? TEAL : 'text.secondary',
                  border: '1px solid',
                  borderColor: Boolean(notifAnchorEl) ? TEAL : 'divider',
                  borderRadius: '50%',
                  width: 36,
                  height: 36,
                }}
              >
                <NotificationsOutlinedIcon fontSize="small" />
              </IconButton>
              {totalUnread > 0 && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: -7,
                    right: -7,
                    minWidth: 20,
                    height: 20,
                    borderRadius: '10px',
                    background: badgeGradient,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 700,
                    lineHeight: 1,
                    px: '4px',
                    pt: '1px',
                    boxShadow: '0 0 0 2.5px #fff',
                    pointerEvents: 'none',
                    zIndex: 1,
                  }}
                >
                  {totalUnread}
                </Box>
              )}
            </Box>
            <NotificationDropdown
              anchorEl={notifAnchorEl}
              onClose={() => setNotifAnchorEl(null)}
              onViewAll={(path) => { navigate(path) }}
            />

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

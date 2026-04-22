import { useState } from 'react';
import {
  Box, Chip, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText,
  IconButton, Tooltip, Collapse, Popover, Typography, Fab,
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import TokenOutlinedIcon from '@mui/icons-material/TokenOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import ViewQuiltOutlinedIcon from '@mui/icons-material/ViewQuiltOutlined';
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TimelineIcon from '@mui/icons-material/Timeline';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import WorkspacesOutlinedIcon from '@mui/icons-material/WorkspacesOutlined';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import EventSeatOutlinedIcon from '@mui/icons-material/EventSeatOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PushPinIcon from '@mui/icons-material/PushPin';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';

import { NAV_ITEMS } from '../../config/navigationConfig';

// ── Constants ──────────────────────────────────────────────────────────────────
export const SIDEBAR_WIDTH = 216;
const COLLAPSED_WIDTH = 72;

// ── Icon map ───────────────────────────────────────────────────────────────────
const ICON_MAP = {
  ViewListOutlined:         ViewListOutlinedIcon,
  TokenOutlined:            TokenOutlinedIcon,
  GroupOutlined:            GroupOutlinedIcon,
  BadgeOutlined:            BadgeOutlinedIcon,
  ViewQuiltOutlined:        ViewQuiltOutlinedIcon,
  ViewSidebarOutlined:      ViewSidebarOutlinedIcon,
  SmartToyOutlined:         SmartToyOutlinedIcon,
  Timeline:                 TimelineIcon,
  DashboardCustomizeOutlined: DashboardCustomizeOutlinedIcon,
  BrushOutlined:            BrushOutlinedIcon,
  InsightsOutlined:         InsightsOutlinedIcon,
  ExploreOutlined:          ExploreOutlinedIcon,
  WorkspacesOutlined:       WorkspacesOutlinedIcon,
  HubOutlined:              HubOutlinedIcon,
  PersonSearchOutlined:     PersonSearchOutlinedIcon,
  TextSnippetOutlined:      TextSnippetOutlinedIcon,
  AutoGraphOutlined:        AutoGraphOutlinedIcon,
  RocketLaunchOutlined:     RocketLaunchOutlinedIcon,
  CodeOutlined:             CodeOutlinedIcon,
  TuneOutlined:             TuneOutlinedIcon,
  MenuBookOutlined:         MenuBookOutlinedIcon,
  AutoAwesomeOutlined:      AutoAwesomeOutlinedIcon,
  EventSeatOutlined:        EventSeatOutlinedIcon,
  NewspaperOutlined:        NewspaperOutlinedIcon,
  ManageAccountsOutlined:   ManageAccountsOutlinedIcon,
  HomeOutlined:             HomeOutlinedIcon,
  NotificationsOutlined:    NotificationsOutlinedIcon,
  ShowChartOutlined:        ShowChartOutlinedIcon,
  BarChartOutlined:         BarChartOutlinedIcon,
  DescriptionOutlined:      DescriptionOutlinedIcon,
  NotificationsNoneOutlined: NotificationsNoneOutlinedIcon,
  PersonOutlined:           PersonOutlinedIcon,
  SettingsOutlined:         SettingsOutlinedIcon,
  FolderOutlined:           FolderOutlinedIcon,
};

// Custom Tracker icon — crosshair/target
function TrackerIcon() {
  return (
    <Box
      component="svg"
      viewBox="0 0 20 20"
      sx={{ width: 20, height: 20, display: 'block', flexShrink: 0 }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer ring */}
      <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.5" />
      {/* Center dot */}
      <circle cx="10" cy="10" r="1.75" fill="currentColor" />
      {/* Tick marks */}
      <line x1="10" y1="1.5" x2="10" y2="4"   stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="10" y1="16"  x2="10" y2="18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="1.5" y1="10" x2="4"   y2="10"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16"  y1="10" x2="18.5" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Box>
  )
}

// Custom Mira Studio icon — circular gradient badge with MW mark
function MiraStudioIcon() {
  return (
    <Box
      sx={{
        width: 20,
        height: 20,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #6B2FA0 0%, #00827F 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Typography sx={{ fontSize: '7px', fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.5px' }}>
        {'<>'}
      </Typography>
    </Box>
  );
}

const renderIcon = (iconName) => {
  if (iconName === 'MiraStudio') return <MiraStudioIcon />;
  if (iconName === 'Tracker') return <TrackerIcon />;
  const Icon = ICON_MAP[iconName];
  return Icon ? <Icon sx={{ fontSize: 20 }} /> : null;
};

// ── Selected-item colours ──────────────────────────────────────────────────────
const SELECTED_BG       = 'rgba(0, 130, 127, 0.08)';
const SELECTED_BG_HOVER = 'rgba(0, 130, 127, 0.13)';
const HOVER_BG          = 'rgba(0, 0, 0, 0.04)';
const ACTIVE_BORDER     = '3px solid #00827F';

// ── Component ─────────────────────────────────────────────────────────────────
function Sidebar({ onExpandChange, colorblindType, onPaletteChange }) {
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);
  const [expandedSections, setExpandedSections] = useState({});
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [popoverItem, setPopoverItem] = useState(null);

  const currentWidth = expanded ? SIDEBAR_WIDTH : COLLAPSED_WIDTH;

  const handleToggleExpand = () => {
    const next = !expanded;
    setExpanded(next);
    if (onExpandChange) onExpandChange(next);
  };

  const handleSectionToggle = (path) => {
    setExpandedSections((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const handlePopoverOpen = (e, item) => {
    setPopoverAnchor(e.currentTarget);
    setPopoverItem(item);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
    setPopoverItem(null);
  };

  const isActive = (path, matchPrefix = false) =>
    matchPrefix ? location.pathname.startsWith(path) : location.pathname === path;

  const isChildActive = (item) =>
    item.children?.some((c) => location.pathname === c.path) ?? false;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: currentWidth,
        flexShrink: 0,
        transition: 'width 0.3s ease',
        '& .MuiDrawer-paper': {
          width: currentWidth,
          boxSizing: 'border-box',
          bgcolor: '#fff',
          borderRight: (theme) => `1px solid ${theme.palette.divider}`,
          top: { xs: 56, sm: 64 },
          height: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
          overflowX: 'hidden',
          overflowY: expanded ? 'auto' : 'hidden',
          transition: 'width 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {/* Nav items */}
      <List sx={{ px: 1.5, pt: 1, flexGrow: 1 }}>
        {NAV_ITEMS.map((item) => {
          const active      = isActive(item.path, item.matchPrefix);
          const hasChildren = item.children?.length > 0;
          const sectionOpen = expandedSections[item.path];
          const childActive = isChildActive(item);

          // ── Items with nested children ──────────────────────────────────────
          if (hasChildren) {
            return expanded ? (
              <Box key={item.path} sx={item.disabled ? { opacity: 0.38, pointerEvents: 'none' } : {}}>
                <ListItemButton
                  onClick={() => handleSectionToggle(item.path)}
                  selected={childActive && !sectionOpen}
                  sx={{
                    borderRadius: 1,
                    mb: 0.25,
                    py: 0.6,
                    borderLeft: childActive && !sectionOpen ? ACTIVE_BORDER : '3px solid transparent',
                    '&.Mui-selected': {
                      bgcolor: SELECTED_BG,
                      '&:hover': { bgcolor: SELECTED_BG_HOVER },
                    },
                    '&:hover': { bgcolor: HOVER_BG },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 38, color: childActive ? 'primary.main' : 'text.secondary' }}>
                    {renderIcon(item.iconName)}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      variant: 'body2',
                      fontWeight: childActive ? 600 : 400,
                      color: 'text.primary',
                      noWrap: true,
                    }}
                  />
                  <ExpandMoreIcon
                    sx={{
                      fontSize: 18,
                      color: 'text.secondary',
                      transform: sectionOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
                      transition: 'transform 0.2s ease',
                    }}
                  />
                </ListItemButton>

                <Collapse in={sectionOpen}>
                  <List disablePadding sx={{ pl: 4.5, pb: 0.5 }}>
                    {item.children.map((child) => {
                      const childIsActive = location.pathname === child.path;
                      return (
                        <ListItemButton
                          key={child.path}
                          component={RouterLink}
                          to={child.path}
                          selected={childIsActive}
                          sx={{
                            borderRadius: 1,
                            mb: 0.25,
                            py: 0.6,
                            '&.Mui-selected': {
                              bgcolor: 'transparent',
                              '&:hover': { bgcolor: HOVER_BG },
                            },
                            '&:hover': { bgcolor: HOVER_BG },
                          }}
                        >
                          <ListItemText
                            primary={child.label}
                            primaryTypographyProps={{
                              variant: 'body2',
                              fontWeight: childIsActive ? 600 : 400,
                              color: childIsActive ? 'primary.main' : 'text.primary',
                              noWrap: true,
                            }}
                          />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              </Box>
            ) : (
              <Box key={item.path} sx={item.disabled ? { opacity: 0.38, pointerEvents: 'none' } : {}}>
                <Tooltip title={item.label} placement="right">
                  <IconButton
                    onClick={(e) => handlePopoverOpen(e, item)}
                    sx={{
                      borderRadius: 2,
                      mb: 0.5,
                      color: childActive ? 'primary.main' : 'text.secondary',
                      bgcolor: childActive ? SELECTED_BG : 'transparent',
                      '&:hover': { bgcolor: HOVER_BG },
                    }}
                  >
                    {renderIcon(item.iconName)}
                  </IconButton>
                </Tooltip>
              </Box>
            );
          }

          // ── Regular items ───────────────────────────────────────────────────
          return expanded ? (
            <Box key={item.path} sx={item.disabled ? { opacity: 0.38, pointerEvents: 'none' } : {}}>
              <ListItemButton
                component={RouterLink}
                to={item.path}
                selected={active}
                sx={{
                  borderRadius: 1,
                  mb: 0.25,
                  py: 1.1,
                  borderLeft: active ? ACTIVE_BORDER : '3px solid transparent',
                  '&.Mui-selected': {
                    bgcolor: SELECTED_BG,
                    '&:hover': { bgcolor: SELECTED_BG_HOVER },
                  },
                  '&:hover': { bgcolor: HOVER_BG },
                }}
              >
                <ListItemIcon sx={{ minWidth: 38, color: active ? 'primary.main' : 'text.secondary' }}>
                  {renderIcon(item.iconName)}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    variant: 'body2',
                    fontWeight: active ? 600 : 400,
                    color: 'text.primary',
                    noWrap: true,
                  }}
                />
                {item.badge && (
                  <Chip
                    label={item.badge}
                    size="small"
                    variant="outlined"
                    sx={{
                      height: 18,
                      fontSize: '0.6rem',
                      borderColor: 'secondary.main',
                      color: 'secondary.main',
                      '& .MuiChip-label': { px: 0.75 },
                    }}
                  />
                )}
              </ListItemButton>
              {item.spacerAfter && expanded && (
                <Divider sx={{ mt: 1.5, mb: 1.5 }} />
              )}
            </Box>
          ) : (
            <Box key={item.path} sx={item.disabled ? { opacity: 0.38, pointerEvents: 'none' } : {}}>
              <Tooltip title={item.label} placement="right">
                <IconButton
                  component={RouterLink}
                  to={item.path}
                  sx={{
                    borderRadius: 2,
                    mb: item.spacerAfter ? 2 : 0.5,
                    color: active ? 'primary.main' : 'text.secondary',
                    bgcolor: active ? SELECTED_BG : 'transparent',
                    '&:hover': { bgcolor: HOVER_BG },
                  }}
                >
                  {renderIcon(item.iconName)}
                </IconButton>
              </Tooltip>
            </Box>
          );
        })}
      </List>

      {/* Footer copyright */}
      {expanded && (
        <Box sx={{ px: 2, pt: 1.5, pb: 1, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="caption" display="block" color="text.disabled" sx={{ fontSize: '0.65rem', mb: 0.25 }}>
            © 2026 Meltwater
          </Typography>
          <Typography variant="caption" display="block" color="text.disabled" sx={{ fontSize: '0.6rem', lineHeight: 1.5 }}>
            Copyright • Privacy • X TOS • YouTube TOS
          </Typography>
        </Box>
      )}

      {/* Expand / collapse toggle */}
      <Box
        sx={{
          px: 1.5,
          pb: 2,
          display: 'flex',
          justifyContent: expanded ? 'flex-end' : 'center',
        }}
      >
        <Tooltip title={expanded ? 'Collapse sidebar' : 'Expand sidebar'} placement="right">
          <Fab
            size="small"
            onClick={handleToggleExpand}
            sx={{
              bgcolor: expanded ? 'primary.main' : 'background.paper',
              color: expanded ? 'common.white' : 'text.secondary',
              boxShadow: 1,
              '&:hover': {
                bgcolor: expanded ? 'primary.dark' : HOVER_BG,
              },
            }}
          >
            {expanded
              ? <PushPinIcon sx={{ fontSize: 18 }} />
              : <PushPinOutlinedIcon sx={{ fontSize: 18 }} />
            }
          </Fab>
        </Tooltip>
      </Box>

      {/* Popover for collapsed items with children */}
      <Popover
        open={Boolean(popoverAnchor) && Boolean(popoverItem)}
        anchorEl={popoverAnchor}
        onClose={handlePopoverClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        sx={{ ml: 1 }}
      >
        {popoverItem && (
          <Box sx={{ py: 1, minWidth: 140 }}>
            <Typography variant="body2" sx={{ fontWeight: 800, px: 2, py: 0.5, color: 'text.primary' }}>
              {popoverItem.label}
            </Typography>
            {popoverItem.children?.map((child) => {
              const childIsActive = location.pathname === child.path;
              return (
                <ListItemButton
                  key={child.path}
                  component={RouterLink}
                  to={child.path}
                  selected={childIsActive}
                  onClick={handlePopoverClose}
                  sx={{
                    px: 2,
                    py: 0.6,
                    '&.Mui-selected': { bgcolor: SELECTED_BG },
                    '&:hover': { bgcolor: HOVER_BG },
                  }}
                >
                  <ListItemText
                    primary={child.label}
                    primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                  />
                </ListItemButton>
              );
            })}
          </Box>
        )}
      </Popover>
    </Drawer>
  );
}

export default Sidebar;

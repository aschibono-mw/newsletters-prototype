import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Divider,
  Menu,
  MenuItem,
  Tabs,
  Tab,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  Stack,
  Switch,
  FormControlLabel,
  FormGroup,
  Collapse,
  Alert,
} from '@mui/material';
import Indicator from '../../components/core/Indicator';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  NotificationsActive as NotificationsActiveIcon,
  NotificationsOff as NotificationsOffIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Error as ErrorIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  Assignment as AssignmentIcon,
  Comment as CommentIcon,
  AttachFile as AttachFileIcon,
  Schedule as ScheduleIcon,
  Settings as SettingsIcon,
  DoneAll as DoneAllIcon,
  Delete as DeleteIcon,
  Archive as ArchiveIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Circle as CircleIcon,
  Email as EmailIcon,
  Smartphone as MobileIcon,
  DesktopWindows as DesktopIcon,
  Chat as ChatIcon,
  Campaign as AnnouncementIcon,
  Security as SecurityIcon,
  Update as UpdateIcon,
  AccountCircle as AccountIcon,
  Folder as FolderIcon,
  Code as CodeIcon,
  CloudDone as CloudDoneIcon,
  Link as LinkIcon,
  Launch as LaunchIcon,
} from '@mui/icons-material';

// Notification types config
const notificationTypes = {
  mention: { label: 'Mention', icon: <PersonIcon />, color: '#1976D2' },
  comment: { label: 'Comment', icon: <CommentIcon />, color: '#7B1FA2' },
  assignment: { label: 'Assignment', icon: <AssignmentIcon />, color: '#00796B' },
  approval: { label: 'Approval', icon: <CheckCircleIcon />, color: '#4CAF50' },
  alert: { label: 'Alert', icon: <WarningIcon />, color: '#F57C00' },
  system: { label: 'System', icon: <InfoIcon />, color: '#757575' },
  security: { label: 'Security', icon: <SecurityIcon />, color: '#D32F2F' },
  announcement: { label: 'Announcement', icon: <AnnouncementIcon />, color: '#9C27B0' },
};

// Mock notifications
const mockNotifications = [
  {
    id: 1,
    type: 'mention',
    title: 'Sarah Chen mentioned you',
    message: 'Hey @you, can you review the latest changes to the API documentation?',
    time: '2 min ago',
    read: false,
    starred: true,
    source: 'Project: API v2.0',
    link: '/documents/api-docs',
    sender: { name: 'Sarah Chen', avatar: 'SC' },
  },
  {
    id: 2,
    type: 'approval',
    title: 'Expense report approved',
    message: 'Your expense report for $2,450 has been approved by Finance.',
    time: '15 min ago',
    read: false,
    starred: false,
    source: 'Expense System',
    link: '/expenses/REQ-2024-0142',
    sender: { name: 'Finance Team', avatar: 'FT' },
  },
  {
    id: 3,
    type: 'assignment',
    title: 'New task assigned',
    message: 'You have been assigned to "Implement user authentication flow"',
    time: '1 hour ago',
    read: false,
    starred: false,
    source: 'Sprint 24',
    link: '/tasks/TASK-1234',
    sender: { name: 'Mike Johnson', avatar: 'MJ' },
  },
  {
    id: 4,
    type: 'comment',
    title: 'New comment on your document',
    message: 'Lisa Wang commented: "Great progress on this! Just a few suggestions..."',
    time: '2 hours ago',
    read: true,
    starred: true,
    source: 'Q4 Roadmap.pdf',
    link: '/documents/q4-roadmap',
    sender: { name: 'Lisa Wang', avatar: 'LW' },
  },
  {
    id: 5,
    type: 'alert',
    title: 'Build failed',
    message: 'CI/CD pipeline failed for branch "feature/auth" - 3 tests failing',
    time: '3 hours ago',
    read: true,
    starred: false,
    source: 'GitHub Actions',
    link: '/ci/build/12345',
    sender: { name: 'CI System', avatar: 'CI' },
  },
  {
    id: 6,
    type: 'security',
    title: 'New login detected',
    message: 'New sign-in from Chrome on MacOS in San Francisco, CA',
    time: '5 hours ago',
    read: true,
    starred: false,
    source: 'Security',
    link: '/settings/security',
    sender: { name: 'Security', avatar: 'SE' },
  },
  {
    id: 7,
    type: 'announcement',
    title: 'System maintenance scheduled',
    message: 'Planned maintenance on Jan 20, 2025 from 2:00 AM - 4:00 AM PST',
    time: 'Yesterday',
    read: true,
    starred: false,
    source: 'IT Operations',
    link: '/announcements/maintenance',
    sender: { name: 'IT Team', avatar: 'IT' },
  },
  {
    id: 8,
    type: 'system',
    title: 'Storage quota warning',
    message: 'You have used 85% of your storage quota (12.8 GB of 15 GB)',
    time: 'Yesterday',
    read: true,
    starred: false,
    source: 'System',
    link: '/settings/storage',
    sender: { name: 'System', avatar: 'SY' },
  },
];

// Activity feed items
const mockActivity = [
  { type: 'edit', user: 'Sarah Chen', action: 'edited', target: 'API Documentation', time: '5 min ago' },
  { type: 'comment', user: 'Mike Johnson', action: 'commented on', target: 'Q4 Roadmap', time: '12 min ago' },
  { type: 'upload', user: 'Lisa Wang', action: 'uploaded', target: 'Design Assets.zip', time: '30 min ago' },
  { type: 'share', user: 'Tom Smith', action: 'shared', target: 'Project Brief', time: '1 hour ago' },
  { type: 'complete', user: 'Alice Johnson', action: 'completed', target: 'Code Review Task', time: '2 hours ago' },
];

export default function NotificationCenterTemplate() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [filterMenuAnchor, setFilterMenuAnchor] = useState(null);
  const [expandedGroups, setExpandedGroups] = useState({ today: true, earlier: true });

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleToggleStar = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, starred: !n.starred } : n)
    );
  };

  const handleDelete = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const todayNotifications = notifications.filter(n =>
    n.time.includes('min') || n.time.includes('hour')
  );
  const earlierNotifications = notifications.filter(n =>
    n.time.includes('Yesterday') || n.time.includes('day')
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'grey.50' }}>
      {/* Left Sidebar */}
      <Paper
        elevation={0}
        sx={{
          width: 260,
          borderRight: 1,
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <NotificationsIcon />
            <Typography variant="h6">Notifications</Typography>
            {unreadCount > 0 && (
              <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>({unreadCount})</Typography>
            )}
          </Box>
          <IconButton size="small" onClick={() => setSettingsOpen(true)}>
            <SettingsIcon />
          </IconButton>
        </Box>

        <Divider />

        {/* Quick Filters */}
        <List dense sx={{ px: 1, py: 1 }}>
          <ListItemButton selected sx={{ borderRadius: 1, mb: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <NotificationsActiveIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="All Notifications" />
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>{unreadCount}</Typography>
          </ListItemButton>
          <ListItemButton sx={{ borderRadius: 1, mb: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <CircleIcon fontSize="small" sx={{ color: 'primary.main' }} />
            </ListItemIcon>
            <ListItemText primary="Unread" />
            <Typography variant="caption" color="text.secondary">{unreadCount}</Typography>
          </ListItemButton>
          <ListItemButton sx={{ borderRadius: 1, mb: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <StarBorderIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Starred" />
            <Typography variant="caption" color="text.secondary">{notifications.filter(n => n.starred).length}</Typography>
          </ListItemButton>
          <ListItemButton sx={{ borderRadius: 1, mb: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Mentions" />
          </ListItemButton>
          <ListItemButton sx={{ borderRadius: 1, mb: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <ArchiveIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Archived" />
          </ListItemButton>
        </List>

        <Divider sx={{ my: 1 }} />

        {/* By Type */}
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="caption" color="text.secondary" fontWeight={600}>
            BY TYPE
          </Typography>
        </Box>
        <List dense sx={{ px: 1 }}>
          {Object.entries(notificationTypes).map(([key, type]) => (
            <ListItemButton key={key} sx={{ borderRadius: 1, mb: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 36, color: type.color }}>
                {type.icon}
              </ListItemIcon>
              <ListItemText primary={type.label} />
            </ListItemButton>
          ))}
        </List>

        {/* Activity Feed */}
        <Box sx={{ flex: 1 }} />
        <Divider />
        <Box sx={{ p: 2 }}>
          <Typography variant="caption" color="text.secondary" fontWeight={600} gutterBottom display="block">
            RECENT ACTIVITY
          </Typography>
          <List dense disablePadding>
            {mockActivity.slice(0, 3).map((activity, index) => (
              <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                <ListItemText
                  primary={
                    <Typography variant="caption">
                      <strong>{activity.user}</strong> {activity.action} {activity.target}
                    </Typography>
                  }
                  secondary={activity.time}
                  secondaryTypographyProps={{ fontSize: 10 }}
                />
              </ListItem>
            ))}
          </List>
          <Button size="small" fullWidth sx={{ mt: 1 }}>View All Activity</Button>
        </Box>
      </Paper>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <Paper elevation={0} sx={{ px: 3, py: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h5" fontWeight={600}>
              All Notifications
              {unreadCount > 0 && (
                <Box component="span" sx={{ ml: 1 }}><Indicator label={`${unreadCount} unread`} color="info" /></Box>
              )}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                size="small"
                startIcon={<DoneAllIcon />}
                onClick={handleMarkAllRead}
                disabled={unreadCount === 0}
              >
                Mark all read
              </Button>
              <IconButton size="small" onClick={(e) => setFilterMenuAnchor(e.currentTarget)}>
                <FilterListIcon />
              </IconButton>
            </Box>
          </Box>
          <TextField
            size="small"
            placeholder="Search notifications..."
            sx={{ width: 320 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Paper>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
          <Tabs value={selectedTab} onChange={(e, v) => setSelectedTab(v)} sx={{ '& .MuiTab-root': { textTransform: 'none' } }}>
            <Tab label="All" />
            <Tab label={`Unread (${unreadCount})`} />
            <Tab label="Mentions" />
            <Tab label="Assignments" />
          </Tabs>
        </Box>

        {/* Notification List */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
          {/* Today Group */}
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                mb: 1,
              }}
              onClick={() => setExpandedGroups(prev => ({ ...prev, today: !prev.today }))}
            >
              <Typography variant="subtitle2" color="text.secondary">
                Today ({todayNotifications.length})
              </Typography>
              {expandedGroups.today ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Box>
            <Collapse in={expandedGroups.today}>
              <Stack spacing={1}>
                {todayNotifications.map((notification) => (
                  <Paper
                    key={notification.id}
                    variant="outlined"
                    sx={{
                      p: 2,
                      cursor: 'pointer',
                      bgcolor: notification.read ? 'background.paper' : 'primary.50',
                      borderLeft: 4,
                      borderLeftColor: notificationTypes[notification.type].color,
                      '&:hover': { boxShadow: 1 },
                    }}
                    onClick={() => {
                      setSelectedNotification(notification);
                      handleMarkAsRead(notification.id);
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: notificationTypes[notification.type].color,
                        }}
                      >
                        {notification.sender.avatar}
                      </Avatar>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                          <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                              <Typography variant="body2" fontWeight={notification.read ? 400 : 600}>
                                {notification.title}
                              </Typography>
                              {!notification.read && (
                                <CircleIcon sx={{ fontSize: 8, color: 'primary.main' }} />
                              )}
                            </Box>
                            <Typography variant="body2" color="text.secondary" noWrap>
                              {notification.message}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                                {notificationTypes[notification.type].label}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                • {notification.source}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                • {notification.time}
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <IconButton
                              size="small"
                              onClick={(e) => { e.stopPropagation(); handleToggleStar(notification.id); }}
                            >
                              {notification.starred ? (
                                <StarIcon sx={{ color: '#FFC107' }} fontSize="small" />
                              ) : (
                                <StarBorderIcon fontSize="small" />
                              )}
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={(e) => { e.stopPropagation(); handleDelete(notification.id); }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </Stack>
            </Collapse>
          </Box>

          {/* Earlier Group */}
          <Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                mb: 1,
              }}
              onClick={() => setExpandedGroups(prev => ({ ...prev, earlier: !prev.earlier }))}
            >
              <Typography variant="subtitle2" color="text.secondary">
                Earlier ({earlierNotifications.length})
              </Typography>
              {expandedGroups.earlier ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Box>
            <Collapse in={expandedGroups.earlier}>
              <Stack spacing={1}>
                {earlierNotifications.map((notification) => (
                  <Paper
                    key={notification.id}
                    variant="outlined"
                    sx={{
                      p: 2,
                      cursor: 'pointer',
                      bgcolor: notification.read ? 'background.paper' : 'primary.50',
                      borderLeft: 4,
                      borderLeftColor: notificationTypes[notification.type].color,
                      '&:hover': { boxShadow: 1 },
                    }}
                    onClick={() => {
                      setSelectedNotification(notification);
                      handleMarkAsRead(notification.id);
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: notificationTypes[notification.type].color,
                        }}
                      >
                        {notification.sender.avatar}
                      </Avatar>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                          <Box>
                            <Typography variant="body2" fontWeight={notification.read ? 400 : 600}>
                              {notification.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" noWrap>
                              {notification.message}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                                {notificationTypes[notification.type].label}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                • {notification.time}
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <IconButton
                              size="small"
                              onClick={(e) => { e.stopPropagation(); handleToggleStar(notification.id); }}
                            >
                              {notification.starred ? (
                                <StarIcon sx={{ color: '#FFC107' }} fontSize="small" />
                              ) : (
                                <StarBorderIcon fontSize="small" />
                              )}
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={(e) => { e.stopPropagation(); handleDelete(notification.id); }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </Stack>
            </Collapse>
          </Box>
        </Box>
      </Box>

      {/* Right Panel - Notification Detail */}
      {selectedNotification && (
        <Paper
          elevation={0}
          sx={{
            width: 380,
            borderLeft: 1,
            borderColor: 'divider',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="subtitle1" fontWeight={600}>Notification Details</Typography>
            <IconButton size="small" onClick={() => setSelectedNotification(null)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
            {/* Type & Time */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <Chip
                label={notificationTypes[selectedNotification.type].label}
                size="small"
                variant="outlined"
              />
              <Typography variant="caption" color="text.secondary">
                {selectedNotification.time}
              </Typography>
            </Box>

            {/* Title */}
            <Typography variant="h6" gutterBottom>
              {selectedNotification.title}
            </Typography>

            {/* Message */}
            <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: 'grey.50' }}>
              <Typography variant="body2">
                {selectedNotification.message}
              </Typography>
            </Paper>

            {/* Sender */}
            <Typography variant="subtitle2" gutterBottom>From</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Avatar sx={{ bgcolor: notificationTypes[selectedNotification.type].color }}>
                {selectedNotification.sender.avatar}
              </Avatar>
              <Box>
                <Typography variant="body2" fontWeight={500}>
                  {selectedNotification.sender.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {selectedNotification.source}
                </Typography>
              </Box>
            </Box>

            {/* Source Link */}
            <Typography variant="subtitle2" gutterBottom>Related Item</Typography>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                '&:hover': { bgcolor: 'grey.50' },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LinkIcon color="action" />
                <Typography variant="body2">{selectedNotification.source}</Typography>
              </Box>
              <LaunchIcon fontSize="small" color="action" />
            </Paper>

            {/* Actions */}
            <Typography variant="subtitle2" gutterBottom>Actions</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Button size="small" variant="outlined" startIcon={<ArchiveIcon />}>
                Archive
              </Button>
              <Button size="small" variant="outlined" startIcon={selectedNotification.starred ? <StarIcon /> : <StarBorderIcon />}>
                {selectedNotification.starred ? 'Unstar' : 'Star'}
              </Button>
              <Button size="small" variant="outlined" color="error" startIcon={<DeleteIcon />}>
                Delete
              </Button>
            </Stack>
          </Box>
        </Paper>
      )}

      {/* Filter Menu */}
      <Menu
        anchorEl={filterMenuAnchor}
        open={Boolean(filterMenuAnchor)}
        onClose={() => setFilterMenuAnchor(null)}
      >
        <MenuItem>Show unread only</MenuItem>
        <MenuItem>Sort by newest</MenuItem>
        <MenuItem>Sort by oldest</MenuItem>
        <Divider />
        <MenuItem>Filter by type...</MenuItem>
        <MenuItem>Filter by source...</MenuItem>
      </Menu>

      {/* Settings Dialog */}
      <Dialog open={settingsOpen} onClose={() => setSettingsOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Notification Settings
          <IconButton onClick={() => setSettingsOpen(false)} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={4}>
            {/* Delivery Methods */}
            <Box>
              <Typography variant="subtitle1" gutterBottom>Delivery Methods</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Choose how you want to receive notifications
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <DesktopIcon fontSize="small" />
                      <span>In-app notifications</span>
                    </Box>
                  }
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EmailIcon fontSize="small" />
                      <span>Email notifications</span>
                    </Box>
                  }
                />
                <FormControlLabel
                  control={<Switch />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <MobileIcon fontSize="small" />
                      <span>Push notifications</span>
                    </Box>
                  }
                />
                <FormControlLabel
                  control={<Switch />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ChatIcon fontSize="small" />
                      <span>Slack notifications</span>
                    </Box>
                  }
                />
              </FormGroup>
            </Box>

            <Divider />

            {/* Notification Types */}
            <Box>
              <Typography variant="subtitle1" gutterBottom>Notification Types</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Choose which notifications you want to receive
              </Typography>
              <FormGroup>
                {Object.entries(notificationTypes).map(([key, type]) => (
                  <FormControlLabel
                    key={key}
                    control={<Switch defaultChecked={key !== 'system'} />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ color: type.color }}>{type.icon}</Box>
                        <span>{type.label}</span>
                      </Box>
                    }
                  />
                ))}
              </FormGroup>
            </Box>

            <Divider />

            {/* Quiet Hours */}
            <Box>
              <Typography variant="subtitle1" gutterBottom>Quiet Hours</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Pause non-urgent notifications during specific hours
              </Typography>
              <FormControlLabel
                control={<Switch />}
                label="Enable quiet hours"
              />
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <TextField
                  label="From"
                  type="time"
                  size="small"
                  defaultValue="22:00"
                  sx={{ width: 140 }}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="To"
                  type="time"
                  size="small"
                  defaultValue="08:00"
                  sx={{ width: 140 }}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSettingsOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setSettingsOpen(false)}>Save Settings</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

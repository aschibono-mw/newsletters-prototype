import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Tabs,
  Tab,
  Button,
  Divider,
  FormGroup,
  FormControlLabel,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material'
import Indicator from '../../components/core/Indicator'
import NotificationsIcon from '@mui/icons-material/NotificationsRounded'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import AssignmentIndIcon from '@mui/icons-material/AssignmentIndRounded'
import UpdateIcon from '@mui/icons-material/UpdateRounded'
import SettingsIcon from '@mui/icons-material/SettingsRounded'
import CheckCircleIcon from '@mui/icons-material/CheckCircleRounded'
import CommentIcon from '@mui/icons-material/CommentRounded'
import PersonAddIcon from '@mui/icons-material/PersonAddRounded'
import WarningIcon from '@mui/icons-material/WarningRounded'
import DoneAllIcon from '@mui/icons-material/DoneAllRounded'
import FilterListIcon from '@mui/icons-material/FilterListRounded'

const mockActivities = [
  {
    id: 1,
    type: 'mention',
    user: 'Sarah Chen',
    avatar: 'SC',
    action: 'mentioned you in',
    target: 'Q4 Planning Document',
    time: '2 minutes ago',
    read: false,
  },
  {
    id: 2,
    type: 'assignment',
    user: 'Mike Rodriguez',
    avatar: 'MR',
    action: 'assigned you to',
    target: 'Review API Documentation',
    time: '15 minutes ago',
    read: false,
  },
  {
    id: 3,
    type: 'update',
    user: 'Emily Watson',
    avatar: 'EW',
    action: 'updated status on',
    target: 'Customer Portal Redesign',
    time: '1 hour ago',
    read: false,
  },
  {
    id: 4,
    type: 'comment',
    user: 'James Liu',
    avatar: 'JL',
    action: 'commented on',
    target: 'Sprint Retrospective Notes',
    time: '2 hours ago',
    read: true,
  },
  {
    id: 5,
    type: 'system',
    user: 'System',
    avatar: 'SY',
    action: 'Scheduled maintenance',
    target: 'Sunday 2:00 AM - 4:00 AM EST',
    time: '3 hours ago',
    read: true,
  },
  {
    id: 6,
    type: 'assignment',
    user: 'Lisa Park',
    avatar: 'LP',
    action: 'completed task',
    target: 'User Research Interviews',
    time: '4 hours ago',
    read: true,
  },
  {
    id: 7,
    type: 'mention',
    user: 'David Kim',
    avatar: 'DK',
    action: 'mentioned you in',
    target: 'Weekly Team Standup',
    time: '5 hours ago',
    read: true,
  },
  {
    id: 8,
    type: 'update',
    user: 'Anna Thompson',
    avatar: 'AT',
    action: 'shared',
    target: 'Design System Guidelines v2.0',
    time: 'Yesterday',
    read: true,
  },
]

const getTypeIcon = (type) => {
  switch (type) {
    case 'mention':
      return <AlternateEmailIcon fontSize="small" />
    case 'assignment':
      return <AssignmentIndIcon fontSize="small" />
    case 'update':
      return <UpdateIcon fontSize="small" />
    case 'comment':
      return <CommentIcon fontSize="small" />
    case 'system':
      return <WarningIcon fontSize="small" />
    default:
      return <NotificationsIcon fontSize="small" />
  }
}

export default function ActivityFeedTemplate() {
  const [activities, setActivities] = useState(mockActivities)
  const [activeTab, setActiveTab] = useState(0)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [filterAnchor, setFilterAnchor] = useState(null)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [notificationSettings, setNotificationSettings] = useState({
    mentions: true,
    assignments: true,
    updates: true,
    comments: true,
    system: true,
    emailDigest: 'daily',
  })

  const unreadCount = activities.filter((a) => !a.read).length

  const handleMarkAsRead = (id) => {
    setActivities(activities.map((a) => (a.id === id ? { ...a, read: true } : a)))
  }

  const handleMarkAllAsRead = () => {
    setActivities(activities.map((a) => ({ ...a, read: true })))
  }

  const filteredActivities = activities.filter((a) => {
    if (activeTab === 1) return a.type === 'mention'
    if (activeTab === 2) return a.type === 'assignment'
    if (activeTab === 3) return a.type === 'update' || a.type === 'comment'
    if (activeTab === 4) return a.type === 'system'
    if (selectedFilter !== 'all') return a.type === selectedFilter
    return true
  })

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* Header */}
      <Paper elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="xl" sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box>
                <Typography variant="h5" fontWeight={600}>Activity Feed</Typography>
                <Typography variant="body2" color="text.secondary">
                  {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up'}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton onClick={(e) => setFilterAnchor(e.currentTarget)}>
                <FilterListIcon />
              </IconButton>
              <Button
                variant="outlined"
                startIcon={<DoneAllIcon />}
                onClick={handleMarkAllAsRead}
                disabled={unreadCount === 0}
              >
                Mark All Read
              </Button>
              <IconButton onClick={() => setSettingsOpen(true)}>
                <SettingsIcon />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Paper>

      <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Filter Menu */}
      <Menu anchorEl={filterAnchor} open={Boolean(filterAnchor)} onClose={() => setFilterAnchor(null)}>
        <MenuItem
          selected={selectedFilter === 'all'}
          onClick={() => {
            setSelectedFilter('all')
            setFilterAnchor(null)
          }}
        >
          All Activities
        </MenuItem>
        <MenuItem
          selected={selectedFilter === 'mention'}
          onClick={() => {
            setSelectedFilter('mention')
            setFilterAnchor(null)
          }}
        >
          Mentions Only
        </MenuItem>
        <MenuItem
          selected={selectedFilter === 'assignment'}
          onClick={() => {
            setSelectedFilter('assignment')
            setFilterAnchor(null)
          }}
        >
          Assignments Only
        </MenuItem>
        <MenuItem
          selected={selectedFilter === 'update'}
          onClick={() => {
            setSelectedFilter('update')
            setFilterAnchor(null)
          }}
        >
          Updates Only
        </MenuItem>
      </Menu>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} variant="fullWidth">
          <Tab label={`All (${activities.length})`} />
          <Tab label={`Mentions (${activities.filter((a) => a.type === 'mention').length})`} />
          <Tab label={`Assignments (${activities.filter((a) => a.type === 'assignment').length})`} />
          <Tab label={`Updates (${activities.filter((a) => a.type === 'update' || a.type === 'comment').length})`} />
          <Tab label={`System (${activities.filter((a) => a.type === 'system').length})`} />
        </Tabs>
      </Paper>

      {/* Activity List */}
      <Paper>
        <List>
          {filteredActivities.map((activity, index) => (
            <Box key={activity.id}>
              <ListItem
                sx={{
                  bgcolor: activity.read ? 'transparent' : 'action.hover',
                  '&:hover': { bgcolor: 'action.selected' },
                  cursor: 'pointer',
                }}
                onClick={() => handleMarkAsRead(activity.id)}
                secondaryAction={
                  !activity.read && (
                    <IconButton edge="end" size="small" onClick={() => handleMarkAsRead(activity.id)}>
                      <CheckCircleIcon color="primary" />
                    </IconButton>
                  )
                }
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: activity.type === 'system' ? 'warning.main' : 'primary.main' }}>
                    {activity.avatar}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body1" component="span" fontWeight={activity.read ? 400 : 600}>
                        {activity.user}
                      </Typography>
                      <Typography variant="body2" component="span" color="text.secondary">
                        {activity.action}
                      </Typography>
                      <Typography variant="body1" component="span" color="primary" fontWeight={500}>
                        {activity.target}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                      <Indicator
                        startIcon={getTypeIcon(activity.type)}
                        label={activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                        size="small"
                        status={activity.type === 'mention' ? 'info' : activity.type === 'assignment' ? 'pending' : activity.type === 'update' ? 'info' : activity.type === 'comment' ? 'success' : 'warning'}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {activity.time}
                      </Typography>
                    </Box>
                  }
                  secondaryTypographyProps={{ component: 'div' }}
                />
              </ListItem>
              {index < filteredActivities.length - 1 && <Divider />}
            </Box>
          ))}
          {filteredActivities.length === 0 && (
            <ListItem>
              <ListItemText primary="No activities to show" secondary="You're all caught up!" sx={{ textAlign: 'center' }} />
            </ListItem>
          )}
        </List>
      </Paper>
      </Container>

      {/* Notification Settings Dialog */}
      <Dialog open={settingsOpen} onClose={() => setSettingsOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Notification Settings</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
            Notification Types
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.mentions}
                  onChange={(e) => setNotificationSettings({ ...notificationSettings, mentions: e.target.checked })}
                />
              }
              label="Mentions - When someone @mentions you"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.assignments}
                  onChange={(e) => setNotificationSettings({ ...notificationSettings, assignments: e.target.checked })}
                />
              }
              label="Assignments - When tasks are assigned to you"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.updates}
                  onChange={(e) => setNotificationSettings({ ...notificationSettings, updates: e.target.checked })}
                />
              }
              label="Updates - Status changes on items you follow"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.comments}
                  onChange={(e) => setNotificationSettings({ ...notificationSettings, comments: e.target.checked })}
                />
              }
              label="Comments - Replies to your comments"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.system}
                  onChange={(e) => setNotificationSettings({ ...notificationSettings, system: e.target.checked })}
                />
              }
              label="System - Maintenance and important updates"
            />
          </FormGroup>

          <Divider sx={{ my: 3 }} />

          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Email Digest
          </Typography>
          <FormControl fullWidth size="small">
            <InputLabel>Email Frequency</InputLabel>
            <Select
              value={notificationSettings.emailDigest}
              label="Email Frequency"
              onChange={(e) => setNotificationSettings({ ...notificationSettings, emailDigest: e.target.value })}
            >
              <MenuItem value="realtime">Real-time</MenuItem>
              <MenuItem value="daily">Daily Digest</MenuItem>
              <MenuItem value="weekly">Weekly Digest</MenuItem>
              <MenuItem value="never">Never</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSettingsOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setSettingsOpen(false)}>
            Save Settings
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

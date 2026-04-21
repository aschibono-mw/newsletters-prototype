import { useState } from 'react'
import { Box, Typography, Button, TextField, Avatar, AvatarGroup, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListItemAvatar, Badge, Divider, Chip, InputAdornment, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Tooltip } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded'
import SearchIcon from '@mui/icons-material/SearchRounded'
import TagIcon from '@mui/icons-material/TagRounded'
import LockIcon from '@mui/icons-material/LockRounded'
import AddIcon from '@mui/icons-material/AddRounded'
import SendIcon from '@mui/icons-material/SendRounded'
import AttachFileIcon from '@mui/icons-material/AttachFileRounded'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotionsRounded'
import MoreVertIcon from '@mui/icons-material/MoreVertRounded'
import VideoCallIcon from '@mui/icons-material/VideoCallRounded'
import CallIcon from '@mui/icons-material/CallRounded'
import PushPinIcon from '@mui/icons-material/PushPinRounded'
import StarIcon from '@mui/icons-material/StarRounded'
import StarBorderIcon from '@mui/icons-material/StarBorderRounded'
import FormatBoldIcon from '@mui/icons-material/FormatBoldRounded'
import FormatItalicIcon from '@mui/icons-material/FormatItalicRounded'
import CodeIcon from '@mui/icons-material/CodeRounded'
import LinkIcon from '@mui/icons-material/LinkRounded'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulletedRounded'
import ReplyIcon from '@mui/icons-material/ReplyRounded'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorderRounded'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFileRounded'
import ImageIcon from '@mui/icons-material/ImageRounded'
import CheckCircleIcon from '@mui/icons-material/CheckCircleRounded'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUncheckedRounded'
import SettingsIcon from '@mui/icons-material/SettingsRounded'
import NotificationsIcon from '@mui/icons-material/NotificationsRounded'
import ExpandMoreIcon from '@mui/icons-material/ExpandMoreRounded'
import CloseIcon from '@mui/icons-material/CloseRounded'

const channels = [
  { id: 1, name: 'general', type: 'public', unread: 0, starred: true },
  { id: 2, name: 'engineering', type: 'public', unread: 3, starred: true },
  { id: 3, name: 'design-system', type: 'public', unread: 0, starred: false },
  { id: 4, name: 'product', type: 'public', unread: 12, starred: false },
  { id: 5, name: 'leadership', type: 'private', unread: 0, starred: false },
  { id: 6, name: 'random', type: 'public', unread: 5, starred: false },
]

const directMessages = [
  { id: 1, name: 'Sarah Chen', status: 'online', unread: 2, avatar: 'S' },
  { id: 2, name: 'Mike Johnson', status: 'online', unread: 0, avatar: 'M' },
  { id: 3, name: 'Emily Davis', status: 'away', unread: 0, avatar: 'E' },
  { id: 4, name: 'Alex Kim', status: 'offline', unread: 0, avatar: 'A' },
]

const messages = [
  {
    id: 1,
    user: 'Sarah Chen',
    avatar: 'S',
    time: '9:00 AM',
    content: 'Good morning team! Just pushed the latest design system updates to the staging environment.',
    reactions: [{ emoji: '👍', count: 3 }, { emoji: '🎉', count: 2 }],
  },
  {
    id: 2,
    user: 'Mike Johnson',
    avatar: 'M',
    time: '9:15 AM',
    content: 'Awesome! I\'ll start integrating the new button components today.',
    reactions: [],
  },
  {
    id: 3,
    user: 'Emily Davis',
    avatar: 'E',
    time: '9:30 AM',
    content: 'Here\'s the updated color palette documentation:',
    attachment: { name: 'color-palette-v2.pdf', size: '2.4 MB', type: 'pdf' },
    reactions: [{ emoji: '👀', count: 1 }],
  },
  {
    id: 4,
    user: 'Sarah Chen',
    avatar: 'S',
    time: '9:45 AM',
    content: '@Mike Johnson can you also check the accessibility contrast ratios? We need WCAG AA compliance.',
    reactions: [],
    thread: { count: 3, participants: ['M', 'S'] },
  },
  {
    id: 5,
    user: 'Alex Kim',
    avatar: 'A',
    time: '10:00 AM',
    content: '```javascript\nconst theme = createTheme({\n  palette: {\n    primary: { main: \'#0891B2\' }\n  }\n});\n```',
    reactions: [{ emoji: '💯', count: 2 }],
  },
]

const pinnedMessages = [
  { id: 1, content: 'Sprint planning meeting every Monday at 10 AM', user: 'Sarah Chen' },
  { id: 2, content: 'Design system docs: https://design.company.com', user: 'Emily Davis' },
]

const tasks = [
  { id: 1, title: 'Review color palette updates', assignee: 'M', due: 'Today', completed: false },
  { id: 2, title: 'Update button documentation', assignee: 'E', due: 'Tomorrow', completed: false },
  { id: 3, title: 'Fix accessibility issues', assignee: 'A', due: 'Nov 28', completed: true },
]

function CollaborationHubTemplate() {
  const [selectedChannel, setSelectedChannel] = useState(channels[1])
  const [messageInput, setMessageInput] = useState('')
  const [showStarred, setShowStarred] = useState(false)
  const [channelDialogOpen, setChannelDialogOpen] = useState(false)
  const [showRightPanel, setShowRightPanel] = useState(true)

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'success.main'
      case 'away': return 'warning.main'
      default: return 'grey.400'
    }
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'background.default' }}>
      {/* Top Bar */}
      <Box sx={{ backgroundColor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', py: 1, px: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button component={RouterLink} to="/templates" startIcon={<ArrowBackIcon />} sx={{ textTransform: 'none' }}>
            Back
          </Button>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>CollabHub</Typography>
        </Box>
        <TextField
          placeholder="Search messages, files, and more..."
          size="small"
          sx={{
            width: 400,
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'grey.100',
              '& fieldset': { border: 'none' },
              '&:hover': { backgroundColor: 'grey.200' },
            },
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: 'text.secondary' }} /></InputAdornment>,
          }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton><NotificationsIcon /></IconButton>
          <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
        </Box>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left Sidebar */}
        <Box sx={{ width: 260, backgroundColor: 'background.paper', borderRight: '1px solid', borderColor: 'divider', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Workspace */}
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Button fullWidth sx={{ justifyContent: 'space-between', color: 'text.primary', textTransform: 'none', fontWeight: 600 }} endIcon={<ExpandMoreIcon />}>
              Acme Corp Workspace
            </Button>
          </Box>

          <Box sx={{ flex: 1, overflow: 'auto', p: 1 }}>
            {/* Starred */}
            <Box sx={{ mb: 2 }}>
              <Button
                fullWidth
                startIcon={<StarIcon sx={{ color: 'warning.main' }} />}
                onClick={() => setShowStarred(!showStarred)}
                sx={{ justifyContent: 'flex-start', color: 'text.secondary', textTransform: 'none', px: 1 }}
              >
                Starred
              </Button>
              {showStarred && (
                <List dense disablePadding sx={{ pl: 2 }}>
                  {channels.filter(c => c.starred).map((channel) => (
                    <ListItemButton
                      key={channel.id}
                      selected={selectedChannel?.id === channel.id}
                      onClick={() => setSelectedChannel(channel)}
                      sx={{ borderRadius: 1, color: 'text.primary', '&.Mui-selected': { backgroundColor: 'primary.light' } }}
                    >
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        <TagIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      </ListItemIcon>
                      <ListItemText primary={channel.name} primaryTypographyProps={{ variant: 'body2' }} />
                    </ListItemButton>
                  ))}
                </List>
              )}
            </Box>

            {/* Channels */}
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 1, mb: 0.5 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>CHANNELS</Typography>
                <IconButton size="small" onClick={() => setChannelDialogOpen(true)} sx={{ color: 'text.secondary' }}><AddIcon fontSize="small" /></IconButton>
              </Box>
              <List dense disablePadding>
                {channels.map((channel) => (
                  <ListItemButton
                    key={channel.id}
                    selected={selectedChannel?.id === channel.id}
                    onClick={() => setSelectedChannel(channel)}
                    sx={{ borderRadius: 1, color: channel.unread > 0 ? 'text.primary' : 'text.secondary', '&.Mui-selected': { backgroundColor: 'primary.light' } }}
                  >
                    <ListItemIcon sx={{ minWidth: 28 }}>
                      {channel.type === 'private' ? <LockIcon sx={{ fontSize: 16, color: 'text.secondary' }} /> : <TagIcon sx={{ fontSize: 16, color: 'text.secondary' }} />}
                    </ListItemIcon>
                    <ListItemText
                      primary={channel.name}
                      primaryTypographyProps={{ variant: 'body2', fontWeight: channel.unread > 0 ? 600 : 400 }}
                    />
                    {channel.unread > 0 && (
                      <Typography variant="caption" sx={{ fontWeight: 600, bgcolor: 'primary.main', color: 'white', px: 0.75, py: 0.25, borderRadius: 1, fontSize: 10 }}>{channel.unread}</Typography>
                    )}
                  </ListItemButton>
                ))}
              </List>
            </Box>

            {/* Direct Messages */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 1, mb: 0.5 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>DIRECT MESSAGES</Typography>
                <IconButton size="small" sx={{ color: 'text.secondary' }}><AddIcon fontSize="small" /></IconButton>
              </Box>
              <List dense disablePadding>
                {directMessages.map((dm) => (
                  <ListItemButton key={dm.id} sx={{ borderRadius: 1, color: dm.unread > 0 ? 'text.primary' : 'text.secondary' }}>
                    <ListItemAvatar sx={{ minWidth: 36 }}>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                          <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: getStatusColor(dm.status), border: '2px solid', borderColor: 'background.paper' }} />
                        }
                      >
                        <Avatar sx={{ width: 28, height: 28, fontSize: 12 }}>{dm.avatar}</Avatar>
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText primary={dm.name} primaryTypographyProps={{ variant: 'body2', fontWeight: dm.unread > 0 ? 600 : 400 }} />
                    {dm.unread > 0 && (
                      <Typography variant="caption" sx={{ fontWeight: 600, bgcolor: 'primary.main', color: 'white', px: 0.75, py: 0.25, borderRadius: 1, fontSize: 10 }}>{dm.unread}</Typography>
                    )}
                  </ListItemButton>
                ))}
              </List>
            </Box>
          </Box>
        </Box>

        {/* Main Chat Area */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'background.paper' }}>
          {/* Channel Header */}
          <Box sx={{ px: 3, py: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TagIcon sx={{ color: 'text.secondary' }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>{selectedChannel?.name}</Typography>
                <Typography variant="caption" color="text.secondary">8 members</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 28, height: 28, fontSize: 12 } }}>
                {['S', 'M', 'E', 'A', 'C'].map((a) => <Avatar key={a}>{a}</Avatar>)}
              </AvatarGroup>
              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
              <Tooltip title="Start a call"><IconButton><VideoCallIcon /></IconButton></Tooltip>
              <Tooltip title="Pinned messages"><IconButton><PushPinIcon /></IconButton></Tooltip>
              <Tooltip title="Settings"><IconButton onClick={() => setShowRightPanel(!showRightPanel)}><SettingsIcon /></IconButton></Tooltip>
            </Box>
          </Box>

          {/* Messages */}
          <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
            {/* Pinned */}
            <Box sx={{ mb: 3, p: 2, backgroundColor: 'warning.50', borderRadius: 1, border: '1px solid', borderColor: 'warning.200' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <PushPinIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                <Typography variant="caption" sx={{ fontWeight: 600, color: 'warning.dark' }}>Pinned</Typography>
              </Box>
              {pinnedMessages.map((pm) => (
                <Typography key={pm.id} variant="body2" sx={{ mb: 0.5 }}>
                  {pm.content} — <Typography component="span" variant="caption" color="text.secondary">{pm.user}</Typography>
                </Typography>
              ))}
            </Box>

            {/* Messages List */}
            {messages.map((msg) => (
              <Box key={msg.id} sx={{ display: 'flex', gap: 2, mb: 3, '&:hover .message-actions': { opacity: 1 } }}>
                <Avatar sx={{ backgroundColor: 'primary.main' }}>{msg.avatar}</Avatar>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{msg.user}</Typography>
                    <Typography variant="caption" color="text.secondary">{msg.time}</Typography>
                  </Box>
                  {msg.content.startsWith('```') ? (
                    <Box sx={{ p: 2, backgroundColor: 'grey.100', borderRadius: 1, fontFamily: 'monospace', fontSize: 13, overflow: 'auto' }}>
                      <pre style={{ margin: 0 }}>{msg.content.replace(/```javascript\n?|```/g, '')}</pre>
                    </Box>
                  ) : (
                    <Typography variant="body2" sx={{ color: 'text.primary' }}>{msg.content}</Typography>
                  )}
                  {msg.attachment && (
                    <Box sx={{ mt: 1, p: 2, backgroundColor: 'grey.50', borderRadius: 1, border: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 2, width: 'fit-content' }}>
                      <InsertDriveFileIcon sx={{ color: 'error.main' }} />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>{msg.attachment.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{msg.attachment.size}</Typography>
                      </Box>
                    </Box>
                  )}
                  {msg.reactions.length > 0 && (
                    <Box sx={{ display: 'flex', gap: 0.5, mt: 1 }}>
                      {msg.reactions.map((r, i) => (
                        <Chip key={i} label={`${r.emoji} ${r.count}`} size="small" variant="outlined" sx={{ height: 24, cursor: 'pointer' }} />
                      ))}
                      <Chip label="+" size="small" variant="outlined" sx={{ height: 24, cursor: 'pointer' }} />
                    </Box>
                  )}
                  {msg.thread && (
                    <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                      <AvatarGroup max={2} sx={{ '& .MuiAvatar-root': { width: 20, height: 20, fontSize: 10 } }}>
                        {msg.thread.participants.map((p) => <Avatar key={p}>{p}</Avatar>)}
                      </AvatarGroup>
                      <Typography variant="caption" color="primary">{msg.thread.count} replies</Typography>
                    </Box>
                  )}
                </Box>
                <Box className="message-actions" sx={{ opacity: 0, transition: 'opacity 0.2s', display: 'flex', gap: 0.5 }}>
                  <IconButton size="small"><EmojiEmotionsIcon fontSize="small" /></IconButton>
                  <IconButton size="small"><ReplyIcon fontSize="small" /></IconButton>
                  <IconButton size="small"><BookmarkBorderIcon fontSize="small" /></IconButton>
                  <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Message Input */}
          <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
              <Box sx={{ display: 'flex', gap: 0.5, p: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                <IconButton size="small"><FormatBoldIcon fontSize="small" /></IconButton>
                <IconButton size="small"><FormatItalicIcon fontSize="small" /></IconButton>
                <IconButton size="small"><CodeIcon fontSize="small" /></IconButton>
                <IconButton size="small"><LinkIcon fontSize="small" /></IconButton>
                <IconButton size="small"><FormatListBulletedIcon fontSize="small" /></IconButton>
              </Box>
              <TextField
                placeholder={`Message #${selectedChannel?.name}`}
                fullWidth
                multiline
                maxRows={4}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { border: 'none' } } }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <IconButton size="small"><AttachFileIcon fontSize="small" /></IconButton>
                  <IconButton size="small"><ImageIcon fontSize="small" /></IconButton>
                  <IconButton size="small"><EmojiEmotionsIcon fontSize="small" /></IconButton>
                </Box>
                <Button variant="contained" endIcon={<SendIcon />} disabled={!messageInput.trim()} sx={{ textTransform: 'none' }}>
                  Send
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Right Panel */}
        {showRightPanel && (
          <Box sx={{ width: 300, borderLeft: '1px solid', borderColor: 'divider', backgroundColor: 'background.paper', overflow: 'auto' }}>
            <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Channel Details</Typography>
              <IconButton size="small" onClick={() => setShowRightPanel(false)}><CloseIcon fontSize="small" /></IconButton>
            </Box>

            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>About</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Discussion channel for design system updates, components, and patterns.
              </Typography>

              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Tasks</Typography>
              <List disablePadding>
                {tasks.map((task) => (
                  <ListItem key={task.id} disablePadding sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, width: '100%' }}>
                      <IconButton size="small" sx={{ mt: -0.5 }}>
                        {task.completed ? <CheckCircleIcon sx={{ color: 'success.main', fontSize: 20 }} /> : <RadioButtonUncheckedIcon sx={{ fontSize: 20 }} />}
                      </IconButton>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? 'text.secondary' : 'text.primary' }}>
                          {task.title}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                          <Avatar sx={{ width: 16, height: 16, fontSize: 10 }}>{task.assignee}</Avatar>
                          <Typography variant="caption" color="text.secondary">{task.due}</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </ListItem>
                ))}
              </List>
              <Button startIcon={<AddIcon />} size="small" fullWidth sx={{ mt: 1, textTransform: 'none' }}>Add Task</Button>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Shared Files</Typography>
              <List disablePadding>
                {[
                  { name: 'color-palette-v2.pdf', size: '2.4 MB' },
                  { name: 'button-specs.figma', size: '1.1 MB' },
                  { name: 'meeting-notes.md', size: '24 KB' },
                ].map((file, i) => (
                  <ListItemButton key={i} sx={{ borderRadius: 1, mb: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <InsertDriveFileIcon sx={{ fontSize: 18 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={file.name}
                      secondary={file.size}
                      primaryTypographyProps={{ variant: 'body2' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Box>
          </Box>
        )}
      </Box>

      {/* Create Channel Dialog */}
      <Dialog open={channelDialogOpen} onClose={() => setChannelDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create Channel</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField label="Channel Name" fullWidth size="small" placeholder="e.g. project-alpha" />
            <TextField label="Description" fullWidth size="small" multiline rows={2} placeholder="What's this channel about?" />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Chip label="Public" sx={{ bgcolor: 'grey.200', fontWeight: 600 }} onClick={() => {}} icon={<TagIcon />} />
              <Chip label="Private" variant="outlined" onClick={() => {}} icon={<LockIcon />} />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setChannelDialogOpen(false)} sx={{ textTransform: 'none' }}>Cancel</Button>
          <Button variant="contained" onClick={() => setChannelDialogOpen(false)} sx={{ textTransform: 'none' }}>Create Channel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default CollaborationHubTemplate

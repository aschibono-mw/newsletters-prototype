import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  Chip,
  IconButton,
  LinearProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  AvatarGroup,
  Card,
  CardContent,
  Tabs,
  Tab,
  Collapse,
} from '@mui/material'
import Indicator from '../../components/core/Indicator'
import FlagIcon from '@mui/icons-material/FlagRounded'
import AddIcon from '@mui/icons-material/AddRounded'
import EditIcon from '@mui/icons-material/EditRounded'
import DeleteIcon from '@mui/icons-material/DeleteRounded'
import ExpandMoreIcon from '@mui/icons-material/ExpandMoreRounded'
import ExpandLessIcon from '@mui/icons-material/ExpandLessRounded'
import CheckCircleIcon from '@mui/icons-material/CheckCircleRounded'
import WarningIcon from '@mui/icons-material/WarningRounded'
import ErrorIcon from '@mui/icons-material/ErrorRounded'
import CommentIcon from '@mui/icons-material/CommentRounded'
import TrendingUpIcon from '@mui/icons-material/TrendingUpRounded'
import CalendarTodayIcon from '@mui/icons-material/CalendarTodayRounded'
import PersonIcon from '@mui/icons-material/PersonRounded'
import GroupIcon from '@mui/icons-material/GroupRounded'
import AccountTreeIcon from '@mui/icons-material/AccountTreeRounded'

const mockGoals = [
  {
    id: 1,
    title: 'Increase Customer Retention',
    description: 'Improve customer retention rate by focusing on product quality and support',
    owner: 'Sarah Chen',
    ownerAvatar: 'SC',
    team: 'Customer Success',
    dueDate: '2024-12-31',
    progress: 72,
    status: 'on-track',
    parent: null,
    keyResults: [
      { id: 1, title: 'Reduce churn rate from 5% to 3%', target: 3, current: 3.8, unit: '%', progress: 60 },
      { id: 2, title: 'Increase NPS score to 50+', target: 50, current: 47, unit: 'pts', progress: 85 },
      { id: 3, title: 'Launch customer loyalty program', target: 1, current: 1, unit: '', progress: 100 },
    ],
    checkIns: [
      { date: '2024-11-18', note: 'Loyalty program launched successfully. Seeing early positive engagement.', author: 'Sarah Chen' },
      { date: '2024-11-11', note: 'NPS trending up after new support process implementation.', author: 'Sarah Chen' },
    ],
  },
  {
    id: 2,
    title: 'Launch Mobile App V2',
    description: 'Release major update with new features and improved performance',
    owner: 'Mike Rodriguez',
    ownerAvatar: 'MR',
    team: 'Product',
    dueDate: '2024-11-30',
    progress: 45,
    status: 'at-risk',
    parent: null,
    keyResults: [
      { id: 1, title: 'Complete core feature development', target: 100, current: 75, unit: '%', progress: 75 },
      { id: 2, title: 'Achieve 99.5% crash-free rate', target: 99.5, current: 98.2, unit: '%', progress: 70 },
      { id: 3, title: 'Reduce app load time to <2s', target: 2, current: 2.8, unit: 's', progress: 40 },
    ],
    checkIns: [
      { date: '2024-11-18', note: 'Performance optimization taking longer than expected. May need to push deadline.', author: 'Mike Rodriguez' },
    ],
  },
  {
    id: 3,
    title: 'Expand to European Market',
    description: 'Establish presence in key European markets with localized product',
    owner: 'Emily Watson',
    ownerAvatar: 'EW',
    team: 'Growth',
    dueDate: '2025-03-31',
    progress: 25,
    status: 'behind',
    parent: null,
    keyResults: [
      { id: 1, title: 'GDPR compliance certification', target: 1, current: 0, unit: '', progress: 60 },
      { id: 2, title: 'Localize product in 5 languages', target: 5, current: 2, unit: 'languages', progress: 40 },
      { id: 3, title: 'Sign 10 enterprise customers in EU', target: 10, current: 0, unit: 'customers', progress: 0 },
    ],
    checkIns: [],
  },
]

const getStatusIcon = (status) => {
  switch (status) {
    case 'on-track':
      return <CheckCircleIcon sx={{ color: 'success.main' }} />
    case 'at-risk':
      return <WarningIcon sx={{ color: 'warning.main' }} />
    case 'behind':
      return <ErrorIcon sx={{ color: 'error.main' }} />
    default:
      return <CheckCircleIcon sx={{ color: 'grey.400' }} />
  }
}

const getProgressColor = (progress) => {
  if (progress >= 70) return 'success'
  if (progress >= 40) return 'warning'
  return 'error'
}

export default function GoalTrackingTemplate() {
  const [goals] = useState(mockGoals)
  const [activeTab, setActiveTab] = useState(0)
  const [expandedGoal, setExpandedGoal] = useState(null)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [checkInDialogOpen, setCheckInDialogOpen] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState(null)
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    team: '',
    dueDate: '',
    keyResults: [{ title: '', target: '', unit: '' }],
  })

  const handleExpandGoal = (goalId) => {
    setExpandedGoal(expandedGoal === goalId ? null : goalId)
  }

  const handleAddKeyResult = () => {
    setNewGoal({
      ...newGoal,
      keyResults: [...newGoal.keyResults, { title: '', target: '', unit: '' }],
    })
  }

  const handleOpenCheckIn = (goal) => {
    setSelectedGoal(goal)
    setCheckInDialogOpen(true)
  }

  const statusCounts = {
    'on-track': goals.filter((g) => g.status === 'on-track').length,
    'at-risk': goals.filter((g) => g.status === 'at-risk').length,
    behind: goals.filter((g) => g.status === 'behind').length,
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* Header */}
      <Paper elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="xl" sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h5" fontWeight={600}>Goals & OKRs</Typography>
              <Typography variant="body2" color="text.secondary">
                Track objectives and key results
              </Typography>
            </Box>
            <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={() => setCreateDialogOpen(true)}>
              New Goal
            </Button>
          </Box>
        </Container>
      </Paper>

      <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h3">{goals.length}</Typography>
            <Typography variant="body2" color="text.secondary">
              Active Goals
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper sx={{ p: 3, textAlign: 'center', borderLeft: 4, borderColor: 'success.main' }}>
            <Typography variant="h3" color="success.main">
              {statusCounts['on-track']}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              On Track
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper sx={{ p: 3, textAlign: 'center', borderLeft: 4, borderColor: 'warning.main' }}>
            <Typography variant="h3" color="warning.main">
              {statusCounts['at-risk']}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              At Risk
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper sx={{ p: 3, textAlign: 'center', borderLeft: 4, borderColor: 'error.main' }}>
            <Typography variant="h3" color="error.main">
              {statusCounts.behind}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Behind
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)}>
          <Tab label="All Goals" />
          <Tab label="My Goals" />
          <Tab label="Team Goals" />
          <Tab label="Hierarchy" />
        </Tabs>
      </Paper>

      {/* Goals List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {goals.map((goal) => (
          <Paper key={goal.id}>
            {/* Goal Header */}
            <Box
              sx={{ p: 2, display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              onClick={() => handleExpandGoal(goal.id)}
            >
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  {getStatusIcon(goal.status)}
                  <Typography variant="h6">{goal.title}</Typography>
                  <Indicator label={goal.status.replace('-', ' ')} status={goal.status === 'on-track' ? 'success' : goal.status === 'at-risk' ? 'warning' : 'error'} size="small" />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <PersonIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {goal.owner}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <GroupIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {goal.team}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CalendarTodayIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      Due {goal.dueDate}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mr: 2 }}>
                <Box sx={{ width: 120 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" color="text.secondary">
                      Progress
                    </Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {goal.progress}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={goal.progress}
                    color={getProgressColor(goal.progress)}
                    sx={{ height: 8, borderRadius: 1 }}
                  />
                </Box>
              </Box>
              <IconButton>{expandedGoal === goal.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}</IconButton>
            </Box>

            {/* Expanded Content */}
            <Collapse in={expandedGoal === goal.id}>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {goal.description}
                </Typography>

                {/* Key Results */}
                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                  Key Results
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                  {goal.keyResults.map((kr) => (
                    <Paper key={kr.id} variant="outlined" sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body1">{kr.title}</Typography>
                        <Chip
                          label={`${kr.current}${kr.unit ? ' ' + kr.unit : ''} / ${kr.target}${kr.unit ? ' ' + kr.unit : ''}`}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={kr.progress}
                        color={getProgressColor(kr.progress)}
                        sx={{ height: 6, borderRadius: 1 }}
                      />
                    </Paper>
                  ))}
                </Box>

                {/* Check-ins */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle2">Weekly Check-ins</Typography>
                  <Button size="small" startIcon={<AddIcon />} onClick={() => handleOpenCheckIn(goal)}>
                    Add Check-in
                  </Button>
                </Box>
                {goal.checkIns.length > 0 ? (
                  <List dense>
                    {goal.checkIns.map((checkIn, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CommentIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={checkIn.note}
                          secondary={`${checkIn.author} • ${checkIn.date}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No check-ins yet. Add your first weekly update.
                  </Typography>
                )}

                {/* Actions */}
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button size="small" startIcon={<EditIcon />}>
                    Edit Goal
                  </Button>
                  <Button size="small" startIcon={<TrendingUpIcon />}>
                    Update Progress
                  </Button>
                  <Button size="small" startIcon={<AccountTreeIcon />}>
                    Link Parent Goal
                  </Button>
                </Box>
              </Box>
            </Collapse>
          </Paper>
        ))}
      </Box>
      </Container>

      {/* Create Goal Dialog */}
      <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create New Goal</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Goal Title"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Description"
                value={newGoal.description}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Team</InputLabel>
                <Select value={newGoal.team} label="Team" onChange={(e) => setNewGoal({ ...newGoal, team: e.target.value })}>
                  <MenuItem value="Product">Product</MenuItem>
                  <MenuItem value="Engineering">Engineering</MenuItem>
                  <MenuItem value="Customer Success">Customer Success</MenuItem>
                  <MenuItem value="Growth">Growth</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="Due Date"
                value={newGoal.dueDate}
                onChange={(e) => setNewGoal({ ...newGoal, dueDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle2">Key Results (3-5 recommended)</Typography>
                <Button size="small" startIcon={<AddIcon />} onClick={handleAddKeyResult}>
                  Add Key Result
                </Button>
              </Box>
              {newGoal.keyResults.map((kr, index) => (
                <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                  <Grid size={{ xs: 6 }}>
                    <TextField fullWidth size="small" label={`Key Result ${index + 1}`} placeholder="e.g., Increase sales by..." />
                  </Grid>
                  <Grid size={{ xs: 3 }}>
                    <TextField fullWidth size="small" label="Target" placeholder="e.g., 100" />
                  </Grid>
                  <Grid size={{ xs: 3 }}>
                    <TextField fullWidth size="small" label="Unit" placeholder="e.g., %, users" />
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
          <Button variant="contained">Create Goal</Button>
        </DialogActions>
      </Dialog>

      {/* Check-in Dialog */}
      <Dialog open={checkInDialogOpen} onClose={() => setCheckInDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Weekly Check-in</DialogTitle>
        <DialogContent>
          {selectedGoal && (
            <>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedGoal.title}
              </Typography>
              <TextField fullWidth multiline rows={4} label="Status Update" placeholder="What progress was made this week? Any blockers?" sx={{ mb: 2 }} />
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Update Key Results
              </Typography>
              {selectedGoal.keyResults.map((kr) => (
                <Box key={kr.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Typography variant="body2" sx={{ flex: 1 }}>
                    {kr.title}
                  </Typography>
                  <TextField size="small" sx={{ width: 100 }} defaultValue={kr.current} label="Current" />
                </Box>
              ))}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCheckInDialogOpen(false)}>Cancel</Button>
          <Button variant="contained">Save Check-in</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

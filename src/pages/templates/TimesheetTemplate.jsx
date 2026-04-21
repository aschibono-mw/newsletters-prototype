import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Card,
  CardContent,
  Avatar,
  Divider,
  LinearProgress,
  Tooltip,
} from '@mui/material'
import Indicator from '../../components/core/Indicator'
import AccessTimeIcon from '@mui/icons-material/AccessTimeRounded'
import PlayArrowIcon from '@mui/icons-material/PlayArrowRounded'
import StopIcon from '@mui/icons-material/StopRounded'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightIcon from '@mui/icons-material/ChevronRightRounded'
import AddIcon from '@mui/icons-material/AddRounded'
import EditIcon from '@mui/icons-material/EditRounded'
import DeleteIcon from '@mui/icons-material/DeleteRounded'
import SendIcon from '@mui/icons-material/SendRounded'
import CheckIcon from '@mui/icons-material/CheckRounded'
import CloseIcon from '@mui/icons-material/CloseRounded'
import HistoryIcon from '@mui/icons-material/HistoryRounded'
import WarningIcon from '@mui/icons-material/WarningRounded'

const projects = [
  { id: 1, name: 'Website Redesign', client: 'Acme Corp', color: '#0891B2' },
  { id: 2, name: 'Mobile App', client: 'TechStart', color: '#A21CAF' },
  { id: 3, name: 'API Integration', client: 'Global Systems', color: '#059669' },
  { id: 4, name: 'Internal Tools', client: 'Internal', color: '#D97706' },
]

const tasks = [
  { id: 1, name: 'Development', projectId: 1 },
  { id: 2, name: 'Design', projectId: 1 },
  { id: 3, name: 'Testing', projectId: 1 },
  { id: 4, name: 'Meetings', projectId: null },
  { id: 5, name: 'Code Review', projectId: 2 },
]

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const weekDates = ['Nov 18', 'Nov 19', 'Nov 20', 'Nov 21', 'Nov 22', 'Nov 23', 'Nov 24']

const initialTimeEntries = [
  { id: 1, projectId: 1, taskId: 1, hours: [8, 7.5, 8, 6, 8, 0, 0], notes: 'Feature implementation' },
  { id: 2, projectId: 1, taskId: 2, hours: [0, 0.5, 0, 2, 0, 0, 0], notes: 'UI updates' },
  { id: 3, projectId: 2, taskId: 5, hours: [0, 0, 0, 0, 0, 4, 0], notes: 'Weekend work' },
  { id: 4, projectId: null, taskId: 4, hours: [1, 1, 1, 1, 1, 0, 0], notes: 'Daily standups' },
]

const timesheetHistory = [
  { id: 1, weekOf: 'Nov 11 - Nov 17', totalHours: 42.5, status: 'approved', submittedDate: 'Nov 17', approvedBy: 'Sarah Chen' },
  { id: 2, weekOf: 'Nov 4 - Nov 10', totalHours: 40, status: 'approved', submittedDate: 'Nov 10', approvedBy: 'Sarah Chen' },
  { id: 3, weekOf: 'Oct 28 - Nov 3', totalHours: 38.5, status: 'approved', submittedDate: 'Nov 3', approvedBy: 'Sarah Chen' },
  { id: 4, weekOf: 'Oct 21 - Oct 27', totalHours: 45, status: 'approved', submittedDate: 'Oct 27', approvedBy: 'Sarah Chen', overtime: 5 },
]

const pendingApprovals = [
  { id: 1, employee: 'Lisa Park', avatar: 'LP', weekOf: 'Nov 18 - Nov 24', totalHours: 41, submittedDate: 'Nov 22' },
  { id: 2, employee: 'James Liu', avatar: 'JL', weekOf: 'Nov 18 - Nov 24', totalHours: 38.5, submittedDate: 'Nov 22' },
  { id: 3, employee: 'Kevin Brown', avatar: 'KB', weekOf: 'Nov 18 - Nov 24', totalHours: 44, submittedDate: 'Nov 21', overtime: 4 },
]

export default function TimesheetTemplate() {
  const [activeTab, setActiveTab] = useState(0)
  const [timeEntries, setTimeEntries] = useState(initialTimeEntries)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timerSeconds] = useState(0)
  const [timerProject, setTimerProject] = useState(1)
  const [timerTask, setTimerTask] = useState(1)
  const [entryDialogOpen, setEntryDialogOpen] = useState(false)
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState(null)

  const getProject = (id) => projects.find(p => p.id === id)
  const getTask = (id) => tasks.find(t => t.id === id)

  const totalHoursByDay = weekDays.map((_, dayIndex) =>
    timeEntries.reduce((sum, entry) => sum + entry.hours[dayIndex], 0)
  )
  const totalWeekHours = totalHoursByDay.reduce((sum, h) => sum + h, 0)
  const overtime = totalWeekHours > 40 ? totalWeekHours - 40 : 0

  const formatTimer = (seconds) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const handleHourChange = (entryId, dayIndex, value) => {
    const numValue = parseFloat(value) || 0
    setTimeEntries(entries =>
      entries.map(entry =>
        entry.id === entryId
          ? { ...entry, hours: entry.hours.map((h, i) => i === dayIndex ? numValue : h) }
          : entry
      )
    )
  }

  const openEntryDialog = (entry = null) => {
    setSelectedEntry(entry)
    setEntryDialogOpen(true)
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* Header */}
      <Paper elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="xl" sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box>
              <Typography variant="h5" fontWeight={600}>Timesheet</Typography>
              <Typography variant="body2" color="text.secondary">
                Track your work hours and submit for approval
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="outlined" startIcon={<HistoryIcon />}>
                History
              </Button>
              <Button variant="contained" color="secondary" startIcon={<SendIcon />} onClick={() => setSubmitDialogOpen(true)}>
                Submit Week
              </Button>
            </Box>
          </Box>

          {/* Timer */}
          <Paper variant="outlined" sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <AccessTimeIcon color="primary" />
            <Typography variant="h4" fontFamily="monospace" fontWeight={600} sx={{ minWidth: 140 }}>
              {formatTimer(timerSeconds)}
            </Typography>
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Project</InputLabel>
              <Select value={timerProject} label="Project" onChange={(e) => setTimerProject(e.target.value)}>
                {projects.map(p => (
                  <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Task</InputLabel>
              <Select value={timerTask} label="Task" onChange={(e) => setTimerTask(e.target.value)}>
                {tasks.map(t => (
                  <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant={isTimerRunning ? 'outlined' : 'contained'}
              color={isTimerRunning ? 'error' : 'primary'}
              startIcon={isTimerRunning ? <StopIcon /> : <PlayArrowIcon />}
              onClick={() => setIsTimerRunning(!isTimerRunning)}
            >
              {isTimerRunning ? 'Stop' : 'Start'}
            </Button>
          </Paper>
        </Container>
      </Paper>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="xl" sx={{ pt: 2 }}>
          <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} sx={{ '& .MuiTab-root': { textTransform: 'none' } }}>
            <Tab label="My Timesheet" />
            <Tab label="Approvals" />
            <Tab label="Reports" />
          </Tabs>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* My Timesheet Tab */}
        {activeTab === 0 && (
          <>
            {/* Week Navigation */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton size="small"><ChevronLeftIcon /></IconButton>
                <Typography variant="h6" fontWeight={600}>Nov 18 - Nov 24, 2024</Typography>
                <IconButton size="small"><ChevronRightIcon /></IconButton>
                <Button size="small" sx={{ ml: 1 }}>Today</Button>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Indicator label="Draft" status="warning" />
                {overtime > 0 && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <WarningIcon color="warning" fontSize="small" />
                    <Typography variant="body2" color="warning.main">{overtime}h overtime</Typography>
                  </Box>
                )}
              </Box>
            </Box>

            {/* Summary Cards */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
                  <CardContent sx={{ textAlign: 'center', py: 2 }}>
                    <Typography variant="h4" fontWeight={700} color="primary.main">{totalWeekHours}</Typography>
                    <Typography variant="body2" color="text.secondary">Total Hours</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
                  <CardContent sx={{ textAlign: 'center', py: 2 }}>
                    <Typography variant="h4" fontWeight={700}>40</Typography>
                    <Typography variant="body2" color="text.secondary">Target Hours</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
                  <CardContent sx={{ textAlign: 'center', py: 2 }}>
                    <Typography variant="h4" fontWeight={700} color={overtime > 0 ? 'warning.main' : 'text.primary'}>
                      {overtime}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">Overtime</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
                  <CardContent sx={{ textAlign: 'center', py: 2 }}>
                    <Typography variant="h4" fontWeight={700}>{timeEntries.length}</Typography>
                    <Typography variant="body2" color="text.secondary">Entries</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Timesheet Grid */}
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.50' }}>
                    <TableCell sx={{ fontWeight: 600, width: 250 }}>Project / Task</TableCell>
                    {weekDays.map((day, i) => (
                      <TableCell key={day} align="center" sx={{ fontWeight: 600, width: 80 }}>
                        <Typography variant="caption" display="block">{day}</Typography>
                        <Typography variant="caption" color="text.secondary">{weekDates[i]}</Typography>
                      </TableCell>
                    ))}
                    <TableCell align="center" sx={{ fontWeight: 600, width: 80 }}>Total</TableCell>
                    <TableCell sx={{ width: 50 }} />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {timeEntries.map((entry) => {
                    const project = getProject(entry.projectId)
                    const task = getTask(entry.taskId)
                    const rowTotal = entry.hours.reduce((sum, h) => sum + h, 0)
                    return (
                      <TableRow key={entry.id} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ width: 4, height: 32, bgcolor: project?.color || 'grey.400', borderRadius: 1 }} />
                            <Box>
                              <Typography variant="body2" fontWeight={500}>
                                {project?.name || 'No Project'}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">{task?.name}</Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        {entry.hours.map((hours, dayIndex) => (
                          <TableCell key={dayIndex} align="center" sx={{ p: 0.5 }}>
                            <TextField
                              size="small"
                              type="number"
                              value={hours || ''}
                              onChange={(e) => handleHourChange(entry.id, dayIndex, e.target.value)}
                              inputProps={{ min: 0, max: 24, step: 0.5, style: { textAlign: 'center', padding: '8px' } }}
                              sx={{ width: 60, '& .MuiOutlinedInput-root': { bgcolor: hours > 0 ? 'primary.50' : 'transparent' } }}
                            />
                          </TableCell>
                        ))}
                        <TableCell align="center">
                          <Typography fontWeight={600}>{rowTotal}</Typography>
                        </TableCell>
                        <TableCell>
                          <IconButton size="small" onClick={() => openEntryDialog(entry)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                  {/* Daily Totals Row */}
                  <TableRow sx={{ bgcolor: 'grey.100' }}>
                    <TableCell sx={{ fontWeight: 600 }}>Daily Total</TableCell>
                    {totalHoursByDay.map((total, i) => (
                      <TableCell key={i} align="center">
                        <Typography fontWeight={600} color={total > 8 ? 'warning.main' : 'text.primary'}>
                          {total}
                        </Typography>
                      </TableCell>
                    ))}
                    <TableCell align="center">
                      <Typography fontWeight={700} color="primary.main">{totalWeekHours}</Typography>
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Button startIcon={<AddIcon />} sx={{ mt: 2 }} onClick={() => openEntryDialog()}>
              Add Row
            </Button>
          </>
        )}

        {/* Approvals Tab */}
        {activeTab === 1 && (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>Pending Approvals</Typography>
              <Paper>
                {pendingApprovals.map((approval, i) => (
                  <Box key={approval.id}>
                    <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>{approval.avatar}</Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography fontWeight={500}>{approval.employee}</Typography>
                        <Typography variant="body2" color="text.secondary">{approval.weekOf}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                          <Typography variant="body2">{approval.totalHours}h total</Typography>
                          {approval.overtime && (
                            <Indicator label={`${approval.overtime}h OT`} status="warning" size="small" />
                          )}
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Approve">
                          <IconButton color="success" size="small">
                            <CheckIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Reject">
                          <IconButton color="error" size="small">
                            <CloseIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                    {i < pendingApprovals.length - 1 && <Divider />}
                  </Box>
                ))}
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>My Timesheet History</Typography>
              <Paper>
                {timesheetHistory.map((ts, i) => (
                  <Box key={ts.id}>
                    <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography fontWeight={500}>{ts.weekOf}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Submitted {ts.submittedDate} • Approved by {ts.approvedBy}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography fontWeight={600}>{ts.totalHours}h</Typography>
                        {ts.overtime && (
                          <Typography variant="caption" color="warning.main">+{ts.overtime}h OT</Typography>
                        )}
                      </Box>
                      <Indicator label="Approved" status="success" size="small" />
                    </Box>
                    {i < timesheetHistory.length - 1 && <Divider />}
                  </Box>
                ))}
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* Reports Tab */}
        {activeTab === 2 && (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>Hours by Project</Typography>
                <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.100', borderRadius: 1 }}>
                  <Typography color="text.secondary">Chart Placeholder</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>This Month</Typography>
                {projects.map(project => {
                  const projectHours = timeEntries
                    .filter(e => e.projectId === project.id)
                    .reduce((sum, e) => sum + e.hours.reduce((s, h) => s + h, 0), 0)
                  return (
                    <Box key={project.id} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">{project.name}</Typography>
                        <Typography variant="body2" fontWeight={600}>{projectHours}h</Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min((projectHours / 40) * 100, 100)}
                        sx={{ height: 8, borderRadius: 1, bgcolor: 'grey.200', '& .MuiLinearProgress-bar': { bgcolor: project.color } }}
                      />
                    </Box>
                  )
                })}
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>

      {/* Add/Edit Entry Dialog */}
      <Dialog open={entryDialogOpen} onClose={() => setEntryDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedEntry ? 'Edit Entry' : 'Add Time Entry'}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
            <InputLabel>Project</InputLabel>
            <Select label="Project" defaultValue={selectedEntry?.projectId || ''}>
              <MenuItem value="">No Project</MenuItem>
              {projects.map(p => (
                <MenuItem key={p.id} value={p.id}>{p.name} ({p.client})</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Task</InputLabel>
            <Select label="Task" defaultValue={selectedEntry?.taskId || ''}>
              {tasks.map(t => (
                <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Notes"
            multiline
            rows={2}
            defaultValue={selectedEntry?.notes || ''}
          />
        </DialogContent>
        <DialogActions>
          {selectedEntry && (
            <Button color="error" startIcon={<DeleteIcon />} sx={{ mr: 'auto' }}>
              Delete
            </Button>
          )}
          <Button onClick={() => setEntryDialogOpen(false)}>Cancel</Button>
          <Button variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Submit Timesheet Dialog */}
      <Dialog open={submitDialogOpen} onClose={() => setSubmitDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Submit Timesheet</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            You are about to submit your timesheet for the week of <strong>Nov 18 - Nov 24, 2024</strong>.
          </Typography>
          <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <Typography variant="body2" color="text.secondary">Total Hours</Typography>
                <Typography variant="h6" fontWeight={600}>{totalWeekHours}h</Typography>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Typography variant="body2" color="text.secondary">Overtime</Typography>
                <Typography variant="h6" fontWeight={600} color={overtime > 0 ? 'warning.main' : 'text.primary'}>
                  {overtime}h
                </Typography>
              </Grid>
            </Grid>
          </Paper>
          {overtime > 0 && (
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'flex-start', gap: 1 }}>
              <WarningIcon color="warning" fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                This timesheet includes {overtime} hours of overtime. Please ensure this has been pre-approved.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSubmitDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" startIcon={<SendIcon />}>Submit for Approval</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

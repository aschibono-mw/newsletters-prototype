import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  InputAdornment,
  Avatar,
  Card,
  CardContent,
  IconButton,
  Tabs,
  Tab,
  Divider,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  FormControl,
  InputLabel,
  Select,
  Collapse,
} from '@mui/material'
import Indicator from '../../components/core/Indicator'
import SearchIcon from '@mui/icons-material/SearchRounded'
import GridViewIcon from '@mui/icons-material/GridViewRounded'
import ViewListIcon from '@mui/icons-material/ViewListRounded'
import AccountTreeIcon from '@mui/icons-material/AccountTreeRounded'
import EmailIcon from '@mui/icons-material/EmailRounded'
import ChatIcon from '@mui/icons-material/ChatRounded'
import PhoneIcon from '@mui/icons-material/PhoneRounded'
import LocationOnIcon from '@mui/icons-material/LocationOnRounded'
import ExpandMoreIcon from '@mui/icons-material/ExpandMoreRounded'
import ExpandLessIcon from '@mui/icons-material/ExpandLessRounded'
import MoreVertIcon from '@mui/icons-material/MoreVertRounded'
import FileDownloadIcon from '@mui/icons-material/FileDownloadRounded'
import FilterListIcon from '@mui/icons-material/FilterListRounded'
import PersonIcon from '@mui/icons-material/PersonRounded'
import BusinessIcon from '@mui/icons-material/BusinessRounded'
import BadgeIcon from '@mui/icons-material/BadgeRounded'

const employees = [
  { id: 1, name: 'Sarah Chen', title: 'CEO', department: 'Executive', email: 'sarah.chen@company.com', phone: '+1 (555) 100-1001', location: 'San Francisco', manager: null, avatar: 'SC', status: 'active', direct_reports: 3 },
  { id: 2, name: 'Michael Rodriguez', title: 'VP Engineering', department: 'Engineering', email: 'michael.r@company.com', phone: '+1 (555) 100-1002', location: 'San Francisco', manager: 1, avatar: 'MR', status: 'active', direct_reports: 4 },
  { id: 3, name: 'Emily Watson', title: 'VP Product', department: 'Product', email: 'emily.w@company.com', phone: '+1 (555) 100-1003', location: 'New York', manager: 1, avatar: 'EW', status: 'active', direct_reports: 2 },
  { id: 4, name: 'David Kim', title: 'VP Sales', department: 'Sales', email: 'david.k@company.com', phone: '+1 (555) 100-1004', location: 'Chicago', manager: 1, avatar: 'DK', status: 'ooo', direct_reports: 3 },
  { id: 5, name: 'Lisa Park', title: 'Senior Engineer', department: 'Engineering', email: 'lisa.p@company.com', phone: '+1 (555) 100-1005', location: 'San Francisco', manager: 2, avatar: 'LP', status: 'active', direct_reports: 2 },
  { id: 6, name: 'James Liu', title: 'Senior Engineer', department: 'Engineering', email: 'james.l@company.com', phone: '+1 (555) 100-1006', location: 'San Francisco', manager: 2, avatar: 'JL', status: 'active', direct_reports: 0 },
  { id: 7, name: 'Anna Thompson', title: 'Engineering Manager', department: 'Engineering', email: 'anna.t@company.com', phone: '+1 (555) 100-1007', location: 'Austin', manager: 2, avatar: 'AT', status: 'active', direct_reports: 3 },
  { id: 8, name: 'Chris Taylor', title: 'Staff Engineer', department: 'Engineering', email: 'chris.t@company.com', phone: '+1 (555) 100-1008', location: 'Remote', manager: 2, avatar: 'CT', status: 'active', direct_reports: 0 },
  { id: 9, name: 'Rachel Green', title: 'Product Manager', department: 'Product', email: 'rachel.g@company.com', phone: '+1 (555) 100-1009', location: 'New York', manager: 3, avatar: 'RG', status: 'active', direct_reports: 0 },
  { id: 10, name: 'Mark Johnson', title: 'Senior PM', department: 'Product', email: 'mark.j@company.com', phone: '+1 (555) 100-1010', location: 'New York', manager: 3, avatar: 'MJ', status: 'ooo', direct_reports: 1 },
  { id: 11, name: 'Jennifer Davis', title: 'Account Executive', department: 'Sales', email: 'jennifer.d@company.com', phone: '+1 (555) 100-1011', location: 'Chicago', manager: 4, avatar: 'JD', status: 'active', direct_reports: 0 },
  { id: 12, name: 'Robert Wilson', title: 'Sales Manager', department: 'Sales', email: 'robert.w@company.com', phone: '+1 (555) 100-1012', location: 'Los Angeles', manager: 4, avatar: 'RW', status: 'active', direct_reports: 2 },
  { id: 13, name: 'Amanda White', title: 'SDR Lead', department: 'Sales', email: 'amanda.w@company.com', phone: '+1 (555) 100-1013', location: 'Chicago', manager: 4, avatar: 'AW', status: 'active', direct_reports: 4 },
  { id: 14, name: 'Kevin Brown', title: 'Software Engineer', department: 'Engineering', email: 'kevin.b@company.com', phone: '+1 (555) 100-1014', location: 'San Francisco', manager: 5, avatar: 'KB', status: 'active', direct_reports: 0 },
  { id: 15, name: 'Michelle Lee', title: 'Software Engineer', department: 'Engineering', email: 'michelle.l@company.com', phone: '+1 (555) 100-1015', location: 'Remote', manager: 5, avatar: 'ML', status: 'active', direct_reports: 0 },
]

const departments = ['All', 'Executive', 'Engineering', 'Product', 'Sales']
const locations = ['All', 'San Francisco', 'New York', 'Chicago', 'Austin', 'Los Angeles', 'Remote']

function OrgTreeNode({ employee, allEmployees, level = 0, expandedNodes, toggleNode }) {
  const directReports = allEmployees.filter(e => e.manager === employee.id)
  const hasReports = directReports.length > 0
  const isExpanded = expandedNodes.includes(employee.id)

  return (
    <Box sx={{ ml: level * 4 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          p: 1.5,
          borderRadius: 1,
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          mb: 1,
          cursor: hasReports ? 'pointer' : 'default',
          '&:hover': { backgroundColor: 'action.hover' },
        }}
        onClick={() => hasReports && toggleNode(employee.id)}
      >
        {hasReports && (
          <IconButton size="small" sx={{ p: 0 }}>
            {isExpanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
          </IconButton>
        )}
        {!hasReports && <Box sx={{ width: 24 }} />}
        <Avatar sx={{ width: 32, height: 32, fontSize: '0.75rem', bgcolor: 'primary.main' }}>
          {employee.avatar}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" fontWeight={600}>{employee.name}</Typography>
          <Typography variant="caption" color="text.secondary">{employee.title}</Typography>
        </Box>
        <Indicator label={employee.status === 'ooo' ? 'OOO' : 'Active'} status={employee.status === 'ooo' ? 'warning' : 'success'} />
      </Box>
      <Collapse in={isExpanded}>
        {directReports.map(report => (
          <OrgTreeNode
            key={report.id}
            employee={report}
            allEmployees={allEmployees}
            level={level + 1}
            expandedNodes={expandedNodes}
            toggleNode={toggleNode}
          />
        ))}
      </Collapse>
    </Box>
  )
}

export default function TeamDirectoryTemplate() {
  const [viewMode, setViewMode] = useState('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('All')
  const [selectedLocation, setSelectedLocation] = useState('All')
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [profileDialogOpen, setProfileDialogOpen] = useState(false)
  const [expandedNodes, setExpandedNodes] = useState([1, 2, 3, 4])
  const [anchorEl, setAnchorEl] = useState(null)

  const toggleNode = (id) => {
    setExpandedNodes(prev =>
      prev.includes(id) ? prev.filter(n => n !== id) : [...prev, id]
    )
  }

  const filteredEmployees = employees.filter(emp => {
    if (searchQuery && !emp.name.toLowerCase().includes(searchQuery.toLowerCase()) && !emp.email.toLowerCase().includes(searchQuery.toLowerCase()) && !emp.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    if (selectedDepartment !== 'All' && emp.department !== selectedDepartment) return false
    if (selectedLocation !== 'All' && emp.location !== selectedLocation) return false
    return true
  })

  const openProfile = (employee) => {
    setSelectedEmployee(employee)
    setProfileDialogOpen(true)
  }

  const getManager = (managerId) => employees.find(e => e.id === managerId)

  const rootEmployees = employees.filter(e => e.manager === null)

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* Header */}
      <Paper elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="xl" sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box>
              <Typography variant="h5" fontWeight={600}>Team Directory</Typography>
              <Typography variant="body2" color="text.secondary">
                {employees.length} employees across {departments.length - 1} departments
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<FileDownloadIcon />}
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                Export
              </Button>
            </Box>
          </Box>

          {/* Search and Filters */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              placeholder="Search by name, email, or title..."
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ width: 300 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Department</InputLabel>
              <Select
                value={selectedDepartment}
                label="Department"
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                {departments.map(dept => (
                  <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Location</InputLabel>
              <Select
                value={selectedLocation}
                label="Location"
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {locations.map(loc => (
                  <MenuItem key={loc} value={loc}>{loc}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ flex: 1 }} />
            <Tabs value={viewMode} onChange={(e, v) => setViewMode(v)} sx={{ '& .MuiTab-root': { textTransform: 'none' } }}>
              <Tab value="grid" icon={<GridViewIcon />} sx={{ minWidth: 48 }} />
              <Tab value="list" icon={<ViewListIcon />} sx={{ minWidth: 48 }} />
              <Tab value="org" icon={<AccountTreeIcon />} sx={{ minWidth: 48 }} />
            </Tabs>
          </Box>
        </Container>
      </Paper>

      {/* Content */}
      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* Grid View */}
        {viewMode === 'grid' && (
          <Grid container spacing={2}>
            {filteredEmployees.map(employee => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={employee.id}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    transition: 'box-shadow 0.2s',
                    '&:hover': { boxShadow: 4 },
                  }}
                  onClick={() => openProfile(employee)}
                >
                  <CardContent sx={{ textAlign: 'center', py: 3 }}>
                    <Avatar
                      sx={{
                        width: 64,
                        height: 64,
                        mx: 'auto',
                        mb: 2,
                        bgcolor: 'primary.main',
                        fontSize: '1.25rem',
                      }}
                    >
                      {employee.avatar}
                    </Avatar>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      {employee.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {employee.title}
                    </Typography>
                    <Indicator label={employee.department} color="info" />
                    <Box sx={{ mt: 2 }}>
                      <Indicator label={employee.status === 'ooo' ? 'Out of Office' : 'Available'} status={employee.status === 'ooo' ? 'warning' : 'success'} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
                      <IconButton size="small" onClick={(e) => { e.stopPropagation(); window.location.href = `mailto:${employee.email}` }}>
                        <EmailIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={(e) => e.stopPropagation()}>
                        <ChatIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <Paper>
            <List disablePadding>
              {filteredEmployees.map((employee, index) => (
                <Box key={employee.id}>
                  <ListItemButton onClick={() => openProfile(employee)} sx={{ py: 2 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>{employee.avatar}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography fontWeight={600}>{employee.name}</Typography>
                          <Indicator label={employee.status === 'ooo' ? 'OOO' : 'Active'} status={employee.status === 'ooo' ? 'warning' : 'success'} />
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
                          <Typography variant="body2" color="text.secondary">
                            {employee.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">•</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {employee.department}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">•</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {employee.location}
                          </Typography>
                        </Box>
                      }
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton size="small" onClick={(e) => { e.stopPropagation(); window.location.href = `mailto:${employee.email}` }}>
                        <EmailIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={(e) => e.stopPropagation()}>
                        <ChatIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={(e) => e.stopPropagation()}>
                        <PhoneIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </ListItemButton>
                  {index < filteredEmployees.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </Paper>
        )}

        {/* Org Chart View */}
        {viewMode === 'org' && (
          <Box sx={{ maxWidth: 800 }}>
            <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
              <Button
                size="small"
                variant="outlined"
                onClick={() => setExpandedNodes([1, 2, 3, 4, 5, 7, 10, 12, 13])}
              >
                Expand All
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={() => setExpandedNodes([])}
              >
                Collapse All
              </Button>
            </Box>
            {rootEmployees.map(employee => (
              <OrgTreeNode
                key={employee.id}
                employee={employee}
                allEmployees={employees}
                expandedNodes={expandedNodes}
                toggleNode={toggleNode}
              />
            ))}
          </Box>
        )}
      </Container>

      {/* Export Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => setAnchorEl(null)}>Export as CSV</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Export as PDF</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Export as Excel</MenuItem>
      </Menu>

      {/* Employee Profile Dialog */}
      <Dialog
        open={profileDialogOpen}
        onClose={() => setProfileDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        {selectedEmployee && (
          <>
            <DialogTitle sx={{ pb: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main', fontSize: '1.5rem' }}>
                  {selectedEmployee.avatar}
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight={600}>{selectedEmployee.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{selectedEmployee.title}</Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <Indicator label={selectedEmployee.status === 'ooo' ? 'Out of Office' : 'Available'} status={selectedEmployee.status === 'ooo' ? 'warning' : 'success'} />
                  </Box>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Divider sx={{ my: 2 }} />

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <EmailIcon color="action" fontSize="small" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">Email</Typography>
                      <Typography variant="body2">{selectedEmployee.email}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <PhoneIcon color="action" fontSize="small" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">Phone</Typography>
                      <Typography variant="body2">{selectedEmployee.phone}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOnIcon color="action" fontSize="small" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">Location</Typography>
                      <Typography variant="body2">{selectedEmployee.location}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <BusinessIcon color="action" fontSize="small" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">Department</Typography>
                      <Typography variant="body2">{selectedEmployee.department}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <PersonIcon color="action" fontSize="small" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">Reports To</Typography>
                      <Typography variant="body2">
                        {selectedEmployee.manager ? getManager(selectedEmployee.manager)?.name : 'None (CEO)'}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <BadgeIcon color="action" fontSize="small" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">Direct Reports</Typography>
                      <Typography variant="body2">{selectedEmployee.direct_reports}</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              {selectedEmployee.direct_reports > 0 && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                    Direct Reports
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {employees
                      .filter(e => e.manager === selectedEmployee.id)
                      .map(report => (
                        <Box
                          key={report.id}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            p: 1,
                            borderRadius: 1,
                            border: '1px solid',
                            borderColor: 'divider',
                            cursor: 'pointer',
                            '&:hover': { bgcolor: 'action.hover' },
                          }}
                          onClick={() => setSelectedEmployee(report)}
                        >
                          <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                            {report.avatar}
                          </Avatar>
                          <Typography variant="body2">{report.name}</Typography>
                        </Box>
                      ))}
                  </Box>
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setProfileDialogOpen(false)}>Close</Button>
              <Button variant="outlined" startIcon={<EmailIcon />}>
                Send Email
              </Button>
              <Button variant="contained" startIcon={<ChatIcon />}>
                Message
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  )
}

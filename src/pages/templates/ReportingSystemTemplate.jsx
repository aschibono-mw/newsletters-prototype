import { useState } from 'react'
import { Box, Container, Typography, Button, Card, CardContent, IconButton, TextField, Select, MenuItem, FormControl, InputLabel, Chip, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tabs, Tab, Drawer, Dialog, DialogTitle, DialogContent, DialogActions, Checkbox, FormControlLabel, Grid, Avatar, Menu, Tooltip, LinearProgress } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded'
import AddIcon from '@mui/icons-material/AddRounded'
import FolderIcon from '@mui/icons-material/FolderRounded'
import DescriptionIcon from '@mui/icons-material/DescriptionRounded'
import BarChartIcon from '@mui/icons-material/BarChartRounded'
import TableChartIcon from '@mui/icons-material/TableChartRounded'
import PieChartIcon from '@mui/icons-material/PieChartRounded'
import ShowChartIcon from '@mui/icons-material/ShowChartRounded'
import TextFieldsIcon from '@mui/icons-material/TextFieldsRounded'
import ImageIcon from '@mui/icons-material/ImageRounded'
import ScheduleIcon from '@mui/icons-material/ScheduleRounded'
import EmailIcon from '@mui/icons-material/EmailRounded'
import DownloadIcon from '@mui/icons-material/DownloadRounded'
import ShareIcon from '@mui/icons-material/ShareRounded'
import PlayArrowIcon from '@mui/icons-material/PlayArrowRounded'
import SaveIcon from '@mui/icons-material/SaveRounded'
import MoreVertIcon from '@mui/icons-material/MoreVertRounded'
import DragIndicatorIcon from '@mui/icons-material/DragIndicatorRounded'
import SettingsIcon from '@mui/icons-material/SettingsRounded'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeftRounded'
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenterRounded'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRightRounded'
import DeleteIcon from '@mui/icons-material/DeleteRounded'
import ContentCopyIcon from '@mui/icons-material/ContentCopyRounded'
import FilterListIcon from '@mui/icons-material/FilterListRounded'
import SearchIcon from '@mui/icons-material/SearchRounded'
import InputAdornment from '@mui/material/InputAdornment'
import StarIcon from '@mui/icons-material/StarRounded'
import StarBorderIcon from '@mui/icons-material/StarBorderRounded'
import CalendarTodayIcon from '@mui/icons-material/CalendarTodayRounded'
import CloseIcon from '@mui/icons-material/CloseRounded'

const reportFolders = [
  { id: 1, name: 'Sales Reports', count: 12 },
  { id: 2, name: 'Marketing Reports', count: 8 },
  { id: 3, name: 'Operations Reports', count: 15 },
  { id: 4, name: 'Finance Reports', count: 6 },
  { id: 5, name: 'My Reports', count: 4 },
]

const reports = [
  { id: 1, name: 'Monthly Sales Summary', type: 'Scheduled', lastRun: '2 hours ago', folder: 'Sales Reports', starred: true },
  { id: 2, name: 'Customer Acquisition Funnel', type: 'On-demand', lastRun: '1 day ago', folder: 'Marketing Reports', starred: true },
  { id: 3, name: 'Inventory Status Report', type: 'Scheduled', lastRun: '6 hours ago', folder: 'Operations Reports', starred: false },
  { id: 4, name: 'Revenue by Region', type: 'On-demand', lastRun: '3 days ago', folder: 'Sales Reports', starred: false },
  { id: 5, name: 'User Engagement Metrics', type: 'Scheduled', lastRun: '1 hour ago', folder: 'Marketing Reports', starred: false },
]

const dataSources = ['Sales', 'Customers', 'Products', 'Orders', 'Users', 'Transactions']

const sampleFields = [
  { name: 'customer_name', type: 'text' },
  { name: 'order_date', type: 'date' },
  { name: 'total_amount', type: 'currency' },
  { name: 'product_category', type: 'text' },
  { name: 'quantity', type: 'number' },
  { name: 'region', type: 'text' },
  { name: 'status', type: 'text' },
]

const componentTypes = [
  { id: 'table', name: 'Table', icon: <TableChartIcon /> },
  { id: 'bar', name: 'Bar Chart', icon: <BarChartIcon /> },
  { id: 'line', name: 'Line Chart', icon: <ShowChartIcon /> },
  { id: 'pie', name: 'Pie Chart', icon: <PieChartIcon /> },
  { id: 'text', name: 'Text Block', icon: <TextFieldsIcon /> },
  { id: 'image', name: 'Image', icon: <ImageIcon /> },
]

function ReportingSystemTemplate() {
  const [currentView, setCurrentView] = useState('library')
  const [selectedReport, setSelectedReport] = useState(null)
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [configDrawerOpen, setConfigDrawerOpen] = useState(false)
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false)
  const [newReportDialogOpen, setNewReportDialogOpen] = useState(false)
  const [exportMenuAnchor, setExportMenuAnchor] = useState(null)
  const [filterFolder, setFilterFolder] = useState('all')

  const reportComponents = [
    { id: 1, type: 'text', title: 'Monthly Sales Report', content: 'November 2024' },
    { id: 2, type: 'table', title: 'Sales by Region', columns: ['Region', 'Revenue', 'Growth'] },
    { id: 3, type: 'bar', title: 'Revenue Trend', data: [65, 72, 68, 80, 85, 92] },
    { id: 4, type: 'pie', title: 'Revenue by Category', data: [45, 28, 18, 9] },
  ]

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'grey.100' }}>
      {/* Header */}
      <Box sx={{ backgroundColor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', py: 2 }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button component={RouterLink} to="/templates" startIcon={<ArrowBackIcon />} sx={{ textTransform: 'none' }}>
                Back to Templates
              </Button>
              <Divider orientation="vertical" flexItem />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>Report Builder</Typography>
            </Box>
            {currentView === 'builder' ? (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="outlined" startIcon={<PlayArrowIcon />} sx={{ textTransform: 'none' }}>Preview</Button>
                <Button variant="outlined" startIcon={<ScheduleIcon />} onClick={() => setScheduleDialogOpen(true)} sx={{ textTransform: 'none' }}>Schedule</Button>
                <Button variant="outlined" startIcon={<DownloadIcon />} onClick={(e) => setExportMenuAnchor(e.currentTarget)} sx={{ textTransform: 'none' }}>Export</Button>
                <Button variant="contained" startIcon={<SaveIcon />} sx={{ textTransform: 'none' }}>Save</Button>
              </Box>
            ) : (
              <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={() => setNewReportDialogOpen(true)} sx={{ textTransform: 'none' }}>
                New Report
              </Button>
            )}
          </Box>
        </Container>
      </Box>

      {currentView === 'library' ? (
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Grid container spacing={3}>
            {/* Sidebar */}
            <Grid size={{ xs: 12, md: 3 }}>
              <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
                <CardContent sx={{ p: 2 }}>
                  <TextField
                    placeholder="Search reports..."
                    fullWidth
                    size="small"
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 20 }} /></InputAdornment>,
                    }}
                  />
                  <List disablePadding>
                    <ListItemButton
                      selected={filterFolder === 'all'}
                      onClick={() => setFilterFolder('all')}
                      sx={{ borderRadius: 1, mb: 0.5 }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}><DescriptionIcon sx={{ fontSize: 20 }} /></ListItemIcon>
                      <ListItemText primary="All Reports" primaryTypographyProps={{ variant: 'body2' }} />
                      <Typography variant="caption" color="text.secondary">45</Typography>
                    </ListItemButton>
                    <ListItemButton
                      selected={filterFolder === 'starred'}
                      onClick={() => setFilterFolder('starred')}
                      sx={{ borderRadius: 1, mb: 0.5 }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}><StarIcon sx={{ fontSize: 20, color: 'warning.main' }} /></ListItemIcon>
                      <ListItemText primary="Starred" primaryTypographyProps={{ variant: 'body2' }} />
                      <Typography variant="caption" color="text.secondary">2</Typography>
                    </ListItemButton>
                    <ListItemButton
                      selected={filterFolder === 'scheduled'}
                      onClick={() => setFilterFolder('scheduled')}
                      sx={{ borderRadius: 1, mb: 0.5 }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}><ScheduleIcon sx={{ fontSize: 20 }} /></ListItemIcon>
                      <ListItemText primary="Scheduled" primaryTypographyProps={{ variant: 'body2' }} />
                      <Typography variant="caption" color="text.secondary">3</Typography>
                    </ListItemButton>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="caption" color="text.secondary" sx={{ px: 1, fontWeight: 600 }}>FOLDERS</Typography>
                    {reportFolders.map((folder) => (
                      <ListItemButton
                        key={folder.id}
                        selected={filterFolder === folder.name}
                        onClick={() => setFilterFolder(folder.name)}
                        sx={{ borderRadius: 1, mb: 0.5 }}
                      >
                        <ListItemIcon sx={{ minWidth: 36 }}><FolderIcon sx={{ fontSize: 20 }} /></ListItemIcon>
                        <ListItemText primary={folder.name} primaryTypographyProps={{ variant: 'body2' }} />
                        <Typography variant="caption" color="text.secondary">{folder.count}</Typography>
                      </ListItemButton>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Reports List */}
            <Grid size={{ xs: 12, md: 9 }}>
              <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {filterFolder === 'all' ? 'All Reports' : filterFolder === 'starred' ? 'Starred Reports' : filterFolder}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <Select defaultValue="recent">
                        <MenuItem value="recent">Most Recent</MenuItem>
                        <MenuItem value="name">Name</MenuItem>
                        <MenuItem value="folder">Folder</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                <List disablePadding>
                  {reports.map((report, i) => (
                    <ListItem
                      key={report.id}
                      divider={i < reports.length - 1}
                      secondaryAction={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <IconButton size="small">
                            {report.starred ? <StarIcon sx={{ color: 'warning.main' }} /> : <StarBorderIcon />}
                          </IconButton>
                          <IconButton size="small"><MoreVertIcon /></IconButton>
                        </Box>
                      }
                      sx={{ '&:hover': { backgroundColor: 'action.hover' }, cursor: 'pointer' }}
                      onClick={() => { setSelectedReport(report); setCurrentView('builder') }}
                    >
                      <ListItemIcon sx={{ minWidth: 44 }}>
                        <Avatar sx={{ width: 36, height: 36, backgroundColor: 'primary.light', color: 'primary.main' }}>
                          <DescriptionIcon sx={{ fontSize: 20 }} />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={report.name}
                        secondary={
                          <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                            <Typography variant="caption" color="text.secondary">{report.folder}</Typography>
                            <Typography variant="caption" color="text.secondary">•</Typography>
                            <Typography variant="caption" color="text.secondary">Last run: {report.lastRun}</Typography>
                          </Box>
                        }
                        primaryTypographyProps={{ fontWeight: 500 }}
                        secondaryTypographyProps={{ component: 'div' }}
                      />
                      <Chip label={report.type} size="small" variant="outlined" sx={{ mr: 8 }} />
                    </ListItem>
                  ))}
                </List>
              </Card>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Box sx={{ display: 'flex', height: 'calc(100vh - 73px)' }}>
          {/* Components Panel */}
          <Box sx={{ width: 240, borderRight: '1px solid', borderColor: 'divider', backgroundColor: 'background.paper', overflow: 'auto' }}>
            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Components</Typography>
              <Grid container spacing={1}>
                {componentTypes.map((comp) => (
                  <Grid size={{ xs: 6 }} key={comp.id}>
                    <Box
                      draggable
                      sx={{
                        p: 2,
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'divider',
                        textAlign: 'center',
                        cursor: 'grab',
                        '&:hover': { borderColor: 'primary.main', backgroundColor: 'action.hover' },
                      }}
                    >
                      {comp.icon}
                      <Typography variant="caption" display="block">{comp.name}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Data Source</Typography>
              <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <Select defaultValue="Sales">
                  {dataSources.map((ds) => (
                    <MenuItem key={ds} value={ds}>{ds}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Available Fields</Typography>
              <List dense disablePadding>
                {sampleFields.map((field) => (
                  <ListItem key={field.name} disablePadding sx={{ mb: 0.5 }}>
                    <Box
                      draggable
                      sx={{
                        width: '100%',
                        p: 1,
                        borderRadius: 1,
                        backgroundColor: 'grey.50',
                        cursor: 'grab',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        '&:hover': { backgroundColor: 'grey.100' },
                      }}
                    >
                      <DragIndicatorIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2">{field.name}</Typography>
                      <Chip label={field.type} size="small" sx={{ ml: 'auto', height: 18, fontSize: 10 }} />
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>

          {/* Canvas */}
          <Box sx={{ flex: 1, backgroundColor: 'grey.100', overflow: 'auto', p: 4 }}>
            <Box sx={{ maxWidth: 800, mx: 'auto', backgroundColor: 'white', minHeight: '100%', boxShadow: 2, p: 4 }}>
              {/* Report Header */}
              <Box sx={{ mb: 4, pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{selectedReport?.name || 'New Report'}</Typography>
                <Typography variant="body2" color="text.secondary">Generated on {new Date().toLocaleDateString()}</Typography>
              </Box>

              {/* Report Components */}
              {reportComponents.map((comp) => (
                <Box
                  key={comp.id}
                  onClick={() => { setSelectedComponent(comp); setConfigDrawerOpen(true) }}
                  sx={{
                    mb: 3,
                    p: 2,
                    border: '1px dashed',
                    borderColor: selectedComponent?.id === comp.id ? 'primary.main' : 'transparent',
                    borderRadius: 1,
                    cursor: 'pointer',
                    '&:hover': { borderColor: 'grey.300' },
                  }}
                >
                  {comp.type === 'text' && (
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>{comp.title}</Typography>
                      <Typography variant="h6" color="text.secondary">{comp.content}</Typography>
                    </Box>
                  )}
                  {comp.type === 'table' && (
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>{comp.title}</Typography>
                      <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                        <Box sx={{ display: 'flex', backgroundColor: 'grey.50', borderBottom: '1px solid', borderColor: 'divider' }}>
                          {comp.columns.map((col) => (
                            <Box key={col} sx={{ flex: 1, p: 1.5, fontWeight: 600 }}>{col}</Box>
                          ))}
                        </Box>
                        {[1, 2, 3].map((row) => (
                          <Box key={row} sx={{ display: 'flex', borderBottom: row < 3 ? '1px solid' : 'none', borderColor: 'divider' }}>
                            {comp.columns.map((col) => (
                              <Box key={col} sx={{ flex: 1, p: 1.5, color: 'text.secondary' }}>Sample data</Box>
                            ))}
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  )}
                  {comp.type === 'bar' && (
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>{comp.title}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 150 }}>
                        {comp.data.map((val, i) => (
                          <Box key={i} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Box sx={{ width: '100%', height: `${val}%`, backgroundColor: 'primary.main', borderRadius: '4px 4px 0 0' }} />
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  )}
                  {comp.type === 'pie' && (
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>{comp.title}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Box sx={{ width: 120, height: 120, borderRadius: '50%', background: 'conic-gradient(#0891B2 0% 45%, #A21CAF 45% 73%, #10B981 73% 91%, #F59E0B 91% 100%)' }} />
                        <Box>
                          {[
                            { label: 'Electronics', value: '45%', color: 'primary' },
                            { label: 'Clothing', value: '28%', color: 'secondary' },
                            { label: 'Home', value: '18%', color: 'success' },
                            { label: 'Other', value: '9%', color: 'warning' },
                          ].map((item) => (
                            <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                              <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: `${item.color}.main` }} />
                              <Typography variant="body2">{item.label}: {item.value}</Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Box>
              ))}

              {/* Add Component Placeholder */}
              <Box sx={{ p: 4, border: '2px dashed', borderColor: 'grey.300', borderRadius: 1, textAlign: 'center', color: 'text.secondary' }}>
                <AddIcon sx={{ fontSize: 32, mb: 1 }} />
                <Typography>Drag components here or click to add</Typography>
              </Box>
            </Box>
          </Box>

          {/* Config Drawer */}
          <Drawer
            anchor="right"
            open={configDrawerOpen}
            onClose={() => setConfigDrawerOpen(false)}
            PaperProps={{ sx: { width: 320 } }}
          >
            <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Component Settings</Typography>
              <IconButton onClick={() => setConfigDrawerOpen(false)}><CloseIcon /></IconButton>
            </Box>
            <Box sx={{ p: 2 }}>
              <TextField label="Title" fullWidth size="small" defaultValue={selectedComponent?.title} sx={{ mb: 2 }} />

              {selectedComponent?.type === 'table' && (
                <>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Columns</Typography>
                  {selectedComponent.columns.map((col, i) => (
                    <Box key={i} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                      <TextField size="small" fullWidth defaultValue={col} />
                      <IconButton size="small"><DeleteIcon fontSize="small" /></IconButton>
                    </Box>
                  ))}
                  <Button startIcon={<AddIcon />} size="small" sx={{ textTransform: 'none' }}>Add Column</Button>
                </>
              )}

              {(selectedComponent?.type === 'bar' || selectedComponent?.type === 'line') && (
                <>
                  <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                    <InputLabel>X-Axis Field</InputLabel>
                    <Select label="X-Axis Field" defaultValue="date">
                      <MenuItem value="date">Date</MenuItem>
                      <MenuItem value="category">Category</MenuItem>
                      <MenuItem value="region">Region</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                    <InputLabel>Y-Axis Field</InputLabel>
                    <Select label="Y-Axis Field" defaultValue="revenue">
                      <MenuItem value="revenue">Revenue</MenuItem>
                      <MenuItem value="quantity">Quantity</MenuItem>
                      <MenuItem value="count">Count</MenuItem>
                    </Select>
                  </FormControl>
                </>
              )}

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Formatting</Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Tooltip title="Align Left"><IconButton size="small"><FormatAlignLeftIcon /></IconButton></Tooltip>
                <Tooltip title="Align Center"><IconButton size="small"><FormatAlignCenterIcon /></IconButton></Tooltip>
                <Tooltip title="Align Right"><IconButton size="small"><FormatAlignRightIcon /></IconButton></Tooltip>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="outlined" startIcon={<ContentCopyIcon />} fullWidth sx={{ textTransform: 'none' }}>Duplicate</Button>
                <Button variant="outlined" color="error" startIcon={<DeleteIcon />} fullWidth sx={{ textTransform: 'none' }}>Delete</Button>
              </Box>
            </Box>
          </Drawer>
        </Box>
      )}

      {/* Export Menu */}
      <Menu anchorEl={exportMenuAnchor} open={Boolean(exportMenuAnchor)} onClose={() => setExportMenuAnchor(null)}>
        <MenuItem onClick={() => setExportMenuAnchor(null)}>Export as PDF</MenuItem>
        <MenuItem onClick={() => setExportMenuAnchor(null)}>Export as Excel</MenuItem>
        <MenuItem onClick={() => setExportMenuAnchor(null)}>Export as CSV</MenuItem>
        <MenuItem onClick={() => setExportMenuAnchor(null)}>Export as PowerPoint</MenuItem>
      </Menu>

      {/* Schedule Dialog */}
      <Dialog open={scheduleDialogOpen} onClose={() => setScheduleDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Schedule Report</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Frequency</InputLabel>
              <Select label="Frequency" defaultValue="weekly">
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Time" type="time" defaultValue="08:00" fullWidth size="small" />
            <FormControl fullWidth size="small">
              <InputLabel>Timezone</InputLabel>
              <Select label="Timezone" defaultValue="est">
                <MenuItem value="utc">UTC</MenuItem>
                <MenuItem value="est">Eastern Time</MenuItem>
                <MenuItem value="pst">Pacific Time</MenuItem>
              </Select>
            </FormControl>
            <Divider />
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Delivery</Typography>
            <TextField label="Email Recipients" fullWidth size="small" placeholder="email@company.com" />
            <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Attach report as PDF" />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setScheduleDialogOpen(false)} sx={{ textTransform: 'none' }}>Cancel</Button>
          <Button variant="contained" onClick={() => setScheduleDialogOpen(false)} sx={{ textTransform: 'none' }}>Save Schedule</Button>
        </DialogActions>
      </Dialog>

      {/* New Report Dialog */}
      <Dialog open={newReportDialogOpen} onClose={() => setNewReportDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Report</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField label="Report Name" fullWidth size="small" />
            <TextField label="Description" fullWidth size="small" multiline rows={2} />
            <FormControl fullWidth size="small">
              <InputLabel>Folder</InputLabel>
              <Select label="Folder" defaultValue="">
                {reportFolders.map((folder) => (
                  <MenuItem key={folder.id} value={folder.name}>{folder.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel>Primary Data Source</InputLabel>
              <Select label="Primary Data Source" defaultValue="">
                {dataSources.map((ds) => (
                  <MenuItem key={ds} value={ds}>{ds}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewReportDialogOpen(false)} sx={{ textTransform: 'none' }}>Cancel</Button>
          <Button variant="contained" onClick={() => { setNewReportDialogOpen(false); setCurrentView('builder') }} sx={{ textTransform: 'none' }}>Create Report</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ReportingSystemTemplate

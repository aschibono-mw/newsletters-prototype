import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  IconButton,
  TextField,
  Avatar,
  AvatarGroup,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from '@mui/material'
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Add as AddIcon,
  EventSeat as SeatIcon,
  MeetingRoom as RoomIcon,
  DirectionsCar as CarIcon,
  Computer as EquipmentIcon,
  ViewWeek as WeekIcon,
  ViewDay as DayIcon,
  CalendarMonth as MonthIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Repeat as RepeatIcon,
  Groups as GroupsIcon,
} from '@mui/icons-material'
import Indicator from '../../components/core/Indicator'

// Mock data
const resourceTypes = [
  { id: 'rooms', label: 'Meeting Rooms', icon: RoomIcon, count: 12 },
  { id: 'desks', label: 'Hot Desks', icon: SeatIcon, count: 48 },
  { id: 'equipment', label: 'Equipment', icon: EquipmentIcon, count: 24 },
  { id: 'vehicles', label: 'Vehicles', icon: CarIcon, count: 8 },
]

const mockResources = {
  rooms: [
    { id: 1, name: 'Conference Room A', capacity: 12, floor: '3rd Floor', amenities: ['Video', 'Whiteboard', 'Phone'], image: null },
    { id: 2, name: 'Board Room', capacity: 20, floor: '5th Floor', amenities: ['Video', 'Whiteboard', 'Phone', 'Catering'], image: null },
    { id: 3, name: 'Huddle Space 1', capacity: 4, floor: '2nd Floor', amenities: ['TV', 'Whiteboard'], image: null },
    { id: 4, name: 'Training Room', capacity: 30, floor: '1st Floor', amenities: ['Projector', 'Microphone', 'Recording'], image: null },
  ],
  desks: [
    { id: 1, name: 'Desk A-101', zone: 'Zone A', floor: '2nd Floor', amenities: ['Monitor', 'Standing'] },
    { id: 2, name: 'Desk A-102', zone: 'Zone A', floor: '2nd Floor', amenities: ['Monitor'] },
    { id: 3, name: 'Desk B-201', zone: 'Zone B', floor: '3rd Floor', amenities: ['Dual Monitor', 'Standing'] },
  ],
  equipment: [
    { id: 1, name: 'Projector Sony VPL', category: 'AV Equipment', location: 'IT Storage' },
    { id: 2, name: 'Camera Kit A', category: 'Recording', location: 'Marketing' },
    { id: 3, name: 'Laptop Pool #1', category: 'Computers', location: 'IT Storage' },
  ],
  vehicles: [
    { id: 1, name: 'Company Van #1', type: 'Van', capacity: 8, plate: 'ABC-1234' },
    { id: 2, name: 'Sedan #1', type: 'Car', capacity: 4, plate: 'XYZ-5678' },
  ],
}

const timeSlots = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']

const mockBookings = [
  { id: 1, resourceId: 1, resourceType: 'rooms', title: 'Product Review', start: '9:00 AM', end: '10:00 AM', day: 1, user: 'Sarah Chen', attendees: 5, recurring: false },
  { id: 2, resourceId: 1, resourceType: 'rooms', title: 'Sprint Planning', start: '2:00 PM', end: '4:00 PM', day: 1, user: 'Mike Ross', attendees: 8, recurring: true },
  { id: 3, resourceId: 2, resourceType: 'rooms', title: 'Board Meeting', start: '10:00 AM', end: '12:00 PM', day: 2, user: 'Jane Doe', attendees: 12, recurring: false },
  { id: 4, resourceId: 3, resourceType: 'rooms', title: 'Quick Sync', start: '11:00 AM', end: '11:30 AM', day: 0, user: 'Tom Wilson', attendees: 3, recurring: true },
  { id: 5, resourceId: 1, resourceType: 'desks', title: 'Reserved', start: '8:00 AM', end: '5:00 PM', day: 0, user: 'Alex Kim', recurring: false },
  { id: 6, resourceId: 2, resourceType: 'desks', title: 'Reserved', start: '8:00 AM', end: '5:00 PM', day: 1, user: 'Emma Davis', recurring: true },
]

const myBookings = [
  { id: 1, resource: 'Conference Room A', date: 'Today', time: '9:00 AM - 10:00 AM', status: 'confirmed', type: 'rooms' },
  { id: 2, resource: 'Desk A-101', date: 'Tomorrow', time: '8:00 AM - 5:00 PM', status: 'confirmed', type: 'desks' },
  { id: 3, resource: 'Board Room', date: 'Nov 28', time: '2:00 PM - 4:00 PM', status: 'pending', type: 'rooms' },
  { id: 4, resource: 'Projector Sony VPL', date: 'Nov 29', time: '10:00 AM - 12:00 PM', status: 'confirmed', type: 'equipment' },
]

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

function ResourceBookingTemplate() {
  const [activeTab, setActiveTab] = useState(0)
  const [selectedType, setSelectedType] = useState('rooms')
  const [viewMode, setViewMode] = useState('week')
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false)
  const [selectedResource, setSelectedResource] = useState(null)
  const [, setSelectedSlot] = useState(null)

  const handleBookSlot = (resource, day, time) => {
    setSelectedResource(resource)
    setSelectedSlot({ day, time })
    setBookingDialogOpen(true)
  }

  const resources = mockResources[selectedType] || []

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* Header */}
      <Paper elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="xl" sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>Resource Booking</Typography>
              <Typography variant="body2" color="text.secondary">
                Book meeting rooms, desks, equipment, and more
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setBookingDialogOpen(true)}
            >
              New Booking
            </Button>
          </Box>
        </Container>
      </Paper>

      {/* Tabs */}
      <Container maxWidth="xl" sx={{ py: 3 }}>
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(e, v) => setActiveTab(v)}
          sx={{ borderBottom: 1, borderColor: 'divider', '& .MuiTab-root': { textTransform: 'none' } }}
        >
          <Tab label="Schedule View" />
          <Tab label="My Bookings" />
          <Tab label="Browse Resources" />
        </Tabs>
      </Paper>

      {/* Schedule View */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          {/* Resource Type Selector */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Resource Type</Typography>
              {resourceTypes.map((type) => {
                const Icon = type.icon
                return (
                  <Box
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      p: 1.5,
                      borderRadius: 1,
                      cursor: 'pointer',
                      backgroundColor: selectedType === type.id ? 'primary.50' : 'transparent',
                      border: 1,
                      borderColor: selectedType === type.id ? 'primary.main' : 'transparent',
                      mb: 1,
                      '&:hover': { backgroundColor: selectedType === type.id ? 'primary.50' : 'grey.100' },
                    }}
                  >
                    <Icon sx={{ color: selectedType === type.id ? 'primary.main' : 'text.secondary' }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: selectedType === type.id ? 600 : 400 }}>
                        {type.label}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {type.count} available
                      </Typography>
                    </Box>
                  </Box>
                )
              })}
            </Paper>
          </Grid>

          {/* Calendar Grid */}
          <Grid size={{ xs: 12, md: 9 }}>
            <Paper sx={{ p: 2 }}>
              {/* Calendar Header */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton size="small"><ChevronLeftIcon /></IconButton>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, minWidth: 200, textAlign: 'center' }}>
                    November 25 - 29, 2024
                  </Typography>
                  <IconButton size="small"><ChevronRightIcon /></IconButton>
                  <Button size="small" sx={{ ml: 2 }}>Today</Button>
                </Box>
                <ToggleButtonGroup
                  value={viewMode}
                  exclusive
                  onChange={(e, v) => v && setViewMode(v)}
                  size="small"
                >
                  <ToggleButton value="day"><DayIcon fontSize="small" /></ToggleButton>
                  <ToggleButton value="week"><WeekIcon fontSize="small" /></ToggleButton>
                  <ToggleButton value="month"><MonthIcon fontSize="small" /></ToggleButton>
                </ToggleButtonGroup>
              </Box>

              {/* Schedule Grid */}
              <TableContainer sx={{ maxHeight: 500 }}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ width: 150, fontWeight: 600, backgroundColor: 'grey.50' }}>Resource</TableCell>
                      {weekDays.map((day, i) => (
                        <TableCell key={day} align="center" sx={{ fontWeight: 600, backgroundColor: 'grey.50' }}>
                          <Typography variant="caption" color="text.secondary">{day}</Typography>
                          <Typography variant="body2">{25 + i}</Typography>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {resources.map((resource) => (
                      <TableRow key={resource.id}>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>{resource.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {resource.capacity ? `${resource.capacity} people` : resource.zone || resource.category}
                          </Typography>
                        </TableCell>
                        {weekDays.map((day, dayIndex) => {
                          const dayBookings = mockBookings.filter(b =>
                            b.resourceId === resource.id &&
                            b.resourceType === selectedType &&
                            b.day === dayIndex
                          )
                          return (
                            <TableCell
                              key={day}
                              sx={{
                                height: 80,
                                p: 0.5,
                                cursor: 'pointer',
                                '&:hover': { backgroundColor: 'grey.50' },
                              }}
                              onClick={() => !dayBookings.length && handleBookSlot(resource, dayIndex, '9:00 AM')}
                            >
                              {dayBookings.length > 0 ? (
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                  {dayBookings.map((booking) => (
                                    <Tooltip key={booking.id} title={`${booking.title} - ${booking.user}`}>
                                      <Box
                                        sx={{
                                          backgroundColor: 'primary.main',
                                          color: 'white',
                                          borderRadius: 0.5,
                                          p: 0.5,
                                          fontSize: 11,
                                        }}
                                      >
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                          <Typography variant="caption" sx={{ fontWeight: 500, color: 'inherit' }} noWrap>
                                            {booking.title}
                                          </Typography>
                                          {booking.recurring && <RepeatIcon sx={{ fontSize: 10 }} />}
                                        </Box>
                                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', fontSize: 10 }}>
                                          {booking.start} - {booking.end}
                                        </Typography>
                                      </Box>
                                    </Tooltip>
                                  ))}
                                </Box>
                              ) : (
                                <Box
                                  sx={{
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'text.disabled',
                                    fontSize: 11,
                                  }}
                                >
                                  Available
                                </Box>
                              )}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* My Bookings */}
      {activeTab === 1 && (
        <Paper sx={{ p: 0 }}>
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>My Upcoming Bookings</Typography>
            <Chip label={`${myBookings.length} bookings`} size="small" />
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Resource</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myBookings.map((booking) => {
                  const TypeIcon = resourceTypes.find(t => t.id === booking.type)?.icon || RoomIcon
                  return (
                    <TableRow key={booking.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar sx={{ width: 36, height: 36, backgroundColor: 'primary.50' }}>
                            <TypeIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                          </Avatar>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>{booking.resource}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{booking.date}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <TimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2">{booking.time}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Indicator
                          label={booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                          status={booking.status === 'confirmed' ? 'success' : 'warning'}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small"><EditIcon fontSize="small" /></IconButton>
                        <IconButton size="small" color="error"><DeleteIcon fontSize="small" /></IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* Browse Resources */}
      {activeTab === 2 && (
        <Grid container spacing={3}>
          {resourceTypes.map((type) => {
            const Icon = type.icon
            const typeResources = mockResources[type.id] || []
            return (
              <Grid size={{ xs: 12 }} key={type.id}>
                <Paper sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Icon sx={{ color: 'primary.main' }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{type.label}</Typography>
                    <Chip label={typeResources.length} size="small" sx={{ ml: 1 }} />
                  </Box>
                  <Grid container spacing={2}>
                    {typeResources.map((resource) => (
                      <Grid size={{ xs: 12, sm: 6, md: 3 }} key={resource.id}>
                        <Paper
                          variant="outlined"
                          sx={{
                            p: 2,
                            cursor: 'pointer',
                            '&:hover': { borderColor: 'primary.main', backgroundColor: 'primary.50' },
                          }}
                          onClick={() => {
                            setSelectedResource(resource)
                            setSelectedType(type.id)
                            setBookingDialogOpen(true)
                          }}
                        >
                          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>{resource.name}</Typography>
                          {resource.capacity && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                              <GroupsIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                              <Typography variant="caption" color="text.secondary">{resource.capacity} people</Typography>
                            </Box>
                          )}
                          {resource.floor && (
                            <Typography variant="caption" color="text.secondary" display="block">{resource.floor}</Typography>
                          )}
                          {resource.zone && (
                            <Typography variant="caption" color="text.secondary" display="block">{resource.zone} • {resource.floor}</Typography>
                          )}
                          {resource.amenities && (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                              {resource.amenities.slice(0, 3).map((amenity) => (
                                <Chip key={amenity} label={amenity} size="small" sx={{ height: 20, fontSize: 10 }} />
                              ))}
                            </Box>
                          )}
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Grid>
            )
          })}
        </Grid>
      )}
      </Container>

      {/* Booking Dialog */}
      <Dialog open={bookingDialogOpen} onClose={() => setBookingDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedResource ? `Book ${selectedResource.name}` : 'New Booking'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            {!selectedResource && (
              <>
                <FormControl fullWidth size="small">
                  <InputLabel>Resource Type</InputLabel>
                  <Select label="Resource Type" defaultValue="rooms">
                    {resourceTypes.map((type) => (
                      <MenuItem key={type.id} value={type.id}>{type.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth size="small">
                  <InputLabel>Resource</InputLabel>
                  <Select label="Resource" defaultValue="">
                    {mockResources.rooms.map((r) => (
                      <MenuItem key={r.id} value={r.id}>{r.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}
            <TextField
              label="Booking Title"
              size="small"
              fullWidth
              placeholder="e.g., Team Meeting, Client Call"
            />
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label="Date"
                  type="date"
                  size="small"
                  fullWidth
                  defaultValue="2024-11-25"
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </Grid>
              <Grid size={{ xs: 3 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Start</InputLabel>
                  <Select label="Start" defaultValue="9:00 AM">
                    {timeSlots.map((time) => (
                      <MenuItem key={time} value={time}>{time}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 3 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>End</InputLabel>
                  <Select label="End" defaultValue="10:00 AM">
                    {timeSlots.map((time) => (
                      <MenuItem key={time} value={time}>{time}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <TextField
              label="Attendees"
              size="small"
              fullWidth
              placeholder="Add attendees by email"
            />
            <TextField
              label="Notes"
              size="small"
              fullWidth
              multiline
              rows={2}
              placeholder="Any special requirements..."
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBookingDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setBookingDialogOpen(false)}>
            Book Now
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ResourceBookingTemplate

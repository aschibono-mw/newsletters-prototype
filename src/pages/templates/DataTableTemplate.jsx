import { useState } from 'react'
import { Box, Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, IconButton, Avatar, Menu, MenuItem, FormControl, Select, Pagination, Drawer, Divider, Tooltip, TextField, InputAdornment, Badge } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import Indicator from '../../components/core/Indicator'
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded'
import SearchIcon from '@mui/icons-material/SearchRounded'
import FilterListIcon from '@mui/icons-material/FilterListRounded'
import MoreVertIcon from '@mui/icons-material/MoreVertRounded'
import AddIcon from '@mui/icons-material/AddRounded'
import DeleteIcon from '@mui/icons-material/DeleteRounded'
import EditIcon from '@mui/icons-material/EditRounded'
import FileDownloadIcon from '@mui/icons-material/FileDownloadRounded'
import RefreshIcon from '@mui/icons-material/RefreshRounded'
import ViewColumnIcon from '@mui/icons-material/ViewColumnRounded'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUpRounded'
import CloseIcon from '@mui/icons-material/CloseRounded'

const users = [
  { id: 1, name: 'John Smith', email: 'john@example.com', role: 'Admin', status: 'Active', department: 'Engineering', lastLogin: '2 hours ago' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'User', status: 'Active', department: 'Design', lastLogin: '1 day ago' },
  { id: 3, name: 'Mike Brown', email: 'mike@example.com', role: 'User', status: 'Inactive', department: 'Marketing', lastLogin: '5 days ago' },
  { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'Manager', status: 'Active', department: 'Sales', lastLogin: '3 hours ago' },
  { id: 5, name: 'Alex Wilson', email: 'alex@example.com', role: 'User', status: 'Pending', department: 'Engineering', lastLogin: 'Never' },
  { id: 6, name: 'Lisa Chen', email: 'lisa@example.com', role: 'Admin', status: 'Active', department: 'Operations', lastLogin: '1 hour ago' },
  { id: 7, name: 'David Lee', email: 'david@example.com', role: 'User', status: 'Active', department: 'Engineering', lastLogin: '30 min ago' },
  { id: 8, name: 'Rachel Green', email: 'rachel@example.com', role: 'Manager', status: 'Active', department: 'HR', lastLogin: '2 days ago' },
  { id: 9, name: 'Chris Taylor', email: 'chris@example.com', role: 'User', status: 'Inactive', department: 'Finance', lastLogin: '1 week ago' },
  { id: 10, name: 'Amanda White', email: 'amanda@example.com', role: 'User', status: 'Active', department: 'Support', lastLogin: '4 hours ago' },
]

const departments = ['All', 'Engineering', 'Design', 'Marketing', 'Sales', 'Operations', 'HR', 'Finance', 'Support']
const roles = ['All', 'Admin', 'Manager', 'User']
const statuses = ['All', 'Active', 'Inactive', 'Pending']

function DataTableTemplate() {
  const [selected, setSelected] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [sortField, setSortField] = useState('name')
  const [sortDirection, setSortDirection] = useState('asc')
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [filters, setFilters] = useState({ department: 'All', role: 'All', status: 'All' })

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(users.map((u) => u.id))
    } else {
      setSelected([])
    }
  }

  const handleSelectOne = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id))
    } else {
      setSelected([...selected, id])
    }
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const filteredUsers = users.filter((user) => {
    if (searchQuery && !user.name.toLowerCase().includes(searchQuery.toLowerCase()) && !user.email.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    if (filters.department !== 'All' && user.department !== filters.department) return false
    if (filters.role !== 'All' && user.role !== filters.role) return false
    if (filters.status !== 'All' && user.status !== filters.status) return false
    return true
  })

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aVal = a[sortField]
    const bVal = b[sortField]
    if (sortDirection === 'asc') {
      return aVal > bVal ? 1 : -1
    }
    return aVal < bVal ? 1 : -1
  })

  const activeFilterCount = Object.values(filters).filter((v) => v !== 'All').length

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'grey.100' }}>
      {/* Header */}
      <Box sx={{ backgroundColor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', px: 3, py: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Button component={RouterLink} to="/templates" startIcon={<ArrowBackIcon />} sx={{ mb: 1, ml: -1, textTransform: 'none' }}>
              Back to Templates
            </Button>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>Users</Typography>
            <Typography variant="body2" color="text.secondary">Manage your organization's users and permissions</Typography>
          </Box>
          <Button variant="contained" color="secondary" startIcon={<AddIcon />} sx={{ textTransform: 'none' }}>
            Add User
          </Button>
        </Box>
      </Box>
      <Box sx={{ p: 3 }}>
        <Paper sx={{ mb: 2 }}>
        {/* Toolbar */}
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <TextField
            placeholder="Search users..."
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: 300 }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 20, color: 'text.secondary' }} /></InputAdornment>,
            }}
          />
          <Badge badgeContent={activeFilterCount} color="primary">
            <Button variant="outlined" startIcon={<FilterListIcon />} onClick={() => setFilterDrawerOpen(true)} sx={{ textTransform: 'none' }}>
              Filters
            </Button>
          </Badge>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Refresh">
            <IconButton><RefreshIcon /></IconButton>
          </Tooltip>
          <Tooltip title="Export">
            <IconButton><FileDownloadIcon /></IconButton>
          </Tooltip>
          <Tooltip title="Columns">
            <IconButton><ViewColumnIcon /></IconButton>
          </Tooltip>
        </Box>

          {/* Bulk Actions */}
          {selected.length > 0 && (
            <Box sx={{ px: 2, py: 1, backgroundColor: 'primary.light', display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{selected.length} selected</Typography>
              <Button size="small" startIcon={<DeleteIcon />} color="error" sx={{ textTransform: 'none' }}>Delete</Button>
              <Button size="small" sx={{ textTransform: 'none' }}>Change Role</Button>
              <Button size="small" sx={{ textTransform: 'none' }}>Export</Button>
            </Box>
          )}

          {/* Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={selected.length > 0 && selected.length < users.length}
                      checked={selected.length === users.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  {['Name', 'Email', 'Role', 'Department', 'Status', 'Last Login'].map((header) => (
                    <TableCell
                      key={header}
                      onClick={() => handleSort(header.toLowerCase().replace(' ', ''))}
                      sx={{ cursor: 'pointer', fontWeight: 600, '&:hover': { backgroundColor: 'grey.100' } }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {header}
                        {sortField === header.toLowerCase().replace(' ', '') && (
                          sortDirection === 'asc' ? <KeyboardArrowUpIcon sx={{ fontSize: 18 }} /> : <KeyboardArrowDownIcon sx={{ fontSize: 18 }} />
                        )}
                      </Box>
                    </TableCell>
                  ))}
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedUsers.map((user) => (
                  <TableRow key={user.id} hover selected={selected.includes(user.id)}>
                    <TableCell padding="checkbox">
                      <Checkbox checked={selected.includes(user.id)} onChange={() => handleSelectOne(user.id)} />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ width: 36, height: 36, fontSize: '0.875rem' }}>{user.name.split(' ').map((n) => n[0]).join('')}</Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>{user.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Indicator label={user.role} status={user.role} />
                    </TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>
                      <Indicator label={user.status} status={user.status} />
                    </TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" color="text.secondary">Rows per page:</Typography>
              <FormControl size="small">
                <Select value={rowsPerPage} onChange={(e) => setRowsPerPage(e.target.value)} sx={{ minWidth: 70 }}>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={100}>100</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Showing 1-{Math.min(rowsPerPage, filteredUsers.length)} of {filteredUsers.length}
            </Typography>
            <Pagination count={Math.ceil(filteredUsers.length / rowsPerPage)} page={page} onChange={(_, p) => setPage(p)} />
          </Box>
        </Paper>

        {/* Actions Menu */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={() => setAnchorEl(null)}>
            <EditIcon sx={{ mr: 1, fontSize: 18 }} /> Edit
          </MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>
            <DeleteIcon sx={{ mr: 1, fontSize: 18 }} color="error" /> Delete
          </MenuItem>
        </Menu>

        {/* Filter Drawer */}
        <Drawer anchor="right" open={filterDrawerOpen} onClose={() => setFilterDrawerOpen(false)}>
          <Box sx={{ width: 320, p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>Filters</Typography>
              <IconButton onClick={() => setFilterDrawerOpen(false)}><CloseIcon /></IconButton>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Department</Typography>
              <FormControl fullWidth size="small">
                <Select value={filters.department} onChange={(e) => setFilters({ ...filters, department: e.target.value })}>
                  {departments.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Role</Typography>
              <FormControl fullWidth size="small">
                <Select value={filters.role} onChange={(e) => setFilters({ ...filters, role: e.target.value })}>
                  {roles.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Status</Typography>
              <FormControl fullWidth size="small">
                <Select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
                  {statuses.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                </Select>
              </FormControl>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="outlined" fullWidth onClick={() => setFilters({ department: 'All', role: 'All', status: 'All' })} sx={{ textTransform: 'none' }}>
                Clear All
              </Button>
              <Button variant="contained" fullWidth onClick={() => setFilterDrawerOpen(false)} sx={{ textTransform: 'none' }}>
                Apply
              </Button>
            </Box>
          </Box>
        </Drawer>
      </Box>
    </Box>
  )
}

export default DataTableTemplate

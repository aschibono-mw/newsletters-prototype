import { useState } from 'react'
import {
  Box,
  Typography,
  InputBase,
  Link,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  Stack,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import AddIcon from '@mui/icons-material/Add'
import EditOutlined from '@mui/icons-material/EditOutlined'
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'
import CloseIcon from '@mui/icons-material/Close'
import Indicator from '../components/core/Indicator'

const INITIAL_ITEMS = [
  { id: 1, name: 'Q4 Planning Document', type: 'Document', status: 'Active', updated: '2 hours ago' },
  { id: 2, name: 'Marketing Campaign', type: 'Project', status: 'Active', updated: '4 hours ago' },
  { id: 3, name: 'User Research Notes', type: 'Document', status: 'Draft', updated: 'Yesterday' },
  { id: 4, name: 'Product Roadmap', type: 'Project', status: 'Active', updated: 'Yesterday' },
  { id: 5, name: 'Design System Audit', type: 'Task', status: 'Completed', updated: '2 days ago' },
  { id: 6, name: 'Sprint Retrospective', type: 'Document', status: 'Active', updated: '3 days ago' },
  { id: 7, name: 'API Integration', type: 'Task', status: 'In Progress', updated: '3 days ago' },
  { id: 8, name: 'Customer Feedback', type: 'Document', status: 'Draft', updated: '1 week ago' },
]

// eslint-disable-next-line no-unused-vars
function HubPage({ chatOpen: _chatOpen = false }) {
  const [items, setItems] = useState(INITIAL_ITEMS)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItems, setSelectedItems] = useState([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({ name: '', type: 'Document' })
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

  const filteredItems = searchQuery
    ? items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : items

  const handleSelectAll = (e) => {
    setSelectedItems(e.target.checked ? filteredItems.map(item => item.id) : [])
  }

  const handleSelectOne = (id) => {
    setSelectedItems(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const openDialog = (item = null) => {
    setEditingItem(item)
    setFormData(item ? { name: item.name, type: item.type } : { name: '', type: 'Document' })
    setDialogOpen(true)
  }

  const closeDialog = () => {
    setDialogOpen(false)
    setEditingItem(null)
    setFormData({ name: '', type: 'Document' })
  }

  const handleSave = () => {
    if (!formData.name.trim()) return

    if (editingItem) {
      setItems(prev => prev.map(item =>
        item.id === editingItem.id ? { ...item, name: formData.name, type: formData.type } : item
      ))
      setSnackbar({ open: true, message: `${formData.name} updated` })
    } else {
      const newItem = {
        id: Math.max(...items.map(i => i.id), 0) + 1,
        name: formData.name,
        type: formData.type,
        status: 'Draft',
        updated: 'Just now',
      }
      setItems(prev => [newItem, ...prev])
      setSnackbar({ open: true, message: `${formData.name} created` })
    }
    closeDialog()
  }

  const handleDelete = (id) => {
    const item = items.find(i => i.id === id)
    if (window.confirm(`Delete "${item?.name}"?`)) {
      setItems(prev => prev.filter(i => i.id !== id))
      setSelectedItems(prev => prev.filter(x => x !== id))
      setSnackbar({ open: true, message: `${item?.name} deleted` })
    }
  }

  const quickAccess = [
    { title: 'Recent Files', icon: <DescriptionOutlinedIcon sx={{ fontSize: 20 }} /> },
    { title: 'My Tasks', icon: <AssignmentOutlinedIcon sx={{ fontSize: 20 }} /> },
    { title: 'Projects', icon: <FolderOutlinedIcon sx={{ fontSize: 20 }} /> },
  ]

  return (
    <Box sx={{ width: '100%' }}>
      {/* Hero Section - Centered */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: 3,
          pb: 4,
          backgroundColor: 'background.paper',
          px: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
          Welcome to Hub
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
          Search, browse, and manage your content
        </Typography>

        {/* Search Bar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            px: 2,
            py: 1,
            width: '100%',
            maxWidth: 600,
            backgroundColor: 'background.paper',
            mb: 2,
          }}
        >
          <SearchIcon sx={{ fontSize: 20, color: 'text.secondary', mr: 1.5 }} />
          <InputBase
            placeholder="Search for files, projects, or tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ flex: 1, fontSize: 14 }}
          />
        </Box>

        {/* Help Link */}
        <Link
          href="#"
          underline="hover"
          sx={{ fontSize: 14, color: 'text.secondary' }}
        >
          Need help getting started?
        </Link>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          backgroundColor: 'grey.100',
          minHeight: 'calc(100vh - 280px)',
          px: 3,
          py: 4,
        }}
      >
        <Box
          sx={{
            maxWidth: 1200,
            mx: 'auto',
          }}
        >
          {/* Quick Access Cards */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Quick Access
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                gap: 2,
              }}
            >
              {quickAccess.map((item, i) => (
                <Card
                  key={i}
                  sx={{
                    backgroundColor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow: 'none',
                    cursor: 'pointer',
                    '&:hover': { borderColor: 'primary.main' },
                  }}
                >
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 }, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        backgroundColor: 'primary.light',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'primary.dark',
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {item.title}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>

          {/* CRUD Table */}
          <Box>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                All Items
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<AddIcon />}
                onClick={() => openDialog()}
                sx={{ textTransform: 'none', fontWeight: 500 }}
              >
                New Item
              </Button>
            </Stack>

            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'grey.100' }}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={selectedItems.length > 0 && selectedItems.length < filteredItems.length}
                        checked={filteredItems.length > 0 && selectedItems.length === filteredItems.length}
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Updated</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredItems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} sx={{ textAlign: 'center', py: 6 }}>
                        <Typography color="text.secondary">No items found</Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredItems.map((item) => (
                      <TableRow
                        key={item.id}
                        hover
                        selected={selectedItems.includes(item.id)}
                        sx={{
                          '& .action-buttons': { opacity: 0 },
                          '&:hover .action-buttons': { opacity: 1 },
                        }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleSelectOne(item.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>{item.name}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">{item.type}</Typography>
                        </TableCell>
                        <TableCell>
                          <Indicator label={item.status} status={item.status} size="small" />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">{item.updated}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Stack direction="row" spacing={0.5} className="action-buttons">
                            <Tooltip title="Edit">
                              <IconButton size="small" onClick={() => openDialog(item)}>
                                <EditOutlined fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton size="small" onClick={() => handleDelete(item.id)}>
                                <DeleteOutlined fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              {filteredItems.length > 0 && (
                <Box sx={{ p: 1.5, borderTop: '1px solid', borderColor: 'divider', backgroundColor: 'grey.50' }}>
                  <Typography variant="caption" color="text.secondary">
                    {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
                  </Typography>
                </Box>
              )}
            </TableContainer>
          </Box>
        </Box>
      </Box>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={closeDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {editingItem ? 'Edit Item' : 'New Item'}
            </Typography>
            <IconButton size="small" onClick={closeDialog}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              autoFocus
            />
            <TextField
              fullWidth
              select
              label="Type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              SelectProps={{ native: true }}
            >
              <option value="Document">Document</option>
              <option value="Project">Project</option>
              <option value="Task">Task</option>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={closeDialog} sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!formData.name.trim()}
            sx={{ textTransform: 'none' }}
          >
            {editingItem ? 'Save' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Box>
  )
}

export default HubPage

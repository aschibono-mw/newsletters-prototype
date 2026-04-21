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
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Tabs,
  Tab,
  Alert,
  InputAdornment,
  Collapse,
} from '@mui/material'
import Indicator from '../../components/core/Indicator'
import InventoryIcon from '@mui/icons-material/Inventory2Rounded'
import AddIcon from '@mui/icons-material/AddRounded'
import RemoveIcon from '@mui/icons-material/RemoveRounded'
import EditIcon from '@mui/icons-material/EditRounded'
import DeleteIcon from '@mui/icons-material/DeleteRounded'
import SearchIcon from '@mui/icons-material/SearchRounded'
import WarningIcon from '@mui/icons-material/WarningRounded'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScannerRounded'
import HistoryIcon from '@mui/icons-material/HistoryRounded'
import LocalShippingIcon from '@mui/icons-material/LocalShippingRounded'
import ExpandMoreIcon from '@mui/icons-material/ExpandMoreRounded'
import ExpandLessIcon from '@mui/icons-material/ExpandLessRounded'
import TrendingUpIcon from '@mui/icons-material/TrendingUpRounded'
import TrendingDownIcon from '@mui/icons-material/TrendingDownRounded'
import LocationOnIcon from '@mui/icons-material/LocationOnRounded'
import CategoryIcon from '@mui/icons-material/CategoryRounded'
import AttachMoneyIcon from '@mui/icons-material/AttachMoneyRounded'

const mockProducts = [
  {
    id: 1,
    sku: 'SKU-001',
    name: 'Widget Pro X1',
    category: 'Electronics',
    currentStock: 45,
    reorderPoint: 50,
    reorderQty: 100,
    warehouse: 'Warehouse A',
    unitCost: 24.99,
    status: 'low',
  },
  {
    id: 2,
    sku: 'SKU-002',
    name: 'Gadget Plus 2000',
    category: 'Electronics',
    currentStock: 230,
    reorderPoint: 100,
    reorderQty: 200,
    warehouse: 'Warehouse A',
    unitCost: 149.99,
    status: 'normal',
  },
  {
    id: 3,
    sku: 'SKU-003',
    name: 'Component Kit Basic',
    category: 'Parts',
    currentStock: 12,
    reorderPoint: 25,
    reorderQty: 50,
    warehouse: 'Warehouse B',
    unitCost: 8.50,
    status: 'critical',
  },
  {
    id: 4,
    sku: 'SKU-004',
    name: 'Premium Cable Set',
    category: 'Accessories',
    currentStock: 500,
    reorderPoint: 200,
    reorderQty: 500,
    warehouse: 'Warehouse A',
    unitCost: 12.99,
    status: 'normal',
  },
  {
    id: 5,
    sku: 'SKU-005',
    name: 'Power Supply Unit',
    category: 'Electronics',
    currentStock: 0,
    reorderPoint: 30,
    reorderQty: 60,
    warehouse: 'Warehouse B',
    unitCost: 45.00,
    status: 'out',
  },
]

const mockHistory = [
  { id: 1, sku: 'SKU-001', action: 'Removed', quantity: 10, note: 'Customer order #12345', user: 'Sarah Chen', date: '2024-11-20 14:30' },
  { id: 2, sku: 'SKU-002', action: 'Added', quantity: 50, note: 'PO #9876 received', user: 'Mike Rodriguez', date: '2024-11-20 10:15' },
  { id: 3, sku: 'SKU-003', action: 'Removed', quantity: 5, note: 'Manufacturing use', user: 'Emily Watson', date: '2024-11-19 16:45' },
  { id: 4, sku: 'SKU-004', action: 'Added', quantity: 200, note: 'PO #9875 received', user: 'James Liu', date: '2024-11-19 09:00' },
]

const mockPurchaseOrders = [
  { id: 'PO-2024-001', products: ['SKU-001', 'SKU-003'], status: 'pending', total: 2924.50, created: '2024-11-20' },
  { id: 'PO-2024-002', products: ['SKU-005'], status: 'ordered', total: 2700.00, created: '2024-11-18' },
]

const getStatusLabel = (status) => {
  switch (status) {
    case 'normal':
      return 'In Stock'
    case 'low':
      return 'Low Stock'
    case 'critical':
      return 'Critical'
    case 'out':
      return 'Out of Stock'
    default:
      return status
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case 'normal': return 'success'
    case 'low': return 'warning'
    case 'critical': return 'error'
    case 'out': return 'error'
    default: return 'default'
  }
}

export default function InventoryManagementTemplate() {
  const [products] = useState(mockProducts)
  const [activeTab, setActiveTab] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedProduct, setExpandedProduct] = useState(null)
  const [adjustDialogOpen, setAdjustDialogOpen] = useState(false)
  const [addProductDialogOpen, setAddProductDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [adjustmentType, setAdjustmentType] = useState('add')
  const [adjustmentQty, setAdjustmentQty] = useState('')
  const [adjustmentNote, setAdjustmentNote] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterWarehouse, setFilterWarehouse] = useState('all')

  const lowStockCount = products.filter((p) => p.status === 'low' || p.status === 'critical' || p.status === 'out').length
  const totalValue = products.reduce((sum, p) => sum + p.currentStock * p.unitCost, 0)

  const handleAdjustInventory = (product, type) => {
    setSelectedProduct(product)
    setAdjustmentType(type)
    setAdjustDialogOpen(true)
  }

  const filteredProducts = products.filter((p) => {
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && !p.sku.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    if (filterCategory !== 'all' && p.category !== filterCategory) return false
    if (filterWarehouse !== 'all' && p.warehouse !== filterWarehouse) return false
    return true
  })

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* Header */}
      <Paper elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="xl" sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h5" fontWeight={600}>Inventory Management</Typography>
              <Typography variant="body2" color="text.secondary">
                Track products, stock levels, and purchase orders
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="outlined" startIcon={<QrCodeScannerIcon />}>
                Scan Barcode
              </Button>
              <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={() => setAddProductDialogOpen(true)}>
                Add Product
              </Button>
            </Box>
          </Box>
        </Container>
      </Paper>

      {/* Low Stock Alert */}
      <Container maxWidth="xl" sx={{ py: 3 }}>
      {lowStockCount > 0 && (
        <Alert severity="warning" icon={<WarningIcon />} sx={{ mb: 3 }}>
          {lowStockCount} product(s) below reorder point. Review and create purchase orders.
        </Alert>
      )}

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <InventoryIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="h4">{products.length}</Typography>
            <Typography variant="body2" color="text.secondary">
              Total Products
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <WarningIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
            <Typography variant="h4" color="warning.main">
              {lowStockCount}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Low Stock Items
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <AttachMoneyIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
            <Typography variant="h4">${totalValue.toLocaleString()}</Typography>
            <Typography variant="body2" color="text.secondary">
              Total Inventory Value
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <LocalShippingIcon sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
            <Typography variant="h4">{mockPurchaseOrders.length}</Typography>
            <Typography variant="body2" color="text.secondary">
              Pending Orders
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} sx={{ '& .MuiTab-root': { textTransform: 'none' } }}>
          <Tab label="Products" />
          <Tab label="History" />
          <Tab label="Purchase Orders" />
          <Tab label="Reports" />
        </Tabs>
      </Paper>

      {/* Products Tab */}
      {activeTab === 0 && (
        <>
          {/* Filters */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search by name or SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Category</InputLabel>
                  <Select value={filterCategory} label="Category" onChange={(e) => setFilterCategory(e.target.value)}>
                    <MenuItem value="all">All Categories</MenuItem>
                    <MenuItem value="Electronics">Electronics</MenuItem>
                    <MenuItem value="Parts">Parts</MenuItem>
                    <MenuItem value="Accessories">Accessories</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Warehouse</InputLabel>
                  <Select value={filterWarehouse} label="Warehouse" onChange={(e) => setFilterWarehouse(e.target.value)}>
                    <MenuItem value="all">All Warehouses</MenuItem>
                    <MenuItem value="Warehouse A">Warehouse A</MenuItem>
                    <MenuItem value="Warehouse B">Warehouse B</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>

          {/* Products Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>SKU</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Warehouse</TableCell>
                  <TableCell>Stock Level</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((product) => (
                  <>
                    <TableRow key={product.id} hover>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => setExpandedProduct(expandedProduct === product.id ? null : product.id)}
                        >
                          {expandedProduct === product.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontFamily="monospace">
                          {product.sku}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" fontWeight={500}>
                          {product.name}
                        </Typography>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.warehouse}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ width: 100 }}>
                            <LinearProgress
                              variant="determinate"
                              value={Math.min((product.currentStock / product.reorderPoint) * 100, 100)}
                              color={getStatusColor(product.status)}
                              sx={{ height: 8, borderRadius: 1 }}
                            />
                          </Box>
                          <Typography variant="body2">
                            {product.currentStock} / {product.reorderPoint}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Indicator label={getStatusLabel(product.status)} color={getStatusColor(product.status)} />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small" color="success" onClick={() => handleAdjustInventory(product, 'add')}>
                          <AddIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => handleAdjustInventory(product, 'remove')}>
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small">
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={8} sx={{ p: 0 }}>
                        <Collapse in={expandedProduct === product.id}>
                          <Box sx={{ p: 2, bgcolor: 'grey.50' }}>
                            <Grid container spacing={3}>
                              <Grid size={{ xs: 3 }}>
                                <Typography variant="caption" color="text.secondary">
                                  Unit Cost
                                </Typography>
                                <Typography variant="body1" fontWeight={500}>
                                  ${product.unitCost.toFixed(2)}
                                </Typography>
                              </Grid>
                              <Grid size={{ xs: 3 }}>
                                <Typography variant="caption" color="text.secondary">
                                  Total Value
                                </Typography>
                                <Typography variant="body1" fontWeight={500}>
                                  ${(product.currentStock * product.unitCost).toFixed(2)}
                                </Typography>
                              </Grid>
                              <Grid size={{ xs: 3 }}>
                                <Typography variant="caption" color="text.secondary">
                                  Reorder Point
                                </Typography>
                                <Typography variant="body1" fontWeight={500}>
                                  {product.reorderPoint} units
                                </Typography>
                              </Grid>
                              <Grid size={{ xs: 3 }}>
                                <Typography variant="caption" color="text.secondary">
                                  Reorder Quantity
                                </Typography>
                                <Typography variant="body1" fontWeight={500}>
                                  {product.reorderQty} units
                                </Typography>
                              </Grid>
                            </Grid>
                            {product.status !== 'normal' && (
                              <Box sx={{ mt: 2 }}>
                                <Button variant="contained" size="small" startIcon={<LocalShippingIcon />}>
                                  Create Purchase Order
                                </Button>
                              </Box>
                            )}
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* History Tab */}
      {activeTab === 1 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>SKU</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Note</TableCell>
                <TableCell>User</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockHistory.map((entry) => (
                <TableRow key={entry.id} hover>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>
                    <Typography variant="body2" fontFamily="monospace">
                      {entry.sku}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={entry.action === 'Added' ? <TrendingUpIcon /> : <TrendingDownIcon />}
                      label={entry.action}
                      color={entry.action === 'Added' ? 'success' : 'error'}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography color={entry.action === 'Added' ? 'success.main' : 'error.main'}>
                      {entry.action === 'Added' ? '+' : '-'}
                      {entry.quantity}
                    </Typography>
                  </TableCell>
                  <TableCell>{entry.note}</TableCell>
                  <TableCell>{entry.user}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Purchase Orders Tab */}
      {activeTab === 2 && (
        <Paper>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Purchase Orders</Typography>
            <Button variant="contained" startIcon={<AddIcon />}>
              Create PO
            </Button>
          </Box>
          <Divider />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>PO Number</TableCell>
                  <TableCell>Products</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockPurchaseOrders.map((po) => (
                  <TableRow key={po.id} hover>
                    <TableCell>
                      <Typography variant="body1" fontWeight={500}>
                        {po.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {po.products.map((sku) => (
                        <Chip key={sku} label={sku} size="small" sx={{ mr: 0.5 }} />
                      ))}
                    </TableCell>
                    <TableCell>
                      <Indicator label={po.status} status={po.status} />
                    </TableCell>
                    <TableCell>${po.total.toFixed(2)}</TableCell>
                    <TableCell>{po.created}</TableCell>
                    <TableCell align="right">
                      <Button size="small">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* Reports Tab */}
      {activeTab === 3 && (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Stock Movement Report
              </Typography>
              <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography color="text.secondary">Chart visualization</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Inventory Value by Category
              </Typography>
              <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography color="text.secondary">Chart visualization</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
      </Container>

      {/* Adjust Inventory Dialog */}
      <Dialog open={adjustDialogOpen} onClose={() => setAdjustDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>
          {adjustmentType === 'add' ? 'Add' : 'Remove'} Inventory - {selectedProduct?.name}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Current stock: {selectedProduct?.currentStock} units
          </Typography>
          <TextField
            fullWidth
            type="number"
            label="Quantity"
            value={adjustmentQty}
            onChange={(e) => setAdjustmentQty(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={2}
            label="Note"
            placeholder="e.g., Order #12345, PO received, Manufacturing use"
            value={adjustmentNote}
            onChange={(e) => setAdjustmentNote(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAdjustDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color={adjustmentType === 'add' ? 'success' : 'error'}>
            {adjustmentType === 'add' ? 'Add' : 'Remove'} Stock
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Product Dialog */}
      <Dialog open={addProductDialogOpen} onClose={() => setAddProductDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 6 }}>
              <TextField fullWidth label="SKU" placeholder="SKU-XXX" />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <TextField fullWidth label="Product Name" />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select label="Category" defaultValue="">
                  <MenuItem value="Electronics">Electronics</MenuItem>
                  <MenuItem value="Parts">Parts</MenuItem>
                  <MenuItem value="Accessories">Accessories</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Warehouse</InputLabel>
                <Select label="Warehouse" defaultValue="">
                  <MenuItem value="Warehouse A">Warehouse A</MenuItem>
                  <MenuItem value="Warehouse B">Warehouse B</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 4 }}>
              <TextField fullWidth type="number" label="Initial Stock" />
            </Grid>
            <Grid size={{ xs: 4 }}>
              <TextField fullWidth type="number" label="Reorder Point" />
            </Grid>
            <Grid size={{ xs: 4 }}>
              <TextField fullWidth type="number" label="Reorder Qty" />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="Unit Cost"
                InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddProductDialogOpen(false)}>Cancel</Button>
          <Button variant="contained">Add Product</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

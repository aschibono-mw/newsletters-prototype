import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  Box,
  Chip,
} from '@mui/material'
import { PRODUCTS, ROLE_PERMISSIONS } from '../../data/seatsData'

const PERMISSION_LEVELS = [
  { id: 'Admin', label: 'Admin', description: 'Full read and write access' },
  { id: 'View', label: 'View', description: 'Read-only access' },
  { id: 'None', label: 'None', description: 'No access to this product' },
]

function AddPermissionOverrideDialog({
  open,
  onClose,
  onAdd,
  existingOverrides = {},
  userRole,
}) {
  const [selectedProduct, setSelectedProduct] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')

  // Get available products (not already overridden)
  const availableProducts = PRODUCTS.filter((p) => !existingOverrides[p.id])

  // Get the current level from role
  const getRoleLevelForProduct = (productId) => {
    if (!userRole || !ROLE_PERMISSIONS[userRole]) return 'Default'
    return ROLE_PERMISSIONS[userRole][productId] || 'None'
  }

  const handleProductChange = (e) => {
    const productId = e.target.value
    setSelectedProduct(productId)
    // Pre-select the current role level
    const roleLevel = getRoleLevelForProduct(productId)
    setSelectedLevel(roleLevel !== 'Default' ? roleLevel : 'View')
  }

  const handleAdd = () => {
    if (selectedProduct && selectedLevel) {
      onAdd({ productId: selectedProduct, level: selectedLevel })
      handleClose()
    }
  }

  const handleClose = () => {
    setSelectedProduct('')
    setSelectedLevel('')
    onClose()
  }

  const currentRoleLevel = selectedProduct ? getRoleLevelForProduct(selectedProduct) : null

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600 }}>
        Add Permission Override
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Override the default permission level for a specific product. This takes precedence over the role-based permissions.
        </Typography>

        <Stack spacing={3}>
          {/* Product Selection */}
          <FormControl fullWidth size="small">
            <InputLabel>Select Product</InputLabel>
            <Select
              value={selectedProduct}
              label="Select Product"
              onChange={handleProductChange}
            >
              {availableProducts.length === 0 ? (
                <MenuItem disabled>All products already have overrides</MenuItem>
              ) : (
                availableProducts.map((product) => (
                  <MenuItem key={product.id} value={product.id}>
                    {product.label}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>

          {/* Show current level from role */}
          {selectedProduct && currentRoleLevel && (
            <Box
              sx={{
                p: 2,
                backgroundColor: 'grey.50',
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  Current level from role:
                </Typography>
                <Chip
                  label={currentRoleLevel}
                  size="small"
                  variant="outlined"
                />
              </Stack>
            </Box>
          )}

          {/* Permission Level Selection */}
          {selectedProduct && (
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 1.5 }}>
                Override Permission Level
              </Typography>
              <RadioGroup
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                {PERMISSION_LEVELS.map((level) => (
                  <FormControlLabel
                    key={level.id}
                    value={level.id}
                    control={<Radio size="small" />}
                    label={
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {level.label}
                          {level.id === currentRoleLevel && (
                            <Chip
                              label="Same as role"
                              size="small"
                              sx={{ ml: 1, height: 20, fontSize: 11 }}
                            />
                          )}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {level.description}
                        </Typography>
                      </Box>
                    }
                    sx={{
                      alignItems: 'flex-start',
                      py: 1,
                      '& .MuiFormControlLabel-label': { mt: 0.25 },
                    }}
                  />
                ))}
              </RadioGroup>
            </Box>
          )}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} sx={{ textTransform: 'none' }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleAdd}
          disabled={!selectedProduct || !selectedLevel}
          sx={{ textTransform: 'none' }}
        >
          Add Override
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddPermissionOverrideDialog

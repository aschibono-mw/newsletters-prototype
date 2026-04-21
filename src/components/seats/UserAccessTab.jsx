import { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Chip,
  Stack,
  IconButton,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import AddPermissionOverrideDialog from './AddPermissionOverrideDialog'
import { PRODUCTS } from '../../data/seatsData'

// Mock effective permissions based on role
const getEffectivePermissions = (roleId) => {
  const basePermissions = {
    'explore-admin': { insights: 'Admin', discover: 'Admin', workspace: 'Admin', hub: 'Admin' },
    'explore-contributor': { insights: 'Edit', discover: 'Edit', workspace: 'Edit', hub: 'View' },
    'explore-viewer': { insights: 'View', discover: 'View', workspace: 'View', hub: 'View' },
  }
  return basePermissions[roleId] || { insights: 'None', discover: 'None', workspace: 'None', hub: 'None' }
}

function UserAccessTab({
  localUser,
  onAddOverride,
  onRemoveOverride,
}) {
  const [overrideDialogOpen, setOverrideDialogOpen] = useState(false)

  const getProductLabel = (productId) => PRODUCTS.find((p) => p.id === productId)?.label || productId
  const overrideCount = Object.keys(localUser.permissionOverrides || {}).length
  const effectivePermissions = getEffectivePermissions(localUser.role)

  const handleAddOverride = (override) => {
    onAddOverride(override)
    setOverrideDialogOpen(false)
  }

  const getPermissionColor = (level) => {
    switch (level) {
      case 'Admin': return 'primary'
      case 'Edit': return 'success'
      case 'View': return 'info'
      case 'None': return 'default'
      default: return 'default'
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Effective Permissions Section */}
      <Paper sx={{ p: 3, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
          Effective Permissions
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          These are the current permissions based on the user's role, with any overrides applied.
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableCell sx={{ fontWeight: 600 }}>Product</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Base Permission</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Override</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Effective</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {PRODUCTS.map((product) => {
                const baseLevel = effectivePermissions[product.id] || 'None'
                const override = localUser.permissionOverrides?.[product.id]
                const effectiveLevel = override || baseLevel

                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {product.label}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={baseLevel}
                        size="small"
                        variant="outlined"
                        color={getPermissionColor(baseLevel)}
                      />
                    </TableCell>
                    <TableCell>
                      {override ? (
                        <Chip
                          label={override}
                          size="small"
                          color={getPermissionColor(override)}
                        />
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          —
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        {effectiveLevel !== 'None' ? (
                          <CheckCircleOutlinedIcon sx={{ fontSize: 16, color: 'success.main' }} />
                        ) : (
                          <RemoveCircleOutlineIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                        )}
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {effectiveLevel}
                        </Typography>
                      </Stack>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Permission Overrides Section */}
      <Paper sx={{ p: 3, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Permission Overrides
            </Typography>
            {overrideCount > 0 && (
              <Chip label={overrideCount} size="small" sx={{ backgroundColor: 'grey.200' }} />
            )}
          </Stack>
          <Button
            variant="outlined"
            size="small"
            startIcon={<AddIcon />}
            onClick={() => setOverrideDialogOpen(true)}
            sx={{ textTransform: 'none' }}
          >
            Add Override
          </Button>
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Override specific product permissions beyond what the role provides.
        </Typography>
        {overrideCount === 0 ? (
          <Box
            sx={{
              py: 4,
              textAlign: 'center',
              backgroundColor: 'grey.50',
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              No permission overrides configured
            </Typography>
            <Button
              variant="text"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => setOverrideDialogOpen(true)}
              sx={{ mt: 1, textTransform: 'none' }}
            >
              Add your first override
            </Button>
          </Box>
        ) : (
          <Stack spacing={1}>
            {Object.entries(localUser.permissionOverrides || {}).map(([productId, level]) => (
              <Box
                key={productId}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 1.5,
                  backgroundColor: 'grey.50',
                  borderRadius: 1,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {getProductLabel(productId)}
                  </Typography>
                  <Chip
                    label={level}
                    size="small"
                    color={level === 'Admin' ? 'primary' : level === 'View' ? 'default' : 'error'}
                    variant="outlined"
                  />
                </Stack>
                <IconButton size="small" onClick={() => onRemoveOverride(productId)}>
                  <DeleteOutlinedIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>
            ))}
          </Stack>
        )}
      </Paper>

      {/* Add Override Dialog */}
      <AddPermissionOverrideDialog
        open={overrideDialogOpen}
        onClose={() => setOverrideDialogOpen(false)}
        onAdd={handleAddOverride}
        existingOverrides={localUser.permissionOverrides || {}}
        userRole={localUser.role}
      />
    </Box>
  )
}

export default UserAccessTab

import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  Chip,
  Alert,
} from '@mui/material'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import PermissionToggle from './PermissionToggle'
import {
  PRODUCTS,
  SEAT_PERMISSION_CEILINGS,
  ROLE_PERMISSIONS,
  INITIAL_ROLES,
  getEffectivePermission,
} from '../../data/seatsData'

function PermissionOverridesPanel({
  open,
  user,
  chatOpen = false,
  onClose,
  onSave,
}) {
  const [localOverrides, setLocalOverrides] = useState({})
  const [hasChanges, setHasChanges] = useState(false)

  // Animation helpers (hybrid mode like DummySidebar)
  const getPanelStyles = (isOpen) => ({
    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    pointerEvents: isOpen ? 'auto' : 'none',
    transition: isOpen
      ? 'transform 0.3s ease, opacity 0.3s ease, right 0.3s ease'
      : 'transform 0.3s ease, opacity 0.3s ease, right 0.3s ease, visibility 0s linear 0.3s',
  })

  const getContentStyles = (isOpen) => ({
    opacity: isOpen ? 1 : 0,
    transition: isOpen
      ? 'opacity 0.25s ease-out 0.1s' // Delayed fade in
      : 'opacity 0.15s ease-in',       // Immediate fade out
  })

  // Initialize local state when panel opens or user changes
  useEffect(() => {
    if (user && open) {
      setLocalOverrides(user.permissionOverrides || {})
      setHasChanges(false)
    }
  }, [user, open])

  if (!user) return null

  const seatCeiling = SEAT_PERMISSION_CEILINGS[user.seatType]
  const roleDefaults = user.role ? ROLE_PERMISSIONS[user.role] : null

  const handlePermissionChange = (productId, newLevel) => {
    setLocalOverrides((prev) => {
      const roleDefault = roleDefaults?.[productId]
      // If setting back to role default, remove the override
      if (roleDefault && newLevel === roleDefault) {
        const { [productId]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [productId]: newLevel }
    })
    setHasChanges(true)
  }

  const handleResetToDefaults = () => {
    setLocalOverrides({})
    setHasChanges(true)
  }

  const handleSave = () => {
    onSave(localOverrides)
  }

  const handleClose = () => {
    if (hasChanges) {
      if (window.confirm('You have unsaved changes. Discard them?')) {
        onClose()
      }
    } else {
      onClose()
    }
  }

  const overrideCount = Object.keys(localOverrides).length

  return (
    <>
      {/* Backdrop - mobile only */}
      <Box
        onClick={handleClose}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1249,
          display: { xs: 'block', sm: 'block', md: 'none' },
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
          transition: 'opacity 0.2s ease, visibility 0.2s ease',
        }}
      />

      {/* Panel */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          right: { xs: 0, sm: 0, md: 0, lg: chatOpen ? '400px' : 0 },
          width: { xs: '100%', sm: '100%', md: 480 },
          height: '100vh',
          backgroundColor: 'background.paper',
          borderLeft: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1250,
          boxShadow: 3,
          ...getPanelStyles(open),
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', ...getContentStyles(open) }}>
          {/* Header */}
          <Box
            sx={{
              minHeight: 56,
              px: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Permission Overrides
            </Typography>
            <IconButton size="small" onClick={handleClose} sx={{ width: 32, height: 32 }}>
              <Box component="span" sx={{ fontSize: 20, color: 'text.secondary' }}>×</Box>
            </IconButton>
          </Box>

          {/* Context bar */}
          <Box sx={{ px: 2, py: 1.5, backgroundColor: 'grey.50', borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {user.name}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
              {user.email}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                label={`Seat: ${user.seatType.charAt(0).toUpperCase() + user.seatType.slice(1).replace('-', ' ')}`}
                size="small"
                variant="outlined"
              />
              <Chip
                label={user.role ? INITIAL_ROLES.find((r) => r.id === user.role)?.label || user.role : 'No role'}
                size="small"
                variant="outlined"
              />
              {overrideCount > 0 && (
                <Chip
                  label={`${overrideCount} override${overrideCount !== 1 ? 's' : ''}`}
                  size="small"
                  color="secondary"
                />
              )}
            </Box>
          </Box>

          {/* Permission Toggles */}
          <Box sx={{ p: 2, flex: 1, overflow: 'auto' }}>
            {!user.role && (
              <Alert severity="info" sx={{ mb: 2 }}>
                No role assigned. Permissions default to seat ceiling.
              </Alert>
            )}

            {PRODUCTS.map((product) => {
              const effective = getEffectivePermission(user, product.id, null)
              const ceiling = seatCeiling[product.id]
              const roleDefault = roleDefaults?.[product.id] || null

              // Determine current level from local overrides or effective
              const currentLevel = localOverrides[product.id] || effective.level
              const source = localOverrides[product.id]
                ? 'account-override'
                : effective.source

              return (
                <PermissionToggle
                  key={product.id}
                  productId={product.id}
                  productLabel={product.label}
                  currentLevel={currentLevel}
                  source={source}
                  seatCeiling={ceiling}
                  roleDefault={roleDefault}
                  onChange={(newLevel) => handlePermissionChange(product.id, newLevel)}
                />
              )
            })}
          </Box>

          <Divider />

          {/* Footer - extra bottom padding for Intercom */}
          <Box sx={{ p: 2, pb: 10 }}>
            {overrideCount > 0 && (
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                startIcon={<RestartAltIcon />}
                onClick={handleResetToDefaults}
                sx={{ mb: 2, textTransform: 'none' }}
              >
                Reset to Role Defaults
              </Button>
            )}

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleClose}
                sx={{ textTransform: 'none' }}
              >
                Cancel
              </Button>
              <Button
                fullWidth
                variant="contained"
                onClick={handleSave}
                disabled={!hasChanges}
                sx={{ textTransform: 'none' }}
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default PermissionOverridesPanel

import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  Chip,
  Collapse,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import WorkspaceSection from './WorkspaceSection'
import PermissionToggle from './PermissionToggle'
import {
  INITIAL_ROLES,
  PRODUCTS,
  SEAT_PERMISSION_CEILINGS,
  ROLE_PERMISSIONS,
} from '../../data/seatsData'

function WorkspacePermissionsPanel({
  open,
  user,
  workspaces = [],
  chatOpen = false,
  onClose,
  onSave,
}) {
  const [localAssignments, setLocalAssignments] = useState([])
  const [hasChanges, setHasChanges] = useState(false)
  const [expandedWorkspace, setExpandedWorkspace] = useState(null)
  const [showAccountInfo, setShowAccountInfo] = useState(false)

  // Drill-in state for permission overrides
  const [drilldownOpen, setDrilldownOpen] = useState(false)
  const [drilldownWorkspaceId, setDrilldownWorkspaceId] = useState(null)
  const [drilldownOverrides, setDrilldownOverrides] = useState({})

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
      setLocalAssignments(user.workspaceAssignments || [])
      setHasChanges(false)
      setExpandedWorkspace(null)
      setDrilldownOpen(false)
      setDrilldownWorkspaceId(null)
    }
  }, [user, open])

  if (!user) return null

  const handleWorkspaceChange = (workspaceId, newAssignment) => {
    setLocalAssignments((prev) => {
      if (newAssignment === null) {
        return prev.filter((a) => a.workspaceId !== workspaceId)
      }
      const existing = prev.find((a) => a.workspaceId === workspaceId)
      if (existing) {
        return prev.map((a) => a.workspaceId === workspaceId ? newAssignment : a)
      } else {
        return [...prev, newAssignment]
      }
    })
    setHasChanges(true)
  }

  // Drill-in to permission overrides
  const handleDrillIn = (workspaceId) => {
    const assignment = localAssignments.find((a) => a.workspaceId === workspaceId)
    setDrilldownWorkspaceId(workspaceId)
    setDrilldownOverrides(assignment?.permissionOverrides || {})
    setDrilldownOpen(true)
  }

  // Back from drill-in
  const handleDrillBack = () => {
    // Save drilldown overrides back to local assignments
    if (drilldownWorkspaceId) {
      setLocalAssignments((prev) =>
        prev.map((a) =>
          a.workspaceId === drilldownWorkspaceId
            ? { ...a, permissionOverrides: drilldownOverrides }
            : a
        )
      )
    }
    setDrilldownOpen(false)
    setDrilldownWorkspaceId(null)
  }

  const handleDrilldownPermissionChange = (productId, newLevel) => {
    const roleDefault = user.role ? ROLE_PERMISSIONS[user.role]?.[productId] : null
    setDrilldownOverrides((prev) => {
      if (roleDefault && newLevel === roleDefault) {
        const { [productId]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [productId]: newLevel }
    })
    setHasChanges(true)
  }

  const handleResetDrilldownOverrides = () => {
    setDrilldownOverrides({})
    setHasChanges(true)
  }

  const handleSave = () => {
    // If in drilldown, merge overrides first
    let finalAssignments = localAssignments
    if (drilldownOpen && drilldownWorkspaceId) {
      finalAssignments = localAssignments.map((a) =>
        a.workspaceId === drilldownWorkspaceId
          ? { ...a, permissionOverrides: drilldownOverrides }
          : a
      )
    }
    onSave(finalAssignments)
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

  const getAssignment = (workspaceId) => {
    return localAssignments.find((a) => a.workspaceId === workspaceId) || null
  }

  const assignedCount = localAssignments.length
  const totalWorkspaces = workspaces.length

  // Get drilldown workspace info
  const drilldownWorkspace = workspaces.find((ws) => ws.id === drilldownWorkspaceId)
  const drilldownOverrideCount = Object.keys(drilldownOverrides).length
  const seatCeiling = SEAT_PERMISSION_CEILINGS[user.seatType]
  const roleDefaults = user.role ? ROLE_PERMISSIONS[user.role] : null

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

      {/* Main Panel */}
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
          ...getPanelStyles(open && !drilldownOpen),
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', ...getContentStyles(open && !drilldownOpen) }}>
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
              Workspace Permissions
            </Typography>
            <IconButton size="small" onClick={handleClose} sx={{ width: 32, height: 32 }}>
              <Box component="span" sx={{ fontSize: 20, color: 'text.secondary' }}>×</Box>
            </IconButton>
          </Box>

          {/* User context */}
          <Box sx={{ px: 2, py: 1.5, backgroundColor: 'grey.50', borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {user.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user.email}
            </Typography>
          </Box>

          {/* Account Info Section (collapsible) */}
          <Box sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
            <Box
              onClick={() => setShowAccountInfo(!showAccountInfo)}
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                backgroundColor: 'grey.50',
                '&:hover': { backgroundColor: 'grey.100' },
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Account-Level Settings
              </Typography>
              {showAccountInfo ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Box>
            <Collapse in={showAccountInfo}>
              <Box sx={{ p: 2, pt: 0, backgroundColor: 'grey.50' }}>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                  <Chip
                    label={`Seat: ${user.seatType.charAt(0).toUpperCase() + user.seatType.slice(1).replace('-', ' ')}`}
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    label={
                      user.role
                        ? `Role: ${INITIAL_ROLES.find((r) => r.id === user.role)?.label || user.role}`
                        : 'No role'
                    }
                    size="small"
                    variant="outlined"
                  />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Workspace permissions inherit from account-level settings unless overridden.
                </Typography>
              </Box>
            </Collapse>
          </Box>

          {/* Workspace Stats */}
          <Box sx={{ p: 2, pb: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              {assignedCount} of {totalWorkspaces} workspaces assigned
            </Typography>
          </Box>

          {/* Workspace List */}
          <Box sx={{ flex: 1, overflow: 'auto', px: 2, pb: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {workspaces.map((workspace) => (
                <WorkspaceSection
                  key={workspace.id}
                  workspace={workspace}
                  assignment={getAssignment(workspace.id)}
                  roles={INITIAL_ROLES}
                  userSeatType={user.seatType}
                  userAccountRole={user.role}
                  onChange={(newAssignment) => handleWorkspaceChange(workspace.id, newAssignment)}
                  onViewOverrides={() => handleDrillIn(workspace.id)}
                  expanded={expandedWorkspace === workspace.id}
                  onExpandChange={(e, isExpanded) =>
                    setExpandedWorkspace(isExpanded ? workspace.id : null)
                  }
                />
              ))}
            </Box>
          </Box>

          <Divider />

          {/* Footer - extra bottom padding for Intercom */}
          <Box sx={{ p: 2, pb: 10, display: 'flex', gap: 1 }}>
            <Button fullWidth variant="outlined" onClick={handleClose} sx={{ textTransform: 'none' }}>
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

      {/* Drill-in Panel: Permission Overrides */}
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
          ...getPanelStyles(open && drilldownOpen),
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', ...getContentStyles(open && drilldownOpen) }}>
          {/* Drilldown Header */}
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
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton size="small" onClick={handleDrillBack} sx={{ width: 32, height: 32, mr: 0.5 }}>
                <ArrowBackIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
              </IconButton>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Permission Overrides
              </Typography>
            </Box>
            <IconButton size="small" onClick={handleClose} sx={{ width: 32, height: 32 }}>
              <Box component="span" sx={{ fontSize: 20, color: 'text.secondary' }}>×</Box>
            </IconButton>
          </Box>

          {/* Context bar */}
          <Box sx={{ px: 2, py: 1.5, backgroundColor: 'grey.50', borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {drilldownWorkspace?.name || 'Workspace'}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
              {user.name}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                label={`Seat: ${user.seatType.charAt(0).toUpperCase() + user.seatType.slice(1)}`}
                size="small"
                variant="outlined"
              />
              {user.role && (
                <Chip
                  label={INITIAL_ROLES.find((r) => r.id === user.role)?.label || user.role}
                  size="small"
                  variant="outlined"
                />
              )}
              {drilldownOverrideCount > 0 && (
                <Chip
                  label={`${drilldownOverrideCount} override${drilldownOverrideCount !== 1 ? 's' : ''}`}
                  size="small"
                  color="secondary"
                />
              )}
            </Box>
          </Box>

          {/* Permission Toggles */}
          <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
            {PRODUCTS.map((product) => {
              const ceiling = seatCeiling[product.id]
              const roleDefault = roleDefaults?.[product.id] || null
              const currentLevel = drilldownOverrides[product.id] || roleDefault || ceiling
              const source = drilldownOverrides[product.id]
                ? 'workspace-override'
                : roleDefault
                ? 'role'
                : 'seat'

              return (
                <PermissionToggle
                  key={product.id}
                  productId={product.id}
                  productLabel={product.label}
                  currentLevel={currentLevel}
                  source={source}
                  seatCeiling={ceiling}
                  roleDefault={roleDefault}
                  onChange={(newLevel) => handleDrilldownPermissionChange(product.id, newLevel)}
                />
              )
            })}
          </Box>

          <Divider />

          {/* Drilldown Footer - extra bottom padding for Intercom */}
          <Box sx={{ p: 2, pb: 10 }}>
            {drilldownOverrideCount > 0 && (
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={handleResetDrilldownOverrides}
                sx={{ mb: 2, textTransform: 'none' }}
              >
                Reset to Defaults
              </Button>
            )}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button fullWidth variant="outlined" onClick={handleDrillBack} sx={{ textTransform: 'none' }}>
                Back
              </Button>
              <Button
                fullWidth
                variant="contained"
                onClick={handleSave}
                disabled={!hasChanges}
                sx={{ textTransform: 'none' }}
              >
                Save All
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default WorkspacePermissionsPanel

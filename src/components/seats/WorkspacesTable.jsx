import { useState, useMemo } from 'react'
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  IconButton,
  Checkbox,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import FilterListIcon from '@mui/icons-material/FilterList'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { WORKSPACES, INITIAL_ROLES } from '../../data/seatsData'
import AddWorkspaceDialog from './AddWorkspaceDialog'
import QuickWorkspaceEdit from './QuickWorkspaceEdit'
import WorkspacePermissionOverrideDialog from './WorkspacePermissionOverrideDialog'
import { headerCellSeparatorSx } from '../../constants/tableStyles'

// Default workspace ID
const DEFAULT_WORKSPACE_ID = 'ws-default'
const DEFAULT_WORKSPACE = { id: DEFAULT_WORKSPACE_ID, name: 'Default Workspace' }

// Helper to get workspace info from WORKSPACES constant
const getWorkspaceInfo = (workspaceId) => {
  if (workspaceId === DEFAULT_WORKSPACE_ID) return DEFAULT_WORKSPACE
  return WORKSPACES.find((w) => w.id === workspaceId)
}

// Helper to get role label
const getRoleLabel = (roleId) => {
  if (!roleId) return 'Custom'
  const role = INITIAL_ROLES.find((r) => r.id === roleId)
  return role ? role.label : roleId
}

/**
 * Reusable workspace assignments table component
 *
 * @param {Object} props
 * @param {Array} props.workspaceAssignments - Array of workspace assignments (excluding default)
 * @param {Function} props.onAddWorkspace - Called when adding a new workspace
 * @param {Function} props.onUpdateWorkspace - Called when updating a workspace assignment
 * @param {Function} props.onRemoveWorkspace - Called when removing a workspace assignment
 * @param {string|null} props.accountRole - The account-level role (used for default workspace)
 * @param {Object} props.accountPermissionOverrides - Account-level permission overrides (for default workspace)
 * @param {boolean} props.disabled - Whether the table is disabled (non-platform users)
 */
export default function WorkspacesTable({
  workspaceAssignments = [],
  onAddWorkspace,
  onUpdateWorkspace,
  onRemoveWorkspace,
  accountRole = null,
  accountPermissionOverrides = {},
  disabled = false,
  seatType = 'platform-admin',
  showRoles = true,
}) {
  // Selection state
  const [selectedWorkspaces, setSelectedWorkspaces] = useState([])

  // Pagination state
  const [page, setPage] = useState(0)
  const rowsPerPage = 5

  // Dialog state
  const [dialogState, setDialogState] = useState({
    type: null, // 'add' | 'edit' | 'permissions' | null
    workspaceId: null,
  })

  // Dialog helper functions
  const openAddDialog = () => setDialogState({ type: 'add', workspaceId: null })
  const openEditDialog = (assignment) => setDialogState({
    type: 'edit',
    workspaceId: assignment.workspaceId,
  })
  const openPermissionsDialog = (assignment) => setDialogState({
    type: 'permissions',
    workspaceId: assignment.workspaceId,
  })
  const closeDialog = () => setDialogState({ type: null, workspaceId: null })

  // Derived state
  const currentAssignment = dialogState.workspaceId
    ? workspaceAssignments.find((a) => a.workspaceId === dialogState.workspaceId)
    : null

  const assignedWorkspaceIds = useMemo(
    () => workspaceAssignments.map((a) => a.workspaceId),
    [workspaceAssignments]
  )

  // All workspaces including default
  const allWorkspaceAssignments = useMemo(() => {
    const defaultWorkspaceAssignment = {
      workspaceId: DEFAULT_WORKSPACE_ID,
      role: accountRole,
      permissionOverrides: accountPermissionOverrides,
      accessLevel: 'full',
      isDefault: true,
    }
    return [defaultWorkspaceAssignment, ...workspaceAssignments]
  }, [accountRole, accountPermissionOverrides, workspaceAssignments])

  const paginatedWorkspaces = allWorkspaceAssignments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  // Handlers
  const handleSelectAllWorkspaces = (event) => {
    if (event.target.checked) {
      setSelectedWorkspaces(workspaceAssignments.map((w) => w.workspaceId))
    } else {
      setSelectedWorkspaces([])
    }
  }

  const handleSelectWorkspace = (workspaceId) => {
    setSelectedWorkspaces((prev) =>
      prev.includes(workspaceId) ? prev.filter((x) => x !== workspaceId) : [...prev, workspaceId]
    )
  }

  const handleAddWorkspace = (assignment) => {
    onAddWorkspace?.(assignment)
    closeDialog()
  }

  const handleUpdateWorkspace = (updatedAssignment) => {
    onUpdateWorkspace?.(updatedAssignment)
    closeDialog()
  }

  const handleRemoveWorkspace = (workspaceId) => {
    onRemoveWorkspace?.(workspaceId)
    setSelectedWorkspaces((prev) => prev.filter((id) => id !== workspaceId))
  }

  const handleSavePermissions = (overrides) => {
    if (currentAssignment) {
      onUpdateWorkspace?.({
        ...currentAssignment,
        permissionOverrides: overrides,
      })
    }
    closeDialog()
  }

  // Get workspace name for dialog
  const getWorkspaceName = (workspaceId) => {
    const info = getWorkspaceInfo(workspaceId)
    return info?.name || workspaceId
  }

  return (
    <>
      <Paper variant="outlined" sx={{ overflow: 'hidden', backgroundColor: 'background.paper', opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? 'none' : 'auto' }}>
        <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {allWorkspaceAssignments.length} Assigned Workspace{allWorkspaceAssignments.length !== 1 ? 's' : ''}
            </Typography>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={openAddDialog}
              disabled={disabled}
              sx={{ textTransform: 'none' }}
            >
              Add
            </Button>
          </Stack>
          <IconButton size="small">
            <FilterListIcon fontSize="small" />
          </IconButton>
        </Box>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: 'background.paper', borderBottom: '2px solid', borderColor: 'divider' }}>
                <TableCell padding="checkbox" sx={showRoles ? headerCellSeparatorSx : {}}>
                  <Checkbox
                    indeterminate={
                      selectedWorkspaces.length > 0 &&
                      selectedWorkspaces.length < workspaceAssignments.length
                    }
                    checked={
                      workspaceAssignments.length > 0 &&
                      selectedWorkspaces.length === workspaceAssignments.length
                    }
                    onChange={handleSelectAllWorkspaces}
                    size="small"
                  />
                </TableCell>
                <TableCell sx={{ ...(showRoles ? headerCellSeparatorSx : {}), fontWeight: 600, width: showRoles ? '50%' : '100%' }}>
                  Workspace Name
                </TableCell>
                {showRoles && (
                  <TableCell sx={{ fontWeight: 600, width: '50%' }}>Workspace Role</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedWorkspaces.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={showRoles ? 3 : 2} sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      No workspaces assigned. Click "Add" to get started.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedWorkspaces.map((assignment) => {
                  const workspaceInfo = getWorkspaceInfo(assignment.workspaceId)
                  const overrideCount = Object.keys(assignment.permissionOverrides || {}).length
                  const isDefault = assignment.workspaceId === DEFAULT_WORKSPACE_ID

                  return (
                    <TableRow
                      key={assignment.workspaceId}
                      hover
                      sx={{
                        height: 52,
                        '& .action-buttons': { opacity: 0 },
                        '&:hover .action-buttons': { opacity: 1 },
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedWorkspaces.includes(assignment.workspaceId)}
                          onChange={() => handleSelectWorkspace(assignment.workspaceId)}
                          size="small"
                          disabled={isDefault}
                        />
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {workspaceInfo?.name || assignment.workspaceId}
                          </Typography>
                          {showRoles && overrideCount > 0 && (
                            <Chip
                              label={`${overrideCount} custom`}
                              size="small"
                              sx={{ backgroundColor: '#E0F7FA', color: '#00838F', fontWeight: 500, height: 24 }}
                            />
                          )}
                        </Stack>
                      </TableCell>
                      {showRoles && <TableCell>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ minHeight: 28 }}>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography variant="body2" color="text.secondary">
                              {getRoleLabel(assignment.role)}
                            </Typography>
                            {!assignment.role && !isDefault && (
                              <Button
                                size="small"
                                onClick={() => openPermissionsDialog(assignment)}
                                sx={{
                                  textTransform: 'none',
                                  color: 'primary.main',
                                  minWidth: 'auto',
                                  p: 0,
                                  fontSize: '0.8125rem',
                                  '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' }
                                }}
                              >
                                Edit
                              </Button>
                            )}
                          </Stack>
                          <Box sx={{ width: 60, display: 'flex', justifyContent: 'flex-end' }}>
                            {isDefault ? (
                              <Tooltip title="All users must be assigned to the Default Workspace">
                                <LockOutlinedIcon fontSize="small" sx={{ color: 'text.disabled' }} />
                              </Tooltip>
                            ) : (
                              <Stack direction="row" spacing={0.5} className="action-buttons">
                                <Tooltip title="Edit">
                                  <IconButton
                                    size="small"
                                    onClick={() => openEditDialog(assignment)}
                                  >
                                    <EditOutlinedIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Remove">
                                  <IconButton
                                    size="small"
                                    onClick={() => handleRemoveWorkspace(assignment.workspaceId)}
                                  >
                                    <DeleteOutlinedIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Stack>
                            )}
                          </Box>
                        </Stack>
                      </TableCell>}
                      {!showRoles && !isDefault && (
                        <TableCell align="right" sx={{ width: 60 }}>
                          <Tooltip title="Remove">
                            <IconButton
                              size="small"
                              onClick={() => handleRemoveWorkspace(assignment.workspaceId)}
                              className="action-buttons"
                            >
                              <DeleteOutlinedIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      )}
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Simple pagination */}
        <Box
          sx={{
            px: 2,
            py: 1,
            borderTop: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {allWorkspaceAssignments.length === 0 ? '0 of 0' : `${page * rowsPerPage + 1}–${Math.min((page + 1) * rowsPerPage, allWorkspaceAssignments.length)} of ${allWorkspaceAssignments.length}`}
          </Typography>
          <IconButton
            size="small"
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
          >
            <ChevronLeftIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => setPage(page + 1)}
            disabled={(page + 1) * rowsPerPage >= allWorkspaceAssignments.length}
          >
            <ChevronRightIcon fontSize="small" />
          </IconButton>
        </Box>
      </Paper>

      {/* Add Workspace Dialog */}
      <AddWorkspaceDialog
        open={dialogState.type === 'add'}
        onClose={closeDialog}
        workspaces={WORKSPACES}
        assignedWorkspaceIds={assignedWorkspaceIds}
        roles={INITIAL_ROLES}
        onAdd={handleAddWorkspace}
        showRoles={showRoles}
      />

      {/* Edit Workspace Dialog */}
      <QuickWorkspaceEdit
        open={dialogState.type === 'edit'}
        onClose={closeDialog}
        assignment={currentAssignment}
        roles={INITIAL_ROLES}
        onUpdate={handleUpdateWorkspace}
      />

      {/* Workspace Permission Override Dialog */}
      <WorkspacePermissionOverrideDialog
        open={dialogState.type === 'permissions'}
        onClose={closeDialog}
        workspaceName={dialogState.workspaceId ? getWorkspaceName(dialogState.workspaceId) : ''}
        assignment={currentAssignment || { permissionOverrides: {} }}
        onSave={handleSavePermissions}
        seatType={seatType}
      />
    </>
  )
}

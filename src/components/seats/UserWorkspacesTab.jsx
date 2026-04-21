import {
  Box,
  Paper,
  Typography,
  Chip,
  Stack,
  IconButton,
  Button,
  FormControl,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { WORKSPACES } from '../../data/seatsData'

function UserWorkspacesTab({
  localUser,
  roles,
  onUpdateWorkspaceRole,
  onRemoveWorkspace,
  onAddWorkspace,
}) {
  const getWorkspaceName = (wsId) => WORKSPACES.find((ws) => ws.id === wsId)?.name || ''

  const assignedWorkspaceIds = localUser.workspaceAssignments?.map((ws) => ws.workspaceId) || []
  const availableWorkspaces = WORKSPACES.filter((ws) => !assignedWorkspaceIds.includes(ws.id))

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Workspace Assignments Section */}
      <Paper sx={{ p: 3, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Workspace Assignments
            </Typography>
            {localUser.workspaceAssignments?.length > 0 && (
              <Chip
                label={localUser.workspaceAssignments.length}
                size="small"
                sx={{ backgroundColor: 'grey.200' }}
              />
            )}
          </Stack>
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <Select
              value=""
              displayEmpty
              onChange={(e) => onAddWorkspace(e.target.value)}
              renderValue={() => (
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <AddIcon sx={{ fontSize: 18 }} />
                  <span>Assign to Workspace</span>
                </Stack>
              )}
            >
              {availableWorkspaces.length === 0 ? (
                <MenuItem disabled>All workspaces assigned</MenuItem>
              ) : (
                availableWorkspaces.map((workspace) => (
                  <MenuItem key={workspace.id} value={workspace.id}>
                    {workspace.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Manage which workspaces this user has access to and their workspace-specific roles.
        </Typography>

        {(!localUser.workspaceAssignments || localUser.workspaceAssignments.length === 0) ? (
          <Box
            sx={{
              py: 4,
              textAlign: 'center',
              backgroundColor: 'grey.50',
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              No workspace assignments
            </Typography>
            <Button
              variant="text"
              size="small"
              startIcon={<AddIcon />}
              sx={{ mt: 1, textTransform: 'none' }}
              onClick={() => {
                if (availableWorkspaces.length > 0) {
                  onAddWorkspace(availableWorkspaces[0].id)
                }
              }}
              disabled={availableWorkspaces.length === 0}
            >
              Add first workspace
            </Button>
          </Box>
        ) : (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Workspace</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Workspace Role</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Access Level</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: 60 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {localUser.workspaceAssignments.map((ws) => (
                  <TableRow key={ws.workspaceId} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {getWorkspaceName(ws.workspaceId)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <FormControl size="small" sx={{ minWidth: 150 }}>
                        <Select
                          value={ws.role || ''}
                          displayEmpty
                          onChange={(e) => onUpdateWorkspaceRole(ws.workspaceId, e.target.value || null)}
                        >
                          <MenuItem value="">
                            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                              No role
                            </Typography>
                          </MenuItem>
                          {roles.map((role) => (
                            <MenuItem key={role.id} value={role.id}>
                              {role.label.replace('Explore+ ', '').replace(' User', '')}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      {ws.accessLevel && (
                        <Chip
                          label={ws.accessLevel}
                          size="small"
                          sx={{
                            backgroundColor: ws.accessLevel === 'full' ? 'success.light' : 'grey.200',
                            color: ws.accessLevel === 'full' ? 'success.dark' : 'text.secondary',
                          }}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Remove from workspace">
                        <IconButton size="small" onClick={() => onRemoveWorkspace(ws.workspaceId)}>
                          <DeleteOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  )
}

export default UserWorkspacesTab

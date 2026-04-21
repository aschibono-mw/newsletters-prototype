import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  Switch,
  FormControl,
  Select,
  MenuItem,
  Button,
  Chip,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import TuneIcon from '@mui/icons-material/Tune'

/**
 * WorkspaceSection - Accordion section for workspace assignment in WorkspacePermissionsPanel
 *
 * @param {Object} props
 * @param {Object} props.workspace - Workspace object { id, name }
 * @param {Object|null} props.assignment - Current assignment { workspaceId, role, permissionOverrides }
 * @param {Array} props.roles - Available roles
 * @param {string} props.userSeatType - User's seat type
 * @param {string} props.userAccountRole - User's account-level role
 * @param {Function} props.onChange - Called with new assignment or null to remove
 * @param {Function} props.onViewOverrides - Called to drill into permission overrides
 * @param {boolean} props.expanded - Whether accordion is expanded
 * @param {Function} props.onExpandChange - Handler for expand/collapse
 */
function WorkspaceSection({
  workspace,
  assignment,
  roles = [],
  userSeatType,
  userAccountRole,
  onChange,
  onViewOverrides,
  expanded,
  onExpandChange,
}) {
  const isAssigned = Boolean(assignment)
  const overrideCount = assignment?.permissionOverrides
    ? Object.keys(assignment.permissionOverrides).length
    : 0

  const handleToggleAssignment = (e) => {
    e.stopPropagation()
    if (isAssigned) {
      // Remove assignment
      onChange(null)
    } else {
      // Add assignment with defaults
      onChange({
        workspaceId: workspace.id,
        role: userAccountRole || null,
        permissionOverrides: {},
      })
    }
  }

  const handleRoleChange = (e) => {
    onChange({
      ...assignment,
      role: e.target.value || null,
    })
  }

  return (
    <Accordion
      expanded={expanded}
      onChange={onExpandChange}
      disableGutters
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        '&:before': { display: 'none' },
        boxShadow: 'none',
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          minHeight: 48,
          '& .MuiAccordionSummary-content': {
            my: 1,
            alignItems: 'center',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, mr: 1 }}>
          <Switch
            checked={isAssigned}
            onChange={handleToggleAssignment}
            onClick={(e) => e.stopPropagation()}
            size="small"
            sx={{ mr: 1 }}
          />
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {workspace.name}
          </Typography>
          {isAssigned && overrideCount > 0 && (
            <Chip
              label={`${overrideCount} override${overrideCount !== 1 ? 's' : ''}`}
              size="small"
              color="secondary"
              sx={{ ml: 1 }}
            />
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0, pb: 2 }}>
        {isAssigned ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Role selector - only for platform seats */}
            {userSeatType === 'platform' && (
              <FormControl size="small" fullWidth>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
                  Workspace Role
                </Typography>
                <Select
                  value={assignment.role || ''}
                  displayEmpty
                  onChange={handleRoleChange}
                >
                  <MenuItem value="">
                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                      Inherit from account
                    </Typography>
                  </MenuItem>
                  {roles.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {/* Permission overrides button */}
            <Button
              variant="outlined"
              size="small"
              startIcon={<TuneIcon />}
              onClick={onViewOverrides}
              sx={{ textTransform: 'none', alignSelf: 'flex-start' }}
            >
              {overrideCount > 0
                ? `View ${overrideCount} Permission Override${overrideCount !== 1 ? 's' : ''}`
                : 'Configure Permission Overrides'}
            </Button>
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Toggle the switch to assign this user to {workspace.name}.
          </Typography>
        )}
      </AccordionDetails>
    </Accordion>
  )
}

export default WorkspaceSection

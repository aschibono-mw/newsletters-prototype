import { Box, Typography, ToggleButtonGroup, ToggleButton, Chip, Tooltip } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

const PERMISSION_HIERARCHY = { 'Admin': 3, 'View': 2, 'None': 1 }
const PERMISSION_LEVELS = ['Admin', 'View', 'None']

function PermissionToggle({
  productId: _productId, // eslint-disable-line no-unused-vars
  productLabel,
  currentLevel,
  source, // 'seat' | 'role' | 'account-override' | 'workspace-override' | 'workspace-role'
  seatCeiling,
  roleDefault,
  onChange,
  disabled = false,
}) {
  const isOverridden = source === 'account-override' || source === 'workspace-override'

  // Determine which levels exceed the seat ceiling
  const isLevelDisabled = (level) => {
    return PERMISSION_HIERARCHY[level] > PERMISSION_HIERARCHY[seatCeiling]
  }

  // Get the source label for display
  const getSourceLabel = () => {
    if (source === 'account-override') return 'Overridden'
    if (source === 'workspace-override') return 'Workspace override'
    if (source === 'workspace-role') return 'From workspace role'
    if (source === 'role') return 'From role'
    if (source === 'seat') return 'Seat default'
    return ''
  }

  return (
    <Box
      sx={{
        py: 1.5,
        pl: isOverridden ? 1.5 : 0,
        borderLeft: isOverridden ? '3px solid' : 'none',
        borderColor: 'secondary.main',
        backgroundColor: isOverridden ? 'grey.50' : 'transparent',
        borderRadius: isOverridden ? '0 4px 4px 0' : 0,
        transition: 'all 0.2s ease',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {productLabel}
        </Typography>
        <Chip
          label={getSourceLabel()}
          size="small"
          variant="outlined"
          sx={{
            height: 20,
            fontSize: 11,
            borderColor: isOverridden ? 'secondary.main' : 'divider',
            color: isOverridden ? 'secondary.main' : 'text.secondary',
            fontWeight: isOverridden ? 600 : 400,
          }}
        />
      </Box>

      <ToggleButtonGroup
        value={currentLevel}
        exclusive
        onChange={(e, newLevel) => {
          if (newLevel && !isLevelDisabled(newLevel)) {
            onChange(newLevel)
          }
        }}
        size="small"
        disabled={disabled}
        fullWidth
        sx={{
          '& .MuiToggleButton-root': {
            textTransform: 'none',
            py: 0.5,
            flex: 1,
          },
        }}
      >
        {PERMISSION_LEVELS.map((level) => {
          const isDisabledLevel = isLevelDisabled(level)
          const isSelected = currentLevel === level
          const wasRoleDefault = roleDefault === level && !isSelected

          return (
            <Tooltip
              key={level}
              title={
                isDisabledLevel
                  ? `${level} exceeds ${seatCeiling} seat ceiling`
                  : wasRoleDefault
                  ? 'Role default'
                  : ''
              }
              placement="top"
            >
              <span style={{ flex: 1, display: 'flex' }}>
                <ToggleButton
                  value={level}
                  disabled={isDisabledLevel}
                  sx={{
                    flex: 1,
                    opacity: isDisabledLevel ? 0.4 : 1,
                    position: 'relative',
                    border: wasRoleDefault ? '2px dashed' : undefined,
                    borderColor: wasRoleDefault ? 'info.main' : undefined,
                    '&.Mui-selected': {
                      backgroundColor: isOverridden ? 'secondary.light' : 'primary.light',
                      color: isOverridden ? 'secondary.dark' : 'primary.dark',
                      borderColor: isOverridden ? 'secondary.main' : 'primary.main',
                      '&:hover': {
                        backgroundColor: isOverridden ? 'secondary.light' : 'primary.light',
                      },
                    },
                  }}
                >
                  {level}
                  {isDisabledLevel && (
                    <LockOutlinedIcon
                      sx={{
                        fontSize: 12,
                        ml: 0.5,
                        color: 'text.disabled',
                      }}
                    />
                  )}
                </ToggleButton>
              </span>
            </Tooltip>
          )
        })}
      </ToggleButtonGroup>

      {/* Show effective value info */}
      {seatCeiling && (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
          Seat ceiling: {seatCeiling}
          {roleDefault && roleDefault !== currentLevel && ` | Role default: ${roleDefault}`}
        </Typography>
      )}
    </Box>
  )
}

export default PermissionToggle

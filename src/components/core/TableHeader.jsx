import { Box, Typography, Button, IconButton, Tooltip, InputBase, Stack } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined'
import ViewColumnOutlinedIcon from '@mui/icons-material/ViewColumnOutlined'
import SortIcon from '@mui/icons-material/Sort'

/**
 * TableHeader - Reusable table header component with two visual states
 *
 * Default state: title, count, info tooltip, primary action, promoted actions, filters, view toggle, sort, find
 * Selected state: clear button, selected count, selected actions (teal background)
 *
 * @param {string} title - Label for items (e.g., "Tokens", "Projects")
 * @param {number} count - Number of items
 * @param {string} [infotip] - Tooltip text for info icon
 * @param {Object} [primaryAction] - { label, onClick, icon, disabled }
 * @param {Array} [promotedActions] - [{ label, onClick, variant }]
 * @param {Array} [filters] - [{ label, options, value, onChange, count }] (future use)
 * @param {boolean} [showViewToggle=false] - Show grid/list toggle icons
 * @param {string} [viewMode='list'] - Current view mode ('grid' or 'list')
 * @param {Function} [onViewModeChange] - View mode change handler
 * @param {boolean} [showColumns=false] - Show columns toggle icon for adding/removing columns
 * @param {Function} [onColumnsClick] - Columns click handler
 * @param {boolean} [showSort=false] - Show sort icon
 * @param {Function} [onSortClick] - Sort click handler
 * @param {boolean} [showFind=true] - Show Find search field
 * @param {string} [findValue] - Controlled find input value
 * @param {Function} [onFindChange] - Find input onChange handler
 * @param {ReactNode} [subtitle] - Optional subtitle/alert below header
 * @param {number} [selectedCount=0] - Triggers selected state when > 0
 * @param {Function} [onClearSelection] - Handler to clear selection
 * @param {Array} [selectedActions] - [{ label, onClick, icon }]
 * @param {Array} [selectedIconActions] - [{ tooltip, onClick, icon }] - Icon-only actions with tooltips
 * @param {string} [itemLabel='Items'] - Label for selected items (e.g., "Tokens", "Users")
 */
function TableHeader({
  title,
  count,
  infotip,
  primaryAction,
  promotedActions = [],
  showViewToggle = false,
  viewMode = 'list',
  onViewModeChange,
  showColumns = false,
  onColumnsClick,
  showSort = false,
  onSortClick,
  showFind = true,
  findValue = '',
  onFindChange,
  subtitle,
  selectedCount = 0,
  onClearSelection,
  selectedActions = [],
  selectedIconActions = [],
  itemLabel = 'Items',
}) {
  const isSelected = selectedCount > 0

  return (
    <Box>
      {/* Main Header Row */}
      <Box
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          height: 60,
          display: 'flex',
          alignItems: 'center',
          px: 2,
          backgroundColor: isSelected ? 'primary.light' : 'transparent',
          transition: 'none',
        }}
      >
        {isSelected ? (
          // Selected State
          <Stack direction="row" spacing={1.5} alignItems="center">
            <IconButton
              size="small"
              onClick={onClearSelection}
              sx={{ color: 'primary.dark' }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'primary.dark', whiteSpace: 'nowrap' }}>
              {selectedCount} {selectedCount === 1 ? itemLabel.replace(/s$/, '') : itemLabel} Selected
            </Typography>
            {selectedActions.map((action, index) => (
              <Button
                key={index}
                variant="outlined"
                size="small"
                startIcon={action.icon}
                onClick={action.onClick}
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  borderColor: 'primary.dark',
                  color: 'primary.dark',
                  '&:hover': {
                    borderColor: 'primary.dark',
                    backgroundColor: 'rgba(0, 130, 127, 0.08)',
                  },
                }}
              >
                {action.label}
              </Button>
            ))}
            {selectedIconActions.map((action, index) => (
              <Tooltip key={index} title={action.tooltip}>
                <IconButton
                  size="small"
                  onClick={action.onClick}
                  sx={{ color: 'primary.dark' }}
                >
                  {action.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Stack>
        ) : (
          // Default State
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
            {/* Left Side: Count, Title, Info */}
            <Stack direction="row" spacing={0.75} alignItems="center">
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {count} {title}
              </Typography>
              {infotip && (
                <Tooltip title={infotip}>
                  <IconButton size="small" sx={{ color: 'text.secondary' }}>
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>

            {/* Right Side: Actions, Filters, View Toggle, Sort, Find */}
            <Stack direction="row" spacing={1.5} alignItems="center">
              {/* Primary Action */}
              {primaryAction && (
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  startIcon={primaryAction.icon}
                  onClick={primaryAction.onClick}
                  disabled={primaryAction.disabled}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 500,
                  }}
                >
                  {primaryAction.label}
                </Button>
              )}

              {/* Promoted Actions */}
              {promotedActions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant || 'outlined'}
                  size="small"
                  startIcon={action.icon}
                  onClick={action.onClick}
                  disabled={action.disabled}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 500,
                  }}
                >
                  {action.label}
                </Button>
              ))}

              {/* View Toggle Icons */}
              {showViewToggle && (
                <Stack direction="row" spacing={0.5}>
                  <Tooltip title="Grid view">
                    <IconButton
                      size="small"
                      onClick={() => onViewModeChange?.('grid')}
                      sx={{
                        color: viewMode === 'grid' ? 'primary.main' : 'text.secondary',
                      }}
                    >
                      <GridViewOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="List view">
                    <IconButton
                      size="small"
                      onClick={() => onViewModeChange?.('list')}
                      sx={{
                        color: viewMode === 'list' ? 'primary.main' : 'text.secondary',
                      }}
                    >
                      <ViewListOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              )}

              {/* Columns Icon */}
              {showColumns && (
                <Tooltip title="Edit columns">
                  <IconButton size="small" onClick={onColumnsClick} sx={{ color: 'text.secondary' }}>
                    <ViewColumnOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}

              {/* Sort Icon */}
              {showSort && (
                <Tooltip title="Sort">
                  <IconButton size="small" onClick={onSortClick} sx={{ color: 'text.secondary' }}>
                    <SortIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}

              {/* Find Input */}
              {showFind && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: '20px',
                    px: 2,
                    py: 0.5,
                    minWidth: 160,
                    backgroundColor: 'background.paper',
                  }}
                >
                  <SearchIcon sx={{ fontSize: 20, color: 'text.secondary', mr: 1 }} />
                  <InputBase
                    placeholder="Find"
                    value={findValue}
                    onChange={(e) => onFindChange?.(e.target.value)}
                    sx={{
                      flex: 1,
                      fontSize: 14,
                      '& input::placeholder': {
                        color: 'text.secondary',
                        opacity: 1,
                      },
                    }}
                  />
                </Box>
              )}
            </Stack>
          </Stack>
        )}
      </Box>

      {/* Optional Subtitle/Alert Row */}
      {subtitle && (
        <Box>
          {subtitle}
        </Box>
      )}
    </Box>
  )
}

export default TableHeader

/**
 * SearchFilterBar
 *
 * Reusable search + filter toolbar pattern used across data-heavy templates.
 * Composes TextField with search icon, filter chips, and action icons.
 *
 * Uses existing DS primitives: Box, TextField, InputAdornment, Chip, IconButton, Badge
 */

import { Box, TextField, InputAdornment, Chip, IconButton, Badge, Button, Tooltip } from '@mui/material'
import SearchIcon from '@mui/icons-material/SearchRounded'
import FilterListIcon from '@mui/icons-material/FilterListRounded'

/**
 * @param {string} placeholder - Search input placeholder text
 * @param {string} [value] - Controlled search value
 * @param {function} [onChange] - Search value change handler
 * @param {Array} [filterOptions] - Array of { value, label } for filter chips
 * @param {string} [activeFilter] - Currently selected filter value
 * @param {function} [onFilterChange] - Filter selection handler
 * @param {function} [onFilterClick] - Handler for filter button (opens drawer/dialog)
 * @param {number} [activeFilterCount] - Badge count for active filters
 * @param {React.ReactNode} [actions] - Additional action icons/buttons
 * @param {object} [sx] - Additional sx props for the container
 */
export default function SearchFilterBar({
  placeholder = 'Search...',
  value,
  onChange,
  filterOptions,
  activeFilter,
  onFilterChange,
  onFilterClick,
  activeFilterCount = 0,
  actions,
  sx = {},
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'center',
        flexWrap: 'wrap',
        ...sx,
      }}
    >
      <TextField
        placeholder={placeholder}
        size="small"
        value={value}
        onChange={onChange}
        sx={{ flex: 1, minWidth: 250 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
            </InputAdornment>
          ),
        }}
      />

      {/* Filter chips (inline quick filters) */}
      {filterOptions && filterOptions.length > 0 && (
        <Box sx={{ display: 'flex', gap: 1 }}>
          {filterOptions.map((option) => (
            <Chip
              key={option.value}
              label={option.label}
              variant={activeFilter === option.value ? 'filled' : 'outlined'}
              color={activeFilter === option.value ? 'primary' : 'default'}
              onClick={() => onFilterChange?.(option.value)}
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Box>
      )}

      {/* Filter button with badge */}
      {onFilterClick && (
        <Badge badgeContent={activeFilterCount} color="primary">
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={onFilterClick}
            sx={{ textTransform: 'none' }}
          >
            Filters
          </Button>
        </Badge>
      )}

      {/* Filter icon only (alternative) */}
      {!onFilterClick && onFilterChange && !filterOptions && (
        <Tooltip title="Filter">
          <IconButton onClick={() => onFilterChange?.()}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}

      {/* Additional action icons */}
      {actions}
    </Box>
  )
}

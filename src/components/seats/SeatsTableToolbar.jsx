import {
  Box,
  Stack,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  InputBase,
  Divider,
  Skeleton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import ViewColumnOutlinedIcon from '@mui/icons-material/ViewColumnOutlined'
import SortIcon from '@mui/icons-material/Sort'
import SearchIcon from '@mui/icons-material/Search'
import { FilterChipMenu } from '../core'

/**
 * SeatsTableToolbar - Toolbar for the seats table with filters, search, columns, and sort
 *
 * @param {Object} props
 * @param {boolean} props.isLoading - Loading state
 * @param {number} props.totalCount - Total filtered users count
 * @param {boolean} props.isInternalTab - Whether internal users tab is active
 * @param {Array} props.selectedUsers - Array of selected user IDs
 * @param {number} props.allFilteredCount - Total count of all filtered users
 * @param {Function} props.onClearSelection - Handler to clear selection
 * @param {Function} props.onSelectAll - Handler to select all filtered users
 * @param {Function} props.onBulkSeatChange - Handler for bulk seat change
 * @param {Function} props.onBulkRoleChange - Handler for bulk role change
 * @param {Function} props.onBulkDelete - Handler for bulk delete
 * @param {Function} props.onExport - Handler for export
 * @param {Object} props.filters - Filter state object
 * @param {Object} props.filterAnchors - Filter anchor elements
 * @param {Function} props.onOpenFilter - Handler to open filter menu
 * @param {Function} props.onCloseFilter - Handler to close filter menu
 * @param {Function} props.onToggleFilter - Handler to toggle filter value
 * @param {Function} props.onClearFilter - Handler to clear filter
 * @param {Array} props.seatTypeOptions - Seat type filter options
 * @param {Array} props.roleOptions - Role filter options
 * @param {Array} props.groupOptions - Group filter options
 * @param {Object} props.visibleColumns - Visible columns object
 * @param {Object} props.columnConfig - Column configuration
 * @param {Function} props.onToggleColumn - Handler to toggle column visibility
 * @param {string} props.sortBy - Current sort field
 * @param {string} props.sortDirection - Current sort direction
 * @param {Function} props.onSort - Handler for sort
 * @param {string} props.searchQuery - Search query
 * @param {Function} props.onSearchChange - Handler for search change
 */
function SeatsTableToolbar({
  isLoading,
  totalCount,
  isInternalTab,
  selectedUsers = [],
  allFilteredCount,
  onClearSelection,
  onSelectAll,
  onBulkSeatChange,
  onBulkRoleChange,
  onBulkDelete,
  onExport,
  filters,
  filterAnchors,
  onOpenFilter,
  onCloseFilter,
  onToggleFilter,
  onClearFilter,
  seatTypeOptions,
  roleOptions,
  groupOptions,
  visibleColumns,
  columnConfig,
  onToggleColumn,
  sortBy,
  onSort,
  searchQuery,
  onSearchChange,
}) {
  const [columnsMenuAnchor, setColumnsMenuAnchor] = useState(null)
  const [sortMenuAnchor, setSortMenuAnchor] = useState(null)

  const hasSelection = selectedUsers.length > 0

  if (hasSelection) {
    return (
      <Box
        sx={{
          px: 2,
          minHeight: 52,
          borderBottom: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'primary.light',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <IconButton size="small" onClick={onClearSelection}>
            <CloseIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2" fontWeight={600} color="primary.main">
            {selectedUsers.length} Users Selected
          </Typography>
          {selectedUsers.length < allFilteredCount && (
            <Typography
              variant="body2"
              component="span"
              sx={{
                color: 'primary.main',
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' },
              }}
              onClick={onSelectAll}
            >
              Select all {allFilteredCount} users
            </Typography>
          )}
          <Tooltip title="Change Seat Type">
            <IconButton size="small" onClick={onBulkSeatChange}>
              <SwapHorizOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Change Role">
            <IconButton size="small" onClick={onBulkRoleChange}>
              <BadgeOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" onClick={onBulkDelete}>
              <DeleteOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Export all selected users">
            <IconButton size="small" onClick={() => onExport(selectedUsers.length)}>
              <FileDownloadOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        px: 2,
        minHeight: 52,
        borderBottom: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'background.paper',
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        {isLoading ? (
          <Skeleton variant="text" width={80} height={24} />
        ) : (
          <Typography sx={{ fontSize: 16, lineHeight: '22px', fontWeight: 700 }}>
            {totalCount} {isInternalTab ? 'Internal-Only Users' : 'Users'}
          </Typography>
        )}
        <Tooltip title={totalCount === 0 ? 'No users to export' : `Export ${totalCount} users`}>
          <span>
            <Button
              size="small"
              variant="contained"
              color="primary"
              startIcon={<FileDownloadOutlinedIcon />}
              disabled={totalCount === 0}
              onClick={() => onExport(totalCount)}
              sx={{ textTransform: 'none' }}
            >
              Export
            </Button>
          </span>
        </Tooltip>
      </Stack>

      <Stack direction="row" alignItems="center" spacing={1}>
        {/* Seat Types Filter */}
        <FilterChipMenu
          label="Seat Types"
          options={seatTypeOptions}
          selected={filters.seatType || []}
          anchorEl={filterAnchors?.seatType}
          onOpen={(e) => onOpenFilter('seatType', e.currentTarget)}
          onClose={() => onCloseFilter('seatType')}
          onToggle={(id) => onToggleFilter('seatType', id)}
          onClear={() => onClearFilter('seatType')}
        />

        {/* Roles Filter */}
        <FilterChipMenu
          label="Roles"
          options={roleOptions}
          selected={filters.role || []}
          anchorEl={filterAnchors?.role}
          onOpen={(e) => onOpenFilter('role', e.currentTarget)}
          onClose={() => onCloseFilter('role')}
          onToggle={(id) => onToggleFilter('role', id)}
          onClear={() => onClearFilter('role')}
        />

        {/* Groups Filter */}
        <FilterChipMenu
          label="Groups"
          options={groupOptions}
          selected={filters.group || []}
          anchorEl={filterAnchors?.group}
          onOpen={(e) => onOpenFilter('group', e.currentTarget)}
          onClose={() => onCloseFilter('group')}
          onToggle={(id) => onToggleFilter('group', id)}
          onClear={() => onClearFilter('group')}
          menuProps={{ PaperProps: { sx: { maxHeight: 400 } } }}
        />

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

        {/* Column Toggle */}
        <Tooltip title="Columns">
          <IconButton size="small" onClick={(e) => setColumnsMenuAnchor(e.currentTarget)}>
            <ViewColumnOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={columnsMenuAnchor}
          open={Boolean(columnsMenuAnchor)}
          onClose={() => setColumnsMenuAnchor(null)}
          PaperProps={{ sx: { minWidth: 180 } }}
        >
          {Object.entries(columnConfig).map(([key, config]) => (
            <MenuItem key={key} onClick={() => onToggleColumn(key)} sx={{ py: 1 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                {visibleColumns[key] && <CheckIcon fontSize="small" sx={{ color: 'text.secondary' }} />}
              </ListItemIcon>
              <ListItemText primary={config.label} primaryTypographyProps={{ variant: 'body2' }} />
            </MenuItem>
          ))}
        </Menu>

        {/* Sort */}
        <Tooltip title="Sort">
          <IconButton size="small" onClick={(e) => setSortMenuAnchor(e.currentTarget)}>
            <SortIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={sortMenuAnchor}
          open={Boolean(sortMenuAnchor)}
          onClose={() => setSortMenuAnchor(null)}
        >
          {Object.entries(columnConfig).map(([field, config]) => (
            <MenuItem
              key={field}
              onClick={() => {
                onSort(field)
                setSortMenuAnchor(null)
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                {sortBy === field && <CheckIcon fontSize="small" />}
              </ListItemIcon>
              <ListItemText primary={config.label} primaryTypographyProps={{ variant: 'body2' }} />
            </MenuItem>
          ))}
        </Menu>

        {/* Search */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '999px',
            px: 1.5,
            py: 0.5,
            ml: 1,
            backgroundColor: 'background.paper',
          }}
        >
          <SearchIcon sx={{ color: 'text.secondary', fontSize: 20, mr: 0.5 }} />
          <InputBase
            placeholder="Find"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            sx={{ fontSize: 14, width: 100 }}
          />
        </Box>
      </Stack>
    </Box>
  )
}

import { useState } from 'react'
export default SeatsTableToolbar

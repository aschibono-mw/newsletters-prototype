import {
  Chip,
  Menu,
  MenuItem,
  Checkbox,
  ListItemText,
  Box,
  Typography,
} from '@mui/material'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

/**
 * FilterChipMenu - Reusable filter chip with dropdown menu
 *
 * Provides a consistent pattern for filter chips that open a menu
 * with checkbox options for multi-select filtering.
 *
 * @param {Object} props
 * @param {string} props.label - Base label for the chip (e.g., "Seat Types")
 * @param {Array} props.options - Array of options: { id, label }
 * @param {Array} props.selected - Array of selected option IDs
 * @param {Function} props.onToggle - Called with option ID when toggled
 * @param {Function} props.onClear - Called when clear is clicked
 * @param {HTMLElement|null} props.anchorEl - Menu anchor element
 * @param {Function} props.onOpen - Called with event when chip is clicked
 * @param {Function} props.onClose - Called when menu should close
 * @param {Object} props.menuProps - Additional props for Menu component
 * @param {Object} props.chipProps - Additional props for Chip component
 */
function FilterChipMenu({
  label,
  options = [],
  selected = [],
  onToggle,
  onClear,
  anchorEl,
  onOpen,
  onClose,
  menuProps = {},
  chipProps = {},
}) {
  const selectedCount = selected.length

  return (
    <>
      <Chip
        icon={<FilterAltOutlinedIcon sx={{ fontSize: 16 }} />}
        label={`${label}${selectedCount > 0 ? ` (${selectedCount})` : ''}`}
        onClick={onOpen}
        onDelete={onOpen}
        deleteIcon={<ArrowDropDownIcon />}
        variant="outlined"
        sx={{
          backgroundColor: '#F5F5F5',
          borderColor: selectedCount > 0 ? 'primary.main' : 'divider',
          color: 'text.primary',
          fontWeight: 600,
          '& .MuiChip-deleteIcon': {
            color: 'inherit',
          },
          ...chipProps.sx,
        }}
        {...chipProps}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
        PaperProps={{ sx: { minWidth: 220, ...menuProps.PaperProps?.sx } }}
        {...menuProps}
      >
        <Box
          sx={{
            px: 2,
            py: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            SELECTED({selectedCount})
          </Typography>
          {selectedCount > 0 && (
            <Typography
              variant="caption"
              color="primary"
              sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
              onClick={onClear}
            >
              Clear
            </Typography>
          )}
        </Box>
        {options.map((option) => (
          <MenuItem key={option.id} onClick={() => onToggle(option.id)}>
            <Checkbox
              checked={selected.includes(option.id)}
              size="small"
              sx={{ p: 0, mr: 1.5 }}
            />
            <ListItemText
              primary={option.label}
              primaryTypographyProps={{ noWrap: true }}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default FilterChipMenu

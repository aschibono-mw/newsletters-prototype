import { useState, useRef } from 'react'
import {
  Checkbox,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDownRounded'
import CheckBoxIcon from '@mui/icons-material/CheckBoxRounded'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded'
import VisibilityIcon from '@mui/icons-material/VisibilityRounded'
import SwapVertIcon from '@mui/icons-material/SwapVertRounded'
import { DROPDOWN_MENU_OPTIONS } from '../../../../data/checkboxUXRData'

/**
 * IndeterminateCheckbox - Core checkbox component with configurable behavior variants
 *
 * @param {string} behavior - 'select-all' | 'deselect-all' | 'dropdown'
 * @param {boolean} checked - Whether checkbox is fully checked
 * @param {boolean} indeterminate - Whether checkbox is in indeterminate state
 * @param {function} onChange - Callback when checkbox state changes
 * @param {function} onSelectAll - Callback to select all items
 * @param {function} onDeselectAll - Callback to deselect all items
 * @param {function} onSelectVisible - Callback to select visible items (dropdown only)
 * @param {function} onInvert - Callback to invert selection (dropdown only)
 * @param {string} size - 'small' | 'medium'
 */
export default function IndeterminateCheckbox({
  behavior = 'select-all',
  checked = false,
  indeterminate = false,
  onChange,
  onSelectAll,
  onDeselectAll,
  onSelectVisible,
  onInvert,
  size = 'small',
  disabled = false,
}) {
  const [menuAnchor, setMenuAnchor] = useState(null)
  const checkboxRef = useRef(null)

  // Handle checkbox click based on behavior
  const handleClick = (event) => {
    if (behavior === 'dropdown') {
      setMenuAnchor(event.currentTarget)
      return
    }

    if (behavior === 'select-all') {
      // Indeterminate or unchecked → Select All, Checked → Deselect All
      if (checked) {
        onDeselectAll?.()
      } else {
        onSelectAll?.()
      }
    } else if (behavior === 'deselect-all') {
      // Indeterminate or checked → Deselect All, Unchecked → Select All
      if (checked || indeterminate) {
        onDeselectAll?.()
      } else {
        onSelectAll?.()
      }
    }

    onChange?.(event)
  }

  // Handle menu item selection
  const handleMenuSelect = (action) => {
    setMenuAnchor(null)
    switch (action) {
      case 'select-all':
        onSelectAll?.()
        break
      case 'select-none':
        onDeselectAll?.()
        break
      case 'select-visible':
        onSelectVisible?.()
        break
      case 'invert':
        onInvert?.()
        break
    }
  }

  const handleMenuClose = () => {
    setMenuAnchor(null)
  }

  // Get menu item icon
  const getMenuIcon = (optionId) => {
    switch (optionId) {
      case 'select-all':
        return <CheckBoxIcon fontSize="small" />
      case 'select-none':
        return <CheckBoxOutlineBlankIcon fontSize="small" />
      case 'select-visible':
        return <VisibilityIcon fontSize="small" />
      case 'invert':
        return <SwapVertIcon fontSize="small" />
      default:
        return null
    }
  }

  // Render dropdown variant
  if (behavior === 'dropdown') {
    return (
      <>
        <Tooltip title="Select" placement="bottom" enterDelay={400}>
          <Box
            ref={checkboxRef}
            onClick={handleClick}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              cursor: disabled ? 'default' : 'pointer',
              opacity: disabled ? 0.5 : 1,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: disabled ? 'transparent' : 'action.hover',
              },
            }}
          >
            <Checkbox
              checked={checked}
              indeterminate={indeterminate}
              size={size}
              disabled={disabled}
              sx={{ pointerEvents: 'none' }}
            />
            <ArrowDropDownIcon
              fontSize="small"
              sx={{
                ml: -0.5,
                color: disabled ? 'action.disabled' : 'action.active',
              }}
            />
          </Box>
        </Tooltip>
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          {DROPDOWN_MENU_OPTIONS.map((option) => (
            <MenuItem
              key={option.id}
              onClick={() => handleMenuSelect(option.id)}
              sx={{ minWidth: 160 }}
            >
              <ListItemIcon>{getMenuIcon(option.id)}</ListItemIcon>
              <ListItemText>{option.label}</ListItemText>
            </MenuItem>
          ))}
        </Menu>
      </>
    )
  }

  // Render standard checkbox (Option A or B)
  return (
    <Tooltip title="Select" placement="bottom" enterDelay={400}>
      <Checkbox
        ref={checkboxRef}
        checked={checked}
        indeterminate={indeterminate}
        onChange={handleClick}
        size={size}
        disabled={disabled}
      />
    </Tooltip>
  )
}

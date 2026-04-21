import { useState, useCallback } from 'react'
import { Box, Typography, Paper, Checkbox, Collapse, IconButton, Tooltip } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMoreRounded'

const INDENT_PX = 24

/**
 * TreeList - Reusable hierarchical list with checkboxes
 *
 * @param {object} data - Tree data with { id, name, type: 'folder'|'file', children? }
 * @param {array} selected - Array of selected item IDs
 * @param {function} onSelectionChange - Callback with updated selection array
 * @param {array} defaultExpanded - Array of folder IDs to expand by default
 * @param {node} headerCheckbox - Optional custom header checkbox component for folders
 * @param {boolean} disablePaper - If true, renders without Paper wrapper
 * @param {number} maxHeight - Max height for scrollable area
 */
export default function TreeList({
  data,
  selected = [],
  onSelectionChange,
  defaultExpanded = [],
  renderFolderCheckbox,
  disablePaper = false,
  maxHeight = 400,
}) {
  const [expanded, setExpanded] = useState(defaultExpanded)

  const toggleExpanded = (id) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const getAllFileIds = useCallback((node) => {
    if (node.type === 'file') return [node.id]
    if (!node.children) return []
    return node.children.flatMap(getAllFileIds)
  }, [])

  const getFolderState = useCallback((node) => {
    const descendants = getAllFileIds(node)
    const selectedCount = descendants.filter((id) => selected.includes(id)).length
    if (selectedCount === 0) return { checked: false, indeterminate: false }
    if (selectedCount === descendants.length) return { checked: true, indeterminate: false }
    return { checked: false, indeterminate: true }
  }, [selected, getAllFileIds])

  const handleFolderSelect = (node, selectAll) => {
    const descendants = getAllFileIds(node)
    if (selectAll) {
      onSelectionChange?.([...new Set([...selected, ...descendants])])
    } else {
      onSelectionChange?.(selected.filter((id) => !descendants.includes(id)))
    }
  }

  const handleFileToggle = (id) => {
    onSelectionChange?.(
      selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]
    )
  }

  const renderNode = (node, depth = 0) => {
    const isExpanded = expanded.includes(node.id)
    const isFile = node.type === 'file'
    const isSelected = selected.includes(node.id)
    const indent = depth * INDENT_PX

    if (isFile) {
      return (
        <Box
          key={node.id}
          onClick={() => handleFileToggle(node.id)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            py: 0.75,
            pl: `${indent + 32}px`,
            pr: 2,
            cursor: 'pointer',
            backgroundColor: isSelected ? 'grey.100' : 'transparent',
            '&:hover': { backgroundColor: isSelected ? 'grey.200' : 'action.hover' },
          }}
        >
          <Tooltip title="Select" placement="bottom" enterDelay={400}>
            <Checkbox checked={isSelected} size="small" />
          </Tooltip>
          <Typography variant="body2" sx={{ ml: 1 }}>{node.name}</Typography>
        </Box>
      )
    }

    const { checked, indeterminate } = getFolderState(node)

    return (
      <Box key={node.id}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            py: 0.75,
            pl: `${indent}px`,
            pr: 2,
            '&:hover': { backgroundColor: 'action.hover' },
          }}
        >
          <IconButton size="small" onClick={() => toggleExpanded(node.id)}>
            <ExpandMoreIcon
              fontSize="small"
              sx={{ transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)', transition: '0.2s' }}
            />
          </IconButton>
          {renderFolderCheckbox ? (
            renderFolderCheckbox({
              checked,
              indeterminate,
              onSelectAll: () => handleFolderSelect(node, true),
              onDeselectAll: () => handleFolderSelect(node, false),
            })
          ) : (
            <Tooltip title="Select" placement="bottom" enterDelay={400}>
              <Checkbox
                checked={checked}
                indeterminate={indeterminate}
                size="small"
                onChange={(e) => handleFolderSelect(node, e.target.checked)}
              />
            </Tooltip>
          )}
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, ml: 1, cursor: 'pointer' }}
            onClick={() => toggleExpanded(node.id)}
          >
            {node.name}
          </Typography>
        </Box>
        <Collapse in={isExpanded}>
          {node.children?.map((child) => renderNode(child, depth + 1))}
        </Collapse>
      </Box>
    )
  }

  const content = renderNode(data)

  if (disablePaper) {
    return (
      <Box sx={{ maxHeight, overflow: 'auto' }}>
        {content}
      </Box>
    )
  }

  return (
    <Paper variant="outlined" sx={{ maxHeight, overflow: 'auto' }}>
      {content}
    </Paper>
  )
}

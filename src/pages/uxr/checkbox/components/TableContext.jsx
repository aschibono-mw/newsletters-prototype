import { useState, useEffect } from 'react'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Checkbox,
  Paper,
  Tooltip,
  Typography,
  Stack,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import IndeterminateCheckbox from './IndeterminateCheckbox'
import { TABLE_ITEMS } from '../../../../data/checkboxUXRData'
import { headerCellSeparatorSx } from '../../../../constants/tableStyles'

export default function TableContext({
  behavior = 'select-all',
  initialSelection,
  onSelectionChange,
}) {
  const [selectedIds, setSelectedIds] = useState(
    initialSelection || [TABLE_ITEMS[0].id, TABLE_ITEMS[2].id, TABLE_ITEMS[4].id]
  )
  const [sortBy, setSortBy] = useState('name')
  const [sortDirection, setSortDirection] = useState('asc')

  useEffect(() => {
    if (initialSelection) {
      setSelectedIds(initialSelection)
    }
  }, [initialSelection])

  useEffect(() => {
    onSelectionChange?.(selectedIds)
  }, [selectedIds, onSelectionChange])

  const allIds = TABLE_ITEMS.map((item) => item.id)

  const getCheckboxState = () => {
    if (selectedIds.length === 0) return { checked: false, indeterminate: false }
    if (selectedIds.length === allIds.length) return { checked: true, indeterminate: false }
    return { checked: false, indeterminate: true }
  }

  const { checked, indeterminate } = getCheckboxState()

  const handleSelectAll = () => setSelectedIds([...allIds])
  const handleDeselectAll = () => setSelectedIds([])
  const handleSelectVisible = () => setSelectedIds([...allIds])
  const handleInvert = () => setSelectedIds(allIds.filter((id) => !selectedIds.includes(id)))

  const handleRowSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy(column)
      setSortDirection('asc')
    }
  }

  // Sort items
  const sortedItems = [...TABLE_ITEMS].sort((a, b) => {
    const aVal = a[sortBy] || ''
    const bVal = b[sortBy] || ''
    const comparison = aVal.localeCompare(bVal)
    return sortDirection === 'asc' ? comparison : -comparison
  })

  const isSelected = selectedIds.length > 0

  return (
    <Paper variant="outlined">
      {/* Table Toolbar */}
      <Box
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          height: 52,
          display: 'flex',
          alignItems: 'center',
          px: 2,
          backgroundColor: isSelected ? 'primary.light' : 'transparent',
        }}
      >
        {isSelected ? (
          <Stack direction="row" spacing={1.5} alignItems="center">
            <IconButton
              size="small"
              onClick={handleDeselectAll}
              sx={{ color: 'primary.dark' }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'primary.dark' }}>
              {selectedIds.length} {selectedIds.length === 1 ? 'Item' : 'Items'} Selected
            </Typography>
          </Stack>
        ) : (
          <Typography variant="subtitle2" fontWeight={600}>
            {TABLE_ITEMS.length} Documents
          </Typography>
        )}
      </Box>

      {/* Table */}
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: 'background.paper', borderBottom: '2px solid', borderColor: 'divider' }}>
              <TableCell padding="checkbox" sx={{ ...headerCellSeparatorSx }}>
                <IndeterminateCheckbox
                  behavior={behavior}
                  checked={checked}
                  indeterminate={indeterminate}
                  onSelectAll={handleSelectAll}
                  onDeselectAll={handleDeselectAll}
                  onSelectVisible={handleSelectVisible}
                  onInvert={handleInvert}
                />
              </TableCell>
              <TableCell
                sortDirection={sortBy === 'name' ? sortDirection : false}
                sx={headerCellSeparatorSx}
              >
                <TableSortLabel
                  active={sortBy === 'name'}
                  direction={sortBy === 'name' ? sortDirection : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell
                sortDirection={sortBy === 'type' ? sortDirection : false}
                sx={headerCellSeparatorSx}
              >
                <TableSortLabel
                  active={sortBy === 'type'}
                  direction={sortBy === 'type' ? sortDirection : 'asc'}
                  onClick={() => handleSort('type')}
                >
                  Type
                </TableSortLabel>
              </TableCell>
              <TableCell
                sortDirection={sortBy === 'size' ? sortDirection : false}
                sx={{ fontWeight: 600 }}
              >
                <TableSortLabel
                  active={sortBy === 'size'}
                  direction={sortBy === 'size' ? sortDirection : 'asc'}
                  onClick={() => handleSort('size')}
                >
                  Size
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedItems.map((item) => {
              const isRowSelected = selectedIds.includes(item.id)
              return (
                <TableRow
                  key={item.id}
                  hover
                  selected={isRowSelected}
                  onClick={() => handleRowSelect(item.id)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                    <Tooltip title="Select">
                      <Checkbox
                        checked={isRowSelected}
                        onChange={() => handleRowSelect(item.id)}
                        size="small"
                      />
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={500}>
                      {item.name}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                    {item.type}
                  </TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{item.size}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

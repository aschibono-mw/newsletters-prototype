import { useState } from 'react'
import { Box, Typography, Stack, Paper, Select, MenuItem, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import MuiPagination from '@mui/material/Pagination'
import MuiPaginationItem from '@mui/material/PaginationItem'
import { typography } from '../../theme-tokens'
import FeaturesSection from '../docs/FeaturesSection'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import LastPageIcon from '@mui/icons-material/LastPage'

// Themed Pagination using MUI Pagination
const ThemedPagination = styled(MuiPagination)(({ theme }) => ({
  '& .MuiPaginationItem-root': {
    color: theme.palette.text.primary,
    fontFamily: typography.fontFamily.base,
    fontSize: typography.body1.fontSize,
    fontWeight: typography.fontWeight.regular,

    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },

    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      fontWeight: typography.fontWeight.bold,

      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },

    '&.Mui-disabled': {
      opacity: 0.38,
    },
  },
}))

// Custom Table Pagination Component
function ThemedTablePagination({
  count = 100,
  page = 0,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [10, 25, 50, 100]
}) {
  const totalPages = Math.ceil(count / rowsPerPage)
  const startItem = page * rowsPerPage + 1
  const endItem = Math.min((page + 1) * rowsPerPage, count)

  const handlePrevious = () => {
    if (page > 0) {
      onPageChange(null, page - 1)
    }
  }

  const handleNext = () => {
    if (page < totalPages - 1) {
      onPageChange(null, page + 1)
    }
  }

  const handleFirst = () => {
    onPageChange(null, 0)
  }

  const handleLast = () => {
    onPageChange(null, totalPages - 1)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      {/* Left: Rows per page */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Rows per page:
        </Typography>
        <Select
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(e)}
          size="small"
          sx={{
            minWidth: 70,
            '& .MuiOutlinedInput-notchedOutline': {
              border: '1px solid',
              borderColor: 'divider',
            },
          }}
        >
          {rowsPerPageOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Right: Item count and navigation */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {startItem}-{endItem} of {count}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <IconButton
            size="small"
            onClick={handleFirst}
            disabled={page === 0}
            sx={{ border: '1px solid', borderColor: 'divider' }}
          >
            <FirstPageIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={handlePrevious}
            disabled={page === 0}
            sx={{ border: '1px solid', borderColor: 'divider' }}
          >
            <ChevronLeftIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={handleNext}
            disabled={page >= totalPages - 1}
            sx={{ border: '1px solid', borderColor: 'divider' }}
          >
            <ChevronRightIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={handleLast}
            disabled={page >= totalPages - 1}
            sx={{ border: '1px solid', borderColor: 'divider' }}
          >
            <LastPageIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

function PaginationThemed() {
  const [page1, setPage1] = useState(2)
  const [page2, setPage2] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  return (
    <div className="themed-showcase">
      {/* Basic Pagination */}
      <div className="variant-section">
        <h4>Basic Pagination</h4>
        <p>Standard pagination with page numbers and teal selection color.</p>
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Default
            </Typography>
            <ThemedPagination count={10} />
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              With Page 3 Selected
            </Typography>
            <ThemedPagination
              count={10}
              page={page1}
              onChange={(e, value) => setPage1(value)}
            />
          </Box>
        </Stack>
      </div>

      {/* Variants */}
      <div className="variant-section">
        <h4>Variants</h4>
        <p>Outlined variant with border styling.</p>
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Text (Default)
            </Typography>
            <ThemedPagination count={10} variant="text" />
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Outlined
            </Typography>
            <ThemedPagination count={10} variant="outlined" />
          </Box>
        </Stack>
      </div>

      {/* Sizes */}
      <div className="variant-section">
        <h4>Sizes</h4>
        <p>Three size options: small, medium (default), and large.</p>
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Small
            </Typography>
            <ThemedPagination count={10} size="small" />
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Medium (Default)
            </Typography>
            <ThemedPagination count={10} size="medium" />
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Large
            </Typography>
            <ThemedPagination count={10} size="large" />
          </Box>
        </Stack>
      </div>

      {/* Shape */}
      <div className="variant-section">
        <h4>Shape</h4>
        <p>Rounded (6px border radius matching design system).</p>
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Rounded (Design System Default)
            </Typography>
            <ThemedPagination count={10} shape="rounded" />
          </Box>
        </Stack>
      </div>

      {/* States */}
      <div className="variant-section">
        <h4>States</h4>
        <p>Different interactive states including disabled and button visibility controls.</p>
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Disabled
            </Typography>
            <ThemedPagination count={10} disabled />
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Show First/Last Buttons
            </Typography>
            <ThemedPagination count={10} showFirstButton showLastButton />
          </Box>
        </Stack>
      </div>

      {/* Sibling Count & Boundary Count */}
      <div className="variant-section">
        <h4>Sibling Count & Boundary Count</h4>
        <p>Control how many page numbers are shown around current page and at the edges.</p>
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Default (siblingCount=1, boundaryCount=1)
            </Typography>
            <ThemedPagination count={20} defaultPage={10} />
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              More Siblings (siblingCount=2)
            </Typography>
            <ThemedPagination count={20} defaultPage={10} siblingCount={2} />
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Compact (siblingCount=0, boundaryCount=1)
            </Typography>
            <ThemedPagination count={20} defaultPage={10} siblingCount={0} />
          </Box>
        </Stack>
      </div>

      {/* Table Pagination */}
      <div className="variant-section">
        <h4>Table Pagination</h4>
        <p>Pagination integrated with tables as used in the UsersPage pattern.</p>
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Standard Table Pagination
            </Typography>
            <Paper variant="outlined">
              <ThemedTablePagination
                count={100}
                page={page2}
                rowsPerPage={rowsPerPage}
                onPageChange={(e, newPage) => setPage2(newPage)}
                onRowsPerPageChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10))
                  setPage2(0)
                }}
              />
            </Paper>
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Large Dataset (500 items)
            </Typography>
            <Paper variant="outlined">
              <ThemedTablePagination
                count={500}
                page={0}
                rowsPerPage={50}
                onPageChange={() => {}}
                onRowsPerPageChange={() => {}}
                rowsPerPageOptions={[10, 25, 50, 100]}
              />
            </Paper>
          </Box>
        </Stack>
      </div>

      <FeaturesSection
        features={[
          { feature: "Visual Styling", description: "Teal (#0891B2) for selected state, Inter font (14px regular, 700 for selected), rounded shape (6px border radius)" },
          { feature: "Variants & Sizes", description: "Variants: text (default), outlined. Sizes: small, medium (default), large. States: default, hover (grey), selected (teal), disabled (38% opacity)" },
          { feature: "Table Pagination", description: "Custom component with rows-per-page selector, item count display, navigation controls (first, previous, next, last)" },
          { feature: "Common Use Cases", description: "Tables, search results, content lists. ARIA labels and keyboard navigation for accessibility" },
        ]}
      />
    </div>
  )
}

export default PaginationThemed

import { Box, Typography, Pagination, Stack, TablePagination, Paper } from '@mui/material'

function PaginationBaseline() {
  return (
    <div className="baseline-showcase">
      {/* Basic Pagination */}
      <div className="variant-section">
        <h4>Basic Pagination</h4>
        <p>Standard pagination with page numbers.</p>
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Default
            </Typography>
            <Pagination count={10} />
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              With Page 3 Selected
            </Typography>
            <Pagination count={10} defaultPage={3} />
          </Box>
        </Stack>
      </div>

      {/* Variants */}
      <div className="variant-section">
        <h4>Variants</h4>
        <p>Different visual styles: text (default), outlined, and combined.</p>
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Text (Default)
            </Typography>
            <Pagination count={10} variant="text" />
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Outlined
            </Typography>
            <Pagination count={10} variant="outlined" />
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
            <Pagination count={10} size="small" />
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Medium (Default)
            </Typography>
            <Pagination count={10} size="medium" />
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Large
            </Typography>
            <Pagination count={10} size="large" />
          </Box>
        </Stack>
      </div>

      {/* Shape */}
      <div className="variant-section">
        <h4>Shape</h4>
        <p>Rounded or circular button shapes.</p>
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Rounded (Default)
            </Typography>
            <Pagination count={10} shape="rounded" />
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Circular
            </Typography>
            <Pagination count={10} shape="circular" />
          </Box>
        </Stack>
      </div>

      {/* Colors */}
      <div className="variant-section">
        <h4>Colors</h4>
        <p>Primary, secondary, and standard color variants.</p>
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Primary (Default)
            </Typography>
            <Pagination count={10} color="primary" />
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Secondary
            </Typography>
            <Pagination count={10} color="secondary" />
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Standard
            </Typography>
            <Pagination count={10} color="standard" />
          </Box>
        </Stack>
      </div>

      {/* States */}
      <div className="variant-section">
        <h4>States</h4>
        <p>Different interactive states including disabled and hidden buttons.</p>
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Disabled
            </Typography>
            <Pagination count={10} disabled />
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Hide Previous/Next Buttons
            </Typography>
            <Pagination count={10} hidePrevButton hideNextButton />
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Show First/Last Buttons
            </Typography>
            <Pagination count={10} showFirstButton showLastButton />
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
            <Pagination count={20} defaultPage={10} />
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              More Siblings (siblingCount=2)
            </Typography>
            <Pagination count={20} defaultPage={10} siblingCount={2} />
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              More Boundaries (boundaryCount=2)
            </Typography>
            <Pagination count={20} defaultPage={10} boundaryCount={2} />
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Compact (siblingCount=0, boundaryCount=1)
            </Typography>
            <Pagination count={20} defaultPage={10} siblingCount={0} />
          </Box>
        </Stack>
      </div>

      {/* Table Pagination */}
      <div className="variant-section">
        <h4>Table Pagination</h4>
        <p>Pagination integrated with tables, showing rows per page selector and item count.</p>
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Standard Table Pagination
            </Typography>
            <Paper variant="outlined">
              <TablePagination
                component="div"
                count={100}
                page={0}
                onPageChange={() => {}}
                rowsPerPage={10}
                onRowsPerPageChange={() => {}}
              />
            </Paper>
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Custom Rows Per Page Options
            </Typography>
            <Paper variant="outlined">
              <TablePagination
                component="div"
                count={250}
                page={0}
                onPageChange={() => {}}
                rowsPerPage={25}
                onRowsPerPageChange={() => {}}
                rowsPerPageOptions={[10, 25, 50, 100]}
              />
            </Paper>
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              With Label
            </Typography>
            <Paper variant="outlined">
              <TablePagination
                component="div"
                count={500}
                page={2}
                onPageChange={() => {}}
                rowsPerPage={50}
                onRowsPerPageChange={() => {}}
                labelRowsPerPage="Items per page:"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
              />
            </Paper>
          </Box>
        </Stack>
      </div>

      {/* Specifications */}
      <div className="variant-section">
        <h4>Specifications</h4>
        <Typography variant="body2" color="text.secondary">
          <strong>Component:</strong> Pagination, TablePagination (@mui/material)
          <br />
          <strong>Variants:</strong> text (default), outlined
          <br />
          <strong>Sizes:</strong> small, medium (default), large
          <br />
          <strong>Shapes:</strong> rounded (default), circular
          <br />
          <strong>Colors:</strong> primary, secondary, standard
          <br />
          <strong>States:</strong> default, hover, selected, disabled
          <br />
          <strong>Controls:</strong> siblingCount (pages around current), boundaryCount (pages at edges)
          <br />
          <strong>Table Pagination:</strong> Integrated with tables, includes rows-per-page selector
          <br />
          <strong>Accessibility:</strong> ARIA labels, keyboard navigation (Tab, Enter, Arrow keys)
          <br />
          <strong>Best Practices:</strong> Use for navigating large datasets, combine with loading states
          <br />• Commonly used for: Tables, search results, content lists, galleries
        </Typography>
      </div>
    </div>
  )
}

export default PaginationBaseline

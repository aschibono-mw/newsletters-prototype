import { Box, Typography, Table, TableBody, TableRow, TableCell } from '@mui/material'

/**
 * AccessibilitySection - Displays accessibility info for a component
 *
 * @param {Array} wcag - Array of { id, name, level, note } objects
 */
function AccessibilitySection({ wcag = [] }) {
  return (
    <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Accessibility
      </Typography>

      {/* WCAG criteria table */}
      {wcag.length > 0 && (
        <>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              color: 'text.secondary',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              display: 'block',
              mb: 1
            }}
          >
            WCAG
          </Typography>
          <Table size="small" sx={{ width: '100%' }}>
            <TableBody>
              {wcag.map((criterion) => (
                <TableRow
                  key={criterion.id}
                  sx={{
                    '&:last-child td': { borderBottom: 0 },
                    '& td': {
                      borderColor: 'divider',
                      py: 0.75,
                    }
                  }}
                >
                  <TableCell
                    sx={{
                      pl: 0,
                      pr: 3,
                      whiteSpace: 'nowrap',
                      fontWeight: 500,
                      fontFamily: 'monospace',
                      fontSize: '0.8125rem',
                      color: 'text.primary',
                    }}
                  >
                    {criterion.id}
                  </TableCell>
                  <TableCell
                    sx={{
                      px: 2,
                      whiteSpace: 'nowrap',
                      color: 'text.secondary',
                      fontSize: '0.875rem',
                    }}
                  >
                    {criterion.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      px: 3,
                      whiteSpace: 'nowrap',
                      fontWeight: 500,
                      fontSize: '0.75rem',
                      color: criterion.level === 'AA' ? 'primary.main' : 'text.secondary',
                    }}
                  >
                    {criterion.level}
                  </TableCell>
                  <TableCell
                    sx={{
                      pl: 3,
                      pr: 0,
                      whiteSpace: 'nowrap',
                      color: 'text.secondary',
                      fontSize: '0.8125rem',
                    }}
                  >
                    {criterion.note}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </Box>
  )
}

export default AccessibilitySection

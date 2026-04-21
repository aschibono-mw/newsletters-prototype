import { Box, Typography, Table, TableBody, TableRow, TableCell } from '@mui/material'

/**
 * FeaturesSection - Displays component features in a scannable table
 *
 * @param {Array} features - Array of { feature, description } objects
 */
function FeaturesSection({ features = [] }) {
  return (
    <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Features
      </Typography>

      {features.length > 0 && (
        <Table size="small" sx={{ width: '100%' }}>
          <TableBody>
            {features.map((item, index) => (
              <TableRow
                key={index}
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
                    fontSize: '0.875rem',
                    color: 'text.primary',
                    width: '30%',
                  }}
                >
                  {item.feature}
                </TableCell>
                <TableCell
                  sx={{
                    pl: 0,
                    pr: 0,
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                  }}
                >
                  {item.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  )
}

export default FeaturesSection

import { Box } from '@mui/material'

/**
 * PageShell - Standard page container with consistent layout structure
 *
 * Provides the standard page layout with:
 * - Full viewport height minus header
 * - Grey background
 * - Optional maxWidth constraint on content
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Page content
 * @param {string|number} props.maxWidth - Max width for content area (default: 1536)
 * @param {boolean} props.disablePadding - Disable default padding on content area
 * @param {Object} props.sx - Additional sx styles
 */
function PageShell({
  children,
  sx = {},
}) {
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        backgroundColor: '#F5F5F5',
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}

export default PageShell

import { Box, Typography } from '@mui/material'

/**
 * CoreVariantSection - Section with solid primary left-border accent
 *
 * @param {string} title - Section title
 * @param {React.ReactNode} children - Section content
 * @param {object} [sx] - Additional MUI sx styles
 */
function CoreVariantSection({ title, children, sx }) {
  return (
    <Box
      sx={{
        mb: 4,
        pl: 2,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          borderRadius: 1.5,
          backgroundColor: 'primary.main',
        },
        ...sx,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        {title}
      </Typography>
      {children}
    </Box>
  )
}

export default CoreVariantSection

import { Box, Container, Typography, Breadcrumbs, Link as MuiLink } from '@mui/material'
import { Link } from 'react-router-dom'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

/**
 * CoreDetailPageLayout - Page wrapper for Core DS component detail pages
 *
 * @param {string} title - Component name
 * @param {string} description - Component description
 * @param {React.ReactNode} children - Page content
 * @param {object} [sx] - Additional MUI sx styles
 */
function CoreDetailPageLayout({ title, description, children, sx }) {
  return (
    <Container maxWidth={false} sx={{ maxWidth: 1200, mx: 'auto', px: 3, pt: 8, pb: 4, ...sx }}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 3 }}>
        <MuiLink component={Link} to="/ds-collection" underline="hover" color="inherit">
          DS Collection
        </MuiLink>
        <Typography color="text.primary">{title}</Typography>
      </Breadcrumbs>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: 'background.paper',
          borderRadius: 2,
          p: 4,
          border: '1px solid',
          borderColor: 'divider',
          borderTop: '3px solid',
          borderTopColor: 'primary.main',
        }}
      >
        {children}
      </Box>
    </Container>
  )
}

export default CoreDetailPageLayout

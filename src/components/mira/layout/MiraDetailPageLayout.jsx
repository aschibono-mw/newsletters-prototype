import { Box, Container, Typography, Breadcrumbs, Link as MuiLink } from '@mui/material'
import { Link } from 'react-router-dom'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import MiraGradientBox from '../MiraGradientBox'

/**
 * MiraDetailPageLayout - Page wrapper with Mira styling for component detail pages
 *
 * @param {string} title - Component name
 * @param {string} description - Component description
 * @param {React.ReactNode} children - Page content
 * @param {object} [sx] - Additional MUI sx styles
 */
function MiraDetailPageLayout({ title, description, children, sx }) {
  return (
    <MiraGradientBox variant="subtle" sx={{ minHeight: '100vh', ...sx }}>
      <Container maxWidth={false} sx={{ maxWidth: 1200, mx: 'auto', px: 3, pt: 8, pb: 4 }}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 3 }}>
          <MuiLink component={Link} to="/mira-components" underline="hover" color="inherit">
            Mira Components
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
          }}
        >
          {children}
        </Box>
      </Container>
    </MiraGradientBox>
  )
}

export default MiraDetailPageLayout

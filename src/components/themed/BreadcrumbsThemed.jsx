import {
  Box,
  Stack,
  Typography,
  Breadcrumbs,
  Link,
} from '@mui/material'
import FeaturesSection from '../docs/FeaturesSection'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined'

function BreadcrumbsThemed() {
  return (
    <div className="themed-showcase">
      {/* Basic Breadcrumbs */}
      <div className="variant-section">
        <h4>Basic</h4>
        <p>Simple text-based breadcrumb navigation.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Default Separator
            </Typography>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="#">
                Home
              </Link>
              <Link underline="hover" color="inherit" href="#">
                Category
              </Link>
              <Typography color="text.primary">Current Page</Typography>
            </Breadcrumbs>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Arrow Separator
            </Typography>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link underline="hover" color="inherit" href="#">
                Home
              </Link>
              <Link underline="hover" color="inherit" href="#">
                Products
              </Link>
              <Typography color="text.primary">Item Details</Typography>
            </Breadcrumbs>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Chevron Separator
            </Typography>
            <Breadcrumbs
              separator={<ChevronRightOutlinedIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link underline="hover" color="inherit" href="#">
                Dashboard
              </Link>
              <Link underline="hover" color="inherit" href="#">
                Settings
              </Link>
              <Typography color="text.primary">Account</Typography>
            </Breadcrumbs>
          </Box>
        </Stack>
      </div>

      {/* With Icons */}
      <div className="variant-section">
        <h4>With Icons</h4>
        <p>Breadcrumbs with leading icons for visual context.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Icon Links
            </Typography>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link
                underline="hover"
                color="inherit"
                href="#"
                sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
              >
                <HomeOutlinedIcon fontSize="small" />
                Home
              </Link>
              <Link
                underline="hover"
                color="inherit"
                href="#"
                sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
              >
                <FolderOutlinedIcon fontSize="small" />
                Projects
              </Link>
              <Typography
                color="text.primary"
                sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
              >
                <DescriptionOutlinedIcon fontSize="small" />
                Document
              </Typography>
            </Breadcrumbs>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Icon Only Home
            </Typography>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link
                underline="hover"
                color="inherit"
                href="#"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <HomeOutlinedIcon fontSize="small" />
              </Link>
              <Link underline="hover" color="inherit" href="#">
                Library
              </Link>
              <Link underline="hover" color="inherit" href="#">
                Data
              </Link>
              <Typography color="text.primary">Archive</Typography>
            </Breadcrumbs>
          </Box>
        </Stack>
      </div>

      {/* Collapsed Breadcrumbs */}
      <div className="variant-section">
        <h4>Collapsed</h4>
        <p>Long breadcrumb trails collapse middle items to save space.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Max Items = 3
            </Typography>
            <Breadcrumbs
              maxItems={3}
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link underline="hover" color="inherit" href="#">
                Home
              </Link>
              <Link underline="hover" color="inherit" href="#">
                Category
              </Link>
              <Link underline="hover" color="inherit" href="#">
                Subcategory
              </Link>
              <Link underline="hover" color="inherit" href="#">
                Section
              </Link>
              <Typography color="text.primary">Current Page</Typography>
            </Breadcrumbs>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Items Before/After Collapse
            </Typography>
            <Breadcrumbs
              maxItems={4}
              itemsBeforeCollapse={1}
              itemsAfterCollapse={2}
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link underline="hover" color="inherit" href="#">
                Home
              </Link>
              <Link underline="hover" color="inherit" href="#">
                Level 1
              </Link>
              <Link underline="hover" color="inherit" href="#">
                Level 2
              </Link>
              <Link underline="hover" color="inherit" href="#">
                Level 3
              </Link>
              <Link underline="hover" color="inherit" href="#">
                Level 4
              </Link>
              <Typography color="text.primary">Final</Typography>
            </Breadcrumbs>
          </Box>
        </Stack>
      </div>

      {/* Custom Styling */}
      <div className="variant-section">
        <h4>Custom Styling</h4>
        <p>Breadcrumbs with custom separators and styling.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Text Separator
            </Typography>
            <Breadcrumbs separator="-" aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="#">
                MUI
              </Link>
              <Link underline="hover" color="inherit" href="#">
                Components
              </Link>
              <Typography color="text.primary">Breadcrumbs</Typography>
            </Breadcrumbs>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Styled Links
            </Typography>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link
                underline="hover"
                href="#"
                sx={{ color: 'primary.main', fontWeight: 500 }}
              >
                Dashboard
              </Link>
              <Link
                underline="hover"
                href="#"
                sx={{ color: 'primary.main', fontWeight: 500 }}
              >
                Reports
              </Link>
              <Typography color="text.primary" fontWeight={600}>
                Analytics
              </Typography>
            </Breadcrumbs>
          </Box>
        </Stack>
      </div>

      <FeaturesSection
        features={[
          { feature: "Navigation Trail", description: "Shows hierarchical path from root to current location, helping users understand site structure" },
          { feature: "Separators", description: "Customizable separators: default (/), NavigateNextIcon, ChevronRightIcon, or custom text/components" },
          { feature: "Collapse Control", description: "maxItems, itemsBeforeCollapse, itemsAfterCollapse props manage long trails with ellipsis expansion" },
          { feature: "Icon Support", description: "Links can include leading icons (HomeOutlined, FolderOutlined) for visual context" },
          { feature: "Active State", description: "Final item uses Typography (not Link) with text.primary color to indicate current page" },
        ]}
      />
    </div>
  )
}

export default BreadcrumbsThemed

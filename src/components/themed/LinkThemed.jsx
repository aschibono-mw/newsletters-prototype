import {
  Box,
  Stack,
  Typography,
  Link,
  Breadcrumbs,
} from '@mui/material'
import FeaturesSection from '../docs/FeaturesSection'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import LaunchIcon from '@mui/icons-material/Launch'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

function LinkThemed() {
  return (
    <div className="themed-showcase">
      {/* Inline Links */}
      <div className="variant-section">
        <h4>Inline Links</h4>
        <p>Links within body text for navigation or references.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Default (hover underline)
            </Typography>
            <Typography variant="body2">
              This is a paragraph with an{' '}
              <Link href="#" underline="hover" sx={{ cursor: 'pointer' }}>
                inline link
              </Link>{' '}
              that shows underline on hover.
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Always Underlined
            </Typography>
            <Typography variant="body2">
              This is a paragraph with an{' '}
              <Link href="#" underline="always" sx={{ cursor: 'pointer' }}>
                inline link
              </Link>{' '}
              that is always underlined.
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              No Underline
            </Typography>
            <Typography variant="body2">
              This is a paragraph with an{' '}
              <Link href="#" underline="none" sx={{ cursor: 'pointer' }}>
                inline link
              </Link>{' '}
              that has no underline.
            </Typography>
          </Box>
        </Stack>
      </div>

      {/* States */}
      <div className="variant-section">
        <h4>States</h4>
        <p>Default, hover, and disabled link states.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Default
            </Typography>
            <Link href="#" underline="hover" sx={{ cursor: 'pointer' }}>
              Link text
            </Link>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Hover
            </Typography>
            <Link
              href="#"
              underline="hover"
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Link text (hover to see underline)
            </Link>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Disabled
            </Typography>
            <Link
              href="#"
              underline="hover"
              sx={{
                pointerEvents: 'none',
                color: 'text.disabled',
                cursor: 'default',
              }}
            >
              Link text
            </Link>
          </Box>
        </Stack>
      </div>

      {/* With Icons */}
      <div className="variant-section">
        <h4>With Icons</h4>
        <p>Links with start or end icons for visual context.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              End Icon
            </Typography>
            <Link
              href="#"
              underline="hover"
              sx={{
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              Link text
              <ArrowForwardIcon sx={{ fontSize: 18 }} />
            </Link>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              External Link Icon
            </Typography>
            <Link
              href="#"
              underline="hover"
              sx={{
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              External link
              <LaunchIcon sx={{ fontSize: 16 }} />
            </Link>
          </Box>
        </Stack>
      </div>

      {/* External Links */}
      <div className="variant-section">
        <h4>External Links</h4>
        <p>Links that open in new tabs with external indicator.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Opens in New Tab
            </Typography>
            <Link
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              Visit external site
              <OpenInNewIcon sx={{ fontSize: 16 }} />
            </Link>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              In Context
            </Typography>
            <Typography variant="body2">
              Learn more about this feature in our{' '}
              <Link
                href="https://example.com/docs"
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                sx={{
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.25,
                }}
              >
                documentation
                <OpenInNewIcon sx={{ fontSize: 14 }} />
              </Link>
              .
            </Typography>
          </Box>
        </Stack>
      </div>

      {/* Breadcrumbs */}
      <div className="variant-section">
        <h4>Breadcrumbs</h4>
        <p>Navigation trail showing current location in hierarchy.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Default Separator (/)
            </Typography>
            <Breadcrumbs>
              <Link href="#" underline="hover" color="inherit" sx={{ cursor: 'pointer' }}>
                Home
              </Link>
              <Link href="#" underline="hover" color="inherit" sx={{ cursor: 'pointer' }}>
                Category
              </Link>
              <Typography color="text.primary">Current Page</Typography>
            </Breadcrumbs>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Custom Separator (›)
            </Typography>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
              <Link href="#" underline="hover" color="inherit" sx={{ cursor: 'pointer' }}>
                Home
              </Link>
              <Link href="#" underline="hover" color="inherit" sx={{ cursor: 'pointer' }}>
                Category
              </Link>
              <Link href="#" underline="hover" color="inherit" sx={{ cursor: 'pointer' }}>
                Subcategory
              </Link>
              <Typography color="text.primary">Current Page</Typography>
            </Breadcrumbs>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Two Levels
            </Typography>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
              <Link href="#" underline="hover" color="inherit" sx={{ cursor: 'pointer' }}>
                DS Collection
              </Link>
              <Typography color="text.primary">Links</Typography>
            </Breadcrumbs>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Four Levels (Deep Navigation)
            </Typography>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
              <Link href="#" underline="hover" color="inherit" sx={{ cursor: 'pointer' }}>
                Home
              </Link>
              <Link href="#" underline="hover" color="inherit" sx={{ cursor: 'pointer' }}>
                Products
              </Link>
              <Link href="#" underline="hover" color="inherit" sx={{ cursor: 'pointer' }}>
                Electronics
              </Link>
              <Typography color="text.primary">Laptops</Typography>
            </Breadcrumbs>
          </Box>
        </Stack>
      </div>

      <FeaturesSection
        features={[
          { feature: "Link Styling", description: "Primary teal color, underline variants (hover, always, none), states (default, hover with darker teal, disabled grey)" },
          { feature: "External Links", description: "target='_blank', rel='noopener noreferrer', with icon indicator (14-18px at end of text)" },
          { feature: "Breadcrumbs", description: "color='inherit' on links, text.primary on current page, / or › separators, typically 2-4 levels" },
          { feature: "Common Use Cases", description: "Navigation, external resources, documentation references, location context, hierarchical navigation" },
        ]}
      />
    </div>
  )
}

export default LinkThemed

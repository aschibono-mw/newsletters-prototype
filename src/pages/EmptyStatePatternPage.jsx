import {
  Box,
  Container,
  Typography,
  Breadcrumbs,
  Link as MuiLink,
  Stack,
  Button,
  Paper,
  Skeleton,
  CircularProgress,
} from '@mui/material'
import { Link } from 'react-router-dom'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import AccessibilitySection from '../components/docs/AccessibilitySection'
import FeaturesSection from '../components/docs/FeaturesSection'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined'
import SearchOffOutlinedIcon from '@mui/icons-material/SearchOffOutlined'
import CloudOffOutlinedIcon from '@mui/icons-material/CloudOffOutlined'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

function EmptyStatePatternPage() {
  return (
    <Container maxWidth={false} sx={{ maxWidth: 1200, mx: 'auto', px: 3, pt: 8, pb: 4 }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: 3 }}
      >
        <MuiLink component={Link} to="/ds-collection" underline="hover" color="inherit">
          DS Collection
        </MuiLink>
        <MuiLink component={Link} to="/patterns" underline="hover" color="inherit">
          Patterns
        </MuiLink>
        <Typography color="text.primary">Empty State</Typography>
      </Breadcrumbs>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          Empty State
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Patterns for displaying when there is no data, an error occurred, or content is loading.
        </Typography>
      </Box>

      <Box sx={{ backgroundColor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 4 }}>
        <div className="themed-showcase">
          {/* No Data Empty State */}
          <div className="variant-section">
            <h4>No Data</h4>
            <p>When a list, table, or section has no items to display.</p>
            <Stack spacing={4}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Simple - No Items
                </Typography>
                <Paper variant="outlined" sx={{ p: 6, textAlign: 'center' }}>
                  <InboxOutlinedIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    No items yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    You haven't created any items. Get started by adding your first one.
                  </Typography>
                  <Button variant="contained" startIcon={<AddOutlinedIcon />}>
                    Add Item
                  </Button>
                </Paper>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Table Empty State
                </Typography>
                <Paper variant="outlined">
                  <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', backgroundColor: 'grey.50' }}>
                    <Stack direction="row" spacing={4}>
                      <Typography variant="subtitle2" fontWeight={600} sx={{ width: 200 }}>Name</Typography>
                      <Typography variant="subtitle2" fontWeight={600} sx={{ width: 150 }}>Status</Typography>
                      <Typography variant="subtitle2" fontWeight={600}>Actions</Typography>
                    </Stack>
                  </Box>
                  <Box sx={{ p: 6, textAlign: 'center' }}>
                    <DescriptionOutlinedIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                    <Typography variant="body1" fontWeight={500} gutterBottom>
                      No records found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Try adjusting your filters or add a new record.
                    </Typography>
                  </Box>
                </Paper>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Folder Empty State
                </Typography>
                <Paper variant="outlined" sx={{ p: 6, textAlign: 'center' }}>
                  <FolderOutlinedIcon sx={{ fontSize: 56, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    This folder is empty
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 300, mx: 'auto' }}>
                    Drag and drop files here, or click the button below to upload.
                  </Typography>
                  <Stack direction="row" spacing={2} justifyContent="center">
                    <Button variant="outlined">Upload Files</Button>
                    <Button variant="contained">Create Folder</Button>
                  </Stack>
                </Paper>
              </Box>
            </Stack>
          </div>

          {/* Search No Results */}
          <div className="variant-section">
            <h4>No Search Results</h4>
            <p>When a search or filter returns no matching items.</p>
            <Stack spacing={4}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Search Empty State
                </Typography>
                <Paper variant="outlined" sx={{ p: 6, textAlign: 'center' }}>
                  <SearchOffOutlinedIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    No results found
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: 350, mx: 'auto' }}>
                    We couldn't find anything matching "unknown query". Try different keywords or check your spelling.
                  </Typography>
                  <Button variant="text">Clear Search</Button>
                </Paper>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Filtered Results Empty
                </Typography>
                <Paper variant="outlined" sx={{ p: 6, textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      backgroundColor: 'grey.100',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    <SearchOffOutlinedIcon sx={{ fontSize: 32, color: 'text.secondary' }} />
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    No matches for current filters
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Try removing some filters to see more results.
                  </Typography>
                  <Button variant="outlined">Reset Filters</Button>
                </Paper>
              </Box>
            </Stack>
          </div>

          {/* Error States */}
          <div className="variant-section">
            <h4>Error States</h4>
            <p>When something went wrong loading or processing data.</p>
            <Stack spacing={4}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Connection Error
                </Typography>
                <Paper variant="outlined" sx={{ p: 6, textAlign: 'center' }}>
                  <CloudOffOutlinedIcon sx={{ fontSize: 48, color: 'error.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Unable to connect
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 350, mx: 'auto' }}>
                    We're having trouble connecting to the server. Please check your internet connection and try again.
                  </Typography>
                  <Button variant="contained" startIcon={<RefreshOutlinedIcon />}>
                    Retry
                  </Button>
                </Paper>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Load Error
                </Typography>
                <Paper variant="outlined" sx={{ p: 6, textAlign: 'center' }}>
                  <ErrorOutlineIcon sx={{ fontSize: 48, color: 'error.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Something went wrong
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    We couldn't load your data. Please try again later.
                  </Typography>
                  <Stack direction="row" spacing={2} justifyContent="center">
                    <Button variant="outlined">Go Back</Button>
                    <Button variant="contained" startIcon={<RefreshOutlinedIcon />}>
                      Try Again
                    </Button>
                  </Stack>
                </Paper>
              </Box>
            </Stack>
          </div>

          {/* Loading States */}
          <div className="variant-section">
            <h4>Loading States</h4>
            <p>Skeleton loaders and spinners while content is being fetched.</p>
            <Stack spacing={4}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Skeleton Cards
                </Typography>
                <Stack direction="row" spacing={2}>
                  {[1, 2, 3].map((item) => (
                    <Paper key={item} variant="outlined" sx={{ p: 2, width: 200 }}>
                      <Skeleton variant="rectangular" width="100%" height={100} sx={{ mb: 1, borderRadius: 1 }} />
                      <Skeleton variant="text" width="80%" />
                      <Skeleton variant="text" width="60%" />
                    </Paper>
                  ))}
                </Stack>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Skeleton List
                </Typography>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  {[1, 2, 3, 4].map((item) => (
                    <Stack key={item} direction="row" spacing={2} alignItems="center" sx={{ py: 1.5, borderBottom: item < 4 ? '1px solid' : 'none', borderColor: 'divider' }}>
                      <Skeleton variant="circular" width={40} height={40} />
                      <Box sx={{ flex: 1 }}>
                        <Skeleton variant="text" width="60%" />
                        <Skeleton variant="text" width="40%" />
                      </Box>
                      <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} />
                    </Stack>
                  ))}
                </Paper>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Centered Spinner
                </Typography>
                <Paper variant="outlined" sx={{ p: 6, textAlign: 'center' }}>
                  <CircularProgress sx={{ mb: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    Loading your data...
                  </Typography>
                </Paper>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Skeleton Table
                </Typography>
                <Paper variant="outlined">
                  <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', backgroundColor: 'grey.50' }}>
                    <Stack direction="row" spacing={4}>
                      <Skeleton variant="text" width={100} />
                      <Skeleton variant="text" width={80} />
                      <Skeleton variant="text" width={120} />
                      <Skeleton variant="text" width={60} />
                    </Stack>
                  </Box>
                  {[1, 2, 3].map((row) => (
                    <Box key={row} sx={{ p: 2, borderBottom: row < 3 ? '1px solid' : 'none', borderColor: 'divider' }}>
                      <Stack direction="row" spacing={4}>
                        <Skeleton variant="text" width={100} />
                        <Skeleton variant="text" width={80} />
                        <Skeleton variant="text" width={120} />
                        <Skeleton variant="text" width={60} />
                      </Stack>
                    </Box>
                  ))}
                </Paper>
              </Box>
            </Stack>
          </div>

          {/* First-time User */}
          <div className="variant-section">
            <h4>First-time User</h4>
            <p>Onboarding empty states for new users.</p>
            <Stack spacing={4}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Welcome State
                </Typography>
                <Paper variant="outlined" sx={{ p: 6, textAlign: 'center', backgroundColor: 'primary.main', color: 'primary.contrastText' }}>
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    Welcome to Your Dashboard
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 4, maxWidth: 400, mx: 'auto', opacity: 0.9 }}>
                    Let's get started by setting up your first project. It only takes a few minutes.
                  </Typography>
                  <Stack direction="row" spacing={2} justifyContent="center">
                    <Button variant="outlined" sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)', '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' } }}>
                      Watch Tutorial
                    </Button>
                    <Button variant="contained" sx={{ backgroundColor: 'white', color: 'primary.main', '&:hover': { backgroundColor: 'grey.100' } }}>
                      Create Project
                    </Button>
                  </Stack>
                </Paper>
              </Box>
            </Stack>
          </div>

          <FeaturesSection
            features={[
              { feature: "Icon + Message", description: "Large icon (40-56px) with headline and descriptive text to explain the state" },
              { feature: "Primary Action", description: "Clear CTA button (Add, Retry, Create) to resolve the empty state" },
              { feature: "Secondary Actions", description: "Optional text button or link for alternative paths (Clear filters, Go back)" },
              { feature: "Skeleton Loaders", description: "Use Skeleton component matching content shape for loading states" },
              { feature: "Centered Layout", description: "Content centered with max-width constraint for readability" },
            ]}
          />
        </div>

        <AccessibilitySection
          wcag={[
            { id: "1.1.1", name: "Non-text Content", level: "A", note: "Icons are decorative when paired with text" },
            { id: "1.4.1", name: "Use of Color", level: "A", note: "Error states use icon + text, not color alone" },
            { id: "2.4.4", name: "Link Purpose", level: "A", note: "Action buttons clearly describe their purpose" },
            { id: "1.3.1", name: "Info and Relationships", level: "A", note: "Loading states announced to screen readers" },
          ]}
        />
      </Box>
    </Container>
  )
}

export default EmptyStatePatternPage

import { useState, useMemo } from 'react'
import {
  Box,
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Link,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  useTheme,
} from '@mui/material'
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import TableHeader from '../components/core/TableHeader'

// Mock newsletter data
const MOCK_NEWSLETTERS = [
  { id: 1, name: 'News Roundup', type: 'Manual', totalDrafts: 2, recentlySent: null },
  { id: 2, name: 'PR and Marketing Newsletter', type: 'Manual', totalDrafts: 2, recentlySent: null },
  { id: 3, name: 'Untitled draft', type: 'Manual', totalDrafts: 1, recentlySent: 'Draft' },
  { id: 4, name: 'Untitled draft', type: 'Manual', totalDrafts: 1, recentlySent: 'Draft' },
  { id: 5, name: 'Untitled draft', type: 'Manual', totalDrafts: 1, recentlySent: 'Draft' },
  { id: 6, name: 'Untitled draft', type: 'Manual', totalDrafts: 1, recentlySent: 'Draft' },
  { id: 7, name: 'Untitled draft', type: 'Manual', totalDrafts: 1, recentlySent: 'Draft' },
  { id: 8, name: 'Untitled draft', type: 'Manual', totalDrafts: 1, recentlySent: 'Draft' },
  { id: 9, name: 'Untitled draft', type: 'Manual', totalDrafts: 1, recentlySent: 'Draft' },
  { id: 10, name: 'Untitled draft', type: 'Manual', totalDrafts: 1, recentlySent: 'Draft' },
]

// Questions for the create dialog
const QUESTIONS = [
  {
    id: 1,
    question: 'What are your top topics or themes you need to monitor for?',
    placeholder: 'eg. key industry topics and trends',
  },
  {
    id: 2,
    question: 'Which brands, products, or execs do you need tracked?',
    placeholder: 'eg. company names, product lines, executives',
  },
  {
    id: 3,
    question: 'Who are your main competitors or peers?',
    placeholder: 'eg. key competitors and peer companies',
  },
  {
    id: 4,
    question: 'What types of coverage matter most — earned news, opinion, social chatter, or all of the above?',
    placeholder: 'eg. earned media, opinions, and social buzz',
  },
  {
    id: 5,
    question: 'Can you provide info about what each section or category of your NL should focus on?',
    placeholder: 'eg. top headlines, competitor updates, industry insights',
  },
  {
    id: 6,
    question: "Any major do's or don'ts?",
    placeholder: 'eg. trusted sources only; avoid noise',
  },
]

function NewslettersPage() {
  const theme = useTheme()
  const [newsletters] = useState(MOCK_NEWSLETTERS)
  const [viewMode, setViewMode] = useState('list') // 'list' or 'grid'
  const [searchQuery, setSearchQuery] = useState('')
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
  })
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  // Filter newsletters based on search
  const filteredNewsletters = useMemo(() => {
    if (!searchQuery) return newsletters
    const query = searchQuery.toLowerCase()
    return newsletters.filter(
      (n) =>
        n.name.toLowerCase().includes(query) ||
        n.type.toLowerCase().includes(query)
    )
  }, [newsletters, searchQuery])

  const handleOpenCreateDialog = () => {
    setCreateDialogOpen(true)
  }

  const handleCloseCreateDialog = () => {
    setCreateDialogOpen(false)
    setFormData({ 1: '', 2: '', 3: '', 4: '', 5: '', 6: '' })
  }

  const handleFormChange = (questionId, value) => {
    setFormData((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleConfirm = () => {
    // Handle form submission
    console.log('Form submitted:', formData)
    handleCloseCreateDialog()
    setSnackbarOpen(true)
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return
    setSnackbarOpen(false)
  }

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', backgroundColor: 'grey.50' }}>
      {/* Page Header */}
      <Paper elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="xl" sx={{ py: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Newsletters
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage and send newsletters
          </Typography>
        </Container>
      </Paper>

      {/* Content */}
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
          <TableHeader
            title="Projects"
            count={filteredNewsletters.length}
            infotip="Newsletter projects in your account"
            primaryAction={{
              label: 'Create Newsletter',
              icon: <AddIcon />,
              onClick: handleOpenCreateDialog,
            }}
            showFind
            findValue={searchQuery}
            onFindChange={setSearchQuery}
            showViewToggle
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          {/* List View */}
          {viewMode === 'list' && (
            <>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, width: '35%' }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: 600, width: '20%' }}>Type</TableCell>
                      <TableCell sx={{ fontWeight: 600, width: '25%' }}>Total</TableCell>
                      <TableCell sx={{ fontWeight: 600, width: '20%' }}>Recently sent</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredNewsletters.map((newsletter) => (
                      <TableRow key={newsletter.id} hover>
                        <TableCell>{newsletter.name}</TableCell>
                        <TableCell>{newsletter.type}</TableCell>
                        <TableCell>
                          <Link
                            href="#"
                            underline="none"
                            sx={{
                              color: 'primary.main',
                              cursor: 'pointer',
                              '&:hover': { textDecoration: 'underline' },
                            }}
                          >
                            {newsletter.totalDrafts} Draft
                          </Link>
                        </TableCell>
                        <TableCell>{newsletter.recentlySent || 'N/A'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Footer */}
              <Box
                sx={{
                  px: 2,
                  py: 1.5,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  backgroundColor: 'grey.50',
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  1-{filteredNewsletters.length} of {filteredNewsletters.length}
                </Typography>
              </Box>
            </>
          )}

          {/* Grid View */}
          {viewMode === 'grid' && (
            <>
              <Box
                sx={{
                  p: 2,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: 2,
                }}
              >
                {filteredNewsletters.map((newsletter) => (
                  <Card
                    key={newsletter.id}
                    variant="outlined"
                    sx={{
                      '&:hover': {
                        borderColor: 'primary.main',
                        boxShadow: 1,
                      },
                    }}
                  >
                    <CardActionArea>
                      <CardContent>
                        {/* Icon and Type */}
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                          <Box
                            sx={{
                              width: 48,
                              height: 48,
                              borderRadius: 1,
                              backgroundColor: 'primary.light',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <NewspaperOutlinedIcon sx={{ color: 'primary.main', fontSize: 24 }} />
                          </Box>
                          <Chip
                            label={newsletter.type}
                            size="small"
                            sx={{ backgroundColor: 'grey.100' }}
                          />
                        </Box>

                        {/* Name */}
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                          {newsletter.name}
                        </Typography>

                        {/* Stats */}
                        <Box sx={{ display: 'flex', gap: 3 }}>
                          <Box>
                            <Typography variant="caption" color="text.secondary" display="block">
                              Total
                            </Typography>
                            <Link
                              href="#"
                              underline="none"
                              sx={{
                                color: 'primary.main',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                '&:hover': { textDecoration: 'underline' },
                              }}
                            >
                              {newsletter.totalDrafts} Draft
                            </Link>
                          </Box>
                          <Box>
                            <Typography variant="caption" color="text.secondary" display="block">
                              Recently sent
                            </Typography>
                            <Typography variant="body2">
                              {newsletter.recentlySent || 'N/A'}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
              </Box>

              {/* Footer */}
              <Box
                sx={{
                  px: 2,
                  py: 1.5,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  backgroundColor: 'grey.50',
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  1-{filteredNewsletters.length} of {filteredNewsletters.length}
                </Typography>
              </Box>
            </>
          )}
        </Paper>
      </Container>

      {/* Create Automated Newsletter Dialog */}
      <Dialog
        open={createDialogOpen}
        onClose={handleCloseCreateDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            maxHeight: '90vh',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid',
            borderColor: 'divider',
            py: 2,
            px: 3,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Create an Automated Newsletter
          </Typography>
          <IconButton size="small" onClick={handleCloseCreateDialog}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <DialogContent sx={{ py: 4 }}>
          {/* Welcome Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
              👋 Welcome! Let's create your first AI-generated newsletter together.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              AI detected sentiment changes or unusual spikes in today's coverage.
            </Typography>
          </Box>

          {/* Questions */}
          <Box sx={{ maxWidth: 700, mx: 'auto' }}>
            {QUESTIONS.map((q) => (
              <Box key={q.id} sx={{ mb: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                  {q.id}. {q.question}
                </Typography>
                <TextField
                  fullWidth
                  placeholder={q.placeholder}
                  value={formData[q.id]}
                  onChange={(e) => handleFormChange(q.id, e.target.value)}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1,
                    },
                  }}
                />
              </Box>
            ))}
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            borderTop: '1px solid',
            borderColor: 'divider',
            px: 3,
            py: 2,
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={handleConfirm}
            sx={{ textTransform: 'none', fontWeight: 500 }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        message="Newsletter created successfully!"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: theme.palette.grey[800],
            color: 'white',
            minWidth: 'auto',
          },
        }}
      />
    </Box>
  )
}

export default NewslettersPage

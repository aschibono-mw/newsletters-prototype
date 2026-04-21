import { Box, Container, Typography, Divider, Link, Paper } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

function DevelopingPatternsPage() {
  return (
    <Container maxWidth={false} sx={{ maxWidth: 800, mx: 'auto', px: 3, pt: 6, pb: 8 }}>
      {/* Breadcrumb */}
      <Box sx={{ mb: 4 }}>
        <Link
          component={RouterLink}
          to="/developing"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            color: 'text.secondary',
            textDecoration: 'none',
            fontSize: '0.875rem',
            '&:hover': { color: 'primary.main' },
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 16 }} />
          Developing
        </Link>
      </Box>

      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: 600, mb: 2 }}>
          Code Patterns
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, lineHeight: 1.6 }}>
          Common patterns and recipes for building with the design system.
        </Typography>
      </Box>

      {/* Form pattern */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Form Layout
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
          Use Stack for consistent spacing between form elements:
        </Typography>

        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.875rem', whiteSpace: 'pre-wrap' }}>
{`import { Stack, TextField, Button } from '@mui/material'

function LoginForm() {
  return (
    <Stack spacing={3} sx={{ maxWidth: 400 }}>
      <TextField label="Email" type="email" />
      <TextField label="Password" type="password" />
      <Button variant="contained" size="large">
        Sign In
      </Button>
    </Stack>
  )
}`}
          </Typography>
        </Paper>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* Card grid pattern */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Card Grid
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
          Use Grid for responsive card layouts:
        </Typography>

        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.875rem', whiteSpace: 'pre-wrap' }}>
{`import { Grid, Card, CardContent } from '@mui/material'

function CardGrid({ items }) {
  return (
    <Grid container spacing={3}>
      {items.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <Card>
            <CardContent>{item.title}</CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}`}
          </Typography>
        </Paper>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* Dialog pattern */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Confirmation Dialog
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
          Standard pattern for destructive action confirmation:
        </Typography>

        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.875rem', whiteSpace: 'pre-wrap' }}>
{`import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, Button
} from '@mui/material'

function ConfirmDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Item?</DialogTitle>
      <DialogContent>
        This action cannot be undone.
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}`}
          </Typography>
        </Paper>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* Loading state pattern */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Loading Button
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
          Show loading state on async actions:
        </Typography>

        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.875rem', whiteSpace: 'pre-wrap' }}>
{`import { Button, CircularProgress } from '@mui/material'

function LoadingButton({ loading, children, ...props }) {
  return (
    <Button
      disabled={loading}
      {...props}
    >
      {loading ? (
        <CircularProgress size={20} color="inherit" />
      ) : (
        children
      )}
    </Button>
  )
}`}
          </Typography>
        </Paper>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* Empty state pattern */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Empty State
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
          Consistent empty state messaging:
        </Typography>

        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.875rem', whiteSpace: 'pre-wrap' }}>
{`import { Box, Typography, Button } from '@mui/material'

function EmptyState({ title, description, action }) {
  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        {description}
      </Typography>
      {action && (
        <Button variant="contained">
          {action}
        </Button>
      )}
    </Box>
  )
}`}
          </Typography>
        </Paper>
      </Box>

      {/* Page navigation */}
      <Box
        sx={{
          mt: 8,
          pt: 4,
          borderTop: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <Link
          component={RouterLink}
          to="/developing/react"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            color: 'primary.main',
            textDecoration: 'none',
            fontWeight: 500,
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 16 }} />
          React Guide
        </Link>
      </Box>
    </Container>
  )
}

export default DevelopingPatternsPage

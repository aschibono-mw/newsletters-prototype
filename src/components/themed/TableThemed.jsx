import { useState } from 'react'
import { useTheme } from '@mui/material/styles'
import {
  Box,
  Typography,
  Stack,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  Avatar,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Divider,
  Tooltip,
  Skeleton,
} from '@mui/material'
import { styled, alpha } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import AddIcon from '@mui/icons-material/Add'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import LastPageIcon from '@mui/icons-material/LastPage'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CloseIcon from '@mui/icons-material/Close'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined'

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: '12px 16px',
  fontSize: '0.75rem',
  fontWeight: 600,
  color: theme.palette.text.secondary,
  whiteSpace: 'nowrap',
}))

const StyledBodyCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: '12px 16px',
  fontSize: '0.875rem',
  color: theme.palette.text.primary,
}))

const StyledBodyRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&.Mui-selected': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.12),
    },
  },
}))

const StatusIndicator = styled(Box)(({ theme, status }) => {
  const statusColors = {
    success: {
      bg: theme.palette.success.light || '#E8F5E9',
      border: theme.palette.success.main,
      text: theme.palette.success.dark || theme.palette.success.main,
    },
    warning: {
      bg: theme.palette.warning.light || '#FFF8E1',
      border: theme.palette.warning.main,
      text: theme.palette.warning.dark || theme.palette.warning.main,
    },
    error: {
      bg: theme.palette.error.light || '#FFEBEE',
      border: theme.palette.error.main,
      text: theme.palette.error.dark || theme.palette.error.main,
    },
    neutral: {
      bg: theme.palette.grey[100],
      border: theme.palette.grey[400],
      text: theme.palette.grey[700],
    },
  }
  const colors = statusColors[status] || statusColors.neutral

  return {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '2px 8px',
    borderRadius: '4px',
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.bg,
    color: colors.text,
    fontSize: '0.75rem',
    fontWeight: 600,
  }
})

// ============================================================================
// MOCK DATA
// ============================================================================

const mockUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@company.com', role: 'Admin', status: 'active', lastActive: '2 hours ago' },
  { id: 2, name: 'Bob Smith', email: 'bob@company.com', role: 'Editor', status: 'active', lastActive: '5 min ago' },
  { id: 3, name: 'Carol Williams', email: 'carol@company.com', role: 'Viewer', status: 'pending', lastActive: '—' },
  { id: 4, name: 'David Brown', email: 'david@company.com', role: 'Editor', status: 'inactive', lastActive: 'Oct 15, 2024' },
]

// ============================================================================
// SECTION COMPONENT
// ============================================================================

function Section({ title, children }) {
  return (
    <Box sx={{ mb: 8 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
        {title}
      </Typography>
      {children}
    </Box>
  )
}

function Subsection({ title, description, children }) {
  return (
    <Box sx={{ mb: 5 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
      )}
      {children}
    </Box>
  )
}

function TokenBlock({ children }) {
  const theme = useTheme()
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 1,
        backgroundColor: theme.palette.grey[50],
        border: `1px solid ${theme.palette.divider}`,
        fontFamily: 'monospace',
        fontSize: '0.8125rem',
        lineHeight: 1.8,
        whiteSpace: 'pre-wrap',
      }}
    >
      {children}
    </Box>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

function TableThemed() {
  const theme = useTheme()
  const [selected, setSelected] = useState([])

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelected(mockUsers.map((u) => u.id))
    } else {
      setSelected([])
    }
  }

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const getStatusType = (status) => {
    const map = { active: 'success', pending: 'warning', inactive: 'neutral' }
    return map[status] || 'neutral'
  }

  return (
    <Box sx={{ maxWidth: 900 }}>

      {/* ================================================================ */}
      {/* ANATOMY */}
      {/* ================================================================ */}
      <Section title="Anatomy">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          A data table organizes information into rows and columns. Tables can include
          a toolbar, column headers, body rows, and pagination.
        </Typography>

        <Stack spacing={1.5} sx={{ mb: 4 }}>
          {[
            { num: 1, label: 'Toolbar', desc: 'Title, search, filters, actions' },
            { num: 2, label: 'Column header', desc: 'Labels and sort controls' },
            { num: 3, label: 'Data row', desc: 'Individual record with cells' },
            { num: 4, label: 'Pagination', desc: 'Navigation and row count' },
            { num: 5, label: 'Bulk action bar', desc: 'Actions for selected rows' },
          ].map((item) => (
            <Box key={item.num} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  bgcolor: theme.palette.primary.main,
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {item.num}
              </Box>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>{item.label}</Typography>
                <Typography variant="caption" color="text.secondary">{item.desc}</Typography>
              </Box>
            </Box>
          ))}
        </Stack>

        {/* Visual reference */}
        <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
          {/* 1. Toolbar */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2,
              borderBottom: `1px solid ${theme.palette.divider}`,
              position: 'relative',
            }}
          >
            <Typography sx={{ fontWeight: 600 }}>Users</Typography>
            <Button variant="contained" size="small" startIcon={<AddIcon />}>Add</Button>
            <Box sx={{ position: 'absolute', left: -8, top: '50%', transform: 'translateY(-50%)', width: 4, height: 24, bgcolor: theme.palette.primary.main, borderRadius: 1 }} />
          </Box>

          {/* 2-3. Header + Rows */}
          <Table size="small">
            <TableHead>
              <TableRow sx={{ position: 'relative' }}>
                <StyledHeaderCell>Name</StyledHeaderCell>
                <StyledHeaderCell>Email</StyledHeaderCell>
                <StyledHeaderCell>Status</StyledHeaderCell>
                <Box component="td" sx={{ position: 'absolute', left: -8, top: '50%', transform: 'translateY(-50%)', width: 4, height: 20, bgcolor: theme.palette.primary.main, borderRadius: 1 }} />
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledBodyRow sx={{ position: 'relative' }}>
                <StyledBodyCell>Alice Johnson</StyledBodyCell>
                <StyledBodyCell>alice@company.com</StyledBodyCell>
                <StyledBodyCell><StatusIndicator status="success">Active</StatusIndicator></StyledBodyCell>
                <Box component="td" sx={{ position: 'absolute', left: -8, top: '50%', transform: 'translateY(-50%)', width: 4, height: 20, bgcolor: theme.palette.primary.main, borderRadius: 1 }} />
              </StyledBodyRow>
              <StyledBodyRow>
                <StyledBodyCell>Bob Smith</StyledBodyCell>
                <StyledBodyCell>bob@company.com</StyledBodyCell>
                <StyledBodyCell><StatusIndicator status="warning">Pending</StatusIndicator></StyledBodyCell>
              </StyledBodyRow>
            </TableBody>
          </Table>

          {/* 4. Pagination */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 2,
              p: 1.5,
              borderTop: `1px solid ${theme.palette.divider}`,
              position: 'relative',
            }}
          >
            <Typography variant="body2" color="text.secondary">1-2 of 2</Typography>
            <Stack direction="row" spacing={0.5}>
              <IconButton size="small" disabled><ChevronLeftIcon fontSize="small" /></IconButton>
              <IconButton size="small" disabled><ChevronRightIcon fontSize="small" /></IconButton>
            </Stack>
            <Box sx={{ position: 'absolute', left: -8, top: '50%', transform: 'translateY(-50%)', width: 4, height: 20, bgcolor: theme.palette.primary.main, borderRadius: 1 }} />
          </Box>
        </Paper>
      </Section>

      {/* ================================================================ */}
      {/* COLOR */}
      {/* ================================================================ */}
      <Section title="Color">
        <Subsection
          title="Backgrounds"
          description="Tables use a layered background system to create visual hierarchy."
        >
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box sx={{ width: 48, height: 32, bgcolor: theme.palette.grey[50], border: `1px solid ${theme.palette.divider}`, borderRadius: 1 }} />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>Column header</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>grey.50</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box sx={{ width: 48, height: 32, bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 1 }} />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>Data row</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>background.paper</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box sx={{ width: 48, height: 32, bgcolor: theme.palette.action.hover, border: `1px solid ${theme.palette.divider}`, borderRadius: 1 }} />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>Row hover</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>action.hover</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box sx={{ width: 48, height: 32, bgcolor: alpha(theme.palette.primary.main, 0.08), border: `1px solid ${theme.palette.divider}`, borderRadius: 1 }} />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>Row selected</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>primary.main @ 8%</Typography>
              </Box>
            </Box>
          </Stack>
        </Subsection>

        <Subsection
          title="Borders"
          description="Use divider color for all table borders."
        >
          <TokenBlock>
{`Border color:  divider
Border width:  1px
Border style:  solid`}
          </TokenBlock>
        </Subsection>

        <Subsection
          title="Bulk action bar"
          description="The bulk action bar uses an inverted color scheme."
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              bgcolor: theme.palette.grey[900],
              color: 'white',
              borderRadius: 1,
              p: '8px 16px',
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 500 }}>3 selected</Typography>
            <Divider orientation="vertical" flexItem sx={{ borderColor: theme.palette.grey[700], mx: 1 }} />
            <Button size="small" sx={{ color: 'white', textTransform: 'none' }}>Action</Button>
          </Box>
          <Box sx={{ mt: 2 }}>
            <TokenBlock>
{`Background:  grey.900
Text:        common.white
Divider:     grey.700`}
            </TokenBlock>
          </Box>
        </Subsection>
      </Section>

      {/* ================================================================ */}
      {/* TYPOGRAPHY */}
      {/* ================================================================ */}
      <Section title="Typography">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Column headers should be sentence case. All other table text is also sentence case.
        </Typography>

        <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <StyledHeaderCell sx={{ width: 180 }}>Element</StyledHeaderCell>
                <StyledHeaderCell>Style</StyledHeaderCell>
                <StyledHeaderCell>Example</StyledHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledBodyRow>
                <StyledBodyCell sx={{ fontWeight: 500 }}>Column header</StyledBodyCell>
                <StyledBodyCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>12px / 600</StyledBodyCell>
                <StyledBodyCell sx={{ fontSize: '0.75rem', fontWeight: 600, color: theme.palette.text.secondary }}>Email address</StyledBodyCell>
              </StyledBodyRow>
              <StyledBodyRow>
                <StyledBodyCell sx={{ fontWeight: 500 }}>Primary cell</StyledBodyCell>
                <StyledBodyCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>14px / 500</StyledBodyCell>
                <StyledBodyCell sx={{ fontSize: '0.875rem', fontWeight: 500 }}>Alice Johnson</StyledBodyCell>
              </StyledBodyRow>
              <StyledBodyRow>
                <StyledBodyCell sx={{ fontWeight: 500 }}>Secondary cell</StyledBodyCell>
                <StyledBodyCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>14px / 400</StyledBodyCell>
                <StyledBodyCell sx={{ fontSize: '0.875rem' }}>alice@company.com</StyledBodyCell>
              </StyledBodyRow>
              <StyledBodyRow>
                <StyledBodyCell sx={{ fontWeight: 500 }}>Tertiary cell</StyledBodyCell>
                <StyledBodyCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>12px / 400 / text.secondary</StyledBodyCell>
                <StyledBodyCell sx={{ fontSize: '0.75rem', color: theme.palette.text.secondary }}>2 hours ago</StyledBodyCell>
              </StyledBodyRow>
              <StyledBodyRow>
                <StyledBodyCell sx={{ fontWeight: 500 }}>Monospace cell</StyledBodyCell>
                <StyledBodyCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>12px / 400 / monospace</StyledBodyCell>
                <StyledBodyCell sx={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>USR-00123-XYZ</StyledBodyCell>
              </StyledBodyRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Section>

      {/* ================================================================ */}
      {/* STRUCTURE */}
      {/* ================================================================ */}
      <Section title="Structure">
        <Subsection
          title="Row sizes"
          description="Tables are available in two row sizes. The column header row should match the body row size."
        >
          <Stack spacing={3} sx={{ mb: 3 }}>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>Standard</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ border: `1px dashed ${theme.palette.primary.main}`, p: '12px 16px', bgcolor: alpha(theme.palette.primary.main, 0.04), borderRadius: 1 }}>
                  <Typography variant="body2">Cell content</Typography>
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                  padding: 12px 16px → ~52px row height
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>Dense</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ border: `1px dashed ${theme.palette.primary.main}`, p: '6px 16px', bgcolor: alpha(theme.palette.primary.main, 0.04), borderRadius: 1 }}>
                  <Typography variant="body2">Cell content</Typography>
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                  padding: 6px 16px → ~36px row height
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Subsection>

        <Subsection title="Spacing tokens">
          <TokenBlock>
{`Cell (standard):     12px / 16px
Cell (dense):        6px / 16px
Cell (checkbox):     0 / 4px
Toolbar:             12px / 16px
Pagination:          12px / 16px
Bulk action bar:     8px / 16px`}
          </TokenBlock>
        </Subsection>
      </Section>

      {/* ================================================================ */}
      {/* CELL CONTENT */}
      {/* ================================================================ */}
      <Section title="Cell content">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Common patterns for displaying different data types within cells.
        </Typography>

        <Stack spacing={4}>
          <Subsection title="Avatar with text">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 2, border: `1px solid ${theme.palette.divider}`, borderRadius: 1 }}>
              <Avatar sx={{ width: 32, height: 32, fontSize: '0.875rem', bgcolor: theme.palette.primary.main }}>AJ</Avatar>
              <Typography sx={{ fontWeight: 500 }}>Alice Johnson</Typography>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              32px avatar, 12px gap, primary text style
            </Typography>
          </Subsection>

          <Subsection title="Status indicator">
            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
              <StatusIndicator status="success">Active</StatusIndicator>
              <StatusIndicator status="warning">Pending</StatusIndicator>
              <StatusIndicator status="error">Error</StatusIndicator>
              <StatusIndicator status="neutral">Inactive</StatusIndicator>
            </Stack>
            <Typography variant="caption" color="text.secondary">
              Tinted background with matching border
            </Typography>
          </Subsection>

          <Subsection title="Chips">
            <Stack direction="row" spacing={0.5} sx={{ mb: 1 }}>
              <Chip label="Marketing" size="small" />
              <Chip label="Design" size="small" />
              <Chip label="+2" size="small" variant="outlined" />
            </Stack>
            <Typography variant="caption" color="text.secondary">
              Small size, 4px gap, overflow shown as +N
            </Typography>
          </Subsection>

          <Subsection title="Row actions">
            <Stack direction="row" spacing={0.5}>
              <Tooltip title="Edit"><IconButton size="small"><EditOutlinedIcon fontSize="small" /></IconButton></Tooltip>
              <Tooltip title="Delete"><IconButton size="small"><DeleteOutlinedIcon fontSize="small" /></IconButton></Tooltip>
              <Tooltip title="More"><IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton></Tooltip>
            </Stack>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Small icon buttons, right-aligned in cell
            </Typography>
          </Subsection>
        </Stack>
      </Section>

      {/* ================================================================ */}
      {/* STATES */}
      {/* ================================================================ */}
      <Section title="States">
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <StyledHeaderCell padding="checkbox">
                  <Checkbox size="small" disabled />
                </StyledHeaderCell>
                <StyledHeaderCell>Row</StyledHeaderCell>
                <StyledHeaderCell>State</StyledHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledBodyRow>
                <StyledBodyCell padding="checkbox"><Checkbox size="small" /></StyledBodyCell>
                <StyledBodyCell>Default row</StyledBodyCell>
                <StyledBodyCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>background.paper</StyledBodyCell>
              </StyledBodyRow>
              <StyledBodyRow sx={{ backgroundColor: theme.palette.action.hover }}>
                <StyledBodyCell padding="checkbox"><Checkbox size="small" /></StyledBodyCell>
                <StyledBodyCell>Hover row</StyledBodyCell>
                <StyledBodyCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>action.hover</StyledBodyCell>
              </StyledBodyRow>
              <StyledBodyRow selected>
                <StyledBodyCell padding="checkbox"><Checkbox size="small" checked /></StyledBodyCell>
                <StyledBodyCell>Selected row</StyledBodyCell>
                <StyledBodyCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>primary.main @ 8%</StyledBodyCell>
              </StyledBodyRow>
              <StyledBodyRow sx={{ opacity: 0.5 }}>
                <StyledBodyCell padding="checkbox"><Checkbox size="small" disabled /></StyledBodyCell>
                <StyledBodyCell>Disabled row</StyledBodyCell>
                <StyledBodyCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>opacity: 0.5</StyledBodyCell>
              </StyledBodyRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Section>

      {/* ================================================================ */}
      {/* EMPTY & LOADING */}
      {/* ================================================================ */}
      <Section title="Empty and loading">
        <Subsection title="Empty state" description="Display when no data matches filters or search.">
          <Paper variant="outlined">
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <InboxOutlinedIcon sx={{ fontSize: 48, color: theme.palette.text.disabled, mb: 1 }} />
              <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                No results found
              </Typography>
              <Typography variant="body2" color="text.disabled" sx={{ mb: 2 }}>
                Try adjusting your search or filters
              </Typography>
              <Button variant="outlined" size="small">Clear filters</Button>
            </Box>
          </Paper>
        </Subsection>

        <Subsection title="Loading state" description="Show skeleton rows while data is being fetched.">
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <StyledHeaderCell>Name</StyledHeaderCell>
                  <StyledHeaderCell>Email</StyledHeaderCell>
                  <StyledHeaderCell>Status</StyledHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[1, 2, 3].map((i) => (
                  <StyledBodyRow key={i}>
                    <StyledBodyCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Skeleton variant="circular" width={32} height={32} />
                        <Skeleton variant="text" width={100} />
                      </Box>
                    </StyledBodyCell>
                    <StyledBodyCell><Skeleton variant="text" width={160} /></StyledBodyCell>
                    <StyledBodyCell><Skeleton variant="rounded" width={60} height={24} /></StyledBodyCell>
                  </StyledBodyRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Subsection>
      </Section>

      {/* ================================================================ */}
      {/* LIVE EXAMPLE */}
      {/* ================================================================ */}
      <Section title="Live example">
        <Paper variant="outlined">
          {/* Toolbar */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                placeholder="Search..."
                size="small"
                sx={{ width: 200 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: theme.palette.text.secondary, fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Button variant="outlined" size="small" startIcon={<FilterListIcon />}>Filters</Button>
            </Box>
            <Button variant="contained" size="small" startIcon={<AddIcon />}>Add user</Button>
          </Box>

          {/* Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledHeaderCell padding="checkbox">
                    <Checkbox
                      size="small"
                      indeterminate={selected.length > 0 && selected.length < mockUsers.length}
                      checked={selected.length === mockUsers.length}
                      onChange={handleSelectAll}
                    />
                  </StyledHeaderCell>
                  <StyledHeaderCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}>
                      Name
                      <KeyboardArrowDownIcon sx={{ fontSize: 16, opacity: 0.5 }} />
                    </Box>
                  </StyledHeaderCell>
                  <StyledHeaderCell>Email</StyledHeaderCell>
                  <StyledHeaderCell>Role</StyledHeaderCell>
                  <StyledHeaderCell>Status</StyledHeaderCell>
                  <StyledHeaderCell>Last active</StyledHeaderCell>
                  <StyledHeaderCell align="right">Actions</StyledHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockUsers.map((user) => (
                  <StyledBodyRow key={user.id} selected={selected.includes(user.id)}>
                    <StyledBodyCell padding="checkbox">
                      <Checkbox
                        size="small"
                        checked={selected.includes(user.id)}
                        onChange={() => handleSelect(user.id)}
                      />
                    </StyledBodyCell>
                    <StyledBodyCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ width: 32, height: 32, fontSize: '0.75rem', bgcolor: theme.palette.primary.main }}>
                          {user.name.split(' ').map((n) => n[0]).join('')}
                        </Avatar>
                        <Typography sx={{ fontWeight: 500 }}>{user.name}</Typography>
                      </Box>
                    </StyledBodyCell>
                    <StyledBodyCell>{user.email}</StyledBodyCell>
                    <StyledBodyCell>{user.role}</StyledBodyCell>
                    <StyledBodyCell>
                      <StatusIndicator status={getStatusType(user.status)}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </StatusIndicator>
                    </StyledBodyCell>
                    <StyledBodyCell>
                      <Typography sx={{ fontSize: '0.75rem', color: theme.palette.text.secondary }}>
                        {user.lastActive}
                      </Typography>
                    </StyledBodyCell>
                    <StyledBodyCell align="right">
                      <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                        <IconButton size="small"><EditOutlinedIcon fontSize="small" /></IconButton>
                        <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
                      </Stack>
                    </StyledBodyCell>
                  </StyledBodyRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2, p: 1.5, borderTop: `1px solid ${theme.palette.divider}` }}>
            <Typography variant="body2" color="text.secondary">1-4 of 4</Typography>
            <Stack direction="row" spacing={0.5}>
              <IconButton size="small" disabled><FirstPageIcon fontSize="small" /></IconButton>
              <IconButton size="small" disabled><ChevronLeftIcon fontSize="small" /></IconButton>
              <IconButton size="small" disabled><ChevronRightIcon fontSize="small" /></IconButton>
              <IconButton size="small" disabled><LastPageIcon fontSize="small" /></IconButton>
            </Stack>
          </Box>
        </Paper>

        {/* Selection indicator */}
        {selected.length > 0 && (
          <Box
            sx={{
              mt: 3,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              bgcolor: theme.palette.grey[900],
              color: 'white',
              borderRadius: 1,
              p: '8px 16px',
            }}
          >
            <IconButton size="small" sx={{ color: theme.palette.grey[400] }} onClick={() => setSelected([])}>
              <CloseIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {selected.length} selected
            </Typography>
            <Divider orientation="vertical" flexItem sx={{ borderColor: theme.palette.grey[700], mx: 1 }} />
            <Button size="small" startIcon={<SwapHorizIcon />} sx={{ color: 'white', textTransform: 'none' }}>
              Change type
            </Button>
            <Button size="small" startIcon={<GroupAddOutlinedIcon />} sx={{ color: 'white', textTransform: 'none' }}>
              Add to group
            </Button>
          </Box>
        )}
      </Section>

      {/* ================================================================ */}
      {/* FUTURE: USAGE PAGE STUB */}
      {/* ================================================================ */}
      <Box sx={{ p: 3, bgcolor: theme.palette.grey[50], borderRadius: 1, border: `1px dashed ${theme.palette.divider}` }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          Coming soon: Usage documentation
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Future enhancements will include a dedicated Usage page covering when to use tables,
          variants (basic, selectable, expandable), behaviors (sorting, filtering, pagination),
          and accessibility guidelines.
        </Typography>
      </Box>

    </Box>
  )
}

export default TableThemed

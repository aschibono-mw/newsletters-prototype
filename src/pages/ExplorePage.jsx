import { useState } from 'react'
import {
  Box, Typography, Paper, Divider, Collapse, TextField, Button,
  IconButton, Chip, List, ListItem, ListItemButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Checkbox, Avatar, Link,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import SendIcon from '@mui/icons-material/Send'

// ── Mock data ──────────────────────────────────────────────────────────────────

const FOLDERS = [
  { label: 'My Searches',      count: 12 },
  { label: 'Shared with Me',   count: 8  },
  { label: 'Archived',         count: 5  },
  { label: 'Competitor Watch', count: 7  },
  { label: 'Product Coverage', count: 15 },
]

const LABELS = ['Q4 Earnings', 'Product Launch', 'Executive', 'Sustainability', 'AI/ML', 'Regulatory']

const FAVORITES = [
  'Executive Visibility',
  'Crisis Watch',
  'The Daily Media Brief',
  'Industry Insights',
  'Media Coverage Report',
]

const SEARCH_CHIPS = ['Tesla', 'Climate Change', 'Fed Rate Hike', 'AI Regulation']

const SEARCH_ROWS = [
  { id: 1, name: 'Tesla Coverage Monitor',     folder: 'Finance / Auto',   edited: 'Jan 15', owner: { name: 'Marcus J.',  initials: 'MJ' }, starred: false },
  { id: 2, name: 'Product Recall Alerts',       folder: 'Operations',       edited: 'Jan 12', owner: { name: 'Sarah K.',   initials: 'SK' }, starred: true  },
  { id: 3, name: 'Executive Departures',        folder: 'Corporate',        edited: 'Jan 10', owner: { name: 'Alex M.',    initials: 'AM' }, starred: false },
  { id: 4, name: 'Q4 Earnings Coverage',        folder: 'Finance',          edited: 'Jan 9',  owner: { name: 'Jordan T.', initials: 'JT' }, starred: false },
  { id: 5, name: 'Sustainability Reporting',    folder: 'ESG',              edited: 'Jan 8',  owner: { name: 'Marcus J.', initials: 'MJ' }, starred: true  },
  { id: 6, name: 'AI Regulation News',          folder: 'Policy',           edited: 'Jan 7',  owner: { name: 'Chris L.',  initials: 'CL' }, starred: false },
  { id: 7, name: 'Competitor Product Launches', folder: 'Competitor Watch', edited: 'Jan 5',  owner: { name: 'Sarah K.',  initials: 'SK' }, starred: false },
]

// ── Shared card shell ──────────────────────────────────────────────────────────

function SectionCard({ title, action, children }) {
  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Box sx={{ px: 2, py: 1.25, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="subtitle2" fontWeight={700}>{title}</Typography>
        {action}
      </Box>
      <Divider />
      {children}
    </Paper>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function ExplorePage() {
  const [searchExpanded, setSearchExpanded] = useState(false)

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100%' }}>
      <Box sx={{ px: 3, py: 3 }}>

        {/* A) Page header */}
        <Typography variant="h5" fontWeight={700} sx={{ mb: 0.5 }}>
          Explore media coverage in one place
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
          Build searches across news, social, and online sources.
        </Typography>

        {/* B) Build a new search — collapsible */}
        <Paper variant="outlined" sx={{ borderRadius: 2, mb: 2.5, overflow: 'hidden' }}>

          {/* Always-visible header row */}
          <Box
            onClick={() => setSearchExpanded((prev) => !prev)}
            sx={{
              px: 2,
              py: 1.5,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              cursor: 'pointer',
              userSelect: 'none',
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: 1.5,
                bgcolor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <SearchIcon sx={{ color: 'common.white', fontSize: 18 }} />
            </Box>
            <Typography variant="body2" fontWeight={600} sx={{ flex: 1 }}>
              Build a new search
            </Typography>
            <ExpandMoreIcon
              sx={{
                fontSize: 20,
                color: 'text.secondary',
                transform: searchExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
              }}
            />
          </Box>

          {/* Expanded content */}
          <Collapse in={searchExpanded}>
            <Divider />
            <Box sx={{ px: 2.5, pt: 2, pb: 2.5 }}>

              {/* Description */}
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                Find media coverage for any topic, brand, keyword, or phrase.
              </Typography>

              {/* Search input */}
              <TextField
                fullWidth
                size="small"
                placeholder={'"Tesla" OR "Elon Musk" NOT "SpaceX"'}
                sx={{ mb: 0.5 }}
              />

              {/* View boolean — right-aligned */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Link href="#" variant="caption" underline="hover" color="primary.main">
                  View boolean
                </Link>
              </Box>

              {/* Example chips + Send */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, flex: 1 }}>
                  {SEARCH_CHIPS.map((chip) => (
                    <Chip
                      key={chip}
                      label={chip}
                      size="small"
                      variant="outlined"
                      clickable
                    />
                  ))}
                </Box>
                <Button
                  variant="contained"
                  size="small"
                  disableElevation
                  endIcon={<SendIcon sx={{ fontSize: '15px !important' }} />}
                  sx={{ flexShrink: 0, whiteSpace: 'nowrap' }}
                >
                  Search
                </Button>
              </Box>

            </Box>
          </Collapse>
        </Paper>

        {/* C) Two-column body */}
        <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'flex-start' }}>

          {/* ── Left column ── */}
          <Box sx={{ width: 300, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>

            {/* Folders */}
            <SectionCard
              title="Folders"
              action={<IconButton size="small"><AddIcon sx={{ fontSize: 18 }} /></IconButton>}
            >
              <List disablePadding>
                {FOLDERS.map((folder, i) => (
                  <ListItem key={folder.label} disablePadding divider={i < FOLDERS.length - 1}>
                    <ListItemButton sx={{ px: 2, py: 0.625 }}>
                      <FolderOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary', mr: 1.25, flexShrink: 0 }} />
                      <Box component="span" sx={{ lineHeight: 1 }}>
                        <Link href="#" variant="body2" underline="hover" color="text.primary">
                          {folder.label}
                        </Link>
                        {' '}
                        <Typography component="span" variant="body2" color="text.disabled">
                          ({folder.count})
                        </Typography>
                      </Box>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </SectionCard>

            {/* Labels */}
            <SectionCard
              title="Labels"
              action={<IconButton size="small"><AddIcon sx={{ fontSize: 18 }} /></IconButton>}
            >
              <Box sx={{ px: 2, py: 1.25, display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                {LABELS.map((label) => (
                  <Chip key={label} label={label} size="small" />
                ))}
              </Box>
            </SectionCard>

            {/* Favorites */}
            <SectionCard title="Favorites">
              <List disablePadding>
                {FAVORITES.map((fav, i) => (
                  <ListItem
                    key={fav}
                    disablePadding
                    divider={i < FAVORITES.length - 1}
                    secondaryAction={
                      <IconButton size="small" edge="end" sx={{ mr: 0.25 }}>
                        <StarIcon sx={{ fontSize: 17, color: 'primary.main' }} />
                      </IconButton>
                    }
                  >
                    <ListItemButton sx={{ px: 2, py: 0.625, pr: 5 }}>
                      <Typography variant="body2">{fav}</Typography>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider />
              <Box sx={{ px: 2, py: 0.875 }}>
                <Link
                  href="#"
                  variant="body2"
                  underline="hover"
                  color="text.secondary"
                  sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.25 }}
                >
                  Show more
                  <ExpandMoreIcon sx={{ fontSize: 15 }} />
                </Link>
              </Box>
            </SectionCard>

          </Box>

          {/* ── Right column ── */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>

              {/* Table toolbar */}
              <Box sx={{ px: 2, py: 1.25, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography variant="subtitle2" fontWeight={700}>Recent</Typography>
                  <KeyboardArrowDownIcon sx={{ fontSize: 17, color: 'text.secondary' }} />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    borderRadius: 1,
                    px: 0.75,
                    py: 0.375,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                >
                  <Typography variant="body2" color="text.secondary">Owner: Anyone</Typography>
                  <KeyboardArrowDownIcon sx={{ fontSize: 17, color: 'text.secondary' }} />
                </Box>
              </Box>
              <Divider />

              {/* Table */}
              <TableContainer>
                <Table size="small" sx={{ tableLayout: 'fixed' }}>
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'grey.50' }}>
                      <TableCell padding="checkbox" sx={{ width: 48 }}>
                        <Checkbox size="small" />
                      </TableCell>
                      <TableCell sx={{ width: '34%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                          <Typography variant="caption" color="text.secondary" fontWeight={600}>Name</Typography>
                          <ArrowDropDownIcon sx={{ fontSize: 15, color: 'text.secondary' }} />
                        </Box>
                      </TableCell>
                      <TableCell sx={{ width: '17%' }}>
                        <Typography variant="caption" color="text.secondary" fontWeight={600}>Folder</Typography>
                      </TableCell>
                      <TableCell sx={{ width: '14%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                          <Typography variant="caption" color="text.secondary" fontWeight={600}>Last edited</Typography>
                          <ArrowDropDownIcon sx={{ fontSize: 15, color: 'text.secondary' }} />
                        </Box>
                      </TableCell>
                      <TableCell sx={{ width: '20%' }}>
                        <Typography variant="caption" color="text.secondary" fontWeight={600}>Owner</Typography>
                      </TableCell>
                      <TableCell sx={{ width: 40, p: 0 }} />
                      <TableCell sx={{ width: 40, p: 0 }} />
                    </TableRow>
                  </TableHead>

                  <TableBody
                    sx={{
                      // Tighter row height for body cells only
                      '& .MuiTableCell-root': { py: 0.625 },
                    }}
                  >
                    {SEARCH_ROWS.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          '&:hover': { bgcolor: 'action.hover' },
                          '& .row-action': { opacity: 0 },
                          '&:hover .row-action': { opacity: 1 },
                        }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox size="small" />
                        </TableCell>

                        {/* Name */}
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.875, overflow: 'hidden' }}>
                            <SearchIcon sx={{ fontSize: 14, color: 'text.disabled', flexShrink: 0 }} />
                            <Link
                              href="#"
                              variant="body2"
                              underline="hover"
                              color="text.primary"
                              fontWeight={500}
                              sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                            >
                              {row.name}
                            </Link>
                          </Box>
                        </TableCell>

                        {/* Folder */}
                        <TableCell>
                          <Link
                            href="#"
                            variant="body2"
                            underline="hover"
                            color="text.secondary"
                            sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}
                          >
                            {row.folder}
                          </Link>
                        </TableCell>

                        {/* Last edited */}
                        <TableCell>
                          <Typography variant="body2" color="text.secondary" noWrap>
                            {row.edited}
                          </Typography>
                        </TableCell>

                        {/* Owner */}
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, overflow: 'hidden' }}>
                            <Avatar sx={{ width: 20, height: 20, fontSize: 9, bgcolor: 'grey.400', flexShrink: 0 }}>
                              {row.owner.initials}
                            </Avatar>
                            <Link
                              href="#"
                              variant="body2"
                              underline="hover"
                              color="text.primary"
                              sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                            >
                              {row.owner.name}
                            </Link>
                          </Box>
                        </TableCell>

                        {/* Star */}
                        <TableCell sx={{ px: 0.5, py: '0 !important' }}>
                          <IconButton size="small">
                            {row.starred
                              ? <StarIcon sx={{ fontSize: 17, color: 'primary.main' }} />
                              : <StarBorderIcon sx={{ fontSize: 17, color: 'text.disabled' }} />
                            }
                          </IconButton>
                        </TableCell>

                        {/* Kebab */}
                        <TableCell sx={{ px: 0.5, py: '0 !important' }}>
                          <IconButton size="small" className="row-action">
                            <MoreVertIcon sx={{ fontSize: 17, color: 'text.secondary' }} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Divider />
              <Box sx={{ py: 1.75, textAlign: 'center' }}>
                <Typography variant="body2" color="text.disabled">Loading more…</Typography>
              </Box>

            </Paper>
          </Box>

        </Box>
      </Box>
    </Box>
  )
}

import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle,
  Divider, IconButton, InputAdornment, Menu, MenuItem, Snackbar,
  TextField, Tooltip, Typography,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import FilterListIcon from '@mui/icons-material/FilterList'

const TEAL   = '#00827F'
const PURPLE = '#B627A1'

// ── Mock data ─────────────────────────────────────────────────────────────────
const NEWSLETTERS = ['The Daily Brief', 'Monthly Round Up', 'Media Coverage Monthly', 'Competitor Digest']

const INITIAL_LISTS = [
  {
    id: 'external-list',
    name: 'External List',
    subscribers: 2840,
    usedIn: ['The Daily Brief', 'Monthly Round Up', 'Media Coverage Monthly'],
    owner: 'Maricela',
    updated: 'Mar 25, 2026',
    contacts: [
      'sarah.johnson@techcorp.com', 'michael.chen@mediagroup.com', 'emily.rodriguez@brandco.com',
      'james.wilson@prweek.com', 'olivia.martinez@digitalink.com', 'david.kim@commsplus.com',
      'sophie.taylor@globalpr.com', 'noah.brown@newsdesk.com', 'ava.davis@mediawatch.com',
      'liam.miller@brandbeat.com', 'isabella.moore@coverage.io', 'mason.jackson@prfirm.com',
      'mia.white@mediahub.com', 'ethan.harris@brandpulse.com', 'charlotte.martin@pr24.com',
      'alexander.garcia@mediavault.com', 'amelia.walker@commslab.com', 'henry.hall@newspr.com',
    ],
  },
  {
    id: 'c-suite',
    name: 'C-Suite Leadership',
    subscribers: 12,
    usedIn: ['Monthly Round Up', 'Media Coverage Monthly'],
    owner: 'Maricela',
    updated: 'Mar 25, 2026',
    contacts: [
      'ceo@company.com', 'coo@company.com', 'cfo@company.com',
      'cmo@company.com', 'cto@company.com', 'chro@company.com',
      'cso@company.com', 'chief.legal@company.com', 'chief.comm@company.com',
      'evp.strategy@company.com', 'evp.operations@company.com', 'vp.brand@company.com',
    ],
  },
  {
    id: 'tech-team',
    name: 'Tech Team',
    subscribers: 34,
    usedIn: ['The Daily Brief', 'Monthly Round Up', 'Media Coverage Monthly', 'Competitor Digest'],
    owner: 'Maricela',
    updated: 'Mar 25, 2026',
    contacts: Array.from({ length: 34 }, (_, i) => `engineer${i + 1}@company.com`),
  },
  {
    id: 'media-team',
    name: 'Media Team',
    subscribers: 2677,
    usedIn: ['The Daily Brief'],
    owner: 'Maricela',
    updated: 'Mar 25, 2026',
    contacts: Array.from({ length: 20 }, (_, i) => `mediacontact${i + 1}@outlet.com`),
  },
  {
    id: 'leadership-team',
    name: 'Leadership Team',
    subscribers: 111,
    usedIn: ['Monthly Round Up'],
    owner: 'Maricela',
    updated: 'Mar 25, 2026',
    contacts: Array.from({ length: 20 }, (_, i) => `leader${i + 1}@company.com`),
  },
  {
    id: 'press-contacts',
    name: 'Press Contacts',
    subscribers: 448,
    usedIn: ['Media Coverage Monthly'],
    owner: 'Tony',
    updated: 'Apr 2, 2026',
    contacts: Array.from({ length: 20 }, (_, i) => `press${i + 1}@media.com`),
  },
  {
    id: 'partner-network',
    name: 'Partner Network',
    subscribers: 892,
    usedIn: ['Competitor Digest', 'Monthly Round Up'],
    owner: 'Tony',
    updated: 'Apr 10, 2026',
    contacts: Array.from({ length: 20 }, (_, i) => `partner${i + 1}@agency.com`),
  },
  {
    id: 'board-members',
    name: 'Board Members',
    subscribers: 8,
    usedIn: ['Monthly Round Up'],
    owner: 'Maricela',
    updated: 'Feb 14, 2026',
    contacts: Array.from({ length: 8 }, (_, i) => `board.member${i + 1}@company.com`),
  },
]

// ── Recipient Lists page ───────────────────────────────────────────────────────
export function MwNewslettersRecipientsPage() {
  const navigate = useNavigate()
  const [lists, setLists] = useState(INITIAL_LISTS)
  const [search, setSearch] = useState('')
  const [expandedUsedIn, setExpandedUsedIn] = useState({})
  const [newListOpen, setNewListOpen] = useState(false)
  const [newListName, setNewListName] = useState('')
  const [snackbar, setSnackbar] = useState(null)

  const toggleUsedIn = (id) => setExpandedUsedIn(prev => ({ ...prev, [id]: !prev[id] }))

  const filtered = lists.filter(l => l.name.toLowerCase().includes(search.toLowerCase()))

  const handleNewList = () => {
    if (!newListName.trim()) return
    const id = newListName.toLowerCase().replace(/\s+/g, '-')
    setLists(prev => [...prev, {
      id, name: newListName.trim(), subscribers: 0,
      usedIn: [], owner: 'Tony', updated: 'Apr 20, 2026', contacts: [],
    }])
    setNewListOpen(false)
    setNewListName('')
    setSnackbar('List created successfully')
  }

  const handleDuplicate = (list) => {
    const copy = { ...list, id: list.id + '-copy', name: list.name + ' (Copy)', updated: 'Apr 20, 2026' }
    setLists(prev => [...prev, copy])
    setSnackbar(`"${list.name}" duplicated`)
  }

  const handleDelete = (id) => {
    const list = lists.find(l => l.id === id)
    setLists(prev => prev.filter(l => l.id !== id))
    setSnackbar(`"${list?.name}" deleted`)
  }

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', bgcolor: '#f6f7f9', minHeight: 0 }}>
      {/* Page header */}
      <Box sx={{ bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', px: 3, py: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Tooltip title="Back to Newsletters">
          <IconButton size="small" onClick={() => navigate('/mw-newsletters')} sx={{ color: 'text.secondary' }}>
            <ArrowBackIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <PeopleOutlineIcon sx={{ fontSize: 20, color: TEAL }} />
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '18px', flex: 1 }}>Recipient Lists</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setNewListOpen(true)}
          sx={{ bgcolor: PURPLE, color: '#fff', '&:hover': { bgcolor: '#9a1f87' }, textTransform: 'none', fontWeight: 600 }}
        >
          New List
        </Button>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
        <Box sx={{ bgcolor: 'background.paper', borderRadius: '8px', border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
          {/* Table toolbar */}
          <Box sx={{ px: 2.5, py: 1.75, display: 'flex', alignItems: 'center', gap: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography sx={{ fontWeight: 700, fontSize: '14px' }}>{filtered.length} Lists</Typography>
            <Box sx={{ flex: 1 }} />
            <TextField
              size="small"
              placeholder="Search lists…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 16, color: 'text.disabled' }} /></InputAdornment> }}
              sx={{ width: 220, '& .MuiOutlinedInput-root': { fontSize: '13px', height: 34 } }}
            />
            <Tooltip title="Filter">
              <IconButton size="small" sx={{ color: 'text.secondary' }}><FilterListIcon fontSize="small" /></IconButton>
            </Tooltip>
          </Box>

          {/* Table header */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 120px 220px 120px 160px 120px', px: 2.5, py: 1.25, bgcolor: 'rgba(0,0,0,0.02)', borderBottom: '1px solid', borderColor: 'divider' }}>
            {['List Name', 'Subscribers', 'Used In', 'Owner', 'Last Updated', 'Actions'].map((col, i) => (
              <Typography key={col} sx={{ fontSize: '11.5px', fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: i >= 4 ? 'right' : 'left' }}>
                {col}
              </Typography>
            ))}
          </Box>

          {/* Rows */}
          {filtered.map((list, idx) => (
            <Box
              key={list.id}
              sx={{
                display: 'grid', gridTemplateColumns: '2fr 120px 220px 120px 160px 120px',
                px: 2.5, py: 1.5, alignItems: 'center',
                borderBottom: idx < filtered.length - 1 ? '1px solid' : 'none', borderColor: 'divider',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.015)' },
              }}
            >
              {/* List name */}
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}
                onClick={() => navigate(`/mw-newsletters/recipients/${list.id}`)}
              >
                <PeopleOutlineIcon sx={{ fontSize: 18, color: 'text.secondary', flexShrink: 0 }} />
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: TEAL, '&:hover': { textDecoration: 'underline' } }}>
                  {list.name}
                </Typography>
              </Box>

              {/* Subscribers */}
              <Typography sx={{ fontSize: '13px', color: 'text.primary' }}>
                {list.subscribers.toLocaleString()}
              </Typography>

              {/* Used In */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {list.usedIn.length === 0 ? (
                  <Typography sx={{ fontSize: '12px', color: 'text.disabled', fontStyle: 'italic' }}>Not used</Typography>
                ) : list.usedIn.length === 1 ? (
                  <Typography sx={{ fontSize: '12px', color: 'text.primary' }}>{list.usedIn[0]}</Typography>
                ) : (
                  <Box>
                    <Box
                      onClick={() => toggleUsedIn(list.id)}
                      sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.4, cursor: 'pointer', px: 1, py: 0.3, borderRadius: '4px', border: '1px solid', borderColor: 'divider', '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' } }}
                    >
                      <Typography sx={{ fontSize: '12px', fontWeight: 500, color: 'text.primary' }}>{list.usedIn.length} Newsletters</Typography>
                      <ArrowDropDownIcon sx={{ fontSize: 16, color: 'text.secondary', transform: expandedUsedIn[list.id] ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
                    </Box>
                    {expandedUsedIn[list.id] && (
                      <Box sx={{ mt: 0.5, display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                        {list.usedIn.map(nl => (
                          <Typography key={nl} sx={{ fontSize: '11.5px', color: 'text.secondary', pl: 0.5 }}>• {nl}</Typography>
                        ))}
                      </Box>
                    )}
                  </Box>
                )}
              </Box>

              {/* Owner */}
              <Typography sx={{ fontSize: '13px', color: 'text.primary' }}>{list.owner}</Typography>

              {/* Last Updated */}
              <Typography sx={{ fontSize: '13px', color: 'text.secondary', textAlign: 'right' }}>{list.updated}</Typography>

              {/* Actions */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25, justifyContent: 'flex-end' }}>
                <Tooltip title="View list">
                  <IconButton size="small" onClick={() => navigate(`/mw-newsletters/recipients/${list.id}`)} sx={{ color: 'text.disabled', '&:hover': { color: TEAL } }}>
                    <VisibilityOutlinedIcon sx={{ fontSize: 17 }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Duplicate">
                  <IconButton size="small" onClick={() => handleDuplicate(list)} sx={{ color: 'text.disabled', '&:hover': { color: 'text.primary' } }}>
                    <ContentCopyIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete list">
                  <IconButton size="small" onClick={() => handleDelete(list.id)} sx={{ color: 'text.disabled', '&:hover': { color: 'error.main' } }}>
                    <DeleteOutlineIcon sx={{ fontSize: 17 }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          ))}

          {filtered.length === 0 && (
            <Box sx={{ py: 6, textAlign: 'center' }}>
              <Typography sx={{ fontSize: '14px', color: 'text.disabled' }}>No lists match "{search}"</Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* New list dialog */}
      <Dialog open={newListOpen} onClose={() => setNewListOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, fontSize: '16px' }}>New Recipient List</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus fullWidth label="List name" variant="outlined" size="small"
            value={newListName} onChange={e => setNewListName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleNewList()}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setNewListOpen(false)} sx={{ textTransform: 'none', color: 'text.secondary' }}>Cancel</Button>
          <Button variant="contained" onClick={handleNewList} disabled={!newListName.trim()} sx={{ textTransform: 'none', fontWeight: 600, bgcolor: PURPLE, color: '#fff', '&:hover': { bgcolor: '#9a1f87' } }}>
            Create List
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={Boolean(snackbar)}
        autoHideDuration={3000}
        onClose={() => setSnackbar(null)}
        message={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircleIcon sx={{ fontSize: 16, color: '#4caf50' }} />
            <span>{snackbar}</span>
          </Box>
        }
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  )
}

// ── Recipient detail page ─────────────────────────────────────────────────────
export function MwNewslettersRecipientDetailPage() {
  const navigate = useNavigate()
  const { listId } = useParams()
  const [lists, setLists] = useState(INITIAL_LISTS)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [menuAnchor, setMenuAnchor] = useState(null)
  const [addOpen, setAddOpen] = useState(false)
  const [newEmails, setNewEmails] = useState('')
  const [nlMenuAnchor, setNlMenuAnchor] = useState(null)
  const [snackbar, setSnackbar] = useState(null)

  const PAGE_SIZE = 10
  const list = lists.find(l => l.id === listId)

  if (!list) return (
    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography sx={{ color: 'text.secondary' }}>List not found.</Typography>
    </Box>
  )

  const filtered = list.contacts.filter(c => c.toLowerCase().includes(search.toLowerCase()))
  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)

  const updateList = (updater) => setLists(prev => prev.map(l => l.id === listId ? updater(l) : l))

  const handleDeleteContact = (email) => {
    updateList(l => ({ ...l, contacts: l.contacts.filter(c => c !== email), subscribers: l.subscribers - 1 }))
  }

  const handleAddContacts = () => {
    const emails = newEmails.split(/[\n,;]+/).map(e => e.trim()).filter(e => e.includes('@'))
    if (!emails.length) return
    updateList(l => ({ ...l, contacts: [...l.contacts, ...emails], subscribers: l.subscribers + emails.length }))
    setAddOpen(false)
    setNewEmails('')
    setSnackbar(`${emails.length} contact${emails.length > 1 ? 's' : ''} added`)
  }

  const handleToggleNewsletter = (nl) => {
    updateList(l => ({
      ...l,
      usedIn: l.usedIn.includes(nl) ? l.usedIn.filter(n => n !== nl) : [...l.usedIn, nl],
    }))
  }

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', bgcolor: '#f6f7f9', minHeight: 0 }}>
      {/* Page header */}
      <Box sx={{ bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', px: 3, py: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Tooltip title="Back to Recipient Lists">
          <IconButton size="small" onClick={() => navigate('/mw-newsletters/recipients')} sx={{ color: 'text.secondary' }}>
            <ArrowBackIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '18px' }}>{list.name}</Typography>
        {/* Used-in chips */}
        <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', flex: 1 }}>
          {list.usedIn.map(nl => (
            <Chip key={nl} label={nl} size="small" sx={{ fontSize: '11px', height: 22, bgcolor: 'rgba(0,130,127,0.08)', color: TEAL, fontWeight: 600, border: 'none' }} />
          ))}
          <Tooltip title="Add or remove from newsletters">
            <Chip
              icon={<AddIcon sx={{ fontSize: '13px !important' }} />}
              label="Add to newsletter"
              size="small"
              onClick={e => setNlMenuAnchor(e.currentTarget)}
              sx={{ fontSize: '11px', height: 22, cursor: 'pointer', bgcolor: 'transparent', border: '1px dashed rgba(0,0,0,0.2)', color: 'text.secondary', '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' } }}
            />
          </Tooltip>
        </Box>
        <IconButton size="small" onClick={e => setMenuAnchor(e.currentTarget)} sx={{ color: 'text.secondary' }}>
          <MoreVertIcon fontSize="small" />
        </IconButton>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setAddOpen(true)}
          sx={{ bgcolor: PURPLE, color: '#fff', '&:hover': { bgcolor: '#9a1f87' }, textTransform: 'none', fontWeight: 600, flexShrink: 0 }}
        >
          Add Contacts
        </Button>
      </Box>

      {/* Newsletter assignment menu */}
      <Menu anchorEl={nlMenuAnchor} open={Boolean(nlMenuAnchor)} onClose={() => setNlMenuAnchor(null)}>
        <Box sx={{ px: 2, py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography sx={{ fontSize: '11px', fontWeight: 700, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Send to Newsletter Series
          </Typography>
        </Box>
        {NEWSLETTERS.map(nl => (
          <MenuItem key={nl} onClick={() => handleToggleNewsletter(nl)} sx={{ fontSize: '13px', gap: 1 }}>
            <Box sx={{
              width: 16, height: 16, borderRadius: '3px', border: `2px solid ${list.usedIn.includes(nl) ? TEAL : 'rgba(0,0,0,0.25)'}`,
              bgcolor: list.usedIn.includes(nl) ? TEAL : 'transparent', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {list.usedIn.includes(nl) && <Box sx={{ width: 6, height: 6, bgcolor: '#fff', borderRadius: '1px' }} />}
            </Box>
            {nl}
          </MenuItem>
        ))}
      </Menu>

      {/* Kebab menu */}
      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
        <MenuItem sx={{ fontSize: '13px' }} onClick={() => setMenuAnchor(null)}>Rename list</MenuItem>
        <MenuItem sx={{ fontSize: '13px' }} onClick={() => setMenuAnchor(null)}>Export contacts</MenuItem>
        <MenuItem sx={{ fontSize: '13px' }} onClick={() => setMenuAnchor(null)}>Duplicate list</MenuItem>
        <Divider />
        <MenuItem sx={{ fontSize: '13px', color: 'error.main' }} onClick={() => { setMenuAnchor(null); navigate('/mw-newsletters/recipients') }}>Delete list</MenuItem>
      </Menu>

      {/* Content */}
      <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
        <Box sx={{ bgcolor: 'background.paper', borderRadius: '8px', border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
          {/* Table toolbar */}
          <Box sx={{ px: 2.5, py: 1.75, display: 'flex', alignItems: 'center', gap: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography sx={{ fontWeight: 700, fontSize: '14px' }}>{filtered.length.toLocaleString()} Contacts</Typography>
            <Box sx={{ flex: 1 }} />
            <TextField
              size="small"
              placeholder="Search contacts…"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(0) }}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 16, color: 'text.disabled' }} /></InputAdornment> }}
              sx={{ width: 220, '& .MuiOutlinedInput-root': { fontSize: '13px', height: 34 } }}
            />
          </Box>

          {/* Column headers */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 80px', px: 2.5, py: 1.25, bgcolor: 'rgba(0,0,0,0.02)', borderBottom: '1px solid', borderColor: 'divider' }}>
            {['Email', 'Actions'].map((col, i) => (
              <Typography key={col} sx={{ fontSize: '11.5px', fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: i === 1 ? 'right' : 'left' }}>
                {col}
              </Typography>
            ))}
          </Box>

          {/* Contact rows */}
          {paginated.map((email, idx) => (
            <Box
              key={email + idx}
              sx={{
                display: 'grid', gridTemplateColumns: '1fr 80px', px: 2.5, py: 1.25,
                alignItems: 'center',
                borderBottom: idx < paginated.length - 1 ? '1px solid' : 'none', borderColor: 'divider',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.015)' },
                '& .delete-btn': { opacity: 0 },
                '&:hover .delete-btn': { opacity: 1 },
              }}
            >
              <Typography sx={{ fontSize: '13px', color: 'text.primary' }}>{email}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Tooltip title="Remove contact">
                  <IconButton
                    className="delete-btn"
                    size="small"
                    onClick={() => handleDeleteContact(email)}
                    sx={{ color: 'text.disabled', transition: 'opacity 0.15s', '&:hover': { color: 'error.main' } }}
                  >
                    <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          ))}

          {filtered.length === 0 && (
            <Box sx={{ py: 6, textAlign: 'center' }}>
              <Typography sx={{ fontSize: '14px', color: 'text.disabled' }}>
                {search ? `No contacts match "${search}"` : 'No contacts in this list yet.'}
              </Typography>
            </Box>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ px: 2.5, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1, borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography sx={{ fontSize: '12px', color: 'text.secondary', flex: 1 }}>
                {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, filtered.length)} of {filtered.length.toLocaleString()}
              </Typography>
              <Button size="small" disabled={page === 0} onClick={() => setPage(p => p - 1)} sx={{ textTransform: 'none', fontSize: '12px', minWidth: 0, px: 1 }}>Previous</Button>
              <Button size="small" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)} sx={{ textTransform: 'none', fontSize: '12px', minWidth: 0, px: 1 }}>Next</Button>
            </Box>
          )}
        </Box>
      </Box>

      {/* Add contacts dialog */}
      <Dialog open={addOpen} onClose={() => setAddOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, fontSize: '16px' }}>Add Contacts</DialogTitle>
        <DialogContent>
          <Typography sx={{ fontSize: '13px', color: 'text.secondary', mb: 1.5 }}>
            Enter email addresses separated by commas, semicolons, or new lines.
          </Typography>
          <TextField
            autoFocus fullWidth multiline rows={6} variant="outlined"
            placeholder="name@company.com, name2@company.com…"
            value={newEmails}
            onChange={e => setNewEmails(e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { fontSize: '13px' } }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setAddOpen(false)} sx={{ textTransform: 'none', color: 'text.secondary' }}>Cancel</Button>
          <Button variant="contained" onClick={handleAddContacts} disabled={!newEmails.trim()} sx={{ textTransform: 'none', fontWeight: 600, bgcolor: PURPLE, color: '#fff', '&:hover': { bgcolor: '#9a1f87' } }}>
            Add Contacts
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={Boolean(snackbar)}
        autoHideDuration={3000}
        onClose={() => setSnackbar(null)}
        message={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircleIcon sx={{ fontSize: 16, color: '#4caf50' }} />
            <span>{snackbar}</span>
          </Box>
        }
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  )
}

export default MwNewslettersRecipientsPage

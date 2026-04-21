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
  Button,
  Chip,
  Avatar,
} from '@mui/material'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import BoltIcon from '@mui/icons-material/Bolt'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AddIcon from '@mui/icons-material/Add'
import TableHeader from '../components/core/TableHeader'
import Indicator from '../components/core/Indicator'

// ─── Mock data ─────────────────────────────────────────────────────────────────

const MOCK_ALERTS = [
  {
    id: 1,
    type: 'spike',
    savedSearch: 'Nike Sustainability',
    triggered: 'Apr 9, 2026 · 9:14 AM',
    reach: '11.2M',
    changePct: '+141%',
    aiSummary:
      'Mentions up 141% — NYT investigation driving negative sentiment spike. "Greenwashing" top term.',
    addedToDigest: 'Weekly Brand Monitor',
  },
  {
    id: 2,
    type: 'spike',
    savedSearch: 'EU Regulatory News',
    triggered: 'Apr 9, 2026 · 7:02 AM',
    reach: '4.8M',
    changePct: '+89%',
    aiSummary:
      'Green Claims Directive coverage up 89% ahead of Apr 15 parliamentary hearing.',
    addedToDigest: null,
  },
  {
    id: 3,
    type: 'mention',
    savedSearch: 'Brand Mentions — Exec',
    triggered: 'Apr 8, 2026 · 3:45 PM',
    reach: '2.1M',
    changePct: null,
    aiSummary:
      'CEO quoted in Bloomberg responding to sustainability allegations. Positive framing.',
    addedToDigest: null,
  },
  {
    id: 4,
    type: 'spike',
    savedSearch: 'Competitor — Adidas',
    triggered: 'Apr 8, 2026 · 1:20 PM',
    reach: '6.3M',
    changePct: '+67%',
    aiSummary:
      'Adidas mentions up 67% — new sustainability campaign launch generating earned media.',
    addedToDigest: 'Competitor Intelligence Brief',
  },
  {
    id: 5,
    type: 'mention',
    savedSearch: 'Industry — Sportswear',
    triggered: 'Apr 7, 2026 · 11:00 AM',
    reach: '1.4M',
    changePct: null,
    aiSummary:
      'Reuters piece on EU directive impact across sportswear category — 3 brand mentions.',
    addedToDigest: null,
  },
  {
    id: 6,
    type: 'spike',
    savedSearch: 'Social — Nike Twitter',
    triggered: 'Apr 6, 2026 · 8:30 PM',
    reach: '3.2M',
    changePct: '+55%',
    aiSummary:
      'Reddit r/environment thread viral — Nike carbon offset claims, 1.2K upvotes.',
    addedToDigest: 'Weekly Brand Monitor',
  },
]

// ─── Sub-components ────────────────────────────────────────────────────────────

function AlertTypeBadge({ type }) {
  if (type === 'spike') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <BoltIcon sx={{ fontSize: 14, color: '#E65100' }} />
        <Typography variant="caption" sx={{ fontWeight: 600, color: '#E65100' }}>
          Spike Detection
        </Typography>
      </Box>
    )
  }
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <NotificationsOutlinedIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
      <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
        Every Mention
      </Typography>
    </Box>
  )
}

function AddToDigestCell({ addedToDigest }) {
  if (addedToDigest) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
        <CheckCircleIcon sx={{ fontSize: 15, color: '#2E7D32', flexShrink: 0 }} />
        <Typography
          variant="caption"
          sx={{ color: '#2E7D32', fontWeight: 600, lineHeight: 1.3 }}
        >
          {addedToDigest}
        </Typography>
      </Box>
    )
  }
  return (
    <Button
      variant="outlined"
      size="small"
      startIcon={<AddIcon sx={{ fontSize: '14px !important' }} />}
      sx={{
        textTransform: 'none',
        fontSize: '0.75rem',
        py: 0.4,
        px: 1.25,
        borderRadius: '4px',
        whiteSpace: 'nowrap',
        color: 'primary.main',
        borderColor: 'primary.main',
      }}
    >
      Add to Digest
    </Button>
  )
}

// ─── Main page ─────────────────────────────────────────────────────────────────

function AlertsFeedPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = useMemo(() => {
    if (!searchQuery) return MOCK_ALERTS
    const q = searchQuery.toLowerCase()
    return MOCK_ALERTS.filter(
      (a) =>
        a.savedSearch.toLowerCase().includes(q) ||
        a.aiSummary.toLowerCase().includes(q)
    )
  }, [searchQuery])

  const addedCount = MOCK_ALERTS.filter((a) => a.addedToDigest).length

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', backgroundColor: 'grey.50' }}>
      {/* Page header */}
      <Paper elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="xl" sx={{ py: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Alerts
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Recent alert activity — add directly to a digest for AI-summarized inclusion
          </Typography>
        </Container>
      </Paper>

      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* Cross-surface integration banner */}
        <Box
          sx={{
            mb: 2,
            px: 2,
            py: 1.5,
            borderRadius: 1,
            bgcolor: '#E0F2F1',
            border: '1px solid',
            borderColor: 'primary.light',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AutoAwesomeOutlinedIcon sx={{ color: 'secondary.main', fontSize: 18, flexShrink: 0 }} />
            <Typography variant="body2" sx={{ color: 'text.primary' }}>
              <Box component="span" sx={{ fontWeight: 600 }}>
                {addedCount} alerts
              </Box>{' '}
              already added to digests this week. Alerts you add are AI-summarized and placed into
              the relevant digest section automatically.
            </Typography>
          </Box>
          <Indicator label="Cross-surface" color="cyan" size="small" />
        </Box>

        <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
          <TableHeader
            title="Recent Alerts"
            count={filtered.length}
            showFind
            findValue={searchQuery}
            onFindChange={setSearchQuery}
          />

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, width: '13%' }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '16%' }}>Saved Search</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '16%' }}>Triggered</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '8%' }}>Reach</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '30%' }}>AI Summary</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '17%' }}>Add to Digest</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((alert) => (
                  <TableRow
                    key={alert.id}
                    sx={{
                      bgcolor: alert.addedToDigest ? '#FAFFFE' : 'background.paper',
                    }}
                  >
                    {/* Type */}
                    <TableCell>
                      <AlertTypeBadge type={alert.type} />
                    </TableCell>

                    {/* Saved Search */}
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {alert.savedSearch}
                      </Typography>
                      {alert.changePct && (
                        <Chip
                          label={alert.changePct}
                          size="small"
                          sx={{
                            mt: 0.5,
                            height: 18,
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            bgcolor: '#FFF3E0',
                            color: '#E65100',
                            border: '1px solid #FFCC80',
                            borderRadius: '4px',
                          }}
                        />
                      )}
                    </TableCell>

                    {/* Triggered */}
                    <TableCell>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: '0.8rem' }}
                      >
                        {alert.triggered}
                      </Typography>
                    </TableCell>

                    {/* Reach */}
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {alert.reach}
                      </Typography>
                    </TableCell>

                    {/* AI Summary */}
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.75 }}>
                        <AutoAwesomeOutlinedIcon
                          sx={{ fontSize: 13, color: 'secondary.main', flexShrink: 0, mt: 0.2 }}
                        />
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ lineHeight: 1.5 }}
                        >
                          {alert.aiSummary}
                        </Typography>
                      </Box>
                    </TableCell>

                    {/* Add to Digest */}
                    <TableCell>
                      <AddToDigestCell addedToDigest={alert.addedToDigest} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            sx={{
              px: 2,
              py: 1.5,
              borderTop: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              justifyContent: 'flex-end',
              bgcolor: 'grey.50',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              1–{filtered.length} of {filtered.length}
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default AlertsFeedPage

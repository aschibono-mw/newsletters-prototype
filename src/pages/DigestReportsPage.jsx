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
  Chip,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import BoltIcon from '@mui/icons-material/Bolt'
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import TableHeader from '../components/core/TableHeader'
import Indicator from '../components/core/Indicator'

const MOCK_DIGESTS = [
  {
    id: 'digest-001',
    name: 'Weekly Brand Monitor',
    signals: ['Nike Sustainability Monitor', 'Brand Sentiment Dashboard'],
    updateType: 'ai',
    lastUpdated: 'Apr 9, 2026',
    updateTrigger: 'signal',
    status: 'ready',
    sections: 4,
    recipients: 12,
    newItems: 5,
  },
  {
    id: 'digest-002',
    name: 'Competitor Intelligence Brief',
    signals: ['Adidas Monitor', 'Under Armour Alerts', '+2 more'],
    updateType: 'ai',
    lastUpdated: 'Apr 8, 2026',
    updateTrigger: 'scheduled',
    status: 'sent',
    sections: 6,
    recipients: 8,
    newItems: 0,
  },
  {
    id: 'digest-003',
    name: 'Executive PR Summary',
    signals: ['Media Coverage Alert'],
    updateType: 'manual',
    lastUpdated: 'Apr 7, 2026',
    updateTrigger: 'scheduled',
    status: 'draft',
    sections: 3,
    recipients: 5,
    newItems: 0,
  },
  {
    id: 'digest-004',
    name: 'Sustainability ESG Tracker',
    signals: ['ESG Monitor', 'Regulatory Alerts'],
    updateType: 'ai',
    lastUpdated: 'Apr 9, 2026',
    updateTrigger: 'signal',
    status: 'ready',
    sections: 5,
    recipients: 20,
    newItems: 3,
  },
  {
    id: 'digest-005',
    name: 'Social Pulse Digest',
    signals: ['Twitter Monitor', 'Instagram Alerts'],
    updateType: 'ai',
    lastUpdated: 'Apr 6, 2026',
    updateTrigger: 'scheduled',
    status: 'sent',
    sections: 3,
    recipients: 15,
    newItems: 0,
  },
]

function StatusBadge({ status }) {
  const config = {
    ready: { label: 'Ready to Send', color: 'green' },
    sent: { label: 'Sent', color: 'gray' },
    draft: { label: 'Draft', color: 'yellow' },
  }
  const { label, color } = config[status] || config.draft
  return <Indicator label={label} color={color} size="small" />
}

function DigestReportsPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = useMemo(() => {
    if (!searchQuery) return MOCK_DIGESTS
    const q = searchQuery.toLowerCase()
    return MOCK_DIGESTS.filter((d) => d.name.toLowerCase().includes(q))
  }, [searchQuery])

  const signalReadyCount = MOCK_DIGESTS.filter(
    (d) => d.updateTrigger === 'signal' && d.status === 'ready'
  ).length

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', backgroundColor: 'grey.50' }}>
      {/* Page header */}
      <Paper elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="xl" sx={{ py: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Digest Reports
          </Typography>
          <Typography variant="body2" color="text.secondary">
            AI-generated digests built from your signals, monitors, and alerts
          </Typography>
        </Container>
      </Paper>

      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* Signal-triggered update banner */}
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
            gap: 1,
          }}
        >
          <BoltIcon sx={{ color: 'primary.main', fontSize: 18, flexShrink: 0 }} />
          <Typography variant="body2" sx={{ color: 'primary.dark' }}>
            <Box component="span" sx={{ fontWeight: 600 }}>
              {signalReadyCount} digests
            </Box>{' '}
            auto-updated from new signals today and are ready to review.
          </Typography>
        </Box>

        <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
          <TableHeader
            title="Digests"
            count={filtered.length}
            primaryAction={{
              label: 'Create Digest',
              icon: <AddIcon />,
              onClick: () => navigate('/digests/new'),
            }}
            showFind
            findValue={searchQuery}
            onFindChange={setSearchQuery}
          />

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, width: '25%' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '27%' }}>Signal Sources</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '13%' }}>Generation</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '18%' }}>Last Updated</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '12%' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '5%' }}>Recipients</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((digest) => (
                  <TableRow key={digest.id} hover>
                    {/* Name */}
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                          component={RouterLink}
                          to={`/digests/${digest.id}`}
                          sx={{
                            color: 'primary.main',
                            fontWeight: 500,
                            textDecoration: 'none',
                            fontSize: '0.875rem',
                            '&:hover': { textDecoration: 'underline' },
                          }}
                        >
                          {digest.name}
                        </Box>
                        {digest.newItems > 0 && (
                          <Chip
                            label={`${digest.newItems} new`}
                            size="small"
                            sx={{
                              height: 18,
                              fontSize: '0.68rem',
                              fontWeight: 600,
                              bgcolor: '#E8F5E9',
                              color: '#2E7D32',
                              border: '1px solid',
                              borderColor: '#A5D6A7',
                              borderRadius: '4px',
                            }}
                          />
                        )}
                      </Box>
                    </TableCell>

                    {/* Signal Sources */}
                    <TableCell>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {digest.signals.map((sig, i) => (
                          <Chip
                            key={i}
                            label={sig}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: '0.68rem',
                              bgcolor: 'grey.100',
                              borderRadius: '4px',
                            }}
                          />
                        ))}
                      </Box>
                    </TableCell>

                    {/* Generation */}
                    <TableCell>
                      {digest.updateType === 'ai' ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <AutoAwesomeOutlinedIcon sx={{ fontSize: 14, color: 'secondary.main' }} />
                          <Typography
                            variant="caption"
                            sx={{ color: 'secondary.main', fontWeight: 600 }}
                          >
                            AI-Generated
                          </Typography>
                        </Box>
                      ) : (
                        <Typography variant="caption" color="text.secondary">
                          Manual
                        </Typography>
                      )}
                    </TableCell>

                    {/* Last Updated + trigger */}
                    <TableCell>
                      <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                        {digest.lastUpdated}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.25 }}>
                        {digest.updateTrigger === 'signal' ? (
                          <>
                            <BoltIcon sx={{ fontSize: 11, color: 'primary.main' }} />
                            <Typography
                              variant="caption"
                              sx={{ color: 'primary.main', fontWeight: 500 }}
                            >
                              Signal-triggered
                            </Typography>
                          </>
                        ) : (
                          <>
                            <ScheduleOutlinedIcon sx={{ fontSize: 11, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                              Scheduled
                            </Typography>
                          </>
                        )}
                      </Box>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <StatusBadge status={digest.status} />
                    </TableCell>

                    {/* Recipients */}
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {digest.recipients}
                      </Typography>
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

export default DigestReportsPage

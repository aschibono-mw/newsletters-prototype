import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Paper,
  Typography,
  Button,
  Tabs,
  Tab,
  Tooltip,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Checkbox,
  LinearProgress,
  Popover,
} from '@mui/material'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'

// Layout components
import { PageShell } from '../components/layout'

// Core components
import { ThemedChip } from '../components/themed/ChipThemed'

// Seats components
import {
  SeatsPageHeader,
  SeatsStatCards,
  SeatsTableToolbar,
  SeatsTableRow,
  SeatsTableRowSkeleton,
  BulkSeatChangeDialog,
  BulkRoleChangeDialog,
  BulkDeleteConfirmDialog,
  AdminSettingsDialog,
  SetVisibilityDialog,
} from '../components/seats'

// Hooks
import { useTableFilters, useTableSort, usePagination } from '../hooks'

// Data and constants
import {
  INITIAL_ROLES,
  INITIAL_GROUPS,
  INITIAL_USERS_V10,
  INITIAL_INTERNAL_USERS_V10,
  V10_USERS_STORAGE_KEY,
} from '../data/seatsData'
import { headerCellSeparatorSx } from '../constants/tableStyles'

// Seat types for V10 (PRD model)
const SEAT_TYPES_V10 = [
  { id: 'platform', label: 'Platform', description: 'Full platform access (Admin or Standard)' },
  { id: 'view-only', label: 'View-Only', description: 'Read-only app access, can add integrations' },
  { id: 'interactor', label: 'Interactor', description: 'No app access, integrations only' },
]

// Column configuration
const COLUMN_CONFIG = {
  name: { label: 'Name' },
  email: { label: 'Email' },
  seatType: { label: 'Seat Type' },
  integrations: { label: 'Integrations' },
  premiumContent: { label: 'Premium Content' },
  role: { label: 'Role' },
  groups: { label: 'Groups' },
  status: { label: 'Status' },
  lastActive: { label: 'Last Active' },
}

function SeatsPageV10() {
  const navigate = useNavigate()

  // ============ DATA STATE ============
  const [users, setUsers] = useState(() => {
    const stored = localStorage.getItem(V10_USERS_STORAGE_KEY)
    if (stored) {
      try {
        return JSON.parse(stored).users || INITIAL_USERS_V10
      } catch {
        return INITIAL_USERS_V10
      }
    }
    return INITIAL_USERS_V10
  })

  const [internalUsers, setInternalUsers] = useState(() => {
    const stored = localStorage.getItem(V10_USERS_STORAGE_KEY)
    if (stored) {
      try {
        return JSON.parse(stored).internalUsers || INITIAL_INTERNAL_USERS_V10
      } catch {
        return INITIAL_INTERNAL_USERS_V10
      }
    }
    return INITIAL_INTERNAL_USERS_V10
  })

  const [roles] = useState(INITIAL_ROLES)
  const [groups] = useState(INITIAL_GROUPS)

  // Persist users to localStorage
  useEffect(() => {
    localStorage.setItem(V10_USERS_STORAGE_KEY, JSON.stringify({ users, internalUsers }))
  }, [users, internalUsers])

  // ============ UI STATE ============
  const [isLoading, setIsLoading] = useState(true)
  const [tabValue, setTabValue] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

  // Column visibility
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    email: true,
    seatType: true,
    integrations: false,
    premiumContent: false,
    role: true,
    groups: true,
    status: true,
    lastActive: true,
  })

  // Dialog state
  const [bulkSeatDialogOpen, setBulkSeatDialogOpen] = useState(false)
  const [bulkRoleDialogOpen, setBulkRoleDialogOpen] = useState(false)
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false)
  const [adminSettingsDialogOpen, setAdminSettingsDialogOpen] = useState(false)
  const [visibilityDialogOpen, setVisibilityDialogOpen] = useState(false)
  const [visibilityDialogUser, setVisibilityDialogUser] = useState(null)

  // Groups popover
  const [groupsPopoverAnchor, setGroupsPopoverAnchor] = useState(null)
  const [groupsPopoverUser, setGroupsPopoverUser] = useState(null)

  // ============ CUSTOM HOOKS ============
  const {
    filters,
    anchors: filterAnchors,
    openFilter,
    closeFilter,
    toggleFilter,
    clearFilter,
  } = useTableFilters({ seatType: [], role: [], group: [] })

  const { sortBy, sortDirection, isSorting, handleSort } = useTableSort('name', 'asc')

  const { page, rowsPerPage, handlePageChange, handleRowsPerPageChange, resetPage } = usePagination()

  // ============ EFFECTS ============
  // Simulate initial data load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  // Reset page when filters change
  useEffect(() => {
    resetPage()
  }, [searchQuery, filters, tabValue, resetPage])

  // ============ COMPUTED VALUES ============
  const currentUsers = tabValue === 0 ? users : internalUsers

  const filteredUsers = useMemo(() => {
    let result = currentUsers

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (u) => u.name.toLowerCase().includes(query) || u.email.toLowerCase().includes(query)
      )
    }

    // Seat type filter
    if (filters.seatType?.length > 0) {
      result = result.filter((u) => filters.seatType.includes(u.seatType))
    }

    // Role filter
    if (filters.role?.length > 0) {
      result = result.filter((u) => filters.role.includes(u.role))
    }

    // Group filter
    if (filters.group?.length > 0) {
      result = result.filter((u) => u.groups?.some((gId) => filters.group.includes(gId)))
    }

    // Sort
    result = [...result].sort((a, b) => {
      let comparison = 0
      if (sortBy === 'groups') {
        comparison = (a.groups?.length || 0) - (b.groups?.length || 0)
      } else {
        comparison = String(a[sortBy] || '').localeCompare(String(b[sortBy] || ''))
      }
      return sortDirection === 'asc' ? comparison : -comparison
    })

    return result
  }, [currentUsers, searchQuery, filters, sortBy, sortDirection])

  const paginatedUsers = useMemo(() => {
    const startIndex = page * rowsPerPage
    return filteredUsers.slice(startIndex, startIndex + rowsPerPage)
  }, [filteredUsers, page, rowsPerPage])

  const selectedUserObjects = useMemo(() => {
    return currentUsers.filter((u) => selectedUsers.includes(u.id))
  }, [currentUsers, selectedUsers])

  // ============ SELECTION HANDLERS ============
  const allPageUsersSelected =
    paginatedUsers.length > 0 && paginatedUsers.every((u) => selectedUsers.includes(u.id))
  const somePageUsersSelected =
    paginatedUsers.some((u) => selectedUsers.includes(u.id)) && !allPageUsersSelected

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const pageUserIds = paginatedUsers.map((u) => u.id)
      setSelectedUsers((prev) => [...new Set([...prev, ...pageUserIds])])
    } else {
      const pageUserIds = paginatedUsers.map((u) => u.id)
      setSelectedUsers((prev) => prev.filter((id) => !pageUserIds.includes(id)))
    }
  }

  const handleSelectOne = (id) => {
    setSelectedUsers((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  // ============ BULK ACTION HANDLERS ============
  const handleBulkSeatChange = ({ seatType, platformSubType, integrationSeats }) => {
    const setterFn = tabValue === 0 ? setUsers : setInternalUsers
    setterFn((prev) =>
      prev.map((u) => {
        if (!selectedUsers.includes(u.id)) return u
        const updated = { ...u, seatType }
        if (seatType === 'platform') {
          updated.platformSubType = platformSubType
        } else {
          delete updated.platformSubType
        }
        if (integrationSeats.teams || integrationSeats.slack) {
          updated.integrationSeats = { ...integrationSeats }
        }
        return updated
      })
    )
    const label = SEAT_TYPES_V10.find((t) => t.id === seatType)?.label
    setSnackbar({ open: true, message: `${selectedUsers.length} users updated to ${label}` })
    setSelectedUsers([])
  }

  const handleBulkRoleChange = (roleId) => {
    const setterFn = tabValue === 0 ? setUsers : setInternalUsers
    const eligibleIds = selectedUserObjects.filter((u) => u.seatType === 'platform').map((u) => u.id)
    setterFn((prev) =>
      prev.map((u) => (eligibleIds.includes(u.id) ? { ...u, role: roleId } : u))
    )
    const roleLabel = roleId ? roles.find((r) => r.id === roleId)?.label : 'Custom'
    setSnackbar({
      open: true,
      message: `${eligibleIds.length} user${eligibleIds.length !== 1 ? 's' : ''} updated to ${roleLabel}`,
    })
    setSelectedUsers([])
  }

  const handleBulkDelete = () => {
    const setterFn = tabValue === 0 ? setUsers : setInternalUsers
    setterFn((prev) => prev.filter((u) => !selectedUsers.includes(u.id)))
    setSnackbar({ open: true, message: `${selectedUsers.length} users deleted` })
    setBulkDeleteDialogOpen(false)
    setSelectedUsers([])
  }

  const handleAdminSettingsSave = (maxAdminUsers) => {
    setSnackbar({
      open: true,
      message: maxAdminUsers ? `Max admin users set to ${maxAdminUsers}` : 'Admin limit removed',
    })
  }

  // ============ UTILITY HANDLERS ============
  const handleExport = (count) => {
    setSnackbar({ open: true, message: `Exported ${count} users` })
  }

  const handleCreateUser = () => {
    navigate('/seats-v10/users/new')
  }

  const toggleColumn = (column) => {
    setVisibleColumns((prev) => ({ ...prev, [column]: !prev[column] }))
  }

  // Get visible columns as array for separator logic
  const visibleColumnKeys = Object.entries(visibleColumns)
    .filter(([, visible]) => visible)
    .map(([key]) => key)

  // Calculate seat usage for admin settings
  const platformAdminCount = useMemo(() => {
    return users.filter((u) => u.seatType === 'platform' && u.platformSubType === 'admin').length
  }, [users])

  return (
    <PageShell>
      {/* ============ PAGE HEADER ============ */}
      <SeatsPageHeader
        onCreateUser={handleCreateUser}
        onOpenAdminSettings={() => setAdminSettingsDialogOpen(true)}
      />

      {/* ============ TABS ============ */}
      <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', px: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(e, v) => {
            setTabValue(v)
            setSelectedUsers([])
          }}
          sx={{
            '& .MuiTabs-indicator': { backgroundColor: 'primary.main', height: 3 },
          }}
        >
          <Tab
            label={isLoading ? 'Manage Users' : `Manage Users (${users.length})`}
            sx={{ textTransform: 'none', fontWeight: 500, minWidth: 'auto', px: 2 }}
          />
          <Tab
            label={isLoading ? 'Internal Only' : `Internal Only (${internalUsers.length})`}
            sx={{ textTransform: 'none', fontWeight: 500, minWidth: 'auto', px: 2 }}
          />
        </Tabs>
      </Box>

      {/* ============ MAIN CONTENT ============ */}
      <Box sx={{ p: 3, maxWidth: 1536, mx: 'auto' }}>
        {/* ---------- STAT CARDS ---------- */}
        {tabValue === 0 && <SeatsStatCards users={users} isLoading={isLoading} />}

        {/* ---------- TABLE SECTION ---------- */}
        <Paper variant="outlined" sx={{ overflow: 'hidden', backgroundColor: 'background.paper' }}>
          <SeatsTableToolbar
            isLoading={isLoading}
            totalCount={filteredUsers.length}
            isInternalTab={tabValue === 1}
            selectedUsers={selectedUsers}
            allFilteredCount={filteredUsers.length}
            onClearSelection={() => setSelectedUsers([])}
            onSelectAll={() => setSelectedUsers(filteredUsers.map((u) => u.id))}
            onBulkSeatChange={() => setBulkSeatDialogOpen(true)}
            onBulkRoleChange={() => setBulkRoleDialogOpen(true)}
            onBulkDelete={() => setBulkDeleteDialogOpen(true)}
            onExport={handleExport}
            filters={filters}
            filterAnchors={filterAnchors}
            onOpenFilter={openFilter}
            onCloseFilter={closeFilter}
            onToggleFilter={toggleFilter}
            onClearFilter={clearFilter}
            seatTypeOptions={SEAT_TYPES_V10.map((t) => ({ id: t.id, label: t.label }))}
            roleOptions={roles.map((r) => ({ id: r.id, label: r.label }))}
            groupOptions={groups.map((g) => ({ id: g.id, label: g.name }))}
            visibleColumns={visibleColumns}
            columnConfig={COLUMN_CONFIG}
            onToggleColumn={toggleColumn}
            sortBy={sortBy}
            onSort={handleSort}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <TableContainer sx={{ overflowX: 'auto' }}>
            <Table sx={{ tableLayout: 'auto' }}>
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: 'background.paper',
                    borderBottom: '2px solid',
                    borderColor: 'divider',
                  }}
                >
                  <TableCell padding="checkbox" sx={{ position: 'relative', ...headerCellSeparatorSx }}>
                    <Tooltip title="Select">
                      <Checkbox
                        indeterminate={somePageUsersSelected}
                        checked={allPageUsersSelected}
                        onChange={handleSelectAll}
                        size="small"
                      />
                    </Tooltip>
                  </TableCell>
                  {Object.entries(COLUMN_CONFIG).map(([key, config]) => {
                    if (!visibleColumns[key]) return null
                    const isLast = visibleColumnKeys.indexOf(key) === visibleColumnKeys.length - 1
                    return (
                      <TableCell
                        key={key}
                        sortDirection={sortBy === key ? sortDirection : false}
                        sx={isLast ? { fontWeight: 600 } : headerCellSeparatorSx}
                      >
                        <TableSortLabel
                          active={sortBy === key}
                          direction={sortBy === key ? sortDirection : 'asc'}
                          onClick={() => handleSort(key)}
                        >
                          {config.label}
                        </TableSortLabel>
                      </TableCell>
                    )
                  })}
                  <TableCell sx={{ width: 120 }} />
                </TableRow>
                {isSorting && (
                  <TableRow sx={{ height: 4, p: 0 }}>
                    <TableCell colSpan={visibleColumnKeys.length + 2} sx={{ p: 0, border: 0 }}>
                      <LinearProgress
                        sx={{
                          height: 3,
                          backgroundColor: 'transparent',
                          '& .MuiLinearProgress-bar': { backgroundColor: 'primary.main' },
                        }}
                      />
                    </TableCell>
                  </TableRow>
                )}
              </TableHead>
              <TableBody>
                {isLoading
                  ? [...Array(rowsPerPage)].map((_, index) => (
                      <SeatsTableRowSkeleton key={`skeleton-${index}`} visibleColumns={visibleColumns} />
                    ))
                  : paginatedUsers.map((user) => (
                      <SeatsTableRow
                        key={user.id}
                        user={user}
                        isSelected={selectedUsers.includes(user.id)}
                        onSelect={handleSelectOne}
                        visibleColumns={visibleColumns}
                        groups={groups}
                        roles={roles}
                        onGroupsClick={(e, u) => {
                          setGroupsPopoverAnchor(e.currentTarget)
                          setGroupsPopoverUser(u)
                        }}
                        onSetVisibility={(u) => {
                          setVisibilityDialogUser(u)
                          setVisibilityDialogOpen(true)
                        }}
                      />
                    ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          {!isLoading && filteredUsers.length > 0 && (
            <TablePagination
              component="div"
              count={filteredUsers.length}
              page={page}
              onPageChange={handlePageChange}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
              rowsPerPageOptions={[10, 25, 50, 100]}
              sx={{ borderTop: '1px solid', borderColor: 'divider' }}
            />
          )}

          {/* Empty State */}
          {!isLoading && filteredUsers.length === 0 && (
            <Box sx={{ py: 8, textAlign: 'center' }}>
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  backgroundColor: 'grey.100',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                }}
              >
                <GroupOutlinedIcon sx={{ fontSize: 56, color: 'grey.400' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {tabValue === 1 ? 'No Internal-Only Users' : 'No Users to Manage Yet'}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 3, maxWidth: 350, mx: 'auto' }}
              >
                {tabValue === 1
                  ? 'Start by creating an internal-only user with preferred permissions'
                  : 'Start by creating a user with preferred permissions'}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateUser}
                sx={{ textTransform: 'none', fontWeight: 500 }}
              >
                {tabValue === 1 ? 'Create New Internal-Only User' : 'Create New User'}
              </Button>
            </Box>
          )}
        </Paper>
      </Box>

      {/* ============ DIALOGS ============ */}
      <BulkSeatChangeDialog
        open={bulkSeatDialogOpen}
        onClose={() => setBulkSeatDialogOpen(false)}
        onApply={handleBulkSeatChange}
        selectedCount={selectedUsers.length}
        selectedUsers={selectedUserObjects}
      />

      <BulkRoleChangeDialog
        open={bulkRoleDialogOpen}
        onClose={() => setBulkRoleDialogOpen(false)}
        onApply={handleBulkRoleChange}
        selectedCount={selectedUsers.length}
        selectedUsers={selectedUserObjects}
        roles={roles}
      />

      <BulkDeleteConfirmDialog
        open={bulkDeleteDialogOpen}
        onClose={() => setBulkDeleteDialogOpen(false)}
        onConfirm={handleBulkDelete}
        selectedCount={selectedUsers.length}
      />

      <AdminSettingsDialog
        open={adminSettingsDialogOpen}
        onClose={() => setAdminSettingsDialogOpen(false)}
        onSave={handleAdminSettingsSave}
        currentAdminCount={platformAdminCount}
      />

      <SetVisibilityDialog
        open={visibilityDialogOpen}
        onClose={() => {
          setVisibilityDialogOpen(false)
          setVisibilityDialogUser(null)
        }}
        onSave={() => {
          setSnackbar({ open: true, message: 'Visibility settings saved' })
        }}
        user={visibilityDialogUser}
      />

      {/* ============ POPOVERS ============ */}
      <Popover
        open={Boolean(groupsPopoverAnchor)}
        anchorEl={groupsPopoverAnchor}
        onClose={() => {
          setGroupsPopoverAnchor(null)
          setGroupsPopoverUser(null)
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{ sx: { p: 2, maxWidth: 320 } }}
      >
        {groupsPopoverUser && (
          <Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1.5 }}>
              {groupsPopoverUser.groups?.map((gId) => {
                const group = groups.find((g) => g.id === gId)
                return group ? (
                  <ThemedChip key={gId} icon={<GroupsOutlinedIcon />} label={group.name} size="small" />
                ) : null
              })}
            </Box>
            <Typography variant="body2" fontWeight={500}>
              {groupsPopoverUser.name}&apos;s Groups
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {groupsPopoverUser.groups?.length || 0}/{groups.length} Assigned
            </Typography>
          </Box>
        )}
      </Popover>

      {/* ============ FEEDBACK ============ */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </PageShell>
  )
}

export default SeatsPageV10

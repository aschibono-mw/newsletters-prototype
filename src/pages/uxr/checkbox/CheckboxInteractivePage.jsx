import { useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Divider,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/CloseRounded'
import TableContext from './components/TableContext'
import ModalContext from './components/ModalContext'

export default function CheckboxInteractivePage() {
  const [context, setContext] = useState('table')
  const [behavior, setBehavior] = useState('select-all')
  const [modalOpen, setModalOpen] = useState(false)

  const behaviorCards = [
    { id: 'select-all', name: 'Select All' },
    { id: 'deselect-all', name: 'Deselect All' },
    { id: 'dropdown', name: 'Dropdown' },
  ]

  const handleContextChange = (e, v) => {
    if (!v) return
    setContext(v)
    if (v === 'modal') {
      setModalOpen(true)
    }
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setContext('table')
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ backgroundColor: 'grey.100', minHeight: 'calc(100vh - 200px)', px: 3, py: 4 }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          {/* Page Header */}
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
            Interactive Demo
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
            Select a context and behavior to test checkbox interactions
          </Typography>

          {/* Controls */}
          <Box sx={{ display: 'flex', gap: 4, mb: 6, alignItems: 'flex-start' }}>
            {/* Context */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Context
              </Typography>
              <ToggleButtonGroup
                value={context}
                exclusive
                onChange={handleContextChange}
                size="small"
              >
                <ToggleButton value="table" sx={{ textTransform: 'none' }}>Table</ToggleButton>
                <ToggleButton value="modal" sx={{ textTransform: 'none' }}>Modal</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {/* Behavior */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Behavior
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {behaviorCards.map((item) => (
                  <Card
                    key={item.id}
                    onClick={() => setBehavior(item.id)}
                    sx={{
                      minWidth: 100,
                      backgroundColor: behavior === item.id ? 'primary.light' : 'background.paper',
                      border: '1px solid',
                      borderColor: behavior === item.id ? 'primary.main' : 'divider',
                      boxShadow: 'none',
                      cursor: 'pointer',
                      '&:hover': { borderColor: 'primary.main' },
                    }}
                  >
                    <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 }, textAlign: 'center' }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, whiteSpace: 'nowrap' }}>
                        {item.name}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          </Box>

          {/* Table (always visible) */}
          <TableContext key={`table-${behavior}`} behavior={behavior} />
        </Box>
      </Box>

      {/* Modal Dialog */}
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
          Select Files
          <IconButton onClick={handleCloseModal} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ p: 0 }}>
          <ModalContext key={`modal-${behavior}`} behavior={behavior} />
        </DialogContent>
        <Divider />
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleCloseModal} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleCloseModal} variant="contained" color="primary">
            Confirm Selection
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

import { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import Sidebar from './components/Sidebar'
import CardVariantsShowcase from './components/CardVariantsShowcase'
import EmptyState from './components/EmptyState'
import { TEST_FLOWS } from './data/testFlows'

function StudioInfluencerTestPageV2() {
  const [selectedFlow, setSelectedFlow] = useState(null)
  const [showCards, setShowCards] = useState(false)
  const [newMessage, setNewMessage] = useState('')

  const handleFlowSelect = (flow) => {
    setSelectedFlow(flow)
    setShowCards(false)
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Top Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          px: 3,
          py: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Journalist/Influencer Search Tests
        </Typography>
        <Chip
          label="AC Flows"
          size="small"
          sx={{ backgroundColor: 'primary.lighter', color: 'primary.main' }}
        />
        <Chip
          label="V2"
          size="small"
          variant="outlined"
          sx={{ borderColor: 'primary.main', color: 'primary.main' }}
        />
        <Box sx={{ flex: 1 }} />
        <Button
          variant={showCards ? 'contained' : 'outlined'}
          size="small"
          onClick={() => {
            setShowCards(!showCards)
            setSelectedFlow(null)
          }}
          sx={{ textTransform: 'none' }}
        >
          Component Overview
        </Button>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Sidebar - Flow Selector with Collapsible Categories */}
        <Sidebar
          testFlows={TEST_FLOWS}
          selectedFlow={selectedFlow}
          onFlowSelect={handleFlowSelect}
        />

        {/* Main Panel */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {showCards ? (
            <Box sx={{ flex: 1, overflow: 'auto', p: 4 }}>
              <CardVariantsShowcase />
            </Box>
          ) : selectedFlow ? (
            <>
              {/* Flow Header */}
              <Box sx={{ px: 4, py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {selectedFlow.category}: {selectedFlow.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedFlow.description}
                </Typography>
              </Box>

              {/* Chat Thread */}
              <Box sx={{ flex: 1, overflow: 'auto', p: 4 }}>
                <Box sx={{ maxWidth: 800, mx: 'auto' }}>
                  {selectedFlow.render()}
                </Box>
              </Box>

              {/* Input Bar */}
              <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider', backgroundColor: 'background.default' }}>
                <Box sx={{ maxWidth: 800, mx: 'auto' }}>
                  <TextField
                    fullWidth
                    placeholder="Type a follow-up question..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton disabled={!newMessage.trim()} color="primary">
                            <SendIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 50,
                        backgroundColor: 'background.paper',
                        pl: 3,
                      },
                    }}
                  />
                </Box>
              </Box>
            </>
          ) : (
            <EmptyState />
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default StudioInfluencerTestPageV2

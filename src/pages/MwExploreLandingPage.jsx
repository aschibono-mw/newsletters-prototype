import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Checkbox,
  IconButton,
  Chip,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CodeIcon from '@mui/icons-material/Code'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import AddIcon from '@mui/icons-material/Add'
import TuneIcon from '@mui/icons-material/Tune'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

const ACTION_CARDS = [
  {
    icon: <SearchIcon sx={{ fontSize: 20, color: '#00827F' }} />,
    iconBg: 'rgba(0,130,127,0.1)',
    label: 'Keyword search',
    description: 'Use keywords to get results quickly and easily',
  },
  {
    icon: <CodeIcon sx={{ fontSize: 20, color: '#00827F' }} />,
    iconBg: 'rgba(0,130,127,0.1)',
    label: 'Advanced search',
    description: 'Use Boolean queries for powerful and precise searches',
  },
  {
    icon: <AutoAwesomeIcon sx={{ fontSize: 20, color: '#B627A1' }} />,
    iconBg: 'rgba(182,39,161,0.1)',
    label: 'AI Search Assistant',
    description: 'Create and refine searches using AI',
  },
]

const TABLE_ROWS = [
  {
    name: 'Yelp Brand Search',
    usedIn: '6 places',
    type: 'Advanced',
    createdBy: 'Antonio Schibono',
    lastEdited: 'Jul 30, 2025 • 7:24 PM',
    isLink: true,
  },
  {
    name: 'Yelp Negative Experiences',
    usedIn: '3 places',
    type: 'Advanced',
    createdBy: 'Antonio Schibono',
    lastEdited: 'Aug 5, 2025 • 7:46 PM',
    isLink: false,
  },
]

export default function MwExploreLandingPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'background.paper' }}>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #f3ecff 0%, #e8f4fd 100%)',
          py: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: '18px' }}>
          Create searches with AI Search Assistant
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: 520,
            height: 44,
            bgcolor: '#fff',
            borderRadius: '24px',
            border: '1px solid #e0e0e0',
            px: 2,
            gap: 1,
          }}
        >
          <Typography sx={{ flex: 1, fontSize: '14px', color: 'text.disabled' }}>
            Send message to AI Search Assistant
          </Typography>
          <IconButton size="small" sx={{ color: 'text.secondary', p: 0.5 }}>
            <ArrowForwardIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Action Cards */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 0,
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        {ACTION_CARDS.map((card, idx) => (
          <Box
            key={card.label}
            onClick={() => navigate('/mw-explore/results')}
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              bgcolor: 'background.paper',
              borderRight: idx < ACTION_CARDS.length - 1 ? '1px solid' : 'none',
              borderColor: 'divider',
              px: 2.5,
              py: 2,
              cursor: 'pointer',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' },
            }}
          >
            <Box
              sx={{
                bgcolor: card.iconBg,
                borderRadius: '50%',
                p: 0.75,
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {card.icon}
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: '14px', mb: 0.25 }}>
                {card.label}
              </Typography>
              <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>
                {card.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Tab Bar */}
      <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', px: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: '14px',
              minHeight: 44,
            },
            '& .MuiTabs-indicator': { backgroundColor: '#00827F' },
            '& .Mui-selected': { color: '#00827F !important' },
          }}
        >
          {['Searches', 'Comparisons', 'Custom categories', 'Author lists', 'Filter sets'].map((tab) => (
            <Tab key={tab} label={tab} />
          ))}
        </Tabs>
      </Box>

      {/* Two-Panel Body */}
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden', minHeight: 0, borderTop: '1px solid', borderColor: 'divider' }}>

        {/* Left Sidebar */}
        <Box
          sx={{
            width: 260,
            borderRight: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            pt: 1,
            flexShrink: 0,
            overflow: 'auto',
          }}
        >
          {/* All row */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderLeft: '3px solid #00827F',
              bgcolor: 'rgba(0,130,127,0.06)',
              pl: 1.5,
              pr: 2,
              py: 1,
              cursor: 'pointer',
            }}
          >
            <Typography sx={{ fontSize: '14px', fontWeight: 500 }}>All</Typography>
            <Box
              sx={{
                bgcolor: 'rgba(0,0,0,0.08)',
                borderRadius: '10px',
                px: 1,
                py: 0.125,
                fontSize: '12px',
                color: 'text.secondary',
                lineHeight: 1.6,
              }}
            >
              2
            </Box>
          </Box>

          {/* Labels section */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              pt: 2,
              pb: 0.5,
            }}
          >
            <Typography
              sx={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'text.disabled',
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
              }}
            >
              Labels
            </Typography>
            <Typography
              component="span"
              sx={{
                color: '#00827F',
                fontSize: '13px',
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Manage
            </Typography>
          </Box>
        </Box>

        {/* Right Content */}
        <Box sx={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>

          {/* Toolbar */}
          <Box
            sx={{
              px: 2,
              py: 1,
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 0.5,
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <AddIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <SearchIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <TuneIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Table */}
          <Box sx={{ flex: 1 }}>
            {/* Header Row */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: 'rgba(0,0,0,0.02)',
                borderBottom: '1px solid',
                borderTop: '1px solid',
                borderColor: 'divider',
                px: 1,
              }}
            >
              <Box sx={{ width: 32, flexShrink: 0 }}>
                <Checkbox size="small" />
              </Box>
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.25,
                  py: 1,
                }}
              >
                <Typography sx={{ fontSize: '12px', fontWeight: 700, color: 'text.secondary' }}>
                  Name
                </Typography>
                <KeyboardArrowUpIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
              </Box>
              <Box sx={{ width: 120, py: 1, pr: 1 }}>
                <Typography sx={{ fontSize: '12px', fontWeight: 700, color: 'text.secondary' }}>
                  Used in
                </Typography>
              </Box>
              <Box sx={{ width: 100, py: 1, pr: 1 }}>
                <Typography sx={{ fontSize: '12px', fontWeight: 700, color: 'text.secondary' }}>
                  Type
                </Typography>
              </Box>
              <Box sx={{ width: 160, py: 1, pr: 1 }}>
                <Typography sx={{ fontSize: '12px', fontWeight: 700, color: 'text.secondary' }}>
                  Created by
                </Typography>
              </Box>
              <Box sx={{ width: 200, py: 1, pr: 2 }}>
                <Typography sx={{ fontSize: '12px', fontWeight: 700, color: 'text.secondary' }}>
                  Last edited
                </Typography>
              </Box>
            </Box>

            {/* Data Rows */}
            {TABLE_ROWS.map((row) => (
              <Box
                key={row.name}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  borderBottom: '1px solid',
                  borderColor: 'rgba(0,0,0,0.06)',
                  px: 1,
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.015)' },
                }}
              >
                <Box sx={{ width: 32, flexShrink: 0 }}>
                  <Checkbox size="small" />
                </Box>
                <Box sx={{ flex: 1, py: 1.25 }}>
                  <Typography
                    sx={{
                      fontSize: '13px',
                      fontWeight: 500,
                      color: row.isLink ? '#00827F' : 'text.primary',
                      cursor: row.isLink ? 'pointer' : 'default',
                      '&:hover': row.isLink ? { textDecoration: 'underline' } : {},
                    }}
                    onClick={() => row.isLink && navigate('/mw-explore/results')}
                  >
                    {row.name}
                  </Typography>
                </Box>
                <Box sx={{ width: 120, py: 1.25, pr: 1 }}>
                  <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>
                    {row.usedIn}
                  </Typography>
                </Box>
                <Box sx={{ width: 100, py: 1.25, pr: 1 }}>
                  <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>
                    {row.type}
                  </Typography>
                </Box>
                <Box sx={{ width: 160, py: 1.25, pr: 1 }}>
                  <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>
                    {row.createdBy}
                  </Typography>
                </Box>
                <Box sx={{ width: 200, py: 1.25, pr: 2 }}>
                  <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>
                    {row.lastEdited}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Pagination Footer */}
          <Box
            sx={{
              borderTop: '1px solid',
              borderColor: 'divider',
              px: 3,
              py: 1.25,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
            }}
          >
            {/* Page selector */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '4px',
                px: 1.5,
                py: 0.5,
                cursor: 'pointer',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' },
              }}
            >
              <Typography sx={{ fontSize: '13px' }}>Page: 1</Typography>
              <ArrowDropDownIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            </Box>

            {/* Right pagination controls */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>1–2 of 2</Typography>
              <IconButton size="small" disabled>
                <ChevronLeftIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" disabled>
                <ChevronRightIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

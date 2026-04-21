import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  IconButton,
  Divider,
  MenuItem,
  Select,
  FormControl,
  Tooltip,
  Collapse,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import Indicator from '../components/core/Indicator'

// Mock history data
const mockHistoryData = [
  {
    id: 1,
    title: 'Q4 Marketing Campaign Analysis',
    project: 'Project Alpha',
    date: 'Nov 18',
    section: 'recent',
    isScheduled: true,
    messages: [
      { id: 1, text: 'Analyzed social media performance across channels', timestamp: 'Nov 18 2025 09:41:00', status: 'complete' },
      { id: 2, text: 'Engagement metrics summary', timestamp: 'Nov 18 2025 09:42:15', status: 'complete' },
      { id: 3, text: 'Recommendations for Q1 strategy', timestamp: 'Nov 18 2025 09:45:30', status: 'complete' },
      { id: 4, text: 'Budget allocation suggestions', timestamp: 'Nov 18 2025 09:48:45', status: 'complete' },
    ],
  },
  {
    id: 2,
    title: 'Weekly Status Update',
    project: null,
    date: 'Nov 17',
    section: 'recent',
    isScheduled: false,
    messages: [
      { id: 1, text: 'Team progress summary', timestamp: 'Nov 17 2025 15:22:00', status: 'complete' },
    ],
  },
  {
    id: 3,
    title: 'Data Export Request',
    project: 'Project Beta',
    date: 'Nov 15',
    section: 'recent',
    isScheduled: false,
    messages: [
      { id: 1, text: 'Exported user analytics for October', timestamp: 'Nov 15 2025 11:05:00', status: 'complete' },
      { id: 2, text: 'Generated CSV report', timestamp: 'Nov 15 2025 11:06:30', status: 'complete' },
    ],
  },
  {
    id: 4,
    title: 'Quick Question',
    project: null,
    date: 'Nov 14',
    section: 'recent',
    isScheduled: false,
    messages: [
      { id: 1, text: 'How do I reset my dashboard filters?', timestamp: 'Nov 14 2025 16:30:00', status: 'complete' },
      { id: 2, text: 'Filter reset instructions provided', timestamp: 'Nov 14 2025 16:31:20', status: 'complete' },
    ],
  },
  {
    id: 5,
    title: 'Competitor Research Deep Dive',
    project: 'Project Alpha',
    date: 'Nov 13',
    section: 'older',
    isScheduled: true,
    messages: [
      { id: 1, text: 'Identified top 5 competitors in market', timestamp: 'Nov 13 2025 10:38:00', status: 'complete' },
      { id: 2, text: 'Pricing comparison matrix', timestamp: 'Nov 13 2025 10:42:00', status: 'complete' },
      { id: 3, text: 'Feature gap analysis', timestamp: 'Nov 13 2025 10:50:00', status: 'complete' },
      { id: 4, text: 'Market positioning recommendations', timestamp: 'Nov 13 2025 10:55:00', status: 'complete' },
      { id: 5, text: 'Executive summary generated', timestamp: 'Nov 13 2025 11:02:00', status: 'complete' },
    ],
  },
  {
    id: 6,
    title: 'Meeting Notes Summary',
    project: null,
    date: 'Nov 11',
    section: 'older',
    isScheduled: false,
    messages: [
      { id: 1, text: 'Summarized key action items from standup', timestamp: 'Nov 11 2025 14:13:00', status: 'complete' },
    ],
  },
  {
    id: 7,
    title: 'User Feedback Analysis',
    project: 'Project Gamma',
    date: 'Nov 11',
    section: 'older',
    isScheduled: true,
    messages: [
      { id: 1, text: 'Categorized 200+ user feedback entries', timestamp: 'Nov 11 2025 14:12:00', status: 'complete' },
      { id: 2, text: 'Sentiment analysis results', timestamp: 'Nov 11 2025 14:15:00', status: 'complete' },
      { id: 3, text: 'Top feature requests identified', timestamp: 'Nov 11 2025 14:18:00', status: 'complete' },
    ],
  },
  {
    id: 8,
    title: 'API Integration Help',
    project: null,
    date: 'Nov 10',
    section: 'older',
    isScheduled: false,
    messages: [
      { id: 1, text: 'Troubleshooted authentication error', timestamp: 'Nov 10 2025 09:15:00', status: 'complete' },
      { id: 2, text: 'Provided code snippet for OAuth flow', timestamp: 'Nov 10 2025 09:18:00', status: 'complete' },
    ],
  },
  {
    id: 9,
    title: 'Content Calendar Planning',
    project: 'Project Beta',
    date: 'Nov 8',
    section: 'older',
    isScheduled: false,
    messages: [
      { id: 1, text: 'Created Q1 content schedule', timestamp: 'Nov 8 2025 13:34:00', status: 'complete' },
    ],
  },
]

// ============================================
// HISTORY ITEM COMPONENT
// ============================================

function HistoryItem({ item, isExpanded, onToggle }) {
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredMessageId, setHoveredMessageId] = useState(null)

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        borderRadius: 2,
        border: '1px solid',
        borderColor: isHovered || isExpanded ? 'primary.main' : 'divider',
        overflow: 'hidden',
      }}
    >
      {/* Header Row */}
      <Box
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          height: 52,
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        }}
      >
        {/* Chevron */}
        <ChevronRightIcon
          sx={{
            fontSize: 20,
            color: 'text.secondary',
            transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            mr: 1.5,
          }}
        />

        {/* Title */}
        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
            color: 'text.primary',
            minWidth: 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            mr: 1,
          }}
        >
          {item.title}
        </Typography>

        {/* Scheduled Badge */}
        {item.isScheduled && (
          <Tooltip title="This prompt runs on a schedule" placement="right" enterDelay={400}>
            <span>
              <Indicator label="Scheduled" size="small" color="blue" />
            </span>
          </Tooltip>
        )}

        {/* Spacer */}
        <Box sx={{ flex: 1 }} />

        {/* Action Icons - show on hover */}
        {isHovered && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Tooltip title="Open">
              <IconButton size="small" sx={{ color: 'text.secondary' }}>
                <OpenInNewIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton size="small" sx={{ color: 'text.secondary' }}>
                <EditOutlinedIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton size="small" sx={{ color: 'text.secondary' }}>
                <DeleteOutlineIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
          </Box>
        )}

        {/* Project & Date - hide when actions are visible */}
        {!isHovered && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            {item.project && (
              <>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {item.project}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                  ·
                </Typography>
              </>
            )}
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.date}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Expanded Content */}
      <Collapse in={isExpanded}>
        <Box
          sx={{
            borderTop: '1px solid',
            borderColor: 'divider',
            px: 2,
            py: 2,
          }}
        >
          {/* Messages Label */}
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              color: 'text.secondary',
              fontWeight: 500,
              mb: 1.5,
              pl: 4,
            }}
          >
            Messages
          </Typography>

          {/* Message List */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {item.messages.map((message) => (
              <Box
                key={message.id}
                onMouseEnter={() => setHoveredMessageId(message.id)}
                onMouseLeave={() => setHoveredMessageId(null)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  px: 2,
                  py: 1.5,
                  borderRadius: 1,
                  cursor: 'pointer',
                  backgroundColor: hoveredMessageId === message.id ? 'action.hover' : 'transparent',
                }}
              >
                {/* Status Dot */}
                <FiberManualRecordIcon
                  sx={{
                    fontSize: 10,
                    color: '#4CAF50',
                    mr: 2,
                  }}
                />

                {/* Message Text */}
                <Typography
                  variant="body2"
                  sx={{
                    flex: 1,
                    color: 'text.primary',
                  }}
                >
                  {message.text}
                </Typography>

                {/* Timestamp - show on hover */}
                {hoveredMessageId === message.id && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      whiteSpace: 'nowrap',
                      ml: 2,
                    }}
                  >
                    {message.timestamp}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Collapse>
    </Box>
  )
}

// ============================================
// MAIN PAGE
// ============================================

function ViewAllHistoryPage() {
  const navigate = useNavigate()
  const [selectedProject, setSelectedProject] = useState('All Projects')
  const [expandedId, setExpandedId] = useState(null)

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value)
  }

  // Filter by project
  const filteredData = selectedProject === 'All Projects'
    ? mockHistoryData
    : selectedProject === 'No Project'
      ? mockHistoryData.filter((item) => !item.project)
      : mockHistoryData.filter((item) => item.project === selectedProject)

  const recentHistory = filteredData.filter((item) => item.section === 'recent')
  const olderHistory = filteredData.filter((item) => item.section === 'older')

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        pb: 4,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          py: 1.5,
          borderBottom: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper',
        }}
      >
        {/* Back Button */}
        <Tooltip title="Back to Studio">
          <IconButton size="small" onClick={() => navigate(-1)} sx={{ color: 'text.secondary', p: 0.5 }}>
            <ArrowBackIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>
        <Divider orientation="vertical" flexItem sx={{ mx: 1.5 }} />

        {/* Flexible Spacer */}
        <Box sx={{ flex: 1 }} />

        {/* Project Filter */}
        <FormControl size="small">
          <Select
            value={selectedProject}
            onChange={handleProjectChange}
            variant="standard"
            disableUnderline
            startAdornment={<FilterAltOutlinedIcon sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />}
            MenuProps={{
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'right',
              },
            }}
            sx={{
              fontWeight: 700,
              '& .MuiSelect-select': {
                paddingBottom: 0,
              },
              '& .MuiSelect-icon': {
                color: 'text.secondary',
                fontSize: '18px',
              },
            }}
          >
            <MenuItem value="All Projects">All Projects</MenuItem>
            <MenuItem value="Project Alpha">Project Alpha</MenuItem>
            <MenuItem value="Project Beta">Project Beta</MenuItem>
            <MenuItem value="Project Gamma">Project Gamma</MenuItem>
            <MenuItem value="No Project">No Project</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Content */}
      <Box sx={{ maxWidth: 900, mx: 'auto', px: 3, py: 4 }}>
        {/* Recent Section */}
        {recentHistory.length > 0 && (
          <Box sx={{ mb: 5 }}>
            <Typography
              variant="overline"
              sx={{
                display: 'block',
                mb: 2,
                color: 'text.secondary',
                fontWeight: 600,
                letterSpacing: 1.2,
              }}
            >
              RECENT
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {recentHistory.map((item) => (
                <HistoryItem
                  key={item.id}
                  item={item}
                  isExpanded={expandedId === item.id}
                  onToggle={() => handleToggle(item.id)}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Older Section */}
        {olderHistory.length > 0 && (
          <Box>
            <Typography
              variant="overline"
              sx={{
                display: 'block',
                mb: 2,
                color: 'text.secondary',
                fontWeight: 600,
                letterSpacing: 1.2,
              }}
            >
              OLDER
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {olderHistory.map((item) => (
                <HistoryItem
                  key={item.id}
                  item={item}
                  isExpanded={expandedId === item.id}
                  onToggle={() => handleToggle(item.id)}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* No more conversations message */}
        <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            mt: 4,
          }}
        >
          No more conversations to load
        </Typography>
      </Box>
    </Box>
  )
}

export default ViewAllHistoryPage

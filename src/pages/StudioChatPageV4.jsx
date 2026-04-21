import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Box,
  Typography,
  IconButton,
  LinearProgress,
  Chip,
  Avatar,
  TextField,
  InputAdornment,
  Collapse,
  ToggleButton as MuiToggleButton,
  ToggleButtonGroup as MuiToggleButtonGroup,
  Paper,
  Divider,
  Tooltip,
  Tabs,
  Tab,
  Link,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import StopIcon from '@mui/icons-material/Stop'
import SendIcon from '@mui/icons-material/Send'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ViewStreamIcon from '@mui/icons-material/ViewStream'
import DashboardIcon from '@mui/icons-material/Dashboard'
import DescriptionIcon from '@mui/icons-material/Description'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DownloadIcon from '@mui/icons-material/Download'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined'
import ApiOutlinedIcon from '@mui/icons-material/ApiOutlined'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import { MiraSourceCard, MiraThinkingState } from '../components/mira'
// Fake Lexical toolbar icons
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS'
import CodeOffIcon from '@mui/icons-material/Code'
import LinkIcon from '@mui/icons-material/Link'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined'
import UndoIcon from '@mui/icons-material/Undo'
import RedoIcon from '@mui/icons-material/Redo'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

// Themed Toggle Button (matches DS collection)
const ThemedToggleButton = styled(MuiToggleButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.grey[300]}`,
  backgroundColor: theme.palette.background.paper,
  fontSize: '0.8rem',
  fontWeight: 400,
  textTransform: 'none',
  padding: '4px 12px',

  '&.Mui-selected': {
    backgroundColor: 'rgba(29, 159, 159, 0.12)',
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.primary.main}`,

    '&:hover': {
      backgroundColor: 'rgba(29, 159, 159, 0.16)',
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },

  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },

  '&.Mui-disabled': {
    opacity: 0.38,
    border: `1px solid ${theme.palette.grey[300]}`,
  },
}))

const ThemedToggleButtonGroup = styled(MuiToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButton-root': {
    '&:not(:first-of-type)': {
      marginLeft: '-1px',
      borderLeft: `1px solid ${theme.palette.grey[300]}`,
    },
  },
}))

// Simulated tool calls and thinking messages
const SIMULATED_ACTIVITY = [
  { type: 'thinking', text: 'Understanding your query...', delay: 300 },
  { type: 'reading', source: 'internal-docs', text: 'Searching project context', delay: 800 },
  { type: 'insight', text: 'Found relevant project data', delay: 400 },
  { type: 'reading', source: 'knowledge-base', text: 'Reading knowledge base', delay: 1000 },
  { type: 'thinking', text: "Analyzing the available information...", delay: 600 },
  { type: 'reading', source: 'api-docs', text: 'Checking API documentation', delay: 900 },
  { type: 'canvas', text: 'Generating document...', delay: 500 },
  { type: 'thinking', text: "Cross-referencing sources...", delay: 700 },
  { type: 'reading', source: 'best-practices', text: 'Reviewing best practices', delay: 800 },
  { type: 'thinking', text: 'Synthesizing findings...', delay: 500 },
  { type: 'complete', text: 'Analysis complete', delay: 300 },
]

// Progress stub states
const PROGRESS_STATES = [
  { label: 'Analyzing query', sources: 0 },
  { label: 'Searching project context', sources: 1 },
  { label: 'Reading knowledge base', sources: 3 },
  { label: 'Checking API documentation', sources: 5 },
  { label: 'Reviewing best practices', sources: 8 },
  { label: 'Synthesizing response', sources: 10 },
]

// Simulated sources data
const SOURCES_DATA = [
  {
    id: 1,
    title: 'Project Usage Analytics Dashboard',
    type: 'internal-docs',
    icon: ArticleOutlinedIcon,
    snippet: 'The usage analytics dashboard provides real-time metrics including API call volume, response times, and error rates...',
    url: '/docs/analytics-dashboard',
    relevance: 'high',
  },
  {
    id: 2,
    title: 'API Performance Best Practices',
    type: 'knowledge-base',
    icon: SchoolOutlinedIcon,
    snippet: 'Peak usage optimization strategies include implementing caching layers, load balancing, and rate limiting...',
    url: '/kb/api-performance',
    relevance: 'high',
  },
  {
    id: 3,
    title: 'Monthly Usage Reports - Q4 2024',
    type: 'internal-docs',
    icon: StorageOutlinedIcon,
    snippet: 'Q4 showed a 23% increase in API calls compared to Q3, with primary growth in data retrieval endpoints...',
    url: '/reports/q4-2024',
    relevance: 'high',
  },
  {
    id: 4,
    title: 'REST API Documentation v2.1',
    type: 'api-docs',
    icon: ApiOutlinedIcon,
    snippet: 'Endpoint reference for /api/v1/users, /api/v1/analytics, and /api/v1/reports including rate limits...',
    url: '/api/docs/v2.1',
    relevance: 'medium',
  },
  {
    id: 5,
    title: 'Infrastructure Scaling Guidelines',
    type: 'best-practices',
    icon: SchoolOutlinedIcon,
    snippet: 'Auto-scaling policies should be configured to handle 2x baseline traffic during peak hours...',
    url: '/kb/scaling-guidelines',
    relevance: 'medium',
  },
]

function InlineActivityMessage({ item, isLatest }) {
  const getIcon = () => {
    switch (item.type) {
      case 'reading':
        return <MenuBookOutlinedIcon sx={{ fontSize: 14, color: 'primary.main' }} />
      case 'thinking':
        return <PsychologyOutlinedIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
      case 'insight':
        return <CheckCircleOutlineIcon sx={{ fontSize: 14, color: 'success.main' }} />
      case 'complete':
        return <CheckCircleOutlineIcon sx={{ fontSize: 14, color: 'success.main' }} />
      case 'canvas':
        return <DescriptionIcon sx={{ fontSize: 14, color: 'primary.main' }} />
      default:
        return <AutoAwesomeOutlinedIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        py: 0.5,
        px: 1,
        borderRadius: 1,
        backgroundColor: isLatest ? 'rgba(8, 145, 178, 0.04)' : 'transparent',
        opacity: isLatest ? 1 : 0.6,
        fontSize: '0.8rem',
      }}
    >
      {getIcon()}
      <Typography variant="caption" sx={{ color: item.type === 'reading' || item.type === 'canvas' ? 'primary.main' : 'text.secondary' }}>
        {item.text}
      </Typography>
      {item.type === 'reading' && (
        <Chip
          label={item.source}
          size="small"
          sx={{
            height: 18,
            fontSize: '0.65rem',
            backgroundColor: 'grey.100',
            '& .MuiChip-label': { px: 1 },
          }}
        />
      )}
    </Box>
  )
}

// ThinkingDots is now provided by MiraThinkingState component
function ThinkingDots() {
  return <MiraThinkingState sx={{ ml: 1 }} />
}

function InlineProgressStub({ currentState, isComplete, activityMessages, isProcessing, onStop, expanded, onToggleExpand, onSourcesClick, sourceCount }) {
  const progress = isComplete ? 100 : ((currentState + 1) / PROGRESS_STATES.length) * 100
  const latestMessage = activityMessages[activityMessages.length - 1]
  const visibleMessages = expanded ? activityMessages.slice(-6) : []

  return (
    <Box
      sx={{
        backgroundColor: 'grey.50',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
      }}
    >
      {/* Main Stub Header */}
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
            {!isComplete ? (
              <MenuBookOutlinedIcon sx={{ fontSize: 20, color: 'primary.main' }} />
            ) : (
              <CheckCircleOutlineIcon sx={{ fontSize: 20, color: 'success.main' }} />
            )}
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                {isComplete ? 'Analysis complete' : PROGRESS_STATES[currentState]?.label || 'Processing...'}
                {isProcessing && <ThinkingDots />}
              </Typography>
              {/* Current activity inline */}
              {latestMessage && !isComplete && (
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.25 }}>
                  {latestMessage.text}
                </Typography>
              )}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              label={`${sourceCount} sources`}
              size="small"
              variant="outlined"
              onClick={isComplete ? onSourcesClick : undefined}
              sx={{
                fontWeight: 500,
                fontSize: '0.75rem',
                cursor: isComplete ? 'pointer' : 'default',
                '&:hover': isComplete ? {
                  borderColor: 'primary.main',
                  backgroundColor: 'action.hover',
                } : {},
              }}
            />
            {!isComplete && (
              <IconButton
                size="small"
                onClick={onStop}
                sx={{
                  width: 28,
                  height: 28,
                  backgroundColor: 'grey.200',
                  '&:hover': { backgroundColor: 'grey.300' },
                }}
              >
                <StopIcon sx={{ fontSize: 16 }} />
              </IconButton>
            )}
          </Box>
        </Box>

        {/* Progress Bar */}
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 6,
            borderRadius: 3,
            backgroundColor: 'grey.200',
            '& .MuiLinearProgress-bar': {
              borderRadius: 3,
              backgroundColor: isComplete ? 'success.main' : 'primary.main',
            },
          }}
        />
      </Box>

      {/* Expandable Activity Log */}
      {activityMessages.length > 0 && (
        <>
          <Box
            onClick={onToggleExpand}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.5,
              py: 0.75,
              borderTop: '1px solid',
              borderColor: 'divider',
              cursor: 'pointer',
              backgroundColor: expanded ? 'grey.100' : 'transparent',
              '&:hover': { backgroundColor: 'grey.100' },
            }}
          >
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              {expanded ? 'Hide activity' : `View activity (${activityMessages.length})`}
            </Typography>
            {expanded ? (
              <ExpandLessIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            ) : (
              <ExpandMoreIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            )}
          </Box>

          <Collapse in={expanded}>
            <Box
              sx={{
                maxHeight: 200,
                overflow: 'auto',
                px: 1.5,
                py: 1,
                borderTop: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'white',
              }}
            >
              {visibleMessages.map((item, index) => (
                <InlineActivityMessage
                  key={index}
                  item={item}
                  isLatest={index === visibleMessages.length - 1}
                />
              ))}
            </Box>
          </Collapse>
        </>
      )}
    </Box>
  )
}

// SourceCard now uses MiraSourceCard component
function SourceCard({ source }) {
  return (
    <MiraSourceCard
      title={source.title}
      icon={source.icon}
      snippet={source.snippet}
      relevance={source.relevance}
      url={source.url}
    />
  )
}

// Sources Panel Component
function SourcesPanel({ sources }) {
  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          The following sources were consulted to generate this response:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {sources.filter(s => s.relevance === 'high').length} high relevance · {sources.filter(s => s.relevance === 'medium').length} medium relevance
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {sources.map((source) => (
          <SourceCard key={source.id} source={source} />
        ))}
      </Box>
    </Box>
  )
}

// Fake Lexical RTE Toolbar
function LexicalToolbar() {
  const ToolbarButton = ({ icon, tooltip, active = false }) => (
    <Tooltip title={tooltip} placement="top">
      <IconButton
        size="small"
        sx={{
          width: 32,
          height: 32,
          borderRadius: 1,
          color: active ? 'primary.main' : 'text.secondary',
          backgroundColor: active ? 'primary.lighter' : 'transparent',
          '&:hover': {
            backgroundColor: 'grey.100',
          },
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  )

  const ToolbarDivider = () => (
    <Divider orientation="vertical" flexItem sx={{ mx: 0.5, my: 0.5 }} />
  )

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.25,
        px: 1.5,
        py: 1,
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'grey.50',
        flexWrap: 'wrap',
      }}
    >
      <ToolbarButton icon={<UndoIcon sx={{ fontSize: 18 }} />} tooltip="Undo" />
      <ToolbarButton icon={<RedoIcon sx={{ fontSize: 18 }} />} tooltip="Redo" />
      <ToolbarDivider />
      <ToolbarButton icon={<FormatBoldIcon sx={{ fontSize: 18 }} />} tooltip="Bold" />
      <ToolbarButton icon={<FormatItalicIcon sx={{ fontSize: 18 }} />} tooltip="Italic" />
      <ToolbarButton icon={<FormatUnderlinedIcon sx={{ fontSize: 18 }} />} tooltip="Underline" />
      <ToolbarButton icon={<StrikethroughSIcon sx={{ fontSize: 18 }} />} tooltip="Strikethrough" />
      <ToolbarButton icon={<CodeOffIcon sx={{ fontSize: 18 }} />} tooltip="Code" />
      <ToolbarDivider />
      <ToolbarButton icon={<LinkIcon sx={{ fontSize: 18 }} />} tooltip="Insert link" />
      <ToolbarButton icon={<ImageOutlinedIcon sx={{ fontSize: 18 }} />} tooltip="Insert image" />
      <ToolbarButton icon={<TableChartOutlinedIcon sx={{ fontSize: 18 }} />} tooltip="Insert table" />
      <ToolbarDivider />
      <ToolbarButton icon={<FormatListBulletedIcon sx={{ fontSize: 18 }} />} tooltip="Bullet list" />
      <ToolbarButton icon={<FormatListNumberedIcon sx={{ fontSize: 18 }} />} tooltip="Numbered list" />
      <ToolbarButton icon={<FormatQuoteIcon sx={{ fontSize: 18 }} />} tooltip="Block quote" />
    </Box>
  )
}

// Document content component (extracted for reuse)
function DocumentContent() {
  return (
    <Box
      sx={{
        flex: 1,
        overflow: 'auto',
        p: 3,
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '0.95rem',
        lineHeight: 1.7,
        color: 'text.primary',
        '& h1': { fontSize: '1.75rem', fontWeight: 700, mb: 2, mt: 0 },
        '& h2': { fontSize: '1.25rem', fontWeight: 600, mb: 1.5, mt: 3, borderBottom: '1px solid', borderColor: 'divider', pb: 0.5 },
        '& h3': { fontSize: '1rem', fontWeight: 600, mb: 1, mt: 2 },
        '& p': { mb: 1.5 },
        '& ul, & ol': { pl: 2.5, mb: 1.5 },
        '& li': { mb: 0.5 },
        '& code': { backgroundColor: 'grey.100', px: 0.75, py: 0.25, borderRadius: 0.5, fontSize: '0.85em', fontFamily: 'monospace' },
        '& table': { width: '100%', borderCollapse: 'collapse', mb: 2, fontSize: '0.875rem' },
        '& th, & td': { border: '1px solid', borderColor: 'divider', px: 1.5, py: 1, textAlign: 'left' },
        '& th': { backgroundColor: 'grey.50', fontWeight: 600 },
        '& strong': { fontWeight: 600 },
      }}
    >
      <h1>Usage Analysis Report</h1>
      <h2>Executive Summary</h2>
      <p>Based on analysis of the past 30 days of usage data, we've identified several key patterns and opportunities for optimization.</p>
      <h2>Key Findings</h2>
      <h3>1. Peak Usage Times</h3>
      <ul>
        <li><strong>Primary Peak</strong>: 9:00 AM - 11:00 AM (weekdays)</li>
        <li><strong>Secondary Peak</strong>: 2:00 PM - 4:00 PM (weekdays)</li>
        <li><strong>Low Activity</strong>: Weekends and after 7 PM</li>
      </ul>
      <h3>2. API Performance</h3>
      <table>
        <thead>
          <tr><th>Metric</th><th>Current</th><th>Previous Month</th><th>Change</th></tr>
        </thead>
        <tbody>
          <tr><td>Total Calls</td><td>1.2M</td><td>975K</td><td>+23%</td></tr>
          <tr><td>Avg Response</td><td>145ms</td><td>162ms</td><td>-10%</td></tr>
          <tr><td>Error Rate</td><td>0.3%</td><td>0.5%</td><td>-40%</td></tr>
        </tbody>
      </table>
      <h3>3. Top Endpoints</h3>
      <ol>
        <li><code>/api/v1/users</code> - 234,521 calls</li>
        <li><code>/api/v1/analytics</code> - 189,234 calls</li>
        <li><code>/api/v1/reports</code> - 156,789 calls</li>
      </ol>
      <h3>4. Recommendations</h3>
      <ol>
        <li>Scale up resources during peak hours</li>
        <li>Implement caching for frequently accessed endpoints</li>
        <li>Consider rate limiting for non-critical operations</li>
      </ol>
      <h2>Next Steps</h2>
      <ul>
        <li>Review infrastructure scaling policies</li>
        <li>Implement recommended caching strategy</li>
        <li>Schedule follow-up analysis in 2 weeks</li>
      </ul>
    </Box>
  )
}

// Light mode canvas panel with Lexical toolbar and Document/Sources tabs
function CanvasPanel({ canvasTab, onCanvasTabChange }) {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.paper',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
      }}
    >
      {/* Canvas Header with Tabs */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 0.5,
          borderBottom: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DescriptionIcon sx={{ fontSize: 18, color: 'primary.main' }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Usage Analysis Report
            </Typography>
            <Chip label="Draft" size="small" sx={{ height: 20, fontSize: '0.7rem' }} />
          </Box>

          {/* Document / Sources Tabs */}
          <Tabs
            value={canvasTab}
            onChange={(e, v) => onCanvasTabChange(v)}
            sx={{
              minHeight: 40,
              '& .MuiTab-root': {
                minHeight: 40,
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.8rem',
                px: 2,
                minWidth: 'auto',
              },
              '& .MuiTabs-indicator': {
                height: 2,
              },
            }}
          >
            <Tab label="Document" value="document" />
            <Tab label={`Sources (${SOURCES_DATA.length})`} value="sources" />
          </Tabs>
        </Box>

        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Tooltip title="Copy">
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <ContentCopyIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download">
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <DownloadIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Document Tab Content */}
      {canvasTab === 'document' && (
        <>
          <LexicalToolbar />
          <DocumentContent />
        </>
      )}

      {/* Sources Tab Content */}
      {canvasTab === 'sources' && (
        <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
          <SourcesPanel sources={SOURCES_DATA} />
        </Box>
      )}
    </Box>
  )
}

function StudioChatPageV4() {
  const navigate = useNavigate()
  const location = useLocation()

  const userMessage = location.state?.message || 'Analyze recent usage patterns'

  const [activityMessages, setActivityMessages] = useState([])
  const [currentProgressState, setCurrentProgressState] = useState(0)
  const [isProcessing, setIsProcessing] = useState(true)
  const [isComplete, setIsComplete] = useState(false)
  const [showResponse, setShowResponse] = useState(false)
  const [showCanvas, setShowCanvas] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [viewMode, setViewMode] = useState('thread') // 'thread' or 'canvas'
  const [threadTab, setThreadTab] = useState('response') // 'response' or 'sources'
  const [canvasTab, setCanvasTab] = useState('document') // 'document' or 'sources'
  const [newMessage, setNewMessage] = useState('')

  // Simulate the AI processing
  useEffect(() => {
    if (!isProcessing) return

    let currentIndex = 0
    let progressIndex = 0

    const addMessage = () => {
      if (currentIndex >= SIMULATED_ACTIVITY.length) {
        setIsComplete(true)
        setIsProcessing(false)
        setTimeout(() => {
          setShowResponse(true)
          setShowCanvas(true)
        }, 500)
        return
      }

      const item = SIMULATED_ACTIVITY[currentIndex]
      setActivityMessages(prev => [...prev, item])

      if (item.type === 'canvas') {
        setShowCanvas(true)
      }

      if (item.type === 'reading' && progressIndex < PROGRESS_STATES.length - 1) {
        progressIndex++
        setCurrentProgressState(progressIndex)
      }

      currentIndex++
      setTimeout(addMessage, item.delay + Math.random() * 500)
    }

    const timeout = setTimeout(addMessage, 500)
    return () => clearTimeout(timeout)
  }, [isProcessing])

  const handleStop = () => {
    setIsProcessing(false)
    setIsComplete(true)
    setTimeout(() => {
      setShowResponse(true)
      setShowCanvas(true)
    }, 300)
  }

  const handleNewChat = () => {
    navigate('/studio')
  }

  const sourceCount = PROGRESS_STATES[currentProgressState]?.sources || 0

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Top Toolbar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          px: 2,
          py: 1.5,
          minHeight: 48,
          borderBottom: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper',
        }}
      >
        <IconButton size="small" onClick={handleNewChat}>
          <ArrowBackIcon />
        </IconButton>
        <Divider orientation="vertical" flexItem sx={{ my: 0.5 }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Q4 Usage Analysis
        </Typography>

        <Box sx={{ flex: 1 }} />

        {/* View Mode Toggle */}
        <ThemedToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(e, v) => v && setViewMode(v)}
          size="small"
        >
          <ThemedToggleButton value="thread">
            <ViewStreamIcon sx={{ fontSize: 16, mr: 0.5 }} />
            Thread
          </ThemedToggleButton>
          <ThemedToggleButton value="canvas" disabled={!showCanvas}>
            <DashboardIcon sx={{ fontSize: 16, mr: 0.5 }} />
            Canvas
          </ThemedToggleButton>
        </ThemedToggleButtonGroup>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Thread View */}
        {viewMode === 'thread' && (
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <Box sx={{ flex: 1, overflow: 'auto', minHeight: 0, p: 3 }}>
              <Box sx={{ maxWidth: 800, width: '100%', mx: 'auto' }}>
              {/* User Message */}
              <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                <Avatar sx={{ width: 32, height: 32, backgroundColor: 'grey.300', fontSize: '0.875rem' }}>U</Avatar>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>You</Typography>
                    <IconButton size="small" sx={{ p: 0.25 }}>
                      <StarOutlineIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    </IconButton>
                    <IconButton size="small" sx={{ p: 0.25 }}>
                      <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    </IconButton>
                  </Box>
                  <Typography variant="body1">{userMessage}</Typography>
                </Box>
              </Box>

              {/* AI Response Area */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Avatar sx={{ width: 32, height: 32, backgroundColor: 'primary.main' }}>
                  <AutoAwesomeOutlinedIcon sx={{ fontSize: 18 }} />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>AI Assistant</Typography>

                  {/* Inline Progress Stub with Activity */}
                  <Box sx={{ mb: 3 }}>
                    <InlineProgressStub
                      currentState={currentProgressState}
                      isComplete={isComplete}
                      activityMessages={activityMessages}
                      isProcessing={isProcessing}
                      onStop={handleStop}
                      expanded={expanded}
                      onToggleExpand={() => setExpanded(!expanded)}
                      onSourcesClick={() => setThreadTab('sources')}
                      sourceCount={sourceCount}
                    />
                  </Box>

                  {/* Response/Sources Tabs */}
                  {showResponse && (
                    <Box sx={{ mb: 3 }}>
                      <Tabs
                        value={threadTab}
                        onChange={(e, v) => setThreadTab(v)}
                        sx={{
                          minHeight: 36,
                          mb: 2,
                          '& .MuiTab-root': {
                            minHeight: 36,
                            textTransform: 'none',
                            fontWeight: 500,
                            fontSize: '0.875rem',
                          },
                        }}
                      >
                        <Tab label="Response" value="response" />
                        <Tab label={`Sources (${SOURCES_DATA.length})`} value="sources" />
                      </Tabs>

                      {/* Response Content */}
                      {threadTab === 'response' && (
                        <Box
                          sx={{
                            opacity: 0,
                            animation: 'fadeIn 0.3s ease forwards',
                            '@keyframes fadeIn': { from: { opacity: 0 }, to: { opacity: 1 } },
                          }}
                        >
                          <Typography variant="body1" sx={{ mb: 2 }}>
                            I've analyzed your usage data and created a comprehensive report:
                          </Typography>

                          {/* Canvas Preview Card */}
                          <Paper
                            elevation={0}
                            onClick={() => setViewMode('canvas')}
                            sx={{
                              p: 2,
                              mb: 3,
                              border: '1px solid',
                              borderColor: 'divider',
                              cursor: 'pointer',
                              maxWidth: 320,
                              '&:hover': { borderColor: 'primary.main', backgroundColor: 'action.hover' },
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                              <DescriptionIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Document</Typography>
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                              Usage Analysis Report - Click to edit
                            </Typography>
                          </Paper>

                          <Typography variant="body1" sx={{ mb: 2 }}><strong>Key Insights:</strong></Typography>
                          <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                            <li><Typography variant="body1">Usage patterns show peak activity during weekday mornings (9-11 AM)</Typography></li>
                            <li><Typography variant="body1">API call volume has increased 23% compared to last month</Typography></li>
                            <li><Typography variant="body1">Most frequently accessed endpoints are related to data retrieval</Typography></li>
                          </Box>
                          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                            Click the document above to view and edit in Canvas mode, or view the <Link component="button" onClick={() => setThreadTab('sources')} sx={{ fontWeight: 500 }}>sources</Link> used to generate this response.
                          </Typography>
                        </Box>
                      )}

                      {/* Sources Content */}
                      {threadTab === 'sources' && (
                        <Box
                          sx={{
                            opacity: 0,
                            animation: 'fadeIn 0.3s ease forwards',
                            '@keyframes fadeIn': { from: { opacity: 0 }, to: { opacity: 1 } },
                          }}
                        >
                          <SourcesPanel sources={SOURCES_DATA} />
                        </Box>
                      )}
                    </Box>
                  )}
                </Box>
              </Box>

              </Box>
            </Box>

            {/* Fixed Bottom Input */}
            <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
              <Box sx={{ maxWidth: 800, width: '100%', mx: 'auto' }}>
                <TextField
                  fullWidth
                  placeholder="Ask a follow-up question..."
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
                      paddingLeft: 3,
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
        )}

        {/* Canvas View - Split Layout */}
        {viewMode === 'canvas' && (
          <Box sx={{ flex: 1, display: 'flex', p: 2, gap: 2 }}>
            {/* Chat Panel (Left - smaller) */}
            <Box
              sx={{
                width: 360,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'background.paper',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Chat</Typography>
              </Box>

              <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
                <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
                  <Avatar sx={{ width: 24, height: 24, backgroundColor: 'grey.300', fontSize: '0.7rem' }}>U</Avatar>
                  <Typography variant="body2" sx={{ flex: 1 }}>{userMessage}</Typography>
                </Box>

                {showResponse && (
                  <Box sx={{ display: 'flex', gap: 1.5 }}>
                    <Avatar sx={{ width: 24, height: 24, backgroundColor: 'primary.main' }}>
                      <AutoAwesomeOutlinedIcon sx={{ fontSize: 14 }} />
                    </Avatar>
                    <Typography variant="body2" sx={{ flex: 1, color: 'text.secondary' }}>
                      I've created a usage analysis report based on your data. You can edit it directly in the canvas.
                    </Typography>
                  </Box>
                )}
              </Box>

              <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Ask about this document..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small" disabled={!newMessage.trim()} color="primary">
                          <SendIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 50 } }}
                />
              </Box>
            </Box>

            <CanvasPanel canvasTab={canvasTab} onCanvasTabChange={setCanvasTab} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default StudioChatPageV4

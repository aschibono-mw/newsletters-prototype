import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Chip,
  LinearProgress,
  Collapse,
  IconButton,
  TextField,
  Select,
  MenuItem,
  Avatar,
  Tooltip,
} from '@mui/material'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import DescriptionIcon from '@mui/icons-material/Description'
import StopIcon from '@mui/icons-material/Stop'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import CodeIcon from '@mui/icons-material/Code'
import BuildIcon from '@mui/icons-material/Build'
import SearchIcon from '@mui/icons-material/Search'
import StorageIcon from '@mui/icons-material/Storage'
import CloudIcon from '@mui/icons-material/Cloud'

const MESSAGE_TYPES = [
  { value: 'thinking', label: 'Thinking', icon: PsychologyOutlinedIcon, color: 'text.secondary' },
  { value: 'reading', label: 'Reading', icon: MenuBookOutlinedIcon, color: 'primary.main' },
  { value: 'searching', label: 'Searching', icon: SearchIcon, color: 'info.main' },
  { value: 'analyzing', label: 'Analyzing', icon: BuildIcon, color: 'warning.main' },
  { value: 'generating', label: 'Generating', icon: CodeIcon, color: 'secondary.main' },
  { value: 'canvas', label: 'Canvas', icon: DescriptionIcon, color: 'primary.main' },
  { value: 'insight', label: 'Insight', icon: CheckCircleOutlineIcon, color: 'success.main' },
  { value: 'complete', label: 'Complete', icon: CheckCircleOutlineIcon, color: 'success.main' },
  { value: 'fetching', label: 'Fetching', icon: CloudIcon, color: 'info.main' },
  { value: 'processing', label: 'Processing', icon: StorageIcon, color: 'warning.main' },
]

const SOURCE_TYPES = ['internal-docs', 'knowledge-base', 'api-docs', 'best-practices', 'code-files', 'database', 'external-api', 'user-data']

const PRESETS = {
  simple: [
    { type: 'thinking', text: 'Understanding your query...' },
    { type: 'reading', text: 'Searching relevant context', source: 'internal-docs' },
    { type: 'complete', text: 'Analysis complete' },
  ],
  detailed: [
    { type: 'thinking', text: 'Understanding your query...' },
    { type: 'reading', text: 'Searching project context', source: 'internal-docs' },
    { type: 'insight', text: 'Found relevant project data' },
    { type: 'reading', text: 'Reading knowledge base', source: 'knowledge-base' },
    { type: 'thinking', text: 'Analyzing the available information...' },
    { type: 'reading', text: 'Checking API documentation', source: 'api-docs' },
    { type: 'canvas', text: 'Generating document...' },
    { type: 'thinking', text: 'Cross-referencing sources...' },
    { type: 'reading', text: 'Reviewing best practices', source: 'best-practices' },
    { type: 'thinking', text: 'Synthesizing findings...' },
    { type: 'complete', text: 'Analysis complete' },
  ],
  codeGen: [
    { type: 'thinking', text: 'Analyzing requirements...' },
    { type: 'searching', text: 'Searching codebase for patterns' },
    { type: 'reading', text: 'Reading existing implementation', source: 'code-files' },
    { type: 'analyzing', text: 'Determining best approach' },
    { type: 'generating', text: 'Writing code...' },
    { type: 'thinking', text: 'Adding error handling...' },
    { type: 'complete', text: 'Code generation complete' },
  ],
  dataAnalysis: [
    { type: 'thinking', text: 'Parsing your query...' },
    { type: 'fetching', text: 'Retrieving data from database' },
    { type: 'processing', text: 'Processing records...' },
    { type: 'analyzing', text: 'Running statistical analysis' },
    { type: 'insight', text: 'Found significant patterns' },
    { type: 'canvas', text: 'Creating visualization...' },
    { type: 'complete', text: 'Analysis complete' },
  ],
  // Friendly templates
  friendlySimple: [
    { type: 'thinking', text: 'Let me look into that for you...' },
    { type: 'reading', text: 'Checking a few things...', source: 'internal-docs' },
    { type: 'complete', text: 'All done!' },
  ],
  friendlyResearch: [
    { type: 'thinking', text: 'On it! Let me dig in...' },
    { type: 'reading', text: 'Pulling together the details...', source: 'internal-docs' },
    { type: 'insight', text: 'Found some good stuff' },
    { type: 'reading', text: 'Checking the knowledge base...', source: 'knowledge-base' },
    { type: 'thinking', text: 'Connecting the dots...' },
    { type: 'reading', text: 'One more place to look...', source: 'api-docs' },
    { type: 'thinking', text: 'Putting it all together...' },
    { type: 'complete', text: 'Here\'s what I found!' },
  ],
  friendlyMedia: [
    { type: 'thinking', text: 'Looking into that for you...' },
    { type: 'searching', text: 'Checking social channels...' },
    { type: 'fetching', text: 'Gathering articles and social posts...' },
    { type: 'processing', text: 'Going through the articles...' },
    { type: 'insight', text: 'Spotted some interesting trends' },
    { type: 'analyzing', text: 'Seeing how far this reached...' },
    { type: 'canvas', text: 'Putting together your brief...' },
    { type: 'complete', text: 'Your media brief is ready!' },
  ],
  friendlyContacts: [
    { type: 'thinking', text: 'Let me find that for you...' },
    { type: 'searching', text: 'Looking through contacts...' },
    { type: 'fetching', text: 'Looking up journalist details...' },
    { type: 'reading', text: 'Pulling their recent work...', source: 'database' },
    { type: 'insight', text: 'Found some great matches' },
    { type: 'complete', text: 'Here are your results!' },
  ],
}

function ThinkingDots() {
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        gap: 0.5,
        ml: 1,
        '& span': {
          width: 4,
          height: 4,
          borderRadius: '50%',
          backgroundColor: 'text.secondary',
          animation: 'bounce 1.4s infinite ease-in-out both',
        },
        '& span:nth-of-type(1)': { animationDelay: '-0.32s' },
        '& span:nth-of-type(2)': { animationDelay: '-0.16s' },
        '@keyframes bounce': {
          '0%, 80%, 100%': { transform: 'scale(0)' },
          '40%': { transform: 'scale(1)' },
        },
      }}
    >
      <span /><span /><span />
    </Box>
  )
}

function ActivityMessage({ item, isLatest }) {
  const typeConfig = MESSAGE_TYPES.find(t => t.value === item.type) || MESSAGE_TYPES[0]
  const IconComponent = typeConfig.icon

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
      }}
    >
      <IconComponent sx={{ fontSize: 14, color: typeConfig.color }} />
      <Typography variant="caption" sx={{ color: typeConfig.color }}>{item.text}</Typography>
      {item.source && (
        <Chip label={item.source} size="small" sx={{ height: 18, fontSize: '0.65rem', backgroundColor: 'grey.100', '& .MuiChip-label': { px: 1 } }} />
      )}
    </Box>
  )
}

function ProgressStub({ messages, progress, isComplete, isProcessing, expanded, onToggleExpand, sourceCount, onStop }) {
  const latestMessage = messages[messages.length - 1]
  const visibleMessages = expanded ? messages.slice(-8) : []

  return (
    <Box sx={{ backgroundColor: 'grey.50', borderRadius: 2, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
            {!isComplete ? (
              <MenuBookOutlinedIcon sx={{ fontSize: 20, color: 'primary.main' }} />
            ) : (
              <CheckCircleOutlineIcon sx={{ fontSize: 20, color: 'success.main' }} />
            )}
            <Typography variant="subtitle2" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
              {isComplete ? 'Analysis complete' : (latestMessage?.text || 'Processing...')}
              {isProcessing && <ThinkingDots />}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip label={`${sourceCount} sources`} size="small" variant="outlined" sx={{ fontWeight: 500, fontSize: '0.75rem' }} />
            {!isComplete && (
              <IconButton size="small" onClick={onStop} sx={{ width: 28, height: 28, backgroundColor: 'grey.200', '&:hover': { backgroundColor: 'grey.300' } }}>
                <StopIcon sx={{ fontSize: 16 }} />
              </IconButton>
            )}
          </Box>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 6,
            borderRadius: 3,
            backgroundColor: 'grey.200',
            '& .MuiLinearProgress-bar': { borderRadius: 3, backgroundColor: isComplete ? 'success.main' : 'primary.main' },
          }}
        />
      </Box>

      {messages.length > 0 && (
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
              '&:hover': { backgroundColor: 'grey.100' },
            }}
          >
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              {expanded ? 'Hide' : `Activity (${messages.length})`}
            </Typography>
            {expanded ? <ExpandLessIcon sx={{ fontSize: 16, color: 'text.secondary' }} /> : <ExpandMoreIcon sx={{ fontSize: 16, color: 'text.secondary' }} />}
          </Box>
          <Collapse in={expanded}>
            <Box sx={{ maxHeight: 200, overflow: 'auto', px: 1.5, py: 1, borderTop: '1px solid', borderColor: 'divider', backgroundColor: 'white' }}>
              {visibleMessages.map((item, index) => (
                <ActivityMessage key={index} item={item} isLatest={index === visibleMessages.length - 1} />
              ))}
            </Box>
          </Collapse>
        </>
      )}
    </Box>
  )
}

function MessageRow({ message, index, onChange, onDelete, isCurrent }) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        alignItems: 'center',
        py: 0.5,
        px: 1,
        borderRadius: 1,
        backgroundColor: isCurrent ? 'action.selected' : 'transparent',
        '&:hover': { backgroundColor: isCurrent ? 'action.selected' : 'action.hover' },
      }}
    >
      <Typography variant="caption" sx={{ width: 20, color: 'text.disabled', flexShrink: 0 }}>{index + 1}</Typography>
      <Select
        size="small"
        value={message.type}
        onChange={(e) => onChange(index, 'type', e.target.value)}
        sx={{ minWidth: 120, '& .MuiSelect-select': { py: 0.5, display: 'flex', alignItems: 'center', gap: 0.5 } }}
      >
        {MESSAGE_TYPES.map(type => (
          <MenuItem key={type.value} value={type.value} sx={{ fontSize: '0.875rem' }}>
            <type.icon sx={{ fontSize: 14, color: type.color, mr: 0.5 }} />
            {type.label}
          </MenuItem>
        ))}
      </Select>
      <TextField
        size="small"
        value={message.text}
        onChange={(e) => onChange(index, 'text', e.target.value)}
        sx={{ flex: 1, '& .MuiInputBase-input': { py: 0.5 } }}
        placeholder="Message text..."
      />
      {message.type === 'reading' && (
        <Select
          size="small"
          value={message.source || ''}
          onChange={(e) => onChange(index, 'source', e.target.value)}
          displayEmpty
          sx={{ minWidth: 120, '& .MuiSelect-select': { py: 0.5 } }}
        >
          <MenuItem value="" sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>Source...</MenuItem>
          {SOURCE_TYPES.map(source => (
            <MenuItem key={source} value={source} sx={{ fontSize: '0.875rem' }}>{source}</MenuItem>
          ))}
        </Select>
      )}
      <IconButton size="small" onClick={() => onDelete(index)} sx={{ opacity: 0.5, '&:hover': { opacity: 1 } }}>
        <DeleteIcon sx={{ fontSize: 16 }} />
      </IconButton>
    </Box>
  )
}

function ChatProgressionTestPage() {
  const [messages, setMessages] = useState(PRESETS.detailed)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [speed, setSpeed] = useState(500)
  const [preset, setPreset] = useState('detailed')

  const visibleMessages = messages.slice(0, currentIndex + 1)
  const isComplete = currentIndex >= messages.length - 1 && messages[currentIndex]?.type === 'complete'
  const sourceCount = visibleMessages.filter(m => m.type === 'reading').length
  const progress = messages.length > 0 ? ((currentIndex + 1) / messages.length) * 100 : 0

  useEffect(() => {
    if (!isPlaying || currentIndex >= messages.length - 1) {
      if (currentIndex >= messages.length - 1) setIsPlaying(false)
      return
    }
    const timer = setTimeout(() => setCurrentIndex(prev => prev + 1), speed)
    return () => clearTimeout(timer)
  }, [isPlaying, currentIndex, speed, messages.length])

  const play = () => { if (currentIndex >= messages.length - 1) setCurrentIndex(-1); setIsPlaying(true) }
  const stop = () => setIsPlaying(false)
  const reset = () => { setIsPlaying(false); setCurrentIndex(-1) }
  const step = () => { if (currentIndex < messages.length - 1) setCurrentIndex(prev => prev + 1) }

  const handleMessageChange = (index, field, value) => {
    setMessages(prev => { const n = [...prev]; n[index] = { ...n[index], [field]: value }; return n })
  }
  const handleAdd = () => setMessages(prev => [...prev, { type: 'thinking', text: 'New step...' }])
  const handleDelete = (index) => {
    setMessages(prev => prev.filter((_, i) => i !== index))
    if (currentIndex >= index) setCurrentIndex(prev => Math.max(-1, prev - 1))
  }
  const loadPreset = (key) => { setPreset(key); setMessages(PRESETS[key]); setCurrentIndex(-1); setIsPlaying(false) }

  return (
    <Box sx={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      {/* Editor */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', borderRight: '1px solid', borderColor: 'divider', minWidth: 0 }}>
        {/* Toolbar */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Select size="small" value={preset} onChange={(e) => loadPreset(e.target.value)} sx={{ minWidth: 120 }}>
            <MenuItem value="simple">Simple</MenuItem>
            <MenuItem value="detailed">Detailed</MenuItem>
            <MenuItem value="codeGen">Code Gen</MenuItem>
            <MenuItem value="dataAnalysis">Data Analysis</MenuItem>
            <MenuItem disabled sx={{ opacity: 0.5, fontSize: '0.75rem' }}>Friendly</MenuItem>
            <MenuItem value="friendlySimple">Friendly: Simple</MenuItem>
            <MenuItem value="friendlyResearch">Friendly: Research</MenuItem>
            <MenuItem value="friendlyMedia">Friendly: Media</MenuItem>
            <MenuItem value="friendlyContacts">Friendly: Contacts</MenuItem>
          </Select>
          <Box sx={{ flex: 1 }} />
          <Tooltip title="Reset"><IconButton size="small" onClick={reset}><RestartAltIcon sx={{ fontSize: 18 }} /></IconButton></Tooltip>
          <Tooltip title="Step"><IconButton size="small" onClick={step} disabled={isPlaying || currentIndex >= messages.length - 1}><SkipNextIcon sx={{ fontSize: 18 }} /></IconButton></Tooltip>
          <Tooltip title={isPlaying ? 'Stop' : 'Play'}>
            <IconButton size="small" onClick={isPlaying ? stop : play} color="primary">
              {isPlaying ? <StopIcon sx={{ fontSize: 18 }} /> : <PlayArrowIcon sx={{ fontSize: 18 }} />}
            </IconButton>
          </Tooltip>
          <Select size="small" value={speed} onChange={(e) => setSpeed(e.target.value)} sx={{ minWidth: 80 }}>
            <MenuItem value={250}>Fast</MenuItem>
            <MenuItem value={500}>Normal</MenuItem>
            <MenuItem value={1000}>Slow</MenuItem>
          </Select>
          <Typography variant="caption" color="text.secondary" sx={{ ml: 1, minWidth: 50 }}>
            {currentIndex + 1}/{messages.length}
          </Typography>
        </Box>

        {/* Message List */}
        <Box sx={{ flex: 1, overflow: 'auto', py: 1 }}>
          {messages.map((message, index) => (
            <MessageRow
              key={index}
              message={message}
              index={index}
              onChange={handleMessageChange}
              onDelete={handleDelete}
              isCurrent={index === currentIndex}
            />
          ))}
          <Box sx={{ px: 1, py: 0.5 }}>
            <IconButton size="small" onClick={handleAdd} sx={{ color: 'text.secondary' }}>
              <AddIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Preview */}
      <Box sx={{ width: 520, display: 'flex', flexDirection: 'column', backgroundColor: 'background.default' }}>
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Preview
          </Typography>
        </Box>
        <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
          {/* User */}
          <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
            <Avatar sx={{ width: 28, height: 28, backgroundColor: 'grey.300', fontSize: '0.75rem' }}>U</Avatar>
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 0.25 }}>You</Typography>
              <Typography variant="body2" color="text.secondary">What are the usage patterns?</Typography>
            </Box>
          </Box>

          {/* AI */}
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Avatar sx={{ width: 28, height: 28, backgroundColor: 'primary.main' }}>
              <AutoAwesomeOutlinedIcon sx={{ fontSize: 16 }} />
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 1 }}>AI Assistant</Typography>
              {currentIndex >= 0 ? (
                <ProgressStub
                  messages={visibleMessages}
                  progress={progress}
                  isComplete={isComplete}
                  isProcessing={isPlaying && !isComplete}
                  expanded={expanded}
                  onToggleExpand={() => setExpanded(!expanded)}
                  sourceCount={sourceCount}
                  onStop={stop}
                />
              ) : (
                <Typography variant="body2" color="text.disabled">Press play to preview...</Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ChatProgressionTestPage

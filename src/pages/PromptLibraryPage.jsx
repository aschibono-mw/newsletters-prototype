import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
  Divider,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  Autocomplete,
  Alert,
  Tabs,
  Tab,
  Stack,
  Chip,
  InputBase,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import StarIcon from '@mui/icons-material/Star'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import SendIcon from '@mui/icons-material/Send'
import CloseIcon from '@mui/icons-material/Close'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import AddIcon from '@mui/icons-material/Add'
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend'
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined'
import PauseIcon from '@mui/icons-material/Pause'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Indicator from '../components/core/Indicator'
import { MiraGradientText } from '../components/mira'
import { getMiraGradientBorderSx } from '../constants/miraStyles'
import {
  INITIAL_RECURRING_PROMPTS,
  formatSchedule,
} from '../data/recurringPromptsData'

// Prompt Card Component
function PromptCard({ prompt, isFavorite, onUse, onEdit, onDelete, onSchedule, onToggleFavorite }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        transition: 'none',
        '&:hover': {
          borderColor: 'primary.main',
        },
      }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
        {prompt.title}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          flex: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {prompt.description}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Tooltip title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
            <IconButton
              size="small"
              onClick={() => onToggleFavorite(prompt)}
              sx={{ color: isFavorite ? 'warning.main' : 'text.secondary' }}
            >
              {isFavorite ? <StarIcon sx={{ fontSize: 18 }} /> : <StarOutlineIcon sx={{ fontSize: 18 }} />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => onEdit(prompt)} sx={{ color: 'text.secondary' }}>
              <EditOutlinedIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" onClick={() => onDelete(prompt)} sx={{ color: 'text.secondary' }}>
              <DeleteOutlineIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Schedule">
            <IconButton size="small" onClick={() => onSchedule(prompt)} sx={{ color: 'text.secondary' }}>
              <AccessTimeIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        </Box>
        <Tooltip title="Use this prompt">
          <IconButton
            size="small"
            onClick={() => onUse(prompt)}
            sx={{ color: 'primary.main' }}
          >
            <PlayArrowIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
  )
}

// Initial prompt categories data
const INITIAL_PROMPT_CATEGORIES = [
  {
    id: 'analysis',
    name: 'Analysis & Reporting',
    prompts: [
      { id: 'a1', title: 'Competitive Share of Voice', description: 'Analyze media share of voice for [Brand] versus [Competitor] over [Timeframe]. Include sentiment breakdown and key themes.' },
      { id: 'a2', title: 'Weekly Coverage Summary', description: 'Summarize the top media coverage from the past week, highlighting key stories, sentiment trends, and emerging topics.' },
      { id: 'a3', title: 'Campaign Performance Report', description: 'Generate a performance report for [Campaign Name] including reach, engagement, sentiment, and media pickup.' },
    ],
  },
  {
    id: 'brand',
    name: 'Brand Monitoring',
    prompts: [
      { id: 'b1', title: 'Brand Mention Digest', description: 'Compile all brand mentions from the past 24 hours with sentiment analysis and source breakdown.' },
      { id: 'b2', title: 'Executive Visibility Report', description: 'Track media mentions of [Executive Name] including context, sentiment, and reach metrics.' },
    ],
  },
  {
    id: 'competitive',
    name: 'Competitive Intelligence',
    prompts: [
      { id: 'c1', title: 'Competitor News Alert', description: 'Surface the latest news about [Competitor] including product launches, leadership changes, and market moves.' },
      { id: 'c2', title: 'Market Positioning Analysis', description: 'Compare how [Brand] is positioned in media coverage versus top 3 competitors in [Industry].' },
    ],
  },
  {
    id: 'crisis',
    name: 'Crisis Management',
    prompts: [
      { id: 'cr1', title: 'Issue Monitoring Brief', description: 'Monitor coverage of [Issue/Topic] and alert on volume spikes, negative sentiment, or influential coverage.' },
      { id: 'cr2', title: 'Rapid Response Summary', description: 'Generate a real-time summary of developing story [Topic] with timeline, key sources, and spread analysis.' },
    ],
  },
  {
    id: 'industry',
    name: 'Industry Trends',
    prompts: [
      { id: 'i1', title: 'Trend Spotting Report', description: 'Identify emerging trends in [Industry] based on media coverage patterns over the past 30 days.' },
      { id: 'i2', title: 'Regulatory Watch', description: 'Track regulatory news and policy changes affecting [Industry] with potential impact assessment.' },
    ],
  },
  {
    id: 'social',
    name: 'Social Intelligence',
    prompts: [
      { id: 's1', title: 'Social Buzz Analysis', description: 'Analyze social media conversation around [Topic/Brand] including top voices, hashtags, and sentiment.' },
      { id: 's2', title: 'Influencer Landscape', description: 'Map key influencers discussing [Topic] with reach, engagement, and content themes.' },
    ],
  },
]

function PromptLibraryPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [message, setMessage] = useState('')
  const [expandedCategories, setExpandedCategories] = useState(['analysis'])
  const [activeTab, setActiveTab] = useState(0)

  // Prompt categories state (mutable)
  const [promptCategories, setPromptCategories] = useState(INITIAL_PROMPT_CATEGORIES)

  // Favorites state
  const [favoritePromptIds, setFavoritePromptIds] = useState(new Set())

  // Create Prompt Dialog state
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState('create') // 'create' or 'edit'
  const [editingPrompt, setEditingPrompt] = useState(null)
  const [editingPromptCategory, setEditingPromptCategory] = useState(null)

  // Delete Dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [promptToDelete, setPromptToDelete] = useState(null)
  const [promptToDeleteCategory, setPromptToDeleteCategory] = useState(null)

  // Success snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [lastCreatedPrompt, setLastCreatedPrompt] = useState(null)

  // Recurring prompts state
  const [recurringPrompts, setRecurringPrompts] = useState(INITIAL_RECURRING_PROMPTS)
  const [recurringSearchQuery, setRecurringSearchQuery] = useState('')
  const [selectedRecurringPrompt, setSelectedRecurringPrompt] = useState(null)
  const [deleteRecurringDialogOpen, setDeleteRecurringDialogOpen] = useState(false)

  // Handle URL query params
  useEffect(() => {
    if (searchParams.get('create') === 'true') {
      setDialogOpen(true)
      setDialogMode('create')
      setSearchParams({}, { replace: true })
    }
    const tabParam = searchParams.get('tab')
    if (tabParam === 'scheduled') {
      setActiveTab(1)
    }
  }, [searchParams, setSearchParams])

  // Sync tab state to URL
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
    if (newValue === 1) {
      setSearchParams({ tab: 'scheduled' }, { replace: true })
    } else {
      setSearchParams({}, { replace: true })
    }
  }

  const [promptTitle, setPromptTitle] = useState('')
  const [promptCategory, setPromptCategory] = useState(null)
  const [promptText, setPromptText] = useState('')
  const [promptDescription, setPromptDescription] = useState('')
  const [shareLevel, setShareLevel] = useState('user')
  const [isFavorite, setIsFavorite] = useState(false)

  const handleCategoryToggle = (categoryId) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      navigate('/studio/chat', {
        state: {
          message: message.trim(),
        },
      })
    }
  }

  const handleUsePrompt = (prompt) => {
    navigate('/studio/chat', {
      state: {
        message: prompt.description,
      },
    })
  }

  // Get category options from current state
  const categoryOptions = useMemo(() =>
    promptCategories.map((c) => c.name),
    [promptCategories]
  )

  const handleOpenDialog = () => {
    setDialogOpen(true)
    setDialogMode('create')
    setEditingPrompt(null)
    setEditingPromptCategory(null)
    // Reset form
    setPromptTitle('')
    setPromptCategory(null)
    setPromptText('')
    setPromptDescription('')
    setShareLevel('user')
    setIsFavorite(false)
  }

  const handleEditPrompt = (prompt, categoryId) => {
    setDialogOpen(true)
    setDialogMode('edit')
    setEditingPrompt(prompt)
    setEditingPromptCategory(categoryId)
    // Find the category name
    const category = promptCategories.find(c => c.id === categoryId)
    // Populate form with prompt data
    setPromptTitle(prompt.title)
    setPromptCategory(category?.name || null)
    setPromptText(prompt.description)
    setPromptDescription('')
    setShareLevel('user')
    setIsFavorite(favoritePromptIds.has(prompt.id))
  }

  const handleDeletePrompt = (prompt, categoryId) => {
    setPromptToDelete(prompt)
    setPromptToDeleteCategory(categoryId)
    setDeleteDialogOpen(true)
  }

  const handleSchedulePrompt = (prompt) => {
    navigate('/studio/recurring/new', {
      state: {
        promptId: prompt.id,
        promptTitle: prompt.title,
        promptText: prompt.description,
      },
    })
  }

  const handleToggleFavorite = (prompt) => {
    setFavoritePromptIds(prev => {
      const newSet = new Set(prev)
      if (newSet.has(prompt.id)) {
        newSet.delete(prompt.id)
      } else {
        newSet.add(prompt.id)
      }
      return newSet
    })
  }

  const handleConfirmDelete = () => {
    if (promptToDelete && promptToDeleteCategory) {
      // Remove the prompt from the category
      setPromptCategories(prev =>
        prev.map(category => {
          if (category.id === promptToDeleteCategory) {
            return {
              ...category,
              prompts: category.prompts.filter(p => p.id !== promptToDelete.id)
            }
          }
          return category
        })
      )
      // Also remove from favorites if it was favorited
      setFavoritePromptIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(promptToDelete.id)
        return newSet
      })
    }
    setDeleteDialogOpen(false)
    setPromptToDelete(null)
    setPromptToDeleteCategory(null)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setEditingPrompt(null)
    setEditingPromptCategory(null)
  }

  const handleSavePrompt = () => {
    if (dialogMode === 'edit' && editingPrompt) {
      // Update existing prompt
      setPromptCategories(prev =>
        prev.map(category => {
          if (category.id === editingPromptCategory) {
            return {
              ...category,
              prompts: category.prompts.map(p =>
                p.id === editingPrompt.id
                  ? { ...p, title: promptTitle, description: promptText }
                  : p
              )
            }
          }
          return category
        })
      )
      // Update favorite status
      if (isFavorite) {
        setFavoritePromptIds(prev => new Set([...prev, editingPrompt.id]))
      } else {
        setFavoritePromptIds(prev => {
          const newSet = new Set(prev)
          newSet.delete(editingPrompt.id)
          return newSet
        })
      }
      handleCloseDialog()
    } else {
      // Create new prompt
      const newPromptId = `custom-${Date.now()}`
      const newPrompt = {
        id: newPromptId,
        title: promptTitle,
        description: promptText,
      }

      // Find or create the category
      const targetCategoryName = promptCategory || 'Analysis & Reporting'
      const existingCategory = promptCategories.find(c => c.name === targetCategoryName)

      if (existingCategory) {
        // Add to existing category
        setPromptCategories(prev =>
          prev.map(category => {
            if (category.id === existingCategory.id) {
              return {
                ...category,
                prompts: [...category.prompts, newPrompt]
              }
            }
            return category
          })
        )
      } else {
        // Create new category
        const newCategoryId = `category-${Date.now()}`
        setPromptCategories(prev => [
          ...prev,
          {
            id: newCategoryId,
            name: targetCategoryName,
            prompts: [newPrompt]
          }
        ])
        // Expand the new category
        setExpandedCategories(prev => [...prev, newCategoryId])
      }

      // Add to favorites if checked
      if (isFavorite) {
        setFavoritePromptIds(prev => new Set([...prev, newPromptId]))
      }

      setLastCreatedPrompt(newPrompt)
      handleCloseDialog()
      setSnackbarOpen(true)
    }
  }

  // Recurring prompts handlers
  const handleDeleteRecurring = (event, promptId) => {
    if (event) event.stopPropagation()
    setSelectedRecurringPrompt(recurringPrompts.find((p) => p.id === promptId))
    setDeleteRecurringDialogOpen(true)
  }

  const confirmDeleteRecurring = () => {
    if (selectedRecurringPrompt) {
      setRecurringPrompts(recurringPrompts.filter((p) => p.id !== selectedRecurringPrompt.id))
    }
    setDeleteRecurringDialogOpen(false)
    setSelectedRecurringPrompt(null)
  }

  const handleStatusToggle = (event, promptId) => {
    if (event) event.stopPropagation()
    setRecurringPrompts(
      recurringPrompts.map((p) => {
        if (p.id === promptId) {
          const newStatus = p.status === 'active' ? 'paused' : 'active'
          return {
            ...p,
            status: newStatus,
            nextRun: newStatus === 'paused' ? '—' : 'Pending...',
          }
        }
        return p
      })
    )
  }

  const handleRowClick = (promptId) => {
    navigate(`/studio/recurring/${promptId}`)
  }

  // Filter and sort recurring prompts
  const filteredRecurringPrompts = useMemo(() => {
    return recurringPrompts
      .filter((prompt) =>
        prompt.promptName.toLowerCase().includes(recurringSearchQuery.toLowerCase())
      )
      .sort((a, b) => a.promptName.toLowerCase().localeCompare(b.promptName.toLowerCase()))
  }, [recurringPrompts, recurringSearchQuery])

  const canSave = promptTitle.trim().length > 0 && promptText.trim().length > 0

  return (
    <Box sx={{ height: 'calc(100vh)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Top Toolbar */}
      <Box
        sx={{
          backgroundColor: 'background.paper',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: 2,
            py: 1,
            minHeight: 48,
          }}
        >
          {/* Back Button */}
          <Tooltip title="Back to Studio">
            <IconButton
              size="small"
              onClick={() => navigate('/studio')}
              sx={{ color: 'text.secondary', p: 0.5 }}
            >
              <ArrowBackIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>
          <Divider orientation="vertical" flexItem />

          {/* Page Title */}
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Prompt Library
          </Typography>

          {/* Spacer */}
          <Box sx={{ flex: 1 }} />

          {/* Schedule Prompt */}
          <Button
            variant="text"
            size="small"
            startIcon={<NotificationAddOutlinedIcon />}
            onClick={() => navigate('/studio/recurring/new')}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              color: 'text.primary',
            }}
          >
            Schedule Prompt
          </Button>

          {/* Create Button */}
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            onClick={handleOpenDialog}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Create New Prompt
          </Button>
        </Box>
        <Divider />

        {/* Tabs - under toolbar */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            px: 2,
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              minWidth: 'auto',
              px: 3,
            },
          }}
        >
          <Tab label="Prompt Templates" />
          <Tab
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                Scheduled Prompts
                <Indicator label="Beta" size="small" color="blue" />
              </Box>
            }
          />
        </Tabs>
        <Divider />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          backgroundColor: 'grey.50',
        }}
      >
        <Box sx={{ maxWidth: 900, mx: 'auto', px: 3, py: 3 }}>
          {/* Prompt Templates Tab */}
          {activeTab === 0 && (
            <>
              {/* Chat Input - only for Prompt Templates */}
              <TextField
                fullWidth
                placeholder="Ask anything..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                multiline
                maxRows={4}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        color="primary"
                      >
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 50,
                    backgroundColor: 'background.paper',
                    paddingLeft: 3,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  },
                }}
              />

              <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 3, p: 3 }}>
                {/* Category Accordions */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {promptCategories.map((category) => (
                    <Accordion
                      key={category.id}
                      expanded={expandedCategories.includes(category.id)}
                      onChange={() => handleCategoryToggle(category.id)}
                      elevation={0}
                      disableGutters
                      sx={{
                        backgroundColor: 'transparent',
                        '&:before': { display: 'none' },
                        '& .MuiAccordionSummary-root': {
                          minHeight: 48,
                          px: 0,
                        },
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: 'secondary.main' }} />}
                        sx={{
                          '& .MuiAccordionSummary-content': {
                            margin: 0,
                          },
                        }}
                      >
                        <MiraGradientText variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {category.name}
                        </MiraGradientText>
                      </AccordionSummary>
                      <AccordionDetails sx={{ px: 0, pt: 0, pb: 2 }}>
                        {category.prompts.length > 0 ? (
                          <Box
                            sx={{
                              display: 'grid',
                              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                              gap: 2,
                            }}
                          >
                            {category.prompts.map((prompt) => (
                              <PromptCard
                                key={prompt.id}
                                prompt={prompt}
                                isFavorite={favoritePromptIds.has(prompt.id)}
                                onUse={handleUsePrompt}
                                onEdit={(p) => handleEditPrompt(p, category.id)}
                                onDelete={(p) => handleDeletePrompt(p, category.id)}
                                onSchedule={handleSchedulePrompt}
                                onToggleFavorite={handleToggleFavorite}
                              />
                            ))}
                          </Box>
                        ) : (
                          <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                            No prompts in this category yet.
                          </Typography>
                        )}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Box>
              </Paper>
            </>
          )}

          {/* Scheduled Prompts Tab */}
          {activeTab === 1 && (
            <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
                {/* Empty State */}
                {filteredRecurringPrompts.length === 0 && !recurringSearchQuery ? (
                  <Box sx={{ p: 8, textAlign: 'center' }}>
                    <ScheduleSendIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      No Scheduled Prompts Yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      Schedule prompts to be delivered automatically via email on your preferred schedule.
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      startIcon={<AddIcon />}
                      onClick={() => navigate('/studio/recurring/new')}
                      sx={{
                        textTransform: 'none',
                        fontWeight: 500,
                      }}
                    >
                      Create Scheduled Prompt
                    </Button>
                  </Box>
                ) : (
                  <>
                    {/* Header */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        px: 2,
                        py: 1.5,
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {filteredRecurringPrompts.length} {filteredRecurringPrompts.length === 1 ? 'Scheduled Prompt' : 'Scheduled Prompts'}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: '20px',
                            px: 2,
                            py: 0.5,
                            minWidth: 140,
                            backgroundColor: 'background.paper',
                          }}
                        >
                          <SearchIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 1 }} />
                          <InputBase
                            placeholder="Find"
                            value={recurringSearchQuery}
                            onChange={(e) => setRecurringSearchQuery(e.target.value)}
                            sx={{ flex: 1, fontSize: 14 }}
                          />
                        </Box>
                      </Box>
                    </Box>

                    {/* Minimal list */}
                    <Box>
                        {filteredRecurringPrompts.map((prompt, index) => (
                          <Box
                            key={prompt.id}
                            onClick={() => handleRowClick(prompt.id)}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              px: 2,
                              py: 2,
                              cursor: 'pointer',
                              borderBottom: index < filteredRecurringPrompts.length - 1 ? '1px solid' : 'none',
                              borderColor: 'divider',
                              '&:hover': {
                                backgroundColor: 'action.hover',
                              },
                              '& .action-buttons': { opacity: 0 },
                              '&:hover .action-buttons': { opacity: 1 },
                            }}
                          >
                            {/* Left: Title + status dot */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0, flex: 1 }}>
                              <Box
                                sx={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: '50%',
                                  backgroundColor: prompt.status === 'active' ? 'success.main' : 'warning.main',
                                  flexShrink: 0,
                                }}
                              />
                              <Typography
                                variant="body1"
                                sx={{
                                  fontWeight: 500,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {prompt.promptName}
                              </Typography>
                            </Box>

                            {/* Right: Schedule summary + chevron */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
                              <Stack direction="row" spacing={0.5} className="action-buttons">
                                <Tooltip title={prompt.status === 'active' ? 'Pause' : 'Resume'}>
                                  <IconButton
                                    size="small"
                                    onClick={(e) => handleStatusToggle(e, prompt.id)}
                                    sx={{ color: 'text.secondary' }}
                                  >
                                    {prompt.status === 'active' ? <PauseIcon fontSize="small" /> : <PlayArrowIcon fontSize="small" />}
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                  <IconButton size="small" onClick={(e) => handleDeleteRecurring(e, prompt.id)} sx={{ color: 'text.secondary' }}>
                                    <DeleteOutlineIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Stack>
                              <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
                                {formatSchedule(prompt.schedule).split(' at ')[0]}
                              </Typography>
                              <ChevronRightIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                            </Box>
                          </Box>
                        ))}
                    </Box>

                    {/* No results state */}
                    {filteredRecurringPrompts.length === 0 && recurringSearchQuery && (
                      <Box sx={{ p: 4, textAlign: 'center' }}>
                        <Typography variant="body1" color="text.secondary">
                          No scheduled prompts match "{recurringSearchQuery}"
                        </Typography>
                      </Box>
                    )}
                  </>
                )}
            </Paper>
          )}

          {/* Footer */}
          <Box sx={{ pt: 4, pb: 3 }}>
            {/* Section Title with Dividers */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Divider sx={{ flex: 1 }} />
              <Typography
                variant="body2"
                sx={{
                  px: 2,
                  color: 'text.secondary',
                  fontWeight: 500,
                }}
              >
                More from Mira
              </Typography>
              <Divider sx={{ flex: 1 }} />
            </Box>

            {/* Cards */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 2,
              }}
            >
              {/* Mira Projects Card */}
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: 'divider',
                  ...getMiraGradientBorderSx(1),
                  '&::before': {
                    ...getMiraGradientBorderSx(1)['&::before'],
                    opacity: 0,
                    transition: 'opacity 0.2s ease',
                  },
                  '&:hover::before': {
                    opacity: 1,
                  },
                }}
                onClick={() => navigate('/studio/projects')}
              >
                <MenuBookOutlinedIcon sx={{ color: 'secondary.main', mr: 2 }} />
                <Typography variant="body1" sx={{ fontWeight: 500, flex: 1 }}>
                  Mira Projects
                </Typography>
                <ChevronRightIcon sx={{ color: 'text.secondary' }} />
              </Paper>

              {/* Mira Studio Help Card */}
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: 'divider',
                  ...getMiraGradientBorderSx(1),
                  '&::before': {
                    ...getMiraGradientBorderSx(1)['&::before'],
                    opacity: 0,
                    transition: 'opacity 0.2s ease',
                  },
                  '&:hover::before': {
                    opacity: 1,
                  },
                }}
                onClick={() => {}}
              >
                <HelpOutlineIcon sx={{ color: 'secondary.main', mr: 2 }} />
                <Typography variant="body1" sx={{ fontWeight: 500, flex: 1 }}>
                  Mira Studio Help
                </Typography>
                <ChevronRightIcon sx={{ color: 'text.secondary' }} />
              </Paper>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Create/Edit Prompt Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            maxWidth: 540,
            maxHeight: '90vh',
            overflow: 'hidden',
          }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {dialogMode === 'edit' ? 'Edit Prompt' : 'Create New Prompt'}
            </Typography>
            <IconButton size="small" onClick={handleCloseDialog}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </DialogTitle>

        <Divider />

        <DialogContent sx={{ p: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              flex: 1,
              overflow: 'auto',
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 2.5,
            }}
          >
            <TextField
              fullWidth
              label="Prompt Title"
              placeholder="Create a title"
              value={promptTitle}
              onChange={(e) => setPromptTitle(e.target.value)}
              required
              autoFocus
            />

            <Autocomplete
              freeSolo
              options={categoryOptions}
              value={promptCategory}
              onChange={(e, newValue) => setPromptCategory(newValue)}
              onInputChange={(e, newValue) => setPromptCategory(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  placeholder="Select or create a category"
                />
              )}
            />

            <TextField
              fullWidth
              label="Prompt"
              placeholder="Enter your prompt text..."
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              required
              multiline
              rows={4}
            />

            <TextField
              fullWidth
              label="Description (optional)"
              placeholder="Brief description of what this prompt does"
              value={promptDescription}
              onChange={(e) => setPromptDescription(e.target.value)}
              multiline
              rows={2}
            />

            {/* Share Level */}
            <Box sx={{ pt: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5, color: 'text.secondary' }}>
                VISIBILITY
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  value={shareLevel}
                  onChange={(e) => setShareLevel(e.target.value)}
                  sx={{ gap: 1 }}
                >
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 1.5,
                      cursor: 'pointer',
                      borderColor: shareLevel === 'user' ? 'primary.main' : 'divider',
                      backgroundColor: shareLevel === 'user' ? 'action.selected' : 'transparent',
                    }}
                    onClick={() => setShareLevel('user')}
                  >
                    <FormControlLabel
                      value="user"
                      control={<Radio size="small" />}
                      label={
                        <Box sx={{ ml: 0.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>Only me</Typography>
                          <Typography variant="caption" color="text.secondary">Private to your account</Typography>
                        </Box>
                      }
                      sx={{ m: 0, alignItems: 'flex-start' }}
                    />
                  </Paper>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 1.5,
                      cursor: 'pointer',
                      borderColor: shareLevel === 'workspace' ? 'primary.main' : 'divider',
                      backgroundColor: shareLevel === 'workspace' ? 'action.selected' : 'transparent',
                    }}
                    onClick={() => setShareLevel('workspace')}
                  >
                    <FormControlLabel
                      value="workspace"
                      control={<Radio size="small" />}
                      label={
                        <Box sx={{ ml: 0.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>Workspace</Typography>
                          <Typography variant="caption" color="text.secondary">Shared with your workspace</Typography>
                        </Box>
                      }
                      sx={{ m: 0, alignItems: 'flex-start' }}
                    />
                  </Paper>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 1.5,
                      cursor: 'pointer',
                      borderColor: shareLevel === 'company' ? 'primary.main' : 'divider',
                      backgroundColor: shareLevel === 'company' ? 'action.selected' : 'transparent',
                    }}
                    onClick={() => setShareLevel('company')}
                  >
                    <FormControlLabel
                      value="company"
                      control={<Radio size="small" />}
                      label={
                        <Box sx={{ ml: 0.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>Company</Typography>
                          <Typography variant="caption" color="text.secondary">Available to everyone</Typography>
                        </Box>
                      }
                      sx={{ m: 0, alignItems: 'flex-start' }}
                    />
                  </Paper>
                </RadioGroup>
              </FormControl>
            </Box>

            {/* Favorite */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={isFavorite}
                  onChange={(e) => setIsFavorite(e.target.checked)}
                />
              }
              label={
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Add to favorites
                </Typography>
              }
            />
          </Box>
        </DialogContent>

        <Divider />

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={handleCloseDialog}
            sx={{ textTransform: 'none', fontWeight: 500 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSavePrompt}
            disabled={!canSave}
            sx={{ textTransform: 'none', fontWeight: 500 }}
          >
            {dialogMode === 'edit' ? 'Save Changes' : 'Create Prompt'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Prompt Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Delete Prompt
            </Typography>
            <IconButton size="small" onClick={() => setDeleteDialogOpen(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </DialogTitle>

        <Divider />

        <DialogContent sx={{ pt: 3 }}>
          <Typography variant="body1">
            Are you sure you want to delete "{promptToDelete?.title}"? This action cannot be undone.
          </Typography>
        </DialogContent>

        <Divider />

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmDelete}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Recurring Prompt Confirmation Dialog */}
      <Dialog
        open={deleteRecurringDialogOpen}
        onClose={() => setDeleteRecurringDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Delete Scheduled Prompt
            </Typography>
            <IconButton size="small" onClick={() => setDeleteRecurringDialogOpen(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 3 }}>
          <Typography variant="body1">
            Are you sure you want to delete "{selectedRecurringPrompt?.promptName}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setDeleteRecurringDialogOpen(false)} sx={{ textTransform: 'none', fontWeight: 500 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={confirmDeleteRecurring}
            sx={{ textTransform: 'none', fontWeight: 500 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Popup Alert */}
      {snackbarOpen && (
        <Alert
          severity="info"
          onClose={() => setSnackbarOpen(false)}
          sx={{
            position: 'fixed',
            top: 16,
            right: 16,
            zIndex: 1400,
            maxWidth: 400,
            boxShadow: 3,
          }}
        >
          <Box>
            Prompt created successfully. Would you like to schedule this prompt for recurring delivery?
            <Box sx={{ mt: 1.5, display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                size="small"
                sx={{ textTransform: 'none', fontWeight: 600 }}
                onClick={() => {
                  setSnackbarOpen(false)
                  if (lastCreatedPrompt) {
                    navigate('/studio/recurring/new', {
                      state: {
                        promptId: lastCreatedPrompt.id,
                        promptTitle: lastCreatedPrompt.title,
                        promptText: lastCreatedPrompt.description,
                      },
                    })
                  } else {
                    navigate('/studio/recurring/new')
                  }
                }}
              >
                Schedule
              </Button>
              <Button
                size="small"
                sx={{
                  color: 'primary.main',
                  textTransform: 'none',
                  fontWeight: 600,
                }}
                onClick={() => setSnackbarOpen(false)}
              >
                Maybe later
              </Button>
            </Box>
          </Box>
        </Alert>
      )}
    </Box>
  )
}

export default PromptLibraryPage

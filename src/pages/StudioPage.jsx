import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  TextField,
  InputAdornment,
  Divider,
  ListItemText,
  ListSubheader,
  Tooltip,
  Tabs,
  Tab,
  Link,
  Paper,
} from '@mui/material'
import HistoryIcon from '@mui/icons-material/History'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import SearchIcon from '@mui/icons-material/Search'
import TuneIcon from '@mui/icons-material/Tune'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import AddIcon from '@mui/icons-material/Add'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import {
  MiraGradientBox,
  MiraPromptCard,
  MiraChatInput,
  MiraPromoBanner,
  MiraFrostedToolbar,
} from '../components/mira'
import { getMiraGradientBorderSx } from '../constants/miraStyles'

function ChatHistorySidebar({ open, onClose, chatOpen = false }) {
  const navigate = useNavigate()
  const chatHistory = [
    { id: 1, title: 'Q4 Campaign Analysis', date: 'Nov 15, 2024', preview: 'Analyzed campaign performance metrics...' },
    { id: 2, title: 'Product Launch Research', date: 'Nov 14, 2024', preview: 'Research findings for upcoming product...' },
    { id: 3, title: 'Weekly Usage Summary', date: 'Nov 13, 2024', preview: 'Generated summary of weekly activities...' },
    { id: 4, title: 'Automation Performance Review', date: 'Nov 12, 2024', preview: 'Reviewed automation workflows and...' },
    { id: 5, title: 'Customer Feedback Analysis', date: 'Nov 10, 2024', preview: 'Analyzed customer feedback trends...' },
  ]

  return (
    <>
      {/* Backdrop */}
      <Box
        onClick={onClose}
        sx={{
          position: 'fixed',
          top: { xs: 56, sm: 64 },
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1249,
          display: { xs: 'block', sm: 'block', md: 'none' },
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
          transition: 'opacity 0.2s ease, visibility 0.2s ease',
        }}
      />

      {/* Panel */}
      <Box
        sx={{
          position: 'fixed',
          top: { xs: 56, sm: 64 },
          right: { xs: 0, sm: 0, md: 0, lg: chatOpen ? '400px' : 0 },
          width: { xs: '100%', sm: '100%', md: '400px', lg: '400px' },
          height: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
          backgroundColor: 'background.paper',
          borderLeft: '1px solid',
          borderTop: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1250,
          boxShadow: 1,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
          transition: 'transform 0.3s ease, opacity 0.3s ease, right 0.3s ease, visibility 0s linear 0.3s',
          ...(open && { transition: 'transform 0.3s ease, opacity 0.3s ease, right 0.3s ease' }),
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Header */}
          <Box
            sx={{
              minHeight: 64,
              px: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Chat History
              </Typography>
            </Box>
            <IconButton
              onClick={onClose}
              size="small"
              sx={{
                width: 32,
                height: 32,
              }}
            >
              <Box
                component="span"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  color: 'text.secondary',
                }}
              >
                ×
              </Box>
            </IconButton>
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
            {/* View All History Link */}
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="text"
                onClick={() => navigate('/history')}
                sx={{
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  color: 'primary.main',
                  fontWeight: 700,
                  p: 0,
                  minWidth: 'auto',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    textDecoration: 'underline',
                  },
                }}
              >
                View All History
              </Button>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {chatHistory.map((chat) => (
                <Box
                  key={chat.id}
                  onClick={() => navigate('/studio/chat', {
                    state: {
                      chatId: chat.id,
                      chatTitle: chat.title,
                    }
                  })}
                  sx={{
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {chat.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                    {chat.date}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}>
                    {chat.preview}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}


function StudioPageV3({ chatOpen = false }) {
  const navigate = useNavigate()
  const [currentProject, setCurrentProject] = useState('')
  const [message, setMessage] = useState('')
  const [historyOpen, setHistoryOpen] = useState(false)
  const [projectSearch, setProjectSearch] = useState('')
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [showChip, setShowChip] = useState(false)
  const [promptTab, setPromptTab] = useState(0)

  // Mock data - replace with real data later (matches ManageProjectsPage)
  const projects = [
    { id: 'proj-1', name: 'Q4 Campaign Analysis' },
    { id: 'proj-2', name: 'Product Launch Research' },
    { id: 'proj-3', name: 'Customer Feedback Review' },
    { id: 'proj-4', name: 'Market Research Initiative' },
    { id: 'proj-5', name: 'Product Roadmap Planning' },
    { id: 'proj-6', name: 'User Experience Study' },
    { id: 'proj-7', name: 'Competitive Analysis' },
    { id: 'proj-8', name: 'Brand Strategy Review' },
  ]

  // Core prompts data
  const corePrompts = [
    { id: 1, icon: <SummarizeOutlinedIcon />, title: 'Summarize Document', description: 'Create a concise summary of any document or text' },
    { id: 2, icon: <BarChartOutlinedIcon />, title: 'Analyze Data', description: 'Get insights and analysis from your data sets' },
    { id: 3, icon: <CreateOutlinedIcon />, title: 'Draft Content', description: 'Write emails, reports, or marketing copy' },
    { id: 4, icon: <CodeOutlinedIcon />, title: 'Explain Code', description: 'Understand code snippets and get explanations' },
    { id: 5, icon: <LightbulbOutlinedIcon />, title: 'Brainstorm Ideas', description: 'Generate creative ideas for projects or problems' },
    { id: 6, icon: <DescriptionOutlinedIcon />, title: 'Review Document', description: 'Get feedback and suggestions for improvement' },
  ]

  // Filter projects based on search
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(projectSearch.toLowerCase())
  )

  // Limit displayed projects (5 initially, then show all when "Show More" clicked)
  const displayedProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 5)
  const hasMoreProjects = filteredProjects.length > 5

  const handleProjectChange = (event) => {
    const value = event.target.value || ''
    if (value === 'manage') {
      navigate('/studio/projects')
      return
    }
    if (value === 'add') {
      console.log('Add new project')
      return
    }
    setCurrentProject(value)
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      const projectName = currentProject ? projects.find(p => p.id === currentProject)?.name : null
      navigate('/studio/chat', {
        state: {
          message: message.trim(),
          projectId: currentProject || null,
          projectName: projectName,
        }
      })
    }
  }

  const handlePromptClick = (prompt) => {
    setMessage(prompt.title + ': ')
  }

  // Delay chip appearance for stagger effect
  useEffect(() => {
    if (currentProject) {
      setShowChip(false)
      const timer = setTimeout(() => {
        setShowChip(true)
      }, 75)
      return () => clearTimeout(timer)
    } else {
      setShowChip(false)
    }
  }, [currentProject])

  return (
    <Box sx={{ height: 'calc(100vh)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Top Section */}
      <MiraFrostedToolbar>
        {/* Top Toolbar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            px: 2,
            py: 1.5,
            minHeight: 48,
          }}
        >
          {/* Project Selector */}
          <FormControl size="small" sx={{ minWidth: 220 }}>
            <Select
              value={currentProject || ''}
              onChange={handleProjectChange}
              displayEmpty
              variant="standard"
              disableUnderline
              startAdornment={<FolderOpenIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />}
              renderValue={(value) => {
                if (!value || value === '') {
                  return 'Select Project'
                }
                return projects.find(p => p.id === value)?.name || ''
              }}
              sx={{
                fontWeight: 700,
                '& .MuiSelect-select': {
                  paddingBottom: 0,
                  paddingRight: '32px !important',
                },
                '& .MuiSelect-icon': {
                  color: 'text.secondary',
                  fontSize: '18px',
                  right: '0px',
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    minWidth: 300,
                    '& .MuiMenuItem-root.search-field': {
                      '&:hover': {
                        backgroundColor: 'transparent',
                      },
                      cursor: 'default',
                    },
                  },
                },
                MenuListProps: {
                  sx: {
                    minWidth: 300,
                  },
                },
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left',
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left',
                },
              }}
            >
              {/* Find/Search Bar */}
              <MenuItem
                className="search-field"
                disableRipple
                onKeyDown={(e) => e.stopPropagation()}
                sx={{
                  padding: 0,
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                }}
              >
                <TextField
                  size="small"
                  fullWidth
                  placeholder="Find..."
                  value={projectSearch || ''}
                  onChange={(e) => {
                    setProjectSearch(e.target.value || '')
                    setShowAllProjects(false)
                  }}
                  onClick={(e) => e.stopPropagation()}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '0.875rem',
                      borderRadius: 0,
                      '& fieldset': {
                        border: 'none',
                      },
                      paddingTop: 0,
                      paddingBottom: 0,
                    },
                    '& .MuiInputBase-input': {
                      paddingTop: '8px',
                      paddingBottom: '8px',
                    },
                  }}
                />
              </MenuItem>

              <Divider />

              {/* Actions Subheader */}
              <ListSubheader sx={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'text.secondary',
                textTransform: 'uppercase',
                lineHeight: '32px',
              }}>
                Actions
              </ListSubheader>

              {/* Create Project */}
              <MenuItem value="add" sx={{ gap: '8px' }}>
                <AddCircleOutlineIcon fontSize="small" sx={{ color: 'primary.main' }} />
                <ListItemText
                  primary="Create Project"
                  primaryTypographyProps={{
                    sx: {
                      color: 'primary.main',
                      fontWeight: 700,
                      fontSize: '16px',
                      lineHeight: '22px',
                    }
                  }}
                />
              </MenuItem>

              {/* Manage Projects */}
              <MenuItem value="manage" sx={{ gap: '8px' }}>
                <TuneIcon fontSize="small" sx={{ color: 'primary.main' }} />
                <ListItemText
                  primary="Manage Projects"
                  primaryTypographyProps={{
                    sx: {
                      color: 'primary.main',
                      fontWeight: 700,
                      fontSize: '16px',
                      lineHeight: '22px',
                    }
                  }}
                />
              </MenuItem>

              <Divider sx={{ my: 0.5 }} />

              {/* Projects Subheader with Clear */}
              <ListSubheader sx={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'text.secondary',
                textTransform: 'uppercase',
                lineHeight: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                Projects
                <Tooltip title="No project to clear" disableHoverListener={!!currentProject}>
                  <span>
                    <Button
                      size="small"
                      disabled={!currentProject}
                      onClick={(e) => {
                        e.stopPropagation()
                        setCurrentProject('')
                      }}
                      sx={{
                        textTransform: 'none',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: 'primary.main',
                        minWidth: 'auto',
                        padding: 0,
                        '&:hover': {
                          backgroundColor: 'transparent',
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      Clear
                    </Button>
                  </span>
                </Tooltip>
              </ListSubheader>

              {/* Project List */}
              {displayedProjects.map((project) => (
                <MenuItem key={project.id} value={project.id}>
                  {project.name}
                </MenuItem>
              ))}

              {/* Show More */}
              {!showAllProjects && hasMoreProjects && (
                <MenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowAllProjects(true)
                  }}
                >
                  <ListItemText
                    primary="Show More"
                    primaryTypographyProps={{
                      sx: {
                        color: 'primary.main',
                        fontWeight: 700,
                      }
                    }}
                  />
                </MenuItem>
              )}
            </Select>
          </FormControl>

          {/* Toolbar Action Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
            {/* Prompt Library */}
            <Button
              variant="text"
              size="small"
              startIcon={<MenuBookOutlinedIcon />}
              onClick={() => navigate('/studio/library')}
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                color: 'text.primary',
                pl: 0,
              }}
            >
              Prompt Library
            </Button>
            <Button
              variant="text"
              size="small"
              startIcon={<HistoryIcon />}
              onClick={() => setHistoryOpen(true)}
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                color: 'text.primary',
                pl: 0,
              }}
            >
              Chat History
            </Button>
          </Box>
        </Box>
      </MiraFrostedToolbar>

      {/* Main Content Area */}
      <MiraGradientBox variant="full" opacity={0.5} sx={{ flex: 1, overflow: 'auto' }}>
        <Box sx={{ maxWidth: 900, mx: 'auto', px: 3, py: 4, pt: '15vh' }}>
          {/* Chat Input */}
          <Box sx={{ mb: 4 }}>
            {/* Chat Input Field */}
            <MiraChatInput
              value={message}
              onChange={setMessage}
              onSend={handleSendMessage}
              placeholder="Ask anything..."
              maxRows={4}
            />

            {/* Current Project Indicator */}
            {currentProject && showChip && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mt: 1.5,
                  justifyContent: 'center',
                  animation: 'fadeIn 0.15s ease-in',
                  '@keyframes fadeIn': {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                  },
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  Current project:
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 500 }}>
                  {projects.find((p) => p.id === currentProject)?.name}
                </Typography>
                <Link
                  component="button"
                  variant="caption"
                  onClick={() => setCurrentProject(null)}
                  sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  Clear
                </Link>
              </Box>
            )}
          </Box>

          {/* Promo Banner */}
          <MiraPromoBanner
            icon={<FolderOutlinedIcon />}
            title="Introducing Mira Projects"
            description="Tell us more about who you are and leverage your existing searches and filters to improve results"
            actionLabel="Try Now"
            onAction={() => navigate('/studio/projects')}
            sx={{ mb: 4 }}
          />

          {/* Prompts Section */}
          <Box sx={{ mb: 4 }}>
            {/* Tabs - Centered */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Tabs
                value={promptTab}
                onChange={(e, v) => setPromptTab(v)}
                sx={{
                  mb: 2,
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 600,
                    minWidth: 'auto',
                    px: 2,
                    color: 'text.secondary',
                    '&.Mui-selected': {
                      color: 'text.primary',
                    },
                  },
                }}
              >
                <Tab label="Core Prompts" />
                <Tab label="Favorite Prompts" />
              </Tabs>
            </Box>

            {/* Prompt Cards Grid */}
            {promptTab === 0 && (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                  gap: 2,
                }}
              >
                {corePrompts.map((prompt) => (
                  <MiraPromptCard
                    key={prompt.id}
                    icon={prompt.icon}
                    title={prompt.title}
                    description={prompt.description}
                    onClick={() => handlePromptClick(prompt)}
                  />
                ))}
              </Box>
            )}

            {/* Favorite Prompts Empty State */}
            {promptTab === 1 && (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5 }}>
                  No Favorite Prompts Yet
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Choose your favorites from our{' '}
                  <Link href="/studio/library" underline="always" sx={{ color: 'text.primary', fontWeight: 500 }}>
                    extensive library
                  </Link>{' '}
                  or create your own for quick access
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => navigate('/studio/library?create=true')}
                  sx={{ textTransform: 'none', fontWeight: 600 }}
                >
                  Create Prompt
                </Button>
              </Box>
            )}
          </Box>

          {/* More from Mira Footer */}
          <Box sx={{ pt: 4, pb: 2 }}>
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
                mb: 3,
              }}
            >
              {/* Mira Prompt Library Card */}
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  backgroundColor: 'background.paper',
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
                onClick={() => navigate('/studio/library')}
              >
                <MenuBookOutlinedIcon sx={{ color: 'secondary.main', mr: 2 }} />
                <Typography variant="body1" sx={{ fontWeight: 500, flex: 1 }}>
                  Mira Prompt Library
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
                  backgroundColor: 'background.paper',
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

            {/* Share Feedback Link */}
            <Box sx={{ textAlign: 'center' }}>
              <Link
                href="#"
                underline="hover"
                sx={{
                  color: 'primary.main',
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                Share feedback
              </Link>
            </Box>
          </Box>
        </Box>
      </MiraGradientBox>

      {/* Chat History Flyout Sidebar */}
      <ChatHistorySidebar
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        chatOpen={chatOpen}
      />
    </Box>
  )
}

export default StudioPageV3

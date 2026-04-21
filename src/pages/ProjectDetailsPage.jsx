import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Paper,
  Divider,
  Menu,
  Checkbox,
  Switch,
  FormControlLabel,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SaveIcon from '@mui/icons-material/Save'
import SettingsIcon from '@mui/icons-material/Settings'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import CloseIcon from '@mui/icons-material/Close'
import StarIcon from '@mui/icons-material/Star'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import Indicator from '../components/core/Indicator'

function ProjectDetailsPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { projectId } = useParams()
  const isNewProject = projectId === 'new'

  // Get the project name from navigation state (if creating new project)
  const initialProjectName = location.state?.projectName || ''

  // Mock projects list (shared with ManageProjectsPage)
  const allProjects = [
    {
      id: 'proj-1',
      name: 'Q4 Campaign Analysis',
      description: 'Focus on engagement metrics and ROI',
      lastUsed: '2 hours ago',
      isActive: true,
      scope: 'personal',
    },
    {
      id: 'proj-2',
      name: 'Product Launch Research',
      description: 'Analyze competitor positioning and customer feedback',
      lastUsed: '1 day ago',
      isActive: false,
      scope: 'company',
    },
    {
      id: 'proj-3',
      name: 'Customer Feedback Review',
      description: 'Review Q4 customer satisfaction surveys',
      lastUsed: '3 days ago',
      isActive: false,
      scope: 'workspace',
    },
    {
      id: 'proj-4',
      name: 'Market Research Initiative',
      description: '',
      lastUsed: '5 days ago',
      isActive: false,
      scope: 'company',
    },
    {
      id: 'proj-5',
      name: 'Product Roadmap Planning',
      description: 'Plan features for 2026 releases',
      lastUsed: '1 week ago',
      isActive: false,
      scope: 'personal',
    },
    {
      id: 'proj-6',
      name: 'User Experience Study',
      description: '',
      lastUsed: '1 week ago',
      isActive: false,
      scope: 'workspace',
    },
    {
      id: 'proj-7',
      name: 'Competitive Analysis',
      description: 'Track competitor features and pricing',
      lastUsed: '2 weeks ago',
      isActive: false,
      scope: 'company',
    },
    {
      id: 'proj-8',
      name: 'Brand Strategy Review',
      description: '',
      lastUsed: '2 weeks ago',
      isActive: false,
      scope: 'personal',
    },
  ]

  // Find current project
  const currentProject = allProjects.find((p) => p.id === projectId) || {
    id: 'new',
    name: initialProjectName || 'New Project',
  }

  // Mock data - replace with real data later
  const [projectName, setProjectName] = useState(initialProjectName)
  const [instructions, setInstructions] = useState('')
  const [hasChanges, setHasChanges] = useState(initialProjectName ? true : false)

  // Project switcher menu
  const [projectMenuAnchor, setProjectMenuAnchor] = useState(null)
  const projectMenuOpen = Boolean(projectMenuAnchor)

  // Visibility settings
  const [visibilityMenuOpen, setVisibilityMenuOpen] = useState(false)
  const [, setVisibilityAnchor] = useState(null)
  const [isPersonalDefault, setIsPersonalDefault] = useState(false)
  const [visibility, setVisibility] = useState({
    personal: { visible: true, isDefault: false },
    company: { visible: false, isDefault: false },
    workspace: { visible: false, isDefault: false },
  })

  // Rename modal
  const [renameDialogOpen, setRenameDialogOpen] = useState(false)
  const [renameValue, setRenameValue] = useState('')
  const [renameSetAsDefault, setRenameSetAsDefault] = useState(false)

  useEffect(() => {
    if (!isNewProject) {
      // Mock loading existing project data
      const mockProjects = {
        'proj-1': {
          name: 'Q4 Campaign Analysis',
          instructions:
            'Focus on engagement metrics and ROI. Include data from October-December timeframe.',
        },
        'proj-2': {
          name: 'Product Launch Research',
          instructions: 'Analyze competitor positioning and customer feedback on new features.',
        },
      }
      const project = mockProjects[projectId]
      if (project) {
        setProjectName(project.name)
        setInstructions(project.instructions)
      }
    }
  }, [projectId, isNewProject])

  const handleSave = () => {
    // Mock save - add real save logic later
    console.log('Saving project:', { projectName, instructions })
    setHasChanges(false)
    navigate('/studio/projects')
  }

  const handleCancel = () => {
    navigate('/studio/projects')
  }

  const handleFieldChange = (setter) => (event) => {
    setter(event.target.value)
    setHasChanges(true)
  }

  const handlePersonalDefaultToggle = (event) => {
    setIsPersonalDefault(event.target.checked)
    setHasChanges(true)
  }

  const handleVisibilityMenuOpen = (event) => {
    setVisibilityAnchor(event.currentTarget)
    setVisibilityMenuOpen(true)
  }

  const handleVisibilityMenuClose = () => {
    setVisibilityMenuOpen(false)
  }

  const handleVisibilityToggle = (scope) => {
    setVisibility((prev) => ({
      ...prev,
      [scope]: {
        ...prev[scope],
        visible: !prev[scope].visible,
      },
    }))
    setHasChanges(true)
  }

  const handleDefaultToggle = (scope) => {
    setVisibility((prev) => ({
      ...prev,
      [scope]: {
        ...prev[scope],
        isDefault: !prev[scope].isDefault,
      },
    }))
    setHasChanges(true)
  }

  const handleProjectMenuOpen = (event) => {
    setProjectMenuAnchor(event.currentTarget)
  }

  const handleProjectMenuClose = () => {
    setProjectMenuAnchor(null)
  }

  const handleRenameOpen = () => {
    setRenameValue(projectName)
    setRenameSetAsDefault(isPersonalDefault)
    setRenameDialogOpen(true)
    handleProjectMenuClose()
  }

  const handleRenameClose = () => {
    setRenameDialogOpen(false)
    setRenameValue('')
    setRenameSetAsDefault(false)
  }

  const handleRenameSave = () => {
    setProjectName(renameValue)
    setIsPersonalDefault(renameSetAsDefault)
    setHasChanges(true)
    handleRenameClose()
  }

  const handleSetAsDefault = () => {
    setIsPersonalDefault(!isPersonalDefault)
    setHasChanges(true)
    handleProjectMenuClose()
  }

  const handleDeleteProject = () => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      // In real implementation, delete the project and navigate away
      navigate('/studio/projects')
    }
    handleProjectMenuClose()
  }

  return (
    <Box sx={{ height: 'calc(100vh)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Top Toolbar - Sticky */}
      <Box sx={{
        backgroundColor: 'background.paper',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 2,
          py: 1,
        }}>
          {/* Back Button */}
          <Tooltip title="Back to Projects">
            <IconButton size="small" onClick={handleCancel} sx={{ color: 'text.secondary', p: 0.5 }}>
              <ArrowBackIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>
          <Divider orientation="vertical" flexItem />

          {/* Project Switcher */}
          <Box
            onClick={isNewProject ? undefined : handleProjectMenuOpen}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              cursor: isNewProject ? 'default' : 'pointer',
              px: 1,
              py: 0.5,
              borderRadius: 1,
              ...(!isNewProject && {
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }),
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              {currentProject.name}
            </Typography>
            {!isNewProject && (
              <ArrowDropDownIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
            )}
          </Box>

          {/* Spacer */}
          <Box sx={{ flex: 1 }} />

          {/* Action Buttons */}
          {!isNewProject && (
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <Select
              value=""
              displayEmpty
              variant="standard"
              disableUnderline
              open={visibilityMenuOpen}
              onOpen={handleVisibilityMenuOpen}
              onClose={handleVisibilityMenuClose}
              startAdornment={<SettingsIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />}
              renderValue={() => 'Project Settings'}
              sx={{
                fontWeight: 700,
                fontSize: '0.875rem',
                '& .MuiSelect-select': {
                  paddingBottom: 0,
                },
                '& .MuiSelect-icon': {
                  color: 'text.secondary',
                  fontSize: '18px',
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    minWidth: 300,
                    p: 0.5,
                  },
                },
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'right',
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'right',
                },
              }}
            >
              {/* Custom menu content */}
              <MenuItem disableRipple sx={{ '&:hover': { backgroundColor: 'transparent' }, cursor: 'default', p: 2 }}>
                <Box sx={{ width: '100%' }}>
                  {/* Header */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', letterSpacing: '0.5px' }}>
                      VISIBLE TO
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', letterSpacing: '0.5px' }}>
                        IS DEFAULT
                      </Typography>
                      <Tooltip title="Make this project the default for users in the selected scope">
                        <InfoOutlinedIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                      </Tooltip>
                    </Box>
                  </Box>

                  {/* Visibility Options */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    {/* Personal */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 0.5 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            checked={visibility.personal.visible}
                            onChange={() => handleVisibilityToggle('personal')}
                          />
                        }
                        label={
                          <Typography variant="body2">
                            Personal
                          </Typography>
                        }
                        sx={{ m: 0 }}
                      />
                      <Switch
                        size="small"
                        checked={visibility.personal.isDefault}
                        onChange={() => handleDefaultToggle('personal')}
                        disabled={!visibility.personal.visible}
                      />
                    </Box>

                    {/* Company */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 0.5 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            checked={visibility.company.visible}
                            onChange={() => handleVisibilityToggle('company')}
                          />
                        }
                        label={
                          <Typography variant="body2">
                            Company
                          </Typography>
                        }
                        sx={{ m: 0 }}
                      />
                      <Switch
                        size="small"
                        checked={visibility.company.isDefault}
                        onChange={() => handleDefaultToggle('company')}
                        disabled={!visibility.company.visible}
                      />
                    </Box>

                    {/* Workspace */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 0.5 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            checked={visibility.workspace.visible}
                            onChange={() => handleVisibilityToggle('workspace')}
                          />
                        }
                        label={
                          <Typography variant="body2">
                            Workspace
                          </Typography>
                        }
                        sx={{ m: 0 }}
                      />
                      <Switch
                        size="small"
                        checked={visibility.workspace.isDefault}
                        onChange={() => handleDefaultToggle('workspace')}
                        disabled={!visibility.workspace.visible}
                      />
                    </Box>
                  </Box>
                </Box>
              </MenuItem>
            </Select>
          </FormControl>
          )}
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            disabled={!projectName.trim() || !hasChanges}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            Save Project
          </Button>
        </Box>
        <Divider />
      </Box>

      {/* Main Content Area */}
      <Box sx={{
        position: 'relative',
        flex: 1,
        px: 2,
        pt: 2,
        overflow: 'auto',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(74% 84% at 49% 45%, rgba(255, 255, 255, 0) 20%, rgb(255, 255, 255) 40%) center top -150px / 150% 150% no-repeat, radial-gradient(74% 75% at 50% 33%, rgba(255, 255, 255, 0) 25%, rgb(255, 255, 255) 50%), linear-gradient(90deg, rgb(255, 215, 240) 0%, rgb(205, 240, 245) 100%)',
          opacity: 0.5,
          zIndex: 0,
        },
      }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', position: 'relative', zIndex: 1 }}>

      {/* Form */}
      <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', backgroundColor: 'white' }}>
        {/* Page Header */}
        <Box
          sx={{
            borderBottom: '1px solid',
            borderColor: 'divider',
            height: 60,
            display: 'flex',
            alignItems: 'center',
            px: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {isNewProject ? 'New Project' : 'Edit Project'}
          </Typography>
        </Box>

        {/* Form Content */}
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Project Name */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Project Name
            </Typography>
            <TextField
              fullWidth
              placeholder="e.g., Q4 Campaign Analysis"
              value={projectName}
              onChange={handleFieldChange(setProjectName)}
              required
              helperText="Give your project a descriptive name"
            />
          </Box>

          {/* Set as Personal Default */}
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isPersonalDefault}
                  onChange={handlePersonalDefaultToggle}
                  sx={{
                    color: 'primary.main',
                    '&.Mui-checked': {
                      color: 'primary.main',
                    },
                  }}
                />
              }
              label={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Set as my default project
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    You will start with this project when opening Mira Studio
                  </Typography>
                </Box>
              }
            />
          </Box>

          <Divider />

          {/* Instructions */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Instructions & Context
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={8}
              placeholder="Provide instructions and context for the AI. This helps ensure relevant responses for all conversations in this project.

Example:
• Focus on engagement metrics and ROI
• Include data from October-December timeframe
• Reference our Q3 performance benchmarks"
              value={instructions}
              onChange={handleFieldChange(setInstructions)}
              helperText="Add any context, filters, or guidelines that should apply to all chats in this project"
            />
          </Box>

          {/* Info Box */}
          <Box
            sx={{
              p: 2,
              backgroundColor: 'action.hover',
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="caption" color="text.secondary">
              <strong>Tip:</strong> Once saved, this project will be available in the project
              selector on the Studio page. Any new chat threads started with this project will
              automatically include these instructions.
            </Typography>
          </Box>
        </Box>
      </Paper>
        </Box>
      </Box>

      {/* Project Actions Menu */}
      <Menu
        anchorEl={projectMenuAnchor}
        open={projectMenuOpen}
        onClose={handleProjectMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            minWidth: 220,
            mt: 0.5,
          },
        }}
      >
        <MenuItem onClick={handleRenameOpen}>
          <ListItemIcon>
            <EditIcon fontSize="small" sx={{ color: 'text.secondary' }} />
          </ListItemIcon>
          <ListItemText>Rename Project</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleSetAsDefault}>
          <ListItemIcon>
            <StarOutlineIcon fontSize="small" sx={{ color: 'text.secondary' }} />
          </ListItemIcon>
          <ListItemText>Set as My Default</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={handleDeleteProject}
          sx={{
            '&:hover': {
              backgroundColor: 'primary.light',
              '& .MuiListItemIcon-root': { color: 'primary.main' },
              '& .MuiListItemText-root': { color: 'primary.main' },
            },
          }}
        >
          <ListItemIcon>
            <DeleteOutlineIcon fontSize="small" sx={{ color: 'text.secondary' }} />
          </ListItemIcon>
          <ListItemText>Delete Project</ListItemText>
        </MenuItem>
      </Menu>

      {/* Rename Project Dialog */}
      <Dialog open={renameDialogOpen} onClose={handleRenameClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ pr: 6 }}>
          Rename Project
          <IconButton
            onClick={handleRenameClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ px: 3, py: 2 }}>
          <TextField
            autoFocus
            fullWidth
            label="Project Name"
            placeholder="e.g., Q4 Campaign Analysis"
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && renameValue.trim()) {
                handleRenameSave()
              }
            }}
            helperText="Give your project a descriptive name"
            sx={{ mt: 1, mb: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={renameSetAsDefault}
                onChange={(e) => setRenameSetAsDefault(e.target.checked)}
                sx={{
                  color: 'primary.main',
                  '&.Mui-checked': {
                    color: 'primary.main',
                  },
                }}
              />
            }
            label={
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Set as my default project
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  You will start with this project when opening Mira Studio
                </Typography>
              </Box>
            }
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleRenameClose} sx={{ textTransform: 'none', fontWeight: 600 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleRenameSave}
            disabled={!renameValue.trim()}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ProjectDetailsPage

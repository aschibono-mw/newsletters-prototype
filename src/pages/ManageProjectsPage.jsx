import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Stack,
  Tooltip,
  Divider,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
} from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined'
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded'
import CloseIcon from '@mui/icons-material/Close'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import StarIcon from '@mui/icons-material/Star'
import Indicator from '../components/core/Indicator'
import TableHeader from '../components/core/TableHeader'
import { STUDIO_GRADIENT_BG } from '../constants/studioStyles'

function ManageProjectsPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [menuAnchor, setMenuAnchor] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')
  const [hoveredRow, setHoveredRow] = useState(null)

  // Mock data - replace with real data later (matches StudioPageV2)
  const [projects, setProjects] = useState([
    {
      id: 'proj-1',
      name: 'Q4 Campaign Analysis',
      description: 'Focus on engagement metrics and ROI',
      lastUsed: '2 hours ago',
      isActive: true,
      scope: 'personal',
      isCompanyDefault: false,
      isWorkspaceDefault: false,
    },
    {
      id: 'proj-2',
      name: 'Product Launch Research',
      description: 'Analyze competitor positioning and customer feedback',
      lastUsed: '1 day ago',
      isActive: false,
      scope: 'company',
      isCompanyDefault: true,
      isWorkspaceDefault: false,
    },
    {
      id: 'proj-3',
      name: 'Customer Feedback Review',
      description: 'Review Q4 customer satisfaction surveys',
      lastUsed: '3 days ago',
      isActive: false,
      scope: 'workspace',
      isCompanyDefault: false,
      isWorkspaceDefault: true,
    },
    {
      id: 'proj-4',
      name: 'Market Research Initiative',
      description: '',
      lastUsed: '5 days ago',
      isActive: false,
      scope: 'company',
      isCompanyDefault: false,
      isWorkspaceDefault: false,
    },
    {
      id: 'proj-5',
      name: 'Product Roadmap Planning',
      description: 'Plan features for 2026 releases',
      lastUsed: '1 week ago',
      isActive: false,
      scope: 'personal',
      isCompanyDefault: false,
      isWorkspaceDefault: false,
    },
    {
      id: 'proj-6',
      name: 'User Experience Study',
      description: '',
      lastUsed: '1 week ago',
      isActive: false,
      scope: 'workspace',
      isCompanyDefault: false,
      isWorkspaceDefault: false,
    },
    {
      id: 'proj-7',
      name: 'Competitive Analysis',
      description: 'Track competitor features and pricing',
      lastUsed: '2 weeks ago',
      isActive: false,
      scope: 'company',
      isCompanyDefault: false,
      isWorkspaceDefault: false,
    },
    {
      id: 'proj-8',
      name: 'Brand Strategy Review',
      description: '',
      lastUsed: '2 weeks ago',
      isActive: false,
      scope: 'personal',
      isCompanyDefault: false,
      isWorkspaceDefault: false,
    },
  ])

  const handleEdit = (event, projectId) => {
    event.stopPropagation()
    navigate(`/studio/projects/${projectId}`)
  }

  const handleDelete = (event, projectId) => {
    if (event) event.stopPropagation()
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      setProjects(projects.filter((p) => p.id !== projectId))
    }
    setMenuAnchor(null)
  }

  const handleActiveToggle = (event, projectId) => {
    if (event) event.stopPropagation()
    // Set the selected project as active and unset all others
    setProjects(
      projects.map((p) => ({
        ...p,
        isActive: p.id === projectId,
      }))
    )
    setMenuAnchor(null)
  }

  const handleCompanyDefaultToggle = (projectId) => {
    // Toggle company default for the selected project
    setProjects(
      projects.map((p) => ({
        ...p,
        isCompanyDefault: p.id === projectId ? !p.isCompanyDefault : p.isCompanyDefault,
      }))
    )
    setMenuAnchor(null)
  }

  const handleWorkspaceDefaultToggle = (projectId) => {
    // Toggle workspace default for the selected project
    setProjects(
      projects.map((p) => ({
        ...p,
        isWorkspaceDefault: p.id === projectId ? !p.isWorkspaceDefault : p.isWorkspaceDefault,
      }))
    )
    setMenuAnchor(null)
  }

  const handleVisibilityChange = (event, projectId) => {
    event.stopPropagation()
    const newScope = event.target.value
    setProjects(
      projects.map((p) => ({
        ...p,
        scope: p.id === projectId ? newScope : p.scope,
      }))
    )
  }

  const handleCreateNew = () => {
    setCreateDialogOpen(true)
  }

  const handleDialogClose = () => {
    setCreateDialogOpen(false)
    setNewProjectName('')
  }

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      navigate('/studio/projects/new', { state: { projectName: newProjectName.trim() } })
    }
  }

  const handleMenuOpen = (event, project) => {
    event.stopPropagation()
    setMenuAnchor(event.currentTarget)
    setSelectedProject(project)
  }

  const handleMenuClose = () => {
    setMenuAnchor(null)
    setSelectedProject(null)
  }

  // Filter projects based on search query
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
          <Tooltip title="Back to Studio">
            <IconButton size="small" onClick={() => navigate('/studio')} sx={{ color: 'text.secondary', p: 0.5 }}>
              <ArrowBackIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>
          <Divider orientation="vertical" flexItem />

          {/* Page Title */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              My Projects
            </Typography>
            <Indicator label="Beta" size="small" color="blue" />
          </Stack>

          {/* Spacer */}
          <Box sx={{ flex: 1 }} />

          {/* Create Project Button */}
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            onClick={handleCreateNew}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            Create Project
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
          background: STUDIO_GRADIENT_BG,
          opacity: 0.5,
          zIndex: 0,
        },
      }}>
        <Box sx={{ maxWidth: 1536, mx: 'auto', position: 'relative', zIndex: 1 }}>
          {/* Projects Table */}
          {filteredProjects.length === 0 ? (
            <Paper
              elevation={0}
              sx={{ p: 8, textAlign: 'center', border: '1px solid', borderColor: 'divider', backgroundColor: 'white' }}
            >
              <FolderOpenIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {searchQuery ? 'No Projects Found' : 'No Projects Yet'}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {searchQuery
                  ? `No projects match "${searchQuery}". Try a different search term.`
                  : 'Create your first project to organize AI conversations with custom context and instructions.'}
              </Typography>
              {!searchQuery && (
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  startIcon={<AddIcon />}
                  onClick={handleCreateNew}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 500,
                  }}
                >
                  Create Project
                </Button>
              )}
            </Paper>
          ) : (
            <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', backgroundColor: 'white' }}>
              <TableHeader
                title="Projects"
                count={filteredProjects.length}
                infotip="Organize AI conversations with custom context and instructions. Visibility controls who can access the project. Default indicators show which project users will start with when opening Mira Studio."
                showFind
                findValue={searchQuery}
                onFindChange={setSearchQuery}
              />

          <TableContainer sx={{ overflowX: 'auto' }}>
            <Table sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      minWidth: 360,
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        right: 0,
                        top: '25%',
                        height: '50%',
                        width: '1px',
                        backgroundColor: 'divider',
                      },
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      width: 240,
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        right: 0,
                        top: '25%',
                        height: '50%',
                        width: '1px',
                        backgroundColor: 'divider',
                      },
                    }}
                  >
                    Visibility
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      width: 240,
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        right: 0,
                        top: '25%',
                        height: '50%',
                        width: '1px',
                        backgroundColor: 'divider',
                      },
                    }}
                  >
                    Last Used
                  </TableCell>
                  <TableCell align="right" sx={{ width: 180 }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow
                    key={project.id}
                    hover
                    onMouseEnter={() => setHoveredRow(project.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    sx={{
                      cursor: 'default',
                    }}
                  >
                    {/* Project (Name + Default Indicators) */}
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {project.name}
                        </Typography>
                        {project.isActive && (
                          <Tooltip title="You will start with this project when opening Mira Studio">
                            <Box sx={{ display: 'inline-block' }}>
                              <Indicator
                                label="Personal Default"
                                size="small"
                                color="green"
                                startIcon={<StarIcon sx={{ fontSize: 14 }} />}
                              />
                            </Box>
                          </Tooltip>
                        )}
                        {project.isCompanyDefault && (
                          <Tooltip title="All users in your company will start with this project in Mira Studio">
                            <Box sx={{ display: 'inline-block' }}>
                              <Indicator
                                label="Company Default"
                                size="small"
                                color="grey"
                                startIcon={<BusinessCenterOutlinedIcon sx={{ fontSize: 14 }} />}
                              />
                            </Box>
                          </Tooltip>
                        )}
                        {project.isWorkspaceDefault && (
                          <Tooltip title="All users in this workspace will start with this project in Mira Studio">
                            <Box sx={{ display: 'inline-block' }}>
                              <Indicator
                                label="Workspace Default"
                                size="small"
                                color="grey"
                                startIcon={<PeopleOutlineRoundedIcon sx={{ fontSize: 14 }} />}
                              />
                            </Box>
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>

                    {/* Visibility */}
                    <TableCell>
                      <Select
                        value={project.scope}
                        onChange={(e) => handleVisibilityChange(e, project.id)}
                        size="small"
                        sx={{
                          fontSize: 14,
                          color: 'text.secondary',
                          '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            border: '1px solid',
                            borderColor: 'divider',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            border: '1px solid',
                            borderColor: 'primary.main',
                          },
                          '& .MuiSelect-icon': {
                            fontSize: 20,
                          },
                        }}
                      >
                        <MenuItem value="personal">Personal</MenuItem>
                        <MenuItem value="workspace">Workspace</MenuItem>
                        <MenuItem value="company">Company</MenuItem>
                      </Select>
                    </TableCell>

                    {/* Last Used */}
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {project.lastUsed}
                      </Typography>
                    </TableCell>

                    {/* Actions */}
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                        {hoveredRow === project.id && (
                          <>
                            <Tooltip title={project.isActive ? "Remove as my default" : "Set as my default"}>
                              <IconButton
                                size="small"
                                onClick={(e) => handleActiveToggle(e, project.id)}
                                sx={{ color: 'text.secondary' }}
                              >
                                {project.isActive ? <StarIcon fontSize="small" /> : <StarOutlineIcon fontSize="small" />}
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit project">
                              <IconButton
                                size="small"
                                onClick={(e) => handleEdit(e, project.id)}
                                sx={{ color: 'text.secondary' }}
                              >
                                <EditOutlinedIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete project">
                              <IconButton
                                size="small"
                                onClick={(e) => handleDelete(e, project.id)}
                                sx={{ color: 'text.secondary' }}
                              >
                                <DeleteOutlineIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, project)}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

          </TableContainer>
        </Paper>
          )}
        </Box>
      </Box>

      {/* Overflow Actions Menu - Admin Settings */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {/* Menu Header */}
        <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
            ADMIN SETTINGS
          </Typography>
        </Box>

        {/* Company Default */}
        <MenuItem
          onClick={() => {
            handleCompanyDefaultToggle(selectedProject?.id)
          }}
        >
          <ListItemIcon>
            {selectedProject?.isCompanyDefault ? (
              <BusinessCenterOutlinedIcon fontSize="small" sx={{ color: 'info.main' }} />
            ) : (
              <Box sx={{ width: 20 }} />
            )}
          </ListItemIcon>
          <ListItemText>
            Set as Company Default
            {selectedProject?.isCompanyDefault && (
              <Typography component="span" variant="caption" sx={{ color: 'text.secondary', ml: 1 }}>
                (Current)
              </Typography>
            )}
          </ListItemText>
        </MenuItem>

        {/* Workspace Default */}
        <MenuItem
          onClick={() => {
            handleWorkspaceDefaultToggle(selectedProject?.id)
          }}
        >
          <ListItemIcon>
            {selectedProject?.isWorkspaceDefault ? (
              <PeopleOutlineRoundedIcon fontSize="small" sx={{ color: 'secondary.main' }} />
            ) : (
              <Box sx={{ width: 20 }} />
            )}
          </ListItemIcon>
          <ListItemText>
            Set as Workspace Default
            {selectedProject?.isWorkspaceDefault && (
              <Typography component="span" variant="caption" sx={{ color: 'text.secondary', ml: 1 }}>
                (Current)
              </Typography>
            )}
          </ListItemText>
        </MenuItem>
      </Menu>

      {/* Create Project Dialog */}
      <Dialog open={createDialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ pr: 6 }}>
          Create New Project
          <IconButton
            onClick={handleDialogClose}
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
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && newProjectName.trim()) {
                handleCreateProject()
              }
            }}
            helperText="Give your project a descriptive name"
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleDialogClose} sx={{ textTransform: 'none', fontWeight: 600 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleCreateProject}
            disabled={!newProjectName.trim()}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ManageProjectsPage

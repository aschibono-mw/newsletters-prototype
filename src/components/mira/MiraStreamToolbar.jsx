import { useState } from 'react'
import {
  Box,
  IconButton,
  Typography,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Chip,
} from '@mui/material'
import MiraButton from './MiraButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import HistoryIcon from '@mui/icons-material/History'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined'
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined'

/**
 * MiraStreamToolbar - Toolbar for active chat/stream view
 *
 * @param {'A' | 'B'} variant - Layout variant
 *   - A: Back | Title + Project | Spacer | Thread/Canvas | Create New
 *   - B: Back | Title + Project | Spacer | History | Thread/Canvas | Create New
 * @param {string} streamTitle - Name of the current stream/chat
 * @param {string} projectName - Associated project name (optional)
 * @param {'thread' | 'canvas'} viewMode - Current view mode
 * @param {function} onViewModeChange - View mode change handler
 * @param {function} onBack - Back button handler
 * @param {function} onHistoryClick - History drawer toggle (variant B)
 * @param {function} onPromptLibraryClick - Prompt library drawer toggle
 * @param {function} onCreateChat - Create new chat handler
 * @param {function} onCreateProject - Create new project handler
 * @param {function} onCreatePrompt - Create new prompt handler
 * @param {function} onCreateWorkflow - Create new workflow handler
 */
function MiraStreamToolbar({
  variant = 'A',
  streamTitle = 'Untitled Chat',
  projectName,
  viewMode = 'thread',
  onViewModeChange,
  onBack,
  onHistoryClick,
  onPromptLibraryClick,
  onCreateChat,
  onCreateProject,
  onCreatePrompt,
  onCreateWorkflow,
}) {
  const [createMenuAnchor, setCreateMenuAnchor] = useState(null)

  const handleCreateMenuOpen = (event) => {
    setCreateMenuAnchor(event.currentTarget)
  }

  const handleCreateMenuClose = () => {
    setCreateMenuAnchor(null)
  }

  const handleCreateOption = (handler) => {
    handleCreateMenuClose()
    handler?.()
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: 2,
        py: 1,
        minHeight: 48,
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      {/* Back Button */}
      <Tooltip title="Back">
        <IconButton
          size="small"
          onClick={onBack}
          sx={{ color: 'text.secondary', p: 0.5 }}
        >
          <ArrowBackIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Tooltip>

      <Divider orientation="vertical" flexItem />

      {/* Stream Title + Project Context */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {streamTitle}
        </Typography>
        {projectName ? (
          <Chip
            label={projectName}
            size="small"
            sx={{
              height: 22,
              fontSize: '0.75rem',
              backgroundColor: 'grey.100',
              color: 'text.secondary',
            }}
          />
        ) : (
          <Typography variant="body2" color="text.disabled">
            · No Project
          </Typography>
        )}
      </Box>

      {/* Spacer */}
      <Box sx={{ flex: 1 }} />

      {/* Prompt Library Button */}
      <Tooltip title="Prompt Library">
        <IconButton
          size="small"
          onClick={onPromptLibraryClick}
          sx={{ color: 'text.secondary' }}
        >
          <MenuBookOutlinedIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Tooltip>

      {/* History Button - Variant B only */}
      {variant === 'B' && (
        <Tooltip title="Stream History">
          <IconButton
            size="small"
            onClick={onHistoryClick}
            sx={{ color: 'text.secondary' }}
          >
            <HistoryIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>
      )}

      {/* Thread/Canvas Toggle */}
      <ToggleButtonGroup
        value={viewMode}
        exclusive
        onChange={(e, newMode) => newMode && onViewModeChange?.(newMode)}
        size="small"
        sx={{
          '& .MuiToggleButton-root': {
            px: 1.5,
            py: 0.5,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.8125rem',
            borderColor: 'divider',
            '&.Mui-selected': {
              backgroundColor: 'grey.100',
              color: 'text.primary',
              '&:hover': {
                backgroundColor: 'grey.200',
              },
            },
          },
        }}
      >
        <ToggleButton value="thread">
          <ViewListOutlinedIcon sx={{ fontSize: 16, mr: 0.5 }} />
          Thread
        </ToggleButton>
        <ToggleButton value="canvas">
          <GridViewOutlinedIcon sx={{ fontSize: 16, mr: 0.5 }} />
          Canvas
        </ToggleButton>
      </ToggleButtonGroup>

      {/* Create New Dropdown */}
      <MiraButton
        variant="gradient"
        size="small"
        endIcon={<ArrowDropDownIcon />}
        onClick={handleCreateMenuOpen}
      >
        Create New
      </MiraButton>
      <Menu
        anchorEl={createMenuAnchor}
        open={Boolean(createMenuAnchor)}
        onClose={handleCreateMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: { minWidth: 180, mt: 0.5 },
          },
        }}
      >
        <MenuItem onClick={() => handleCreateOption(onCreateChat)}>
          <ListItemIcon>
            <ChatOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Chat</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleCreateOption(onCreateProject)}>
          <ListItemIcon>
            <FolderOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Project</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleCreateOption(onCreatePrompt)}>
          <ListItemIcon>
            <LightbulbOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Prompt</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleCreateOption(onCreateWorkflow)}>
          <ListItemIcon>
            <BoltOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Workflow</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default MiraStreamToolbar

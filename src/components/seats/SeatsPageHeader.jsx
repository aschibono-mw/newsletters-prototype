import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import WorkspacesOutlinedIcon from '@mui/icons-material/WorkspacesOutlined'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import { PageHeader } from '../layout'

/**
 * SeatsPageHeader - Header component for the Seats page with actions menu
 *
 * @param {Object} props
 * @param {Function} props.onCreateUser - Handler for create user action
 * @param {Function} props.onOpenAdminSettings - Handler for admin settings action
 */
function SeatsPageHeader({ onCreateUser, onOpenAdminSettings }) {
  const navigate = useNavigate()
  const [actionsAnchor, setActionsAnchor] = useState(null)

  const handleMenuItemClick = (action) => {
    setActionsAnchor(null)
    action()
  }

  const actions = (
    <>
      <Button
        variant="contained"
        color="secondary"
        endIcon={<ArrowDropDownIcon />}
        onClick={(e) => setActionsAnchor(e.currentTarget)}
        sx={{ textTransform: 'none', fontWeight: 500 }}
      >
        Actions
      </Button>
      <Menu
        anchorEl={actionsAnchor}
        open={Boolean(actionsAnchor)}
        onClose={() => setActionsAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ sx: { minWidth: 220 } }}
      >
        <MenuItem onClick={() => handleMenuItemClick(onCreateUser)}>
          <ListItemIcon>
            <PersonAddOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Create New User" />
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick(() => navigate('/seats-v10/roles'))}>
          <ListItemIcon>
            <BadgeOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Manage Roles" />
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick(() => navigate('/seats-v10/groups'))}>
          <ListItemIcon>
            <GroupsOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Create or Edit Group" />
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick(() => navigate('/seats-v10/workspaces'))}>
          <ListItemIcon>
            <WorkspacesOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Workspaces" />
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick(onOpenAdminSettings)}>
          <ListItemIcon>
            <AdminPanelSettingsOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Admin Settings" />
        </MenuItem>
      </Menu>
    </>
  )

  return (
    <PageHeader
      title="Seats and Permissions"
      backTo="/account-v10"
      backTooltip="Back to Account"
      actions={actions}
    />
  )
}

export default SeatsPageHeader

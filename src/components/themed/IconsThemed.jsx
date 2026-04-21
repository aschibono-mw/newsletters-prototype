import { Box, Stack, Typography, IconButton } from '@mui/material'
import FeaturesSection from '../docs/FeaturesSection'
// Common Action Icons - using Rounded variants
import AddIcon from '@mui/icons-material/AddRounded'
import DeleteIcon from '@mui/icons-material/DeleteRounded'
import EditIcon from '@mui/icons-material/EditRounded'
import SearchIcon from '@mui/icons-material/SearchRounded'
import CloseIcon from '@mui/icons-material/CloseRounded'
import CheckIcon from '@mui/icons-material/CheckRounded'
import MoreVertIcon from '@mui/icons-material/MoreVertRounded'
import SettingsIcon from '@mui/icons-material/SettingsRounded'
// Navigation Icons
import HomeIcon from '@mui/icons-material/HomeRounded'
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded'
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardRounded'
import MenuIcon from '@mui/icons-material/MenuRounded'
import NavigateNextIcon from '@mui/icons-material/NavigateNextRounded'
// Communication Icons
import MailIcon from '@mui/icons-material/MailRounded'
import NotificationsIcon from '@mui/icons-material/NotificationsRounded'
import ChatBubbleIcon from '@mui/icons-material/ChatBubbleRounded'
import PhoneIcon from '@mui/icons-material/PhoneRounded'
// Content Icons
import FolderIcon from '@mui/icons-material/FolderRounded'
import DescriptionIcon from '@mui/icons-material/DescriptionRounded'
import ImageIcon from '@mui/icons-material/ImageRounded'
import AttachFileIcon from '@mui/icons-material/AttachFileRounded'
import CloudUploadIcon from '@mui/icons-material/CloudUploadRounded'
import DownloadIcon from '@mui/icons-material/DownloadRounded'
// Status Icons
import InfoIcon from '@mui/icons-material/InfoRounded'
import WarningIcon from '@mui/icons-material/WarningRounded'
import ErrorIcon from '@mui/icons-material/ErrorRounded'
import CheckCircleIcon from '@mui/icons-material/CheckCircleRounded'
// User Icons
import PersonIcon from '@mui/icons-material/PersonRounded'
import GroupIcon from '@mui/icons-material/GroupRounded'
import AccountCircleIcon from '@mui/icons-material/AccountCircleRounded'
// Utility Icons
import VisibilityIcon from '@mui/icons-material/VisibilityRounded'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOffRounded'
import FilterListIcon from '@mui/icons-material/FilterListRounded'
import SortIcon from '@mui/icons-material/SortRounded'
import RefreshIcon from '@mui/icons-material/RefreshRounded'
import StarIcon from '@mui/icons-material/StarRounded'
import FavoriteIcon from '@mui/icons-material/FavoriteRounded'
import ShareIcon from '@mui/icons-material/ShareRounded'

function IconsThemed() {
  // eslint-disable-next-line no-unused-vars
  const IconDisplay = ({ icon: IconComponent, label }) => (
    <Box sx={{ textAlign: 'center', minWidth: 80 }}>
      <IconComponent sx={{ fontSize: 20, color: 'text.primary', mb: 0.5 }} />
      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '0.7rem' }}>
        {label}
      </Typography>
    </Box>
  )

  return (
    <div className="themed-showcase">
      {/* Icon Sizes */}
      <div className="variant-section">
        <h4>Icon Sizes</h4>
        <p>Standard size scale from small to extra large. Desktop-first with 20px default.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-end' }}>
            <Box sx={{ textAlign: 'center' }}>
              <HomeIcon sx={{ fontSize: 16 }} />
              <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'text.secondary' }}>
                16px (small)
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <HomeIcon sx={{ fontSize: 20 }} />
              <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'text.secondary' }}>
                20px (default)
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <HomeIcon sx={{ fontSize: 24 }} />
              <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'text.secondary' }}>
                24px (large)
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <HomeIcon sx={{ fontSize: 32 }} />
              <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'text.secondary' }}>
                32px (x-large)
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <HomeIcon sx={{ fontSize: 48 }} />
              <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'text.secondary' }}>
                48px (2x-large)
              </Typography>
            </Box>
          </Box>
        </Stack>
      </div>

      {/* Icon Colors */}
      <div className="variant-section">
        <h4>Icon Colors</h4>
        <p>Theme-aware color system for semantic meaning.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 5, alignItems: 'center', justifyContent: 'space-between', maxWidth: 600 }}>
            <Box sx={{ textAlign: 'center' }}>
              <HomeIcon sx={{ color: 'primary.main' }} />
              <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'text.secondary' }}>
                Primary
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <CheckCircleIcon sx={{ color: 'success.main' }} />
              <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'text.secondary' }}>
                Success
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <ErrorIcon sx={{ color: 'error.main' }} />
              <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'text.secondary' }}>
                Error
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <WarningIcon sx={{ color: 'warning.main' }} />
              <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'text.secondary' }}>
                Warning
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <InfoIcon sx={{ color: 'info.main' }} />
              <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'text.secondary' }}>
                Info
              </Typography>
            </Box>
          </Box>
        </Stack>
      </div>

      {/* Common Action Icons */}
      <div className="variant-section">
        <h4>Common Action Icons</h4>
        <p>Frequently used icons for user actions.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <IconDisplay icon={AddIcon} label="Add" />
            <IconDisplay icon={DeleteIcon} label="Delete" />
            <IconDisplay icon={EditIcon} label="Edit" />
            <IconDisplay icon={SearchIcon} label="Search" />
            <IconDisplay icon={CloseIcon} label="Close" />
            <IconDisplay icon={CheckIcon} label="Check" />
            <IconDisplay icon={MoreVertIcon} label="More" />
            <IconDisplay icon={SettingsIcon} label="Settings" />
          </Box>
        </Stack>
      </div>

      {/* Navigation Icons */}
      <div className="variant-section">
        <h4>Navigation Icons</h4>
        <p>Icons for app navigation and directional cues.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <IconDisplay icon={HomeIcon} label="Home" />
            <IconDisplay icon={ArrowBackIcon} label="Back" />
            <IconDisplay icon={ArrowForwardIcon} label="Forward" />
            <IconDisplay icon={MenuIcon} label="Menu" />
            <IconDisplay icon={NavigateNextIcon} label="Next" />
          </Box>
        </Stack>
      </div>

      {/* Communication Icons */}
      <div className="variant-section">
        <h4>Communication Icons</h4>
        <p>Icons for messaging and notifications.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <IconDisplay icon={MailIcon} label="Mail" />
            <IconDisplay icon={NotificationsIcon} label="Notifications" />
            <IconDisplay icon={ChatBubbleIcon} label="Chat" />
            <IconDisplay icon={PhoneIcon} label="Phone" />
          </Box>
        </Stack>
      </div>

      {/* Content Icons */}
      <div className="variant-section">
        <h4>Content Icons</h4>
        <p>Icons for files, documents, and media.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <IconDisplay icon={FolderIcon} label="Folder" />
            <IconDisplay icon={DescriptionIcon} label="Document" />
            <IconDisplay icon={ImageIcon} label="Image" />
            <IconDisplay icon={AttachFileIcon} label="Attach" />
            <IconDisplay icon={CloudUploadIcon} label="Upload" />
            <IconDisplay icon={DownloadIcon} label="Download" />
          </Box>
        </Stack>
      </div>

      {/* User Icons */}
      <div className="variant-section">
        <h4>User Icons</h4>
        <p>Icons for users, accounts, and profiles.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <IconDisplay icon={PersonIcon} label="Person" />
            <IconDisplay icon={GroupIcon} label="Group" />
            <IconDisplay icon={AccountCircleIcon} label="Account" />
          </Box>
        </Stack>
      </div>

      {/* Utility Icons */}
      <div className="variant-section">
        <h4>Utility Icons</h4>
        <p>Icons for various UI utilities.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <IconDisplay icon={VisibilityIcon} label="Show" />
            <IconDisplay icon={VisibilityOffIcon} label="Hide" />
            <IconDisplay icon={FilterListIcon} label="Filter" />
            <IconDisplay icon={SortIcon} label="Sort" />
            <IconDisplay icon={RefreshIcon} label="Refresh" />
            <IconDisplay icon={StarIcon} label="Star" />
            <IconDisplay icon={FavoriteIcon} label="Favorite" />
            <IconDisplay icon={ShareIcon} label="Share" />
          </Box>
        </Stack>
      </div>

      {/* Icon Buttons */}
      <div className="variant-section">
        <h4>Icon Buttons</h4>
        <p>Interactive icon buttons with hover states.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <IconButton size="small">
              <DeleteIcon />
            </IconButton>
            <IconButton>
              <EditIcon />
            </IconButton>
            <IconButton size="large">
              <SettingsIcon />
            </IconButton>
            <IconButton color="primary">
              <FavoriteIcon />
            </IconButton>
            <IconButton color="error">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Stack>
      </div>

      <FeaturesSection
        features={[
          { feature: "Style", description: "Rounded, outlined (default). @mui/icons-material library" },
          { feature: "Icon sizes", description: "16px (sm), 20px (default), 24px (lg), 32px (xl), 48px (2xl)" },
          { feature: "Button sizes", description: "Small (32px), Medium (40px), Large (48px). Needs aria-label" },
          { feature: "Colors", description: "text.primary (default), text.secondary (muted), theme semantic colors" },
        ]}
      />
    </div>
  )
}

export default IconsThemed

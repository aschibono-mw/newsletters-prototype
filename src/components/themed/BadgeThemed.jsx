import { Box, Badge as MuiBadge, Stack, Typography, IconButton, Avatar } from '@mui/material'
import FeaturesSection from '../docs/FeaturesSection'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

function BadgeThemed() {
  return (
    <div className="themed-showcase">
      {/* Basic Badge with Count */}
      <div className="variant-section">
        <h4>Basic Badge with Count</h4>
        <p>Notification counts displayed on icons and buttons.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <MuiBadge badgeContent={4} color="primary">
              <MailIcon color="action" />
            </MuiBadge>
            <MuiBadge badgeContent={12} color="primary">
              <NotificationsIcon color="action" />
            </MuiBadge>
            <MuiBadge badgeContent={99} color="primary">
              <ShoppingCartIcon color="action" />
            </MuiBadge>
            <MuiBadge badgeContent={100} color="primary">
              <ShoppingCartIcon color="action" />
            </MuiBadge>
          </Box>
        </Stack>
      </div>

      {/* Color Variants */}
      <div className="variant-section">
        <h4>Color Variants</h4>
        <p>Semantic colors for different notification types.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <MuiBadge badgeContent={4} color="primary">
              <MailIcon color="action" />
            </MuiBadge>
            <MuiBadge badgeContent={4} color="secondary">
              <MailIcon color="action" />
            </MuiBadge>
            <MuiBadge badgeContent={4} color="error">
              <MailIcon color="action" />
            </MuiBadge>
            <MuiBadge badgeContent={4} color="warning">
              <MailIcon color="action" />
            </MuiBadge>
            <MuiBadge badgeContent={4} color="success">
              <MailIcon color="action" />
            </MuiBadge>
            <MuiBadge badgeContent={4} color="info">
              <MailIcon color="action" />
            </MuiBadge>
          </Box>
        </Stack>
      </div>

      {/* Dot Variant */}
      <div className="variant-section">
        <h4>Dot Variant</h4>
        <p>Simple status indicator without count.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <MuiBadge variant="dot" color="primary">
              <MailIcon color="action" />
            </MuiBadge>
            <MuiBadge variant="dot" color="error">
              <NotificationsIcon color="action" />
            </MuiBadge>
            <MuiBadge variant="dot" color="success">
              <ShoppingCartIcon color="action" />
            </MuiBadge>
          </Box>
        </Stack>
      </div>

      {/* Badge Positioning */}
      <div className="variant-section">
        <h4>Badge Positioning</h4>
        <p>Control badge placement around the anchor element.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <Box sx={{ textAlign: 'center' }}>
              <MuiBadge badgeContent={4} color="error">
                <MailIcon color="action" />
              </MuiBadge>
              <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
                Top Right
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <MuiBadge badgeContent={4} color="error" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <MailIcon color="action" />
              </MuiBadge>
              <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
                Bottom Right
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <MuiBadge badgeContent={4} color="error" anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
                <MailIcon color="action" />
              </MuiBadge>
              <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
                Top Left
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <MuiBadge badgeContent={4} color="error" anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                <MailIcon color="action" />
              </MuiBadge>
              <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
                Bottom Left
              </Typography>
            </Box>
          </Box>
        </Stack>
      </div>

      {/* With Avatars */}
      <div className="variant-section">
        <h4>With Avatars</h4>
        <p>Status indicators and notification counts on user avatars.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <MuiBadge badgeContent={3} color="error">
              <Avatar sx={{ bgcolor: 'primary.main' }}>JD</Avatar>
            </MuiBadge>
            <MuiBadge variant="dot" color="success" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
              <Avatar sx={{ bgcolor: 'secondary.main' }}>AM</Avatar>
            </MuiBadge>
            <MuiBadge variant="dot" color="warning" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
              <Avatar sx={{ bgcolor: 'error.main' }}>SK</Avatar>
            </MuiBadge>
            <MuiBadge variant="dot" color="default" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
              <Avatar sx={{ bgcolor: 'info.main' }}>LT</Avatar>
            </MuiBadge>
          </Box>
        </Stack>
      </div>

      {/* Interactive Buttons */}
      <div className="variant-section">
        <h4>Interactive Buttons</h4>
        <p>Badges on icon buttons for app navigation.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <IconButton aria-label="cart">
              <MuiBadge badgeContent={4} color="primary">
                <ShoppingCartIcon />
              </MuiBadge>
            </IconButton>
            <IconButton aria-label="notifications">
              <MuiBadge badgeContent={17} color="error">
                <NotificationsIcon />
              </MuiBadge>
            </IconButton>
            <IconButton aria-label="mail">
              <MuiBadge variant="dot" color="error">
                <MailIcon />
              </MuiBadge>
            </IconButton>
          </Box>
        </Stack>
      </div>

      {/* Max Count */}
      <div className="variant-section">
        <h4>Maximum Count</h4>
        <p>Display "99+" for counts exceeding a threshold.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <MuiBadge badgeContent={99} color="error">
              <MailIcon color="action" />
            </MuiBadge>
            <MuiBadge badgeContent={100} color="error" max={99}>
              <MailIcon color="action" />
            </MuiBadge>
            <MuiBadge badgeContent={1000} color="error" max={999}>
              <MailIcon color="action" />
            </MuiBadge>
          </Box>
        </Stack>
      </div>

      {/* Visibility Control */}
      <div className="variant-section">
        <h4>Visibility Control</h4>
        <p>Show or hide badges based on state.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <MuiBadge badgeContent={4} color="primary">
              <MailIcon color="action" />
            </MuiBadge>
            <MuiBadge badgeContent={0} color="primary" showZero>
              <MailIcon color="action" />
            </MuiBadge>
            <MuiBadge badgeContent={0} color="primary">
              <MailIcon color="action" />
            </MuiBadge>
          </Box>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Left: Count 4 (visible), Middle: Count 0 with showZero, Right: Count 0 (hidden by default)
          </Typography>
        </Stack>
      </div>

      <FeaturesSection
        features={[
          { feature: "Variants", description: "Standard (count), Dot (status only). Circular shape, auto-sizing" },
          { feature: "Colors", description: "Primary, Secondary, Error, Warning, Success, Info, Default" },
          { feature: "Position", description: "Top-right (default), Bottom-right, Top-left, Bottom-left" },
          { feature: "Behavior", description: "Max count (99+), auto-hide on zero. Used for notifications, carts" },
        ]}
      />
    </div>
  )
}

export default BadgeThemed

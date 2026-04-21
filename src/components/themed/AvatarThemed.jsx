import { Box, Avatar as MuiAvatar, Stack, Typography, AvatarGroup } from '@mui/material'
import FeaturesSection from '../docs/FeaturesSection'
import FolderIcon from '@mui/icons-material/Folder'
import AssignmentIcon from '@mui/icons-material/Assignment'

function AvatarThemed() {
  return (
    <div className="themed-showcase">
      {/* Image Avatars */}
      <div className="variant-section">
        <h4>Image Avatars</h4>
        <p>User profile pictures and images.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <MuiAvatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <MuiAvatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <MuiAvatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          </Box>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Note: These use placeholder paths - provide real image URLs for actual usage
          </Typography>
        </Stack>
      </div>

      {/* Letter Avatars */}
      <div className="variant-section">
        <h4>Letter Avatars</h4>
        <p>Display user initials when no image is available.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <MuiAvatar sx={{ bgcolor: 'primary.main' }}>JD</MuiAvatar>
            <MuiAvatar sx={{ bgcolor: 'secondary.main' }}>AM</MuiAvatar>
            <MuiAvatar sx={{ bgcolor: 'error.main' }}>SK</MuiAvatar>
            <MuiAvatar sx={{ bgcolor: 'warning.main' }}>LT</MuiAvatar>
            <MuiAvatar sx={{ bgcolor: 'success.main' }}>RB</MuiAvatar>
            <MuiAvatar sx={{ bgcolor: 'info.main' }}>MC</MuiAvatar>
          </Box>
        </Stack>
      </div>

      {/* Sizes */}
      <div className="variant-section">
        <h4>Sizes</h4>
        <p>Different avatar sizes for various contexts.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <MuiAvatar sx={{ width: 24, height: 24, fontSize: '0.75rem', bgcolor: 'primary.main' }}>S</MuiAvatar>
            <MuiAvatar sx={{ width: 32, height: 32, fontSize: '0.875rem', bgcolor: 'primary.main' }}>M</MuiAvatar>
            <MuiAvatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>D</MuiAvatar>
            <MuiAvatar sx={{ width: 56, height: 56, fontSize: '1.25rem', bgcolor: 'primary.main' }}>L</MuiAvatar>
            <MuiAvatar sx={{ width: 72, height: 72, fontSize: '1.5rem', bgcolor: 'primary.main' }}>XL</MuiAvatar>
          </Box>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Sizes: 24px (small), 32px (medium), 40px (default), 56px (large), 72px (extra large)
          </Typography>
        </Stack>
      </div>

      {/* Icon Avatars */}
      <div className="variant-section">
        <h4>Icon Avatars</h4>
        <p>Use icons for non-user entities like folders or documents.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <MuiAvatar sx={{ bgcolor: 'primary.main' }}>
              <FolderIcon />
            </MuiAvatar>
            <MuiAvatar sx={{ bgcolor: 'secondary.main' }}>
              <AssignmentIcon />
            </MuiAvatar>
            <MuiAvatar sx={{ bgcolor: 'success.main' }}>
              <FolderIcon />
            </MuiAvatar>
          </Box>
        </Stack>
      </div>

      {/* Variants */}
      <div className="variant-section">
        <h4>Variants</h4>
        <p>Circular (default), rounded, and square shapes.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Box sx={{ textAlign: 'center' }}>
              <MuiAvatar sx={{ bgcolor: 'primary.main' }}>C</MuiAvatar>
              <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'text.secondary' }}>
                Circular
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <MuiAvatar variant="rounded" sx={{ bgcolor: 'primary.main' }}>R</MuiAvatar>
              <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'text.secondary' }}>
                Rounded
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <MuiAvatar variant="square" sx={{ bgcolor: 'primary.main' }}>S</MuiAvatar>
              <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'text.secondary' }}>
                Square
              </Typography>
            </Box>
          </Box>
        </Stack>
      </div>

      {/* Avatar Group */}
      <div className="variant-section">
        <h4>Avatar Group</h4>
        <p>Stack multiple avatars to show team members or collaborators.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
              Default (max 5):
            </Typography>
            <AvatarGroup max={5}>
              <MuiAvatar sx={{ bgcolor: 'primary.main' }}>JD</MuiAvatar>
              <MuiAvatar sx={{ bgcolor: 'secondary.main' }}>AM</MuiAvatar>
              <MuiAvatar sx={{ bgcolor: 'error.main' }}>SK</MuiAvatar>
              <MuiAvatar sx={{ bgcolor: 'warning.main' }}>LT</MuiAvatar>
              <MuiAvatar sx={{ bgcolor: 'success.main' }}>RB</MuiAvatar>
              <MuiAvatar sx={{ bgcolor: 'info.main' }}>MC</MuiAvatar>
              <MuiAvatar sx={{ bgcolor: 'primary.main' }}>TH</MuiAvatar>
            </AvatarGroup>
          </Box>

          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
              Max 3:
            </Typography>
            <AvatarGroup max={3}>
              <MuiAvatar sx={{ bgcolor: 'primary.main' }}>JD</MuiAvatar>
              <MuiAvatar sx={{ bgcolor: 'secondary.main' }}>AM</MuiAvatar>
              <MuiAvatar sx={{ bgcolor: 'error.main' }}>SK</MuiAvatar>
              <MuiAvatar sx={{ bgcolor: 'warning.main' }}>LT</MuiAvatar>
              <MuiAvatar sx={{ bgcolor: 'success.main' }}>RB</MuiAvatar>
            </AvatarGroup>
          </Box>

          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
              Total avatars (no max):
            </Typography>
            <AvatarGroup total={24}>
              <MuiAvatar sx={{ bgcolor: 'primary.main' }}>JD</MuiAvatar>
              <MuiAvatar sx={{ bgcolor: 'secondary.main' }}>AM</MuiAvatar>
              <MuiAvatar sx={{ bgcolor: 'error.main' }}>SK</MuiAvatar>
            </AvatarGroup>
          </Box>
        </Stack>
      </div>

      {/* With Badge */}
      <div className="variant-section">
        <h4>With Status Badge</h4>
        <p>Combine with Badge component for online/offline status.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <MuiAvatar sx={{ bgcolor: 'primary.main' }}>JD</MuiAvatar>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 12,
                  height: 12,
                  bgcolor: 'success.main',
                  borderRadius: '50%',
                  border: '2px solid',
                  borderColor: 'background.paper',
                }}
              />
            </Box>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <MuiAvatar sx={{ bgcolor: 'secondary.main' }}>AM</MuiAvatar>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 12,
                  height: 12,
                  bgcolor: 'warning.main',
                  borderRadius: '50%',
                  border: '2px solid',
                  borderColor: 'background.paper',
                }}
              />
            </Box>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <MuiAvatar sx={{ bgcolor: 'error.main' }}>SK</MuiAvatar>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 12,
                  height: 12,
                  bgcolor: 'grey.400',
                  borderRadius: '50%',
                  border: '2px solid',
                  borderColor: 'background.paper',
                }}
              />
            </Box>
          </Box>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Status indicators: Green (online), Yellow (away), Grey (offline)
          </Typography>
        </Stack>
      </div>

      {/* Fallback */}
      <div className="variant-section">
        <h4>Fallback Behavior</h4>
        <p>When image fails to load or is unavailable.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <MuiAvatar alt="Broken Image" src="/broken-image.jpg" />
            <MuiAvatar alt="Broken Image">?</MuiAvatar>
            <MuiAvatar sx={{ bgcolor: 'grey.400' }}>N/A</MuiAvatar>
          </Box>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Left: Default fallback icon, Middle: Custom fallback text, Right: Styled fallback
          </Typography>
        </Stack>
      </div>

      <FeaturesSection
        features={[
          { feature: "Types", description: "Image, Letter (initials), Icon. Fallback to user icon on load failure" },
          { feature: "Variants", description: "Circular (default), Rounded (4px), Square. Avatar groups with overflow" },
          { feature: "Sizes", description: "24px (sm), 32px (md), 40px (default), 56px (lg), 72px (xl)" },
          { feature: "Extras", description: "All theme colors, status badges (12px), bold centered initials" },
        ]}
      />
    </div>
  )
}

export default AvatarThemed

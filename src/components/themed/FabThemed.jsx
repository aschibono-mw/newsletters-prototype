import { Box, Stack, Typography, Fab, useTheme } from '@mui/material'
import FeaturesSection from '../docs/FeaturesSection'
import AddIcon from '@mui/icons-material/AddRounded'
import EditIcon from '@mui/icons-material/EditRounded'
import NavigationIcon from '@mui/icons-material/NavigationRounded'
import FavoriteIcon from '@mui/icons-material/FavoriteRounded'
import ShareIcon from '@mui/icons-material/ShareRounded'
import DeleteIcon from '@mui/icons-material/DeleteRounded'

function FabThemed() {
  const theme = useTheme()
  const defaultBg = theme.palette.grey[200]

  return (
    <div className="themed-showcase">
      {/* Circular FABs - Sizes */}
      <div className="variant-section">
        <h4>Circular FAB Sizes</h4>
        <p>Icon-only floating action buttons in three sizes. Medium is the default.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Fab size="small" aria-label="add" sx={{ backgroundColor: defaultBg }}>
                <AddIcon />
              </Fab>
              <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
                Small (40px)
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Fab aria-label="add" sx={{ backgroundColor: defaultBg }}>
                <AddIcon />
              </Fab>
              <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
                Medium (56px)
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Fab size="large" aria-label="add" sx={{ backgroundColor: defaultBg }}>
                <AddIcon />
              </Fab>
              <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
                Large (Not Standard)
              </Typography>
            </Box>
          </Box>
        </Stack>
      </div>

      {/* Extended FABs */}
      <div className="variant-section">
        <h4>Extended FAB</h4>
        <p>Pill-shaped FAB with icon and text label for enhanced clarity.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <Fab variant="extended" sx={{ backgroundColor: defaultBg, textTransform: 'none' }}>
              <AddIcon sx={{ mr: 1 }} />
              Create New
            </Fab>
            <Fab variant="extended" sx={{ backgroundColor: defaultBg, textTransform: 'none' }}>
              <EditIcon sx={{ mr: 1 }} />
              Edit
            </Fab>
            <Fab variant="extended" sx={{ backgroundColor: defaultBg, textTransform: 'none' }}>
              <NavigationIcon sx={{ mr: 1 }} />
              Navigate
            </Fab>
          </Box>
        </Stack>
      </div>

      {/* Color Variants */}
      <div className="variant-section">
        <h4>Color Variants</h4>
        <p>FABs in different semantic colors (default is grey).</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Fab aria-label="default" sx={{ backgroundColor: defaultBg }}>
                <AddIcon />
              </Fab>
              <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
                Default
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Fab color="inherit" aria-label="inherit" sx={{ backgroundColor: defaultBg }}>
                <AddIcon />
              </Fab>
              <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
                Inherit
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Fab color="primary" aria-label="primary">
                <AddIcon />
              </Fab>
              <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
                Primary
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Fab color="secondary" aria-label="secondary">
                <FavoriteIcon />
              </Fab>
              <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
                Secondary
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Fab color="success" aria-label="success">
                <ShareIcon />
              </Fab>
              <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
                Success
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Fab color="error" aria-label="error">
                <DeleteIcon />
              </Fab>
              <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
                Error
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Fab color="info" aria-label="info">
                <NavigationIcon />
              </Fab>
              <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
                Info
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Fab color="warning" aria-label="warning">
                <EditIcon />
              </Fab>
              <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
                Warning
              </Typography>
            </Box>
          </Box>
        </Stack>
      </div>

      {/* States */}
      <div className="variant-section">
        <h4>States</h4>
        <p>Disabled state with reduced opacity.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Fab aria-label="enabled" sx={{ backgroundColor: defaultBg }}>
                <AddIcon />
              </Fab>
              <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
                Default
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Fab aria-label="hover" sx={{ backgroundColor: defaultBg }}>
                <AddIcon />
              </Fab>
              <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
                Hover
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Fab disabled aria-label="disabled" sx={{ backgroundColor: defaultBg }}>
                <AddIcon />
              </Fab>
              <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
                Disabled
              </Typography>
            </Box>
          </Box>
        </Stack>
      </div>

      <FeaturesSection
        features={[
          { feature: "Shapes", description: "Circular (default) or Extended (pill with icon + text)" },
          { feature: "Sizes", description: "Small (40px), Medium (56px default), 20px icon size" },
          { feature: "Colors", description: "Default (grey), Primary, Secondary, Success, Error, Info, Warning" },
          { feature: "Styling", description: "Elevation 6, raises on hover. Used for Create, Add, Share actions" },
        ]}
      />
    </div>
  )
}

export default FabThemed

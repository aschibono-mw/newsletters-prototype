import { useState } from 'react'
import {
  Box,
  Stack,
  Typography,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
} from '@mui/material'
import FeaturesSection from '../docs/FeaturesSection'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import ShareIcon from '@mui/icons-material/Share'
import PrintIcon from '@mui/icons-material/Print'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import SaveIcon from '@mui/icons-material/Save'
import FavoriteIcon from '@mui/icons-material/Favorite'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
]

const fileActions = [
  { icon: <UploadFileIcon />, name: 'Upload File' },
  { icon: <CreateNewFolderIcon />, name: 'New Folder' },
  { icon: <FileCopyIcon />, name: 'Duplicate' },
]

function SpeedDialThemed() {
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [hidden, setHidden] = useState(false)

  return (
    <div className="themed-showcase">
      {/* Basic Speed Dial */}
      <div className="variant-section">
        <h4>Basic Speed Dial</h4>
        <p>Floating action button with expanding actions on hover/click.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Default (Hover to Open)
            </Typography>
            <Box sx={{ position: 'relative', height: 200, backgroundColor: 'grey.100', borderRadius: 1 }}>
              <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
              >
                {actions.map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                  />
                ))}
              </SpeedDial>
            </Box>
          </Box>
        </Stack>
      </div>

      {/* Controlled Open */}
      <div className="variant-section">
        <h4>Controlled State</h4>
        <p>Programmatically control open/close behavior.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Click to Toggle
            </Typography>
            <Box sx={{ position: 'relative', height: 200, backgroundColor: 'grey.100', borderRadius: 1 }}>
              <SpeedDial
                ariaLabel="SpeedDial controlled"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon openIcon={<CloseIcon />} />}
                open={open1}
                onOpen={() => setOpen1(true)}
                onClose={() => setOpen1(false)}
              >
                {actions.map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={() => setOpen1(false)}
                  />
                ))}
              </SpeedDial>
            </Box>
          </Box>
        </Stack>
      </div>

      {/* Directions */}
      <div className="variant-section">
        <h4>Direction</h4>
        <p>Actions can expand in four directions.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Up (Default)
            </Typography>
            <Box sx={{ position: 'relative', height: 200, backgroundColor: 'grey.100', borderRadius: 1 }}>
              <SpeedDial
                ariaLabel="SpeedDial up"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                direction="up"
              >
                {fileActions.map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                  />
                ))}
              </SpeedDial>
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Down
            </Typography>
            <Box sx={{ position: 'relative', height: 200, backgroundColor: 'grey.100', borderRadius: 1 }}>
              <SpeedDial
                ariaLabel="SpeedDial down"
                sx={{ position: 'absolute', top: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                direction="down"
              >
                {fileActions.map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                  />
                ))}
              </SpeedDial>
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Left
            </Typography>
            <Box sx={{ position: 'relative', height: 100, backgroundColor: 'grey.100', borderRadius: 1 }}>
              <SpeedDial
                ariaLabel="SpeedDial left"
                sx={{ position: 'absolute', top: '50%', right: 16, transform: 'translateY(-50%)' }}
                icon={<SpeedDialIcon />}
                direction="left"
              >
                {fileActions.map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                  />
                ))}
              </SpeedDial>
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Right
            </Typography>
            <Box sx={{ position: 'relative', height: 100, backgroundColor: 'grey.100', borderRadius: 1 }}>
              <SpeedDial
                ariaLabel="SpeedDial right"
                sx={{ position: 'absolute', top: '50%', left: 16, transform: 'translateY(-50%)' }}
                icon={<SpeedDialIcon />}
                direction="right"
              >
                {fileActions.map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                  />
                ))}
              </SpeedDial>
            </Box>
          </Box>
        </Stack>
      </div>

      {/* Custom Icons */}
      <div className="variant-section">
        <h4>Custom Icons</h4>
        <p>Customize the main FAB and open state icons.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Custom Open/Close Icons
            </Typography>
            <Box sx={{ position: 'relative', height: 200, backgroundColor: 'grey.100', borderRadius: 1 }}>
              <SpeedDial
                ariaLabel="SpeedDial custom icon"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon icon={<AddIcon />} openIcon={<CloseIcon />} />}
              >
                {actions.map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                  />
                ))}
              </SpeedDial>
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Single Icon (No Transform)
            </Typography>
            <Box sx={{ position: 'relative', height: 200, backgroundColor: 'grey.100', borderRadius: 1 }}>
              <SpeedDial
                ariaLabel="SpeedDial edit"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<EditIcon />}
              >
                {[
                  { icon: <FileCopyIcon />, name: 'Copy' },
                  { icon: <SaveIcon />, name: 'Save' },
                  { icon: <FavoriteIcon />, name: 'Favorite' },
                ].map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                  />
                ))}
              </SpeedDial>
            </Box>
          </Box>
        </Stack>
      </div>

      {/* Tooltip Placement */}
      <div className="variant-section">
        <h4>Tooltip Placement</h4>
        <p>Tooltips can appear in different positions.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Persistent Tooltips (Always Visible)
            </Typography>
            <Box sx={{ position: 'relative', height: 200, backgroundColor: 'grey.100', borderRadius: 1 }}>
              <SpeedDial
                ariaLabel="SpeedDial persistent tooltips"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                open={open2}
                onOpen={() => setOpen2(true)}
                onClose={() => setOpen2(false)}
              >
                {actions.map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    tooltipOpen
                    onClick={() => setOpen2(false)}
                  />
                ))}
              </SpeedDial>
            </Box>
          </Box>
        </Stack>
      </div>

      {/* Hidden State */}
      <div className="variant-section">
        <h4>Visibility</h4>
        <p>SpeedDial can be conditionally hidden.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Toggle Visibility
            </Typography>
            <Box
              onClick={() => setHidden(!hidden)}
              sx={{
                mb: 2,
                cursor: 'pointer',
                color: 'primary.main',
                fontWeight: 500,
              }}
            >
              Click to {hidden ? 'show' : 'hide'} SpeedDial
            </Box>
            <Box sx={{ position: 'relative', height: 200, backgroundColor: 'grey.100', borderRadius: 1 }}>
              <SpeedDial
                ariaLabel="SpeedDial hidden"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                hidden={hidden}
              >
                {actions.map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                  />
                ))}
              </SpeedDial>
            </Box>
          </Box>
        </Stack>
      </div>

      <FeaturesSection
        features={[
          { feature: "Action Expansion", description: "FAB expands to reveal related actions on hover, click, or programmatic control" },
          { feature: "Direction Options", description: "Actions expand up (default), down, left, or right based on container position" },
          { feature: "SpeedDialIcon", description: "Animated icon that transforms between closed (Add) and open (Close) states" },
          { feature: "Tooltip Labels", description: "Each action has a tooltip; tooltipOpen prop shows labels persistently" },
          { feature: "Hidden State", description: "hidden prop allows conditional visibility (e.g., hide on scroll)" },
        ]}
      />
    </div>
  )
}

export default SpeedDialThemed

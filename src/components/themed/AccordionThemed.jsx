import { useState } from 'react'
import {
  Box,
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Button,
  Divider,
  Avatar,
  IconButton,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import FeaturesSection from '../docs/FeaturesSection'
import ExpandMoreIcon from '@mui/icons-material/ExpandMoreRounded'
import VisibilityIcon from '@mui/icons-material/VisibilityRounded'
import MoreVertIcon from '@mui/icons-material/MoreVertRounded'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

// Indicator component
const Indicator = styled(Box)(({ theme, color = 'default', size = 'default' }) => {
  const colorMap = {
    blue: {
      border: '#2196F3',
      background: '#E3F2FD',
      text: '#2196F3',
    },
    default: {
      border: theme.palette.grey[400],
      background: theme.palette.grey[100],
      text: theme.palette.text.primary,
    },
  }

  const colors = colorMap[color] || colorMap.default
  const isSmall = size === 'small'

  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: isSmall ? '2px' : '4px',
    padding: isSmall ? '2px 6px' : '4px 8px',
    borderRadius: '4px',
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.background,
    color: colors.text,
    fontWeight: 700,
    fontSize: isSmall ? '10px' : '12px',
    lineHeight: isSmall ? '16px' : '16px',
    whiteSpace: 'nowrap',
  }
})

function AccordionThemed() {
  const [expanded, setExpanded] = useState('panel1')

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <div className="themed-showcase">
      {/* Header Options */}
      <div className="variant-section">
        <h4>Header Options</h4>
        <p>Various header configurations with icons, avatars, details, descriptions, and indicators.</p>
        <Stack spacing={2}>
          {/* Basic Header */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Basic Header
            </Typography>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Basic Header</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  Simple accordion with just a text header and expand icon.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>

          {/* With icon/avatar */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              With icon/avatar
            </Typography>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <VisibilityIcon sx={{ fontSize: 20 }} />
                  </Avatar>
                  <Typography>With icon/avatar</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  Accordion header with a leading avatar or icon for visual identification.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>

          {/* With icon & detail */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              With icon & detail
            </Typography>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 1, pr: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <InfoOutlinedIcon sx={{ color: 'text.secondary' }} />
                    <Typography>With icon & detail</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Detail
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  Combines a leading icon with trailing detail text for additional context.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>

          {/* With description text */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              With description text
            </Typography>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ flex: 1 }}>
                  <Typography>With description text</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Description
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  Header with a secondary description line for additional context.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>

          {/* With indicator */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              With indicator
            </Typography>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 1, pr: 1 }}>
                  <Typography>With indicator</Typography>
                  <Indicator color="blue">Indicator</Indicator>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  Header with a trailing indicator for status or categorization.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>

          {/* All bells & whistles */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              All bells & whistles
            </Typography>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 1, pr: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                      <VisibilityIcon sx={{ fontSize: 20 }} />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography>All bells & whistles</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Description
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Detail
                    </Typography>
                    <Indicator color="blue">Indicator</Indicator>
                    <Box
                      onClick={(e) => e.stopPropagation()}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        cursor: 'pointer',
                        color: 'text.secondary',
                        '&:hover': {
                          bgcolor: 'action.hover',
                        },
                      }}
                    >
                      <MoreVertIcon sx={{ fontSize: 20 }} />
                    </Box>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  Combines avatar, description, detail text, indicator, and action buttons.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Stack>
      </div>

      {/* States */}
      <div className="variant-section">
        <h4>States</h4>
        <p>Different accordion states including closed, disabled, and open.</p>
        <Stack spacing={2}>
          {/* Closed */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Closed
            </Typography>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Closed</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  This accordion is in the default collapsed state.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>

          {/* Disabled */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Disabled
            </Typography>
            <Accordion disabled>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Disabled</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  This accordion cannot be interacted with.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>

          {/* Open w/ slotted item */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Open w/ slotted item
            </Typography>
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Open w/ slotted item</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  sx={{
                    p: 3,
                    backgroundColor: 'rgba(0, 150, 136, 0.08)',
                    borderRadius: 1,
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="body2" sx={{ color: 'primary.main' }}>
                    Slot
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Stack>
      </div>

      {/* Controlled Accordion */}
      <div className="variant-section">
        <h4>Controlled Accordion</h4>
        <p>Only one panel can be expanded at a time (like radio buttons).</p>
        <Stack spacing={2}>
          <Box>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  General Settings
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                  Aliquam eget maximus est, id dignissim quam.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ width: '33%', flexShrink: 0 }}>Users</Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  You are currently not an owner
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
                  varius pulvinar diam eros in elit. Pellentesque convallis laoreet
                  laoreet.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  Advanced Settings
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  Filtering has been entirely disabled for whole web server
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                  amet egestas eros, vitae egestas augue. Duis vel est augue.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Stack>
      </div>

      {/* With Actions */}
      <div className="variant-section">
        <h4>With Actions</h4>
        <p>Accordion with action buttons in the footer for confirmations or decisions.</p>
        <Stack spacing={2}>
          <Box>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Confirmation Required</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  This action cannot be undone. Please review carefully before proceeding.
                </Typography>
              </AccordionDetails>
              <Divider />
              <AccordionActions>
                <Button size="small">Cancel</Button>
                <Button size="small" variant="contained">
                  Agree
                </Button>
              </AccordionActions>
            </Accordion>
          </Box>
        </Stack>
      </div>

      <FeaturesSection
        features={[
          { feature: "Header Options", description: "Basic text, Icon/Avatar, Detail text, Description, Indicator chip, Action buttons. ExpandMore icon rotates 180° when expanded" },
          { feature: "Behavior & States", description: "Controlled (single expand) or Uncontrolled (multiple). States: Collapsed, Expanded, Disabled, Hover, Focus. Elevation 1 (increases on hover)" },
          { feature: "Animation & Parts", description: "Height animation (300ms). Parts: AccordionSummary (header), AccordionDetails (content), AccordionActions (footer buttons)" },
          { feature: "Common Use Cases", description: "FAQs, settings, filters, multi-step forms, content organization, attribute management. ARIA expanded, keyboard navigation (Tab, Enter, Space)" },
        ]}
      />
    </div>
  )
}

export default AccordionThemed

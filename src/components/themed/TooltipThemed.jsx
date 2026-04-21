import { Box, Tooltip as MuiTooltip, Stack, Typography, Button, IconButton, Fab } from '@mui/material'
import FeaturesSection from '../docs/FeaturesSection'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import InfoIcon from '@mui/icons-material/Info'

function TooltipThemed() {
  return (
    <div className="themed-showcase">
      {/* Basic Tooltip */}
      <div className="variant-section">
        <h4>Basic Tooltip</h4>
        <p>Display helpful text on hover.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <MuiTooltip title="Tooltip text">
              <Button variant="outlined">Hover over me</Button>
            </MuiTooltip>
            <MuiTooltip title="Delete this item permanently">
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </MuiTooltip>
            <MuiTooltip title="Add new item">
              <Fab color="primary" size="small">
                <AddIcon />
              </Fab>
            </MuiTooltip>
          </Box>
        </Stack>
      </div>

      {/* Positioned Tooltips */}
      <div className="variant-section">
        <h4>Positioned Tooltips</h4>
        <p>Control tooltip placement relative to anchor element.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
              Top positions:
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <MuiTooltip title="Top Start" placement="top-start">
                <Button variant="outlined" size="small">Top Start</Button>
              </MuiTooltip>
              <MuiTooltip title="Top" placement="top">
                <Button variant="outlined" size="small">Top</Button>
              </MuiTooltip>
              <MuiTooltip title="Top End" placement="top-end">
                <Button variant="outlined" size="small">Top End</Button>
              </MuiTooltip>
            </Box>
          </Box>

          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
              Bottom positions:
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <MuiTooltip title="Bottom Start" placement="bottom-start">
                <Button variant="outlined" size="small">Bottom Start</Button>
              </MuiTooltip>
              <MuiTooltip title="Bottom" placement="bottom">
                <Button variant="outlined" size="small">Bottom</Button>
              </MuiTooltip>
              <MuiTooltip title="Bottom End" placement="bottom-end">
                <Button variant="outlined" size="small">Bottom End</Button>
              </MuiTooltip>
            </Box>
          </Box>

          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
              Left & Right positions:
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <MuiTooltip title="Left" placement="left">
                <Button variant="outlined" size="small">Left</Button>
              </MuiTooltip>
              <MuiTooltip title="Right" placement="right">
                <Button variant="outlined" size="small">Right</Button>
              </MuiTooltip>
            </Box>
          </Box>
        </Stack>
      </div>

      {/* Arrow Tooltips */}
      <div className="variant-section">
        <h4>Arrow Tooltips</h4>
        <p>Add visual arrow pointing to the anchor element.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <MuiTooltip title="With arrow" arrow>
              <Button variant="outlined">Top Arrow</Button>
            </MuiTooltip>
            <MuiTooltip title="With arrow" arrow placement="bottom">
              <Button variant="outlined">Bottom Arrow</Button>
            </MuiTooltip>
            <MuiTooltip title="With arrow" arrow placement="left">
              <Button variant="outlined">Left Arrow</Button>
            </MuiTooltip>
            <MuiTooltip title="With arrow" arrow placement="right">
              <Button variant="outlined">Right Arrow</Button>
            </MuiTooltip>
          </Box>
        </Stack>
      </div>

      {/* Multiline Tooltip */}
      <div className="variant-section">
        <h4>Multiline Tooltip</h4>
        <p>Display longer help text across multiple lines.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <MuiTooltip title="This is a much longer tooltip that spans multiple lines to provide more detailed information to the user.">
              <Button variant="outlined">Long tooltip</Button>
            </MuiTooltip>
            <MuiTooltip
              title={
                <Box>
                  <Typography variant="subtitle2">Rich Content Tooltip</Typography>
                  <Typography variant="body2">You can include custom JSX content with formatting, lists, and more.</Typography>
                </Box>
              }
            >
              <Button variant="outlined">Rich tooltip</Button>
            </MuiTooltip>
          </Box>
        </Stack>
      </div>

      {/* Interactive Tooltips */}
      <div className="variant-section">
        <h4>Interactive Tooltips</h4>
        <p>Allow users to interact with tooltip content.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <MuiTooltip
              title={
                <Box sx={{ p: 1 }}>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>Interactive Tooltip</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>You can hover over this tooltip.</Typography>
                  <Button size="small" variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>
                    Click me
                  </Button>
                </Box>
              }
              disableInteractive={false}
            >
              <Button variant="outlined">Hover for interactive tooltip</Button>
            </MuiTooltip>
          </Box>
        </Stack>
      </div>

      {/* Disabled Elements */}
      <div className="variant-section">
        <h4>Disabled Elements</h4>
        <p>Tooltips on disabled elements require wrapper span.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <MuiTooltip title="This button is disabled">
              <span>
                <Button variant="outlined" disabled>
                  Disabled Button
                </Button>
              </span>
            </MuiTooltip>
            <MuiTooltip title="This action is unavailable">
              <span>
                <IconButton disabled>
                  <InfoIcon />
                </IconButton>
              </span>
            </MuiTooltip>
          </Box>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Note: Disabled elements don't trigger events, so wrap them in a span element
          </Typography>
        </Stack>
      </div>

      {/* Show/Hide Triggers */}
      <div className="variant-section">
        <h4>Show/Hide Triggers</h4>
        <p>Control when tooltips appear (hover, click, focus).</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <MuiTooltip title="Hover tooltip" enterDelay={500} leaveDelay={200}>
              <Button variant="outlined">Hover (500ms delay)</Button>
            </MuiTooltip>
            <MuiTooltip title="Click tooltip" disableHoverListener>
              <Button variant="outlined">Click to toggle</Button>
            </MuiTooltip>
            <MuiTooltip title="Focus tooltip" disableHoverListener disableTouchListener>
              <Button variant="outlined">Focus (tab) to show</Button>
            </MuiTooltip>
          </Box>
        </Stack>
      </div>

      {/* Common Use Cases */}
      <div className="variant-section">
        <h4>Common Use Cases</h4>
        <p>Real-world tooltip patterns.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
              Icon buttons with descriptions:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <MuiTooltip title="Delete" arrow>
                <IconButton size="small">
                  <DeleteIcon />
                </IconButton>
              </MuiTooltip>
              <MuiTooltip title="Add new item" arrow>
                <IconButton size="small">
                  <AddIcon />
                </IconButton>
              </MuiTooltip>
              <MuiTooltip title="More information" arrow>
                <IconButton size="small">
                  <InfoIcon />
                </IconButton>
              </MuiTooltip>
            </Box>
          </Box>

          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
              Truncated text with full content on hover:
            </Typography>
            <MuiTooltip title="This is the full text that was truncated in the UI for space constraints">
              <Typography
                variant="body2"
                sx={{
                  maxWidth: 200,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  cursor: 'help',
                }}
              >
                This is the full text that was truncated...
              </Typography>
            </MuiTooltip>
          </Box>

          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
              Help text for form fields:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2">API Key</Typography>
              <MuiTooltip title="Your API key can be found in Account Settings > API Access" arrow placement="right">
                <InfoIcon sx={{ fontSize: 16, color: 'text.secondary', cursor: 'help' }} />
              </MuiTooltip>
            </Box>
          </Box>
        </Stack>
      </div>

      <FeaturesSection
        features={[
          { feature: "Placement", description: "Top, Bottom, Left, Right (with -start/-end). Optional arrow pointer" },
          { feature: "Triggers", description: "Hover (default), Focus, Click. enterDelay 100ms, leaveDelay 0ms" },
          { feature: "Content", description: "Plain text or rich JSX. Interactive mode for hovering over content" },
          { feature: "Styling", description: "Dark grey bg, white text, 12-14px, ~220px max width with wrapping" },
        ]}
      />
    </div>
  )
}

export default TooltipThemed

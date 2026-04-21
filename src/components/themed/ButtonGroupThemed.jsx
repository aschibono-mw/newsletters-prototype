import { useState } from 'react'
import {
  Box,
  Stack,
  Typography,
  Button,
  ButtonGroup,
  Menu,
  MenuItem,
} from '@mui/material'
import FeaturesSection from '../docs/FeaturesSection'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'

function ButtonGroupThemed() {
  const [anchorEl, setAnchorEl] = useState(null)
  const menuOpen = Boolean(anchorEl)

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className="themed-showcase">
      {/* Variants */}
      <div className="variant-section">
        <h4>Variants</h4>
        <p>Three button variants applied consistently across the group.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Contained
            </Typography>
            <ButtonGroup variant="contained" aria-label="contained button group">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Outlined
            </Typography>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Text
            </Typography>
            <ButtonGroup variant="text" aria-label="text button group">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>
        </Stack>
      </div>

      {/* Sizes */}
      <div className="variant-section">
        <h4>Sizes</h4>
        <p>Three size options for different contexts.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Small
            </Typography>
            <ButtonGroup size="small" variant="contained" aria-label="small button group">
              <Button>Save</Button>
              <Button>Edit</Button>
              <Button>Delete</Button>
            </ButtonGroup>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Medium (Default)
            </Typography>
            <ButtonGroup size="medium" variant="contained" aria-label="medium button group">
              <Button>Save</Button>
              <Button>Edit</Button>
              <Button>Delete</Button>
            </ButtonGroup>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Large
            </Typography>
            <ButtonGroup size="large" variant="contained" aria-label="large button group">
              <Button>Save</Button>
              <Button>Edit</Button>
              <Button>Delete</Button>
            </ButtonGroup>
          </Box>
        </Stack>
      </div>

      {/* Colors */}
      <div className="variant-section">
        <h4>Colors</h4>
        <p>Color options applied to the entire button group.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Primary
            </Typography>
            <ButtonGroup color="primary" variant="contained">
              <Button>Action 1</Button>
              <Button>Action 2</Button>
              <Button>Action 3</Button>
            </ButtonGroup>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Secondary
            </Typography>
            <ButtonGroup color="secondary" variant="contained">
              <Button>Action 1</Button>
              <Button>Action 2</Button>
              <Button>Action 3</Button>
            </ButtonGroup>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Error (Outlined)
            </Typography>
            <ButtonGroup color="error" variant="outlined">
              <Button>Reject</Button>
              <Button>Delete</Button>
              <Button>Remove</Button>
            </ButtonGroup>
          </Box>
        </Stack>
      </div>

      {/* Orientation */}
      <div className="variant-section">
        <h4>Orientation</h4>
        <p>Horizontal or vertical button arrangements.</p>
        <Stack direction="row" spacing={4}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Horizontal (Default)
            </Typography>
            <ButtonGroup variant="outlined" aria-label="horizontal button group">
              <Button>Left</Button>
              <Button>Center</Button>
              <Button>Right</Button>
            </ButtonGroup>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Vertical
            </Typography>
            <ButtonGroup
              orientation="vertical"
              variant="outlined"
              aria-label="vertical button group"
            >
              <Button>Top</Button>
              <Button>Middle</Button>
              <Button>Bottom</Button>
            </ButtonGroup>
          </Box>
        </Stack>
      </div>

      {/* Split Button */}
      <div className="variant-section">
        <h4>Split Button</h4>
        <p>Primary action with dropdown for additional options.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Split Button with Menu
            </Typography>
            <ButtonGroup variant="contained" aria-label="split button">
              <Button>Save</Button>
              <Button
                size="small"
                aria-controls={menuOpen ? 'split-button-menu' : undefined}
                aria-expanded={menuOpen ? 'true' : undefined}
                aria-label="select save option"
                aria-haspopup="menu"
                onClick={handleMenuClick}
              >
                <ArrowDropDownIcon />
              </Button>
            </ButtonGroup>
            <Menu
              id="split-button-menu"
              anchorEl={anchorEl}
              open={menuOpen}
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
              <MenuItem onClick={handleMenuClose}>Save as Draft</MenuItem>
              <MenuItem onClick={handleMenuClose}>Save and Publish</MenuItem>
              <MenuItem onClick={handleMenuClose}>Save and Close</MenuItem>
            </Menu>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Outlined Split Button
            </Typography>
            <ButtonGroup variant="outlined" aria-label="outlined split button">
              <Button>Export</Button>
              <Button size="small" aria-label="select export option">
                <ArrowDropDownIcon />
              </Button>
            </ButtonGroup>
          </Box>
        </Stack>
      </div>

      {/* Icon Buttons */}
      <div className="variant-section">
        <h4>Icon Button Groups</h4>
        <p>Grouped icon buttons for toolbar-style actions.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Formatting Toolbar
            </Typography>
            <ButtonGroup variant="outlined" aria-label="text formatting">
              <Button aria-label="bold">
                <FormatBoldIcon />
              </Button>
              <Button aria-label="italic">
                <FormatItalicIcon />
              </Button>
              <Button aria-label="underline">
                <FormatUnderlinedIcon />
              </Button>
            </ButtonGroup>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Contained Icons
            </Typography>
            <ButtonGroup variant="contained" aria-label="contained icon group">
              <Button aria-label="bold">
                <FormatBoldIcon />
              </Button>
              <Button aria-label="italic">
                <FormatItalicIcon />
              </Button>
              <Button aria-label="underline">
                <FormatUnderlinedIcon />
              </Button>
            </ButtonGroup>
          </Box>
        </Stack>
      </div>

      {/* Disabled State */}
      <div className="variant-section">
        <h4>Disabled State</h4>
        <p>Entire group or individual buttons can be disabled.</p>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Entire Group Disabled
            </Typography>
            <ButtonGroup disabled variant="contained" aria-label="disabled button group">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Individual Button Disabled
            </Typography>
            <ButtonGroup variant="outlined" aria-label="button group with disabled">
              <Button>Active</Button>
              <Button disabled>Disabled</Button>
              <Button>Active</Button>
            </ButtonGroup>
          </Box>
        </Stack>
      </div>

      <FeaturesSection
        features={[
          { feature: "Variant Consistency", description: "Contained, outlined, or text variants applied uniformly to all grouped buttons" },
          { feature: "Split Button Pattern", description: "Primary action + dropdown trigger using ArrowDropDownIcon with Menu component" },
          { feature: "Orientation", description: "Horizontal (default) or vertical orientation for different layout needs" },
          { feature: "Size Options", description: "Small, medium (default), and large sizes with consistent spacing" },
          { feature: "Icon Groups", description: "Icon-only buttons grouped for toolbar-style interfaces (formatting, alignment)" },
        ]}
      />
    </div>
  )
}

export default ButtonGroupThemed

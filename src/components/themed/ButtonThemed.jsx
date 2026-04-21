import { Button as MuiButton, IconButton as MuiIconButton, CircularProgress, Badge, Tooltip, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { components } from '../../theme-tokens';
import FeaturesSection from '../docs/FeaturesSection';

// Styled Button using custom design system tokens
const ThemedButton = styled(MuiButton)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: components.button.borderRadius,
  fontWeight: 500,
  transition: 'all 0.2s ease',
  boxShadow: 'none',

  '&:hover': {
    boxShadow: 'none',
  },

  // SIZE VARIANTS
  '&.MuiButton-sizeSmall': {
    padding: components.button.padding.small,
    fontSize: components.button.fontSize.small,
  },
  '&.MuiButton-sizeMedium': {
    padding: components.button.padding.medium,
    fontSize: components.button.fontSize.medium,
  },
  '&.MuiButton-sizeLarge': {
    padding: components.button.padding.large,
    fontSize: components.button.fontSize.large,
  },

  // CONTAINED VARIANTS
  '&.MuiButton-containedPrimary': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      outline: `2px solid ${theme.palette.primary.light}`,
      outlineOffset: '2px',
    },
    '&:active': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  '&.MuiButton-containedSecondary': {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
    '&:focus': {
      backgroundColor: theme.palette.secondary.main,
      outline: `2px solid ${theme.palette.secondary.light}`,
      outlineOffset: '2px',
    },
    '&:active': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  '&.MuiButton-containedError': {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
  '&.MuiButton-containedWarning': {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.warning.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.warning.dark,
    },
  },
  '&.MuiButton-containedSuccess': {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
  '&.MuiButton-containedInfo': {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.info.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.info.dark,
    },
  },

  // CONTAINED INHERIT (Neutral Grey)
  '&.MuiButton-contained:not([class*="contained"])': {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.grey[400],
    },
    '&:focus': {
      outline: `2px solid ${theme.palette.grey[500]}`,
      outlineOffset: '2px',
    },
  },

  // OUTLINED VARIANTS
  '&.MuiButton-outlinedPrimary': {
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      border: `1px solid ${theme.palette.primary.main}`,
    },
    '&:focus': {
      outline: `2px solid ${theme.palette.primary.light}`,
      outlineOffset: '2px',
    },
  },
  '&.MuiButton-outlinedSecondary': {
    border: `1px solid ${theme.palette.secondary.main}`,
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      border: `1px solid ${theme.palette.secondary.main}`,
    },
  },
  '&.MuiButton-outlinedError': {
    border: `1px solid ${theme.palette.error.main}`,
    color: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.light,
      border: `1px solid ${theme.palette.error.main}`,
    },
  },
  '&.MuiButton-outlined': {
    border: `1px solid ${theme.palette.divider}`,
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      border: `1px solid ${theme.palette.divider}`,
    },
  },

  // TEXT VARIANTS
  '&.MuiButton-textPrimary': {
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  '&.MuiButton-textSecondary': {
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  '&.MuiButton-textError': {
    color: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.light,
    },
  },
  '&.MuiButton-text': {
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },

  // DISABLED STATE
  '&.Mui-disabled': {
    opacity: 0.4,
    cursor: 'not-allowed',
  },
}));

// Styled Icon Button using custom tokens
const ThemedIconButton = styled(MuiIconButton)(({ theme }) => ({
  borderRadius: components.button.borderRadius,
  padding: '8px',
  transition: 'all 0.2s ease',
  color: theme.palette.text.secondary, // Always use text.secondary (#616161)

  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },

  '&.Mui-disabled': {
    opacity: 0.4,
  },
}));

export default function ButtonThemed() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDropdownClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="themed-showcase">
      {/* ATTRIBUTES HEADER */}
      <section className="variant-section">
        <h3 style={{ fontSize: '2rem', marginBottom: '2rem', fontWeight: 600 }}>Attributes</h3>
      </section>

      {/* STATES */}
      <section className="variant-section">
        <h4>States</h4>
        <p>All interactive states for contained primary buttons.</p>
        <div className="button-group">
          <ThemedButton variant="contained" color="primary">Default</ThemedButton>
          <ThemedButton variant="contained" color="primary" sx={{ '&:hover': { backgroundColor: 'primary.dark' } }}>
            Hover
          </ThemedButton>
          <ThemedButton variant="contained" color="primary" sx={{ '&:active': { backgroundColor: 'primary.dark' } }}>
            Press
          </ThemedButton>
          <ThemedButton
            variant="contained"
            color="primary"
            sx={{
              outline: '2px solid',
              outlineColor: 'primary.light',
              outlineOffset: '2px'
            }}
          >
            Focus
          </ThemedButton>
          <ThemedButton variant="contained" color="primary" disabled>Disabled</ThemedButton>
          <ThemedButton
            variant="contained"
            color="primary"
            disabled
            startIcon={<CircularProgress size={16} sx={{ color: (theme) => theme.palette.primary.contrastText }} />}
          >
            Loading
          </ThemedButton>
        </div>
      </section>

      {/* TYPES */}
      <section className="variant-section">
        <h4>Types</h4>
        <p>Button variants: contained, outlined, text, and icon.</p>
        <div className="button-group" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
          <ThemedButton variant="contained" color="primary">Contained: Primary</ThemedButton>
          <ThemedButton variant="contained">Contained: Inherit</ThemedButton>
          <ThemedButton variant="outlined" color="primary">Outline: Primary</ThemedButton>
          <ThemedButton variant="outlined">Outline: Inherit</ThemedButton>
          <ThemedButton variant="text" color="primary">Text: Primary</ThemedButton>
          <ThemedButton variant="text">Text: Inherit</ThemedButton>
          <ThemedIconButton>
            <SentimentSatisfiedAltIcon />
          </ThemedIconButton>
          <ThemedIconButton>
            <SentimentSatisfiedAltIcon />
          </ThemedIconButton>
        </div>
      </section>

      {/* SIZES */}
      <section className="variant-section">
        <h4>Sizes</h4>
        <p>Medium (default) and small sizes for buttons and icon buttons.</p>
        <div className="button-group" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <ThemedButton variant="contained" color="primary" size="medium">Medium</ThemedButton>
          <ThemedButton variant="contained" color="primary" size="small">Small</ThemedButton>
          <ThemedIconButton size="medium">
            <SentimentSatisfiedAltIcon />
          </ThemedIconButton>
          <ThemedIconButton size="small">
            <SentimentSatisfiedAltIcon fontSize="small" />
          </ThemedIconButton>
        </div>
      </section>

      {/* ICONS */}
      <section className="variant-section">
        <h4>Icons</h4>
        <p>Buttons with front icons, back icons, dropdowns, and icon-only variants. Icons use text.secondary (#616161).</p>
        <div className="button-group" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <ThemedButton variant="contained" color="primary" startIcon={<SentimentSatisfiedAltIcon />}>
            Front Icon
          </ThemedButton>
          <ThemedButton variant="contained" color="primary" endIcon={<SentimentSatisfiedAltIcon />}>
            Back Icon
          </ThemedButton>
          <ThemedButton
            variant="contained"
            color="primary"
            endIcon={<ArrowDropDownIcon />}
            onClick={handleDropdownClick}
          >
            Dropdown
          </ThemedButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleDropdownClose}
          >
            <MenuItem onClick={handleDropdownClose}>Option 1</MenuItem>
            <MenuItem onClick={handleDropdownClose}>Option 2</MenuItem>
            <MenuItem onClick={handleDropdownClose}>Option 3</MenuItem>
          </Menu>
          <ThemedButton variant="outlined" startIcon={<SentimentSatisfiedAltIcon />}>
            Button
          </ThemedButton>
          <ThemedIconButton>
            <SentimentSatisfiedAltIcon />
          </ThemedIconButton>
        </div>
      </section>

      {/* BADGES/TOOLTIPS */}
      <section className="variant-section">
        <h4>Badges/Tooltips</h4>
        <p>Icon buttons with notification badges and tooltips. Icons always use text.secondary.</p>
        <div className="button-group" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Badge badgeContent={1} color="primary">
            <ThemedIconButton>
              <NotificationsIcon />
            </ThemedIconButton>
          </Badge>
          <Tooltip title="Action">
            <ThemedIconButton>
              <SentimentSatisfiedAltIcon />
            </ThemedIconButton>
          </Tooltip>
        </div>
      </section>

      {/* ADDITIONAL SECTIONS */}
      <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '2px solid #e0e0e0' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '2rem', fontWeight: 600 }}>Additional Patterns</h3>

        <section className="variant-section">
          <h4>All Colors (Contained)</h4>
          <div className="button-group">
            <ThemedButton variant="contained" color="primary">Primary</ThemedButton>
            <ThemedButton variant="contained">Neutral</ThemedButton>
            <ThemedButton variant="contained" color="success">Success</ThemedButton>
            <ThemedButton variant="contained" color="error">Error</ThemedButton>
            <ThemedButton variant="contained" color="warning">Warning</ThemedButton>
            <ThemedButton variant="contained" color="info">Info</ThemedButton>
          </div>
        </section>

        <section className="variant-section">
          <h4>Neutral Button Variants</h4>
          <p>Grey contained and text buttons for secondary actions.</p>
          <div className="button-group">
            <ThemedButton variant="contained">Contained Neutral</ThemedButton>
            <ThemedButton variant="contained" disabled>Contained Disabled</ThemedButton>
            <ThemedButton variant="text">Text Neutral</ThemedButton>
            <ThemedButton variant="text" disabled>Text Disabled</ThemedButton>
          </div>
        </section>

        <section className="variant-section">
          <h4>Outlined Variants</h4>
          <div className="button-group">
            <ThemedButton variant="outlined" color="primary">Primary</ThemedButton>
            <ThemedButton variant="outlined">Inherit</ThemedButton>
            <ThemedButton variant="outlined" color="success">Success</ThemedButton>
            <ThemedButton variant="outlined" color="error">Error</ThemedButton>
            <ThemedButton variant="outlined" color="primary" disabled>Disabled</ThemedButton>
          </div>
        </section>

        <section className="variant-section">
          <h4>Text Variants</h4>
          <div className="button-group">
            <ThemedButton variant="text" color="primary">Primary</ThemedButton>
            <ThemedButton variant="text">Inherit</ThemedButton>
            <ThemedButton variant="text" color="success">Success</ThemedButton>
            <ThemedButton variant="text" color="error">Error</ThemedButton>
            <ThemedButton variant="text" disabled>Disabled</ThemedButton>
          </div>
        </section>

        <section className="variant-section">
          <h4>With Icons (More Examples)</h4>
          <div className="button-group">
            <ThemedButton variant="contained" color="primary" startIcon={<AddIcon />}>
              Add Item
            </ThemedButton>
            <ThemedButton variant="outlined" color="primary" endIcon={<DownloadIcon />}>
              Download
            </ThemedButton>
            <ThemedButton variant="contained" color="error" startIcon={<DeleteIcon />}>
              Delete
            </ThemedButton>
          </div>
        </section>

        <FeaturesSection
          features={[
            { feature: "Theming", description: "Teal/purple palette, adapts to colorblind modes, 6px radius, flat (no shadows)" },
            { feature: "States", description: "Default, hover, focus (2px outline w/ offset), pressed, disabled (40% opacity)" },
            { feature: "Variants", description: "Contained, outlined, text in primary/success/error/warning/info colors" },
            { feature: "Icons", description: "startIcon/endIcon props, icon buttons use text.secondary, badge/tooltip support" },
          ]}
        />
      </div>
    </div>
  );
}

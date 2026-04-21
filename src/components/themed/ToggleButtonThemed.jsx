import React from 'react';
import {
  ToggleButton as MuiToggleButton,
  ToggleButtonGroup as MuiToggleButtonGroup,
  Stack,
  Box,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { typography } from '../../theme-tokens';
import FeaturesSection from '../docs/FeaturesSection';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import ViewListIcon from '@mui/icons-material/ViewList';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import CheckIcon from '@mui/icons-material/Check';

// Styled ToggleButton using custom design system tokens
// Selected: #1D9F9F at 12% opacity background with teal border, text stays dark
// Unselected: Background adapts to theme with grey border
const ThemedToggleButton = styled(MuiToggleButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.grey[300]}`,
  backgroundColor: theme.palette.background.paper,
  fontSize: typography.body1.fontSize,
  fontWeight: 400,
  textTransform: 'none',
  padding: '8px 16px',

  '&.Mui-selected': {
    backgroundColor: 'rgba(29, 159, 159, 0.12)', // #1D9F9F at 12% opacity
    color: theme.palette.text.primary, // Text stays dark
    border: `1px solid ${theme.palette.primary.main}`,

    '&:hover': {
      backgroundColor: 'rgba(29, 159, 159, 0.16)', // Slightly more opacity on hover
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },

  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },

  '&.Mui-disabled': {
    opacity: 0.38,
    border: `1px solid ${theme.palette.grey[300]}`,
  },

  // Small size
  '&.MuiToggleButton-sizeSmall': {
    padding: '4px 12px',
    fontSize: typography.caption.fontSize,
  },
}));

// Styled ToggleButtonGroup
const ThemedToggleButtonGroup = styled(MuiToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButton-root': {
    '&:not(:first-of-type)': {
      marginLeft: '-1px',
      borderLeft: `1px solid ${theme.palette.grey[300]}`,
    },
  },
}));

// Export styled components for reuse
export { ThemedToggleButton, ThemedToggleButtonGroup };

export default function ToggleButtonThemed() {
  const theme = useTheme();

  const [formats, setFormats] = React.useState(() => ['bold']);
  const [alignment, setAlignment] = React.useState('left');
  const [view, setView] = React.useState('module');
  const [days, setDays] = React.useState(() => ['tuesday', 'wednesday']);
  const [platform, setPlatform] = React.useState('web');

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const handleView = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const handleDays = (event, newDays) => {
    setDays(newDays);
  };

  const handlePlatform = (event, newPlatform) => {
    if (newPlatform !== null) {
      setPlatform(newPlatform);
    }
  };

  return (
    <div className="themed-showcase">
      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Basic Toggle Button Examples
        </h4>
        <Stack spacing={4}>
          <Box>
            <p style={{ fontSize: '0.875rem', color: theme.palette.text.secondary, margin: '0 0 0.5rem 0' }}>
              Text toggle states (exclusive selection)
            </p>
            <ThemedToggleButtonGroup value="selected" exclusive>
              <ThemedToggleButton value="selected">Selected</ThemedToggleButton>
              <ThemedToggleButton value="hover">Hover</ThemedToggleButton>
              <ThemedToggleButton value="default">Default</ThemedToggleButton>
            </ThemedToggleButtonGroup>
          </Box>

          <Box>
            <p style={{ fontSize: '0.875rem', color: theme.palette.text.secondary, margin: '0 0 0.5rem 0' }}>
              Standalone toggle with checkmark
            </p>
            <ThemedToggleButton value="check" selected={true}>
              <CheckIcon />
            </ThemedToggleButton>
          </Box>

          <Box>
            <p style={{ fontSize: '0.875rem', color: theme.palette.text.secondary, margin: '0 0 0.5rem 0' }}>
              Icon toggle states with sentiment (exclusive selection)
            </p>
            <ThemedToggleButtonGroup value="selected" exclusive>
              <ThemedToggleButton value="selected">
                <SentimentSatisfiedAltIcon sx={{ mr: 1 }} />
                Selected
              </ThemedToggleButton>
              <ThemedToggleButton value="hover">
                <SentimentNeutralIcon sx={{ mr: 1 }} />
                Hover
              </ThemedToggleButton>
              <ThemedToggleButton value="default">
                <SentimentDissatisfiedIcon sx={{ mr: 1 }} />
                Default
              </ThemedToggleButton>
            </ThemedToggleButtonGroup>
          </Box>
        </Stack>
      </section>

      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Icon Only - Multiple Selection
        </h4>
        <Stack spacing={4}>
          <Box>
            <p style={{ fontSize: '0.875rem', color: theme.palette.text.secondary, margin: '0 0 0.5rem 0' }}>
              Text formatting (multiple selection)
            </p>
            <ThemedToggleButtonGroup
              value={formats}
              onChange={handleFormat}
              aria-label="text formatting"
            >
              <ThemedToggleButton value="bold" aria-label="bold">
                <FormatBoldIcon />
              </ThemedToggleButton>
              <ThemedToggleButton value="italic" aria-label="italic">
                <FormatItalicIcon />
              </ThemedToggleButton>
              <ThemedToggleButton value="underlined" aria-label="underlined">
                <FormatUnderlinedIcon />
              </ThemedToggleButton>
            </ThemedToggleButtonGroup>
          </Box>
        </Stack>
      </section>

      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Icon Only - Exclusive Selection
        </h4>
        <Stack spacing={4}>
          <Box>
            <p style={{ fontSize: '0.875rem', color: theme.palette.text.secondary, margin: '0 0 0.5rem 0' }}>
              Text alignment (single selection)
            </p>
            <ThemedToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleAlignment}
              aria-label="text alignment"
            >
              <ThemedToggleButton value="left" aria-label="left aligned">
                <FormatAlignLeftIcon />
              </ThemedToggleButton>
              <ThemedToggleButton value="center" aria-label="centered">
                <FormatAlignCenterIcon />
              </ThemedToggleButton>
              <ThemedToggleButton value="right" aria-label="right aligned">
                <FormatAlignRightIcon />
              </ThemedToggleButton>
            </ThemedToggleButtonGroup>
          </Box>

          <Box>
            <p style={{ fontSize: '0.875rem', color: theme.palette.text.secondary, margin: '0 0 0.5rem 0' }}>
              View mode
            </p>
            <ThemedToggleButtonGroup
              value={view}
              exclusive
              onChange={handleView}
              aria-label="view mode"
            >
              <ThemedToggleButton value="module" aria-label="module view">
                <ViewModuleIcon />
              </ThemedToggleButton>
              <ThemedToggleButton value="quilt" aria-label="quilt view">
                <ViewQuiltIcon />
              </ThemedToggleButton>
              <ThemedToggleButton value="list" aria-label="list view">
                <ViewListIcon />
              </ThemedToggleButton>
            </ThemedToggleButtonGroup>
          </Box>
        </Stack>
      </section>

      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Text Only
        </h4>
        <Stack spacing={4}>
          <Box>
            <p style={{ fontSize: '0.875rem', color: theme.palette.text.secondary, margin: '0 0 0.5rem 0' }}>
              Platform selection (exclusive)
            </p>
            <ThemedToggleButtonGroup
              value={platform}
              exclusive
              onChange={handlePlatform}
              aria-label="platform"
            >
              <ThemedToggleButton value="web">Web</ThemedToggleButton>
              <ThemedToggleButton value="android">Android</ThemedToggleButton>
              <ThemedToggleButton value="ios">iOS</ThemedToggleButton>
            </ThemedToggleButtonGroup>
          </Box>

          <Box>
            <p style={{ fontSize: '0.875rem', color: theme.palette.text.secondary, margin: '0 0 0.5rem 0' }}>
              Days of week (multiple selection)
            </p>
            <ThemedToggleButtonGroup
              value={days}
              onChange={handleDays}
              aria-label="days of week"
            >
              <ThemedToggleButton value="monday">M</ThemedToggleButton>
              <ThemedToggleButton value="tuesday">T</ThemedToggleButton>
              <ThemedToggleButton value="wednesday">W</ThemedToggleButton>
              <ThemedToggleButton value="thursday">T</ThemedToggleButton>
              <ThemedToggleButton value="friday">F</ThemedToggleButton>
              <ThemedToggleButton value="saturday">S</ThemedToggleButton>
              <ThemedToggleButton value="sunday">S</ThemedToggleButton>
            </ThemedToggleButtonGroup>
          </Box>
        </Stack>
      </section>

      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Icon + Text
        </h4>
        <Stack spacing={4}>
          <Box>
            <p style={{ fontSize: '0.875rem', color: theme.palette.text.secondary, margin: '0 0 0.5rem 0' }}>
              Text alignment with labels
            </p>
            <ThemedToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleAlignment}
              aria-label="text alignment with labels"
            >
              <ThemedToggleButton value="left" aria-label="left aligned">
                <FormatAlignLeftIcon sx={{ mr: 1 }} />
                Left
              </ThemedToggleButton>
              <ThemedToggleButton value="center" aria-label="centered">
                <FormatAlignCenterIcon sx={{ mr: 1 }} />
                Center
              </ThemedToggleButton>
              <ThemedToggleButton value="right" aria-label="right aligned">
                <FormatAlignRightIcon sx={{ mr: 1 }} />
                Right
              </ThemedToggleButton>
            </ThemedToggleButtonGroup>
          </Box>
        </Stack>
      </section>

      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Sizes
        </h4>
        <Stack spacing={4}>
          <Box>
            <p style={{ fontSize: '0.875rem', color: theme.palette.text.secondary, margin: '0 0 0.5rem 0' }}>
              Medium (default)
            </p>
            <ThemedToggleButtonGroup value="medium" exclusive>
              <ThemedToggleButton value="small">Small</ThemedToggleButton>
              <ThemedToggleButton value="medium">Medium</ThemedToggleButton>
              <ThemedToggleButton value="large">Large</ThemedToggleButton>
            </ThemedToggleButtonGroup>
          </Box>

          <Box>
            <p style={{ fontSize: '0.875rem', color: theme.palette.text.secondary, margin: '0 0 0.5rem 0' }}>
              Small
            </p>
            <ThemedToggleButtonGroup size="small" value="small" exclusive>
              <ThemedToggleButton value="small">Small</ThemedToggleButton>
              <ThemedToggleButton value="medium">Medium</ThemedToggleButton>
              <ThemedToggleButton value="large">Large</ThemedToggleButton>
            </ThemedToggleButtonGroup>
          </Box>

          <Box>
            <p style={{ fontSize: '0.875rem', color: theme.palette.text.secondary, margin: '0 0 0.5rem 0' }}>
              Small with icons
            </p>
            <ThemedToggleButtonGroup size="small" value="left" exclusive>
              <ThemedToggleButton value="left" aria-label="left aligned">
                <FormatAlignLeftIcon />
              </ThemedToggleButton>
              <ThemedToggleButton value="center" aria-label="centered">
                <FormatAlignCenterIcon />
              </ThemedToggleButton>
              <ThemedToggleButton value="right" aria-label="right aligned">
                <FormatAlignRightIcon />
              </ThemedToggleButton>
            </ThemedToggleButtonGroup>
          </Box>
        </Stack>
      </section>

      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          States
        </h4>
        <Stack spacing={4}>
          <Box>
            <p style={{ fontSize: '0.875rem', color: theme.palette.text.secondary, margin: '0 0 0.5rem 0' }}>
              Unselected States
            </p>
            <ThemedToggleButtonGroup exclusive>
              <ThemedToggleButton value="default">Default</ThemedToggleButton>
              <ThemedToggleButton value="hover">Hover</ThemedToggleButton>
              <ThemedToggleButton value="pressed">Pressed</ThemedToggleButton>
              <ThemedToggleButton value="disabled" disabled>
                Disabled
              </ThemedToggleButton>
            </ThemedToggleButtonGroup>
          </Box>

          <Box>
            <p style={{ fontSize: '0.875rem', color: theme.palette.text.secondary, margin: '0 0 0.5rem 0' }}>
              Selected States
            </p>
            <ThemedToggleButtonGroup value={['default', 'hover', 'pressed', 'disabled']}>
              <ThemedToggleButton value="default">Default</ThemedToggleButton>
              <ThemedToggleButton value="hover">Hover</ThemedToggleButton>
              <ThemedToggleButton value="pressed">Pressed</ThemedToggleButton>
              <ThemedToggleButton value="disabled" disabled>
                Disabled
              </ThemedToggleButton>
            </ThemedToggleButtonGroup>
          </Box>
        </Stack>
      </section>

      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Interaction
        </h4>
        <Stack spacing={4}>
          <Box>
            <p style={{ fontSize: '0.875rem', color: theme.palette.text.secondary, margin: '0 0 0.5rem 0' }}>
              Active and Inactive states
            </p>
            <Stack direction="row" spacing={2}>
              <ThemedToggleButton value="inactive" selected={false}>
                <SentimentDissatisfiedIcon sx={{ mr: 1 }} />
                Inactive
              </ThemedToggleButton>
              <ThemedToggleButton value="active" selected={true}>
                <SentimentSatisfiedAltIcon sx={{ mr: 1 }} />
                Active
              </ThemedToggleButton>
            </Stack>
          </Box>
        </Stack>
      </section>

      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Icons
        </h4>
        <Stack spacing={4}>
          <Box>
            <p style={{ fontSize: '0.875rem', color: theme.palette.text.secondary, margin: '0 0 0.5rem 0' }}>
              Icon + Text
            </p>
            <ThemedToggleButtonGroup value="happy" exclusive>
              <ThemedToggleButton value="happy">
                <SentimentSatisfiedAltIcon sx={{ mr: 1 }} />
                Icon + Text
              </ThemedToggleButton>
            </ThemedToggleButtonGroup>
          </Box>

          <Box>
            <p style={{ fontSize: '0.875rem', color: theme.palette.text.secondary, margin: '0 0 0.5rem 0' }}>
              Icon Only
            </p>
            <ThemedToggleButton value="icon" selected={true}>
              <SentimentSatisfiedAltIcon />
            </ThemedToggleButton>
          </Box>

          <Box>
            <p style={{ fontSize: '0.875rem', color: theme.palette.text.secondary, margin: '0 0 0.5rem 0' }}>
              Text Only
            </p>
            <ThemedToggleButton value="text" selected={false}>
              Text only
            </ThemedToggleButton>
          </Box>

          <Box>
            <p style={{ fontSize: '0.875rem', color: theme.palette.text.secondary, margin: '0 0 0.5rem 0' }}>
              Sentiment ratings with icons
            </p>
            <ThemedToggleButtonGroup value="happy" exclusive>
              <ThemedToggleButton value="happy">
                <SentimentSatisfiedAltIcon sx={{ mr: 1 }} />
                Selected
              </ThemedToggleButton>
              <ThemedToggleButton value="neutral">
                <SentimentNeutralIcon sx={{ mr: 1 }} />
                Hover
              </ThemedToggleButton>
              <ThemedToggleButton value="sad">
                <SentimentDissatisfiedIcon sx={{ mr: 1 }} />
                Default
              </ThemedToggleButton>
            </ThemedToggleButtonGroup>
          </Box>
        </Stack>
      </section>

      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Grouping / Positioning
        </h4>
        <Stack spacing={4}>
          <Box>
            <p style={{ fontSize: '0.875rem', color: theme.palette.text.secondary, margin: '0 0 0.5rem 0' }}>
              Independent (standalone toggle button)
            </p>
            <ThemedToggleButton value="independent" selected={false}>
              Independent
            </ThemedToggleButton>
          </Box>

          <Box>
            <p style={{ fontSize: '0.875rem', color: theme.palette.text.secondary, margin: '0 0 0.5rem 0' }}>
              Days of week (multiple selection)
            </p>
            <ThemedToggleButtonGroup value={days} onChange={handleDays}>
              <ThemedToggleButton value="monday">Monday</ThemedToggleButton>
              <ThemedToggleButton value="tuesday">Tuesday</ThemedToggleButton>
              <ThemedToggleButton value="wednesday">Wednesday</ThemedToggleButton>
              <ThemedToggleButton value="thursday">Thursday</ThemedToggleButton>
              <ThemedToggleButton value="friday">Friday</ThemedToggleButton>
              <ThemedToggleButton value="saturday">Saturday</ThemedToggleButton>
              <ThemedToggleButton value="sunday">Sunday</ThemedToggleButton>
            </ThemedToggleButtonGroup>
          </Box>

          <Box>
            <p style={{ fontSize: '0.875rem', color: theme.palette.text.secondary, margin: '0 0 0.5rem 0' }}>
              Beginning / Middle / End
            </p>
            <ThemedToggleButtonGroup value="center" exclusive>
              <ThemedToggleButton value="left">
                <FormatAlignLeftIcon />
              </ThemedToggleButton>
              <ThemedToggleButton value="center">
                <FormatAlignCenterIcon />
              </ThemedToggleButton>
              <ThemedToggleButton value="justify">
                <FormatAlignCenterIcon />
              </ThemedToggleButton>
              <ThemedToggleButton value="right">
                <FormatAlignRightIcon />
              </ThemedToggleButton>
            </ThemedToggleButtonGroup>
          </Box>
        </Stack>
      </section>

      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Independent Buttons
        </h4>
        <Stack spacing={4}>
          <Box>
            <p style={{ fontSize: '0.875rem', color: theme.palette.text.secondary, margin: '0 0 0.5rem 0' }}>
              Standalone toggle buttons (not grouped)
            </p>
            <Stack direction="row" spacing={1}>
              <ThemedToggleButton
                value="check"
                selected={true}
                onChange={() => {}}
              >
                Selected
              </ThemedToggleButton>
              <ThemedToggleButton
                value="uncheck"
                selected={false}
                onChange={() => {}}
              >
                Unselected
              </ThemedToggleButton>
              <ThemedToggleButton
                value="disabled"
                selected={true}
                disabled
                onChange={() => {}}
              >
                Disabled
              </ThemedToggleButton>
            </Stack>
          </Box>
        </Stack>
      </section>

      <FeaturesSection
        features={[
          { feature: "Theming", description: "Selected: teal border + 12% bg. Unselected: grey border, theme-aware bg" },
          { feature: "States", description: "Default, hover (16%/grey), pressed, disabled (38% opacity)" },
          { feature: "Content", description: "Icon only, text only, or icon + text. Grouped or independent" },
          { feature: "Sizes", description: "Medium (8px/16px), Small (4px/12px). Exclusive or multiple selection" },
        ]}
      />
    </div>
  );
}

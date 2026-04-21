import React from 'react';
import { Chip as MuiChip, Avatar, Stack, Box, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { typography } from '../../theme-tokens';
import FeaturesSection from '../docs/FeaturesSection';
import FaceIcon from '@mui/icons-material/Face';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';

// Styled Chip using custom design system tokens
// Default: Grey fill with subtle border that adapts to theme mode
// NO colored fill variants - only grey with optional red error border
export const ThemedChip = styled(MuiChip)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.divider}`,
  fontSize: typography.body1.fontSize,
  fontWeight: 400,
  height: '32px',

  '& .MuiChip-label': {
    padding: '0 12px',
  },

  '& .MuiChip-icon': {
    color: theme.palette.text.secondary,
    marginLeft: '8px',
    marginRight: '-4px',
  },

  '& .MuiChip-deleteIcon': {
    color: theme.palette.action.active,
    marginRight: '8px',
    marginLeft: '-4px',
    fontSize: '18px',

    '&:hover': {
      color: theme.palette.text.primary,
    },
  },

  '& .MuiChip-avatar': {
    marginLeft: '8px',
    marginRight: '-4px',
  },

  '&:hover': {
    backgroundColor: theme.palette.grey[200],
  },

  '&.Mui-disabled': {
    opacity: 0.38,
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.text.disabled,
    border: `1px solid ${theme.palette.action.disabledBackground}`,
  },

  // Small size
  '&.MuiChip-sizeSmall': {
    height: '24px',
    fontSize: typography.caption.fontSize,

    '& .MuiChip-label': {
      padding: '0 8px',
    },

    '& .MuiChip-icon': {
      marginLeft: '6px',
      marginRight: '-2px',
      fontSize: '16px',
    },

    '& .MuiChip-deleteIcon': {
      marginRight: '6px',
      marginLeft: '-2px',
      fontSize: '16px',
    },

    '& .MuiChip-avatar': {
      marginLeft: '6px',
      marginRight: '-2px',
      width: '18px',
      height: '18px',
    },
  },

  // Clickable state
  '&.MuiChip-clickable': {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
    '&:active': {
      boxShadow: 'none',
      transform: 'none',
    },
    '&:focus': {
      transform: 'none',
    },
    '&:focus-visible': {
      transform: 'none',
    },
  },

  // Remove all scale transforms
  transform: 'none',
  '&:active': {
    transform: 'none',
  },
}));

// Error chip variant
const ErrorChip = styled(ThemedChip)(({ theme }) => ({
  border: `1px solid ${theme.palette.error.main}`,
  backgroundColor: theme.palette.grey[100],
  color: theme.palette.text.primary,

  '&:hover': {
    backgroundColor: theme.palette.grey[200],
  },
}));

export default function ChipThemed() {
  const theme = useTheme();
  const [chips, setChips] = React.useState([
    { id: 1, label: 'Chip 1' },
    { id: 2, label: 'Chip 2' },
    { id: 3, label: 'Chip 3' },
  ]);

  const handleDelete = (chipToDelete) => () => {
    setChips((chips) => chips.filter((chip) => chip.id !== chipToDelete.id));
  };

  return (
    <div className="themed-showcase">
      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Basic Chips
        </h4>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <ThemedChip label="Chip" />
          <ThemedChip label="Another Chip" />
          <ThemedChip label="With Icon" icon={<FaceIcon />} />
        </Stack>
      </section>

      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Clickable Chips
        </h4>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <ThemedChip label="Clickable" onClick={() => console.log('Clicked')} />
          <ThemedChip label="Clickable Link" component="a" href="#chip" clickable />
          <ThemedChip label="Clickable with Icon" icon={<FaceIcon />} onClick={() => console.log('Clicked')} />
        </Stack>
      </section>

      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Deletable Chips
        </h4>
        <Box sx={{ mb: 1 }}>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {chips.map((chip) => (
              <ThemedChip
                key={chip.id}
                label={chip.label}
                onDelete={handleDelete(chip)}
              />
            ))}
          </Stack>
        </Box>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <ThemedChip label="Deletable Default" onDelete={() => {}} />
          <ThemedChip label="Deletable Primary" color="primary" onDelete={() => {}} />
          <ThemedChip
            label="Custom Delete Icon"
            onDelete={() => {}}
            deleteIcon={<DeleteIcon />}
          />
        </Stack>
      </section>

      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          With Icons
        </h4>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <ThemedChip icon={<FaceIcon />} label="With Icon" />
          <ThemedChip icon={<FaceIcon />} label="Clickable" onClick={() => {}} />
          <ThemedChip icon={<FaceIcon />} label="Deletable" onDelete={() => {}} />
          <ThemedChip icon={<DoneIcon />} label="Done Icon" />
        </Stack>
      </section>

      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          With Avatars
        </h4>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <ThemedChip avatar={<Avatar>A</Avatar>} label="Avatar Chip" />
          <ThemedChip
            avatar={<Avatar style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>U</Avatar>}
            label="User Name"
            onDelete={() => {}}
          />
        </Stack>
      </section>

      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Sizes
        </h4>
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
          <ThemedChip label="Small" size="small" />
          <ThemedChip label="Medium (Default)" />
          <ThemedChip label="Small with Icon" size="small" icon={<FaceIcon />} />
          <ThemedChip label="Small with Delete" size="small" onDelete={() => {}} />
        </Stack>
      </section>

      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          States
        </h4>
        <Stack spacing={2}>
          <Box>
            <p style={{ fontSize: '0.875rem', color: theme.palette.text.secondary, margin: '0 0 0.5rem 0' }}>
              Default
            </p>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <ThemedChip label="Chip" />
              <ThemedChip label="With Icon" icon={<FaceIcon />} />
            </Stack>
          </Box>

          <Box>
            <p style={{ fontSize: '0.875rem', color: theme.palette.text.secondary, margin: '0 0 0.5rem 0' }}>
              Disabled
            </p>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <ThemedChip label="Disabled" disabled />
              <ThemedChip label="Disabled Delete" disabled onDelete={() => {}} />
              <ThemedChip label="Disabled Icon" icon={<FaceIcon />} disabled />
            </Stack>
          </Box>

          <Box>
            <p style={{ fontSize: '0.875rem', color: theme.palette.text.secondary, margin: '0 0 0.5rem 0' }}>
              Error
            </p>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <ErrorChip label="Error" />
              <ErrorChip label="Error with Delete" onDelete={() => {}} />
            </Stack>
          </Box>
        </Stack>
      </section>

      <FeaturesSection
        features={[
          { feature: "Theming", description: "Grey fill only, no colored variants, error state has red border" },
          { feature: "Sizes", description: "Small (24px), Medium (32px default)" },
          { feature: "Content", description: "Icons, avatars, delete button with hover states" },
          { feature: "API", description: "Clickable, dark mode adaptive, MUI API compatible" },
          { feature: "Important", description: "For colored status labels, use Indicator component instead of Chip" },
        ]}
      />
    </div>
  );
}

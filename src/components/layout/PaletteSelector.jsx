import { useState } from 'react';
import {
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Box,
  Typography,
  Stack,
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { Check } from '@mui/icons-material';

export default function PaletteSelector({ colorblindType, onPaletteChange }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColorblindChange = (newType) => {
    onPaletteChange(newType);
    handleClose();
  };

  const colorblindTypes = [
    { value: 'none', label: 'None (Standard)' },
    { value: 'protanopia', label: 'Protanopia (Red-blind)' },
    { value: 'deuteranopia', label: 'Deuteranopia (Green-blind)' },
    { value: 'tritanopia', label: 'Tritanopia (Blue-blind)' },
  ];

  const getCurrentLabel = () => {
    if (!colorblindType || colorblindType === 'none') {
      return 'Standard';
    }
    return colorblindTypes.find((t) => t.value === colorblindType)?.label.split(' ')[0];
  };

  return (
    <>
      <Tooltip title={`Color Palette: ${getCurrentLabel()}`} arrow>
        <IconButton
          onClick={handleClick}
          aria-label="select color palette"
          sx={{
            color: 'text.secondary',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '50%',
            width: 36,
            height: 36,
          }}
        >
          <TuneIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 280,
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle2" fontWeight={600}>
            Colorblind Mode
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Adjust colors for color vision deficiencies
          </Typography>
        </Box>
        {colorblindTypes.map((typeOption) => (
          <MenuItem
            key={typeOption.value}
            onClick={() => handleColorblindChange(typeOption.value)}
            selected={colorblindType === typeOption.value}
          >
            <Stack direction="row" alignItems="center" spacing={1} width="100%">
              <Box sx={{ width: 20 }}>
                {colorblindType === typeOption.value && <Check fontSize="small" />}
              </Box>
              <Typography variant="body2">{typeOption.label}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

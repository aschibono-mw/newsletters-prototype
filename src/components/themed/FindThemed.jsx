import React from 'react';
import {
  Box,
  InputBase,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FeaturesSection from '../docs/FeaturesSection';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

// Fully rounded find/search component
const FindContainer = styled(Box)(({ theme, size = 'default', error = false }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '999px', // Fully rounded pill shape
  paddingLeft: size === 'small' ? '12px' : '24px',
  paddingRight: size === 'small' ? '8px' : '12px',
  paddingTop: size === 'small' ? '8px' : '16px',
  paddingBottom: size === 'small' ? '8px' : '16px',
  border: '1px solid',
  borderColor: error ? theme.palette.error.main : theme.palette.divider,
  transition: 'border-color 0.2s ease',

  '&:focus-within': {
    borderColor: error ? theme.palette.error.main : theme.palette.primary.main,
    borderWidth: error ? '1px' : '2px',
    paddingLeft: error ? (size === 'small' ? '12px' : '24px') : (size === 'small' ? '11px' : '23px'),
    paddingRight: error ? (size === 'small' ? '8px' : '12px') : (size === 'small' ? '7px' : '11px'),
  },

  '&.disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
    cursor: 'not-allowed',
    opacity: 0.6,
  },
}));

// Styled clear button
const ClearButton = styled(IconButton)(({ theme, size = 'default' }) => ({
  width: size === 'small' ? '16px' : '20px',
  height: size === 'small' ? '16px' : '20px',
  padding: 0,
  marginLeft: '8px',
  backgroundColor: theme.palette.grey[300],
  borderRadius: '50%',

  '&:hover': {
    backgroundColor: theme.palette.grey[400],
  },

  '& .MuiSvgIcon-root': {
    fontSize: size === 'small' ? '12px' : '14px',
    color: theme.palette.text.primary,
  },
}));

export default function FindThemed() {
  const theme = useTheme();
  const [searchValue1, setSearchValue1] = React.useState('');
  const [searchValue2, setSearchValue2] = React.useState('search query');
  const [searchValue3, setSearchValue3] = React.useState('');

  const handleClear = (setter) => () => {
    setter('');
  };

  return (
    <div className="themed-showcase">
      {/* Default State */}
      <div className="variant-section">
        <h4>Default State</h4>
        <p>Fully rounded pill-shaped search field with persistent search icon.</p>
        <Stack spacing={2}>
          <FindContainer>
            <SearchIcon sx={{ color: theme.palette.text.secondary, mr: 2, fontSize: 24 }} />
            <InputBase
              placeholder="Find topics, keywords, or assets..."
              value={searchValue1}
              onChange={(e) => setSearchValue1(e.target.value)}
              sx={{
                flex: 1,
                fontSize: 16,
                '& input::placeholder': {
                  color: theme.palette.text.secondary,
                  opacity: 1,
                },
              }}
            />
            {searchValue1 && (
              <ClearButton
                onClick={handleClear(setSearchValue1)}
                aria-label="clear search"
              >
                <CloseIcon />
              </ClearButton>
            )}
          </FindContainer>
        </Stack>
      </div>

      {/* With Clear Button */}
      <div className="variant-section">
        <h4>With Input & Clear Button</h4>
        <p>Clear button appears when field has text.</p>
        <Stack spacing={2}>
          <FindContainer>
            <SearchIcon sx={{ color: theme.palette.text.secondary, mr: 2, fontSize: 24 }} />
            <InputBase
              placeholder="Find..."
              value={searchValue2}
              onChange={(e) => setSearchValue2(e.target.value)}
              sx={{
                flex: 1,
                fontSize: 16,
                '& input::placeholder': {
                  color: theme.palette.text.secondary,
                  opacity: 1,
                },
              }}
            />
            {searchValue2 && (
              <ClearButton
                onClick={handleClear(setSearchValue2)}
                aria-label="clear search"
              >
                <CloseIcon />
              </ClearButton>
            )}
          </FindContainer>
        </Stack>
      </div>

      {/* Small Size */}
      <div className="variant-section">
        <h4>Small Size</h4>
        <p>Compact variant for toolbars, tables, and tight layouts.</p>
        <Stack spacing={2}>
          <FindContainer size="small">
            <SearchIcon sx={{ color: theme.palette.text.secondary, mr: 1.5, fontSize: 20 }} />
            <InputBase
              placeholder="Find..."
              value={searchValue3}
              onChange={(e) => setSearchValue3(e.target.value)}
              sx={{
                flex: 1,
                fontSize: 14,
                '& input::placeholder': {
                  color: theme.palette.text.secondary,
                  opacity: 1,
                },
              }}
            />
            {searchValue3 && (
              <ClearButton
                onClick={handleClear(setSearchValue3)}
                aria-label="clear search"
                size="small"
              >
                <CloseIcon />
              </ClearButton>
            )}
          </FindContainer>
        </Stack>
      </div>

      {/* States */}
      <div className="variant-section">
        <h4>States</h4>
        <p>Focus, disabled, and error states.</p>
        <Stack spacing={2}>
          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
              Default
            </Typography>
            <FindContainer>
              <SearchIcon sx={{ color: theme.palette.text.secondary, mr: 2, fontSize: 24 }} />
              <InputBase
                placeholder="Find..."
                sx={{
                  flex: 1,
                  fontSize: 16,
                  '& input::placeholder': {
                    color: theme.palette.text.secondary,
                    opacity: 1,
                  },
                }}
              />
            </FindContainer>
          </Box>

          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
              Focused (click inside field)
            </Typography>
            <FindContainer>
              <SearchIcon sx={{ color: theme.palette.text.secondary, mr: 2, fontSize: 24 }} />
              <InputBase
                placeholder="Click to focus..."
                sx={{
                  flex: 1,
                  fontSize: 16,
                  '& input::placeholder': {
                    color: theme.palette.text.secondary,
                    opacity: 1,
                  },
                }}
              />
            </FindContainer>
          </Box>

          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
              Disabled
            </Typography>
            <FindContainer className="disabled">
              <SearchIcon sx={{ color: theme.palette.text.secondary, mr: 2, fontSize: 24 }} />
              <InputBase
                placeholder="Find..."
                disabled
                sx={{
                  flex: 1,
                  fontSize: 16,
                  '& input::placeholder': {
                    color: theme.palette.text.secondary,
                    opacity: 1,
                  },
                }}
              />
            </FindContainer>
          </Box>

          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
              Error state
            </Typography>
            <FindContainer error>
              <SearchIcon sx={{ color: theme.palette.text.secondary, mr: 2, fontSize: 24 }} />
              <InputBase
                placeholder="Find..."
                sx={{
                  flex: 1,
                  fontSize: 16,
                  '& input::placeholder': {
                    color: theme.palette.text.secondary,
                    opacity: 1,
                  },
                }}
              />
            </FindContainer>
            <Typography variant="caption" sx={{ color: 'error.main', ml: 3, mt: 0.5, display: 'block' }}>
              No results found
            </Typography>
          </Box>
        </Stack>
      </div>

      <FeaturesSection
        features={[
          { feature: "Visual Design", description: "Fully rounded pill shape (borderRadius: 999px), 1px border (2px on focus), persistent search icon on left (text.secondary)" },
          { feature: "Sizing & Typography", description: "Default: 24px × 16px padding, 16px text. Small: 12px × 8px padding, 14px text. Clear button: 20×20px circular grey background" },
          { feature: "Interactive States", description: "Focus (teal border), Error (red border), Disabled (grey background, reduced opacity). Clear button appears when input has text" },
          { feature: "Common Use Cases", description: "App chrome, data tables, list views, global navigation" },
        ]}
      />
    </div>
  );
}

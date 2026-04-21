import React from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  Stack,
  Box,
  FormHelperText,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { typography } from '../../theme-tokens';
import FeaturesSection from '../docs/FeaturesSection';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

// Styled TextField for Search (based on TextFieldThemed pattern)
const ThemedTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    fontSize: typography.body1.fontSize,

    '& fieldset': {
      borderColor: theme.palette.grey[300],
    },
    '&:hover fieldset': {
      borderColor: theme.palette.grey[400],
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      borderWidth: '2px',
    },
    '&.Mui-error fieldset': {
      borderColor: theme.palette.error.main,
    },
  },

  // Standard variant (for inline use)
  '& .MuiInput-root': {
    fontSize: typography.body1.fontSize,

    '&:before': {
      borderBottomColor: theme.palette.grey[300],
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottomColor: theme.palette.grey[400],
    },
    '&.Mui-focused:after': {
      borderBottomColor: theme.palette.primary.main,
    },
    '&.Mui-error:after': {
      borderBottomColor: theme.palette.error.main,
    },
  },

  '& .MuiInputLabel-root': {
    fontSize: typography.body1.fontSize,
    color: theme.palette.text.secondary,

    '&.Mui-focused': {
      color: theme.palette.primary.main,
    },
    '&.Mui-error': {
      color: theme.palette.error.main,
    },
  },

  // Small size variant
  '&.small-size .MuiOutlinedInput-root': {
    padding: '8px',
  },
  '&.small-size .MuiInput-root': {
    fontSize: typography.caption.fontSize,
  },
}));

// Styled clear button (matches TextField pattern - circular grey background)
const ClearButton = styled(IconButton)(({ theme }) => ({
  width: '20px',
  height: '20px',
  padding: 0,
  backgroundColor: theme.palette.grey[300],
  borderRadius: '50%',

  '&:hover': {
    backgroundColor: theme.palette.grey[400],
  },

  '& .MuiSvgIcon-root': {
    fontSize: '14px',
    color: theme.palette.text.primary,
  },
}));

// Helper text component
const HelperText = styled(FormHelperText)(({ theme }) => ({
  fontSize: typography.caption.fontSize,
  lineHeight: typography.caption.lineHeight,
  color: theme.palette.text.secondary,
  marginLeft: '14px',
  marginTop: '4px',

  '&.Mui-error': {
    color: theme.palette.error.main,
  },
}));

export default function SearchThemed() {
  const theme = useTheme();
  const [searchValue, setSearchValue] = React.useState('');
  const [searchValue2, setSearchValue2] = React.useState('');
  const [searchValue3, setSearchValue3] = React.useState('search query');
  const [searchValue4, setSearchValue4] = React.useState('search query');

  const handleClear = (setter) => () => {
    setter('');
  };

  return (
    <div className="themed-showcase">
      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Outlined Variant (Default)
        </h4>
        <Stack spacing={4}>
          <Box>
            <p style={{ fontSize: '0.875rem', color: theme.palette.text.secondary, margin: '0 0 0.5rem 0' }}>
              Default state
            </p>
            <ThemedTextField
              placeholder="Find"
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: theme.palette.text.secondary }} />
                  </InputAdornment>
                ),
              }}
            />
            <HelperText>Search across content</HelperText>
          </Box>

          <Box>
            <p style={{ fontSize: '0.875rem', color: theme.palette.text.secondary, margin: '0 0 0.5rem 0' }}>
              With input text and clear button
            </p>
            <ThemedTextField
              placeholder="Find"
              variant="outlined"
              fullWidth
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: theme.palette.text.secondary }} />
                  </InputAdornment>
                ),
                endAdornment: searchValue && (
                  <InputAdornment position="end">
                    <ClearButton
                      onClick={handleClear(setSearchValue)}
                      edge="end"
                      aria-label="clear search"
                    >
                      <CloseIcon />
                    </ClearButton>
                  </InputAdornment>
                ),
              }}
            />
            <HelperText>Type to search, click X to clear</HelperText>
          </Box>

          <Box>
            <p style={{ fontSize: '0.875rem', color: theme.palette.text.secondary, margin: '0 0 0.5rem 0' }}>
              With label
            </p>
            <ThemedTextField
              label="Find Label"
              placeholder="Find placeholder text"
              variant="outlined"
              fullWidth
              value={searchValue2}
              onChange={(e) => setSearchValue2(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: theme.palette.text.secondary }} />
                  </InputAdornment>
                ),
                endAdornment: searchValue2 && (
                  <InputAdornment position="end">
                    <ClearButton
                      onClick={handleClear(setSearchValue2)}
                      edge="end"
                      aria-label="clear search"
                    >
                      <CloseIcon />
                    </ClearButton>
                  </InputAdornment>
                ),
              }}
            />
            <HelperText>Helper text for search field</HelperText>
          </Box>
        </Stack>
      </section>

      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Standard Variant (Inline)
        </h4>
        <Stack spacing={4}>
          <Box>
            <p style={{ fontSize: '0.875rem', color: theme.palette.text.secondary, margin: '0 0 0.5rem 0' }}>
              Standard underline variant for inline use
            </p>
            <ThemedTextField
              placeholder="Find"
              variant="standard"
              fullWidth
              value={searchValue3}
              onChange={(e) => setSearchValue3(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: theme.palette.text.secondary }} />
                  </InputAdornment>
                ),
                endAdornment: searchValue3 && (
                  <InputAdornment position="end">
                    <ClearButton
                      onClick={handleClear(setSearchValue3)}
                      edge="end"
                      aria-label="clear search"
                    >
                      <CloseIcon />
                    </ClearButton>
                  </InputAdornment>
                ),
              }}
            />
            <HelperText>Standard variant for inline search</HelperText>
          </Box>

          <Box>
            <p style={{ fontSize: '0.875rem', color: theme.palette.text.secondary, margin: '0 0 0.5rem 0' }}>
              With label
            </p>
            <ThemedTextField
              label="Find Label"
              placeholder="Find"
              variant="standard"
              fullWidth
              value={searchValue4}
              onChange={(e) => setSearchValue4(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: theme.palette.text.secondary }} />
                  </InputAdornment>
                ),
                endAdornment: searchValue4 && (
                  <InputAdornment position="end">
                    <ClearButton
                      onClick={handleClear(setSearchValue4)}
                      edge="end"
                      aria-label="clear search"
                    >
                      <CloseIcon />
                    </ClearButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Stack>
      </section>

      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Small Size
        </h4>
        <Stack spacing={4}>
          <Box>
            <p style={{ fontSize: '0.875rem', color: theme.palette.text.secondary, margin: '0 0 0.5rem 0' }}>
              Small size for compact layouts
            </p>
            <ThemedTextField
              placeholder="Small search"
              variant="outlined"
              size="small"
              fullWidth
              className="small-size"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: '20px', color: theme.palette.text.secondary }} />
                  </InputAdornment>
                ),
              }}
            />
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
              Default
            </p>
            <ThemedTextField
              placeholder="Find"
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: theme.palette.text.secondary }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box>
            <p style={{ fontSize: '0.875rem', color: theme.palette.text.secondary, margin: '0 0 0.5rem 0' }}>
              Disabled
            </p>
            <ThemedTextField
              placeholder="Find"
              variant="outlined"
              fullWidth
              disabled
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: theme.palette.text.secondary }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box>
            <p style={{ fontSize: '0.875rem', color: theme.palette.text.secondary, margin: '0 0 0.5rem 0' }}>
              Error state
            </p>
            <ThemedTextField
              placeholder="Find"
              variant="outlined"
              fullWidth
              error
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: theme.palette.text.secondary }} />
                  </InputAdornment>
                ),
              }}
            />
            <HelperText error>No results found</HelperText>
          </Box>
        </Stack>
      </section>

      <FeaturesSection
        features={[
          { feature: "Theming", description: "Based on TextField, teal focus, red error, 6px radius" },
          { feature: "Variants", description: "Outlined (default), Standard (inline)" },
          { feature: "Icons", description: "Persistent search icon (left), clear button (20x20px circular grey)" },
          { feature: "Sizes", description: "Small (8px padding), helper text support, MUI API compatible" },
        ]}
      />
    </div>
  );
}

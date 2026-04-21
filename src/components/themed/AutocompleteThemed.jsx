import React from 'react';
import {
  Autocomplete as MuiAutocomplete,
  TextField,
  Chip,
  Stack,
  Box,
  Typography,
  FormHelperText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { typography } from '../../theme-tokens';
import FeaturesSection from '../docs/FeaturesSection';

const topMovies = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Dark Knight', year: 2008 },
  { label: 'Pulp Fiction', year: 1994 },
  { label: 'Forrest Gump', year: 1994 },
];

const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

// Styled TextField for Autocomplete (based on TextFieldThemed pattern)
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
  '&.small-size': {
    '& .MuiOutlinedInput-root': {
      padding: '8px',
    },
  },
}));

// Styled Chip for multiselect - matches ChipThemed pattern (grey fill, no teal)
const ThemedChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.divider}`,
  fontSize: typography.caption.fontSize,
  height: '24px',

  '& .MuiChip-deleteIcon': {
    color: theme.palette.action.active,
    fontSize: '16px',

    '&:hover': {
      color: theme.palette.text.primary,
    },
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

export default function AutocompleteThemed() {
  const [singleValue, setSingleValue] = React.useState(null);
  const [multipleValue, setMultipleValue] = React.useState([options[0], options[1]]);
  const [movieValue, setMovieValue] = React.useState(null);

  return (
    <div className="themed-showcase">
      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Basic Autocomplete
        </h4>
        <Stack spacing={4}>
          <Box>
            <MuiAutocomplete
              options={options}
              value={singleValue}
              onChange={(event, newValue) => setSingleValue(newValue)}
              renderInput={(params) => (
                <ThemedTextField {...params} label="Select option" placeholder="Search..." />
              )}
            />
            <HelperText>Choose from available options</HelperText>
          </Box>

          <Box>
            <MuiAutocomplete
              options={options}
              defaultValue={options[2]}
              renderInput={(params) => (
                <ThemedTextField {...params} label="With default value" />
              )}
            />
          </Box>
        </Stack>
      </section>

      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Multiple Selection
        </h4>
        <Stack spacing={4}>
          <Box>
            <MuiAutocomplete
              multiple
              options={options}
              value={multipleValue}
              onChange={(event, newValue) => setMultipleValue(newValue)}
              renderInput={(params) => (
                <ThemedTextField {...params} label="Select multiple" placeholder="Add options..." />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <ThemedChip
                    label={option}
                    {...getTagProps({ index })}
                    key={option}
                  />
                ))
              }
            />
            <HelperText>{multipleValue.length}/{options.length} selected</HelperText>
          </Box>

          <Box>
            <MuiAutocomplete
              multiple
              options={options}
              defaultValue={[options[0]]}
              renderInput={(params) => (
                <ThemedTextField {...params} label="Chip input" />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <ThemedChip
                    label={option}
                    {...getTagProps({ index })}
                    key={option}
                  />
                ))
              }
            />
          </Box>
        </Stack>
      </section>

      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          With Objects
        </h4>
        <Stack spacing={4}>
          <Box>
            <MuiAutocomplete
              options={topMovies}
              getOptionLabel={(option) => option.label}
              value={movieValue}
              onChange={(event, newValue) => setMovieValue(newValue)}
              renderInput={(params) => (
                <ThemedTextField {...params} label="Search movies" />
              )}
            />
            <HelperText>
              {movieValue ? `${movieValue.label} (${movieValue.year})` : 'No selection'}
            </HelperText>
          </Box>

          <Box>
            <MuiAutocomplete
              multiple
              options={topMovies}
              getOptionLabel={(option) => option.label}
              defaultValue={[topMovies[2]]}
              renderInput={(params) => (
                <ThemedTextField {...params} label="Multiple movies" />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <ThemedChip
                    label={`${option.label} (${option.year})`}
                    {...getTagProps({ index })}
                    key={option.label}
                  />
                ))
              }
            />
          </Box>
        </Stack>
      </section>

      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Free Solo
        </h4>
        <Stack spacing={4}>
          <Box>
            <MuiAutocomplete
              freeSolo
              options={options}
              renderInput={(params) => (
                <ThemedTextField {...params} label="Free solo (allow custom)" />
              )}
            />
            <HelperText>Type any value or select from options</HelperText>
          </Box>
        </Stack>
      </section>

      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          States
        </h4>
        <Stack spacing={4}>
          <Box>
            <MuiAutocomplete
              options={options}
              renderInput={(params) => (
                <ThemedTextField {...params} label="Default" />
              )}
            />
          </Box>

          <Box>
            <MuiAutocomplete
              options={options}
              disabled
              renderInput={(params) => (
                <ThemedTextField {...params} label="Disabled" />
              )}
            />
          </Box>

          <Box>
            <MuiAutocomplete
              options={options}
              renderInput={(params) => (
                <ThemedTextField {...params} label="Required field" required />
              )}
            />
            <HelperText>This field is required</HelperText>
          </Box>

          <Box>
            <MuiAutocomplete
              options={options}
              renderInput={(params) => (
                <ThemedTextField {...params} label="Error state" error />
              )}
            />
            <HelperText error>Please select a valid option</HelperText>
          </Box>
        </Stack>
      </section>

      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Small Size
        </h4>
        <Stack spacing={4}>
          <Box>
            <MuiAutocomplete
              size="small"
              options={options}
              renderInput={(params) => (
                <ThemedTextField {...params} label="Small autocomplete" className="small-size" />
              )}
            />
          </Box>

          <Box>
            <MuiAutocomplete
              multiple
              size="small"
              options={options}
              defaultValue={[options[0]]}
              renderInput={(params) => (
                <ThemedTextField {...params} label="Small with chips" className="small-size" />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <ThemedChip
                    size="small"
                    label={option}
                    {...getTagProps({ index })}
                    key={option}
                  />
                ))
              }
            />
          </Box>
        </Stack>
      </section>

      <FeaturesSection
        features={[
          { feature: "Theming", description: "Teal focus, grey chips for multiselect, 6px radius" },
          { feature: "Modes", description: "Single/multiple selection, free solo for custom values, objects/arrays" },
          { feature: "States", description: "Focus, error (red border), small variant (8px padding)" },
          { feature: "Extras", description: "Helper text with selection count, MUI API compatible" },
        ]}
      />
    </div>
  );
}

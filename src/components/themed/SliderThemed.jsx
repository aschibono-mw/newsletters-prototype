import React from 'react';
import { Slider as MuiSlider, Stack, Typography, Box, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import FeaturesSection from '../docs/FeaturesSection';

// Styled Slider using custom design system tokens
// Uses MUI's default sizing/proportions, only changes color to teal
const ThemedSlider = styled(MuiSlider)(({ theme }) => ({
  color: theme.palette.primary.main,

  '& .MuiSlider-thumb': {
    '&:hover, &.Mui-focusVisible': {
      boxShadow: `0 0 0 8px ${theme.palette.primary.main}14`,
    },
    '&.Mui-active': {
      boxShadow: `0 0 0 14px ${theme.palette.primary.main}1F`,
    },
  },
}));

export default function SliderThemed() {
  const theme = useTheme();
  const [value, setValue] = React.useState(30);
  const [rangeValue, setRangeValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleRangeChange = (event, newValue) => {
    setRangeValue(newValue);
  };

  return (
    <div className="themed-showcase">
      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Basic Slider
        </h4>
        <Stack spacing={4}>
          <Box>
            <Typography gutterBottom style={{ fontSize: '0.875rem', color: theme.palette.text.primary }}>
              Continuous
            </Typography>
            <ThemedSlider
              value={value}
              onChange={handleChange}
              aria-labelledby="continuous-slider"
            />
          </Box>

          <Box>
            <Typography gutterBottom style={{ fontSize: '0.875rem', color: theme.palette.text.primary }}>
              With Value Label
            </Typography>
            <ThemedSlider
              defaultValue={30}
              valueLabelDisplay="auto"
              aria-labelledby="value-label-slider"
            />
          </Box>
        </Stack>
      </section>

      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Discrete Slider
        </h4>
        <Stack spacing={4}>
          <Box>
            <Typography gutterBottom style={{ fontSize: '0.875rem', color: theme.palette.text.primary }}>
              With Marks
            </Typography>
            <ThemedSlider
              defaultValue={30}
              step={10}
              marks
              min={0}
              max={100}
              valueLabelDisplay="auto"
            />
          </Box>

          <Box>
            <Typography gutterBottom style={{ fontSize: '0.875rem', color: theme.palette.text.primary }}>
              Custom Marks
            </Typography>
            <ThemedSlider
              defaultValue={20}
              valueLabelDisplay="auto"
              step={10}
              marks={[
                { value: 0, label: '0°C' },
                { value: 20, label: '20°C' },
                { value: 37, label: '37°C' },
                { value: 100, label: '100°C' },
              ]}
            />
          </Box>
        </Stack>
      </section>

      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Range Slider
        </h4>
        <Stack spacing={4}>
          <Box>
            <Typography gutterBottom style={{ fontSize: '0.875rem', color: theme.palette.text.primary }}>
              Range Selection
            </Typography>
            <ThemedSlider
              value={rangeValue}
              onChange={handleRangeChange}
              valueLabelDisplay="auto"
              min={0}
              max={100}
            />
          </Box>

          <Box>
            <Typography gutterBottom style={{ fontSize: '0.875rem', color: theme.palette.text.primary }}>
              Range with Marks
            </Typography>
            <ThemedSlider
              defaultValue={[20, 60]}
              valueLabelDisplay="auto"
              marks
              step={10}
              min={0}
              max={100}
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
            <Typography gutterBottom style={{ fontSize: '0.875rem', color: theme.palette.text.primary }}>
              Default
            </Typography>
            <ThemedSlider defaultValue={50} valueLabelDisplay="auto" />
          </Box>

          <Box>
            <Typography gutterBottom style={{ fontSize: '0.875rem', color: theme.palette.text.disabled }}>
              Disabled
            </Typography>
            <ThemedSlider disabled defaultValue={30} />
          </Box>
        </Stack>
      </section>

      <FeaturesSection
        features={[
          { feature: "Theming", description: "Teal track and thumb, MUI default sizing" },
          { feature: "Value display", description: "Grey tooltips above thumb, optional marks with custom labels" },
          { feature: "Modes", description: "Range selection (two thumbs), continuous or discrete steps" },
          { feature: "API", description: "Full MUI Slider props compatible" },
        ]}
      />
    </div>
  );
}

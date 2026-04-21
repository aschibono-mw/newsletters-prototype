import React from 'react'
import {
  Box,
  Typography,
  Slider as MuiSlider,
  Stack,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { CoreDetailPageLayout, CoreVariantSection, CorePropsTable } from '../components/core'
import AccessibilitySection from '../components/docs/AccessibilitySection'
import FeaturesSection from '../components/docs/FeaturesSection'

// Styled Slider using custom design system tokens
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
}))

function SliderDetailPage() {
  const [value, setValue] = React.useState(30)
  const [rangeValue, setRangeValue] = React.useState([20, 37])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleRangeChange = (event, newValue) => {
    setRangeValue(newValue)
  }

  return (
    <CoreDetailPageLayout
      title="Slider"
      description="Themed slider component with custom teal color, value labels, marks, and range support."
    >
      <CoreVariantSection title="Basic Slider">
        <Stack spacing={4}>
          <Box>
            <Typography gutterBottom sx={{ fontSize: '0.875rem', color: 'text.primary', mb: 2 }}>
              Continuous
            </Typography>
            <ThemedSlider
              value={value}
              onChange={handleChange}
              aria-labelledby="continuous-slider"
            />
          </Box>

          <Box>
            <Typography gutterBottom sx={{ fontSize: '0.875rem', color: 'text.primary', mb: 2 }}>
              With Value Label
            </Typography>
            <ThemedSlider
              defaultValue={30}
              valueLabelDisplay="auto"
              aria-labelledby="value-label-slider"
            />
          </Box>
        </Stack>
      </CoreVariantSection>

      <CoreVariantSection title="Discrete Slider">
        <Stack spacing={4}>
          <Box>
            <Typography gutterBottom sx={{ fontSize: '0.875rem', color: 'text.primary', mb: 2 }}>
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
            <Typography gutterBottom sx={{ fontSize: '0.875rem', color: 'text.primary', mb: 2 }}>
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
      </CoreVariantSection>

      <CoreVariantSection title="Range Slider">
        <Stack spacing={4}>
          <Box>
            <Typography gutterBottom sx={{ fontSize: '0.875rem', color: 'text.primary', mb: 2 }}>
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
            <Typography gutterBottom sx={{ fontSize: '0.875rem', color: 'text.primary', mb: 2 }}>
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
      </CoreVariantSection>

      <CoreVariantSection title="States">
        <Stack spacing={4}>
          <Box>
            <Typography gutterBottom sx={{ fontSize: '0.875rem', color: 'text.primary', mb: 2 }}>
              Default
            </Typography>
            <ThemedSlider defaultValue={50} valueLabelDisplay="auto" />
          </Box>

          <Box>
            <Typography gutterBottom sx={{ fontSize: '0.875rem', color: 'text.disabled', mb: 2 }}>
              Disabled
            </Typography>
            <ThemedSlider disabled defaultValue={30} />
          </Box>
        </Stack>
      </CoreVariantSection>

      <FeaturesSection
        features={[
          { feature: "Theming", description: "Teal color for track and thumb, MUI default sizing" },
          { feature: "Value display", description: "Grey tooltips above thumb, optional marks with custom labels" },
          { feature: "Modes", description: "Range selection (two thumbs), continuous or discrete steps" },
          { feature: "API", description: "Full MUI Slider props compatible" },
        ]}
      />

      <CorePropsTable
        props={[
          { name: 'value', type: 'number | array', description: 'Slider value (array for range)' },
          { name: 'onChange', type: 'function', description: 'Callback when value changes' },
          { name: 'min', type: 'number', description: 'Minimum value. Default: 0' },
          { name: 'max', type: 'number', description: 'Maximum value. Default: 100' },
          { name: 'step', type: 'number', description: 'Step increment. Default: 1' },
          { name: 'marks', type: 'boolean | array', description: 'Show marks or custom mark labels' },
          { name: 'valueLabelDisplay', type: '"auto" | "on" | "off"', description: 'When to show value label' },
          { name: 'disabled', type: 'boolean', description: 'If true, slider is disabled' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "2.1.1", name: "Keyboard", level: "A", note: "Arrow keys to adjust value" },
          { id: "2.4.7", name: "Focus Visible", level: "AA", note: "Visible focus ring on thumb" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "slider role, aria-valuenow/min/max" },
          { id: "3.3.2", name: "Labels or Instructions", level: "A", note: "Associated label via aria-labelledby" },
          { id: "1.4.11", name: "Non-text Contrast", level: "AA", note: "3:1 track and thumb vs background" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default SliderDetailPage

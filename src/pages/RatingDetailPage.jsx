import React from 'react'
import {
  Box,
  Typography,
  Rating as MuiRating,
  Stack,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { CoreDetailPageLayout, CoreVariantSection, CorePropsTable } from '../components/core'
import AccessibilitySection from '../components/docs/AccessibilitySection'
import FeaturesSection from '../components/docs/FeaturesSection'

// Simple themed Rating - orange when filled, grey when empty
// No color shifts on hover
const ThemedRating = styled(MuiRating)(({ theme }) => ({
  '& .MuiRating-icon': {
    color: theme.palette.grey[300],
  },
  '& .MuiRating-iconFilled': {
    color: theme.palette.warning.main,
  },
  '& .MuiRating-iconHover': {
    color: theme.palette.warning.main,
  },
}))

function RatingDetailPage() {
  const [value, setValue] = React.useState(2)
  const [textValue, setTextValue] = React.useState(3)

  return (
    <CoreDetailPageLayout
      title="Rating"
      description="Themed rating component with custom orange stars, half-star precision, and text pairing."
    >
      <CoreVariantSection title="Basic Rating">
        <Stack spacing={3}>
          <Box>
            <Typography gutterBottom sx={{ fontSize: '0.875rem', color: 'text.primary', mb: 2 }}>
              Controlled
            </Typography>
            <ThemedRating
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue)
              }}
            />
          </Box>

          <Box>
            <Typography gutterBottom sx={{ fontSize: '0.875rem', color: 'text.primary', mb: 2 }}>
              Read Only
            </Typography>
            <ThemedRating value={3} readOnly />
          </Box>

          <Box>
            <Typography gutterBottom sx={{ fontSize: '0.875rem', color: 'text.disabled', mb: 2 }}>
              Disabled
            </Typography>
            <ThemedRating value={4} disabled />
          </Box>
        </Stack>
      </CoreVariantSection>

      <CoreVariantSection title="Precision">
        <Stack spacing={3}>
          <Box>
            <Typography gutterBottom sx={{ fontSize: '0.875rem', color: 'text.primary', mb: 2 }}>
              Half Ratings
            </Typography>
            <ThemedRating defaultValue={2.5} precision={0.5} />
          </Box>

          <Box>
            <Typography gutterBottom sx={{ fontSize: '0.875rem', color: 'text.primary', mb: 2 }}>
              Quarter Ratings
            </Typography>
            <ThemedRating defaultValue={3.25} precision={0.25} />
          </Box>
        </Stack>
      </CoreVariantSection>

      <CoreVariantSection title="With Text Pairing">
        <Stack spacing={3}>
          <Box>
            <Typography gutterBottom sx={{ fontSize: '0.875rem', color: 'text.primary', mb: 2 }}>
              Rating with Label
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <ThemedRating
                value={textValue}
                onChange={(event, newValue) => {
                  setTextValue(newValue)
                }}
              />
              <Typography variant="body2" color="text.secondary">
                {textValue} out of 5
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography gutterBottom sx={{ fontSize: '0.875rem', color: 'text.primary', mb: 2 }}>
              Read-only with Count
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <ThemedRating value={4.5} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary">
                4.5 (234 reviews)
              </Typography>
            </Box>
          </Box>
        </Stack>
      </CoreVariantSection>

      <CoreVariantSection title="States">
        <Stack spacing={3}>
          <Box>
            <Typography gutterBottom sx={{ fontSize: '0.875rem', color: 'text.primary', mb: 2 }}>
              Empty (No Rating)
            </Typography>
            <ThemedRating value={0} />
          </Box>

          <Box>
            <Typography gutterBottom sx={{ fontSize: '0.875rem', color: 'text.primary', mb: 2 }}>
              Hover State
            </Typography>
            <ThemedRating defaultValue={3} />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
              Hover over stars to preview rating
            </Typography>
          </Box>
        </Stack>
      </CoreVariantSection>

      <FeaturesSection
        features={[
          { feature: "Theming", description: "Orange stars, MUI default sizing" },
          { feature: "Precision", description: "Half and quarter star values supported" },
          { feature: "Modes", description: "Interactive, read-only, with hover preview" },
          { feature: "Text pairing", description: "Combine with labels like '4.5 out of 5'" },
        ]}
      />

      <CorePropsTable
        props={[
          { name: 'value', type: 'number', description: 'Current rating value' },
          { name: 'onChange', type: 'function', description: 'Callback when rating changes' },
          { name: 'precision', type: 'number', description: 'Rating precision (0.5 for half stars). Default: 1' },
          { name: 'max', type: 'number', description: 'Maximum rating value. Default: 5' },
          { name: 'readOnly', type: 'boolean', description: 'If true, rating is display-only' },
          { name: 'disabled', type: 'boolean', description: 'If true, rating is disabled' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "2.1.1", name: "Keyboard", level: "A", note: "Arrow keys to select rating" },
          { id: "2.4.7", name: "Focus Visible", level: "AA", note: "Visible focus indicator" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "radiogroup + radio roles, aria-checked" },
          { id: "3.3.2", name: "Labels or Instructions", level: "A", note: "aria-label or visible label required" },
          { id: "1.4.11", name: "Non-text Contrast", level: "AA", note: "3:1 filled vs empty star contrast" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default RatingDetailPage

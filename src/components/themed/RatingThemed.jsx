import React from 'react';
import { Rating as MuiRating, Stack, Typography, Box, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import FeaturesSection from '../docs/FeaturesSection';

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
}));

export default function RatingThemed() {
  const theme = useTheme();
  const [value, setValue] = React.useState(2);
  const [textValue, setTextValue] = React.useState(3);

  return (
    <div className="themed-showcase">
      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Basic Rating
        </h4>
        <Stack spacing={3}>
          <Box>
            <Typography gutterBottom style={{ fontSize: '0.875rem', color: theme.palette.text.primary }}>
              Controlled
            </Typography>
            <ThemedRating
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </Box>

          <Box>
            <Typography gutterBottom style={{ fontSize: '0.875rem', color: theme.palette.text.primary }}>
              Read Only
            </Typography>
            <ThemedRating value={3} readOnly />
          </Box>

          <Box>
            <Typography gutterBottom style={{ fontSize: '0.875rem', color: theme.palette.text.disabled }}>
              Disabled
            </Typography>
            <ThemedRating value={4} disabled />
          </Box>
        </Stack>
      </section>

      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Precision
        </h4>
        <Stack spacing={3}>
          <Box>
            <Typography gutterBottom style={{ fontSize: '0.875rem', color: theme.palette.text.primary }}>
              Half Ratings
            </Typography>
            <ThemedRating defaultValue={2.5} precision={0.5} />
          </Box>

          <Box>
            <Typography gutterBottom style={{ fontSize: '0.875rem', color: theme.palette.text.primary }}>
              Quarter Ratings
            </Typography>
            <ThemedRating defaultValue={3.25} precision={0.25} />
          </Box>
        </Stack>
      </section>

      <section className="variant-section">
        <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
          With Text Pairing
        </h4>
        <Stack spacing={3}>
          <Box>
            <Typography gutterBottom style={{ fontSize: '0.875rem', color: theme.palette.text.primary }}>
              Rating with Label
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <ThemedRating
                value={textValue}
                onChange={(event, newValue) => {
                  setTextValue(newValue);
                }}
              />
              <Typography variant="body2" color="text.secondary">
                {textValue} out of 5
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography gutterBottom style={{ fontSize: '0.875rem', color: theme.palette.text.primary }}>
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
      </section>

      <FeaturesSection
        features={[
          { feature: "Theming", description: "Orange filled, grey empty" },
          { feature: "Precision", description: "Half and quarter star values supported" },
          { feature: "Modes", description: "Interactive, read-only, disabled" },
          { feature: "Text pairing", description: "Combine with labels like '4.5 out of 5'" },
        ]}
      />
    </div>
  );
}

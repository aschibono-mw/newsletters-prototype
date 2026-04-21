import { Box, Typography } from '@mui/material';

export default function TagInputThemed() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 200,
        p: 3,
        border: '2px dashed',
        borderColor: 'divider',
        borderRadius: 1,
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
        Themed Tag Input - Placeholder for custom design system version
      </Typography>
    </Box>
  );
}

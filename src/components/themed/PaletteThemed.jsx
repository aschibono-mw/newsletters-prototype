import { Box, Typography, Grid, Paper, useTheme } from '@mui/material';

export default function PaletteThemed() {
  const theme = useTheme();

  const ColorSwatch = ({ color, label, textColor = null }) => {
    // Auto-detect text color based on luminance if not provided
    const getTextColor = () => {
      if (textColor) return textColor;

      // Simple luminance detection for auto text color
      if (typeof color === 'string') {
        if (color.startsWith('rgba') && color.includes('0.0')) return 'black';
        if (['#ffffff', '#fff', '#fafafa', '#f5f5f5'].includes(color.toLowerCase())) return 'black';
        if (color.startsWith('#') && color.length >= 4) {
          const hex = color.replace('#', '');
          const r = parseInt(hex.substr(0, 2), 16);
          const g = parseInt(hex.substr(2, 2), 16);
          const b = parseInt(hex.substr(4, 2), 16);
          const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          return luminance > 0.5 ? 'black' : 'white';
        }
      }
      return 'black';
    };

    return (
      <Box
        sx={{
          bgcolor: color,
          p: 1.5,
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
          minWidth: 80,
          border: color === '#ffffff' || color === '#fff' ? '1px solid' : 'none',
          borderColor: 'divider',
        }}
      >
        <Typography variant="caption" sx={{ color: getTextColor(), fontWeight: 600, fontSize: '0.7rem' }}>
          {label}
        </Typography>
        <Typography variant="caption" sx={{ color: getTextColor(), fontFamily: 'monospace', fontSize: '0.65rem' }}>
          {color}
        </Typography>
      </Box>
    );
  };

  const colors = [
    { name: 'Primary', key: 'primary' },
    { name: 'Secondary', key: 'secondary' },
    { name: 'Error', key: 'error' },
    { name: 'Warning', key: 'warning' },
    { name: 'Info', key: 'info' },
    { name: 'Success', key: 'success' },
  ];

  const greys = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
      {/* Theme Colors */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Theme Colors
        </Typography>
        <Grid container spacing={2}>
          {colors.map((color) => (
            <Grid item xs={12} sm={6} md={4} key={color.key}>
              <Paper sx={{ p: 0, overflow: 'hidden' }}>
                <Box sx={{ bgcolor: theme.palette[color.key].light, p: 2 }}>
                  <Typography variant="caption">light</Typography>
                  <Typography variant="caption" sx={{ display: 'block', fontFamily: 'monospace', fontSize: '0.65rem', mt: 0.5 }}>
                    {theme.palette[color.key].light}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: theme.palette[color.key].main, p: 2, color: theme.palette[color.key].contrastText }}>
                  <Typography variant="body2"><strong>{color.name}</strong></Typography>
                  <Typography variant="caption" sx={{ display: 'block' }}>{theme.palette[color.key].main}</Typography>
                </Box>
                <Box sx={{ bgcolor: theme.palette[color.key].dark, p: 2, color: theme.palette[color.key].contrastText }}>
                  <Typography variant="caption">dark</Typography>
                  <Typography variant="caption" sx={{ display: 'block', fontFamily: 'monospace', fontSize: '0.65rem', mt: 0.5 }}>
                    {theme.palette[color.key].dark}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Grey Scale */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Grey Scale
        </Typography>
        <Grid container spacing={1}>
          {greys.map((grey) => (
            <Grid item xs={6} sm={4} md={2.4} key={grey}>
              <Box
                sx={{
                  bgcolor: `grey.${grey}`,
                  p: 2,
                  textAlign: 'center',
                  color: grey >= 500 ? 'white' : 'black',
                  borderRadius: 1,
                }}
              >
                <Typography variant="caption"><strong>{grey}</strong></Typography>
                <Typography variant="caption" sx={{ display: 'block', fontSize: '0.65rem' }}>
                  {theme.palette.grey[grey]}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Text Colors */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Text Colors
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Typography variant="body1" color="text.primary" gutterBottom>
            text.primary - Main content text ({theme.palette.text.primary})
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            text.secondary - Supporting text ({theme.palette.text.secondary})
          </Typography>
          <Typography variant="body1" color="text.disabled" gutterBottom>
            text.disabled - Inactive elements ({theme.palette.text.disabled})
          </Typography>
        </Paper>
      </Box>

      {/* Background Colors */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Background Colors
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ flex: 1, bgcolor: 'background.default', p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
            <Typography variant="caption">background.default</Typography>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem', mt: 1 }}>
              {theme.palette.background.default}
            </Typography>
          </Box>
          <Box sx={{ flex: 1, bgcolor: 'background.paper', p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
            <Typography variant="caption">background.paper</Typography>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem', mt: 1 }}>
              {theme.palette.background.paper}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Divider */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Divider Color
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', pb: 1 }}>
            <Typography variant="caption">divider color</Typography>
          </Box>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
            {theme.palette.divider}
          </Typography>
        </Box>
      </Box>

      {/* Action Colors */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Action Colors
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Box sx={{ flex: 1, bgcolor: 'action.active', p: 2, borderRadius: 1 }}>
              <Typography variant="caption" sx={{ color: 'white' }}>
                action.active
              </Typography>
              <Typography variant="caption" sx={{ display: 'block', fontFamily: 'monospace', fontSize: '0.65rem', mt: 0.5, color: 'white' }}>
                {theme.palette.action.active}
              </Typography>
            </Box>
            <Box sx={{ flex: 1, bgcolor: 'action.hover', p: 2, borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="caption">action.hover</Typography>
              <Typography variant="caption" sx={{ display: 'block', fontFamily: 'monospace', fontSize: '0.65rem', mt: 0.5 }}>
                {theme.palette.action.hover}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1, bgcolor: 'action.selected', p: 2, borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="caption">action.selected</Typography>
              <Typography variant="caption" sx={{ display: 'block', fontFamily: 'monospace', fontSize: '0.65rem', mt: 0.5 }}>
                {theme.palette.action.selected}
              </Typography>
            </Box>
            <Box sx={{ flex: 1, bgcolor: 'action.disabled', p: 2, borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="caption">action.disabled</Typography>
              <Typography variant="caption" sx={{ display: 'block', fontFamily: 'monospace', fontSize: '0.65rem', mt: 0.5 }}>
                {theme.palette.action.disabled}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Active Palette Mode Indicator */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Active Palette
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Typography variant="body2">
            <strong>Mode:</strong> {theme.palette.mode}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            This column dynamically reflects the currently selected palette mode
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}

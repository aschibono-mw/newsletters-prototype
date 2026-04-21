import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { elevation } from '../../theme-tokens';

export default function ElevationThemed() {
  const elevationLevels = [
    {
      level: 0,
      value: 'none',
      uses: 'Lowest element on a page, backgrounds',
    },
    {
      level: 1,
      value: elevation[1],
      uses: 'Elements sitting on top of the lowest level of a page (cards, toolbars, etc.)',
    },
    {
      level: 4,
      value: elevation[4],
      uses: 'Elements that live on top of page elements (dropdowns, popups, etc.)',
    },
    {
      level: 8,
      value: elevation[8],
      uses: 'Elements that float above the page (banners, active states, etc.)',
    },
    {
      level: 24,
      value: elevation[24],
      uses: 'Elements sitting above everything on a page (dialogs/modals, side panels, etc.)',
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
      {/* Elevation Scale Table */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Custom Elevation Scale
        </Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Token</strong></TableCell>
                <TableCell><strong>Value</strong></TableCell>
                <TableCell><strong>Example</strong></TableCell>
                <TableCell><strong>Uses</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {elevationLevels.map((item) => (
                <TableRow key={item.level}>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {item.level}
                    </Typography>
                    <Typography variant="caption" component="code" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                      theme.shadows[{item.level}]
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="caption"
                      component="code"
                      sx={{
                        fontFamily: 'monospace',
                        fontSize: '0.65rem',
                        wordBreak: 'break-all',
                        display: 'block',
                        maxWidth: 200,
                      }}
                    >
                      {item.value}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'grey.50',
                        p: 2,
                      }}
                    >
                      <Paper
                        elevation={item.level}
                        sx={{
                          width: 80,
                          height: 80,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: 'background.paper',
                        }}
                      >
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                          {item.level}
                        </Typography>
                      </Paper>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{item.uses}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Elevation System Info */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Elevation System
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Typography variant="body1" gutterBottom>
            <strong>Key Levels:</strong> 0, 1, 4, 8, 24
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Total Levels:</strong> 25 (0-24)
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
            Use elevation prop on Paper component or boxShadow in sx:
            <br />
            <code>&lt;Paper elevation=&#123;1&#125;&gt;</code> - Cards, toolbars
            <br />
            <code>&lt;Paper elevation=&#123;4&#125;&gt;</code> - Dropdowns, menus
            <br />
            <code>&lt;Paper elevation=&#123;8&#125;&gt;</code> - App bar, active states
            <br />
            <code>&lt;Paper elevation=&#123;24&#125;&gt;</code> - Modals, dialogs
          </Typography>
        </Paper>
      </Box>

      {/* Visual Comparison */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Visual Comparison
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 4,
            p: 4,
            bgcolor: 'grey.50',
            borderRadius: 1,
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}
        >
          {elevationLevels.map((item) => (
            <Box
              key={item.level}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Paper
                elevation={item.level}
                sx={{
                  width: 100,
                  height: 100,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'background.paper',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {item.level}
                </Typography>
              </Paper>
              <Typography variant="caption" color="text.secondary">
                Elevation {item.level}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Use Cases */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Common Use Cases
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Typography variant="body1" gutterBottom>
            <strong>0 - No Shadow:</strong> Page backgrounds, lowest layer
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>1 - Subtle:</strong> Cards, content blocks, toolbars
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>4 - Raised:</strong> Dropdowns, popovers, menus, tooltips
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>8 - Floating:</strong> App bars, floating action buttons, banners
          </Typography>
          <Typography variant="body1">
            <strong>24 - Top Layer:</strong> Dialogs, modals, drawers, side panels
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}

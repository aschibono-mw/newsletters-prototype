import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export default function SpacingThemed() {
  const spacingTokens = [
    { token: 0.5, size: '4px', uses: '' },
    { token: 1, size: '8px', uses: '' },
    { token: 1.5, size: '12px', uses: '' },
    { token: 2, size: '16px', uses: '' },
    { token: 2.5, size: '20px', uses: '' },
    { token: 3, size: '24px', uses: '' },
    { token: 3.5, size: '28px', uses: '' },
    { token: 4, size: '32px', uses: 'Top margin between toolbar and page elements' },
    { token: 4.5, size: '36px', uses: '' },
    { token: 5, size: '40px', uses: '' },
    { token: 5.5, size: '44px', uses: '' },
    { token: 6, size: '48px', uses: '' },
    { token: 6.5, size: '52px', uses: '' },
    { token: 7, size: '56px', uses: '' },
    { token: 7.5, size: '60px', uses: '' },
    { token: 8, size: '64px', uses: '' },
    { token: 8.5, size: '68px', uses: '' },
    { token: 9, size: '72px', uses: '' },
    { token: 9.5, size: '76px', uses: '' },
    { token: 10, size: '80px', uses: '' },
    { token: 10.5, size: '84px', uses: '' },
    { token: 11, size: '88px', uses: '' },
    { token: 11.5, size: '92px', uses: '' },
    { token: 12, size: '96px', uses: '' },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
      {/* Spacing Scale Table */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Custom Spacing Scale (8px base unit)
        </Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Token</strong></TableCell>
                <TableCell><strong>Size</strong></TableCell>
                <TableCell><strong>Example</strong></TableCell>
                <TableCell><strong>Uses</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {spacingTokens.map((item) => (
                <TableRow key={item.token}>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {item.token}
                    </Typography>
                    <Typography variant="caption" component="code" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                      theme.spacing({item.token})
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{item.size}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        width: item.size,
                        height: '24px',
                        bgcolor: 'primary.main',
                        borderRadius: 0.5,
                      }}
                    />
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

      {/* Base Unit Info */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Spacing System
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Typography variant="body1" gutterBottom>
            <strong>Base Unit:</strong> 8px
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Increments:</strong> 0.5 units (4px steps)
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Range:</strong> 0.5 (4px) to 12 (96px)
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
            Use theme.spacing() function in MUI components:
            <br />
            <code>sx=&#123;&#123; p: 2 &#125;&#125;</code> = 16px padding
            <br />
            <code>sx=&#123;&#123; gap: 4 &#125;&#125;</code> = 32px gap
            <br />
            <code>sx=&#123;&#123; mb: 1.5 &#125;&#125;</code> = 12px bottom margin
          </Typography>
        </Paper>
      </Box>

      {/* Padding Examples */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Padding Examples
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Paper sx={{ p: 1, bgcolor: 'primary.light', color: 'white' }}>
            <Typography>p: 1 (8px padding)</Typography>
          </Paper>
          <Paper sx={{ p: 2, bgcolor: 'secondary.light', color: 'white' }}>
            <Typography>p: 2 (16px padding)</Typography>
          </Paper>
          <Paper sx={{ p: 3, bgcolor: 'success.light', color: 'white' }}>
            <Typography>p: 3 (24px padding)</Typography>
          </Paper>
          <Paper sx={{ p: 4, bgcolor: 'info.light', color: 'white' }}>
            <Typography>p: 4 (32px padding) - Toolbar margin</Typography>
          </Paper>
        </Box>
      </Box>

      {/* Gap Examples */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Gap Examples (Flexbox/Grid)
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, bgcolor: 'grey.100', p: 2, borderRadius: 1 }}>
            <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>gap: 1</Paper>
            <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>8px</Paper>
            <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>between</Paper>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, bgcolor: 'grey.100', p: 2, borderRadius: 1 }}>
            <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>gap: 2</Paper>
            <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>16px</Paper>
            <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>between</Paper>
          </Box>
          <Box sx={{ display: 'flex', gap: 4, bgcolor: 'grey.100', p: 2, borderRadius: 1 }}>
            <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>gap: 4</Paper>
            <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>32px</Paper>
            <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>between</Paper>
          </Box>
        </Box>
      </Box>

      {/* Common Spacing Patterns */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Common Spacing Patterns
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Typography variant="body1" gutterBottom>
            <strong>Tight spacing:</strong> 0.5, 1 (4px, 8px) - Icons, inline elements
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Standard spacing:</strong> 2, 3 (16px, 24px) - Form fields, cards
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Large spacing:</strong> 4, 5, 6 (32px, 40px, 48px) - Sections, page layout
          </Typography>
          <Typography variant="body1">
            <strong>Extra large spacing:</strong> 8, 10, 12 (64px, 80px, 96px) - Major sections
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}

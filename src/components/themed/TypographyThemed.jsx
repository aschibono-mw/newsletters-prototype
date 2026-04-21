import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { typography } from '../../theme-tokens';

export default function TypographyThemed() {
  const typographyTokens = [
    {
      token: 'display',
      path: 'theme.typography.display',
      size: '40px / 52px',
      weight: '700\nbold',
      example: 'display',
      uses: '*USE IN MODERATION*, used in dashboard metrics (analytics)',
    },
    {
      token: 'h5',
      path: 'theme.typography.h5',
      size: '24px / 32px',
      weight: '400\nregular',
      example: 'h5',
      uses: 'Modal headers, navigation card headers',
    },
    {
      token: 'h5 heavy',
      path: 'theme.typography.h5',
      size: '24px / 32px',
      weight: '700\nbold',
      example: 'h5Heavy',
      uses: 'Empty state headers, Modal headers, navigation card headers',
    },
    {
      token: 'h6',
      path: 'theme.typography.h6',
      size: '20px / 26px',
      weight: '400\nregular',
      example: 'h6',
      uses: '',
    },
    {
      token: 'h6 heavy',
      path: 'theme.typography.h6',
      size: '20px / 26px',
      weight: '700\nbold',
      example: 'h6Heavy',
      uses: 'Modal headers, navigation card headers',
    },
    {
      token: 'title',
      path: 'theme.typography.title',
      size: '18px / 24px',
      weight: '400\nregular',
      example: 'title',
      uses: 'Content card headers',
    },
    {
      token: 'title heavy',
      path: 'theme.typography.title',
      size: '18px / 24px',
      weight: '700\nbold',
      example: 'titleHeavy',
      uses: 'Side panel headers',
    },
    {
      token: 'subtitle1',
      path: 'theme.typography.subtitle1',
      size: '16px / 22px',
      weight: '400\nregular',
      example: 'subtitle1',
      uses: '',
    },
    {
      token: 'subtitle1 heavy',
      path: 'theme.typography.subtitle1',
      size: '16px / 22px',
      weight: '700\nbold',
      example: 'subtitle1Heavy',
      uses: 'Side panel content headers',
    },
    {
      token: 'body1',
      path: 'theme.typography.body1',
      size: '14px / 18px',
      weight: '400\nregular',
      example: 'body1',
      uses: 'Default copy text',
    },
    {
      token: 'body1 heavy',
      path: 'theme.typography.body1',
      size: '14px / 18px',
      weight: '700\nbold',
      example: 'body1Heavy',
      uses: 'Content card header source name',
    },
    {
      token: 'caption',
      path: 'theme.typography.caption',
      size: '12px / 16px',
      weight: '400\nregular',
      example: 'caption',
      uses: '',
    },
    {
      token: 'caption heavy',
      path: 'theme.typography.caption',
      size: '12px / 16px',
      weight: '700\nbold',
      example: 'captionHeavy',
      uses: '',
    },
  ];

  const renderExample = (styleKey) => {
    const style = typography[styleKey];
    if (!style) return null;

    return (
      <Typography
        component="span"
        sx={{
          fontSize: style.fontSize,
          lineHeight: style.lineHeight,
          fontWeight: style.fontWeight,
          fontFamily: typography.fontFamily.base,
        }}
      >
        The quick brown fox jumps over the lazy dog
      </Typography>
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
      {/* Typography Scale Table */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Custom Typography Scale
        </Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Token</strong></TableCell>
                <TableCell><strong>Size / Height</strong></TableCell>
                <TableCell><strong>Weight</strong></TableCell>
                <TableCell><strong>Example</strong></TableCell>
                <TableCell><strong>Uses</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {typographyTokens.map((token, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {token.token}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {token.path}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                      {token.size}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                      {token.weight}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ minWidth: 300 }}>
                    {renderExample(token.example)}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                      {token.uses}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Font Family */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Font Family
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Typography sx={{ fontFamily: typography.fontFamily.base }}>
            {typography.fontFamily.base}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
            Used throughout the design system
          </Typography>
        </Paper>
      </Box>

      {/* Font Weights */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Font Weights
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Typography
            sx={{
              fontWeight: typography.fontWeight.regular,
              fontFamily: typography.fontFamily.base,
              mb: 1,
            }}
          >
            fontWeight: regular (400)
          </Typography>
          <Typography
            sx={{
              fontWeight: typography.fontWeight.bold,
              fontFamily: typography.fontFamily.base,
            }}
          >
            fontWeight: bold (700)
          </Typography>
        </Paper>
      </Box>

      {/* All Typography Styles */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Typography Styles in Action
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ mb: 3 }}>
            <Typography
              component="div"
              sx={{
                fontSize: typography.display.fontSize,
                lineHeight: typography.display.lineHeight,
                fontWeight: typography.display.fontWeight,
                fontFamily: typography.fontFamily.base,
                mb: 0.5,
              }}
            >
              Display
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {typography.display.use}
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography
              component="div"
              sx={{
                fontSize: typography.h5.fontSize,
                lineHeight: typography.h5.lineHeight,
                fontWeight: typography.h5.fontWeight,
                fontFamily: typography.fontFamily.base,
                mb: 0.5,
              }}
            >
              H5 Regular
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {typography.h5.use}
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography
              component="div"
              sx={{
                fontSize: typography.h5Heavy.fontSize,
                lineHeight: typography.h5Heavy.lineHeight,
                fontWeight: typography.h5Heavy.fontWeight,
                fontFamily: typography.fontFamily.base,
                mb: 0.5,
              }}
            >
              H5 Heavy
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {typography.h5Heavy.use}
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography
              component="div"
              sx={{
                fontSize: typography.h6.fontSize,
                lineHeight: typography.h6.lineHeight,
                fontWeight: typography.h6.fontWeight,
                fontFamily: typography.fontFamily.base,
                mb: 0.5,
              }}
            >
              H6 Regular
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {typography.h6.use}
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography
              component="div"
              sx={{
                fontSize: typography.h6Heavy.fontSize,
                lineHeight: typography.h6Heavy.lineHeight,
                fontWeight: typography.h6Heavy.fontWeight,
                fontFamily: typography.fontFamily.base,
                mb: 0.5,
              }}
            >
              H6 Heavy
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {typography.h6Heavy.use}
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography
              component="div"
              sx={{
                fontSize: typography.title.fontSize,
                lineHeight: typography.title.lineHeight,
                fontWeight: typography.title.fontWeight,
                fontFamily: typography.fontFamily.base,
                mb: 0.5,
              }}
            >
              Title Regular
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {typography.title.use}
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography
              component="div"
              sx={{
                fontSize: typography.titleHeavy.fontSize,
                lineHeight: typography.titleHeavy.lineHeight,
                fontWeight: typography.titleHeavy.fontWeight,
                fontFamily: typography.fontFamily.base,
                mb: 0.5,
              }}
            >
              Title Heavy
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {typography.titleHeavy.use}
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography
              component="div"
              sx={{
                fontSize: typography.subtitle1.fontSize,
                lineHeight: typography.subtitle1.lineHeight,
                fontWeight: typography.subtitle1.fontWeight,
                fontFamily: typography.fontFamily.base,
                mb: 0.5,
              }}
            >
              Subtitle1 Regular
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {typography.subtitle1.use}
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography
              component="div"
              sx={{
                fontSize: typography.subtitle1Heavy.fontSize,
                lineHeight: typography.subtitle1Heavy.lineHeight,
                fontWeight: typography.subtitle1Heavy.fontWeight,
                fontFamily: typography.fontFamily.base,
                mb: 0.5,
              }}
            >
              Subtitle1 Heavy
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {typography.subtitle1Heavy.use}
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography
              component="div"
              sx={{
                fontSize: typography.body1.fontSize,
                lineHeight: typography.body1.lineHeight,
                fontWeight: typography.body1.fontWeight,
                fontFamily: typography.fontFamily.base,
                mb: 0.5,
              }}
            >
              Body1 Regular
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {typography.body1.use}
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography
              component="div"
              sx={{
                fontSize: typography.body1Heavy.fontSize,
                lineHeight: typography.body1Heavy.lineHeight,
                fontWeight: typography.body1Heavy.fontWeight,
                fontFamily: typography.fontFamily.base,
                mb: 0.5,
              }}
            >
              Body1 Heavy
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {typography.body1Heavy.use}
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography
              component="div"
              sx={{
                fontSize: typography.caption.fontSize,
                lineHeight: typography.caption.lineHeight,
                fontWeight: typography.caption.fontWeight,
                fontFamily: typography.fontFamily.base,
                mb: 0.5,
              }}
            >
              Caption Regular
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {typography.caption.use}
            </Typography>
          </Box>

          <Box>
            <Typography
              component="div"
              sx={{
                fontSize: typography.captionHeavy.fontSize,
                lineHeight: typography.captionHeavy.lineHeight,
                fontWeight: typography.captionHeavy.fontWeight,
                fontFamily: typography.fontFamily.base,
                mb: 0.5,
              }}
            >
              Caption Heavy
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {typography.captionHeavy.use}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

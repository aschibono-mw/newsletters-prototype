import { Box, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import FeaturesSection from '../docs/FeaturesSection'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

// Styled Indicator component
const StyledIndicator = styled(Box)(({ theme, color = 'default', size = 'default' }) => {
  // Color mapping based on theme palette and custom colors with light backgrounds
  const colorMap = {
    secondary: {
      border: theme.palette.secondary.main,
      background: '#F3E8FF',
      text: theme.palette.secondary.main,
    },
    success: {
      border: theme.palette.success.main,
      background: '#E8F5E9',
      text: theme.palette.success.main,
    },
    error: {
      border: theme.palette.error.main,
      background: '#FFEBEE',
      text: theme.palette.error.main,
    },
    warning: {
      border: theme.palette.warning.main,
      background: '#FFF3E0',
      text: theme.palette.warning.main,
    },
    info: {
      border: theme.palette.info.main,
      background: '#E3F2FD',
      text: theme.palette.info.main,
    },
    blue: {
      border: '#2196F3',
      background: '#E3F2FD',
      text: '#2196F3',
    },
    yellow: {
      border: '#FDD835',
      background: '#FFFDE7',
      text: '#F9A825',
    },
    pink: {
      border: '#EC407A',
      background: '#FCE4EC',
      text: '#EC407A',
    },
    lightGreen: {
      border: '#9CCC65',
      background: '#F1F8E9',
      text: '#7CB342',
    },
    orange: {
      border: '#FF9800',
      background: '#FFF3E0',
      text: '#F57C00',
    },
    cyan: {
      border: '#00BCD4',
      background: '#E0F7FA',
      text: '#00ACC1',
    },
    deepPurple: {
      border: '#7E57C2',
      background: '#EDE7F6',
      text: '#7E57C2',
    },
    brown: {
      border: '#8D6E63',
      background: '#EFEBE9',
      text: '#8D6E63',
    },
    indigo: {
      border: '#5C6BC0',
      background: '#E8EAF6',
      text: '#5C6BC0',
    },
    blueGrey: {
      border: '#78909C',
      background: '#ECEFF1',
      text: '#78909C',
    },
    default: {
      border: theme.palette.grey[400],
      background: theme.palette.grey[100],
      text: theme.palette.text.primary,
    },
  }

  const colors = colorMap[color] || colorMap.default
  const isSmall = size === 'small'

  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: isSmall ? '2px' : '4px',
    padding: isSmall ? '2px 6px' : '4px 8px',
    borderRadius: '4px',
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.background,
    color: colors.text,
    fontWeight: 700,
    fontSize: isSmall ? '10px' : '12px',
    lineHeight: isSmall ? '16px' : '16px',
    textTransform: isSmall ? 'uppercase' : 'none',
    letterSpacing: isSmall ? '0.5px' : 'normal',
    whiteSpace: 'nowrap',
    '& .MuiSvgIcon-root': {
      fontSize: isSmall ? '12px' : '14px',
      color: colors.text,
    },
  }
})

function IndicatorThemed() {
  return (
    <div className="themed-showcase">
      {/* Color Variants */}
      <div className="variant-section">
        <h4>Color Variants</h4>
        <p>14 color options for semantic and visual categorization.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            <StyledIndicator color="secondary">Secondary</StyledIndicator>
            <StyledIndicator color="success">Success</StyledIndicator>
            <StyledIndicator color="error">Error</StyledIndicator>
            <StyledIndicator color="blue">Blue</StyledIndicator>
            <StyledIndicator color="yellow">Yellow</StyledIndicator>
            <StyledIndicator color="pink">Pink</StyledIndicator>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            <StyledIndicator color="lightGreen">Light Green</StyledIndicator>
            <StyledIndicator color="orange">Orange</StyledIndicator>
            <StyledIndicator color="cyan">Cyan</StyledIndicator>
            <StyledIndicator color="deepPurple">Deep Purple</StyledIndicator>
            <StyledIndicator color="brown">Brown</StyledIndicator>
            <StyledIndicator color="indigo">Indigo</StyledIndicator>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            <StyledIndicator color="blueGrey">Blue Grey</StyledIndicator>
            <StyledIndicator color="default">None (Default)</StyledIndicator>
          </Box>
        </Stack>
      </div>

      {/* Size Variants */}
      <div className="variant-section">
        <h4>Size Variants</h4>
        <p>Default (Caption 700 - 12px) and Small (Overline - 10px) sizes.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Typography variant="caption" sx={{ width: 80, color: 'text.secondary' }}>
              Default:
            </Typography>
            <StyledIndicator color="secondary">Indicator</StyledIndicator>
            <StyledIndicator color="success">Indicator</StyledIndicator>
            <StyledIndicator color="error">Indicator</StyledIndicator>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Typography variant="caption" sx={{ width: 80, color: 'text.secondary' }}>
              Small:
            </Typography>
            <StyledIndicator color="secondary" size="small">NEW</StyledIndicator>
            <StyledIndicator color="info" size="small">BETA</StyledIndicator>
            <StyledIndicator color="blueGrey" size="small">MIRA</StyledIndicator>
          </Box>
        </Stack>
      </div>

      {/* Icon Support */}
      <div className="variant-section">
        <h4>Icon Support</h4>
        <p>Indicators support start icons and icon-only variants for additional context.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Typography variant="caption" sx={{ width: 80, color: 'text.secondary' }}>
              No icon:
            </Typography>
            <StyledIndicator color="blue">No icon</StyledIndicator>
            <StyledIndicator color="error">No icon</StyledIndicator>
            <StyledIndicator color="pink">No icon</StyledIndicator>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Typography variant="caption" sx={{ width: 80, color: 'text.secondary' }}>
              Start icon:
            </Typography>
            <StyledIndicator color="success">
              <CheckCircleOutlineIcon />
              Start icon
            </StyledIndicator>
            <StyledIndicator color="orange">
              <CheckCircleOutlineIcon />
              Start icon
            </StyledIndicator>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Typography variant="caption" sx={{ width: 80, color: 'text.secondary' }}>
              Icon only:
            </Typography>
            <StyledIndicator color="success">
              <CheckCircleOutlineIcon />
            </StyledIndicator>
            <StyledIndicator color="error">
              <ErrorOutlineIcon />
            </StyledIndicator>
            <StyledIndicator color="info">
              <InfoOutlinedIcon />
            </StyledIndicator>
          </Box>
        </Stack>
      </div>

      {/* Real-world Examples */}
      <div className="variant-section">
        <h4>Usage Examples</h4>
        <p>Common use cases with realistic labels.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography variant="caption" sx={{ width: 80, color: 'text.secondary' }}>
              Status:
            </Typography>
            <StyledIndicator color="success">Active</StyledIndicator>
            <StyledIndicator color="error">Inactive</StyledIndicator>
            <StyledIndicator color="warning">Pending</StyledIndicator>
            <StyledIndicator color="blueGrey">Draft</StyledIndicator>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography variant="caption" sx={{ width: 80, color: 'text.secondary' }}>
              Groups:
            </Typography>
            <StyledIndicator color="blue">EMEA</StyledIndicator>
            <StyledIndicator color="cyan">APAC</StyledIndicator>
            <StyledIndicator color="orange">AMER</StyledIndicator>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography variant="caption" sx={{ width: 80, color: 'text.secondary' }}>
              Tags:
            </Typography>
            <StyledIndicator color="secondary" size="small">NEW</StyledIndicator>
            <StyledIndicator color="info" size="small">BETA</StyledIndicator>
            <StyledIndicator color="success" size="small">VERIFIED</StyledIndicator>
          </Box>
        </Stack>
      </div>

      <FeaturesSection
        features={[
          { feature: "Styling", description: "1px border, 4px radius, light tint backgrounds (100-level palette)" },
          { feature: "Sizes", description: "Default (12px/4×8px padding), Small (10px uppercase/2×6px padding)" },
          { feature: "Colors", description: "14 semantic and visual variants with matching backgrounds" },
          { feature: "Content", description: "Text, start icons, icon-only. Used for status labels, tags, badges" },
        ]}
      />
    </div>
  )
}

export default IndicatorThemed

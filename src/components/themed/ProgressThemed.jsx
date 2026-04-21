import {
  Box,
  Stack,
  Typography,
  CircularProgress,
  LinearProgress,
  Skeleton,
} from '@mui/material'
import { styled, keyframes } from '@mui/material/styles'
import FeaturesSection from '../docs/FeaturesSection'

// Loading dots animation
const dotPulse = keyframes`
  0%, 80%, 100% {
    opacity: 0.3;
  }
  40% {
    opacity: 1;
  }
`

const LoadingDot = styled(Box)(({ delay = 0 }) => ({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: '#9E9E9E',
  animation: `${dotPulse} 1.4s ease-in-out infinite`,
  animationDelay: `${delay}s`,
}))

function ProgressThemed() {
  return (
    <div className="themed-showcase">
      {/* Loading Message Animation */}
      <div className="variant-section">
        <h4>Loading Message (Animation)</h4>
        <p>Three-dot pulse animation for loading states.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
            <LoadingDot delay={0} />
            <LoadingDot delay={0.2} />
            <LoadingDot delay={0.4} />
          </Box>
        </Stack>
      </div>

      {/* Circular Indeterminate */}
      <div className="variant-section">
        <h4>Circular Indeterminate</h4>
        <p>Rotating circular progress indicator for ongoing processes.</p>
        <Stack spacing={2}>
          <CircularProgress size={40} thickness={4} />
        </Stack>
      </div>

      {/* Linear Progress */}
      <div className="variant-section">
        <h4>Linear Progress</h4>
        <p>Horizontal progress bars with different color variants.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 600 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Primary (Teal)
            </Typography>
            <LinearProgress
              sx={{
                height: 4,
                borderRadius: 2,
                backgroundColor: 'grey.200',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 2,
                  backgroundColor: 'primary.main',
                },
              }}
            />

            <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 2 }}>
              Error (Red)
            </Typography>
            <LinearProgress
              sx={{
                height: 4,
                borderRadius: 2,
                backgroundColor: 'grey.200',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 2,
                  backgroundColor: 'error.main',
                },
              }}
            />

            <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 2 }}>
              Warning (Orange)
            </Typography>
            <LinearProgress
              sx={{
                height: 4,
                borderRadius: 2,
                backgroundColor: 'grey.200',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 2,
                  backgroundColor: 'warning.main',
                },
              }}
            />

            <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 2 }}>
              Success (Green)
            </Typography>
            <LinearProgress
              sx={{
                height: 4,
                borderRadius: 2,
                backgroundColor: 'grey.200',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 2,
                  backgroundColor: 'success.main',
                },
              }}
            />

            <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 2 }}>
              Info (Blue)
            </Typography>
            <LinearProgress
              sx={{
                height: 4,
                borderRadius: 2,
                backgroundColor: 'grey.200',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 2,
                  backgroundColor: 'info.main',
                },
              }}
            />
          </Box>
        </Stack>
      </div>

      {/* Skeleton Elements */}
      <div className="variant-section">
        <h4>Skeleton Elements</h4>
        <p>Individual skeleton shapes for building custom loading states.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rounded" width={200} height={20} />
            <Skeleton variant="rectangular" width={180} height={120} />
          </Box>
        </Stack>
      </div>

      {/* Skeleton Layouts */}
      <div className="variant-section">
        <h4>Skeletons</h4>
        <p>Full skeleton patterns for common UI layouts.</p>
        <Stack spacing={2}>
          {/* List item skeleton */}
          <Box
            sx={{
              p: 2,
              backgroundColor: 'grey.50',
              borderRadius: 1,
              display: 'inline-flex',
              flexDirection: 'column',
              gap: 2,
              width: 'fit-content',
            }}
          >
            {[1, 2, 3].map((item) => (
              <Box key={item} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Skeleton variant="circular" width={40} height={40} />
                <Box>
                  <Skeleton variant="text" width={180} height={20} />
                  <Skeleton variant="text" width={120} height={16} />
                </Box>
              </Box>
            ))}
          </Box>

          {/* Card skeleton */}
          <Box
            sx={{
              p: 3,
              backgroundColor: 'grey.50',
              borderRadius: 1,
              display: 'inline-flex',
              flexDirection: 'column',
              gap: 2,
              width: 'fit-content',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Skeleton variant="circular" width={56} height={56} />
              <Box>
                <Skeleton variant="text" width={200} height={24} />
                <Skeleton variant="text" width={150} height={20} />
              </Box>
            </Box>
            <Skeleton variant="rectangular" width={540} height={180} sx={{ borderRadius: 1 }} />
            <Skeleton variant="text" width={540} />
            <Skeleton variant="text" width={480} />
            <Skeleton variant="text" width={360} />
          </Box>
        </Stack>
      </div>

      <FeaturesSection
        features={[
          { feature: "Loading Indicators", description: "Loading dots (8px, 1.4s pulse, staggered 0-0.4s), Circular (40px, 4px thickness), Linear (4px height, 2px rounded ends)" },
          { feature: "Progress Colors", description: "Primary (teal), Error (red), Warning (orange), Success (green), Info (blue)" },
          { feature: "Skeleton Variants", description: "Circular (avatars), Text (single/multiple lines), Rectangular (images/cards) with grey shimmer animation" },
          { feature: "Common Use Cases", description: "Data fetching, file uploads/downloads, form submissions, content loading states, page transitions" },
        ]}
      />
    </div>
  )
}

export default ProgressThemed

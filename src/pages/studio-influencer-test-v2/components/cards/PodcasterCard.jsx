import { Box, Typography, Paper, Chip, Link } from '@mui/material'
import VerifiedIcon from '@mui/icons-material/Verified'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import SocialIcon from './SocialIcon'

// Variant 3: Podcaster/Influencer Card (Ezra Klein style)
function PodcasterCard({ data }) {
  return (
    <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{data.name}</Typography>
            {data.verified && <VerifiedIcon sx={{ fontSize: 16, color: 'primary.main' }} />}
            {data.role && (
              <Chip label={data.role} size="small" sx={{ height: 20, fontSize: '0.65rem' }} />
            )}
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            {data.beats}
          </Typography>
          <Link href="#" underline="hover" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'primary.main', fontSize: '0.875rem' }}>
            View articles and details
            <OpenInNewIcon sx={{ fontSize: 14 }} />
          </Link>
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {data.platforms?.map((platform, i) => (
            <SocialIcon key={i} platform={platform} />
          ))}
        </Box>
      </Box>
    </Paper>
  )
}

export default PodcasterCard

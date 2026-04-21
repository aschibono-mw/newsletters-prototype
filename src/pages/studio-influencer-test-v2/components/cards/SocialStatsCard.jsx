import { Box, Typography, Avatar, Paper, Divider, Link } from '@mui/material'
import VerifiedIcon from '@mui/icons-material/Verified'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import SocialIcon from './SocialIcon'

// Variant 7: Social Stats Card (Tom Warren style)
function SocialStatsCard({ data }) {
  return (
    <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ width: 48, height: 48 }} src={data.avatar}>
          {data.name.charAt(0)}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{data.name}</Typography>
            {data.verified && <VerifiedIcon sx={{ fontSize: 16, color: 'primary.main' }} />}
          </Box>
          <Link href="#" underline="hover" sx={{ color: 'primary.main', fontSize: '0.875rem' }}>
            @{data.handle}
          </Link>
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {data.platforms?.map((platform, i) => (
            <SocialIcon key={i} platform={platform} />
          ))}
        </Box>
      </Box>
      <Divider sx={{ my: 1.5 }} />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box>
            <Typography variant="caption" color="text.secondary">Reach:</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>{data.reach}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">Number of Posts:</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>{data.posts}</Typography>
          </Box>
        </Box>
        <Link href="#" underline="hover" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'primary.main', fontSize: '0.875rem' }}>
          View details
          <OpenInNewIcon sx={{ fontSize: 14 }} />
        </Link>
      </Box>
    </Paper>
  )
}

export default SocialStatsCard

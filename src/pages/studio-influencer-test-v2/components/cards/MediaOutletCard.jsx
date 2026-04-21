import { Box, Typography, Avatar, Paper, Link } from '@mui/material'
import VerifiedIcon from '@mui/icons-material/Verified'
import SocialIcon from './SocialIcon'

// Variant 1: Media Outlet Card (Bloomberg Television style)
function MediaOutletCard({ data }) {
  return (
    <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ width: 48, height: 48, backgroundColor: 'primary.main', fontSize: '1.25rem', fontWeight: 700 }}>
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
    </Paper>
  )
}

export default MediaOutletCard

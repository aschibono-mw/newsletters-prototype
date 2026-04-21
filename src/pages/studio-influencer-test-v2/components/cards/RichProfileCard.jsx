import { Box, Typography, Avatar, Paper, Chip, Link } from '@mui/material'
import VerifiedIcon from '@mui/icons-material/Verified'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import SocialIcon from './SocialIcon'

// Variant 10: Rich Profile Card (Mariella Moon / Engadget style)
function RichProfileCard({ data }) {
  return (
    <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Avatar sx={{ width: 48, height: 48 }} src={data.avatar}>
          {data.name.charAt(0)}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{data.name}</Typography>
            {data.verified && <VerifiedIcon sx={{ fontSize: 16, color: 'primary.main' }} />}
            <Chip label={data.role} size="small" sx={{ height: 20, fontSize: '0.65rem' }} />
          </Box>
          <Link href="#" underline="hover" sx={{ color: 'primary.main', fontSize: '0.875rem', display: 'block', mb: 1 }}>
            {data.publication}
          </Link>
          <Typography variant="body2" color="text.secondary">
            {data.beats}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {data.platforms?.map((platform, i) => (
              <SocialIcon key={i} platform={platform} size={18} />
            ))}
          </Box>
          <Link href="#" underline="hover" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'primary.main', fontSize: '0.75rem' }}>
            View articles and details
            <OpenInNewIcon sx={{ fontSize: 12 }} />
          </Link>
        </Box>
      </Box>
    </Paper>
  )
}

export default RichProfileCard

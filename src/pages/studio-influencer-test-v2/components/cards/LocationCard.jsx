import { Box, Typography, Avatar, Paper, Chip, Checkbox, Link } from '@mui/material'
import VerifiedIcon from '@mui/icons-material/Verified'
import SocialIcon from './SocialIcon'

// Variant 11: Location Card (Alexander Bird style)
function LocationCard({ data }) {
  return (
    <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Checkbox size="small" sx={{ mt: 0.5 }} />
        <Avatar sx={{ width: 40, height: 40 }} src={data.avatar}>
          {data.name.charAt(0)}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 0.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{data.name}</Typography>
            {data.verified && <VerifiedIcon sx={{ fontSize: 16, color: 'primary.main' }} />}
            <Typography variant="body2" color="text.secondary">
              {data.title} · {data.location}
            </Typography>
          </Box>
          <Link href="#" underline="hover" sx={{ color: 'primary.main', fontSize: '0.875rem', display: 'block', mb: 1 }}>
            {data.publication}
          </Link>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
            {data.beats?.map((beat, i) => (
              <Chip key={i} label={beat} size="small" variant="outlined" sx={{ height: 24, fontSize: '0.75rem' }} />
            ))}
          </Box>
          <Typography variant="caption" color="text.secondary">
            {data.articleCount} Relevant Articles
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {data.platforms?.map((platform, i) => (
            <SocialIcon key={i} platform={platform} size={18} />
          ))}
        </Box>
      </Box>
    </Paper>
  )
}

export default LocationCard

import { Box, Typography, Paper, Chip, Checkbox, Divider, Link } from '@mui/material'
import VerifiedIcon from '@mui/icons-material/Verified'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import SocialIcon from './SocialIcon'

// Variant 5: Journalist Row Card (Veronika Bondarenko style)
function JournalistRowCard({ data }) {
  return (
    <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Checkbox size="small" sx={{ mt: -0.5, ml: -1 }} />
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{data.name}</Typography>
            {data.verified && <VerifiedIcon sx={{ fontSize: 16, color: 'primary.main' }} />}
            <Typography variant="body2" color="text.secondary">
              {data.title} · {data.location}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {data.publication}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {data.beats?.map((beat, i) => (
              <Chip key={i} label={beat} size="small" variant="outlined" sx={{ height: 24, fontSize: '0.75rem' }} />
            ))}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {data.platforms?.map((platform, i) => (
            <SocialIcon key={i} platform={platform} />
          ))}
        </Box>
      </Box>
      <Divider sx={{ my: 1.5 }} />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2 }}>
        <Typography variant="caption" color="text.secondary">
          {data.openRate ? `${data.openRate} open rate` : 'N/A open rate'}
        </Typography>
        <Typography variant="caption">·</Typography>
        <Link href={`mailto:${data.email}`} underline="hover" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'primary.main', fontSize: '0.75rem' }}>
          {data.email}
          <ContentCopyIcon sx={{ fontSize: 12 }} />
        </Link>
      </Box>
    </Paper>
  )
}

export default JournalistRowCard

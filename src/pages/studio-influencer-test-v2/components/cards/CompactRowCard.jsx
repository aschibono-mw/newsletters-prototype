import { Box, Typography, Paper, Chip, Checkbox, Button, Link } from '@mui/material'
import VerifiedIcon from '@mui/icons-material/Verified'
import SocialIcon from './SocialIcon'

// Variant 6: Compact Row Card (Dag Hellesund style)
function CompactRowCard({ data }) {
  return (
    <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Checkbox size="small" />
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Link href="#" underline="hover" sx={{ fontWeight: 600, color: 'primary.main' }}>{data.name}</Link>
            {data.verified && <VerifiedIcon sx={{ fontSize: 14, color: 'primary.main' }} />}
            <Typography variant="body2" color="text.secondary">
              {data.title} · {data.location}
            </Typography>
          </Box>
          <Link href="#" underline="hover" sx={{ color: 'primary.main', fontSize: '0.875rem' }}>
            {data.publication}
          </Link>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
            {data.beats?.map((beat, i) => (
              <Chip key={i} label={beat} size="small" variant="outlined" sx={{ height: 22, fontSize: '0.7rem' }} />
            ))}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {data.platforms?.map((platform, i) => (
            <SocialIcon key={i} platform={platform} size={18} />
          ))}
          <Button size="small" variant="outlined" sx={{ ml: 1, textTransform: 'none', fontSize: '0.75rem' }}>
            Add to list
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}

export default CompactRowCard

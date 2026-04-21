import { Box, Typography, Avatar, Paper, Link } from '@mui/material'
import SocialIcon from './SocialIcon'

// Variant 2: Reach Stats Card (GROK style)
function ReachStatsCard({ data }) {
  return (
    <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ width: 40, height: 40, backgroundColor: 'grey.300' }}>
          {data.name.charAt(0)}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{data.name}</Typography>
          <Link href="#" underline="hover" sx={{ color: 'primary.main', fontSize: '0.75rem' }}>
            @{data.handle}
          </Link>
        </Box>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">Reach:</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>{data.reach}</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">Number of Posts:</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>{data.posts}</Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}

export default ReachStatsCard

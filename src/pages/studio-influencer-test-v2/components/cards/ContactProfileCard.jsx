import { Box, Typography, Avatar, Paper, IconButton, Link } from '@mui/material'
import VerifiedIcon from '@mui/icons-material/Verified'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

// Variant 4: Contact Profile Card (Kim Adams style)
function ContactProfileCard({ data }) {
  return (
    <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Contact profile</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ width: 64, height: 64 }} src={data.avatar}>
          {data.name.charAt(0)}
        </Avatar>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>{data.name}</Typography>
            {data.verified && <VerifiedIcon sx={{ fontSize: 18, color: 'primary.main' }} />}
          </Box>
          <Typography variant="body2" color="text.secondary">{data.title}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
            <Link href={`mailto:${data.email}`} underline="hover" sx={{ color: 'primary.main', fontSize: '0.875rem' }}>
              {data.email}
            </Link>
            <IconButton size="small" sx={{ p: 0.25 }}>
              <ContentCopyIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}

export default ContactProfileCard

import { Box } from '@mui/material'

// Social icons (using text placeholders for demo)
function SocialIcon({ platform, size = 20 }) {
  const icons = {
    twitter: 'X',
    facebook: 'f',
    linkedin: 'in',
    youtube: 'YT',
    instagram: 'IG',
    pinterest: 'P',
    substack: 'S',
    tiktok: 'TT',
  }

  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: 'grey.200',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.5,
        fontWeight: 600,
        color: 'text.secondary',
      }}
    >
      {icons[platform] || '?'}
    </Box>
  )
}

export default SocialIcon

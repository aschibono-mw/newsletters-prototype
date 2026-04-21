import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function ComponentCard({ name, path, preview }) {
  const navigate = useNavigate()

  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: 'none',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: 2,
        },
      }}
    >
      <CardActionArea
        onClick={() => navigate(path)}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        <CardContent
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            p: 0,
          }}
        >
          {/* Preview Area - Top */}
          <Box
            sx={{
              height: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(to bottom, #EEEEEE 0%, #F5F5F5 100%)',
              p: 3,
              pointerEvents: 'none',
            }}
          >
            {preview}
          </Box>

          {/* Title - Bottom */}
          <Box
            sx={{
              p: 2,
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
              {name}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

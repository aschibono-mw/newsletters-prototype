import { useState } from 'react'
import { Box, Typography, Paper, Chip, Button, Divider, IconButton } from '@mui/material'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import StopIcon from '@mui/icons-material/Stop'

// Activity log item component
function ActivityItem({ icon, text, tag, isComplete, isActive }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        py: 0.5,
        pl: 0.5,
        borderLeft: isActive ? '2px solid' : '2px solid transparent',
        borderColor: isActive ? 'primary.main' : 'transparent',
        backgroundColor: isActive ? 'rgba(0, 130, 127, 0.04)' : 'transparent',
        borderRadius: isActive ? '0 4px 4px 0' : 0,
      }}
    >
      <Box sx={{ color: isComplete ? 'success.main' : 'primary.main', display: 'flex' }}>
        {icon}
      </Box>
      <Typography
        variant="body2"
        sx={{
          color: isComplete ? 'text.secondary' : isActive ? 'text.primary' : 'text.secondary',
        }}
      >
        {text}
      </Typography>
      {tag && (
        <Chip
          label={tag}
          size="small"
          sx={{
            height: 20,
            fontSize: '0.7rem',
            backgroundColor: 'grey.100',
            color: 'text.secondary',
          }}
        />
      )}
    </Box>
  )
}

function ToolInvocationCard({
  title = 'Search complete',
  subtitle,
  sourcesCount = 3,
  isComplete = true,
  progress = 100,
  activityItems = [],
}) {
  const [showActivity, setShowActivity] = useState(false)

  // Default activity items if none provided
  const defaultActivityItems = [
    { icon: <AutoAwesomeOutlinedIcon sx={{ fontSize: 16 }} />, text: 'Understanding your query...', isComplete: true },
    { icon: <MenuBookOutlinedIcon sx={{ fontSize: 16 }} />, text: 'Searching influencer database', tag: 'influencers', isComplete: true },
    { icon: <CheckCircleOutlineIcon sx={{ fontSize: 16 }} />, text: 'Found relevant profiles', isComplete: true },
    { icon: <MenuBookOutlinedIcon sx={{ fontSize: 16 }} />, text: 'Enriching profile data', tag: 'social-data', isComplete: true },
    { icon: <CheckCircleOutlineIcon sx={{ fontSize: 16 }} />, text: 'Search complete', isComplete: true },
  ]

  const activities = activityItems.length > 0 ? activityItems : defaultActivityItems

  return (
    <Paper
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        backgroundColor: 'background.paper',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box sx={{ px: 2.5, pt: 2, pb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
          <Box sx={{ color: isComplete ? 'success.main' : 'primary.main', mt: 0.25 }}>
            {isComplete ? (
              <CheckCircleOutlineIcon sx={{ fontSize: 20 }} />
            ) : (
              <MenuBookOutlinedIcon sx={{ fontSize: 20 }} />
            )}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              label={`${sourcesCount} sources`}
              size="small"
              variant="outlined"
              sx={{
                height: 28,
                borderColor: 'divider',
                backgroundColor: 'background.paper',
              }}
            />
            {!isComplete && (
              <IconButton size="small" sx={{ backgroundColor: 'grey.100' }}>
                <StopIcon sx={{ fontSize: 16 }} />
              </IconButton>
            )}
          </Box>
        </Box>

        {/* Progress bar */}
        <Box
          sx={{
            mt: 1.5,
            height: 4,
            borderRadius: 2,
            backgroundColor: 'grey.200',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              height: '100%',
              width: `${progress}%`,
              backgroundColor: 'primary.main',
              borderRadius: 2,
              transition: 'width 0.3s ease',
            }}
          />
        </Box>
      </Box>

      {/* Activity toggle */}
      <Divider />
      <Button
        fullWidth
        onClick={() => setShowActivity(!showActivity)}
        endIcon={showActivity ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        sx={{
          py: 1,
          textTransform: 'none',
          color: 'text.secondary',
          fontWeight: 400,
          '&:hover': {
            backgroundColor: 'grey.50',
          },
        }}
      >
        {showActivity ? 'Hide activity' : 'Show activity'}
      </Button>

      {/* Activity log */}
      {showActivity && (
        <Box sx={{ px: 2.5, pb: 2, pt: 0.5 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {activities.map((item, index) => (
              <ActivityItem
                key={index}
                icon={item.icon}
                text={item.text}
                tag={item.tag}
                isComplete={item.isComplete}
                isActive={item.isActive}
              />
            ))}
          </Box>
        </Box>
      )}
    </Paper>
  )
}

export default ToolInvocationCard

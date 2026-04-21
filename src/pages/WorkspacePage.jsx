import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  AvatarGroup,
  Button,
  IconButton,
} from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'

// eslint-disable-next-line no-unused-vars
function WorkspacePage({ chatOpen: _chatOpen = false }) {
  // Quick stats
  const stats = [
    { label: 'Active Projects', value: '8' },
    { label: 'Tasks Due Today', value: '5' },
    { label: 'Completed This Week', value: '23' },
  ]

  // Team members online
  const teamOnline = [
    { name: 'Alice', avatar: 'A' },
    { name: 'Bob', avatar: 'B' },
    { name: 'Carol', avatar: 'C' },
    { name: 'Dan', avatar: 'D' },
    { name: 'Eve', avatar: 'E' },
  ]

  // Quick Access items
  const quickAccess = [
    { title: 'Recent Files', icon: <DescriptionOutlinedIcon sx={{ fontSize: 20 }} />, bgColor: 'primary.light', iconColor: 'primary.dark' },
    { title: 'My Tasks', icon: <AssignmentOutlinedIcon sx={{ fontSize: 20 }} />, bgColor: 'primary.light', iconColor: 'primary.dark' },
    { title: 'Projects', icon: <FolderOutlinedIcon sx={{ fontSize: 20 }} />, bgColor: 'primary.light', iconColor: 'primary.dark' },
  ]

  // Emerging insights
  const emerging = [
    { id: 1, title: 'Sprint Velocity Trending Up', description: 'Your team completed 15% more story points this sprint compared to the last 3-sprint average.' },
    { id: 2, title: 'Meeting Load Decreased', description: 'Calendar analysis shows 2.5 fewer hours in meetings this week, freeing up deep work time.' },
    { id: 3, title: 'Documentation Gap Detected', description: 'The API module has 40% less documentation coverage than other modules in this project.' },
  ]

  // Recommendations
  const recommendations = [
    { id: 1, title: 'Optimize Workflow', category: 'Productivity', time: 'Suggested', description: 'Automate repetitive tasks to save 3+ hours weekly', icon: <SpeedOutlinedIcon sx={{ fontSize: 20 }} /> },
    { id: 2, title: 'Team Sync', category: 'Collaboration', time: 'Suggested', description: 'Schedule a standup with 3 teammates awaiting input', icon: <GroupOutlinedIcon sx={{ fontSize: 20 }} /> },
  ]

  return (
    <Box sx={{ width: '100%' }}>
      {/* Hero Section - Left aligned with stats */}
      <Box sx={{ backgroundColor: 'background.paper', pt: 3, pb: 4 }}>
        <Box
          sx={{
            maxWidth: 1536,
            mx: 'auto',
            px: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mb: 3,
            }}
          >
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                Your Workspace
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Everything you need, all in one place
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="secondary"
              endIcon={<ArrowDropDownIcon />}
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              Actions
            </Button>
          </Box>

          {/* Stats and Team Row */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            {/* Quick Stats */}
            <Box sx={{ display: 'flex', gap: 4 }}>
              {stats.map((stat) => (
                <Box key={stat.label}>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Team Online */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <AvatarGroup max={5} sx={{ '& .MuiAvatar-root': { width: 28, height: 28, fontSize: 12 } }}>
                {teamOnline.map((member) => (
                  <Avatar key={member.name} sx={{ backgroundColor: 'primary.main' }}>
                    {member.avatar}
                  </Avatar>
                ))}
              </AvatarGroup>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {teamOnline.length} online
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Main Content - 3 stacked modules */}
      <Box
        sx={{
          backgroundColor: 'grey.100',
          minHeight: 'calc(100vh - 200px)',
          px: 3,
          py: 4,
        }}
      >
        <Box
          sx={{
            maxWidth: 1536,
            mx: 'auto',
          }}
        >
          {/* Module 1 - Quick Access */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Quick Access
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                gap: 2,
              }}
            >
              {quickAccess.map((item, i) => (
                <Card
                  key={i}
                  sx={{
                    backgroundColor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow: 'none',
                    cursor: 'pointer',
                    '&:hover': { borderColor: 'primary.main' },
                  }}
                >
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 }, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        backgroundColor: item.bgColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: item.iconColor,
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {item.title}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>

          {/* Module 2 - Emerging */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Emerging
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                gap: 2,
              }}
            >
              {emerging.map((item) => (
                <Card
                  key={item.id}
                  sx={{
                    backgroundColor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow: 'none',
                    cursor: 'pointer',
                    '&:hover': { borderColor: 'primary.main' },
                  }}
                >
                  <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                    {/* AI Generated Banner with Description */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1,
                        px: 2,
                        py: 1.5,
                        backgroundColor: 'grey.100',
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                      }}
                    >
                      <AutoAwesomeOutlinedIcon sx={{ fontSize: 14, color: 'text.secondary', mt: 0.25 }} />
                      <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.4 }}>
                        {item.description}
                      </Typography>
                    </Box>
                    {/* Image */}
                    <Box sx={{ backgroundColor: 'grey.200', height: 120 }} />
                    {/* Title and Kebab */}
                    <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {item.title}
                      </Typography>
                      <IconButton size="small" sx={{ mr: -1 }}>
                        <MoreVertIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>

          {/* Module 3 - Recommendations */}
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Recommendations
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                gap: 2,
              }}
            >
              {recommendations.map((item) => (
                <Card
                  key={item.id}
                  sx={{
                    backgroundColor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow: 'none',
                    cursor: 'pointer',
                    '&:hover': { borderColor: 'primary.main' },
                  }}
                >
                  <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                    <Box sx={{ display: 'flex' }}>
                      {/* Left content */}
                      <Box sx={{ flex: 1, p: 2.5 }}>
                        {/* Icon + Title + Subtitle */}
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 2 }}>
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: '50%',
                              backgroundColor: 'primary.light',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'primary.dark',
                              flexShrink: 0,
                            }}
                          >
                            {item.icon}
                          </Box>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {item.title}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                              {item.category} · {item.time}
                            </Typography>
                          </Box>
                        </Box>
                        {/* Description */}
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {item.description}
                        </Typography>
                      </Box>
                      {/* Right image */}
                      <Box
                        sx={{
                          width: 200,
                          backgroundColor: 'grey.200',
                          flexShrink: 0,
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default WorkspacePage

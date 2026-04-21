import { Box, Typography, IconButton, Stack, Divider, List, ListItem, ListItemText, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

function DummySidebar({ open, onClose, chatOpen = false, variant = 'sidebar1', title = 'Sidebar Title', onDrillIn, showBackButton = false, onBack, animationMode = 'slide', underChrome = false }) {
  // Determine animation style based on mode
  const getPanelStyles = () => {
    if (animationMode === 'fade') {
      // Fade mode: keep closed panels off-screen to avoid overlap
      return {
        transform: open ? 'translateX(0)' : 'translateX(100%)', // Move off-screen when closed
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none', // Don't block clicks when closed
        transition: open
          ? 'transform 0s, opacity 0.2s ease-out, right 0.3s ease-out' // Snap into place, then fade in
          : 'opacity 0.2s ease-out, transform 0s 0.2s', // Fade out, then move off-screen
      }
    } else if (animationMode === 'hybrid') {
      // Hybrid mode: slide in, fade out
      return {
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        opacity: open ? 1 : 0,
        visibility: open ? 'visible' : 'hidden',
        pointerEvents: open ? 'auto' : 'none',
        transition: 'transform 0.3s ease, opacity 0.3s ease, right 0.3s ease, visibility 0s linear 0.3s',
        ...(open && { transition: 'transform 0.3s ease, opacity 0.3s ease, right 0.3s ease' }),
      }
    } else {
      // Slide mode: slide in/out (current behavior)
      return {
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        opacity: 1,
        transition: 'transform 0.3s ease, right 0.3s ease',
      }
    }
  }

  const getContentStyles = () => {
    if (animationMode === 'fade') {
      // Content fades in AFTER panel background is done
      return {
        opacity: open ? 1 : 0,
        transition: open
          ? 'opacity 0.25s ease-out 0.2s' // Start after panel finishes (0.2s delay)
          : 'opacity 0.15s ease-in',
      }
    } else if (animationMode === 'hybrid') {
      // Content fades with slight delay when sliding in, immediate fade when closing
      return {
        opacity: open ? 1 : 0,
        transition: open
          ? 'opacity 0.25s ease-out 0.1s' // Start after panel starts sliding
          : 'opacity 0.15s ease-in', // Fade out immediately
      }
    } else {
      // No content animation in slide mode
      return {}
    }
  }

  return (
    <>
      {/* Backdrop */}
      <Box
        onClick={onClose}
        sx={{
          position: 'fixed',
          top: underChrome ? { xs: 56, sm: 64 } : 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1249,
          display: { xs: 'block', sm: 'block', md: 'none' },
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
          transition: 'opacity 0.2s ease, visibility 0.2s ease',
        }}
      />

      {/* Panel */}
      <Box
        sx={{
          position: 'fixed',
          top: underChrome ? { xs: 56, sm: 64 } : 0,
          // Both sidebars align to the right, respecting the companion chat
          right: { xs: 0, sm: 0, md: 0, lg: chatOpen ? '400px' : 0 },
          width: { xs: '100%', sm: '400px', md: '400px', lg: '400px' },
          height: underChrome ? { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' } : '100vh',
          backgroundColor: 'background.paper',
          borderLeft: '1px solid',
          borderTop: underChrome ? '1px solid' : 'none',
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1250,
          boxShadow: 1,
          ...getPanelStyles(),
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', ...getContentStyles() }}>
          {/* Header */}
          <Box
            sx={{
              minHeight: 64,
              px: variant === 'history' ? 3 : 2,
              ...(variant !== 'history' && {
                borderBottom: '1px solid',
                borderColor: 'divider',
              }),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {showBackButton && (
                <IconButton
                  onClick={onBack}
                  size="small"
                  sx={{
                    width: 32,
                    height: 32,
                    mr: 0.5,
                  }}
                >
                  <ArrowBackIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                </IconButton>
              )}
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {title}
              </Typography>
            </Box>
            <IconButton
              onClick={onClose}
              size="small"
              sx={{
                width: 32,
                height: 32,
              }}
            >
              <Box
                component="span"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  color: 'text.secondary',
                }}
              >
                ×
              </Box>
            </IconButton>
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
            {variant === 'history' ? (
              <>
                {/* View All History Link */}
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="text"
                    sx={{
                      textTransform: 'none',
                      fontSize: '0.875rem',
                      color: 'primary.main',
                      fontWeight: 700,
                      p: 0,
                      minWidth: 'auto',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    View All History
                  </Button>
                </Box>

                {/* History Cards */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {[
                    { title: 'Q4 Campaign Analysis', date: 'Nov 15, 2024', preview: 'Analyzed campaign performance metrics...' },
                    { title: 'Product Launch Research', date: 'Nov 14, 2024', preview: 'Research findings for upcoming product...' },
                    { title: 'Weekly Usage Summary', date: 'Nov 13, 2024', preview: 'Generated summary of weekly activities...' },
                    { title: 'Automation Performance Review', date: 'Nov 12, 2024', preview: 'Reviewed automation workflows and...' },
                    { title: 'Customer Feedback Analysis', date: 'Nov 10, 2024', preview: 'Analyzed customer feedback trends...' },
                  ].map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        p: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'action.hover',
                          borderColor: 'primary.main',
                        },
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                        {item.date}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {item.preview}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </>
            ) : (
              <Stack spacing={3}>
              {/* Drill-in items for sidebar 1 */}
              {variant === 'sidebar1' && onDrillIn && (
                <>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Quick Actions
                    </Typography>
                    <List sx={{ p: 0 }}>
                      {['View Details', 'Manage Settings', 'View History', 'Configure Options'].map((item, index) => (
                        <ListItem
                          key={index}
                          onClick={() => onDrillIn(item)}
                          sx={{
                            px: 2,
                            py: 1.5,
                            mb: 1,
                            borderRadius: 1,
                            cursor: 'pointer',
                            backgroundColor: 'background.default',
                            border: '1px solid',
                            borderColor: 'divider',
                            '&:hover': {
                              backgroundColor: 'action.hover',
                              borderColor: 'primary.main',
                            },
                          }}
                        >
                          <ListItemText
                            primary={item}
                            primaryTypographyProps={{
                              variant: 'body2',
                              fontWeight: 500,
                            }}
                          />
                          <ChevronRightIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                  <Divider />
                </>
              )}

              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Section Title
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  This is some dummy sidebar content to demonstrate the panel pattern. You can put
                  any content you want here - forms, lists, cards, etc.
                </Typography>
              </Box>

              <Divider />

              {/* Avatar Placeholders */}
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  Team Members
                </Typography>
                <Stack spacing={2}>
                  {[1, 2, 3].map((item) => (
                    <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {/* Avatar Circle */}
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          backgroundColor: 'action.hover',
                          flexShrink: 0,
                        }}
                      />
                      {/* Text Placeholder */}
                      <Box sx={{ flex: 1 }}>
                        <Box
                          sx={{
                            height: 12,
                            width: '70%',
                            backgroundColor: 'action.hover',
                            borderRadius: 1,
                            mb: 1,
                          }}
                        />
                        <Box
                          sx={{
                            height: 10,
                            width: '50%',
                            backgroundColor: 'action.selected',
                            borderRadius: 1,
                          }}
                        />
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Box>

              <Divider />

              {/* Image Placeholders */}
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  Gallery
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  {[1, 2, 3, 4].map((item) => (
                    <Box
                      key={item}
                      sx={{
                        width: '100%',
                        height: 120,
                        backgroundColor: 'action.hover',
                        borderRadius: 1,
                      }}
                    />
                  ))}
                </Box>
              </Box>

              <Divider />

              {/* Mixed Content */}
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  Recent Activity
                </Typography>
                <Stack spacing={2}>
                  {[1, 2].map((item) => (
                    <Box key={item}>
                      {/* Rectangle Image */}
                      <Box
                        sx={{
                          width: '100%',
                          height: 160,
                          backgroundColor: 'action.hover',
                          borderRadius: 1,
                          mb: 1.5,
                        }}
                      />
                      {/* Text Lines */}
                      <Box
                        sx={{
                          height: 12,
                          width: '80%',
                          backgroundColor: 'action.hover',
                          borderRadius: 1,
                          mb: 1,
                        }}
                      />
                      <Box
                        sx={{
                          height: 10,
                          width: '60%',
                          backgroundColor: 'action.selected',
                          borderRadius: 1,
                        }}
                      />
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Stack>
            )}
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default DummySidebar

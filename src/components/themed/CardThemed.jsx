import { useState } from 'react'
import {
  Box,
  Stack,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Checkbox,
  Link,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import FeaturesSection from '../docs/FeaturesSection'
import MoreVertIcon from '@mui/icons-material/MoreVertRounded'
import HideImageIcon from '@mui/icons-material/HideImageOutlined'
import FolderIcon from '@mui/icons-material/FolderRounded'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined'

// Indicator component
const Indicator = styled(Box)(({ theme, color = 'default' }) => {
  const colorMap = {
    error: {
      border: theme.palette.error.main,
      background: '#FFEBEE',
      text: theme.palette.error.main,
    },
    default: {
      border: theme.palette.grey[400],
      background: theme.palette.grey[100],
      text: theme.palette.text.primary,
    },
  }

  const colors = colorMap[color] || colorMap.default

  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    borderRadius: '4px',
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.background,
    color: colors.text,
    fontWeight: 700,
    fontSize: '12px',
    lineHeight: '16px',
    whiteSpace: 'nowrap',
  }
})

function CardThemed() {
  const [hoveredCard, setHoveredCard] = useState(null)

  return (
    <div className="themed-showcase">
      {/* MEDIA CARDS HEADER */}
      <section className="variant-section">
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 600 }}>Media Cards</h3>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Cards with images for visual content, galleries, and media libraries.
        </Typography>
      </section>

      {/* Media Cards - States */}
      <div className="variant-section" style={{ marginTop: '2rem' }}>
        <h4>States</h4>
        <p>Interactive cards with images, hover overlays, and focus states.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {/* Default */}
            <Card
              sx={{
                width: 240,
                '&:hover': { cursor: 'pointer' },
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop"
                alt="Default state"
              />
              <CardContent sx={{ pb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Default
                  </Typography>
                  <IconButton size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>

            {/* Hover */}
            <Card
              sx={{
                width: 240,
                position: 'relative',
                '&:hover': { cursor: 'pointer' },
              }}
              onMouseEnter={() => setHoveredCard('hover')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardMedia
                component="img"
                height="180"
                image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop"
                alt="Hover state"
                sx={{
                  filter: hoveredCard === 'hover' ? 'brightness(0.6)' : 'none',
                  transition: 'filter 0.2s',
                }}
              />
              {hoveredCard === 'hover' && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1,
                  }}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      color: 'white',
                      borderColor: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    View "Item"
                  </Button>
                </Box>
              )}
              <CardContent sx={{ pb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Hover
                  </Typography>
                  <IconButton size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>

            {/* Focus */}
            <Card
              sx={{
                width: 240,
                border: '2px solid',
                borderColor: 'primary.main',
                '&:hover': { cursor: 'pointer' },
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop"
                alt="Focus state"
              />
              <CardContent sx={{ pb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Focus
                  </Typography>
                  <IconButton size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Stack>
      </div>

      {/* Media Cards - Multi-select */}
      <div className="variant-section" style={{ marginTop: '3rem' }}>
        <h4>Multi-select</h4>
        <p>Cards with checkbox selection for batch operations.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {/* Multi-select Default */}
            <Card
              sx={{
                width: 240,
                position: 'relative',
                '&:hover': { cursor: 'pointer' },
              }}
            >
              <Checkbox
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  zIndex: 1,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                  },
                }}
              />
              <CardMedia
                component="img"
                height="180"
                image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop"
                alt="Multi-select default"
              />
              <CardContent sx={{ pb: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Multi-select Default
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    With inactive checkbox
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  sx={{ position: 'absolute', bottom: 8, right: 8 }}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </CardContent>
            </Card>

            {/* Multi-select Hover */}
            <Card
              sx={{
                width: 240,
                position: 'relative',
                '&:hover': { cursor: 'pointer' },
              }}
              onMouseEnter={() => setHoveredCard('multiHover')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Checkbox
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  zIndex: 1,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                  },
                }}
              />
              <CardMedia
                component="img"
                height="180"
                image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop"
                alt="Multi-select hover"
                sx={{
                  filter: hoveredCard === 'multiHover' ? 'brightness(0.6)' : 'none',
                  transition: 'filter 0.2s',
                }}
              />
              {hoveredCard === 'multiHover' && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1,
                  }}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      color: 'white',
                      borderColor: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    View "Item"
                  </Button>
                </Box>
              )}
              <CardContent sx={{ pb: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Multi-select Hover
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    With inactive checkbox
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  sx={{ position: 'absolute', bottom: 8, right: 8 }}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </CardContent>
            </Card>

            {/* Multi-select Active */}
            <Card
              sx={{
                width: 240,
                position: 'relative',
                '&:hover': { cursor: 'pointer' },
              }}
            >
              <Checkbox
                checked
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  zIndex: 1,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                  },
                }}
              />
              <CardMedia
                component="img"
                height="180"
                image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop"
                alt="Multi-select active"
              />
              <CardContent sx={{ pb: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Multi-select Default
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    With active checkbox
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  sx={{ position: 'absolute', bottom: 8, right: 8 }}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </CardContent>
            </Card>
          </Box>
        </Stack>
      </div>

      {/* Media Cards - Image Options */}
      <div className="variant-section" style={{ marginTop: '3rem' }}>
        <h4>Image Options</h4>
        <p>Handle missing images with placeholder icons or custom representations.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {/* With image */}
            <Card sx={{ width: 240 }}>
              <CardMedia
                component="img"
                height="180"
                image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop"
                alt="With image"
              />
              <CardContent sx={{ pb: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    With image
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Swap image using Unsplash plugin
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  sx={{ position: 'absolute', bottom: 8, right: 8 }}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </CardContent>
            </Card>

            {/* Preview unavailable */}
            <Card sx={{ width: 240 }}>
              <Box
                sx={{
                  height: 180,
                  backgroundColor: 'grey.200',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                }}
              >
                <HideImageIcon sx={{ fontSize: 48, color: 'text.disabled' }} />
                <Typography variant="body2" color="text.secondary">
                  Preview unavailable
                </Typography>
              </Box>
              <CardContent sx={{ pb: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Preview unavailable
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    By default
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  sx={{ position: 'absolute', bottom: 8, right: 8 }}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </CardContent>
            </Card>

            {/* Swap icon */}
            <Card sx={{ width: 240 }}>
              <Box
                sx={{
                  height: 180,
                  backgroundColor: 'grey.200',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FolderIcon sx={{ fontSize: 64, color: 'text.disabled' }} />
              </Box>
              <CardContent sx={{ pb: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Swap icon
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    For a specific representation
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  sx={{ position: 'absolute', bottom: 8, right: 8 }}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </CardContent>
            </Card>
          </Box>
        </Stack>
      </div>

      {/* Media Cards - Content */}
      <div className="variant-section" style={{ marginTop: '3rem' }}>
        <h4>Content Variations</h4>
        <p>Minimal and detailed content layouts with metadata.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {/* Most minimal */}
            <Card sx={{ width: 240 }}>
              <CardMedia
                component="img"
                height="180"
                image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop"
                alt="Minimal card"
              />
              <CardContent>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Most minimal Media Card
                </Typography>
              </CardContent>
            </Card>

            {/* With all the bells and whistles */}
            <Card sx={{ width: 240 }}>
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="180"
                  image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop"
                  alt="Full featured card"
                />
                <Indicator
                  color="error"
                  sx={{
                    position: 'absolute',
                    top: 8,
                    left: 8,
                  }}
                >
                  Draft
                </Indicator>
              </Box>
              <CardContent sx={{ pb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                  <EmojiEmotionsOutlinedIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Media Card
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      With all the bells and whistles
                    </Typography>
                    <Link
                      href="#"
                      variant="caption"
                      sx={{ display: 'block', mt: 0.5 }}
                      onClick={(e) => e.preventDefault()}
                    >
                      Link
                    </Link>
                  </Box>
                  <IconButton size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Stack>
      </div>

      {/* PROMO CARDS HEADER */}
      <section className="variant-section" style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '2px solid #e0e0e0' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 600 }}>Promo Cards</h3>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Action-oriented cards for features, promotions, and calls-to-action.
        </Typography>
      </section>

      {/* Promo Cards - Two Column Layout */}
      <div className="variant-section" style={{ marginTop: '2rem' }}>
        <h4>Two Column Layout</h4>
        <p>Cards with content on the left (2/3) and image area on the right (1/3).</p>
        <Stack spacing={4}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {/* Two column default */}
            <Card
              sx={{
                width: 400,
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: 'none',
                '&:hover': { borderColor: 'primary.main' },
              }}
            >
              <Box sx={{ display: 'flex' }}>
                <CardContent sx={{ flex: 2, p: 2.5, '&:last-child': { pb: 2.5 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        backgroundColor: 'primary.light',
                        opacity: 0.7,
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'primary.dark',
                      }}
                    >
                      <EmojiEmotionsOutlinedIcon sx={{ fontSize: 20 }} />
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        Dashboard Overview
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Analytics · 2 hours ago
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                    Get a comprehensive view of your key metrics and performance indicators.
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1.5 }}>
                    <Button variant="outlined" size="small" sx={{ fontWeight: 700, textTransform: 'none' }}>
                      Button
                    </Button>
                    <Button variant="outlined" size="small" sx={{ fontWeight: 700, textTransform: 'none' }}>
                      Button
                    </Button>
                  </Box>
                </CardContent>
                <Box
                  sx={{
                    flex: 1,
                    backgroundColor: 'grey.300',
                    borderTopRightRadius: 4,
                    borderBottomRightRadius: 4,
                    minHeight: 160,
                  }}
                />
              </Box>
            </Card>

            {/* Two column hover state */}
            <Card
              sx={{
                width: 400,
                border: '2px solid',
                borderColor: 'primary.main',
                boxShadow: 'none',
              }}
            >
              <Box sx={{ display: 'flex' }}>
                <CardContent sx={{ flex: 2, p: 2.5, '&:last-child': { pb: 2.5 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        backgroundColor: 'primary.light',
                        opacity: 0.7,
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'primary.dark',
                      }}
                    >
                      <EmojiEmotionsOutlinedIcon sx={{ fontSize: 20 }} />
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        Campaign Performance
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Marketing · 4 hours ago
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                    Track and analyze the effectiveness of your marketing campaigns.
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1.5 }}>
                    <Button variant="outlined" size="small" sx={{ fontWeight: 700, textTransform: 'none' }}>
                      Button
                    </Button>
                    <Button variant="outlined" size="small" sx={{ fontWeight: 700, textTransform: 'none' }}>
                      Button
                    </Button>
                  </Box>
                </CardContent>
                <Box
                  sx={{
                    flex: 1,
                    backgroundColor: 'grey.300',
                    borderTopRightRadius: 4,
                    borderBottomRightRadius: 4,
                    minHeight: 160,
                  }}
                />
              </Box>
            </Card>
          </Box>
        </Stack>
      </div>

      {/* Promo Cards - Compact Style */}
      <div className="variant-section" style={{ marginTop: '3rem' }}>
        <h4>Compact Style</h4>
        <p>Minimal cards with avatar, title, and subtitle for quick navigation.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {/* Compact default */}
            <Card
              sx={{
                width: 280,
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: 'none',
                '&:hover': { borderColor: 'primary.main' },
              }}
            >
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 }, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: 'primary.light',
                    opacity: 0.7,
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'primary.dark',
                  }}
                >
                  <FolderIcon sx={{ fontSize: 20 }} />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    Q4 Analysis
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Analytics · 2 hours ago
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Compact hover */}
            <Card
              sx={{
                width: 280,
                border: '2px solid',
                borderColor: 'primary.main',
                boxShadow: 'none',
              }}
            >
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 }, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: 'primary.light',
                    opacity: 0.7,
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'primary.dark',
                  }}
                >
                  <FolderIcon sx={{ fontSize: 20 }} />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    Campaign Report
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Marketing · 4 hours ago
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Compact with more icon */}
            <Card
              sx={{
                width: 280,
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: 'none',
                '&:hover': { borderColor: 'primary.main' },
              }}
            >
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 }, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: 'primary.light',
                    opacity: 0.7,
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'primary.dark',
                  }}
                >
                  <FolderIcon sx={{ fontSize: 20 }} />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    User Research
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Research · Yesterday
                  </Typography>
                </Box>
                <IconButton size="small">
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </CardContent>
            </Card>
          </Box>
        </Stack>
      </div>

      {/* Promo Cards - Legacy States */}
      <div className="variant-section" style={{ marginTop: '3rem' }}>
        <h4>Legacy States</h4>
        <p>Original promo card designs with action buttons and overflow menus.</p>
        <Stack spacing={4}>
          {/* Regular size cards */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: 'text.secondary' }}>
              Regular Size
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {/* Regular default */}
              <Card sx={{ width: 280, p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 1,
                      border: '2px dashed',
                      borderColor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <EmojiEmotionsOutlinedIcon sx={{ color: 'primary.main' }} />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Regular default
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      The card title should truncate if it exceeds more than two lines. Limit this description to a maximum of 4 lines and without the use of truncation. When grouped, align the height to the tallest card.
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button size="small" variant="contained">
                    Primary
                  </Button>
                  <Button size="small">Secondary</Button>
                </Box>
              </Card>

              {/* Regular hover */}
              <Card
                sx={{
                  width: 280,
                  p: 2,
                  border: '2px solid',
                  borderColor: 'primary.main',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 1,
                      border: '2px dashed',
                      borderColor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <EmojiEmotionsOutlinedIcon sx={{ color: 'primary.main' }} />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Regular hover
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Whole card will have a hover state with the main click will be the Primary button.
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button size="small" variant="contained">
                    Primary
                  </Button>
                  <Button size="small">Secondary</Button>
                  <IconButton size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Card>
            </Box>
          </Box>
        </Stack>
      </div>

      {/* Promo Cards - Button Options */}
      <div className="variant-section" style={{ marginTop: '3rem' }}>
        <h4>Button Options</h4>
        <p>Different button configurations for various interaction patterns.</p>
        <Stack spacing={4}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: 'text.secondary' }}>
              Regular Size Options
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {/* Navigation card (no buttons) */}
            <Card sx={{ width: 280, p: 2, '&:hover': { cursor: 'pointer' } }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 1,
                    border: '2px dashed',
                    borderColor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <EmojiEmotionsOutlinedIcon sx={{ color: 'primary.main' }} />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Navigation card w/ no buttons, main click only
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    The card title should truncate if it exceeds more than two lines. Limit this description to a maximum of 4 lines and without the use of truncation. When grouped, align the height to the tallest card.
                  </Typography>
                </Box>
              </Box>
            </Card>

            {/* Only primary button */}
            <Card sx={{ width: 280, p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 1,
                    border: '2px dashed',
                    borderColor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <EmojiEmotionsOutlinedIcon sx={{ color: 'primary.main' }} />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Only primary button for CTA
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    The card title should truncate if it exceeds more than two lines. Limit this description to a maximum of 4 lines and without the use of truncation. When grouped, align the height to the tallest card.
                  </Typography>
                </Box>
              </Box>
              <Button size="small" variant="contained">
                Primary
              </Button>
            </Card>

            {/* Other buttons - secondary and overflow */}
            <Card sx={{ width: 280, p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 1,
                    border: '2px dashed',
                    borderColor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <EmojiEmotionsOutlinedIcon sx={{ color: 'primary.main' }} />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Other buttons - secondary and overflow
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    The card title should truncate if it exceeds more than two lines. Limit this description to a maximum of 4 lines and without the use of truncation. When grouped, align the height to the tallest card.
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button size="small" variant="contained">
                  Primary
                </Button>
                <Button size="small">Secondary</Button>
                <IconButton size="small">
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </Box>
            </Card>
          </Box>

          </Box>

          {/* Compact button options */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: 'text.secondary' }}>
              Compact Size Options
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {/* Compact, main click only */}
            <Card sx={{ width: 280, p: 1.5, '&:hover': { cursor: 'pointer' } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 1,
                    border: '2px dashed',
                    borderColor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <EmojiEmotionsOutlinedIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Compact, main click only
                  </Typography>
                </Box>
              </Box>
            </Card>

            {/* Compact with only overflow button */}
            <Card sx={{ width: 280, p: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: 1,
                      border: '2px dashed',
                      borderColor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <EmojiEmotionsOutlinedIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Compact with only overflow button
                    </Typography>
                  </Box>
                </Box>
                <IconButton size="small">
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </Box>
            </Card>
          </Box>
          </Box>
        </Stack>
      </div>

      {/* BASIC CARDS HEADER */}
      <section className="variant-section" style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '2px solid #e0e0e0' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 600 }}>Basic Cards</h3>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Simple content containers with flexible layouts and customizable headers.
        </Typography>
      </section>

      {/* Basic Cards - Title Options */}
      <div className="variant-section" style={{ marginTop: '2rem' }}>
        <h4>Title Options</h4>
        <p>Section headers with titles, descriptions, infotips, and action buttons.</p>
        <Stack spacing={4}>
          {/* Section Title Examples */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: 'text.secondary' }}>
              Section Titles
            </Typography>
            <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 2 }}>
              {/* Section title only */}
              <Box
                sx={{
                  width: 280,
                  p: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  backgroundColor: 'background.paper',
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Section title only
                </Typography>
              </Box>

              {/* Section title with description and infotip */}
              <Box
                sx={{
                  width: 280,
                  p: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  backgroundColor: 'background.paper',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Section title
                  </Typography>
                  <InfoOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  With a description and infotip
                </Typography>
              </Box>

              {/* Section title with description and action button */}
              <Box
                sx={{
                  width: 280,
                  p: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  backgroundColor: 'background.paper',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 0.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Section title
                    </Typography>
                    <InfoOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  </Box>
                  <Button size="small" variant="outlined">
                    Action button
                  </Button>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Description
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* Subsection Title Examples */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: 'text.secondary' }}>
              Subsection Titles
            </Typography>
            <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 2 }}>
              {/* Subsection title only */}
              <Box
                sx={{
                  width: 280,
                  p: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  backgroundColor: 'background.paper',
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  SUBSECTION TITLE ONLY
                </Typography>
              </Box>

              {/* Subsection title with description and infotip */}
              <Box
                sx={{
                  width: 280,
                  p: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  backgroundColor: 'background.paper',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    SUBSECTION TITLE
                  </Typography>
                  <InfoOutlinedIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  With a description and infotip
                </Typography>
              </Box>

              {/* Subsection title with description and action button */}
              <Box
                sx={{
                  width: 280,
                  p: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  backgroundColor: 'background.paper',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 0.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      SUBSECTION TITLE
                    </Typography>
                    <InfoOutlinedIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                  </Box>
                  <Button size="small" variant="text" sx={{ textTransform: 'none' }}>
                    Action button
                  </Button>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Description
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </div>

      {/* Basic Cards - Card with Slot */}
      <div className="variant-section" style={{ marginTop: '3rem' }}>
        <h4>Card with Slot</h4>
        <p>Simple cards with title and content slot area.</p>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Card sx={{ width: 400 }}>
              <CardContent>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>
                  Title
                </Typography>
                <Box
                  sx={{
                    height: 240,
                    backgroundColor: 'rgba(0, 150, 136, 0.08)',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="body2" sx={{ color: 'primary.main' }}>
                    Slot
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ width: 400 }}>
              <Box
                sx={{
                  height: 300,
                  backgroundColor: 'rgba(0, 150, 136, 0.08)',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="body2" sx={{ color: 'primary.main' }}>
                  Slot
                </Typography>
              </Box>
            </Card>
          </Box>
        </Stack>
      </div>

      <FeaturesSection
        features={[
          { feature: "Card Types & Sizes", description: "Media (with images, 180px height), Promo (with actions), Basic (content slots). Sizes: Regular (48px icon, 16px padding), Compact (32px icon, 12px padding)" },
          { feature: "Interactive States", description: "Default, Hover (2px border), Focus, Multi-select (with checkbox). Elevation 1 (increases on hover), 4px border radius" },
          { feature: "Content Options", description: "Media: hover overlay, checkbox selection, image placeholders. Promo: icon/avatar, title (2-line truncate), description (4-line max), buttons" },
          { feature: "Common Use Cases", description: "Product grids, feature showcases, navigation tiles, content collections, dashboards. Keyboard navigation, ARIA labels, focus states" },
        ]}
      />
    </div>
  )
}

export default CardThemed

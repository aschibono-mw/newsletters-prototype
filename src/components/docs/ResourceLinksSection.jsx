import { Box, Typography, Paper, Link, Chip } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import LinkOffIcon from '@mui/icons-material/LinkOff'
import { Link as RouterLink } from 'react-router-dom'

/**
 * ResourceLinksSection - Displays external resources and cross-links for documentation pages
 *
 * Supports three types of links:
 * 1. External (Figma, Storybook, MUI docs) - opens in new tab
 * 2. Internal (related pages within the app) - uses react-router
 * 3. Placeholder (not yet added) - shows "Add link" indicator
 *
 * @param {Object} props
 * @param {string} props.title - Section title (default: "Resources")
 * @param {Array} props.links - Array of link objects
 * @param {string} props.links[].label - Display text
 * @param {string} props.links[].url - URL (use null for placeholder)
 * @param {string} props.links[].type - "figma" | "storybook" | "mui" | "internal" | "external"
 * @param {string} props.links[].description - Optional description
 */
function ResourceLinksSection({ title = 'Resources', links = [] }) {
  if (links.length === 0) return null

  const getTypeStyles = (type) => {
    const styles = {
      figma: { label: 'Figma', color: 'secondary' },
      storybook: { label: 'Storybook', color: 'warning' },
      mui: { label: 'MUI', color: 'info' },
      internal: { label: null, color: null },
      external: { label: null, color: null },
    }
    return styles[type] || styles.external
  }

  const isPlaceholder = (url) => !url || url === '#' || url === ''

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        {title}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {links.map((link, index) => {
          const typeStyle = getTypeStyles(link.type)
          const placeholder = isPlaceholder(link.url)
          const isInternal = link.type === 'internal'

          return (
            <Paper
              key={index}
              variant="outlined"
              sx={{
                p: 2,
                borderRadius: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: placeholder ? 'grey.50' : 'transparent',
                borderStyle: placeholder ? 'dashed' : 'solid',
                borderColor: placeholder ? 'grey.300' : 'divider',
                opacity: placeholder ? 0.7 : 1,
                transition: 'all 0.2s',
                ...(!placeholder && {
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'action.hover',
                  },
                }),
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
                {typeStyle.label && (
                  <Chip
                    label={typeStyle.label}
                    size="small"
                    color={typeStyle.color}
                    variant={placeholder ? 'outlined' : 'filled'}
                    sx={{ minWidth: 72 }}
                  />
                )}

                <Box>
                  {placeholder ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LinkOffIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                      <Typography variant="body2" color="text.disabled">
                        {link.label}
                      </Typography>
                      <Typography variant="caption" color="text.disabled" sx={{ fontStyle: 'italic' }}>
                        (link pending)
                      </Typography>
                    </Box>
                  ) : isInternal ? (
                    <Link
                      component={RouterLink}
                      to={link.url}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        color: 'primary.main',
                        textDecoration: 'none',
                        fontWeight: 500,
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      {link.label}
                      <ArrowForwardIcon sx={{ fontSize: 16 }} />
                    </Link>
                  ) : (
                    <Link
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        color: 'primary.main',
                        textDecoration: 'none',
                        fontWeight: 500,
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      {link.label}
                      <OpenInNewIcon sx={{ fontSize: 14 }} />
                    </Link>
                  )}

                  {link.description && !placeholder && (
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
                      {link.description}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Paper>
          )
        })}
      </Box>
    </Box>
  )
}

export default ResourceLinksSection

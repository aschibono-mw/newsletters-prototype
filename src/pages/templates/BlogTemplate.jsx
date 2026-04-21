import { Box, Container, Typography, Button, Grid, Card, CardContent, CardMedia, Avatar, Chip, Divider, TextField, InputAdornment, List, ListItem, ListItemText, IconButton, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import Indicator from '../../components/core/Indicator'
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded'
import SearchIcon from '@mui/icons-material/SearchRounded'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorderRounded'
import ShareIcon from '@mui/icons-material/ShareRounded'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import FacebookIcon from '@mui/icons-material/Facebook'
import AccessTimeIcon from '@mui/icons-material/AccessTimeRounded'

const featuredPost = {
  title: 'The Future of Design Systems: Building for Scale',
  excerpt: 'An in-depth exploration of how modern design systems are evolving to meet the needs of large-scale applications and distributed teams.',
  author: 'Sarah Chen',
  avatar: 'S',
  date: 'Nov 20, 2024',
  readTime: '12 min read',
  category: 'Design',
  image: 'featured',
}

const posts = [
  { id: 1, title: 'Getting Started with Component Libraries', excerpt: 'A practical guide to building reusable UI components.', author: 'Mike Johnson', avatar: 'M', date: 'Nov 18, 2024', readTime: '8 min read', category: 'Tutorial' },
  { id: 2, title: 'Accessibility Best Practices', excerpt: 'How to ensure your applications are accessible to everyone.', author: 'Emily Davis', avatar: 'E', date: 'Nov 15, 2024', readTime: '6 min read', category: 'Accessibility' },
  { id: 3, title: 'The Art of Color Theory in UI', excerpt: 'Understanding color psychology and its impact on user experience.', author: 'Alex Kim', avatar: 'A', date: 'Nov 12, 2024', readTime: '10 min read', category: 'Design' },
  { id: 4, title: 'Performance Optimization Techniques', excerpt: 'Speed up your React applications with these proven strategies.', author: 'Chris Brown', avatar: 'C', date: 'Nov 10, 2024', readTime: '15 min read', category: 'Development' },
  { id: 5, title: 'Typography in Digital Products', excerpt: 'Choosing and pairing fonts for maximum readability and impact.', author: 'Lisa Wang', avatar: 'L', date: 'Nov 8, 2024', readTime: '7 min read', category: 'Design' },
  { id: 6, title: 'Building a Design Token System', excerpt: 'Create a consistent design language across your applications.', author: 'David Lee', avatar: 'D', date: 'Nov 5, 2024', readTime: '11 min read', category: 'Tutorial' },
]

const categories = ['All', 'Design', 'Development', 'Tutorial', 'Accessibility', 'News']

const popularPosts = [
  { title: 'Introduction to React Hooks', views: '15.2K' },
  { title: 'CSS Grid vs Flexbox', views: '12.8K' },
  { title: 'State Management Patterns', views: '10.5K' },
  { title: 'Testing React Components', views: '8.9K' },
]

function BlogTemplate() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      {/* Header */}
      <Box sx={{ backgroundColor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', py: 2 }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Button component={RouterLink} to="/templates" startIcon={<ArrowBackIcon />} sx={{ textTransform: 'none' }}>
              Back to Templates
            </Button>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>TechBlog</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton><SearchIcon /></IconButton>
              <Button variant="contained" sx={{ textTransform: 'none' }}>Subscribe</Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Category Tabs */}
      <Box sx={{ backgroundColor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', gap: 1, py: 2, overflowX: 'auto' }}>
            {categories.map((cat, i) => (
              <Chip
                key={cat}
                label={cat}
                variant="outlined"
                onClick={() => {}}
                sx={{
                  cursor: 'pointer',
                  bgcolor: i === 0 ? 'grey.200' : 'transparent',
                  fontWeight: i === 0 ? 600 : 400,
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Featured Post */}
        <Card sx={{ mb: 6, overflow: 'hidden' }}>
          <Grid container>
            <Grid size={{ xs: 12, md: 7 }}>
              <CardMedia sx={{ height: { xs: 200, md: 400 }, backgroundColor: 'grey.200', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography color="text.secondary">[Featured Image]</Typography>
              </CardMedia>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ alignSelf: 'flex-start', mb: 2 }}><Indicator label={featuredPost.category} size="small" color="cyan" /></Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                  {featuredPost.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  {featuredPost.excerpt}
                </Typography>
                <Box sx={{ mt: 'auto' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ backgroundColor: 'primary.main' }}>{featuredPost.avatar}</Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{featuredPost.author}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="caption" color="text.secondary">{featuredPost.date}</Typography>
                        <Typography variant="caption" color="text.secondary"></Typography>
                        <Typography variant="caption" color="text.secondary">{featuredPost.readTime}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Grid>
          </Grid>
        </Card>

        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>Latest Articles</Typography>
            <Grid container spacing={3}>
              {posts.map((post) => (
                <Grid size={{ xs: 12, sm: 6 }} key={post.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 4 } }}>
                    <CardMedia sx={{ height: 160, backgroundColor: 'grey.200', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography color="text.secondary">[Image]</Typography>
                    </CardMedia>
                    <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Chip label={post.category} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.7rem' }} />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                          <AccessTimeIcon sx={{ fontSize: 14 }} />
                          <Typography variant="caption">{post.readTime}</Typography>
                        </Box>
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, fontSize: '1rem' }}>
                        {post.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1 }}>
                        {post.excerpt}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ width: 28, height: 28, fontSize: '0.75rem', backgroundColor: 'primary.light' }}>{post.avatar}</Avatar>
                          <Box>
                            <Typography variant="caption" sx={{ fontWeight: 600, display: 'block' }}>{post.author}</Typography>
                            <Typography variant="caption" color="text.secondary">{post.date}</Typography>
                          </Box>
                        </Box>
                        <Box>
                          <IconButton size="small"><BookmarkBorderIcon fontSize="small" /></IconButton>
                          <IconButton size="small"><ShareIcon fontSize="small" /></IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button variant="outlined" sx={{ textTransform: 'none' }}>Load More Articles</Button>
            </Box>
          </Grid>

          {/* Sidebar */}
          <Grid size={{ xs: 12, md: 4 }}>
            {/* Search */}
            <Card sx={{ p: 3, mb: 3 }}>
              <TextField
                placeholder="Search articles..."
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 20 }} /></InputAdornment>,
                }}
              />
            </Card>

            {/* Newsletter */}
            <Card sx={{ p: 3, mb: 3, backgroundColor: 'primary.main', color: 'white' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>Subscribe to Newsletter</Typography>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                Get the latest articles delivered to your inbox.
              </Typography>
              <TextField
                placeholder="Your email"
                fullWidth
                size="small"
                sx={{
                  backgroundColor: 'white',
                  borderRadius: 1,
                  mb: 2,
                  '& .MuiOutlinedInput-root': { '& fieldset': { border: 'none' } },
                }}
              />
              <Button variant="contained" fullWidth sx={{ textTransform: 'none' }}>
                Subscribe
              </Button>
            </Card>

            {/* Popular Posts */}
            <Card sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Popular Posts</Typography>
              <List disablePadding>
                {popularPosts.map((post, i) => (
                  <ListItem key={i} disablePadding sx={{ mb: 2 }}>
                    <ListItemText
                      primary={post.title}
                      secondary={`${post.views} views`}
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 500, sx: { cursor: 'pointer', '&:hover': { color: 'primary.main' } } }}
                    />
                  </ListItem>
                ))}
              </List>
            </Card>

            {/* Categories */}
            <Card sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Categories</Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {categories.slice(1).map((cat) => (
                  <Chip key={cat} label={cat} variant="outlined" size="small" onClick={() => {}} sx={{ cursor: 'pointer' }} />
                ))}
              </Box>
            </Card>

            {/* Social */}
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Follow Us</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton sx={{ backgroundColor: 'grey.100' }}><TwitterIcon /></IconButton>
                <IconButton sx={{ backgroundColor: 'grey.100' }}><LinkedInIcon /></IconButton>
                <IconButton sx={{ backgroundColor: 'grey.100' }}><FacebookIcon /></IconButton>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ backgroundColor: 'background.paper', borderTop: '1px solid', borderColor: 'divider', py: 6, mt: 6 }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>TechBlog</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                Sharing knowledge and insights about design, development, and technology.
              </Typography>
            </Grid>
            <Grid size={{ xs: 6, md: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>Navigation</Typography>
              {['Home', 'Articles', 'About', 'Contact'].map((link) => (
                <Typography key={link} variant="body2" sx={{ color: 'text.secondary', mb: 1, cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                  {link}
                </Typography>
              ))}
            </Grid>
            <Grid size={{ xs: 6, md: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>Categories</Typography>
              {categories.slice(1, 5).map((cat) => (
                <Typography key={cat} variant="body2" sx={{ color: 'text.secondary', mb: 1, cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                  {cat}
                </Typography>
              ))}
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>Stay Updated</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  placeholder="Your email"
                  size="small"
                  sx={{ flex: 1 }}
                />
                <Button variant="contained" sx={{ textTransform: 'none' }}>Subscribe</Button>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4 }} />
          <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
            2024 TechBlog. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}

export default BlogTemplate

import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  IconButton,
  Tabs,
  Tab,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Breadcrumbs,
  Link,
  Collapse,
  Switch,
  FormControlLabel,
} from '@mui/material'
import Indicator from '../../components/core/Indicator'
import SearchIcon from '@mui/icons-material/SearchRounded'
import ArticleIcon from '@mui/icons-material/ArticleRounded'
import FolderIcon from '@mui/icons-material/FolderRounded'
import AddIcon from '@mui/icons-material/AddRounded'
import EditIcon from '@mui/icons-material/EditRounded'
import DeleteIcon from '@mui/icons-material/DeleteRounded'
import VisibilityIcon from '@mui/icons-material/VisibilityRounded'
import ThumbUpIcon from '@mui/icons-material/ThumbUpRounded'
import ThumbDownIcon from '@mui/icons-material/ThumbDownRounded'
import ExpandMoreIcon from '@mui/icons-material/ExpandMoreRounded'
import ExpandLessIcon from '@mui/icons-material/ExpandLessRounded'
import HistoryIcon from '@mui/icons-material/HistoryRounded'
import PublishIcon from '@mui/icons-material/PublishRounded'
import DraftsIcon from '@mui/icons-material/DraftsRounded'
import PlayArrowIcon from '@mui/icons-material/PlayArrowRounded'
import ImageIcon from '@mui/icons-material/ImageRounded'
import CodeIcon from '@mui/icons-material/CodeRounded'
import FormatBoldIcon from '@mui/icons-material/FormatBoldRounded'
import FormatItalicIcon from '@mui/icons-material/FormatItalicRounded'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulletedRounded'
import LinkIcon from '@mui/icons-material/LinkRounded'
import HomeIcon from '@mui/icons-material/HomeRounded'

const categories = [
  {
    id: 1,
    name: 'Getting Started',
    icon: <PlayArrowIcon />,
    articles: [
      { id: 1, title: 'Quick Start Guide', views: 12450, helpful: 95, status: 'published', updated: '2024-11-15' },
      { id: 2, title: 'Creating Your First Project', views: 8920, helpful: 92, status: 'published', updated: '2024-11-10' },
      { id: 3, title: 'Understanding the Dashboard', views: 6540, helpful: 88, status: 'published', updated: '2024-11-01' },
    ],
  },
  {
    id: 2,
    name: 'Account & Billing',
    icon: <ArticleIcon />,
    articles: [
      { id: 4, title: 'Managing Your Subscription', views: 5670, helpful: 90, status: 'published', updated: '2024-11-12' },
      { id: 5, title: 'Payment Methods', views: 4320, helpful: 85, status: 'published', updated: '2024-10-28' },
      { id: 6, title: 'Upgrading Your Plan', views: 3890, helpful: 91, status: 'draft', updated: '2024-11-18' },
    ],
  },
  {
    id: 3,
    name: 'Features & Functionality',
    icon: <FolderIcon />,
    articles: [
      { id: 7, title: 'Advanced Search Features', views: 7890, helpful: 87, status: 'published', updated: '2024-11-05' },
      { id: 8, title: 'Custom Integrations', views: 6540, helpful: 82, status: 'published', updated: '2024-10-30' },
      { id: 9, title: 'Automation Rules', views: 5430, helpful: 89, status: 'published', updated: '2024-11-08' },
      { id: 10, title: 'API Documentation', views: 9870, helpful: 94, status: 'published', updated: '2024-11-20' },
    ],
  },
  {
    id: 4,
    name: 'Troubleshooting',
    icon: <FolderIcon />,
    articles: [
      { id: 11, title: 'Common Error Messages', views: 11230, helpful: 78, status: 'published', updated: '2024-11-14' },
      { id: 12, title: 'Performance Issues', views: 4560, helpful: 75, status: 'published', updated: '2024-10-25' },
      { id: 13, title: 'Connection Problems', views: 3210, helpful: 80, status: 'draft', updated: '2024-11-19' },
    ],
  },
]

const recentSearches = ['how to export data', 'reset password', 'api rate limits', 'billing cycle']
const popularArticles = [
  { id: 1, title: 'Quick Start Guide', views: 12450 },
  { id: 11, title: 'Common Error Messages', views: 11230 },
  { id: 10, title: 'API Documentation', views: 9870 },
]

export default function KnowledgeBaseTemplate() {
  const [activeTab, setActiveTab] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedCategories, setExpandedCategories] = useState([1, 2, 3, 4])
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [articleDialogOpen, setArticleDialogOpen] = useState(false)
  const [editorDialogOpen, setEditorDialogOpen] = useState(false)
  const [editingArticle, setEditingArticle] = useState(null)

  const toggleCategory = (id) => {
    setExpandedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }

  const allArticles = categories.flatMap(c => c.articles.map(a => ({ ...a, category: c.name })))

  const filteredArticles = searchQuery
    ? allArticles.filter(a =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  const openArticle = (article, category) => {
    setSelectedArticle({ ...article, category })
    setArticleDialogOpen(true)
  }

  const openEditor = (article = null) => {
    setEditingArticle(article)
    setEditorDialogOpen(true)
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* Header */}
      <Paper elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="xl" sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box>
              <Typography variant="h5" fontWeight={600}>Knowledge Base</Typography>
              <Typography variant="body2" color="text.secondary">
                {allArticles.length} articles across {categories.length} categories
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={() => openEditor()}>
                New Article
              </Button>
            </Box>
          </Box>

          {/* Search */}
          <TextField
            fullWidth
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ maxWidth: 600 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* Search Results */}
          {searchQuery && (
            <Paper sx={{ mt: 1, maxWidth: 600 }}>
              <List dense>
                {filteredArticles.length > 0 ? (
                  filteredArticles.slice(0, 5).map(article => (
                    <ListItemButton
                      key={article.id}
                      onClick={() => {
                        openArticle(article, article.category)
                        setSearchQuery('')
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <ArticleIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={article.title}
                        secondary={article.category}
                      />
                    </ListItemButton>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="No articles found" secondary="Try different keywords" />
                  </ListItem>
                )}
              </List>
            </Paper>
          )}
        </Container>
      </Paper>

      {/* Tabs */}
      <Container maxWidth="xl" sx={{ pt: 2 }}>
        <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} sx={{ '& .MuiTab-root': { textTransform: 'none' } }}>
          <Tab label="Browse" />
          <Tab label="Manage Articles" />
          <Tab label="Analytics" />
        </Tabs>
      </Container>

      {/* Content */}
      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* Browse Tab */}
        {activeTab === 0 && (
          <Grid container spacing={3}>
            {/* Categories */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>Categories</Typography>
              {categories.map(category => (
                <Paper key={category.id} sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                    onClick={() => toggleCategory(category.id)}
                  >
                    <Box sx={{ color: 'primary.main', mr: 2 }}>{category.icon}</Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" fontWeight={600}>{category.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {category.articles.length} articles
                      </Typography>
                    </Box>
                    <IconButton size="small">
                      {expandedCategories.includes(category.id) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </Box>
                  <Collapse in={expandedCategories.includes(category.id)}>
                    <Divider />
                    <List disablePadding>
                      {category.articles.map((article, index) => (
                        <Box key={article.id}>
                          <ListItemButton
                            onClick={() => openArticle(article, category.name)}
                            sx={{ pl: 6 }}
                          >
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <ArticleIcon fontSize="small" color="action" />
                            </ListItemIcon>
                            <ListItemText
                              primary={article.title}
                              secondary={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
                                  <Typography variant="caption" color="text.secondary">
                                    {article.views.toLocaleString()} views
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {article.helpful}% helpful
                                  </Typography>
                                </Box>
                              }
                              secondaryTypographyProps={{ component: 'div' }}
                            />
                            <Indicator
                              label={article.status}
                              status={article.status === 'published' ? 'success' : 'warning'}
                              size="small"
                            />
                          </ListItemButton>
                          {index < category.articles.length - 1 && <Divider sx={{ ml: 6 }} />}
                        </Box>
                      ))}
                    </List>
                  </Collapse>
                </Paper>
              ))}
            </Grid>

            {/* Sidebar */}
            <Grid size={{ xs: 12, md: 4 }}>
              {/* Popular Articles */}
              <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="subtitle2" fontWeight={600} gutterBottom>Popular Articles</Typography>
                <List dense disablePadding>
                  {popularArticles.map((article, i) => (
                    <ListItemButton key={article.id} sx={{ px: 1, borderRadius: 1 }}>
                      <Typography variant="body2" sx={{ mr: 1, fontWeight: 600, color: 'text.secondary' }}>
                        {i + 1}.
                      </Typography>
                      <ListItemText primary={article.title} primaryTypographyProps={{ variant: 'body2' }} />
                    </ListItemButton>
                  ))}
                </List>
              </Paper>

              {/* Recent Searches */}
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle2" fontWeight={600} gutterBottom>Recent Searches</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {recentSearches.map(search => (
                    <Indicator
                      key={search}
                      label={search}
                      size="small"
                      color="gray"
                    />
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* Manage Articles Tab */}
        {activeTab === 1 && (
          <Paper>
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, borderBottom: 1, borderColor: 'divider' }}>
              <TextField
                placeholder="Search articles..."
                size="small"
                sx={{ width: 300 }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>,
                }}
              />
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Status</InputLabel>
                <Select label="Status" defaultValue="all">
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="published">Published</MenuItem>
                  <MenuItem value="draft">Draft</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Category</InputLabel>
                <Select label="Category" defaultValue="all">
                  <MenuItem value="all">All Categories</MenuItem>
                  {categories.map(c => (
                    <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <List disablePadding>
              {allArticles.map((article, index) => (
                <Box key={article.id}>
                  <ListItem
                    secondaryAction={
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" onClick={() => openEditor(article)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemIcon>
                      <ArticleIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography fontWeight={500}>{article.title}</Typography>
                          <Indicator
                            label={article.status}
                            status={article.status === 'published' ? 'success' : 'warning'}
                            size="small"
                          />
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
                          <Typography variant="caption" color="text.secondary">{article.category}</Typography>
                          <Typography variant="caption" color="text.secondary">•</Typography>
                          <Typography variant="caption" color="text.secondary">{article.views.toLocaleString()} views</Typography>
                          <Typography variant="caption" color="text.secondary">•</Typography>
                          <Typography variant="caption" color="text.secondary">Updated {article.updated}</Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < allArticles.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </Paper>
        )}

        {/* Analytics Tab */}
        {activeTab === 2 && (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary" gutterBottom>Total Views</Typography>
                  <Typography variant="h4" fontWeight={700}>
                    {allArticles.reduce((sum, a) => sum + a.views, 0).toLocaleString()}
                  </Typography>
                  <Typography variant="caption" color="success.main">+18% this month</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary" gutterBottom>Avg. Helpfulness</Typography>
                  <Typography variant="h4" fontWeight={700}>
                    {(allArticles.reduce((sum, a) => sum + a.helpful, 0) / allArticles.length).toFixed(0)}%
                  </Typography>
                  <Typography variant="caption" color="success.main">+3% improvement</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary" gutterBottom>Articles</Typography>
                  <Typography variant="h4" fontWeight={700}>{allArticles.length}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {allArticles.filter(a => a.status === 'published').length} published
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary" gutterBottom>Search Queries</Typography>
                  <Typography variant="h4" fontWeight={700}>2,450</Typography>
                  <Typography variant="caption" color="text.secondary">This week</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>Views Over Time</Typography>
                <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.100', borderRadius: 1 }}>
                  <Typography color="text.secondary">Views Chart Placeholder</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>Top Performing</Typography>
                <List dense>
                  {allArticles
                    .sort((a, b) => b.views - a.views)
                    .slice(0, 5)
                    .map((article, i) => (
                      <ListItem key={article.id} disableGutters>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="body2" color="text.secondary" fontWeight={600}>
                                {i + 1}.
                              </Typography>
                              <Typography variant="body2">{article.title}</Typography>
                            </Box>
                          }
                          secondary={`${article.views.toLocaleString()} views`}
                        />
                      </ListItem>
                    ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>

      {/* Article View Dialog */}
      <Dialog
        open={articleDialogOpen}
        onClose={() => setArticleDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedArticle && (
          <>
            <DialogTitle>
              <Breadcrumbs sx={{ mb: 1 }}>
                <Link underline="hover" color="inherit" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}>
                  <HomeIcon fontSize="small" />
                  Knowledge Base
                </Link>
                <Link underline="hover" color="inherit" sx={{ cursor: 'pointer' }}>
                  {selectedArticle.category}
                </Link>
                <Typography color="text.primary">{selectedArticle.title}</Typography>
              </Breadcrumbs>
              <Typography variant="h5" fontWeight={600}>{selectedArticle.title}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Updated {selectedArticle.updated}
                </Typography>
                <Typography variant="caption" color="text.secondary">•</Typography>
                <Typography variant="caption" color="text.secondary">
                  {selectedArticle.views.toLocaleString()} views
                </Typography>
                <Indicator
                  label={selectedArticle.status}
                  status={selectedArticle.status === 'published' ? 'success' : 'warning'}
                  size="small"
                />
              </Box>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ py: 2 }}>
                <Typography variant="body1" paragraph>
                  This is a placeholder for the article content. In a real implementation, this would contain
                  the full article text with rich formatting, images, code blocks, and other media.
                </Typography>
                <Typography variant="body1" paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                  ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Typography>
                <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1, my: 2 }}>
                  <Typography variant="body2" fontFamily="monospace">
                    // Example code block
                    {'\n'}const example = 'Hello World';
                    {'\n'}console.log(example);
                  </Typography>
                </Box>
                <Typography variant="body1">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                  nulla pariatur. Excepteur sint occaecat cupidatat non proident.
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="body2">Was this article helpful?</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button variant="outlined" size="small" startIcon={<ThumbUpIcon />}>
                    Yes ({selectedArticle.helpful}%)
                  </Button>
                  <Button variant="outlined" size="small" startIcon={<ThumbDownIcon />}>
                    No
                  </Button>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setArticleDialogOpen(false)}>Close</Button>
              <Button variant="outlined" startIcon={<EditIcon />} onClick={() => {
                setArticleDialogOpen(false)
                openEditor(selectedArticle)
              }}>
                Edit Article
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Article Editor Dialog */}
      <Dialog
        open={editorDialogOpen}
        onClose={() => setEditorDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingArticle ? 'Edit Article' : 'New Article'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            defaultValue={editingArticle?.title || ''}
            sx={{ mt: 2, mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select label="Category" defaultValue={editingArticle?.category || ''}>
              {categories.map(c => (
                <MenuItem key={c.id} value={c.name}>{c.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Editor Toolbar */}
          <Paper variant="outlined" sx={{ mb: 1, p: 0.5, display: 'flex', gap: 0.5 }}>
            <IconButton size="small"><FormatBoldIcon fontSize="small" /></IconButton>
            <IconButton size="small"><FormatItalicIcon fontSize="small" /></IconButton>
            <IconButton size="small"><FormatListBulletedIcon fontSize="small" /></IconButton>
            <IconButton size="small"><LinkIcon fontSize="small" /></IconButton>
            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
            <IconButton size="small"><ImageIcon fontSize="small" /></IconButton>
            <IconButton size="small"><CodeIcon fontSize="small" /></IconButton>
          </Paper>

          <TextField
            fullWidth
            multiline
            rows={12}
            placeholder="Write your article content here..."
            defaultValue={editingArticle ? 'Article content would appear here...' : ''}
          />

          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormControlLabel
              control={<Switch defaultChecked={editingArticle?.status === 'published'} />}
              label="Published"
            />
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Visibility</InputLabel>
              <Select label="Visibility" defaultValue="public">
                <MenuItem value="public">Public</MenuItem>
                <MenuItem value="internal">Internal Only</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditorDialogOpen(false)}>Cancel</Button>
          <Button variant="outlined" startIcon={<DraftsIcon />}>Save as Draft</Button>
          <Button variant="contained" startIcon={<PublishIcon />}>
            {editingArticle ? 'Update' : 'Publish'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

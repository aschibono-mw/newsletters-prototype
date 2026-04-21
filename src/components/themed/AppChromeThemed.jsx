import { Box, Typography, IconButton, Button, Select, MenuItem, FormControl, TextField, Tabs, Tab, Chip, Avatar, Badge } from '@mui/material'
import FeaturesSection from '../docs/FeaturesSection'
import MenuIcon from '@mui/icons-material/MenuRounded'
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded'
import FilterListIcon from '@mui/icons-material/FilterListRounded'
import CalendarTodayIcon from '@mui/icons-material/CalendarTodayRounded'
import NotificationsIcon from '@mui/icons-material/NotificationsRounded'
import MailIcon from '@mui/icons-material/MailRounded'
import ViewAgendaIcon from '@mui/icons-material/ViewAgendaRounded'
import SearchIcon from '@mui/icons-material/SearchRounded'
import MoreVertIcon from '@mui/icons-material/MoreVertRounded'

function AppChromeThemed() {
  return (
    <div className="themed-showcase">
      {/* Desktop Layout (1440px+) */}
      <div className="variant-section">
        <h4>Desktop Layout (1440px+)</h4>
        <p>Full 3-column layout with all filters, tabs, content feed, insights panel, and quick actions.</p>
        <Box sx={{ mt: 2 }}>
          <Box
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              overflow: 'hidden',
              width: '100%',
              maxWidth: 1200,
            }}
          >
            {/* Top Bar */}
            <Box sx={{ backgroundColor: 'background.paper', p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
              {/* Filter Bar */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <IconButton size="small">
                  <ArrowBackIcon fontSize="small" />
                </IconButton>
                <FormControl size="small" sx={{ minWidth: 100 }}>
                  <Select value="category1" displayEmpty sx={{ fontSize: '0.875rem' }}>
                    <MenuItem value="category1">Category</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select
                    value="range1"
                    displayEmpty
                    startAdornment={<CalendarTodayIcon sx={{ fontSize: 14, mr: 0.5, color: 'text.secondary' }} />}
                    sx={{ fontSize: '0.875rem' }}
                  >
                    <MenuItem value="range1">Date Range</MenuItem>
                  </Select>
                </FormControl>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 'auto' }}>
                  <Badge badgeContent={3} color="error">
                    <IconButton size="small">
                      <NotificationsIcon fontSize="small" />
                    </IconButton>
                  </Badge>
                  <IconButton size="small">
                    <MailIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small">
                    <ViewAgendaIcon fontSize="small" />
                  </IconButton>
                  <Button variant="contained" size="small" sx={{ textTransform: 'none', ml: 1 }}>
                    Action
                  </Button>
                </Box>
              </Box>

              {/* Filter Fields */}
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField label="All of these" placeholder="Keywords..." size="small" fullWidth sx={{ fontSize: '0.75rem' }} />
                <TextField label="At least one" placeholder="Keywords..." size="small" fullWidth sx={{ fontSize: '0.75rem' }} />
                <TextField label="None of these" placeholder="Keywords..." size="small" fullWidth sx={{ fontSize: '0.75rem' }} />
              </Box>

              {/* Filter Chips */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Button variant="outlined" size="small" startIcon={<FilterListIcon />} sx={{ textTransform: 'none' }}>
                  All Filters
                </Button>
                <FormControl size="small">
                  <Select value="news" displayEmpty sx={{ fontSize: '0.75rem', minWidth: 120 }}>
                    <MenuItem value="news">Source: News</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="small">
                  <Select value="" displayEmpty sx={{ fontSize: '0.75rem', minWidth: 90 }}>
                    <MenuItem value="">Location</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="small">
                  <Select value="" displayEmpty sx={{ fontSize: '0.75rem', minWidth: 90 }}>
                    <MenuItem value="">Language</MenuItem>
                  </Select>
                </FormControl>
                <Button variant="contained" size="small" sx={{ textTransform: 'none', ml: 'auto' }}>
                  Apply
                </Button>
              </Box>

              {/* Tabs */}
              <Box sx={{ borderTop: '1px solid', borderColor: 'divider', mt: 2, pt: 1 }}>
                <Tabs value={0}>
                  <Tab label="Content" sx={{ textTransform: 'none', fontSize: '0.875rem', minHeight: 36 }} />
                  <Tab label="Topics" sx={{ textTransform: 'none', fontSize: '0.875rem', minHeight: 36 }} />
                  <Tab label="Sentiment" sx={{ textTransform: 'none', fontSize: '0.875rem', minHeight: 36 }} />
                  <Tab label="Geography" sx={{ textTransform: 'none', fontSize: '0.875rem', minHeight: 36 }} />
                </Tabs>
              </Box>
            </Box>

            {/* Content Area - 3 Columns */}
            <Box sx={{ display: 'flex', gap: 2, p: 2, backgroundColor: 'grey.50', minHeight: 300 }}>
              {/* Left: Content Feed */}
              <Box sx={{ flex: 1, backgroundColor: 'background.paper', borderRadius: 1, p: 1.5, border: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5, pb: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>186k Mentions</Typography>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <IconButton size="small"><ViewAgendaIcon sx={{ fontSize: 16 }} /></IconButton>
                    <IconButton size="small"><MoreVertIcon sx={{ fontSize: 16 }} /></IconButton>
                  </Box>
                </Box>
                {/* Content Card */}
                <Box sx={{ display: 'flex', gap: 1.5, p: 1.5, border: '1px solid', borderColor: 'divider', borderRadius: 1, mb: 1 }}>
                  <Avatar sx={{ width: 32, height: 32, fontSize: '0.75rem' }}>M</Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, display: 'block' }}>Content Title</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>News • US • Jan 26</Typography>
                    <Box sx={{ mt: 0.5, height: 4, width: '90%', backgroundColor: 'grey.200', borderRadius: 0.5 }} />
                    <Box sx={{ mt: 0.5, height: 4, width: '70%', backgroundColor: 'grey.200', borderRadius: 0.5 }} />
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 1.5, p: 1.5, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                  <Avatar sx={{ width: 32, height: 32, fontSize: '0.75rem' }}>J</Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, display: 'block' }}>Content Title</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>Blog • UK • Jan 25</Typography>
                    <Box sx={{ mt: 0.5, height: 4, width: '85%', backgroundColor: 'grey.200', borderRadius: 0.5 }} />
                    <Box sx={{ mt: 0.5, height: 4, width: '60%', backgroundColor: 'grey.200', borderRadius: 0.5 }} />
                  </Box>
                </Box>
              </Box>

              {/* Center: Insights Panel */}
              <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {/* AI Insight Card */}
                <Box sx={{ backgroundColor: 'background.paper', borderRadius: 1, p: 1.5, border: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 1 }}>AI-Powered Insight</Typography>
                  <Box sx={{ height: 6, width: '100%', backgroundColor: 'grey.200', borderRadius: 0.5, mb: 0.5 }} />
                  <Box sx={{ height: 6, width: '75%', backgroundColor: 'grey.200', borderRadius: 0.5 }} />
                </Box>

                {/* Mentions Trend Card */}
                <Box sx={{ backgroundColor: 'background.paper', borderRadius: 1, p: 1.5, border: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 1 }}>Mentions Trend</Typography>
                  <Box sx={{ display: 'flex', gap: 3, mb: 1 }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>Total</Typography>
                      <Typography variant="h6" sx={{ fontSize: '1.25rem', fontWeight: 600 }}>69</Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>Daily Avg</Typography>
                      <Typography variant="h6" sx={{ fontSize: '1.25rem', fontWeight: 600 }}>9</Typography>
                    </Box>
                  </Box>
                  {/* Mini chart */}
                  <Box sx={{ height: 60, backgroundColor: 'grey.100', borderRadius: 1, display: 'flex', alignItems: 'flex-end', gap: 0.5, p: 1 }}>
                    <Box sx={{ width: '12%', height: '60%', backgroundColor: 'primary.main', borderRadius: 0.5 }} />
                    <Box sx={{ width: '12%', height: '40%', backgroundColor: 'primary.main', borderRadius: 0.5 }} />
                    <Box sx={{ width: '12%', height: '50%', backgroundColor: 'primary.main', borderRadius: 0.5 }} />
                    <Box sx={{ width: '12%', height: '30%', backgroundColor: 'primary.main', borderRadius: 0.5 }} />
                    <Box sx={{ width: '12%', height: '80%', backgroundColor: 'primary.main', borderRadius: 0.5 }} />
                    <Box sx={{ width: '12%', height: '70%', backgroundColor: 'primary.main', borderRadius: 0.5 }} />
                    <Box sx={{ width: '12%', height: '90%', backgroundColor: 'primary.main', borderRadius: 0.5 }} />
                  </Box>
                </Box>

                {/* Top Keywords Card */}
                <Box sx={{ backgroundColor: 'background.paper', borderRadius: 1, p: 1.5, border: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 1 }}>Top Keywords</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    <Chip label="Innovation" size="small" sx={{ fontSize: '0.7rem' }} />
                    <Chip label="Growth" size="small" sx={{ fontSize: '0.7rem' }} />
                    <Chip label="Technology" size="small" sx={{ fontSize: '0.7rem' }} />
                    <Chip label="Market" size="small" sx={{ fontSize: '0.7rem' }} />
                  </Box>
                </Box>
              </Box>

              {/* Right: Quick Actions */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', pt: 1 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <IconButton size="small" sx={{ border: '1px solid', borderColor: 'divider', mb: 0.5 }}>
                    <SearchIcon fontSize="small" />
                  </IconButton>
                  <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>Share</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <IconButton size="small" sx={{ border: '1px solid', borderColor: 'divider', mb: 0.5 }}>
                    <ViewAgendaIcon fontSize="small" />
                  </IconButton>
                  <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>View</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>

      {/* Tablet Layout (768px - 1439px) */}
      <div className="variant-section" style={{ marginTop: '3rem' }}>
        <h4>Tablet Layout (768px - 1439px)</h4>
        <p>2-column layout. Quick actions column hidden, insights panel remains visible.</p>
        <Box sx={{ mt: 2 }}>
          <Box
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              overflow: 'hidden',
              width: '100%',
              maxWidth: 900,
            }}
          >
            {/* Top Bar - Condensed */}
            <Box sx={{ backgroundColor: 'background.paper', p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <IconButton size="small">
                  <MenuIcon fontSize="small" />
                </IconButton>
                <FormControl size="small" sx={{ minWidth: 100 }}>
                  <Select value="category1" displayEmpty sx={{ fontSize: '0.875rem' }}>
                    <MenuItem value="category1">Category</MenuItem>
                  </Select>
                </FormControl>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 'auto' }}>
                  <Badge badgeContent={3} color="error">
                    <IconButton size="small">
                      <NotificationsIcon fontSize="small" />
                    </IconButton>
                  </Badge>
                  <Button variant="contained" size="small" sx={{ textTransform: 'none' }}>
                    Action
                  </Button>
                </Box>
              </Box>

              {/* Collapsed Filters */}
              <Box sx={{ mb: 2 }}>
                <Button variant="outlined" size="small" startIcon={<FilterListIcon />} fullWidth sx={{ textTransform: 'none', justifyContent: 'flex-start' }}>
                  Filters (3 active)
                </Button>
              </Box>

              {/* Tabs */}
              <Box sx={{ borderTop: '1px solid', borderColor: 'divider', mt: 2, pt: 1 }}>
                <Tabs value={0} variant="scrollable" scrollButtons="auto">
                  <Tab label="Content" sx={{ textTransform: 'none', fontSize: '0.875rem', minHeight: 36 }} />
                  <Tab label="Topics" sx={{ textTransform: 'none', fontSize: '0.875rem', minHeight: 36 }} />
                  <Tab label="Sentiment" sx={{ textTransform: 'none', fontSize: '0.875rem', minHeight: 36 }} />
                </Tabs>
              </Box>
            </Box>

            {/* Content Area - 2 Columns */}
            <Box sx={{ display: 'flex', gap: 2, p: 2, backgroundColor: 'grey.50', minHeight: 250 }}>
              {/* Left: Content Feed */}
              <Box sx={{ flex: 1, backgroundColor: 'background.paper', borderRadius: 1, p: 1.5, border: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5, pb: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>186k Mentions</Typography>
                  <IconButton size="small"><MoreVertIcon sx={{ fontSize: 16 }} /></IconButton>
                </Box>
                <Box sx={{ display: 'flex', gap: 1.5, p: 1.5, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                  <Avatar sx={{ width: 32, height: 32, fontSize: '0.75rem' }}>M</Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, display: 'block' }}>Content Title</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>News • US • Jan 26</Typography>
                    <Box sx={{ mt: 0.5, height: 4, width: '90%', backgroundColor: 'grey.200', borderRadius: 0.5 }} />
                  </Box>
                </Box>
              </Box>

              {/* Right: Insights Panel */}
              <Box sx={{ flex: 1.5, backgroundColor: 'background.paper', borderRadius: 1, p: 1.5, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 1 }}>Mentions Trend</Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>Total</Typography>
                    <Typography variant="h6" sx={{ fontSize: '1.25rem', fontWeight: 600 }}>69</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>Daily Avg</Typography>
                    <Typography variant="h6" sx={{ fontSize: '1.25rem', fontWeight: 600 }}>9</Typography>
                  </Box>
                </Box>
                <Box sx={{ height: 60, backgroundColor: 'grey.100', borderRadius: 1, display: 'flex', alignItems: 'flex-end', gap: 0.5, p: 1 }}>
                  <Box sx={{ width: '12%', height: '60%', backgroundColor: 'primary.main', borderRadius: 0.5 }} />
                  <Box sx={{ width: '12%', height: '40%', backgroundColor: 'primary.main', borderRadius: 0.5 }} />
                  <Box sx={{ width: '12%', height: '50%', backgroundColor: 'primary.main', borderRadius: 0.5 }} />
                  <Box sx={{ width: '12%', height: '30%', backgroundColor: 'primary.main', borderRadius: 0.5 }} />
                  <Box sx={{ width: '12%', height: '80%', backgroundColor: 'primary.main', borderRadius: 0.5 }} />
                  <Box sx={{ width: '12%', height: '70%', backgroundColor: 'primary.main', borderRadius: 0.5 }} />
                  <Box sx={{ width: '12%', height: '90%', backgroundColor: 'primary.main', borderRadius: 0.5 }} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>

      {/* Mobile Layout (< 768px) */}
      <div className="variant-section" style={{ marginTop: '3rem' }}>
        <h4>Mobile Layout (&lt; 768px)</h4>
        <p>Single column layout. Hamburger menu, stacked content, bottom navigation, collapsed filters.</p>
        <Box sx={{ mt: 2 }}>
          <Box
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              overflow: 'hidden',
              width: '100%',
              maxWidth: 400,
            }}
          >
            {/* Mobile Header */}
            <Box sx={{ backgroundColor: 'background.paper', p: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <IconButton size="small">
                  <MenuIcon fontSize="small" />
                </IconButton>
                <Typography variant="body2" sx={{ fontWeight: 600, flex: 1 }}>Category</Typography>
                <Badge badgeContent={3} color="error">
                  <IconButton size="small">
                    <NotificationsIcon fontSize="small" />
                  </IconButton>
                </Badge>
              </Box>

              {/* Mobile Filters - Collapsed */}
              <Button variant="outlined" size="small" startIcon={<FilterListIcon />} fullWidth sx={{ textTransform: 'none', justifyContent: 'flex-start', mb: 1 }}>
                Filters & Date Range
              </Button>

              {/* Mobile Tabs */}
              <Tabs value={0} variant="scrollable" scrollButtons={false}>
                <Tab label="Content" sx={{ textTransform: 'none', fontSize: '0.875rem', minHeight: 32, minWidth: 80 }} />
                <Tab label="Topics" sx={{ textTransform: 'none', fontSize: '0.875rem', minHeight: 32, minWidth: 80 }} />
                <Tab label="Sentiment" sx={{ textTransform: 'none', fontSize: '0.875rem', minHeight: 32, minWidth: 80 }} />
              </Tabs>
            </Box>

            {/* Mobile Content - Single Column */}
            <Box sx={{ p: 1.5, backgroundColor: 'grey.50', minHeight: 300 }}>
              {/* Content Card */}
              <Box sx={{ backgroundColor: 'background.paper', borderRadius: 1, p: 1.5, mb: 1.5, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 1 }}>186k Mentions</Typography>
                <Box sx={{ display: 'flex', gap: 1.5, p: 1.5, border: '1px solid', borderColor: 'divider', borderRadius: 1, mb: 1 }}>
                  <Avatar sx={{ width: 32, height: 32, fontSize: '0.75rem' }}>M</Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, display: 'block' }}>Content Title</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>News • Jan 26</Typography>
                    <Box sx={{ mt: 0.5, height: 4, width: '100%', backgroundColor: 'grey.200', borderRadius: 0.5 }} />
                    <Box sx={{ mt: 0.5, height: 4, width: '80%', backgroundColor: 'grey.200', borderRadius: 0.5 }} />
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 1.5, p: 1.5, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                  <Avatar sx={{ width: 32, height: 32, fontSize: '0.75rem' }}>J</Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, display: 'block' }}>Content Title</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>Blog • Jan 25</Typography>
                    <Box sx={{ mt: 0.5, height: 4, width: '100%', backgroundColor: 'grey.200', borderRadius: 0.5 }} />
                    <Box sx={{ mt: 0.5, height: 4, width: '70%', backgroundColor: 'grey.200', borderRadius: 0.5 }} />
                  </Box>
                </Box>
              </Box>

              {/* Mini Insight Card */}
              <Box sx={{ backgroundColor: 'background.paper', borderRadius: 1, p: 1.5, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 1 }}>Mentions Trend</Typography>
                <Box sx={{ display: 'flex', gap: 3, mb: 1 }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>Total</Typography>
                    <Typography variant="h6" sx={{ fontSize: '1.25rem', fontWeight: 600 }}>69</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>Daily Avg</Typography>
                    <Typography variant="h6" sx={{ fontSize: '1.25rem', fontWeight: 600 }}>9</Typography>
                  </Box>
                </Box>
                <Box sx={{ height: 50, backgroundColor: 'grey.100', borderRadius: 1 }} />
              </Box>
            </Box>

            {/* Mobile Bottom Navigation */}
            <Box
              sx={{
                backgroundColor: 'background.paper',
                borderTop: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                justifyContent: 'space-around',
                p: 1,
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <IconButton size="small" color="primary">
                  <ViewAgendaIcon fontSize="small" />
                </IconButton>
                <Typography variant="caption" sx={{ fontSize: '0.65rem', display: 'block', color: 'primary.main' }}>Feed</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <IconButton size="small">
                  <SearchIcon fontSize="small" />
                </IconButton>
                <Typography variant="caption" sx={{ fontSize: '0.65rem', display: 'block', color: 'text.secondary' }}>Search</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <IconButton size="small">
                  <FilterListIcon fontSize="small" />
                </IconButton>
                <Typography variant="caption" sx={{ fontSize: '0.65rem', display: 'block', color: 'text.secondary' }}>Filters</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <IconButton size="small">
                  <MoreVertIcon fontSize="small" />
                </IconButton>
                <Typography variant="caption" sx={{ fontSize: '0.65rem', display: 'block', color: 'text.secondary' }}>More</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>

      <FeaturesSection
        features={[
          { feature: "Responsive Layout", description: "3-column (Desktop 1440px+: Feed 33%, Insights 50%, Actions 17%), 2-column (Tablet 768-1439px: Feed 40%, Insights 60%), 1-column (Mobile <768px: stacked)" },
          { feature: "Top Bar & Filters", description: "Back button, Category/Date selectors, Action icons, Primary CTA. Filter system with keyword fields, chips, saved sets, collapsible on mobile" },
          { feature: "Content Patterns", description: "Horizontal tabs (scrollable on mobile), sticky toolbar, sort controls, infinite scroll. Insights: AI insights, trend charts, keywords. Mobile: hamburger menu, bottom nav" },
          { feature: "Common Use Cases", description: "Analytics dashboards, media monitoring, content management, data exploration. Keyboard navigation, ARIA labels, 44px min touch targets" },
        ]}
      />
    </div>
  )
}

export default AppChromeThemed

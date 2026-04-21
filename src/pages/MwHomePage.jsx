import {
  Box, Typography, InputBase, Card, CardContent,
  Stack, Chip, Divider, IconButton, Link, Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const recentItems = [
  { Icon: ShowChartOutlinedIcon, color: 'info.main', bg: 'info.light', title: 'Monitor', subtitle: 'Monitor • 2m ago' },
  { Icon: ExploreOutlinedIcon, color: 'primary.main', bg: 'primary.light', title: 'Yelp Brand Search', subtitle: 'Explore • Feb 25' },
  { Icon: BarChartOutlinedIcon, color: 'secondary.main', bg: 'secondary.light', title: 'Yelp', subtitle: 'Dashboards • Feb 25' },
  { Icon: ExploreOutlinedIcon, color: 'primary.main', bg: 'primary.light', title: 'Yelp Negative Experiences', subtitle: 'Explore • Feb 18' },
];

const productCards = [
  {
    Icon: ExploreOutlinedIcon,
    title: 'Explore insights and trends',
    desc: 'Create and manage searches to monitor brand, competitor, and industry media coverage',
    links: ['Go to Explore', 'Start training'],
  },
  {
    Icon: ShowChartOutlinedIcon,
    title: 'Monitor media coverage',
    desc: 'Personalize your monitoring experience to easily view, organize, and share relevant media coverage',
    links: ['Go to Monitor', 'Start training'],
  },
  {
    Icon: AssessmentOutlinedIcon,
    title: 'Report on media coverage',
    desc: 'Access and manage all of your reports',
    links: ['Go to Report', 'Start training'],
  },
  {
    Icon: TuneOutlinedIcon,
    title: 'Manage your content',
    desc: 'Manage all of your content configurations like searches, tags, labels, RSS feeds, and any manually added URLs',
    links: ['Go to Content'],
  },
];

const alertItems = [
  { title: 'Spike Detection', time: '4d ago', desc: 'Spike Detected: Brand mention volume up 141% across online and social sources in the past 24 hours' },
  { title: 'Every Mention', time: '5d ago', desc: 'New mention: CEO quoted in Bloomberg responding to customer experience allegations' },
  { title: 'Yelp Brand Search', time: '6d ago', desc: 'Yelp Brand Search triggered: 23 new articles matched in the past hour across news sources' },
];

export default function MwHomePage() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'grey.50' }}>

      {/* ── Main content ── */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>

        {/* Hero / greeting area */}
        <Box
          sx={{
            position: 'relative',
            textAlign: 'center',
            pt: 6, pb: 4, px: 4,
            overflow: 'hidden',
            bgcolor: 'common.white',
          }}
        >
          {/* Decorative blobs */}
          <Box sx={{ position: 'absolute', top: -40, left: -40, width: 220, height: 220, borderRadius: '50%', bgcolor: 'warning.light', opacity: 0.35 }} />
          <Box sx={{ position: 'absolute', top: 20, right: -60, width: 260, height: 180, borderRadius: '40%', bgcolor: 'error.light', opacity: 0.2 }} />
          <Box sx={{ position: 'absolute', top: 80, left: 60, width: 180, height: 180, borderRadius: '50%', bgcolor: 'info.light', opacity: 0.25 }} />

          <Typography variant="h4" sx={{ fontWeight: 400, mb: 2.5, position: 'relative' }}>
            Hello, <strong>Antonio!</strong>
          </Typography>

          {/* Search bar */}
          <Box
            sx={{
              maxWidth: 580, mx: 'auto', mb: 1.5, position: 'relative',
              bgcolor: 'common.white', border: '1px solid', borderColor: 'divider',
              borderRadius: 2, display: 'flex', alignItems: 'center', px: 2, py: 1,
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            }}
          >
            <SearchIcon sx={{ color: 'text.disabled', mr: 1 }} />
            <InputBase
              fullWidth
              placeholder="Search for topics, keywords, searches, templates, and more..."
              sx={{ fontSize: '0.9rem' }}
            />
          </Box>

          {/* AI hint */}
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.75} sx={{ position: 'relative' }}>
            <Box
              sx={{
                width: 22, height: 22, borderRadius: '50%',
                background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <AutoAwesomeIcon sx={{ fontSize: 12, color: 'common.white' }} />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Your AI teammate is here{' '}
              <Link href="#" underline="hover" sx={{ color: 'primary.main', fontWeight: 500 }}>
                ask Mira Studio a question
              </Link>
            </Typography>
          </Stack>
        </Box>

        {/* Content area */}
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ flex: 1, p: 3, minWidth: 0 }}>

            {/* Pick up where you left off */}
            <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>Pick up where you left off</Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                gap: 1.5,
                mb: 4,
              }}
            >
              {recentItems.map(({ Icon, color, bg, title, subtitle }, i) => (
                <Card key={i} variant="outlined" sx={{ cursor: 'pointer', '&:hover': { borderColor: 'primary.main' } }}>
                  <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: '12px !important' }}>
                    <Box
                      sx={{
                        width: 34, height: 34, borderRadius: 1, flexShrink: 0,
                        bgcolor: bg, opacity: 0.85,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <Icon sx={{ fontSize: 18, color }} />
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</Typography>
                      <Typography variant="caption" color="text.secondary">{subtitle}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>

            {/* Product overview */}
            <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>Product overview</Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                gap: 2,
              }}
            >
              {productCards.map(({ Icon, title, desc, links }, i) => (
                <Card key={i} variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
                      <Box
                        sx={{
                          width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                          bgcolor: 'primary.light', opacity: 0.85,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                      >
                        <Icon sx={{ fontSize: 16, color: 'primary.main' }} />
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{title}</Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>{desc}</Typography>
                    <Divider sx={{ mb: 1.5 }} />
                    <Stack direction="row" spacing={2.5}>
                      {links.map((label, j) => (
                        <Link key={j} href="#" underline="hover" variant="body2" sx={{ color: 'primary.main', fontWeight: 500 }}>
                          {label}
                        </Link>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Box>

          </Box>

          {/* ── Right sidebar ── */}
          <Box
            sx={{
              width: 380, flexShrink: 0,
              borderLeft: '1px solid', borderColor: 'divider',
              bgcolor: 'common.white',
              display: 'flex', flexDirection: 'column',
            }}
          >
            {/* MORE FROM MELTWATER header */}
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, pt: 2, pb: 1 }}>
              <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 1.1, color: 'text.secondary', fontSize: '0.65rem' }}>
                MORE FROM MELTWATER
              </Typography>
              <InfoOutlinedIcon sx={{ fontSize: 15, color: 'text.disabled' }} />
            </Stack>

            {/* Promo card */}
            <Box sx={{ px: 2, pb: 2 }}>
              <Card sx={{ bgcolor: 'grey.900', boxShadow: 'none' }}>
                <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                  <Typography variant="subtitle2" sx={{ color: 'common.white', fontWeight: 700, mb: 1 }}>
                    Dow Jones Factiva in Meltwater
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400', mb: 2 }}>
                    See what's behind the paywall
                  </Typography>
                  <Button variant="contained" color="primary" size="small">
                    Request access
                  </Button>
                </CardContent>
              </Card>
              <Stack direction="row" justifyContent="center" spacing={0.75} sx={{ mt: 1.5 }}>
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 7, height: 7, borderRadius: '50%',
                      bgcolor: i === 1 ? 'success.main' : 'grey.500',
                    }}
                  />
                ))}
              </Stack>
            </Box>

            <Divider />

            {/* Alerts panel */}
            <Box sx={{ flex: 1, overflow: 'auto' }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 1.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Alerts{' '}
                  <Box component="span" sx={{ color: 'text.secondary', fontWeight: 400 }}>(Unread - 32)</Box>
                </Typography>
                <Stack direction="row" spacing={0.5}>
                  <IconButton size="small"><IosShareOutlinedIcon sx={{ fontSize: 16 }} /></IconButton>
                  <IconButton size="small"><SettingsOutlinedIcon sx={{ fontSize: 16 }} /></IconButton>
                </Stack>
              </Stack>

              {alertItems.map((alert, i) => (
                <Box
                  key={i}
                  sx={{
                    px: 2, py: 1.5,
                    borderBottom: '1px solid', borderColor: 'divider',
                    borderLeft: '3px solid', borderLeftColor: 'error.light',
                    '&:hover': { bgcolor: 'grey.50' },
                    cursor: 'pointer',
                  }}
                >
                  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 0.5 }}>
                    <Chip
                      label={alert.title}
                      size="small"
                      sx={{
                        bgcolor: 'primary.light', color: 'primary.main',
                        fontWeight: 600, fontSize: '0.65rem', height: 20,
                      }}
                    />
                    <Typography variant="caption" color="text.disabled">{alert.time}</Typography>
                  </Stack>
                  <Typography variant="caption" color="text.primary" sx={{ lineHeight: 1.4, display: 'block' }}>
                    {alert.desc}
                  </Typography>
                </Box>
              ))}

              {/* Footer links */}
              <Stack direction="row" spacing={3} sx={{ px: 2, py: 2 }}>
                <Link href="#" underline="hover" variant="body2" sx={{ color: 'primary.main', fontWeight: 500 }}>View all</Link>
                <Link href="#" underline="hover" variant="body2" sx={{ color: 'primary.main', fontWeight: 500 }}>Mark all as read</Link>
              </Stack>
            </Box>

          </Box>
        </Box>
      </Box>
    </Box>
  );
}

import { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Paper,
  Divider,
  Link,
  Button,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Avatar,
  AvatarGroup,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import RemoveIcon from '@mui/icons-material/Remove';
import PublicIcon from '@mui/icons-material/Public';
import GroupsIcon from '@mui/icons-material/Groups';
import CampaignIcon from '@mui/icons-material/Campaign';
import InventoryIcon from '@mui/icons-material/Inventory';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import MapIcon from '@mui/icons-material/Map';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ForumIcon from '@mui/icons-material/Forum';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useNavigate } from 'react-router-dom';

// Tab configuration
const TABS = [
  { id: 'home', label: 'Home' },
  { id: 'market-brand', label: 'Market & Brand' },
  { id: 'product', label: 'Product' },
  { id: 'audience', label: 'Audience' },
  { id: 'messaging', label: 'Messaging & Narrative' },
  { id: 'geographic', label: 'Geographic' },
  { id: 'traffic', label: 'Traffic & Impact' },
];

// Simple trend line SVG component
function TrendLine({ trend = 'up', color }) {
  const theme = useTheme();
  const strokeColor = color || theme.palette.grey[400];

  const getPath = () => {
    switch (trend) {
      case 'up':
        return 'M 0 35 Q 30 30, 60 25 T 120 15 T 180 8';
      case 'down':
        return 'M 0 8 Q 30 15, 60 20 T 120 30 T 180 35';
      case 'steady':
        return 'M 0 25 Q 30 22, 60 25 T 120 23 T 180 25';
      case 'improving':
        return 'M 0 40 Q 30 35, 60 30 T 120 20 T 180 10';
      default:
        return 'M 0 25 Q 30 22, 60 25 T 120 23 T 180 25';
    }
  };

  return (
    <svg width="180" height="50" viewBox="0 0 180 50" style={{ display: 'block' }}>
      <path
        d={getPath()}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Trend indicator badge
function TrendIndicator({ trend, label }) {
  const theme = useTheme();

  const getIcon = () => {
    if (trend === 'up' || trend === 'improving') {
      return <TrendingUpIcon sx={{ fontSize: 14, mr: 0.5 }} />;
    }
    if (trend === 'down') {
      return <TrendingDownIcon sx={{ fontSize: 14, mr: 0.5 }} />;
    }
    return <RemoveIcon sx={{ fontSize: 14, mr: 0.5 }} />;
  };

  const getColor = () => {
    if (trend === 'up' || trend === 'improving') return theme.palette.success.main;
    if (trend === 'down') return theme.palette.error.main;
    return theme.palette.text.secondary;
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', color: getColor(), ml: 1 }}>
      {getIcon()}
      <Typography variant="caption" sx={{ color: getColor() }}>
        {label}
      </Typography>
    </Box>
  );
}

// Insight card component
function InsightCard({ title, trend, trendLabel, sections, viewLabel, icon, onViewClick }) {
  const theme = useTheme();

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 1,
        borderColor: theme.palette.divider,
        backgroundColor: theme.palette.background.paper,
        transition: 'border-color 0.2s ease',
        '&:hover': {
          borderColor: theme.palette.primary.main,
        },
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
        {icon && (
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: theme.palette.primary.light,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.palette.primary.main,
            }}
          >
            {icon}
          </Box>
        )}
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
      </Box>

      {/* Trend line + indicator */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <TrendLine trend={trend} />
        {trendLabel && <TrendIndicator trend={trend} label={trendLabel} />}
      </Box>

      {/* Sections */}
      <Box sx={{ flex: 1 }}>
        {sections.map((section, index) => (
          <Box key={index} sx={{ mb: 2.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5, color: theme.palette.text.primary }}>
              {section.label}
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              {section.value}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Divider and View link */}
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link
          component="button"
          underline="hover"
          onClick={onViewClick}
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontWeight: 500,
            color: theme.palette.text.primary,
            cursor: 'pointer',
            '&:hover': {
              color: theme.palette.primary.main,
            },
          }}
        >
          {viewLabel} →
        </Link>
      </Box>
    </Paper>
  );
}

// Stats card component for detail pages
function StatCard({ label, value, change, trend }) {
  const theme = useTheme();

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2.5,
        borderRadius: 1,
        borderColor: theme.palette.divider,
      }}
    >
      <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}>
        {label}
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 700, my: 0.5 }}>
        {value}
      </Typography>
      {change && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {trend === 'up' ? (
            <TrendingUpIcon sx={{ fontSize: 16, color: theme.palette.success.main }} />
          ) : trend === 'down' ? (
            <TrendingDownIcon sx={{ fontSize: 16, color: theme.palette.error.main }} />
          ) : null}
          <Typography
            variant="caption"
            sx={{
              color: trend === 'up' ? theme.palette.success.main : trend === 'down' ? theme.palette.error.main : theme.palette.text.secondary,
              fontWeight: 500,
            }}
          >
            {change}
          </Typography>
        </Box>
      )}
    </Paper>
  );
}

// Data table row component
function DataRow({ rank, name, value, change, trend }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        py: 1.5,
        borderBottom: '1px solid',
        borderColor: theme.palette.divider,
      }}
    >
      <Typography variant="body2" sx={{ width: 32, fontWeight: 600, color: theme.palette.text.secondary }}>
        {rank}
      </Typography>
      <Typography variant="body2" sx={{ flex: 1, fontWeight: 500 }}>
        {name}
      </Typography>
      <Typography variant="body2" sx={{ width: 80, textAlign: 'right', fontWeight: 600 }}>
        {value}
      </Typography>
      <Box sx={{ width: 80, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
        {trend === 'up' ? (
          <TrendingUpIcon sx={{ fontSize: 14, color: theme.palette.success.main }} />
        ) : trend === 'down' ? (
          <TrendingDownIcon sx={{ fontSize: 14, color: theme.palette.error.main }} />
        ) : (
          <RemoveIcon sx={{ fontSize: 14, color: theme.palette.text.disabled }} />
        )}
        <Typography
          variant="caption"
          sx={{
            color: trend === 'up' ? theme.palette.success.main : trend === 'down' ? theme.palette.error.main : theme.palette.text.secondary,
          }}
        >
          {change}
        </Typography>
      </Box>
    </Box>
  );
}

// Mock data for the insight cards (Home tab)
const INSIGHT_CARDS = [
  {
    title: 'Market & Brand',
    trend: 'up',
    trendLabel: 'up',
    icon: <StorefrontIcon sx={{ fontSize: 20 }} />,
    sections: [
      { label: 'Rank', value: '#2 in competitive landscape (▲ +1)' },
      { label: 'Rising Themes', value: 'EV leadership, software-first innovation' },
      { label: 'Associated Competitors', value: 'Ford, GM, Lucid Group Inc' },
    ],
    viewLabel: 'View Market & Brand',
    tabId: 'market-brand',
  },
  {
    title: 'Product',
    trend: 'steady',
    trendLabel: 'steady',
    icon: <InventoryIcon sx={{ fontSize: 20 }} />,
    sections: [
      { label: 'Product Signal', value: 'Strong sentiment around reliability' },
      { label: 'Rising Themes', value: 'AI-powered features, faster updates' },
      { label: 'Compared Products', value: 'Model X, iDrive, BlueCruise' },
    ],
    viewLabel: 'View Product',
    tabId: 'product',
  },
  {
    title: 'Audience',
    trend: 'steady',
    trendLabel: '',
    icon: <GroupsIcon sx={{ fontSize: 20 }} />,
    sections: [
      { label: 'Core Segments', value: 'Tech-forward consumers, EV adopters' },
      { label: 'Motivations', value: 'Sustainability, innovation pride' },
      { label: 'Top Regions', value: 'California, Berlin, Toronto' },
    ],
    viewLabel: 'View Audience',
    tabId: 'audience',
  },
  {
    title: 'Messaging & Narrative',
    trend: 'up',
    trendLabel: 'up',
    icon: <CampaignIcon sx={{ fontSize: 20 }} />,
    sections: [
      { label: 'Dominant Narratives', value: 'Innovation leadership, brand trust' },
      { label: 'Shifts in Tone', value: 'More emphasis on safety & transparency' },
      { label: 'Key Associations', value: 'Sustainability, long-term value' },
    ],
    viewLabel: 'View Messaging & Narrative',
    tabId: 'messaging',
  },
  {
    title: 'Geographic',
    trend: 'steady',
    trendLabel: '',
    icon: <PublicIcon sx={{ fontSize: 20 }} />,
    sections: [
      { label: 'Rising Regions', value: 'Germany, U.S., West Coast, Brazil' },
      { label: 'Location-Linked Themes', value: 'EV policy, charging infrastructure' },
      { label: 'Regional Influencers', value: 'Tech reviewers, local energy analysts' },
    ],
    viewLabel: 'View Geographic',
    tabId: 'geographic',
  },
  {
    title: 'Traffic & Impact (GA Lens)',
    trend: 'steady',
    trendLabel: 'steady',
    icon: <AnalyticsIcon sx={{ fontSize: 20 }} />,
    sections: [
      { label: 'Traffic Sources', value: 'Organic search, referrals, social' },
      { label: 'Performance Highlights', value: 'Strong landing page engagement' },
      { label: 'Correlated Signals', value: 'EV themes • industry news spikes' },
    ],
    viewLabel: 'View Traffic & Impact',
    tabId: 'traffic',
  },
];

// ==========================================
// HOME TAB CONTENT
// ==========================================
function HomeTabContent({ onTabChange }) {
  const theme = useTheme();
  const [showReadyBanner, setShowReadyBanner] = useState(true);
  const [showInsightsBanner, setShowInsightsBanner] = useState(true);

  return (
    <>
      {/* Ready banner */}
      {showReadyBanner && (
        <Paper
          variant="outlined"
          sx={{
            p: 2.5,
            mb: 3,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 2,
            borderRadius: 1,
            borderColor: theme.palette.divider,
          }}
        >
          <CheckCircleOutlineIcon sx={{ color: theme.palette.success.main, mt: 0.25 }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
              Your Insight Lenses Are Ready
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              We've analyzed your brand, competitors, and connected links to create a set of insight lenses. Each lens is powered by guiding questions — these tell the AI what to analyze and where to focus. You can update these questions anytime to refine your insights.
            </Typography>
          </Box>
          <IconButton size="small" onClick={() => setShowReadyBanner(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Paper>
      )}

      {/* Mira Insights banner */}
      {showInsightsBanner && (
        <Paper
          variant="outlined"
          sx={{
            p: 2.5,
            mb: 3,
            borderRadius: 1,
            borderColor: theme.palette.divider,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <AutoAwesomeIcon sx={{ color: theme.palette.secondary.main, mt: 0.25 }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5 }}>
                Mira Insights
              </Typography>

              <Box sx={{ mb: 1.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.25 }}>
                  Innovation leadership is the dominant theme across all models
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  Appears consistently in conversations around brand trust, product reliability, and long-term value.
                </Typography>
              </Box>

              <Box sx={{ mb: 1.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.25 }}>
                  EV safety and transparency narratives are rising week-over-week
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  Tone shifts show growing public focus on safety features and policy alignment.
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.25 }}>
                  Competitor attention is clustering around Ford and GM
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  Cross-model rank comparisons show increased competitive pressure from traditional automakers.
                </Typography>
              </Box>
            </Box>
            <IconButton size="small" onClick={() => setShowInsightsBanner(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </Paper>
      )}

      {/* Model visibility trend section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
          Insights generated across models: <Typography component="span" fontWeight={400}>OpenAI, Gemini, Anthropic, Claude</Typography>
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
          Model Visibility Trend (7 days)
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <svg width="300" height="60" viewBox="0 0 300 60">
            <path
              d="M 0 50 Q 50 45, 100 35 T 200 20 T 300 10"
              fill="none"
              stroke={theme.palette.grey[400]}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <TrendIndicator trend="improving" label="improving" />
        </Box>
      </Box>

      {/* Insight cards grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 3,
        }}
      >
        {INSIGHT_CARDS.map((card, index) => (
          <InsightCard
            key={index}
            {...card}
            onViewClick={() => onTabChange(card.tabId)}
          />
        ))}
      </Box>
    </>
  );
}

// ==========================================
// MARKET & BRAND TAB CONTENT
// ==========================================
function MarketBrandTabContent() {
  const theme = useTheme();

  const competitors = [
    { rank: 1, name: 'Tesla', value: '89%', change: '+2%', trend: 'up' },
    { rank: 2, name: 'Your Brand', value: '76%', change: '+5%', trend: 'up' },
    { rank: 3, name: 'Ford', value: '68%', change: '-1%', trend: 'down' },
    { rank: 4, name: 'GM', value: '62%', change: '+3%', trend: 'up' },
    { rank: 5, name: 'Lucid', value: '45%', change: '0%', trend: 'steady' },
  ];

  const themes = [
    { name: 'EV Leadership', mentions: 2847, trend: 'up' },
    { name: 'Software Innovation', mentions: 1923, trend: 'up' },
    { name: 'Sustainability', mentions: 1654, trend: 'steady' },
    { name: 'Price Competitiveness', mentions: 1432, trend: 'down' },
    { name: 'Safety Standards', mentions: 1298, trend: 'up' },
  ];

  return (
    <Box>
      {/* Stats row */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2, mb: 4 }}>
        <StatCard label="Market Rank" value="#2" change="+1 from last week" trend="up" />
        <StatCard label="Brand Mentions" value="12.4K" change="+18% vs last period" trend="up" />
        <StatCard label="Share of Voice" value="24%" change="+3pp" trend="up" />
        <StatCard label="Sentiment Score" value="72" change="-2 points" trend="down" />
      </Box>

      {/* Two column layout */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
        {/* Competitive Landscape */}
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 1, borderColor: theme.palette.divider }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Competitive Landscape
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 3 }}>
            Brand visibility ranking based on AI model responses
          </Typography>
          {competitors.map((item) => (
            <DataRow key={item.rank} {...item} />
          ))}
        </Paper>

        {/* Rising Themes */}
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 1, borderColor: theme.palette.divider }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Rising Themes
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 3 }}>
            Topics gaining traction in brand conversations
          </Typography>
          {themes.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                py: 1.5,
                borderBottom: index < themes.length - 1 ? '1px solid' : 'none',
                borderColor: theme.palette.divider,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                  {item.name}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(item.mentions / 3000) * 100}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: theme.palette.grey[200],
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: 3,
                    },
                  }}
                />
              </Box>
              <Box sx={{ ml: 2, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, width: 60, textAlign: 'right' }}>
                  {item.mentions.toLocaleString()}
                </Typography>
                {item.trend === 'up' ? (
                  <TrendingUpIcon sx={{ fontSize: 16, color: theme.palette.success.main }} />
                ) : item.trend === 'down' ? (
                  <TrendingDownIcon sx={{ fontSize: 16, color: theme.palette.error.main }} />
                ) : (
                  <RemoveIcon sx={{ fontSize: 16, color: theme.palette.text.disabled }} />
                )}
              </Box>
            </Box>
          ))}
        </Paper>
      </Box>
    </Box>
  );
}

// ==========================================
// PRODUCT TAB CONTENT
// ==========================================
function ProductTabContent() {
  const theme = useTheme();

  const products = [
    { rank: 1, name: 'Model S', value: '92%', change: '+3%', trend: 'up' },
    { rank: 2, name: 'Your Product', value: '85%', change: '+7%', trend: 'up' },
    { rank: 3, name: 'Model X', value: '78%', change: '-2%', trend: 'down' },
    { rank: 4, name: 'iDrive', value: '71%', change: '+1%', trend: 'up' },
    { rank: 5, name: 'BlueCruise', value: '64%', change: '+4%', trend: 'up' },
  ];

  const features = [
    { name: 'AI-powered features', sentiment: 89, change: '+12%' },
    { name: 'Battery range', sentiment: 82, change: '+5%' },
    { name: 'Software updates', sentiment: 78, change: '+8%' },
    { name: 'Build quality', sentiment: 71, change: '-3%' },
    { name: 'Customer service', sentiment: 65, change: '+2%' },
  ];

  return (
    <Box>
      {/* Stats row */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2, mb: 4 }}>
        <StatCard label="Product Rank" value="#2" change="+1 position" trend="up" />
        <StatCard label="Product Mentions" value="8.7K" change="+24% vs last period" trend="up" />
        <StatCard label="Feature Sentiment" value="82%" change="+5pp" trend="up" />
        <StatCard label="Comparison Wins" value="67%" change="+12%" trend="up" />
      </Box>

      {/* Two column layout */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
        {/* Product Comparisons */}
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 1, borderColor: theme.palette.divider }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Product Comparisons
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 3 }}>
            How your product ranks against competitors in AI responses
          </Typography>
          {products.map((item) => (
            <DataRow key={item.rank} {...item} />
          ))}
        </Paper>

        {/* Feature Sentiment */}
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 1, borderColor: theme.palette.divider }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Feature Sentiment
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 3 }}>
            Sentiment scores by product feature
          </Typography>
          {features.map((item, index) => (
            <Box
              key={index}
              sx={{
                py: 1.5,
                borderBottom: index < features.length - 1 ? '1px solid' : 'none',
                borderColor: theme.palette.divider,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {item.name}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: item.sentiment >= 75 ? theme.palette.success.main : theme.palette.warning.main }}>
                  {item.sentiment}%
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={item.sentiment}
                  sx={{
                    flex: 1,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: theme.palette.grey[200],
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: item.sentiment >= 75 ? theme.palette.success.main : theme.palette.warning.main,
                      borderRadius: 4,
                    },
                  }}
                />
                <Typography variant="caption" sx={{ color: item.change.startsWith('+') ? theme.palette.success.main : theme.palette.error.main, width: 40 }}>
                  {item.change}
                </Typography>
              </Box>
            </Box>
          ))}
        </Paper>
      </Box>
    </Box>
  );
}

// ==========================================
// AUDIENCE TAB CONTENT
// ==========================================
function AudienceTabContent() {
  const theme = useTheme();

  const segments = [
    { name: 'Tech-forward consumers', percentage: 34, color: theme.palette.primary.main },
    { name: 'EV adopters', percentage: 28, color: theme.palette.secondary.main },
    { name: 'Sustainability advocates', percentage: 22, color: theme.palette.success.main },
    { name: 'Luxury buyers', percentage: 16, color: theme.palette.warning.main },
  ];

  const motivations = [
    { name: 'Environmental impact', score: 89 },
    { name: 'Innovation & technology', score: 85 },
    { name: 'Cost savings (fuel)', score: 78 },
    { name: 'Status & prestige', score: 72 },
    { name: 'Performance', score: 68 },
  ];

  return (
    <Box>
      {/* Stats row */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2, mb: 4 }}>
        <StatCard label="Total Audience" value="4.2M" change="+15% growth" trend="up" />
        <StatCard label="Active Engagers" value="892K" change="+22% vs last period" trend="up" />
        <StatCard label="Avg. Age Range" value="28-45" />
        <StatCard label="Primary Region" value="California" />
      </Box>

      {/* Two column layout */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
        {/* Core Segments */}
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 1, borderColor: theme.palette.divider }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Core Segments
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 3 }}>
            Audience breakdown by primary interest
          </Typography>

          {/* Donut chart placeholder */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Box sx={{ position: 'relative', width: 160, height: 160 }}>
              <svg width="160" height="160" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="60" fill="none" stroke={theme.palette.grey[200]} strokeWidth="24" />
                <circle cx="80" cy="80" r="60" fill="none" stroke={segments[0].color} strokeWidth="24" strokeDasharray="128 377" strokeDashoffset="0" transform="rotate(-90 80 80)" />
                <circle cx="80" cy="80" r="60" fill="none" stroke={segments[1].color} strokeWidth="24" strokeDasharray="106 377" strokeDashoffset="-128" transform="rotate(-90 80 80)" />
                <circle cx="80" cy="80" r="60" fill="none" stroke={segments[2].color} strokeWidth="24" strokeDasharray="83 377" strokeDashoffset="-234" transform="rotate(-90 80 80)" />
                <circle cx="80" cy="80" r="60" fill="none" stroke={segments[3].color} strokeWidth="24" strokeDasharray="60 377" strokeDashoffset="-317" transform="rotate(-90 80 80)" />
              </svg>
              <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>4.2M</Typography>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>Total</Typography>
              </Box>
            </Box>
          </Box>

          {/* Legend */}
          {segments.map((segment, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: segment.color }} />
              <Typography variant="body2" sx={{ flex: 1 }}>{segment.name}</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{segment.percentage}%</Typography>
            </Box>
          ))}
        </Paper>

        {/* Motivations */}
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 1, borderColor: theme.palette.divider }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Key Motivations
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 3 }}>
            What drives purchase decisions
          </Typography>
          {motivations.map((item, index) => (
            <Box
              key={index}
              sx={{
                py: 1.5,
                borderBottom: index < motivations.length - 1 ? '1px solid' : 'none',
                borderColor: theme.palette.divider,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {item.name}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {item.score}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={item.score}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: theme.palette.grey[200],
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 4,
                  },
                }}
              />
            </Box>
          ))}
        </Paper>
      </Box>
    </Box>
  );
}

// ==========================================
// MESSAGING & NARRATIVE TAB CONTENT
// ==========================================
function MessagingTabContent() {
  const theme = useTheme();

  const narratives = [
    { name: 'Innovation leadership', volume: 3421, sentiment: 'positive', change: '+18%' },
    { name: 'Brand trust', volume: 2876, sentiment: 'positive', change: '+12%' },
    { name: 'Safety & transparency', volume: 2345, sentiment: 'positive', change: '+24%' },
    { name: 'Price concerns', volume: 1987, sentiment: 'negative', change: '+8%' },
    { name: 'Environmental impact', volume: 1654, sentiment: 'positive', change: '+5%' },
  ];

  const toneShifts = [
    { from: 'Performance-focused', to: 'Safety-focused', change: '+15%' },
    { from: 'Price-driven', to: 'Value-driven', change: '+22%' },
    { from: 'Tech specs', to: 'User experience', change: '+18%' },
  ];

  return (
    <Box>
      {/* Stats row */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2, mb: 4 }}>
        <StatCard label="Narrative Mentions" value="14.2K" change="+28% vs last period" trend="up" />
        <StatCard label="Positive Sentiment" value="72%" change="+5pp" trend="up" />
        <StatCard label="Message Reach" value="8.9M" change="+34%" trend="up" />
        <StatCard label="Engagement Rate" value="4.2%" change="+0.8pp" trend="up" />
      </Box>

      {/* Two column layout */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
        {/* Dominant Narratives */}
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 1, borderColor: theme.palette.divider }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Dominant Narratives
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 3 }}>
            Most common themes in brand conversations
          </Typography>
          {narratives.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                py: 1.5,
                borderBottom: index < narratives.length - 1 ? '1px solid' : 'none',
                borderColor: theme.palette.divider,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {item.name}
                  </Typography>
                  <Chip
                    label={item.sentiment}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: 11,
                      backgroundColor: item.sentiment === 'positive' ? theme.palette.success.light : theme.palette.error.light,
                      color: item.sentiment === 'positive' ? theme.palette.success.dark : theme.palette.error.dark,
                    }}
                  />
                </Box>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                  {item.volume.toLocaleString()} mentions
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.success.main }}>
                {item.change}
              </Typography>
            </Box>
          ))}
        </Paper>

        {/* Tone Shifts */}
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 1, borderColor: theme.palette.divider }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Shifts in Tone
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 3 }}>
            How conversation focus is changing
          </Typography>
          {toneShifts.map((item, index) => (
            <Paper
              key={index}
              variant="outlined"
              sx={{
                p: 2,
                mb: 2,
                borderRadius: 1,
                borderColor: theme.palette.divider,
                backgroundColor: theme.palette.grey[50],
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>From</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>{item.from}</Typography>
                </Box>
                <Box sx={{ color: theme.palette.primary.main }}>→</Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>To</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>{item.to}</Typography>
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.success.main }}>
                  {item.change}
                </Typography>
              </Box>
            </Paper>
          ))}

          <Divider sx={{ my: 3 }} />

          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
            Key Associations
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {['Sustainability', 'Long-term value', 'Innovation', 'Reliability', 'Premium quality', 'Future-focused'].map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  backgroundColor: theme.palette.grey[100],
                  '&:hover': { backgroundColor: theme.palette.grey[200] },
                }}
              />
            ))}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

// ==========================================
// GEOGRAPHIC TAB CONTENT
// ==========================================
function GeographicTabContent() {
  const theme = useTheme();

  const regions = [
    { rank: 1, name: 'United States', value: '42%', change: '+5%', trend: 'up' },
    { rank: 2, name: 'Germany', value: '18%', change: '+8%', trend: 'up' },
    { rank: 3, name: 'United Kingdom', value: '12%', change: '+2%', trend: 'up' },
    { rank: 4, name: 'Canada', value: '9%', change: '+3%', trend: 'up' },
    { rank: 5, name: 'Brazil', value: '7%', change: '+12%', trend: 'up' },
  ];

  const localThemes = [
    { region: 'California', theme: 'EV incentives, charging network', trend: 'up' },
    { region: 'Germany', theme: 'Autobahn performance, efficiency', trend: 'up' },
    { region: 'UK', theme: 'Urban mobility, congestion charges', trend: 'steady' },
    { region: 'Canada', theme: 'Cold weather range, winter performance', trend: 'up' },
  ];

  return (
    <Box>
      {/* Stats row */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2, mb: 4 }}>
        <StatCard label="Active Regions" value="47" change="+5 new markets" trend="up" />
        <StatCard label="Top Growth Market" value="Brazil" change="+12% MoM" trend="up" />
        <StatCard label="Global Reach" value="12.8M" change="+22%" trend="up" />
        <StatCard label="Localized Content" value="23" change="languages" />
      </Box>

      {/* Two column layout */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
        {/* Rising Regions */}
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 1, borderColor: theme.palette.divider }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Rising Regions
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 3 }}>
            Geographic distribution of brand visibility
          </Typography>
          {regions.map((item) => (
            <DataRow key={item.rank} {...item} />
          ))}
        </Paper>

        {/* Location-Linked Themes */}
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 1, borderColor: theme.palette.divider }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Location-Linked Themes
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 3 }}>
            Regional topics driving conversations
          </Typography>
          {localThemes.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                py: 2,
                borderBottom: index < localThemes.length - 1 ? '1px solid' : 'none',
                borderColor: theme.palette.divider,
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.primary.light,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                }}
              >
                <MapIcon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {item.region}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  {item.theme}
                </Typography>
              </Box>
              {item.trend === 'up' ? (
                <TrendingUpIcon sx={{ fontSize: 18, color: theme.palette.success.main }} />
              ) : (
                <RemoveIcon sx={{ fontSize: 18, color: theme.palette.text.disabled }} />
              )}
            </Box>
          ))}
        </Paper>
      </Box>
    </Box>
  );
}

// ==========================================
// TRAFFIC & IMPACT TAB CONTENT
// ==========================================
function TrafficTabContent() {
  const theme = useTheme();

  const sources = [
    { name: 'Organic Search', value: '45%', sessions: '234K', trend: 'up' },
    { name: 'Direct', value: '28%', sessions: '145K', trend: 'steady' },
    { name: 'Social', value: '15%', sessions: '78K', trend: 'up' },
    { name: 'Referral', value: '8%', sessions: '42K', trend: 'up' },
    { name: 'Email', value: '4%', sessions: '21K', trend: 'down' },
  ];

  const correlations = [
    { signal: 'Industry news spike', impact: '+34% traffic', date: 'Dec 2' },
    { signal: 'Product announcement', impact: '+52% traffic', date: 'Nov 28' },
    { signal: 'Competitor comparison article', impact: '+28% traffic', date: 'Nov 25' },
    { signal: 'Sustainability report', impact: '+18% traffic', date: 'Nov 20' },
  ];

  return (
    <Box>
      {/* Stats row */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2, mb: 4 }}>
        <StatCard label="Total Sessions" value="520K" change="+18% vs last period" trend="up" />
        <StatCard label="Avg. Session Duration" value="3:42" change="+12%" trend="up" />
        <StatCard label="Bounce Rate" value="38%" change="-5pp" trend="up" />
        <StatCard label="Conversions" value="12.4K" change="+24%" trend="up" />
      </Box>

      {/* Two column layout */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
        {/* Traffic Sources */}
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 1, borderColor: theme.palette.divider }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Traffic Sources
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 3 }}>
            Where your visitors are coming from
          </Typography>
          {sources.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                py: 1.5,
                borderBottom: index < sources.length - 1 ? '1px solid' : 'none',
                borderColor: theme.palette.divider,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                  {item.name}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={parseInt(item.value)}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: theme.palette.grey[200],
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: 3,
                    },
                  }}
                />
              </Box>
              <Box sx={{ ml: 2, textAlign: 'right' }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.value}</Typography>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>{item.sessions}</Typography>
              </Box>
              {item.trend === 'up' ? (
                <TrendingUpIcon sx={{ fontSize: 16, color: theme.palette.success.main, ml: 1 }} />
              ) : item.trend === 'down' ? (
                <TrendingDownIcon sx={{ fontSize: 16, color: theme.palette.error.main, ml: 1 }} />
              ) : (
                <RemoveIcon sx={{ fontSize: 16, color: theme.palette.text.disabled, ml: 1 }} />
              )}
            </Box>
          ))}
        </Paper>

        {/* Correlated Signals */}
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 1, borderColor: theme.palette.divider }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Correlated Signals
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 3 }}>
            Events that drove traffic spikes
          </Typography>
          {correlations.map((item, index) => (
            <Paper
              key={index}
              variant="outlined"
              sx={{
                p: 2,
                mb: 2,
                borderRadius: 1,
                borderColor: theme.palette.divider,
                backgroundColor: theme.palette.grey[50],
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    backgroundColor: theme.palette.success.light,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <TrendingUpIcon sx={{ fontSize: 18, color: theme.palette.success.main }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {item.signal}
                  </Typography>
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                    {item.date}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.success.main }}>
                  {item.impact}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Paper>
      </Box>
    </Box>
  );
}

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
function GenAILensPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('home');

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTabContent onTabChange={setActiveTab} />;
      case 'market-brand':
        return <MarketBrandTabContent />;
      case 'product':
        return <ProductTabContent />;
      case 'audience':
        return <AudienceTabContent />;
      case 'messaging':
        return <MessagingTabContent />;
      case 'geographic':
        return <GeographicTabContent />;
      case 'traffic':
        return <TrafficTabContent />;
      default:
        return <HomeTabContent onTabChange={setActiveTab} />;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      {/* Header with back button and title */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 3,
          py: 1.5,
          borderBottom: '1px solid',
          borderColor: theme.palette.divider,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 1, color: theme.palette.text.secondary }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
          GenAI Lens
        </Typography>
      </Box>

      {/* Tabs navigation */}
      <Box
        sx={{
          borderBottom: '1px solid',
          borderColor: theme.palette.divider,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            px: 3,
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              color: theme.palette.text.secondary,
              '&.Mui-selected': {
                color: theme.palette.primary.main,
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: theme.palette.primary.main,
            },
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {TABS.map((tab) => (
            <Tab
              key={tab.id}
              label={tab.label}
              value={tab.id}
            />
          ))}
        </Tabs>
      </Box>

      {/* Main content */}
      <Box sx={{ flex: 1, p: 3, backgroundColor: theme.palette.grey[50] }}>
        <Box sx={{ maxWidth: 1536, mx: 'auto' }}>
          {renderTabContent()}
        </Box>
      </Box>
    </Box>
  );
}

export default GenAILensPage;

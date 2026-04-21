import { Box, Container, Typography, Grid, Button, TextField, Avatar, Card, CardContent, CardMedia, AppBar, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Chip, Rating, Tabs, Tab, Stepper, Step, StepLabel, Switch, FormControlLabel, Slider, Accordion, AccordionSummary, AccordionDetails, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Badge, LinearProgress, Pagination } from '@mui/material'
import Indicator from '../components/core/Indicator'
import SearchIcon from '@mui/icons-material/SearchRounded'
import DashboardIcon from '@mui/icons-material/DashboardRounded'
import PersonIcon from '@mui/icons-material/PersonRounded'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartRounded'
import ArticleIcon from '@mui/icons-material/ArticleRounded'
import AttachMoneyIcon from '@mui/icons-material/AttachMoneyRounded'
import SettingsIcon from '@mui/icons-material/SettingsRounded'
import TableChartIcon from '@mui/icons-material/TableChartRounded'
import ListAltIcon from '@mui/icons-material/ListAltRounded'
import NotificationsIcon from '@mui/icons-material/NotificationsRounded'
import ExpandMoreIcon from '@mui/icons-material/ExpandMoreRounded'
import CheckIcon from '@mui/icons-material/CheckRounded'
import StarIcon from '@mui/icons-material/StarRounded'
import FavoriteIcon from '@mui/icons-material/FavoriteRounded'
import SecurityIcon from '@mui/icons-material/SecurityRounded'
import TrendingUpIcon from '@mui/icons-material/TrendingUpRounded'
import AccountTreeIcon from '@mui/icons-material/AccountTreeRounded'
import ChatIcon from '@mui/icons-material/ChatRounded'
import AssessmentIcon from '@mui/icons-material/AssessmentRounded'
import ExtensionIcon from '@mui/icons-material/ExtensionRounded'
import HistoryIcon from '@mui/icons-material/HistoryRounded'
import CloudUploadIcon from '@mui/icons-material/CloudUploadRounded'
import TuneIcon from '@mui/icons-material/TuneRounded'
import FolderIcon from '@mui/icons-material/FolderRounded'
import SupportAgentIcon from '@mui/icons-material/SupportAgentRounded'
import GavelIcon from '@mui/icons-material/GavelRounded'
import ApiIcon from '@mui/icons-material/ApiRounded'
import RssFeedIcon from '@mui/icons-material/RssFeedRounded'
import EmailIcon from '@mui/icons-material/EmailRounded'
import FlagIcon from '@mui/icons-material/FlagRounded'
import DynamicFormIcon from '@mui/icons-material/DynamicFormRounded'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoomRounded'
import Inventory2Icon from '@mui/icons-material/Inventory2Rounded'
import AccountCircleIcon from '@mui/icons-material/AccountCircleRounded'
import TemplateCard from '../components/cards/TemplateCard'

// Mini preview components for each template
const DashboardPreview = () => (
  <Box sx={{ width: 400, display: 'flex', backgroundColor: 'grey.100', borderRadius: 1, overflow: 'hidden', boxShadow: 1 }}>
    {/* Sidebar */}
    <Box sx={{ width: 50, backgroundColor: 'grey.900', p: 0.5 }}>
      {[DashboardIcon, PersonIcon, SettingsIcon].map((Icon, i) => (
        <Box key={i} sx={{ p: 0.5, mb: 0.25, borderRadius: 0.5, backgroundColor: i === 0 ? 'primary.main' : 'transparent' }}>
          <Icon sx={{ fontSize: 12, color: 'white' }} />
        </Box>
      ))}
    </Box>
    {/* Content */}
    <Box sx={{ flex: 1, p: 1 }}>
      <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
        {['$12.4K', '1,234', '89%'].map((val, i) => (
          <Box key={i} sx={{ flex: 1, backgroundColor: 'white', p: 0.5, borderRadius: 0.5, boxShadow: 1 }}>
            <Typography sx={{ fontSize: '0.4rem', color: 'text.secondary' }}>Metric</Typography>
            <Typography sx={{ fontSize: '0.5rem', fontWeight: 700 }}>{val}</Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ backgroundColor: 'white', p: 0.5, borderRadius: 0.5, boxShadow: 1 }}>
        <Box sx={{ height: 40, display: 'flex', alignItems: 'flex-end', gap: 0.25 }}>
          {[60, 40, 80, 55, 70, 45, 90].map((h, i) => (
            <Box key={i} sx={{ flex: 1, height: `${h}%`, backgroundColor: 'primary.main', borderRadius: '2px 2px 0 0', opacity: 0.8 }} />
          ))}
        </Box>
      </Box>
    </Box>
  </Box>
)

const AuthPreview = () => (
  <Box sx={{ width: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2, backgroundColor: 'primary.main', borderRadius: 1 }}>
    <Box sx={{ backgroundColor: 'white', p: 2, borderRadius: 1, boxShadow: 2, width: '100%', maxWidth: 160 }}>
      <Typography sx={{ fontSize: '0.5rem', fontWeight: 700, mb: 1, textAlign: 'center' }}>Sign In</Typography>
      <Box sx={{ backgroundColor: 'grey.100', height: 16, borderRadius: 0.5, mb: 0.5 }} />
      <Box sx={{ backgroundColor: 'grey.100', height: 16, borderRadius: 0.5, mb: 1 }} />
      <Box sx={{ backgroundColor: 'primary.main', height: 20, borderRadius: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography sx={{ fontSize: '0.4rem', color: 'white', fontWeight: 600 }}>Login</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1, justifyContent: 'center' }}>
        <Box sx={{ flex: 1, height: 1, backgroundColor: 'grey.300' }} />
        <Typography sx={{ fontSize: '0.35rem', color: 'text.secondary' }}>or</Typography>
        <Box sx={{ flex: 1, height: 1, backgroundColor: 'grey.300' }} />
      </Box>
    </Box>
  </Box>
)

const EcommercePreview = () => (
  <Box sx={{ width: 400, backgroundColor: 'background.paper', borderRadius: 1, overflow: 'hidden', boxShadow: 1 }}>
    {/* Header */}
    <Box sx={{ p: 0.5, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography sx={{ fontSize: '0.5rem', fontWeight: 700 }}>Shop</Typography>
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <SearchIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
        <Badge badgeContent={2} color="primary" sx={{ '& .MuiBadge-badge': { fontSize: '0.3rem', minWidth: 10, height: 10 } }}>
          <ShoppingCartIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
        </Badge>
      </Box>
    </Box>
    {/* Products */}
    <Box sx={{ p: 0.5, display: 'flex', gap: 0.5 }}>
      {[1, 2, 3].map((i) => (
        <Box key={i} sx={{ flex: 1, borderRadius: 0.5, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ height: 40, backgroundColor: 'grey.200' }} />
          <Box sx={{ p: 0.5 }}>
            <Typography sx={{ fontSize: '0.35rem', fontWeight: 600 }}>Product {i}</Typography>
            <Typography sx={{ fontSize: '0.3rem', color: 'primary.main', fontWeight: 700 }}>$99.99</Typography>
            <Rating value={4} size="small" readOnly sx={{ fontSize: '0.4rem' }} />
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
)

const BlogPreview = () => (
  <Box sx={{ width: 400, backgroundColor: 'background.paper', borderRadius: 1, overflow: 'hidden', boxShadow: 1 }}>
    {/* Featured */}
    <Box sx={{ height: 50, backgroundColor: 'primary.main', p: 1, display: 'flex', alignItems: 'flex-end' }}>
      <Box>
        <Chip label="Featured" size="small" sx={{ height: 12, fontSize: '0.3rem', backgroundColor: 'white', mb: 0.5 }} />
        <Typography sx={{ fontSize: '0.45rem', fontWeight: 700, color: 'white' }}>How to Build Better Products</Typography>
      </Box>
    </Box>
    {/* Articles */}
    <Box sx={{ p: 0.5, display: 'flex', gap: 0.5 }}>
      {[1, 2].map((i) => (
        <Box key={i} sx={{ flex: 1, display: 'flex', gap: 0.5, p: 0.5, borderRadius: 0.5, border: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ width: 30, height: 30, backgroundColor: 'grey.200', borderRadius: 0.5, flexShrink: 0 }} />
          <Box>
            <Typography sx={{ fontSize: '0.35rem', fontWeight: 600 }}>Article Title {i}</Typography>
            <Typography sx={{ fontSize: '0.3rem', color: 'text.secondary' }}>2 min read</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
)

const SettingsPreview = () => (
  <Box sx={{ width: 400, display: 'flex', backgroundColor: 'background.paper', borderRadius: 1, overflow: 'hidden', boxShadow: 1 }}>
    {/* Tabs */}
    <Box sx={{ width: 60, backgroundColor: 'grey.50', p: 0.5, borderRight: '1px solid', borderColor: 'divider' }}>
      {['Profile', 'Account', 'Notifications', 'Privacy'].map((tab, i) => (
        <Box
          key={tab}
          sx={{
            p: 0.5,
            mb: 0.25,
            borderRadius: 0.5,
            backgroundColor: i === 0 ? 'primary.light' : 'transparent',
            fontSize: '0.3rem',
            fontWeight: i === 0 ? 600 : 400,
            color: i === 0 ? 'primary.main' : 'text.secondary',
          }}
        >
          {tab}
        </Box>
      ))}
    </Box>
    {/* Content */}
    <Box sx={{ flex: 1, p: 1 }}>
      <Typography sx={{ fontSize: '0.4rem', fontWeight: 700, mb: 0.5 }}>Profile Settings</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
        <Avatar sx={{ width: 20, height: 20, fontSize: '0.4rem' }}>JD</Avatar>
        <Box>
          <Typography sx={{ fontSize: '0.35rem', fontWeight: 600 }}>John Doe</Typography>
          <Typography sx={{ fontSize: '0.3rem', color: 'text.secondary' }}>john@example.com</Typography>
        </Box>
      </Box>
      <Box sx={{ backgroundColor: 'grey.100', height: 12, borderRadius: 0.5, mb: 0.25 }} />
      <Box sx={{ backgroundColor: 'grey.100', height: 12, borderRadius: 0.5 }} />
    </Box>
  </Box>
)

const DataTablePreview = () => (
  <Box sx={{ width: 400, backgroundColor: 'background.paper', borderRadius: 1, overflow: 'hidden', boxShadow: 1 }}>
    {/* Toolbar */}
    <Box sx={{ p: 0.5, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography sx={{ fontSize: '0.45rem', fontWeight: 700 }}>Users (156)</Typography>
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <SearchIcon sx={{ fontSize: 10, color: 'text.secondary' }} />
        <Box sx={{ backgroundColor: 'primary.main', px: 0.5, borderRadius: 0.25 }}>
          <Typography sx={{ fontSize: '0.3rem', color: 'white' }}>+ Add</Typography>
        </Box>
      </Box>
    </Box>
    {/* Table */}
    <Box sx={{ p: 0.5 }}>
      <Box sx={{ display: 'flex', gap: 0.5, mb: 0.25, pb: 0.25, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Checkbox size="small" sx={{ p: 0, width: 10, height: 10 }} />
        <Typography sx={{ flex: 2, fontSize: '0.3rem', fontWeight: 600 }}>Name</Typography>
        <Typography sx={{ flex: 2, fontSize: '0.3rem', fontWeight: 600 }}>Email</Typography>
        <Typography sx={{ flex: 1, fontSize: '0.3rem', fontWeight: 600 }}>Status</Typography>
      </Box>
      {[1, 2, 3].map((i) => (
        <Box key={i} sx={{ display: 'flex', gap: 0.5, alignItems: 'center', py: 0.25 }}>
          <Checkbox size="small" sx={{ p: 0, width: 10, height: 10 }} />
          <Typography sx={{ flex: 2, fontSize: '0.3rem' }}>User {i}</Typography>
          <Typography sx={{ flex: 2, fontSize: '0.3rem', color: 'text.secondary' }}>user{i}@mail.com</Typography>
          <Chip label="Active" size="small" sx={{ height: 10, fontSize: '0.25rem' }} />
        </Box>
      ))}
    </Box>
  </Box>
)

const OnboardingPreview = () => (
  <Box sx={{ width: 400, backgroundColor: 'background.paper', borderRadius: 1, overflow: 'hidden', boxShadow: 1, p: 1 }}>
    {/* Stepper */}
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, mb: 1 }}>
      {[1, 2, 3, 4].map((step, i) => (
        <Box key={step} sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
          <Box
            sx={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              backgroundColor: i < 2 ? 'primary.main' : 'grey.300',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {i < 1 ? (
              <CheckIcon sx={{ fontSize: 10, color: 'white' }} />
            ) : (
              <Typography sx={{ fontSize: '0.35rem', color: i < 2 ? 'white' : 'text.secondary', fontWeight: 600 }}>{step}</Typography>
            )}
          </Box>
          {i < 3 && <Box sx={{ width: 20, height: 2, backgroundColor: i < 1 ? 'primary.main' : 'grey.300' }} />}
        </Box>
      ))}
    </Box>
    {/* Content */}
    <Box sx={{ textAlign: 'center', mb: 1 }}>
      <Typography sx={{ fontSize: '0.5rem', fontWeight: 700 }}>Set Up Your Profile</Typography>
      <Typography sx={{ fontSize: '0.35rem', color: 'text.secondary' }}>Tell us about yourself</Typography>
    </Box>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      <Box sx={{ backgroundColor: 'grey.100', height: 14, borderRadius: 0.5 }} />
      <Box sx={{ backgroundColor: 'grey.100', height: 14, borderRadius: 0.5 }} />
    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
      <Box sx={{ px: 1, py: 0.25, border: '1px solid', borderColor: 'divider', borderRadius: 0.5 }}>
        <Typography sx={{ fontSize: '0.35rem' }}>Back</Typography>
      </Box>
      <Box sx={{ px: 1, py: 0.25, backgroundColor: 'primary.main', borderRadius: 0.5 }}>
        <Typography sx={{ fontSize: '0.35rem', color: 'white' }}>Next</Typography>
      </Box>
    </Box>
  </Box>
)

const OnboardingV2Preview = () => (
  <Box sx={{ width: 400, backgroundColor: 'background.paper', borderRadius: 1, overflow: 'hidden', boxShadow: 1 }}>
    {/* Brand header with gradient */}
    <Box sx={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      p: 1,
      textAlign: 'center'
    }}>
      <Box sx={{
        width: 24,
        height: 24,
        borderRadius: '50%',
        backgroundColor: 'white',
        mx: 'auto',
        mb: 0.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Typography sx={{ fontSize: '0.4rem', fontWeight: 700, color: '#667eea' }}>GL</Typography>
      </Box>
      <Typography sx={{ fontSize: '0.4rem', fontWeight: 700, color: 'white' }}>GenAI Lens</Typography>
      <Typography sx={{ fontSize: '0.25rem', color: 'rgba(255,255,255,0.8)' }}>Welcome to your brand intelligence</Typography>
    </Box>
    {/* Steps indicator */}
    <Box sx={{ p: 0.75 }}>
      <Box sx={{ display: 'flex', gap: 0.5, mb: 0.75 }}>
        {['Brand', 'Competitors', 'Build'].map((step, i) => (
          <Box key={step} sx={{
            flex: 1,
            p: 0.5,
            borderRadius: 0.5,
            backgroundColor: i === 0 ? 'primary.light' : 'grey.100',
            textAlign: 'center'
          }}>
            <Typography sx={{
              fontSize: '0.25rem',
              fontWeight: 600,
              color: i === 0 ? 'primary.main' : 'text.secondary'
            }}>{step}</Typography>
          </Box>
        ))}
      </Box>
      {/* Checklist preview */}
      <Box sx={{ backgroundColor: 'grey.50', borderRadius: 0.5, p: 0.5 }}>
        {['acme.com', 'blog.acme.com', 'shop.acme.com'].map((url, i) => (
          <Box key={url} sx={{ display: 'flex', alignItems: 'center', gap: 0.25, mb: i < 2 ? 0.25 : 0 }}>
            <Box sx={{
              width: 10,
              height: 10,
              borderRadius: 0.25,
              border: 1,
              borderColor: i < 2 ? 'primary.main' : 'grey.400',
              backgroundColor: i < 2 ? 'primary.main' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {i < 2 && <CheckIcon sx={{ fontSize: 6, color: 'white' }} />}
            </Box>
            <Typography sx={{ fontSize: '0.25rem' }}>{url}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  </Box>
)

// Enterprise B2B template previews
const AnalyticsDashboardPreview = () => (
  <Box sx={{ width: 400, backgroundColor: 'grey.50', borderRadius: 1, overflow: 'hidden', boxShadow: 1, p: 1 }}>
    <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
      {[{ val: '$1.2M', label: 'Revenue', trend: '+12%' }, { val: '24.5K', label: 'Users', trend: '+8%' }].map((stat) => (
        <Box key={stat.label} sx={{ flex: 1, p: 0.5, backgroundColor: 'white', borderRadius: 0.5, boxShadow: 1 }}>
          <Typography sx={{ fontSize: '0.5rem', fontWeight: 700 }}>{stat.val}</Typography>
          <Typography sx={{ fontSize: '0.3rem', color: 'text.secondary' }}>{stat.label}</Typography>
          <Typography sx={{ fontSize: '0.25rem', color: 'success.main' }}>{stat.trend}</Typography>
        </Box>
      ))}
    </Box>
    <Box sx={{ backgroundColor: 'white', p: 0.5, borderRadius: 0.5, boxShadow: 1 }}>
      <Box sx={{ height: 40, display: 'flex', alignItems: 'flex-end', gap: 0.25 }}>
        {[40, 60, 35, 80, 55, 90, 45, 70].map((h, i) => (
          <Box key={i} sx={{ flex: 1, height: `${h}%`, backgroundColor: 'primary.main', borderRadius: '2px 2px 0 0', opacity: 0.7 + (i * 0.03) }} />
        ))}
      </Box>
    </Box>
  </Box>
)

const CollaborationHubPreview = () => (
  <Box sx={{ width: 400, display: 'flex', backgroundColor: 'background.paper', borderRadius: 1, overflow: 'hidden', boxShadow: 1 }}>
    <Box sx={{ width: 50, backgroundColor: 'grey.900', p: 0.5 }}>
      {['#general', '#design', '#eng'].map((ch, i) => (
        <Box key={ch} sx={{ p: 0.5, mb: 0.25, borderRadius: 0.5, backgroundColor: i === 0 ? 'primary.dark' : 'transparent' }}>
          <Typography sx={{ fontSize: '0.25rem', color: 'grey.300' }}>{ch}</Typography>
        </Box>
      ))}
    </Box>
    <Box sx={{ flex: 1, p: 0.5 }}>
      {[1, 2, 3].map((m) => (
        <Box key={m} sx={{ display: 'flex', gap: 0.5, mb: 0.5 }}>
          <Avatar sx={{ width: 14, height: 14, fontSize: '0.3rem' }}>U</Avatar>
          <Box sx={{ flex: 1, p: 0.5, backgroundColor: 'grey.100', borderRadius: 0.5 }}>
            <Typography sx={{ fontSize: '0.25rem' }}>Message content here...</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
)

const ReportingSystemPreview = () => (
  <Box sx={{ width: 400, display: 'flex', backgroundColor: 'grey.50', borderRadius: 1, overflow: 'hidden', boxShadow: 1 }}>
    <Box sx={{ width: 60, backgroundColor: 'white', p: 0.5, borderRight: '1px solid', borderColor: 'divider' }}>
      {['Sales', 'Marketing', 'Finance'].map((f, i) => (
        <Box key={f} sx={{ p: 0.5, mb: 0.25, borderRadius: 0.5, fontSize: '0.25rem', backgroundColor: i === 0 ? 'grey.100' : 'transparent' }}>{f}</Box>
      ))}
    </Box>
    <Box sx={{ flex: 1, p: 1 }}>
      <Typography sx={{ fontSize: '0.4rem', fontWeight: 700, mb: 0.5 }}>Sales Report</Typography>
      <Box sx={{ display: 'flex', gap: 0.5, mb: 0.5 }}>
        <Box sx={{ flex: 2, height: 30, backgroundColor: 'white', borderRadius: 0.5, boxShadow: 1, p: 0.5, display: 'flex', alignItems: 'flex-end', gap: 0.25 }}>
          {[40, 60, 35, 80, 55].map((h, i) => (
            <Box key={i} sx={{ flex: 1, height: `${h}%`, backgroundColor: 'primary.main', borderRadius: '2px 2px 0 0' }} />
          ))}
        </Box>
        <Box sx={{ flex: 1, height: 30, backgroundColor: 'white', borderRadius: 0.5, boxShadow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ width: 20, height: 20, borderRadius: '50%', background: 'conic-gradient(#0891B2 0% 60%, #E5E7EB 60% 100%)' }} />
        </Box>
      </Box>
    </Box>
  </Box>
)

const IntegrationMarketplacePreview = () => (
  <Box sx={{ width: 400, backgroundColor: 'grey.50', borderRadius: 1, overflow: 'hidden', boxShadow: 1, p: 1 }}>
    <Box sx={{ display: 'flex', gap: 0.5, mb: 0.5 }}>
      {['All', 'CRM', 'Marketing'].map((c, i) => (
        <Chip key={c} label={c} size="small" variant={i === 0 ? 'filled' : 'outlined'} sx={{ height: 14, fontSize: '0.25rem' }} />
      ))}
    </Box>
    <Box sx={{ display: 'flex', gap: 0.5 }}>
      {[{ name: 'Salesforce', color: '#0891B2' }, { name: 'HubSpot', color: '#A21CAF' }, { name: 'Slack', color: '#10B981' }].map((app) => (
        <Box key={app.name} sx={{ flex: 1, p: 0.5, backgroundColor: 'white', borderRadius: 0.5, boxShadow: 1, textAlign: 'center' }}>
          <Box sx={{ width: 16, height: 16, borderRadius: 0.5, backgroundColor: app.color, mx: 'auto', mb: 0.25 }} />
          <Typography sx={{ fontSize: '0.3rem', fontWeight: 600 }}>{app.name}</Typography>
          <Chip label="Connect" size="small" sx={{ height: 10, fontSize: '0.2rem', mt: 0.25 }} />
        </Box>
      ))}
    </Box>
  </Box>
)

const AuditLogPreview = () => (
  <Box sx={{ width: 400, backgroundColor: 'background.paper', borderRadius: 1, overflow: 'hidden', boxShadow: 1 }}>
    <Box sx={{ p: 0.5, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <HistoryIcon sx={{ fontSize: 12 }} />
      <Typography sx={{ fontSize: '0.4rem', fontWeight: 700 }}>Audit Log</Typography>
    </Box>
    {[{ action: 'User Login', status: 'success' }, { action: 'Record Updated', status: 'success' }, { action: 'Failed Login', status: 'error' }].map((log, i) => (
      <Box key={i} sx={{ p: 0.5, display: 'flex', alignItems: 'center', gap: 0.5, borderBottom: i < 2 ? '1px solid' : 'none', borderColor: 'divider' }}>
        <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: log.status === 'success' ? 'success.main' : 'error.main' }} />
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontSize: '0.3rem', fontWeight: 500 }}>{log.action}</Typography>
          <Typography sx={{ fontSize: '0.25rem', color: 'text.secondary' }}>2 min ago</Typography>
        </Box>
      </Box>
    ))}
  </Box>
)

const BulkDataPreview = () => (
  <Box sx={{ width: 400, backgroundColor: 'background.paper', borderRadius: 1, overflow: 'hidden', boxShadow: 1, p: 1 }}>
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, mb: 1 }}>
      {[1, 2, 3, 4].map((step, i) => (
        <Box key={step} sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: i < 2 ? 'primary.main' : 'grey.300', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ fontSize: '0.25rem', color: 'white' }}>{step}</Typography>
          </Box>
          {i < 3 && <Box sx={{ width: 16, height: 2, backgroundColor: i < 1 ? 'primary.main' : 'grey.300' }} />}
        </Box>
      ))}
    </Box>
    <Box sx={{ border: '2px dashed', borderColor: 'grey.300', borderRadius: 0.5, p: 1, textAlign: 'center' }}>
      <CloudUploadIcon sx={{ fontSize: 20, color: 'text.secondary', mb: 0.25 }} />
      <Typography sx={{ fontSize: '0.35rem', color: 'text.secondary' }}>Drop files here</Typography>
    </Box>
  </Box>
)

// New Enterprise B2B template previews
const DocumentManagementPreview = () => (
  <Box sx={{ width: 400, display: 'flex', backgroundColor: 'grey.50', borderRadius: 1, overflow: 'hidden', boxShadow: 1 }}>
    <Box sx={{ width: 60, backgroundColor: 'white', p: 0.5, borderRight: '1px solid', borderColor: 'divider' }}>
      {['My Docs', 'Recent', 'Shared'].map((f, i) => (
        <Box key={f} sx={{ p: 0.5, mb: 0.25, borderRadius: 0.5, fontSize: '0.25rem', backgroundColor: i === 0 ? 'primary.light' : 'transparent', color: i === 0 ? 'primary.main' : 'text.secondary' }}>{f}</Box>
      ))}
      <Box sx={{ mt: 0.5, pt: 0.5, borderTop: '1px solid', borderColor: 'divider' }}>
        {['Product', 'Marketing'].map((folder) => (
          <Box key={folder} sx={{ display: 'flex', alignItems: 'center', gap: 0.25, p: 0.25, fontSize: '0.25rem' }}>
            <FolderIcon sx={{ fontSize: 8, color: '#FFA000' }} />
            {folder}
          </Box>
        ))}
      </Box>
    </Box>
    <Box sx={{ flex: 1, p: 0.5 }}>
      {[{ name: 'Q4 Roadmap.pdf', type: 'pdf' }, { name: 'API Guide.docx', type: 'doc' }, { name: 'Report.xlsx', type: 'excel' }].map((file, i) => (
        <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, p: 0.5, mb: 0.25, backgroundColor: 'white', borderRadius: 0.5, boxShadow: 1 }}>
          <Box sx={{ width: 12, height: 12, borderRadius: 0.25, backgroundColor: file.type === 'pdf' ? '#E53935' : file.type === 'doc' ? '#1976D2' : '#2E7D32', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ fontSize: '0.2rem', color: 'white', fontWeight: 700 }}>{file.type.charAt(0).toUpperCase()}</Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: '0.3rem', fontWeight: 500 }}>{file.name}</Typography>
          </Box>
          <Chip label="v3" size="small" variant="outlined" sx={{ height: 10, fontSize: '0.2rem' }} />
        </Box>
      ))}
    </Box>
  </Box>
)

const ApprovalWorkflowPreview = () => (
  <Box sx={{ width: 400, backgroundColor: 'grey.50', borderRadius: 1, overflow: 'hidden', boxShadow: 1, p: 1 }}>
    <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
      {[{ val: '8', label: 'Pending', color: 'warning.main' }, { val: '24', label: 'Approved', color: 'success.main' }].map((stat) => (
        <Box key={stat.label} sx={{ flex: 1, p: 0.5, backgroundColor: 'white', borderRadius: 0.5, boxShadow: 1, textAlign: 'center' }}>
          <Typography sx={{ fontSize: '0.5rem', fontWeight: 700, color: stat.color }}>{stat.val}</Typography>
          <Typography sx={{ fontSize: '0.25rem', color: 'text.secondary' }}>{stat.label}</Typography>
        </Box>
      ))}
    </Box>
    <Box sx={{ backgroundColor: 'white', borderRadius: 0.5, boxShadow: 1, p: 0.5 }}>
      {[{ title: 'Marketing Budget', step: '2/3' }, { title: 'PTO Request', step: '1/2' }].map((req, i) => (
        <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, p: 0.5, borderBottom: i < 1 ? '1px solid' : 'none', borderColor: 'divider' }}>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: '0.3rem', fontWeight: 500 }}>{req.title}</Typography>
          </Box>
          <LinearProgress variant="determinate" value={i === 0 ? 66 : 50} sx={{ width: 30, height: 4, borderRadius: 2 }} />
          <Typography sx={{ fontSize: '0.25rem', color: 'text.secondary' }}>{req.step}</Typography>
        </Box>
      ))}
    </Box>
  </Box>
)

const NotificationCenterPreview = () => (
  <Box sx={{ width: 400, display: 'flex', backgroundColor: 'background.paper', borderRadius: 1, overflow: 'hidden', boxShadow: 1 }}>
    <Box sx={{ width: 50, backgroundColor: 'grey.50', p: 0.5 }}>
      {[{ label: 'All', count: 12 }, { label: 'Unread', count: 5 }].map((filter, i) => (
        <Box key={filter.label} sx={{ p: 0.5, mb: 0.25, borderRadius: 0.5, backgroundColor: i === 0 ? 'primary.light' : 'transparent', fontSize: '0.25rem', display: 'flex', justifyContent: 'space-between' }}>
          <span>{filter.label}</span>
          <Badge badgeContent={filter.count} color="primary" sx={{ '& .MuiBadge-badge': { fontSize: '0.2rem', minWidth: 10, height: 10 } }} />
        </Box>
      ))}
    </Box>
    <Box sx={{ flex: 1, p: 0.5 }}>
      {[{ type: 'mention', msg: 'Sarah mentioned you', unread: true }, { type: 'approval', msg: 'Expense approved', unread: true }, { type: 'system', msg: 'Build completed', unread: false }].map((notif, i) => (
        <Box key={i} sx={{ display: 'flex', gap: 0.5, p: 0.5, mb: 0.25, borderRadius: 0.5, backgroundColor: notif.unread ? 'primary.50' : 'transparent', borderLeft: notif.unread ? 3 : 0, borderColor: 'primary.main' }}>
          <Avatar sx={{ width: 14, height: 14, fontSize: '0.25rem', backgroundColor: notif.type === 'mention' ? 'primary.main' : notif.type === 'approval' ? 'success.main' : 'grey.500' }}>
            {notif.type.charAt(0).toUpperCase()}
          </Avatar>
          <Typography sx={{ fontSize: '0.3rem', fontWeight: notif.unread ? 600 : 400 }}>{notif.msg}</Typography>
        </Box>
      ))}
    </Box>
  </Box>
)

const ActivityFeedPreview = () => (
  <Box sx={{ width: 400, display: 'flex', backgroundColor: 'background.paper', borderRadius: 1, overflow: 'hidden', boxShadow: 1 }}>
    <Box sx={{ width: 50, backgroundColor: 'grey.50', p: 0.5 }}>
      {[{ label: 'All', active: true }, { label: 'Mentions' }, { label: 'Tasks' }].map((tab) => (
        <Box key={tab.label} sx={{ p: 0.5, mb: 0.25, borderRadius: 0.5, backgroundColor: tab.active ? 'primary.light' : 'transparent', fontSize: '0.25rem', color: tab.active ? 'primary.main' : 'text.secondary' }}>{tab.label}</Box>
      ))}
    </Box>
    <Box sx={{ flex: 1, p: 0.5 }}>
      {[{ user: 'SC', msg: 'mentioned you in Q4 Plan', unread: true }, { user: 'MR', msg: 'assigned you a task', unread: true }, { user: 'EW', msg: 'commented on design', unread: false }].map((activity, i) => (
        <Box key={i} sx={{ display: 'flex', gap: 0.5, p: 0.5, mb: 0.25, borderRadius: 0.5, backgroundColor: activity.unread ? 'primary.50' : 'transparent' }}>
          <Avatar sx={{ width: 14, height: 14, fontSize: '0.25rem' }}>{activity.user}</Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: '0.3rem', fontWeight: activity.unread ? 600 : 400 }}>{activity.msg}</Typography>
            <Typography sx={{ fontSize: '0.2rem', color: 'text.secondary' }}>2m ago</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
)

const EmailCampaignPreview = () => (
  <Box sx={{ width: 400, display: 'flex', backgroundColor: 'grey.50', borderRadius: 1, overflow: 'hidden', boxShadow: 1 }}>
    <Box sx={{ width: 50, backgroundColor: 'white', p: 0.5, borderRight: '1px solid', borderColor: 'divider' }}>
      {['Text', 'Image', 'Button'].map((comp) => (
        <Box key={comp} sx={{ p: 0.5, mb: 0.25, borderRadius: 0.5, backgroundColor: 'grey.100', fontSize: '0.25rem', textAlign: 'center' }}>{comp}</Box>
      ))}
    </Box>
    <Box sx={{ flex: 1, p: 0.5 }}>
      <Box sx={{ backgroundColor: 'white', borderRadius: 0.5, boxShadow: 1, p: 0.5 }}>
        <Box sx={{ height: 20, backgroundColor: 'primary.main', borderRadius: 0.25, mb: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography sx={{ fontSize: '0.3rem', color: 'white', fontWeight: 600 }}>Newsletter Header</Typography>
        </Box>
        <Typography sx={{ fontSize: '0.25rem', mb: 0.5 }}>Hello {'{{name}}'},</Typography>
        <Box sx={{ height: 16, backgroundColor: 'grey.200', borderRadius: 0.25, mb: 0.5 }} />
        <Box sx={{ height: 12, backgroundColor: 'primary.main', borderRadius: 0.25, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography sx={{ fontSize: '0.2rem', color: 'white' }}>CTA</Typography>
        </Box>
      </Box>
    </Box>
  </Box>
)

const GoalTrackingPreview = () => (
  <Box sx={{ width: 400, backgroundColor: 'grey.50', borderRadius: 1, overflow: 'hidden', boxShadow: 1, p: 1 }}>
    <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
      {[{ val: '3', label: 'On Track', color: 'success.main' }, { val: '1', label: 'At Risk', color: 'warning.main' }, { val: '1', label: 'Behind', color: 'error.main' }].map((stat) => (
        <Box key={stat.label} sx={{ flex: 1, p: 0.5, backgroundColor: 'white', borderRadius: 0.5, boxShadow: 1, textAlign: 'center' }}>
          <Typography sx={{ fontSize: '0.5rem', fontWeight: 700, color: stat.color }}>{stat.val}</Typography>
          <Typography sx={{ fontSize: '0.2rem', color: 'text.secondary' }}>{stat.label}</Typography>
        </Box>
      ))}
    </Box>
    <Box sx={{ backgroundColor: 'white', borderRadius: 0.5, boxShadow: 1, p: 0.5 }}>
      {[{ title: 'Increase Retention', progress: 72 }, { title: 'Launch Mobile V2', progress: 45 }].map((goal, i) => (
        <Box key={i} sx={{ p: 0.5, borderBottom: i < 1 ? '1px solid' : 'none', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.25 }}>
            <Typography sx={{ fontSize: '0.3rem', fontWeight: 500 }}>{goal.title}</Typography>
            <Typography sx={{ fontSize: '0.25rem', color: 'text.secondary' }}>{goal.progress}%</Typography>
          </Box>
          <LinearProgress variant="determinate" value={goal.progress} sx={{ height: 4, borderRadius: 2 }} color={goal.progress >= 70 ? 'success' : 'warning'} />
        </Box>
      ))}
    </Box>
  </Box>
)

const FormBuilderPreview = () => (
  <Box sx={{ width: 400, display: 'flex', backgroundColor: 'grey.50', borderRadius: 1, overflow: 'hidden', boxShadow: 1 }}>
    <Box sx={{ width: 50, backgroundColor: 'white', p: 0.5, borderRight: '1px solid', borderColor: 'divider' }}>
      {['Text', 'Email', 'Select', 'File'].map((field) => (
        <Box key={field} sx={{ p: 0.5, mb: 0.25, borderRadius: 0.5, backgroundColor: 'grey.100', fontSize: '0.25rem', textAlign: 'center' }}>{field}</Box>
      ))}
    </Box>
    <Box sx={{ flex: 1, p: 0.5 }}>
      <Box sx={{ backgroundColor: 'white', borderRadius: 0.5, boxShadow: 1, p: 0.5 }}>
        {[{ label: 'Full Name', required: true }, { label: 'Email', required: true }, { label: 'Message', required: false }].map((field, i) => (
          <Box key={i} sx={{ mb: 0.5, p: 0.5, border: '1px dashed', borderColor: 'grey.300', borderRadius: 0.5 }}>
            <Typography sx={{ fontSize: '0.25rem', color: 'text.secondary', mb: 0.25 }}>{field.label} {field.required && '*'}</Typography>
            <Box sx={{ height: 10, backgroundColor: 'grey.100', borderRadius: 0.25 }} />
          </Box>
        ))}
        <Box sx={{ height: 14, backgroundColor: 'primary.main', borderRadius: 0.25, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography sx={{ fontSize: '0.25rem', color: 'white' }}>Submit</Typography>
        </Box>
      </Box>
    </Box>
  </Box>
)

const InventoryManagementPreview = () => (
  <Box sx={{ width: 400, backgroundColor: 'background.paper', borderRadius: 1, overflow: 'hidden', boxShadow: 1 }}>
    <Box sx={{ p: 0.5, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Inventory2Icon sx={{ fontSize: 12, color: 'primary.main' }} />
      <Typography sx={{ fontSize: '0.4rem', fontWeight: 700 }}>Inventory</Typography>
      <Box sx={{ flex: 1 }} />
      <Chip label="3 Low Stock" size="small" sx={{ height: 12, fontSize: '0.2rem' }} />
    </Box>
    <Box sx={{ p: 0.5 }}>
      {[{ sku: 'SKU-001', name: 'Widget Pro', stock: 45, status: 'low' }, { sku: 'SKU-002', name: 'Gadget Plus', stock: 230, status: 'ok' }, { sku: 'SKU-003', name: 'Component Kit', stock: 12, status: 'critical' }].map((item, i) => (
        <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, p: 0.5, borderBottom: i < 2 ? '1px solid' : 'none', borderColor: 'divider' }}>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: '0.3rem', fontWeight: 500 }}>{item.name}</Typography>
            <Typography sx={{ fontSize: '0.2rem', color: 'text.secondary' }}>{item.sku}</Typography>
          </Box>
          <Box sx={{ width: 40 }}>
            <LinearProgress variant="determinate" value={item.status === 'ok' ? 80 : item.status === 'low' ? 40 : 15} sx={{ height: 4, borderRadius: 2 }} color={item.status === 'ok' ? 'success' : item.status === 'low' ? 'warning' : 'error'} />
          </Box>
          <Typography sx={{ fontSize: '0.25rem', width: 20, textAlign: 'right' }}>{item.stock}</Typography>
        </Box>
      ))}
    </Box>
  </Box>
)

const CustomerPortalPreview = () => (
  <Box sx={{ width: 400, display: 'flex', backgroundColor: 'background.paper', borderRadius: 1, overflow: 'hidden', boxShadow: 1 }}>
    <Box sx={{ width: 60, backgroundColor: 'grey.50', p: 0.5, borderRight: '1px solid', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25, mb: 0.5 }}>
        <Avatar sx={{ width: 16, height: 16, fontSize: '0.25rem' }}>AC</Avatar>
        <Typography sx={{ fontSize: '0.25rem', fontWeight: 600 }}>Acme</Typography>
      </Box>
      {['Dashboard', 'Billing', 'Support', 'Settings'].map((nav, i) => (
        <Box key={nav} sx={{ p: 0.5, mb: 0.25, borderRadius: 0.5, backgroundColor: i === 0 ? 'primary.light' : 'transparent', fontSize: '0.25rem', color: i === 0 ? 'primary.main' : 'text.secondary' }}>{nav}</Box>
      ))}
    </Box>
    <Box sx={{ flex: 1, p: 0.5 }}>
      <Typography sx={{ fontSize: '0.35rem', fontWeight: 600, mb: 0.5 }}>Welcome back!</Typography>
      <Box sx={{ display: 'flex', gap: 0.5, mb: 0.5 }}>
        {[{ val: 'Enterprise', label: 'Plan' }, { val: '2', label: 'Tickets' }].map((stat) => (
          <Box key={stat.label} sx={{ flex: 1, p: 0.5, backgroundColor: 'grey.50', borderRadius: 0.5 }}>
            <Typography sx={{ fontSize: '0.35rem', fontWeight: 700 }}>{stat.val}</Typography>
            <Typography sx={{ fontSize: '0.2rem', color: 'text.secondary' }}>{stat.label}</Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ p: 0.5, backgroundColor: 'grey.50', borderRadius: 0.5 }}>
        <Typography sx={{ fontSize: '0.25rem', color: 'text.secondary', mb: 0.25 }}>API Usage</Typography>
        <LinearProgress variant="determinate" value={85} sx={{ height: 4, borderRadius: 2 }} />
      </Box>
    </Box>
  </Box>
)

const TeamDirectoryPreview = () => (
  <Box sx={{ width: 400, display: 'flex', backgroundColor: 'background.paper', borderRadius: 1, overflow: 'hidden', boxShadow: 1 }}>
    <Box sx={{ flex: 1, p: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
        <SearchIcon sx={{ fontSize: 10, color: 'text.secondary' }} />
        <Box sx={{ flex: 1, height: 12, backgroundColor: 'grey.100', borderRadius: 0.5 }} />
      </Box>
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        {[1, 2, 3].map((i) => (
          <Box key={i} sx={{ flex: 1, p: 0.5, backgroundColor: 'grey.50', borderRadius: 0.5, textAlign: 'center' }}>
            <Avatar sx={{ width: 20, height: 20, mx: 'auto', mb: 0.25, fontSize: '0.35rem' }}>U</Avatar>
            <Typography sx={{ fontSize: '0.25rem', fontWeight: 600 }}>User {i}</Typography>
            <Typography sx={{ fontSize: '0.2rem', color: 'text.secondary' }}>Engineer</Typography>
          </Box>
        ))}
      </Box>
    </Box>
    <Box sx={{ width: 80, backgroundColor: 'grey.50', p: 0.5, borderLeft: '1px solid', borderColor: 'divider' }}>
      <Typography sx={{ fontSize: '0.25rem', fontWeight: 600, mb: 0.5 }}>Org Chart</Typography>
      {[1, 2, 3].map((level) => (
        <Box key={level} sx={{ display: 'flex', alignItems: 'center', gap: 0.25, ml: (level - 1) * 0.5, mb: 0.25 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'primary.main' }} />
          <Box sx={{ height: 6, flex: 1, backgroundColor: 'grey.200', borderRadius: 0.25 }} />
        </Box>
      ))}
    </Box>
  </Box>
)

const SubscriptionBillingPreview = () => (
  <Box sx={{ width: 400, backgroundColor: 'grey.50', borderRadius: 1, overflow: 'hidden', boxShadow: 1, p: 1 }}>
    <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
      {[{ val: '$12.5K', label: 'MRR', color: 'primary.main' }, { val: '$150K', label: 'ARR', color: 'success.main' }, { val: '2.1%', label: 'Churn', color: 'error.main' }].map((stat) => (
        <Box key={stat.label} sx={{ flex: 1, p: 0.5, backgroundColor: 'white', borderRadius: 0.5, boxShadow: 1, textAlign: 'center' }}>
          <Typography sx={{ fontSize: '0.4rem', fontWeight: 700, color: stat.color }}>{stat.val}</Typography>
          <Typography sx={{ fontSize: '0.2rem', color: 'text.secondary' }}>{stat.label}</Typography>
        </Box>
      ))}
    </Box>
    <Box sx={{ backgroundColor: 'white', borderRadius: 0.5, boxShadow: 1 }}>
      {[{ name: 'Acme Corp', plan: 'Enterprise', status: 'active' }, { name: 'TechStart', plan: 'Pro', status: 'trial' }].map((sub, i) => (
        <Box key={i} sx={{ display: 'flex', alignItems: 'center', p: 0.5, borderBottom: i < 1 ? '1px solid' : 'none', borderColor: 'divider' }}>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: '0.3rem', fontWeight: 500 }}>{sub.name}</Typography>
            <Typography sx={{ fontSize: '0.2rem', color: 'text.secondary' }}>{sub.plan}</Typography>
          </Box>
          <Chip label={sub.status} size="small" sx={{ height: 10, fontSize: '0.2rem' }} />
        </Box>
      ))}
    </Box>
  </Box>
)

const KnowledgeBasePreview = () => (
  <Box sx={{ width: 400, display: 'flex', backgroundColor: 'background.paper', borderRadius: 1, overflow: 'hidden', boxShadow: 1 }}>
    <Box sx={{ width: 70, backgroundColor: 'grey.50', p: 0.5, borderRight: '1px solid', borderColor: 'divider' }}>
      <Typography sx={{ fontSize: '0.25rem', fontWeight: 600, mb: 0.5 }}>Categories</Typography>
      {['Getting Started', 'Billing', 'Features'].map((cat, i) => (
        <Box key={cat} sx={{ p: 0.5, mb: 0.25, borderRadius: 0.5, backgroundColor: i === 0 ? 'primary.light' : 'transparent', fontSize: '0.2rem', color: i === 0 ? 'primary.main' : 'text.secondary' }}>{cat}</Box>
      ))}
    </Box>
    <Box sx={{ flex: 1, p: 0.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
        <SearchIcon sx={{ fontSize: 10, color: 'text.secondary' }} />
        <Box sx={{ flex: 1, height: 12, backgroundColor: 'grey.100', borderRadius: 0.5 }} />
      </Box>
      {['Quick Start Guide', 'Payment Methods', 'API Documentation'].map((article, i) => (
        <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, p: 0.5, mb: 0.25, borderRadius: 0.5, backgroundColor: 'grey.50' }}>
          <ArticleIcon sx={{ fontSize: 10, color: 'text.secondary' }} />
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: '0.25rem', fontWeight: 500 }}>{article}</Typography>
            <Typography sx={{ fontSize: '0.2rem', color: 'text.secondary' }}>1.2K views</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
)

const TimesheetPreview = () => (
  <Box sx={{ width: 400, backgroundColor: 'background.paper', borderRadius: 1, overflow: 'hidden', boxShadow: 1 }}>
    <Box sx={{ p: 0.5, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography sx={{ fontSize: '0.4rem', fontWeight: 700 }}>Timesheet</Typography>
      <Box sx={{ display: 'flex', gap: 0.25 }}>
        <Box sx={{ px: 0.5, py: 0.25, backgroundColor: 'success.light', borderRadius: 0.25 }}>
          <Typography sx={{ fontSize: '0.2rem', color: 'success.dark' }}>40h</Typography>
        </Box>
      </Box>
    </Box>
    <Box sx={{ p: 0.5 }}>
      <Box sx={{ display: 'flex', mb: 0.25, pb: 0.25, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography sx={{ width: 50, fontSize: '0.25rem', fontWeight: 600 }}>Project</Typography>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
          <Typography key={day} sx={{ flex: 1, fontSize: '0.2rem', textAlign: 'center', color: 'text.secondary' }}>{day}</Typography>
        ))}
      </Box>
      {[{ name: 'Feature Dev', hours: [8, 8, 4, 8, 8] }, { name: 'Bug Fixes', hours: [0, 0, 4, 0, 0] }].map((row, i) => (
        <Box key={i} sx={{ display: 'flex', alignItems: 'center', py: 0.25 }}>
          <Typography sx={{ width: 50, fontSize: '0.25rem' }}>{row.name}</Typography>
          {row.hours.map((h, j) => (
            <Box key={j} sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ width: 14, height: 10, backgroundColor: h > 0 ? 'primary.light' : 'grey.100', borderRadius: 0.25, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography sx={{ fontSize: '0.2rem', color: h > 0 ? 'primary.main' : 'text.disabled' }}>{h}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  </Box>
)

const ResourceBookingPreview = () => (
  <Box sx={{ width: 400, display: 'flex', backgroundColor: 'background.paper', borderRadius: 1, overflow: 'hidden', boxShadow: 1 }}>
    <Box sx={{ width: 60, backgroundColor: 'grey.50', p: 0.5, borderRight: '1px solid', borderColor: 'divider' }}>
      {['Rooms', 'Desks', 'Equipment'].map((type, i) => (
        <Box key={type} sx={{ p: 0.5, mb: 0.25, borderRadius: 0.5, backgroundColor: i === 0 ? 'primary.light' : 'transparent', fontSize: '0.25rem', color: i === 0 ? 'primary.main' : 'text.secondary' }}>{type}</Box>
      ))}
    </Box>
    <Box sx={{ flex: 1, p: 0.5 }}>
      <Box sx={{ display: 'flex', mb: 0.25, pb: 0.25, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography sx={{ width: 40, fontSize: '0.2rem', fontWeight: 600 }}>Room</Typography>
        {['M', 'Tu', 'W', 'Th', 'F'].map((day) => (
          <Box key={day} sx={{ flex: 1, textAlign: 'center', fontSize: '0.2rem', color: 'text.secondary' }}>{day.charAt(0)}</Box>
        ))}
      </Box>
      {['Conf A', 'Board'].map((room, i) => (
        <Box key={room} sx={{ display: 'flex', alignItems: 'center', py: 0.25 }}>
          <Typography sx={{ width: 40, fontSize: '0.2rem' }}>{room}</Typography>
          {[1, 2, 3, 4, 5].map((d) => (
            <Box key={d} sx={{ flex: 1, px: 0.125 }}>
              <Box sx={{ height: 10, borderRadius: 0.25, backgroundColor: (i + d) % 3 === 0 ? 'primary.main' : 'grey.100' }} />
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  </Box>
)

const SurveyBuilderPreview = () => (
  <Box sx={{ width: 400, display: 'flex', backgroundColor: 'grey.50', borderRadius: 1, overflow: 'hidden', boxShadow: 1 }}>
    <Box sx={{ width: 50, backgroundColor: 'white', p: 0.5, borderRight: '1px solid', borderColor: 'divider' }}>
      {['Text', 'Choice', 'Scale'].map((type) => (
        <Box key={type} sx={{ p: 0.5, mb: 0.25, borderRadius: 0.5, backgroundColor: 'grey.100', fontSize: '0.2rem', textAlign: 'center' }}>{type}</Box>
      ))}
    </Box>
    <Box sx={{ flex: 1, p: 0.5 }}>
      <Box sx={{ backgroundColor: 'white', borderRadius: 0.5, boxShadow: 1, p: 0.5, mb: 0.5 }}>
        <Typography sx={{ fontSize: '0.25rem', fontWeight: 600, mb: 0.5 }}>Q1: How satisfied are you?</Typography>
        {['Very Satisfied', 'Satisfied', 'Neutral'].map((opt, i) => (
          <Box key={opt} sx={{ display: 'flex', alignItems: 'center', gap: 0.25, mb: 0.25 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', border: 1, borderColor: i === 0 ? 'primary.main' : 'grey.400', backgroundColor: i === 0 ? 'primary.main' : 'transparent' }} />
            <Typography sx={{ fontSize: '0.2rem' }}>{opt}</Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ backgroundColor: 'white', borderRadius: 0.5, boxShadow: 1, p: 0.5 }}>
        <Typography sx={{ fontSize: '0.25rem', fontWeight: 600, mb: 0.25 }}>Q2: Rate your experience</Typography>
        <Box sx={{ display: 'flex', gap: 0.25 }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Box key={star} sx={{ color: star <= 4 ? '#F59E0B' : 'grey.300', fontSize: '0.4rem' }}>★</Box>
          ))}
        </Box>
      </Box>
    </Box>
  </Box>
)

const MultiTenantPreview = () => (
  <Box sx={{ width: 400, backgroundColor: 'grey.50', borderRadius: 1, overflow: 'hidden', boxShadow: 1, p: 1 }}>
    <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
      {[{ val: '127', label: 'Tenants' }, { val: '4.2K', label: 'Users' }, { val: '$89K', label: 'MRR' }].map((stat) => (
        <Box key={stat.label} sx={{ flex: 1, p: 0.5, backgroundColor: 'white', borderRadius: 0.5, boxShadow: 1, textAlign: 'center' }}>
          <Typography sx={{ fontSize: '0.4rem', fontWeight: 700, color: 'primary.main' }}>{stat.val}</Typography>
          <Typography sx={{ fontSize: '0.2rem', color: 'text.secondary' }}>{stat.label}</Typography>
        </Box>
      ))}
    </Box>
    <Box sx={{ backgroundColor: 'white', borderRadius: 0.5, boxShadow: 1 }}>
      {[{ name: 'Acme Corp', plan: 'Enterprise', status: 'active' }, { name: 'TechStart', plan: 'Pro', status: 'trial' }].map((tenant, i) => (
        <Box key={i} sx={{ display: 'flex', alignItems: 'center', p: 0.5, borderBottom: i < 1 ? '1px solid' : 'none', borderColor: 'divider' }}>
          <Box sx={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: 'primary.main', mr: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ fontSize: '0.2rem', color: 'white' }}>{tenant.name.charAt(0)}</Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: '0.25rem', fontWeight: 500 }}>{tenant.name}</Typography>
          </Box>
          <Chip label={tenant.plan} size="small" sx={{ height: 10, fontSize: '0.15rem', mr: 0.25 }} />
          <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: tenant.status === 'active' ? 'success.main' : 'warning.main' }} />
        </Box>
      ))}
    </Box>
  </Box>
)

function TemplatesPage() {
  const templates = [
    {
      name: 'Activity Feed',
      path: '/templates/activity-feed',
      description: 'Unified activity feed with real-time updates, filtering, and notification settings.',
      tags: ['Notifications', 'Activity', 'Feed'],
      preview: <ActivityFeedPreview />,
    },
    {
      name: 'Analytics Dashboard',
      path: '/templates/analytics-dashboard',
      description: 'Customizable analytics dashboard with KPIs, charts, and drill-down capabilities.',
      tags: ['KPIs', 'Charts', 'Widgets'],
      preview: <AnalyticsDashboardPreview />,
    },
    {
      name: 'Approval Workflows',
      path: '/templates/approval-workflow',
      description: 'Configurable multi-step approval workflows for expenses, PTO, and purchases.',
      tags: ['Approvals', 'Workflows', 'SLA'],
      preview: <ApprovalWorkflowPreview />,
    },
    {
      name: 'Audit Log & Compliance',
      path: '/templates/audit-log',
      description: 'Comprehensive audit logging with filtering, alerts, and compliance reports.',
      tags: ['Audit', 'Compliance', 'Security'],
      preview: <AuditLogPreview />,
    },
    {
      name: 'Authentication Flow',
      path: '/templates/auth',
      description: 'Pre-built login, signup, and password reset pages with form validation.',
      tags: ['Login', 'Signup', 'Forms'],
      preview: <AuthPreview />,
    },
    {
      name: 'Blog/Content Layout',
      path: '/templates/blog',
      description: 'Article listing and detail pages with rich typography and comments.',
      tags: ['Articles', 'Typography', 'Comments'],
      preview: <BlogPreview />,
    },
    {
      name: 'Bulk Data Management',
      path: '/templates/bulk-data',
      description: 'Advanced import/export with validation, mapping, and transformation.',
      tags: ['Import', 'Export', 'CSV'],
      preview: <BulkDataPreview />,
    },
    {
      name: 'Collaboration Hub',
      path: '/templates/collaboration-hub',
      description: 'Team collaboration space with channels, messaging, tasks, and file sharing.',
      tags: ['Chat', 'Tasks', 'Files'],
      preview: <CollaborationHubPreview />,
    },
    {
      name: 'Customer Portal',
      path: '/templates/customer-portal',
      description: 'Self-service customer portal with billing, support tickets, and usage metrics.',
      tags: ['Portal', 'Self-Service', 'Billing'],
      preview: <CustomerPortalPreview />,
    },
    {
      name: 'Dashboard Layout',
      path: '/templates/dashboard',
      description: 'Admin dashboard with sidebar navigation, data widgets, charts, and analytics.',
      tags: ['Sidebar', 'Charts', 'Widgets'],
      preview: <DashboardPreview />,
    },
    {
      name: 'Data Table View',
      path: '/templates/data-table',
      description: 'Advanced data table with sorting, filtering, pagination, and bulk actions.',
      tags: ['Table', 'Filters', 'Pagination'],
      preview: <DataTablePreview />,
    },
    {
      name: 'Document Management',
      path: '/templates/document-management',
      description: 'Centralized document repository with version control, sharing, and collaborative editing.',
      tags: ['Files', 'Versions', 'Sharing'],
      preview: <DocumentManagementPreview />,
    },
    {
      name: 'E-commerce Catalog',
      path: '/templates/ecommerce',
      description: 'Product listing and detail pages with filters, cart, and checkout flow.',
      tags: ['Products', 'Cart', 'Filters'],
      preview: <EcommercePreview />,
    },
    {
      name: 'Email Campaigns',
      path: '/templates/email-campaign',
      description: 'Drag-and-drop email builder with templates, A/B testing, and analytics.',
      tags: ['Email', 'Marketing', 'Templates'],
      preview: <EmailCampaignPreview />,
    },
    {
      name: 'Form Builder',
      path: '/templates/form-builder',
      description: 'Drag-and-drop form builder with field types, validation, and submissions.',
      tags: ['Forms', 'Builder', 'Submissions'],
      preview: <FormBuilderPreview />,
    },
    {
      name: 'Goals & OKRs',
      path: '/templates/goal-tracking',
      description: 'Goal and key results tracking with progress, check-ins, and team alignment.',
      tags: ['OKRs', 'Goals', 'Progress'],
      preview: <GoalTrackingPreview />,
    },
    {
      name: 'Integration Marketplace',
      path: '/templates/integration-marketplace',
      description: 'Self-service integration marketplace with pre-built connectors and OAuth.',
      tags: ['APIs', 'OAuth', 'Sync'],
      preview: <IntegrationMarketplacePreview />,
    },
    {
      name: 'Inventory Management',
      path: '/templates/inventory-management',
      description: 'Product inventory tracking with stock levels, alerts, and purchase orders.',
      tags: ['Inventory', 'Stock', 'Orders'],
      preview: <InventoryManagementPreview />,
    },
    {
      name: 'Knowledge Base',
      path: '/templates/knowledge-base',
      description: 'Self-service documentation with article editor, categories, and analytics.',
      tags: ['Docs', 'Help Center', 'Articles'],
      preview: <KnowledgeBasePreview />,
    },
    {
      name: 'Multi-Tenant Admin',
      path: '/templates/multi-tenant',
      description: 'Manage organizations, usage quotas, billing, and platform settings.',
      tags: ['Tenants', 'Admin', 'SaaS'],
      preview: <MultiTenantPreview />,
    },
    {
      name: 'Notification Center',
      path: '/templates/notification-center',
      description: 'Centralized notification hub with filtering, preferences, and activity feed.',
      tags: ['Alerts', 'Activity', 'Settings'],
      preview: <NotificationCenterPreview />,
    },
    {
      name: 'Onboarding Wizard',
      path: '/templates/onboarding',
      description: 'Multi-step wizard with progress indication and form validation.',
      tags: ['Wizard', 'Stepper', 'Forms'],
      preview: <OnboardingPreview />,
    },
    {
      name: 'Onboarding V2 (GenAI Lens)',
      path: '/templates/onboarding-v2',
      description: 'GenAI Lens onboarding flow with brand detection, competitor selection, and AI lens generation.',
      tags: ['AI', 'Brand', 'Onboarding'],
      preview: <OnboardingV2Preview />,
    },
    {
      name: 'Report Builder',
      path: '/templates/reporting-system',
      description: 'Flexible report builder with scheduling, templates, and distribution.',
      tags: ['Reports', 'Charts', 'Export'],
      preview: <ReportingSystemPreview />,
    },
    {
      name: 'Resource Booking',
      path: '/templates/resource-booking',
      description: 'Book meeting rooms, desks, equipment, and vehicles with calendar scheduling.',
      tags: ['Booking', 'Calendar', 'Resources'],
      preview: <ResourceBookingPreview />,
    },
    {
      name: 'Settings Panel',
      path: '/templates/settings',
      description: 'Comprehensive settings page with tabs for profile, account, and preferences.',
      tags: ['Settings', 'Forms', 'Tabs'],
      preview: <SettingsPreview />,
    },
    {
      name: 'Subscription & Billing',
      path: '/templates/subscription-billing',
      description: 'Manage subscriptions, invoices, revenue metrics, and plan configurations.',
      tags: ['Billing', 'Subscriptions', 'Revenue'],
      preview: <SubscriptionBillingPreview />,
    },
    {
      name: 'Survey Builder',
      path: '/templates/survey-builder',
      description: 'Create surveys with drag-and-drop questions, collect responses, and analyze results.',
      tags: ['Surveys', 'Forms', 'Analytics'],
      preview: <SurveyBuilderPreview />,
    },
    {
      name: 'Team Directory',
      path: '/templates/team-directory',
      description: 'Searchable employee directory with org chart, profiles, and contact information.',
      tags: ['Directory', 'Org Chart', 'People'],
      preview: <TeamDirectoryPreview />,
    },
    {
      name: 'Timesheet & Time Tracking',
      path: '/templates/timesheet',
      description: 'Weekly timesheet grid with start/stop timer, project allocation, and approval workflows.',
      tags: ['Time', 'Tracking', 'Approvals'],
      preview: <TimesheetPreview />,
    },
    ]

  return (
    <Container maxWidth={false} sx={{ maxWidth: 1200, mx: 'auto', px: 3, pt: 8, pb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          Templates
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          A collection of pre-built page templates using the design system components. Click any template to explore and customize.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Each template demonstrates best practices for layout, component composition, and responsive design patterns.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {templates.map((template) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={template.name}>
            <TemplateCard
              name={template.name}
              path={template.path}
              preview={template.preview}
              description={template.description}
              tags={template.tags}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default TemplatesPage

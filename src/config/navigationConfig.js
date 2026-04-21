// Navigation configuration - single source of truth for sidebar nav items
// Icons are imported where this config is used

export const NAV_ITEMS = [
  { iconName: 'HomeOutlined',              path: '/mw-home',           label: 'Home' },
  { iconName: 'ExploreOutlined',           path: '/explore',           label: 'Explore' },
  {
    iconName: 'ShowChartOutlined',
    path: '/mw-monitor',
    label: 'Monitor',
    children: [
      { path: '/mw-monitor/views/alinas-view', label: 'Views' },
      { path: '/genai-lens',                   label: 'GenAI Lens' },
      { path: '/mw-monitor/trends',            label: 'Trends Center' },
    ],
  },
  { iconName: 'BarChartOutlined',          path: '/newmw/analyze',     label: 'Analyze' },
  { iconName: 'NewspaperOutlined',         path: '/mw-newsletters',    label: 'Newsletters' },
  {
    iconName: 'DescriptionOutlined',
    path: '/report-group',
    label: 'Report',
    children: [
      { path: '/digest-reports',       label: 'Digest reports' },
      { path: '/newmw/outreach',       label: 'Insight reports' },
    ],
  },
  { iconName: 'NotificationsNoneOutlined', path: '/mw-alerts',         label: 'Alerts', spacerAfter: true },
  {
    iconName: 'TuneOutlined',
    path: '/content-mgmt',
    label: 'Content',
    children: [
      { path: '/content/tags',         label: 'Tags' },
      { path: '/content/automation',   label: 'Automation' },
      { path: '/content/rss-feeds',    label: 'Incoming RSS feeds' },
      { path: '/content/added',        label: 'Added content' },
      { path: '/content/labels',       label: 'Labels' },
      { path: '/content/newsfeeds',    label: 'Newsfeeds' },
      { path: '/content/sources',      label: 'Sources' },
    ],
  },
  {
    iconName: 'SettingsOutlined',
    path: '/account-group',
    label: 'Account',
    children: [
      { path: '/account-v10',          label: 'Profile' },
      { path: '/seats-v10',            label: 'Manage users' },
      { path: '/seats-v10/roles',      label: 'Roles' },
      { path: '/account/integrations', label: 'Third party integra...' },
      { path: '/api-tokens',           label: 'Meltwater API' },
      { path: '/account/social',       label: 'Social connections' },
    ],
  },
  { iconName: 'MiraStudio', path: '/studio', label: 'Mira Studio', badge: 'New' },
]

// Archived navigation items (still accessible via direct URL):
// - { iconName: 'GroupOutlined', path: '/users', label: 'Users' }

// Seats is accessible via Account page, not directly in sidebar
// Hidden from sidebar but still accessible via direct URL:
// - /seats-v10, /seats-v2, /seats-v5, /studio/chat-progression, /studio/influencer-test, /studio/influencer-test-v2

// Footer navigation - Tools & Resources
export const FOOTER_NAV_ITEMS = [
  { iconName: 'DashboardCustomizeOutlined', path: '/ds-collection', label: 'Components', matchPrefix: true },
  { iconName: 'MenuBookOutlined', path: '/guidelines', label: 'Guidelines', matchPrefix: true },
  { iconName: 'TextSnippetOutlined', path: '/content', label: 'Content', matchPrefix: true },
]

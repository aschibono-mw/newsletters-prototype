// Navigation configuration - single source of truth for sidebar nav items
// Icons are imported where this config is used

export const NAV_ITEMS = [
  { iconName: 'HomeOutlined',              path: '/mw-home',           label: 'Home' },
  { iconName: 'ExploreOutlined',           path: '/explore',           label: 'Explore',      disabled: true },
  {
    iconName: 'ShowChartOutlined',
    path: '/mw-monitor',
    label: 'Monitor',
    disabled: true,
    children: [
      { path: '/mw-monitor/views/alinas-view', label: 'Views' },
      { path: '/genai-lens',                   label: 'GenAI Lens' },
      { path: '/mw-monitor/trends',            label: 'Trends Center' },
    ],
  },
  { iconName: 'BarChartOutlined',          path: '/newmw/analyze',     label: 'Analyze',      disabled: true },
  { iconName: 'NewspaperOutlined',         path: '/mw-newsletters',    label: 'Newsletters' },
  {
    iconName: 'DescriptionOutlined',
    path: '/report-group',
    label: 'Report',
    disabled: true,
    children: [
      { path: '/digest-reports',       label: 'Digest reports' },
      { path: '/newmw/outreach',       label: 'Insight reports' },
    ],
  },
  { iconName: 'Tracker',                   path: '/mw-alerts-v2',      label: 'Trackers' },
  { iconName: 'NotificationsNoneOutlined', path: '/alerts',            label: 'Alerts (B)' },
  { iconName: 'ArticleOutlined',           path: '/digests',           label: 'Digests (B)',                  spacerAfter: true },
  {
    iconName: 'TuneOutlined',
    path: '/content-mgmt',
    label: 'Content',
    disabled: true,
    children: [
      { path: '/content/tags',         label: 'Tags' },
    ],
  },
  {
    iconName: 'SettingsOutlined',
    path: '/account-group',
    label: 'Account',
    disabled: true,
    children: [
      { path: '/account-v10',          label: 'Profile' },
    ],
  },
  { iconName: 'MiraStudio', path: '/studio', label: 'Mira Studio', badge: 'New', disabled: true },
]

// Archived navigation items (still accessible via direct URL):
// - { iconName: 'GroupOutlined', path: '/users', label: 'Users' }

// Seats is accessible via Account page, not directly in sidebar
// Hidden from sidebar but still accessible via direct URL:
// - /seats-v10, /seats-v2, /seats-v5, /studio/chat-progression, /studio/influencer-test, /studio/influencer-test-v2

// Footer navigation - Tools & Resources
export const FOOTER_NAV_ITEMS = [
  { iconName: 'DashboardCustomizeOutlined', path: '/ds-collection', label: 'Components', matchPrefix: true, disabled: true },
  { iconName: 'MenuBookOutlined', path: '/guidelines', label: 'Guidelines', matchPrefix: true, disabled: true },
  { iconName: 'TextSnippetOutlined', path: '/content', label: 'Content', matchPrefix: true, disabled: true },
]

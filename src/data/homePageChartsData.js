/**
 * Mock data for homepage data visualization modules
 */

// Sentiment trend data (line chart)
export const sentimentTrendData = [
  { timestamp: '2025-01-01', label: 'Jan 1', positive: 42, neutral: 35, negative: 23 },
  { timestamp: '2025-01-02', label: 'Jan 2', positive: 45, neutral: 32, negative: 23 },
  { timestamp: '2025-01-03', label: 'Jan 3', positive: 48, neutral: 30, negative: 22 },
  { timestamp: '2025-01-04', label: 'Jan 4', positive: 52, neutral: 28, negative: 20 },
  { timestamp: '2025-01-05', label: 'Jan 5', positive: 55, neutral: 27, negative: 18 },
  { timestamp: '2025-01-06', label: 'Jan 6', positive: 50, neutral: 30, negative: 20 },
  { timestamp: '2025-01-07', label: 'Jan 7', positive: 58, neutral: 25, negative: 17 },
  { timestamp: '2025-01-08', label: 'Jan 8', positive: 62, neutral: 23, negative: 15 },
  { timestamp: '2025-01-09', label: 'Jan 9', positive: 60, neutral: 25, negative: 15 },
  { timestamp: '2025-01-10', label: 'Jan 10', positive: 65, neutral: 22, negative: 13 },
  { timestamp: '2025-01-11', label: 'Jan 11', positive: 63, neutral: 24, negative: 13 },
  { timestamp: '2025-01-12', label: 'Jan 12', positive: 68, neutral: 20, negative: 12 },
]

// Narrative heatmap data
export const narrativeHeatmapRows = [
  { id: 'product', label: 'Product Quality' },
  { id: 'service', label: 'Customer Service' },
  { id: 'price', label: 'Pricing' },
  { id: 'delivery', label: 'Delivery' },
  { id: 'support', label: 'Tech Support' },
]

export const narrativeHeatmapColumns = [
  { id: 'twitter', label: 'X' },
  { id: 'facebook', label: 'Facebook' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'reddit', label: 'Reddit' },
  { id: 'news', label: 'News' },
]

export const narrativeHeatmapCells = [
  { rowId: 'product', columnId: 'twitter', value: 78, sentiment: 'positive' },
  { rowId: 'product', columnId: 'facebook', value: 65, sentiment: 'positive' },
  { rowId: 'product', columnId: 'instagram', value: 82, sentiment: 'positive' },
  { rowId: 'product', columnId: 'reddit', value: 45, sentiment: 'neutral' },
  { rowId: 'product', columnId: 'news', value: 72, sentiment: 'positive' },

  { rowId: 'service', columnId: 'twitter', value: 55, sentiment: 'neutral' },
  { rowId: 'service', columnId: 'facebook', value: 48, sentiment: 'neutral' },
  { rowId: 'service', columnId: 'instagram', value: 62, sentiment: 'positive' },
  { rowId: 'service', columnId: 'reddit', value: 35, sentiment: 'negative' },
  { rowId: 'service', columnId: 'news', value: 58, sentiment: 'neutral' },

  { rowId: 'price', columnId: 'twitter', value: 42, sentiment: 'neutral' },
  { rowId: 'price', columnId: 'facebook', value: 38, sentiment: 'negative' },
  { rowId: 'price', columnId: 'instagram', value: 45, sentiment: 'neutral' },
  { rowId: 'price', columnId: 'reddit', value: 28, sentiment: 'negative' },
  { rowId: 'price', columnId: 'news', value: 52, sentiment: 'neutral' },

  { rowId: 'delivery', columnId: 'twitter', value: 70, sentiment: 'positive' },
  { rowId: 'delivery', columnId: 'facebook', value: 75, sentiment: 'positive' },
  { rowId: 'delivery', columnId: 'instagram', value: 68, sentiment: 'positive' },
  { rowId: 'delivery', columnId: 'reddit', value: 55, sentiment: 'neutral' },
  { rowId: 'delivery', columnId: 'news', value: 65, sentiment: 'positive' },

  { rowId: 'support', columnId: 'twitter', value: 32, sentiment: 'negative' },
  { rowId: 'support', columnId: 'facebook', value: 40, sentiment: 'neutral' },
  { rowId: 'support', columnId: 'instagram', value: 38, sentiment: 'negative' },
  { rowId: 'support', columnId: 'reddit', value: 25, sentiment: 'negative' },
  { rowId: 'support', columnId: 'news', value: 45, sentiment: 'neutral' },
]

// Bubble chart data (brand performance)
export const bubbleChartData = [
  {
    id: 'brand-a',
    label: 'Brand A',
    x: 85,
    y: 12500,
    size: 950000,
    sentiment: 'positive',
    metadata: { category: 'Enterprise' },
  },
  {
    id: 'brand-b',
    label: 'Brand B',
    x: 72,
    y: 8900,
    size: 720000,
    sentiment: 'positive',
    metadata: { category: 'Enterprise' },
  },
  {
    id: 'brand-c',
    label: 'Brand C',
    x: 45,
    y: 15200,
    size: 1200000,
    sentiment: 'neutral',
    metadata: { category: 'Consumer' },
  },
  {
    id: 'brand-d',
    label: 'Brand D',
    x: 38,
    y: 6800,
    size: 480000,
    sentiment: 'negative',
    metadata: { category: 'SMB' },
  },
  {
    id: 'brand-e',
    label: 'Brand E',
    x: 92,
    y: 4500,
    size: 380000,
    sentiment: 'positive',
    metadata: { category: 'Startup' },
  },
  {
    id: 'brand-f',
    label: 'Brand F',
    x: 55,
    y: 9800,
    size: 650000,
    sentiment: 'neutral',
    metadata: { category: 'Consumer' },
  },
  {
    id: 'brand-g',
    label: 'Brand G',
    x: 28,
    y: 11200,
    size: 890000,
    sentiment: 'negative',
    metadata: { category: 'Enterprise' },
  },
  {
    id: 'brand-h',
    label: 'Brand H',
    x: 78,
    y: 7200,
    size: 520000,
    sentiment: 'positive',
    metadata: { category: 'SMB' },
  },
]

// AI insights for each module
export const aiInsights = {
  sentimentTrend: {
    type: 'trend',
    description:
      'Positive sentiment has increased 55% over the past 12 days, with a notable spike following the Jan 7 product announcement. Negative sentiment dropped to its lowest point (12%) on Jan 12.',
  },
  narrativeHeatmap: {
    type: 'alert',
    description:
      'Tech Support sentiment on Reddit is critically low (25%). Consider prioritizing community engagement and response times on this platform to address user concerns.',
  },
  bubbleChart: {
    type: 'summary',
    description:
      'Brand A leads in satisfaction (85%) with strong reach (950K). Brand G shows concerning negative sentiment despite high mentions - recommend investigation into recent customer feedback.',
  },
}

// Module configurations
export const dataModuleConfigs = {
  sentimentTrend: {
    title: 'Sentiment Trend',
    subtitle: 'Last 12 days',
  },
  narrativeHeatmap: {
    title: 'Narrative Analysis',
    subtitle: 'By topic and platform',
  },
  bubbleChart: {
    title: 'Brand Performance',
    subtitle: 'Satisfaction vs Mentions',
  },
}

// Alerts data
export const alertsData = [
  {
    id: 'alert-1',
    type: 'Spike Detection',
    time: '2 hours ago',
    text: 'Unusual spike in negative sentiment detected for "Brand G" on Reddit. Volume increased 340% compared to baseline.',
  },
  {
    id: 'alert-2',
    type: 'Trend Alert',
    time: '5 hours ago',
    text: 'Positive mentions of "Product Quality" reached an all-time high across Instagram and Facebook.',
  },
  {
    id: 'alert-3',
    type: 'Competitor Alert',
    time: 'Yesterday',
    text: 'Brand C launched a new campaign. Initial sentiment is neutral with high engagement rates.',
  },
]

export const alertsUnreadCount = 2

/**
 * Component Registry - Central source of truth for component metadata
 *
 * Inspired by Primer's documentation model:
 * - Status lifecycle: beta → stable → deprecated
 * - Implementation availability tracking (React, Figma, Storybook)
 * - Last updated timestamps
 * - Version tracking
 *
 * Usage:
 *   import { getComponentMeta } from '../config/componentRegistry'
 *   const meta = getComponentMeta('button')
 *
 * To update a component's Figma/Storybook links:
 *   1. Find the component entry below
 *   2. Change `figma: false` to `figma: 'https://figma.com/...'`
 *   3. Same pattern for storybook
 */

// Status definitions for reference
export const STATUS_DEFINITIONS = {
  beta: {
    description: 'New component gathering feedback. API may change.',
    criteria: [
      'Core functionality implemented',
      'Basic accessibility support',
      'Documentation in progress',
    ],
  },
  stable: {
    description: 'Production-ready. API is stable.',
    criteria: [
      'Full functionality implemented',
      'Accessibility audited',
      'Documentation complete',
      'Used in production',
    ],
  },
  deprecated: {
    description: 'Being phased out. Use recommended alternative.',
    criteria: [
      'Replacement available',
      'Migration guide provided',
      'Removal timeline communicated',
    ],
  },
}

// Component metadata registry
// Keys should match route slugs (e.g., /ds-collection/button → 'button')
export const COMPONENT_REGISTRY = {
  // INPUTS
  button: {
    name: 'Button',
    category: 'inputs',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: {
      react: true,
      figma: null, // TODO: Add Figma link
      storybook: null, // TODO: Add Storybook link
    },
    relatedComponents: ['toggle-button', 'fab', 'link'],
    guidelines: ['/content/action-labels'],
  },
  'text-field': {
    name: 'Text Field',
    category: 'inputs',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['select', 'autocomplete', 'search'],
  },
  select: {
    name: 'Select',
    category: 'inputs',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['autocomplete', 'text-field'],
  },
  checkbox: {
    name: 'Checkbox',
    category: 'inputs',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['checkbox-group', 'switch', 'radio'],
  },
  'checkbox-group': {
    name: 'Checkbox Group',
    category: 'inputs',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['checkbox', 'radio-group'],
  },
  radio: {
    name: 'Radio',
    category: 'inputs',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['radio-group', 'checkbox'],
  },
  'radio-group': {
    name: 'Radio Group',
    category: 'inputs',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['radio', 'checkbox-group', 'select'],
  },
  switch: {
    name: 'Switch',
    category: 'inputs',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['checkbox', 'toggle-button'],
  },
  slider: {
    name: 'Slider',
    category: 'inputs',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['text-field', 'rating'],
  },
  rating: {
    name: 'Rating',
    category: 'inputs',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['slider'],
  },
  autocomplete: {
    name: 'Autocomplete',
    category: 'inputs',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['select', 'text-field', 'chip'],
  },
  search: {
    name: 'Search',
    category: 'inputs',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['text-field', 'autocomplete'],
  },
  'toggle-button': {
    name: 'Toggle Button',
    category: 'inputs',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['button', 'switch', 'tabs'],
  },
  'file-upload': {
    name: 'File Upload',
    category: 'inputs',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['button', 'progress'],
  },
  'tag-input': {
    name: 'Tag Input',
    category: 'inputs',
    status: 'beta',
    lastUpdated: 'Jan 2025',
    version: '0.9',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['autocomplete', 'chip'],
  },
  'textarea-autosize': {
    name: 'Textarea Autosize',
    category: 'inputs',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['text-field'],
  },

  // DATA DISPLAY
  avatar: {
    name: 'Avatar',
    category: 'data-display',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['badge', 'chip'],
  },
  badge: {
    name: 'Badge',
    category: 'data-display',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['avatar', 'chip', 'indicator'],
  },
  chip: {
    name: 'Chip',
    category: 'data-display',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['badge', 'autocomplete'],
  },
  divider: {
    name: 'Divider',
    category: 'data-display',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['list'],
  },
  icons: {
    name: 'Icons',
    category: 'data-display',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['button'],
  },
  list: {
    name: 'List',
    category: 'data-display',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['table', 'divider'],
  },
  table: {
    name: 'Table',
    category: 'data-display',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['list', 'pagination'],
  },
  tooltip: {
    name: 'Tooltip',
    category: 'data-display',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['popover'],
  },
  indicator: {
    name: 'Indicator',
    category: 'data-display',
    status: 'beta',
    lastUpdated: 'Jan 2025',
    version: '0.9',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['badge'],
  },

  // FEEDBACK
  alert: {
    name: 'Alert',
    category: 'feedback',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['snackbar', 'dialog'],
  },
  dialog: {
    name: 'Dialog',
    category: 'feedback',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['drawer', 'alert'],
  },
  progress: {
    name: 'Progress',
    category: 'feedback',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['skeleton'],
  },
  skeleton: {
    name: 'Skeleton',
    category: 'feedback',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['progress'],
  },
  snackbar: {
    name: 'Snackbar',
    category: 'feedback',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['alert'],
  },

  // NAVIGATION
  tabs: {
    name: 'Tabs',
    category: 'navigation',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['toggle-button', 'stepper'],
  },
  pagination: {
    name: 'Pagination',
    category: 'navigation',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['table'],
  },
  stepper: {
    name: 'Stepper',
    category: 'navigation',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['tabs'],
  },
  link: {
    name: 'Link',
    category: 'navigation',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['button'],
  },
  'app-chrome': {
    name: 'App Chrome',
    category: 'navigation',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['drawer'],
  },

  // SURFACES
  card: {
    name: 'Card',
    category: 'surfaces',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['accordion'],
  },
  accordion: {
    name: 'Accordion',
    category: 'surfaces',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['card', 'stepper'],
  },
  drawer: {
    name: 'Drawer',
    category: 'surfaces',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['dialog', 'app-chrome'],
  },
  fab: {
    name: 'FAB',
    category: 'surfaces',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['button', 'speed-dial'],
  },

  // NAVIGATION (additional)
  breadcrumbs: {
    name: 'Breadcrumbs',
    category: 'navigation',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['link'],
  },
  'app-bar': {
    name: 'App Bar',
    category: 'navigation',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['drawer', 'menu'],
  },
  'bottom-navigation': {
    name: 'Bottom Navigation',
    category: 'navigation',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['tabs'],
  },

  // INPUTS (additional)
  'button-group': {
    name: 'Button Group',
    category: 'inputs',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['button', 'toggle-button'],
  },
  'speed-dial': {
    name: 'Speed Dial',
    category: 'inputs',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['fab', 'menu'],
  },

  // DATA DISPLAY (additional)
  menu: {
    name: 'Menu',
    category: 'data-display',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['popover', 'list'],
  },
  popover: {
    name: 'Popover',
    category: 'data-display',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['tooltip', 'menu'],
  },

  // SURFACES (additional)
  paper: {
    name: 'Paper',
    category: 'surfaces',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['card'],
  },

  // LAYOUT
  box: {
    name: 'Box',
    category: 'layout',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['container', 'stack'],
  },
  container: {
    name: 'Container',
    category: 'layout',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['box', 'grid'],
  },
  grid: {
    name: 'Grid',
    category: 'layout',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['container', 'stack'],
  },
  stack: {
    name: 'Stack',
    category: 'layout',
    status: 'stable',
    lastUpdated: 'Jan 2025',
    version: '1.0',
    availability: { react: true, figma: null, storybook: null },
    relatedComponents: ['box', 'grid'],
  },
}

/**
 * Get metadata for a component by slug
 * @param {string} slug - Component slug (e.g., 'button', 'text-field')
 * @returns {Object|null} Component metadata or null if not found
 */
export function getComponentMeta(slug) {
  return COMPONENT_REGISTRY[slug] || null
}

/**
 * Get all components in a category
 * @param {string} category - Category slug (e.g., 'inputs', 'feedback')
 * @returns {Array} Array of [slug, metadata] pairs
 */
export function getComponentsByCategory(category) {
  return Object.entries(COMPONENT_REGISTRY).filter(
    ([, meta]) => meta.category === category
  )
}

/**
 * Get all components with a specific status
 * @param {string} status - Status ('beta', 'stable', 'deprecated')
 * @returns {Array} Array of [slug, metadata] pairs
 */
export function getComponentsByStatus(status) {
  return Object.entries(COMPONENT_REGISTRY).filter(
    ([, meta]) => meta.status === status
  )
}

/**
 * Get related component metadata
 * @param {string} slug - Component slug
 * @returns {Array} Array of related component metadata with paths
 */
export function getRelatedComponents(slug) {
  const meta = COMPONENT_REGISTRY[slug]
  if (!meta?.relatedComponents) return []

  return meta.relatedComponents
    .filter((relatedSlug) => COMPONENT_REGISTRY[relatedSlug])
    .map((relatedSlug) => ({
      slug: relatedSlug,
      name: COMPONENT_REGISTRY[relatedSlug].name,
      path: `/ds-collection/${relatedSlug}`,
      status: COMPONENT_REGISTRY[relatedSlug].status,
    }))
}

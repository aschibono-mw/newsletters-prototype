/**
 * Mock data and configuration for Checkbox UXR Testing
 */

// Behavior option configurations
export const BEHAVIOR_OPTIONS = {
  'select-all': {
    id: 'select-all',
    label: 'Option A',
    name: 'Select All',
    tooltip: 'Click to select all',
    description: 'Clicking an indeterminate checkbox selects all items',
    mentalModel: '"Finish it for me"',
  },
  'deselect-all': {
    id: 'deselect-all',
    label: 'Option B',
    name: 'Deselect All',
    tooltip: 'Click to deselect all',
    description: 'Clicking an indeterminate checkbox deselects all items',
    mentalModel: '"Start over"',
  },
  'dropdown': {
    id: 'dropdown',
    label: 'Option D',
    name: 'Dropdown Menu',
    tooltip: 'Click for options',
    description: 'Clicking shows a menu with explicit selection choices',
    mentalModel: '"Give me explicit choices"',
  },
}

// Table items for flat list context
export const TABLE_ITEMS = [
  { id: 'doc-1', name: 'Q4 Budget Report.xlsx', type: 'spreadsheet', size: '2.4 MB' },
  { id: 'doc-2', name: 'Marketing Plan 2024.docx', type: 'document', size: '1.1 MB' },
  { id: 'doc-3', name: 'Product Roadmap.pdf', type: 'pdf', size: '3.7 MB' },
  { id: 'doc-4', name: 'Team Photo.jpg', type: 'image', size: '4.2 MB' },
  { id: 'doc-5', name: 'Meeting Notes.txt', type: 'text', size: '24 KB' },
  { id: 'doc-6', name: 'Sales Dashboard.pptx', type: 'presentation', size: '5.8 MB' },
  { id: 'doc-7', name: 'Customer Feedback.csv', type: 'spreadsheet', size: '892 KB' },
  { id: 'doc-8', name: 'Brand Guidelines.pdf', type: 'pdf', size: '12.1 MB' },
]

// Folder tree for hierarchical context
export const FOLDER_TREE = {
  id: 'root',
  name: 'Project Files',
  type: 'folder',
  children: [
    {
      id: 'folder-1',
      name: 'Design',
      type: 'folder',
      children: [
        { id: 'file-1-1', name: 'Wireframes.fig', type: 'file' },
        { id: 'file-1-2', name: 'Mockups.sketch', type: 'file' },
        { id: 'file-1-3', name: 'Icons.svg', type: 'file' },
      ],
    },
    {
      id: 'folder-2',
      name: 'Development',
      type: 'folder',
      children: [
        { id: 'file-2-1', name: 'README.md', type: 'file' },
        { id: 'file-2-2', name: 'package.json', type: 'file' },
        {
          id: 'folder-2-1',
          name: 'src',
          type: 'folder',
          children: [
            { id: 'file-2-1-1', name: 'index.js', type: 'file' },
            { id: 'file-2-1-2', name: 'App.jsx', type: 'file' },
          ],
        },
      ],
    },
    {
      id: 'folder-3',
      name: 'Documentation',
      type: 'folder',
      children: [
        { id: 'file-3-1', name: 'API Reference.md', type: 'file' },
        { id: 'file-3-2', name: 'User Guide.pdf', type: 'file' },
        { id: 'file-3-3', name: 'Release Notes.txt', type: 'file' },
      ],
    },
  ],
}

// Helper to get all file IDs from the tree
export const getAllFileIds = (node) => {
  if (node.type === 'file') {
    return [node.id]
  }
  if (node.children) {
    return node.children.flatMap(getAllFileIds)
  }
  return []
}

// Helper to get direct children IDs (files only)
export const getChildFileIds = (node) => {
  if (!node.children) return []
  return node.children
    .filter((child) => child.type === 'file')
    .map((child) => child.id)
    .concat(node.children.filter((child) => child.type === 'folder').flatMap(getAllFileIds))
}

// Guided flow step configurations
export const GUIDED_STEPS = [
  {
    id: 'intro',
    type: 'intro',
    title: 'Welcome to the Checkbox UXR Study',
    description: "You'll see checkboxes in different states. Tell us what you expect before clicking.",
  },
  {
    id: 'table-a',
    type: 'test',
    context: 'table',
    behavior: 'select-all',
    title: 'Table View - Partial Selection',
    instruction: 'Some items in this table are selected. The header checkbox shows a dash (indeterminate state).',
  },
  {
    id: 'table-b',
    type: 'test',
    context: 'table',
    behavior: 'deselect-all',
    title: 'Table View - Partial Selection',
    instruction: 'Some items in this table are selected. The header checkbox shows a dash (indeterminate state).',
  },
  {
    id: 'table-d',
    type: 'test',
    context: 'table',
    behavior: 'dropdown',
    title: 'Table View - With Dropdown',
    instruction: 'This checkbox has a dropdown indicator. What options do you expect to see?',
  },
  {
    id: 'modal-a',
    type: 'test',
    context: 'modal',
    behavior: 'select-all',
    title: 'Folder Tree - Partial Selection',
    instruction: 'Some files in this folder are selected. The parent folder checkbox shows a dash.',
  },
  {
    id: 'modal-b',
    type: 'test',
    context: 'modal',
    behavior: 'deselect-all',
    title: 'Folder Tree - Partial Selection',
    instruction: 'Some files in this folder are selected. The parent folder checkbox shows a dash.',
  },
  {
    id: 'modal-d',
    type: 'test',
    context: 'modal',
    behavior: 'dropdown',
    title: 'Folder Tree - With Dropdown',
    instruction: 'This folder checkbox has a dropdown indicator. What options do you expect?',
  },
  {
    id: 'summary',
    type: 'summary',
    title: 'Thank You!',
    description: "Here's a summary of your responses.",
  },
]

// Expectation question options
export const EXPECTATION_OPTIONS = [
  { id: 'select-all', label: 'All items will become selected' },
  { id: 'deselect-all', label: 'All items will become deselected' },
  { id: 'other', label: 'Something else' },
]

// Dropdown menu options for Option D
export const DROPDOWN_MENU_OPTIONS = [
  { id: 'select-all', label: 'Select all' },
  { id: 'select-none', label: 'Select none' },
  { id: 'select-visible', label: 'Select visible' },
  { id: 'invert', label: 'Invert selection' },
]

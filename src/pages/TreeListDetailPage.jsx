import { useState } from 'react'
import {
  Box,
  Typography,
} from '@mui/material'
import TreeList from '../components/core/TreeList'
import { CoreDetailPageLayout, CorePropsTable } from '../components/core'

// Sample data
const SAMPLE_DATA = {
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
      ],
    },
  ],
}

function TreeListDetailPage() {
  const [selected, setSelected] = useState(['file-1-1', 'file-2-1'])

  return (
    <CoreDetailPageLayout
      title="Tree List"
      description="Hierarchical list with expandable folders, checkboxes, and selection management."
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
          Default
        </Typography>
        <Box sx={{ maxWidth: 400 }}>
          <TreeList
            data={SAMPLE_DATA}
            selected={selected}
            onSelectionChange={setSelected}
            defaultExpanded={['root', 'folder-1', 'folder-2', 'folder-3']}
          />
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2 }}>
          Selected: {selected.length > 0 ? selected.join(', ') : 'None'}
        </Typography>
      </Box>

      <CorePropsTable
        props={[
          { name: 'data', type: 'object', description: 'Tree data with { id, name, type: "folder"|"file", children? }. Required.' },
          { name: 'selected', type: 'array', description: 'Array of selected item IDs' },
          { name: 'onSelectionChange', type: 'function', description: 'Callback with updated selection array' },
          { name: 'defaultExpanded', type: 'array', description: 'Array of folder IDs to expand by default' },
          { name: 'renderFolderCheckbox', type: 'function', description: 'Custom render function for folder checkboxes' },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default TreeListDetailPage

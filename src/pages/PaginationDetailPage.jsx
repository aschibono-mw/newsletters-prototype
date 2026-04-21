import { CoreDetailPageLayout, CorePropsTable } from '../components/core'
import PaginationThemed from '../components/themed/PaginationThemed'
import AccessibilitySection from '../components/docs/AccessibilitySection'

function PaginationDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Pagination"
      description="Navigate through large datasets with page numbers and table pagination controls."
    >
      <PaginationThemed />

      <CorePropsTable
        props={[
          { name: 'count', type: 'number', description: 'Total number of pages' },
          { name: 'page', type: 'number', description: 'Current page (1-indexed)' },
          { name: 'onChange', type: 'function', description: 'Callback when page changes' },
          { name: 'color', type: '"primary" | "secondary" | "standard"', description: 'Pagination color' },
          { name: 'shape', type: '"circular" | "rounded"', description: 'Button shape. Default: "circular"' },
          { name: 'size', type: '"small" | "medium" | "large"', description: 'Pagination size' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "2.1.1", name: "Keyboard", level: "A", note: "Tab through pages, Enter to select" },
          { id: "2.4.7", name: "Focus Visible", level: "AA", note: "Visible focus on page buttons" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "navigation role, aria-current for active" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "4.5:1 page number contrast" },
          { id: "1.4.11", name: "Non-text Contrast", level: "AA", note: "3:1 selected page indicator" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default PaginationDetailPage

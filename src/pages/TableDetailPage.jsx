import { CoreDetailPageLayout, CorePropsTable } from '../components/core'
import TableThemed from '../components/themed/TableThemed'
import AccessibilitySection from '../components/docs/AccessibilitySection'

function TableDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Table"
      description="Display structured data in rows and columns with sorting, selection, and pagination."
    >
      <TableThemed />

      <CorePropsTable
        props={[
          { name: 'size', type: '"small" | "medium"', description: 'Table density. Default: "medium"' },
          { name: 'stickyHeader', type: 'boolean', description: 'If true, header sticks to top on scroll' },
          { name: 'padding', type: '"normal" | "checkbox" | "none"', description: 'Cell padding' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "1.3.1", name: "Info and Relationships", level: "A", note: "Proper table markup with th/td" },
          { id: "2.1.1", name: "Keyboard", level: "A", note: "Tab through cells and controls" },
          { id: "2.4.7", name: "Focus Visible", level: "AA", note: "Visible focus on interactive elements" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "table role, aria-sort for columns" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "4.5:1 cell text contrast" },
          { id: "1.4.11", name: "Non-text Contrast", level: "AA", note: "3:1 row borders and selection" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default TableDetailPage

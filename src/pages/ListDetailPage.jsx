import { CoreDetailPageLayout, CorePropsTable } from '../components/core'
import ListThemed from '../components/themed/ListThemed'
import AccessibilitySection from '../components/docs/AccessibilitySection'

function ListDetailPage() {
  return (
    <CoreDetailPageLayout
      title="List"
      description="Structured vertical lists with icons, avatars, actions, and interactive elements."
    >
      <ListThemed />

      <CorePropsTable
        props={[
          { name: 'children', type: 'ReactNode', description: 'List items' },
          { name: 'dense', type: 'boolean', description: 'If true, uses compact padding' },
          { name: 'disablePadding', type: 'boolean', description: 'If true, removes padding' },
          { name: 'subheader', type: 'ReactNode', description: 'Subheader content' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "1.3.1", name: "Info and Relationships", level: "A", note: "list/listitem roles for structure" },
          { id: "2.1.1", name: "Keyboard", level: "A", note: "Tab to interactive list items" },
          { id: "2.4.7", name: "Focus Visible", level: "AA", note: "Visible focus on clickable items" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "Proper roles for interactive items" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "4.5:1 list item text contrast" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default ListDetailPage

import { CoreDetailPageLayout, CorePropsTable } from '../components/core'
import FindThemed from '../components/themed/FindThemed'
import AccessibilitySection from '../components/docs/AccessibilitySection'

function FindDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Find"
      description="Fully rounded search field with persistent icon. Used in app chrome, tables, and navigation."
    >
      <FindThemed />

      <CorePropsTable
        props={[
          { name: 'value', type: 'string', description: 'The search input value' },
          { name: 'onChange', type: 'function', description: 'Callback when value changes' },
          { name: 'placeholder', type: 'string', description: 'Placeholder text. Default: "Search..."' },
          { name: 'onClear', type: 'function', description: 'Callback when clear button is clicked' },
          { name: 'disabled', type: 'boolean', description: 'If true, the input is disabled' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "1.3.1", name: "Info and Relationships", level: "A", note: "aria-label describes search purpose" },
          { id: "2.1.1", name: "Keyboard", level: "A", note: "Tab to focus, type to search" },
          { id: "2.4.7", name: "Focus Visible", level: "AA", note: "Visible focus indicator" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "searchbox role with accessible name" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "4.5:1 text and icon contrast" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default FindDetailPage

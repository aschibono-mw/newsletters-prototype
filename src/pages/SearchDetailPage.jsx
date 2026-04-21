import { CoreDetailPageLayout, CorePropsTable } from '../components/core'
import SearchThemed from '../components/themed/SearchThemed'
import AccessibilitySection from '../components/docs/AccessibilitySection'

function SearchDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Search"
      description="Search input field with icon and clear functionality."
    >
      <SearchThemed />

      <CorePropsTable
        props={[
          { name: 'value', type: 'string', description: 'The search input value' },
          { name: 'onChange', type: 'function', description: 'Callback when value changes' },
          { name: 'placeholder', type: 'string', description: 'Placeholder text' },
          { name: 'onClear', type: 'function', description: 'Callback when clear button is clicked' },
          { name: 'size', type: '"small" | "medium"', description: 'Input size. Default: "medium"' },
          { name: 'disabled', type: 'boolean', description: 'If true, the input is disabled' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "1.3.1", name: "Info and Relationships", level: "A", note: "Label linked via htmlFor/id or aria-label" },
          { id: "2.1.1", name: "Keyboard", level: "A", note: "Tab to focus, type to search, Escape to clear" },
          { id: "2.4.7", name: "Focus Visible", level: "AA", note: "Teal outline on focus" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "searchbox role with accessible name" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "4.5:1 text and icon contrast" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default SearchDetailPage

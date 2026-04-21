import { CoreDetailPageLayout, CorePropsTable } from '../components/core'
import AutocompleteThemed from '../components/themed/AutocompleteThemed'
import AccessibilitySection from '../components/docs/AccessibilitySection'

function AutocompleteDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Autocomplete"
      description="Searchable dropdown with multiselect support and custom value input."
    >
      <AutocompleteThemed />

      <CorePropsTable
        props={[
          { name: 'options', type: 'array', description: 'Array of options to display' },
          { name: 'value', type: 'any', description: 'The value of the autocomplete' },
          { name: 'onChange', type: 'function', description: 'Callback when value changes' },
          { name: 'multiple', type: 'boolean', description: 'If true, allows multiple selections' },
          { name: 'freeSolo', type: 'boolean', description: 'If true, allows arbitrary input values' },
          { name: 'disabled', type: 'boolean', description: 'If true, the component is disabled' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "1.3.1", name: "Info and Relationships", level: "A", note: "Label linked, listbox associated" },
          { id: "2.1.1", name: "Keyboard", level: "A", note: "Arrows to navigate, Enter to select" },
          { id: "2.1.2", name: "No Keyboard Trap", level: "A", note: "Escape closes dropdown" },
          { id: "2.4.7", name: "Focus Visible", level: "AA", note: "Teal outline on input and options" },
          { id: "3.3.2", name: "Labels or Instructions", level: "A", note: "Floating label + helper text" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "combobox + listbox roles" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "4.5:1 text, adapts to palette" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default AutocompleteDetailPage

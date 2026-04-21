import { CoreDetailPageLayout, CorePropsTable } from '../components/core'
import TagInputThemed from '../components/themed/TagInputThemed'
import AccessibilitySection from '../components/docs/AccessibilitySection'

function TagInputDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Tag Input"
      description="Multi-value text input with chip display and removal."
    >
      <TagInputThemed />

      <CorePropsTable
        props={[
          { name: 'value', type: 'array', description: 'Array of tag values' },
          { name: 'onChange', type: 'function', description: 'Callback when tags change' },
          { name: 'placeholder', type: 'string', description: 'Placeholder text when empty' },
          { name: 'disabled', type: 'boolean', description: 'If true, the input is disabled' },
          { name: 'error', type: 'boolean', description: 'If true, shows error state' },
          { name: 'helperText', type: 'string', description: 'Helper text below input' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "1.3.1", name: "Info and Relationships", level: "A", note: "Label linked, chips as list items" },
          { id: "2.1.1", name: "Keyboard", level: "A", note: "Tab to input, Backspace to remove tags" },
          { id: "2.4.7", name: "Focus Visible", level: "AA", note: "Visible focus on input and chips" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "textbox role, chips as buttons" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "4.5:1 tag and input text contrast" },
          { id: "1.4.11", name: "Non-text Contrast", level: "AA", note: "3:1 tag border/fill vs background" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default TagInputDetailPage

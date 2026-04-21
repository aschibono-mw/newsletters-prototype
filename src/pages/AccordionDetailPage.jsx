import { CoreDetailPageLayout, CorePropsTable } from '../components/core'
import AccordionThemed from '../components/themed/AccordionThemed'
import AccessibilitySection from '../components/docs/AccessibilitySection'

function AccordionDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Accordion"
      description="Expandable panels for organizing content into collapsible sections."
    >
      <AccordionThemed />

      <CorePropsTable
        props={[
          { name: 'expanded', type: 'boolean', description: 'If true, expands the accordion panel' },
          { name: 'onChange', type: 'function', description: 'Callback fired when the expand/collapse state changes' },
          { name: 'disabled', type: 'boolean', description: 'If true, the accordion is disabled' },
          { name: 'defaultExpanded', type: 'boolean', description: 'If true, the accordion is expanded by default' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "2.1.1", name: "Keyboard", level: "A", note: "Tab to headers, Enter/Space to expand" },
          { id: "2.4.7", name: "Focus Visible", level: "AA", note: "Visible focus on accordion headers" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "button role, aria-expanded state" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "4.5:1 header and content text" },
          { id: "1.4.11", name: "Non-text Contrast", level: "AA", note: "3:1 expand icon and borders" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default AccordionDetailPage

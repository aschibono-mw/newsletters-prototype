import ToggleButtonThemed from '../components/themed/ToggleButtonThemed'
import AccessibilitySection from '../components/docs/AccessibilitySection'
import { CoreDetailPageLayout, CorePropsTable } from '../components/core'

function ToggleButtonDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Toggle Button"
      description="Button group for single or multiple selections with toggle states."
    >
      <ToggleButtonThemed />

      <CorePropsTable
        props={[
          { name: 'value', type: 'any', description: 'The value of the toggle button' },
          { name: 'selected', type: 'boolean', description: 'If true, the button is selected' },
          { name: 'onChange', type: 'function', description: 'Callback when selection changes' },
          { name: 'size', type: '"small" | "medium" | "large"', description: 'Button size. Default: "medium"' },
          { name: 'color', type: '"standard" | "primary" | "secondary" | "error" | "info" | "success" | "warning"', description: 'Button color' },
          { name: 'disabled', type: 'boolean', description: 'If true, the button is disabled' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "1.3.1", name: "Info and Relationships", level: "A", note: "Group association via ToggleButtonGroup" },
          { id: "2.1.1", name: "Keyboard", level: "A", note: "Tab to focus, Space to toggle selection" },
          { id: "2.4.7", name: "Focus Visible", level: "AA", note: "Visible focus indicator on active button" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "aria-pressed indicates toggle state" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "4.5:1 text/icon contrast" },
          { id: "1.4.11", name: "Non-text Contrast", level: "AA", note: "3:1 selected vs unselected state" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default ToggleButtonDetailPage

import { CoreDetailPageLayout, CorePropsTable } from '../components/core'
import TabsThemed from '../components/themed/TabsThemed'
import AccessibilitySection from '../components/docs/AccessibilitySection'

function TabsDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Tabs"
      description="Horizontal navigation for organizing content into logical sections with smooth transitions."
    >
      <TabsThemed />

      <CorePropsTable
        props={[
          { name: 'value', type: 'any', description: 'The value of the currently selected tab' },
          { name: 'onChange', type: 'function', description: 'Callback when tab selection changes' },
          { name: 'variant', type: '"standard" | "scrollable" | "fullWidth"', description: 'Tabs variant. Default: "standard"' },
          { name: 'orientation', type: '"horizontal" | "vertical"', description: 'Tabs orientation. Default: "horizontal"' },
          { name: 'centered', type: 'boolean', description: 'If true, tabs are centered' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "2.1.1", name: "Keyboard", level: "A", note: "Arrow keys to switch tabs, Tab to move focus" },
          { id: "2.4.3", name: "Focus Order", level: "A", note: "Logical tab order through tab list" },
          { id: "2.4.7", name: "Focus Visible", level: "AA", note: "Visible focus indicator on active tab" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "tablist/tab roles, aria-selected" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "4.5:1 tab label text contrast" },
          { id: "1.4.11", name: "Non-text Contrast", level: "AA", note: "3:1 active tab indicator vs background" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default TabsDetailPage

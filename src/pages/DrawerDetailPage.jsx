import { CoreDetailPageLayout, CorePropsTable } from '../components/core'
import DrawerThemed from '../components/themed/DrawerThemed'
import AccessibilitySection from '../components/docs/AccessibilitySection'

function DrawerDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Drawer"
      description="Side panels that slide in from screen edges for navigation, filters, details, and forms."
    >
      <DrawerThemed />

      <CorePropsTable
        props={[
          { name: 'open', type: 'boolean', description: 'If true, the drawer is open' },
          { name: 'onClose', type: 'function', description: 'Callback when drawer is closed' },
          { name: 'anchor', type: '"left" | "right" | "top" | "bottom"', description: 'Side from which drawer appears. Default: "left"' },
          { name: 'variant', type: '"permanent" | "persistent" | "temporary"', description: 'Drawer variant. Default: "temporary"' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "2.1.1", name: "Keyboard", level: "A", note: "Tab through content, Escape to close" },
          { id: "2.1.2", name: "No Keyboard Trap", level: "A", note: "Focus trapped within, Escape exits" },
          { id: "2.4.3", name: "Focus Order", level: "A", note: "Focus moves to drawer on open" },
          { id: "2.4.7", name: "Focus Visible", level: "AA", note: "Visible focus on drawer controls" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "dialog or complementary role" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "4.5:1 drawer content text" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default DrawerDetailPage

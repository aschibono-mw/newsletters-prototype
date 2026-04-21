import { CoreDetailPageLayout, CorePropsTable } from '../components/core'
import FabThemed from '../components/themed/FabThemed'
import AccessibilitySection from '../components/docs/AccessibilitySection'

function FabDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Floating Action Button"
      description="Prominent circular button for primary actions, available in circular and extended variants with elevation."
    >
      <FabThemed />

      <CorePropsTable
        props={[
          { name: 'color', type: '"default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"', description: 'FAB color' },
          { name: 'size', type: '"small" | "medium" | "large"', description: 'FAB size. Default: "large"' },
          { name: 'variant', type: '"circular" | "extended"', description: 'FAB variant. Default: "circular"' },
          { name: 'disabled', type: 'boolean', description: 'If true, the FAB is disabled' },
          { name: 'onClick', type: 'function', description: 'Click handler' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "2.1.1", name: "Keyboard", level: "A", note: "Tab to focus, Enter or Space to activate" },
          { id: "2.4.7", name: "Focus Visible", level: "AA", note: "Visible focus ring on keyboard navigation" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "button role, aria-label for icon-only FABs" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "4.5:1 icon/text on colored background" },
          { id: "1.4.11", name: "Non-text Contrast", level: "AA", note: "3:1 FAB surface vs page background" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default FabDetailPage

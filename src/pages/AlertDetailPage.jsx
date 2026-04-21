import { CoreDetailPageLayout, CorePropsTable } from '../components/core'
import AlertThemed from '../components/themed/AlertThemed'
import AccessibilitySection from '../components/docs/AccessibilitySection'

function AlertDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Alert"
      description="Contextual feedback messages for user actions with severity levels and optional actions."
    >
      <AlertThemed />

      <CorePropsTable
        props={[
          { name: 'severity', type: '"error" | "warning" | "info" | "success"', description: 'Alert severity/color. Default: "success"' },
          { name: 'variant', type: '"standard" | "filled" | "outlined"', description: 'Alert variant. Default: "standard"' },
          { name: 'icon', type: 'ReactNode | false', description: 'Override or hide the icon' },
          { name: 'action', type: 'ReactNode', description: 'Action element (e.g., close button)' },
          { name: 'onClose', type: 'function', description: 'Callback for close action' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "1.4.1", name: "Use of Color", level: "A", note: "Icon + text, not color alone" },
          { id: "4.1.3", name: "Status Messages", level: "AA", note: "role=alert for announcements" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "4.5:1 text on colored background" },
          { id: "1.4.11", name: "Non-text Contrast", level: "AA", note: "3:1 icon contrast" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default AlertDetailPage

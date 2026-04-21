import { CoreDetailPageLayout, CorePropsTable } from '../components/core'
import IndicatorThemed from '../components/themed/IndicatorThemed'
import AccessibilitySection from '../components/docs/AccessibilitySection'

function IndicatorDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Indicator"
      description="Badge labels with light fills for status, groups, and tags. Supports text, start icons, and icon-only variants."
    >
      <IndicatorThemed />

      <CorePropsTable
        props={[
          { name: 'label', type: 'string', description: 'The text to display' },
          { name: 'status', type: '"active" | "pending" | "inactive" | "error" | "warning" | "success" | "info"', description: 'Status color variant' },
          { name: 'icon', type: 'ReactNode', description: 'Icon to display at start' },
          { name: 'size', type: '"small" | "medium"', description: 'Indicator size. Default: "medium"' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "1.4.1", name: "Use of Color", level: "A", note: "Text label provides info, not color alone" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "4.5:1 label text on colored background" },
          { id: "1.4.11", name: "Non-text Contrast", level: "AA", note: "3:1 indicator vs page background" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default IndicatorDetailPage

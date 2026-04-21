import { CoreDetailPageLayout, CorePropsTable } from '../components/core'
import ProgressThemed from '../components/themed/ProgressThemed'
import AccessibilitySection from '../components/docs/AccessibilitySection'

function ProgressDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Progress & Loading"
      description="Visual indicators for ongoing processes including spinners, progress bars, and skeleton loaders."
    >
      <ProgressThemed />

      <CorePropsTable
        props={[
          { name: 'variant', type: '"determinate" | "indeterminate"', description: 'Progress variant. Default: "indeterminate"' },
          { name: 'value', type: 'number', description: 'Progress value (0-100) for determinate variant' },
          { name: 'color', type: '"primary" | "secondary" | "error" | "info" | "success" | "warning"', description: 'Progress color' },
          { name: 'size', type: 'number | string', description: 'Size of circular progress (in px)' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "1.1.1", name: "Non-text Content", level: "A", note: "aria-label describes purpose" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "role=progressbar, aria-valuenow" },
          { id: "1.4.1", name: "Use of Color", level: "A", note: "Value shown via aria, not color alone" },
          { id: "1.4.11", name: "Non-text Contrast", level: "AA", note: "3:1 progress bar vs background" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default ProgressDetailPage

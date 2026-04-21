import DividerThemed from '../components/themed/DividerThemed'
import AccessibilitySection from '../components/docs/AccessibilitySection'
import { CoreDetailPageLayout, CorePropsTable } from '../components/core'

function DividerDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Divider"
      description="Horizontal and vertical lines for visual separation and content grouping."
    >
      <DividerThemed />

      <CorePropsTable
        props={[
          { name: 'orientation', type: '"horizontal" | "vertical"', description: 'Divider orientation. Default: "horizontal"' },
          { name: 'variant', type: '"fullWidth" | "inset" | "middle"', description: 'Divider variant. Default: "fullWidth"' },
          { name: 'flexItem', type: 'boolean', description: 'If true, works as a flex item' },
          { name: 'textAlign', type: '"center" | "left" | "right"', description: 'Text alignment when using children' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "1.3.1", name: "Info and Relationships", level: "A", note: "role=separator for semantic meaning" },
          { id: "1.4.11", name: "Non-text Contrast", level: "AA", note: "3:1 divider line vs background" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default DividerDetailPage

import { CoreDetailPageLayout, CorePropsTable } from '../components/core'
import PaperThemed from '../components/themed/PaperThemed'
import AccessibilitySection from '../components/docs/AccessibilitySection'

function PaperDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Paper"
      description="A foundational surface component that provides elevation through shadows or borders."
    >
      <PaperThemed />

      <CorePropsTable
        props={[
          { name: 'children', type: 'ReactNode', description: 'Paper content' },
          { name: 'elevation', type: 'number', description: 'Shadow depth (0-24). Default: 1' },
          { name: 'variant', type: '"elevation" | "outlined"', description: 'Paper variant. Default: "elevation"' },
          { name: 'square', type: 'boolean', description: 'If true, removes border-radius' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "1.4.3", name: "Contrast", level: "AA", note: "Content on paper meets 4.5:1 contrast ratio" },
          { id: "1.4.11", name: "Non-text Contrast", level: "AA", note: "Outlined variant border meets 3:1 contrast" },
          { id: "1.3.1", name: "Info and Relationships", level: "A", note: "Paper is semantic container, not decorative" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default PaperDetailPage

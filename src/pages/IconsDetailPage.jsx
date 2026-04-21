import { CoreDetailPageLayout, CorePropsTable } from '../components/core'
import IconsThemed from '../components/themed/IconsThemed'
import AccessibilitySection from '../components/docs/AccessibilitySection'

function IconsDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Icons"
      description="Rounded Material Design icons at 20px default. Desktop-first with weight 400 and outlined fill."
    >
      <IconsThemed />

      <CorePropsTable
        props={[
          { name: 'fontSize', type: '"inherit" | "small" | "medium" | "large"', description: 'Icon size. Default: "medium" (24px)' },
          { name: 'color', type: '"inherit" | "action" | "disabled" | "primary" | "secondary" | "error"', description: 'Icon color' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "1.1.1", name: "Non-text Content", level: "A", note: "aria-hidden for decorative, aria-label for meaningful" },
          { id: "1.4.11", name: "Non-text Contrast", level: "AA", note: "3:1 icon vs background" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default IconsDetailPage

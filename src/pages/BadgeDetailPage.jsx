import { CoreDetailPageLayout, CorePropsTable } from '../components/core'
import BadgeThemed from '../components/themed/BadgeThemed'
import AccessibilitySection from '../components/docs/AccessibilitySection'

function BadgeDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Badge"
      description="Small notification indicators with counts or status dots overlaid on avatars, icons, and buttons."
    >
      <BadgeThemed />

      <CorePropsTable
        props={[
          { name: 'badgeContent', type: 'ReactNode', description: 'The content rendered within the badge' },
          { name: 'color', type: '"default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"', description: 'Badge color' },
          { name: 'variant', type: '"standard" | "dot"', description: 'Badge variant. Default: "standard"' },
          { name: 'invisible', type: 'boolean', description: 'If true, the badge is invisible' },
          { name: 'max', type: 'number', description: 'Max count to show. Default: 99' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "1.1.1", name: "Non-text Content", level: "A", note: "Badge content announced via aria-label" },
          { id: "1.4.1", name: "Use of Color", level: "A", note: "Count/dot provides info beyond color" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "4.5:1 badge content on colored background" },
          { id: "1.4.11", name: "Non-text Contrast", level: "AA", note: "3:1 badge vs underlying element" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default BadgeDetailPage

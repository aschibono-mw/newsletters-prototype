import CardThemed from '../components/themed/CardThemed'
import AccessibilitySection from '../components/docs/AccessibilitySection'
import { CoreDetailPageLayout, CorePropsTable } from '../components/core'

function CardDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Card"
      description="Surface containers for grouping related content and actions. Supports media, promo, and basic layouts."
    >
      <CardThemed />

      <CorePropsTable
        props={[
          { name: 'children', type: 'ReactNode', description: 'Card content' },
          { name: 'variant', type: '"elevation" | "outlined"', description: 'Card variant. Default: "elevation"' },
          { name: 'elevation', type: 'number', description: 'Shadow depth (0-24). Default: 1' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "1.3.1", name: "Info and Relationships", level: "A", note: "Semantic structure with headings" },
          { id: "2.1.1", name: "Keyboard", level: "A", note: "Tab to card actions and interactive elements" },
          { id: "2.4.7", name: "Focus Visible", level: "AA", note: "Visible focus on clickable cards and actions" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "4.5:1 text contrast within cards" },
          { id: "1.4.11", name: "Non-text Contrast", level: "AA", note: "3:1 card border vs background" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default CardDetailPage

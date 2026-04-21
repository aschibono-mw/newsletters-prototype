import BreadcrumbsThemed from '../components/themed/BreadcrumbsThemed'
import AccessibilitySection from '../components/docs/AccessibilitySection'
import { CoreDetailPageLayout, CorePropsTable } from '../components/core'

function BreadcrumbsDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Breadcrumbs"
      description="Navigation component showing the hierarchical path to the current page with clickable links."
    >
      <BreadcrumbsThemed />

      <CorePropsTable
        props={[
          { name: 'children', type: 'ReactNode', description: 'Breadcrumb links/items' },
          { name: 'separator', type: 'ReactNode', description: 'Custom separator element. Default: "/"' },
          { name: 'maxItems', type: 'number', description: 'Max items to display before collapsing' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "1.3.1", name: "Info and Relationships", level: "A", note: "Uses nav element with aria-label" },
          { id: "2.4.4", name: "Link Purpose", level: "A", note: "Each link clearly indicates destination" },
          { id: "2.4.8", name: "Location", level: "AAA", note: "Shows user's position in site hierarchy" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "Links are properly identified" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default BreadcrumbsDetailPage

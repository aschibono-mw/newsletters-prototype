import { CoreDetailPageLayout, CorePropsTable } from '../components/core'
import LinkThemed from '../components/themed/LinkThemed'
import AccessibilitySection from '../components/docs/AccessibilitySection'

function LinkDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Links & Breadcrumbs"
      description="Navigation elements for internal and external links with breadcrumb trails."
    >
      <LinkThemed />

      <CorePropsTable
        props={[
          { name: 'href', type: 'string', description: 'The URL to link to' },
          { name: 'underline', type: '"none" | "hover" | "always"', description: 'Underline behavior. Default: "always"' },
          { name: 'color', type: '"primary" | "secondary" | "inherit" | "error"', description: 'Link color' },
          { name: 'target', type: 'string', description: 'Link target (e.g., "_blank" for new tab)' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "2.1.1", name: "Keyboard", level: "A", note: "Tab to focus, Enter to activate" },
          { id: "2.4.4", name: "Link Purpose", level: "A", note: "Descriptive link text or aria-label" },
          { id: "2.4.7", name: "Focus Visible", level: "AA", note: "Visible focus indicator on links" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "Native link element with href" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "4.5:1 link text contrast" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default LinkDetailPage

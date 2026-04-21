import AppChromeThemed from '../components/themed/AppChromeThemed'
import AccessibilitySection from '../components/docs/AccessibilitySection'
import { CoreDetailPageLayout, CorePropsTable } from '../components/core'

function AppChromeDetailPage() {
  return (
    <CoreDetailPageLayout
      title="App Chrome"
      description="Full application shell with responsive layouts. Shows desktop (3-column), tablet (2-column), and mobile (1-column) states with adaptive navigation and filters."
      sx={{ maxWidth: 1400 }}
    >
      <AppChromeThemed />

      <CorePropsTable
        props={[
          { name: 'children', type: 'ReactNode', description: 'Main content area' },
          { name: 'sidebar', type: 'ReactNode', description: 'Sidebar content (navigation)' },
          { name: 'header', type: 'ReactNode', description: 'Header content' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "1.3.1", name: "Info and Relationships", level: "A", note: "Landmark regions (header, nav, main)" },
          { id: "2.1.1", name: "Keyboard", level: "A", note: "Tab through all navigation and content" },
          { id: "2.4.1", name: "Bypass Blocks", level: "A", note: "Skip links to bypass repetitive nav" },
          { id: "2.4.7", name: "Focus Visible", level: "AA", note: "Visible focus on all interactive elements" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "4.5:1 text contrast throughout" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default AppChromeDetailPage

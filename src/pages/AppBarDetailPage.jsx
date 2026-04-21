import { CoreDetailPageLayout, CorePropsTable } from '../components/core'
import AppBarThemed from '../components/themed/AppBarThemed'
import AccessibilitySection from '../components/docs/AccessibilitySection'

function AppBarDetailPage() {
  return (
    <CoreDetailPageLayout
      title="App Bar"
      description="The top navigation bar displaying branding, navigation, search, and user actions."
    >
      <AppBarThemed />

      <CorePropsTable
        props={[
          { name: 'position', type: '"fixed" | "absolute" | "sticky" | "static" | "relative"', description: 'The positioning type. Default: "fixed"' },
          { name: 'color', type: '"default" | "inherit" | "primary" | "secondary" | "transparent"', description: 'The color of the component' },
          { name: 'elevation', type: 'number', description: 'Shadow depth (0-24). Default: 4' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "2.4.1", name: "Bypass Blocks", level: "A", note: "Consider skip-to-content link for keyboard users" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "Navigation landmarks, button labels for icons" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "Ensure text/icons meet 4.5:1 against AppBar background" },
          { id: "2.1.1", name: "Keyboard", level: "A", note: "All interactive elements keyboard accessible" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default AppBarDetailPage

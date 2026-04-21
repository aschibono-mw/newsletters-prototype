import { CoreDetailPageLayout, CorePropsTable } from '../components/core'
import MenuThemed from '../components/themed/MenuThemed'
import AccessibilitySection from '../components/docs/AccessibilitySection'

function MenuDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Menu"
      description="Dropdown menus displaying a list of choices on a temporary surface, triggered by user interaction."
    >
      <MenuThemed />

      <CorePropsTable
        props={[
          { name: 'open', type: 'boolean', description: 'If true, the menu is open' },
          { name: 'onClose', type: 'function', description: 'Callback when menu is closed' },
          { name: 'anchorEl', type: 'Element', description: 'Element to anchor the menu to' },
          { name: 'anchorOrigin', type: 'object', description: 'Anchor point on the element' },
          { name: 'transformOrigin', type: 'object', description: 'Transform origin point' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "2.1.1", name: "Keyboard", level: "A", note: "Arrow keys navigate, Enter selects, Escape closes" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "role=menu, aria-haspopup, aria-expanded on trigger" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "4.5:1 text contrast, visible focus indicators" },
          { id: "2.4.3", name: "Focus Order", level: "A", note: "Focus moves to menu on open, returns on close" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default MenuDetailPage

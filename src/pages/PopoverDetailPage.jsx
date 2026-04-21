import { CoreDetailPageLayout, CorePropsTable } from '../components/core'
import PopoverThemed from '../components/themed/PopoverThemed'
import AccessibilitySection from '../components/docs/AccessibilitySection'

function PopoverDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Popover"
      description="A floating container for displaying rich content anchored to a specific element."
    >
      <PopoverThemed />

      <CorePropsTable
        props={[
          { name: 'open', type: 'boolean', description: 'If true, the popover is open' },
          { name: 'onClose', type: 'function', description: 'Callback when popover is closed' },
          { name: 'anchorEl', type: 'Element', description: 'Element to anchor the popover to' },
          { name: 'anchorOrigin', type: 'object', description: 'Anchor point on the element' },
          { name: 'transformOrigin', type: 'object', description: 'Transform origin point' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "1.4.3", name: "Contrast", level: "AA", note: "Content meets 4.5:1 contrast on popover surface" },
          { id: "2.1.1", name: "Keyboard", level: "A", note: "Focus trap inside popover, Escape to close" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "aria-describedby links trigger to content" },
          { id: "2.4.3", name: "Focus Order", level: "A", note: "Focus moves to popover on open, returns on close" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default PopoverDetailPage

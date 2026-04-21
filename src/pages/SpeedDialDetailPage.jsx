import { CoreDetailPageLayout, CorePropsTable } from '../components/core'
import SpeedDialThemed from '../components/themed/SpeedDialThemed'
import AccessibilitySection from '../components/docs/AccessibilitySection'

function SpeedDialDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Speed Dial"
      description="A floating action button that expands to reveal related actions when activated."
    >
      <SpeedDialThemed />

      <CorePropsTable
        props={[
          { name: 'open', type: 'boolean', description: 'If true, the speed dial is open' },
          { name: 'onOpen', type: 'function', description: 'Callback when speed dial opens' },
          { name: 'onClose', type: 'function', description: 'Callback when speed dial closes' },
          { name: 'ariaLabel', type: 'string', description: 'Accessible label for the FAB' },
          { name: 'icon', type: 'ReactNode', description: 'Icon for the main FAB' },
          { name: 'direction', type: '"up" | "down" | "left" | "right"', description: 'Direction to open. Default: "up"' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "2.1.1", name: "Keyboard", level: "A", note: "Tab/Shift+Tab navigates, Enter/Space activates" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "ariaLabel describes purpose, actions have tooltipTitle" },
          { id: "2.4.3", name: "Focus Order", level: "A", note: "Focus moves through actions in logical order" },
          { id: "1.4.11", name: "Non-text Contrast", level: "AA", note: "FAB and action buttons meet 3:1 contrast" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default SpeedDialDetailPage

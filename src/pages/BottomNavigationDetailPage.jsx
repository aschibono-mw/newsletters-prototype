import BottomNavigationThemed from '../components/themed/BottomNavigationThemed'
import AccessibilitySection from '../components/docs/AccessibilitySection'
import { CoreDetailPageLayout, CorePropsTable } from '../components/core'

function BottomNavigationDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Bottom Navigation"
      description="Mobile-style navigation bar fixed at the bottom of the screen for primary app destinations."
    >
      <BottomNavigationThemed />

      <CorePropsTable
        props={[
          { name: 'value', type: 'any', description: 'The value of the currently selected action' },
          { name: 'onChange', type: 'function', description: 'Callback when selection changes' },
          { name: 'showLabels', type: 'boolean', description: 'If true, shows labels on all actions' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "2.4.4", name: "Link Purpose", level: "A", note: "Each destination has clear icon + label" },
          { id: "2.1.1", name: "Keyboard", level: "A", note: "Arrow keys navigate, Enter/Space selects" },
          { id: "1.4.11", name: "Non-text Contrast", level: "AA", note: "Selected state has 3:1 contrast vs unselected" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "role=navigation for landmark, aria-current for selected" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default BottomNavigationDetailPage

import TooltipThemed from '../components/themed/TooltipThemed'
import AccessibilitySection from '../components/docs/AccessibilitySection'
import { CoreDetailPageLayout, CorePropsTable } from '../components/core'

function TooltipDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Tooltip"
      description="Contextual hints and help text that appear on hover, focus, or click."
    >
      <TooltipThemed />

      <CorePropsTable
        props={[
          { name: 'title', type: 'ReactNode', description: 'Tooltip content' },
          { name: 'placement', type: '"top" | "bottom" | "left" | "right" | ...', description: 'Tooltip placement. Default: "bottom"' },
          { name: 'arrow', type: 'boolean', description: 'If true, shows arrow pointing to element' },
          { name: 'enterDelay', type: 'number', description: 'Delay before showing (ms). Default: 100' },
          { name: 'leaveDelay', type: 'number', description: 'Delay before hiding (ms). Default: 0' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "1.3.1", name: "Info and Relationships", level: "A", note: "aria-describedby links trigger to tooltip" },
          { id: "2.1.1", name: "Keyboard", level: "A", note: "Tab to trigger, shows on focus" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "tooltip role announced by screen readers" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "4.5:1 tooltip text on dark background" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default TooltipDetailPage

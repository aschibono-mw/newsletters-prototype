import ButtonGroupThemed from '../components/themed/ButtonGroupThemed'
import AccessibilitySection from '../components/docs/AccessibilitySection'
import { CoreDetailPageLayout, CorePropsTable } from '../components/core'

function ButtonGroupDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Button Group"
      description="Groups related buttons together with consistent styling and layout, useful for toolbars and split actions."
    >
      <ButtonGroupThemed />

      <CorePropsTable
        props={[
          { name: 'variant', type: '"contained" | "outlined" | "text"', description: 'Button variant. Default: "outlined"' },
          { name: 'color', type: '"primary" | "secondary" | "error" | "info" | "success" | "warning"', description: 'Button color' },
          { name: 'size', type: '"small" | "medium" | "large"', description: 'Button size. Default: "medium"' },
          { name: 'orientation', type: '"horizontal" | "vertical"', description: 'Group orientation. Default: "horizontal"' },
          { name: 'disabled', type: 'boolean', description: 'If true, all buttons are disabled' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "1.3.1", name: "Info and Relationships", level: "A", note: "Group uses role=group with aria-label" },
          { id: "2.1.1", name: "Keyboard", level: "A", note: "All buttons keyboard accessible" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "Split button has aria-haspopup, aria-expanded" },
          { id: "1.4.11", name: "Non-text Contrast", level: "AA", note: "Button borders meet 3:1 contrast" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default ButtonGroupDetailPage

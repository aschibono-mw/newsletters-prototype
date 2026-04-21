import ChipThemed from '../components/themed/ChipThemed'
import AccessibilitySection from '../components/docs/AccessibilitySection'
import { CoreDetailPageLayout, CorePropsTable } from '../components/core'

function ChipDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Chip"
      description="Compact elements for tags, labels, and removable items."
    >
      <ChipThemed />

      <CorePropsTable
        props={[
          { name: 'label', type: 'ReactNode', description: 'The content of the chip' },
          { name: 'variant', type: '"filled" | "outlined"', description: 'Chip variant. Default: "filled"' },
          { name: 'size', type: '"small" | "medium"', description: 'Chip size. Default: "medium"' },
          { name: 'icon', type: 'ReactNode', description: 'Icon element at the start' },
          { name: 'onDelete', type: 'function', description: 'Callback when delete icon is clicked' },
          { name: 'onClick', type: 'function', description: 'Callback when chip is clicked' },
          { name: 'disabled', type: 'boolean', description: 'If true, the chip is disabled' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "2.1.1", name: "Keyboard", level: "A", note: "Tab to focus, Enter/Delete to interact" },
          { id: "2.4.7", name: "Focus Visible", level: "AA", note: "Visible focus ring on chip" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "button role for clickable chips" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "4.5:1 chip label text contrast" },
          { id: "1.4.11", name: "Non-text Contrast", level: "AA", note: "3:1 chip border/fill vs background" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default ChipDetailPage
